import {
    createAdminRequest,
    createMentorRequest,
    createStudentRequest,
} from '@/service/endpoints/create-user.api';

const errorMessages: Record<string, string> = {
    user_already_exists: 'Este e-mail já está cadastrado na plataforma.',
    invalid_email: 'E-mail inválido.',
    weak_password: 'A senha deve ser mais forte.',
};

export async function createStudentService(
    name: string,
    email: string,
    password: string,
) {
    try {
        const data = await createStudentRequest(name, email, password);
        return { success: true, data };
    } catch (error: any) {
        if (error.error.error_code) {
            return {
                success: false,
                message:
                    errorMessages[error.error.error_code] ||
                    'Erro ao realizar cadastro do Aluno.',
            };
        }
    }
}

export async function createMentorService(
    name: string,
    email: string,
    password: string,
) {
    try {
        const data = await createMentorRequest(name, email, password);
        return { success: true, data };
    } catch (error: any) {
        if (error.error.error_code) {
            return {
                success: false,
                message:
                    errorMessages[error.error.error_code] ||
                    'Erro ao realizar cadastro de Mentor.',
            };
        }
    }
}

export async function createAdminService(
    name: string,
    email: string,
    password: string,
) {
    try {
        const data = await createAdminRequest(name, email, password);
        return { success: true, data };
    } catch (error: any) {
        if (error.error.error_code) {
            return {
                success: false,
                message:
                    errorMessages[error.error.error_code] ||
                    'Erro ao realizar cadastro do Administrador.',
            };
        }
    }
}
