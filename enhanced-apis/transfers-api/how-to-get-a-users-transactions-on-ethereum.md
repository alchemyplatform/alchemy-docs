---
description: >-
  Learn how to get the full transaction history for a contract or user address
  including ERC-20, ERC-721 and ERC-1155 token transfers in a single request.
---

# How to get a users transactions on Ethereum

**In this tutorial, we’ll be using Alchemy’s** [**Transfers API** ](../transfers-api.md)**to fetch all transactions sent **_**`from`**_** and sent **_**`to`**_** addresses you care about to create a complete picture of a user's transaction history.**

> If your Web3 application has a user interface, there's a high change you’ll want to display your user’s transaction history. This includes everything from interactions with specific smart contracts to or an entire picture of a user’s Web3 transactions. **** Regardless of the different types of transaction history you want to look up, this process can be extremely burdensome for developers to stitch together without the [Alchemy Transfers API](../transfers-api.md).&#x20;

## How to query transaction history

1.  [Select an address for transaction history](how-to-get-a-users-transactions-on-ethereum.md#1.-select-an-address-for-transaction-history)

    a) This address can be a contract address or user-owned address and will be used to set the _**from**_ and the _**to**_** ** parameters!
2.  [Pick a block range for transaction query](how-to-get-a-users-transactions-on-ethereum.md#2.-pick-a-block-range-for-transaction-query)

    a) Set the `fromBlock` and `toBlock` for our transaction history range
3.  [Specify filter type for transactions/transfers](how-to-get-a-users-transactions-on-ethereum.md#3.-specify-filter-type-for-transactions-transfers)

    a) Transaction filters can by external txs, internal tx, or by token type. Learn more about transfer types [here](https://docs.alchemy.com/alchemy/enhanced-apis/transfers-api#types-of-transfers)!&#x20;
4. [Send API request!](how-to-get-a-users-transactions-on-ethereum.md#4.-send-api-request)
5. [Repeat with the `to` address specified instead of the `from` address](how-to-get-a-users-transactions-on-ethereum.md#5.-repeat-with-the-to-address-specified-instead-of-the-from-address)
6. [Parsing API response.](how-to-get-a-users-transactions-on-ethereum.md#api-response)

For more detailed information on the [Alchemy Transfers API](https://docs.alchemy.com/alchemy/enhanced-apis/transfers-api), please refer to its [docs page](../transfers-api.md)!

## **Querying Transactions Sent by Target **_**`from` **_** or **_**`to` A**_**ddress**

When using the [Transfers API](../transfers-api.md) for querying a user’s full on-chain history, its important to have a few key API parameters on hand.

[Check the Composer App for a no-code version of the query we're making together.](https://composer.alchemyapi.io/?composer\_state=%7B%22chain%22%3A0%2C%22network%22%3A0%2C%22methodName%22%3A%22alchemy\_getAssetTransfers%22%2C%22paramValues%22%3A%5B%7B%22excludeZeroValue%22%3Atrue%2C%22toAddress%22%3A%22%22%2C%22toBlock%22%3A%22%22%2C%22fromAddress%22%3A%220x5c43B1eD97e52d009611D89b74fA829FE4ac56b1%22%2C%22fromBlock%22%3A%220x0%22%7D%5D%7D)

### **1.** _**Select an address for transaction history**_

> Your target address can be anything from a contract address like the [Uniswap V3](https://etherscan.io/address/0xe592427a0aece92de3edee1f18e0157c05861564) contract: 0xE592427A0AEce92De3Edee1F18E0157C05861564  or a user-owned address like [vitalik.eth](https://etherscan.io/address/0xd8da6bf26964af9d7eed9e03e53415d37aa96045): 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045.&#x20;

For transaction information that originates from your target sender address, use the `fromAddress` parameter within the [Transfers API](../transfers-api.md). For recipient-based transactions, use the `toAddress` parameter! You can also use the `fromAddress` and `toAddress` in combination as an AND operation for further filtering!

### **2.**  _**Pick a block range for transaction query**_

* The `fromBlock`API parameter determines the start of the block range that you seek to query address information for.&#x20;
* The `toBlock`API parameter determines the end of the block query range. You can use `"latest"` if you want the query to include data up to the most recent block.&#x20;

{% hint style="info" %}
NOTE: When querying the full history of an address’s on-chain interactions, we suggest looking back to the very beginning or the 0th block (**0x0**). If you’re looking to offer a condensed view of an address’s interactions with a particular DeFi protocol, you can also start your search with the date of the protocol’s contract deployment. \
By default, we'll use `"latest"` as the API parameter!
{% endhint %}

### **3.  **_**Specify filter type for transactions/transfers**_

* The `category` parameter helps you filter for specific transfers.&#x20;
* You can pass in any of the following strings as a list: `external`, `internal`, `token`, `erc20`, `erc721`, `erc1155` If unprompted, the default will be \["`external`", "`internal`", "`token`"]).

When searching through a user’s entire transfer history, the default parameter will work!

_**OPTIONAL**_

If you’re looking to query historical transactions limited to a particular set of tokens, you can also use the `contractAddresses`parameter which accepts a list of contract addresses in a hex string format and can be used to filter the ERC20/721/1155 token addresses returned in the response.&#x20;

For addresses with a large number of transfers due to spam, passing in this parameter will help speed up your queries!

{% hint style="info" %}
NOTE: The default use of this parameter, without specifying an address, returns any and all transfers by any token address.
{% endhint %}

### **4. **_**Send API request!**_

{% tabs %}
{% tab title="Alchemy Web3.js (Recommended)" %}
{% embed url="https://github.com/alchemyplatform/transfers_api_javascript_scripts/blob/main/alchemy-web3-transfers-from-script.js" %}

If you don't already have Alchemy Web3 installed, you can install the `alchemy-web3` module to easily interact with Alchemy APIs. We highly recommend using the `alchemy-web3` sdk because you also get websocket support, retries, and other benefits without the complexity!

For full documentation on `alchemy-web3`, check the [Github repo](https://github.com/alchemyplatform/alchemy-web3).

#### 1. Create a file.

In your current directory, create a new file called `alchemy-web3-transfers-from-script.js`

_****_\
_****_Use your favorite file browser, code editor, or just directly in the terminal using the `touch` command like this:

```
touch alchemy-web3-transfers-from-script.js
```

\
**2. Write script!**

Copy and paste in the following code snippet into your new file: `alchemy-web3-transfers-from-script.js`\
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
  fromAddress: "0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1",
})

// Print response:
console.log(data);

```



#### 3. Run script!

Now, on your command line, you can execute the script by calling:

```javascript
node alchemy-web3-transfers-from-script.js
```
{% endtab %}

{% tab title="Node-Fetch" %}
If you're using`node-fetch` a lightweight, common module that brings the Fetch API to Node.js and allows us to make our HTTP requests, here's a code snipper for the request you'd make!

{% embed url="https://github.com/alchemyplatform/transfers_api_javascript_scripts/blob/main/fetch-transfers-from-script.js" %}

#### 1. Create a file.

In your current directory, create a new file called `fetch-transfers-from-script.js` using your favorite file browser, code editor, or just directly in the terminal using the `touch` command like this:

```
touch fetch-transfers-from-script.js
```

####

#### 2. Write script!

Copy and paste in the following code snippet into your new file: `fetch-transfers-from-script.js`

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



#### 3. Run script!

Now, on your command line, you can execute the script by calling:

```javascript
node fetch-transfers-from-script.js
```
{% endtab %}

{% tab title="Axios" %}
If you're using Javascript `axios`, a promise-based HTTP client for the browser and Node.js which allows us to make a raw request to the Alchemy API, here's a code snipper for the request you'd make!

{% embed url="https://github.com/alchemyplatform/transfers_api_javascript_scripts/blob/main/axios-transfers-from-script.js" %}

#### 1. Create a file.

In your current directory, create a new file called `axios-transfers-from-script.js` using your favorite file browser, code editor, or just directly in the terminal using the `touch` command.&#x20;

```
touch axios-transfers-from-script.js
```

####

#### 2. Write script!

Copy and paste in the following code snippet into your new file: `axios-transfers-from-script.j`s

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

####

#### 3. Run script!

Now, on your command line, you can execute the script by calling:

```javascript
node axios-transfers-from-script.js
```
{% endtab %}
{% endtabs %}

### **5.** Repeat with the `to` address specified instead of the `from` address

[Check the Composer App for a no-code version of the query we're making together.](https://composer.alchemyapi.io/?composer\_state=%7B%22chain%22%3A0%2C%22network%22%3A0%2C%22methodName%22%3A%22alchemy\_getAssetTransfers%22%2C%22paramValues%22%3A%5B%7B%22excludeZeroValue%22%3Atrue%2C%22toAddress%22%3A%220x5c43B1eD97e52d009611D89b74fA829FE4ac56b1%22%2C%22toBlock%22%3A%22%22%2C%22fromAddress%22%3A%22%22%2C%22fromBlock%22%3A%220x0%22%7D%5D%7D)

{% tabs %}
{% tab title="Alchemy Web3.js (Recommended)" %}
{% embed url="https://github.com/alchemyplatform/transfers_api_javascript_scripts/blob/main/alchemy-web3-transfers-to-script.js" %}

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
// alchemy-nft-api/alchemy-web3-script.js
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
{% embed url="https://github.com/alchemyplatform/transfers_api_javascript_scripts/blob/main/fetch-transfers-to-script.js" %}

If you're using`node-fetch` a lightweight, common module that brings the Fetch API to Node.js and allows us to make our HTTP requests, here's a code snipper for the request you'd make!\


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
###

{% embed url="https://github.com/alchemyplatform/transfers_api_javascript_scripts/blob/main/axios-transfers-to-script.js" %}

If you're using Javascript `axios`, a promise-based HTTP client for the browser and Node.js which allows us to make a raw request to the Alchemy API, here's a code snipper for the request you'd make!

####

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

### 6. Parsing API Response&#x20;

Now that we have made a query and see our response, let's learn how to handle it and make useful information out of it!\
\
If you feel like jumping ahead and grabbing some pre-built code, choose a repo that matches your preferred library.

{% tabs %}
{% tab title="Alchemy Web3 (Recommended)" %}
#### Parsing with `Alchemy Web3` Responses

{% embed url="https://github.com/alchemyplatform/transfers_api_javascript_scripts/blob/main/parsed-alchemy-web3-transfers-from-script.js" %}


{% endtab %}

{% tab title="Node-Fetch" %}
#### Parsing with `Axios` Responses

{% embed url="https://github.com/alchemyplatform/transfers_api_javascript_scripts/blob/main/parsed-axios-transfers-to-script.js" %}


{% endtab %}

{% tab title="Axios" %}
#### Parsing with `Node-Fetch` Responses

{% embed url="https://github.com/alchemyplatform/transfers_api_javascript_scripts/blob/main/parsed-fetch-transfers-to-script.js" %}


{% endtab %}
{% endtabs %}

#### Raw API Response:

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

Two of the many different response objects you may be interested in parsing are: `asset` and `value`.&#x20;

Let's walk through an example that parses the returned JSON object.

#### **1. Save the response object in a constant**

Whether we're querying via `alchemy web3`, `axios`, or `node-fetch`, we'll need to save the queried response object into a constant.

{% tabs %}
{% tab title="Alchemy Web3 (Recommended)" %}
#### Saving response objects with `Alchemy Web3`

```javascript
 // Alchmey Web3

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
  const res = await fetch(fetchURL, requestOptions)
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

With our queried response object saved as a constant, we can now index through the transfers. In particular, we first access the transfers list and then iterate across each element's `value` and `asset` field, printing them out as we go!

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
