import { useEffect } from 'react'

export function useDocumentTitle(title: string, exact = false) {
  useEffect(() => { document.title = exact ? title : `${title} — Larasati Ayu Gantari` }, [exact, title])
}
