import React from 'react'

export default function NotFound() {
  return (
 <div className="flex items-center justify-center h-screen">
      <div>
        <div className="flex flex-col items-center space-y-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="text-red-600 w-28 h-28" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
          <h1 className="text-4xl font-bold">Sorry this page Doesn't exist :)</h1>
      
          <a
		  href='/admin/dashboard'
          
            className="inline-flex items-center px-4 py-2 text-white bg-indigo-600 border border-indigo-600 rounded rounded-full hover:bg-indigo-700 focus:outline-none focus:ring">
          
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-2" fill="white" viewBox="0 0 24 24"
                stroke="white" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
      
	  		
                <a className="text-sm font-medium text-white" >
                  <span className='text-white'>
                  Return to the Dashboard

                    </span>
              </a>
		
          </a>
        </div>
      </div>
    </div>

  )
}
