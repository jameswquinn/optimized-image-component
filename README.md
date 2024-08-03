# OptimizedImage Component

OptimizedImage is a high-performance, feature-rich Preact component for optimized image loading. It implements lazy loading, format selection based on browser support, device-specific optimizations, and more.

## Features

- Lazy loading using Intersection Observer
- Automatic format selection (WebP, AVIF, JPEG/PNG) based on browser support
- Device type detection for optimized image selection
- Pixel density handling for appropriate image resolution
- Connection type optimization for adjusting image quality
- Placeholder support during image loading
- Error handling with retry logic
- Fast scroll detection to defer image loading
- Dynamic polyfill loading for Intersection Observer and WebP support

## Installation

To install the OptimizedImage component, run the following command:

```bash
npm install optimized-image-component
```

## Usage

Here's a basic example of how to use the OptimizedImage component:

```jsx
import { h } from 'preact';
import OptimizedImage from 'optimized-image-component';

const MyComponent = () => (
  <OptimizedImage
    src="path/to/image.jpg"
    webpSrc="path/to/image.webp"
    avifSrc="path/to/image.avif"
    alt="Description of the image"
    className="my-custom-class"
    lqip="data:image/jpeg;base64,/9j/4AAQSkZJRgABA..."
  />
);
```

## Props

The OptimizedImage component accepts the following props:

- `src` (string, required): The fallback image source (usually a JPEG or PNG).
- `webpSrc` (string, optional): The WebP version of the image.
- `avifSrc` (string, optional): The AVIF version of the image.
- `alt` (string, required): Alternative text for the image.
- `className` (string, optional): Additional CSS class(es) for the container div.
- `lqip` (string, optional): Low Quality Image Placeholder (base64 encoded).
- `colorPlaceholder` (string, optional): A color to use as a placeholder (e.g., "#f0f0f0").
- `svgPlaceholder` (string, optional): An SVG to use as a placeholder.

For more detailed information about the props and their usage, please refer to the [API documentation](./API.md).

## Browser Support

This component supports all modern browsers. For older browsers:

- It dynamically loads an Intersection Observer polyfill if needed.
- It dynamically loads a WebP polyfill (webp-hero) for browsers that don't support WebP.

## Performance Considerations

To get the best performance out of the OptimizedImage component:

1. Provide WebP and AVIF versions of your images when possible.
2. Use appropriate image sizes for different device types and pixel densities.
3. Provide a Low Quality Image Placeholder (LQIP) for a better user experience during loading.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- This component uses [intersection-observer-polyfill](https://www.npmjs.com/package/intersection-observer-polyfill) for older browser support.
- WebP support in older browsers is provided by [webp-hero](https://www.npmjs.com/package/webp-hero).

## Support

If you encounter any problems or have any questions, please open an issue in the GitHub repository.
