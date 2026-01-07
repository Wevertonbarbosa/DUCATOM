'use client';

import { ResetPasswordHeader } from './reset-password-header';
import { ResetPasswordInputs } from './reset-password-inputs';
import { ResetPasswordActions } from './reset-password-actions';
import { ResetPasswordProvider } from '@/feature/reset-password-context';

export function ResetPasswordForm() {
    return (
        <ResetPasswordProvider>
            <div className="w-full max-w-md mx-auto space-y-8">
                <ResetPasswordHeader />
                <ResetPasswordInputs />
                <ResetPasswordActions />
            </div>
        </ResetPasswordProvider>
    );
}
