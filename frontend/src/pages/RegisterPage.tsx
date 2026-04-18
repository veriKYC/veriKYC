import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../services/authService'
import AuthForm from '../components/AuthForm'

export default function RegisterPage() {
    const navigate = useNavigate()
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(email: string, password: string) {
        setError(null)
        setLoading(true)
        try {
            await register(email, password)
            navigate('/login')
        } catch (err: any) {
            setError(err.response?.data?.message ?? 'Registration failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <AuthForm mode="register" onSubmit={handleSubmit} error={error} loading={loading} />
        </div>
    )
}
