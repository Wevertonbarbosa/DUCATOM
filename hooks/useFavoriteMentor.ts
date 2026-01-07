import { MentorFavorite } from '@/model/mentor-favorite';
import {
    favoriteMentorService,
    searchMentorByFavoriteService,
} from '@/service/mentor-favorite.service';
import { useState } from 'react';
import { toast } from 'sonner';

//POST CADASTRA OS HORARIOS DISPONIVEL DO MENTOR
export function useFavoriteMentor() {
    const [loading, setLoading] = useState(false);

    async function createFavoriteMentor(
        aluno_id: number,
        mentor_id: number,
        favoritado: boolean
    ) {
        setLoading(true);

        const result = await favoriteMentorService(
            aluno_id,
            mentor_id,
            favoritado
        );

        if (!result.success) {
            toast.error(result.message || 'Erro ao atualizar favorito.');
            setLoading(false);
            return null;
        }

        toast.success(
            favoritado
                ? 'Mentor favoritado com sucesso!'
                : 'Mentor removido dos favoritos!'
        );

        setLoading(false);
        return result.data;
    }

    return {
        createFavoriteMentor,
        loading,
    };
}

//GET ALUNO BUSCA MENTORES FAVORITOS
export function useGetMentorFavorite() {
    const [loading, setLoading] = useState(false);
    const [mentorFavoriteData, setMentorFavorite] = useState<MentorFavorite[]>(
        []
    );

    async function searchMentorFavorite(id: number) {
        try {
            setLoading(true);

            if (!id) {
                throw new Error('ID do aluno não encontrado');
            }

            const result = await searchMentorByFavoriteService(id);

            if (!result.success) {
                toast.error(
                    result.message || 'Erro ao buscar mentores favoritados.'
                );

                setLoading(false);
                return null;
            }

            setMentorFavorite(result.data);

            setLoading(false);
        } catch (error: any) {
            toast.error(error?.message || 'Tente novamente mais tarde.');
            return null;
        } finally {
            setLoading(false);
        }
    }

    return {
        searchMentorFavorite,
        mentorFavoriteData,
        loading,
    };
}
