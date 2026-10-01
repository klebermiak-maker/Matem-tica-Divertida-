import React, { useState } from 'react';
import { sounds } from '../utils/audio';
import { X, Grid, Plus, Minus, Sparkles, HelpCircle } from 'lucide-react';

interface MalhaQuadriculadaProps {
  rows: number;
  cols: number;
  rowLabel?: string;
  colLabel?: string;
  interactive?: boolean;
  className?: string;
}

export const MalhaQuadriculada: React.FC<MalhaQuadriculadaProps> = ({
  rows,
  cols,
  rowLabel,
  colLabel,
  interactive = true,
  className = '',
}) => {
  const [hoveredCell, setHoveredCell] = useState<{ r: number; c: number } | null>(null);
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number } | null>(null);

  const activeRows = rows;
  const activeCols = cols;
  const totalArea = activeRows * activeCols;

  return (
    <div className={`flex flex-col items-center gap-3.5 p-4 sm:p-5 bg-gradient-to-b from-indigo-50/70 via-sky-50/40 to-indigo-50/80 border-2 border-indigo-200 rounded-3xl shadow-xs select-none ${className}`}>
      {/* Principle Banner */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-semibold text-slate-700">
        <span className="bg-indigo-100/90 text-indigo-950 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 shadow-xs border border-indigo-200">
          <span>📏</span>
          <span>{activeRows} {rowLabel ? `${rowLabel} (Linhas)` : 'Linhas'}</span>
        </span>
        <span className="font-extrabold text-indigo-500 text-lg">×</span>
        <span className="bg-sky-100/90 text-sky-950 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 shadow-xs border border-sky-200">
          <span>📐</span>
          <span>{activeCols} {colLabel ? `${colLabel} (Colunas)` : 'Colunas'}</span>
        </span>
        <span className="font-extrabold text-indigo-500 text-lg">=</span>
        <span className="bg-emerald-100/90 text-emerald-950 px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 shadow-xs border border-emerald-300">
          <span>🟩</span>
          <span className="font-fun text-sm">{totalArea} Quadradinhos</span>
        </span>
      </div>

      {/* Grid Canvas Wrapper */}
      <div className="overflow-x-auto max-w-full p-2 flex flex-col items-center">
        {/* Column indices header */}
        <div className="flex items-center pl-7 sm:pl-9 mb-1.5 gap-1 sm:gap-1.5">
          {Array.from({ length: cols }).map((_, cIdx) => {
            const isColHighlighted =
              (hoveredCell && hoveredCell.c === cIdx + 1) ||
              (selectedCell && selectedCell.c === cIdx + 1);

            return (
              <div
                key={cIdx}
                className={`w-7 h-6 sm:w-10 sm:h-7 flex items-center justify-center font-fun text-xs font-bold transition-all ${
                  isColHighlighted
                    ? 'text-sky-900 bg-sky-200 rounded-lg scale-110 shadow-xs'
                    : 'text-slate-400'
                }`}
                title={`Coluna ${cIdx + 1}`}
              >
                {cIdx + 1}
              </div>
            );
          })}
        </div>

        {/* Rows and Grid Body */}
        <div className="flex flex-col gap-1 sm:gap-1.5">
          {Array.from({ length: rows }).map((_, rIdx) => {
            const isRowHighlighted =
              (hoveredCell && hoveredCell.r === rIdx + 1) ||
              (selectedCell && selectedCell.r === rIdx + 1);

            return (
              <div key={rIdx} className="flex items-center gap-1 sm:gap-1.5">
                {/* Row index on left */}
                <div
                  className={`w-6 h-7 sm:w-8 sm:h-10 flex items-center justify-center font-fun text-xs font-bold transition-all ${
                    isRowHighlighted
                      ? 'text-indigo-900 bg-indigo-200 rounded-lg scale-110 shadow-xs'
                      : 'text-slate-400'
                  }`}
                  title={`Linha ${rIdx + 1}`}
                >
                  {rIdx + 1}
                </div>

                {/* Grid cells */}
                <div className="flex gap-1 sm:gap-1.5">
                  {Array.from({ length: cols }).map((_, cIdx) => {
                    const cellNum = rIdx * cols + (cIdx + 1);
                    const isHovered =
                      hoveredCell &&
                      hoveredCell.r === rIdx + 1 &&
                      hoveredCell.c === cIdx + 1;
                    const isSelected =
                      selectedCell &&
                      selectedCell.r === rIdx + 1 &&
                      selectedCell.c === cIdx + 1;
                    const inSameRow =
                      hoveredCell && hoveredCell.r === rIdx + 1;
                    const inSameCol =
                      hoveredCell && hoveredCell.c === cIdx + 1;

                    let bgStyle = 'bg-white/90 border-indigo-200 text-indigo-700 hover:border-indigo-400';

                    if (isSelected) {
                      bgStyle = 'bg-amber-400 border-amber-600 text-amber-950 scale-105 shadow-sm ring-2 ring-amber-300';
                    } else if (isHovered) {
                      bgStyle = 'bg-amber-300 border-amber-500 text-amber-950 scale-105 shadow-xs';
                    } else if (inSameRow || inSameCol) {
                      bgStyle = 'bg-indigo-100/90 border-indigo-300 text-indigo-900';
                    }

                    return (
                      <button
                        key={cIdx}
                        type="button"
                        onMouseEnter={() => {
                          if (interactive) setHoveredCell({ r: rIdx + 1, c: cIdx + 1 });
                        }}
                        onMouseLeave={() => {
                          if (interactive) setHoveredCell(null);
                        }}
                        onClick={() => {
                          if (interactive) {
                            sounds.playClick();
                            setSelectedCell((prev) =>
                              prev && prev.r === rIdx + 1 && prev.c === cIdx + 1
                                ? null
                                : { r: rIdx + 1, c: cIdx + 1 }
                            );
                          }
                        }}
                        className={`w-7 h-7 sm:w-10 sm:h-10 rounded-xl border-2 flex items-center justify-center font-fun text-[11px] sm:text-xs font-bold transition-all cursor-pointer select-none ${bgStyle}`}
                        title={`Linha ${rIdx + 1}, Coluna ${cIdx + 1} = Item ${cellNum}`}
                      >
                        <span>{cellNum}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pedagogical multiplicative sentence breakdown */}
      <div className="bg-white/95 border border-indigo-100 rounded-2xl px-4 py-2.5 text-center text-xs text-slate-600 max-w-lg shadow-xs space-y-1">
        <p className="font-fun font-bold text-sm text-indigo-950 flex items-center justify-center gap-1.5">
          <span>📐 Princípio Multiplicativo · Disposição Retangular</span>
        </p>
        <p className="text-slate-700">
          São <strong>{rows}</strong> {rowLabel ? rowLabel.toLowerCase() : 'linhas'}, com{' '}
          <strong>{cols}</strong> {colLabel ? colLabel.toLowerCase() : 'quadradinhos'} em cada uma:{' '}
          <strong className="text-indigo-600 font-fun text-sm">
            {rows <= 6
              ? `${Array.from({ length: rows }).map(() => cols).join(' + ')} = `
              : ''}
            {rows} × {cols} = {totalArea}
          </strong>
        </p>
        <p className="text-[11px] text-slate-400">
          Toque em qualquer quadradinho para inspecionar sua linha e coluna!
        </p>
      </div>
    </div>
  );
};

interface MalhaQuadriculadaModalProps {
  initialRows?: number;
  initialCols?: number;
  rowLabel?: string;
  colLabel?: string;
  onClose: () => void;
}

export const MalhaQuadriculadaModal: React.FC<MalhaQuadriculadaModalProps> = ({
  initialRows = 3,
  initialCols = 4,
  rowLabel,
  colLabel,
  onClose,
}) => {
  const [labRows, setLabRows] = useState(Math.min(8, Math.max(1, initialRows)));
  const [labCols, setLabCols] = useState(Math.min(9, Math.max(1, initialCols)));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-pop">
      <div className="bg-white rounded-3xl max-w-2xl w-full border-4 border-indigo-300 shadow-2xl p-5 sm:p-7 space-y-5 max-h-[92vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-indigo-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 flex items-center justify-center text-xl">
              📐
            </div>
            <div>
              <h3 className="font-fun text-lg sm:text-xl font-bold text-slate-900">
                Laboratório da Malha Quadriculada
              </h3>
              <p className="text-xs text-slate-500">
                Princípio multiplicativo da disposição retangular
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Controls to change rows and cols */}
        <div className="grid grid-cols-2 gap-3 bg-indigo-50/60 p-3.5 rounded-2xl border border-indigo-100">
          {/* Rows control */}
          <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-indigo-100 shadow-xs">
            <span className="text-xs font-bold text-slate-700">Linhas (altura):</span>
            <div className="flex items-center gap-2">
              <button
                disabled={labRows <= 1}
                onClick={() => {
                  sounds.playClick();
                  setLabRows((r) => Math.max(1, r - 1));
                }}
                className="w-7 h-7 rounded-lg bg-indigo-100 hover:bg-indigo-200 disabled:opacity-30 text-indigo-900 font-bold flex items-center justify-center cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-fun font-bold text-base text-indigo-900 w-5 text-center">
                {labRows}
              </span>
              <button
                disabled={labRows >= 8}
                onClick={() => {
                  sounds.playClick();
                  setLabRows((r) => Math.min(8, r + 1));
                }}
                className="w-7 h-7 rounded-lg bg-indigo-100 hover:bg-indigo-200 disabled:opacity-30 text-indigo-900 font-bold flex items-center justify-center cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Cols control */}
          <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-indigo-100 shadow-xs">
            <span className="text-xs font-bold text-slate-700">Colunas (largura):</span>
            <div className="flex items-center gap-2">
              <button
                disabled={labCols <= 1}
                onClick={() => {
                  sounds.playClick();
                  setLabCols((c) => Math.max(1, c - 1));
                }}
                className="w-7 h-7 rounded-lg bg-sky-100 hover:bg-sky-200 disabled:opacity-30 text-sky-900 font-bold flex items-center justify-center cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-fun font-bold text-base text-sky-900 w-5 text-center">
                {labCols}
              </span>
              <button
                disabled={labCols >= 9}
                onClick={() => {
                  sounds.playClick();
                  setLabCols((c) => Math.min(9, c + 1));
                }}
                className="w-7 h-7 rounded-lg bg-sky-100 hover:bg-sky-200 disabled:opacity-30 text-sky-900 font-bold flex items-center justify-center cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* The Live Interactive Malha */}
        <div className="flex justify-center">
          <MalhaQuadriculada
            rows={labRows}
            cols={labCols}
            rowLabel={rowLabel}
            colLabel={colLabel}
            interactive={true}
            className="w-full"
          />
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-fun font-bold text-sm rounded-xl transition-colors cursor-pointer shadow-sm"
          >
            Voltar ao Jogo
          </button>
        </div>
      </div>
    </div>
  );
};

