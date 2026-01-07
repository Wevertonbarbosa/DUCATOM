import Image from "next/image"

export function LoginHeader() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-24 h-24 md:w-32 md:h-32">
        <Image
          src="/ducatom_logo.png"
          alt="Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      <div className="text-center space-y-1">
        <h1 className="text-[#f0e087] text-lg md:text-xl font-semibold text-balance">Sua Jornada Musical,</h1>
        <p className="text-[#f0e087] text-lg md:text-xl font-semibold">no seu Ritmo</p>
      </div>
    </div>
  )
}
