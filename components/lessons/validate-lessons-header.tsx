import { useDashboardUser } from '@/hooks/useDashboard';
import { MentorData } from '@/model/user-model';
import { GraduationCap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function ValidateLessonsHeader() {
    const didRun = useRef(false);

    const [mentorUser, setMentorUser] = useState<MentorData>();

    useEffect(() => {
        if (didRun.current) return;
        didRun.current = true;

        const saved = localStorage.getItem('mentor_id');
        if (saved) {
            setMentorUser(JSON.parse(saved));
        }
    }, []);

    return (
        <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-3">
                <GraduationCap className="w-8 h-8 md:w-10 md:h-10 text-[#f0e087]" />
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                    Validação de Aulas
                </h1>
            </div>
            <div className="inline-block bg-[#0a4d8f] px-6 py-2 rounded-full">
                <p className="text-[#f0e087] font-semibold text-lg md:text-xl">
                    Nível {mentorUser?.nivel}
                </p>
            </div>
        </div>
    );
}
