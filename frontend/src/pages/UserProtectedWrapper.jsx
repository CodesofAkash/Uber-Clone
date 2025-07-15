import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext'
import axios from 'axios';
import toast from 'react-hot-toast';

const UserProtectedWrapper = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('user-token');
    const [isLoading, setIsLoading] = useState(true);

    const { setUser } = useContext(UserDataContext);

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchUserProfile = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if(res.status === 200) {
                    setUser(res.data);
                    setIsLoading(false);
                }
            } catch (err) {
                console.error('Error fetching user profile:', err);
                localStorage.removeItem('user-token');
                toast.error('Session expired. Please log in again.');
                navigate('/login');
            }
        };

        fetchUserProfile();
    }, [token, navigate, setUser]);


    if(isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <>
            {children}
        </>
    );
};

export default UserProtectedWrapper;
