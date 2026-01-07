'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Check, Plus, X } from 'lucide-react';

interface ScheduleActionsProps {
    onCancelClick: () => void;
    onConfirmClick: () => void;
    confirmDisabled: boolean;
}

export function ScheduleActions({
    onCancelClick,
    onConfirmClick,
    confirmDisabled,
}: ScheduleActionsProps) {
    const router = useRouter();

    const handleAddClick = () => {
        router.push('/controle-agenda/selecionar-dia');
    };

    return (
        <div className="space-y-4">
            {/* ➕ Adicionar horários */}
            <Button
                onClick={handleAddClick}
                className="w-full bg-[#f0e087] hover:bg-[#e5d580] text-[#083d71] font-semibold py-6 text-lg rounded-xl transition-all hover:scale-[1.02] shadow-lg"
            >
                <Plus className="w-5 h-5 mr-2" />
                Adicionar Horários
            </Button>

            {/* ❌ Cancelar horários */}
            {/* <Button
                onClick={onCancelClick}
                disabled={!hasSlots}
                variant="outline"
                className="w-full border-2 border-[#0a4d8f] text-white hover:text-white hover:bg-[#0a4d8f] disabled:opacity-50 disabled:cursor-not-allowed py-6 text-lg rounded-xl transition-all bg-transparent"
            >
                <X className="w-5 h-5 mr-2" />
                Cancelar Horários
            </Button> */}

            {/* ✅ Confirmar agenda */}
            <Button
                onClick={onConfirmClick}
                disabled={confirmDisabled}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-6 text-lg rounded-xl transition-all hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <Check className="w-5 h-5 mr-2" />
                Confirmar Agenda
            </Button>
        </div>
    );
}
