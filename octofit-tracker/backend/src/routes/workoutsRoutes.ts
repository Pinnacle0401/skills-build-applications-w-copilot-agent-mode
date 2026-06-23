import { Router } from 'express'
import Workout from '../models/Workout'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const workouts = await Workout.find().populate('createdBy', 'name email')
    res.json(workouts)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch workouts' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { name, createdBy, exercises } = req.body
    if (!name) return res.status(400).json({ error: 'Missing workout name' })
    const workout = new Workout({ name, createdBy, exercises: exercises || [] })
    await workout.save()
    res.status(201).json(workout)
  } catch (err) {
    res.status(500).json({ error: 'Failed to create workout' })
  }
})

export default router
