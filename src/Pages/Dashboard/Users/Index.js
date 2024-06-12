import React from 'react'
import UserList from './Components/Components/UserList'
import CustomLayout from '../../../layouts/CustomLayout'

export default function Users() {
  return (
    <div className='container'>
        <CustomLayout>
        <UserList/>
        </CustomLayout>
    </div>
  )
}
