'use client';

import { useState, useEffect, useRef } from 'react';
import { ScheduleControlHeader } from './schedule-control-header';
import { AvailableTimesSection } from './available-times-section';
import { ScheduleWarning } from './schedule-warning';
import { ScheduleActions } from './schedule-actions';
import { ScheduleBackButton } from './schedule-back-button';

import {
    useDeleteTimeSlotMentor,
    useGetWeekDay_timeSlotMentor,
} from '@/hooks/useAvailabilityMentor';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { usePublishAgendaMentor } from '@/hooks/usePublishAgendaMentor';
import { MentorData } from '@/model/user-model';

export function ScheduleControlLayout() {
    const { searchWeekDay_timeSlot_Mentor, timeSlots, loading } =
        useGetWeekDay_timeSlotMentor();
    const { publishAgendaMentor, loading: loadingPublish } =
        usePublishAgendaMentor();
    const { deleteTimeSlot, loadingDelete } = useDeleteTimeSlotMentor();
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);
    const [mentorUser, setMentorUser] = useState<MentorData>();

    const [agendaPublicada, setAgendaPublicada] = useState(false);

    const didRun = useRef(false);

    useEffect(() => {
        if (didRun.current) return;
        didRun.current = true;

        const saved = localStorage.getItem('mentor_id');
        if (saved) {
            const mentor = JSON.parse(saved);
            setMentorUser(mentor);

            setAgendaPublicada(mentor.agenda_publicada === true);
            searchWeekDay_timeSlot_Mentor(mentor?.id);
        }
    }, []);

    // 📌 Abre o Dialog e guarda o ID do slot
    const handleRemoveTimeSlot = (id: number) => {
        setSelectedSlotId(id);
        setOpenDialog(true);
    };

    // 📌 Confirma remoção
    const confirmDelete = async () => {
        if (!selectedSlotId) return;

        await deleteTimeSlot(selectedSlotId);

        // Recarrega lista
        if (!mentorUser?.id) {
            throw new Error('ID do mentor não encontrado');
        }
        await searchWeekDay_timeSlot_Mentor(mentorUser?.id);

        console.log(timeSlots.length);

        if (timeSlots.length <= 6) {
            setAgendaPublicada(false);

            localStorage.setItem(
                'mentor_id',
                JSON.stringify({
                    ...mentorUser,
                    agenda_publicada: false,
                })
            );
        }

        // Fecha modal e limpa estado
        setOpenDialog(false);
        setSelectedSlotId(null);
    };

    // 📌 CONFIRMAR AGENDA (PUBLICAÇÃO OFICIAL)
    const handleConfirmAgenda = async () => {
        if (!mentorUser?.id) {
            console.error('Mentor ID não encontrado no localStorage');
            return;
        }

        if (timeSlots.length < 6) return;

        const success = await publishAgendaMentor(mentorUser?.id);
        console.log(success);

        setAgendaPublicada(true);

        localStorage.setItem(
            'mentor_id',
            JSON.stringify({
                ...mentorUser,
                agenda_publicada: true,
            })
        );
    };

    const hasMinimumSlots = timeSlots.length >= 6;

    return (
        <div className="min-h-screen bg-[#083d71] flex items-center justify-center p-4">
            <div className="w-full max-w-2xl space-y-6 py-8">
                <ScheduleControlHeader />

                {loading ? (
                    <p className="text-center text-white">Carregando...</p>
                ) : (
                    <AvailableTimesSection
                        timeSlots={timeSlots}
                        onRemoveSlot={handleRemoveTimeSlot}
                    />
                )}

                {!hasMinimumSlots && (
                    <ScheduleWarning slotsCount={timeSlots.length} />
                )}

                <div className="flex flex-col justify-center items-center py-2">
                    <h2 className="text-white text-2xl font-bold">
                        Sua agenda está:
                    </h2>
                    <span
                        className={`text-xl font-semibold ${
                            agendaPublicada ? 'text-green-400' : 'text-red-400'
                        }`}
                    >
                        {agendaPublicada ? 'Ativa' : 'Desativada'}
                    </span>
                </div>

                <ScheduleActions
                    onCancelClick={() => {}}
                    onConfirmClick={handleConfirmAgenda}
                    confirmDisabled={!hasMinimumSlots || loadingPublish}
                />

                <ScheduleBackButton />
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="bg-white">
                    <DialogHeader>
                        <DialogTitle>Confirmar exclusão</DialogTitle>
                        <DialogDescription>
                            Tem certeza que deseja remover este horário?<br /> Lembrando, caso sua agenda tenha menos de 6 horários disponíveis, ela deixará de ser divulgada.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setOpenDialog(false)}
                            disabled={loadingDelete}
                        >
                            Cancelar
                        </Button>

                        <Button
                            variant="destructive"
                            onClick={confirmDelete}
                            disabled={loadingDelete}
                        >
                            {loadingDelete ? 'Removendo...' : 'Confirmar'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
