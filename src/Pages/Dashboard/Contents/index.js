import React from 'react'
import CustomLayout from '../../../layouts/CustomLayout'
import ArticlesTable from './components/Contents'

export default function Content() {
  return (
    <div className='container'>
        <CustomLayout>
          <div className='mb-4 p-2 flex items-center justify-center'>
          <span className='text-2xl'>Contents</span>
          </div>
        <ArticlesTable/>
        </CustomLayout>
    </div>
  )
}




