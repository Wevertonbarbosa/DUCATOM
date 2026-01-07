'use client';

import type React from 'react';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LoadingScreen } from './loading-screen';

export function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const timeout = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timeout);
    }, [pathname]);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return <>{children}</>;
}
