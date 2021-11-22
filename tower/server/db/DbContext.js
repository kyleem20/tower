import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { AttendeeSchema } from '../models/Attendee'
import { CommentSchema } from '../models/Comment'
import { EventSchema } from '../models/Event'
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Events = mongoose.model('Events', EventSchema);
  Attendees = mongoose.model('Attendees', AttendeeSchema);
  Comments = mongoose.model('Comments', CommentSchema);
}

export const dbContext = new DbContext()
