---
description: >-
  Arbitrum API - Creates a new message call transaction or a contract creation
  for signed transactions.
---

# eth\_sendRawTransaction

## Parameters

`DATA`, The signed transaction data.

```javascript
params: ["0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"]
```

## Returns

`DATA`, 32 Bytes - the transaction hash, or the zero hash if the transaction is not yet available.

Use [`eth_getTransactionReceipt`](../ethereum/#eth\_gettransactionreceipt) to get the contract address after the transaction was mined when you created a contract.

## Example

### [Alchemy Composer](https://composer.alchemyapi.io/?composer\_state=%7B%22chain%22%3A1%2C%22network%22%3A201%2C%22methodName%22%3A%22eth\_sendRawTransaction%22%2C%22paramValues%22%3A%5B%220x0%22%5D%7D)

The Alchemy Composer allows you to make a no-code example request via your browser. Try it out above!

### Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://arb-mainnet.g.alchemy.com/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":["0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"],"id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://arb-mainnet.g.alchemy.com/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_sendRawTransaction",
    "params":["0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"],
    "id":1
}'
```
{% endtab %}
{% endtabs %}

### Result

```javascript
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```
