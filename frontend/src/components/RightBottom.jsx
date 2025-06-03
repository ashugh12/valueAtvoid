import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import { Search, FileText } from "lucide-react";
import FilterButton from "./FilterButton";

const RightBottom = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); // Search input state
    const [selectedFilter, setSelectedFilter] = useState("All"); // Active filter state

    useEffect(() => {
        fetch("https://valueatvoid.onrender.com/")
            .then((res) => res.json())
            .then((json) => {
                setData(json);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const jobArray = data?.jobs || [];

    console.log("JobArray", jobArray.length);


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // **Filtering Jobs Based on Search Query and Selected Filter**
    const filteredJobs = jobArray.filter((job) => {
        const matchesSearch = job.job_title.toLowerCase().includes(searchQuery.toLowerCase());

        if (selectedFilter === "All") return matchesSearch;
        if (selectedFilter === "Job Profile") return matchesSearch && job.job_title.includes("Developer");
        if (selectedFilter === "Exp 2 - 6") return matchesSearch && parseInt(job.experience_required) >= 2 && parseInt(job.experience_required) <= 6;
        if (selectedFilter === "Employment type") return matchesSearch && job.employment_type.includes("Full-time");

        return matchesSearch;
    });

    return (
        <div className="flex flex-col gap-4">
            {/* Search and Filters */}
            <div className="flex justify-between items-center w-auto h-[76px] px-[30px]">
                {/* Left: Search + Filters */}
                <div className="flex flex-row gap-4">
                    <div className="flex flex-wrap gap-4 items-center">
                        {/* Search Input */}
                        <div className="flex items-center px-4 py-3 bg-[#111] text-white rounded-xl w-[200px]">
                            <Search size={16} className="mr-2" />
                            <input
                                type="text"
                                placeholder="Enter a job title"
                                className="bg-transparent text-sm outline-none w-full placeholder-white"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row gap-4">
                        <FilterButton label="All" className="w-[128px] h-[44px]" onClick={setSelectedFilter} active={selectedFilter === "All"} />
                        <FilterButton label="Job Profile" className="w-[128px] h-[44px]" onClick={setSelectedFilter} active={selectedFilter === "Job Profile"} />
                        <FilterButton label="Exp 2 - 6" className="h-[44px]" onClick={setSelectedFilter} active={selectedFilter === "Exp 2 - 6"} />
                        <FilterButton label="Employment type" className="h-[44px]" onClick={setSelectedFilter} active={selectedFilter === "Employment type"} />
                    </div>
                </div>

                {/* Right: Closed Tag */}
                <div className="flex items-center gap-2 bg-[#1E1E2F] text-white px-4 py-3 rounded-xl">
                    <FileText size={16} />
                    <span>Closed</span>
                    <span className="font-semibold">12</span>
                </div>
            </div>

            {/* Job Listings */}
            <div className="overflow-auto h-[496px]">
                <div className="flex flex-row flex-wrap gap-[24px] justify-center">
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map((job, idx) => <JobCard key={idx} job={job} />)
                    ) : (
                        <p className="text-white text-center mt-4">No jobs found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RightBottom;
