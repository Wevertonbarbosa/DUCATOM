import { supabaseAuth } from '@/service/endpoints/supabaseAuth.api';

//LOGIN
export async function supabaseLoginRequest(email: string, password: string) {
    const url = `/auth/v1/token?grant_type=password`;
    const body = { email, password };

    const resp = await supabaseAuth.post<any>(url, body);
    return resp.data;
}
//RESET PASSWORD
export async function supabaseResetPasswordRequest(email: string) {
    const url = `/auth/v1/recover`;
    const body = { email };

    const resp = await supabaseAuth.post<any>(url, body);
    return resp.data;
}
