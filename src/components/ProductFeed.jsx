import React from 'react';
import Product from './Product';
import AdImage from '../../public/img/ad.jpg';
import Image from 'next/image';

const ProductFeed = ({products}) => {
  return (
    <div className="mx-auto grid grid-flow-row-dense md:-mt-52 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.slice(0, 4).map((product) => (
        <Product key={product.id} {...product} />
      ))}

      <div id="ad" className="md:col-span-full">
        <Image src={AdImage} alt="Ad" height={1000} objectFit="cover" />
      </div>

      <div className="md:col-span-2">
        {products.slice(4, 5).map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>

      {products.slice(5, products.length).map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductFeed;
