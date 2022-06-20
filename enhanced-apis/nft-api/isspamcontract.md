---
description: Returns whether a contract is marked as spam or not by Alchemy
---

# isSpamContract

{% hint style="warning" %}
This endpoint is currently in _BETA_.&#x20;
{% endhint %}

This endpoint is supported on the following chains and networks:

* **Ethereum**: Mainnet

_To see chain support across all features, check out the_ [_feature matrix_](../../apis/feature-support-by-chain.md)_._

## Parameters

* `contractAddress`: _**string**_ - The NFT contract address in question

## Returns

* _**boolean**_ -&#x20;
  * `true` - if the queried contract is marked as spam
  * `false` - if the queried contract is considered valid

## Example

### Request

{% tabs %}
{% tab title="Fetch (JS)" %}
```javascript
import fetch from 'node-fetch';

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  const apiKey = "demo"
  const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/isSpamContract`;
  const contractAddr = "0x000440f08436a7b866d1ae42db5e0be801da722a";
  const fetchURL = `${baseURL}?contractAddress=${contractAddr}`;

  fetch(fetchURL, requestOptions)
    .then(response => response.json())
    .then(response => JSON.stringify(response, null, 2))
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
```
{% endtab %}

{% tab title="Axios (JS)" %}
```javascript
import axios from 'axios';

// replace with your Alchemy api key
const apiKey = "demo";
const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/isSpamContract`;
const contractAddr = "0x000440f08436a7b866d1ae42db5e0be801da722a";

var config = {
  method: 'get',
  url: `${baseURL}?contractAddress=${contractAddr}`,
  headers: { }
};

axios(config)
.then(response => console.log(JSON.stringify(response.data, null, 2)))
.catch(error => console.log(error));
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.g.alchemy.com/nft/v2/demo/isSpamContract?contractAddress=0x000440f08436a7b866d1ae42db5e0be801da722a
RequestType: GET
```
{% endtab %}

{% tab title="Curl" %}
```
curl --location --request GET 'https://eth-mainnet.g.alchemy.com/nft/v2/demo/isSpamContract?contractAddress=0x000440f08436a7b866d1ae42db5e0be801da722a' \
--data-raw ''
```
{% endtab %}
{% endtabs %}

If you're having trouble running requests via Alchemy Web3.js, Fetch, or Axios, please refer to: [**NFT API Quickstart Guide** ](nft-api-quickstart-guide.md)****

### Response

```json
true
```