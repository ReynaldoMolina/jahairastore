'use client';
 
import ErrorIcon from '@/app/ui/error/error.svg';
 
export default function Error({ error, reset}) {
  return (
    <main className="flex gap-1 h-full flex-col items-center justify-center">
      <div className='flex gap-2 items-center p-2 px-3 bg-red-100 dark:bg-red-900 rounded-xl'>
        <ErrorIcon className="size-7 text-red-600 dark:text-white" />
        <p className="text-center text-sm text-red-600 dark:text-white font-semibold text-wrap">Error</p>
      </div>
      <p className="text-center text-sm text-red-600 dark:text-red-400">{error.message}</p>
      <button
        className="mt-4 rounded-xl bg-green-600 px-4 py-2 text-sm text-white transition-colors hover:bg-green-700"
        onClick={() => reset()}
      >
        Reintentar
      </button>
    </main>
  );
}