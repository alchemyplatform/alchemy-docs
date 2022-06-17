---
description: Returns information about the current supply.
---

# getSupply

## **Parameters**

* `<object>` - (optional) Config object:
  * `commitment:` \<object> - (optional) Configures the commitment level of the blocks queried\
    Accepts one of the following strings: \[`"finalized"`, `"confirmed"`, `"processed"]` \
    For more info, refer to this [doc](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment).
  * `excludeNonCirculatingAccountsList:` \<bool> - (optional) excludes non circulating accounts list from response

## **Results**

* `total:` \<u64> - Total supply in lamports
* `circulating:` \<u64> - Circulating supply in lamports
* `nonCirculating:` \<u64> - Non-circulating supply in lamports
* `nonCirculatingAccounts:` \<array> - an array of account addresses of non-circulating accounts, as strings. If `excludeNonCirculatingAccountsList` is enabled, the returned array will be empty.

## Example&#x20;

### Request

{% tabs %}
{% tab title="cURL" %}
```python
curl --location --request POST 'https://solana-mainnet.g.alchemy.com/v2/demo/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getSupply"
}'
```
{% endtab %}
{% endtabs %}

### Response

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "context": {
      "slot": 1114
    },
    "value": {
      "circulating": 16000,
      "nonCirculating": 1000000,
      "nonCirculatingAccounts": [
        "FEy8pTbP5fEoqMV1GdTz83byuA8EKByqYat1PKDgVAq5",
        "9huDUZfxoJ7wGMTffUE7vh1xePqef7gyrLJu9NApncqA",
        "3mi1GmwEE3zo2jmfDuzvjSX9ovRXsDUKHvsntpkhuLJ9",
        "BYxEJTDerkaRWBem3XgnVcdhppktBXa2HbkHPKj2Ui4Z"
      ],
      "total": 1016000
    }
  },
  "id": 1
}
```
