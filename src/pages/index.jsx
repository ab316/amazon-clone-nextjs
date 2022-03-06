import Head from 'next/head';
import Banner from '../components/Banner';
import Header from '../components/Header';
import ProductFeed from '../components/ProductFeed';
import fakeProductsData from '../../fakeStoreProducts.json';
import {getSession} from 'next-auth/react';

export default function Home({products}) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon</title>
      </Head>

      <Header />

      <main className="mx-auto max-w-screen-2xl">
        <Banner />
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

const MAX_RATING = 5;
const MIN_RATING = 1;

export async function getServerSideProps(context) {
  // Commenting out the http request since fakestoreapi is responding very slow
  // const response = await fetch('https://fakestoreapi.com/products');
  // const products = await response.json();
  const session = await getSession(context);
  const products = fakeProductsData;
  const updatedProducts = products.map((product) => ({
    ...product,
    rating: Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1) + MIN_RATING),
    hasPrime: Math.random() < 0.5,
  }));
  return {props: {products: updatedProducts, session}};
}
