export interface UserResponse {
    id: string
    email: string
    role: 'USER' | 'ADMIN' | 'REVIEWER'
    createdAt: string
}

export interface AuthResponse {
    accessToken: string
    tokenType: string
    expiresInSeconds: number
    user: UserResponse
}

export interface ErrorResponse {
    timestamp: string
    status: number
    error: string
    message: string
    path: string
}
