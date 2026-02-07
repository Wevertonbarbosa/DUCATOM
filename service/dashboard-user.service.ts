import {
    getByIdMentorRequest,
    getHistoryStudentByIdRequest,
    postConfirmationClassRequest,
    searchByIdStudentRequest,
    searchByNivelMentorRequest,
    searchMentorRequest,
    searchPendingConfirmationRequest,
    searchStudentRequest,
    searchTotalTimeWeekdayRequest,
} from '@/api/endpoints/dashboard-users.endpoint';

//BUSCA ALUNOS POR ID NA TABELA AUTH
export async function byIdStudentService(id: string) {
    try {
        const data = await searchByIdStudentRequest(id);
        return { success: true, data };
    } catch (error: any) {
        return {
            success: false,
            message:
                error.response?.data?.message ||
                'Erro ao realizar cadastro de aluno.',
        };
    }
}

// GET BUSCAR HISTORICO DO ALUNO POR VIA ID FUNCTION RPC
export async function getHistoryStudentByIdService(aluno_id_param: number) {
    try {
        const data = await getHistoryStudentByIdRequest(aluno_id_param);
        return { success: true, data };
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'Erro ao buscar aluno.',
        };
    }
}

//GET BUSCAR MENTOR POR VIA ID NA TABELA MENTOR
export async function byMentorByIDService(id: number) {
    try {
        const data = await getByIdMentorRequest(id);
        return { success: true, data };
    } catch (error: any) {
        return {
            success: false,
            message:
                error.response?.data?.message ||
                'Erro ao buscar Mentor pelo ID.',
        };
    }
}

//BUSCA TODOS OS ALUNOS
export async function byStudentListService() {
    try {
        const data = await searchStudentRequest();
        return { success: true, data };
    } catch (error: any) {
        return {
            success: false,
            message:
                error.response?.data?.message ||
                'Erro ao buscar lista de alunos.',
        };
    }
}

//BUSCA A LISTA DE MENTORES COM AGENDA ATIVA OU FALSE
export async function byMentorListService() {
    try {
        const data = await searchMentorRequest();
        return { success: true, data };
    } catch (error: any) {
        return {
            success: false,
            message:
                error.response?.data?.message ||
                'Erro ao buscar lista de mentores.',
        };
    }
}

export async function byIdMentorService(id: string) {
    try {
        const data = await searchByNivelMentorRequest(id);
        return { success: true, data };
    } catch (error: any) {
        return {
            success: false,
            message:
                error.response?.data?.message || 'Erro ao buscar mentores.',
        };
    }
}

//BUSCA TODOS OS HORARIOS DISPONIVEIS E RESERVADOS DO MENTOR
export async function searchTotalTimeWeekdayService(mentor_id_param: number) {
    try {
        const data = await searchTotalTimeWeekdayRequest(mentor_id_param);

        return { success: true, data };
    } catch (error: any) {
        return {
            success: false,
            message:
                error.response?.data?.message ||
                'Erro ao buscar o total de horarios disponiveis e reservado do mentor',
        };
    }
}

//BUSCAR MENTOR/ALUNO SE TEM PENDÊNCIA DE CONFIRMAÇÃO/NEGAÇÃO DE CONCLUIR A AULA
export async function searchPendingConfirmationService(
    p_user_id: number,
    p_role: string,
) {
    try {
        const data = await searchPendingConfirmationRequest(p_user_id, p_role);

        return { success: true, data };
    } catch (error: any) {
        return {
            success: false,
            message:
                error.response?.data?.message ||
                'Erro ao buscar pendências de confirmação ou negação das aulas.',
        };
    }
}

// ALUNO/MENTOR CONFIRMA OU NEGA NO MODAL A CONCLUSAO DA AULA

export async function postConfirmationClassService(
    p_booking_id: number,
    p_user_id: number,
    p_role: string,
    p_confirmed: boolean,
) {
    try {
        const data = await postConfirmationClassRequest(
            p_booking_id,
            p_user_id,
            p_role,
            p_confirmed,
        );

        return { success: true, data };
    } catch (error: any) {
        return {
            success: false,
            message:
                error.response?.data?.message ||
                'Erro ao confirmar ou negar se a aula foi concluída ou não.',
        };
    }
}
