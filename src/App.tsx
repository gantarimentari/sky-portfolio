import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import { SiteLayout } from './components/layout/SiteLayout'
import { Home } from './pages/Home'
import { Work } from './pages/Work'
import { About } from './pages/About'
import { ProjectDetail } from './pages/ProjectDetail'
import { NotFound } from './pages/NotFound'

const Playground = lazy(() => import('./pages/Playground'))

export default function App() {
  return (
    <SiteLayout>
      <Suspense fallback={<div className="route-loader" role="status">Loading experiment…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<ProjectDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </SiteLayout>
  )
}
