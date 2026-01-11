interface FooterProps {
  deviceCount: number;
}

export function Footer({ deviceCount }: FooterProps) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2 transition-colors">
      <div className="container mx-auto max-w-2xl text-center text-sm text-gray-500 dark:text-gray-400">
        {deviceCount} device{deviceCount !== 1 ? 's' : ''} connected
      </div>
    </footer>
  );
}
