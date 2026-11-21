import { useEffect, useMemo, useState } from 'react'
import { RotateCcw, Sparkles, Zap } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { WonderConsole3D, type ConsoleState } from '../components/playground/WonderConsole3D'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const results = [
  { title: 'A Pocket-Sized Idea', message: 'Make the smallest useful version. Then let the next question shape it.' },
  { title: 'Curiosity, Compiled', message: 'Try the path that teaches you something—even if it is not the shortest one.' },
  { title: 'One Useful Detail', message: 'Polish the moment people touch most. Thoughtfulness tends to travel outward.' },
  { title: 'Permission to Play', message: 'An experiment does not need to be important to become meaningful.' },
  { title: 'A Fresh Signal', message: 'Step away, change the frame, and return with one clearer question.' },
]

function canUse3D() {
  try {
    const canvas = document.createElement('canvas')
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl')) && navigator.hardwareConcurrency >= 4 && !connection?.saveData
  } catch { return false }
}

function ConsoleFallback({ state }: { state: ConsoleState }) {
  return <div className={`console-fallback state-${state}`} aria-label="Wonder Console visual"><div className="fallback-screen">{state === 'idle' ? 'READY' : state === 'processing' ? 'PROCESSING…' : 'OUTPUT FOUND'}</div><div className="fallback-knob" /><div className="fallback-button"><Sparkles /></div><div className="fallback-lines" /></div>
}

export default function Playground() {
  useDocumentTitle('The Wonder Console')
  const reduceMotion = Boolean(useReducedMotion())
  const supports3D = useMemo(() => canUse3D(), [])
  const [state, setState] = useState<ConsoleState>('idle')
  const [resultIndex, setResultIndex] = useState(0)

  useEffect(() => {
    if (state !== 'processing') return
    const timer = window.setTimeout(() => {
      setResultIndex((current) => (current + 1 + Math.floor(Math.random() * (results.length - 1))) % results.length)
      setState('result')
    }, reduceMotion ? 250 : 1350)
    return () => window.clearTimeout(timer)
  }, [state, reduceMotion])

  const activate = () => { if (state !== 'processing') setState('processing') }
  const reset = () => setState('idle')
  const result = results[resultIndex]

  return <div className="playground-page page-frame">
    <header className="playground-header"><div><p className="eyebrow">EXPERIMENT 01 / TACTILE CURIOSITY</p><h1>The Wonder<br /><em>Console.</em></h1></div><p>A tiny creative instrument engineered to produce one unexpected thought at a time. No productivity promised. Curiosity encouraged.</p></header>
    <section className="console-stage" aria-labelledby="console-title">
      <div className="console-stage-meta"><span id="console-title">CCR / WONDER UNIT 01</span><span>STATE: {state.toUpperCase()}</span></div>
      <div className="console-viewport">{supports3D ? <WonderConsole3D state={state} resultIndex={resultIndex} reduceMotion={reduceMotion} fallback={<ConsoleFallback state={state} />} /> : <ConsoleFallback state={state} />}</div>
      <div className="console-control-panel">
        <div className="console-readout" role="status" aria-live="polite">
          <span>OUTPUT CHANNEL</span>
          <AnimatePresence mode="wait">
            <motion.div key={state} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              {state === 'idle' && <><strong>Awaiting input.</strong><p>The machine is ready when you are.</p></>}
              {state === 'processing' && <><strong>Distilling wonder…</strong><p>Combining signal, noise, and one good question.</p></>}
              {state === 'result' && <><strong>{result.title}</strong><p>{result.message}</p></>}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="console-actions">
          <button className="wonder-button" type="button" onClick={activate} disabled={state === 'processing'}><span>{state === 'result' ? 'Make another' : state === 'processing' ? 'Processing' : 'Press for wonder'}</span>{state === 'processing' ? <Zap /> : <Sparkles />}</button>
          <button className="reset-button" type="button" onClick={reset} disabled={state === 'idle'}><RotateCcw size={16} /> Reset</button>
        </div>
      </div>
    </section>
    <aside className="playground-note"><span>NOTE FROM THE LAB</span><p>The console is deliberately small: one interaction, immediate feedback, and a little space for surprise. On lighter devices, it swaps its 3D shell for an equally functional 2D instrument.</p></aside>
  </div>
}
