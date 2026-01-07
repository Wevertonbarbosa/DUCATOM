'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function ScheduleBackButton() {
    const router = useRouter();

    return (
        <div className="flex justify-start pt-4">
            <Button
                onClick={() => router.push('/dashboard')}
                variant="ghost"
                className="text-white hover:text-[#f0e087] hover:bg-[#0a4d8f] transition-colors"
                size="lg"
            >
                <ArrowLeft className="w-6 h-6" />
            </Button>
        </div>
    );
}
