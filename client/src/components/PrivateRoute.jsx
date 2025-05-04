import { useSelector } from 'react-redux';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  useEffect(() => {
    if (!currentUser) {
      toast.error('You must be signed in to access this page.');
    }
  }, [currentUser, location.pathname]);

  return currentUser ? <Outlet /> : <Navigate to='/sign-in' />;
}
