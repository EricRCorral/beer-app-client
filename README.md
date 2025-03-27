# Welcome to BeerApp!

**This is the client and work together with this [server](https://github.com/EricRCorral/beer-app-server). In the next section you will find the required steps to run locally this project.**

---

# Installations and configurations

1. Clone the repo with `git clone https://github.com/EricRCorral/beer-app-client.git`
2. Run `npm i` to install dependencies
3. Create a `.env` file in the root and set the next values:
   - VITE_PUBLIC_KEY_MP: this is a public key from MercadoPago. To obtain this you will need a [MercadoPago](https://www.mercadopago.com.ar/) account, then go to [Your integrations](https://www.mercadopago.com.ar/developers/panel/app) create a CheckoutPro application, access to your application and create 2 test accounts (one buyer and one seller). Access to your seller account, create a CheckoutPro application and you will fnd the public key in credentials for production section.
   You can find more details about it [here](https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/landing).
   - VITE_NGROK_URL: You should find this in your enviroments variables in beer-app-server project.
4. Run `npm run dev` and by default your client should be [here](https://localhost:5173/).
 
---

### Some stuffs you can do in BeerApp:
- Create and sign in with your user
- Add/remove beers to your cart
- Buy it with a test user from MercadoPago
- Add beers to favourites
- See your buy history