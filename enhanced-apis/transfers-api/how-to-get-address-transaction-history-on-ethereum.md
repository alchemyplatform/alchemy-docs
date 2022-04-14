---
description: >-
  Learn how to get the full transaction history for a smart contract or a user
  address including external, internal, token, ERC-20, ERC-721 and ERC-1155
  token transfers in a single request.
---

# How to get address transaction history on Ethereum

**In this tutorial, we’ll be using Alchemy’s** [**Transfers API** ](../transfers-api.md)**to fetch all transactions sent **_**`from`**_** and sent **_**`to`**_** addresses you care about to create a complete picture of a user's transaction history.**

If your Web3 application has a user interface, there's a high change you’ll want to display your user’s transaction history. This includes everything from interactions with specific smart contracts to or an entire history of all their Web3 transactions. **** Regardless of the different types of transaction history you want to look up, this process can be extremely burdensome for developers to stitch together without the [Alchemy Transfers API](../transfers-api.md).&#x20;

## How to query transaction history

When using the [Transfers API](../transfers-api.md) for querying a user’s full on-chain history, its important to have a few key parameters on hand.

* `fromAddress`: the address we want to see transaction information originating from
* `toAddress`: the address we want to see for recipient-based transactions
* `fromBlock`: the starting time range we want to fetch transactions over (defaults to `latest`)
* `toBlock` : the ending time range we want to fetch transactions over (defaults to `latest`)
* `category`: the type of transfer events we care about, in our case we want to see all transactions so we can simply let the param use its default argument of \["`external`", "`internal`", "`token`"]

For transaction information that originates from your target sender address, use the `fromAddress` parameter within the [Transfers API](../transfers-api.md). For recipient-based transactions, use the `toAddress` parameter.&#x20;

{% hint style="info" %}
If you want to get transactions that have a specific from AND to address, you can specify the `fromAddress`and`toAddress` in your request.
{% endhint %}

## **Example: Getting Transactions O**riginating From  **An Address**

{% hint style="success" %}
### **No-code Example**

**For a no-code view of the API request check out the** [**composer tool**](https://composer.alchemyapi.io/?composer\_state=%7B%22chain%22%3A0%2C%22network%22%3A0%2C%22methodName%22%3A%22alchemy\_getAssetTransfers%22%2C%22paramValues%22%3A%5B%7B%22excludeZeroValue%22%3Atrue%2C%22toAddress%22%3A%22%22%2C%22toBlock%22%3A%22%22%2C%22fromAddress%22%3A%220x5c43B1eD97e52d009611D89b74fA829FE4ac56b1%22%2C%22fromBlock%22%3A%220x0%22%7D%5D%7D)**.**&#x20;
{% endhint %}

{% tabs %}
{% tab title="Alchemy Web3.js (Recommended)" %}
{% embed url="https://github.com/alchemyplatform/transfers_api_javascript_scripts/blob/main/javascript/alchemyweb3/tx-history/tx-history-from-alchemyweb3.js" %}
Tx History GitHub Repo
{% endembed %}

If you don't already have Alchemy Web3 installed, you can install the `alchemy-web3` module to easily interact with Alchemy APIs. We highly recommend using the `alchemy-web3` sdk because you also get websocket support, retries, and other benefits without the complexity!

For full documentation on `alchemy-web3`, check the [Github repo](https://github.com/alchemyplatform/alchemy-web3).

#### 1. Create a file.

In your current directory, create a new file called `alchemy-web3-transfers-from-script.js`

_****_\
_****_Use your favorite file browser, code editor, or just directly in the terminal using the `touch` command like this:

```
touch tx-history-from-alchemyweb3.js
```

\
**2. Write script!**

Copy and paste in the following code snippet into your new file: `tx-history-from-alchemyweb3.js`\
``

{% code title="tx-history-from-alchemyweb3.js" %}
```javascript
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

// Replace with your Alchemy api key:
const apiKey = "demo";

// Initialize an alchemy-web3 instance:
const web3 = createAlchemyWeb3(
  `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`,
);

const data = await web3.alchemy.getAssetTransfers({
  fromBlock: "0x0",
  fromAddress: "0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1",
})

// Print response:
console.log(data);
```
{% endcode %}



#### 3. Run script!

Now, on your command line, you can execute the script by calling:

```javascript
node alchemy-web3-transfers-from-script.js
```
{% endtab %}

{% tab title="Node-Fetch" %}
If you're using`node-fetch` a lightweight, common module that brings the Fetch API to Node.js and allows us to make our HTTP requests, here's a code snipper for the request you'd make!

{% embed url="https://github.com/alchemyplatform/transfers_api_javascript_scripts/blob/main/javascript/axios/tx-history/tx-history-from-axios.js" %}
Tx History GitHub Repo
{% endembed %}

#### 1. Create a file.

In your current directory, create a new file called `tx-history-from-fetch.js` using your favorite file browser, code editor, or just directly in the terminal using the `touch` command like this:

```
touch tx-history-from-fetch.js
```

####

#### 2. Write script!

Copy and paste in the following code snippet into your new file: `tx-history-from-fetch.js`

{% code title="tx-history-from-fetch.js" %}
```javascript
import fetch from 'node-fetch';

  let data = JSON.stringify({
  "jsonrpc": "2.0",
  "id": 0,
  "method": "alchemy_getAssetTransfers",
  "params": [
    {
      "fromBlock": "0x0",
      "fromAddress": "0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1",
    }
  ]
});


  var requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
    redirect: 'follow'
  };

  const apiKey = "demo"
  const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`;
  const fetchURL = `${baseURL}`;

  fetch(fetchURL, requestOptions)
    .then(response => response.json())
    .then(response => JSON.stringify(response, null, 2))
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
```
{% endcode %}



#### 3. Run script!

Now, on your command line, you can execute the script by calling:

```javascript
node tx-history-from-fetch.js
```
{% endtab %}

{% tab title="Axios" %}
If you're using Javascript `axios`, a promise-based HTTP client for the browser and Node.js which allows us to make a raw request to the Alchemy API, here's a code snipper for the request you'd make!

{% embed url="https://github.com/alchemyplatform/transfers_api_javascript_scripts/blob/main/javascript/fetch/tx-history/tx-history-from-fetch.js" %}
Tx History Github Repo
{% endembed %}

#### 1. Create a file.

In your current directory, create a new file called `tx-history-from-axios.js` using your favorite file browser, code editor, or just directly in the terminal using the `touch` command.&#x20;

```
touch tx-history-from-axios.js
```

####

#### 2. Write script!

Copy and paste in the following code snippet into your new file: `tx-history-from-axios.js`

{% code title="tx-history-from-axios.js" %}
```javascript
import axios from 'axios';

  let data = JSON.stringify({
  "jsonrpc": "2.0",
  "id": 0,
  "method": "alchemy_getAssetTransfers",
  "params": [
    {
      "fromBlock": "0x0",
      "fromAddress": "0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1",
    }
  ]
});

  var requestOptions = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: data,
  };

  const apiKey = "demo"
  const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`;
  const axiosURL = `${baseURL}`;

  axios(axiosURL, requestOptions)
    .then(response => console.log(JSON.stringify(response.data, null, 2)))
    .catch(error => console.log(error));
```
{% endcode %}

####

#### 3. Run script!

Now, on your command line, you can execute the script by calling:

```javascript
node tx-history-from-axios.js
```
{% endtab %}
{% endtabs %}

## **Example: Getting Recipient-based Transactions**&#x20;

{% hint style="success" %}
### **No-code Example**

**For a no-code view of the API request check out the** [**composer tool**](https://composer.alchemyapi.io/?composer\_state=%7B%22chain%22%3A0%2C%22network%22%3A0%2C%22methodName%22%3A%22alchemy\_getAssetTransfers%22%2C%22paramValues%22%3A%5B%7B%22excludeZeroValue%22%3Atrue%2C%22toAddress%22%3A%220x5c43B1eD97e52d009611D89b74fA829FE4ac56b1%22%2C%22toBlock%22%3A%22%22%2C%22fromAddress%22%3A%22%22%2C%22fromBlock%22%3A%220x0%22%7D%5D%7D)**.**&#x20;
{% endhint %}

{% tabs %}
{% tab title="Alchemy Web3.js (Recommended)" %}
{% embed url="https://github.com/alchemyplatform/transfers_api_javascript_scripts/blob/main/javascript/alchemyweb3/tx-history/tx-history-to-alchemyweb3.js" %}
Tx History GitHub Repo
{% endembed %}

If you don't already have Alchemy Web3 installed, you can install the `alchemy-web3` module to easily interact with Alchemy APIs. We highly recommend using the `alchemy-web3` sdk because you also get websocket support, retries, and other benefits without the complexity!

For full documentation on `alchemy-web3`, check the [Github repo](https://github.com/alchemyplatform/alchemy-web3).

####

#### 1. Create a file.

In your current directory, create a new file called `alchemy-web3-transfers-to-script.js`

Use your favorite file browser, code editor, or just directly in the terminal using the `touch` command like this:

```
touch alchemy-web3-transfers-to-script.js
```

####

#### 2. Write script!

Copy and paste in the following code snippet into your new file: `alchemy-web3-transfers-to-script.js`\
``

```javascript
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

// Replace with your Alchemy api key:
const apiKey = "demo";

// Initialize an alchemy-web3 instance:
const web3 = createAlchemyWeb3(
  `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`,
);

const data = await web3.alchemy.getAssetTransfers({
  fromBlock: "0x0",
  toAddress: "0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1",
})

// Print response:
console.log(data);
```

####

#### 3. Run script!

Now, on your command line, you can execute the script by calling:

```javascript
node alchemy-web3-transfers-to-script.js
```
{% endtab %}

{% tab title="Node-Fetch" %}
If you're using`node-fetch` a lightweight, common module that brings the Fetch API to Node.js and allows us to make our HTTP requests, here's a code snipper for the request you'd make!

{% embed url="https://github.com/alchemyplatform/transfers_api_javascript_scripts/blob/main/javascript/fetch/tx-history/tx-history-to-fetch.js" %}
Tx History GitHub Repo
{% endembed %}

#### 1. Create a file.

In your current directory, create a new file called `fetch-transfers-to-script.js` using your favorite file browser, code editor, or just directly in the terminal using the `touch` command like this:

```
touch fetch-transfers-to-script.js
```

####

#### 2. Write script!

Copy and paste in the following code snippet into your new file: `fetch-transfers-to-script.js`\
``

```javascript
import fetch from 'node-fetch';

  let data = JSON.stringify({
  "jsonrpc": "2.0",
  "id": 0,
  "method": "alchemy_getAssetTransfers",
  "params": [
    {
      "fromBlock": "0x0",
      "toAddress": "0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1",
    }
  ]
});


  var requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
    redirect: 'follow'
  };

  const apiKey = "demo"
  const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`;
  const fetchURL = `${baseURL}`;

  fetch(fetchURL, requestOptions)
    .then(response => response.json())
    .then(response => JSON.stringify(response, null, 2))
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
```

####

#### 3. Run script!

Now, on your command line, you can execute the script by calling:

```javascript
node fetch-transfers-from-script.js
```
{% endtab %}

{% tab title="Axios" %}
If you're using Javascript `axios`, a promise-based HTTP client for the browser and Node.js which allows us to make a raw request to the Alchemy API, here's a code snipper for the request you'd make!

{% embed url="https://github.com/alchemyplatform/transfers_api_javascript_scripts/blob/main/javascript/axios/tx-history/tx-history-to-axios.js" %}
Tx History GitHub Repo
{% endembed %}

#### 1. Create a file.

In your current directory, create a new file called `axios-transfers-to-script.js` using your favorite file browser, code editor, or just directly in the terminal using the `touch` command.&#x20;

```
touch axios-transfers-to-script.js
```

####

#### 2. Write script!

Copy and paste in the following code snippet into your new file: `axios-transfers-to-script.j`s

```javascript
import axios from 'axios';

  let data = JSON.stringify({
  "jsonrpc": "2.0",
  "id": 0,
  "method": "alchemy_getAssetTransfers",
  "params": [
    {
      "fromBlock": "0x0",
      "toAddress": "0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1",
    }
  ]
});


  var requestOptions = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: data,
  };

  const apiKey = "demo"
  const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`;
  const axiosURL = `${baseURL}`;

  axios(axiosURL, requestOptions)
    .then(response => console.log(JSON.stringify(response.data, null, 2)))
    .catch(error => console.log(error));
```

####

#### 3. Run script!

Now, on your command line, you can execute the script by calling:

```javascript
node axios-transfers-to-script.js
```
{% endtab %}
{% endtabs %}

## How to process the API response

Now that we have made a query and can see the response, let's learn how to handle it.\
\
If you feel like jumping ahead and grabbing some pre-built code, choose a repo that matches your preferred library.

{% tabs %}
{% tab title="Alchemy Web3 (Recommended)" %}
#### Parsing with `Alchemy Web3` Responses

{% embed url="https://github.com/alchemyplatform/transfers_api_javascript_scripts/blob/main/javascript/alchemyweb3/tx-history/tx-history-parsed-alchemyweb3.js" %}
{% endtab %}

{% tab title="Node-Fetch" %}
#### Parsing with `Node-Fetch` Responses

{% embed url="https://github.com/alchemyplatform/transfers_api_javascript_scripts/blob/main/javascript/fetch/tx-history/tx-history-parsed-fetch.js" %}
{% endtab %}

{% tab title="Axios" %}
#### Parsing with `Axios` Responses

{% embed url="https://github.com/alchemyplatform/transfers_api_javascript_scripts/blob/main/javascript/axios/tx-history/tx-history-parsed-axios.js" %}
{% endtab %}
{% endtabs %}

### Raw API Response:

Without parsing the response, we have a console log that looks as follows.

```javascript
{
  transfers: [
    {
      blockNum: '0xb7389b',
      hash: '0xfde2a5157eda40b90514751f74e3c7314f452a41890b19a342ee147f5336dfd6',
      from: '0x5c43b1ed97e52d009611d89b74fa829fe4ac56b1',
      to: '0xe9b29ae1b4da8ba5b1de76bfe775fbc5e25bc69a',
      value: 0.245,
      erc721TokenId: null,
      erc1155Metadata: null,
      tokenId: null,
      asset: 'ETH',
      category: 'external',
      rawContract: [Object]
    },
    
    ......
    
    {
      blockNum: '0xcf5dea',
      hash: '0x701f837467ae3112d787ddedf8051c4996ea82914f7a7735cb3db2d805799286',
      from: '0x5c43b1ed97e52d009611d89b74fa829fe4ac56b1',
      to: '0x92560c178ce069cc014138ed3c2f5221ba71f58a',
      value: 152.89962568845024,
      erc721TokenId: null,
      erc1155Metadata: null,
      tokenId: null,
      asset: 'ENS',
      category: 'token',
      rawContract: [Object]
    },
    {
      blockNum: '0xd14898',
      hash: '0x2f5d93a9db65548eb43794aa43698acd653e6b2df35c6028b8599a234f2c6dc0',
      from: '0x5c43b1ed97e52d009611d89b74fa829fe4ac56b1',
      to: '0x83abecf7204d5afc1bea5df734f085f2535a9976',
      value: 27579.060635486854,
      erc721TokenId: null,
      erc1155Metadata: null,
      tokenId: null,
      asset: 'PEOPLE',
      category: 'token',
      rawContract: [Object]
    }
  ]
}
```

### Understanding API Response:

* `blockNum`: the block number where a transaction event occurred, in `hex`&#x20;
* `hash`: the transaction hash of a transaction
* `from`: where the transaction originated from
* `to`: where ETH or another asset was transferred to
* `value`:  the amount of ETH transferred
* `erc721TokenId`: the ERC721 token ID. `null` if not an ERC721 token transfer.
* `erc1155Metadata`: a list of objects containing the ERC1155 `tokenId`  and `value`. `null` if not an ERC1155 transfer
* `tokenId`: the token ID for ERC721 tokens or other NFT token standards&#x20;
* `asset`: `ETH` or the token's symbol. `null` if not defined in the contract and not available from other sources.
* `rawContract`
  * `value`: raw transfer value denominated in the relevant Ethereum token
  * `address`: Ethereum token contract address
  * `decimal`:  contract decimal

### Printing out the `asset` and `value`&#x20;

Two of the many different response objects you may be interested in parsing are: `asset` and `value`.&#x20;

Let's walk through an example that parses the returned JSON object.

Whether we're querying via `alchemy web3`, `axios`, or `node-fetch`, we'll need to save the queried response object into a constant.

{% tabs %}
{% tab title="Alchemy Web3 (Recommended)" %}
#### Saving response objects with `Alchemy Web3`

```javascript
 // Alchemy Web3

  const res = await web3.alchemy.getAssetTransfers({
  fromBlock: "0x0",
  toAddress: "0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1",
  })
```
{% endtab %}

{% tab title="Node-Fetch" %}
#### Saving response objects with `Node-Fetch`

```javascript
  // Node-Fetch
  
  fetch(fetchURL, requestOptions)
    .then((res) => {
      return res.json()
    })
    .then((jsonResponse) => {
      //Print token name / asset value
      for (const events of jsonResponse.result.transfers) {
       console.log("Token Transfer: ", events.value, " ", events.asset);
      }
    })
    .catch((err) => {
      // handle error
      console.error(err);
    });

```
{% endtab %}

{% tab title="Axios" %}
#### Saving response objects with `Axios`

```javascript
  // Axios
  
  const res = await axios(axiosURL, requestOptions);
```
{% endtab %}
{% endtabs %}

With our queried response object saved as a constant, we can now index through the transfers. \
\
In particular, the steps we take are:

1. Loop through all transfers in the result
2. Print each element's `value` and `asset` field

```javascript
  // Print token asset name and its associated value
  for (const events of res.data.result.transfers) {
    console.log("Token Transfer: ", events.value, " ", events.asset);
  }

```

If you followed along, your response should look like the following:

```python
Token Transfer:  0.5   ETH
Token Transfer:  0.27   ETH
Token Transfer:  9.90384   ETH
Token Transfer:  0.07024968   ETH
Token Transfer:  0.000447494250654841   ETH
Token Transfer:  null   null
Token Transfer:  0.075   ETH
Token Transfer:  0.003   ETH
Token Transfer:  null   BURN
Token Transfer:  54   DAI
Token Transfer:  12.5   GTC
Token Transfer:  2   GTC
Token Transfer:  0.42   ETH
........
Token Transfer:  0.588   WETH
Token Transfer:  null   null
Token Transfer:  null   null
Token Transfer:  2.3313024   ETH
Token Transfer:  0.0633910153108353   ETH
Token Transfer:  0.0335   ETH
Token Transfer:  2   GTC
```

And that's it! You've now learned how to fetch transaction history for address on Ethereum. For more, check out the tutorial below:

{% content-ref url="../../tutorials/transfers-tutorial.md" %}
[transfers-tutorial.md](../../tutorials/transfers-tutorial.md)
{% endcontent-ref %}

If you enjoyed this tutorial for getting address transaction history on Ethereum, give us a tweet [@AlchemyPlatform](https://twitter.com/AlchemyPlatform)!  (Or give the author [@crypt0zeke](https://twitter.com/crypt0zeke) a shoutout!)

Don't forget to join our [Discord server](https://www.alchemy.com/discord) to meet other blockchain devs, builders, and entrepreneurs!&#x20;
