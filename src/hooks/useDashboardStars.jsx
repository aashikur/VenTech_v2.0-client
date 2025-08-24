import React, { useEffect, useState } from 'react';
import useAxiosSecure from './useAxiosSecure';

const useDashboardStars = () => {
    const [stats, setStats] = useState({
    totalUsers: 0,
    totalRequest: 0,
    totalBlogs: 0,
    totalBlogsDraft: 0,
    totalBlogsPublished: 0,
    totalContacts: 0,
    totalFundings: 0,
    totalFundingAmount: 0,
        
    })
    const axiosSecure = useAxiosSecure();
      useEffect(() => {
    axiosSecure("/admin-dashboard-stats").then(({ data }) => setStats(data));
    // Example: fetch latest requests
    // axiosSecure("/latest-requests?limit=5").then(({ data }) => setLatestRequests(data));
  }, []);
    return stats;
};

export default useDashboardStars;