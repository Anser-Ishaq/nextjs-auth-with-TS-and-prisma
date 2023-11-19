import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'

const AdminPage =async () => {
    const cookies = await getServerSession(authOptions)
    if(cookies?.user?.email){
         return   <div> this is admin page <span className="text-3xl font-bold underline">{cookies?.user?.userName}</span>   </div>
    }
    
    return <div>to see this page you must <Link className=" font-bold underline" href="/sign-in">login</Link>    </div> 
}

export default AdminPage