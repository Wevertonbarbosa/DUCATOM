'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, X } from 'lucide-react';

interface AdminLoginActionsProps {
    onCancel: () => void;
    loading: boolean;
}

export function AdminLoginActions({
    onCancel,
    loading,
}: AdminLoginActionsProps) {
    return (
        <div className="space-y-4">
            <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#f0e087] hover:bg-[#f0e087]/90 text-[#083d71] font-semibold h-12 md:h-14 text-base md:text-lg rounded-lg transition-all duration-300 hover:scale-[1.02]"
            >
                {loading ? 'Validando...' : 'Validar e Continuar'}
                {!loading && <ArrowRight className="ml-2 w-5 h-5" />}
            </Button>

            <Button
                type="button"
                onClick={onCancel}
                variant="ghost"
                disabled={loading}
                className="w-full text-white hover:text-[#f0e087] hover:bg-white/5 h-11 md:h-12 text-sm md:text-base transition-colors"
            >
                <X className="mr-2 w-4 h-4" />
                Cancelar
            </Button>
        </div>
    );
}
