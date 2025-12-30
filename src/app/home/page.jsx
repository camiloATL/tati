"use client";

import { useEffect, useMemo, useState } from "react";

export default function Page() {
  const [phase] = useState("content"); // Eliminado "pin" e "intro"
  const [contentFadeIn, setContentFadeIn] = useState(false);
  const [reveal, setReveal] = useState(false);

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

  useEffect(() => {
    // Mostrar contenido directamente con animación
    const timer = setTimeout(() => {
      setContentFadeIn(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#07040f] text-white">
      <AnimatedBackdrop />

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

function Header({ reveal, setReveal }) {
  return (
    <header className="flex flex-col items-center text-center">
      <Badge text="Solo para ti ✨" />

      <h2 className="mt-5 text-3xl sm:text-5xl font-semibold leading-tight">
       Señorita Tatiana! no ha sido difícil, lo sé… y has quedado en mi mente.
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
