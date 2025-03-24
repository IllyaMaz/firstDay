import { useState } from "react";
import { useRouter } from "next/router";

export default function ForgotPassword() {
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleChangePassword = async (e) => {
        e.preventDefault();

        const data = await fetch('/api/change-password', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ password: password })
        })
        if (data.error) alert(data.error)
            router.push('/login')
    };

    return (
        <div>
            <h2>Введите новый пароль</h2>
            <form onSubmit={handleChangePassword}>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Новый пароль" 
                    required 
                />
                <button type="submit">Сменить пароль</button>
            </form>
        </div>
    );
}
