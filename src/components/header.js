import React from 'react'
import Image from 'next/image'
import {MenuIcon,SearchIcon,ShoppingCartIcon } from '@heroicons/react/outline'

import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectItems } from '../slices/basketSlice'
const Header = () => {

    const { data: session } = useSession()
    const router = useRouter()
    const items = useSelector(selectItems)

  return (
    <header>
        {/* top nav */}
        <div className='flex items-center bg-amazon_blue p-1 flex-grow py-2'>
            <div className='mt-2 flex items-center flex-grow sm:flex-grow-0'>
                <Image onClick={()=>router.push('/')} src='https://links.papareact.com/f90' height={40} width={150} objectFit="contain" className='cursor-pointer'/>
            </div>
            {/* search bar */}
            <div className='hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500'>
                <input className='p-2 h-full w-6 flex-grow rounded-l-md focus:outline-none' type='text'></input>
                <SearchIcon className='h-12 p-4'/>
            </div>
            {/* right */}
            <div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
                <div onClick={!session?signIn:signOut} className='link'>
                    <p>{session ?`Hello, ${session.user.name}`: 'Sign in'}</p>
                    <p className='font-extrabold md:text-sm'>Account & Lists</p>
                </div>
                <div className='link' onClick={()=>router.push('/orders')}>
                    <p>Returns</p>
                    <p className='font-extrabold md:text-sm'>& Orders</p>
                </div>
                <div className='relative link flex items-center' onClick={()=>router.push('/checkout')}>
                {/* items in basket */}
                    <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold'>{items.length}</span> 
                    <ShoppingCartIcon className='h-10'/>
                    <p className='hidden md:inline font-extrabold md:text-sm mt-2'>Basket</p>
                </div>
            </div>
        </div>
        {/* bottom nav */}
        <div className='flex items-center bg-amazon_blue-light text-white text-sm space-x-3 p-2 pl-6'>
            <MenuIcon className='h-6 mr-1'/>
            <p className='link flex items-center'>All</p>
            <p className='link'>Prime Video</p>
            <p className='link'>Amazon Business</p>
            <p className='link'>Today's Deals</p>
            <p className='link hidden lg:inline-flex'>Electronics</p>
            <p className='link hidden lg:inline-flex'>Food & Grocery</p>
            <p className='link hidden lg:inline-flex'>Prime</p>
            <p className='link hidden lg:inline-flex'>Buy Again</p>
            <p className='link hidden lg:inline-flex'>Shopper Toolkit</p>
            <p className='link hidden lg:inline-flex'>Health & Personal care</p>
        </div>
    </header>
  )
}

export default Header