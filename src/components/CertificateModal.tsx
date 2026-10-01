import React, { useState } from 'react';
import { PlayerStats } from '../types';
import { X, Printer, Award, Sparkles, Star } from 'lucide-react';
import { sounds } from '../utils/audio';

interface CertificateModalProps {
  stats: PlayerStats;
  onUpdateName: (newName: string) => void;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  stats,
  onUpdateName,
  onClose,
}) => {
  const [name, setName] = useState(stats.playerName || 'Super Estudante');
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveName = () => {
    setIsEditing(false);
    onUpdateName(name);
  };

  const handlePrint = () => {
    sounds.playClick();
    window.print();
  };

  const todayStr = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-xs overflow-y-auto animate-pop print:p-0 print:bg-white print:static">
      <div className="bg-white rounded-3xl max-w-3xl w-full border-4 border-amber-300 shadow-2xl overflow-hidden print:border-none print:shadow-none">
        {/* Top actions bar (hidden during print) */}
        <div className="flex items-center justify-between px-5 py-3 bg-amber-50 border-b border-amber-200 print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-700" />
            <span className="font-fun font-bold text-sm text-slate-800">
              Certificado Oficial do 3º Ano
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-fun font-bold shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Salvar PDF</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Parchment */}
        <div className="p-8 sm:p-12 text-center bg-gradient-to-b from-amber-50/50 via-white to-amber-50/30 relative border-[12px] border-amber-200 m-4 rounded-2xl shadow-inner">
          {/* Ornate corner ornaments */}
          <div className="absolute top-2 left-2 text-amber-400 font-serif text-xl select-none">✦</div>
          <div className="absolute top-2 right-2 text-amber-400 font-serif text-xl select-none">✦</div>
          <div className="absolute bottom-2 left-2 text-amber-400 font-serif text-xl select-none">✦</div>
          <div className="absolute bottom-2 right-2 text-amber-400 font-serif text-xl select-none">✦</div>

          <div className="space-y-4 max-w-xl mx-auto">
            <div className="space-y-1">
              <span className="text-xs uppercase font-extrabold tracking-widest text-amber-600">
                Ensino Fundamental 1 · 3º Ano
              </span>
              <h2 className="font-fun text-3xl sm:text-4xl font-extrabold text-amber-950 uppercase tracking-tight">
                Certificado de Mérito Matemático
              </h2>
              <p className="text-xs text-slate-500 italic">
                Reconhecimento oficial de empenho e raciocínio lógico
              </p>
            </div>

            <div className="py-2">
              <p className="text-xs text-slate-600">Certificamos com muito orgulho que</p>

              {isEditing ? (
                <div className="flex items-center justify-center gap-2 mt-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="font-fun text-2xl font-bold text-center border-b-2 border-amber-500 text-amber-900 outline-none px-3 py-1 bg-amber-50/50 rounded"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveName}
                    className="px-3 py-1 bg-amber-500 text-white rounded-lg text-xs font-bold font-fun"
                  >
                    Salvar
                  </button>
                </div>
              ) : (
                <h3
                  onClick={() => setIsEditing(true)}
                  title="Clique para editar o seu nome"
                  className="font-fun text-2xl sm:text-3xl font-extrabold text-amber-700 underline decoration-amber-300 decoration-wavy underline-offset-8 mt-2 cursor-pointer hover:text-amber-800 transition-colors"
                >
                  {name} ✍️
                </h3>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-md mx-auto">
              completou os desafios das <strong>Quatro Operações Matemáticas</strong> (Adição,
              Subtração, Multiplicação e Divisão) com brilhantismo, alcançando{' '}
              <strong className="text-amber-700">{stats.stars} estrelas douradas</strong> e{' '}
              <strong className="text-amber-700">{stats.totalCorrect} cálculos corretos</strong>!
            </p>

            {/* Golden Medal Emblem */}
            <div className="pt-4 flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 rounded-full border-4 border-amber-600 shadow-md flex items-center justify-center text-3xl">
                🥇
              </div>
              <span className="font-fun text-xs font-bold text-amber-900 mt-2">
                Mestre das 4 Operações
              </span>
            </div>

            {/* Date and signatures */}
            <div className="pt-6 border-t border-amber-200/80 flex items-center justify-between text-xs text-slate-500">
              <div className="text-left">
                <span className="block text-[10px] text-slate-400">Data de Emissão</span>
                <span className="font-semibold text-slate-700">{todayStr}</span>
              </div>
              <div className="text-right">
                <span className="block text-[10px] text-slate-400">Coordenação Pedagógica</span>
                <span className="font-fun font-bold text-amber-800">Tico & Amigos dos Números</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
