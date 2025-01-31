import './assets/css/App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import {
  ChakraProvider,
  // extendTheme
} from '@chakra-ui/react';
import initialTheme from './theme/theme'; //  { themeGreen }
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
// Chakra imports

export default function Main() {
  // eslint-disable-next-line
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  return (
    <ChakraProvider theme={currentTheme}>
      <Toaster position="top-right" toastOptions={{
        className: '',
        style: {
          color: '#7a7a71',
          fontWeight: "500"
        },
      }}
      />
      <Routes>
        <Route path="auth/*" element={<AuthLayout />} />

        <Route
          path="/*"
          element={
            <AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />
          }
        />
        <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
        <Route
          path="/admin"
          element={<Navigate to="/auth/sign-in" replace />}
        />
      </Routes>
    </ChakraProvider>
  );
}
