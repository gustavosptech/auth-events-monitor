import { User } from '../models/User'

export const seedUsers = async () => {
  const count = await User.countDocuments()
  if (count > 0) return

  await User.insertMany([
    { email: 'usuario@55pbx.com', password: '123456', role: 'user' },
    { email: 'admin@55pbx.com', password: '123456', role: 'admin' }
  ])
}