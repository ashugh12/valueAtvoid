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

    const jobs = [
        { job_title: "Senior UI/UX Designer", posted_time: "2 hours ago", employment_type: "Full-time", pay_rate: "₹ 75 - 120 INR/hr", experience_required: "3 - 5 Years", job_description: "Create intuitive UI/UX designs.", applied_count: 15, clicked_count: 40, under_process_count: 5 },
        { job_title: "Frontend Developer", posted_time: "3 hours ago", employment_type: "Contract", pay_rate: "₹ 60 - 110 INR/hr", experience_required: "2 - 4 Years", job_description: "Develop frontend web applications.", applied_count: 12, clicked_count: 30, under_process_count: 7 },
        { job_title: "Backend Developer", posted_time: "5 hours ago", employment_type: "Full-time", pay_rate: "₹ 70 - 130 INR/hr", experience_required: "4 - 6 Years", job_description: "Build scalable backend services.", applied_count: 18, clicked_count: 50, under_process_count: 8 },
        { job_title: "Data Analyst", posted_time: "6 hours ago", employment_type: "Part-time", pay_rate: "₹ 55 - 100 INR/hr", experience_required: "2 - 5 Years", job_description: "Analyze data trends and reports.", applied_count: 10, clicked_count: 25, under_process_count: 3 },
        { job_title: "DevOps Engineer", posted_time: "4 hours ago", employment_type: "Full-time", pay_rate: "₹ 80 - 140 INR/hr", experience_required: "3 - 6 Years", job_description: "Manage deployment pipelines.", applied_count: 14, clicked_count: 42, under_process_count: 6 },
        { job_title: "AI Engineer", posted_time: "7 hours ago", employment_type: "Contract", pay_rate: "₹ 85 - 150 INR/hr", experience_required: "4 - 7 Years", job_description: "Develop AI-powered solutions.", applied_count: 11, clicked_count: 37, under_process_count: 5 },
        { job_title: "Full Stack Developer", posted_time: "8 hours ago", employment_type: "Full-time", pay_rate: "₹ 60 - 120 INR/hr", experience_required: "3 - 5 Years", job_description: "Work on front-end & back-end development.", applied_count: 17, clicked_count: 45, under_process_count: 9 },
        { job_title: "Cybersecurity Analyst", posted_time: "9 hours ago", employment_type: "Full-time", pay_rate: "₹ 75 - 130 INR/hr", experience_required: "3 - 6 Years", job_description: "Ensure cybersecurity measures are met.", applied_count: 13, clicked_count: 35, under_process_count: 4 },
        { job_title: "Business Analyst", posted_time: "10 hours ago", employment_type: "Contract", pay_rate: "₹ 65 - 120 INR/hr", experience_required: "4 - 7 Years", job_description: "Analyze business data and trends.", applied_count: 16, clicked_count: 50, under_process_count: 7 },
        { job_title: "Graphic Designer", posted_time: "12 hours ago", employment_type: "Part-time", pay_rate: "₹ 45 - 90 INR/hr", experience_required: "2 - 4 Years", job_description: "Design creative graphics and UI elements.", applied_count: 9, clicked_count: 28, under_process_count: 3 },
        { job_title: "SEO Specialist", posted_time: "14 hours ago", employment_type: "Full-time", pay_rate: "₹ 50 - 95 INR/hr", experience_required: "3 - 5 Years", job_description: "Optimize website SEO performance.", applied_count: 12, clicked_count: 38, under_process_count: 5 },
        { job_title: "HR Manager", posted_time: "16 hours ago", employment_type: "Full-time", pay_rate: "₹ 70 - 110 INR/hr", experience_required: "5 - 8 Years", job_description: "Manage hiring and employee relations.", applied_count: 15, clicked_count: 43, under_process_count: 6 },
        { job_title: "Cloud Architect", posted_time: "18 hours ago", employment_type: "Remote", pay_rate: "₹ 100 - 160 INR/hr", experience_required: "6 - 10 Years", job_description: "Design scalable cloud solutions.", applied_count: 19, clicked_count: 55, under_process_count: 9 },
        { job_title: "Software Architect", posted_time: "20 hours ago", employment_type: "Full-time", pay_rate: "₹ 95 - 150 INR/hr", experience_required: "8 - 12 Years", job_description: "Define software architecture standards.", applied_count: 14, clicked_count: 40, under_process_count: 7 },
        { job_title: "Database Administrator", posted_time: "22 hours ago", employment_type: "Contract", pay_rate: "₹ 60 - 110 INR/hr", experience_required: "4 - 7 Years", job_description: "Manage database administration tasks.", applied_count: 11, clicked_count: 32, under_process_count: 4 },
        { job_title: "Machine Learning Engineer", posted_time: "23 hours ago", employment_type: "Full-time", pay_rate: "₹ 80 - 135 INR/hr", experience_required: "5 - 8 Years", job_description: "Develop machine learning algorithms.", applied_count: 17, clicked_count: 48, under_process_count: 7 },
        { job_title: "Mobile App Developer", posted_time: "1 day ago", employment_type: "Contract", pay_rate: "₹ 55 - 100 INR/hr", experience_required: "3 - 5 Years", job_description: "Develop mobile applications.", applied_count: 10, clicked_count: 30, under_process_count: 3 },
        { job_title: "Embedded Systems Engineer", posted_time: "2 days ago", employment_type: "Full-time", pay_rate: "₹ 75 - 125 INR/hr", experience_required: "5 - 7 Years", job_description: "Work on embedded hardware/software development.", applied_count: 12, clicked_count: 36, under_process_count: 5 },
        { job_title: "Game Developer", posted_time: "2 days ago", employment_type: "Full-time", pay_rate: "₹ 85 - 135 INR/hr", experience_required: "4 - 7 Years", job_description: "Create engaging game mechanics.", applied_count: 14, clicked_count: 40, under_process_count: 6 },
        { job_title: "Tech Support Specialist", posted_time: "2 days ago", employment_type: "Full-time", pay_rate: "₹ 50 - 100 INR/hr", experience_required: "2 - 4 Years", job_description: "Provide technical support.", applied_count: 11, clicked_count: 28, under_process_count: 3 },
        { job_title: "Product Manager", posted_time: "2 days ago", employment_type: "Full-time", pay_rate: "₹ 90 - 150 INR/hr", experience_required: "5 - 8 Years", job_description: "Oversee product development.", applied_count: 16, clicked_count: 45, under_process_count: 7 }
    ];

    try {
        await Job.insertMany(jobs);
        return res.status(200).json({ message: "Jobs inserted successfully!", jobs });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
})


// **POST Endpoint - Add New Job**
app.post("/add-job", async (req, res) => {
    try {
        const jobData = req.body; // Get job data from frontend
        console.log(req.body);
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

