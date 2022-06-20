---
description: All upgrades and changes to Alchemy's API endpoints and product features
---

# Changelog

## Future

### 06/27/2022

* **\[API]** Deprecated parameter feature set for [alchemy\_getAssetTransfers](../enhanced-apis/transfers-api.md). After June 27, 2022, previous parameter logic will no longer be accepted.
  * **Previous parameter configuration:**
    * `fromBlock`: defaults to `"latest"`
    * `category`: \[optional] array of categories, can be any of the following: "`external`", "`internal`", "`token`", "`erc20`", "`erc721`", "`erc1155`" with the default array -> \["`external`", "`internal`", "`token`"]
  * **New parameters:**
    * `fromBlock`: defaults to `"0x0"`
      * &#x20; Defaults to the genesis block for intuitiveness
    * `category`: \[**required**] array of categories, can be any of the following: "`external`", "`internal`", "`erc20`", "`erc721`", "`erc1155`"
      * Removed the `"token"` category and is now a required param. Users must specifically request their desired token/transfer types
* **\[API]** Added `tokenType` response field in [getContractMetadata](../enhanced-apis/nft-api/getcontractmetadata.md).

## Past

### 06/17/2022

* **\[API]** Added `tokenType` response field in [getContractMetadata](../enhanced-apis/nft-api/getcontractmetadata.md).

### 06/16/2022

* **\[API]** Added beta support for [getSpamContracts](../enhanced-apis/nft-api/getspamcontracts.md), [isSpamContract](../enhanced-apis/nft-api/isspamcontract.md), and [reingestContract](../enhanced-apis/nft-api/reingestcontract.md).

### 06/15/2022

* **\[Latency]** Specify `Accept-Encoding` in the header of your request to get compressed response payloads for all responses bigger 1024 bytes, expect large latency reductions as a result. See example request below:

```
curl https://eth-mainnet.alchemyapi.io/v2/demo \
   -v -X POST \
   -H "Content-Type: application/json" \
   -H "Accept-Encoding: gzip" \
   -d '{"method":"trace_replayTransaction","params":["0x5862dc09779b4af56ab8829acdf0fb3160962db1d5aa4236950e307a36612450",["trace"]],"id":1,"jsonrpc":"2.0"}'
```

* **\[API]** Deprecated parameter input for [alchemy\_filteredNewFullPendingTransactions](../enhanced-apis/subscription-api-websockets/#alchemy\_filterednewfullpendingtransactions). Previous parameter input is still backward compatible but will be unsupported in the future.&#x20;
  * **Previous parameters:**
    * `address`: address to receive pending transactions for (sent `from` or `to` this address).&#x20;
  * **New parameters:**
    * `fromAddress` (optional): `string` or \[`array of strings`]
      * Singular address or array of addresses to receive pending transactions sent **from** this address.
    * `toAddress` (optional): `string` or \[`array of strings`]
      * Singular address or array of addresses to receive pending transactions **to** this address
    * `hashesOnly` (optional): `boolean`&#x20;
      * Default value is `false`, where the response matches the payload of [eth\_getTransactionByHash](https://www.notion.so/alchemy/apis/ethereum/eth-gettransactionbyhash#returns) . If set to `true`, the payload returned contains _only the hashes of the transactions_ that are added to the pending state, which matches the payload of [newPendingTransactions](https://docs.alchemy.com/alchemy/enhanced-apis/subscription-api-websockets#newpendingtransactions))

### 06/13/2022

* **\[API]** Added internal transaction support for Georli testnet in the [Transfers API](../enhanced-apis/transfers-api.md) and [Address Activity Webhooks ](../enhanced-apis/notify-api/using-notify.md#address-activity)

### 06/06/2022

* **\[API]** Added beta support for [getFloorPrice](../enhanced-apis/nft-api/getfloorprice.md)

### 06/02/2022

* **\[API]** Added beta support for [Solana API methods.](../apis/solana-api/)

### 06/01/2022

* **\[API]** Deprecated parity\_getBlockReceipts, please use __ [alchemy\_getTransactionReceipts](../enhanced-apis/transaction-receipts-api/#alchemy\_gettransactionreceipts) instead.

### 05/25/2022

* **\[API]** Added support for [eth\_sendPrivateTransaction](../apis/ethereum/eth-sendPrivateTransaction.md)
* **\[API]** Added support for [eth\_cancelPrivateTransaction](../apis/ethereum/eth\_cancelPrivateTransaction.md)

### 05/23/2022

* **\[Latency]** 40x faster webhook response on average&#x20;

### 05/20/2022

* **\[API]** New endpoint added to NFT API: [getOwnersForCollection](../enhanced-apis/nft-api/getownersforcollection.md)

### 05/19/2022

* **\[Latency]** 20x faster load time on **** [Dashboard](https://dashboard.alchemyapi.io/) for p98 request logs and usage page
* **\[Latency]** 10x faster load time on **** [Dashboard](https://dashboard.alchemyapi.io/) for average request logs and usage page
* **\[Latency]** 200ms reduction for all p99.9 API response times
* **\[API]** Kovan or Ropsten API keys can no longer be created from the dashboard
  * Kovan is deprecated and customers should migrate off to Goerli ASAP
  * Ropsten will be deprecated after being merged on June 8th, 2022 and customers should migrate off to Goerli before then

### 05/18/2022

* **\[API]** Deprecated gas price webhook support. Upvote [this feature request](https://roadmap.alchemy.com/b/feature-requests/gas-price-webhooks) if you'd like to see it supported.&#x20;

### 04/27/2022

* **\[API]** [Alchemy Notify upgraded from V1 to V2](../enhanced-apis/notify-api/using-notify.md#whats-the-difference-between-notify-v1-and-v2)

### Before 04/27/2022

Unfortunately all changes prior to April 27, 2022 are not documented on Alchemy's changelog. If you have any questions or concerns with API or product changes, feel free to reach out to us at support@alchemy.com.&#x20;
