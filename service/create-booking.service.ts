import { createBookingAgendaRequest } from '@/api/endpoints/create-booking-agenda';

//POST ALUNO CADASTRA RESERVA/AULA COM MENTOR
export async function createBookingAgendaService(
    aluno_id: number,
    mentor_id: number,
    weekday_id: number,
    mentor_time_slot_id: number,
    status: string,
    video_link: string
) {
    try {
        const data = await createBookingAgendaRequest(
            aluno_id,
            mentor_id,
            weekday_id,
            mentor_time_slot_id,
            status,
            video_link
        );

        return { success: true, data };
    } catch (error: any) {
        return {
            success: false,
            message:
                error.response?.data?.message ||
                'Erro em cadastrar aula com mentor na agenda oficial do mentor',
        };
    }
}
