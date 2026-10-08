import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'mark' | 'compact';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = "h-10", 
  variant = 'full',
  showTagline = true 
}) => {
  if (variant === 'mark') {
    return (
      <svg 
        className={className} 
        viewBox="0 0 180 180" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        aria-label="DEVOPS TN Emblem"
      >
        <defs>
          <linearGradient id="markGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0066FF" />
            <stop offset="50%" stopColor="#00A2FF" />
            <stop offset="100%" stopColor="#00E5FF" />
          </linearGradient>
          <linearGradient id="markDark" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0B1E3B" />
            <stop offset="60%" stopColor="#0052CC" />
            <stop offset="100%" stopColor="#0080FF" />
          </linearGradient>
          <filter id="glow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0099FF" floodOpacity="0.3"/>
          </filter>
        </defs>

        {/* Digital Blocks / Pixels on Left */}
        <rect x="22" y="38" width="16" height="16" rx="2" fill="#0088FF" />
        <rect x="2" y="60" width="16" height="16" rx="2" fill="#00A2FF" />
        <rect x="20" y="82" width="12" height="12" rx="2" fill="#00C4FF" />
        <rect x="18" y="104" width="15" height="15" rx="2" fill="#0094FF" />

        {/* Outer D Structure */}
        <path d="M 45 28 L 110 28 C 150 28 174 54 174 90 C 174 126 148 152 110 152 L 45 152 Z" fill="#08182B" />
        
        {/* Top Arch Ribbon */}
        <path d="M 45 28 L 110 28 C 142 28 166 52 166 85 C 166 96 160 106 150 114 C 138 96 122 84 98 84 C 70 84 50 102 45 130 Z" fill="url(#markDark)" />
        
        {/* Infinity Loop Gradient Wave */}
        <path 
          d="M 45 102 C 58 78 82 76 104 76 C 130 76 155 92 155 116 C 155 140 130 152 104 152 C 78 152 58 138 48 122 C 64 122 80 112 90 98 C 100 86 116 84 128 94 C 136 102 136 114 128 122 C 120 130 106 134 94 126 C 74 116 58 106 45 102 Z" 
          fill="url(#markGrad)" 
          filter="url(#glow)"
        />

        {/* Foreground Infinity Ribbon Crossing */}
        <path d="M 45 102 C 60 108 78 118 94 132 C 110 146 128 144 140 130 C 132 144 118 152 98 152 C 72 152 55 134 45 102 Z" fill="#0055D4" />
        <path d="M 45 102 C 52 92 68 84 88 84 C 114 84 136 100 144 116 C 134 100 114 90 92 90 C 72 90 56 96 45 102 Z" fill="#00E5FF" />

        {/* Cloud Glyphs in Base */}
        <g transform="translate(62, 118)">
          <path 
            d="M 6 15 L 28 15 C 32 15 35 12 35 8.5 C 35 5.5 32.5 3 29.5 2.5 C 28.5 1 27 0 25 0 C 22.8 0 21 1.2 20.2 3 C 19.5 2.2 18.2 1.8 17 1.8 C 14.5 1.8 12.5 3.5 12 6 C 11.5 5.8 11 5.6 10.2 5.6 C 6.8 5.6 4 8.4 4 11.8 C 4 12.4 4.1 13 4.3 13.5 C 2.5 13.8 1 15.2 1 17" 
            fill="none" 
            stroke="#FFFFFF" 
            strokeWidth="2.8" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </g>
      </svg>
    );
  }

  // Full Horizontal Vector Logo
  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Emblem */}
      <div className="shrink-0">
        <svg 
          className="h-9 sm:h-10 w-auto" 
          viewBox="0 0 180 180" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="markGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0066FF" />
              <stop offset="50%" stopColor="#00A2FF" />
              <stop offset="100%" stopColor="#00E5FF" />
            </linearGradient>
            <linearGradient id="markDark2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0B1E3B" />
              <stop offset="60%" stopColor="#0052CC" />
              <stop offset="100%" stopColor="#0080FF" />
            </linearGradient>
          </defs>

          {/* Digital Pixels */}
          <rect x="22" y="38" width="16" height="16" rx="2" fill="#0088FF" />
          <rect x="2" y="60" width="16" height="16" rx="2" fill="#00A2FF" />
          <rect x="20" y="82" width="12" height="12" rx="2" fill="#00C4FF" />
          <rect x="18" y="104" width="15" height="15" rx="2" fill="#0094FF" />

          {/* Outer D */}
          <path d="M 45 28 L 110 28 C 150 28 174 54 174 90 C 174 126 148 152 110 152 L 45 152 Z" fill="#08182B" />
          
          {/* Ribbon */}
          <path d="M 45 28 L 110 28 C 142 28 166 52 166 85 C 166 96 160 106 150 114 C 138 96 122 84 98 84 C 70 84 50 102 45 130 Z" fill="url(#markDark2)" />
          
          {/* Infinity Loop */}
          <path 
            d="M 45 102 C 58 78 82 76 104 76 C 130 76 155 92 155 116 C 155 140 130 152 104 152 C 78 152 58 138 48 122 C 64 122 80 112 90 98 C 100 86 116 84 128 94 C 136 102 136 114 128 122 C 120 130 106 134 94 126 C 74 116 58 106 45 102 Z" 
            fill="url(#markGrad2)" 
          />

          <path d="M 45 102 C 60 108 78 118 94 132 C 110 146 128 144 140 130 C 132 144 118 152 98 152 C 72 152 55 134 45 102 Z" fill="#0055D4" />
          <path d="M 45 102 C 52 92 68 84 88 84 C 114 84 136 100 144 116 C 134 100 114 90 92 90 C 72 90 56 96 45 102 Z" fill="#00E5FF" />

          {/* Cloud */}
          <g transform="translate(62, 118)">
            <path 
              d="M 6 15 L 28 15 C 32 15 35 12 35 8.5 C 35 5.5 32.5 3 29.5 2.5 C 28.5 1 27 0 25 0 C 22.8 0 21 1.2 20.2 3 C 19.5 2.2 18.2 1.8 17 1.8 C 14.5 1.8 12.5 3.5 12 6 C 11.5 5.8 11 5.6 10.2 5.6 C 6.8 5.6 4 8.4 4 11.8 C 4 12.4 4.1 13 4.3 13.5 C 2.5 13.8 1 15.2 1 17" 
              fill="none" 
              stroke="#FFFFFF" 
              strokeWidth="2.8" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </g>
        </svg>
      </div>

      {/* Typography Block */}
      <div className="flex flex-col">
        <div className="flex items-center tracking-tight font-black font-sans leading-none text-xl sm:text-2xl">
          <span className="text-[#0B1A30] dark:text-white tracking-tight font-extrabold">
            DEV<span className="inline-block tracking-tighter">O</span>PS
          </span>
          <span className="ml-1.5 bg-gradient-to-r from-[#0066FF] to-[#00D2FF] bg-clip-text text-transparent font-black tracking-normal">
            TN
          </span>
        </div>

        {showTagline && (
          <div className="flex items-center gap-1.5 mt-1">
            <span className="h-[1.5px] w-3 bg-gradient-to-r from-[#00D2FF] to-[#0066FF] rounded-full inline-block" />
            <span className="text-[10px] sm:text-[11px] font-semibold text-slate-600 dark:text-slate-300 tracking-wider">
              Build. Deploy. Scale.
            </span>
            <span className="h-[1.5px] w-3 bg-gradient-to-r from-[#0066FF] to-[#00D2FF] rounded-full inline-block" />
          </div>
        )}
      </div>
    </div>
  );
};
