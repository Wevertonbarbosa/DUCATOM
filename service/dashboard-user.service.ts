import {
    searchByIdStudentRequest,
    searchByNivelMentorRequest,
    searchMentorRequest,
} from '@/api/endpoints/dashboard-users.endpoint';

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
