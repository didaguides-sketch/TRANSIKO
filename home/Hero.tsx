"use client";

import { motion } from "framer-motion";
import SearchBar from "./SearchBar";

export default function Hero({ dict }: { dict: any }) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, rgba(163,52,73,.35), transparent 55%), linear-gradient(180deg,#20242A 0%, #2B3038 100%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-[46%] opacity-50" aria-hidden>
        <svg viewBox="0 0 800 200" preserveAspectRatio="none" className="h-full w-[200%] animate-[tkdrift_40s_linear_infinite]">
          <g fill="rgba(255,255,255,0.06)">
            {[0, 400].map((offset) => (
              <g key={offset} transform={`translate(${offset},0)`}>
                <rect x="0" y="90" width="60" height="110" />
                <rect x="70" y="60" width="45" height="140" />
                <rect x="125" y="110" width="70" height="90" />
                <rect x="205" y="40" width="50" height="160" />
                <rect x="265" y="80" width="60" height="120" />
                <rect x="335" y="100" width="45" height="100" />
              </g>
            ))}
          </g>
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-5 py-16 text-center text-white md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-3 text-xs font-bold uppercase tracking-[2px] text-[#E7A9B2]"
        >
          {dict.hero.eyebrow}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-3xl font-extrabold leading-tight md:text-[46px]"
        >
          {dict.hero.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-4 max-w-xl text-[15.5px] text-slate-300 md:text-[16.5px]"
        >
          {dict.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8"
        >
          <SearchBar dict={dict} />
        </motion.div>
      </div>

      <style>{`@keyframes tkdrift{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </section>
  );
}
