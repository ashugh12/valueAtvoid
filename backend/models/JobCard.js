const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    job_title: { type: String, required: true },
    posted_time: { type: String },
    employment_type: { type: String },
    pay_rate: { type: String },
    experience_required: { type: String },
    job_description: { type: String },
    applied_count: { type: Number, default: 0 },
    clicked_count: { type: Number, default: 0 },
    under_process_count: { type: Number, default: 0 }
});

// Create the model
const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
