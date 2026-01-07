'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function MaterialsBackButton() {
    const router = useRouter();

    return (
        <div className="mt-auto pt-4">
            <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 h-12 w-12 md:h-14 md:w-14"
                onClick={() => router.back()}
            >
                <ArrowLeft className="h-6 w-6 md:h-7 md:w-7" />
            </Button>
        </div>
    );
}
