---
description: Returns token balances for a specific address given a list of contracts.
---

# alchemy\_getTokenBalances

{% hint style="warning" %}
This method returns hex encoded values in the `tokenBalance` fields.
{% endhint %}



## Parameters

1. `DATA`, 20 Bytes - The address for which token balances will be checked
2. One of:
   1. `Array` - A list of contract addresses. Suggested limit: `100` addresses
   2. The `String`"DEFAULT\_TOKENS" - denotes a query for the top 100 tokens by 24 hour volume - only available on Mainnet for Ethereum, Polygon, and Arbitrum.

## Returns

`Object` - An object with the following fields:

* `address`: `DATA`, 20 Bytes - The address for which token balances were checked
* `tokenBalances`: `Array` - returns an array of token balance objects. Each object contains:
  * `contractAddress`
  * `tokenBalance`
  * `error`
  * One of `tokenBalance` or `error` will be null.

## [Example](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22alchemy\_getTokenBalances%22%2C%22paramValues%22%3A%5B%220x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be%22%2C%22%5B%5C%220x607f4c5bb672230e8672085532f7e901544a7375%5C%22%2C%20%5C%220x618e75ac90b12c6049ba3b27f5d5f8651b0037f6%5C%22%2C%20%5C%220x63b992e6246d88f07fc35a056d2c365e6d441a3d%5C%22%2C%20%5C%220x6467882316dc6e206feef05fba6deaa69277f155%5C%22%2C%20%5C%220x647f274b3a7248d6cf51b35f08e7e7fd6edfb271%5C%22%5D%22%5D%7D)

### Request

{% tabs %}
{% tab title="Alchemy Web3" %}
```javascript
// alchemy-token-api/alchemy-web3-script.js
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

// Replace with your Alchemy api key:
const apiKey = "demo";

// Initialize an alchemy-web3 instance:
const web3 = createAlchemyWeb3(
  `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`,
);

// The wallet address / token we want to query for:
const ownerAddr = "0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be";
const balances = await web3.alchemy.getTokenBalances(ownerAddr,["0x607f4c5bb672230e8672085532f7e901544a7375"])

console.log("BALANCES->");
console.log(balances);
```
{% endtab %}

{% tab title="Fetch (JS)" %}
```javascript
// alchemy-token-api/fetch-script.js
import fetch from 'node-fetch';

// Replace with your Alchemy API key:
const apiKey = "demo";
const fetchURL = `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`;

// Replace with the wallet address you want to query:
const ownerAddr = "0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be";
// Replace with the token contract address you want to query:
const tokenAddr = "0x607f4c5bb672230e8672085532f7e901544a7375";

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
{% endtab %}

{% tab title="Axios (JS)" %}
```javascript
// alchemy-token-api/axios-script.js
import axios from 'axios';

// Replace with your Alchemy API key:
const apiKey = "demo";
const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`;
// Replace with the wallet address you want to query:
const ownerAddr = "0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be";
// Replace with the token contract address you want to query:
const tokenAddr = "0x607f4c5bb672230e8672085532f7e901544a7375";

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
  console.log(JSON.stringify(response.data, null, 2))
})
.catch(function (error) {
  console.log(error);
});
```
{% endtab %}

{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"alchemy_getTokenBalances","params": ["0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be", ["0x607f4c5bb672230e8672085532f7e901544a7375", "0x618e75ac90b12c6049ba3b27f5d5f8651b0037f6", "0x63b992e6246d88f07fc35a056d2c365e6d441a3d", "0x6467882316dc6e206feef05fba6deaa69277f155", "0x647f274b3a7248d6cf51b35f08e7e7fd6edfb271"]],"id":"42"}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"alchemy_getTokenBalances",
    "params":["0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be", ["0x607f4c5bb672230e8672085532f7e901544a7375", "0x618e75ac90b12c6049ba3b27f5d5f8651b0037f6", "0x63b992e6246d88f07fc35a056d2c365e6d441a3d", "0x6467882316dc6e206feef05fba6deaa69277f155", "0x647f274b3a7248d6cf51b35f08e7e7fd6edfb271"]],
    "id":42
}
```
{% endtab %}
{% endtabs %}

### Result

```javascript
{
  "jsonrpc": "2.0",
  "id": 42,
  "result": {
    "address": "0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be",
    "tokenBalances": [
      {
        "contractAddress": "0x607f4c5bb672230e8672085532f7e901544a7375",
        "tokenBalance": "0x00000000000000000000000000000000000000000000000000003c005f81ab00",
        "error": null
      }
    ]
  }
}
```

## Use Cases&#x20;

For guidance on how to leverage this method, check out the following tutorials:

{% content-ref url="how-to-get-token-balance-for-an-address.md" %}
[how-to-get-token-balance-for-an-address.md](how-to-get-token-balance-for-an-address.md)
{% endcontent-ref %}

{% content-ref url="get-all-tokens-owned-by-address.md" %}
[get-all-tokens-owned-by-address.md](get-all-tokens-owned-by-address.md)
{% endcontent-ref %}
