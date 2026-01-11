import { useState, useRef, useCallback, DragEvent, ChangeEvent } from 'react';
import { uploadFile, type UploadProgress } from '../services/uploadService';

interface UploadItem {
  id: string;
  name: string;
  progress: number;
  status: 'uploading' | 'done' | 'error';
  error?: string;
}

export function FileUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(async (files: File[]) => {
    setMessage(null);

    // Process files sequentially
    for (const file of files) {
      const id = `${Date.now()}-${file.name}`;

      // Add to upload queue
      setUploads((prev) => [
        ...prev,
        { id, name: file.name, progress: 0, status: 'uploading' },
      ]);

      try {
        await uploadFile(file, (progress: UploadProgress) => {
          setUploads((prev) =>
            prev.map((u) =>
              u.id === id ? { ...u, progress: progress.percent } : u
            )
          );
        });

        // Mark as done
        setUploads((prev) =>
          prev.map((u) =>
            u.id === id ? { ...u, progress: 100, status: 'done' } : u
          )
        );

        setMessage({ type: 'success', text: `${file.name} uploaded successfully` });
      } catch (error) {
        setUploads((prev) =>
          prev.map((u) =>
            u.id === id
              ? { ...u, status: 'error', error: (error as Error).message }
              : u
          )
        );
        setMessage({
          type: 'error',
          text: `Failed to upload ${file.name}: ${(error as Error).message}`,
        });
      }
    }

    // Clear completed uploads after a delay
    setTimeout(() => {
      setUploads((prev) => prev.filter((u) => u.status === 'uploading'));
    }, 3000);
  }, []);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
      e.target.value = ''; // Reset input
    }
  };

  return (
    <div className="space-y-3">
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-colors duration-200
          ${isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }
        `}
      >
        <div className="space-y-2">
          <div className="text-4xl">📁</div>
          <p className="text-gray-600">
            Drag files here or <span className="text-blue-600">click to select</span>
          </p>
          <p className="text-xs text-gray-400">Max file size: 100MB</p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleInputChange}
          className="hidden"
        />
      </div>

      {/* Upload progress */}
      {uploads.length > 0 && (
        <div className="space-y-2">
          {uploads.map((upload) => (
            <div key={upload.id} className="bg-white rounded border p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-700 truncate">{upload.name}</span>
                <span className="text-xs text-gray-500">
                  {upload.status === 'uploading' && `${Math.round(upload.progress)}%`}
                  {upload.status === 'done' && '✓'}
                  {upload.status === 'error' && '✗'}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    upload.status === 'error'
                      ? 'bg-red-500'
                      : upload.status === 'done'
                      ? 'bg-green-500'
                      : 'bg-blue-500'
                  }`}
                  style={{ width: `${upload.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Status message */}
      {message && (
        <div
          className={`p-3 rounded text-sm ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
