---
description: Returns minimum balance required to make account rent exempt.
---

# getMinimumBalanceForRentExemption

## Parameters

* `<usize>` - account data length
* `<object>` - (optional)&#x20;
  * `commitment:` (optional) Configures the commitment level of the blocks queried\
    Accepts one of the following strings: \[`"finalized"`, `"confirmed"`, `"processed"]` \
    For more info, refer to this [doc](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment).

## Returns

* `<u64>` - minimum lamports required in account

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
    "method": "getMinimumBalanceForRentExemption",
    "params": [
        50
    ]
}'
```
{% endtab %}
{% endtabs %}

### Response

```javascript
{
    "jsonrpc": "2.0",
    "result": 1238880,
    "id": 1
}
```
