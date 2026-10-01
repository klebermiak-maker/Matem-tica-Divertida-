import React from 'react';
import { Volume2, VolumeX, Star, Award, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

export type NavTab = 'adventure' | 'practice' | 'stickers' | 'wardrobe' | 'trophies';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  stars: number;
  coins: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenCertificate: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  stars,
  coins,
  soundEnabled,
  onToggleSound,
  onOpenCertificate,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-amber-200/80 px-4 sm:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Single wordmark in display face */}
        <button
          onClick={() => {
            sounds.playClick();
            onSelectTab('adventure');
          }}
          className="text-left font-fun text-xl sm:text-2xl font-bold tracking-tight text-amber-600 hover:text-amber-700 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
        >
          <span>📐</span>
          <span>Matemática 3º Ano</span>
        </button>

        {/* Zone 2: 4-5 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
          <button
            onClick={() => {
              sounds.playClick();
              onSelectTab('adventure');
            }}
            className={`transition-colors whitespace-nowrap py-1 ${
              currentTab === 'adventure'
                ? 'text-amber-600 border-b-2 border-amber-500 font-bold'
                : 'hover:text-slate-900'
            }`}
          >
            Trilha de Fases
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              onSelectTab('practice');
            }}
            className={`transition-colors whitespace-nowrap py-1 ${
              currentTab === 'practice'
                ? 'text-amber-600 border-b-2 border-amber-500 font-bold'
                : 'hover:text-slate-900'
            }`}
          >
            Treino Livre
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              onSelectTab('stickers');
            }}
            className={`transition-colors whitespace-nowrap py-1 ${
              currentTab === 'stickers'
                ? 'text-amber-600 border-b-2 border-amber-500 font-bold'
                : 'hover:text-slate-900'
            }`}
          >
            Álbum de Figurinhas
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              onSelectTab('wardrobe');
            }}
            className={`transition-colors whitespace-nowrap py-1 ${
              currentTab === 'wardrobe'
                ? 'text-amber-600 border-b-2 border-amber-500 font-bold'
                : 'hover:text-slate-900'
            }`}
          >
            Meu Mascote
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              onSelectTab('trophies');
            }}
            className={`transition-colors whitespace-nowrap py-1 ${
              currentTab === 'trophies'
                ? 'text-amber-600 border-b-2 border-amber-500 font-bold'
                : 'hover:text-slate-900'
            }`}
          >
            Conquistas
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions & currencies */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Stars & Coins display */}
          <div className="flex items-center gap-3 bg-amber-50/80 border border-amber-200/90 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 tabular-nums">
            <span className="flex items-center gap-1 text-amber-600" title="Estrelas conquistadas">
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span>{stars}</span>
            </span>
            <span className="text-amber-200" aria-hidden="true">|</span>
            <span className="flex items-center gap-1 text-yellow-600" title="Moedas de ouro">
              <span className="text-sm">🪙</span>
              <span>{coins}</span>
            </span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
            }}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200/60"
            title={soundEnabled ? 'Silenciar Sons' : 'Ativar Sons'}
            aria-label="Controle de Som"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Certificate Action */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenCertificate();
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-800 bg-amber-100/80 hover:bg-amber-200 rounded-xl transition-colors whitespace-nowrap"
            title="Ver Diploma Oficial de Matemática do 3º Ano"
          >
            <Award className="w-3.5 h-3.5 text-amber-700" />
            <span>Diploma</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer / Horizontal Bar */}
      <div className="flex md:hidden items-center justify-around pt-2.5 mt-2 border-t border-slate-100 text-xs font-semibold text-slate-600 overflow-x-auto">
        <button
          onClick={() => {
            sounds.playClick();
            onSelectTab('adventure');
          }}
          className={`py-1 px-2 whitespace-nowrap ${currentTab === 'adventure' ? 'text-amber-600 font-bold' : ''}`}
        >
          Trilha
        </button>
        <button
          onClick={() => {
            sounds.playClick();
            onSelectTab('practice');
          }}
          className={`py-1 px-2 whitespace-nowrap ${currentTab === 'practice' ? 'text-amber-600 font-bold' : ''}`}
        >
          Treino
        </button>
        <button
          onClick={() => {
            sounds.playClick();
            onSelectTab('stickers');
          }}
          className={`py-1 px-2 whitespace-nowrap ${currentTab === 'stickers' ? 'text-amber-600 font-bold' : ''}`}
        >
          Figurinhas
        </button>
        <button
          onClick={() => {
            sounds.playClick();
            onSelectTab('wardrobe');
          }}
          className={`py-1 px-2 whitespace-nowrap ${currentTab === 'wardrobe' ? 'text-amber-600 font-bold' : ''}`}
        >
          Mascote
        </button>
        <button
          onClick={() => {
            sounds.playClick();
            onSelectTab('trophies');
          }}
          className={`py-1 px-2 whitespace-nowrap ${currentTab === 'trophies' ? 'text-amber-600 font-bold' : ''}`}
        >
          Troféus
        </button>
      </div>
    </header>
  );
};
