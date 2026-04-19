import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { uploadDocument } from '../services/documentService'

export default function UploadPage() {
    const navigate = useNavigate()
    const [document, setDocument] = useState<File | null>(null)
    const [selfie, setSelfie] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const docRef = useRef<HTMLInputElement>(null)
    const selfieRef = useRef<HTMLInputElement>(null)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!document) return
        setError(null)
        setLoading(true)
        try {
            const result = await uploadDocument(document, selfie ?? undefined)
            navigate(`/documents/${result.id}`)
        } catch (err: any) {
            setError(err.response?.data?.message ?? 'Upload failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-xl shadow p-8">
                <h1 className="text-2xl font-semibold mb-2">Upload Document</h1>
                <p className="text-sm text-gray-500 mb-6">
                    Upload an identity document (PAN / Aadhaar / Passport / DL / Cheque)
                </p>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Document */}
                    <div
                        onClick={() => docRef.current?.click()}
                        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition
                            ${document ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
                    >
                        <input
                            ref={docRef}
                            type="file"
                            accept="image/jpeg,image/png"
                            className="hidden"
                            onChange={e => setDocument(e.target.files?.[0] ?? null)}
                        />
                        {document ? (
                            <p className="text-sm font-medium text-blue-700">{document.name}</p>
                        ) : (
                            <>
                                <p className="text-sm font-medium text-gray-700">Click to select document</p>
                                <p className="text-xs text-gray-400 mt-1">JPEG or PNG, max 10 MB</p>
                            </>
                        )}
                    </div>

                    {/* Selfie (optional) */}
                    <div
                        onClick={() => selfieRef.current?.click()}
                        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition
                            ${selfie ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-400'}`}
                    >
                        <input
                            ref={selfieRef}
                            type="file"
                            accept="image/jpeg,image/png"
                            className="hidden"
                            onChange={e => setSelfie(e.target.files?.[0] ?? null)}
                        />
                        {selfie ? (
                            <p className="text-sm font-medium text-green-700">{selfie.name}</p>
                        ) : (
                            <p className="text-sm text-gray-400">+ Add selfie for face match (optional)</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={!document || loading}
                        className="bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Uploading...' : 'Submit for verification'}
                    </button>
                </form>
            </div>
        </div>
    )
}
