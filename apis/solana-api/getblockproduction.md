---
description: >-
  Returns recent block production information from the current or previous
  epoch.
---

# getBlockProduction

## Parameters

* `<object>` - (optional) Config object:
  * `commitment:` (optional) Configures the commitment level of the blocks queried\
    Accepts one of the following strings: \[`"finalized"`, `"confirmed"`, `"processed"]` \
    For more info, refer to this [doc](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment).
  * `range:` (optional) \<object> - Slot range for block production response. Defaults to to the current epoch.
    * `firstSlot:` \<u64> - first slot to return block production information for (inclusive)
    * &#x20;`lastSlot:` (optional) \<u64> - last slot to return block production information for (inclusive). Defaults to the highest slot
    * `identity:` (optional) < base-58 encoded string> - Specifies return results for a particular validator identity

## Returns

* `<object>`
  * `byIdentity:` \<object> - a dictionary of validator identities\
    Key-> base-58 encoded strings. \
    Value -> two element arrays containing the number of leader slots and the number of blocks produced.
  * `range:` \<object> - block production slot range
    * `firstSlot:` \<u64> - first slot of the block production information (inclusive)
    * `lastSlot:` \<u64> - last slot of block production information (inclusive)

## Example&#x20;

### Request

{% tabs %}
{% tab title="cURL" %}
```python
curl --location --request POST 'https://solana-mainnet.g.alchemy.com/v2/demo' \
--header 'Content-Type: application/json' \
--data-raw '{"jsonrpc":"2.0","id":1, "method":"getBlockProduction"}'
```
{% endtab %}
{% endtabs %}

### Response

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "context": {
            "slot": 134454845
        },
        "value": {
            "byIdentity": {
                "12CUDzb3oe8RBQ4tYGqsuPsCbsVE4KWfktXRihXf8Ggq": [
                    32,
                    27
                ],
                "12ashmTiFStQ8RGUpi1BTCinJakVyDKWjRL6SWhnbxbT": [
                    52,
                    42
                ],
                "12oRmi8YDbqpkn326MdjwFeZ1bh3t7zVw8Nra2QK2SnR": [
                    16,
                    15
                ],
                .............
            },
            "range": {
                "firstSlot": 134352000,
                "lastSlot": 134454845
            }
        }
    },
    "id": 1
 
```
