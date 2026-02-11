import { Card, CardContent } from '@/components/ui/card';
import { Download, Play } from 'lucide-react';

const materials = [
    {
        id: 1,
        title: 'Como Afinar o Seu Violão?',
        icon: Play,
        type: 'video',
        url: 'https://www.youtube.com/embed/G9uq1WqleOo',
    },
    {
        id: 2,
        title: 'Apostila Ducatom',
        icon: Download,
        type: 'download',
        url: '/apostila-ducatom.pdf',
    },
];

export function MaterialsCards() {
    return (
        <div className="space-y-4 md:space-y-6 mb-12 md:mb-16">
            {materials.map((material) => (
                <Card key={material.id} className="bg-[#0a5491] border-none">
                    <CardContent className="p-6 md:p-8 space-y-4">
                        {/* Título */}
                        <div className="flex items-center justify-between">
                            <h2 className="text-[#f0e087] font-bold text-lg md:text-xl lg:text-2xl">
                                {material.title}
                            </h2>

                            <material.icon className="h-8 w-8 md:h-10 md:w-10 text-[#f0e087]" />
                        </div>

                        {/* Conteúdo */}
                        {material.type === 'video' ? (
                            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                                <iframe
                                    src={material.url}
                                    title={material.title}
                                    className="absolute inset-0 w-full h-full"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        ) : (
                            <a
                                href={material.url}
                                download
                                className="inline-flex items-center gap-2 text-[#f0e087] font-semibold hover:underline"
                            >
                                <Download className="w-5 h-5" />
                                Baixar material
                            </a>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
