import { ShieldCheck } from 'lucide-react';

export function ResetPasswordHeader() {
    return (
        <div className="text-center space-y-4">
            <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-[#f0e087]/10 flex items-center justify-center">
                    <ShieldCheck className="w-10 h-10 text-[#f0e087]" />
                </div>
            </div>
            <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                    Redefinir Senha
                </h1>
                <p className="text-sm md:text-base text-white/70">
                    Digite sua nova senha para redefinir o acesso à sua conta
                </p>
            </div>
        </div>
    );
}
