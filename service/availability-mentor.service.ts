import {
    createAgendaMentorRequest,
    createTimeSlotMentorRequest,
    createWeekdayMentorRequest,
    deleteTimeSlotMentorRequest,
    searchByWeekDayMentorRequest,
    searchByWeekDayTimeSlotMentorRequest,
} from '@/api/endpoints/create-availability-mentor';

//POST CADASTRA OS DIAS DISPONIVEL DO MENTOR
export async function sendAvailabilityMentorService(
    p_mentor_id: number,
    p_weekday: number
) {
    try {
        const data = await createWeekdayMentorRequest(p_mentor_id, p_weekday);

        return { success: true, data };
    } catch (error: any) {
        return {
            success: false,
            message:
                error.response?.data?.message ||
                'Erro em cadastrar o dia disponiveis.',
        };
    }
}
//GET BUSCA OS DIAS DISPONIVEL QUE O MENTOR CADASTROU
export async function searchAvailabilityWeekDayMentorService(
    idWeekDay: number
) {
    try {
        const data = await searchByWeekDayMentorRequest(idWeekDay);
        return { success: true, data };
    } catch (error: any) {
        return {
            success: false,
            message:
                error.response?.data?.message ||
                'Erro para buscar os dias da semana cadastrado do mentor',
        };
    }
}

//POST DE CRIAR OS HORARIOS QUE O MENTOR ESTA DISPONIVEL
export async function sendAvailabilityTimeSlotMentorService(
    mentor_weekday_id: number,
    start_time: string
) {
    try {
        const data = await createTimeSlotMentorRequest(
            mentor_weekday_id,
            start_time
        );

        return { success: true, data };
    } catch (error: any) {
        return {
            success: false,
            message:
                error.response?.data?.message ||
                'Erro em cadastrar os horaios do mentor',
        };
    }
}

// POST PUBLICAR OFICIALMENTE A AGENDA DO MENTOR
export async function createAgendaMentorService(p_mentor_id: number) {
    try {
        const data = await createAgendaMentorRequest(p_mentor_id);

        return { success: true, data };
    } catch (error: any) {
        return {
            success: false,
            message:
                error.response?.data?.message ||
                'Erro em cadastrar os horarios na agenda oficial do mentor',
        };
    }
}

//GET BUSCAR OS HORARIOS E DIA DISPONIVEIS QUE O MENTOR CADASTROU PARA ELE
export async function searchWeekDay_timeSlotMentorService(idMentor: number) {
    try {
        const data = await searchByWeekDayTimeSlotMentorRequest(idMentor);
        return { success: true, data };
    } catch (error: any) {
        return {
            success: false,
            message:
                error.response?.data?.message ||
                'Erro para buscar os dias e horarios da semana cadastrado do mentor',
        };
    }
}

//DELETE DELETAR O HORARIO DO MENTOR QUE ELE CADASTROU
export async function deleteTimeSlotMentorService(slotId: number) {
    try {
        const data = await deleteTimeSlotMentorRequest(slotId);
        return { success: true, data };
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'Erro ao apagar horário.',
        };
    }
}
