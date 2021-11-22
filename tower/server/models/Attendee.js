import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AttendeeSchema = new Schema(
  {
    eventId: { type: mongoose.Types.ObjectId, required: true, ref: 'Event' },
    accountId: { type: mongoose.Types.ObjectId, ref: 'Account' }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
AttendeeSchema.index({ eventId: 1, accountId: 1 }, { unique: true })

AttendeeSchema.virtual('event', {
  localField: 'eventId',
  foreignField: '_id',
  justOne: true,
  ref: 'Event'
})

AttendeeSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
// Ticket Schema is valid | AssertionError: expected data to satisfy schema but found following errors: data should have required property 'eventId', data should have required property 'accountId', data should have required property 'account', data should have required property 'id'
