"use client";

import { useEffect, useMemo, useState } from "react";

export default function Page() {
  const [phase, setPhase] = useState("pin"); // "pin" | "intro" | "content"
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [introFade, setIntroFade] = useState(false);
  const [contentFadeIn, setContentFadeIn] = useState(false);
  const [reveal, setReveal] = useState(false);

  // PIN correcto: 10-06 (formato MM-DD)
  const CORRECT_PIN = "06-10";

  // ✅ Pon aquí tus rutas (public/...)
  const media = useMemo(
    () => [
      { type: "image", src: "/media/foto-1.jpeg", alt: "Bellaaaaa" },
      { type: "image", src: "/media/foto-2.jpeg", alt: "Wow Wow Wow" },
      /* {
        type: "video",
        src: "/media/video-1.mp4",
        poster: "/media/poster-1.jpeg",
      }, */
      { type: "image", src: "/media/foto-3.jpeg", alt: "Me encantaaaa" },
      /* {
        type: "video",
        src: "/media/video-2.mp4",
        poster: "/media/poster-2.jpg",
      }, */
    ],
    []
  );

  const handlePinSubmit = (e) => {
    e.preventDefault();

    if (pin === CORRECT_PIN) {
      setError("");
      setPhase("intro");

      // Iniciar la secuencia de intro
      const t1 = setTimeout(() => setIntroFade(true), 3400);
      const t2 = setTimeout(() => {
        setPhase("content");
        setContentFadeIn(true);
      }, 4000);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    } else {
      setError("PIN incorrecto. Intenta de nuevo.");
      // Limpiar el error después de 3 segundos
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleKeyDown = (e) => {
    // Permitir solo números y guion
    const allowedKeys = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "-",
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ];

    if (!allowedKeys.includes(e.key) && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
    }

    // Auto-formato MM-DD
    if (
      e.key >= "0" &&
      e.key <= "9" &&
      pin.length === 2 &&
      !pin.includes("-")
    ) {
      setPin((prev) => prev + "-");
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#07040f] text-white">
      <AnimatedBackdrop />

      {/* Pantalla de PIN */}
      {phase === "pin" && (
        <section className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <div className="w-full max-w-md">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/7 px-4 py-2 text-xs text-white/75 backdrop-blur mb-6">
                <span className="h-2 w-2 rounded-full bg-white/60" />
                Acceso privado
              </div>

              <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">
                ¡Señorita Tatiana!
              </h1>

              <p className="mt-3 text-white/70">
                Para recordarte lo especial que eres, necesito que ingreses
                <br />
                <span className="text-fuchsia-300 font-medium">
                  una fecha importante
                </span>
              </p>

              <p className="mt-2 text-sm text-white/50">
                Formato: <span className="text-cyan-300">DD-MM</span> (día y
                mes)
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="__-__"
                  maxLength={5}
                  className="w-full px-6 py-4 text-2xl text-center tracking-widest bg-white/5 border border-white/15 rounded-2xl 
             backdrop-blur placeholder:text-white/20 placeholder:tracking-[0.3em] focus:outline-none focus:border-fuchsia-400/50 
             focus:ring-2 focus:ring-fuchsia-400/20 transition-all"
                  autoComplete="off"
                  autoFocus
                />
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  {/* <div className="text-2xl tracking-[0.5em] text-white/20">
                    {pin.padEnd(5, "_").replace(/_/g, " ")}
                  </div> */}
                </div>
              </div>

              {error && (
                <div className="text-center animate-pulse">
                  <p className="text-red-400/80 text-sm bg-red-400/10 py-2 px-4 rounded-xl border border-red-400/20">
                    ❌ {error}
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-fuchsia-500/80 to-cyan-400/80 
                           hover:from-fuchsia-500 hover:to-cyan-400 text-white font-medium
                           transition-all duration-300 shadow-lg shadow-fuchsia-500/20"
                >
                  Ingresar
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      // Pista sutil
                      setPin("10-");
                      setError("💡 ¿Día y mes de mi cumple?");
                      setTimeout(() => setError(""), 4000);
                    }}
                    className="text-xs text-white/50 hover:text-white/70 transition-colors"
                  >
                    ¿Necesitas una pista?
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 text-center">
                <p className="text-xs text-white/40">
                  Esta página está protegida porque contiene
                  <br />
                  mensajes especiales para alguien especial ✨
                </p>
              </div>
            </form>
          </div>
        </section>
      )}

      {/* Intro */}
      {phase === "intro" && (
        <section
          className={[
            "fixed inset-0 z-50 flex items-center justify-center",
            "transition-opacity duration-700 ease-out",
            introFade ? "opacity-0 pointer-events-none" : "opacity-100",
          ].join(" ")}
          aria-label="Intro"
        >
          <div className="text-center px-6">
            <p className="text-xs tracking-[0.35em] uppercase text-white/70">
              Solo para ti
            </p>

            <h1 className="mt-4 text-3xl sm:text-5xl font-semibold leading-tight">
              ¿Creíste que me olvidé de ti?
            </h1>

            <div className="mt-8 flex items-center justify-center gap-2 text-white/70">
              <span className="h-2 w-2 rounded-full bg-white/60 animate-pulse" />
              <span className="h-2 w-2 rounded-full bg-white/60 animate-pulse [animation-delay:150ms]" />
              <span className="h-2 w-2 rounded-full bg-white/60 animate-pulse [animation-delay:300ms]" />
            </div>
          </div>
        </section>
      )}

      {/* Contenido principal */}
      {phase === "content" && (
        <section
          className={[
            "relative z-10 mx-auto max-w-6xl px-5 sm:px-8 py-14 sm:py-20",
            "transition-all duration-700 ease-out",
            contentFadeIn
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4",
          ].join(" ")}
        >
          <Header reveal={reveal} setReveal={setReveal} />
          <Gallery media={media} />
          <Footer />
        </section>
      )}
    </main>
  );
}

// Los componentes Header, Gallery, MediaCard, Footer, Badge y AnimatedBackdrop
// se mantienen exactamente igual que en tu código anterior...

function Header({ reveal, setReveal }) {
  return (
    <header className="flex flex-col items-center text-center">
      <Badge text="Solo para ti ✨" />

      <h2 className="mt-5 text-3xl sm:text-5xl font-semibold leading-tight">
        Ha sido difícil, lo sé… y has quedado en mi mente.
      </h2>

      <p className="mt-4 max-w-2xl text-white/75 leading-relaxed">
        No sé cómo explicarlo sin sonar cursi… pero contigo me pasa eso. Así que
        hice esto para recordarte algo simple: te quiero un montón.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => setReveal((v) => !v)}
          className="group relative overflow-hidden rounded-2xl px-5 py-3 text-sm font-medium
                     bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur
                     transition-colors"
          type="button"
        >
          <span className="relative z-10">
            {reveal ? "Ocultar" : "Ver Nota"}
          </span>

          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              background:
                "radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(255,255,255,0.18), transparent 40%)",
            }}
            onMouseMove={(e) => {
              const el = e.currentTarget;
              const rect = el.getBoundingClientRect();
              el.style.setProperty("--x", `${e.clientX - rect.left}px`);
              el.style.setProperty("--y", `${e.clientY - rect.top}px`);
            }}
          />
        </button>

        <a
          href="#galeria"
          className="rounded-2xl px-5 py-3 text-sm font-medium
                     bg-gradient-to-r from-fuchsia-500/70 to-cyan-400/70
                     hover:from-fuchsia-500/80 hover:to-cyan-400/80
                     transition-colors shadow-lg shadow-fuchsia-500/10"
        >
          Ver galería
        </a>
      </div>

      <div
        className={[
          "mt-7 max-w-2xl rounded-3xl border border-white/12 bg-white/8 backdrop-blur p-6",
          "transition-all duration-500 ease-out",
          reveal
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none h-0 overflow-hidden p-0 border-transparent",
        ].join(" ")}
      >
        <p className="text-white/85 leading-relaxed">
          Perdóname por no seguirte en redes sociales y por no escribirte, soy
          muy débil con esas cosas. Pero quería que supieras que es por esa
          razón, si no lo hiciera, estaría todo el día viendo tus fotos y
          tendría la tentación de escribirte, y no podría concentrarme en nada
          más.
          <br />
          <br />
          Así que hice esta página para tener un lugar especial donde pueda
          verte y recordarte sin distracciones. Espero que te guste y que sepas
          que siempre te tendré presente.
        </p>
      </div>
    </header>
  );
}

function Gallery({ media }) {
  return (
    <section id="galeria" className="mt-14 sm:mt-20">
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <h3 className="text-2xl sm:text-3xl font-semibold">Tus momentos</h3>
          <p className="mt-2 text-white/70">
            Fotos y videos que me hacen sonreír… y pensar en ti.
          </p>
        </div>
      </div>

      <div className="mt-8 columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:balance]">
        {media.map((item, idx) => (
          <div key={idx} className="mb-4 break-inside-avoid">
            <MediaCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}

function MediaCard({ item }) {
  const caption = item.type === "image" ? (item.alt || "").trim() : "Video";

  return (
    <figure
      className="group relative overflow-hidden rounded-3xl border border-white/12 bg-white/5 backdrop-blur
                 shadow-xl shadow-black/20"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background:
            "radial-gradient(800px circle at 30% 20%, rgba(255,255,255,0.16), transparent 40%)",
        }}
      />

      {item.type === "image" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.src}
          alt={item.alt || "Foto"}
          className="w-full h-auto object-contain max-h-[600px] mx-auto transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          loading="lazy"
        />
      ) : (
        <video
          className="w-full h-auto object-contain max-h-[600px] mx-auto"
          src={item.src}
          poster={item.poster}
          controls
          playsInline
        />
      )}

      <figcaption className="p-4 pt-3">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm text-white/85 leading-snug">
            {caption || (item.type === "image" ? "Foto" : "Video")}
          </p>
          <span className="text-xs text-white/55 shrink-0">
            {item.type === "image" ? "📷" : "🎬"}
          </span>
        </div>
      </figcaption>
    </figure>
  );
}

function Footer() {
  return (
    <footer className="mt-16 sm:mt-24 pb-10 text-center text-white/60">
      <p className="text-sm">
        Hecho con cariño, con nervios… y con ganas de sacarte una sonrisa. 🌙
      </p>
    </footer>
  );
}

function Badge({ text }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/7 px-4 py-2 text-xs text-white/75 backdrop-blur">
      <span className="h-2 w-2 rounded-full bg-white/60" />
      {text}
    </span>
  );
}

function AnimatedBackdrop() {
  return (
    <div aria-hidden className="absolute inset-0">
      {/* Gradiente grande */}
      <div className="absolute -inset-32 opacity-70 blur-3xl animate-[float_10s_ease-in-out_infinite]">
        <div className="h-full w-full bg-gradient-to-br from-fuchsia-600/40 via-cyan-400/25 to-indigo-500/30" />
      </div>

      {/* "Bokeh" */}
      <div aria-hidden className="absolute inset-0 -z-10">
        {Array.from({ length: 16 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white/10 blur-xl animate-[drift_14s_ease-in-out_infinite]"
            style={{
              width: `${24 + (i % 6) * 18}px`,
              height: `${24 + (i % 6) * 18}px`,
              left: `${(i * 7) % 100}%`,
              top: `${(i * 11) % 100}%`,
              animationDelay: `${i * 0.35}s`,
            }}
          />
        ))}
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-black/55" />

      {/* Keyframes */}
      <style jsx global>{`
        @keyframes drift {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 0.35;
          }
          50% {
            transform: translate3d(18px, -22px, 0) scale(1.05);
            opacity: 0.55;
          }
          100% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 0.35;
          }
        }
        @keyframes float {
          0% {
            transform: translate3d(0, 0, 0) scale(1.02);
          }
          50% {
            transform: translate3d(-18px, 12px, 0) scale(1.06);
          }
          100% {
            transform: translate3d(0, 0, 0) scale(1.02);
          }
        }
      `}</style>
    </div>
  );
}
