---
description: Executes the given call and returns a number of possible traces for it.
---

# trace\_call

## **Parameters**

1. `Object` - Call options, same as [`eth_call`](../../apis/ethereum/#eth\_call).
   * `from`: `Address` - (optional) 20 Bytes - The address the transaction is send from.
   * `to`: `Address` - (optional when creating new contract) 20 Bytes - The address the transaction is directed to.
   * `gas`: `Quantity` - (optional) Integer formatted as a hex string of the gas provided for the transaction execution. eth\_call consumes zero gas, but this parameter may be needed by some executions.
   * `gasPrice`: `Quantity` - (optional) Integer formatted as a hex string of the gas price used for each paid gas.
   * `value`: `Quantity` - (optional) Integer formatted as a hex string of the value sent with this transaction.
   * `data`: `Data` - (optional) 4 byte hash of the method signature followed by encoded parameters. For details see [Ethereum Contract ABI](https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI).
2. `Array` - Type of trace, one or more of: `"vmTrace"`, `"trace"`, `"stateDiff"`.
3. `Quantity` or `Tag` - (optional) Integer of a block number, or the string `'earliest'` or `'latest'`.

## **Returns**

* `Array` - Block traces

## [**Example**](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22trace\_call%22%2C%22paramValues%22%3A%5B%7B%22to%22%3A%220x1E0447b19BB6EcFdAe1e4AE1694b0C3659614e4e%22%2C%22from%22%3A%220x6f1FB6EFDf50F34bFA3F2bC0E5576EdD71631638%22%2C%22value%22%3A%220x0%22%2C%22data%22%3A%220xa67a6a45000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000%22%7D%2C%5B%22trace%22%5D%2C%22%22%5D%7D)

### Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"method":"trace_call",
    "params":[{
      "from": "0x6f1FB6EFDf50F34bFA3F2bC0E5576EdD71631638",
      "to": "0x1E0447b19BB6EcFdAe1e4AE1694b0C3659614e4e",
      "value": "0x0",
      "data": "0xa67a6a45000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000"},
      ["trace"]],
    "id":1,
    "jsonrpc":"2.0"}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"trace_call",
    "params":[{
        "from": "0x6f1FB6EFDf50F34bFA3F2bC0E5576EdD71631638",
        "to": "0x1E0447b19BB6EcFdAe1e4AE1694b0C3659614e4e",
        "value": "0x0",
        "data": "0xa67a6a45000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000"},    
    },["trace"]],
    "id":1
}
```
{% endtab %}
{% endtabs %}

### Response

```java
{
  "jsonrpc": "2.0",
  "result": {
    "output": "0x",
    "stateDiff": null,
    "trace": [
      {
        "action": {
          "callType": "call",
          "from": "0x6f1fb6efdf50f34bfa3f2bc0e5576edd71631638",
          "gas": "0x1dcd11f8",
          "input": "0xa67a6a45000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000",
          "to": "0x1e0447b19bb6ecfdae1e4ae1694b0c3659614e4e",
          "value": "0x0"
        },
        "error": "Reverted",
        "subtraces": 0,
        "traceAddress": [],
        "type": "call"
      }
    ],
    "vmTrace": null
  },
  "id": 0
}
```

##
