'use client';

import { SelectTimeHeader } from './select-time-header';
import { TimeSelector } from './time-selector';
import { SelectTimeNavigation } from './select-time-navigation';

export function SelectTimeLayout() {
    return (
        <div className="min-h-screen bg-[#083d71] flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8">
                <SelectTimeHeader />
                <TimeSelector />
                <SelectTimeNavigation />
            </div>
        </div>
    );
}
