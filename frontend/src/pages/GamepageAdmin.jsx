import React from 'react'
import '../css/GamepageAdmin.css'
import { useParams } from 'react-router';
import { useEffect } from 'react';

function GamepageAdmin() {
    const { gameName } = useParams();

    useEffect(() => {
        if (!gameName) return;
    }, [gameName])

    return (
        <div>
            GamepageAdmin
            Admin preview page of the game that  has been requested to upload
        </div>
    )
}

export default GamepageAdmin