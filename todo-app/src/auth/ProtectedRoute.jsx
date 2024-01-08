import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState();
    const navigate = useNavigate();
    useEffect(()=> {
        const localUser = localStorage.getItem('todoUser'); 
        const userObj = JSON.parse(localUser);
        if (!userObj) {
            setIsLoggedIn(false);
            navigate("/");
            
        }
        setIsLoggedIn(true);

    }, [])



    return (
       <> 
       {isLoggedIn ? children : null }



       </>
    );
}

export default ProtectedRoute;