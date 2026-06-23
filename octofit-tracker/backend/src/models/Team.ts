import mongoose from 'mongoose'

const { Schema, model } = mongoose

const teamSchema = new Schema({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
})

export default model('Team', teamSchema)
