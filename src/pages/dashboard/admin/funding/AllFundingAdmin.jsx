import FundingTable from '@/components/funding/FundingTable';
import useDashboardStars from '@/hooks/useDashboardStars';
import React from 'react';
import { FaDonate, FaRegListAlt, FaUser } from 'react-icons/fa';

const AllFundingAdmin = () => {
    const stats = useDashboardStars();
    const statCards = [
        {
            title: "Total Users",
            value: stats.totalUsers,
            icon: <FaUser className="text-3xl text-white" />,
            gradient: "from-[#c30027] to-pink-400",
            sub: "All registered users",
        },
        {
            title: "Total Funds Sent",
            value: stats.totalFundings,
            icon: <FaRegListAlt className="text-3xl text-white" />,
            gradient: "from-pink-400 to-[#c30027]",
            sub: "All Funding Donations",
        },
        {
            title: "Total Funding",
            value: stats.totalFundingAmount ? `৳${stats.totalFundingAmount}` : "৳0",
            icon: <FaDonate className="text-3xl text-white" />,
            gradient: "from-[#c30027] to-[#43e97b]",
            sub: "Total funds raised",
        },
    ];
    return (
        <div>
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {statCards.map((stat) => (
                    <div
                        key={stat.title}
                        className={`rounded-2xl p-6 flex flex-col gap-2 shadow-lg bg-gradient-to-tr ${stat.gradient} relative overflow-hidden`}
                    >
                        <div className="absolute right-4 top-4 opacity-30">{stat.icon}</div>
                        <div className="text-white text-lg font-semibold">{stat.title}</div>
                        <div className="text-3xl font-extrabold text-white">{stat.value}</div>
                        <div className="text-white text-sm opacity-80">{stat.sub}</div>
                    </div>
                ))}
            </div>
            <FundingTable />
        </div>
    );
};

export default AllFundingAdmin;