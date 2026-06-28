import mongoose from 'mongoose'

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI as string)
    } catch (error) {
        process.exit(1)
    }
}