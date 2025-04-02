'use client';
import { FaYoutube, FaTiktok, FaTwitter } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { fetchTrendingYouTubeVideos, YouTubeVideo } from '@/utils/youtube';

const platforms = [
  {
    name: 'YouTube',
    icon: <FaYoutube className="text-2xl text-red-600" />,
    posts: [
      { id: 1, username: '@TechEduPro', title: 'Ultimate Guide to Content Creation', views: '250K', engagement: '15K', niche: 'Education', thumbnail: '/thumbnails/youtube-guide.jpg' },
      { id: 2, username: '@LifestyleVlog', title: 'Behind the Scenes: Creator Life', views: '180K', engagement: '12K', niche: 'Lifestyle', thumbnail: '/thumbnails/creator-life.jpg' },
      { id: 3, username: '@GamingPro', title: 'Top 10 Gaming Moments of 2023', views: '320K', engagement: '25K', niche: 'Entertainment', thumbnail: '/thumbnails/gaming.jpg' },
      { id: 4, username: '@CookingMaster', title: 'Easy 5-Minute Recipes', views: '420K', engagement: '38K', niche: 'Lifestyle', thumbnail: '/thumbnails/cooking.jpg' },
      { id: 5, username: '@TechReview', title: 'Latest Smartphone Comparison', views: '280K', engagement: '22K', niche: 'Technology', thumbnail: '/thumbnails/tech.jpg' },
      { id: 6, username: '@FitnessGuru', title: 'Full Body Workout at Home', views: '190K', engagement: '16K', niche: 'Health', thumbnail: '/thumbnails/fitness.jpg' },
      { id: 7, username: '@DIYcraft', title: 'Creative DIY Home Decor', views: '150K', engagement: '12K', niche: 'Lifestyle', thumbnail: '/thumbnails/diy.jpg' },
      { id: 8, username: '@MusicPro', title: 'Learn Guitar in 30 Days', views: '210K', engagement: '19K', niche: 'Education', thumbnail: '/thumbnails/music.jpg' },
      { id: 9, username: '@TravelVlog', title: 'Hidden Gems in Europe', views: '230K', engagement: '20K', niche: 'Travel', thumbnail: '/thumbnails/travel.jpg' },
      { id: 10, username: '@BusinessTips', title: 'Start Your Online Business', views: '270K', engagement: '24K', niche: 'Business', thumbnail: '/thumbnails/business.jpg' }
    ]
  },
  {
    name: 'TikTok',
    icon: <FaTiktok className="text-2xl" />,
    posts: [
      { id: 1, username: '@DanceKing', title: 'Viral Dance Challenge Tutorial', views: '500K', engagement: '45K', niche: 'Entertainment', thumbnail: '/thumbnails/dance-challenge.jpg' },
      { id: 2, username: '@TechTips', title: 'Quick Tech Tips & Tricks', views: '300K', engagement: '28K', niche: 'Technology', thumbnail: '/thumbnails/tech-tips.jpg' },
      { id: 3, username: '@BeautyGuru', title: 'Trending Makeup Hacks', views: '450K', engagement: '40K', niche: 'Beauty', thumbnail: '/thumbnails/beauty.jpg' },
      { id: 4, username: '@FoodieLife', title: 'Quick Recipe Transformation', views: '380K', engagement: '35K', niche: 'Food', thumbnail: '/thumbnails/food.jpg' },
      { id: 5, username: '@FitnessPro', title: '30-Second Workout Challenge', views: '420K', engagement: '38K', niche: 'Health', thumbnail: '/thumbnails/workout.jpg' },
      { id: 6, username: '@LifeHacks', title: 'Amazing Life Hacks Revealed', views: '350K', engagement: '32K', niche: 'Lifestyle', thumbnail: '/thumbnails/hacks.jpg' },
      { id: 7, username: '@PetLover', title: 'Cute Pet Moments Compilation', views: '480K', engagement: '43K', niche: 'Pets', thumbnail: '/thumbnails/pets.jpg' },
      { id: 8, username: '@ArtCreator', title: 'Speed Art Challenge', views: '290K', engagement: '26K', niche: 'Art', thumbnail: '/thumbnails/art.jpg' },
      { id: 9, username: '@FashionTrends', title: 'Style Transformation', views: '400K', engagement: '36K', niche: 'Fashion', thumbnail: '/thumbnails/fashion.jpg' },
      { id: 10, username: '@ComedyKing', title: 'Hilarious Skits Compilation', views: '520K', engagement: '47K', niche: 'Entertainment', thumbnail: '/thumbnails/comedy.jpg' }
    ]
  },
  {
    name: 'X (Twitter)',
    icon: <FaTwitter className="text-2xl text-blue-400" />,
    posts: [
      { id: 1, username: '@NewsAnalyst', title: 'Breaking: A comprehensive analysis of the latest global developments and their implications for international relations. Key points on economic impact and future scenarios...', views: '150K', engagement: '10K', niche: 'News', thumbnail: '/thumbnails/news-analysis.jpg' },
      { id: 2, username: '@GrowthHacker', title: 'THREAD: 10 Unconventional Growth Strategies That Actually Work. I\'ve spent 5 years testing these methods across various industries. Here\'s what you need to know...', views: '200K', engagement: '18K', niche: 'Business', thumbnail: '/thumbnails/growth-hacks.jpg' },
      { id: 3, username: '@TechInsider', title: 'EXCLUSIVE: Inside scoop on the next big tech revolution. Sources reveal groundbreaking developments in AI and quantum computing. Here\'s what it means for the future...', views: '180K', engagement: '15K', niche: 'Technology', thumbnail: '/thumbnails/tech-news.jpg' },
      { id: 4, username: '@MarketWatch', title: 'Market Analysis: Deep dive into today\'s market movements. Key trends, important indicators, and what they mean for your investment strategy. Full breakdown thread...', views: '160K', engagement: '12K', niche: 'Finance', thumbnail: '/thumbnails/market.jpg' },
      { id: 5, username: '@PolicyExpert', title: 'THREAD: Understanding the implications of new policy changes. A detailed analysis of recent legislative developments and their impact on various sectors...', views: '140K', engagement: '9K', niche: 'Politics', thumbnail: '/thumbnails/policy.jpg' },
      { id: 6, username: '@StartupGuru', title: 'How I Built a 7-Figure Business from Zero: A detailed thread on the exact steps, challenges, and lessons learned along the way. Real numbers and strategies included...', views: '220K', engagement: '20K', niche: 'Business', thumbnail: '/thumbnails/startup.jpg' },
      { id: 7, username: '@DataScientist', title: 'THREAD: The Future of AI - Breaking down complex concepts into simple explanations. What you need to know about machine learning, neural networks, and more...', views: '190K', engagement: '16K', niche: 'Technology', thumbnail: '/thumbnails/ai.jpg' },
      { id: 8, username: '@HealthExpert', title: 'Debunking Popular Health Myths: A science-based thread on common misconceptions about nutrition, exercise, and wellness. References and studies included...', views: '170K', engagement: '14K', niche: 'Health', thumbnail: '/thumbnails/health.jpg' },
      { id: 9, username: '@ClimateAction', title: 'URGENT: New Climate Data Revealed - A comprehensive analysis of latest environmental studies and their implications. Solutions and action items included...', views: '230K', engagement: '21K', niche: 'Environment', thumbnail: '/thumbnails/climate.jpg' },
      { id: 10, username: '@CultureCritic', title: 'The Evolution of Modern Entertainment: A deep dive into how streaming, social media, and technology are reshaping our cultural landscape...', views: '210K', engagement: '19K', niche: 'Entertainment', thumbnail: '/thumbnails/culture.jpg' }
    ]
  }
];

const niches = [
  'All',
  'Education',
  'Entertainment',
  'Technology',
  'Lifestyle',
  'Business',
  'News',
  'Food',
  'Sports',
  'Health'
];

export default function TrendingPage() {
  const [selectedNiche, setSelectedNiche] = React.useState('All');
  const [youtubeVideos, setYoutubeVideos] = useState<YouTubeVideo[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const videos = await fetchTrendingYouTubeVideos();
      setYoutubeVideos(videos);
    };
    
    fetchVideos();
  }, []);

  const allPlatforms = [
    {
      name: 'YouTube',
      icon: platforms[0].icon,
      posts: youtubeVideos.map(video => ({
        id: video.id,
        username: video.username,
        title: video.title,
        views: video.views,
        engagement: video.engagement,
        niche: video.niche || 'Entertainment', // Use video's niche or default to Entertainment
        thumbnail: video.thumbnail,
      })),
    },
    ...platforms.slice(1)
  ];

  const filteredPlatforms = allPlatforms.map(platform => {
    const filteredPosts = platform.posts
      .filter(post => 
        selectedNiche === 'All' ? true : post.niche.toLowerCase() === selectedNiche.toLowerCase()
      )
      .sort((a, b) => {
        // Convert engagement values to numbers for comparison
        const aEngagement = parseInt(a.engagement.replace('K', '000'));
        const bEngagement = parseInt(b.engagement.replace('K', '000'));
        const aViews = parseInt(a.views.replace('K', '000'));
        const bViews = parseInt(b.views.replace('K', '000'));
        
        // Calculate viral score based on engagement and views
        const aViralScore = aEngagement * 2 + aViews;
        const bViralScore = bEngagement * 2 + bViews;
        
        return bViralScore - aViralScore;
      })
      .slice(0, 10); // Show top 10 most viral posts
  
    return {
      ...platform,
      posts: filteredPosts
    };
  });

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <h1 className="text-2xl font-semibold text-white mb-2">
          Trending Content 🔥
        </h1>
        <p className="text-gray-300">
          Discover viral content across different platforms and niches
        </p>
      </div>

      {/* Niche Filter */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="flex flex-wrap gap-2">
          {niches.map((niche) => (
            <button
              key={niche}
              onClick={() => setSelectedNiche(niche)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedNiche === niche
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {niche}
            </button>
          ))}
        </div>
      </div>

      {/* Platform Sections */}
      <div className="space-y-6">
        {filteredPlatforms.map((platform) => (
          <div key={platform.name} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <span>{platform.icon}</span>
                {platform.name}
              </h2>
            </div>
            <div className="p-6">
              {platform.posts.length > 0 ? (
                <div className="grid grid-flow-col auto-cols-[300px] gap-6 overflow-x-auto pb-4 scrollbar-none">
                  {platform.posts.map((post) => (
                    <div
                      key={post.id}
                      className="flex-none w-[300px] bg-gray-700 rounded-lg overflow-hidden hover:bg-gray-600 transition-colors group"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">{post.username[0]}</span>
                          </div>
                          <p className="text-blue-400 text-sm font-medium">{post.username}</p>
                        </div>
                        <h3 className={`text-white font-medium mb-2 ${platform.name === 'X (Twitter)' ? 'text-sm line-clamp-4' : 'line-clamp-2'}`}>{post.title}</h3>
                        <div className="flex items-center justify-between text-sm">
                          <div className="space-y-1">
                            <p className="text-gray-400">Views</p>
                            <p className="text-white font-medium">{post.views}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-gray-400">Engagement</p>
                            <p className="text-white font-medium">{post.engagement}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-gray-400">Niche</p>
                            <p className="text-blue-400">{post.niche}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-4">
                  No trending content found for this niche
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}