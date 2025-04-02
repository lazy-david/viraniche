'use client';

import React from 'react';
import Image from 'next/image';

const trendingPosts = [
  {
    id: 1,
    title: "How to Grow Your Social Media Following",
    platform: "YouTube",
    views: "125K",
    engagement: "8.5K",
    thumbnail: "/placeholder-1.jpg",
    trend: "↑ 45%"
  },
  {
    id: 2,
    title: "Content Creation Tips for Beginners",
    platform: "TikTok",
    views: "89K",
    engagement: "12K",
    thumbnail: "/placeholder-2.jpg",
    trend: "↑ 32%"
  },
  {
    id: 3,
    title: "Social Media Marketing Strategies",
    platform: "Instagram",
    views: "56K",
    engagement: "4.2K",
    thumbnail: "/placeholder-3.jpg",
    trend: "↑ 28%"
  }
];

export default function TrendingSection() {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-white">Trending Content</h2>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          {trendingPosts.map((post) => (
            <div key={post.id} className="flex items-start space-x-4">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-400">{post.platform}</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{post.title}</p>
                <div className="mt-2 flex items-center space-x-4">
                  <div>
                    <p className="text-xs text-gray-400">Views</p>
                    <p className="text-sm font-medium text-white">{post.views}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Engagement</p>
                    <p className="text-sm font-medium text-white">{post.engagement}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400">
                      {post.trend}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
