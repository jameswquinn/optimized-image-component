import { h } from 'preact';
import OptimizedImage from '../src/components/OptimizedImage';

const LazyLoadingGallery = () => {
  const images = [
    { src: 'image1.jpg', webp: 'image1.webp', alt: 'Image 1' },
    { src: 'image2.jpg', webp: 'image2.webp', alt: 'Image 2' },
    { src: 'image3.jpg', webp: 'image3.webp', alt: 'Image 3' },
    // ... more images
  ];

  return (
    <div>
      <h2>Lazy Loading Gallery</h2>
      <div className="gallery">
        {images.map((image, index) => (
          <OptimizedImage
            key={index}
            src={`https://example.com/${image.src}`}
            webpSrc={`https://example.com/${image.webp}`}
            alt={image.alt}
            className="gallery-image"
          />
        ))}
      </div>
    </div>
  );
};

export default LazyLoadingGallery;
