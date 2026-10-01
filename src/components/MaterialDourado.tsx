import React, { useState } from 'react';
import { MathQuestion } from '../types';
import { Sparkles, X, Plus, Minus, RotateCcw } from 'lucide-react';
import { sounds } from '../utils/audio';

interface MaterialDouradoProps {
  question?: MathQuestion;
  onClose: () => void;
}

export const MaterialDouradoModal: React.FC<MaterialDouradoProps> = ({ question, onClose }) => {
  const [activeTab, setActiveTab] = useState<'questionVisual' | 'freeExplorer'>('questionVisual');

  // Free explorer state including Thousands (Milhar)
  const [thousands, setThousands] = useState<number>(0);
  const [plates, setPlates] = useState<number>(0);
  const [bars, setBars] = useState<number>(0);
  const [cubes, setCubes] = useState<number>(0);

  const explorerTotal = thousands * 1000 + plates * 100 + bars * 10 + cubes;

  const handleAddCube = () => {
    sounds.playClick();
    if (cubes + 1 >= 10) {
      // Regroup 10 cubes into 1 bar!
      setCubes(0);
      handleAddBar();
    } else {
      setCubes((c) => c + 1);
    }
  };

  const handleAddBar = () => {
    sounds.playClick();
    if (bars + 1 >= 10) {
      // Regroup 10 bars into 1 plate!
      setBars(0);
      handleAddPlate();
    } else {
      setBars((b) => b + 1);
    }
  };

  const handleAddPlate = () => {
    sounds.playClick();
    if (plates + 1 >= 10) {
      // Regroup 10 plates into 1 Thousands Cube!
      setPlates(0);
      handleAddThousand();
    } else {
      setPlates((p) => p + 1);
    }
  };

  const handleAddThousand = () => {
    sounds.playClick();
    if (thousands < 9) {
      setThousands((t) => t + 1);
    }
  };

  const handleResetExplorer = () => {
    sounds.playClick();
    setThousands(0);
    setPlates(0);
    setBars(0);
    setCubes(0);
  };

  // Helper to render decomposed number
  const renderDecomposition = (val: number, label: string) => {
    const m = Math.floor(val / 1000);
    const c = Math.floor((val % 1000) / 100);
    const d = Math.floor((val % 100) / 10);
    const u = val % 10;

    return (
      <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-semibold text-amber-900 border-b border-amber-200/60 pb-1.5">
          <span>
            {label}: <strong className="text-sm font-fun text-amber-700">{val.toLocaleString('pt-BR')}</strong>
          </span>
          <span className="text-amber-700/80 font-mono">
            {m > 0 ? `${m}UM ` : ''}
            {c > 0 ? `${c}C ` : ''}
            {d > 0 ? `${d}D ` : ''}
            {u > 0 ? `${u}U` : ''}
          </span>
        </div>

        {/* Visual blocks */}
        <div className="flex flex-wrap items-end gap-3 pt-1">
          {/* Unidade de Milhar (Cubos Grandes de 1.000) */}
          {m > 0 && (
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] uppercase font-bold text-amber-900 bg-amber-200/60 px-1.5 rounded">
                Milhar ({m.toLocaleString('pt-BR')})
              </span>
              <div className="flex gap-1.5">
                {Array.from({ length: Math.min(m, 5) }).map((_, i) => (
                  <div
                    key={`m-${i}`}
                    className="w-14 h-14 bg-gradient-to-br from-amber-600 to-amber-700 border-2 border-amber-800 rounded-lg shadow-md flex flex-col items-center justify-center relative overflow-hidden"
                    title="1 Cubo Grande = 1.000 unidades (10 placas)"
                  >
                    <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 opacity-25">
                      {Array.from({ length: 25 }).map((_, idx) => (
                        <div key={idx} className="border-[0.5px] border-amber-300" />
                      ))}
                    </div>
                    <span className="text-[11px] font-fun font-extrabold text-amber-100 z-10 drop-shadow">
                      1.000
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Centenas (Placas de 100) */}
          {c > 0 && (
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] uppercase font-bold text-amber-800">Placas (100)</span>
              <div className="flex gap-1">
                {Array.from({ length: c }).map((_, i) => (
                  <div
                    key={`p-${i}`}
                    className="w-12 h-12 bg-amber-400 border border-amber-600 rounded grid grid-cols-10 grid-rows-10 shadow-sm"
                    title="1 Placa = 100 unidades"
                  >
                    {Array.from({ length: 100 }).map((_, idx) => (
                      <div key={idx} className="border-[0.5px] border-amber-500/50" />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dezenas (Barras de 10) */}
          {d > 0 && (
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] uppercase font-bold text-amber-800">Barras (10)</span>
              <div className="flex gap-1">
                {Array.from({ length: d }).map((_, i) => (
                  <div
                    key={`b-${i}`}
                    className="w-3.5 h-12 bg-amber-300 border border-amber-500 rounded-sm grid grid-rows-10 shadow-xs"
                    title="1 Barra = 10 unidades"
                  >
                    {Array.from({ length: 10 }).map((_, idx) => (
                      <div key={idx} className="border-b-[0.5px] border-amber-400" />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Unidades (Cubinhos de 1) */}
          {u > 0 && (
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] uppercase font-bold text-amber-800">Cubinhos (1)</span>
              <div className="flex flex-wrap gap-1 max-w-[120px]">
                {Array.from({ length: u }).map((_, i) => (
                  <div
                    key={`u-${i}`}
                    className="w-3.5 h-3.5 bg-amber-200 border border-amber-400 rounded-xs shadow-xs"
                    title="1 Cubinho = 1 unidade"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-pop">
      <div className="bg-white rounded-2xl max-w-2xl w-full border-2 border-amber-300 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-amber-50/50">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🪵</span>
            <div>
              <h3 className="font-fun text-lg font-bold text-slate-900">Material Dourado & Apoio Visual</h3>
              <p className="text-xs text-slate-500">Aprenda a ver os números em blocos, dezenas e centenas!</p>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex border-b border-slate-100 px-5 pt-2 gap-2 bg-slate-50">
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('questionVisual');
            }}
            className={`px-4 py-2 font-fun text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'questionVisual'
                ? 'border-amber-500 text-amber-700 bg-white rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Visualizar a Conta Atual
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('freeExplorer');
            }}
            className={`px-4 py-2 font-fun text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'freeExplorer'
                ? 'border-amber-500 text-amber-700 bg-white rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Lousa de Montar Números
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {activeTab === 'questionVisual' && question && (
            <div className="space-y-4">
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <span className="text-xs text-indigo-600 font-medium">Operação em foco</span>
                  <p className="font-fun text-xl font-bold text-indigo-900">
                    {question.num1.toLocaleString('pt-BR')} {question.symbol}{' '}
                    {question.num2.toLocaleString('pt-BR')} = ?
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500">Dica:</span>
                  <p className="text-xs font-medium text-slate-700 max-w-xs">{question.hint}</p>
                </div>
              </div>

              {/* Multiplication rectangular array visual */}
              {question.operation === 'multiplication' && (
                <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-fun font-bold text-amber-900 text-sm">
                      Matriz Retangular: {question.num1} grupos de {question.num2}
                    </h4>
                    <span className="text-xs text-amber-700">
                      Total: <strong>{(question.num1 * question.num2).toLocaleString('pt-BR')}</strong>
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5 p-3 bg-white rounded-lg border border-amber-100 overflow-x-auto">
                    {Array.from({ length: Math.min(question.num1, 10) }).map((_, rIdx) => (
                      <div key={rIdx} className="flex items-center gap-1.5">
                        <span className="text-[10px] text-slate-400 font-mono w-4">{rIdx + 1}º</span>
                        <div className="flex gap-1.5">
                          {Array.from({ length: Math.min(question.num2, 10) }).map((_, cIdx) => (
                            <div
                              key={cIdx}
                              className="w-6 h-6 rounded-md bg-amber-400/80 border border-amber-500 flex items-center justify-center text-xs shadow-xs"
                            >
                              ⭐
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500">
                    Cada linha tem {question.num2} estrelinhas. Contando todas as {question.num1} linhas dá{' '}
                    <strong>{question.answer.toLocaleString('pt-BR')}</strong>!
                  </p>
                </div>
              )}

              {/* Division equal distribution visual */}
              {question.operation === 'division' && (
                <div className="bg-purple-50/60 border border-purple-200 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-fun font-bold text-purple-900 text-sm">
                      Repartição Igualitária: {question.num1.toLocaleString('pt-BR')} dividido em {question.num2} grupos
                    </h4>
                    <span className="text-xs text-purple-700 font-semibold">
                      Cada grupo recebe: {question.answer.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                    {Array.from({ length: Math.min(question.num2, 8) }).map((_, groupIdx) => (
                      <div key={groupIdx} className="bg-white border-2 border-dashed border-purple-200 rounded-xl p-2.5 flex flex-col items-center">
                        <span className="text-xs font-bold text-purple-700 mb-1">Grupo {groupIdx + 1}</span>
                        <div className="flex flex-wrap justify-center gap-1">
                          {Array.from({ length: Math.min(question.answer, 12) }).map((_, itemIdx) => (
                            <span key={itemIdx} className="text-base">🎈</span>
                          ))}
                        </div>
                        <span className="text-[11px] font-semibold text-slate-500 mt-1">{question.answer.toLocaleString('pt-BR')} itens</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Base-10 Blocks for Numbers */}
              <div className="space-y-3">
                {renderDecomposition(question.num1, `1º Número (${question.num1.toLocaleString('pt-BR')})`)}
                {question.operation !== 'multiplication' && question.operation !== 'division' && (
                  renderDecomposition(question.num2, `2º Número (${question.num2.toLocaleString('pt-BR')})`)
                )}
              </div>
            </div>
          )}

          {activeTab === 'freeExplorer' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-emerald-800">Número Montado</span>
                  <div className="font-fun text-3xl font-extrabold text-emerald-700 tabular-nums">
                    {explorerTotal}
                  </div>
                </div>
                <button
                  onClick={handleResetExplorer}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Limpar
                </button>
              </div>

              {/* Controls - 4 Orders: Milhar, Centena, Dezena, Unidade */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {/* Milhar (1.000) */}
                <div className="bg-white border-2 border-amber-300 rounded-xl p-3 flex flex-col items-center text-center shadow-xs">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-700 border-2 border-amber-800 rounded-md flex items-center justify-center font-bold text-xs text-amber-100 mb-1 shadow-xs">
                    1.000
                  </div>
                  <span className="text-xs font-fun font-bold text-amber-950">Milhar (Cubo)</span>
                  <span className="text-sm font-bold text-amber-700 mb-2">{thousands}</span>
                  <div className="flex gap-1 w-full">
                    <button
                      onClick={() => {
                        sounds.playClick();
                        setThousands((t) => Math.max(0, t - 1));
                      }}
                      className="flex-1 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 flex justify-center items-center cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={handleAddThousand}
                      className="flex-1 py-1 bg-amber-600 hover:bg-amber-700 rounded text-white font-bold flex justify-center items-center cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Placa (100) */}
                <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col items-center text-center">
                  <div className="w-8 h-8 bg-amber-400 border border-amber-600 rounded flex items-center justify-center font-bold text-[11px] text-amber-900 mb-1 shadow-xs">
                    100
                  </div>
                  <span className="text-xs font-fun font-bold text-slate-800">Centena (Placa)</span>
                  <span className="text-sm font-bold text-amber-600 mb-2">{plates}</span>
                  <div className="flex gap-1 w-full">
                    <button
                      onClick={() => {
                        sounds.playClick();
                        setPlates((p) => Math.max(0, p - 1));
                      }}
                      className="flex-1 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 flex justify-center items-center cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={handleAddPlate}
                      className="flex-1 py-1 bg-amber-500 hover:bg-amber-600 rounded text-white font-bold flex justify-center items-center cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Barra (10) */}
                <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col items-center text-center">
                  <div className="w-3 h-8 bg-amber-300 border border-amber-500 rounded flex items-center justify-center font-bold text-[10px] text-amber-900 mb-1 shadow-xs">
                    10
                  </div>
                  <span className="text-xs font-fun font-bold text-slate-800">Dezena (Barra)</span>
                  <span className="text-sm font-bold text-amber-600 mb-2">{bars}</span>
                  <div className="flex gap-1 w-full">
                    <button
                      onClick={() => {
                        sounds.playClick();
                        setBars((b) => Math.max(0, b - 1));
                      }}
                      className="flex-1 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 flex justify-center items-center cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={handleAddBar}
                      className="flex-1 py-1 bg-amber-500 hover:bg-amber-600 rounded text-white font-bold flex justify-center items-center cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Cubinho (1) */}
                <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col items-center text-center">
                  <div className="w-4 h-4 bg-amber-200 border border-amber-400 rounded flex items-center justify-center font-bold text-[9px] text-amber-900 mb-1 shadow-xs">
                    1
                  </div>
                  <span className="text-xs font-fun font-bold text-slate-800">Unidade (Cubo)</span>
                  <span className="text-sm font-bold text-amber-600 mb-2">{cubes}</span>
                  <div className="flex gap-1 w-full">
                    <button
                      onClick={() => {
                        sounds.playClick();
                        setCubes((c) => Math.max(0, c - 1));
                      }}
                      className="flex-1 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 flex justify-center items-center cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={handleAddCube}
                      className="flex-1 py-1 bg-amber-500 hover:bg-amber-600 rounded text-white font-bold flex justify-center items-center cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Live Canvas representation */}
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 min-h-[140px] flex items-center justify-center">
                {explorerTotal === 0 ? (
                  <p className="text-xs text-slate-400 text-center">
                    Clique nos botões de <strong>+</strong> acima para adicionar blocos e construir seu número!
                  </p>
                ) : (
                  <div className="flex flex-wrap items-end justify-center gap-3">
                    {/* Thousands Cubes */}
                    {Array.from({ length: thousands }).map((_, i) => (
                      <div
                        key={`et-${i}`}
                        className="w-14 h-14 bg-gradient-to-br from-amber-600 to-amber-700 border-2 border-amber-800 rounded-lg shadow-md flex items-center justify-center text-amber-100 font-fun font-bold text-xs"
                        title="1.000"
                      >
                        1.000
                      </div>
                    ))}
                    {/* Plates */}
                    {Array.from({ length: plates }).map((_, i) => (
                      <div
                        key={`ep-${i}`}
                        className="w-14 h-14 bg-amber-400 border border-amber-600 rounded grid grid-cols-10 grid-rows-10 shadow-sm"
                        title="100"
                      />
                    ))}
                    {/* Bars */}
                    {Array.from({ length: bars }).map((_, i) => (
                      <div
                        key={`eb-${i}`}
                        className="w-3.5 h-14 bg-amber-300 border border-amber-500 rounded-sm grid grid-rows-10 shadow-xs"
                        title="10"
                      />
                    ))}
                    {/* Cubes */}
                    <div className="flex flex-wrap gap-1 max-w-[100px]">
                      {Array.from({ length: cubes }).map((_, i) => (
                        <div
                          key={`ec-${i}`}
                          className="w-3.5 h-3.5 bg-amber-200 border border-amber-400 rounded-xs shadow-xs"
                          title="1"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>10 cubinhos = 1 barra · 10 barras = 1 placa · 10 placas = 1 cubo de milhar (1.000)!</span>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-fun font-semibold rounded-lg text-xs shadow-sm transition-colors"
          >
            Entendi, Voltar ao Jogo!
          </button>
        </div>
      </div>
    </div>
  );
};
