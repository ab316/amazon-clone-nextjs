# Introduction

## Tech Stack
* NextJs
* React
* Redux
* Stripe
* Firebase

## Features
* Load products from a server-side API
* Sign-in using Google
* Checkout using Stripe


# Setup
1. Run `yarn`
1. Generate two random secrets e.g. using [www.random.org](https://www.random.org/) or [randomkeygen.com](https://randomkeygen.com/). These keys will be used as as the following environment variables
   1. `SERVICE_ENCRYPTION_IV`
   1. `SERVICE_ENCRYPTION_KEY`
1. Set up Firebase as described below
1. Set up Stripe as described below
1. Make an environment variable file `.env.local` for running locally
1. Deploy to Vercel (Optional)

## Generate Encryption Secrets
1. Generate two random

## Firebase

### Database Setup
1. In the Firebase console, go to Firestore Database
1. Click Create Database
1. Select Start in test mode. You can use production mode as well
1. On the next screen, select the desired region

### Web App
1. In the Firebase console, go to the project settings
1. Scroll down to the Web App
1. In the SDK setup and configuration section, select npm
1. Copy the code in to the file `firebase.js` in the repository root

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

## Stripe

### Webhooks
Webhooks are needed for Stripe to send payment updates to the application. Different setup is required depending on if you are running the application locally or in a live site (e.g. Vercel).

#### Local Webhooks
1. Install Stripe CLI
1. Run `stripe login` and log in to your account
1. Run `stripe listen --forward-to localhost:3000/api/webhooks`
1. The above command will return a secret. Put it as `STRIPE_SIGNING_SECRET` in the `.env.local` file

#### Live Site Webhooks
TODO

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
1. `GOOGLE_SECRET`
1. `GOOGLE_ID`
1. `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` Publishable key from the Stripe account
1. `STRIPE_SECRET_KEY` Secret key from the Stripe account
1. `STRIPE_SIGNING_SECRET` Signing key from Stripe for listening to Webhooks
1. `NEXTAUTH_SECRET` Next Auth secret for sigining JWTs. You can provide anything here
1. `NEXTAUTH_URL` This is not required on Vercel. Otherwise it is the URL to the app


# Deployment
## Vercel
The app is ready to be deployment on Vercel. Only the environment variables need to be set up

# TODO
1. Add encryption for firebaseAccountKey so that it can be committed safely. [Use this](https://vercel.com/support/articles/how-do-i-workaround-vercel-s-4-kb-environment-variables-limit)