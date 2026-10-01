import { useSyncExternalStore } from 'react';

const query = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';
const subscribe = (callback) => {
  const media = window.matchMedia(query);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
};
const getSnapshot = () => window.matchMedia(query).matches;

// Update when a pointer or motion preference changes, without a render per move.
export default function useMotionPointer() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
