export const VideoProviders = {
  Youtube: 'youtube',
  Vk: 'vk'
}

export const ALL_VIDEO_PROVIDERS = Object.keys(VideoProviders)
  .map((key: string) => VideoProviders[key]);
