// app/artist/[id]/error.tsx
'use client';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-4">
      <h2 className="mb-4 text-xl font-bold">Something went wrong!</h2>
      <button onClick={reset} className="rounded bg-blue-500 px-4 py-2 text-white">
        Try again
      </button>
    </div>
  );
}
