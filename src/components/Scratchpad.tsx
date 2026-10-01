import React, { useRef, useState, useEffect } from 'react';
import { Eraser, Pen, RotateCcw, X, Minus, Maximize2 } from 'lucide-react';
import { sounds } from '../utils/audio';

interface ScratchpadProps {
  onClose?: () => void;
}

export const Scratchpad: React.FC<ScratchpadProps> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#2563EB'); // Blue pencil
  const [lineWidth, setLineWidth] = useState(3);
  const [isEraser, setIsEraser] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high-DPI scaling
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, [isMinimized]);

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    canvas.setPointerCapture(e.pointerId);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.strokeStyle = isEraser ? '#FFFFFF' : color;
    ctx.lineWidth = isEraser ? 16 : lineWidth;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas && canvas.hasPointerCapture(e.pointerId)) {
      canvas.releasePointerCapture(e.pointerId);
    }
  };

  const clearCanvas = () => {
    sounds.playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  if (isMinimized) {
    return (
      <button
        onClick={() => {
          sounds.playClick();
          setIsMinimized(false);
        }}
        className="fixed bottom-4 right-4 z-40 bg-indigo-600 hover:bg-indigo-700 text-white font-fun text-xs px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 border-2 border-white transition-all transform hover:scale-105"
      >
        <Pen className="w-4 h-4" />
        <span>Abrir Rascunho / Lousa</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 w-80 sm:w-96 bg-white rounded-2xl border-2 border-indigo-200 shadow-2xl flex flex-col overflow-hidden animate-pop">
      {/* Scratchpad Header */}
      <div className="bg-indigo-50 border-b border-indigo-100 px-3.5 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-base">📝</span>
          <span className="font-fun font-bold text-xs text-indigo-950">Lousa de Rascunho</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              sounds.playClick();
              setIsMinimized(true);
            }}
            title="Minimizar"
            className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-indigo-100 transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          {onClose && (
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              title="Fechar"
              className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-indigo-100 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Tools bar */}
      <div className="px-3 py-2 bg-slate-50/90 border-b border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          {/* Colors */}
          {[
            { c: '#1E293B', label: 'Grafite' },
            { c: '#2563EB', label: 'Azul' },
            { c: '#DC2626', label: 'Vermelho' },
            { c: '#059669', label: 'Verde' },
          ].map(({ c, label }) => (
            <button
              key={c}
              onClick={() => {
                sounds.playClick();
                setColor(c);
                setIsEraser(false);
              }}
              title={label}
              className={`w-5 h-5 rounded-full transition-transform ${
                !isEraser && color === c ? 'scale-125 ring-2 ring-indigo-400 ring-offset-1' : 'opacity-80 hover:opacity-100'
              }`}
              style={{ backgroundColor: c }}
            />
          ))}

          <span className="w-px h-4 bg-slate-200 mx-0.5" />

          {/* Eraser */}
          <button
            onClick={() => {
              sounds.playClick();
              setIsEraser(!isEraser);
            }}
            title="Borracha"
            className={`p-1 rounded ${
              isEraser ? 'bg-indigo-100 text-indigo-700 font-bold' : 'text-slate-500 hover:bg-slate-200/60'
            }`}
          >
            <Eraser className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          onClick={clearCanvas}
          title="Limpar tudo"
          className="flex items-center gap-1 px-2 py-1 text-[11px] font-semibold text-slate-500 hover:text-rose-600 rounded hover:bg-rose-50 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Limpar
        </button>
      </div>

      {/* Grid Canvas */}
      <div className="relative h-44 sm:h-52 bg-white bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] touch-none">
        <canvas
          ref={canvasRef}
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={stopDrawing}
          onPointerCancel={stopDrawing}
          className="w-full h-full cursor-crosshair"
        />
        <span className="absolute bottom-1 right-2 text-[10px] text-slate-300 pointer-events-none select-none">
          Arme sua continha aqui! ✍️
        </span>
      </div>
    </div>
  );
};
