import { supabaseAuth } from './supabaseAuth.api';

//GET BUSCAR LISTA DE MENTOR COM SUAS AGENDAS DETALHADAS
export async function searchListMentor_Agenda_Request() {
    const url = '/rest/v1/rpc/get_mentores_com_agenda';

    const response = await supabaseAuth.get(url);

    return response.data;
}
