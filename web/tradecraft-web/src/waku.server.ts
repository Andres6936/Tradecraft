import { fsRouter } from 'waku';
import adapter from 'waku/adapters/netlify';

export default adapter(
  fsRouter(import.meta.glob('./**/*.{tsx,ts}', { base: './pages' })),
  { static: true },
);
