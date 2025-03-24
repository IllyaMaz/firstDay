import { useState } from "react";

export default function ResetPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleReset = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const data = await res.json();
        if (data.error) return alert(data.error);
        setMessage('Ссылка для сброса пароля отправлена на email');
    };

    return (
        <form onSubmit={handleReset}>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <button type="submit">Сбросить пароль</button>
            {message && <p>{message}</p>}
        </form>
    );
}