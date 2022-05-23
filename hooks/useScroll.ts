import { useEffect } from 'react';

const useScroll = (listener: () => void) => {
  useEffect(() => {
    window.addEventListener('scroll', listener);
    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, []);

  return;
};

export default useScroll;
