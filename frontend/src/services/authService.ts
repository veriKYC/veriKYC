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

export async function login(email: string, password: string): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(`${BASE_URL}/auth/login`, {
        email, password
    })
    return response.data
}
