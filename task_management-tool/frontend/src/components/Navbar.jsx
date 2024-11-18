import React from 'react'

const Navbar = () => {
  return (
    <div>
        <nav className='bg-gray-800 text-white px-6 py-4 flex justify-between items-center'>
            <h1 className='text-2xl font-bold'>Task Management Application</h1>
            <div className='flex items-center gap-4'>
                <button className='hover:underline'>SignUp</button>
                <button className='hover:underline'>Login</button>
                <button>Dark/Light</button>
            </div>
        </nav>
    </div>
  )
}

export default Navbar