const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  mentor: { type: String, required: true },
  time: { type: String, required: true },
  date: { type: Number, required: true },
  fullDate: { type: String, required: true },
  status: { type: String, enum: ['upcoming', 'requests', 'history'], default: 'upcoming' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);