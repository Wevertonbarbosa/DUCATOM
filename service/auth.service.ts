import { supabaseLoginRequest } from '@/api/endpoints/supabaseAuth.endpoint';

export async function loginService(email: string, password: string) {
    try {
        const data = await supabaseLoginRequest(email, password);

        return { success: true, data };
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'Erro ao realizar login',
        };
    }
}
