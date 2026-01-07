'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function SchedulingSuccessActions() {
    const router = useRouter();

    const handleGoToDashboard = () => {
        router.push('/dashboard');
    };

    return (
        <div className="w-full pt-4">
            <Button
                onClick={handleGoToDashboard}
                className="w-full bg-[#f0e087] hover:bg-[#e5d67a] text-[#083d71] font-bold text-base md:text-lg py-6 md:py-7 rounded-xl transition-colors"
            >
                Voltar para página inicial
            </Button>
        </div>
    );
}
