---
description: Gets all NFTs for a given NFT contract
---

# getNFTsForCollection

This endpoint is supported on the following chains and networks:

* **Ethereum**: Mainnet, Goerli
* **Polygon**: Mainnet and Mumbai

_To see chain support across all features, check out the_ [_feature matrix_](../../apis/feature-support-by-chain.md)_._

## Parameters

* `contractAddress`: _**\[string]**_ - contract address for the NFT collection
* `withMetadata`: _**\[boolean] -**_ (optional) _****_ if set to `true`, returns NFT metadata; otherwise will only return tokenIds. Defaults to `false`.
* `startToken`: _**\[string]**_ - (optional) an offset used for pagination. Can be a hex string, or a decimal.
* `limit`: _**\[int]**_ - (optional) sets the total number of NFTs returned in the response. \
  Defaults to 100.

{% hint style="info" %}
#### NOTE on`startToken`:&#x20;

The API response will contain a maximum of 100 tokens. Because many NFT collections include more than 100 tokens, the `startToken` param is used to paginate results.

If no`startToken`is specified, the query will start from the lowest _tokenId_. Each response will return a `nextToken`that can be passed back to the API as a `startToken` to return the next page of results for the given NFT collection (if applicable). You can also use any _tokenId_ from the collection as the `startToken`, and the results in the response will start from that offset.\
\
See the 'examples' section for an example of how to use this parameter to fetch all of the NFTS in a collection.
{% endhint %}

## Returns

*   `nfts`: list of objects that represent NFTs stored under the queried contract address.&#x20;

    Object schema:

    * `id`
      * `tokenId`: _**\[string]**_ Hexadecimal token ID for NFT
      * `tokenMetadata`
        * `tokenType`: "`ERC721`" or "`ERC1155`"
    * `tokenUri`:
      * `raw:` uri representing the location of the NFT's original metadata blob. This is a backup for you to parse when the `metadata` field is not automatically populated.
      * `gateway:` public gateway uri for the raw uri above.
    * `metadata`: relevant metadata for NFT contract. This is useful for viewing image url, traits, etc. without having to follow the metadata url in `tokenUri` to parse manually. \
      _**For more info on NFT responses: check out the**_ [_**NFT API FAQ.**_](nft-api-faq/#understanding-nft-metadata)_****_
* `nextToken`: _**\[string]**_ an offset used for pagination

## Example

{% hint style="info" %}
The example below is for Ethereum Mainnet. If you are using Polygon you'll need to use your polygon endpoint instead: \
https://polygon-mainnet.g.alchemy.com/nft/v2/`your-api-key`/getNFTs...
{% endhint %}

### Request

{% tabs %}
{% tab title="Alchemy SDK" %}
```java
// Github: https://github.com/alchemyplatform/alchemy-sdk-js
// Setup: npm install @alch/alchemy-sdk
import {
  Network,
  initializeAlchemy,
  getNftsForCollection,
} from "@alch/alchemy-sdk";

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: "demo", // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
  maxRetries: 10,
};

const alchemy = initializeAlchemy(settings);

// Print total NFT count returned in the response:
const nftsForCollection = await getNftsForCollection(
  alchemy,
  "0x61fce80d72363b731425c3a2a46a1a5fed9814b2"
);
console.log(nftsForCollection);

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
  const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTsForCollection`;
  const contractAddr = "0x61fce80d72363b731425c3a2a46a1a5fed9814b2";
  const tokenId = "0x1ea2";
  const withMetadata = "false";
  const fetchURL = `${baseURL}?contractAddress=${contractAddr}&startToken=${tokenId}&withMetadata=${withMetadata}`;

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
const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTsForCollection`;
const contractAddr = "0x61fce80d72363b731425c3a2a46a1a5fed9814b2";
const startToken = "0x1ea2";
const withMetadata = "false";

var config = {
  method: 'get',
  url: `${baseURL}?contractAddress=${contractAddr}&startToken=${startToken}&withMetadata=${withMetadata}`,
  headers: { }
};

axios(config)
.then(response => console.log(JSON.stringify(response.data, null, 2)))
.catch(error => console.log(error));
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.g.alchemy.com/nft/v2/demo/getNFTsForCollection/?contractAddress=0x61fce80d72363b731425c3a2a46a1a5fed9814b2&startToken=0x1ea2&withMetadata=false
RequestType: GET
```
{% endtab %}

{% tab title="Curl" %}
```
curl 'https://eth-mainnet.g.alchemy.com/nft/v2/demo/getNFTsForCollection/?contractAddress=0x61fce80d72363b731425c3a2a46a1a5fed9814b2&startToken=0x1ea2&withMetadata=false'
```
{% endtab %}
{% endtabs %}

If you're having trouble running requests via Alchemy Web3.js, Fetch, or Axios, please refer to: [**NFT API Quickstart Guide** ](nft-api-quickstart-guide.md)****

### Response

```json
{"nfts":
    [{"id":{"tokenId":"0x1f"}},
    {"id":{"tokenId":"0x20"}},
    {"id":{"tokenId":"0x21"}},
    {"id":{"tokenId":"0x22"}},
    {"id":{"tokenId":"0x23"}},
    {"id":{"tokenId":"0x24"}},
    {"id":{"tokenId":"0x25"}},
    {"id":{"tokenId":"0x26"}},
    {"id":{"tokenId":"0x27"}},
    {"id":{"tokenId":"0x28"}},
    {"id":{"tokenId":"0x29"}},
    {"id":{"tokenId":"0x2a"}},
    {"id":{"tokenId":"0x2b"}},
    .....
    {"id":{"tokenId":"0x80"}},
    {"id":{"tokenId":"0x81"}},
    {"id":{"tokenId":"0x82"}}],
"nextToken":"0x83"}
```

### Getting the full collection

The `startToken` and `nextToken` fields are designed to allow users to fetch all of the NFTs in a collection using the following pattern:

```javascript
import axios from 'axios';

// replace with your Alchemy api key
const apiKey = "demo";
const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTsForCollection`;
const contractAddr = "0x61fce80d72363b731425c3a2a46a1a5fed9814b2";

async function callGetNFTsForCollectionOnce(
  startToken = ""
) {
  const url = `${baseURL}/?contractAddress=${contractAddr}&startToken=${startToken}`;
  const response = await axios.get(url);
  return response.data;
}

let startToken = "";
let hasNextPage = true;
totalNftsFound = 0;
while (hasNextPage) {
  const { nfts, nextToken } = await callGetNFTsForCollectionOnce(
    startToken
  );
  if (!nextToken) {
    // When nextToken is not present, then there are no more NFTs to fetch.
    hasNextPage = false;
  }
  startToken = nextToken;
  totalNftsFound += nfts.length;
}
```
