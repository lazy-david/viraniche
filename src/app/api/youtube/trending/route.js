import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const niche = searchParams.get('niche') || 'All';
  const region = searchParams.get('region') || 'US';
  
  try {
    // YouTube API key should be stored in environment variables
    const apiKey = process.env.YOUTUBE_API_KEY;
    
    if (!apiKey) {
      throw new Error('YouTube API key is not configured');
    }
    
    // Build the query based on niche
    let query = '';
    if (niche !== 'All') {
      query = `&q=${encodeURIComponent(niche)}`;
    }
    
    // Fetch trending videos from YouTube API
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=${region}&maxResults=10&key=${apiKey}${query}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );
    
    if (!response.ok) {
      throw new Error('YouTube API request failed');
    }
    
    const data = await response.json();
    
    // Transform the response to match our app's format
    const videos = data.items.map(item => ({
      id: item.id,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url,
      views: formatCount(item.statistics.viewCount),
      engagement: calculateEngagement(item.statistics),
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt
    }));
    
    return NextResponse.json(videos);
  } catch (error) {
    console.error('YouTube API error:', error);
    return NextResponse.json([], { status: 500 });
  }
}

// Helper function to format view counts
function formatCount(count) {
  const num = parseInt(count, 10);
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// Calculate engagement rate (likes + comments) / views
function calculateEngagement(statistics) {
  const views = parseInt(statistics.viewCount, 10) || 1;
  const likes = parseInt(statistics.likeCount, 10) || 0;
  const comments = parseInt(statistics.commentCount, 10) || 0;
  
  const rate = ((likes + comments) / views) * 100;
  return rate.toFixed(1) + '%';
}