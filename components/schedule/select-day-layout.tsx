'use client';

import { SelectDayHeader } from './select-day-header';
import { DaySelector } from './day-selector';
import { SelectDayNavigation } from './select-day-navigation';

export function SelectDayLayout() {
    return (
        <div className="min-h-screen bg-[#083d71] flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8">
                <SelectDayHeader />
                <DaySelector />
                <SelectDayNavigation />
            </div>
        </div>
    );
}
