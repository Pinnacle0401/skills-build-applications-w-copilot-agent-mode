import express from 'express'
import mongoose from 'mongoose'
import userRoutes from './routes/userRoutes'
import teamsRoutes from './routes/teamsRoutes'
import activitiesRoutes from './routes/activitiesRoutes'
import leaderboardRoutes from './routes/leaderboardRoutes'
import workoutsRoutes from './routes/workoutsRoutes'

const app = express()
app.use(express.json())

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit'
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000

mongoose.connect(MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err))

app.get('/health', (_req, res) => res.json({status: 'ok'}))

app.use('/api/users', userRoutes)
app.use('/api/teams', teamsRoutes)
app.use('/api/activities', activitiesRoutes)
app.use('/api/leaderboard', leaderboardRoutes)
app.use('/api/workouts', workoutsRoutes)

if (process.env.CODESPACE_NAME) {
  const codespaceUrl = `https://${process.env.CODESPACE_NAME}-${PORT}.githubpreview.dev`
  console.log(`Codespaces preview URL: ${codespaceUrl}`)
}

app.listen(PORT, () => {
  console.log(`OctoFit backend listening on port ${PORT}`)
})
