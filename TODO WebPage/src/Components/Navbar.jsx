import React from 'react'
import { FaListCheck } from "react-icons/fa6";


const Navbar = () =>{
    return (
        <nav className='md:flex justify-between bg-indigo-950 text-white py-5 md:px-10 '>
             <div className='logo flex align-center mx-8 gap-4   '>
                <span className='text-2xl '><FaListCheck /> </span>
                <span className='font-bold text-xl '>ToDoList </span>
             </div>
             <ul className='flex gap-8 mx-9 justify-center'>
                <li className='cursor-pointer hover:font-bold transition-all '>Home</li>
                <li className='cursor-pointer hover:font-bold transition-all '>Your Tasks</li>
             </ul>

        </nav>
    )
}

export default Navbar