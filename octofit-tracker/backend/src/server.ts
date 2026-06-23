import express from 'express'
import { connectDatabase, MONGO_URL } from './config/database'
import userRoutes from './routes/userRoutes'
import teamsRoutes from './routes/teamsRoutes'
import activitiesRoutes from './routes/activitiesRoutes'
import leaderboardRoutes from './routes/leaderboardRoutes'
import workoutsRoutes from './routes/workoutsRoutes'

const app = express()
app.use(express.json())

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000

connectDatabase()
  .then(() => console.log(`Connected to MongoDB at ${MONGO_URL}`))
  .catch((err) => console.error('MongoDB connection error:', err))

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

app.use('/api/users', userRoutes)
app.use('/api/teams', teamsRoutes)
app.use('/api/activities', activitiesRoutes)
app.use('/api/leaderboard', leaderboardRoutes)
app.use('/api/workouts', workoutsRoutes)

// Codespaces-aware URL (uses CODESPACE_NAME)
if (process.env.CODESPACE_NAME) {
  const codespaceUrl = `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  console.log(`Codespaces preview URL: ${codespaceUrl}`)
}

app.listen(PORT, () => {
  const hostUrl = process.env.CODESPACE_NAME
    ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
    : `http://localhost:${PORT}`

  console.log(`OctoFit backend listening on port ${PORT}`)
  console.log(`API available at ${hostUrl}/api`)
})
