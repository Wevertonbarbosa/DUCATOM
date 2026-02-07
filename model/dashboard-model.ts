export interface DashboardGreetingProps {
    name: string;
    credits?: number;
    nivel?: number;
    especialidade?: string;
}
export interface PendingBooking {
    booking_id: number;
    booking_date: string;
    start_time: string;
    mentor_id: number;
    aluno_id: number;
    status: string;
    aluno_confirmacao: boolean | null;
    mentor_confirmacao: boolean | null;
}
