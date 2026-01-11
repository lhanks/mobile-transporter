import { useSocket } from './hooks/useSocket';
import { useFileSync } from './hooks/useFileSync';
import { useTheme } from './hooks/useTheme';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FileUpload } from './components/FileUpload';
import { FileList } from './components/FileList';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  const { connected, deviceCount } = useSocket();
  const { files, loading, deleteFile } = useFileSync();
  const { isDark, toggleTheme } = useTheme();

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12 transition-colors">
        <Header connected={connected} isDark={isDark} onToggleTheme={toggleTheme} />
        <main className="container mx-auto px-4 py-8 max-w-2xl">
          <FileUpload />
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Shared Files
            </h2>
            <FileList files={files} loading={loading} onDelete={deleteFile} />
          </div>
        </main>
        <Footer deviceCount={deviceCount} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
