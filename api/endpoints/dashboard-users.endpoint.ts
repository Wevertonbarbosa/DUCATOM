import { supabaseAuth } from '@/api/supabaseAuth.api';

//BUSCA ALUNOS POR ID
export async function searchByIdStudentRequest(id: string) {
    const url = '/rest/v1/aluno';

    const response = await supabaseAuth.get(url, {
        params: {
            auth_id: `eq.${id}`,
            select: '*',
        },
    });

    return response.data;
}

export async function searchMentorRequest() {
    const url = '/rest/v1/mentor';

    const response = await supabaseAuth.get(url, {
        params: {
            select: '*',
        },
    });

    return response.data;
}

//GET BUSCAR MENTOR POR ID
export async function searchByNivelMentorRequest(id: string) {
    const url = '/rest/v1/mentor';

    const response = await supabaseAuth.get(url, {
        params: {
            profile_id: `eq.${id}`,
            select: '*',
        },
    });

    return response.data;
}
