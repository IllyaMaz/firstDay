import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Profile() {
    const [user, setUser] = useState(null)
    const router = useRouter()

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token')
            if (!token) return router.push('/login')
            const res = await fetch('/api/profile', { headers : { Authorization: `Bearer ${token}` } })
            const data = await res.json()
            if (data.error) return router.push('/login')
            setUser(data)
        }
        fetchProfile()
    }, [])

    const handleLogout = async () => {
        await fetch('/logout', { method: 'POST' });
        localStorage.removeItem('token');
        router.push('/login');
    };

    return user ? ( 
        <div>
            <h1>Профиль</h1>
            <p>Имя: {user.user_metadata.name}</p>
            <p>Email: {user.email}</p>
            <button onClick={handleLogout}>Выйти</button>
        </div>
    ) : <p>Загрузка...</p>
}