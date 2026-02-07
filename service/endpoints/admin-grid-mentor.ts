import { supabaseAuth } from '../../service/endpoints/supabaseAuth.api';

// BUSCA A AGENDA GRID DO MENTOR COM TODOS OS SLOTS (DISPONIVEIS, RESERVADO, CANCELADO)
export async function byGridMentorRequest(p_mentor_id: number) {
    const url = '/rest/v1/rpc/get_mentor_agenda_grid';
    const body = { p_mentor_id };
    const resp = await supabaseAuth.post<any>(url, body);
    return resp.data;
}
