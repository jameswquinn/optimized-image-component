import { h } from 'preact';
import OptimizedImage from '../src/components/OptimizedImage';

const WithPlaceholder = () => (
  <div>
    <h2>With Low Quality Image Placeholder</h2>
    <OptimizedImage
      src="https://example.com/large-image.jpg"
      webpSrc="https://example.com/large-image.webp"
      alt="A large image with LQIP"
      lqip="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ8NDQ0NFREWFhURFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDg0NDisZFRkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIALcBEwMBIgACEQEDEQH/xAAaAAADAQEBAQAAAAAAAAAAAAABAgMABAUG/8QAGhABAQEBAQEBAAAAAAAAAAAAAAECEQMSIf/EABkBAQEBAQEBAAAAAAAAAAAAAAEAAgMEBf/EABkRAQEBAQEBAAAAAAAAAAAAAAABEQISIf/aAAwDAQACEQMRAD8A+NQYoBhK4eHkTkGVqMUmVkZVaiBD6PUtwaiYh5eqeVqoiyzShA22JijKrfSSq4p9EGldnSTm5pwQYRx5NG9OlU17IcScPHNK1rO4rqkc+zQ8T1TTVPEtVqFNBtDVFXF+DEqFqfaA9V4FTzDRzmTNDNjHRyHKY5DxfMPmDGKxmHkPGIyhqpKMooiaBhiQFQgnkP0jlf6nNAQf7Hlbyai8hbExfcLjyK5xHH6RTenPqKAWlLKXSO6FpRbdLKAQ7Y8m3C6o3JbglTz6LZqjfPp1Sx5f0/oE9U8ejxSRCnBrytMo6OYVaLNGdnhMVaJ7OjqI6aLHPqktU1VdxLURX
className="large-image"
    />
  </div>
);

export default WithPlaceholder;
