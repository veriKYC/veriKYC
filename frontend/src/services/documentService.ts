import axios from 'axios'
import type { DocumentDetail, DocumentSummary } from '../types/document'
import { getToken } from '../utils/tokenStorage'

const BASE_URL = 'http://localhost:8080/api/v1'

function authHeaders() {
    return { Authorization: `Bearer ${getToken()}` }
}

export async function getDocumentById(id: string): Promise<DocumentDetail> {
    const response = await axios.get<DocumentDetail>(`${BASE_URL}/documents/${id}`, {
        headers: authHeaders(),
    })
    return response.data
}

export async function uploadDocument(document: File, selfie?: File): Promise<DocumentSummary> {
    const form = new FormData()
    form.append('document', document)
    if (selfie) form.append('selfie', selfie)

    const response = await axios.post<DocumentSummary>(`${BASE_URL}/documents`, form, {
        headers: authHeaders(),
    })
    return response.data
}
