import logo from '../assets/ValueAtVoid.png';
import { ChevronDown, Bell, LayoutGrid, Briefcase, Users, FileText, CheckCircle } from 'lucide-react';
import { useState } from 'react';
const Sidebar = () => {
    const [activeTab, setActiveTab] = useState("Dashboard");
    return (
        <div className="w-[280px] h-screen bg-[#111213] flex flex-col justify-between text-white">

            {/* Logo */}
            <div>
                <div className=" py-7 px-5">
                    <img src={logo} alt="ValueAtVoid Logo" className="h-[48px] w-[141px]" />
                </div>

                {/* Navigation */}
                <nav className="flex flex-col  items-start">
                    <NavItem icon={<LayoutGrid size={24} />} label="Dashboard" active={activeTab === "Dashboard"} onClick={setActiveTab} />
                    <NavItem icon={<Bell size={24} />} label="Notification" active={activeTab === "Notification"} onClick={setActiveTab} />
                    <NavItem icon={<Briefcase size={24} />} label="Jobs" active={activeTab === "Jobs"} onClick={setActiveTab} />
                    {/* Collapsible Section */}
                    <div className="mt-4 w-full">
                        <div className="flex items-center justify-start space-x-3 px-5 cursor-pointer text-white/80">
                            <Users size={24} />
                            <span className="text-[16px] font-medium">Candidates</span>
                            <ChevronDown size={16} className="ml-auto text-white/60" />
                        </div>

                        <div className="mt-4 ml-8 border-l border-white/20 pl-4 flex flex-col space-y-4 items-start">
                            <SubItem icon={<FileText size={20} />} label="Registered" count={1101} />
                            <SubItem icon={<CheckCircle size={20} />} label="Short listed" count={86} />
                        </div>
                    </div>
                </nav>
            </div>

            {/* User Profile */}
            <div className="bg-[#1D1E1F] rounded-[20px] p-3 flex ml-[20px] mb-[20px] items-center space-x-3 w-[223px] h-[52px]">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" className="w-12 h-12 rounded-[20px] p-1 object-cover" />
                <div className="flex-1">
                    <p className="text-sm font-medium">User name</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                        <span className="text-yellow-400">🛡</span> Hiring manager
                    </p>
                </div>
                <ChevronDown size={18} className="text-white/60" />
            </div>
        </div>
    );
};

const NavItem = ({ icon, label, active, onClick }) => (
    <div
        className={`flex items-center space-x-3 px-5 rounded-md cursor-pointer 
        ${active ? 'text-white hover:bg-[#1D1F28] w-[280px] h-[52px] border-l-4 border-l-[#0A84FF]' : 'text-white hover:bg-[#1D1F28] w-[280px] h-[52px] '}`}
        onClick={() => onClick(label)}
    >
        {icon}
        <span className="text-[16px] font-medium">{label}</span>
    </div>
);

const SubItem = ({ icon, label, count }) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 text-white/80">
            {icon}
            <span className="text-sm">{label}</span>
        </div>
        <span className="bg-[#2C2D2F] rounded-full px-2 py-[2px] text-xs font-medium text-white/80">{count}</span>
    </div>
);

export default Sidebar;
