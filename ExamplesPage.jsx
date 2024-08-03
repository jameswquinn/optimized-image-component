import { h } from 'preact';
import BasicUsage from './examples/BasicUsage';
import WithPlaceholder from './examples/WithPlaceholder';
import ResponsiveImage from './examples/ResponsiveImage';
import LazyLoadingGallery from './examples/LazyLoadingGallery';
import ErrorHandling from './examples/ErrorHandling';

const ExamplesPage = () => (
  <div>
    <h1>OptimizedImage Examples</h1>
    <BasicUsage />
    <WithPlaceholder />
    <ResponsiveImage />
    <LazyLoadingGallery />
    <ErrorHandling />
  </div>
);

export default ExamplesPage;
