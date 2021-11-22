import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CommentSchema = new Schema(
  {
    body: { type: String, required: true },
    eventId: { type: String, required: true, ref: 'Event' },
    accountId: { type: Schema.Types.ObjectId, ref: 'Account' },
    isAttending: { type: Boolean, default: false, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

CommentSchema.index({ eventId: 1, accountId: 1 }, { unique: true })

CommentSchema.virtual('event', {
  localField: 'eventId',
  foreignField: '_id',
  justOne: true,
  ref: 'Event'
})

CommentSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})
