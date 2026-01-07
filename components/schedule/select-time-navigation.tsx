'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SelectTimeNavigation() {
    const router = useRouter();

    return (
        <div className="flex justify-start pt-4">
            <Button
                onClick={() => router.push('/controle-agenda/selecionar-dia')}
                variant="ghost"
                size="icon"
                className="text-white hover:bg-[#0a4d8f] rounded-full h-12 w-12"
            >
                <ArrowLeft className="w-6 h-6" />
            </Button>
        </div>
    );
}
