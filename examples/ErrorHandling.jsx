import { h } from 'preact';
import OptimizedImage from '../src/components/OptimizedImage';

const ErrorHandling = () => (
  <div>
    <h2>Error Handling</h2>
    <OptimizedImage
      src="https://example.com/non-existent-image.jpg"
      alt="Non-existent image"
      className="error-image"
      onError={() => console.log('Image failed to load')}
    />
  </div>
);

export default ErrorHandling;
