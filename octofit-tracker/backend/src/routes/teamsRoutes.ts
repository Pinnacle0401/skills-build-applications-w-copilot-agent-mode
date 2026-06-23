import { Router } from 'express'

const router = Router()

router.get('/', async (_req, res) => {
  // Placeholder: return empty list
  res.json([])
})

router.post('/', async (req, res) => {
  const { name } = req.body
  if (!name) return res.status(400).json({ error: 'Missing team name' })
  // Placeholder: echo back
  res.status(201).json({ id: 'team_1', name })
})

export default router
