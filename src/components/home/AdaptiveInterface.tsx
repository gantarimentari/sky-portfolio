import { useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

type FrameMode = 'desktop' | 'tablet' | 'mobile'

export function AdaptiveInterface() {
  const [mode, setMode] = useState<FrameMode>('desktop')
  const rotateX = useSpring(useMotionValue(0), { stiffness: 160, damping: 22 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 160, damping: 22 })
  const widths: Record<FrameMode, string> = { desktop: '100%', tablet: '78%', mobile: '48%' }
  const labels: Record<FrameMode, string> = { desktop: 'DESKTOP · 1280', tablet: 'TABLET · 768', mobile: 'MOBILE · 390' }

  return <div className="adaptive-stage" onPointerMove={(event) => {
    if (event.pointerType === 'touch') return
    const rect = event.currentTarget.getBoundingClientRect()
    rotateY.set(((event.clientX - rect.left) / rect.width - .5) * 3)
    rotateX.set(-((event.clientY - rect.top) / rect.height - .5) * 3)
  }} onPointerLeave={() => { rotateX.set(0); rotateY.set(0) }}>
    <div className="stage-label"><span>LIVE COMPONENT</span><span>{labels[mode]}</span></div>
    <motion.div className="browser-frame" style={{ width: widths[mode], rotateX, rotateY, transformPerspective: 1200 }}>
      <div className="browser-bar"><i /><i /><i /><span>studio.product/interface</span></div>
      <div className="app-shell"><aside className="app-sidebar"><b>S</b><i className="active" /><i /><i /><span /></aside><main className="app-content"><div className="app-top"><div><small>GOOD MORNING</small><strong>Design overview</strong></div><button>New project</button></div><div className="stat-row"><article><small>ACTIVE</small><b>12</b><em>+18%</em></article><article><small>COMPLETED</small><b>48</b><em>+7%</em></article><article><small>TEAM</small><b>08</b><em>online</em></article></div><div className="chart-card"><div><b>Product activity</b><small>Last 7 days</small></div><div className="chart-bars">{[32, 48, 42, 72, 56, 88, 66, 96].map((height, index) => <i key={height} style={{ height: `${height}%` }} className={index === 7 ? 'highlight' : ''} />)}</div></div><div className="task-row"><span><i />Design system audit</span><b>82%</b></div></main></div>
    </motion.div>
    <div className="stage-controls">{(['desktop', 'tablet', 'mobile'] as FrameMode[]).map((item) => <button className={mode === item ? 'active' : ''} type="button" onClick={() => setMode(item)} key={item}>{item[0].toUpperCase() + item.slice(1)}</button>)}<span>Try the breakpoints</span></div>
  </div>
}
