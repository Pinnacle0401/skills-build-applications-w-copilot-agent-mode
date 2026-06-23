import { Router } from 'express'
import Leaderboard from '../models/Leaderboard'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const leaderboard = await Leaderboard.find().populate('user', 'name email').sort({ rank: 1 }).limit(50)
    res.json(leaderboard)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { userId, period, score, rank } = req.body
    if (!userId || score === undefined) return res.status(400).json({ error: 'Missing fields' })
    const entry = new Leaderboard({ user: userId, period: period || 'weekly', score, rank })
    await entry.save()
    res.status(201).json(entry)
  } catch (err) {
    res.status(500).json({ error: 'Failed to create leaderboard entry' })
  }
})

export default router
