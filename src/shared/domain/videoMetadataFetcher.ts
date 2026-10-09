/**
 * Video Metadata Fetcher
 * Resolves public YouTube and TikTok metadata without requiring private API keys.
 * Uses public CORS-enabled oEmbed endpoints and direct thumbnail format patterns.
 */

export interface VideoMetadata {
  platform: 'youtube' | 'tiktok';
  videoId: string;
  url: string;
  title: string;
  authorName: string;
  authorUrl?: string;
  thumbnailUrl: string;
  embedHtml?: string;
}

/**
 * Extracts YouTube Video ID from any standard link format:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 */
export function extractYouTubeVideoId(url: string): string | null {
  const cleanUrl = url.trim();
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /[?&]v=([a-zA-Z0-9_-]{11})/
  ];

  for (const pattern of patterns) {
    const match = cleanUrl.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Fetches video metadata for YouTube or TikTok URLs via oEmbed.
 */
export async function fetchVideoMetadata(rawUrl: string): Promise<VideoMetadata> {
  const url = rawUrl.trim();

  // 1. Check YouTube
  const youtubeId = extractYouTubeVideoId(url);
  if (youtubeId) {
    const highResThumbnail = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
    const fallbackThumbnail = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

    try {
      const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${youtubeId}&format=json`;
      const res = await fetch(oembedUrl);

      if (res.ok) {
        const data = await res.json();
        return {
          platform: 'youtube',
          videoId: youtubeId,
          url,
          title: data.title || `YouTube Video (${youtubeId})`,
          authorName: data.author_name || 'YouTube Creator',
          authorUrl: data.author_url,
          thumbnailUrl: data.thumbnail_url || highResThumbnail,
          embedHtml: data.html,
        };
      }
    } catch {
      // Offline or network error: return clean structured fallback
    }

    return {
      platform: 'youtube',
      videoId: youtubeId,
      url,
      title: `YouTube Video (${youtubeId})`,
      authorName: 'YouTube Creator',
      thumbnailUrl: highResThumbnail || fallbackThumbnail,
    };
  }

  // 2. Check TikTok
  if (url.includes('tiktok.com/')) {
    try {
      const oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`;
      const res = await fetch(oembedUrl);
      if (res.ok) {
        const data = await res.json();
        return {
          platform: 'tiktok',
          videoId: data.embed_product_id || 'tiktok-video',
          url,
          title: data.title || 'TikTok Video',
          authorName: data.author_name || 'TikTok Creator',
          authorUrl: data.author_url,
          thumbnailUrl: data.thumbnail_url || '',
          embedHtml: data.html,
        };
      }
    } catch {
      // Fall through
    }

    return {
      platform: 'tiktok',
      videoId: 'tiktok-video',
      url,
      title: 'TikTok Video',
      authorName: 'TikTok Creator',
      thumbnailUrl: '',
    };
  }

  throw new Error('Unsupported URL format. Please paste a valid YouTube or TikTok video link.');
}
