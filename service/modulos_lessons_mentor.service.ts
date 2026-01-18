import {
    getMentorLessonRequest,
    searchLessonRequest,
    searchModulosRequest,
    sendMentorLessonRequest,
    updateMentorLessonStatusFeedbackRequest,
    updateMentorLessonStatusRequest,
} from '@/api/endpoints/module-lesson-mentor';

//BUSCA TODOS OS MODULOS DAS AULAS
export async function searchModulosService() {
    try {
        const data = await searchModulosRequest();
        return { success: true, data };
    } catch (error: any) {
        return {
            success: false,
            message:
                error.response?.data?.message || 'Erro na busca dos modulos',
        };
    }
}

// BUSCA AS AULAS DO MODULO SELECIONADO E SEU STATUS PARA O MENTOR SELECIONADO
export async function searchLessonService(
    p_mentor_id: number,
    p_modulo_id: number,
) {
    try {
        const data = await searchLessonRequest(p_mentor_id, p_modulo_id);

        return { success: true, data };
    } catch (error: any) {
        return {
            success: false,
            message:
                error.response?.data?.message ||
                'Erro em buscar as aulas e seu status do mentor selecionado',
        };
    }
}

// BUSCA O PROGRESSO DAS AULAS DO MENTOR
export async function getMentorLessonService(
    aula_id: number,
    mentor_id: number,
) {
    try {
        const data = await getMentorLessonRequest(aula_id, mentor_id);
        return { success: true, data };
    } catch (error: any) {
        return {
            success: false,
            message:
                error.response?.data?.message ||
                'Erro para buscar o progresso da aula do mentor',
        };
    }
}

// REGISTRA QUE O MENTOR ABRIU A AULA PELA PRIMEIRA VEZ E UMA UNICA VEZ
export async function sendMentorLessonService(
    aula_id: number,
    mentor_id: number,
) {
    try {
        const data = await sendMentorLessonRequest(aula_id, mentor_id);

        return { success: true, data };
    } catch (error: any) {
        return {
            success: false,
            message:
                error.response?.data?.message ||
                'Erro em registrar a abertura da aula do mentor selecionado',
        };
    }
}

// MENTOR ENVIA O VIDEO DA AULA PARA O ADMIN
export async function updateMentorLessonStatusService(
    aula_id: number,
    mentor_id: number,
    status: string,
) {
    try {
        const data = await updateMentorLessonStatusRequest(
            aula_id,
            mentor_id,
            status,
        );

        return { success: true, data };
    } catch (error: any) {
        return {
            success: false,
            message:
                error.response?.data?.message ||
                'Erro ao atualizar status da aula',
        };
    }
}

//ADMIN NEGA OU APROVA A AULA DO MENTOR
export async function updateMentorLessonStatusFeedbackService(
    aula_id: number,
    mentor_id: number,
    status: 'aprovado' | 'negado',
    feedback_admin?: string,
) {
    try {
        const data = await updateMentorLessonStatusFeedbackRequest(
            aula_id,
            mentor_id,
            status,
            feedback_admin
        );

        return { success: true, data };
    } catch (error: any) {
        return {
            success: false,
            message:
                error.response?.data?.message ||
                'Erro ao aprovar ou negar a aula do mentor',
        };
    }
}
