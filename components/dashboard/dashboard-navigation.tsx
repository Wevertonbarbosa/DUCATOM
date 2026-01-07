'use client';

import { Button } from '@/components/ui/button';
import { BookOpen, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function DashboardNavigation() {
    const router = useRouter();

    return (
        <nav className="space-y-4">
            <Button
                className="w-full bg-[#0a5491] hover:bg-[#0d6bb8] text-white font-semibold text-base md:text-lg py-6 md:py-7 rounded-lg transition-colors"
                onClick={() => router.push('/materiais-didaticos')}
            >
                <BookOpen className="mr-2 h-5 w-5" />
                Materiais Didáticos
            </Button>

            <Button className="w-full bg-[#0a5491] hover:bg-[#0d6bb8] text-white font-semibold text-base md:text-lg py-6 md:py-7 rounded-lg transition-colors">
                <TrendingUp className="mr-2 h-5 w-5" />
                Progresso do Aluno
            </Button>
        </nav>
    );
}
