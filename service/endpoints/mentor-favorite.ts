import { supabaseAuth } from './supabaseAuth.api';

//POST ALUNO FAVORITA UM MENTOR
export async function favoriteMentorRequest(
    aluno_id: number,
    mentor_id: number,
    favoritado: boolean
) {
    const url = '/rest/v1/mentores_favorito';

    const response = await supabaseAuth.post(
        url,
        {
            aluno_id,
            mentor_id,
            favoritado,
        },
        {
            params: {
                on_conflict: 'aluno_id,mentor_id',
            },
            headers: {
                Prefer: 'resolution=merge-duplicates,return=representation',
            },
        }
    );

    return response.data;
}

//GET ALUNO BUSCA MENTORES FAVORITOS
export async function searchMentorByFavoriteRequest(id: number) {
    const url = '/rest/v1/mentores_favorito';

    const response = await supabaseAuth.get(url, {
        params: {
            aluno_id: `eq.${id}`,
        },
    });

    return response.data;
}
