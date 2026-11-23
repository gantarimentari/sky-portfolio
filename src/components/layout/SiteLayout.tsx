import { useEffect, useState, type PropsWithChildren } from 'react'
import { Link, useLocation } from 'react-router'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { profile } from '../../data/profile'

const navItems = [{ to: '/#work', label: 'Work' }, { to: '/#experience', label: 'Experience' }, { to: '/#about', label: 'About' }, { to: '/#contact', label: 'Contact' }]

export function SiteLayout({ children }: PropsWithChildren) {
  const location = useLocation()
  const [isNavCondensed, setIsNavCondensed] = useState(false)
  useEffect(() => {
    // Same glide as porto-v1: Lenis eases the wheel so scroll-linked animations get a steady stream of small steps.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ autoRaf: true, duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), wheelMultiplier: .9, touchMultiplier: 1.5,
      // The intro locks scroll with body overflow; hand those events back to the browser so the lock holds.
      virtualScroll: () => document.body.style.overflow !== 'hidden' })
    return () => lenis.destroy()
  }, [])
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [location.pathname])
  useEffect(() => {
    if (!location.hash) return
    const target = location.hash === '#projects' ? '#work' : location.hash
    requestAnimationFrame(() => document.querySelector(target)?.scrollIntoView())
  }, [location.hash, location.pathname])
  useEffect(() => {
    let frame = 0
    const updateNav = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setIsNavCondensed(window.scrollY > 10))
    }
    updateNav()
    window.addEventListener('scroll', updateNav, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', updateNav)
    }
  }, [])
  return <div className="site-shell">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className={`site-header${isNavCondensed ? ' is-condensed' : ''}`}>
      <Link className="brand" to="/" aria-label="Larasati — portfolio home"><span className="brand-mark" aria-hidden="true"><img src="/logo-mark.svg" alt="" /></span><span className="brand-copy">Larasati<small>{profile.role}</small></span></Link>
      <nav className="nav-links" aria-label="Primary navigation">{navItems.map((item) => <Link key={item.to} to={item.to}>{item.label}</Link>)}</nav>
      <Link className="availability" to="/#contact">Let's talk</Link>
    </header>
    <main id="main-content">{children}</main>
    {location.pathname !== '/' && <footer className="site-footer"><p>Designed with curiosity. Built with intention.</p><p>© {new Date().getFullYear()} {profile.name}</p></footer>}
  </div>
}
