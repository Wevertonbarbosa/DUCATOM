import { AgendaMentor } from "./agenda-mentor";

export interface UserModel {
    id: string;
    email: string;
    nome: string;
    role: string;
}

export interface StudentData {
    id: number;
    credito: number;
    free_assinatura: boolean;
    nome: string;
}

export interface MentorData {
    id: number;
    nivel: number;
    especialidade: string;
    nome: string;
}

export interface WeekDayData {
    id: number;
    mentor_id: number;
    weekday: number;
}

export interface ListMentor {
    id: string;
    nome: string;
    especialidade: string;
    nivel: number;
    avatar?: string;
    isFavorite?: boolean;
    agenda_publicada: boolean;
    agenda_mentor: AgendaMentor[];
}
