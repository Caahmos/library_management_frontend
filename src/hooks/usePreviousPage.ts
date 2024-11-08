import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePreviousPage = () => {
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('@library_management:lastPage', location.pathname);
  }, [location]);
};

export default usePreviousPage;
