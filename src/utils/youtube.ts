import axios from 'axios';

const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  views: string;
  engagement: string;
  username: string;
}

export async function fetchTrendingYouTubeVideos(): Promise<YouTubeVideo[]> {
  try {
    const response = await axios.get(`${YOUTUBE_API_BASE_URL}/videos`, {
      params: {
        part: 'snippet,statistics',
        chart: 'mostPopular',
        maxResults: 10,
        regionCode: 'US', // Add region code
        videoCategoryId: '0', // General category
        key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
      },
    });

    if (!response.data || !response.data.items) {
      console.error('Invalid response structure:', response.data);
      return [];
    }

    return response.data.items.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
      views: formatCount(item.statistics.viewCount || 0),
      engagement: formatCount(
        (parseInt(item.statistics.likeCount || '0') + 
        parseInt(item.statistics.commentCount || '0'))
      ),
      username: item.snippet.channelTitle,
      niche: 'Entertainment', // Default niche
    }));
  } catch (error: any) {
    console.error('Error fetching YouTube videos:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return [];
  }
}

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