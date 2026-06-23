import { Router } from 'express'

const router = Router()

router.get('/', async (_req, res) => {
  // Placeholder: return empty activities list
  res.json([])
})

router.post('/', async (req, res) => {
  const { type, duration } = req.body
  if (!type || !duration) return res.status(400).json({ error: 'Missing fields' })
  res.status(201).json({ id: 'activity_1', type, duration })
})

export default router
