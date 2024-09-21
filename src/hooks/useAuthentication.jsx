import {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useGlobalState} from "../context/GlobalStateContext.jsx";
import Storage from '../utils/Storage.js'
// Helper function to parse JWT tokens

const apiUrl = 'https://3mawy2.pythonanywhere.com/api'
export const useAuthentication = () => {
    const [accessToken, setAccessToken] = useState(Storage.getAccessToken());
    const [refreshToken, setRefreshToken] = useState(Storage.getRefreshToken());
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const isLoggedIn = !!accessToken;
    const {resetGlobalState} = useGlobalState()
    const refreshAccessToken = async () => {
        try {
            const response = await fetch(`${apiUrl}/token/refresh`, {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify({refresh: refreshToken}),
            });

            if (response.ok) {
                const data = await response.json();
                const {access, refresh} = data;
                setAccessToken(access);
                setRefreshToken(refresh);
                Storage.setAccessToken(access)
                Storage.setRefreshToken(refresh)
                return access;
            } else {
                throw new Error('Failed to refresh access token');
            }
        } catch (error) {
            throw new Error('Failed to refresh access token');
        }
    };

// const {fetchAWSCredentials} = useCredentialsData()
    const signIn = async (username, password) => {
        try {
            const response = await fetch(`${apiUrl}/login`, {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify({username, password}),
            });

            if (response.ok) {
                const data = await response.json();
                const {access, refresh} = data;

                setAccessToken(access);
                setRefreshToken(refresh);
                Storage.setAccessToken(access)
                Storage.setRefreshToken(refresh)

                // Handle successful sign-in
                window.location.href = '/';
                console.log(`success ${data}`)

            } else {
                const data = await response.json();
                setErrorMessage(data);
            }
        } catch (error) {
            setErrorMessage('An error occurred while signing in.');
        }
    };

    const register = async (username, password) => {
        try {
            const response = await fetch(`${apiUrl}/register`, {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify({username, password}),
            });

            if (response.ok) {
                // const responseData = await response.json();
                // console.log('Registration successful:', responseData);
                navigate('/auth/signin');
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData);
            }
        } catch (error) {
            setErrorMessage('An error occurred while signing in.');
        }
    };
    // Function to handle user sign-out
    const signOut = () => {
        setAccessToken(null);
        setRefreshToken(null);
        Storage.removeAccessToken();
        Storage.removeRefreshToken();
        resetGlobalState();
        navigate('/auth/signin');
    };

    const refreshTokenAndRetry = async (remoteCallback) => {
        if (!Storage.getAccessToken()) {
            navigate('/auth/signin');
            return;
        }
        let response = await remoteCallback()
        if (response.status === 200) {
            return response.data;
        } else if (response.status === 401) {
            await refreshAccessToken();
            response = await remoteCallback()
        }
        return response;
    };

    return {
        accessToken,
        register,
        signIn,
        signOut,
        errorMessage,
        isLoggedIn,
        refreshTokenAndRetry
    };
};

