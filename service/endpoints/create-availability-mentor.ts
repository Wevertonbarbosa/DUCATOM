import { supabaseAuth } from '@/service/endpoints/supabaseAuth.api';

//POST DE CRIAR OS DIAS QUE O MENTOR ESTA DISPONIVEL
export async function createWeekdayMentorRequest(
    p_mentor_id: number,
    p_weekday: number
) {
    const url = `/rest/v1/rpc/get_or_create_mentor_weekday`;
    const body = { p_mentor_id, p_weekday };

    const resp = await supabaseAuth.post<any>(url, body);
    return resp.data;
}

//POST DE CRIAR OS HORARIOS QUE O MENTOR ESTA DISPONIVEL
export async function createTimeSlotMentorRequest(
    mentor_weekday_id: number,
    start_time: string
) {
    const url = `/rest/v1/mentor_time_slot`;
    const body = { mentor_weekday_id, start_time };

    const resp = await supabaseAuth.post<any>(url, body);
    return resp.data;
}

// POST PUBLICAR OFICIALMENTE A AGENDA DO MENTOR
export async function createAgendaMentorRequest(p_mentor_id: number) {
    const url = `/rest/v1/rpc/publish_agenda_mentor`;
    const body = { p_mentor_id };

    const resp = await supabaseAuth.post<any>(url, body);
    return resp.data;
}




//GET BUSCAR OS DIAS DISPONIVEIS QUE O MENTOR CADASTRO PARA ELE
export async function searchByWeekDayMentorRequest(idWeekDay: number) {
    const url = '/rest/v1/mentor_weekday';

    const response = await supabaseAuth.get(url, {
        params: {
            profile_id: `eq.${idWeekDay}`,
            select: '*',
        },
    });

    return response.data;
}

//GET BUSCAR OS HORARIOS E DIA DISPONIVEIS QUE O MENTOR CADASTROU
export async function searchByWeekDayTimeSlotMentorRequest(idMentor: number) {
    const url = '/rest/v1/mentor_time_slot';

    const response = await supabaseAuth.get(url, {
        params: {
            id_mentor: `eq.${idMentor}`,
            select: '*',
        },
    });

    return response.data;
}

//DELETE DELETAR O HORARIO DO MENTOR QUE ELE CADASTROU
export async function deleteTimeSlotMentorRequest(slotId: number) {
    const url = '/rest/v1/mentor_time_slot';

    const response = await supabaseAuth.delete(url, {
        params: {
            id: `eq.${slotId}`,
        },
    });

    return response.data;
}
