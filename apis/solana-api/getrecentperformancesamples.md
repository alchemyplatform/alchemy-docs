---
description: >-
  Returns a list of recent performance samples, in reverse slot order.
  Performance samples are taken every 60 seconds and include the number of
  transactions and slots that occur in a given time window.
---

# getRecentPerformanceSamples

## Parameters

* `limit:` \<usize> - (optional) number of samples to return (maximum 720)

## Returns

* \<array of RpcPerfSample objejcts>
  * `slot:` \<u64> - Slot in which sample was taken at
  * `numTransactions:` \<u64> - Number of transactions in sample
  * `numSlots:` \<u64> - Number of slots in sample
  * `samplePeriodSecs:` \<u16> - Number of seconds in a sample window

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
    "method": "getRecentPerformanceSamples",
    "params": [
        4
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
            "numSlots": 80,
            "numTransactions": 79434,
            "samplePeriodSecs": 60,
            "slot": 136084954
        },
        {
            "numSlots": 78,
            "numTransactions": 68080,
            "samplePeriodSecs": 60,
            "slot": 136084874
        },
        {
            "numSlots": 75,
            "numTransactions": 83223,
            "samplePeriodSecs": 60,
            "slot": 136084796
        },
        {
            "numSlots": 82,
            "numTransactions": 87759,
            "samplePeriodSecs": 60,
            "slot": 136084721
        }
    ],
    "id": 1
}
```
