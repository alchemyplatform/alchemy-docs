---
description: Returns the floor prices of a NFT collection by marketplace
---

# getFloorPrice

{% hint style="warning" %}
This endpoint is currently in _BETA_.&#x20;
{% endhint %}

This endpoint is supported on the following chains and networks:

* **Ethereum**: Mainnet

_To see chain support across all features, check out the_ [_feature matrix_](../../apis/feature-support-by-chain.md)_._

* `contractAddress`: _**\[string]**_ - contract address for the NFT collection

{% hint style="info" %}
When using pricing information from marketplaces, we advise that all teams attribute the data to the respective marketplace with a **View on {Marketplace}** button/link that allows users to explore the collection more on OpenSea/LooksRare specifically.
{% endhint %}

## Returns&#x20;

* _**\[object]**_ with the following properties&#x20;
  *   `{marketplace}`: _**\[object]** - ****_ name of the NFT marketplace where the collection is listed. Current marketplaces supported:  [OpenSea](https://opensea.io/), [LooksRare](https://looksrare.org/)

      * `floorPrice`: _**\[float]** - ****_ the floor price of the collection on the given marketplace
      * `priceCurrency`: _**\[enum]** -_ the currency in which the floor price is denominated
        * Typically, denominated in **ETH**
      * `collectionUrl`: _**\[string]** - ****_ link to the collection on the given marketplace
      * `retrievedAt`: _**\[string]** -_ UTC timestamp of when the floor price was retrieved from the marketplace

      &#x20;                                                                   **or**
  * **OR (if there is a marketplace error):** `{marketplace}`: _**\[object]** - ****_ name of the NFT marketplace where the collection is listed. Current marketplaces supported:  [OpenSea](https://opensea.io/), [LooksRare](https://looksrare.org/)
    * `error`: _**\[string]**_** ** - returns an error if there was an error fetching floor prices from the given marketplace

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

{% tabs %}
{% tab title="200" %}
```
{
    "openSea": {
        "floorPrice": 90,
        "priceCurrency": "ETH",
        "retrievedAt": "2022-06-21T13:50:17.080287240Z",
        "collectionUrl": "https://opensea.io/collection/boredapeyachtclub"
    },
    "looksRare": {
        "floorPrice": 87,
        "priceCurrency": "ETH",
        "retrievedAt": "2022-06-21T15:08:59.819Z",
        "collectionUrl": "https://looksrare.org/collections/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
    }
}
```
{% endtab %}

{% tab title="200 - marketplace error" %}
```
{
    "openSea": {
        "error": "unable to fetch floor price"
    },
    "looksRare": {
        "error": "unable to fetch floor price"
    }
}
```
{% endtab %}
{% endtabs %}

