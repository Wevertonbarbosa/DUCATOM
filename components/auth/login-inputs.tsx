'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import Link from "next/link"
import { Label } from '@/components/ui/label';
import { LoginInputsProps } from '@/model/login-model';

export function LoginInputs({
    email,
    password,
    setEmail,
    setPassword,
}: LoginInputsProps) {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="email" className="sr-only">
                    Email
                </Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#0a4d8f] border-[#0a4d8f] text-white placeholder:text-gray-400 focus-visible:ring-[#f0e087] h-12 md:h-14"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="password" className="sr-only">
                    Senha
                </Label>
                <Input
                    id="password"
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-[#0a4d8f] border-[#0a4d8f] text-white placeholder:text-gray-400 focus-visible:ring-[#f0e087] h-12 md:h-14"
                />
            </div>

            <div className="flex justify-end pt-1">
                <Link
                    href="/esqueceu-senha"
                    className="text-xs md:text-sm text-gray-300 hover:text-[#f0e087] transition-colors"
                >
                    Esqueceu sua senha?
                </Link>
            </div>
        </div>
    );
}
