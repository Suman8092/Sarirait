import { useEffect, useRef } from 'react';
import { useLenis } from '../components/SmoothScroll';

const openDialogs = new Set();
let previousOverflow = '';

export function useModalDialog(isOpen, onClose) {
  const dialogRef = useRef(null);
  const closeRef = useRef(onClose);
  const lenis = useLenis();

  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    const trigger = document.activeElement;
    if (openDialogs.size === 0) previousOverflow = document.body.style.overflow;
    openDialogs.add(dialog);
    document.body.style.overflow = 'hidden';
    lenis?.stop();
    dialog.focus({ preventScroll: true });

    const handleKeyDown = (event) => {
      if ([...openDialogs].at(-1) !== dialog) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        closeRef.current?.();
      }
      if (event.key !== 'Tab') return;

      const focusable = [...dialog.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]'
      )].filter((element) => element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first) {
        event.preventDefault();
        dialog.focus();
      } else if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      openDialogs.delete(dialog);
      if (openDialogs.size === 0) {
        document.body.style.overflow = previousOverflow;
        lenis?.start();
      }
      window.requestAnimationFrame(() => {
        if (openDialogs.size === 0 && trigger instanceof HTMLElement && trigger.isConnected) {
          trigger.focus({ preventScroll: true });
        }
      });
    };
  }, [isOpen, lenis]);

  return dialogRef;
}
