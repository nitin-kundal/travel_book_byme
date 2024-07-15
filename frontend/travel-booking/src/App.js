import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import SignIn from './components/Auth';
import BookingHistory from './components/BookingHistory';
import PrivateRoute from './PrivateRoute';
import { useCookies } from 'react-cookie';
import Home from './components/Home';
import HotelList from './components/HotelList';
import HotelDetails from './components/PayAndBook';
import { AUTH_SOURCE } from './config/Constants';
import LandingPage from './components/LandingPage';

function App() {
  const [cookies] = useCookies(['access_token']);
  const isAuthenticated = !!cookies.access_token;

  return (
    <Router>
      <AuthProvider>
        <Routes>
          {
            !isAuthenticated && (
              <>
                <Route path="/login" element={<SignIn source={AUTH_SOURCE.SIGN_IN} />} />
                <Route path="/signup" element={<SignIn source={AUTH_SOURCE.SIGN_UP} />} />
              </>
            )
          }
          <Route element={<LandingPage />}>
            <Route path="/" element={<Home />} />
            <Route path="/hotels" element={<HotelList />} />
            <Route element={<PrivateRoute />}>
              <Route path="/hotels/book" element={<HotelDetails />} />
              <Route path="/bookings" element={<BookingHistory />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
