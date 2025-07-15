import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';
import toast from 'react-hot-toast';

const CaptainProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { setCaptain } = useContext(CaptainDataContext);
  const token = localStorage.getItem('captain-token');

  useEffect(() => {
    if (!token) {
      navigate('/captain/login');
      return;
    }

    const fetchCaptain = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          setCaptain(res.data);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Error fetching captain profile:', err);
        localStorage.removeItem('captain-token');
        toast.error('Session expired. Please log in again.');
        navigate('/captain/login');
      }
    };

    fetchCaptain();
  }, [token, navigate, setCaptain]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {children}
    </>
  );
};

export default CaptainProtectedWrapper;
