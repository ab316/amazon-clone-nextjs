import Image from 'next/image';
import {useSession} from 'next-auth/react';
import {useSelector} from 'react-redux';
import Currency from 'react-currency-formatter';
import {selectItems, selectTotal} from '../slices/basketSlice';
import Header from '../components/Header';
import PrimeBanner from '../../public/img/prime-day-banner.png';
import CheckoutProduct from '../components/CheckoutProduct';

const Checkout = () => {
  const {data: session} = useSession();
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);

  return (
    <div className="bg-gray-100">
      <Header />

      <main className="mx-auto max-w-screen-2xl lg:flex">
        {/* Left */}
        <div className="m-5 flex-grow shadow-sm">
          <Image src={PrimeBanner} alt="Prime Banner" objectFit="contain" />

          <div className="flex flex-col space-y-10 bg-white p-5">
            <h1 className="border-b pb-4 text-3xl">
              {items.length ? 'Shopping Basket' : 'Your Amazon Baskey is empty'}
            </h1>

            {items.map((item, i) => (
              <CheckoutProduct key={i} {...item} />
            ))}
          </div>
        </div>

        {/* Right */}

        {items.length > 0 && (
          <div className="flex flex-col bg-white p-10 shadow-md">
            <h2 className="whitespace-nowrap">
              Subtotal ({items.length} items):{' '}
              <span className="font-bold">
                <Currency quantity={total} currency="USD" />
              </span>
            </h2>

            <button
              className={`button mt-2 ${!session && 'button-not-allowed'}`}
              disabled={!session}>
              {session ? 'Proceed to Checkout' : 'Sign in to Checkout'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Checkout;
