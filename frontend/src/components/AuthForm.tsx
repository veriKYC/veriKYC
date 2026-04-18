import { useState } from 'react'
import { Link } from 'react-router-dom'

interface AuthFormProps {
    mode: 'login' | 'register'
    onSubmit: (email: string, password: string) => Promise<void>
    error: string | null
    loading: boolean
}

export default function AuthForm({ mode, onSubmit, error, loading }: AuthFormProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        onSubmit(email, password)
    }

    return (
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow">
            <h1 className="text-2xl font-semibold mb-6">
                {mode === 'login' ? 'Login' : 'Create account'}
            </h1>

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
                    {loading
                        ? (mode === 'login' ? 'Logging in...' : 'Creating account...')
                        : (mode === 'login' ? 'Login' : 'Create account')
                    }
                </button>
            </form>

            <p className="text-sm text-gray-500 mt-4 text-center">
                {mode === 'login' ? (
                    <>Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link></>
                ) : (
                    <>Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link></>
                )}
            </p>
        </div>
    )
}
