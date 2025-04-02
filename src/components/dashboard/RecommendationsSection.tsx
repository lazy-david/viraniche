'use client';

import React from 'react';

const recommendations = [
  {
    id: 1,
    title: "Create a video about emerging tech trends",
    reason: "High engagement in tech niche",
    priority: "High",
    potentialReach: "50K-100K",
    bestTime: "3 PM EST"
  },
  {
    id: 2,
    title: "Share your morning productivity routine",
    reason: "Trending topic in lifestyle category",
    priority: "Medium",
    potentialReach: "25K-50K",
    bestTime: "8 AM EST"
  },
  {
    id: 3,
    title: "Review latest social media features",
    reason: "High search volume",
    priority: "High",
    potentialReach: "30K-75K",
    bestTime: "5 PM EST"
  }
];

export default function RecommendationsSection() {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-white">Content Recommendations</h2>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          {recommendations.map((item) => (
            <div key={item.id} className="bg-gray-700/50 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <h3 className="text-white font-medium">{item.title}</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  item.priority === 'High' ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'
                }`}>
                  {item.priority} Priority
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-400">{item.reason}</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400">Potential Reach</p>
                  <p className="text-sm font-medium text-white">{item.potentialReach}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Best Time to Post</p>
                  <p className="text-sm font-medium text-white">{item.bestTime}</p>
                </div>
              </div>
              <div className="mt-4">
                <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Create Content
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
