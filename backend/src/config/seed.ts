import { User } from '../models/User'

export const seedUsers = async () => {
  const count = await User.countDocuments()
  if (count > 0) return

  await User.insertMany([
    {
      email: process.env.SEED_ADMIN_EMAIL,
      password: process.env.SEED_ADMIN_PASSWORD,
      role: 'admin'
    },
    {
      email: process.env.SEED_USER_EMAIL,
      password: process.env.SEED_USER_PASSWORD,
      role: 'user'
    }
  ])
}