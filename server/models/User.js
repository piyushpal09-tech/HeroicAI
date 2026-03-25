const mongoose = require('mongoose')

const toolHistorySchema = new mongoose.Schema(
  {
    tool: {
      type: String,
      required: true,
    },
    input: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    output: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
)

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      enum: ['free', 'pro', 'agency'],
      default: 'free',
    },
    dailyUsage: {
      count: {
        type: Number,
        default: 0,
      },
      resetAt: {
        type: Date,
        default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    },
    toolHistory: {
      type: [toolHistorySchema],
      default: [],
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
)

module.exports = mongoose.models.User || mongoose.model('User', userSchema)
