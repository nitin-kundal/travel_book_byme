import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { AuthProvider } from './contexts/AuthContext';
import Auth from './components/Auth';
import BookingHistory from './components/BookingHistory';
import PrivateRoute from './PrivateRoute';
import Home from './components/Home';
import HotelList from './components/HotelList';
import BookHotel from './components/BookHotel';
import { AUTH_SOURCE, COOKIE_NAMES } from './config/Constants';
import LandingPage from './components/LandingPage';

function App() {
    const [cookies] = useCookies([COOKIE_NAMES.ACCESS_TOKEN]);
    const isAuthenticated = !!cookies.access_token;

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    {
                        !isAuthenticated && (
                            <>
                                <Route path="/login" element={<Auth source={AUTH_SOURCE.SIGN_IN} />} />
                                <Route path="/signup" element={<Auth source={AUTH_SOURCE.SIGN_UP} />} />
                            </>
                        )
                    }
                    <Route element={<LandingPage />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/hotels" element={<HotelList />} />
                        <Route element={<PrivateRoute />}>
                            <Route path="/hotels/book" element={<BookHotel />} />
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
