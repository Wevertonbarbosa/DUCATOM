import { AlertCircle } from 'lucide-react';

interface ScheduleWarningProps {
    slotsCount: number;
}

export function ScheduleWarning({ slotsCount }: ScheduleWarningProps) {
    return (
        <div className="bg-[#05284a] border-2 border-[#f0e087]/30 rounded-lg p-4 md:p-6">
            <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-[#f0e087] shrink-0 mt-0.5" />
                <div className="text-center flex-1">
                    <p className="text-white text-sm md:text-base">
                        Horários mínimos não estabelecidos!
                    </p>
                    <p className="text-gray-300 text-sm md:text-base mt-1">
                        Para manter sua agenda disponível, é necessário oferecer{' '}
                        <span className="text-[#f0e087] font-semibold">
                            pelo menos 6 opções de horários
                        </span>
                        .
                    </p>
                    <p className="text-[#f0e087] text-sm mt-2">
                        Você tem {slotsCount} de 6 horários cadastrados
                    </p>
                    <p className="text-red-500 text-lg font-bold mt-1">
                        Por isso sua agenda não está ativa para os alunos
                    </p>
                </div>
            </div>
        </div>
    );
}
