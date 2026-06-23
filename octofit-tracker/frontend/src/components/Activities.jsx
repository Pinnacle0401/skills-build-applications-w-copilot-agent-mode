import React, { useEffect, useState } from 'react'

// API base: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api
const VITE_CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME
const API_BASE = VITE_CODESPACE_NAME ? `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api` : '/api'

function normalize(data) {
  if (Array.isArray(data)) return { items: data, total: data.length }
  if (data && data.results) return { items: data.results, total: data.count ?? data.results.length }
  if (data && data.items) return { items: data.items, total: data.total ?? data.items.length }
  return { items: [], total: 0 }
}

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [total, setTotal] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE}/activities`)
      .then((r) => r.json())
      .then((d) => {
        const { items, total } = normalize(d)
        setActivities(items)
        setTotal(total)
      })
      .catch(() => {})
  }, [])

  return (
    <section>
      <h2>Activities</h2>
      <p>Total: {total ?? '...'}</p>
      <ul>
        {activities.map((a) => (
          <li key={a._id}>{a.type} — {a.duration} min — by {a.user?.name || 'Unknown'}</li>
        ))}
      </ul>
    </section>
  )
}
