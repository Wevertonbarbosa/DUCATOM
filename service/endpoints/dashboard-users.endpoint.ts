import { supabaseAuth } from '@/service/endpoints/supabaseAuth.api';

//BUSCA ALUNOS POR ID NA TABELA AUTH
export async function searchByIdStudentRequest(id: string) {
    const url = '/rest/v1/aluno';

    const response = await supabaseAuth.get(url, {
        params: {
            auth_id: `eq.${id}`,
            select: '*',
        },
    });

    return response.data;
}

//BUSCA ALUNO POR ID NA TABELA ALUNO
export async function getByIdStudentRequest(id: number) {
    const url = '/rest/v1/aluno';

    const response = await supabaseAuth.get(url, {
        params: {
            id: `eq.${id}`,
        },
    });

    return response.data;
}

//BUSCA TODOS OS ALUNOS
export async function searchStudentRequest() {
    const url = '/rest/v1/aluno';

    const response = await supabaseAuth.get(url, {
        params: {
            select: '*',
        },
    });

    return response.data;
}

//BUSCA TODOS OS MENTORES
export async function searchMentorRequest() {
    const url = '/rest/v1/mentor';

    const response = await supabaseAuth.get(url, {
        params: {
            select: '*',
        },
    });

    return response.data;
}

//GET BUSCAR MENTOR POR VIA UUID
export async function searchByNivelMentorRequest(id: string) {
    const url = '/rest/v1/mentor';

    const response = await supabaseAuth.get(url, {
        params: {
            profile_id: `eq.${id}`,
            select: '*',
        },
    });

    return response.data;
}

//GET BUSCAR MENTOR POR VIA ID NA TABELA MENTOR
export async function getByIdMentorRequest(id: number) {
    const url = '/rest/v1/mentor';

    const response = await supabaseAuth.get(url, {
        params: {
            id: `eq.${id}`,
        },
    });

    return response.data;
}

// GET BUSCAR HISTORICO DO ALUNO POR VIA ID FUNCTION RPC
export async function getHistoryStudentByIdRequest(aluno_id_param: number) {
    const url = '/rest/v1/rpc/get_aluno_bookings_details';

    const body = { aluno_id_param };
    const resp = await supabaseAuth.post<any>(url, body);
    return resp.data;
}

//BUSCA TODOS OS HORARIOS DISPONIVEIS E RESERVADOS DO MENTOR
export async function searchTotalTimeWeekdayRequest(mentor_id_param: number) {
    const url = `/rest/v1/rpc/get_mentor_dashboard_summary`;
    const body = { mentor_id_param };
    const resp = await supabaseAuth.post<any>(url, body);
    return resp.data;
}

//BUSCAR MENTOR/ALUNO SE TEM PENDÊNCIA DE CONFIRMAÇÃO/NEGAÇÃO DE CONCLUIR A AULA
export async function searchPendingConfirmationRequest(
    p_user_id: number,
    p_role: string,
) {
    const url = `/rest/v1/rpc/get_pending_class_confirmation`;
    const body = { p_user_id, p_role };
    const resp = await supabaseAuth.post<any>(url, body);
    return resp.data;
}

// ALUNO/MENTOR CONFIRMA OU NEGA NO MODAL A CONCLUSAO DA AULA
export async function postConfirmationClassRequest(
    p_booking_id: number,
    p_user_id: number,
    p_role: string,
    p_confirmed: boolean,
) {
    const url = `/rest/v1/rpc/confirm_class_attendance`;
    const body = { p_booking_id, p_user_id, p_role, p_confirmed };
    const resp = await supabaseAuth.post<any>(url, body);
    return resp.data;
}
