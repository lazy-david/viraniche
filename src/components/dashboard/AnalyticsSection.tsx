'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', views: 4000, engagement: 2400 },
  { name: 'Tue', views: 3000, engagement: 1398 },
  { name: 'Wed', views: 2000, engagement: 9800 },
  { name: 'Thu', views: 2780, engagement: 3908 },
  { name: 'Fri', views: 1890, engagement: 4800 },
  { name: 'Sat', views: 2390, engagement: 3800 },
  { name: 'Sun', views: 3490, engagement: 4300 },
];

export default function AnalyticsSection() {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-6">Analytics Overview</h2>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '0.375rem',
                color: '#F3F4F6'
              }}
            />
            <Line type="monotone" dataKey="views" stroke="#3B82F6" strokeWidth={2} />
            <Line type="monotone" dataKey="engagement" stroke="#10B981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-gray-700/50 rounded-lg p-4">
          <h3 className="text-gray-400 text-sm font-medium mb-2">Total Views</h3>
          <p className="text-2xl font-semibold text-white">19.5K</p>
          <span className="text-green-400 text-sm">↑ 12% vs last week</span>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-4">
          <h3 className="text-gray-400 text-sm font-medium mb-2">Engagement Rate</h3>
          <p className="text-2xl font-semibold text-white">24.8%</p>
          <span className="text-green-400 text-sm">↑ 5% vs last week</span>
        </div>
      </div>
    </div>
  );
}
