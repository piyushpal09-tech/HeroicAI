const mongoose = require('mongoose')

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.warn('MONGO_URI is not configured. The API will use the in-memory fallback store.')
    return false
  }

  if (mongoose.connection.readyState === 1) {
    return true
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    })
    console.log('MongoDB connected')
    return true
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`)
    return false
  }
}

const isDatabaseConnected = () => mongoose.connection.readyState === 1

module.exports = {
  connectDB,
  isDatabaseConnected,
}
