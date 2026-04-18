import { useState } from "react";
import { login } from '../services/authService'
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom'
import { saveToken } from '../utils/tokenStorage'

export default function LoginPage() {
    const navigate = useNavigate()

=======

export default function LoginPage() {
>>>>>>> 2acabeb6637c78c646df90d024b85d385a4454d5
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)
        setLoading(true)
        try {
            const response = await login(email, password)
<<<<<<< HEAD
             saveToken(response.accessToken)
             navigate('/dashboard')
=======
            console.log('success', response)
>>>>>>> 2acabeb6637c78c646df90d024b85d385a4454d5
        } catch (err: any) {
            setError(err.response?.data?.message ?? 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow">
                <h1 className="text-2xl font-semibold mb-6">Login</h1>

                {error && (
                    <p className="text-red-500 text-sm mb-4">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                </form>
            </div>

        </div>
    )
}
