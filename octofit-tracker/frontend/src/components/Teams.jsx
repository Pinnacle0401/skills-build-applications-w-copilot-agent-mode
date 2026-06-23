import React, { useEffect, useState } from 'react'
import { fetchJson } from '../api'

function normalize(data) {
  if (Array.isArray(data)) return { items: data, total: data.length }
  if (data && data.results) return { items: data.results, total: data.count ?? data.results.length }
  if (data && data.items) return { items: data.items, total: data.total ?? data.items.length }
  return { items: [], total: 0 }
}

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [total, setTotal] = useState(null)

  useEffect(() => {
    fetchJson('/teams')
      .then((d) => {
        const { items, total } = normalize(d)
        setTeams(items)
        setTotal(total)
      })
      .catch(() => {})
  }, [])

  return (
    <section>
      <h2>Teams</h2>
      <p>Total: {total ?? '...'}</p>
      <ul>
        {teams.map((t) => (
          <li key={t._id}>{t.name} — members: {Array.isArray(t.members) ? t.members.length : 'n/a'}</li>
        ))}
      </ul>
    </section>
  )
}
