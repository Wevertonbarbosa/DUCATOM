import { Card, CardContent } from '@/components/ui/card';
import { Download } from 'lucide-react';

const materials = [
    {
        id: 1,
        title: 'Como Afinar o Seu Violão?',
        icon: Download,
    },
    {
        id: 2,
        title: 'Apostila Ducatom',
        icon: Download,
    },
];

export function MaterialsCards() {
    return (
        <div className="space-y-4 md:space-y-6 mb-12 md:mb-16">
            {materials.map((material) => (
                <Card
                    key={material.id}
                    className="bg-[#0a5491] border-none hover:bg-[#0d6bb8] transition-colors cursor-pointer"
                >
                    <CardContent className="p-6 md:p-8 flex items-center justify-between">
                        <h2 className="text-[#f0e087] font-bold text-lg md:text-xl lg:text-2xl">
                            {material.title}
                        </h2>
                        <material.icon className="h-8 w-8 md:h-10 md:w-10 text-[#f0e087] flex-shrink-0 ml-4" />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
