'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { User } from 'firebase/auth';
import AnalyticsSection from '@/components/dashboard/AnalyticsSection';
import TrendingSection from '@/components/dashboard/TrendingSection';
import RecommendationsSection from '@/components/dashboard/RecommendationsSection';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-6 p-6">
      {/* Welcome Section */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <h1 className="text-2xl font-semibold text-white mb-2">
          Welcome back, {user?.displayName || 'User'}! 👋
        </h1>
        <p className="text-gray-300">
          Here's what's happening with your content today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 text-sm font-medium">Total Posts</h3>
            <span className="bg-blue-500/10 text-blue-400 text-xs px-2 py-1 rounded">+12.5%</span>
          </div>
          <p className="text-2xl font-semibold text-white">24</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 text-sm font-medium">Total Views</h3>
            <span className="bg-green-500/10 text-green-400 text-xs px-2 py-1 rounded">+25.8%</span>
          </div>
          <p className="text-2xl font-semibold text-white">12.4K</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 text-sm font-medium">Engagement Rate</h3>
            <span className="bg-yellow-500/10 text-yellow-400 text-xs px-2 py-1 rounded">+4.2%</span>
          </div>
          <p className="text-2xl font-semibold text-white">8.6%</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 text-sm font-medium">Total Followers</h3>
            <span className="bg-purple-500/10 text-purple-400 text-xs px-2 py-1 rounded">+18.3%</span>
          </div>
          <p className="text-2xl font-semibold text-white">2.8K</p>
        </div>
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <AnalyticsSection />
          <RecommendationsSection />
        </div>
        <div className="space-y-6">
          <TrendingSection />
          {/* Quick Actions */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Create New Post
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                View Analytics
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}