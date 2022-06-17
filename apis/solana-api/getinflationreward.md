---
description: Returns the inflation / staking reward for a list of addresses for an epoch
---

# getInflationReward

## **Parameters**

* `<array of base-58 encoded strings>` - An array of addresses to query
* `<object>` - (optional) Config object:
  * `commitment:` \<object> - (optional) Configures the commitment level of the blocks queried\
    Accepts one of the following strings: \[`"finalized"`, `"confirmed"`, `"processed"]` \
    For more info, refer to this [doc](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment).
  * &#x20;`epoch:` \<u64> - (optional) An epoch for which the reward occurs. If omitted, the previous epoch will be used
  * &#x20;`minContextSlot:` \<number> - (optional) set the minimum slot that the request can be evaluated at

## **Results**

* `epoch:` \<u64>, epoch for which reward occured
* `effectiveSlot:` \<u64>, the slot in which the rewards are effective
* `amount:` \<u64>, reward amount in lamports
* `postBalance:` \<u64>, post balance of the account in lamports
* `commission:` \<u8|undefined> - vote account commission when the reward was credited



## Example&#x20;

### Request

{% tabs %}
{% tab title="cURL" %}
```python
curl --location --request POST 'https://solana-mainnet.g.alchemy.com/v2/alch-demo/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "method": "getInflationReward",
    "jsonrpc": "2.0",
    "params": [
        [],
        {
            "commitment": "confirmed"
        }
    ],
    "id": "1"
}'
```
{% endtab %}
{% endtabs %}

### Response

```javascript
{
    "jsonrpc": "2.0",
    "result": [],
    "id": "1"
}
```
