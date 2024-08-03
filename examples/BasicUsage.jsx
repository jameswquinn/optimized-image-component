import { h } from 'preact';
import OptimizedImage from '../src/components/OptimizedImage';

const BasicUsage = () => (
  <div>
    <h2>Basic Usage</h2>
    <OptimizedImage
      src="https://example.com/image.jpg"
      webpSrc="https://example.com/image.webp"
      avifSrc="https://example.com/image.avif"
      alt="A sample image"
      className="sample-image"
    />
  </div>
);

export default BasicUsage;
