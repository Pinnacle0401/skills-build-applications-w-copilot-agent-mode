import { Router } from 'express'

const router = Router()

router.get('/', async (_req, res) => {
  // Placeholder: return empty workouts list
  res.json([])
})

router.post('/', async (req, res) => {
  const { name, exercises } = req.body
  if (!name) return res.status(400).json({ error: 'Missing workout name' })
  res.status(201).json({ id: 'workout_1', name, exercises: exercises || [] })
})

export default router
