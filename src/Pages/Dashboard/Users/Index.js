import React from 'react'
import UserList from './Components/Components/UserList'
import CustomLayout from '../../../layouts/CustomLayout'

export default function Users() {
  return (
    <div className='container'>
        <CustomLayout>
          <div className='mb-4 p-2 flex items-center justify-center'>
          <span className='text-2xl'>Users</span>
          </div>
        <UserList/>
        </CustomLayout>
    </div>
  )
}
