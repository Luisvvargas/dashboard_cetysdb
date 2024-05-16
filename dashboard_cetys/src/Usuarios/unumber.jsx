import React, { useState, useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import '../index.css'
import { useNavigate } from 'react-router-dom';


function Unumber() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);  // Controls the visibility of the keypad
  const [isactive, setisactive] = useState('');

  const keyinpad = (key) => {
    if(inputRef.current){
      inputRef.current.value += key;
      inputRef.current.focus();

    }
  };


  const deletee = () => {
    if (inputRef.current) {
      inputRef.current.value = inputRef.current.value.slice(0, -1); // Remove the last character
    
    }
  };

  const deleteall = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.blur();
    }
  }


  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // Focus the input field
    }
  };

  const handleKeydown = (event) => {
    console.log('keypressed', event.key);
    if (event.key === 'Enter') {
      buttonpressed();
    } else {
      focusInput();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  const buttonpressed = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.blur();
      

    }
    navigate('/Welcome');
  };

  const numkeypad = () => {
    setIsVisible(!isVisible);

  }

  const handleblur =  () => {
    if(inputRef.current && inputRef.current.value){
      inputRef.current.focus();

    }

  };

  return (

    <div className='flex flex-col h-screen justify-center items-center'>


      <div className={`mt-8 flex justify-center mb-3 w-full relative transition-move ${isVisible ? 'transform-up' : ''}`}>
        <input ref={inputRef} type="text" onBlur={handleblur} className='font-[Poppins, sans-serif] w-[80%] text-[150px] text-center py-4 border-2 rounded-lg border-gray-600 border-opacity-50 outline-none focus:border-blue-500 transition duration-200 px-6' />
        <span onClick={focusInput} className='text-[100px] text-gray-600 absolute transition duration-200 input-text flex justify-center items-center mt-14 opacity-60 '>Matrícula</span>
      </div>

      <div className={`flex justify-center w-full mt-8 transition-move ${isVisible ? 'transform-up' : ''}`}>
        <button id='boton' onClick={buttonpressed} className='bg-[#50C878] text-gray-800 rounded-[10px] px-16 py-6 font-[Poppins, sans-serif] text-[50px] hover:bg-opacity-90 hover:text-gray-700 hover:scale-90 transitions shadow-xl'>Enter</button>
      </div>


      <CSSTransition
        in={isVisible}
        timeout={50}
        classNames="fade"
        unmountOnExit
      >

        <table className={`mt-8 text-[70px] bg-gray-600 rounded-xl transitions`}>
          <tr className='flex space-x-10 px-10 pt-5 justify-center'>
            <td><button onClick={() => keyinpad('7') } className=' border-gray-400 rounded-xl  h-24 w-40 bg-gray-400 shadow-2xl shadow-gray-700 transitions active:scale-95 '>7</button></td>
            <td><button onClick={() => keyinpad('8')} className=' border-gray-400 rounded-xl  h-24 w-40 bg-gray-400 shadow-2xl shadow-gray-700 transitions active:scale-95'>8</button></td>
            <td><button onClick={() => keyinpad('9')} className=' border-gray-400 rounded-xl  h-24 w-40 bg-gray-400 shadow-2xl shadow-gray-700 transitions active:scale-95'>9</button></td>
            <td><button onClick={deletee} className=' border-gray-400 rounded-xl  h-24 w-40 bg-gray-400 shadow-2xl shadow-gray-700 transitions active:scale-95'><i class="fa-solid fa-arrow-left"></i></button></td>

          </tr>

          <tr className='flex space-x-10 px-10 mt-3 justify-center'>
            <td><button onClick={() => keyinpad('4')} className=' border-gray-400 rounded-xl  h-24 w-40 bg-gray-400 shadow-2xl shadow-gray-700 transitions active:scale-95'>4</button></td>
            <td><button onClick={() => keyinpad('5')} className=' border-gray-400 rounded-xl  h-24 w-40 bg-gray-400 shadow-2xl shadow-gray-700 transitions active:scale-95'>5</button></td>
            <td><button onClick={() => keyinpad('6')} className=' border-gray-400 rounded-xl  h-24 w-40 bg-gray-400 shadow-2xl shadow-gray-700 transitions active:scale-95'>6</button></td>
            <td><button onClick={deleteall}  className=' border-gray-400 rounded-xl  h-24 w-40 bg-gray-400 shadow-2xl shadow-gray-700 transitions active:scale-95'><i class="fa-solid fa-xmark"></i></button></td>


          </tr>

          <tr className='flex space-x-10 mt-3 justify-center w-[72%] mx-10'>
            <td><button onClick={() => keyinpad('1')} className=' border-gray-400 rounded-xl  h-24 w-40 bg-gray-400 shadow-2xl shadow-gray-700 transitions active:scale-95'>1</button></td>
            <td><button onClick={() => keyinpad('2')} className=' border-gray-400 rounded-xl  h-24 w-40 bg-gray-400 shadow-2xl shadow-gray-700 transitions active:scale-95'>2</button></td>
            <td><button onClick={() => keyinpad('3')} className=' border-gray-400 rounded-xl  h-24 w-40 bg-gray-400 shadow-2xl shadow-gray-700 transitions active:scale-95'>3</button></td>
            <td rowSpan={2}><button onClick={buttonpressed}  className='border-gray-400 rounded-xl h-48 w-40 bg-gray-400 absolute shadow-2xl shadow-gray-700 transitions active:scale-95'><i className="fa-regular fa-circle-check"></i></button></td>

          </tr>

          <tr className='flex space-x-10 mt-3 mx-10 w-[66.5%] justify-center mb-3'>
            <td className='w-full flex justify-center'><button className='border-gray-400 rounded-xl h-24 w-[50%] bg-gray-400 shadow-2xl shadow-gray-700 transitions active:scale-95'>0</button></td>
          </tr>


        </table>
      </CSSTransition>



      <div onClick={() => {
        if (!isVisible) {
          setisactive('rotate-[360deg]')
        } else {
          setisactive('')
        }
      }} className={`absolute bottom-0 right-0 p-7 hover:cursor-pointer transitions rotate-180 ${isactive}`} >
        <i className="fa-solid fa-angle-up fa-3x" onClick={numkeypad}></i>
      </div>
    </div>
  );
}

export default Unumber;