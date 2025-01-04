import CheckTimeToken from '@/app/core/Components/CheckTimeToken/CheckTimeToken'
import React from 'react'

const UserLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
        {children}
        <CheckTimeToken />
    </>
  )
}

export default UserLayout