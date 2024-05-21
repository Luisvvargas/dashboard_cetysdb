import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext.jsx'; // Import UserContext

function Welcome() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext); // Get user from context

    useEffect(() => {
        // Navigate back to Unumber after 4 seconds
        const timer = setTimeout(() => {
            navigate('/Usuario');
        }, 2000);

        // Clean up the timer when the component unmounts
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className='flex flex-col h-screen justify-center items-center bg-gray-100'>
            <div className='bg-white shadow-lg rounded-2xl p-12 text-center'>
                <h1 className='text-5xl font-extrabold text-gray-900 mb-4'>
                    Welcome!
                </h1>
                {user && (
                    <p className='text-2xl text-gray-700'>
                        {`Hello, ${user.nombre}`}
                    </p>
                )}
                
            </div>
        </div>
    );
}

export default Welcome;