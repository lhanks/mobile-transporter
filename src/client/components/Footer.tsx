interface FooterProps {
  deviceCount: number;
}

export function Footer({ deviceCount }: FooterProps) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-2">
      <div className="container mx-auto max-w-2xl text-center text-sm text-gray-500">
        {deviceCount} device{deviceCount !== 1 ? 's' : ''} connected
      </div>
    </footer>
  );
}
