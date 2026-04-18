<<<<<<< HEAD
import axios from 'axios'
import type { LoginRequest, LoginResponse } from '../types/auth'

const api = axios.create({
  baseURL: 'http://localhost:8080',
})

export async function login(email: string, password: string): Promise<LoginResponse> {
  const payload: LoginRequest = { email, password }
  const { data } = await api.post<LoginResponse>('/api/v1/auth/login', payload)
  return data
=======
import axios from "axios";
import type { AuthResponse } from "../types/auth";

const BASE_URL = 'http://localhost:8080/api/v1'

export async function register(email: string, password: string): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(`${BASE_URL}/auth/register`, {
        email,
        password
    });
    return response.data;
}

export async function login(email: string, password: string):
    Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(`${BASE_URL}/auth/login`, {
        email, password
    })
    return response.data
>>>>>>> 2acabeb6637c78c646df90d024b85d385a4454d5
}
