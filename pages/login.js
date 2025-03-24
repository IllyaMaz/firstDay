import { useRouter } from "next/router"
import { useState } from "react"

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleLogin = async (e) => {
        e.preventDefault()

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        const data = await res.json()
        
        if (data.error) return alert(data.error)
            console.log(data);
            
        localStorage.setItem('token', data.data.session.access_token)
        router.push('/home')
    }

    return (
        <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required/>
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required/>
            <button type="submit">Log In</button>
            <a href="/register">Registration</a>
            <a href="/resetPassword">Reset Password</a>
        </form>
    )
}