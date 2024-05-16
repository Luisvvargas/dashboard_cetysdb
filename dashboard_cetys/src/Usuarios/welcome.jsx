import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function welcome() {

    const navigate = useNavigate();

    useEffect(() => {
        // Navigate back to Unumber after 4 seconds
        const timer = setTimeout(() => {
            navigate('/Usuario');
        }, 2000);

        // Clean up the timer when the component unmounts
        return () => clearTimeout(timer);
    }, [navigate]);



    return (
        <div>welcome</div>
    )
}

export default welcome