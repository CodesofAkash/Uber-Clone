import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainProtectedWrapper = ({ children }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const { captain, setCaptain } = useContext(CaptainDataContext);
    const token = localStorage.getItem('captain-token');

    useEffect(() => {
        if (!token) {
            navigate('/captain/login');
        }
    }, [token]);

        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if(res.status === 200) {
                setCaptain(res.data.captain);
                setIsLoading(false);
            }
        }).catch((err) => {
            localStorage.removeItem('captain-token');
            navigate('/captain/login');
        })


    if(isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <>
            {children }
        </>
    );
};

export default CaptainProtectedWrapper;
