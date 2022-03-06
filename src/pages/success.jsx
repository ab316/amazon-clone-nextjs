import {useRouter} from 'next/router';
import {CheckCircleIcon} from '@heroicons/react/solid';
import Header from '../components/Header';

const Success = () => {
  const router = useRouter();

  return (
    <div className="h-screen bg-gray-100">
      <Header />

      <main className="mx-auto max-w-screen-2xl">
        <div className="flex flex-col bg-white p-10">
          <div className="mb-5 flex items-center space-x-2">
            <CheckCircleIcon className="h-10 text-green-500" />
            <h1 className="text-3xl">Thank you, your order has been confirmed!</h1>
          </div>
          <p>
            Thank you for shopping with us. We will send a confirmation once the item has been
            shipped. If you would like to check the status of your order(s) please press the link
            below.
          </p>
          <button onClick={() => router.push('/orders')} className="button mt-8">
            Go to my orders
          </button>
        </div>
      </main>
    </div>
  );
};

export default Success;
