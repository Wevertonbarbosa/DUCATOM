'use client';

import { useState } from 'react';
import { createMentorService } from '@/service/create-user.service';
import { toast } from 'sonner';



export function useCreateMentor() {
    const [loading, setLoading] = useState(false);

    async function createMentor(name: string, email: string, password: string) {
        setLoading(true);

        const result = await createMentorService(name, email, password);

        if (!result?.success) {
            toast.error(result?.message || 'Erro no cadastro do Mentor.');

            setLoading(false);
            return null;
        }

        toast.success('Mentor criado com sucesso!');

        setLoading(false);
        return result.data;
    }

    return {
        createMentor,
        loading,
    };
}
