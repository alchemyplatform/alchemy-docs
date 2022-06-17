---
description: >-
  Returns identity and transaction information about a confirmed block in the
  ledger
---

# getBlock

## Parameters

* `<u64>` - a slot integer denoting the target block number&#x20;
*   `<object>` - (optional) Config object:

    * `encoding:` (optional) _\<string>_ - data encoding for each returned transaction

    Accepts one of the following strings:\
    \[`"json"` _(Default)_, `"jsonParsed"`, `"base58"` (_slow_), `"base64"`] \
    &#x20;`"jsonParsed"` encoding attempts to use program-specific parsers to make the `transaction.message.instructions` list more human-readable; if a parser cannot be found, the instruction falls back to default JSON.&#x20;

    * &#x20;`transactionDetails:` (optional) _\<string>_ - level of transaction detail to return\
      Accepts one of the following strings:\
      \[`"full"` _(Default)_, `"signatures"`, or `"none"`]&#x20;
    * &#x20;`rewards:` __ (optional) _bool_ - whether to populate the `rewards` array.  `true` (Default)
    * `commitment:` (optional) Configures the commitment level of the blocks queried\
      Accepts one of the following strings: \[`"finalized"`, `"confirmed"`, `"processed"]` \
      For more info, refer to this [doc](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment).
    * `maxSupportedTransactionVersion:` _(_optional) _\<number>_ - sets the maximum transaction version.&#x20;

{% hint style="info" %}
NOTE: For `maxSupportedTransactionVersion:` you cannot query blocks that contain a transaction with a higher version.
{% endhint %}

## Returns

{% tabs %}
{% tab title="Confirmed Block" %}
* `<object>` - Object
  * `blockhash:` < base-58 encoded string> - blockhash of a given block
  * `previousBlockhash:`< base-58 encoded string> - the blockhash of this block's parent. If the parent block is not available due to ledger cleanup, this field will return `"11111111111111111111111111111111"`
  * `parentSlot:` \<u64> - the slot index of this block's parent
  * `transactions:` \<JSON array> -  transaction details when queried with the `"full"` flag under `transactionDetails`
    * `transaction:` \<object|\[string,encoding]> - encoded transaction object&#x20;
    * `meta:` \<object> - transaction status metadata object, containing `null` or:
      * `err:` \<object | null> - If transaction failed, error messaage. If transaction succeeded `null`&#x20;
      * `fee:` \<u64> - fee for this transaction&#x20;
      * `preBalances:` \<array of u64s> - account balances from before the transaction was processed
      * `postBalances:` \<array of u64s> - account balances after the transaction was processed
      * `innerInstructions:` \<array|null> - List of inner instructions\
        &#x20;`null` if not enabled during this transaction
      * `preTokenBalances:` \<array|undefined> - List of token balances from before the transaction was processed or \
        Undefined if token balance recording was not yet enabled during this transaction
      * `postTokenBalances:` \<array|undefined> - List of token balances from after the transaction was processed \
        Undefined if token balance recording was not yet enabled during this transaction
      * `logMessages:` \<array|null> - array of string log messages\
        `null` if log message recording was not enabled during this transaction
      * `loadedAddresses:` \<object|undefined> - Transaction addresses loaded from address lookup tables. Undefined if `maxSupportedTransactionVersion` was not set in request params.
        * `writable:` \<array\[string base-58 encoded addresses]> - Ordered list addresses for writable loaded accounts
        * `readonly:` \<array\[string base-58 encoded addresses]> - Ordered list addresses for read only loaded accounts
    * `version:` <"legacy"|number|undefined> - Transaction version. \
      Undefined if `maxSupportedTransactionVersion` is not set in request params.
  * `signatures:` \<array of strings> - present if "signatures" are requested for transaction details corresponding to the transaction order in the block
  * `rewards:` \<array of JSON objects> - Object present if rewards are requested
    * `pubkey:` \<base-58 encoded string> - The public key of the account that received the reward
    * `lamports:` \<i64>- number of reward lamports credited or debited by the account, as a i64
    * `postBalance:` \<u64> - account balance in lamports after the reward was applied
    * `rewardType:` \<string|undefined> - type of reward: \[`"fee"`, `"rent"`, `"voting"`, `"staking"`]
    * `commission:` \<u8|undefined> - vote account commission when the reward was credited, only present for voting and staking rewards
  * `blockTime:` \<i64 | null> - estimated production time, as Unix timestamp (seconds since the Unix epoch). null if not available
  * `blockHeight:` \<u64 | null> - the number of blocks beneath this block
{% endtab %}

{% tab title="Unconfirmed Block" %}
* `<null>` - if the specified block is not confirmed
{% endtab %}
{% endtabs %}

## Example

### Request&#x20;

{% tabs %}
{% tab title="cURL" %}
```python
curl --location --request POST 'https://solana-mainnet.g.alchemy.com/v2/demo' \
--header 'Content-Type: application/json' \
--data-raw '{"jsonrpc": "2.0","id":1,"method":"getBlock","params":[430, {"encoding": "json","transactionDetails":"full","rewards":false}]}'
```
{% endtab %}
{% endtabs %}

### Response

{% tabs %}
{% tab title="With Config Object" %}
```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "blockHeight": 428,
    "blockTime": null,
    "blockhash": "3Eq21vXNB5s86c62bVuUfTeaMif1N2kUqRPBmGRJhyTA",
    "parentSlot": 429,
    "previousBlockhash": "mfcyqEXB3DnHXki6KjjmZck6YjmZLvpAByy2fj4nh6B",
    "transactions": [
      {
        "meta": {
          "err": null,
          "fee": 5000,
          "innerInstructions": [],
          "logMessages": [],
          "postBalances": [499998932500, 26858640, 1, 1, 1],
          "postTokenBalances": [],
          "preBalances": [499998937500, 26858640, 1, 1, 1],
          "preTokenBalances": [],
          "status": {
            "Ok": null
          }
        },
        "transaction": {
          "message": {
            "accountKeys": [
              "3UVYmECPPMZSCqWKfENfuoTv51fTDTWicX9xmBD2euKe",
              "AjozzgE83A3x1sHNUR64hfH7zaEBWeMaFuAN9kQgujrc",
              "SysvarS1otHashes111111111111111111111111111",
              "SysvarC1ock11111111111111111111111111111111",
              "Vote111111111111111111111111111111111111111"
            ],
            "header": {
              "numReadonlySignedAccounts": 0,
              "numReadonlyUnsignedAccounts": 3,
              "numRequiredSignatures": 1
            },
            "instructions": [
              {
                "accounts": [1, 2, 3, 0],
                "data": "37u9WtQpcm6ULa3WRQHmj49EPs4if7o9f1jSRVZpm2dvihR9C8jY4NqEwXUbLwx15HBSNcP1",
                "programIdIndex": 4
              }
            ],
            "recentBlockhash": "mfcyqEXB3DnHXki6KjjmZck6YjmZLvpAByy2fj4nh6B"
          },
          "signatures": [
            "2nBhEBYYvfaAe16UMNqRHre4YNSskvuYgx3M6E4JP1oDYvZEJHvoPzyUidNgNX5r9sTyN1J9UxtbCXy2rqYcuyuv"
          ]
        }
      }
    ]
  },
  "id": 1
}
```
{% endtab %}

{% tab title="Without Config Object" %}
```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "blockHeight": 428,
    "blockTime": null,
    "blockhash": "3Eq21vXNB5s86c62bVuUfTeaMif1N2kUqRPBmGRJhyTA",
    "parentSlot": 429,
    "previousBlockhash": "mfcyqEXB3DnHXki6KjjmZck6YjmZLvpAByy2fj4nh6B",
    "rewards": [],
    "transactions": [
      {
        "meta": {
          "err": null,
          "fee": 5000,
          "innerInstructions": null,
          "logMessages": null,
          "postBalances": [499998932500, 26858640, 1, 1, 1],
          "postTokenBalances": [],
          "preBalances": [499998937500, 26858640, 1, 1, 1],
          "preTokenBalances": [],
          "status": {
            "Ok": null
          }
        },
        "transaction": [
          "AVj7dxHlQ9IrvdYVIjuiRFs1jLaDMHixgrv+qtHBwz51L4/ImLZhszwiyEJDIp7xeBSpm/TX5B7mYzxa+fPOMw0BAAMFJMJVqLw+hJYheizSoYlLm53KzgT82cDVmazarqQKG2GQsLgiqktA+a+FDR4/7xnDX7rsusMwryYVUdixfz1B1Qan1RcZLwqvxvJl4/t3zHragsUp0L47E24tAFUgAAAABqfVFxjHdMkoVmOYaR1etoteuKObS21cc1VbIQAAAAAHYUgdNXR0u3xNdiTr072z2DVec9EQQ/wNo1OAAAAAAAtxOUhPBp2WSjUNJEgfvy70BbxI00fZyEPvFHNfxrtEAQQEAQIDADUCAAAAAQAAAAAAAACtAQAAAAAAAAdUE18R96XTJCe+YfRfUp6WP+YKCy/72ucOL8AoBFSpAA==",
          "base64"
        ]
      }
    ]
  },
  "id": 1
}
```
{% endtab %}
{% endtabs %}
