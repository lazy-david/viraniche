/**
 * Fetches trending YouTube videos from the YouTube API
 */
export const fetchTrendingYouTubeVideos = async (niche = 'All', region = 'US') => {
  try {
    const response = await fetch(`/api/youtube/trending?niche=${niche}&region=${region}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch trending videos');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching trending videos:', error);
    return [];
  }
};

/**
 * Fetches trending YouTube shorts (videos under 2 minutes)
 */
export const fetchTrendingShorts = async (region = 'US') => {
  try {
    const response = await fetch(`/api/youtube/shorts?region=${region}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch trending shorts');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching trending shorts:', error);
    return [];
  }
};