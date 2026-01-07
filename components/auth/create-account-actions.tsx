'use client';

import { Button } from '@/components/ui/button';
import { UserPlus, X, Loader2 } from 'lucide-react';

interface CreateAccountActionsProps {
    onCancel: () => void;
    loading?: boolean;
}

export function CreateAccountActions({
    onCancel,
    loading = false,
}: CreateAccountActionsProps) {
    return (
        <div className="space-y-4 pt-2">
            <Button
                type="submit"
                disabled={loading}
                className="
                    w-full 
                    bg-[#f0e087] 
                    hover:bg-[#f0e087]/90 
                    text-[#083d71] 
                    font-semibold 
                    h-12 md:h-14 
                    text-base md:text-lg 
                    rounded-lg 
                    transition-all 
                    duration-300 
                    hover:scale-[1.02] 
                    disabled:opacity-70 
                    disabled:cursor-not-allowed 
                    flex items-center justify-center
                "
            >
                {loading ? (
                    <>
                        <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                        Criando...
                    </>
                ) : (
                    <>
                        <UserPlus className="mr-2 w-5 h-5" />
                        Criar Conta
                    </>
                )}
            </Button>

            <Button
                type="button"
                onClick={onCancel}
                disabled={loading}
                variant="ghost"
                className="
                    w-full 
                    text-white 
                    hover:text-[#f0e087] 
                    hover:bg-white/5 
                    h-11 md:h-12 
                    text-sm md:text-base 
                    transition-colors
                    disabled:opacity-50 
                    disabled:cursor-not-allowed
                "
            >
                <X className="mr-2 w-4 h-4" />
                Cancelar
            </Button>
        </div>
    );
}
