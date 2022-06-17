---
description: Submits a signed transaction to the cluster for processing.
---

# sendTransaction

## **Parameters**

* `<encoded string>` - fully-signed Transaction
* `<object>` - (optional) Configuration object containing the following field:
  * `skipPreflight:` \<bool> - if true, skip the preflight transaction checks (default: false)
  * `preflightCommitment:` \<string> - (optional) [Commitment](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment) level to use for preflight (default: `"finalized"`).
  * `encoding:` \<string> - (optional) Encoding used for the transaction data. Either `"base58"` (_slow_, **DEPRECATED**), or `"base64"`. (default: `"base58"`).
  * `maxRetries:` \<usize> - (optional) Maximum number of times for the RPC node to retry sending the transaction to the leader. If this parameter not provided, the RPC node will retry the transaction until it is finalized or until the blockhash expires.
  * `minContextSlot:` (optional) \<number> - set the minimum slot that the request can be evaluated at.

## **Results**

* `<base-58 encoded string>` - First Transaction Signature embedded in the transaction **** (transaction id)

## Example&#x20;

### Request

{% tabs %}
{% tab title="cURL" %}
```python
curl --location --request POST 'https://solana-mainnet.g.alchemy.com/v2/alch-demo/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "method": "sendTransaction",
    "jsonrpc": "2.0",
    "params": [
        "AeF71jBTbqF33iO17K/WepKejY6ED8Db2t00aizbkvRpDUaX6mKZMInTbDgrOLTTPgOmYbE96Nlt2IwGmZKSpQ0BAAsZeGK9wdFlyWz2mdFDfZ3/65ZjurcmrptLNm5mN3f8p0ogsmSV/IVZRQW5a5ssHj+xTkSMSg6MvA28piZAJSLyxSNlSqXrkQU25XOnSMYzHuJNOeei2iMWq3lwa8TdxeqjJRFwcKkY21dentnVTDwl1cueQS/QUd9mUuo25ivPwYY3RX3yAyUj3Q6IaALYsHU/017gPZpDvHJJ7jrgSdN8dzeHLDAOEIF1ci79StKCB8hABC87tDUy+cyHrGjv7ceJbKfgtajeraDLc3Ndv8FX/Azg8HJ4eCu29Y+gxBJROld53yhEmAooyHHkcMEPF/qybgtUUE4DMxUftcYRcEeGtXsupOBa7USG+TC3fPVLShGfKH//XF/H9EyQut9RHKTrnofS6+89GaTLV8VZXwcr3giCPPZtOymEVDquZoAthk6pIbU9bjTY+O+NVm9AJVKtkUh02Is8rj1xlTRevQ65RutmBvIsMFSykgwwkEcthzgnj9RgOcNPV63bOnMwtnA25xGVrA5WPR3Cp/qLwsfk76yDUU1ksxe/AT+BbeZD6tzuifWhovJqdEpfnl+qwU5RSmm+bf9lGWui27urEkLY0SuJudyP3580cJpbEGtHLw85u2ypzgSw/X8ulxaI4uU7M7MexO/4+iia6oyVTAFjLi12SQjOVE1oZb3vERv/YSsBOP45MdZXb1/RCItG0H924+Qvzh1Vy52i1Sl3ULQWHFoPCOzzP1aH2CdIP9hLVSu8Mn+Lr2Nkvn22qA5HyDclu6nN/XmuJp8Db7aXm0uYp3KSexdu9rcZZXaHIfHx8uTmLfbItKhf4aZ9tE3BLeXbMw96xmty3GWK/t8PSkFbQ/9hSRqTERLd8b2BR80bZBN1959YJRJtZlSAh0Y0/QrOBfhDaTInzNg0xDUbatfDR7qLZN0mJVepe+fnfUZ28WcGm4uYWqtTKkUJDehVf83cvmy378c6CmWwb5IDXbc+7Aan1RcYx3TJKFZjmGkdXraLXrijm0ttXHNVWyEAAAAABt324ddloZPZy+FGzut5rBy0he1fWzeROoz1hX7/AKnVgl9CjQpAihYbPBN/CahLRcSHNFl1MS9n9YRISJ2GJAYWBAwTERcBAxYEAhQVFwEDFgQKFBUXAQMWBAYOEBcBAxYGCRcMAgoGAQcWDwQNAwYBDAsIBQcJDxIAGAkR+PwcVAIAAAA=",
        {
            "encoding": "base64",
            "skipPreflight": true,
            "preflightCommitment": "processed"
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
    "result": "5WUPdF1zGiCbMX4dAGRrVJBvZuRjQatzsDJf8rcmLH8q67m8AoupcFsVNSo1CsPhLat4B3C2yZAtGp34yVgmcKNk"
}
```
