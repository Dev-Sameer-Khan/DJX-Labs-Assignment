import { useEffect, useRef, useState } from "react";
import { useProgress } from "@react-three/drei";
import { gsap } from "gsap";

const BLUE = "#1a4fd6";
const BLUE_LIGHT = "#3b6ef5";
const BLUE_DIM = "rgba(26,79,214,0.18)";
const BLUE_GLOW = "rgba(59,110,245,0.35)";

function Stars({ count = 120 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      alpha: Math.random() * 0.7 + 0.1,
      speed: Math.random() * 0.004 + 0.002,
      phase: Math.random() * Math.PI * 2,
    }));

    let raf;
    const draw = (t) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        const a =
          s.alpha * (0.5 + 0.5 * Math.sin(t * s.speed * 1000 + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

export default function SpaceLoader({ onEnter }) {
  const { progress, active } = useProgress();

  const wrapperRef = useRef(null);
  const barRef = useRef(null);
  const pctRef = useRef(null);
  const orbitRef = useRef(null);
  const planetRef = useRef(null);
  const btnGroupRef = useRef(null);

  const [done, setDone] = useState(false);
  const progressObj = useRef({ val: 0 });
  const loadComplete = useRef(false);

  useEffect(() => {
    gsap.to(orbitRef.current, {
      rotation: 360,
      duration: 3,
      ease: "none",
      repeat: -1,
      transformOrigin: "50% 50%",
    });

    gsap.to(planetRef.current, {
      boxShadow: `0 0 36px ${BLUE_LIGHT}, 0 0 72px ${BLUE_GLOW}`,
      duration: 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, []);

  useEffect(() => {
    gsap.to(progressObj.current, {
      val: progress,
      duration: 0.4,
      ease: "power2.out",
      onUpdate() {
        const v = Math.round(progressObj.current.val);
        if (barRef.current) barRef.current.style.width = `${v}%`;
        if (pctRef.current) pctRef.current.textContent = `${v}%`;
      },
    });

    if (!active && progress === 100 && !loadComplete.current) {
      loadComplete.current = true;
      setTimeout(revealButton, 400);
    }
  }, [progress, active]);

  function revealButton() {
    gsap.to(btnGroupRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }

  const audio = useRef(null);

  function handleEnter() {
    audio.current.play();
    gsap.to(wrapperRef.current, {
      y: "-100%",
      opacity: 0,
      duration: 1.1,
      ease: "power3.inOut",
    });
  }

  if (done) return null;

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#000814",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        fontFamily: "Orbitron, sansSerif",
        overflow: "hidden",
      }}
    >
      <audio ref={audio} src="/home.mp3" autoPlay loop />
      <Stars count={120} />

      <div style={{ position: "relative", width: 100, height: 100 }}>
        <svg
          ref={orbitRef}
          viewBox="0 0 100 100"
          style={{ width: 100, height: 100, display: "block" }}
        >
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke={BLUE_DIM}
            strokeWidth="1"
          />
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke={BLUE}
            strokeWidth="1.5"
            strokeDasharray="40 240"
            strokeLinecap="round"
          />
          <circle cx="50" cy="6" r="4" fill={BLUE_LIGHT} />
          <circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke="rgba(59,110,245,0.1)"
            strokeWidth="1"
          />
          <circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke={BLUE_LIGHT}
            strokeWidth="1"
            strokeDasharray="15 173"
            strokeLinecap="round"
            strokeDashoffset="20"
          />
        </svg>

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            ref={planetRef}
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: `radial-gradient(circle at 35% 35%, ${BLUE_LIGHT}, ${BLUE} 60%, #0b2a8a)`,
              boxShadow: `0 0 24px ${BLUE_GLOW}, 0 0 48px rgba(26,79,214,0.3)`,
            }}
          />
        </div>
      </div>

      <div
        className="orbiton"
        style={{
          fontSize: 15,
          // letterSpacing: "0.35em",
          color: "rgba(255,255,255,0.4)",
          textTransform: "uppercase",
        }}
      >
        Initializing experience
      </div>

      <div
        style={{
          width: 160,
          height: 2,
          background: "rgba(255,255,255,0.08)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          ref={barRef}
          style={{
            height: "100%",
            width: "0%",
            background: `linear-gradient(90deg, ${BLUE}, ${BLUE_LIGHT})`,
            borderRadius: 2,
            boxShadow: `0 0 8px ${BLUE_GLOW}`,
          }}
        />
      </div>

      <div
        ref={pctRef}
        style={{
          fontSize: 11,
          letterSpacing: "0.15em",
          color: "rgba(255,255,255,0.35)",
        }}
      >
        0%
      </div>

      {/* INSTRUCTIONS */}
      <div
      className="orbiton"
        style={{
          textAlign: "center",
          maxWidth: 320,
          color: "rgba(255,255,255,0.68)",
          fontSize: 13,
          background: "rgba(17,24,39,0.21)",
          borderRadius: 6,
          padding: "13px 18px 10px 18px",
          // fontFamily: "'Inter'",
          textTransform : "capitalize",
          boxShadow: "0 2px 14px 0 rgba(26,79,214,0.08)",
        }}
      >
        <div>
          <b>Scroll</b> to move through space and discover new locations.
          <br />
          <b>Click</b> on <span style={{ color: BLUE_LIGHT }}>islands</span> to
          preview immersive content.
        </div>
      </div>

      <div
        ref={btnGroupRef}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
          opacity: 0,
          transform: "translateY(20px)",
        }}
      >
        <div
          style={{
            width: 80,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${BLUE}, ${BLUE_LIGHT}, transparent)`,
          }}
        />

        <button
          onClick={handleEnter}
          style={{
            padding: "14px 36px",
            border: `1px solid rgba(59,110,245,0.6)`,
            background: "rgba(26,79,214,0.12)",
            color: "#fff",
            fontSize: 12,
            // letterSpacing: "0.25em",
            fontFamily: "'Orbiton', sans-serif",
            textTransform: "uppercase",
            cursor: "pointer",
            borderRadius: 2,
            transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(26,79,214,0.28)";
            e.currentTarget.style.borderColor = "rgba(59,110,245,0.9)";
            e.currentTarget.style.boxShadow = `0 0 20px ${BLUE_DIM}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(26,79,214,0.12)";
            e.currentTarget.style.borderColor = "rgba(59,110,245,0.6)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Enter the Experience
        </button>
      </div>
    </div>
  );
}
