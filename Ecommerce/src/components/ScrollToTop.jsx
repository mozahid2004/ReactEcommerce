import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Optional: for smooth scrolling
    });
  }, [pathname]);

  return null;
}

export default ScrollToTop;
