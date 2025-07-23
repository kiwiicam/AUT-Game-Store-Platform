import React from 'react';
import { useNavigate } from 'react-router';
function LogOutButton() {
    const navigate = useNavigate();
    
    function onLogout() {
        localStorage.removeItem('email');
        localStorage.removeItem('uid');  
        navigate("/signin");        
    }

    return (
        <button button onClick={() => onLogout()}>
            Log Out
        </button>
    )
};

export default LogOutButton;