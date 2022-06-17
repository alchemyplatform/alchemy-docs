---
description: Returns commitment for particular block
---

# getBlockCommitment

## Parameters

* `<u64>` - a slot integer denoting the block number&#x20;

## Returns

* `<object>`
  * `commitment:` array of u64 integers or `<null>` for unknown blocks
    * `<array>` - commitment, array of u64 integers logging the amount of cluster stake in lamports that has voted on the block at each depth from 0 to `MAX_LOCKOUT_HISTORY`&#x20;
  * `totalStake` - total active stake, in lamports, of the current epoch

## Example

### Request

{% tabs %}
{% tab title="cURL" %}
```python
curl --location --request POST 'https://solana-mainnet.g.alchemy.com/v2/demo' \
--header 'Content-Type: application/json' \
--data-raw '{"jsonrpc":"2.0","id":1, "method":"getBlockCommitment","params":[5]}'
```
{% endtab %}
{% endtabs %}

### Response

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "commitment": null,
        "totalStake": 385145605723274688
    },
    "id": 1
}
```
