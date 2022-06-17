---
description: >-
  Use Alchemy's token API to get all the metadata for your ERC-20 token
  including name, symbol and other important details
---

# How to get token metadata

Often when you are a DeFi app aggregating several tokens on your platform (like [Uniswap](https://uniswap.org/)), or an analytics app displaying data about thousands of tokens (like [CoinGecko](https://www.coingecko.com/)) - you need to show the metadata for several tokens. The metadata includes important fields like the name, symbol and logo for the token.\
\
Alchemy's Token API endpoint [`getTokenMetadata`](alchemy\_gettokenmetadata.md) can come in super handy for use-cases like that! In this tutorial we will fetch the metadata for USDT token.

{% hint style="info" %}
#### **Looking for NFT Metadata?**

For ERC721 or ERC1155 token metadata, check out the [getNFTMetadata](../nft-api/getnftmetadata.md) method.
{% endhint %}

### How to query the metadata for a token

When querying the metadata for a token, you need one input parameter

* `contractAddress`  This is the address of the token on the blockchain that you want to pull the metadata for.&#x20;

### Example: Get metadata for USDT token

For this particular example, we're going to fetch the metadata for USDT token which has the contract address [`0xdAC17F958D2ee523a2206206994597C13D831ec7`](https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7)``

{% hint style="success" %}
#### No-Code Example

For a no-code view of the API request, check out the [composer tool](https://composer.alchemyapi.io/?share=eJwdxksKwjAUBdC9vHEH\_RjTZA86Eici8kiuRtokUiMq4t5bCmdwfhQS3wt50VFBe9dpWJ.RUo17ziBPPIaE.L3c0A51QNmhceTG1NGDJ85HHl94kj\_R\_EQO0l6d6aMCjNKslNgunNsYZ4PUsdcSwdL5PwMcBCdb)
{% endhint %}

{% tabs %}
{% tab title="Alchemy Web3.js (Recommended)" %}
#### Step 1: Install Alchemy-Web3 and create a file

Run the below commands in the command line

```bash
npm install @alch/alchemy-web3
touch token-metadata-from-alchemyWeb3.js
```

&#x20;

#### Step 2: Write the token metadata querying script

Inside the `token-metadata-from-alchemyWeb3.js` file, paste the below code&#x20;

```javascript
// alchemy-token-api/alchemy-web3-script.js
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

// Replace with your Alchemy api key:
const apiKey = "demo";

// Initialize an alchemy-web3 instance:
const web3 = createAlchemyWeb3(
  `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`,
);

// The token address we want to query for metadata:
const metadata = await web3.alchemy.getTokenMetadata("0xdAC17F958D2ee523a2206206994597C13D831ec7")

console.log("TOKEN METADATA->");
console.log(metadata);
```

####

#### Step 3: Run the code to get the token metadata with alchemy-web3.js

```bash
node token-metadata-from-alchemyWeb3.js
```



You should see the below output

```json
TOKEN METADATA->
{
  decimals: 6,
  logo: 'https://static.alchemyapi.io/images/assets/825.png',
  name: 'Tether',
  symbol: 'USDT'
 }
```
{% endtab %}

{% tab title="Node-Fetch" %}
#### Step 1: Create a node-fetch file

Run the below commands in the command line

```bash
touch token-metadata-from-fetch.js
```

&#x20;

#### Step 2: Write the token metadata querying script

Inside the `token-metadata-from-fetch.js` file, paste the below code&#x20;

```javascript
import fetch from 'node-fetch';

// Replace with your Alchemy API key:
const apiKey = "demo";
const fetchURL = `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`;

// Replace with the token address you want to query:
const tokenAddr = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

var raw = JSON.stringify({
  "jsonrpc": "2.0",
  "method": "alchemy_getTokenMetadata",
  "headers": {
    "Content-Type": "application/json"
  },
  "params": [
    `${tokenAddr}`
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
  .then(response => response.json())
  .then(response => JSON.stringify(response["result"], null, 2))
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

####

#### Step 3: Run the code to get the token metadata with Node-fetch

```bash
node token-metadata-from-fetch.js
```



You should see the below output

```json
TOKEN METADATA->
{
  decimals: 6,
  logo: 'https://static.alchemyapi.io/images/assets/825.png',
  name: 'Tether',
  symbol: 'USDT'
 }
```


{% endtab %}

{% tab title="Axios" %}
#### Step 1: Install axios and create a file

Run the below commands in the command line

```bash
npm install axios
touch token-metadata-from-axios.js
```

&#x20;

#### Step 2: Write the token metadata querying script

Inside the `token-metadata-from-axios.js` file, paste the below code&#x20;

```javascript
// alchemy-token-api/axios-script.js
import axios from 'axios';

// Replace with your Alchemy API key:
const apiKey = "demo";
const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`;
// Replace with the wallet address you want to query:
const tokenAddr = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

var data = JSON.stringify({
  "jsonrpc": "2.0",
  "method": "alchemy_getTokenMetadata",
  "params": [
    `${tokenAddr}`
  ],
  "id": 42
});

var config = {
  method: 'post',
  url: baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data.result, null, 2))
})
.catch(function (error) {
  console.log(error);
});
```

####

#### Step 3: Run the code to get the token metadata with Axios

```bash
node token-metadata-from-axios.js
```



You should see the below output

```json
TOKEN METADATA->
{
  decimals: 6,
  logo: 'https://static.alchemyapi.io/images/assets/825.png',
  name: 'Tether',
  symbol: 'USDT'
}
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
In the above steps, you can replace the `tokenAddr` with any token's contract address to get its metadata!
{% endhint %}

### Understanding the API response

#### Raw API response:

```
{
  decimals: 6,
  logo: 'https://static.alchemyapi.io/images/assets/825.png',
  name: 'Tether',
  symbol: 'USDT'
}
```

* `decimals` : the lowest atomic unit of a token; The smallest amount of that token that can be exchanged between two addresses and transferring or storing any amount smaller than this is not possible
* `logo` : the official logo image of the token
* `name` : name of the token
* `symbol` : the 3 or 4 letter symbol of the token

\
With this, you're all set to fetch token metadata using TokenAPI! \
\
If you enjoyed this tutorial for getting address transaction history on Ethereum, give us a tweet [@AlchemyPlatform](https://twitter.com/AlchemyPlatform)!  (Or if you have any questions/feedback give the author [@ankg404](https://twitter.com/ankg404) a shoutout!)

Don't forget to join our [Discord server](https://www.alchemy.com/discord) to meet other blockchain devs, builders, and entrepreneurs!&#x20;
