import type { FileMetadata } from '../../shared/types';
import { formatFileSize, formatRelativeTime } from '../utils/format';

const API_URL = import.meta.env.PROD ? '' : 'http://localhost:3001';

interface FileListProps {
  files: FileMetadata[];
  loading: boolean;
  onDelete: (id: string) => void;
}

export function FileList({ files, loading, onDelete }: FileListProps) {
  if (loading) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        Loading files...
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No files uploaded yet
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {files.map((file) => (
        <FileItem key={file.id} file={file} onDelete={onDelete} />
      ))}
    </div>
  );
}

interface FileItemProps {
  file: FileMetadata;
  onDelete: (id: string) => void;
}

function FileItem({ file, onDelete }: FileItemProps) {
  const handleDownload = () => {
    window.location.href = `${API_URL}/api/files/${file.id}`;
  };

  const handleDelete = () => {
    onDelete(file.id);
  };

  return (
    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
      <div className="flex-1 min-w-0 mr-4">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
          {file.name}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {formatFileSize(file.size)} • {formatRelativeTime(file.uploadedAt)}
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleDownload}
          className="px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
        >
          Download
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
