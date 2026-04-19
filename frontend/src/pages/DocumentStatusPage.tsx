import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getDocumentById } from '../services/documentService'
import type { DocumentDetail, DocumentStatus } from '../types/document'

const STEPS: DocumentStatus[] = ['QUEUED', 'PROCESSING', 'VERIFIED']
const TERMINAL: DocumentStatus[] = ['VERIFIED', 'FAILED', 'REVIEW_NEEDED']

const STATUS_LABEL: Record<DocumentStatus, string> = {
    QUEUED:        'Queued',
    PROCESSING:    'Processing',
    VERIFIED:      'Verified',
    FAILED:        'Failed',
    REVIEW_NEEDED: 'Review needed',
}

const STATUS_COLOR: Record<DocumentStatus, string> = {
    QUEUED:        'text-gray-500',
    PROCESSING:    'text-blue-600',
    VERIFIED:      'text-green-600',
    FAILED:        'text-red-600',
    REVIEW_NEEDED: 'text-yellow-600',
}

function StepIndicator({ status }: { status: DocumentStatus }) {
    const currentStep = STEPS.indexOf(status === 'FAILED' || status === 'REVIEW_NEEDED' ? 'PROCESSING' : status)

    return (
        <div className="flex items-center gap-2 my-6">
            {STEPS.map((step, i) => {
                const done = i < currentStep || status === 'VERIFIED'
                const active = i === currentStep && status !== 'VERIFIED'
                const failed = (status === 'FAILED' || status === 'REVIEW_NEEDED') && i === 1
                return (
                    <div key={step} className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold
                            ${failed ? 'bg-red-100 text-red-600 border-2 border-red-400' :
                              done   ? 'bg-green-500 text-white' :
                              active ? 'bg-blue-500 text-white animate-pulse' :
                                       'bg-gray-200 text-gray-400'}`}>
                            {i + 1}
                        </div>
                        <span className={`text-xs ${active ? 'font-medium text-blue-600' : 'text-gray-400'}`}>
                            {STATUS_LABEL[step]}
                        </span>
                        {i < STEPS.length - 1 && (
                            <div className={`h-px w-8 ${done ? 'bg-green-400' : 'bg-gray-200'}`} />
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default function DocumentStatusPage() {
    const { id } = useParams<{ id: string }>()
    const [doc, setDoc] = useState<DocumentDetail | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!id) return

        async function fetchDoc() {
            try {
                const data = await getDocumentById(id!)
                setDoc(data)
            } catch {
                setError('Could not load document.')
            }
        }

        fetchDoc()

        const interval = setInterval(async () => {
            try {
                const data = await getDocumentById(id!)
                setDoc(data)
                if (TERMINAL.includes(data.status)) clearInterval(interval)
            } catch {
                clearInterval(interval)
            }
        }, 4000)

        return () => clearInterval(interval)
    }, [id])

    if (error) return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-red-500">{error}</p>
        </div>
    )

    if (!doc) return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-gray-400 text-sm">Loading…</p>
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-xl shadow p-8">
                <h1 className="text-2xl font-semibold mb-1">Verification Status</h1>
                <p className="text-xs text-gray-400 mb-4 font-mono">{doc.id}</p>

                <div className={`text-lg font-semibold ${STATUS_COLOR[doc.status]}`}>
                    {STATUS_LABEL[doc.status]}
                    {!TERMINAL.includes(doc.status) && (
                        <span className="ml-2 text-sm font-normal text-gray-400">polling every 4s…</span>
                    )}
                </div>

                <StepIndicator status={doc.status} />

                <div className="text-xs text-gray-400 space-y-1">
                    {doc.documentType && (
                        <p>Type: <span className="font-medium text-gray-700">{doc.documentType}</span></p>
                    )}
                    <p>Submitted: {new Date(doc.createdAt).toLocaleString()}</p>
                    <p>Updated: {new Date(doc.updatedAt).toLocaleString()}</p>
                </div>

                <div className="mt-6 flex gap-3">
                    <Link to="/upload" className="text-sm text-blue-600 hover:underline">
                        Upload another
                    </Link>
                    <Link to="/dashboard" className="text-sm text-gray-400 hover:underline">
                        Dashboard
                    </Link>
                </div>
            </div>
        </div>
    )
}
