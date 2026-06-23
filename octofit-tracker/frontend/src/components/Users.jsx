import React, { useEffect, useState } from 'react'
import { fetchJson } from '../api'

function normalize(data) {
  if (Array.isArray(data)) return { items: data, total: data.length }
  if (data && data.results) return { items: data.results, total: data.count ?? data.results.length }
  if (data && data.items) return { items: data.items, total: data.total ?? data.items.length }
  return { items: [], total: 0 }
}

export default function Users() {
  const [users, setUsers] = useState([])
  const [total, setTotal] = useState(null)

  useEffect(() => {
    fetchJson('/users')
      .then((d) => {
        const { items, total } = normalize(d)
        setUsers(items)
        setTotal(total)
      })
      .catch(() => {})
  }, [])

  return (
    <section>
      <h2>Users</h2>
      <p>Total: {total ?? '...'}</p>
      <ul>
        {users.map((u) => (
          <li key={u._id}>{u.name} — {u.email}</li>
        ))}
      </ul>
    </section>
  )
}
