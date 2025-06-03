const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ApplicationStatistics = require('./models/ApplicationStatistics');
const Job = require('./models/JobCard');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());


app.get("/", async (req, res) => {
    try {
        const jobs = await Job.find(); // ✅ Fetch all jobs from MongoDB
        return res.status(200).json({ message: "Jobs retrieved successfully!", count: jobs.length, jobs });
    } catch (err) {
        console.error("Error fetching jobs:", err);
        return res.status(500).json({ error: "Server error" });
    }
});



// **POST Endpoint - Add New Job**
app.post("/add-job", async (req, res) => {
    try {
        const jobData = req.body; // Get job data from frontend
        const newJob = new Job(jobData);
        await newJob.save();
        res.status(201).json({ message: "Job added successfully!", job: newJob });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

app.get('/post', async (req, res) => {
    try {
        // Example assumed values (you can replace these with req.body if you want)
        const data = {
            totalJobsPosted: 25,
            applicationsReceived: 150,
            hired: 10,
            draft: 3,
        };

        // If you want only one stats document, you could update or create it
        // Here we try to find one and update, or create a new if none exists
        let stats = await ApplicationStatistics.findOne();
        if (stats) {
            // Update existing
            stats.totalJobsPosted = data.totalJobsPosted;
            stats.applicationsReceived = data.applicationsReceived;
            stats.hired = data.hired;
            stats.draft = data.draft;
            await stats.save();
        } else {
            // Create new
            stats = new ApplicationStatistics(data);
            await stats.save();
        }

        return res.status(200).json({ message: 'Application statistics saved', stats });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});

app.get('/stats', async (req, res) => {
    try {
        // Fetch all stats documents (usually there might be just one)
        const stats = await ApplicationStatistics.find();

        return res.status(200).json(stats); // Send as JSON response
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to fetch statistics' });
    }
});


// MongoDB connection
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));

