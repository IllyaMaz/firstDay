import express from 'express'
import bcrypt from 'bcryptjs';
import cors from 'cors'
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv'
import next from 'next'

dotenv.config()
const app = express()
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

app.use(express.json())
app.use(cors())

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

app.post('/api/register', async (req, res) => {
    const { email, password, name } = req.body;
    const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name } }});
    if (error) return res.status(400).json({ error: error.message });

    res.json({ data });
    
})

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body
    
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });
    if (error) {
        console.error("Ошибка аутентификации:", error.message);
        return res.status(400).json({ error: error.message });
    }
    
     res.json({ data });

})

app.get('/api/profile', async (req, res) => {
    
    const token = req.headers.authorization?.split(' ')[1]
    if (!token)  return res.status(400).json({ error: 'Unauthorized' })

    const { data, error } = await supabase.auth.getUser(token)
    if (error) return res.status(400).json({ error: error.message })

    res.json(data.user)

})

app.post('/api/logout', async (req, res) => {

    const { error } = await supabase.auth.signOut()
    if (error) return res.status(400).json({ error: error.message })

    res.json({ message: 'Logged out successfully' })

})

app.post('/api/reset-password', async (req, res) => {

    const { email } = req.body
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/forgotPassword`, 
    });
    if (error) return res.status(400).json({ error: error.message })

    res.json({ message: 'Password reset link sent' })

})

app.post('/api/change-password', async (req, res) => {
    const { password } = req.body
    const { error } = await supabase.auth.updateUser({ password });
    if (error) return res.status(400).json({ error: error.message })

    res.status(200).json({ success: true })
})

nextApp.prepare().then(() => {
    app.all('*', (req, res) => handle(req, res))
    app.listen(3000, () => console.log('Server running on port 3000'))
})

