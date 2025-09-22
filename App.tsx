
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
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

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="bg-light-gray text-text-dark font-sans">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/leadership" element={<LeadershipPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/workplan" element={<WorkplanPage />} />
            <Route path="/medical-fund" element={<MedicalFundPage />} />
            <Route path="/photos" element={<PhotosPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/player-registration" element={<PlayerRegistrationPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/signin" element={<SignInPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
