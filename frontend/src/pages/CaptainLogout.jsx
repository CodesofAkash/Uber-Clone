import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CaptainLogout = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('captain-token');

    // Call logout function on component mount
    React.useEffect(() => {
        const handleLogout = async () => {
            try {
                await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                localStorage.removeItem('captain-token');
                toast.success('Logged out successfully');
                navigate('/captain/login');
            } catch (error) {
                console.error('Logout error:', error);
                // Even if logout fails on server, clear local storage
                localStorage.removeItem('captain-token');
                toast.error('Logout failed, but you have been logged out locally');
                navigate('/captain/login');
            }
        };
        
        handleLogout();
    }, [token, navigate]);

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='text-center'>
        <h2 className='text-xl font-medium mb-4'>Logging out...</h2>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto'></div>
      </div>
    </div>
  )
}

export default CaptainLogout
