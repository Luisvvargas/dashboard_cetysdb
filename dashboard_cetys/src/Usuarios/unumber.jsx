import React, { useRef } from 'react';

function Unumber() {
  // Create a ref for the input
  const inputRef = useRef(null);

  // Function to focus input when the span is clicked
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // Focus the input field
    }
  };

  return (
    <div className='flex flex-col h-screen justify-center items-center'>
      <div className='flex justify-center w-full mb-3 relative'>
        <input ref={inputRef} type="text" className='font-[Poppins, sans-serif] text-[150px] text-center py-4 border-2 rounded-lg border-gray-600 border-opacity-50 outline-none focus:border-blue-500 transition duration-200 px-6'/>
        <span onClick={focusInput} className='text-[100px] text-gray-600 absolute transition duration-200 input-text  p-0' style={{ left: '650px', top: '55px' }}>Matrícula</span>
      </div>

      <div className='flex justify-center w-full mt-8'>
        <button className='bg-[#50C878] text-gray-800 rounded-[10px] px-16 py-6 font-[Poppins, sans-serif] text-[50px] hover:bg-opacity-90 hover:text-gray-700 hover:scale-90 transitions shadow-xl'>Enter</button>
      </div>

      <div className='absolute bottom-0 right-0 p-7'>
        <i class="fa-solid fa-angle-up fa-3x"></i>
      </div>
    </div>
  );
}

export default Unumber;