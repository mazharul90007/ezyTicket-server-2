import { Schema, model } from 'mongoose';
import { TEvent } from './events.interface';
import validator from 'validator';

const eventSchema = new Schema<TEvent>({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters'],
  },
  eventType: {
    type: String,
    required: [true, 'Event type is required'],
    enum: {
      values: ['venue', 'online', 'hybrid'],
      message: '{VALUE} is not a valid event type',
    },
  },
  eventCategory: {
    type: String,
    required: [true, 'Event category is required'],
  },
  eventDate: {
    type: String,
    required: [true, 'Event date is required'],
    match: [/^\d{4}-\d{2}-\d{2}$/, 'Please use YYYY-MM-DD format'],
  },
  eventTime: {
    type: String,
    required: [true, 'Event time is required'],
    match: [
      /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
      'Please use HH:MM 24-hour format',
    ],
  },
  duration: {
    type: String,
    required: [true, 'Duration is required'],
    match: [/^\d+h \d+mins$|^\d+h$/, 'Use format like "2h" or "2h 30mins"'],
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  details: {
    type: String,
    required: [true, 'Event details are required'],
    minlength: [50, 'Details should be at least 50 characters'],
    maxlength: [2000, 'Details cannot exceed 2000 characters'],
  },
  organizer: {
    type: String,
    required: [true, 'Organizer name is required'],
    trim: true,
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
  },
  totalTickets: {
    type: Number,
    required: [true, 'Total tickets count is required'],
    min: [1, 'There must be at least 1 ticket'],
  },
  soldTickets: {
    type: Number,
    default: 0,
    min: [0, 'Sold tickets cannot be negative'],
  },
  maxTickets: {
    type: Number,
    required: [true, 'Maximum tickets per order is required'],
    min: [1, 'At least 1 ticket must be allowed per order'],
  },
  price: {
    type: Number,
    required: [true, 'Ticket price is required'],
    min: [0, 'Price cannot be negative'],
  },
  managerName: {
    type: String,
    default: null,
  },
  managerEmail: {
    type: String,
    required: [true, 'Manager email is required'],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not not valid email',
    },
  },
  managerImage: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'verified', 'rejected'],
      message: '{VALUE} is not a valid status',
    },
    default: 'pending',
  },
  category: {
    type: String,
    default: 'event',
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  advertise: {
    type: Boolean,
    default: false,
  },
});

// eventSchema.index({ eventDate: 1, eventType: 1, status: 1 });

export const Event = model<TEvent>('events', eventSchema);
