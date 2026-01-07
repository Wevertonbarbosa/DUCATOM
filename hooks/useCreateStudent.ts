'use client';

import { useState } from 'react';
import { createStudentService } from '@/service/create-user.service';
import { toast } from 'sonner';

export function useCreateStudent() {
    const [loading, setLoading] = useState(false);

    async function createStudent(
        name: string,
        email: string,
        password: string
    ) {
        try {
            setLoading(true);

            const result = await createStudentService(name, email, password);

            if (!result.success) {
                toast.error(result.message || 'Erro no cadastro do aluno.');
                return null;
            }

            toast.success('Aluno criado com sucesso!');

            return result.data;
        } catch (error: any) {
            toast.error(error?.message || 'Tente novamente mais tarde.');
            return null;
        } finally {
            setLoading(false);
        }
    }

    return {
        createStudent,
        loading,
    };
}
