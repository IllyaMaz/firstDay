import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Home() {
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
    
    return user ? (
        <div>
            Hello {user.user_metadata.name}
            <a href="/profile">Profile</a>
        </div>
    ) : <p>Загрузка...</p>
}