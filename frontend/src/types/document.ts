export type DocumentStatus = 'QUEUED' | 'PROCESSING' | 'VERIFIED' | 'FAILED' | 'REVIEW_NEEDED'
export type DocumentType = 'PAN' | 'AADHAAR' | 'PASSPORT' | 'DL' | 'CHEQUE'

export interface DocumentSummary {
    id: string
    documentType: DocumentType | null
    status: DocumentStatus
    createdAt: string
    updatedAt: string
}

export interface DocumentDetail extends DocumentSummary {
    imageUrl: string
    selfieUrl: string | null
}
