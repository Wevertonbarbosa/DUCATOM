'use client';

import { useEffect, useRef, useState } from 'react';
import { ValidateLessonsHeader } from './validate-lessons-header';
import { ModulesList } from './modules-list';
import { ValidateLessonsBackButton } from './validate-lessons-back-button';
import { Module } from '@/model/lesson-mentor';
import { useModuleLessonMentor } from '@/hooks/useModulos_lesson';
import { LoadingScreen } from '../ui/loading-screen';
import { MentorData } from '@/model/user-model';

export function ValidateLessonsLayout() {
    const { modules, loading, loadModulesAndLessons } = useModuleLessonMentor();

    const [mentorUser, setMentorUser] = useState<MentorData>();

    const didRun = useRef(false);

    useEffect(() => {
        if (didRun.current) return;
        didRun.current = true;

        const saved = localStorage.getItem('mentor_id');
        if (saved) {
            setMentorUser(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        if (!mentorUser?.id) return;

        loadModulesAndLessons(mentorUser.id);
    }, [mentorUser?.id]);

    return (
        <div className="min-h-screen bg-[#083d71] flex flex-col">
            <div className="flex-1 flex flex-col p-4 md:p-8 max-w-4xl mx-auto w-full">
                <ValidateLessonsHeader />

                <div className="flex-1 mt-6 md:mt-8 ">
                    {loading ? (
                        <LoadingScreen />
                    ) : (
                        <ModulesList
                            modules={modules}
                            mentorNivel={mentorUser?.nivel ?? 0}
                        />
                    )}
                </div>

                <ValidateLessonsBackButton />
            </div>
        </div>
    );
}
export type { Module };
