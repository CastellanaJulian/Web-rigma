"use client"

import Image from "next/image"

export default function UnderConstruction() {
  return (
    <>
      {/* Subtle gradient overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[1] opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 50% 0%, rgba(212, 196, 168, 0.06), transparent 60%),
            radial-gradient(ellipse at 100% 100%, rgba(212, 196, 168, 0.04), transparent 50%)
          `
        }}
      />

      {/* Decorative diagonal lines */}
      <div className="fixed right-0 top-0 bottom-0 w-[40%] pointer-events-none z-0 opacity-[0.06] overflow-hidden max-md:w-full max-md:opacity-[0.04]">
        <svg 
          viewBox="0 0 600 800" 
          fill="none" 
          className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[130%] h-auto text-[#d4c4a8]"
        >
          <line x1="100" y1="0" x2="600" y2="600" stroke="currentColor" strokeWidth="1" />
          <line x1="200" y1="0" x2="600" y2="500" stroke="currentColor" strokeWidth="1" />
          <line x1="300" y1="0" x2="600" y2="400" stroke="currentColor" strokeWidth="1" />
          <line x1="400" y1="0" x2="600" y2="300" stroke="currentColor" strokeWidth="1" />
          <line x1="500" y1="0" x2="600" y2="200" stroke="currentColor" strokeWidth="1" />
          <line x1="0" y1="200" x2="600" y2="800" stroke="currentColor" strokeWidth="1" />
          <line x1="0" y1="350" x2="500" y2="800" stroke="currentColor" strokeWidth="1" />
          <line x1="0" y1="500" x2="400" y2="800" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative h-svh grid grid-rows-[auto_1fr_auto] p-[clamp(20px,3vw,40px)] z-[2] overflow-hidden">
        {/* Header */}
        <header className="flex justify-between items-center gap-6 max-md:flex-row">
          <a href="#" className="inline-flex items-center leading-none" aria-label="Rigma">
            <Image
              src="/logo-rigma.png"
              alt="RIGMA"
              width={76}
              height={76}
              className="w-[clamp(54px,6vw,76px)] h-auto invert brightness-105 contrast-110"
              priority
            />
          </a>
          <div className="inline-flex items-center gap-2.5 text-xs text-white/80 uppercase tracking-[0.18em]">
            <span 
              className="w-[7px] h-[7px] rounded-full bg-[#d4c4a8] animate-pulse"
              style={{ boxShadow: '0 0 0 0 rgba(212, 196, 168, 0.6)' }}
            />
            <span><span className="max-md:hidden">Sitio </span>En construcción</span>
          </div>
        </header>

        {/* Main */}
        <main className="flex flex-col justify-center py-[clamp(16px,3vw,32px)] gap-[clamp(16px,2.5vw,24px)] max-w-[1100px]">
          <div className="text-xs uppercase tracking-[0.28em] text-[#d4c4a8] flex items-center gap-3.5 animate-fade-up">
            <span className="w-9 h-px bg-[#d4c4a8]" />
            Próximamente
          </div>

          <h1 className="font-sans font-light text-[clamp(32px,6vw,72px)] leading-[0.98] tracking-[-0.025em] text-balance">
            <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
              <span className="inline-block animate-rise" style={{ animationDelay: '0.35s' }}>
                Algo grande
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
              <span className="inline-block animate-rise" style={{ animationDelay: '0.5s' }}>
                <span className="italic font-light text-[#d4c4a8]">se está</span> construyendo.
              </span>
            </span>
          </h1>

          <p className="font-sans font-light text-[clamp(18px,2.5vw,28px)] leading-tight tracking-[-0.01em] max-w-[720px] pt-[clamp(16px,2vw,20px)] border-t border-white/20 animate-fade-up [animation-delay:1s]">
            <span className="block font-light text-white/80">
              Viví diferente, viví RIGMA.
            </span>
          </p>

          
        </main>

        {/* Footer */}
        <footer className="grid grid-cols-[1fr_auto] gap-[clamp(24px,4vw,48px)] items-end pt-[clamp(12px,1.5vw,16px)] animate-fade-up [animation-delay:1.4s] max-md:grid-cols-1 max-md:gap-7">
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/60 mb-3.5">Contacto</div>
            <div className="flex flex-wrap gap-[clamp(20px,3vw,40px)]">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-white/60 uppercase tracking-[0.16em]">WhatsApp</span>
                <a 
                  href="https://wa.me/541165962401" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white text-[clamp(15px,1.4vw,17px)] font-medium hover:text-[#d4c4a8] transition-colors relative group"
                >
                  +54 11 6596 2401
                  <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-[#d4c4a8] group-hover:w-full transition-all duration-300" />
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-white/60 uppercase tracking-[0.16em]">Email</span>
                <a 
                  href="mailto:rigmagrupo@gmail.com" 
                  className="text-white text-[clamp(15px,1.4vw,17px)] font-medium hover:text-[#d4c4a8] transition-colors relative group"
                >
                  rigmagrupo@gmail.com
                  <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-[#d4c4a8] group-hover:w-full transition-all duration-300" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes rise {
          from { transform: translateY(110%); }
          to { transform: translateY(0); }
        }
        
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-rise {
          transform: translateY(110%);
          animation: rise 1s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
        }
        
        .animate-fade-up {
          opacity: 0;
          animation: fade-up 0.9s ease-out forwards;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-rise { transform: translateY(0); animation: none; }
          .animate-fade-up { opacity: 1; animation: none; }
        }
      `}</style>
    </>
  )
}
