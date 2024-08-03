import { h, Component } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';

const DEVICE_TYPES = { MOBILE: 'mobile', DESKTOP: 'desktop', UNKNOWN: 'unknown' };
const PIXEL_DENSITIES = { STANDARD: '1x', HIGH: '2x', VERY_HIGH: '3x', UNKNOWN: 'unknown' };
const CONNECTION_TYPES = { WIFI: 'wifi', FOUR_G: '4g', THREE_G: '3g', TWO_G: '2g', OFFLINE: 'offline', UNKNOWN: 'unknown' };
const IMAGE_FORMATS = { WEBP: 'webp', AVIF: 'avif', JPG: 'jpg', PNG: 'png' };

const loadPolyfill = async (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

const OptimizedImage = ({ src, webpSrc, avifSrc, alt, className, lqip, colorPlaceholder, svgPlaceholder }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);
  const retryCount = useRef(0);
  const maxRetries = 3;
  const [deviceType, setDeviceType] = useState(DEVICE_TYPES.UNKNOWN);
  const [pixelDensity, setPixelDensity] = useState(PIXEL_DENSITIES.UNKNOWN);
  const [connectionType, setConnectionType] = useState(CONNECTION_TYPES.UNKNOWN);
  const [supportedFormats, setSupportedFormats] = useState([]);
  const [placeholder, setPlaceholder] = useState(null);
  const lastIntersectionTime = useRef(0);
  const isScrollingFast = useRef(false);
  const webpPolyfillLoaded = useRef(false);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      setDeviceType(getDeviceType());
      setPixelDensity(getPixelDensity());
      setConnectionType(getConnectionType());

      if (!('IntersectionObserver' in window)) {
        try {
          await import('intersection-observer-polyfill');
        } catch (error) {
          console.error('Failed to load IntersectionObserver polyfill:', error);
        }
      }

      const formats = [];
      if (await checkImageFormatSupport('webp')) formats.push(IMAGE_FORMATS.WEBP);
      if (await checkImageFormatSupport('avif')) formats.push(IMAGE_FORMATS.AVIF);
      formats.push(IMAGE_FORMATS.JPG, IMAGE_FORMATS.PNG);
      setSupportedFormats(formats);

      if (isMounted) {
        setupIntersectionObserver();
        selectPlaceholder();
      }
    };

    init();

    return () => {
      isMounted = false;
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/mobile/i.test(ua)) return DEVICE_TYPES.MOBILE;
    if (/tablet|ipad/i.test(ua)) return DEVICE_TYPES.DESKTOP;
    if (/windows|macintosh|linux/i.test(ua)) return DEVICE_TYPES.DESKTOP;
    return DEVICE_TYPES.UNKNOWN;
  };

  const getPixelDensity = () => {
    const dpr = window.devicePixelRatio;
    if (dpr <= 1) return PIXEL_DENSITIES.STANDARD;
    if (dpr <= 2) return PIXEL_DENSITIES.HIGH;
    if (dpr > 2) return PIXEL_DENSITIES.VERY_HIGH;
    return PIXEL_DENSITIES.UNKNOWN;
  };

  const getConnectionType = () => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!connection) return CONNECTION_TYPES.UNKNOWN;
    if (connection.type === 'wifi') return CONNECTION_TYPES.WIFI;
    if (connection.effectiveType === '4g') return CONNECTION_TYPES.FOUR_G;
    if (connection.effectiveType === '3g') return CONNECTION_TYPES.THREE_G;
    if (connection.effectiveType === '2g') return CONNECTION_TYPES.TWO_G;
    if (connection.effectiveType === 'slow-2g') return CONNECTION_TYPES.OFFLINE;
    return CONNECTION_TYPES.UNKNOWN;
  };

  const checkImageFormatSupport = async (format) => {
    const img = new Image();
    img.src = `data:image/${format};base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==`;
    return new Promise((resolve) => {
      img.onload = img.onerror = () => {
        resolve(img.height === 1);
      };
    });
  };

  const selectPlaceholder = () => {
    if (lqip) setPlaceholder(lqip);
    else if (svgPlaceholder) setPlaceholder(svgPlaceholder);
    else if (colorPlaceholder) setPlaceholder(colorPlaceholder);
    else setPlaceholder('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
  };

  const setupIntersectionObserver = () => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const now = Date.now();
            isScrollingFast.current = now - lastIntersectionTime.current < 50;
            lastIntersectionTime.current = now;

            if (!isScrollingFast.current) {
              loadImage();
              observerRef.current.unobserve(entry.target);
            }
          }
        });
      },
      { rootMargin: '200px' }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }
  };

  const loadImage = async () => {
    let srcToUse = src;

    if (deviceType === DEVICE_TYPES.MOBILE) {
      srcToUse = src.replace('.jpg', '-mobile.jpg');
    } else if (pixelDensity === PIXEL_DENSITIES.HIGH) {
      srcToUse = src.replace('.jpg', '@2x.jpg');
    } else if (pixelDensity === PIXEL_DENSITIES.VERY_HIGH) {
      srcToUse = src.replace('.jpg', '@3x.jpg');
    }

    if (supportedFormats.includes(IMAGE_FORMATS.WEBP) && webpSrc) {
      srcToUse = webpSrc;
    } else if (supportedFormats.includes(IMAGE_FORMATS.AVIF) && avifSrc) {
      srcToUse = avifSrc;
    }

    if (connectionType === CONNECTION_TYPES.THREE_G || connectionType === CONNECTION_TYPES.TWO_G) {
      srcToUse = srcToUse.replace('.jpg', '-low.jpg');
    }

    try {
      const response = await fetch(srcToUse);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const blob = await response.blob();
      if (imgRef.current) {
        setImageSrc(URL.createObjectURL(blob));
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Failed to load image:', error);
      handleLoadError();
    }
  };

  const handleLoadError = async () => {
    if (retryCount.current < maxRetries) {
      retryCount.current += 1;
      setTimeout(() => loadImage(), 1000 * Math.pow(2, retryCount.current));
    } else if (!webpPolyfillLoaded.current) {
      try {
        const WebP = await import('webp-hero');
        const webpHero = new WebP.WebpHero();
        await webpHero.polyfill();
        webpPolyfillLoaded.current = true;
        loadImage(); // Retry with WebP polyfill
      } catch (error) {
        console.error('Failed to load WebP polyfill:', error);
        setHasError(true);
        setIsLoading(false);
      }
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingFast.current) {
        clearTimeout(window.scrollEndTimer);
        window.scrollEndTimer = setTimeout(() => {
          isScrollingFast.current = false;
          if (imgRef.current && !imageSrc) {
            loadImage();
          }
        }, 300);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [imageSrc]);

  return (
    <div className={`optimized-image-container ${className || ''}`}>
      {isLoading && <div className="loading-placeholder" style={{backgroundImage: `url(${placeholder})`}}></div>}
      {hasError && <div className="error-message">Failed to load image</div>}
      <img
        ref={imgRef}
        src={imageSrc || placeholder}
        alt={alt}
        className={`optimized-image ${isLoading ? 'hidden' : ''}`}
        onLoad={() => setIsLoading(false)}
        onError={handleLoadError}
      />
    </div>
  );
};

export default OptimizedImage;
