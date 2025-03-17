import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext'
import axios from 'axios';

const UserProtectedWrapper = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('user-token');
    const [isLoading, setIsLoading] = useState(true);

    const { user, setUser } = useContext(UserDataContext);


    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token]);

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((res) => {
        if(res.status === 200) {
            setUser(res.data.user);
            setIsLoading(false);
        }
    }).catch((err) => {
        localStorage.removeItem('user-token');
        navigate('/login');
    })


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
