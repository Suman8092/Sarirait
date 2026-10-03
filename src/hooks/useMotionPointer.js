import { useSyncExternalStore } from 'react';

const query = '(hover: hover) and (pointer: fine)';
const subscribe = (callback) => {
  if (typeof window === 'undefined') return () => {};
  const media = window.matchMedia(query);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
};
const getSnapshot = () => {
  if (typeof window === 'undefined') return true;
  return window.matchMedia(query).matches;
};

// Returns true on desktop/laptop devices with fine pointer
export default function useMotionPointer() {
  return useSyncExternalStore(subscribe, getSnapshot, () => true);
}
