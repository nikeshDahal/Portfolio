// components/ParticleCanvas.tsx
import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>(0);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  const createParticles = useCallback((ctx: CanvasRenderingContext2D) => {
    particles.current = [];
    const numParticles = Math.min(
      100,
      Math.floor((window.innerWidth * window.innerHeight) / 10000)
    );

    for (let i = 0; i < numParticles; i++) {
      particles.current.push({
        x: Math.random() * ctx.canvas.width,
        y: Math.random() * ctx.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.5,
        color: `rgba(0, 255, 255, ${0.2 + Math.random() * 0.3})`,
      });
    }
  }, []);

  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    particles.current.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > ctx.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > ctx.canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });

    for (let i = 0; i < particles.current.length; i++) {
      for (let j = i + 1; j < particles.current.length; j++) {
        const p1 = particles.current[i];
        const p2 = particles.current[j];
        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        const maxDist = Math.min(200, Math.max(80, window.innerWidth / 5));

        if (dist < maxDist) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 255, 255, ${1 - (dist / maxDist) * 0.8})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    const mouseParticle = { x: mouse.current.x, y: mouse.current.y };
    particles.current.forEach((p) => {
      const dist = Math.hypot(p.x - mouseParticle.x, p.y - mouseParticle.y);
      const maxMouseDist = Math.min(300, Math.max(150, window.innerWidth / 3));

      if (dist < maxMouseDist) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouseParticle.x, mouseParticle.y);
        ctx.strokeStyle = `rgba(0, 190, 255, ${
          1 - (dist / maxMouseDist) * 0.7
        })`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    });

    animationFrameId.current = requestAnimationFrame(() => draw(ctx));
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      createParticles(ctx);
    }
  }, [createParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    resizeCanvas();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);

    if (ctx) {
      animationFrameId.current = requestAnimationFrame(() => draw(ctx));
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId.current)
        cancelAnimationFrame(animationFrameId.current);
    };
  }, [draw, resizeCanvas]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 bg-transparent"
    />
  );
};

export default ParticleCanvas;
