import mongoose from 'mongoose'

const { Schema, model } = mongoose

const workoutSchema = new Schema({
  name: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  exercises: [
    {
      name: { type: String, required: true },
      reps: { type: Number },
      sets: { type: Number },
      duration: { type: Number } // minutes
    }
  ],
  createdAt: { type: Date, default: Date.now }
})

export default model('Workout', workoutSchema)
