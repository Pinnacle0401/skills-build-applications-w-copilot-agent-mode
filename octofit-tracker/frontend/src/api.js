const VITE_CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME
const API_BASE = VITE_CODESPACE_NAME
  ? `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api`
  : '/api'

function buildPath(path) {
  if (!path) return API_BASE
  return path.startsWith('/') ? `${API_BASE}${path}` : `${API_BASE}/${path}`
}

export async function fetchJson(path) {
  const url = buildPath(path)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

export { API_BASE }
