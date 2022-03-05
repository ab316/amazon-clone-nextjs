import Image from 'next/image';
import React, {useState} from 'react';
import {StarIcon} from '@heroicons/react/solid';
import Currency from 'react-currency-formatter';
import PrimeTagImage from '../../public/img/prime-tag.png';
import {useDispatch} from 'react-redux';
import {addToBasket} from '../slices/basketSlice';

const Product = ({id, title, price, description, category, image, rating, hasPrime}) => {
  // Random can not be used here as a different value will be generated on server and client side, causing errors
  // const [rating] = useState(Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1) + MIN_RATING));
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
      hasPrime,
    };

    dispatch(addToBasket(product));
  };

  return (
    <div className="relative z-30 m-5 flex flex-col bg-white p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">{category}</p>
      <Image src={image} width={200} height={200} objectFit="contain" alt={title} />
      <h4 className="my-3">{title}</h4>

      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500" />
          ))}
      </div>

      <p className="line my-2 text-xs line-clamp-2">{description}</p>

      <div className="mb-5">
        <Currency quantity={price} currency="USD" />
      </div>

      {hasPrime && (
        <div className="mt-3 mb-1 flex items-center space-x-2">
          <Image src={PrimeTagImage} alt="Prime" width="48" height="48" objectFit="contain" />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}

      <button className="button mt-auto" onClick={addItemToBasket}>
        Add to Basket
      </button>
    </div>
  );
};

export default Product;
