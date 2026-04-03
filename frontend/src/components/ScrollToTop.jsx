import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instantly scroll to the top left (0, 0) whenever the path changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // This component doesn't render anything visual
};

export default ScrollToTop;