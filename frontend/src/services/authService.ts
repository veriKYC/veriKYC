import axios from 'axios'
import type { LoginRequest, LoginResponse } from '../types/auth'

const api = axios.create({
  baseURL: 'http://localhost:8080',
})

export async function login(email: string, password: string): Promise<LoginResponse> {
  const payload: LoginRequest = { email, password }
  const { data } = await api.post<LoginResponse>('/api/v1/auth/login', payload)
  return data
}
