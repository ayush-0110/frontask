/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  MemoryRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { GlobalStyle } from 'styles/global-styles';
import { useTranslation } from 'react-i18next';
import { Clue1 } from './components/Clue1/Loadable';
import { Clue2 } from './components/Clue2/Loadable';
import { Clue3 } from './components/Clue3/Loadable';
import { Clue4 } from './components/Clue4/Loadable';
import { AuthProvider } from './contexts/AuthContext';
import { Clue5 } from './components/Clue5';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { useAuth } from './contexts/AuthContext';
import { Failed } from './components/Failed';
import { AdminPanel } from './components/AdminPanel';
export function App() {
  // const { user } = useAuth();
  const { i18n } = useTranslation();
  function ProtectedRoute() {
    const { isLoggedIn } = useAuth();
    React.useEffect(() => {
      if (isLoggedIn) {
        // Prevent going back in history
        window.history.pushState(null, '', window.location.pathname);
        window.addEventListener('popstate', () => {
          window.history.pushState(null, '', window.location.pathname);
        });

        // Prevent page refresh
        const handleBeforeUnload = e => {
          e.preventDefault();
          e.returnValue = 'Are you sure you want to leave this page?';
        };
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Clean up event listeners
        return () => {
          window.removeEventListener('popstate', () => {
            window.history.pushState(null, '', window.location.pathname);
          });
          window.removeEventListener('beforeunload', handleBeforeUnload);
        };
      }
    }, [isLoggedIn]);

    return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
  }
  return (
    <AuthProvider>
      <MemoryRouter>
        <Helmet
          titleTemplate="%s - React Boilerplate"
          defaultTitle="Let's Hunt it"
          htmlAttributes={{ lang: i18n.language }}
        >
          <meta name="description" content="A React Boilerplate application" />
        </Helmet>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route index element={<AdminPanel />} />
          </Route>
          <Route path="/clue1" element={<ProtectedRoute />}>
            <Route index element={<Clue1 />} />
          </Route>
          <Route path="/clue2" element={<ProtectedRoute />}>
            <Route index element={<Clue2 />} />
          </Route>
          <Route path="/clue3" element={<ProtectedRoute />}>
            <Route index element={<Clue3 />} />
          </Route>
          <Route path="/clue4" element={<ProtectedRoute />}>
            <Route index element={<Clue4 />} />
          </Route>
          <Route path="/clue5" element={<ProtectedRoute />}>
            <Route index element={<Clue5 />} />
          </Route>
          <Route path="/failed" element={<ProtectedRoute />}>
            <Route index element={<Failed />} />
          </Route>
        </Routes>

        <GlobalStyle />
      </MemoryRouter>
    </AuthProvider>
  );
}
