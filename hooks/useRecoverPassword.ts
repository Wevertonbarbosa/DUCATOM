import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { recoverPasswordRequest } from '@/service/recover-password.service';

export function useRecoverPassword() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleRecover(email: string) {
        setLoading(true);
        
        try {
            await recoverPasswordRequest(email);
            toast.success(
                'Obrigado! Verifique seu email para redefinir a senha'
            );
            router.push('/email-enviado');
        } catch (err: any) {
            toast.error('Erro ao enviar email de recuperação.');
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        handleRecover,
    };
}
