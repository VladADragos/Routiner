const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
  name: {
    type: String,
    required: false
  },
  from: {
    type: String,
    required: false
  },
  to: {
    type: String,
    required: false
  }
});

const RoutineSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  season: {
    type: String,
    default: 'spring'
  },
  date: {
    type: Date,
    default: Date.now
  },
  days: {
    monday: [ActivitySchema],
    tuesday: [ActivitySchema],
    wednesday: [ActivitySchema],
    thursday: [ActivitySchema],
    friday: [ActivitySchema],
    saturday: [ActivitySchema],
    sunday: [ActivitySchema]
  }
});

module.exports = {
  routine: mongoose.model('routine', RoutineSchema),
  activity: mongoose.model('activity', ActivitySchema)
};
