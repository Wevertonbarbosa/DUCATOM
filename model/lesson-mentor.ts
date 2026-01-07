export type LessonStatus = 'em aberto' | 'em análise' | 'negado' | 'aprovado';

export interface Lesson {
    id: string;
    title: string;
    status: LessonStatus;
    videoUrl?: string;
}

export interface Module {
    id: string;
    title: string;
    nivel: number;
    lessons: Lesson[];
}
