export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-full p-4'>
      <h1 className='text-4xl font-normal mb-4 tracking-tight'>Welcome to Store Demo</h1>
      <p className='text-gray-400 text-lg leading-relaxed text-center max-w-2xl'>
        This is a demo of a store leveraging Next.js, Tailwind CSS, Redux, and TypeScript. All data is fetched from the{' '}
        <a href='https://fakestoreapi.com/' className='text-blue-500'>
          Fake Store API
        </a>
        .
      </p>
    </div>
  );
}
