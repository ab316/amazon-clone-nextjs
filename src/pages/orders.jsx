import {useSession, getSession} from 'next-auth/react';
import * as firestore from 'firebase/firestore';
import {Stripe} from 'stripe';
import db from '../../firebase';
import Header from '../components/Header';
import Order from '../components/Order';

const Orders = ({orders}) => {
  const {data: session} = useSession();
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-2xl p-10">
        <h1 className="mb-2 border-b border-yellow-400 pb-1 text-3xl">Your Orders</h1>

        {session ? (
          <h2>{orders?.length ?? 0} Orders</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}

        <div className="mt-5 space-y-4">
          {orders?.map((order) => (
            <Order key={order.id} {...order} />
          ))}
        </div>
      </main>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session || !session.user) return {props: {}};

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const firebaseOrders = await firestore.getDocs(
    firestore.query(
      firestore.collection(db, `users/${session.user.email}/orders`),
      firestore.orderBy('timestamp', 'desc'),
    ),
  );

  const orders = await Promise.all(
    firebaseOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: order.data().timestamp.toMillis(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    })),
  );

  return {
    props: {
      orders,
      session,
    },
  };
}

export default Orders;
