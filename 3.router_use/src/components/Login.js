import React from 'react'

export default function Login(){
    function handleLogin(){
        localStorage.setItem('login', true)
    }
    function handleOut(){
        localStorage.setItem('login', false)
    }
    return (
        <div>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleOut}>Logout</button>
        </div>
    )
}