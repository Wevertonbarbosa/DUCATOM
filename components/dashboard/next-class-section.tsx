'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/auth-context';
import { Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface NextClassSectionProps {
    nextClass: {
        date: string;
        time: string;
        teacher: string;
    } | null;
}

export function NextClassSection({ nextClass }: NextClassSectionProps) {
    const router = useRouter();
    const { user } = useAuth();

    return (
        <section>
            {user?.role === 'STUDENT' && (
                <h2 className="text-white text-sm md:text-base font-medium mb-3">
                    Sua próxima Aula
                </h2>
            )}
            <Card className="bg-[#0a5491] border-[#0d6bb8] p-6 md:p-8 text-center">
                {!nextClass ? (
                    <>
                        <p className="text-[#0d6bb8] text-lg md:text-xl lg:text-2xl font-bold uppercase mb-6 tracking-wider">
                            Nenhum Evento Futuro
                        </p>
                        {user?.role === 'STUDENT' && (
                            <Button
                                onClick={() =>
                                    router.push('/selecionar-mentor')
                                }
                                className="bg-[#f0e087] hover:bg-[#e5d67a] text-[#083d71] font-semibold text-base md:text-lg px-8 py-6 rounded-lg w-full md:w-auto cursor-pointer"
                            >
                                <Calendar className="mr-2 h-5 w-5" />
                                Agendar Aula
                            </Button>
                        )}
                        {user?.role === 'MENTOR' && (
                            <Button
                                onClick={() =>
                                    router.push('/controle-agenda')
                                }
                                className="bg-[#f0e087] hover:bg-[#e5d67a] text-[#083d71] font-semibold text-base md:text-lg px-8 py-6 rounded-lg w-full md:w-auto cursor-pointer"
                            >
                                <Calendar className="mr-2 h-5 w-5" />
                                Controle de agenda
                            </Button>
                        )}
                    </>
                ) : (
                    <div className="text-white">
                        <p className="text-lg font-semibold mb-2">
                            {nextClass.date}
                        </p>
                        <p className="text-base mb-1">{nextClass.time}</p>
                        <p className="text-sm text-white/80">
                            Professor: {nextClass.teacher}
                        </p>
                    </div>
                )}
            </Card>
        </section>
    );
}
