/**
 * Main App component
 * Sets up routing and provides authentication context
 */

import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DesktopSidebar } from './components/DesktopSidebar';
import { Login } from './components/Login';
import { Home } from './pages/Home';
import { EventDetail } from './pages/EventDetail';

/**
 * Protected route wrapper that redirects to login if not authenticated
 */
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const location = useLocation();
  const showSidebars = location.pathname !== '/login';

  return (
    <>
      {showSidebars && <DesktopSidebar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="island"></div>
        <div className="islandt"></div>
        <div className="hatch"></div>
        <div className="min-h-screen relative z-10">
          <AppRoutes />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
