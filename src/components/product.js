import React, { useState } from 'react'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/solid'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../slices/basketSlice';
const MAX_RATING = 5;
const MIN_RATING = 1;

const Product = ({id,title,price,description,category,image}) => {

    const dispatch = useDispatch();

    // random function to generate ratings
    const [rating,setRating] = useState()
    const [hasPrime,sethasPrime] = useState()

    useEffect(() => {
        setRating(
            Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) +
            MIN_RATING
        );
        sethasPrime(Math.random() < 0.5);
    }, []);

    const addItemToBasket = ()=>
    {
        const product  = {id,title,price,description,category,image,hasPrime}
        //sending product as an action to redux store ..... the basket slice
        dispatch(addToBasket(product))
    }

  return (
    <div className='relative flex  flex-col m-5 bg-white z-30 p-10'>
        <p className='absolute top-2 right-2 text-xs italic'>{category}</p>
        <Image src={image} height={200} width={200} objectfit='contain'/>
        <h4 className='my-3'>{title}</h4>
        <div className='flex'>
            {
                // trick
                Array(rating).fill().map((_,i)=>
                    <StarIcon className='h-5 text-yellow-500'/>
                )
            }
        </div>
        <p className='text-xs my-2 line-clamp-2'>{description}</p>
        <div className='mb-5'>
            <p>${price}</p>
        </div>
        {
            hasPrime && (
                <div className='flex items-center space-x-2 -mt-5'>
                    <img src="https://links.papareact.com/fdw" alt="" className='w-12'/>
                    <p className='text-xs text-grey-500'>Free Next-day Delievery</p>
                </div>
            )
        }
        <button className='mt-auto button' onClick={addItemToBasket}>Add to Basket</button>
    </div>
  )
}

export default Product