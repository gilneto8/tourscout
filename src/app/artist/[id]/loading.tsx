'use client';
export default function Loading() {
  return (
    <div className='max-w-4xl mx-auto p-4'>
      <div className='animate-pulse space-y-4'>
        <div className='h-8 bg-gray-200 rounded w-1/3'></div>
        <div className='space-y-2'>
          <div className='h-4 bg-gray-200 rounded'></div>
          <div className='h-4 bg-gray-200 rounded'></div>
          <div className='h-4 bg-gray-200 rounded w-5/6'></div>
        </div>
        <div className='h-32 bg-gray-200 rounded'></div>
      </div>
    </div>
  );
}
