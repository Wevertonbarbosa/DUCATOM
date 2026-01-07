import { EmailSentConfirmation } from '@/components/auth/email-sent-confirmation';

export default function EmailSentPage() {
    return (
        <main className="min-h-screen bg-[#083d71] flex items-center justify-center p-4">
            <EmailSentConfirmation />
        </main>
    );
}
