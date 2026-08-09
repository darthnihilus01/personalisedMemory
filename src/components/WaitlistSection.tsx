import { Geist, Syncopate } from 'next/font/google';
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
      {/* Flowing light waves */}
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
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="bigGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
        </defs>

        <g className={styles.waveGroup}>
          <path
            d="M-100,640 C160,585 300,700 500,650 C700,600 800,500 970,450 C1140,400 1320,320 1620,170"
            fill="none"
            stroke="url(#waveGrad)"
            strokeWidth={26}
            filter="url(#bigGlow)"
            opacity={0.55}
          />
          <path
            d="M-100,640 C160,585 300,700 500,650 C700,600 800,500 970,450 C1140,400 1320,320 1620,170"
            fill="none"
            stroke="url(#waveGrad)"
            strokeWidth={3.5}
            filter="url(#softGlow)"
          />
        </g>

        <g className={`${styles.waveGroup} ${styles.slow}`}>
          <path
            d="M-100,700 C190,650 330,760 540,705 C750,650 840,555 1010,500 C1180,445 1360,365 1650,240"
            fill="none"
            stroke="url(#waveGrad2)"
            strokeWidth={20}
            filter="url(#bigGlow)"
            opacity={0.45}
          />
          <path
            d="M-100,700 C190,650 330,760 540,705 C750,650 840,555 1010,500 C1180,445 1360,365 1650,240"
            fill="none"
            stroke="url(#waveGrad2)"
            strokeWidth={2.5}
            filter="url(#softGlow)"
          />
        </g>

        <g className={styles.waveGroup} style={{ animationDelay: '-6s' }}>
          <path
            d="M-100,590 C170,540 290,650 470,600 C650,550 760,460 930,410 C1100,360 1280,290 1600,130"
            fill="none"
            stroke="url(#waveGrad)"
            strokeWidth={1.5}
            filter="url(#softGlow)"
            opacity={0.8}
          />
        </g>
      </svg>

      {/* Giant background wordmark */}
      <div className={`${styles.giantText} ${syncopate.className}`} aria-hidden="true">
        LORE AI
      </div>
      <div className={`${styles.orb} ${styles.o1}`} aria-hidden="true" />
      <div className={`${styles.orb} ${styles.o2}`} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.badge}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 21V4a1 1 0 0 1 1-1h13.5a.5.5 0 0 1 .4.8L15 10l3.9 6.2a.5.5 0 0 1-.4.8H5a1 1 0 0 0-1 1Z" />
          </svg>
          Waitlist
        </div>

        <h1 className={styles.headline}>Coming soon!</h1>

        <section className={styles.card} aria-labelledby="waitlist-heading">
          <h2 id="waitlist-heading">Join our waitlist!</h2>
          <p>Sign up for our newsletter to receive the latest updates and insights straight to your inbox.</p>

          <WaitlistForm />
        </section>

        <p className={styles.footerText}>
          <span>© 2026 Waitlist</span>
          <span className={styles.dot} />
          <span>All rights reserved</span>
        </p>
      </div>
    </main>
  );
}
