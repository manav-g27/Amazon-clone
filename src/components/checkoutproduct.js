import React from 'react'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/solid'
import { useDispatch } from 'react-redux'
import { addToBasket, removeFromBasket } from '../slices/basketSlice'
const CheckoutProduct = ({id,title,price,description,category,image,hasPrime,rating}) => {

    const dispatch = useDispatch()

    const addItemtoBasket = ()=>{
            const product = {id,title,price,description,category,image,hasPrime,rating}
            //pushing item into redux
            dispatch(addToBasket(product))
    }

    const removeItemFromBasket=()=>{
        //removing item from redux
        dispatch(removeFromBasket({id}))
    }

  return (
    <div className='grid grid-cols-5'>
        <Image src={image} height={200} width={200} objectFit='contain'/>
        {/* middle section */}
        <div className='col-span-3 mx-5'>
            <p>{title}</p>
            <div className='flex'>
                {Array(rating).fill().map((_,i)=><StarIcon key={i} className='h-5 text-yellow-500'/>)}
            </div>
            <p className='text-xs my-2 line-clamp-3'>{description}</p>
            <p>${price}</p>
            {hasPrime && <div className='flex items-center space-x-2'>
            <img src="https://links.papareact.com/fdw" alt="" className='w-12' loading='lazy'/>
            <p className='text-xs text-gray-500'>Free Next-day Delievery</p>
               </div>     
            }
        </div>
            {/* Right add and remove button */}
            <div className='flex flex-col space-y-2 my-auto justify-self-end'>
                <button className='button' onClick={addItemtoBasket}>Add to Basket</button>
                <button className='button' onClick={removeItemFromBasket}>Remove from Basket</button>
            </div>
    </div>
  )
}

export default CheckoutProduct