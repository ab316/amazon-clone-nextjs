import React from 'react';
import * as dayjs from 'dayjs';
import Currency from 'react-currency-formatter';
import Image from 'next/image';

const Order = ({id, amount, amountShipping, items, images, timestamp}) => {
  return (
    <div className="relative rounded-md border">
      <div className="flex items-center space-x-10 bg-gray-100 p-5 text-sm text-gray-600">
        <div>
          <p className="text-xs font-bold uppercase">Order Placed</p>
          <p>{dayjs(timestamp).format('DD MMM YYYY')}</p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase">Total</p>
          <p>
            <Currency quantity={amount} currency="USD" /> - Delivery{' '}
            <Currency quantity={amountShipping} currency="USD" />
          </p>
        </div>

        <p className="flex-1 self-end whitespace-nowrap text-right text-sm text-blue-500 sm:text-xl">
          {items.length} items
        </p>

        <p className="absolute top-2 right-2 w-40 truncate whitespace-nowrap text-xs lg:w-72">
          ORDER # {id}
        </p>
      </div>

      <div className="p-5 sm:p-10">
        <div className="flex space-x-6 overflow-x-auto">
          {images.map((image, idx) => (
            <div key={idx} className="h-20 sm:h-32">
              <Image src={image} alt="Item" objectFit="contain" width="100%" height="100%" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
