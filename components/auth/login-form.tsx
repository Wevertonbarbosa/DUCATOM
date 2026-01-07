'use client';

import { LoginHeader } from './login-header';
import { LoginInputs } from './login-inputs';
import { LoginActions } from './login-actions';
import { useLogin } from '@/hooks/useLogin';
import { useState } from 'react';

export function LoginForm() {
    const { handleLogin, loading } = useLogin();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function onSubmit() {
        handleLogin(email, password);
    }

    return (
        <div className="w-full max-w-md mx-auto space-y-8">
            <LoginHeader />
            <LoginInputs
                email={email}
                password={password}
                setEmail={setEmail}
                setPassword={setPassword}
            />
            
            <LoginActions onSubmit={onSubmit} loading={loading} />
        </div>
    );
}
