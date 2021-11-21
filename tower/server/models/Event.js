import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const EventSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    coverImg: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: String, required: true },
    startDate: { type: Date, required: true },
    isCancelled: { type: Boolean, default: false },
    type: { type: String, enum: ['concert', 'sport', 'digital', 'convention'], required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

EventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})
