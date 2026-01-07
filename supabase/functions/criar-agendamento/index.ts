/// <reference types="jsr:@supabase/functions-js/edge-runtime.d.ts" />

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { SignJWT, importPKCS8 } from 'https://esm.sh/jose@5';

// ======================================================
// CLIENTE SUPABASE (SERVICE ROLE)
// ======================================================
const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// ======================================================
// FUNÇÃO AUXILIAR → FORMATAR DATA LOCAL (SEM UTC)
// ======================================================
function formatDateTimeLocal(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
        date.getDate()
    )}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
        date.getSeconds()
    )}`;
}

// ======================================================
// CONFIGURAÇÕES GOOGLE
// ======================================================
const GOOGLE_CALENDAR_SCOPE = 'https://www.googleapis.com/auth/calendar';

// ⚠️ USUÁRIO REAL DO WORKSPACE (OBRIGATÓRIO PARA GERAR MEET)
const GOOGLE_WORKSPACE_USER = 'prime@ducatom.com.br';

// ======================================================
// EDGE FUNCTION
// ======================================================
Deno.serve({ verifyJwt: false }, async (req) => {
    try {
        // ======================================================
        // VALIDAR MÉTODO
        // ======================================================
        if (req.method !== 'POST') {
            return new Response(
                JSON.stringify({ error: 'Método não permitido' }),
                { status: 405 }
            );
        }

        // ======================================================
        // LER BODY
        // ======================================================
        let body: any;
        try {
            body = await req.json();
        } catch {
            return new Response(
                JSON.stringify({ error: 'Body inválido ou vazio' }),
                { status: 400 }
            );
        }

        const { aluno_id, mentor_id, weekday_id, mentor_time_slot_id } = body;

        if (
            !aluno_id ||
            !mentor_id ||
            weekday_id === undefined ||
            !mentor_time_slot_id
        ) {
            return new Response(
                JSON.stringify({ error: 'Campos obrigatórios ausentes' }),
                { status: 400 }
            );
        }

        // ======================================================
        // CRIAR BOOKING VIA RPC
        // ======================================================
        const { data: booking, error: bookingError } = await supabase
            .rpc('create_mentor_booking', {
                p_aluno_id: aluno_id,
                p_mentor_id: mentor_id,
                p_mentor_weekday_id: weekday_id,
                p_mentor_time_slot_id: mentor_time_slot_id,
            })
            .single();

        if (bookingError) {
            return new Response(
                JSON.stringify({
                    error: 'Horário já reservado ou inválido',
                    details: bookingError.message,
                }),
                { status: 409 }
            );
        }

        // ======================================================
        // BUSCAR HORÁRIO DO SLOT
        // ======================================================
        const { data: slot, error: slotError } = await supabase
            .from('mentor_time_slot')
            .select('start_time')
            .eq('id', mentor_time_slot_id)
            .single();

        if (slotError || !slot) {
            return new Response(
                JSON.stringify({ error: 'Erro ao obter horário do mentor' }),
                { status: 500 }
            );
        }

        // ======================================================
        // MONTAR DATA/HORA LOCAL (BRASIL)
        // ======================================================
        // booking.booking_date -> YYYY-MM-DD
        // slot.start_time      -> HH:MM:SS
        const startDateTime = new Date(
            `${booking.booking_date}T${slot.start_time}`
        );

        const endDateTime = new Date(startDateTime);
        endDateTime.setMinutes(endDateTime.getMinutes() + 60);

        const startLocal = formatDateTimeLocal(startDateTime);
        const endLocal = formatDateTimeLocal(endDateTime);

        // ======================================================
        // GOOGLE SERVICE ACCOUNT
        // ======================================================
        const rawKey = Deno.env.get('GOOGLE_SERVICE_ACCOUNT_KEY');

        if (!rawKey) {
            return new Response(
                JSON.stringify({
                    error: 'GOOGLE_SERVICE_ACCOUNT_KEY não configurado',
                }),
                { status: 500 }
            );
        }

        const serviceAccount = JSON.parse(rawKey);

        // ======================================================
        // GERAR JWT (COM IMPERSONAÇÃO!)
        // ======================================================
        const now = Math.floor(Date.now() / 1000);

        const jwt = await new SignJWT({
            iss: serviceAccount.client_email,
            scope: GOOGLE_CALENDAR_SCOPE,
            aud: 'https://oauth2.googleapis.com/token',
            iat: now,
            exp: now + 60 * 60,

            // 🔥 ESSENCIAL PARA GERAR GOOGLE MEET
            sub: GOOGLE_WORKSPACE_USER,
        })
            .setProtectedHeader({ alg: 'RS256', typ: 'JWT' })
            .sign(await importPKCS8(serviceAccount.private_key, 'RS256'));

        // ======================================================
        // OBTER ACCESS TOKEN
        // ======================================================
        const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                assertion: jwt,
            }),
        });

        const tokenData = await tokenRes.json();

        if (!tokenRes.ok || !tokenData.access_token) {
            return new Response(
                JSON.stringify({
                    error: 'Erro ao obter token do Google',
                    details: tokenData,
                }),
                { status: 500 }
            );
        }

        // ======================================================
        // PAYLOAD DO EVENTO (MEET PREPARADO)
        // ======================================================
        const eventPayload = {
            summary: 'Sessão de Mentoria',
            description: `Mentoria entre aluno ${aluno_id} e mentor ${mentor_id}`,
            start: {
                dateTime: startLocal,
                timeZone: 'America/Sao_Paulo',
            },
            end: {
                dateTime: endLocal,
                timeZone: 'America/Sao_Paulo',
            },
            conferenceData: {
                createRequest: {
                    requestId: crypto.randomUUID(),
                    conferenceSolutionKey: {
                        type: 'hangoutsMeet',
                    },
                },
            },
        };

        const calendarId = 'primary';

        const eventRes = await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?conferenceDataVersion=1`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${tokenData.access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventPayload),
            }
        );

        const eventData = await eventRes.json();

        if (!eventRes.ok) {
            return new Response(
                JSON.stringify({
                    error: 'Evento criado, mas Meet não gerado',
                    details: eventData,
                }),
                { status: 500 }
            );
        }

        // ======================================================
        // SALVAR LINK DO MEET
        // ======================================================
        const meetLink =
            eventData.hangoutLink ??
            eventData.conferenceData?.entryPoints?.find(
                (e: any) => e.entryPointType === 'video'
            )?.uri ??
            null;

        if (meetLink) {
            const { error: updateError } = await supabase
                .from('mentor_bookings')
                .update({
                    video_link: meetLink,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', booking.id);

            if (updateError) {
                return new Response(
                    JSON.stringify({
                        error: 'Meet criado, mas erro ao salvar no banco',
                        details: updateError.message,
                    }),
                    { status: 500 }
                );
            }
        }

        // ======================================================
        // SUCESSO
        // ======================================================
        return new Response(
            JSON.stringify({
                success: true,
                booking_id: booking.id,
                meet_link: meetLink,
                starts_at: startDateTime,
                ends_at: endDateTime,
            }),
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (err: any) {
        console.error(err);
        return new Response(
            JSON.stringify({
                error: 'Erro interno inesperado',
                details: err.message,
            }),
            { status: 500 }
        );
    }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/criar-agendamento' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
