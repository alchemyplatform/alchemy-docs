---
description: >-
  Subscribe to a transaction signature to receive notification when the
  transaction is confirmed on signatureNotification, the subscription is
  automatically cancelled
---

# signatureSubscribe

## **Parameters**

* `<string>` - Transaction Signature, as base-58 encoded string
* `<object>` - (optional) Commitment, configures the commitment level of the blocks queried\
  Accepts one of the following strings: \[`"finalized"`, `"confirmed"`, `"processed"]` \
  For more info, refer to this [doc](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment).

## **Results**

* `integer` - subscription id (needed to unsubscribe)

**Notification Format**

The notification will be an RpcResponse JSON object with value containing an object with:

* `err: <object | null>` - Error if transaction failed, null if transaction succeeded. [TransactionError definitions](https://github.com/solana-labs/solana/blob/c0c60386544ec9a9ec7119229f37386d9f070523/sdk/src/transaction/error.rs#L13)

## **Example**

### Request

{% tabs %}
{% tab title="Default" %}
```shell
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "signatureSubscribe",
  "params": [
    "2EBVM6cB8vAAD93Ktr6Vd8p67XPbQzCJX47MpReuiCXJAtcjaxpvWpcg9Ege1Nr5Tk3a2GFrByT7WPBjdsTycY9b"
  ]
}
```
{% endtab %}

{% tab title="With Commitment" %}
```shell
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "signatureSubscribe",
  "params": [
    "2EBVM6cB8vAAD93Ktr6Vd8p67XPbQzCJX47MpReuiCXJAtcjaxpvWpcg9Ege1Nr5Tk3a2GFrByT7WPBjdsTycY9b",
    {
      "commitment": "finalized"
    }
  ]
}
```
{% endtab %}
{% endtabs %}

### Result

```javascript
{ "jsonrpc": "2.0", "result": 0, "id": 1 }

// notification 
{
  "jsonrpc": "2.0",
  "method": "signatureNotification",
  "params": {
    "result": {
      "context": {
        "slot": 5207624
      },
      "value": {
        "err": null
      }
    },
    "subscription": 24006
  }
}
```
