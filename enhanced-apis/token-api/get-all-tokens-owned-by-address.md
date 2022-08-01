---
description: >-
  Learn how to get balances of all tokens owned by an address using the Alchemy
  Token API.
---

# How to Get All Tokens Owned by an Address

Most dapps, whether they are exchanges, DeFi protocols, wallets, or analytics platforms, require that their users are able to view all their tokens and token balances at one place.

![Digital asset wallet interface that shows the token balances of multiple cryptocurrencies.](<../../.gitbook/assets/image (50).png>)

To get all the tokens owned by a wallet on Ethereum, you would typically have to index the entire blockchain since genesis, track all ERC-20 contracts, and compute token balances of wallets.&#x20;

This process typically requires a massive amount of engineering resources and time.

However, this effort can be bypassed by using [Alchemy's Token API](./) to get the balances of all tokens owned by a wallet address.

### About this Tutorial

We will write a simple script in Node to get the balances of the top 100 tokens (by volume) on the Ethereum blockchain using [a free Alchemy developer account](https://alchemy.com/?a=645c54745b) and Alchemy's Token API.

## Creating the Token Balances Script

### Step 1: Install Node and npm

In case you haven't already, [install node and npm](https://nodejs.org/en/download/) on your local machine.

Make sure that node is at least v14 or higher by typing the following in your terminal:

```
node -v
```

### Step 2: Create an Alchemy app

In case you haven't already, [sign up for a free Alchemy account](https://alchemy.com/?a=645c54745b).

![Alchemy's account dashboard where developers can create a new app on the Ethereum blockchain.](<../../.gitbook/assets/image (53).png>)

Next, navigate to the [Alchemy Dashboard](https://dashboard.alchemyapi.io/) and create a new app.&#x20;

Make sure you set the chain to Ethereum and network to Mainnet.

Once the app is created, click on your app's _View Key_ button on the dashboard.

Take a note of the HTTP URL.&#x20;

The URL will be in this form: `https://eth-mainnet.alchemyapi.io/v2/xxxxxxxxx`

You will need this later.

### Step 3: Create a node project

Let's now create an empty repository and install all node dependencies.&#x20;

To make requests to the Token API, use the [Alchemy web3 library](https://docs.alchemy.com/alchemy/documentation/alchemy-web3).&#x20;

You can also use `axios` or `fetch` alternatively.

{% tabs %}
{% tab title="Alchemy Web3 (Recommended)" %}
```shell
mkdir token-balances && cd token-balances
npm init -y
npm install --save @alch/alchemy-web3
touch main.js
```
{% endtab %}

{% tab title="Axios" %}
```bash
mkdir token-balances && cd token-balances
npm init -y
npm install --save axios
touch main.js
```
{% endtab %}

{% tab title="Fetch" %}
```bash
mkdir token-balances && cd token-balances
npm init -y
touch main.js
```
{% endtab %}
{% endtabs %}

This will create a repository named `token-balances` that holds all your files and dependencies.

Next, open this repo in your favorite code editor.&#x20;

We will be writing all our code in the `main.js` file.

### Step 4: Get token balances of an address

To get token balances, you will use the `getTokenBalances` method.&#x20;

This method takes in two arguments:

1. `DATA`: The wallet address of which we want to get token balances.
2. Either an `Array` of ERC-20 contract addresses or a `String` of value `DEFAULT_TOKENS`.

Since we are interested in getting the balances of _all_ tokens, you will set the second argument to `DEFAULT_TOKENS`. This will give you the balances of the top 100 tokens on the Ethereum blockchain (by volume).&#x20;

In other words, it will give you all the tokens you could possibly care about.

Add the following code to the `main.js` file.

{% tabs %}
{% tab title="Alchemy Web3 (Recommended)" %}
```javascript
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

// Using HTTP
const web3 = createAlchemyWeb3(
    "<--ALCHEMY APP HTTP URL-->",
);

const main = async () => {
    // Wallet address
    const address = 
    '0xd8da6bf26964af9d7eed9e03e53415d37aa96045'

    // Get token balances
    const balances = await 
    web3.alchemy.getTokenBalances(address, 'DEFAULT_TOKENS')

    // Print token balances
    console.log(balances)
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();
```
{% endtab %}

{% tab title="Axios" %}
```javascript
const axios = require('axios')

// Wallet address
const address = '0xd8da6bf26964af9d7eed9e03e53415d37aa96045'

// Alchemy URL
const baseURL = `<-- ALCHEMY APP HTTP URL -->`;

const data = JSON.stringify({
  "jsonrpc": "2.0",
  "method": "alchemy_getTokenBalances",
  "headers": {
    "Content-Type": "application/json"
  },
  "params": [
    `${address}`,
    "DEFAULT_TOKENS",
  ],
  "id": 42
});

const config = {
  method: 'post',
  url: baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  data : data
};

// Make the request and print the formatted response:
axios(config)
  .then(response => console.log(response['data']['result']))
  .catch(error => console.log('error', error));

```
{% endtab %}

{% tab title="Fetch" %}
```javascript
// Wallet address
const address = '0xd8da6bf26964af9d7eed9e03e53415d37aa96045'

// Alchemy URL
const baseURL = `<-- ALCHEMY APP HTTP URL -->`;

var raw = JSON.stringify({
  "jsonrpc": "2.0",
  "method": "alchemy_getTokenBalances",
  "headers": {
    "Content-Type": "application/json"
  },
  "params": [
    `${address}`,
    "DEFAULT_TOKENS",
  ],
  "id": 42
});

var requestOptions = {
  method: 'POST',
  body: raw,
  redirect: 'follow'
};

// Make the request and print the formatted response:
fetch(fetchURL, requestOptions)
  .then(response => console.log(response['data']['result']))
  .catch(error => console.log('error', error));
```
{% endtab %}
{% endtabs %}

Run this script by typing:

```bash
node main.js
```

You should see an output that looks like this:

```json
{
  address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
  tokenBalances: [
    {
      contractAddress: 
      '0xdac17f958d2ee523a2206206994597c13d831ec7',
      tokenBalance: '100000',
      error: null
    },
    {
      contractAddress: 
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      tokenBalance: '5000000',
      error: null
    },
    ...
  ]
}
```

### Step 5: Add metadata and parse API output

The output generated in the previous step is not very human-readable. It only gives us information that tells us the contract address of the token and balance in its smallest unit.

To get more relevant information about the token such as name, symbol, and number of decimals, we need to leverage another method called `getTokenMetadata`.&#x20;

The [getTokenMetadata](alchemy\_gettokenmetadata.md) method takes a single argument of the contract address and returns data in the following format.

```json
{  
    decimals: 6,  
    logo: 'https://static.alchemyapi.io/images/assets/825.png',  
    name: 'Tether',  
    symbol: 'USDT'
}
```

With this in mind, let's write code that does the following:

1. Remove all tokens with zero balances.
2. Loop through all tokens and extract metadata using the `getTokenMetadata` method.
3. Convert token balances to a human-readable number.
4. Print the token's name, balance, and symbol to the console.

{% hint style="info" %}
### The Calculation for token balance

The tokenBalance returned by the Token API is usually a number with several digits.

In this case `4929853276` for USDT.

Every ERC20 token has a metadata information called "[decimals](https://medium.com/@jgm.orinoco/understanding-erc-20-token-contracts-a809a7310aa5)" which denotes the divisibility of a token (ranges from 0 to 18).&#x20;

For USDT, the value of "decimals" is 6.&#x20;

The response returned by Alchemy's [getTokenBalances](alchemy\_gettokenbalances.md) API is as below.\


`tokenBalance = no. of tokens (quantity) * Math.pow(10, 6)`\
\
Hence, the actual quantity of the USDT token in this case will be \
\
`4929853276/10^6 = 4,929.853276`\
\
The same operation needs to be done to obtain the actual quantity for any token.&#x20;

We show the calculation in the code below&#x20;
{% endhint %}

Replace the contents of `main.js` with the following:

{% tabs %}
{% tab title="Alchemy Web3 (Recommended)" %}
```javascript
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

// Using HTTP
const web3 = createAlchemyWeb3(
    "<--ALCHEMY APP HTTP URL-->",
);

const main = async () => {
    // Wallet address
    const address = 
    '0xd8da6bf26964af9d7eed9e03e53415d37aa96045'

    // Get token balances
    const balances = await 
    web3.alchemy.getTokenBalances(address, 'DEFAULT_TOKENS')

    // Remove tokens with zero balance
    const nonZeroBalances = 
    balances['tokenBalances'].filter(token => {
       return token['tokenBalance'] !== '0'
    })
    
    console.log(`Token balances of ${address} \n`)
    
    // Counter for SNo of final output
    let i = 1
    
    // Loop through all tokens with non-zero balance
    for (token of nonZeroBalances) {
    
       // Get balance of token 
       let balance = token['tokenBalance']
    
       // Get metadata of token
       const metadata = await web3.alchemy.getTokenMetadata(token[
          'contractAddress'
       ]);
    
       // Compute token balance in human-readable format
       balance = balance/Math.pow(10, metadata['decimals']);
       balance = balance.toFixed(2);
    
       // Print name, balance, and symbol of token
       console.log(`${i++}. ${metadata['name']}: ${balance} 
       ${metadata['symbol']}`)
    }
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();
```
{% endtab %}

{% tab title="Axios" %}
```javascript
const axios = require('axios')

// Wallet address
const address = '0xd8da6bf26964af9d7eed9e03e53415d37aa96045'

// Alchemy URL
const baseURL = `<-- ALCHEMY APP HTTP URL -->`;

const data = JSON.stringify({
  "jsonrpc": "2.0",
  "method": "alchemy_getTokenBalances",
  "headers": {
    "Content-Type": "application/json"
  },
  "params": [
    `${address}`,
    "DEFAULT_TOKENS",
  ],
  "id": 42
});

const config = {
  method: 'post',
  url: baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  data : data
};

// Make the request and print the formatted response:
axios(config)
  .then(response => {
  
    // Get balances
    const balances = response['data']['result'] 
    
    // Remove tokens with zero balance
    const nonZeroBalances = 
    balances['tokenBalances'].filter(token => {
       return token['tokenBalance'] !== '0'
    })

    console.log(`Token balances of ${address} \n`)
    
    // Counter for SNo of final output
    let i = 1
    
    // Loop through all tokens with non-zero balance
    for (token of nonZeroBalances) {
    
       // Get balance of token 
       let balance = token['tokenBalance']
       
       const metadataParams = JSON.stringify({
           "jsonrpc": "2.0",
           "method": "alchemy_getTokenMetadata",
           "params": [
               `${token['contractAddress']}`
           ],
           "id": 42
       });
       
       const metadataConfig = {
          method: 'post',
          url: baseURL,
          headers: {
            'Content-Type': 'application/json'
          },
          data : metadataParams
       };  
       
       // Get metadata of token
       axios(config)
          .then(metadata => {
             // Compute token balance in human-readable format
             balance = balance/Math.pow(10, metadata['decimals']);
             balance = balance.toFixed(2);
             
             // Print name, balance, and symbol of token
             console.log(`${i++}. ${metadata['name']}: ${balance} 
             ${metadata['symbol']}`)
          })
          .catch(error => console.log('error', error))
    }
  })
  .catch(error => console.log('error', error));
```
{% endtab %}

{% tab title="Fetch" %}
```javascript
// Wallet address
const address = '0xd8da6bf26964af9d7eed9e03e53415d37aa96045'

// Alchemy URL
const baseURL = `<-- ALCHEMY APP HTTP URL -->`;

const raw = JSON.stringify({
  "jsonrpc": "2.0",
  "method": "alchemy_getTokenBalances",
  "headers": {
    "Content-Type": "application/json"
  },
  "params": [
    `${address}`,
    "DEFAULT_TOKENS",
  ],
  "id": 42
});

const requestOptions = {
  method: 'POST',
  body: raw,
  redirect: 'follow'
};

// Make the request and print the formatted response:
fetch(baseURL, requestOptions)
  .then(response => {
  
       // Get balances
       const balances = response['data']['result']
        
       // Remove tokens with zero balance
       const nonZeroBalances = 
       balances['tokenBalances'].filter(token => {
          return token['tokenBalance'] !== '0'
       })

       console.log(`Token balances of ${address} \n`)
    
       // Counter for SNo of final output
       let i = 1
    
       // Loop through all tokens with non-zero balance
       for (token of nonZeroBalances) {
    
          // Get balance of token 
          let balance = token['tokenBalance']
          
          const metadataRaw = JSON.stringify({
              "jsonrpc": "2.0",
              "method": "alchemy_getTokenMetadata",
              "headers": {
               'Content-Type': 'application/json'
              },
              "params": [
                  `${token['contractAddress']}`
              ],
              "id": 42
          });
          
          const metadataOptions = {
             method: 'POST',
             body: metadataRaw
             redirect: 'follow',
          };  
          
          // Get metadata of token
          fetch(baseUrl, metadataOptions)
             .then(metadata => {
                // Compute token balance in human-readable format
                balance = balance/Math.pow(10, metadata['decimals']);
                balance = balance.toFixed(2);
                
                // Print name, balance, and symbol of token
                console.log(`${i++}. ${metadata['name']}: ${balance} 
                ${metadata['symbol']}`)
             })
             .catch(error => console.log('error', error))
          }
  })
  .catch(error => console.log('error', error));
```
{% endtab %}
{% endtabs %}

Run the script again using:

```bash
node main.js
```

You should obtain an output that looks something like this:

```
Token balances of 0xd8da6bf26964af9d7eed9e03e53415d37aa96045 

1. Tether: 0.10 USDT
2. USD Coin: 5.00 USDC
3. WETH: 0.05 WETH
4. ApeCoin: 1.00 APE
5. Mirror Protocol: 0.00 MIR
6. Shiba Inu: 3.14 SHIB
7. Dai: 764324.64 DAI
8. Loopring: 1000.32 LRC
9. SushiSwap: 0.00 SUSHI
10. Axie Infinity: 0.02 AXS
11. Ethereum Name Service: 1143.54 ENS
12. OMG Network: 123638.06 OMG
13. Basic Attention Token: 17.47 BAT
14. dYdX: 0.52 DYDX
15. Mask Network: 1.00 MASK
16. 1inch Network: 5.00 1INCH
17. Livepeer: 2.26 LPT
18. Request: 126.00 REQ
19. HEX: 100.00 HEX
```

## Conclusion

Congratulations! You now know how to use the [Alchemy Token API](./) to get all tokens and token balances of any address on the Ethereum blockchain.

If you enjoyed this tutorial for how to get all tokens owned by an address, give us a tweet [@AlchemyPlatform](https://twitter.com/AlchemyPlatform), or shoutout feedback to the authors [@rounak\_banik](https://twitter.com/Rounak\_Banik) and [@ankg404](https://twitter.com/ankg404)!

Don't forget to join our [Discord server](https://www.alchemy.com/discord) to meet other blockchain devs, builders, and entrepreneurs.

Ready to start using the Alchemy Token API?

[Create a free Alchemy account ](https://alchemy.com/?a=645c54745b)and share your project with us!
