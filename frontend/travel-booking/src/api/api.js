import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

const setAuthHeaders = () => {
    const token = cookies.get('access_token');
    if (token) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
    }
};

export const loginUser = async (username, password) => {
    const response = await api.post('/token/', { username, password });
    // cookies.set('access_token', response.data.access, { path: '/', secure: false, httpOnly: true, sameSite: 'Lax' });
    cookies.set('access_token', response.data.access);
    cookies.set('refresh_token', response.data.refresh);
    setAuthHeaders();
    return response.data;
};

export const createUser = async (formData) => {
    const response = await api.post('/users/', formData)
    cookies.set('access_token', response.data.access);
    cookies.set('refresh_token', response.data.refresh);
    setAuthHeaders();
    return response.data
}

export const refreshToken = async () => {
    const refresh_token = cookies.get('refresh_token');
    if (refresh_token) {
        const response = await api.post('/token/refresh/', { refresh: refresh_token });
        if (response?.response?.status === 200) {
            cookies.set('access_token', response.data.access);
            setAuthHeaders();
        }
    }
};

export const fetchHotels = async (location, checkInDate, checkOutDate) => {
    setAuthHeaders();
    const response = await api.get(`/hotels/search/?location=${location}&check_in_date=${checkInDate}&check_out_date=${checkOutDate}`);
    return response.data;
};

export const fetchBookingHistory = async () => {
    setAuthHeaders();
    const response = await api.get('/bookings/');
    return response.data;
};

export const bookHotel = async (hotelId, checkInDate, checkOutDate) => {
    setAuthHeaders();
    const response = await api.post('/bookings/', { hotel_id: hotelId, check_in_date: checkInDate, check_out_date: checkOutDate });
    return response.data;
};

api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response && error.response.status === 401) {
        // Clear the access token cookie
        cookies.remove('access_token');
        cookies.remove('refresh_token');

        // Store the current app route
        const currentRoute = window.location.pathname;

        // Redirect to login page with the original request URL as a query parameter
        window.location.href = `/login?from=${encodeURIComponent(currentRoute)}`;
    }
    return Promise.reject(error);
});

export default api;
