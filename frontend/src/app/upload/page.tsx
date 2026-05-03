"use client";

import { useState, type FormEvent } from "react";
import { uploadResumeFile, type UploadResponse } from "@/lib/backend";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<UploadResponse | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      setError("Please select a resume file first.");
      return;
    }

    setError(null);
    setIsUploading(true);
    setResult(null);

    try {
      const uploadResult = await uploadResumeFile(selectedFile);
      setResult(uploadResult);
    } catch (uploadError: unknown) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#02040a] text-white px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <a href="/" className="inline-flex items-center text-sm text-gray-400 hover:text-white transition mb-8">
          ← Back to home
        </a>

        <section className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#a855f7] mb-4">Real Resume Upload</p>
          <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight mb-4">Upload a resume and extract real text</h1>
          <p className="text-gray-400 max-w-2xl mb-8 leading-relaxed">
            This sends your file to the FastAPI backend, extracts the content from the actual document, and returns the parsed text preview. Supported formats are PDF, DOCX, PPTX, TXT, and Markdown.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="rounded-2xl border border-dashed border-white/15 bg-black/20 p-5">
              <input
                type="file"
                accept=".pdf,.docx,.pptx,.txt,.md"
                onChange={(event) => {
                  setSelectedFile(event.target.files?.[0] ?? null);
                  setError(null);
                  setResult(null);
                }}
                className="block w-full text-sm text-gray-300 file:mr-4 file:rounded-full file:border-0 file:bg-[#a855f7] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#9333ea]"
              />
              <p className="mt-3 text-xs text-gray-500">
                {selectedFile ? `Selected file: ${selectedFile.name}` : "Choose a file to upload."}
              </p>
            </div>

            <button
              type="submit"
              disabled={isUploading}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] px-6 py-3 text-sm font-black uppercase tracking-widest text-white disabled:opacity-50"
            >
              {isUploading ? "Uploading..." : "Upload Resume"}
            </button>
          </form>

          {error && (
            <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
              {error}
            </div>
          )}

          {result && (
            <div className="mt-6 rounded-2xl border border-green-500/20 bg-green-500/10 p-5">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-white">Upload successful</h2>
                <span className="text-xs uppercase tracking-[0.2em] text-green-300">{result.fileName || "Uploaded file"}</span>
              </div>
              <p className="mt-3 text-sm text-gray-300">
                The backend extracted real text from the file. Preview:
              </p>
              <pre className="mt-4 max-h-72 overflow-auto whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/30 p-4 text-xs text-gray-300">
                {result.text.slice(0, 4000)}
              </pre>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
