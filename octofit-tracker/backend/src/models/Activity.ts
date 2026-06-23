import mongoose from 'mongoose'

const { Schema, model } = mongoose

const activitySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true }, // minutes
  calories: { type: Number },
  date: { type: Date, default: Date.now }
})

export default model('Activity', activitySchema)
