import React from 'react'
import PageLoader from '../components/PageLoader'
import { useAuthStore } from '../store/useAuthStore'

const ChatPage = () => {

    const { logout } = useAuthStore();

    return (
        <div className='text-red-500 z-100'>
            <h1> chat app</h1>
            <button onClick={logout}> Logout</button>
        </div>
    )
}

export default ChatPage
