import mongoose from 'mongoose'

const { Schema, model } = mongoose

const leaderboardSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  period: { type: String, default: 'weekly' },
  score: { type: Number, required: true },
  rank: { type: Number }
})

export default model('Leaderboard', leaderboardSchema)
