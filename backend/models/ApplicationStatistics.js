const mongoose = require('mongoose');

const applicationStatisticsSchema = new mongoose.Schema({
  totalJobsPosted: {
    type: Number,
    required: true,
    default: 0,
  },
  applicationsReceived: {
    type: Number,
    required: true,
    default: 0,
  },
  hired: {
    type: Number,
    required: true,
    default: 0,
  },
  draft: {
    type: Number,
    required: true,
    default: 0,
  },
  // Optionally, you can add a timestamp or relate it to a user or company
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('ApplicationStatistics', applicationStatisticsSchema);
