---
description: Simulate sending a transaction
---

# simulateTransaction

## **Parameters**

* `<string>` - Transaction, as an encoded string. The transaction must have a valid blockhash, but is not required to be signed.
* `<object>` - (optional) Configuration object containing the following fields:
  * `sigVerify:` \<bool> - if true the transaction signatures will be verified (default: false, conflicts with `replaceRecentBlockhash`)
  * `commitment:` \<object> - (optional) Configures the commitment level of the blocks queried\
    Accepts one of the following strings: \[`"finalized"`, `"confirmed"`, `"processed"]` \
    For more info, refer to this [doc](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment).
  * `encoding: <string>` - (optional) Encoding used for the transaction data. Either `"base58"` (_slow_, **DEPRECATED**), or `"base64"`. (default: `"base58"`).
  * `replaceRecentBlockhash:` \<bool> - (optional) if true the transaction recent blockhash will be replaced with the most recent blockhash. (default: false, conflicts with `sigVerify`)
  * `accounts:` \<object> - (optional) Accounts configuration object containing the following fields:
    *   `encoding:` (optional) _\<string>_ - data encoding for each returned transaction

        Accepts one of the following strings:\
        \[`"base64"` (default), `"base64+zstd"` or `"jsonParsed"`] \
        &#x20;`"jsonParsed"` encoding attempts to use program-specific parsers to make the `transaction.message.instructions` list more human-readable; if a parser cannot be found, the instruction falls back to default JSON.&#x20;
    * `addresses:` \<array of base-58 encoded strings> - An array of accounts to return
  * `minContextSlot:` (optional)  \<number> - set the minimum slot that the request can be evaluated at.

## **Results**

{% tabs %}
{% tab title="Tx Success" %}
* `error:` \<object | string | null> - Error if transaction failed, null if transaction succeeded
* `logs:` \<array | null> - Array of log messages the transaction instructions output during execution, null if simulation failed before the transaction was able to execute (for example due to an invalid blockhash or signature verification failure)
* `accounts:` \<array> | null> - array of accounts with the same length as the `accounts.addresses` array in the request
  * `<null>` - if the account doesn't exist or if `err` is not null
  * `<object>` - otherwise, a JSON object containing:
    * `lamports:` \<u64>, number of lamports assigned to this account
    * `owner:` \<base-58 encoded string>, Pubkey of the program this account has been assigned to
    * `data:` <\[string, encoding]|object>, data associated with the account, either as encoded binary data or JSON format `{<program>: <state>}`, depending on encoding parameter
    * `executable:` \<bool>, boolean indicating if the account contains a program (and is strictly read-only)
    * `rentEpoch:` \<u64>, the epoch at which this account will next owe rent
* `unitsConsumed:` \<u64 | undefined>, The number of compute budget units consumed during the processing of this transaction
{% endtab %}
{% endtabs %}

## Example&#x20;

### Request

{% tabs %}
{% tab title="cURL" %}
```python
curl --location --request POST 'https://solana-mainnet.g.alchemy.com/v2/alch-demo/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "method": "simulateTransaction",
    "jsonrpc": "2.0",
    "params": [
        "AwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMCAgiFt0xk+FyHf76k7/dkz9vjFqSY8vhrizSEx2GWidkQ5ewAKY7OUUt6ZEIryxOHEx1w1mGioe0SGujvGtbbPvaSDCG6EGTb0+Q1B98oAxfD0GiOZwOLQW1IkeOC71yX0NQm+LOK6+h53IwvrgMD9JNZme6u7PeARqlqZzOD4iRLRnyGE+3cPqKW5IiU66yIZZOgOtO4B9TYReBdaWsp+Dx5lyxj0FXRm/6oiIDpU9abZ6qIYeIKRR96fuhXeHpmjwUMJxNk9vhCZs3zhxL/0CZLdm0EbWEwrD4A7KBrPOYP2gbd9uHXZaGT2cvhRs7reawctIXtX1s3kTqM9YV+/wCph9Yfdu8NCN6d9KtOQeMPovh7jKgKo56yxXQO8eTA6XUBBgcAAgEDBQQH4gMobmZ0X2FjY291bnQ6ICI5enlMTjVDUXd4V3JFUGl0MXNGeTVEWjV4TXFKZk5RVExpcUJWU2Z2UHZXWSIsCiAgICBkYXRhX2FjY291bnQ6ICIzZDhTcG5abnRtR0t0dlVtaHVhazdLU3U2WFQ3QVVNaW51VURtYTVobWlCWCIsCiAgICBjb2luX3NyY19hY2N0OiAiQkI3cGN0UGVWQ1FQalhNR2RrRFg5QURUOTk1Z1hDVkx5SEpVeWdwSlBOMngiLAogICAgY29pbl9kZXN0X2FjY3Q6ICI5UDY4a2J2VzlLelBIc1pURnE0eVFyUlZrWXNmNUNRRmc5aFZoeUJaZHBQMiIsCiAgICB0cmFuc2Zlcl9hdXRob3JpdHk6ICJwTWludFRaNUNFa0hVaGdydXJQZ29pTW50b0xnRndic0tkYnFOclhzcmR5IiwKICAgIGFjdGl2aXR5OiAxLCAKICAgIHBheV9wZXJpb2Q6IDYwNDgwMC4wMDAwMDAsIAogICAgcGF5X3JhdGU6IDguMDAwMDAwLAogICAgdGltZXN0YW1wOiAxNjU1MTg0ODYwLAogICAgbXVsdGlwbGllcjogMS4wLAogICAgbWF4X3BheW91dDogMTYuMDAwMDAwKQ==",
        {
            "encoding": "base64",
            "commitment": "recent",
            "sigVerify": false,
            "accounts": {
                "addresses": [
                    "9zyLN5CQwxWrEPit1sFy5DZ5xMqJfNQTLiqBVSfvPvWY",
                    "GtFMtrW31RdCeSdW4ot3jNVuoLtFywJGGTiF1Q8Uopky",
                    "pMintTZ5CEkHUhgrurPgoiMntoLgFwbsKdbqNrXsrdy",
                    "3d8SpnZntmGKtvUmhuak7KSu6XT7AUMinuUDma5hmiBX",
                    "9P68kbvW9KzPHsZTFq4yQrRVkYsf5CQFg9hVhyBZdpP2",
                    "BB7pctPeVCQPjXMGdkDX9ADT995gXCVLyHJUygpJPN2x",
                    "pSTAkE7Z2guBmSheg6tHdHk3rT1wmF1Mfuf52tnWeAd",
                    "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                ]
            }
        }
    ],
    "id": "ea57afc0-7db8-4aa3-8ddb-a28c6099153c"
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
            "slot": 137569919
        },
        "value": {
            "accounts": [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            "err": "BlockhashNotFound",
            "logs": [],
            "unitsConsumed": 0
        }
    },
    "id": "ea57afc0-7db8-4aa3-8ddb-a28c6099153c"
}
```
