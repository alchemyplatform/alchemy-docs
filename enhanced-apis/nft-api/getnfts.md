---
description: Gets all NFTs currently owned by a given address
---

# getNFTs

{% hint style="info" %}
**NOTE:** This endpoint offers multi-chain support. [Check chains currently available](https://docs.alchemy.com/alchemy/introduction/getting-started) for the NFT API.
{% endhint %}

## Parameters

* `owner`: address for NFT owner
* `pageKey`: (optional) UUID for pagination. If more results are available, a UUID `pageKey` will be returned in the response. Pass that uuid into `pageKey` to fetch the next 100 NFTs. **NOTE:** pageKeys expire after 10 minutes.&#x20;
* `contractAddresses[]`: (optional) array of contract addresses to filter the responses with. Max limit 20 contracts.

{% hint style="info" %}
#### Note on pagination

We paginate our responses with a default limit of **100 responses**. We've chosen this number via thorough testing to determine the best balance of reliability and speed. In the future, you will be able to specify your own default size. If the owner has more than 100 nfts, we'll provide a `pageKey` you can include in the next request to return the remaining responses. This uses cursor based pagination with an idempotent result. This means if you provide one it serves as a static reference to the NFTs owned at time of the first call. This means if an owner acquires or transfers an NFT in between a paginated call, this will **NOT** be reflected.
{% endhint %}

## Returns

* `ownedNfts`: list of objects that represent NFTs owned by the address. Max results per response = 100.&#x20;
  * Object schema:
    * `contract`:&#x20;
      * `address`: address of NFT contract
    * `id`:&#x20;
      * `token_id`: token ID of given NFT
* `pageKey` : (optional) UUID for pagination - returned if there are more NFTs to fetch. Max NFTs per page = 100.
* `totalCount`: total number of NFTs owned by the given address.&#x20;
* `blockHash`: the canonical head block hash of when your request was received

## Examples

For an example request with pagination, see [Request (with pagination)](getnfts.md#request-with-pagination).&#x20;

For examples with contract filtering, see [Request (with contract filtering)](getnfts.md#request-with-contract-filtering).

{% hint style="danger" %}
#### Version

You must update your api\_key from your dashboard from V2 --> V1, ie

`https://eth-mainnet.g.alchemy.com/your-api-key/v2` should be `https://eth-mainnet.g.alchemy.com/your-api-key/v1`

#### Network

The examples below is for Ethereum Mainnet. If you are using Polygon you'll need to use your polygon endpoint instead: `https://polygon-mainnet.g.alchemy.com/your-api-key/v1/getNFTs`...
{% endhint %}

### Request

{% tabs %}
{% tab title="Alchemy Web3.js" %}
```javascript
// Installation: https://github.com/alchemyplatform/alchemy-web3

import { createAlchemyWeb3 } from "@alch/alchemy-web3";

// Using HTTPS
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.g.alchemy.com/v2/demo",
);

const nfts = await web3.alchemy.getNfts({owner: "0xC33881b8FD07d71098b440fA8A3797886D831061"})

console.log(nfts);
```
{% endtab %}

{% tab title="Fetch (JS)" %}
```javascript
import fetch from 'node-fetch';

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

const baseURL = "https://eth-mainnet.g.alchemy.com/demo/v1/getNFTs/";
const ownerAddr = "0xfAE46f94Ee7B2Acb497CEcAFf6Cff17F621c693D";
const fetchURL = `${baseURL}?owner=${ownerAddr}`;

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
const baseURL = `https://eth-mainnet.g.alchemy.com/${apiKey}/v1/getNFTs/`;
// replace with the wallet address you want to query for NFTs
const ownerAddr = "0xfAE46f94Ee7B2Acb497CEcAFf6Cff17F621c693D";

var config = {
  method: 'get',
  url: `${baseURL}?owner=${ownerAddr}`
};

axios(config)
.then(response => console.log(JSON.stringify(response.data, null, 2)))
.catch(error => console.log(error));
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.g.alchemy.com/demo/v1/getNFTs/?owner=0xfAE46f94Ee7B2Acb497CEcAFf6Cff17F621c693D
RequestType: GET
```
{% endtab %}

{% tab title="Curl" %}
```
curl 'https://eth-mainnet.g.alchemy.com/your-api-key/v1/getNFTs/?owner=0xfAE46f94Ee7B2Acb497CEcAFf6Cff17F621c693D'
```
{% endtab %}
{% endtabs %}

If you're having trouble running requests via Alchemy Web3.js, Fetch, or Axios, please refer to: [**NFT API Quickstart Guide** ](../../guides/nft-api-quickstart-guide.md)****

### Response

```json
{
    "ownedNfts": [{
        "contract": {
            "address": "0x7eef591a6cc0403b9652e98e88476fe1bf31ddeb"
        },
        "id": {
            "tokenId": "0x2a"
        }
    }, {
        "contract": {
            "address": "0x9abb7bddc43fa67c76a62d8c016513827f59be1b"
        },
        "id": {
            "tokenId": "0x0000000000000000000000000000000000000000000000000000000000000baa"
        }
    }, {
        "contract": {
            "address": "0x495f947276749ce646f68ac8c248420045cb7b5e"
        },
        "id": {
            "tokenId": "0x7b1507011c173ea0b6365f54131e1fefa1562032000000000000850000000001"
        }
    }, {
        "contract": {
            "address": "0x97597002980134bea46250aa0510c9b90d87a587"
        },
        "id": {
            "tokenId": "0x0000000000000000000000000000000000000000000000000000000000001597"
        }
    }, {
        "contract": {
            "address": "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85"
        },
        "id": {
            "tokenId": "0x80d3ddec2574b25ee9237c0ca14095c163b335a4b48ffcc717ad882954eeff97"
        }
    }, {
        "contract": {
            "address": "0x3f4a885ed8d9cdf10f3349357e3b243f3695b24a"
        },
        "id": {
            "tokenId": "0x0000000000000000000000000000000000000000000000000000000000001527"
        }
    }],
    "totalCount": 11,
    "blockHash": "0x94d5ab52b8a6571733f6b183ef89f31573b82a4e78f8129b0ce90ef0beaf208b"
} 
```

### Request (with pagination)&#x20;

{% hint style="warning" %}
This example request will not return anything in the response since the `pageKey` expires after 10 minutes.
{% endhint %}

{% tabs %}
{% tab title="Alchemy Web3.js" %}
```javascript
// Installation: https://github.com/alchemyplatform/alchemy-web3

import { createAlchemyWeb3 } from "@alch/alchemy-web3";

// Using HTTPS
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.g.alchemy.com/v2/demo",
);

const nfts = await web3.alchemy.getNfts({owner: "0xC33881b8FD07d71098b440fA8A3797886D831061", pageKey:"12e032c5-ce4a-4389-8764-b980e1a17da8"})

console.log(nfts);
```
{% endtab %}

{% tab title="Fetch (JS)" %}
```javascript
import fetch from 'node-fetch';

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

const baseURL = "https://eth-mainnet.g.alchemy.com/demo/v1/getNFTs/";
const ownerAddr = "0xfAE46f94Ee7B2Acb497CEcAFf6Cff17F621c693D";
const pageKey = "12e032c5-ce4a-4389-8764-b980e1a17da8";
const fetchURL = `${baseURL}?owner=${ownerAddr}?pageKey=${pageKey}`;

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
const baseURL = `https://eth-mainnet.g.alchemy.com/${apiKey}/v1/getNFTs/`;
// replace with the wallet address you want to query for NFTs
const pageKey = "12e032c5-ce4a-4389-8764-b980e1a17da8";
const ownerAddr = "0xfAE46f94Ee7B2Acb497CEcAFf6Cff17F621c693D";

var config = {
  method: 'get',
  url: `${baseURL}?owner=${ownerAddr}?pageKey=${pageKey}`
};

axios(config)
.then(response => console.log(JSON.stringify(response.data, null, 2)))
.catch(error => console.log(error));

```
{% endtab %}

{% tab title="Postman" %}
```python
URL: https://eth-mainnet.g.alchemy.com/your-api-key/v1/getNFTs/?owner=0x8e7644918b3e280fb3b599ca381a4efcb7ade201&pageKey=12e032c5-ce4a-4389-8764-b980e1a17da8
```
{% endtab %}

{% tab title="Curl" %}
```
curl 'https://eth-mainnet.g.alchemy.com/your-api-key/v1/getNFTs/?owner=0x8e7644918b3e280fb3b599ca381a4efcb7ade201&pageKey=12e032c5-ce4a-4389-8764-b980e1a17da8'
```
{% endtab %}
{% endtabs %}

If you're having trouble running requests via Alchemy Web3.js, Fetch, or Axios, please refer to: [**NFT API Quickstart Guide** ](../../guides/nft-api-quickstart-guide.md)****

### Response (with pagination)&#x20;

```json
{
    "ownedNfts": [{
        "contract": {
            "address": "0x97597002980134bea46250aa0510c9b90d87a587"
        },
        "id": {
            "tokenId": "0x00000000000000000000000000000000000000000000000000000000000009cb"
        }
    }, {
        "contract": {
            "address": "0x97597002980134bea46250aa0510c9b90d87a587"
        },
        "id": {
            "tokenId": "0x00000000000000000000000000000000000000000000000000000000000009cc"
        }
    }, {
        "contract": {
            "address": "0x5ab21ec0bfa0b29545230395e3adaca7d552c948"
        },
        "id": {
            "tokenId": "0x00000000000000000000000000000000000000000000000000000000000006dc"
        }
    }, {
        "contract": {
            "address": "0x3b3ee1931dc30c1957379fac9aba94d1c48a5405"
        },
        "id": {
            "tokenId": "0x000000000000000000000000000000000000000000000000000000000000001a"
        }
    }, {
        "contract": {
            "address": "0x69c40e500b84660cb2ab09cb9614fa2387f95f64"
        },
        "id": {
            "tokenId": "0x0000000000000000000000000000000000000000000000000000000000000391"
        }
    }, {
        "contract": {
            "address": "0x97597002980134bea46250aa0510c9b90d87a587"
        },
        "id": {
            "tokenId": "0x00000000000000000000000000000000000000000000000000000000000008d5"
        }
    }, {
        "contract": {
            "address": "0x97597002980134bea46250aa0510c9b90d87a587"
        },
        "id": {
            "tokenId": "0x0000000000000000000000000000000000000000000000000000000000000a1d"
        }
    }, {
        "contract": {
            "address": "0x97597002980134bea46250aa0510c9b90d87a587"
        },
        "id": {
            "tokenId": "0x000000000000000000000000000000000000000000000000000000000000002a"
        }
    }, {
        "contract": {
            "address": "0x97597002980134bea46250aa0510c9b90d87a587"
        },
        "id": {
            "tokenId": "0x000000000000000000000000000000000000000000000000000000000000038e"
        }
    }, {
        "contract": {
            "address": "0x97597002980134bea46250aa0510c9b90d87a587"
        },
        "id": {
            "tokenId": "0x000000000000000000000000000000000000000000000000000000000000244b"
        }
    }],
    "pageKey": "88434286-7eaa-472d-8739-32a0497c2a18",
    "totalCount": 277,
    "blockHash": "0x94d5ab52b8a6571733f6b183ef89f31573b82a4e78f8129b0ce90ef0beaf208b"
}
```

### Request (with contract filtering)

Only one contract in filter array:

{% tabs %}
{% tab title="Curl" %}
```
curl 'https://eth-mainnet.g.alchemy.com/your-api-key/v1/getNFTs/?owner=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045&contractAddresses[]=0x39ed051a1a3a1703b5e0557b122ec18365dbc184'
```
{% endtab %}

{% tab title="JavaScript - Fetch" %}
```javascript
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("https://eth-mainnet.g.alchemy.com/your-api-key/v1/getNFTs/?owner=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045&contractAddresses[]=0x39ed051a1a3a1703b5e0557b122ec18365dbc184", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```
{% endtab %}

{% tab title="JavaScript - jQuery" %}
```javascript
var settings = {
  "url": "https://eth-mainnet.g.alchemy.com/your-api-key/v1/getNFTs/?owner=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045&contractAddresses[]=0x39ed051a1a3a1703b5e0557b122ec18365dbc184",
  "method": "GET",
  "timeout": 0,
};

$.ajax(settings).done(function (response) {
  console.log(response);
});
```
{% endtab %}

{% tab title="Postman" %}
```python
URL: https://eth-mainnet.g.alchemy.com/your-api-key/v1/getNFTs/?owner=0xfAE46f94Ee7B2Acb497CEcAFf6Cff17F621c693D&contractAddresses[]=0x39ed051a1a3a1703b5e0557b122ec18365dbc184
RequestType: GET
```
{% endtab %}
{% endtabs %}

Multiple contracts in filter array:

{% tabs %}
{% tab title="Curl" %}
```
curl 'https://eth-mainnet.g.alchemy.com/your-api-key/v1/getNFTs/?owner=0x8e7644918b3e280fb3b599ca381a4efcb7ade201&contractAddresses[]=0x5ab21ec0bfa0b29545230395e3adaca7d552c948&contractAddresses[]=0x8f4ca9a9df620ac58152f5369650dbccd006de37'
```
{% endtab %}

{% tab title="JavaScript - Fetch" %}
```javascript
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("https://eth-mainnet.g.alchemy.com/demo/v1/getNFTs/?owner=0x8e7644918b3e280fb3b599ca381a4efcb7ade201&contractAddresses[]=0x5ab21ec0bfa0b29545230395e3adaca7d552c948&contractAddresses[]=0x8f4ca9a9df620ac58152f5369650dbccd006de37", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```
{% endtab %}

{% tab title="JavaScript - jQuery" %}
```javascript
var settings = {
  "url": "https://eth-mainnet.g.alchemy.com/demo/v1/getNFTs/?owner=0x8e7644918b3e280fb3b599ca381a4efcb7ade201&contractAddresses[]=0x5ab21ec0bfa0b29545230395e3adaca7d552c948&contractAddresses[]=0x8f4ca9a9df620ac58152f5369650dbccd006de37",
  "method": "GET",
  "timeout": 0,
};

$.ajax(settings).done(function (response) {
  console.log(response);
});
```
{% endtab %}

{% tab title="Postman" %}
```python
URL: https://eth-mainnet.g.alchemy.com/your-api-key/v1/getNFTs/?owner=0x8e7644918b3e280fb3b599ca381a4efcb7ade201&contractAddresses[]=0x5ab21ec0bfa0b29545230395e3adaca7d552c948&contractAddresses[]=0x8f4ca9a9df620ac58152f5369650dbccd006de37
REQUEST: GET
```
{% endtab %}
{% endtabs %}

If you're having trouble running requests via Alchemy Web3.js, Fetch, or Axios, please refer to: [**NFT API Quickstart Guide** ](../../guides/nft-api-quickstart-guide.md)****

### Response (with contract filtering)

```
{
    "ownedNfts": [
        {
            "contract": {
                "address": "0x39ed051a1a3a1703b5e0557b122ec18365dbc184"
            },
            "id": {
                "tokenId": "0x0000000000000000000000000000000000000000000000000000000000000742"
            },
            "balance": "1"
        }
    ],
    "totalCount": 1,
    "blockHash": "0x94d5ab52b8a6571733f6b183ef89f31573b82a4e78f8129b0ce90ef0beaf208b"
}
```
