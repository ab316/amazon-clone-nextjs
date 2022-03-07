import {Stripe} from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const {items, email} = req.body;

      const transformedItems = items.map((item) => ({
        quantity: 1,
        price_data: {
          currency: 'USD',
          unit_amount: item.price * 100,
          product_data: {
            name: item.title,
            description: item.description,
            images: [item.image],
          },
        },
      }));

      const session = await stripe.checkout.sessions.create({
        line_items: transformedItems,
        customer_email: email,
        mode: 'payment',
        payment_method_types: ['card'],
        shipping_address_collection: {
          allowed_countries: ['SE', 'PK', 'NO', 'DK'],
        },
        shipping_rates: [process.env.STRIPE_SHIPPING_RATE_ID],
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
        metadata: {
          email: email,
          images: JSON.stringify(items.map((item) => item.image)),
        },
      });
      res.status(200).json({id: session.id});
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
