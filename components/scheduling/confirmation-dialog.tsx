'use client';

import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Check, Calendar, Timer } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { ListMentor } from '@/model/user-model';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '../ui/select';

interface ConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    mentor: ListMentor;
}

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export function ConfirmationDialog({
    isOpen,
    onClose,
    mentor,
}: ConfirmationDialogProps) {
    const router = useRouter();
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    // Filtra os horários do dia selecionado
    const timesForDay =
        selectedDay !== null
            ? mentor.agenda_mentor
                  .filter((a) => a.weekday === selectedDay)
                  .map((a) => a.start_time.slice(0, 5))
            : [];

    const handleConfirm = () => {
        console.log('[v0] Mentor selecionado:', mentor.id);
        console.log('Dia:', selectedDay, 'Horário:', selectedTime);
        console.log('MENTOR ', mentor);

        onClose();
        // router.push('/agendamento-confirmado'); // próxima etapa
    };

    const handleCancel = () => {
        console.log(mentor);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#0a5491] border-[#0d6bb8] border-2 max-w-md p-6 md:p-8">
                <DialogHeader className="space-y-4">
                    <DialogTitle className="text-white text-xl md:text-2xl font-bold text-center">
                        Deseja agendar uma aula com {mentor.nome}?
                    </DialogTitle>

                    <DialogDescription className="flex flex-col md:flex-row justify-center items-start md:items-center gap-4 text-center md:text-left">
                        {/* Select Dia */}
                        <Select
                            onValueChange={(val) => {
                                setSelectedDay(Number(val));
                                setSelectedTime(null); // limpa horário ao mudar o dia
                            }}
                        >
                            <SelectTrigger className="w-[200px] bg-[#083d71]/80 border border-[#0d6bb8]/60 text-white rounded-lg hover:bg-[#083d71] focus:ring-1 focus:ring-[#f0e087]/60 focus:border-[#f0e087]/60 transition-colors flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-[#f0e087]" />
                                <SelectValue
                                    placeholder="Selecione o dia"
                                    className="text-white/90"
                                />
                            </SelectTrigger>

                            <SelectContent className="bg-[#083d71] border border-[#0d6bb8]/60 rounded-lg text-white shadow-xl">
                                <SelectGroup>
                                    <SelectLabel className="text-xs text-[#f0e087] font-semibold">
                                        Dias disponíveis
                                    </SelectLabel>

                                    {WEEKDAYS.map((dayName, idx) => {
                                        const hasTimes =
                                            mentor.agenda_mentor.some(
                                                (a) => a.weekday === idx
                                            );
                                        if (!hasTimes) return null; // mostra só dias com horários

                                        return (
                                            <SelectItem
                                                key={idx}
                                                value={String(idx)}
                                                className="focus:bg-[#0a5491] focus:text-white data-[state=checked]:bg-[#f0e087]/20 data-[state=checked]:text-[#f0e087]"
                                            >
                                                {dayName}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        {/* Select Horário */}
                        <Select
                            onValueChange={(val) => setSelectedTime(val)}
                            disabled={selectedDay === null} // bloqueado até escolher o dia
                        >
                            <SelectTrigger
                                className={`w-[200px] bg-[#083d71]/80 border border-[#0d6bb8]/60 text-white rounded-lg hover:bg-[#083d71] focus:ring-1 focus:ring-[#f0e087]/60 focus:border-[#f0e087]/60 transition-colors flex items-center gap-2 ${
                                    selectedDay === null
                                        ? 'opacity-50 cursor-not-allowed'
                                        : ''
                                }`}
                            >
                                <Timer className="h-4 w-4 text-[#f0e087]" />
                                <SelectValue
                                    placeholder="Selecione o horário"
                                    className="text-white/90"
                                />
                            </SelectTrigger>

                            <SelectContent className="bg-[#083d71] border border-[#0d6bb8]/60 rounded-lg text-white shadow-xl">
                                <SelectGroup>
                                    <SelectLabel className="text-xs text-[#f0e087] font-semibold">
                                        Horários disponíveis
                                    </SelectLabel>

                                    {timesForDay.length > 0 ? (
                                        timesForDay.map((time) => (
                                            <SelectItem
                                                key={time}
                                                value={time}
                                                className="focus:bg-[#0a5491] focus:text-white data-[state=checked]:bg-[#f0e087]/20 data-[state=checked]:text-[#f0e087]"
                                            >
                                                {time}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <div className="p-2 text-white/70 text-sm">
                                            Selecione um dia primeiro
                                        </div>
                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </DialogDescription>
                </DialogHeader>

                <div className="flex items-center justify-center gap-6 mt-6">
                    {/* Cancelar */}
                    <Button
                        onClick={handleCancel}
                        variant="ghost"
                        size="lg"
                        className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-red-500 hover:bg-red-600 p-0 flex items-center justify-center"
                    >
                        <X
                            className="h-8 w-8 md:h-10 md:w-10 text-white"
                            strokeWidth={3}
                        />
                    </Button>

                    {/* Confirmar */}
                    <Button
                        onClick={handleConfirm}
                        variant="ghost"
                        size="lg"
                        disabled={!selectedTime} // só habilita se ambos tiverem valor
                        className={`h-16 w-16 md:h-20 md:w-20 rounded-full p-0 flex items-center justify-center transition-colors ${
                            !selectedDay || !selectedTime
                                ? 'bg-green-500/50 cursor-not-allowed hover:bg-green-500/50'
                                : 'bg-green-500 hover:bg-green-600'
                        }`}
                    >
                        <Check
                            className="h-8 w-8 md:h-10 md:w-10 text-white"
                            strokeWidth={3}
                        />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
