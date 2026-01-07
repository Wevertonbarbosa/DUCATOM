import type { ReactNode } from 'react';

interface MentorSelectionLayoutProps {
    children: ReactNode;
}

export function MentorSelectionLayout({
    children,
}: MentorSelectionLayoutProps) {
    return (
        <div className="min-h-screen bg-[#083d71] flex flex-col">
            <main className="flex-1 px-4 md:px-8 lg:px-12 py-6 md:py-8 max-w-6xl mx-auto w-full">
                {children}
            </main>
        </div>
    );
}
