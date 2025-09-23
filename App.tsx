import React, { useEffect, Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LeadershipPage from './pages/LeadershipPage';
import EventsPage from './pages/EventsPage';
import WorkplanPage from './pages/WorkplanPage';
import MedicalFundPage from './pages/MedicalFundPage';
import PhotosPage from './pages/PhotosPage';
import RegistrationPage from './pages/RegistrationPage';
import PlayerRegistrationPage from './pages/PlayerRegistrationPage';
import ProfilePage from './pages/ProfilePage';
import SignInPage from './pages/SignInPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './AuthContext';  // Ensure this path matches your file structure

declare const AOS: any;

// Global Error Boundary Component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error?: Error }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Global error caught:', error, errorInfo);
    // Optional: Send to error reporting service (e.g., Sentry)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-light-gray text-text-dark">
          <div className="text-center p-8 max-w-md">
            <h1 className="text-4xl font-bold text-primary-red mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-6">We're sorry, an unexpected error occurred.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary-red text-white px-6 py-3 rounded-full hover:bg-dark-red transition duration-300"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.refresh();
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  useEffect(() => {
    // Initialize AOS only once, with production-friendly config
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
      disable: window.innerWidth < 768,  // Disable on mobile for perf
    });
  }, []);

  return (
    <ErrorBoundary>
      <AuthProvider>
        <HashRouter>
          <ScrollToTop />
          <div className="bg-light-gray text-text-dark font-sans">
            <Navbar />
            <main>
              <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center bg-light-gray">
                  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-red"></div>
                </div>
              }>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/leadership" element={<LeadershipPage />} />
                  <Route path="/events" element={<EventsPage />} />
                  <Route path="/workplan" element={<WorkplanPage />} />
                  <Route path="/medical-fund" element={<MedicalFundPage />} />
                  <Route path="/photos" element={<PhotosPage />} />
                  <Route path="/registration" element={<RegistrationPage />} />
                  <Route path="/player-registration/:schoolId" element={<PlayerRegistrationPage />} />
                  <Route path="/profile/:schoolId" element={<ProfilePage />} />
                  <Route path="/signin" element={<SignInPage />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </HashRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;