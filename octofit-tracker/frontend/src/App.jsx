import React, { useEffect, useState } from 'react'
import { fetchJson } from './api'

const endpoints = [
  { key: 'users', path: '/users' },
  { key: 'teams', path: '/teams' },
  { key: 'activities', path: '/activities' },
  { key: 'leaderboard', path: '/leaderboard' },
  { key: 'workouts', path: '/workouts' }
]

export default function App() {
  const [data, setData] = useState({})
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const results = {}
        for (const endpoint of endpoints) {
          results[endpoint.key] = await fetchJson(endpoint.path)
        }
        setData(results)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Fetch error')
      }
    }

    load()
  }, [])

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 20 }}>
      <h1>OctoFit Tracker</h1>
      <p>Frontend running on port 5173</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 20 }}>
        {endpoints.map((endpoint) => (
          <section key={endpoint.key} style={{ background: '#fff', borderRadius: 8, padding: 16, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <h2>{endpoint.key}</h2>
            <p>Count: {Array.isArray(data[endpoint.key]) ? data[endpoint.key].length : '...'}</p>
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontSize: 12 }}>
              {data[endpoint.key] ? JSON.stringify(data[endpoint.key].slice(0, 2), null, 2) : 'Loading...'}
            </pre>
          </section>
        ))}
      </div>
    </div>
  )
}
