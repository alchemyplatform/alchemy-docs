---
description: Returns a list of confirmed blocks starting at the given slot
---

# getBlocksWithLimit

## **Parameters**

* `<u64>` - starting slot integer
* `<u64>` - (optional) ending slot integer
* `commitment:` (optional) Configures the commitment level of the blocks queried\
  Accepts one of the following strings: \[`"finalized"`, `"confirmed"`, `"processed"]` \
  For more info, refer to this [doc](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment).

## **Results**

* `<array of u64 integers>:` list of confirmed blocks between the starting and ending slot (if provided) or latest confirmed block, inclusive. Maximum query range allowed is 500,000 slots.

## Example

### Request

{% tabs %}
{% tab title="cURL" %}
```python
curl --location --request POST 'https://solana-mainnet.g.alchemy.com/v2/demo' \
--header 'Content-Type: application/json' \
--data-raw '{"jsonrpc": "2.0","id":1,"method":"getBlocksWithLimit","params":[5, 3]}'
```
{% endtab %}
{% endtabs %}

### Response

```javascript
{
    "jsonrpc": "2.0",
    "result": [
        5,
        6,
        7
    ],
    "id": 1
}
```

