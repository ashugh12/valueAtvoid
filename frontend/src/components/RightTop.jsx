'use client';

import React, { useState, useEffect } from 'react';
import { Briefcase, FileText, Handshake, Search, FilePlus2 } from 'lucide-react';

const StatCard = ({ color, title, count, Icon, bgImage }) => (
    <div className={`relative w-[296.33px] h-[104px] rounded-[20px] shadow-lg ${color} px-5 py-4 text-white`}>
        <div className="text-sm font-medium">{title}</div>
        <div className="text-[32px] font-semibold mt-1">{count}</div>
        <div className="absolute top-4 right-4 bg-white/10 p-2 rounded-md">
            <Icon size={20} />
        </div>
        {bgImage && (
            <div className="absolute bottom-2 right-2 opacity-20">
                <img src={bgImage} alt="" className="w-[60px]" />
            </div>
        )}
    </div>
);

const RightTop = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false); // Track dialog state
    const [jobTitle, setJobTitle] = useState("");
    const [employmentType, setEmploymentType] = useState("");
    const [payRate, setPayRate] = useState("");
    const [jobDescription, setJobDescription] = useState("");

    useEffect(() => {
        fetch('https://valueatvoid.onrender.com/stats')
            .then((res) => res.json())
            .then((json) => {
                setData(json[0]);
                console.log("Dataarra", json.length);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    console.log("Dataarray", data);

    const handleSubmit = async () => {
        const jobData = {
            job_title: jobTitle,
            employment_type: employmentType,
            pay_rate: payRate,
            job_description: jobDescription,
            posted_time: "Just now",
            applied_count: 0,
            clicked_count: 0,
            under_process_count: 0
        };

        try {
            const response = await fetch("https://valueatvoid.onrender.com//add-job", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(jobData)
            });

            const result = await response.json();
            console.log(result);
            setIsDialogOpen(false); // Close dialog after submission
        } catch (error) {
            console.error("Error adding job:", error);
        }
    };

    return (
        <div className='mt-[20px] ml-[34px]'>
            {/* Title */}
            <h2 className="text-2xl font-bold text-white mt-6 mb-6">JOBS</h2>

            {/* Stat Cards Row */}
            <div className="flex flex-row justify-between items-center gap-4 w-[1354px] h-[128px]">
                {/* Left: Stat Cards */}
                <div className="flex gap-6">
                    <StatCard title="Total Jobs Posted" count={data.totalJobsPosted} color="bg-[#293369]" Icon={Briefcase} />
                    <StatCard title="Application received" count={data.applicationsReceived} color="bg-[#682938]" Icon={FileText} />
                    <StatCard title="Hired" count={data.hired} color="bg-[#163235]" Icon={Handshake} />
                </div>

                {/* Right: Buttons */}
                <div className="flex flex-col justify-end items-end h-full py-3">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center bg-[#0D1444] text-white rounded-xl px-4 py-3 gap-2 w-[174px] h-[52px]">
                            <FileText size={16} />
                            <span>Drafts</span>
                            <span className="font-semibold">{data.draft}</span>
                        </div>
                        <button 
                            className="bg-[#0050FF] text-white rounded-xl px-6 py-3 font-medium shadow-lg flex items-center gap-2 w-[174px] h-[52px]"
                            onClick={() => setIsDialogOpen(true)} // Open dialog on click
                        >
                            <span className="text-xl">+</span> Post New Job
                        </button>
                    </div>
                </div>
            </div>

            {/* Dialog Box */}
            {isDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-[#1D1F28] p-6 rounded-xl w-[400px]">
                        <h2 className="text-white text-lg font-semibold mb-4">Post a New Job</h2>
                        
                        <input 
                            type="text" 
                            placeholder="Job Title" 
                            className="w-full mb-3 px-3 py-2 rounded-md bg-[#2A2A2C] text-white"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                        />
                        
                        <input 
                            type="text" 
                            placeholder="Employment Type" 
                            className="w-full mb-3 px-3 py-2 rounded-md bg-[#2A2A2C] text-white"
                            value={employmentType}
                            onChange={(e) => setEmploymentType(e.target.value)}
                        />
                        
                        <input 
                            type="text" 
                            placeholder="Pay Rate" 
                            className="w-full mb-3 px-3 py-2 rounded-md bg-[#2A2A2C] text-white"
                            value={payRate}
                            onChange={(e) => setPayRate(e.target.value)}
                        />
                        
                        <textarea 
                            placeholder="Job Description" 
                            className="w-full mb-3 px-3 py-2 rounded-md bg-[#2A2A2C] text-white"
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                        ></textarea>

                        <div className="flex justify-between mt-4">
                            <button 
                                className="bg-gray-500 text-white px-4 py-2 rounded-md" 
                                onClick={() => setIsDialogOpen(false)}
                            >
                                Cancel
                            </button>
                            <button 
                                className="bg-[#0050FF] text-white px-4 py-2 rounded-md"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RightTop;
