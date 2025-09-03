// Video optimization utilities
export const videoUtils = {
  // Check if WebM is supported
  isWebMSupported: () => {
    const video = document.createElement('video');
    return video.canPlayType('video/webm; codecs="vp9"') !== '';
  },

  // Get the best video format for the browser
  getBestVideoFormat: (videoName) => {
    if (videoUtils.isWebMSupported()) {
      return `/videos/${videoName}.webm`;
    }
    return `/videos/${videoName}.mp4`;
  },

  // Preload video with metadata
  preloadVideo: (src, onLoad, onError) => {
    const video = document.createElement('video');
    video.src = src;
    video.muted = true;
    video.preload = 'metadata';
    video.onloadedmetadata = onLoad;
    video.onerror = onError;
  },

  // Cache video in memory
  cacheVideo: (src, side, cache) => {
    if (cache.has(side)) {
      return Promise.resolve(cache.get(side));
    }

    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.src = src;
      video.muted = true;
      video.preload = 'metadata';
      
      video.onloadedmetadata = () => {
        cache.set(side, video);
        resolve(video);
      };
      
      video.onerror = reject;
    });
  },

  // Optimize video playback
  optimizeVideoPlayback: (videoElement) => {
    if (videoElement) {
      // Set video to first frame
      videoElement.currentTime = 0;
      videoElement.pause();
      
      // Optimize for performance
      videoElement.playsInline = true;
      videoElement.muted = true;
      videoElement.loop = true;
    }
  },

  // Handle video play with error handling
  playVideo: async (videoElement) => {
    if (!videoElement) return false;
    
    try {
      // Ensure video is ready
      if (videoElement.readyState < 3) {
        await new Promise((resolve) => {
          videoElement.onloadeddata = resolve;
          videoElement.load();
        });
      }
      
      const playPromise = videoElement.play();
      if (playPromise !== undefined) {
        await playPromise;
        return true;
      }
    } catch (error) {
      console.warn('Video play failed:', error);
      return false;
    }
    return false;
  },

  // Pause video and reset to first frame
  pauseVideo: (videoElement) => {
    if (videoElement) {
      videoElement.pause();
      videoElement.currentTime = 0;
    }
  }
};

export default videoUtils; 