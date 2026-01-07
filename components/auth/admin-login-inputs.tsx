'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock } from 'lucide-react';

interface AdminLoginInputsProps {
    email: string;
    setEmail: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
}

export function AdminLoginInputs({
    email,
    setEmail,
    password,
    setPassword,
}: AdminLoginInputsProps) {
    return (
        <div className="space-y-5 md:space-y-6">
            <div className="space-y-2">
                <Label
                    htmlFor="admin-email"
                    className="text-white text-sm md:text-base"
                >
                    Email do Administrador
                </Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                    <Input
                        id="admin-email"
                        type="email"
                        placeholder="admin@exemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-[#0a2948] border-[#1a4d7a] text-white placeholder:text-white/40 pl-11 h-12 md:h-14 text-base"
                        required
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label
                    htmlFor="admin-password"
                    className="text-white text-sm md:text-base"
                >
                    Senha do Administrador
                </Label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                    <Input
                        id="admin-password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-[#0a2948] border-[#1a4d7a] text-white placeholder:text-white/40 pl-11 h-12 md:h-14 text-base"
                        required
                    />
                </div>
            </div>
        </div>
    );
}
