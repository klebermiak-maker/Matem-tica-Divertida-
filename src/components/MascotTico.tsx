import React from 'react';
import { MascotAccessory } from '../types';

interface MascotProps {
  mood?: 'happy' | 'thinking' | 'celebrating' | 'encourage';
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  accessories?: MascotAccessory[];
  className?: string;
}

export const MascotTico: React.FC<MascotProps> = ({
  mood = 'happy',
  message,
  size = 'md',
  accessories = [],
  className = '',
}) => {
  const equippedHat = accessories.find((a) => a.type === 'hat' && a.equipped && a.id !== 'acc_none_hat');
  const equippedGlasses = accessories.find((a) => a.type === 'glasses' && a.equipped && a.id !== 'acc_none_glass');
  const equippedBadge = accessories.find((a) => a.type === 'badge' && a.equipped && a.id !== 'acc_none_badge');

  const sizeClasses = {
    sm: 'w-14 h-14',
    md: 'w-24 h-24 sm:w-28 sm:h-28',
    lg: 'w-44 h-44 sm:w-52 sm:h-52',
  }[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`relative ${sizeClasses} select-none transition-transform hover:scale-105 duration-200`}>
        {/* Glow behind mascot */}
        <div className="absolute inset-2 bg-amber-300/30 rounded-full blur-md" />

        {/* Mascot SVG - Cute Friendly Fox/Robot "Tico" */}
        <svg
          viewBox="0 0 160 160"
          className="w-full h-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ears */}
          <polygon
            points="38,62 18,18 64,36"
            fill="#F97316"
            stroke="#EA580C"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <polygon points="36,54 26,26 56,38" fill="#FEE2E2" />

          <polygon
            points="122,62 142,18 96,36"
            fill="#F97316"
            stroke="#EA580C"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <polygon points="124,54 134,26 104,38" fill="#FEE2E2" />

          {/* Little Antenna with Glowing Bulb */}
          <line x1="80" y1="36" x2="80" y2="18" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
          <circle cx="80" cy="14" r="7" fill="#38BDF8" className="animate-pulse" />
          <circle cx="78" cy="12" r="2.5" fill="#FFFFFF" />

          {/* Head Shape */}
          <rect
            x="32"
            y="36"
            width="96"
            height="86"
            rx="36"
            fill="#FB923C"
            stroke="#EA580C"
            strokeWidth="3.5"
          />

          {/* Cheerful White Cheeks / Muzzle */}
          <path
            d="M 44 94 C 44 114 62 120 80 120 C 98 120 116 114 116 94 C 116 78 96 74 80 74 C 64 74 44 78 44 94 Z"
            fill="#FFF7ED"
          />

          {/* Blushing cheeks */}
          <ellipse cx="48" cy="88" rx="7" ry="4" fill="#FDA4AF" opacity="0.8" />
          <ellipse cx="112" cy="88" rx="7" ry="4" fill="#FDA4AF" opacity="0.8" />

          {/* Eyes depending on mood */}
          {mood === 'happy' && (
            <>
              {/* Cute smiling arcs */}
              <circle cx="58" cy="68" r="7" fill="#1E293B" />
              <circle cx="56" cy="66" r="2.5" fill="#FFFFFF" />
              <circle cx="102" cy="68" r="7" fill="#1E293B" />
              <circle cx="100" cy="66" r="2.5" fill="#FFFFFF" />
            </>
          )}

          {mood === 'thinking' && (
            <>
              {/* Curious look looking up */}
              <circle cx="58" cy="64" r="7" fill="#1E293B" />
              <circle cx="59" cy="61" r="2.5" fill="#FFFFFF" />
              <circle cx="102" cy="64" r="7" fill="#1E293B" />
              <circle cx="103" cy="61" r="2.5" fill="#FFFFFF" />
              <path d="M 50 56 Q 58 52 66 56" stroke="#9A3412" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M 94 54 Q 102 50 110 52" stroke="#9A3412" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </>
          )}

          {mood === 'celebrating' && (
            <>
              {/* Joyful starry or closed arc eyes */}
              <path d="M 50 69 Q 58 60 66 69" stroke="#1E293B" strokeWidth="4.5" strokeLinecap="round" fill="none" />
              <path d="M 94 69 Q 102 60 110 69" stroke="#1E293B" strokeWidth="4.5" strokeLinecap="round" fill="none" />
              {/* Little sparkle stars near eyes */}
              <path d="M 38 60 L 40 64 L 44 66 L 40 68 L 38 72 L 36 68 L 32 66 L 36 64 Z" fill="#F59E0B" />
              <path d="M 122 60 L 124 64 L 128 66 L 124 68 L 122 72 L 120 68 L 116 66 L 120 64 Z" fill="#F59E0B" />
            </>
          )}

          {mood === 'encourage' && (
            <>
              {/* Warm encouraging big eyes with cute highlights */}
              <circle cx="58" cy="67" r="8" fill="#1E293B" />
              <circle cx="55" cy="64" r="3" fill="#FFFFFF" />
              <circle cx="61" cy="70" r="1.5" fill="#FFFFFF" />
              <circle cx="102" cy="67" r="8" fill="#1E293B" />
              <circle cx="99" cy="64" r="3" fill="#FFFFFF" />
              <circle cx="105" cy="70" r="1.5" fill="#FFFFFF" />
            </>
          )}

          {/* Cute Nose */}
          <polygon points="76,82 84,82 80,88" fill="#1E293B" />

          {/* Mouth */}
          {mood === 'celebrating' || mood === 'happy' ? (
            <path
              d="M 72 90 Q 80 102 88 90"
              stroke="#1E293B"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="#F43F5E"
            />
          ) : mood === 'thinking' ? (
            <path
              d="M 74 92 Q 80 90 86 92"
              stroke="#1E293B"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
          ) : (
            <path
              d="M 73 90 Q 80 98 87 90"
              stroke="#1E293B"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
          )}

          {/* Little Robot Collar */}
          <rect x="52" y="118" width="56" height="12" rx="6" fill="#0284C7" stroke="#0369A1" strokeWidth="2" />
          <circle cx="80" cy="124" r="4" fill="#FBBF24" />
        </svg>

        {/* Dynamic Accessory: Hat */}
        {equippedHat && (
          <div className="absolute -top-3 sm:-top-5 left-1/2 -translate-x-1/2 text-2xl sm:text-4xl pointer-events-none drop-shadow-md animate-bounce-gentle">
            {equippedHat.emoji}
          </div>
        )}

        {/* Dynamic Accessory: Glasses */}
        {equippedGlasses && (
          <div className="absolute top-[34%] left-1/2 -translate-x-1/2 text-xl sm:text-3xl pointer-events-none drop-shadow-sm">
            {equippedGlasses.emoji}
          </div>
        )}

        {/* Dynamic Accessory: Badge */}
        {equippedBadge && (
          <div className="absolute bottom-0 right-1 sm:right-2 text-lg sm:text-2xl pointer-events-none drop-shadow-sm">
            {equippedBadge.emoji}
          </div>
        )}
      </div>

      {/* Speech Bubble */}
      {message && (
        <div className="relative max-w-xs sm:max-w-md bg-white border-2 border-amber-200/80 px-4 py-2.5 rounded-2xl shadow-sm text-sm sm:text-base font-fun text-slate-800">
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-white border-b-8 border-b-transparent" />
          <div className="absolute top-1/2 -left-2.5 -translate-y-1/2 w-0 h-0 border-t-[9px] border-t-transparent border-r-[9px] border-r-amber-300 border-b-[9px] border-b-transparent -z-10" />
          <p className="leading-snug">{message}</p>
        </div>
      )}
    </div>
  );
};
