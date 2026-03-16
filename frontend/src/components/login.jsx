import React from 'react';
import { useNavigate} from 'react-router-dom';

function Login() {

    const navigate = useNavigate();
    function handleClick(){
        navigate('/signup');
    }
    return (
        <>
        <div className='flex bg-[#F6F4E6] z-20'>
        <div className='flex flex-col items-center justify-center relative left-72 mb-16'>
        <h1 className='text-5xl font-bold mb-16'>LOGIN</h1>
        <span className='flex '>
        <i className="bi bi-person relative top-2 left-5"></i><input type="text" placeholder='    Email' className='w-72 h-10 rounded-md p-2 mb-4  bg-[#F6F4E6] outline-none border-b-2 border-black' />
        </span>
        <span className='flex '>
        <i className="bi bi-shield-lock relative top-2 left-5"></i><input type="text" placeholder='    Password' className='w-72 h-10 rounded-md p-2 mb-20 outline-none bg-[#F6F4E6] border-b-2 border-black'/>
        </span>
        <button className="bg-slate-400 hover:bg-slate-700 text-white font-bold py-3 px-12 rounded-full mb-7 hover:text-white transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce">Login</button>
        <h3>Don't have an account? <span className='text-red-500 cursor-pointer' onClick={handleClick} >Sign up</span></h3>
      </div>
      <div>
        <img src="/scenery.png" alt="logo" className=' w-7/12 float-right relative rounded-l-full'/>
      </div>
      </div>
        </>
    );
}

export default Login;