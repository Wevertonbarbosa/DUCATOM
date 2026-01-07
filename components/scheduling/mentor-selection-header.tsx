export function MentorSelectionHeader() {
    const today = new Date().toLocaleDateString('pt-BR');

    return (
        <header className="mb-6">
            <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-2">
                Finalize o Agendamento
            </h1>
            <p className="text-[#f0e087] text-base md:text-lg text-center font-medium">
                {today}
            </p>
        </header>
    );
}
