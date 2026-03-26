const mongoose = require('mongoose')

const repairGoogleAuthDocuments = async () => {
  try {
    const usersCollection = mongoose.connection.collection('users')
    const result = await usersCollection.updateMany(
      {
        $or: [{ googleId: null }, { googleId: '' }],
      },
      {
        $unset: { googleId: 1 },
      },
    )

    if (result.modifiedCount > 0) {
      console.log(`Repaired ${result.modifiedCount} user record(s) with empty googleId values`)
    }
  } catch (error) {
    console.warn(`Google auth document repair skipped: ${error.message}`)
  }
}

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
    await repairGoogleAuthDocuments()
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
