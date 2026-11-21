import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
export function NotFound() { useDocumentTitle('Page not found'); return <div className="not-found page-frame"><p className="eyebrow">ERROR / 404</p><h1>Signal lost.</h1><p>This channel does not exist, or it may have moved.</p><Link className="button button-primary" to="/"><ArrowLeft size={17} /> Return home</Link></div> }
