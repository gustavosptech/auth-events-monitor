import mongoose from 'mongoose'
import { seedUsers } from './seed'

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI as string)
        await seedUsers()
    } catch (error) {
        process.exit(1)
    }
}