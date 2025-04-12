'use client';

import { useState, useEffect } from 'react';
import { fetchTrendingYouTubeVideos, fetchTrendingShorts } from '@/utils/youtube';
import { auth } from '@/lib/firebase';
import { getUserRegion } from '@/utils/userProfile';
import Image from 'next/image'; // Move the import to the top of the file

export default function YoutubePage() {
  const [viralVideos, setViralVideos] = useState([]);
  const [viralShorts, setViralShorts] = useState([]);
  const [nicheVideos, setNicheVideos] = useState([]);
  const [selectedNiche, setSelectedNiche] = useState('All');
  const [loading, setLoading] = useState(true);
  const [nicheLoading, setNicheLoading] = useState(false);
  const [error, setError] = useState('');
  const [userRegion, setUserRegion] = useState('US'); // Default to US

  // Get user region on component mount
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const region = await getUserRegion(user.uid);
          setUserRegion(region);
        }
      } catch (error) {
        console.error('Error getting user region:', error);
      }
    };
    
    getCurrentUser();
  }, []);

  // Initial data fetch for all sections with region
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        
        // Fetch videos first
        const videos = await fetchTrendingYouTubeVideos('All', userRegion);
        setViralVideos(videos.slice(0, 8));
        
        // Try to fetch shorts, but fall back to regular videos if it fails
        try {
          const shorts = await fetchTrendingShorts(userRegion);
          if (shorts && shorts.length > 0) {
            setViralShorts(shorts.slice(0, 8));
          } else {
            // Use regular videos as fallback for shorts
            console.log('No shorts returned, using regular videos as fallback');
            setViralShorts(videos.slice(8, 16));
          }
        } catch (shortsError) {
          console.error('Error fetching shorts, using regular videos instead:', shortsError);
          // Use regular videos as fallback for shorts
          setViralShorts(videos.slice(8, 16));
        }
        
        // Fetch niche videos
        const niche = await fetchTrendingYouTubeVideos('All', userRegion);
        setNicheVideos(niche.slice(0, 8));
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch YouTube data');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [userRegion]);

  // Separate effect for niche changes only
  useEffect(() => {
    // Skip the initial render
    if (loading) return;
    
    const fetchNicheData = async () => {
      try {
        setNicheLoading(true);
        const nicheData = await fetchTrendingYouTubeVideos(selectedNiche, userRegion);
        setNicheVideos(nicheData.slice(0, 8));
      } catch (err) {
        console.error('Failed to fetch niche data:', err);
      } finally {
        setNicheLoading(false);
      }
    };

    fetchNicheData();
  }, [selectedNiche, loading, userRegion]);

  if (loading) return <div className="text-center py-8 text-gray-400">Loading analytics...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-[rgba(6,12,26,255)] p-6">
      <h1 className="text-3xl font-bold text-white mb-8">YouTube Analytics</h1>
      
      {/* Top Videos Carousel */}
      <section className="bg-gray-900/50 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">Top Videos (Last 7 Days)</h2>
        <div className="flex overflow-x-auto pb-4 space-x-4 custom-scrollbar">
          {viralVideos.map((video) => (
            <div key={video.id} className="w-72 flex-shrink-0 group relative">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-40 object-cover rounded-xl transform group-hover:scale-105 transition-all"
              />
              <div className="mt-3">
                <p className="text-sm font-medium text-white truncate">{video.title}</p>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-blue-400">{video.views} views</span>
                  <span className="text-xs text-green-400">{video.engagement} engagement</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Shorts Carousel */}
      <section className="bg-gray-900/50 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">Top Shorts (Last 7 Days)</h2>
        <div className="flex overflow-x-auto pb-4 space-x-4 custom-scrollbar">
          {viralShorts.map((short) => (
            <div key={short.id} className="w-48 flex-shrink-0 group relative">
              <img 
                src={short.thumbnail} 
                alt={short.title} 
                className="w-full h-64 object-cover rounded-xl transform group-hover:scale-105 transition-all"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-4 rounded-b-xl">
                <p className="text-sm font-medium text-white truncate">{short.title}</p>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-blue-400">{short.views}</span>
                  <span className="text-xs text-pink-400">{short.engagement}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Niche-based Videos Section */}
      <section className="bg-gray-900/50 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Trending by Niche</h2>
          <select 
            value={selectedNiche}
            onChange={(e) => setSelectedNiche(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg"
          >
            {['All', 'Technology', 'Entertainment', 'Education', 'Sports', 'Music'].map((niche) => (
              <option key={niche} value={niche}>{niche}</option>
            ))}
          </select>
        </div>
        
        {nicheLoading ? (
          <div className="text-center py-8 text-gray-400">Loading niche videos...</div>
        ) : (
          <div className="flex overflow-x-auto pb-4 space-x-4 custom-scrollbar">
            {nicheVideos.map((video) => (
              <div key={video.id} className="w-72 flex-shrink-0 group relative">
                <Image 
                  src={video.thumbnail} 
                  alt={video.title} 
                  width={300}
                  height={168}
                  className="w-full h-40 object-cover rounded-xl transform group-hover:scale-105 transition-all"
                />
                <div className="mt-3">
                  <p className="text-sm font-medium text-white truncate">{video.title}</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-blue-400">{video.views} views</span>
                    <span className="text-xs text-green-400">{video.engagement} engagement</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #000;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}