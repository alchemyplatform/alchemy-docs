---
description: >-
  Traces a call to eth_sendRawTransaction without making the call, returning the
  traces
---

# trace\_rawTransaction

## **Parameters**

1. `Data` - Raw transaction data.
2. `Array` - Type of trace, one or more of: `"vmTrace"`, `"trace"`, `"stateDiff"`.

```bash
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
  ["trace"]
]
```

****

## **Returns**

* `Object` - Block traces.

## **Example**

### Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"method":"trace_rawTransaction","params":["0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",["trace"]],"id":1,"jsonrpc":"2.0"}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"trace_rawTransaction",
    "params":["0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",["trace"]],
    "id":1
}
```
{% endtab %}
{% endtabs %}

### Response

```java
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "output": "0x",
    "stateDiff": null,
    "trace": [{
      "action": { ... },
      "result": {
        "gasUsed": "0x0",
        "output": "0x"
      },
      "subtraces": 0,
      "traceAddress": [],
      "type": "call"
    }],
    "vmTrace": null
  }
}
```

##
