'use client';

const LoadingPage = () => {
  return (
    <div className='flex items-center justify-center py-24'>
      <div className='animate-spin rounded-full h-32 w-32 border-b-4 border-blue-500'>
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  );
};
export default LoadingPage;
