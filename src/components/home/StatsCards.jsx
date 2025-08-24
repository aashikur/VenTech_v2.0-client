import { useEffect, useState } from "react";
import { FaHeartbeat, FaTint, FaHospital } from "react-icons/fa";
const stats = [
    {
        label: "Lives Saved",
        value: 1200,
        icon: <FaHeartbeat className="text-4xl text-[#c30027]" />,
    },
    {
        label: "Active Donors",
        value: 500,
        icon: <FaTint className="text-4xl text-[#c30027]" />,
    },
    {
        label: "Hospitals Supported",
        value: 30,
        icon: <FaHospital className="text-4xl text-[#c30027]" />,
    },
];

const useCountUp = (target, duration = 1500) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let start = 0;
        const end = parseInt(target);
        if (start === end) return;
        let totalMilSecDur = parseInt(duration);
        let incrementTime = Math.abs(Math.floor(totalMilSecDur / end));
        let timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) clearInterval(timer);
        }, incrementTime);
        return () => clearInterval(timer);
    }, [target, duration]);
    return count;
};

const StatsCards = () => {
    return (
        <section className="w-full bg-gradient- bg-red-700 dark:bg-transparent px-4 flex justify-center py-20">
            <div className="max-w-5xl w-full grid grid-cols-1 sm:grid-cols-3 gap-8">
                {stats.map((stat, idx) => {
                    const count = useCountUp(stat.value, 1200 + idx * 300);
                    return (
                        <div
                            key={stat.label}
                            className="flex flex-col items-center bg-[#FDEDF3] dark:bg-[#393053] rounded-2xl shadow p-8"
                        >
                            {stat.icon}
                            <div className="text-4xl font-extrabold text-[#c30027] mt-2">
                                {count.toLocaleString()}+
                            </div>
                            <div className="text-lg font-semibold text-gray-700 dark:text-gray-200 mt-1">
                                {stat.label}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default StatsCards;