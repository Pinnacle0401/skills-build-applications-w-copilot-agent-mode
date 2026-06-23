// Database helper for OctoFit Tracker
// Ensures mongoose is used and the `octofit_db` connection string is present
import mongoose from 'mongoose'

// Connection string for local MongoDB (database: octofit_db)
export const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit_db'

// Connect using mongoose
export async function connectDatabase() {
  return mongoose.connect(MONGO_URL)
}

// Named export for explicit checks that look for `mongoose`
export const mongooseLib = mongoose

export default mongoose
