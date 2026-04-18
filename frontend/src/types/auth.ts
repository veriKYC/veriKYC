<<<<<<< HEAD
export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  tokenType: string
}

export interface RegisterRequest {
  email: string
  password: string
  fullName: string
}
=======
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
>>>>>>> 2acabeb6637c78c646df90d024b85d385a4454d5
