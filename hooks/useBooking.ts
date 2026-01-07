import { createBookingAgendaService } from '@/service/create-booking.service';
import { useState } from 'react';
import { toast } from 'sonner';

export function useCreateBookingAgenda() {
    const [loading, setLoading] = useState(false);

    async function createBooking(
        aluno_id: number,
        mentor_id: number,
        weekday_id: number,
        mentor_time_slot_id: number,
        status: string,
        video_link: string
    ) {
        setLoading(true);

        try {
            if (!mentor_id || aluno_id) {
                toast.error('ID do mentor ou do aluno não encontrado');
                console.error('mentor ID ', mentor_id, 'Aluno ID ', aluno_id);
                setLoading(false);
                return null;
            }

            const result = await createBookingAgendaService(
                aluno_id,
                mentor_id,
                weekday_id,
                mentor_time_slot_id,
                status,
                video_link
            );

            if (!result.success) {
                toast.error(
                    result.message || 'Erro na reserva da aula com mentor.'
                );
                setLoading(false);
                return null;
            }

            toast.success('Aula reservada com mentor!');
            setLoading(false);
            return result.data;
        } catch (error) {
            toast.error('Erro inesperado ao reserva aula.');
            setLoading(false);
            return null;
        }
    }

    return {
        createBooking,
        loading,
    };
}
