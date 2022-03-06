import {buffer} from 'micro';
import Stripe from 'stripe';
import * as admin from 'firebase-admin';
import serviceAccount from '../../../firebaseAccountKey.json';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.apps[0];

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const requestBuffer = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let event;
    // Verify that the request came from Stripe
    try {
      event = stripe.webhooks.constructEvent(requestBuffer, sig, endpointSecret);

      if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        await fulfillOrder(session);
      }
      res.status(200).end();
    } catch (err) {
      console.error('ERROR', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    res.status(200).end();
  }
  res.status(405).end();
}

async function fulfillOrder(session) {
  console.log('Fulfilling order', session);
  try {
    const result = app
      .firestore()
      .collection('users')
      .doc(session.metadata.email)
      .collection('orders')
      .doc(session.id)
      .set({
        amount: session.amount_total / 100,
        amount_shipping: session.total_details.amount_shipping / 100,
        images: JSON.parse(session.metadata.images),
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });
    console.log(`SUCCESS: Order ${session.id} has been added to the DB`);
  } catch (err) {
    console.error(`FAILURE: Failed to fulfill order ${session.id}`, err);
  }
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
