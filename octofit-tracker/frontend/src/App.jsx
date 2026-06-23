import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Users from './components/Users'
import Teams from './components/Teams'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Workouts from './components/Workouts'

function Nav() {
  return (
    <nav style={{ display: 'flex', gap: 12, padding: 12 }}>
      <Link to="/">Home</Link>
      <Link to="/users">Users</Link>
      <Link to="/teams">Teams</Link>
      <Link to="/activities">Activities</Link>
      <Link to="/leaderboard">Leaderboard</Link>
      <Link to="/workouts">Workouts</Link>
    </nav>
  )
}

export default function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: 20 }}>
      <h1>OctoFit Tracker</h1>
      <p>Frontend running on port 5173</p>
      <Nav />
      <Routes>
        <Route path="/" element={<div>Welcome to OctoFit Tracker — select a resource.</div>} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  )
}
