import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name })
        });
        const data = await res.json();
        if (data.error) return alert(data.error);
        router.push('/login');
    };

    return (
        <form onSubmit={handleRegister}>
            <input type="text" placeholder="Имя" value={name} onChange={e => setName(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit">Зарегистрироваться</button>
            <a href='/login'>LogIn</a>
        </form>
    );
}