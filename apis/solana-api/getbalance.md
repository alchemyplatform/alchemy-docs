---
description: Returns the balance of the account of provided Pubkey
---

# getBalance

## **Parameters**

* `<base-58 encoded string>` - Pubkey of account to query
* `<object>` - (optional) Config object:
  * `commitment:` (optional) \<string> - Configures the commitment level of the blocks queried\
    Accepts one of the following strings: \[`"finalized"`, `"confirmed"`, `"processed"]` \
    For more info, refer to this [doc](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment).
  * `minContextSlot:` (optional) \<number> - set the minimum slot that the request can be evaluated at.

## **Result**

* `RpcResponse:`\<u64> - RpcResponse JSON object with `value` field set to the balance

## Example

### Request

{% tabs %}
{% tab title="cURL" %}
```python
curl --location --request POST 'https://solana-mainnet.g.alchemy.com/v2/demo' \
--header 'Content-Type: application/json' \
--data-raw '  {
    "jsonrpc": "2.0",
    "id": 1,
    "method":"getBalance", 
    "params":
    [
    "83astBRguLMdt2h5U1Tpdq5tjFoJ6noeGwaY3mDLVcri"
    ]
  }'
```
{% endtab %}
{% endtabs %}

### Response

```javascript
{
  "jsonrpc": "2.0",
  "result": { "context": { "slot": 1 }, "value": 0 },
  "id": 1
}
```
