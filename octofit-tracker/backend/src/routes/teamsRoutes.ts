import { Router } from 'express'
import Team from '../models/Team'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const teams = await Team.find().populate('members', 'name email')
    res.json(teams)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch teams' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { name, memberIds } = req.body
    if (!name) return res.status(400).json({ error: 'Missing team name' })
    const team = new Team({ name, members: memberIds || [] })
    await team.save()
    res.status(201).json(team)
  } catch (err) {
    res.status(500).json({ error: 'Failed to create team' })
  }
})

export default router
