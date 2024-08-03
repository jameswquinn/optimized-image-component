// src/index.js

import OptimizedImage from './components/OptimizedImage';

// Export the main component
export default OptimizedImage;

// Export any constants or utility functions that might be useful for users
export const IMAGE_FORMATS = {
  WEBP: 'webp',
  AVIF: 'avif',
  JPEG: 'jpeg',
  PNG: 'png'
};

export const DEVICE_TYPES = {
  MOBILE: 'mobile',
  DESKTOP: 'desktop',
  TABLET: 'tablet',
  UNKNOWN: 'unknown'
};

export const PIXEL_DENSITIES = {
  STANDARD: '1x',
  HIGH: '2x',
  VERY_HIGH: '3x',
  UNKNOWN: 'unknown'
};

export const CONNECTION_TYPES = {
  WIFI: 'wifi',
  FOUR_G: '4g',
  THREE_G: '3g',
  TWO_G: '2g',
  SLOW_TWO_G: 'slow-2g',
  OFFLINE: 'offline',
  UNKNOWN: 'unknown'
};

// Utility function to generate a simple LQIP
export function generateLQIP(imageUrl, size = 10) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = size;
      canvas.height = size * (this.height / this.width);
      ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', 0.1));
    };
    img.onerror = reject;
    img.src = imageUrl;
  });
}

// Utility function to check WebP support
export function checkWebPSupport() {
  return new Promise(resolve => {
    const webP = new Image();
    webP.onload = webP.onerror = function() {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

// Utility function to get device type
export function getDeviceType() {
  const ua = navigator.userAgent;
  if (/mobile/i.test(ua)) return DEVICE_TYPES.MOBILE;
  if (/tablet|ipad/i.test(ua)) return DEVICE_TYPES.TABLET;
  if (/windows|macintosh|linux/i.test(ua)) return DEVICE_TYPES.DESKTOP;
  return DEVICE_TYPES.UNKNOWN;
}
