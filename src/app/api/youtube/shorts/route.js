import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const region = searchParams.get('region') || 'US';
  
  try {
    console.log('Shorts API called with region:', region);
    const apiKey = process.env.YOUTUBE_API_KEY;
    
    if (!apiKey) {mak
      console.error('YouTube API key is missing in environment variables');
      throw new Error('YouTube API key is not configured');
    }
    
    // Search for short videos (under 2 minutes)
    console.log('Fetching YouTube search results...');
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoDuration=short&order=viewCount&regionCode=${region}&maxResults=12&key=${apiKey}`,
      { 
        next: { revalidate: 3600 },
        headers: {
          'Accept': 'application/json'
        },
        cache: 'no-store'
      }
    );
    
    if (!response.ok) {
      console.error('YouTube API response status:', response.status);
      const errorText = await response.text();
      console.error('YouTube API response text:', errorText);
      throw new Error(`YouTube API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Received ${data.items?.length || 0} search results`);
    
    if (!data.items || data.items.length === 0) {
      console.warn('No search results returned from YouTube API');
      return NextResponse.json([]);
    }
    
    // Get video IDs for fetching statistics and content details
    const videoIds = data.items.map(item => item.id.videoId).join(',');
    console.log('Fetching video details for IDs:', videoIds);
    
    // Fetch video statistics and content details (to check duration)
    const detailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds}&key=${apiKey}`,
      { 
        next: { revalidate: 3600 },
        headers: {
          'Accept': 'application/json'
        },
        cache: 'no-store'
      }
    );
    
    if (!detailsResponse.ok) {
      console.error('YouTube API details response status:', detailsResponse.status);
      const errorText = await detailsResponse.text();
      console.error('YouTube API details response text:', errorText);
      throw new Error(`YouTube API details request failed with status ${detailsResponse.status}`);
    }
    
    const detailsData = await detailsResponse.json();
    console.log(`Received details for ${detailsData.items?.length || 0} videos`);
    
    if (!detailsData.items || detailsData.items.length === 0) {
      console.warn('No video details returned from YouTube API');
      return NextResponse.json([]);
    }
    
    // Filter videos that are under 2 minutes (120 seconds)
    const shortVideos = detailsData.items.filter(item => {
      try {
        const duration = item.contentDetails.duration;
        const seconds = parseDuration(duration);
        return seconds <= 120; // 2 minutes = 120 seconds
      } catch (error) {
        console.error('Error parsing duration for video:', item.id, error);
        return false;
      }
    });
    
    console.log(`Filtered to ${shortVideos.length} videos under 2 minutes`);
    
    // Map statistics and details to videos
    const shorts = shortVideos.map(item => {
      try {
        const videoData = data.items.find(video => video.id.videoId === item.id);
        
        if (!videoData) {
          console.warn(`Could not find search data for video ID: ${item.id}`);
          return null;
        }
        
        return {
          id: item.id,
          title: videoData.snippet.title,
          thumbnail: videoData.snippet.thumbnails.high?.url || videoData.snippet.thumbnails.medium?.url || videoData.snippet.thumbnails.default?.url,
          views: formatCount(item.statistics.viewCount),
          engagement: calculateEngagement(item.statistics),
          channelTitle: videoData.snippet.channelTitle,
          publishedAt: videoData.snippet.publishedAt
        };
      } catch (error) {
        console.error('Error mapping video data:', error);
        return null;
      }
    }).filter(Boolean);
    
    console.log(`Returning ${shorts.length} short videos`);
    return NextResponse.json(shorts);
  } catch (error) {
    console.error('YouTube API error:', error);
    return NextResponse.json([], { status: 500 });
  }
}

// Helper function to parse ISO 8601 duration to seconds
function parseDuration(duration) {
  try {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    
    if (!match) {
      console.warn('Invalid duration format:', duration);
      return 0;
    }
    
    const hours = (match[1] ? parseInt(match[1].slice(0, -1)) : 0);
    const minutes = (match[2] ? parseInt(match[2].slice(0, -1)) : 0);
    const seconds = (match[3] ? parseInt(match[3].slice(0, -1)) : 0);
    
    return hours * 3600 + minutes * 60 + seconds;
  } catch (error) {
    console.error('Error parsing duration:', duration, error);
    return 0;
  }
}

// Helper function to format view counts
function formatCount(count) {
  try {
    const num = parseInt(count, 10);
    if (isNaN(num)) return '0';
    
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  } catch (error) {
    console.error('Error formatting count:', count, error);
    return '0';
  }
}

// Calculate engagement rate (likes + comments) / views
function calculateEngagement(statistics) {
  try {
    const views = parseInt(statistics.viewCount, 10) || 1;
    const likes = parseInt(statistics.likeCount, 10) || 0;
    const comments = parseInt(statistics.commentCount, 10) || 0;
    
    const rate = ((likes + comments) / views) * 100;
    return rate.toFixed(1) + '%';
  } catch (error) {
    console.error('Error calculating engagement:', statistics, error);
    return '0%';
  }
}