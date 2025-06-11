import React from 'react';

const MatchComponent = ({ isViewMatch = false }) => {
  return (
    <div className="w-full min-h-[400px] bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 rounded-2xl shadow-lg overflow-hidden">
      {/* Hero Image Section */}
      <div className="w-full h-48 bg-gradient-to-r from-blue-400 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url(https://i.pinimg.com/originals/79/5c/cb/795ccbc6b43baffe39982b297c882f70.gif)] bg-opacity-20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          {/* <svg className="w-24 h-24 text-white opacity-80" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg> */}
          {/* <img src="https://media.discordapp.net/attachments/1281340189729620090/1380702390822637610/heart_hands_echo_blue.png?ex=684ac58e&is=6849740e&hm=95793b227c5aaccc59f94285c998b5ffac72899012945624051fe97b599e4a94&=&format=webp&quality=lossless&width=1852&height=1310" alt="" /> */}
        </div>
        {/* Decorative elements */}
        <div className="absolute top-4 left-4 w-8 h-8 bg-white bg-opacity-20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-6 right-6 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-1/2 right-8 w-6 h-6 bg-white bg-opacity-15 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      {/* Content Section */}
      <div className="flex flex-col justify-center items-center p-8">
        {isViewMatch ? (
          <div className="text-center animate-pulse">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
              Matching in Session!
            </h2>
            <p className="text-blue-700 text-lg font-medium">
              You can now <a href="" className='text-blue-900 underline'>view</a> your match!
            </p>
          </div>
        ) : (
          <div className="text-center">
            <div className="mb-6">
              {/* Custom CSS spinning animation */}
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin"></div>
                <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-blue-400 animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 font-plus-jakarta-sans">
              Finding Your Perfect Match
            </h2>
            
            <p className="text-gray-600 text-base sm:text-lg font-medium italic font-plus-jakarta-sans mb-4">
              Please wait while we connect you...
            </p>
            
            {/* Animated dots */}
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchComponent;