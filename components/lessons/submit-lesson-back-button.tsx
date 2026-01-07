'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function SubmitLessonBackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white hover:text-[#f0e087] transition-colors mt-4"
            aria-label="Voltar"
        >
            <ArrowLeft className="w-6 h-6 md:w-7 md:h-7" />
        </button>
    );
}
