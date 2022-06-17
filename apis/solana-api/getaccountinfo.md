---
description: Returns all information associated with the account of provided Pubkey
---

# getAccountInfo

## **Parameters**

* `<base-58 encoded string>` - Pubkey of account to query
*   `<object>` - (optional) Config object:

    * `encoding:` (optional) _\<string>_ - data encoding for each returned transaction

    Accepts one of the following strings:\
    \[`"json"` _(Default)_, `"jsonParsed"`, `"base58"` (_slow_), `"base64"`] \
    &#x20;`"jsonParsed"` encoding attempts to use program-specific parsers to make the `transaction.message.instructions` list more human-readable; if a parser cannot be found, the instruction falls back to default JSON.&#x20;

    * `dataSlice:` (optional) \<object> - limits the returned account data using the provided `offset: <usize>` and `length: <usize>` fields\
      Only available for `"base58"`, `"base64"` or `"base64+zstd"` encodings.

## **Results**

{% tabs %}
{% tab title="Valid Account" %}
`<object>` - a JSON object containing:

* `lamports:` \<u64>, number of lamports assigned to this account
* `owner:` \<base-58 encoded string>, Pubkey of the program this account has been assigned to
* `data:` <\[string, encoding]|object>, data associated with the account, either as encoded binary data or JSON format `{<program>: <state>}`, depending on encoding parameter
* `executable:` \<bool>, indicates if the account contains a program (and is strictly read-only)
* `rentEpoch:` \<u64>, the epoch at which this account will next owe rent
{% endtab %}

{% tab title="Invalid Account" %}
`<null>` - if the requested account doesn't exist
{% endtab %}
{% endtabs %}

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
    "method": "getAccountInfo",
    "params": [
      "vines1vzrYbzLMRdu58ou5XTby4qAqVRLmqo36NKPTg",
      {
        "encoding": "base58"
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
            "slot": 134461197
        },
        "value": {
            "data": [
                "",
                "base58"
            ],
            "executable": false,
            "lamports": 410431055,
            "owner": "11111111111111111111111111111111",
            "rentEpoch": 311
        }
    },
    "id": 1
}
```
