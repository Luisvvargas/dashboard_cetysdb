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
        <div className='flex flex-col h-screen justify-center items-center'>
            <h1 className='text-4xl'>Welcome</h1>
            {user && <p className='text-2xl'>Hello, {user.nombre}</p>}
        </div>
    );
}

export default Welcome;