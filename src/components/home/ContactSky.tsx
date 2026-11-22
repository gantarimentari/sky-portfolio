import { useEffect, useRef, useState } from 'react'
import { ArrowDownToLine, ArrowUp, ArrowUpRight, Copy } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { profile } from '../../data/profile'

type CopyState = 'idle' | 'copied' | 'error'

export function ContactSky() {
  const reduceMotion = useReducedMotion()
  const [copyState, setCopyState] = useState<CopyState>('idle')
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current)
  }, [])

  const copyEmail = async () => {
    if (!profile.email) return

    try {
      await navigator.clipboard.writeText(profile.email)
      setCopyState('copied')
    } catch {
      setCopyState('error')
    }

    if (resetTimer.current) clearTimeout(resetTimer.current)
    resetTimer.current = setTimeout(() => setCopyState('idle'), 2400)
  }

  const reveal = reduceMotion
    ? { initial: false as const, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0 } }
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
      }

  return (
    <section className="reference-contact contact-editorial" id="contact" aria-labelledby="contact-title">
      <motion.div
        className="contact-editorial-main"
        viewport={{ once: true, amount: 0.3 }}
        {...reveal}
      >
        <p className="contact-editorial-label">Let’s work together</p>
        <h2 id="contact-title">
          <span>Have a project in mind?</span>
          <span>I’d love to hear about it.</span>
        </h2>
        <p className="contact-editorial-intro">
          Open to internship opportunities in software development, quality assurance, and data-related roles, as well as collaborative projects.
        </p>

        {profile.email && (
          <div className="contact-editorial-connect">
            <a className="contact-editorial-email" href={`mailto:${profile.email}`}>
              <span>{profile.email}</span>
              <ArrowUpRight aria-hidden="true" />
            </a>

            <div className="contact-editorial-actions" aria-label="Contact actions">
              <button type="button" onClick={copyEmail}>
                <Copy aria-hidden="true" />
                {copyState === 'copied' ? 'Email copied' : 'Copy email'}
              </button>
              {profile.resume && (
                <a href={profile.resume} download>
                  <ArrowDownToLine aria-hidden="true" />
                  Download CV
                </a>
              )}
            </div>

            <p className="contact-copy-status" aria-live="polite">
              {copyState === 'error' ? 'Couldn’t copy automatically. Select the email address above.' : ''}
            </p>
          </div>
        )}

        {!profile.email && profile.resume && (
          <div className="contact-editorial-actions contact-editorial-actions-without-email">
            <a href={profile.resume} download>
              <ArrowDownToLine aria-hidden="true" />
              Download CV
            </a>
          </div>
        )}
      </motion.div>

      <footer className="contact-editorial-footer">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <nav aria-label="Contact footer">
          {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
          <a href="#top">
            Back to top
            <ArrowUp aria-hidden="true" />
          </a>
        </nav>
      </footer>
    </section>
  )
}
