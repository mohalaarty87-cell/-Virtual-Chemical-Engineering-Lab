import React, { useEffect, useRef, useState } from 'react';
import { CategoryType } from '../types';

interface InteractiveSimCanvasProps {
  category: CategoryType;
  simulatorId: string;
  title: string;
}

export const InteractiveSimCanvas: React.FC<InteractiveSimCanvasProps> = ({
  category,
  simulatorId,
  title,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [paramValue, setParamValue] = useState<number>(50); // generic dynamic control (0 - 100)
  const [isRunning, setIsRunning] = useState<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Molecule particles for reactors/diffusion
    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * 260 + 20,
      y: Math.random() * 160 + 20,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      radius: Math.random() * 3 + 2,
      color: Math.random() > 0.5 ? '#00d4ff' : '#f59e0b',
    }));

    const render = () => {
      time += 0.03;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 25) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 25) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      if (category === 'reactor') {
        // Reactor Vessel drawing
        const vesselX = width / 2 - 80;
        const vesselY = 30;
        const vesselW = 160;
        const vesselH = 140;

        // Cooling Jacket
        ctx.fillStyle = 'rgba(0, 212, 255, 0.12)';
        ctx.strokeStyle = '#00d4ff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(vesselX - 12, vesselY + 20, vesselW + 24, vesselH - 10, 16);
        ctx.fill();
        ctx.stroke();

        // Inner Tank
        const tankGrad = ctx.createLinearGradient(vesselX, vesselY, vesselX, vesselY + vesselH);
        const hueShift = Math.floor(180 + (paramValue / 100) * 140);
        tankGrad.addColorStop(0, `hsla(${hueShift}, 85%, 45%, 0.4)`);
        tankGrad.addColorStop(1, `hsla(${hueShift + 40}, 90%, 50%, 0.7)`);

        ctx.fillStyle = tankGrad;
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.roundRect(vesselX, vesselY, vesselW, vesselH, [0, 0, 24, 24]);
        ctx.fill();
        ctx.stroke();

        // Agitator shaft & rotating impeller
        const agitatorSpeed = (paramValue / 50) * 2;
        const angle = isRunning ? time * agitatorSpeed * 4 : 0;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(width / 2, 10);
        ctx.lineTo(width / 2, vesselY + vesselH - 30);
        ctx.stroke();

        // Impeller blades
        const bladeW = 40 * Math.cos(angle);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(width / 2 - bladeW, vesselY + vesselH - 35);
        ctx.lineTo(width / 2 + bladeW, vesselY + vesselH - 35);
        ctx.stroke();

        // Animated fluid particles
        if (isRunning) {
          particles.forEach((p) => {
            p.x += p.vx * (paramValue / 50);
            p.y += p.vy * (paramValue / 50);
            if (p.x < vesselX + 10 || p.x > vesselX + vesselW - 10) p.vx *= -1;
            if (p.y < vesselY + 20 || p.y > vesselY + vesselH - 15) p.vy *= -1;

            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
          });
        }

        // Inlet and Outlet pipes
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 5;
        // Inflow
        ctx.beginPath();
        ctx.moveTo(vesselX - 25, vesselY + 30);
        ctx.lineTo(vesselX, vesselY + 30);
        ctx.stroke();
        // Outflow
        ctx.beginPath();
        ctx.moveTo(vesselX + vesselW, vesselY + vesselH - 25);
        ctx.lineTo(vesselX + vesselW + 25, vesselY + vesselH - 25);
        ctx.stroke();

        // Labels
        ctx.font = '10px Cairo, sans-serif';
        ctx.fillStyle = '#38bdf8';
        ctx.fillText('Feed IN', vesselX - 35, vesselY + 25);
        ctx.fillStyle = '#34d399';
        ctx.fillText('Product OUT', vesselX + vesselW + 5, vesselY + vesselH - 30);

      } else if (category === 'transfer') {
        // Distillation Column / Heat Exchanger tower
        const colX = width / 2 - 50;
        const colY = 20;
        const colW = 100;
        const colH = 165;

        // Column Shell
        ctx.fillStyle = 'rgba(30, 41, 59, 0.7)';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(colX, colY, colW, colH, 18);
        ctx.fill();
        ctx.stroke();

        // Draw Trays (5 trays)
        const trayCount = 5;
        const spacing = (colH - 40) / trayCount;
        for (let i = 0; i < trayCount; i++) {
          const trayY = colY + 25 + i * spacing;
          ctx.strokeStyle = '#94a3b8';
          ctx.lineWidth = 2;
          ctx.beginPath();
          // Alternate weir sides
          if (i % 2 === 0) {
            ctx.moveTo(colX + 10, trayY);
            ctx.lineTo(colX + colW - 5, trayY);
          } else {
            ctx.moveTo(colX + 5, trayY);
            ctx.lineTo(colX + colW - 10, trayY);
          }
          ctx.stroke();

          // Liquid froth on trays
          if (isRunning) {
            ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
            ctx.fillRect(colX + 10, trayY - 6, colW - 20, 5);

            // Tiny bubbles
            for (let b = 0; b < 3; b++) {
              ctx.fillStyle = '#ffffff';
              const bx = colX + 15 + ((i * 30 + b * 25 + time * 40) % (colW - 30));
              ctx.beginPath();
              ctx.arc(bx, trayY - 8 - Math.sin(time + b) * 3, 1.8, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }

        // Condenser & Reboiler
        ctx.fillStyle = 'rgba(124, 58, 237, 0.4)';
        ctx.strokeStyle = '#a855f7';
        // Top Condenser
        ctx.beginPath();
        ctx.roundRect(width / 2 + 65, 25, 45, 30, 6);
        ctx.fill();
        ctx.stroke();
        // Bottom Reboiler
        ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
        ctx.strokeStyle = '#ef4444';
        ctx.beginPath();
        ctx.roundRect(width / 2 - 110, colY + colH - 35, 45, 30, 6);
        ctx.fill();
        ctx.stroke();

        // Connect lines
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;
        // Vapor up to condenser
        ctx.beginPath();
        ctx.moveTo(colX + colW / 2, colY);
        ctx.lineTo(colX + colW / 2, 10);
        ctx.lineTo(width / 2 + 85, 10);
        ctx.lineTo(width / 2 + 85, 25);
        ctx.stroke();

        // Liquid down to reboiler
        ctx.beginPath();
        ctx.moveTo(colX + 20, colY + colH);
        ctx.lineTo(colX + 20, colY + colH + 12);
        ctx.lineTo(width / 2 - 85, colY + colH + 12);
        ctx.lineTo(width / 2 - 85, colY + colH - 5);
        ctx.stroke();

        ctx.font = '9px Cairo, sans-serif';
        ctx.fillStyle = '#a855f7';
        ctx.fillText('Condenser', width / 2 + 65, 20);
        ctx.fillStyle = '#ef4444';
        ctx.fillText('Reboiler', width / 2 - 110, colY + colH + 22);

      } else if (category === 'phenomena') {
        // Concentration gradient & Fickian diffusion
        const boxX = 40;
        const boxY = 40;
        const boxW = width - 80;
        const boxH = 120;

        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.strokeRect(boxX, boxY, boxW, boxH);

        // Gradient inside
        const grad = ctx.createLinearGradient(boxX, 0, boxX + boxW, 0);
        grad.addColorStop(0, 'rgba(16, 185, 129, 0.8)');
        grad.addColorStop(1, 'rgba(16, 185, 129, 0.05)');
        ctx.fillStyle = grad;
        ctx.fillRect(boxX, boxY, boxW, boxH);

        // Diffusion curve overlay
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let x = 0; x <= boxW; x += 5) {
          const z = x / boxW;
          // Curve depends on paramValue
          const decay = (paramValue / 40) + 0.5;
          const y = boxY + 15 + Math.exp(-z * decay) * (boxH - 30) * (1 - 0.2 * Math.sin(time));
          if (x === 0) ctx.moveTo(boxX + x, y);
          else ctx.lineTo(boxX + x, y);
        }
        ctx.stroke();

        // Molecular dots
        if (isRunning) {
          for (let i = 0; i < 40; i++) {
            const spread = Math.pow(Math.random(), 1.5);
            const px = boxX + spread * boxW;
            const py = boxY + 10 + Math.random() * (boxH - 20);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.beginPath();
            ctx.arc(px, py, 1.8, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        ctx.font = '11px Cairo, sans-serif';
        ctx.fillStyle = '#34d399';
        ctx.fillText('High Concentration (CA0)', boxX, boxY - 10);
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('Low Concentration (CA)', boxX + boxW - 120, boxY - 10);

      } else {
        // Control: Step response curve & PID dynamic response
        const graphX = 50;
        const graphY = 30;
        const graphW = width - 80;
        const graphH = 130;

        // Axes
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(graphX, graphY);
        ctx.lineTo(graphX, graphY + graphH);
        ctx.lineTo(graphX + graphW, graphY + graphH);
        ctx.stroke();

        // Setpoint dashed line
        const spY = graphY + graphH * 0.35;
        ctx.strokeStyle = '#f59e0b';
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(graphX, spY);
        ctx.lineTo(graphX + graphW, spY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Underdamped 2nd-order response curve
        ctx.strokeStyle = '#a855f7';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        const zeta = 0.15 + (paramValue / 100) * 0.7; // damping factor
        const wn = 5.0;

        for (let t = 0; t <= 1; t += 0.01) {
          const px = graphX + t * graphW;
          // Step response equation y(t) = 1 - exp(-zeta*wn*t) * ...
          const decay = Math.exp(-zeta * wn * (t * 4));
          const osc = Math.cos(wn * (t * 4) - (isRunning ? time * 0.5 : 0));
          const val = 1 - decay * osc;
          const py = graphY + graphH - val * (graphH * 0.65);
          if (t === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();

        // Indicator point
        const headT = (time * 0.2) % 1;
        const curX = graphX + headT * graphW;
        const curDecay = Math.exp(-zeta * wn * (headT * 4));
        const curOsc = Math.cos(wn * (headT * 4) - (isRunning ? time * 0.5 : 0));
        const curVal = 1 - curDecay * curOsc;
        const curY = graphY + graphH - curVal * (graphH * 0.65);

        ctx.fillStyle = '#ec4899';
        ctx.beginPath();
        ctx.arc(curX, curY, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();

        ctx.font = '10px Cairo, sans-serif';
        ctx.fillStyle = '#f59e0b';
        ctx.fillText('Setpoint (SP)', graphX + graphW - 75, spY - 6);
        ctx.fillStyle = '#a855f7';
        ctx.fillText('Process Variable (PV)', graphX + 10, graphY + 15);
      }

      if (isRunning) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [category, simulatorId, paramValue, isRunning]);

  return (
    <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
          <span className="text-xs font-semibold text-cyan-300 font-mono tracking-wider">
            LIVE 2D/3D VISUALIZER
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
          >
            {isRunning ? 'إيقاف مؤقت (Pause)' : 'تشغيل (Resume)'}
          </button>
        </div>
      </div>

      <div className="relative flex justify-center items-center overflow-hidden rounded-lg bg-black/40">
        <canvas
          ref={canvasRef}
          width={380}
          height={210}
          className="w-full max-w-[420px] h-[210px] object-contain"
        />
      </div>

      {/* Interactive slider */}
      <div className="flex items-center gap-3 text-xs text-slate-300 pt-1">
        <span className="shrink-0 text-slate-400">
          {category === 'reactor'
            ? 'سرعة التحريك / الحرارة:'
            : category === 'transfer'
            ? 'نسبة الارتجاع / التدفق:'
            : category === 'phenomena'
            ? 'معامل الانتشار D:'
            : 'معامل التخميد ζ / الكسب:'}
        </span>
        <input
          type="range"
          min="10"
          max="100"
          value={paramValue}
          onChange={(e) => setParamValue(Number(e.target.value))}
          className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
        />
        <span className="font-mono text-cyan-400 shrink-0 w-8 text-end">{paramValue}%</span>
      </div>
    </div>
  );
};
