import { getLCP, getFID, getCLS, getFCP, getTTFB, Metric } from 'web-vitals';
import { analytics } from '../firebase/index';

// https://github.com/GoogleChrome/web-vitals#using-gtagjs-universal-analytics
const sendToGoogleAnalytics = ({ name, delta, id, value }: Metric) => {
  // Assumes the global `ga()` function exists, see:
  // https://developers.google.com/analytics/devguides/collection/analyticsjs
  analytics.logEvent(name, {
    // Built-in params:
    value: delta, // Use `delta` so the value can be summed.
    // Custom params:
    metric_id: id, // Needed to aggregate events.
    metric_value: value, // Optional.
    metric_delta: delta, // Optional.

    // OPTIONAL: any additional params or debug info here.
    // See: https://web.dev/debug-web-vitals-in-the-field/
    // metric_rating: 'good' | 'ni' | 'poor',
    // debug_info: '...',
    // ...
  });
};

const dest = process.env.NODE_ENV === 'production'
  ? sendToGoogleAnalytics
  : console.log;

// Cumulative Layout Shift (CLS)
getCLS(dest, true);
// First Input Delay (FID)
getFID(dest, true);
// Largest Contentful Paint (LCP)
getLCP(dest, true);
// First Contentful Paint (FCP)
getFCP(dest, true);
// Time to First Byte (TTFB)
getTTFB(dest);
