---
description: Returns a list of all spam contracts marked by Alchemy
---

# getSpamContracts

{% hint style="warning" %}
This endpoint is currently in _BETA_.&#x20;
{% endhint %}

_**For more information on how we classify spam, go to our**_ [_**NFT API FAQ**_](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api/nft-api-faq#nft-spam-classification)_**.**_

This endpoint is supported on the following chains and networks:

* **Ethereum**: Mainnet

_To see chain support across all features, check out the_ [_feature matrix_](../../apis/feature-support-by-chain.md)_._

## Parameters

_None_

## Returns

* &#x20;_**array**_ - A list of contract addresses earmarked as spam by Alchemy

## Example

### Request

{% tabs %}
{% tab title="Alchemy SDK" %}
```javascript
// Github: https://github.com/alchemyplatform/alchemy-sdk-js
// Setup: npm install @alch/alchemy-sdk
import { Network, Alchemy } from "@alch/alchemy-sdk";

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: "demo", // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
  maxRetries: 10,
};

const alchemy = new Alchemy(settings);

// Print all spam NFT contracts returned in the response:
alchemy.getSpamNftContracts().then(console.log);
```
{% endtab %}

{% tab title="Fetch (JS)" %}
```javascript
import fetch from 'node-fetch';

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  const apiKey = "demo"
  const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getSpamContracts`;
  const fetchURL = `${baseURL}`;

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
const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getSpamContracts`;

var config = {
  method: 'get',
  url: `${baseURL}`,
  headers: { }
};

axios(config)
.then(response => console.log(JSON.stringify(response.data, null, 2)))
.catch(error => console.log(error));
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.g.alchemy.com/nft/v2/demo/getSpamContracts
RequestType: GET
```
{% endtab %}

{% tab title="Curl" %}
```
curl --location --request GET 'https://eth-mainnet.g.alchemy.com/nft/v2/demo/getSpamContracts' \
--data-raw ''
```
{% endtab %}
{% endtabs %}

If you're having trouble running requests via Alchemy Web3.js, Fetch, or Axios, please refer to: [**NFT API Quickstart Guide** ](nft-api-quickstart-guide.md)****

### Response

```json
  [
  "0xfeb1eb12d2d0ce87fbde2d500f4de990c51b811e",
  "0xfec64651c8b441f2526b1a54febb2122124bf041",
  "0xfec8b3fe93308ea2bd07aa8835ed75d566a901ab",
  "0xfed54f882b0e013e3a12eb4b97884bc0b19f806c",
  "0xfee27fb71ae3feeef2c11f8e02037c42945e87c4",
  "0xfee5f54e1070e7ed31be341e0a5b1e847f6a84ab",
  "0xfefbf538c853e92f1c448f6fda8ac5c354844f69",
......................
  "0xffb0b6b3845c79c4d1fb54552ac6f5fef96c18fd",
  "0xffbf7dd41696c07c1ae0e7d94bb36d9e66de087e",
  "0xffc580a1664e22dce34819621ff292463fa2093f",
  "0xffce5f9b3ef3ea9ab68591ea268d36c8f216bd02",
  "0xffda3686e658863820f3972517ea21bc14267af5",
  "0xffe572aee5cded696f617125aa66b9746960f4ec",
  "0xfff46beea0dca55cc6bf39ec48e559160191093e",
  "0xfff54e6fe44fd47c8814c4b1d62c924c54364ad3"
]
```
