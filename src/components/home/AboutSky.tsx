import { motion, useReducedMotion } from 'motion/react'

export function AboutSky() {
  const reduceMotion = useReducedMotion()
  const reveal = reduceMotion
    ? { initial: false as const, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0 } }
    : {
        initial: { opacity: 0, y: 14 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.62, ease: [0.16, 1, 0.3, 1] as const },
      }

  return (
    <section className="about-sky" id="about" aria-labelledby="about-sky-title">
      <motion.header
        className="about-editorial-header"
        viewport={{ once: true, amount: 0.35 }}
        {...reveal}
      >
        <p className="about-editorial-label">About Me</p>
        <div className="about-editorial-heading-row">
          <h2 id="about-sky-title">
            Thoughtful interfaces,
            <span> grounded in how systems work.</span>
          </h2>
          <p>
            I&apos;m a Software Engineering Technology student at Universitas Gadjah Mada with hands-on experience in web application development, API integration, and software testing.
          </p>
        </div>
      </motion.header>

      <motion.div
        className="about-editorial-body"
        viewport={{ once: true, amount: 0.28 }}
        {...reveal}
      >
        <div className="about-editorial-story">
          <p className="about-editorial-lead">
            I enjoy turning ideas into practical applications, from designing interfaces
            to understanding how the underlying systems work.
          </p>
          <p>
            My academic work also includes data preprocessing, analysis, visualization,
            and machine learning.
          </p>
          <p>
            I continue to learn through collaborative work and practical projects—by
            listening carefully, sharing feedback, and improving the result together.
          </p>
        </div>

        <div className="about-editorial-contribution">
          <h3>What I bring</h3>
          <div className="about-editorial-points">
            <article>
              <strong>From requirements to interface</strong>
              <p>I translate product requirements into structured, working interfaces.</p>
            </article>
            <article>
              <strong>System awareness</strong>
              <p>I consider the APIs, data, testing, and delivery decisions behind the visible product.</p>
            </article>
            <article>
              <strong>Collaborative development</strong>
              <p>I communicate progress, respond to feedback, and work through implementation decisions with a team.</p>
            </article>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
