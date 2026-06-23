import { Router } from 'express'
import User from '../models/User'

const router = Router()

router.get('/users', async (_req, res) => {
  try {
    const users = await User.find().limit(50)
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

router.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body
    if (!name || !email) return res.status(400).json({ error: 'Missing fields' })
    const user = new User({ name, email })
    await user.save()
    res.status(201).json(user)
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' })
  }
})

export default router
