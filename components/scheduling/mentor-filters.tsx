'use client';

import { Label } from '@/components/ui/label';
import { Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MentorFiltersProps {
    showOnlyFavorites: boolean;
    onFavoritesChange: (value: boolean) => void;
}

export function MentorFilters({
    showOnlyFavorites,
    onFavoritesChange,
}: MentorFiltersProps) {
    return (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label className="text-white text-sm md:text-base flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Favoritos
                </Label>
                <Button
                    onClick={() => onFavoritesChange(!showOnlyFavorites)}
                    className={`w-full h-11 md:h-12 text-base font-medium cursor-pointer transition-colors ${
                        showOnlyFavorites
                            ? 'bg-[#f0e087] text-[#083d71] hover:bg-[#f0e087]/90'
                            : 'bg-white text-[#083d71] hover:bg-white/90'
                    }`}
                >
                    <Star
                        className={`h-4 w-4 mr-2 ${
                            showOnlyFavorites ? 'fill-[#083d71]' : ''
                        }`}
                    />
                    {showOnlyFavorites
                        ? 'Mostrando Favoritos'
                        : 'Mostrar Apenas Favoritos'}
                </Button>
            </div>
        </div>
    );
}
