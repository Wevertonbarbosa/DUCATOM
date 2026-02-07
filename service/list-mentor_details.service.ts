import { searchListMentor_Agenda_Request } from '@/service/endpoints/list-mentor_agenda';

export async function searchListMentor_Agenda_Service() {
    try {
        const data = await searchListMentor_Agenda_Request();
        return { success: true, data };
    } catch (error: any) {
        return {
            success: false,
            message:
                error.response?.data?.message ||
                'Erro ao buscar lista de mentores detalhada',
        };
    }
}
