---
description: Returns the amount which the spender is allowed to withdraw from the owner.
---

# getTokenAllowance

## **Parameters**

1. `Object` - An object with the following fields:
   * `contract`: `DATA`, 20 Bytes - The address of the token contract.
   * `owner`: `DATA`, 20 Bytes - The address of the token owner.
   * `spender`: `DATA`, 20 Bytes - The address of the token spender.

## Returns

`String` - The allowance amount.

## [Example](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22alchemy\_getTokenAllowance%22%2C%22paramValues%22%3A%5B%7B%22contract%22%3A%220xE41d2489571d322189246DaFA5ebDe1F4699F498%22%2C%22owner%22%3A%220xe8095A54C83b069316521835408736269bfb389C%22%2C%22spender%22%3A%220x3Bcc5bD4abBc853395eBE5103b7DbA20411E38db%22%7D%5D%7D)

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

const allowance = await web3.alchemy.getTokenAllowance({contract: "0xE41d2489571d322189246DaFA5ebDe1F4699F498", owner: "0xe8095A54C83b069316521835408736269bfb389C", spender:"0x3Bcc5bD4abBc853395eBE5103b7DbA20411E38db"})

console.log("TOKEN ALLOWANCE->");
console.log(allowance);
```
{% endtab %}

{% tab title="Fetch (JS)" %}
```javascript
import fetch from 'node-fetch';

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

const baseURL = "https://eth-mainnet.g.alchemy.com/v2/demo/getTokenAllowance/";

// replace with the respective address you want to query for
const contractAddr = "0xE41d2489571d322189246DaFA5ebDe1F4699F498";
const ownerAddr = "0xe8095A54C83b069316521835408736269bfb389C";
const spenderAddr = "0x3Bcc5bD4abBc853395eBE5103b7DbA20411E38db";
const fetchURL = `${baseURL}?contract=${contractAddr}?owner=${ownerAddr}?spender=${spenderAddr}`;

fetch(fetchURL, requestOptions)
  .then(response => response.json())
  .then(response => JSON.stringify(response, null, 2))
  .then(result => console.log(result))
  .catch(error => console.log('error', error))
```
{% endtab %}

{% tab title="Axios (JS)" %}
```javascript
import axios from 'axios';

// replace with your Alchemy api key
const apiKey = "demo";
const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${apiKey}/getNFTs/`;

// replace with the respective address you want to query for
cconst contractAddr = "0xE41d2489571d322189246DaFA5ebDe1F4699F498";
const ownerAddr = "0xe8095A54C83b069316521835408736269bfb389C";
const spenderAddr = "0x3Bcc5bD4abBc853395eBE5103b7DbA20411E38db";

var config = {
  method: 'get',
  url: `${baseURL}?contract=${contractAddr}?owner=${ownerAddr}?spender=${spenderAddr}`
};

axios(config)
.then(response => console.log(JSON.stringify(response.data, null, 2)))
.catch(error => console.log(error));

```
{% endtab %}

{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"alchemy_getTokenAllowance","params":[{"contract":"0xE41d2489571d322189246DaFA5ebDe1F4699F498", "owner":"0xe8095A54C83b069316521835408736269bfb389C", "spender":"0x3Bcc5bD4abBc853395eBE5103b7DbA20411E38db"}],"id": 1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"alchemy_getTokenAllowance",
    "params":[{"contract":"0xE41d2489571d322189246DaFA5ebDe1F4699F498", "owner":"0xe8095A54C83b069316521835408736269bfb389C", "spender":"0x3Bcc5bD4abBc853395eBE5103b7DbA20411E38db"}],
    "id":83
}
```
{% endtab %}
{% endtabs %}

### Result

```javascript
{
  "jsonrpc": "2.0",
  "id": 83,
  "result": "10963536149943846000",
}
```
