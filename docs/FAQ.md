# Frequently Asked Questions (FAQ) for OptimizedImage Component

## General Questions

### Q1: What is the OptimizedImage component?
A: OptimizedImage is a Preact component designed for efficient and optimized image loading. It includes features like lazy loading, WebP support, responsive images, and more.

### Q2: Why should I use OptimizedImage instead of a regular `<img>` tag?
A: OptimizedImage offers several advantages over a regular `<img>` tag, including:
- Lazy loading for improved performance
- Automatic WebP usage when supported
- Responsive image loading based on device and network conditions
- Built-in error handling and retry logic
- Easy integration with Preact applications

### Q3: Does OptimizedImage work with React?
A: OptimizedImage is primarily designed for Preact. However, with minor modifications, it can be adapted to work with React. The core concepts and most of the code would remain the same.

## Usage Questions

### Q4: How do I install OptimizedImage?
A: You can install OptimizedImage using npm:
```bash
npm install optimized-image-component
```

### Q5: What's the basic usage of OptimizedImage?
A: Here's a basic example:
```jsx
import OptimizedImage from 'optimized-image-component';

function MyComponent() {
  return (
    <OptimizedImage
      src="path/to/image.jpg"
      webpSrc="path/to/image.webp"
      alt="Description of image"
    />
  );
}
```

### Q6: How do I use responsive images with OptimizedImage?
A: You can use the `srcSet` prop along with the `sizes` prop:
```jsx
<OptimizedImage
  src="image-1x.jpg"
  webpSrc="image-1x.webp"
  srcSet="image-1x.jpg 1x, image-2x.jpg 2x, image-3x.jpg 3x"
  webpSrcSet="image-1x.webp 1x, image-2x.webp 2x, image-3x.webp 3x"
  sizes="(max-width: 600px) 100vw, 50vw"
  alt="Responsive image"
/>
```

## Feature Questions

### Q7: Does OptimizedImage support AVIF format?
A: Yes, OptimizedImage supports AVIF. You can provide an AVIF source using the `avifSrc` prop.

### Q8: How does the lazy loading work?
A: OptimizedImage uses the Intersection Observer API to detect when the image enters the viewport. It then loads the image. For browsers that don't support Intersection Observer, a polyfill is automatically loaded.

### Q9: Can I use a placeholder while the image is loading?
A: Yes, you can use the `lqip` prop to provide a Low Quality Image Placeholder, or the `colorPlaceholder` prop to use a color as a placeholder.

## Performance Questions

### Q10: Will OptimizedImage affect my application's performance?
A: OptimizedImage is designed to improve performance by lazy loading images and using optimal formats. However, as with any component, it's important to use it judiciously and test performance in your specific application.

### Q11: How does OptimizedImage handle errors?
A: If an image fails to load, OptimizedImage will retry loading a few times with exponential backoff. If it still fails, it will display an error message or a fallback image if provided.

## Browser Support Questions

### Q12: What browsers does OptimizedImage support?
A: OptimizedImage supports all modern browsers. For older browsers, it includes polyfills for features like Intersection Observer and WebP support.

### Q13: How does OptimizedImage handle browsers that don't support WebP?
A: For browsers that don't support WebP, OptimizedImage will automatically fall back to the standard image format (usually JPEG or PNG).

## Customization Questions

### Q14: Can I customize the loading or error states?
A: Yes, OptimizedImage accepts `loadingComponent` and `errorComponent` props where you can pass custom components to be displayed during loading or on error.

### Q15: Can I hook into the loading lifecycle of the image?
A: Yes, OptimizedImage provides several callback props like `onLoad`, `onError`, and `onVisibilityChange` that you can use to hook into different stages of the image loading process.

## Troubleshooting Questions

### Q16: The images are not lazy loading. What could be wrong?
A: Ensure that you're not setting a fixed height on the image container. Also, check if Intersection Observer is supported in your target browsers.

### Q17: The WebP images are not loading. How can I debug this?
A: First, ensure that your browser supports WebP. Then, check if the WebP image URL is correct. You can also use the browser's network tab to see which image URL is being requested.

If you have any more questions that aren't covered here, please feel free to open an issue on our GitHub repository.
