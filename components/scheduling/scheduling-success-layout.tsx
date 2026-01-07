'use client';

import { SchedulingSuccessHeader } from './scheduling-success-header';
import { SchedulingSuccessInfo } from './scheduling-success-info';
import { SchedulingSuccessActions } from './scheduling-success-actions';

export function SchedulingSuccessLayout() {
    return (
        <div className="min-h-screen bg-[#083d71] flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8 flex flex-col items-center">
                <SchedulingSuccessHeader />
                <SchedulingSuccessInfo />
                <SchedulingSuccessActions />
            </div>
        </div>
    );
}
