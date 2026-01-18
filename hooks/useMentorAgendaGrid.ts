import { MentorAgendaGridResponse } from '@/model/grid_mentor-model';
import { byGridMentorService } from '@/service/mentor-admin_grid.service';
import { useState } from 'react';
import { toast } from 'sonner';



export function useMentorAgendaGrid() {
    const [loading, setLoading] = useState(false);
    const [agendaGrid, setAgendaGrid] =
        useState<MentorAgendaGridResponse | null>(null);

    async function getMentorAgendaGrid(mentorId: number) {
        setLoading(true);
        try {
            const response = await byGridMentorService(mentorId);

            if (!response.success) {
                toast.error(
                    response.message || 'Erro ao buscar agenda do mentor.'
                );
                return;
            }

            setAgendaGrid(response.data ?? null);
        } catch (error: any) {
            toast.error(error?.message || 'Erro ao buscar agenda do mentor.');
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        agendaGrid,
        getMentorAgendaGrid,
    };
}
