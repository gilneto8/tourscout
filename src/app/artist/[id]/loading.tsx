'use client';
export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-1/3 rounded bg-gray-200"></div>
        <div className="space-y-2">
          <div className="h-4 rounded bg-gray-200"></div>
          <div className="h-4 rounded bg-gray-200"></div>
          <div className="h-4 w-5/6 rounded bg-gray-200"></div>
        </div>
        <div className="h-32 rounded bg-gray-200"></div>
      </div>
    </div>
  );
}
