import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Calculator from './components/Calculator';
import EventCards from './components/EventCards';
import Standards from './components/Standards';
import HomePageContact from './components/HomePageContact';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import MaintenanceWrapper from './components/MaintenanceWrapper';
import AdminPage from './pages/AdminPage';
import ErrorBoundary from './components/ErrorBoundary';
import { initializeTitleAndLogo, setupTitleLogoListeners } from './utils/titleLogoService';
import './App.css';

function App() {
  useEffect(() => {
    // Initialize title and logo management
    initializeTitleAndLogo();
    setupTitleLogoListeners();
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* Admin Route - Not wrapped in maintenance mode */}
          <Route path="/admin" element={
            <ErrorBoundary>
              <AdminPage />
            </ErrorBoundary>
          } />
          
          {/* Main App Route - Wrapped in maintenance mode check */}
          <Route path="/*" element={
            <ErrorBoundary>
              <MaintenanceWrapper>
                <div className="App">
                  <Header />
                  <Hero />
                  <Calculator />
                  <EventCards />
                  <Standards />
                  <HomePageContact />
                  <FAQ />
                  <Footer />
                </div>
              </MaintenanceWrapper>
            </ErrorBoundary>
          } />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
