import { useSyncExternalStore } from 'react';

const subscribe = (callback) => {
  document.addEventListener('visibilitychange', callback);
  return () => document.removeEventListener('visibilitychange', callback);
};

export default function usePageVisibility() {
  return useSyncExternalStore(subscribe, () => !document.hidden, () => true);
}
