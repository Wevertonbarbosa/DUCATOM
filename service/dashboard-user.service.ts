import {
    getByIdMentorRequest,
    getHistoryStudentByIdRequest,
    searchByIdStudentRequest,
    searchByNivelMentorRequest,
    searchMentorRequest,
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
            message:
                error.response?.data?.message ||
                'Erro ao buscar aluno.',
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
