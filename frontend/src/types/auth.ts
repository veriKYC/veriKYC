// UserResponse what /auth/login and /auth/register return:
export interface UserResponse {
    id: string
    email: string
    role: 'USER' | 'ADMIN' | 'REVIEWER'
    createdAt: string
}

 // AuthResponse — what /auth/login and /auth/register return:
export interface AuthResponse {
    accessToken: string
    tokenType: string
    expiresInSeconds: number
    user: UserResponse
}

 // ErrorResponse — what every failed request returns:
export interface ErrorResponse {
    timestamp: string
    status: number
    error: string
    message: string
    path: string
}