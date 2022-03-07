==== Amazon Clone ====
# Introduction
 A simple Amazon clone that shows some shopping items in a CSS grid. The user can sign-in using Google and add the items to their basket. Then the user can checkout the basket and pay using Stripe. The user can also see their finished orders.

## Tech Stack
* NextJs
* React
* Redux Toolkit
* Tailwind CSS
* Stripe
* Firebase
   * Cloud Firestore
   * Google sign-in

## Features
* Load products from a server-side API
* Sign-in using Google
* Checkout using Stripe
* Store orders in Firebase Cloud Firestore
* Responsive design


# Setup
1. Run `yarn`
1. Make an environment variable file `.env.local` for running locally
   1. Add an environment variable `NEXTAUTH_URL=http://localhost:3000`
1. Generate a random secret for the environment variable `NEXTAUTH_SECRET`
1. Generate two random secrets of length 16 characters e.g. using [www.random.org](https://www.random.org/strings/) or [randomkeygen.com](https://randomkeygen.com/). These keys will be used as as the following environment variables
   1. `SERVICE_ENCRYPTION_IV`
   1. `SERVICE_ENCRYPTION_KEY`
1. Set up Firebase as described below
1. Set up Stripe as described below
1. Run `yarn dev` to run locally
1. Deploy to Vercel (Optional)


## Firebase

### Project
1. Go to the [firebase console](https://console.firebase.google.com/)
1. Add a new project

### Web App
1. In the Firebase console, go to the project settings
1. Scroll down to `Your Apps`
1. Add a web app
    1. Deselect Firebase hosting
    1. In the Add Firebase SDK screen, select `use npm` and copy the value of the `firebaseConfig` variable
1. In the file `firebase.js` in the repository root, replace the value of the `firebaseConfig` variable with the value you copied

### Admin SDK
1. In the Firebase console, go to the project settings -> Service Accounts -> Generate new private key. This will download a file
1. Encrypt the file. You can encrypt the file online using [this tool](https://www.devglan.com/online-tools/aes-encryption-decryption)
   1. Paste the contents of the downloaded file in the tool as the text to be encrypted
   1. Mode = `CBC`
   1. Key size = `128` bits
   1. IV = value of `SERVICE_ENCRYPTION_IV` env var
   1. Secret Key = value of `SERVICE_ENCRYPTION_KEY` env var
   1. Output Text Format = `Base64`
2. Save the encrypted content in a file `firebaseServiceAccount.enc.json` in the repository root. The content of the file should be:
```
{
  "encrypted": "<THE BASE64 ENCRPYTED CONTENT>"
}
```

### Authentication
1. In the Firebase console, go to Authentication
1. Click `Get Started` if you see it
1. Under Sign-in method, add Google
   1. Click Enable
   1. Provide a public-facing name and a support email
   1. Click Save
1. Click the new Google provider in the list and then `Web SDK configuration`
   1. Copy the value of Web client ID as the `GOOGLE_ID` environment variable
   1. Copy the value of Web client secret as the `GOOGLE_SECRET` environment variable
1. Go to the [Google Cloud console](https://console.cloud.google.com/) and then your Firebase project
1. On the hamburger navigation menu -> API & Services -> Credentials
1. Under OAuth 2.0 Client IDs -> Web client
1. Under Authorized redirect URIs
   1. Add a URI `http://localhost:3000/api/auth/callback/google`
   1. Add for any domains you will be hosting the app on as well. Note that non-localhost URIs must use `https` protocol


### Firestore Database
1. In the Firebase console, go to Firestore Database
1. Click Create Database
1. Select Start in test mode. You can use production mode as well
1. On the next screen, select the desired region. Best to pick one closest to your geographical location
1. Create


## Stripe
1. Go the the [Stripe dashboard](https://dashboard.stripe.com/)
1. Create a new test account
1. Go to Developers -> Overview (or API keys)
   1. Copy the Publishable key. This will go in the `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` env var
   1. Copy the Secret key. This will go in the `STRIPE_SECRET_KEY` env var
1. Go to Products -> Shipping rates -> Create shipping rate
   1. Provide some details and save
   1. Copy the ID under Details
   1. The ID will go in the `STRIPE_SHIPPING_RATE_ID` env var 
1. Setup Webhooks as below

### Webhooks
Webhooks are needed for Stripe to send payment updates to the application. Different setup is required depending on if you are running the application locally or in a live site (e.g. Vercel).

#### Local Webhooks
1. Install Stripe CLI
1. Run `stripe login` and log in to your account
1. Run `stripe listen --forward-to localhost:3000/api/webhooks`
1. The above command will return a secret. Put it as `STRIPE_SIGNING_SECRET` in the `.env.local` file

#### Live Site Webhooks
1. In the Stripe dashboard. Goto -> Developers -> Webhooks -> Add an endpoint
1. Add the endpoint has `<SITE DOMAIN>/api/webooks`
1. In events, select the `checkout.session.completed` event
1. Create
1. In the newly create webhook, in the `Signing Secret` column, click Reveal and copy the Signing secret as the `STRIPE_SIGNING_SECRET` env var

## Environment Variables
For running the app locally, create a file `.env.local` and put the variables in it as follows:

```
SERVICE_ENCRYPTION_IV=secret
SERVICE_ENCRYPTION_KEY=secret
GOOGLE_ID=secret
GOOGLE_SECRET=secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=notSecret
STRIPE_SECRET_KEY=secret
STRIPE_SIGNING_SECRET=secret
NEXTAUTH_SECRET=secret
NEXTAUTH_URL=http://localhost:3000

```

1. `SERVICE_ENCRYPTION_IV` The Initialization vector for the AES encryption algorithm
1. `SERVICE_ENCRYPTION_KEY` The secrey key for the AES encryption algorithm
1. `GOOGLE_SECRET` Google client secret for Sign-in using Google
1. `GOOGLE_ID` Google client ID for Sign-in using Google
1. `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` Publishable key from the Stripe account
1. `STRIPE_SECRET_KEY` Secret key from the Stripe account
1. `STRIPE_SIGNING_SECRET` Signing key from Stripe for listening to Webhooks
1. `STRIPE_SHIPPING_RATE_ID` ID of the shipping rate to use. Created in the Stripe dashboard
1. `NEXTAUTH_SECRET` Next Auth secret for sigining JWTs. You can provide anything here
1. `NEXTAUTH_URL` This is not required on Vercel. Otherwise it is the URL to the app


# Usage
1. Visit the webiste
1. Add items to the basket
1. Click the basket icon at the right top navbar
1. Click Proceed to Checkout
1. Enter fake details. For card see Stripe Details below
1. Pay (no payment processing is done with the Stripe test account)
1. Go to Returns & Orders in the right navbar and see your order there

## Stripe Details
* When checking out with Stripe, make sure that you have configured a test Stripe account. Provide fake name and address details. For the payment card, use `4242 4242 4242 4242` as the card number with a random future expiry and `424` as the CVV.

# Deployment
## Vercel
The app is ready to be deployment on Vercel. Only the environment variables need to be set up


# Known Issues
* The Stripe API only accepts a metadata field of 500 characters and the app is currently putting all the images in the metadata. So Stripe will fail if the combined length of the images of the order is more than 500.

# Future Work
* Group similar items into one and show as quantity in the basket