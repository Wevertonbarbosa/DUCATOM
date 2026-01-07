'use client';

import { useSearchParams } from 'next/navigation';
import { SubmitLessonHeader } from './submit-lesson-header';
import { SubmitLessonContent } from './submit-lesson-content';
import { SubmitLessonBackButton } from './submit-lesson-back-button';
import { useState } from 'react';

export function SubmitLessonLayout() {
    const searchParams = useSearchParams();
    const moduleTitle = searchParams.get('module') || 'Módulo Intro';
    const lessonTitle = searchParams.get('lesson') || 'Aula 1';
    const lessonName =
        searchParams.get('name') || 'Conheça as Partes do Violão';
    const videoUrl = searchParams.get('video') || '';

    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    return (
        <div className="min-h-screen bg-[#083d71] flex flex-col">
            <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-8 flex-1 flex flex-col">
                <SubmitLessonHeader
                    moduleTitle={moduleTitle}
                    lessonTitle={lessonTitle}
                    lessonName={lessonName}
                />

                <SubmitLessonContent
                    videoUrl={videoUrl}
                    uploadedFile={uploadedFile}
                    setUploadedFile={setUploadedFile}
                />

                <SubmitLessonBackButton />
            </div>
        </div>
    );
}
