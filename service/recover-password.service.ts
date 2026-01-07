import { supabaseResetPasswordRequest } from '@/api/endpoints/supabaseAuth.endpoint';

export async function recoverPasswordRequest(email: string) {
   
    try {
        const data = await supabaseResetPasswordRequest(email);

        return { success: true, data };
    } catch (error: any) {
        return {
            success: false,
            message:
                error.response?.data?.message ||
                'Erro em enviar o email para redefinir senha.',
        };
    }
}
