import { supabaseAuth } from './supabaseAuth.api';

//POST ALUNO CADASTRA RESERVA/AULA COM MENTOR
export async function createBookingAgendaRequest(
    aluno_id: number,
    mentor_id: number,
    weekday_id: number,
    mentor_time_slot_id: number,
    status: string,
    video_link: string
) {
    const url = `/rest/v1/mentor_bookings`;
    const body = {
        aluno_id,
        mentor_id,
        weekday_id,
        mentor_time_slot_id,
        status,
        video_link,
    };
    const resp = await supabaseAuth.post<any>(url, body);
    return resp.data;
}
