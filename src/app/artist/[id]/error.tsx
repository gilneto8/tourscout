// app/artist/[id]/error.tsx
'use client';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className='flex flex-col items-center justify-center min-h-[50vh] p-4'>
      <h2 className='text-xl font-bold mb-4'>Something went wrong!</h2>
      <button onClick={reset} className='px-4 py-2 bg-blue-500 text-white rounded'>
        Try again
      </button>
    </div>
  );
}
