---
description: Returns the floor prices of a NFT collection by marketplace
---

# getFloorPrice (BETA)

This endpoint is supported on the following chains and networks:

* **Ethereum**: Mainnet

_To see chain support across all features, check out the_ [_feature matrix_](../../apis/feature-support-by-chain.md)_._

* `contractAddress`: _**\[string]**_ - contract address for the NFT collection

{% hint style="info" %}
When using pricing information from exchanges, we advise that all teams attribute the data to the respective marketplace with a **View on {Exchange}** button/link that allows users to explore the collection more on OpenSea/LooksRare specifically.
{% endhint %}

## Returns&#x20;

* `floorPrices`: list of objects that represents the floor prices of the collection across marketplaces
  * `marketplace`: name of the NFT marketplace where the collection is listed and its associated marketplace price. \
    Current marketplaces supported:  [OpenSea](https://opensea.io/), [LooksRare](https://looksrare.org/)
  * `floorPrice`: the floor price of the collection on the given exchange
  * `priceCurrency`: the asset in which the floor price is denominated\
    \- Typically denominated in **(ETH/WETH), SOL, USDC, and DAI**
  * `collectionUrl`: link to the collection on the given marketplace
  * `error`: returns an error, if there was an error fetching floor prices from the given exchange

## Examples

### Request

{% tabs %}
{% tab title="Fetch (JS)" %}
```javascript
import fetch from 'node-fetch';

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

const baseURL = "https://eth-mainnet.alchemyapi.io/nft/v2/demo/getFloorPrice";
const contractAddr = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";
const fetchURL = `${baseURL}?contractAddress=${contractAddr}`;

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
const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getFloorPrice`;
// replace with the wallet address you want to query for NFTs
const contractAddr = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";

var config = {
  method: 'get',
  url: `${baseURL}?contractAddress=${contractAddr}`
};

axios(config)
.then(response => console.log(JSON.stringify(response.data, null, 2)))
.catch(error => console.log(error));
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.g.alchemy.com/nft/v2/demo/getFloorPrice?contractAddress=0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d
RequestType: GET
```
{% endtab %}

{% tab title="Curl" %}
```
curl 'https://eth-mainnet.g.alchemy.com/nft/v2/demo/getFloorPrice?contractAddress=0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d'
```
{% endtab %}
{% endtabs %}

If you're having trouble running requests via Alchemy Web3.js, Fetch, or Axios, please refer to: [**NFT API Quickstart Guide** ](nft-api-quickstart-guide.md)****

### Response

```json
{
    "floorPrices": [
        {
            "marketplace": "opensea",
            "floorPrice": 95.9,
            "priceCurrency": "ETH",
            "collectionUrl": "https://opensea.io/collection/boredapeyachtclub"
        },
        {
            "marketplace": "looksrare",
            "floorPrice": 86.9,
            "priceCurrency": "ETH",
            "collectionUrl": "https://looksrare.org/collections/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
        }
    ]
}

```
