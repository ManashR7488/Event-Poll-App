import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='bg-zinc-800 text-white min-h-screen flex items-center justify-center'>
        <div className="nav absolute z-[10] top-0 left-0 h-[8vh] w-full flex px-4">
            <div className="left w-1/2 h-full flex justify-start items-center">
            <div className='h-full flex items-center'>

            <img className='h-[80%]' src="https://cdn-icons-png.freepik.com/256/8106/8106806.png" alt="" />
            </div>
            <div>
                <h1 className='text-2xl font-bold ml-4'>Pollster</h1>
                <h3 className='ml-4 opacity-30'>by MR2</h3>
            </div>
            </div>
            <div className="right w-1/2 h-full">
                <ul className="flex items-center w-full h-full justify-end">
                    <li className="px-4"><Link to='/' className=' bg-orange-400 rounded-full px-3 py-1'>Home</Link></li>
                    <li className="px-4"><Link to='/register' className=' bg-orange-400 rounded-full px-3 py-1'>Register</Link></li>
                    <li className="px-4"><Link to='/login' className=' bg-orange-400 rounded-full px-3 py-1'>Login</Link></li>
                </ul>
            </div>
        </div>
        <div className='container w-fit p-4 text-center'>
            <h1 className='text-3xl font-bold'>Welcome to Pollster</h1>
            <p className='mt-4'>Pollster is a simple polling app that allows you to create and share polls with others.</p>
            <p className='mt-4'>To get started, please <Link to='/register' className='text-blue-500'>register</Link> or <Link to='/login' className='text-blue-500'>login</Link>.</p>
        </div>
    </div>
  )
}

export default Home