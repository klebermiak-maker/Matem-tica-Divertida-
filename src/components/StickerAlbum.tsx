import React, { useState } from 'react';
import { Sticker } from '../types';
import { Sparkles, Lock, Star, CheckCircle, Info, X } from 'lucide-react';
import { sounds } from '../utils/audio';

interface StickerAlbumProps {
  stickers: Sticker[];
}

export const StickerAlbum: React.FC<StickerAlbumProps> = ({ stickers }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [inspectedSticker, setInspectedSticker] = useState<Sticker | null>(null);

  const unlockedCount = stickers.filter((s) => s.unlocked).length;
  const filteredStickers =
    selectedCategory === 'all'
      ? stickers
      : stickers.filter((s) => s.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'Todas as Figurinhas' },
    { id: 'astronomia', label: '🚀 Espaço & Robôs' },
    { id: 'animais', label: '🦁 Reino Animal' },
    { id: 'fantasia', label: '🧙 Magia & Mitologia' },
    { id: 'mestres', label: '⭐ Mestres da Matemática' },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-100 via-orange-50 to-amber-50 rounded-3xl border-2 border-amber-200/90 p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="text-2xl">📖</span>
            <h2 className="font-fun text-2xl font-bold text-slate-900">
              Álbum de Figurinhas Colecionáveis
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            Resolva cálculos, complete mundos e desbloqueie figurinhas mágicas para a sua coleção!
          </p>
        </div>

        {/* Progress pill */}
        <div className="bg-white rounded-2xl border border-amber-200 p-4 text-center min-w-[200px] shadow-xs">
          <span className="text-xs text-slate-500 font-semibold">Coleção do 3º Ano</span>
          <p className="font-fun text-2xl font-extrabold text-amber-600">
            {unlockedCount} / {stickers.length}
          </p>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${(unlockedCount / stickers.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Category Filter buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              sounds.playClick();
              setSelectedCategory(cat.id);
            }}
            className={`px-3.5 py-1.5 rounded-xl font-fun text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Stickers Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredStickers.map((sticker) => {
          return (
            <div
              key={sticker.id}
              onClick={() => {
                sounds.playClick();
                setInspectedSticker(sticker);
              }}
              className={`group relative rounded-2xl border-2 p-4 transition-all duration-200 cursor-pointer flex flex-col items-center text-center ${
                sticker.unlocked
                  ? 'bg-white border-amber-200/90 hover:border-amber-400 hover:shadow-md hover:-translate-y-1'
                  : 'bg-slate-50 border-dashed border-slate-300 opacity-60 hover:opacity-80'
              }`}
            >
              {/* Sticker Hologram Badge */}
              <div
                className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center text-5xl sm:text-6xl mb-3 shadow-inner relative overflow-hidden bg-gradient-to-br ${
                  sticker.unlocked ? sticker.bgColor : 'from-slate-200 to-slate-300'
                }`}
              >
                {sticker.unlocked ? (
                  <>
                    <span className="drop-shadow-md select-none transform group-hover:scale-110 transition-transform">
                      {sticker.emoji}
                    </span>
                    {/* Gloss shine */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent pointer-events-none" />
                  </>
                ) : (
                  <Lock className="w-8 h-8 text-slate-400" />
                )}
              </div>

              <h4 className="font-fun font-bold text-sm text-slate-800 leading-snug">
                {sticker.unlocked ? sticker.name : '??? Bloqueada'}
              </h4>

              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                {sticker.unlocked ? sticker.description : sticker.unlockCriteria}
              </p>

              {sticker.unlocked && (
                <span className="mt-2 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Colada no Álbum ✨
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Inspect Sticker Modal */}
      {inspectedSticker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-pop">
          <div className="bg-white rounded-3xl max-w-sm w-full border-4 border-amber-300 shadow-2xl p-6 text-center space-y-4">
            <div className="flex justify-end">
              <button
                onClick={() => {
                  sounds.playClick();
                  setInspectedSticker(null);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              className={`w-32 h-32 rounded-3xl mx-auto flex items-center justify-center text-7xl shadow-lg relative bg-gradient-to-br ${
                inspectedSticker.unlocked ? inspectedSticker.bgColor : 'from-slate-200 to-slate-300'
              }`}
            >
              {inspectedSticker.unlocked ? (
                <span>{inspectedSticker.emoji}</span>
              ) : (
                <Lock className="w-12 h-12 text-slate-400" />
              )}
            </div>

            <div className="space-y-1">
              <h3 className="font-fun text-xl font-bold text-slate-900">
                {inspectedSticker.unlocked ? inspectedSticker.name : 'Figurinha Secreta'}
              </h3>
              <p className="text-xs text-slate-500">
                {inspectedSticker.unlocked
                  ? inspectedSticker.description
                  : 'Para colar esta figurinha no álbum:'}
              </p>
            </div>

            <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 text-xs font-semibold text-amber-900">
              {inspectedSticker.unlockCriteria}
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                setInspectedSticker(null);
              }}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-fun font-bold text-xs rounded-xl shadow-xs transition-colors"
            >
              Fechar Detalhes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
