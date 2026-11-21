import { useEffect } from 'react'

export function useDocumentTitle(title: string) {
  useEffect(() => { document.title = `${title} — Creative Control Room` }, [title])
}
