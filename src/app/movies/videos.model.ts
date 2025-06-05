// SERVER
export type Video = {
  name: string;
  key: string;
  site: string;
  id: string;
  type: string;
  official: boolean;
}

// CLIENT
export type VideoItem = Video & { url: string; }

const YOUTUBE_EMBED = "https://www.youtube.com/embed/";

export const toVideoItem = (video: Video): VideoItem => ({
  ...video, url: `${YOUTUBE_EMBED}${video.key}`
});

// filtering
export const byVideoTeaser = (video: Video): boolean => video.official && video.type === "Teaser";
