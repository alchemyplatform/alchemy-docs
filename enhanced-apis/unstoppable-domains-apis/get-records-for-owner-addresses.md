---
description: GET /domains
---

# Get records for owner addresses

`GET https://unstoppabledomains.g.alchemy.com/domains/?owners=<OWNER 1 ADDRESS>&owners=<OWNER 2 ADDRESS>`

Request domain name records and metadata given multiple owner addresses. Returns domains and their records associated with each address.

## URL Params

* none

## Query Params

* `owners` - a list of wallet addresses to query for domains information. Note that if your request must include multiple addresses, and you need to use a new query param instance for each address.&#x20;
* `tlds` - optional parameter to filter domains by TLDs. Currently supported:
  * .zil
  * .crypto
  * .nft
  * .blockchain
  * .bitcoin
  * .coin
  * .wallet
  * .888
  * .dao
  * .x
* `sortBy` - which field to use for sorting of the list
  * `id` - sort by domain id
  * `name` - sort by domain name according alphabetic ordering
* `sortDirection`
  * `ASC` - ascending order
  * `DESC` - descending order
* `startingAfter` - skip all elements before this value. Value depends on `sortBy` value. Use `nextStartingAfter` field from the response to get the next page of the list.

## Returns

An object with a `data` field that contains a list of domain details along with some `meta` about the request.

* `data` - contains a list of domain details. Details are the same as for [GET domain](https://app.gitbook.com/o/-MB5OnTtI\_5pcZn7v2wm/s/-MB17w56kk7ZnRMWdqOL/c/FC55ZR3wgdPnCJBklY2o/enhanced-apis/unstoppable-domains-apis/get-domain) response.
* `meta` - contains list metadata
  * `perPage` - number of elements in the list in single response&#x20;
  * `nextStartingAfter` - a value that can be passed in the startingAfter  query parameter to get the next page of the domains list
  * `sortBy` - which field is used to sort domains list
  * `sortDirection` - order of applied sorted (ascending or descending)&#x20;
  * `hasMore` - whether response has more domains to show in the next pages

## Example

Here is an example request to query for the records and metadata for two owner addresses:

1. 0xF5FFF32CF83A1A614e15F25Ce55B0c0A6b5F8F2c
2. 0x8aad44321a86b170879d7a244c1e8d360c99dda8

### Request

```
curl \
--request GET "https://unstoppabledomains.g.alchemy.com/domains/?owners=0xF5FFF32CF83A1A614e15F25Ce55B0c0A6b5F8F2c&sortBy=id&sortDirection=DESC&perPage=2&owners=0x8aad44321a86b170879d7a244c1e8d360c99dda8" \
--header 'Authorization: Bearer <YOUR API KEY>'
```

### Response

```json
{
  "data": [
    {
      "id": "porpoise.nft",
      "attributes": {
        "meta": {
          "domain": "porpoise.nft",
          "blockchain": "MATIC",
          "networkId": 137,
          "owner": "0x8aad44321a86b170879d7a244c1e8d360c99dda8",
          "resolver": "0xa9a6a3626993d487d2dbda3173cf58ca1a9d9e9f",
          "registry": "0xa9a6a3626993d487d2dbda3173cf58ca1a9d9e9f"
        },
        "records": {
          "crypto.ETH.address": "0x8aad44321a86b170879d7a244c1e8d360c99dda8",
          "social.picture.value": "1/erc1155:0xc7e5e9434f4a71e6db978bd65b4d61d3593e5f27/14317",
          "crypto.MATIC.version.ERC20.address": "0x8aad44321a86b170879d7a244c1e8d360c99dda8",
          "crypto.MATIC.version.MATIC.address": "0x8aad44321a86b170879d7a244c1e8d360c99dda8"
        }
      }
    },
    {
      "id": "whereyoucantypeinadomain.crypto",
      "attributes": {
        "meta": {
          "domain": "whereyoucantypeinadomain.crypto",
          "blockchain": "MATIC",
          "networkId": 137,
          "owner": "0x8aad44321a86b170879d7a244c1e8d360c99dda8",
          "resolver": "0xa9a6a3626993d487d2dbda3173cf58ca1a9d9e9f",
          "registry": "0xa9a6a3626993d487d2dbda3173cf58ca1a9d9e9f"
        },
        "records": {
          "crypto.ETH.address": "0x8aad44321a86b170879d7a244c1e8d360c99dda8",
          "crypto.MATIC.version.ERC20.address": "0x8aad44321a86b170879d7a244c1e8d360c99dda8",
          "crypto.MATIC.version.MATIC.address": "0x8aad44321a86b170879d7a244c1e8d360c99dda8"
        }
      }
    }
  ],
  "meta": {
    "perPage": 2,
    "nextStartingAfter": "556766",
    "sortBy": "id",
    "sortDirection": "DESC",
    "hasMore": true
  }
}
```

The response has more data that is not included in the first page, so the query for the next page would use the `nextStartingAfter` response value:

```
curl \
--request GET "https://unstoppabledomains.g.alchemy.com/domains/?owners=0xF5FFF32CF83A1A614e15F25Ce55B0c0A6b5F8F2c&sortBy=id&sortDirection=DESC&perPage=2&owners=0x8aad44321a86b170879d7a244c1e8d360c99dda8&startingAfter=556766" \
--header 'Authorization: Bearer <YOUR API KEY>'
```
