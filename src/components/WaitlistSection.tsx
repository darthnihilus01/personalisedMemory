import { Geist, Syncopate } from 'next/font/google';
import { motion } from 'framer-motion';
import styles from './waitlist.module.css';
import WaitlistForm from './waitlist-form';

// Self-hosted + optimized automatically by Next.js — no runtime request
// to Google Fonts. `variable` exposes every weight (100-900) through one
// CSS custom property, so the stylesheet can pick whatever weight it needs.
const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

const syncopate = Syncopate({
  weight: ['700'],
  subsets: ['latin'],
  variable: '--font-syncopate',
  display: 'swap',
});

export default function WaitlistSection() {
  return (
    <main id="waitlist" className={`${styles.scene} ${geist.variable}`}>
      {/* Seamless blend gradient from the previous section */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#020308] to-transparent z-10 pointer-events-none" />
      {/* Flowing light waves — no SVG filters to keep animation on GPU */}
      <svg
        className={styles.waves}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0} />
            <stop offset="30%" stopColor="#38bdf8" stopOpacity={0.85} />
            <stop offset="60%" stopColor="#5eead4" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#5eead4" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0} />
            <stop offset="35%" stopColor="#22d3ee" stopOpacity={0.7} />
            <stop offset="70%" stopColor="#7dd3fc" stopOpacity={0.75} />
            <stop offset="100%" stopColor="#7dd3fc" stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* Wave 1 — primary */}
        <g className={styles.waveGroup}>
          <path
            d="M-100,640 C160,585 300,700 500,650 C700,600 800,500 970,450 C1140,400 1320,320 1620,170"
            fill="none"
            stroke="url(#waveGrad)"
            strokeWidth={3.5}
            opacity={0.75}
          />
        </g>

        {/* Wave 2 — secondary */}
        <g className={`${styles.waveGroup} ${styles.slow}`}>
          <path
            d="M-100,700 C190,650 330,760 540,705 C750,650 840,555 1010,500 C1180,445 1360,365 1650,240"
            fill="none"
            stroke="url(#waveGrad2)"
            strokeWidth={2.5}
            opacity={0.6}
          />
        </g>

        {/* Wave 3 — thin accent */}
        <g className={styles.waveGroup} style={{ animationDelay: '-6s' }}>
          <path
            d="M-100,590 C170,540 290,650 470,600 C650,550 760,460 930,410 C1100,360 1280,290 1600,130"
            fill="none"
            stroke="url(#waveGrad)"
            strokeWidth={1.5}
            opacity={0.45}
          />
        </g>
      </svg>


      {/* Giant background wordmark — letters spread edge-to-edge */}
      <div className="absolute bottom-6 md:bottom-8 left-0 right-0 w-full text-center pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <span className={`watermark-text ${syncopate.className}`}>
          Lattice
        </span>
      </div>

      <div className={styles.content}>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[44px] md:text-[52px] lg:text-[64px] font-medium tracking-tight leading-[1.05] mb-12 text-center text-gradient-cyan"
        >
          Coming soon!
        </motion.h1>

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={styles.card} aria-labelledby="waitlist-heading"
        >
          <h2 id="waitlist-heading" className="font-display text-2xl md:text-[28px] font-medium tracking-tight mb-3">Get early access</h2>
          <p className="text-zinc-400 text-[15px] leading-relaxed max-w-[440px] mx-auto mb-9">Be one of the first to try Lattice. We&apos;ll email you the moment we open up access.</p>

          <WaitlistForm />
        </motion.section>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={styles.footerText}
        >
          <span>© 2026 Lattice</span>
          <span className={styles.dot} />
          <span>Created by Aditya Pokuri &amp; Ramanand Vishvakarma</span>
          <span className={styles.dot} />
          <span>All rights reserved</span>
        </motion.p>
      </div>
    </main>
  );
}
