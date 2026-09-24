import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const LinearBlueprintSection: React.FC = () => {
  const [hoveredFig, setHoveredFig] = useState<number | null>(null);

  return (
    <section className="relative w-full border-y border-white/[0.08] bg-[#07080c] overflow-hidden">
      {/* Subtle top edge specular reflection */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      {/* Grid Container with Edge-to-Edge Hairline Dividers */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
        {/* COLUMN 1: FIG 0.1 - The Causal Retention Engine */}
        <div
          onMouseEnter={() => setHoveredFig(1)}
          onMouseLeave={() => setHoveredFig(null)}
          className="group relative p-8 sm:p-12 lg:p-14 flex flex-col justify-between min-h-[460px] transition-colors hover:bg-white/[0.015]"
        >
          {/* Subtle Ambient Column Spotlight */}
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Figure Label */}
          <div className="text-[11px] font-mono uppercase tracking-widest text-slate-500 group-hover:text-slate-300 transition-colors">
            FIG 0.1 // RETENTION ARCHITECTURE
          </div>

          {/* Isometric Vector Art: Layered Wafers with Projected Horizon Disc */}
          <div className="my-10 flex items-center justify-center h-48 select-none">
            <svg
              viewBox="0 0 240 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-52 h-44 transition-transform duration-500 group-hover:scale-105"
            >
              {/* Layer 5 (Bottom) */}
              <path
                d="M120 180 L195 142 L120 105 L45 142 Z"
                className="stroke-white/10 group-hover:stroke-white/20 transition-colors"
                strokeWidth="1.2"
                fill="none"
              />
              <path
                d="M45 142 L45 148 L120 186 L195 148 L195 142"
                className="stroke-white/10"
                strokeWidth="1.2"
              />

              {/* Layer 4 */}
              <path
                d="M120 162 L195 124 L120 87 L45 124 Z"
                className="stroke-white/15 group-hover:stroke-white/25 transition-colors"
                strokeWidth="1.2"
                fill="none"
              />
              <path
                d="M45 124 L45 130 L120 168 L195 130 L195 124"
                className="stroke-white/15"
                strokeWidth="1.2"
              />

              {/* Layer 3 */}
              <path
                d="M120 144 L195 106 L120 69 L45 106 Z"
                className="stroke-white/25 group-hover:stroke-white/35 transition-colors"
                strokeWidth="1.2"
                fill="none"
              />
              <path
                d="M45 106 L45 112 L120 150 L195 112 L195 106"
                className="stroke-white/25"
                strokeWidth="1.2"
              />

              {/* Layer 2 */}
              <path
                d="M120 126 L195 88 L120 51 L45 88 Z"
                className="stroke-white/40 group-hover:stroke-white/50 transition-colors"
                strokeWidth="1.2"
                fill="none"
              />
              <path
                d="M45 88 L45 94 L120 132 L195 94 L195 88"
                className="stroke-white/40"
                strokeWidth="1.2"
              />

              {/* Vertical Dashed Guide Lines */}
              <line x1="45" y1="52" x2="45" y2="142" stroke="rgba(255,255,255,0.15)" strokeDasharray="3 3" strokeWidth="1" />
              <line x1="195" y1="52" x2="195" y2="142" stroke="rgba(255,255,255,0.15)" strokeDasharray="3 3" strokeWidth="1" />
              <line x1="120" y1="14" x2="120" y2="180" stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" strokeWidth="1" />

              {/* Top Layer 1 (Elevated Focus Wafer) */}
              <g className="transition-transform duration-300 group-hover:-translate-y-1">
                <path
                  d="M120 52 L195 14 L120 -23 L45 14 Z"
                  transform="translate(0, 38)"
                  className="stroke-white/70 group-hover:stroke-white transition-colors"
                  strokeWidth="1.5"
                  fill="rgba(12, 14, 20, 0.9)"
                />
                <path
                  d="M45 52 L45 58 L120 96 L195 58 L195 52"
                  className="stroke-white/60 group-hover:stroke-white transition-colors"
                  strokeWidth="1.5"
                />

                {/* Debossed Isometric Horizon Disc on Top Surface */}
                <ellipse cx="120" cy="52" rx="30" ry="15" className="stroke-white/60" strokeWidth="1.2" fill="none" />
                <path d="M100 52 Q120 58 140 52" className="stroke-white/40" strokeWidth="1" />
                <path d="M105 48 Q120 53 135 48" className="stroke-white/30" strokeWidth="1" />
                <path d="M105 56 Q120 61 135 56" className="stroke-white/30" strokeWidth="1" />
              </g>
            </svg>
          </div>

          {/* Text Description */}
          <div className="space-y-2 relative z-10">
            <h3 className="text-base font-bold text-white tracking-tight">
              Causal retention modeling
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Replaces blind studio graph guessing. Pinpoints the exact frame where seed audiences drop off and diagnoses hook friction automatically.
            </p>
          </div>
        </div>

        {/* COLUMN 2: FIG 0.2 - Modular Policy Cubes */}
        <div
          onMouseEnter={() => setHoveredFig(2)}
          onMouseLeave={() => setHoveredFig(null)}
          className="group relative p-8 sm:p-12 lg:p-14 flex flex-col justify-between min-h-[460px] transition-colors hover:bg-white/[0.015]"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Figure Label */}
          <div className="text-[11px] font-mono uppercase tracking-widest text-slate-500 group-hover:text-slate-300 transition-colors">
            FIG 0.2 // POLICY SENTINEL
          </div>

          {/* Isometric Vector Art: Geometric Cube Cluster */}
          <div className="my-10 flex items-center justify-center h-48 select-none">
            <svg
              viewBox="0 0 240 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-52 h-44 transition-transform duration-500 group-hover:scale-105"
            >
              {/* Back Top Cube (Tallest) */}
              <g className="transition-transform duration-300 group-hover:-translate-y-1">
                {/* Top face */}
                <path d="M120 30 L160 10 L120 -10 L80 10 Z" className="stroke-white/40" strokeWidth="1.2" fill="rgba(20,24,35,0.7)" />
                {/* Left face */}
                <path d="M80 10 L80 80 L120 100 L120 30 Z" className="stroke-white/30" strokeWidth="1.2" fill="rgba(10,12,18,0.8)" />
                {/* Right face */}
                <path d="M160 10 L160 80 L120 100 L120 30 Z" className="stroke-white/50" strokeWidth="1.2" fill="rgba(15,18,26,0.8)" />
                {/* Top face dot grid texture */}
                <circle cx="120" cy="10" r="1.5" fill="rgba(255,255,255,0.6)" />
                <circle cx="110" cy="5" r="1" fill="rgba(255,255,255,0.4)" />
                <circle cx="130" cy="15" r="1" fill="rgba(255,255,255,0.4)" />
              </g>

              {/* Left Medium Cube */}
              <g>
                <path d="M70 75 L110 55 L70 35 L30 55 Z" className="stroke-white/50" strokeWidth="1.2" fill="rgba(20,24,35,0.8)" />
                <path d="M30 55 L30 115 L70 135 L70 75 Z" className="stroke-white/40" strokeWidth="1.2" fill="rgba(10,12,18,0.8)" />
                <path d="M110 55 L110 115 L70 135 L70 75 Z" className="stroke-white/60" strokeWidth="1.2" fill="rgba(15,18,26,0.8)" />
                <circle cx="70" cy="55" r="1.5" fill="rgba(255,255,255,0.7)" />
              </g>

              {/* Right Medium Cube */}
              <g>
                <path d="M170 75 L210 55 L170 35 L130 55 Z" className="stroke-white/50" strokeWidth="1.2" fill="rgba(20,24,35,0.8)" />
                <path d="M130 55 L130 115 L170 135 L170 75 Z" className="stroke-white/40" strokeWidth="1.2" fill="rgba(10,12,18,0.8)" />
                <path d="M210 55 L210 115 L170 135 L170 75 Z" className="stroke-white/60" strokeWidth="1.2" fill="rgba(15,18,26,0.8)" />
                <circle cx="170" cy="55" r="1.5" fill="rgba(255,255,255,0.7)" />
              </g>

              {/* Front Cube (Center Low Foreground) */}
              <g className="transition-transform duration-300 group-hover:translate-y-0.5">
                <path d="M120 120 L160 100 L120 80 L80 100 Z" className="stroke-white/80 group-hover:stroke-white transition-colors" strokeWidth="1.5" fill="rgba(25,30,45,0.9)" />
                <path d="M80 100 L80 155 L120 175 L120 120 Z" className="stroke-white/60 group-hover:stroke-white/80 transition-colors" strokeWidth="1.5" fill="rgba(12,15,22,0.9)" />
                <path d="M160 100 L160 155 L120 175 L120 120 Z" className="stroke-white/70 group-hover:stroke-white/90 transition-colors" strokeWidth="1.5" fill="rgba(18,22,32,0.9)" />
                {/* Geometric Pattern on Top */}
                <circle cx="120" cy="100" r="2" fill="white" />
                <line x1="100" y1="90" x2="140" y2="110" stroke="rgba(255,255,255,0.3)" strokeDasharray="2 2" strokeWidth="1" />
              </g>

              {/* Floor Projection Grid */}
              <ellipse cx="120" cy="180" rx="75" ry="12" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" strokeWidth="1" fill="none" />
            </svg>
          </div>

          {/* Text Description */}
          <div className="space-y-2 relative z-10">
            <h3 className="text-base font-bold text-white tracking-tight">
              Pre-upload policy scanner
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Audits camera roll drafts before posting. Evaluates 2026 YouTube and TikTok fair use thresholds, background music copyright, and RPM qualification.
            </p>
          </div>
        </div>

        {/* COLUMN 3: FIG 0.3 - Cascading Deal Matrix Steps */}
        <div
          onMouseEnter={() => setHoveredFig(3)}
          onMouseLeave={() => setHoveredFig(null)}
          className="group relative p-8 sm:p-12 lg:p-14 flex flex-col justify-between min-h-[460px] transition-colors hover:bg-white/[0.015]"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Figure Label */}
          <div className="text-[11px] font-mono uppercase tracking-widest text-slate-500 group-hover:text-slate-300 transition-colors">
            FIG 0.3 // COMMERCIAL VALUATION
          </div>

          {/* Isometric Vector Art: Cascading Stepped Vertical Slats */}
          <div className="my-10 flex items-center justify-center h-48 select-none">
            <svg
              viewBox="0 0 240 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-52 h-44 transition-transform duration-500 group-hover:scale-105"
            >
              {/* Slat 1 (Back Tallest) */}
              <path d="M185 20 L205 30 L205 130 L185 120 Z" className="stroke-white/20" strokeWidth="1.2" fill="rgba(15,18,26,0.6)" />
              <path d="M165 10 L185 20 L185 120 L165 110 Z" className="stroke-white/30" strokeWidth="1.2" fill="rgba(20,25,35,0.7)" />

              {/* Slat 2 */}
              <path d="M165 35 L185 45 L185 135 L165 125 Z" className="stroke-white/25" strokeWidth="1.2" fill="rgba(15,18,26,0.6)" />
              <path d="M145 25 L165 35 L165 125 L145 115 Z" className="stroke-white/35" strokeWidth="1.2" fill="rgba(20,25,35,0.7)" />

              {/* Slat 3 */}
              <path d="M145 50 L165 60 L165 140 L145 130 Z" className="stroke-white/35" strokeWidth="1.2" fill="rgba(15,18,26,0.6)" />
              <path d="M125 40 L145 50 L145 130 L125 120 Z" className="stroke-white/45" strokeWidth="1.2" fill="rgba(20,25,35,0.7)" />

              {/* Slat 4 (Mid Focus) */}
              <path d="M125 65 L145 75 L145 145 L125 135 Z" className="stroke-white/45" strokeWidth="1.2" fill="rgba(15,18,26,0.7)" />
              <path d="M105 55 L125 65 L125 135 L105 125 Z" className="stroke-white/55" strokeWidth="1.2" fill="rgba(25,32,45,0.8)" />

              {/* Slat 5 */}
              <path d="M105 80 L125 90 L125 150 L105 140 Z" className="stroke-white/55" strokeWidth="1.2" fill="rgba(15,18,26,0.8)" />
              <path d="M85 70 L105 80 L105 140 L85 130 Z" className="stroke-white/65" strokeWidth="1.2" fill="rgba(25,32,45,0.85)" />

              {/* Slat 6 */}
              <path d="M85 95 L105 105 L105 155 L85 145 Z" className="stroke-white/65" strokeWidth="1.2" fill="rgba(15,18,26,0.85)" />
              <path d="M65 85 L85 95 L85 145 L65 135 Z" className="stroke-white/75" strokeWidth="1.2" fill="rgba(30,38,52,0.9)" />

              {/* Slat 7 (Front Step) */}
              <g className="transition-transform duration-300 group-hover:-translate-y-0.5">
                <path d="M65 110 L85 120 L85 160 L65 150 Z" className="stroke-white/80 group-hover:stroke-white transition-colors" strokeWidth="1.5" fill="rgba(20,25,35,0.9)" />
                <path d="M45 100 L65 110 L65 150 L45 140 Z" className="stroke-white group-hover:stroke-white transition-colors" strokeWidth="1.5" fill="rgba(35,44,60,0.95)" />
              </g>

              {/* Horizontal Stepped Base Track Line */}
              <path
                d="M45 140 L165 200 L205 180"
                className="stroke-white/20"
                strokeWidth="1.2"
                strokeDasharray="4 4"
                fill="none"
              />
            </svg>
          </div>

          {/* Text Description */}
          <div className="space-y-2 relative z-10">
            <h3 className="text-base font-bold text-white tracking-tight">
              Audited deal infrastructure
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Calculates genuine commercial rate value based on whitelisting ad usage, geographic CPM, and exclusivity lockouts. Connects directly to verified sponsor contacts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
