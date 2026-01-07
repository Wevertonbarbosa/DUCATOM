'use client';

import type { Module } from './validate-lessons-layout';
import { ModuleItem } from './module-item';

interface ModulesListProps {
    modules: Module[];
    mentorNivel: number;
}

export function ModulesList({ modules, mentorNivel }: ModulesListProps) {
    return (
        <div className="space-y-3 md:space-y-4">
            {modules.map((module) => (
                <ModuleItem
                    key={module.id}
                    module={module}
                    mentorNivel={mentorNivel}
                />
            ))}
        </div>
    );
}
