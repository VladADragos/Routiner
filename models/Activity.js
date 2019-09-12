const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitySchema = Schema({
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
module.exports = mongoose.model('activity', ActivitySchema);
