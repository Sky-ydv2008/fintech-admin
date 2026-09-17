import React, { useEffect, useRef } from 'react';

export const AdminOrb: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 300);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 300);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      angle += 0.015;

      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.35;

      // Glow backdrop
      const radialGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        5,
        centerX,
        centerY,
        radius * 1.5
      );
      radialGlow.addColorStop(0, 'rgba(255, 94, 0, 0.2)');
      radialGlow.addColorStop(1, 'rgba(5, 5, 8, 0)');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // Rotating Control Rings
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.ellipse(
          centerX,
          centerY,
          radius * (i * 0.3),
          radius * (i * 0.15),
          angle * (i % 2 === 0 ? 1 : -1),
          0,
          Math.PI * 2
        );
        ctx.strokeStyle = `rgba(255, ${94 + i * 40}, 0, ${0.4 - i * 0.08})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Core Shield Sphere
      ctx.beginPath();
      ctx.arc(centerX, centerY, 14, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = '#FF5E00';
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-[220px] flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};
