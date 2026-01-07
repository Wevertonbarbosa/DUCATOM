'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail } from 'lucide-react';

interface ForgotPasswordInputProps {
    email: string;
    setEmail: (value: string) => void;
}

export function ForgotPasswordInput({
    email,
    setEmail,
}: ForgotPasswordInputProps) {

    return (
        <div className="space-y-2">
            <Label htmlFor="email" className="sr-only">
                Email
            </Label>
            <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                    id="email"
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#0a4d8f] border-[#0a4d8f] text-white placeholder:text-gray-400 focus-visible:ring-[#f0e087] h-12 md:h-14 pl-12"
                />
            </div>
        </div>
    );
}
