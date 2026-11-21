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
           Software Engineering Technology student at Universitas Gadjah Mada with hands-on experience in web & mobile application development, API 
            integration, and software testing. Experienced in developing frontend applications using React, Next.js, vue.js, and Flutter, performing automated UI 
            testing with Java and Selenium, and working with Python for data analysis and machine learning projects.
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
            I enjoy turning ideas and requirements into digital experiences that are
            easy to understand and practical to use.
          </p>
          <p>
            My work begins at the interface, but it does not stop there. Experience
            with backend integration, APIs, testing, and software delivery helps me
            understand how the visible product connects to the systems underneath it.
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
              <p>I translate product ideas into working screens with clear structure and purposeful interaction.</p>
            </article>
            <article>
              <strong>Awareness beyond the frontend</strong>
              <p>I consider data, APIs, testing, and delivery decisions that shape the final user experience.</p>
            </article>
            <article>
              <strong>Practical collaboration</strong>
              <p>I work openly with others, learn from feedback, and help turn shared decisions into reliable outcomes.</p>
            </article>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
