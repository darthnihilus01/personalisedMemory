'use client';

import { useState, type FormEvent } from 'react';
import styles from './waitlist.module.css';

type Status = 'idle' | 'submitting' | 'success' | 'error';

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim();

    if (!isValidEmail(value)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setErrorMsg('');
    setStatus('submitting');

    try {
      // TODO: replace with your real submission endpoint, e.g.
      // await fetch('/api/waitlist', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: value }),
      // });
      await new Promise((resolve) => setTimeout(resolve, 600));
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className={styles.successMsg}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5" />
        </svg>
        You&apos;re on the list — we&apos;ll be in touch!
      </div>
    );
  }

  return (
    <>
      <form className={styles.signupForm} onSubmit={handleSubmit} noValidate>
        <label htmlFor="emailInput" className={styles.srOnly}>
          Email address
        </label>
        <input
          id="emailInput"
          name="email"
          type="email"
          placeholder="Enter email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          className={status === 'error' ? styles.inputError : undefined}
        />
        <button type="submit" className={styles.submitBtn} disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Joining…' : 'Join Waitlist'}
        </button>
      </form>
      <p className={styles.fieldError}>{errorMsg}</p>
    </>
  );
}
