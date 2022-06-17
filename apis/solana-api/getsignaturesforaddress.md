---
description: >-
  Returns signatures for confirmed transactions that include the given address
  in their accountKeys list. Returns signatures backwards in time from the
  provided signature or most recent confirmed block
---

# getSignaturesForAddress

## **Parameters**

* \<base-58 encoded string> - account address
* `<object>` - (optional) Config object:
  * `limit:` (optional)\<number> - maximum transaction signatures to return (between 1 and 1,000, default: 1,000).
  * `before:` (optional) \<string> - start searching backwards from this transaction signature. If not provided the search starts from the top of the highest max confirmed block.
  * `until:` (optional) \<string> - search until this transaction signature, if found before limit reached.
  * `commitment:` \<object> - (optional) Configures the commitment level of the blocks queried\
    Accepts one of the following strings: \[`"finalized"`, `"confirmed"`, `"processed"]` \
    For more info, refer to this [doc](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment).
  * `minContextSlot:` (optional) \<number> - set the minimum slot that the request can be evaluated at.

## **Results**

* `<object>`
  * `signature:` \<base-58 encoded string> - transaction signature as&#x20;
  * `slot:` \<u64> - The slot that contains the block with the transaction
  * `err:` \<object | null> - Error if transaction failed, null if transaction succeeded.&#x20;
  * `memo:` \<string |null> - Memo associated with the transaction, null if no memo is present
  * `blockTime:` \<i64 | null> - estimated production time, as Unix timestamp (seconds since the Unix epoch) of when transaction was processed. null if not available.

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
    "method": "getSignaturesForAddress",
    "params": [
        "Vote111111111111111111111111111111111111111",
        {
            "limit": 1
        }
    ]
}'
```
{% endtab %}
{% endtabs %}

### Response

```javascript
{
    "jsonrpc": "2.0",
    "result": [
        {
            "blockTime": 1654173549,
            "confirmationStatus": "finalized",
            "err": null,
            "memo": null,
            "signature": "67iWWgeXYSXxKmxMjAahr9ATXvv1SJoHedXYZxicFQtF4eFxCWJxUwEYczNbrua8pQAshmkf73gfAX5itutWTA7m",
            "slot": 136105283
        }
    ],
    "id": 1
}
```
