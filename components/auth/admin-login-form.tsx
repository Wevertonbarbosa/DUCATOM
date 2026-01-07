'use client';

import type React from 'react';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AdminLoginHeader } from './admin-login-header';
import { AdminLoginInputs } from './admin-login-inputs';
import { AdminLoginActions } from './admin-login-actions';
import { useAdminLogin } from '@/hooks/useAdminLogin';

export function AdminLoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const accountType = searchParams.get('type'); // 'aluno' ou 'mentor'

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { handleAdminLogin, loading } = useAdminLogin();

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        handleAdminLogin(email, password, accountType);
    }

    const handleCancel = () => {
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-[#083d71] flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8 md:space-y-10">
                <AdminLoginHeader accountType={accountType} />

                <form onSubmit={onSubmit} className="space-y-6 md:space-y-8">
                    <AdminLoginInputs
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                    />

                    <AdminLoginActions
                        loading={loading}
                        onCancel={handleCancel}
                    />
                </form>
            </div>
        </div>
    );
}
