'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import { UserModel } from '@/model/user-model';

import { ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useUpdateMentorLessonStatusFeedback } from '@/hooks/useModulos_lesson';

export function LessonUnderAnalysis() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const module = searchParams.get('module') || 'Módulo';
    const lesson = searchParams.get('lesson') || 'Aula';
    const name = searchParams.get('name') || '';

    const mentorIdString = searchParams.get('mentorId') || '';
    const aulaIdString = searchParams.get('aulaId') || '';
    const mentorId = parseInt(mentorIdString);
    const aulaId = parseInt(aulaIdString);

    const [adminPersona, setAdminPersona] = useState<UserModel | null>(null);
    const isAdmin = adminPersona?.role === 'ADMIN';
    const [feedback, setFeedback] = useState('');
    const feedbackValido = feedback.trim().length > 5;

    const { loading, sendAdminFeedbackStatus } =
        useUpdateMentorLessonStatusFeedback();

    const didRun = useRef(false);

    useEffect(() => {
        if (didRun.current) return;
        didRun.current = true;

        const auth_admin = localStorage.getItem('auth_user');
        if (auth_admin) {
            setAdminPersona(JSON.parse(auth_admin));
        }
    }, []);

    async function handleNegarAula() {
        if (!feedbackValido) return;

        await sendAdminFeedbackStatus(aulaId, mentorId, 'negado', feedback);

        router.push('/validacao-aulas');
        // 👉 aqui você pode:
        // - redirecionar
        // - fechar modal
        // - refetch da lista
    }

    async function handleAprovarAula() {
        await sendAdminFeedbackStatus(
            aulaId,
            mentorId,
            'aprovado',
            feedback || undefined,
        );
        
        router.push('/validacao-aulas');
        // 👉 mesmas ações pós sucesso
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-[#083d71] to-[#0a4d8f] flex flex-col">
            {/* Header */}
            <div className="bg-[#083d71] py-6 px-4 md:px-6 border-b border-white/10">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white text-center">
                    Validação Aulas
                </h1>
            </div>

            {/* Content */}
            <div className="flex-1 flex items-center justify-center p-4 md:p-6">
                <div className="w-full max-w-2xl space-y-8 md:space-y-12">
                    {/* Module and Lesson Info */}
                    <div className="text-center space-y-2">
                        <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-[#f0e087]">
                            {module} | {lesson}
                        </h2>
                        <p className="text-base md:text-lg lg:text-xl text-white font-medium">
                            {name}
                        </p>
                    </div>

                    {/* Loading Icon */}
                    <div className="flex justify-center">
                        <div className="relative">
                            {/* Spinning loader */}
                            <div className="bg-[#0a4d8f] rounded-full p-8 md:p-12 border-4 border-[#083d71]">
                                <Loader2
                                    className="w-16 h-16 md:w-24 md:h-24 text-[#f0e087] animate-spin"
                                    strokeWidth={2.5}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Status Message */}
                    <div className="text-center space-y-4">
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                            Em Análise
                        </h3>

                        {!isAdmin ? (
                            <p className="text-sm md:text-base lg:text-lg text-[#f0e087] max-w-md mx-auto leading-relaxed">
                                Seu vídeo está em análise pelo nosso time de
                                curadoria. Aguarde, pois nas próximas horas
                                daremos a devolutiva.
                            </p>
                        ) : (
                            <Card className="max-w-3xl mx-auto bg-black/40 border-none shadow-xl">
                                <CardHeader className="space-y-2 text-center">
                                    <div className="mx-auto w-12 h-12 rounded-full bg-linear-to-br from-[#f0e087] to-[#d4c474] flex items-center justify-center shadow-lg">
                                        <ShieldCheck className="w-6 h-6 text-[#083d71]" />
                                    </div>

                                    <CardTitle className="text-xl md:text-2xl text-white">
                                        Auditoria da Aula
                                    </CardTitle>

                                    <CardDescription className="text-sm md:text-base text-gray-300">
                                        Confirme se o vídeo enviado pelo mentor
                                        foi recebido via WhatsApp e se a aula
                                        está de acordo com os critérios da
                                        plataforma.
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-6">
                                    {/* INFORMATIVO */}
                                    <div className="bg-[#083d71]/60 border border-[#f0e087]/30 rounded-xl p-4 text-sm md:text-base text-gray-200 leading-relaxed">
                                        Caso o vídeo tenha sido recebido
                                        corretamente pelo time de auditoria e a
                                        aula esteja conforme o conteúdo
                                        esperado, aprove a aula para que o
                                        mentor avance em seu nível. Caso
                                        contrário, forneça um feedback claro
                                        para que o mentor possa reenviar a aula
                                        corrigida.
                                    </div>

                                    {/* FEEDBACK */}
                                    <div className="space-y-2">
                                        <Label className="text-gray-300">
                                            Feedback para o mentor
                                        </Label>

                                        <Textarea
                                            placeholder="Escreva aqui um feedback claro e construtivo para o mentor..."
                                            className="bg-black/50 border-gray-600 text-white resize-none"
                                            rows={4}
                                            value={feedback}
                                            onChange={(e) =>
                                                setFeedback(e.target.value)
                                            }
                                        />
                                    </div>
                                </CardContent>

                                <CardFooter className="flex flex-col sm:flex-row gap-3 justify-end">
                                    {/* NEGAR */}
                                    <Button
                                        disabled={!feedbackValido || loading}
                                        variant="destructive"
                                        className="w-full cursor-pointer sm:w-auto rounded-xl"
                                        onClick={handleNegarAula}
                                    >
                                        <XCircle className="w-4 h-4 mr-2" />
                                        {loading ? 'Negando...' : 'Negar Aula'}
                                    </Button>

                                    {/* APROVAR */}
                                    <Button
                                        disabled={!feedbackValido || loading}
                                        className="
                                                cursor-pointer
                                                w-full sm:w-auto
                                                bg-linear-to-r
                                                from-[#2ecc71]
                                                to-[#27ae60]
                                                hover:from-[#27ae60]
                                                hover:to-[#2ecc71]
                                                text-white
                                                font-semibold
                                                rounded-xl
                                                shadow-lg
                                                "
                                        onClick={handleAprovarAula}
                                    >
                                        <CheckCircle2 className="w-4 h-4 mr-2" />
                                        {loading
                                            ? 'Aprovando...'
                                            : 'Aprovar Aula'}
                                    </Button>
                                </CardFooter>
                            </Card>
                        )}
                    </div>

                    <div className="mt-6 md:mt-8">
                        <Button
                            onClick={() => router.push('/validacao-aulas')}
                            variant="ghost"
                            className="text-white hover:text-[#f0e087] hover:bg-white/10 transition-colors gap-2"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="text-sm md:text-base">Voltar</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
