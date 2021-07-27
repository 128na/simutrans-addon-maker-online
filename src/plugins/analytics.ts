import { analytics } from '@/firebase';
import { RouteLocationNormalized } from 'vue-router';
const prod = process.env.NODE_ENV === 'production';

// https://developers.google.com/gtagjs/reference/event?hl=ja#page_view
export const pageView = (route: RouteLocationNormalized) => {
  const event: string = 'page_view';
  const param = {
    page_location: location.href,
    page_path: route.path,
    page_title: route.name
  };

  if (prod) {
    analytics.logEvent(event, param);
  }
}