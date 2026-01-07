'use client';

import { HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

export function HelpButton() {
    return (
        <div className="flex justify-center mt-8">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-12 w-12 rounded-full hover:bg-[#0a5491] transition-colors"
                        >
                            <HelpCircle className="h-8 w-8 text-[#f0e087]" />
                            <span className="sr-only">Ajuda</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white text-[#083d71]">
                        <p>Precisa de ajuda? Clique aqui!</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}
