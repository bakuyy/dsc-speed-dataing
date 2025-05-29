import React from 'react';

const Page = () => {
  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-center text-md mb-6">Let’s start your journey to find soulmate :D?</h1>

      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex flex-col">
          <label className="mb-1">Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            className="px-4 py-2 rounded-md bg-gray-200 focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Name</label>
          <input
            type="text"
            placeholder="Name"
            className="px-4 py-2 rounded-md bg-gray-200 focus:outline-none"
          />
        </div>
      </div>

      <div className="w-full max-w-md flex flex-col gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Question ${index + 1}`}
            className="w-full px-4 py-2 rounded-md bg-gray-200 focus:outline-none"
          />
        ))}
      </div>

    </div>
  );
};

export default Page;
