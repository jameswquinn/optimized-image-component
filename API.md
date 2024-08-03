# OptimizedImage Component API Documentation

The `OptimizedImage` component is a Preact-based solution for optimized image loading. It implements lazy loading, format selection based on browser support, device-specific optimizations, and more.

## Installation

```bash
npm install optimized-image-component
```

## Usage

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

The `OptimizedImage` component accepts the following props:

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `src` | string | Yes | The fallback image source (usually a JPEG or PNG). |
| `webpSrc` | string | No | The WebP version of the image. |
| `avifSrc` | string | No | The AVIF version of the image. |
| `alt` | string | Yes | Alternative text for the image. |
| `className` | string | No | Additional CSS class(es) for the container div. |
| `lqip` | string | No | Low Quality Image Placeholder (base64 encoded). |
| `colorPlaceholder` | string | No | A color to use as a placeholder (e.g., "#f0f0f0"). |
| `svgPlaceholder` | string | No | An SVG to use as a placeholder. |

## Features

1. **Lazy Loading**: Uses Intersection Observer for efficient lazy loading.

2. **Format Selection**: Automatically selects the best format (WebP, AVIF, or JPEG/PNG) based on browser support.

3. **Device Type Detection**: Optimizes image selection based on whether the device is mobile or desktop.

4. **Pixel Density Handling**: Serves appropriate image resolution based on the device's pixel density.

5. **Connection Type Optimization**: Adjusts image quality based on the user's connection speed.

6. **Placeholder Support**: Supports various types of placeholders while the image is loading.

7. **Error Handling**: Implements retry logic and fallback mechanisms.

8. **Fast Scroll Detection**: Defers image loading during fast scrolling to improve performance.

9. **Polyfill Support**: Dynamically loads polyfills for Intersection Observer and WebP support if needed.

## Browser Support

This component supports all modern browsers. For older browsers:

- It will dynamically load an Intersection Observer polyfill if needed.
- It will dynamically load a WebP polyfill (webp-hero) for browsers that don't support WebP.

## Performance Considerations

- Provide WebP and AVIF versions of your images when possible for better performance.
- Use appropriate image sizes for different device types and pixel densities.
- Provide a Low Quality Image Placeholder (LQIP) for a better user experience during loading.

## Example

```jsx
import { h } from 'preact';
import OptimizedImage from 'optimized-image-component';

const GalleryItem = () => (
  <OptimizedImage
    src="images/photo.jpg"
    webpSrc="images/photo.webp"
    avifSrc="images/photo.avif"
    alt="A beautiful landscape"
    className="gallery-image"
    lqip="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhIVFRUVFRUVFRUVFRUVFRUVFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFxAQGi0dHR0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAACAwABBAUGB//EADcQAAICAQIDBQYEBQUBAAAAAAABAhEDBCESMUEFUWFxgRMikaGx8DJCwdEGFCNS4RVicpLxQ//EABoBAAMBAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAtEQACAgEDAwIEBgMAAAAAAAAAAQIRAxIhMQRBURNhInGRoQUUMoHB8EKx4f/aAAwDAQACEQMRAD8A+NkwEbOEBxHZjTLUQsUXfdyL4dx2FmcYMpQGezbLcOEaYFzGKJbiPhZCrHQsoxZPmO4eCPf18hqEXzL0PwTKL8nOkgGjbLBx36GecC1IzlFoznErRgA0IRxxYzgHY6FxQcYDVENMZNCxqIXsweEaw2v8k6AU0G8e4tROtwdeqGQ0n+0lnPdPw84yBeM4xwprzOno9It+5+mxi3Whdb5AyrZG1aPtEQapHZ1+GEYxST3Vvz6nEl5FJ2hJANDmwKJBR2RB1d5ZVFANWUWcoCOzy3CghfHb8A7r88x0ZW1wlSBsK3/NlUVwKgsnCRXsOWBsz3Kc/Ade4EhUyoKyOICzr/4K06lFhpBGTZakGi0hphsCUCg6IhUVZXCNx6d+XRFRD4SkylEicNvIzJUa2BkhufEhq4Zgl1NSTjJdHZ9Hyd35Dd0+Xp5oahhiubb8FsBV3J+iMkqOhw1JfDBOG46OkbXHXp9/fQ6mi0H9RRbttf4OKWXS7N
