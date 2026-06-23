/**
 * Seed the octofit_db database with test data
 *
 * This script connects to the local MongoDB instance on port 27017
 * and populates the `octofit_db` database with sample users, teams,
 * activities, leaderboards, and workouts.
 */

import { connectDatabase, MONGO_URL } from '../database'
import User from '../models/User'
import Team from '../models/Team'
import Activity from '../models/Activity'
import Leaderboard from '../models/Leaderboard'
import Workout from '../models/Workout'
import mongoose from 'mongoose'

async function seed() {
  console.log('Seed the octofit_db database with test data')
  await connectDatabase()
  console.log(`Connected to MongoDB for seeding at ${MONGO_URL}`)

  await mongoose.connection.dropDatabase()
  console.log('Dropped existing database')

  // Create users
  const users = await User.create([
    { name: 'Alice Rivera', email: 'alice@example.com' },
    { name: 'Ben Thompson', email: 'ben@example.com' },
    { name: 'Chen Li', email: 'chen@example.com' }
  ])

  // Create teams
  const teamA = await Team.create({ name: 'Seaside Sprinters', members: [users[0]._id, users[1]._id] })
  const teamB = await Team.create({ name: 'Mountain Movers', members: [users[2]._id] })

  // Create workouts
  const workout1 = await Workout.create({
    name: 'Full Body Blast',
    createdBy: users[0]._id,
    exercises: [
      { name: 'Push Ups', reps: 15, sets: 3 },
      { name: 'Squats', reps: 20, sets: 3 }
    ]
  })

  const workout2 = await Workout.create({
    name: 'Cardio Quickie',
    createdBy: users[1]._id,
    exercises: [
      { name: 'Jump Rope', duration: 10 },
      { name: 'Sprint Intervals', duration: 15 }
    ]
  })

  // Create activities
  const activities = await Activity.create([
    { user: users[0]._id, type: 'run', duration: 30, calories: 320 },
    { user: users[1]._id, type: 'cycle', duration: 45, calories: 480 },
    { user: users[2]._id, type: 'yoga', duration: 60, calories: 200 }
  ])

  // Create leaderboard
  await Leaderboard.create([
    { user: users[1]._id, period: 'weekly', score: 980, rank: 1 },
    { user: users[0]._id, period: 'weekly', score: 860, rank: 2 },
    { user: users[2]._id, period: 'weekly', score: 720, rank: 3 }
  ])

  console.log('Seeding complete:')
  console.log('- Users:', users.length)
  console.log('- Teams: 2')
  console.log('- Workouts: 2')
  console.log('- Activities:', activities.length)

  await mongoose.disconnect()
  console.log('Disconnected from MongoDB')
}

seed().catch(err => {
  console.error('Seeding error:', err)
  process.exit(1)
})
