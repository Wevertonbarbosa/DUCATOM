import Image from 'next/image';

export function LoadingScreen() {
    return (
        <div className="fixed inset-0 bg-[#083d71] flex flex-col items-center justify-center z-50">
            <div className="relative">
                {/* Logo */}
                <div className="mb-8 animate-pulse">
                    <Image
                        src="/ducatom_logo.png"
                        alt="Ducatom Logo"
                        width={120}
                        height={120}
                        className="w-24 h-24 md:w-32 md:h-32"
                        priority
                    />
                </div>

                {/* Spinner */}
                <div className="flex justify-center">
                    <div className="relative w-16 h-16">
                        <div className="absolute inset-0 border-4 border-[#f0e087]/20 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-transparent border-t-[#f0e087] rounded-full animate-spin"></div>
                    </div>
                </div>

                {/* Loading text */}
                <p className="text-[#f0e087] text-center mt-6 text-sm font-medium">
                    Carregando...
                </p>
            </div>
        </div>
    );
}
