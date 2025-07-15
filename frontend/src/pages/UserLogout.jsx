import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const UserLogout = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('user-token');

    // Call logout function on component mount
    React.useEffect(() => {
        const handleLogout = async () => {
            try {
                await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                localStorage.removeItem('user-token');
                toast.success('Logged out successfully');
                navigate('/login');
            } catch (error) {
                console.error('Logout error:', error);
                // Even if logout fails on server, clear local storage
                localStorage.removeItem('user-token');
                toast.error('Logout failed, but you have been logged out locally');
                navigate('/login');
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

export default UserLogout
