import {
    favoriteMentorRequest,
    searchMentorByFavoriteRequest,
} from '@/service/endpoints/mentor-favorite';

//POST ALUNO FAVORITA UM MENTOR
export async function favoriteMentorService(
    aluno_id: number,
    mentor_id: number,
    favoritado: boolean
) {
    try {
        const data = await favoriteMentorRequest(
            aluno_id,
            mentor_id,
            favoritado
        );

        return { success: true, data };
    } catch (error: any) {
        return {
            success: false,
            message:
                error.response?.data?.message ||
                'Erro ao favoritar/desfavoritar mentor',
        };
    }
}

//GET ALUNO BUSCA MENTORES FAVORITOS
export async function searchMentorByFavoriteService(id: number) {
    try {
        const data = await searchMentorByFavoriteRequest(id);
        return { success: true, data };
    } catch (error: any) {
        return {
            success: false,
            message:
                error.response?.data?.message ||
                'Erro ao buscar mentores favoritados',
        };
    }
}
