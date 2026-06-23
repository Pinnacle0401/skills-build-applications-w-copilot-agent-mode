import { Router } from 'express'
import Activity from '../models/Activity'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const activities = await Activity.find().populate('user', 'name email').limit(50)
    res.json(activities)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch activities' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { userId, type, duration, calories, date } = req.body
    if (!userId || !type || !duration) return res.status(400).json({ error: 'Missing fields' })
    const activity = new Activity({ user: userId, type, duration, calories, date })
    await activity.save()
    res.status(201).json(activity)
  } catch (err) {
    res.status(500).json({ error: 'Failed to create activity' })
  }
})

export default router
