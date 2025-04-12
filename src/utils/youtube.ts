import axios from 'axios';

const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeVideo {
  id: string;
  username: string;
  title: string;
  thumbnail: string;
  niche: string;
  views: string;
  engagement: string;
  publishedAt: string;
}

export const fetchTrendingYouTubeVideos = async (niche = 'All'): Promise<YouTubeVideo[]> => {
  try {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const searchQuery = niche === 'All' ? 'trending viral' : `trending ${niche.toLowerCase()} viral`;

    // First, search for videos
    const searchResponse = await axios.get(`${YOUTUBE_API_BASE_URL}/search`, {
      params: {
        part: 'snippet',
        q: searchQuery,
        type: 'video',
        maxResults: 10,
        order: 'viewCount',
        publishedAfter: oneWeekAgo,
        key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
      },
    });

    if (!searchResponse.data.items?.length) {
      return [];
    }

    // Then get detailed statistics for those videos
    const videoIds = searchResponse.data.items.map((item: any) => item.id.videoId).join(',');
    const statsResponse = await axios.get(`${YOUTUBE_API_BASE_URL}/videos`, {
      params: {
        part: 'statistics,snippet',
        id: videoIds,
        key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
      },
    });

    return searchResponse.data.items.map((item: any, index: number) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url,
      views: formatCount(statsResponse.data.items[index]?.statistics?.viewCount || '0'),
      engagement: formatCount(
        parseInt(statsResponse.data.items[index]?.statistics?.likeCount || '0') +
        parseInt(statsResponse.data.items[index]?.statistics?.commentCount || '0')
      ),
      username: item.snippet.channelTitle,
      niche: niche === 'All' ? detectNiche(item.snippet.title) : niche,
      publishedAt: item.snippet.publishedAt
    }));
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
};

function getYouTubeCategoryId(niche: string): string {
  const categories: Record<string, string> = {
    'Entertainment': '24',
    'Music': '10',
    'Gaming': '20',
    'Sports': '17',
    'News': '25',
    'Education': '27',
    'Technology': '28',
    'Comedy': '23',
    'Film': '1',
    'Lifestyle': '22',
  };
  return categories[niche] || '';
}

// Replace 'any' with proper types
// For example:
interface Statistics {
  viewCount: string;
  likeCount: string;
  commentCount: string;
}

// Then use this type instead of 'any'
export const calculateEngagement = (statistics: Statistics): string => {
  // Function implementation
}

// Remove or use the unused functions
function formatCount(count: number | string): string {
  const num = typeof count === 'string' ? parseInt(count) : count;
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

function detectNiche(title: string): string {
  const nicheKeywords: Record<string, string[]> = {
    Technology: ['tech', 'coding', 'programming', 'software', 'hardware'],
    Education: ['learn', 'tutorial', 'guide', 'how to', 'education'],
    Entertainment: ['game', 'play', 'fun', 'comedy', 'entertainment'],
    Business: ['business', 'startup', 'entrepreneur', 'marketing'],
    Food: ['cook', 'recipe', 'food', 'cooking', 'kitchen'],
    Sports: ['sport', 'fitness', 'workout', 'exercise', 'training'],
    Health: ['health', 'wellness', 'medical', 'nutrition'],
  };

  const titleLower = title.toLowerCase();
  for (const [niche, keywords] of Object.entries(nicheKeywords)) {
    if (keywords.some(keyword => titleLower.includes(keyword))) {
      return niche;
    }
  }
  return 'Entertainment';
}

/**
 * Fetches trending YouTube shorts (videos under 2 minutes)
 */
export const fetchTrendingShorts = async (region = 'US') => {
  try {
    console.log('Fetching shorts for region:', region);
    const response = await fetch(`/api/youtube/shorts?region=${region}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Shorts API error response:', errorText);
      throw new Error(`Failed to fetch trending shorts: ${response.status} ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Shorts data received:', data.length, 'items');
    return data;
  } catch (error) {
    console.error('Error fetching trending shorts:', error);
    // Return empty array instead of throwing to prevent component errors
    return [];
  }
};