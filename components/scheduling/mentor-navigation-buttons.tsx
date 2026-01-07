'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function MentorNavigationButtons() {
    const router = useRouter();

    return (
        <div className="flex items-center justify-between gap-4">
            <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push('/dashboard')}
                className="text-white hover:bg-white/10 h-12 w-12"
            >
                <ArrowLeft className="h-6 w-6" />
            </Button>
        </div>
    );
}
