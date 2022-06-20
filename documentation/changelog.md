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

### 06/18/2022

* **\[API]** Added `limit` parameter in [getNFTsForCollection](../enhanced-apis/nft-api/getnftsforcollection.md).

### 06/17/2022

* **\[API]** Added `tokenType` response field in [getContractMetadata](../enhanced-apis/nft-api/getcontractmetadata.md).

### 06/16/2022

* **\[API]** Added beta support for [getSpamContracts](../enhanced-apis/nft-api/getspamcontracts.md), [isSpamContract](../enhanced-apis/nft-api/isspamcontract.md), and [reingestContract](../enhanced-apis/nft-api/reingestcontract.md).

### 06/15/2022

* **\[Latency]** Specify `Accept-Encoding` in the header of your request (according to [HTTP standards](https://httpwg.org/specs/rfc7231.html#rfc.section.5.3.4\))) to get compressed response payloads up to 95% for all responses bigger 1024 bytes, expect large latency reductions as a result. See example request below:

```
curl https://eth-mainnet.alchemyapi.io/v2/demo \
   -v -X POST \
   -H "Content-Type: application/json" \
   -H "Accept-Encoding: gzip" \
   -d '{"method":"trace_replayTransaction","params":["0x5862dc09779b4af56ab8829acdf0fb3160962db1d5aa4236950e307a36612450",["trace"]],"id":1,"jsonrpc":"2.0"}'
```

The response payload will contain a header `Content-Encoding` where the value is the compression algorithm so the client knows how to decompress, see example response below:

```
< content-type: application/json
< content-length: 727
< content-encoding: gzip
_<8b>^H^@^@^@^@^@^@^@ìWËnÛ0^Pü^W<9e><8d>bù^úV _P¤§ ^G<92>»^LR¸q ËA<8b>ÀÿÞ<95><8c>Àv^R¡r<8d>äPdá^CEkù<98>á^LW<8f>êÇf}×ÝWµTæ^S¨<85>º%µÔ^KÕñf»êÕòQ·ýýVZ
~Éß<9b>>÷üå¶5µ¼Û®V^KÕw¹²Z^?ª\ûÛõÝ<90>ÒºõÏ1!Ù^V¬·Ñ^@`<89>ÕS<8c><90>s^NYm<9d>w^U©º<84>U^F®yµºú}/C<8d>Mé¹É<9b>q^Pg-¸aewOëÐµµ<98>*ÁDP6) á^XÑ:N%1&§c©Ù5o0³C<99>^ZÚTþ¼p<97>¥ëàÜðó`§^Á<96>[òÈ6Ô<90>"¸^T-^FQ28<98>^T[kH&ú©ü
FÐ¶©^Xc^[#A^FöÕ5^S9S^B´5úP«<99>Ê^OEGï¢^Sø ¹ê^\å<84>%yÇL<9c><85>9o¢¦i^\}Ð^Q3<90>o^VtÉ-ÔfYWò<96>^R^Fël<94>CPZ<9a>^OÚSèDr^H¨j^V ð¼ÜD)êh^H^DÁB<90>ÎH<8f>N<8e>^O`<88>²s^PPòy3ïÃ<99>¬<93>k95<90>õ#ñùû'<86>^R<8a>Í1\t^H<83>^\<8f><98>^K_2Æ%!¢î×£¢³^_¨^@1<85>bÐC^Q<88>ª÷^X &N<9c>5@#<92>ã#^Y^Oyµå1)Xðj·PÜuëNz¾ò^Cw=<93>:Ø×Þ£6Û2ÚÔf´¶±ù<99>HÞ<91><8e>ëïÒsä;»Å«NvÆ^B<8f><9c><8c>xÅ7b<98>Ï^]^MÈâ<89>£}8Á<87>^Sü^ONpPôÜ;øbE»^W<8a><86>·<94>ô3)[<91>P;<91>2Pc^]P^_ <98>+Þ^S(`ÀáP<85>É|ß6^BÄXU<85>áÕ£ºl<92>Õ<99>ª^]¦:B^T^"ºxWL^Y1<9c>b<9a>À4<9d>ë^[bZq^^¦¯E^St£<83><9c><9c>X^A^VB^SÏT£5P<8a>M®x<8e>^Y<92>Í<93>7Áßb¯dçgpªß<93>S^R§:-â©¹ZÛ[r^Zò¿sú^ZI305ï<89>i^Mõ´<8c><90>¯+@cõÔ^Næ^Ã^GNæ^V^N³9áp       'Õ<96>\dùÚy ,-<96>^Y<9c>Øç<9c>ÈóÃÏ«ý<87>ëp<9f>ìv^?^@^@^@ÿÿ^C^@g<83><91>Ý^H^O^@^@
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
