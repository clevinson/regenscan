export function KeyColumn({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-gray-500 truncate col-span-2 md:col-span-1 py-1">
      {children}
    </div>
  );
}

export function ValueColumn({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-gray-800 col-span-6 md:col-span-4 py-1">
      {children}
    </div>
  );
}

export function InfoTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-8 md:grid-cols-5 gap-1">{children}</div>
  );
}
