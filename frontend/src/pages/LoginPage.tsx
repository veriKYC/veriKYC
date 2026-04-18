import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/authService'
import { saveToken } from '../utils/tokenStorage'
import AuthForm from '../components/AuthForm'

export default function LoginPage() {
    const navigate = useNavigate()
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(email: string, password: string) {
        setError(null)
        setLoading(true)
        try {
            const response = await login(email, password)
            saveToken(response.accessToken)
            navigate('/dashboard')
        } catch (err: any) {
            setError(err.response?.data?.message ?? 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <AuthForm mode="login" onSubmit={handleSubmit} error={error} loading={loading} />
        </div>
    )
}
