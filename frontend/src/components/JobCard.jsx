import { BadgePercent, Briefcase, CalendarDays, MoreVertical } from 'lucide-react';

const JobCard = ({ job }) => {
  return (
    <div className="bg-[#1C1C1E] rounded-xl p-[2px] text-white w-[439px] h-[224px] shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mt-2 mb-2 pl-[12px] pr-[12px]">
        <div>
          <h3 className="text-lg font-semibold">{job.job_title}</h3>
          <p className="text-sm text-gray-400">Posted : {job.posted_time}</p>
        </div>
        <MoreVertical size={20} className="text-gray-400 mt-1" />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 text-sm mb-3 pl-[12px]">
        <span className="bg-[#2A2A2C] text-white px-3 py-1 rounded-md flex items-center gap-1">
          <Briefcase size={14} /> {job.employment_type}
        </span>
        <span className="bg-[#2A2A2C] text-white px-3 py-1 rounded-md flex items-center gap-1">
          {job.pay_rate}
        </span>
        <span className="bg-[#2A2A2C] text-white px-3 py-1 rounded-md flex items-center gap-1">
          {job.experience_required}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-300 leading-snug mb-4 pl-[12px]">
        {job.job_description.length > 100
          ? job.job_description.slice(0, 100) + "..."
          : job.job_description}
      </p>

      {/* Footer Stats */}
      <div className="grid grid-cols-3 text-center border-t border-white/10 pt-4 text-sm text-white ">
        <div>
          <div className="font-semibold">{job.applied_count}</div>
          <div className="text-gray-400">Applied</div>
        </div>
        <div>
          <div className="font-semibold">{job.clicked_count}</div>
          <div className="text-gray-400">Clicked</div>
        </div>
        <div>
          <div className="font-semibold">{job.under_process_count}</div>
          <div className="text-gray-400">Under process</div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
