---
description: GET /domains/<domain name>/transfers/lastest
---

# Get domain transfer events

`` `GET https://unstoppabledomains.g.alchemy.com/domains/thatguyintech.crypto/transfers/latest` ``

This endpoint tracks which block and which blockchain domain names are being transferred from one owner wallet address to another.

## URL Params

* `domain name` - could be any domain name or TLD. To simplify communication resolution service will not return error in case of invalid domain or unsupported TLD

## Query Params

* none

## Returns

* `data`: (array) an array with latest transfers of domain in different blockchains
  * `domain`: (string) domain name
  * `from:` (address) wallet address that sent a domain
  * `to`: (address) wallet address of receiver
  * `networkId`: (number) blockchain network id
    * 1 - Ethereum or Zilliqa Mainnet
    * 137 - Polygon (Matic) Mainnet
    * 80001 - Polygon (matic) Mumbai Testnet
    * 4 - Ethereum Rinkeby Testnet
    * 5 - Ethereum Goerly Testnet
  * `blockNumber`: (number) when the transfer was happened
  * `blockchain`: (string) on what blockchain domain is located (MATIC , ETH , ZIL). Blockchain names are coin types according to [SLIP-0044](https://github.com/satoshilabs/slips/blob/master/slip-0044.md).

## Example

### Request

```
curl \
--request GET "https://unstoppabledomains.g.alchemy.com/domains/brad.crypto/transfers/latest" \
--header 'Authorization: Bearer <YOUR API KEY>'
```

### Response

```json
{
  "data": [
    {
      "domain": "brad.crypto",
      "from": "0x020e7c546B1567FfC7f6202Ca5F748533523dADc",
      "to": "0x8aaD44321A86b170879d7A244c1e8d360c99DdA8",
      "networkId": 1,
      "blockNumber": 10060311,
      "blockchain": "ETH"
    }
  ]
}
```
