import Head from 'next/head';
import Banner from '../components/Banner';
import Header from '../components/Header';
import ProductFeed from '../components/ProductFeed';

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

export async function getServerSideProps() {
  const response = await fetch('https://fakestoreapi.com/products');
  const products = await response.json();
  const updatedProducts = products.map((product) => ({
    ...product,
    rating: Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1) + MIN_RATING),
    hasPrime: Math.random() < 0.5,
  }));
  return {props: {products: updatedProducts}};
}
