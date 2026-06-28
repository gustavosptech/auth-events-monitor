import mongoose from 'mongoose'

const sessionSchema = new mongoose.Schema({
  token: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
})

export const Session = mongoose.model('Session', sessionSchema)