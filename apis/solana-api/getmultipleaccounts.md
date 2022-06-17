---
description: Returns the account information for a list of Pubkeys
---

# getMultipleAccounts

## **Parameters**

* \<array of base-58 encoded strings> - An array of Pubkeys to query (up to a maximum of 100)
*   `<object>` - (optional) Config object:

    * `encoding:` (optional) _\<string>_ - data encoding for each returned transaction

    Accepts one of the following strings:\
    \[`"json"` _(Default)_, `"jsonParsed"`, `"base58"` (_slow_), `"base64",` `"base64+zstd"`] \
    &#x20;`"jsonParsed"` encoding attempts to use program-specific parsers to make the `transaction.message.instructions` list more human-readable; if a parser cannot be found, the instruction falls back to default JSON.&#x20;

    * `dataSlice:` (optional) \<object> - limit the returned account data using the provided `offset: <usize>` and `length: <usize>` fields; only available for "base58", "base64" or "base64+zstd" encodings.
    * `minContextSlot:` (optional)  \<number> - set the minimum slot that the request can be evaluated at.

## **Result**

{% tabs %}
{% tab title="Pubkey Exists" %}
* `<object>` - a JSON object:
  * `lamports:` \<u64>, number of lamports assigned to this account
  * `owner:` < base-58 encoded string>, Pubkey of the program this account has been assigned to
  * `data:` <\[string, encoding]|object>, data associated with the account, either as encoded binary data or JSON format `{<program>: <state>}`, depending on encoding parameter
  * `executable:` \<bool>, boolean indicating if the account contains a program (and is strictly read-only)
  * `rentEpoch:` \<u64>, the epoch at which this account will next owe rent
{% endtab %}

{% tab title="Pubkey Does Not Exist" %}
* `<null>` - if the account at that Pubkey doesn't exist
{% endtab %}
{% endtabs %}

## Example

### Request

{% tabs %}
{% tab title="cURL" %}
```python
curl --location --request POST 'https://solana-mainnet.g.alchemy.com/v2/demo/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getMultipleAccounts",
    "params": [
        [
            "vines1vzrYbzLMRdu58ou5XTby4qAqVRLmqo36NKPTg",
            "4fYNw3dojWmQ4dXtSGE9epjRGy9pFSx62YypT7avPYvA"
        ],
        {
            "dataSlice": {
                "offset": 0,
                "length": 0
            }
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
    "result": {
        "context": {
            "slot": 136100846
        },
        "value": [
            {
                "data": [
                    "",
                    "base64"
                ],
                "executable": false,
                "lamports": 410426055,
                "owner": "11111111111111111111111111111111",
                "rentEpoch": 314
            },
            {
                "data": [
                    "",
                    "base64"
                ],
                "executable": false,
                "lamports": 2000000,
                "owner": "11111111111111111111111111111111",
                "rentEpoch": 314
            }
        ]
    },
    "id": 1
}
```
