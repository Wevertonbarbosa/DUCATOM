import { MaterialsHeader } from './materials-header';
import { MaterialsCards } from './materials-cards';
import { MaterialsInfo } from './materials-info';
import { MaterialsBackButton } from './materials-back-button';

export function MaterialsLayout() {
    return (
        <div className="min-h-screen bg-[#083d71] flex flex-col">
            <div className="flex-1 flex flex-col px-6 py-8 md:px-12 lg:px-24 xl:px-32 max-w-7xl mx-auto w-full">
                <MaterialsHeader />
                <MaterialsCards />
                <MaterialsInfo />
                <MaterialsBackButton />
            </div>
        </div>
    );
}
