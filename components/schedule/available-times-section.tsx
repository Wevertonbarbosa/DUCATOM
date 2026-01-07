'use client';

import { Card } from '@/components/ui/card';
import { Clock, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TimeSlot } from '@/model/time-availiability-mentor';


interface AvailableTimesSectionProps {
    timeSlots: TimeSlot[];
    onRemoveSlot: (id: number) => void;
}

const DAYS_PT: Record<string, string> = {
    monday: 'Segunda-feira',
    tuesday: 'Terça-feira',
    wednesday: 'Quarta-feira',
    thursday: 'Quinta-feira',
    friday: 'Sexta-feira',
    saturday: 'Sábado',
    sunday: 'Domingo',
};

export function AvailableTimesSection({
    timeSlots,
    onRemoveSlot,
}: AvailableTimesSectionProps) {
    return (
        <Card className="bg-[#05284a] border-[#0a4d8f] p-6 min-h-[300px]">
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
                Horários Disponíveis
            </h2>

            {timeSlots.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                    <Clock className="w-16 h-16 mb-4 opacity-20" />
                    <p className="text-center">
                        Nenhum horário cadastrado.
                        <br />
                        Adicione seus horários disponíveis.
                    </p>
                </div>
            ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {timeSlots.map((slot) => (
                        <div
                            key={slot.id}
                            className="bg-[#083d71] border border-[#0a4d8f] rounded-lg p-4 flex items-center justify-between hover:border-[#f0e087] transition-colors group"
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <Clock className="w-5 h-5 text-[#f0e087]" />
                                <div className="flex-1">
                                    <p className="text-white font-medium">
                                        {DAYS_PT[slot.day]}
                                    </p>
                                    <p className="text-sm text-gray-300">
                                        {slot.startTime}
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onRemoveSlot(slot.id)}
                                className="text-red-400 hover:text-red-500 hover:bg-red-400/10 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 className="w-5 h-5" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
}
