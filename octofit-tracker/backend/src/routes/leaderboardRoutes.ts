import { Router } from 'express'

const router = Router()

router.get('/', async (_req, res) => {
  // Placeholder: return empty leaderboard
  res.json([])
})

export default router
