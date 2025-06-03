import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from '../pages/login/Login';
// import Register from '../pages/register/Register';
import Home from '../pages/home/Home';
// import Profile from '../pages/profile/Profile';
import NotFound from '../pages/notFound/NotFound';
import Photo from '../pages/photo/Photo';
import MainLayout from '../layouts/MainLayout';

const AppRoute = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      
      {/* Protected Routes */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
       <Route
        path="/photo/user/:userId"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Photo/>
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          localStorage.getItem('token') ? (
            <Navigate to="/home" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoute;
