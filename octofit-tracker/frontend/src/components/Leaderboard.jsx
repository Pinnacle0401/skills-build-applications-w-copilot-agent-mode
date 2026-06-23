import React, { useEffect, useState } from 'react'
import { fetchJson } from '../api'

function normalize(data) {
  if (Array.isArray(data)) return { items: data, total: data.length }
  if (data && data.results) return { items: data.results, total: data.count ?? data.results.length }
  if (data && data.items) return { items: data.items, total: data.total ?? data.items.length }
  return { items: [], total: 0 }
}

export default function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [total, setTotal] = useState(null)

  useEffect(() => {
    fetchJson('/leaderboard')
      .then((d) => {
        const { items, total } = normalize(d)
        setEntries(items)
        setTotal(total)
      })
      .catch(() => {})
  }, [])

  return (
    <section>
      <h2>Leaderboard</h2>
      <p>Total: {total ?? '...'}</p>
      <ol>
        {entries.map((e) => (
          <li key={e._id}>{e.user?.name || 'Unknown'} — {e.score} pts — rank {e.rank}</li>
        ))}
      </ol>
    </section>
  )
}
