export default function ContactPage() {
  return (
    <div className='max-w-xl mx-auto bg-white/90 rounded-xl shadow-lg p-8 mt-10 flex flex-col gap-6'>
      <h1 className='text-3xl font-semibold text-blue-700 mb-2 text-center'>
        Contact Us
      </h1>
      <p className='text-gray-600 text-center mb-4'>
        Please reach out to us via the form below.
      </p>
      <form className='flex flex-col gap-4'>
        <div>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Name
          </label>
          <input
            id='name'
            name='name'
            type='text'
            required
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
          />
        </div>
        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Email
          </label>
          <input
            id='email'
            name='email'
            type='email'
            required
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
          />
        </div>
        <div>
          <label
            htmlFor='phone'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Phone Number
          </label>
          <input
            id='phone'
            name='phone'
            type='tel'
            pattern='[0-9\-\+\s\(\)]*'
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
          />
        </div>
        <div>
          <label
            htmlFor='message'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Message
          </label>
          <textarea
            id='message'
            name='message'
            rows={4}
            required
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
          />
        </div>
        <button
          type='submit'
          className='w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors'
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
