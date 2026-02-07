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
                        {user?.role === 'STUDENT' ? (
                            <div className="relative w-full h-full rounded-lg overflow-hidden">
                                <Image
                                    src="/play-student.jpeg"
                                    alt="Ícone para o student"
                                    fill
                                    className="object-cover"
                                    priority={false}
                                />
                            </div>
                        ) : (
                            <>
                                <div className="relative w-24 h-16 md:w-28 md:h-20 bg-[#4a5d6e] rounded-lg flex items-center justify-center">
                                    <div className="grid grid-cols-4 gap-1 p-2">
                                        {[...Array(8)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="w-2 h-6 md:w-3 md:h-8 bg-white rounded-sm"
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="absolute -bottom-2 -right-2 bg-[#6b7fa0] rounded-full p-3 md:p-4 shadow-lg">
                                    <div className="w-0 h-0 border-l-8 md:border-l-10 border-l-white border-t-[6px] md:border-t-8 border-t-transparent border-b-[6px] md:border-b-8 border-b-transparent ml-1" />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
