import React, { useState } from 'react';
import { DifficultyLevel, Operation } from '../types';
import { Play, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

interface FreePracticeProps {
  onStartPractice: (config: {
    operation: Operation;
    difficulty: DifficultyLevel;
    questionsCount: number;
    title: string;
    specialMode?: 'grid_multiplication';
  }) => void;
}

export const FreePractice: React.FC<FreePracticeProps> = ({ onStartPractice }) => {
  const [selectedOp, setSelectedOp] = useState<Operation | 'grid'>('addition');
  const [selectedDiff, setSelectedDiff] = useState<DifficultyLevel>(1);
  const [questionsCount, setQuestionsCount] = useState<number>(10);

  const operations = [
    {
      id: 'addition' as const,
      name: 'Adição (+)',
      symbol: '+',
      color: 'border-emerald-300 bg-emerald-50/50 text-emerald-800',
      activeColor: 'bg-emerald-500 text-white border-emerald-600',
      desc: 'Juntar, somar e avançar nas dezenas',
    },
    {
      id: 'subtraction' as const,
      name: 'Subtração (-)',
      symbol: '-',
      color: 'border-amber-300 bg-amber-50/50 text-amber-800',
      activeColor: 'bg-amber-500 text-white border-amber-600',
      desc: 'Tirar, calcular a diferença e dar troco',
    },
    {
      id: 'multiplication' as const,
      name: 'Multiplicação (×)',
      symbol: '×',
      color: 'border-blue-300 bg-blue-50/50 text-blue-800',
      activeColor: 'bg-blue-500 text-white border-blue-600',
      desc: 'Tabuadas e parcelas repetidas',
    },
    {
      id: 'division' as const,
      name: 'Divisão (÷)',
      symbol: '÷',
      color: 'border-purple-300 bg-purple-50/50 text-purple-800',
      activeColor: 'bg-purple-500 text-white border-purple-600',
      desc: 'Repartir em partes iguais',
    },
    {
      id: 'grid' as const,
      name: 'Malha Quadriculada (📐)',
      symbol: '📐',
      color: 'border-indigo-300 bg-indigo-50/50 text-indigo-900',
      activeColor: 'bg-indigo-600 text-white border-indigo-700',
      desc: 'Princípio multiplicativo e disposição retangular',
    },
    {
      id: 'mixed' as const,
      name: 'Misturadão (★)',
      symbol: '★',
      color: 'border-rose-300 bg-rose-50/50 text-rose-800',
      activeColor: 'bg-rose-500 text-white border-rose-600',
      desc: 'Todas as 4 operações sorteadas',
    },
  ];

  const difficulties = [
    {
      level: 1 as DifficultyLevel,
      title: 'Nível 1 · Básico',
      detail: 'Números até 30/50, tabuadas do 2, 5 e 10',
    },
    {
      level: 2 as DifficultyLevel,
      title: 'Nível 2 · Intermediário',
      detail: 'Dezenas até 100 com reserva e agrupamento, tabuadas do 3 e 4',
    },
    {
      level: 3 as DifficultyLevel,
      title: 'Nível 3 · Centenas e Milhar Inicial',
      detail: 'Adição/Subtração até 2.000 e tabuadas do 6 ao 9',
    },
    {
      level: 4 as DifficultyLevel,
      title: 'Nível 4 · Unidade de Milhar (até 9.999)',
      detail: 'Grandes contas até 9.999 e problemas do cotidiano',
    },
  ];

  const handleStart = () => {
    sounds.playClick();

    if (selectedOp === 'grid') {
      onStartPractice({
        operation: 'multiplication',
        difficulty: selectedDiff,
        questionsCount,
        title: 'Treino da Malha Quadriculada (Princípio Multiplicativo) 📐',
        specialMode: 'grid_multiplication',
      });
      return;
    }

    const opNames: Record<Operation, string> = {
      addition: 'Treino de Adição',
      subtraction: 'Treino de Subtração',
      multiplication: 'Treino de Multiplicação',
      division: 'Treino de Divisão',
      mixed: 'Treino Misto',
    };

    onStartPractice({
      operation: selectedOp,
      difficulty: selectedDiff,
      questionsCount,
      title: `${opNames[selectedOp]} - Nível ${selectedDiff}`,
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-100 via-orange-50 to-amber-50 rounded-3xl border-2 border-amber-200/90 p-6 shadow-xs text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="font-fun text-2xl font-bold text-slate-900">
            Laboratório de Treino Livre 🎯
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Escolha a operação matemática e o nível que você quer praticar hoje!
          </p>
        </div>
      </div>

      {/* Operation Selection */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 space-y-4">
        <h3 className="font-fun text-base font-bold text-slate-900">
          1. Escolha a Operação Matemática
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {operations.map((op) => (
            <button
              key={op.id}
              onClick={() => {
                sounds.playClick();
                setSelectedOp(op.id);
              }}
              className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                selectedOp === op.id ? op.activeColor + ' shadow-md scale-102' : op.color + ' hover:border-slate-400'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-fun font-bold text-base">{op.name}</span>
                <span className="text-2xl font-extrabold">{op.symbol}</span>
              </div>
              <p className={`text-xs ${selectedOp === op.id ? 'text-white/90' : 'text-slate-600'}`}>
                {op.desc}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty Selection */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 space-y-4">
        <h3 className="font-fun text-base font-bold text-slate-900">
          2. Escolha o Nível de Dificuldade
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {difficulties.map((diff) => (
            <button
              key={diff.level}
              onClick={() => {
                sounds.playClick();
                setSelectedDiff(diff.level);
              }}
              className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                selectedDiff === diff.level
                  ? 'bg-amber-500 border-amber-600 text-white shadow-md'
                  : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300'
              }`}
            >
              <h4 className="font-fun font-bold text-sm">{diff.title}</h4>
              <p className={`text-xs mt-1 ${selectedDiff === diff.level ? 'text-amber-100' : 'text-slate-500'}`}>
                {diff.detail}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Questions Count */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-fun text-base font-bold text-slate-900">
            3. Quantidade de Perguntas
          </h3>
          <p className="text-xs text-slate-500">Quantos desafios você quer resolver?</p>
        </div>

        <div className="flex items-center gap-2">
          {[8, 10, 15, 20].map((cnt) => (
            <button
              key={cnt}
              onClick={() => {
                sounds.playClick();
                setQuestionsCount(cnt);
              }}
              className={`w-12 h-12 rounded-2xl font-fun font-bold text-base transition-colors cursor-pointer ${
                questionsCount === cnt
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cnt}
            </button>
          ))}
        </div>
      </div>

      {/* Start Button */}
      <div className="text-center pt-2">
        <button
          onClick={handleStart}
          className="px-10 py-4 bg-amber-500 hover:bg-amber-600 text-white font-fun font-bold text-lg rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
        >
          <Play className="w-5 h-5 fill-current" />
          <span>Começar o Treino Agora!</span>
        </button>
      </div>
    </div>
  );
};
