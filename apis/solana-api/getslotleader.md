---
description: Returns the current slot leader
---

# getSlotLeader

## **Parameters**

* `<object>` - (optional) Config object:
  * `commitment:` \<object> - (optional) Configures the commitment level of the blocks queried\
    Accepts one of the following strings: \[`"finalized"`, `"confirmed"`, `"processed"]` \
    For more info, refer to this [doc](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment).
  * `minContextSlot:` \<number> - (optional) set the minimum slot that the request can be evaluated at

## **Results**

* `<base-58 encoded string>` - Node identity Pubkey

## Example&#x20;

### Request

{% tabs %}
{% tab title="cURL" %}
```python
curl --location --request POST 'https://solana-mainnet.g.alchemy.com/v2/demo' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getSlotLeader"
}'
```
{% endtab %}
{% endtabs %}

### Response

```javascript
{
    "jsonrpc": "2.0",
    "result": "Fd7btgySsrjuo25CJCj7oE7VPMyezDhnx7pZkj2v69Nk",
    "id": 1
}
```
