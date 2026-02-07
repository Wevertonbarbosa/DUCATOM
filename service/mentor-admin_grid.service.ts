
import { MentorAgendaGridResponse } from '@/model/grid_mentor-model';
import { byGridMentorRequest } from './endpoints/admin-grid-mentor';


export async function byGridMentorService(p_mentor_id: number) {
    try {
        const data = await byGridMentorRequest(p_mentor_id);

        return {
            success: true,
            data: data as MentorAgendaGridResponse,
        };
    } catch (error: any) {
        return {
            success: false,
            message:
                error.response?.data?.message ||
                'Erro ao buscar as informações para o grid do mentor',
        };
    }
}
