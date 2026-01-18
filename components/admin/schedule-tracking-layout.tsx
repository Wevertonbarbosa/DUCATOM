'use client';

import { useEffect, useRef, useState } from 'react';
import { ScheduleTrackingHeader } from './schedule-tracking-header';
import { ScheduleStats } from './schedule-stats';
import { ScheduleGrid } from './schedule-grid';
import { ScheduleStatsSkeleton } from './scheduleStatsSkeleton';

import { useDashboardAdmin } from '@/hooks/useDashboard_Admin';
import { useMentorAgendaGrid } from '@/hooks/useMentorAgendaGrid';
import { StudentsBookingsList } from './students-bookings-list';

export function ScheduleTrackingLayout() {
    const [activeTab, setActiveTab] = useState<'alunos' | 'mentores'>(
        'mentores'
    );
    const [selectedMentor, setSelectedMentor] = useState<string>();
    const [selectedStudent, setSelectedStudent] = useState<string>();
    const [mentorId, setMentorId] = useState<number | null>(null);
    const [studentId, setStudentId] = useState<number | null>(null);

    /* =======================
        Hooks
    ======================= */
    const {
        loading: dashboardLoading,
        mentorData,
        studentData,
        byListStudenteAdmin,
        scheduleStats,
        byListMentorAdmin,
        getMentorScheduleStats,
    } = useDashboardAdmin();

    const {
        loading: gridLoading,
        agendaGrid,
        getMentorAgendaGrid,
    } = useMentorAgendaGrid();

    /* =======================
        Load inicial (mentores)
    ======================= */
    const didRun = useRef(false);

    useEffect(() => {
        if (didRun.current) return;
        didRun.current = true;

        byListMentorAdmin();
    }, [activeTab, byListMentorAdmin]);

    const didLoadStudents = useRef(false);

    useEffect(() => {
        if (activeTab === 'alunos' && !didLoadStudents.current) {
            didLoadStudents.current = true;
            byListStudenteAdmin();
        }
    }, [activeTab, byListStudenteAdmin]);

    /* =======================
        Seleção de mentor
    ======================= */
    function handleMentorChange(value: string) {
        const id = Number(value);

        setSelectedMentor(value);
        setMentorId(id);

        getMentorScheduleStats(id);
        getMentorAgendaGrid(id);
    }

    /* =======================
        Seleção de aluno
    ======================= */
    function handleStudentChange(value: string) {
        const id = Number(value);

        setSelectedStudent(value);
        setStudentId(id);
    }

    const hasMentorSelected = mentorId !== null;

    // const hasStudentSelected = studentId !== null;

    return (
        <div className="min-h-screen bg-[#083d71] text-white p-4 md:p-6 lg:p-8">
            <div className="max-w-[1400px] mx-auto space-y-6">
                {/* HEADER */}
                <ScheduleTrackingHeader
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    mentors={mentorData ?? []}
                    selectedMentor={selectedMentor}
                    onMentorChange={handleMentorChange}
                    student={studentData ?? []}
                    selectedStudent={selectedStudent}
                    onStudentChange={handleStudentChange}
                    loading={dashboardLoading}
                />

                {activeTab === 'mentores' && (
                    <>
                        {/* STATS */}
                        {dashboardLoading && hasMentorSelected && (
                            <ScheduleStatsSkeleton />
                        )}

                        {!dashboardLoading &&
                            scheduleStats &&
                            hasMentorSelected && (
                                <ScheduleStats
                                    availableSlots={
                                        scheduleStats.total_horarios
                                    }
                                    reservedSlots={
                                        scheduleStats.total_reservados
                                    }
                                    selectedMentor={selectedMentor}
                                />
                            )}

                        {/* GRID LOADING */}
                        {gridLoading && hasMentorSelected && (
                            <div className="h-80 bg-[#0a4d8f]/30 rounded-xl animate-pulse" />
                        )}

                        {/* GRID */}
                        {!gridLoading &&
                            agendaGrid &&
                            agendaGrid.agenda_publicada &&
                            agendaGrid.days && (
                                <ScheduleGrid
                                    agenda={agendaGrid.days}
                                    mentor={mentorData ?? []}
                                />
                            )}

                        {/* AGENDA NÃO PUBLICADA */}
                        {!gridLoading &&
                            agendaGrid &&
                            !agendaGrid.agenda_publicada && (
                                <div className="flex flex-col items-center justify-center min-h-[300px] bg-[#0a4d8f]/30 rounded-xl border-2 border-dashed border-[#0a4d8f] p-8">
                                    <p className="text-yellow-400 font-semibold text-lg">
                                        Este mentor não possui agenda publicada
                                    </p>
                                    <p className="text-gray-300 text-sm mt-2">
                                        O mentor precisa ter no mínimo 6
                                        horários disponíveis.
                                    </p>
                                </div>
                            )}

                        {/* ESTADO INICIAL */}
                        {!hasMentorSelected && (
                            <div className="flex flex-col items-center justify-center min-h-[400px] bg-[#0a4d8f]/30 rounded-xl border-2 border-dashed border-[#0a4d8f] p-8">
                                <div className="text-center space-y-4 max-w-md">
                                    <div className="w-16 h-16 mx-auto bg-[#0a4d8f] rounded-full flex items-center justify-center">
                                        <svg
                                            className="w-8 h-8 text-[#f0e087]"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                    </div>

                                    <h3 className="text-xl font-semibold text-[#f0e087]">
                                        Selecione um Mentor
                                    </h3>

                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        Para visualizar os horários disponíveis,
                                        reservados ou cancelados, selecione um
                                        mentor no filtro acima.
                                    </p>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* TELA DO ALUNO COM SUAS INFORMACOES */}
                {activeTab === 'alunos' && (
                    <>
                        <StudentsBookingsList studentId={studentId} />
                    </>
                )}
            </div>
        </div>
    );
}
