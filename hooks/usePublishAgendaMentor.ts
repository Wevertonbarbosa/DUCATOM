import { createAgendaMentorService } from '@/service/availability-mentor.service';
import { useState } from 'react';
import { toast } from 'sonner';

export function usePublishAgendaMentor() {
    const [loading, setLoading] = useState(false);

    async function publishAgendaMentor(mentorId: number) {
        setLoading(true);

        try {
            if (!mentorId) {
                toast.error('ID do mentor não encontrado.');
                setLoading(false);
                return null;
            }

            const result = await createAgendaMentorService(mentorId);

            if (!result.success) {
                toast.error(
                    result.message || 'Erro ao confirmar agenda do mentor.'
                );
                setLoading(false);
                return null;
            }

            toast.success('Agenda confirmada com sucesso!');
            setLoading(false);
            return result.data;
        } catch (error) {
            toast.error('Erro inesperado ao confirmar agenda.');
            setLoading(false);
            return null;
        }
    }

    return {
        publishAgendaMentor,
        loading,
    };
}
