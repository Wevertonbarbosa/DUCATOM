'use client';

import { useAuth } from '@/contexts/auth-context';
import Image from 'next/image';

export function MaterialsInfo() {
    const { user } = useAuth();

    return (
        <div className="bg-[#05284a] rounded-lg p-6 md:p-8 mb-8 md:mb-12">
            <p className="text-[#f0e087] text-sm md:text-base lg:text-lg text-center leading-relaxed mb-6">
                Lembrando que na apostila, há{' '}
                <span className="font-bold">ícones clicáveis</span> para você
                ouvir trechos das músicas e os exercícios aplicados.
            </p>
            <div className="flex justify-center">
                <div className="relative w-32 h-32 md:w-40 md:h-40">
                    <div className="absolute inset-0 bg-[#7a8ea0] rounded-2xl flex items-center justify-center">
                        <div className="relative w-full h-full rounded-lg overflow-hidden">
                            <Image
                                src="/play-student.jpeg"
                                alt="Ícone para o student"
                                fill
                                className="object-cover"
                                priority={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
