---
description: >-
  Gets all the domain names, records, and metadata owned by a wallet address or
  configured to a resolution record.
---

# Get records for owner addresses

```
GET https://unstoppabledomains.g.alchemy.com/domains
```

Request domain name records and metadata when given single or multiple owner addresses or configured to a resolution record.

## URL Params

* none

## Query Params

| Name          | Type           | Mandatory | Description                                                                                                                                                                                                                                        |
| ------------- | -------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| owners        | ARRAY\[STRING] | NO        | A list of wallet addresses to query for domain information                                                                                                                                                                                         |
| resolution    | OBJECT         | NO        | A key-value pair of resolution records the response results should be filtered with. See the [Records Reference](https://docs.unstoppabledomains.com/getting-started/domain-registry-essentials/records-reference/) guide for supported key values |
| tlds          | ARRAY\[STRING] | NO        | A list of domain endings the response should be filtered with. See all the [supported domain endings](https://docs.unstoppabledomains.com/developer-toolkit/resolution-service-api/#supported-domains-for-resolution-service-api)                  |
| sortBy        | STRING         | NO        | The field to use for sorting of the response. Currently supports `id` (domain ID), `name` (domain name alphabetically), and `created_at` (domain creation date)                                                                                    |
| sortDirection | STRING         | NO        | The order to use for sorting of the response. Currently supports `ASC` (ascending) and `DESC` (descending)                                                                                                                                         |
| startingAfter | STRING         | NO        | The API will skip the results before this value in the response. Value depends on `sortBy` value                                                                                                                                                   |

{% hint style="info" %}
Your request must contain an instance of the `owners` or `resolution` query params. The `owners` param lets you filter domains by their owner address, while the `resolution` param lets you filter domains by their resolution records.
{% endhint %}

{% hint style="info" %}
If your request must include multiple `owners` or `tlds`, you need to use a new `owners` or `tlds` query param instance for each wallet address and TLD.
{% endhint %}

## Returns

An object with a `data` field contains a list of domain details and some meta about the request.

* `data`: (array) an array with the data and metadata of domains owned by a wallet address.
  * `id`: (string) domain ID.
  * `attributes`: list of domain details. The details are the same as for [Get records for a domain](https://docs.alchemy.com/alchemy/enhanced-apis/unstoppable-domains-apis/get-records-for-a-domain) response.
* `meta`: contains list metadata.
  * `perPage` - (number) the number of elements in the list in a single response.
  * `nextStartingAfter` - (string) a value you can pass in the `startingAfter` query parameter to get the next page of the domains list.
  * `sortBy` - (string) the field used to sort the domains list.
  * `sortDirection` - (string) the order of applied sorting (ascending or descending).
  * `hasMore` - (boolean) indicates if the response has more domains to show in the next pages.

## Example

Here is an example request to query for the records and metadata for two owner addresses:

1. 0xF5FFF32CF83A1A614e15F25Ce55B0c0A6b5F8F2c
2. 0x8aad44321a86b170879d7a244c1e8d360c99dda8

### Request

```bash
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

The response has more data that is not included on the first page, so the query for the next page would use the `nextStartingAfter` response value:

```bash
curl \
--request GET "https://unstoppabledomains.g.alchemy.com/domains/?owners=0xF5FFF32CF83A1A614e15F25Ce55B0c0A6b5F8F2c&sortBy=id&sortDirection=DESC&perPage=2&owners=0x8aad44321a86b170879d7a244c1e8d360c99dda8&startingAfter=556766" \
--header 'Authorization: Bearer <YOUR API KEY>'
```

### Example 2

Here is an example request to query for the domains with a resolution record:

* {"crypto.BTC.address": "bc1q359khn0phg58xgezyqsuuaha28zkwx047c0c3y"}

#### Request

```bash
curl \
--request GET "https://unstoppabledomains.g.alchemy.com/domains?resolution%5Bcrypto.BTC.address%5D=bc1q359khn0phg58xgezyqsuuaha28zkwx047c0c3y" \
--header 'Authorization: Bearer <YOUR API KEY>'
```

#### Response

```json
{
    "data": [
        {
            "id": "brad.crypto",
            "attributes": {
                "meta": {
                    "domain": "brad.crypto",
                    "blockchain": "ETH",
                    "networkId": 1,
                    "owner": "0x8aad44321a86b170879d7a244c1e8d360c99dda8",
                    "resolver": "0xb66dce2da6afaaa98f2013446dbcb0f4b0ab2842",
                    "registry": "0xD1E5b0FF1287aA9f9A268759062E4Ab08b9Dacbe"
                },
                "records": {
                    "ipfs.html.value": "QmTiqc12wo2pBsGa9XsbpavkhrjFiyuSWsKyffvZqVGtut",
                    "crypto.ADA.address": "DdzFFzCqrhsuwQKiR3CdQ1FzuPAydtVCBFTRdy9FPKepAHEoXCee2qrio975M4cEbqYwZBsWJTNyrJ8NLJmAReSwAakQEHWBEd2HvSS7",
                    "crypto.BTC.address": "bc1q359khn0phg58xgezyqsuuaha28zkwx047c0c3y",
                    "crypto.ETH.address": "0x8aaD44321A86b170879d7A244c1e8d360c99DdA8",
                    "gundb.username.value": "0x8912623832e174f2eb1f59cc3b587444d619376ad5bf10070e937e0dc22b9ffb2e3ae059e6ebf729f87746b2f71e5d88ec99c1fb3c7c49b8617e2520d474c48e1c",
                    "social.picture.value": "1/erc1155:0xc7e5e9434f4a71e6db978bd65b4d61d3593e5f27/14317",
                    "gundb.public_key.value": "pqeBHabDQdCHhbdivgNEc74QO-x8CPGXq4PKWgfIzhY.7WJR5cZFuSyh1bFwx0GWzjmrim0T5Y6Bp0SSK0im3nI",
                    "ipfs.redirect_domain.value": "https://abbfe6z95qov3d40hf6j30g7auo7afhp.mypinata.cloud/ipfs/Qme54oEzRkgooJbCDr78vzKAWcv6DDEZqRhhDyDtzgrZP6"
                }
            }
        },
        {
            "id": "udtestdev-test.crypto",
            "attributes": {
                "meta": {
                    "domain": "udtestdev-test.crypto",
                    "blockchain": "ETH",
                    "networkId": 1,
                    "owner": "0x58ca45e932a88b2e7d0130712b3aa9fb7c5781e2",
                    "resolver": "0xb66dce2da6afaaa98f2013446dbcb0f4b0ab2842",
                    "registry": "0xD1E5b0FF1287aA9f9A268759062E4Ab08b9Dacbe"
                },
                "records": {
                    "ipfs.html.value": "Qme54oEzRkgooJbCDr78vzKAWcv6DDEZqRhhDyDtzgrZP6",
                    "crypto.BTC.address": "bc1q359khn0phg58xgezyqsuuaha28zkwx047c0c3y",
                    "crypto.ETH.address": "0x8aaD44321A86b170879d7A244c1e8d360c99DdA8",
                    "ipfs.redirect_domain.value": "https://abbfe6z95qov3d40hf6j30g7auo7afhp.mypinata.cloud/ipfs/Qme54oEzRkgooJbCDr78vzKAWcv6DDEZqRhhDyDtzgrZP6"
                }
            }
        }
    ],
    "meta": {
        "perPage": 100,
        "nextStartingAfter": "592197",
        "sortBy": "id",
        "sortDirection": "ASC",
        "hasMore": false
    }
}
```

### Example 3

Here is an example request to query for the records and metadata of domains with a resolution record and are owned by a wallet address:

* 0x8aad44321a86b170879d7a244c1e8d360c99dda8
* {"crypto.BTC.address": "bc1q359khn0phg58xgezyqsuuaha28zkwx047c0c3y"}

#### Request

```bash
curl \
--request GET "https://unstoppabledomains.g.alchemy.com/domains?resolution%5Bcrypto.BTC.address%5D=bc1q359khn0phg58xgezyqsuuaha28zkwx047c0c3y&owners=0x8aad44321a86b170879d7a244c1e8d360c99dda8" \
--header 'Authorization: Bearer <YOUR API KEY>'
```

#### Response

```json
{
    "data": [
        {
            "id": "brad.crypto",
            "attributes": {
                "meta": {
                    "domain": "brad.crypto",
                    "blockchain": "ETH",
                    "networkId": 1,
                    "owner": "0x8aad44321a86b170879d7a244c1e8d360c99dda8",
                    "resolver": "0xb66dce2da6afaaa98f2013446dbcb0f4b0ab2842",
                    "registry": "0xD1E5b0FF1287aA9f9A268759062E4Ab08b9Dacbe"
                },
                "records": {
                    "ipfs.html.value": "QmTiqc12wo2pBsGa9XsbpavkhrjFiyuSWsKyffvZqVGtut",
                    "crypto.ADA.address": "DdzFFzCqrhsuwQKiR3CdQ1FzuPAydtVCBFTRdy9FPKepAHEoXCee2qrio975M4cEbqYwZBsWJTNyrJ8NLJmAReSwAakQEHWBEd2HvSS7",
                    "crypto.BTC.address": "bc1q359khn0phg58xgezyqsuuaha28zkwx047c0c3y",
                    "crypto.ETH.address": "0x8aaD44321A86b170879d7A244c1e8d360c99DdA8",
                    "gundb.username.value": "0x8912623832e174f2eb1f59cc3b587444d619376ad5bf10070e937e0dc22b9ffb2e3ae059e6ebf729f87746b2f71e5d88ec99c1fb3c7c49b8617e2520d474c48e1c",
                    "social.picture.value": "1/erc1155:0xc7e5e9434f4a71e6db978bd65b4d61d3593e5f27/14317",
                    "gundb.public_key.value": "pqeBHabDQdCHhbdivgNEc74QO-x8CPGXq4PKWgfIzhY.7WJR5cZFuSyh1bFwx0GWzjmrim0T5Y6Bp0SSK0im3nI",
                    "ipfs.redirect_domain.value": "https://abbfe6z95qov3d40hf6j30g7auo7afhp.mypinata.cloud/ipfs/Qme54oEzRkgooJbCDr78vzKAWcv6DDEZqRhhDyDtzgrZP6"
                }
            }
        }
    ],
    "meta": {
        "perPage": 100,
        "nextStartingAfter": "12777",
        "sortBy": "id",
        "sortDirection": "ASC",
        "hasMore": false
    }
}
```
