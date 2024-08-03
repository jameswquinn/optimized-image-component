import { h } from 'preact';
import OptimizedImage from '../src/components/OptimizedImage';

const ResponsiveImage = () => (
  <div>
    <h2>Responsive Image</h2>
    <OptimizedImage
      src="https://example.com/image-1x.jpg"
      webpSrc="https://example.com/image-1x.webp"
      alt="Responsive image"
      className="responsive-image"
      srcSet="https://example.com/image-1x.jpg 1x, https://example.com/image-2x.jpg 2x, https://example.com/image-3x.jpg 3x"
      webpSrcSet="https://example.com/image-1x.webp 1x, https://example.com/image-2x.webp 2x, https://example.com/image-3x.webp 3x"
    />
  </div>
);

export default ResponsiveImage;
