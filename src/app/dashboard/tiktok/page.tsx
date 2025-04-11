'use client';

import { useState, useEffect } from 'react';

export default function TikTokPage() {
  return (
    <div className="min-h-screen bg-[rgba(6,12,26,255)] p-6">
      <h1 className="text-3xl font-bold text-white mb-8">TikTok Analytics</h1>
      
      {/* Performance Metrics */}
      <section className="bg-gray-900/50 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">Performance Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Total Views</p>
            <p className="text-white text-2xl font-bold">1.2M</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Followers</p>
            <p className="text-white text-2xl font-bold">50K</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Engagement Rate</p>
            <p className="text-white text-2xl font-bold">5.2%</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Total Likes</p>
            <p className="text-white text-2xl font-bold">250K</p>
          </div>
        </div>
      </section>

      {/* Content Performance */}
      <section className="bg-gray-900/50 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">Top Performing Content</h2>
        <div className="space-y-4">
          {/* Video performance cards would go here */}
          <div className="bg-gray-800 p-4 rounded-lg flex items-center space-x-4">
            <div className="w-32 h-32 bg-gray-700 rounded-lg"></div>
            <div>
              <h3 className="text-white font-medium">Video Title</h3>
              <p className="text-gray-400 text-sm">Views: 500K</p>
              <p className="text-gray-400 text-sm">Likes: 50K</p>
              <p className="text-gray-400 text-sm">Comments: 1.2K</p>
            </div>
          </div>
        </div>
      </section>

      {/* Audience Insights */}
      <section className="bg-gray-900/50 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">Audience Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-white font-medium mb-3">Demographics</h3>
            {/* Demographics chart would go here */}
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-white font-medium mb-3">Geographic Distribution</h3>
            {/* Geography chart would go here */}
          </div>
        </div>
      </section>

      {/* Hashtag Analytics */}
      <section className="bg-gray-900/50 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Hashtag Performance</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Top performing hashtags */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-blue-400 text-sm">#trending</p>
            <p className="text-white font-medium">1.5M views</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-blue-400 text-sm">#fyp</p>
            <p className="text-white font-medium">2.1M views</p>
          </div>
          {/* Add more hashtag cards as needed */}
        </div>
      </section>
    </div>
  );
}