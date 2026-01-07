import { ListMentor } from '@/model/user-model';
import { searchListMentor_Agenda_Service } from '@/service/list-mentor_details.service';
import { useState } from 'react';
import { toast } from 'sonner';

export function useListMentorUser() {
    const [loading, setLoading] = useState(false);
    const [mentores, setMentores] = useState<any[]>([]);

    async function listMentor() {
        setLoading(true);

        try {
            const response = await searchListMentor_Agenda_Service();

            if (!response.success) {
                toast.error(
                    response.message || 'Erro ao carregar lista de mentores.'
                );
                return;
            }

            const data = response.data || [];

        
            const formatado = data.map((m: ListMentor) => ({
                id: m.id,
                nome: m.nome,
                especialidade: m.especialidade,
                nivel: m.nivel,
                agenda_publicada: m.agenda_publicada,
                agenda_mentor: m.agenda_mentor || [],
            }));

            setMentores(formatado);
        } catch (error: any) {
            toast.error(
                error?.message || 'Erro ao carregar lista de mentores.'
            );
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        mentores,
        listMentor,
    };
}
