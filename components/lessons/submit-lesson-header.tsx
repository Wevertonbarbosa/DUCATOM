interface SubmitLessonHeaderProps {
    moduleTitle: string;
    lessonTitle: string;
    lessonName: string;
}

export function SubmitLessonHeader({
    moduleTitle,
    lessonTitle,
    lessonName,
}: SubmitLessonHeaderProps) {
    return (
        <div className="text-center mb-6 md:mb-8">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-3">
                Validação Aulas
            </h1>
            <div className="space-y-1">
                <h2 className="text-base md:text-lg lg:text-xl font-semibold text-[#f0e087]">
                    {moduleTitle} | {lessonTitle}
                </h2>
                <p className="text-sm md:text-base lg:text-lg text-[#f0e087]/90">
                    {lessonName}
                </p>
            </div>
        </div>
    );
}
