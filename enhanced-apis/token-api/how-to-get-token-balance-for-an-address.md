---
description: >-
  Learn how to get the balance of a single token being held by a specific
  contract address.
---

# How to get token balance for an address

The token balances for a user address is a critical data point for almost any web3 use case - be it DeFi platforms, wallets, analytics, exchanges and many others. A common use case would be displaying the balances as below in your wallet app

![Sample wallet screen displaying coin balances](<../../.gitbook/assets/eae2cc0773da4fd28b058bbc840f9958 (1).png>)

To fetch this data you have 2 options&#x20;

1. Fetch the Transaction History for the token’s contract, for example take USDT, which is [millions of records](https://etherscan.io/token/0xdac17f958d2ee523a2206206994597c13d831ec7). Then search through for your user’s address among those records (will take hours) and then show that to your user. Not to forget, do this indexing process every second forever to keep it updated for every user.&#x20;
2. OR just use Alchemy’s [`getTokenBalances`](alchemy\_gettokenbalances.md) endpoint&#x20;

If you’re like most web3 developers, you probably want to go for the second option!&#x20;

### How to query the token balance of an address&#x20;

When querying the token balance for a user, you should have couple of key parameters on hand&#x20;

* `OwnerAddress`: This is the blockchain address that owns the tokens in question. Note that this is not the contract address of the token itself.&#x20;
* `tokenContractAddress` : One of the following values:&#x20;
  * An array of contract addresses of all the token’s you want the balances for&#x20;
  * The string "DEFAULT\_TOKENS" - denotes a query for the [top 100 tokens by 24 hour volume](https://www.coingecko.com/en/coins/high\_volume).&#x20;

Example: Get current USDT balance for an Address &#x20;

For this particular example we're going to fetch the USDT balance for address  [`0x00000000219ab540356cbb839cbe05303d7705fa`](https://etherscan.io/address/0x00000000219ab540356cbb839cbe05303d7705fa) (fun fact: this address has the highest ETH balance among all addresses! )

{% hint style="success" %}
#### No-Code Example

For a no-code view of the API request, check out the [composer tool](https://composer.alchemyapi.io/?share=eJwti8EOgjAQRP9lzx6WllLKTSEePRkvQMy2rGKgxSBGjfHfbYyTOcwk773B9XQJUOAKAi\_PaR5\_2.PST92OPEMBNLqe.et45mU.DRw2NFJwfIMVXGkmf6DxHl9RAz7xH5EYsipFqTJnbS6Ns4xKouy0RnWi6NZN5Lt1meitUXklmJWQJARmscakyugykVUuE3a6gRbazxfzpDNj)
{% endhint %}

{% tabs %}
{% tab title="Alchemy Web3.js (Recommended)" %}
{% embed url="https://github.com/OMGWINNING/token_api_javascript_scripts/blob/master/token-balances-from-alchemyWeb3.js" %}

#### Step 1: Install Alchemy-Web3 and create a file

Run the below commands in the command line

```bash
npm install @alch/alchemy-web3
touch token-balances-from-alchemyWeb3.js
```

&#x20;

#### Step 2: Write the token balance querying script

Inside the `token-balances-from-alchemyWeb3.js` file, paste the below code

```javascript
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
 
//Replace with your API Key
const apiKey = "demo";
 
// Initialize an alchemy-web3 instance:
const web3 = createAlchemyWeb3(
   `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`,
 );
 
//Feel free to switch this wallet address with another address
const ownerAddress = "0x00000000219ab540356cbb839cbe05303d7705fa";

//The below token contract address corresponds to USDT
const tokenContractAddresses = ["0xdAC17F958D2ee523a2206206994597C13D831ec7"];

const data = await web3.alchemy.getTokenBalances( ownerAddress, tokenContractAddresses);
 
console.log("Token balance for Address");
console.log(data);
```



#### Step 3: Run the code to get the token balance with alchemy-web3.js

```bash
node token-balances-from-alchemyWeb3.js
```

\
You should see the below output

```json
Token balance for Address
{
  address: '0x00000000219ab540356cbb839cbe05303d7705fa',
  tokenBalances: [
    {
      contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      tokenBalance: '4929853276',
      error: null
    }
  ]
}
```
{% endtab %}

{% tab title="Node-Fetch" %}
{% embed url="https://github.com/OMGWINNING/token_api_javascript_scripts/blob/master/token-balances-from-fetch.js" %}

#### Step 1: Create a node-fetch file

Run the below commands in the command line

```bash
touch token-balances-from-fetch.js
```



#### Step 2: Write the script for querying token balances!&#x20;

Inside the `token-balances-from-fetch.js` file, paste the below code

```javascript
import fetch from 'node-fetch';

// Replace with your Alchemy API key:
const apiKey = "demo";

const fetchURL = `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`;

// Replace with the wallet address you want to query:
const ownerAddr = "0x00000000219ab540356cbb839cbe05303d7705fa";

// Replace with the token contract address you want to query:
const tokenAddr = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

var raw = JSON.stringify({
  "jsonrpc": "2.0",
  "method": "alchemy_getTokenBalances",
  "headers": {
    "Content-Type": "application/json"
  },
  "params": [
    `${ownerAddr}`,
    [
      `${tokenAddr}`,
    ]
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
  .then(response => JSON.stringify(response, null, 2))
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```



#### Step 3: Run the code to get the token balance with Node-Fetch

```bash
node token-balances-from-fetch.js
```



You should see the below output

```json
Token balance for Address
{
  address: '0x00000000219ab540356cbb839cbe05303d7705fa',
  tokenBalances: [
    {
      contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      tokenBalance: '4929853276',
      error: null
    }
  ]
}
```
{% endtab %}

{% tab title="Axios" %}
{% embed url="https://github.com/OMGWINNING/token_api_javascript_scripts/blob/master/token-balances-from-axios.js" %}

#### Step 1: Install axios and create a file

Run the below commands in the command line

```bash
npm install axios
touch token-balances-from-axios.js
```



#### Step 2: Write the script to query token balances with Axios&#x20;

Inside the `token-balances-from-axios.js` file, paste the below code

```javascript
import axios from 'axios';

// Replace with your Alchemy API key:
const apiKey = "demo";

const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`;

// Replace with the wallet address you want to query:
const ownerAddr = "0x00000000219ab540356cbb839cbe05303d7705fa";

// Replace with the token contract address you want to query:
const tokenAddr = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

var data = JSON.stringify({
  "jsonrpc": "2.0",
  "method": "alchemy_getTokenBalances",
  "params": [
    `${ownerAddr}`,
    [
      `${tokenAddr}`
    ]
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
  //This line converts the tokenBalance values from hex to decimal
  response.data["result"]["tokenBalances"][0]["tokenBalance"] = parseInt(response.data["result"]["tokenBalances"][0]["tokenBalance"], 16);
  console.log("Token balance for address\n", JSON.stringify(response.data.result, null, 2))
})
.catch(function (error) {
  console.log(error);
});
```

####

#### Step 4: Run the code to get token balances with Axios

```bash
node token-balances-from-axios.js
```

\
You should see output like&#x20;

```json
Token balance for Address
{
  address: '0x00000000219ab540356cbb839cbe05303d7705fa',
  tokenBalances: [
    {
      contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      tokenBalance: '4929853276',
      error: null
    }
  ]
}
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
In the above steps, you can replace the `ownerAddress` with any owner’s address and replace `tokenContractAddresses` with any array of addresses, to get the right token balance!&#x20;
{% endhint %}

### How to process the API response

Now that we have made the query and can see the response, let's learn how to handle it.

If you feel like jumping ahead and grabbing some pre-built code, choose and pick a code from the below options that matches your preferred library.

{% tabs %}
{% tab title="Alchemy Web3 (Recommended)" %}
The below linked Github script is for the Alchemy-Web3.js library and takes the output of the [getTokenBalances](alchemy\_gettokenbalances.md) endpoint, joins it with the output of the [getTokenMetadata](alchemy\_gettokenmetadata.md) endpoint and returns a clean output "The balance of Token X is Y"\


{% embed url="https://github.com/OMGWINNING/token_api_javascript_scripts/blob/master/token-balances-parsed-from-alchemyWeb3.js" %}
{% endtab %}

{% tab title="Node-Fetch" %}
The below linked Github script uses Node-fetch and takes the output of the [`getTokenBalances`](alchemy\_gettokenbalances.md) endpoint, joins it with the output of the [getTokenMetadata](alchemy\_gettokenmetadata.md) endpoint and returns a clean output "The balance of Token X is Y"\


{% embed url="https://github.com/OMGWINNING/token_api_javascript_scripts/blob/master/token-balances-parsed-from-fetch.js" %}
{% endtab %}

{% tab title="Axios" %}
The below linked Github script uses Axios.js and takes the output of the [getTokenBalances](alchemy\_gettokenbalances.md) endpoint, joins it with the output of the [getTokenMetadata](alchemy\_gettokenmetadata.md) endpoint and returns a clean output "The balance of Token X is Y"\


{% embed url="https://github.com/OMGWINNING/token_api_javascript_scripts/blob/master/token-balances-parsed-from-axios.js" %}
{% endtab %}
{% endtabs %}

#### Raw API Response:

The usual result looks something like this

```json
{
  "address": "0x00000000219ab540356cbb839cbe05303d7705fa",
  "tokenBalances": [
    {
      "contractAddress": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      "tokenBalance": 4929853276,
      "error": null
    }
  ]
}
```

Understanding the API Response:

* `Address`: The address of the owner for whom you want to pull the balance of the token
* `contractAddress`: The contract address of the token in question. To pull the actual name of the token and other details, we will use another API [getTokenMetadata](alchemy\_gettokenmetadata.md). &#x20;
* `tokenBalance`: balance of the specific `contractAddress` for the owner address `address`

The `tokenBalance` in its raw form as returned by [getTokenBalances](alchemy\_gettokenbalances.md) is the number in terms of the [smallest unit of the token](https://docs.ethhub.io/guides/a-straightforward-guide-erc20-tokens/). In the code below, we do a bit of calculation to get the clear quantity of the token in decimal units.

{% hint style="info" %}
### The Calculation for tokenBalance

The tokenBalance returned by the API is usually a number with several digits (in this case `4929853276` for USDT)\
\
Every ERC20 token has a metadata information called "[decimals](https://medium.com/@jgm.orinoco/understanding-erc-20-token-contracts-a809a7310aa5)" which denotes the divisibility of a token (ranges from 0 to 18). For USDT, the value of "decimals" is 6. The response returned by Alchemy's [getTokenBalances](alchemy\_gettokenbalances.md) API is as below\


`tokenBalance = no. of tokens (quantity) * Math.pow(10, 6)`\
\
Hence, the actual quantity of the USDT token in this case will be \
\
`4929853276/10^6 = 4,929.853276`\
\
The same operation needs to be done to obtain the actual quantity for any token. We show the calculation in the code below.
{% endhint %}

### **How to c**alculate & print the `tokenName` and `tokenBalance`&#x20;

Two of the many different response objects you may be interested in parsing are: `tokenName` and `tokenBalance (in USD)`

Whether we're querying via `alchemy-web3`, `axios`, or `node-fetch`, we'll have to follow the below steps\
1\. Save the response of [`getTokenBalances`](alchemy\_gettokenbalances.md) into a constant/variable\
2\. Get the Token name for the concerned Token Contract address (using [getTokenMetadata](alchemy\_gettokenmetadata.md))\
3\. Convert the tokenBalance into the correct units (using [getTokenMetadata](alchemy\_gettokenmetadata.md))

Let's walk through the below sample code that parses the returned JSON object.

{% tabs %}
{% tab title="Alchemy Web3 (Recommended)" %}
```javascript
/*
** Fetching the metadata for the token with Alchemy's getTokenMetadata API
*/
const metadata = await web3.alchemy.getTokenMetadata( 
                     tokenContractAddresses[0]
                 );

//Forming the name of the token that comprises of the Name and the Symbol of the token
const tokenName = metadata.name + "(" + metadata.symbol + ")";

/* Calculating the tokenBalance in decimal. The "decimals" field in the token metadata on line 21 tells us 
how many digits at the end of the tokenBalance in Line 17 are to the right of the decimal. 
so we divide the Full tokenBalance with 10 to the power of the decimal value of the token
*/
const tokenBalance = data["tokenBalances"][0]["tokenBalance"]/Math.pow(10, metadata.decimals)
console.log("Token balance for", tokenName, "is", tokenBalance);
```
{% endtab %}

{% tab title="Node-Fetch" %}
```javascript
var metadata;

var metadataRaw = JSON.stringify({
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

var metadataRequestOptions = {
  method: 'POST',
  body: metadataRaw,
  redirect: 'follow'
};

/*
** Fetching the metadata for the token with Alchemy's getTokenMetadata API
*/
fetch(fetchURL, metadataRequestOptions)
  .then(response => response.json())
  .then(response => {
    metadata = response.result;

    //Forming the name of the token that comprises of the Name and the Symbol of the token
    const tokenName = metadata.name + "(" + metadata.symbol + ")";

    /* Calculating the tokenBalance in decimal. The "decimals" field in the token metadata on line 21 tells us 
    how many digits at the end of the tokenBalance in Line 17 are to the right of the decimal. 
    so we divide the Full tokenBalance with 10 to the power of the decimal value of the token
    */
    const tokenBalance = data["tokenBalances"][0]["tokenBalance"]/Math.pow(10, metadata.decimals)
    console.log("Token balance for", tokenName, "is", tokenBalance);
  })
  .catch(error => console.log('error', error));

```
{% endtab %}

{% tab title="Axios" %}
```javascript
/*
** Fetching the metadata for the token with Alchemy's getTokenMetadata API
*/
var metadataParams = JSON.stringify({
  "jsonrpc": "2.0",
  "method": "alchemy_getTokenMetadata",
  "params": [
      `${tokenAddr}`
  ],
  "id": 42
});

var metadataConfig = {
  method: 'post',
  url: baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  data : metadataParams
};  

axios(metadataConfig)
.then(function (response) {
  metadata = response.data.result;

  //Forming the name of the token that comprises of the Name and the Symbol of the token
  const tokenName = metadata.name + "(" + metadata.symbol + ")";

  /* Calculating the tokenBalance in decimal. The "decimals" field in the token metadata on line 21 tells us 
  how many digits at the end of the tokenBalance in Line 17 are to the right of the decimal. 
  so we divide the full tokenBalance with 10 to the power of the decimal value of the token
  */
  const tokenBalance = data["tokenBalances"][0]["tokenBalance"]/Math.pow(10, metadata.decimals)
  console.log("Token balance for", tokenName, "is", tokenBalance);
})
```
{% endtab %}
{% endtabs %}

The output that you would see from running the above code is

```bash
Token balance for Tether(USDT) is 4929.853276
```

With this, you're all set to fetch token balances from TokenAPI. This can also be extended to fetching the balance for multiple tokens by passing in an array of token addresses, or using the default list (see example [here](https://composer.alchemyapi.io/?share=eJwti00PwUAQQP.LnHsY1qr2RtSF1EG5iDSz22Gl\_yG1goj.rpG\_03uH9wFt6OohxwQ8x2fo2r87jiY0JTmGHMhqw\_5dXzhWoWW.IEte8x0SuFFH7kD20Vd\_BHzhwHiUkZITFHKqlZqJTCtGKVA0aYryTP27LFbz.aaqq\_26KHdw\_v4AtWQrlQ--))!\
\
If you enjoyed this tutorial for getting address transaction history on Ethereum, give us a tweet [@AlchemyPlatform](https://twitter.com/AlchemyPlatform)!  (Or if you have any questions/feedback give the author [@ankg404](https://twitter.com/ankg404) a shoutout!)

Don't forget to join our [Discord server](https://www.alchemy.com/discord) to meet other blockchain devs, builders, and entrepreneurs! \
