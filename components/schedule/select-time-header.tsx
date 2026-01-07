'use client';

import { useSearchParams } from 'next/navigation';

export function SelectTimeHeader() {
    const searchParams = useSearchParams();
    const dayLabel = searchParams.get('label') || 'Dia Selecionado';

    return (
        <div className="text-center space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
                Controle de Agenda
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
                {dayLabel}
            </h2>
        </div>
    );
}
