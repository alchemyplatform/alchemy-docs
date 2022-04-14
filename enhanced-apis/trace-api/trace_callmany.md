---
description: >-
  Performs multiple call traces on top of the same block. Allows tracing of
  dependent transactions.
---

# trace\_callMany

trace\_callMany performs multiple call traces on top of the same block. i.e. transaction`n`will be executed on top of a pending block with all `n-1` transactions applied (traced) first. Allows tracing of dependent transactions.

## **Parameters**

1. `Array` - List of trace calls with the type of trace, one or more of: `"vmTrace"`, `"trace"`, `"stateDiff"`.
2. `Quantity` or `Tag` - (optional) integer block number, or the string `'latest'`, `'earliest'` or `'pending'`, see the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).

```bash
params: [
  [
    [
      {
        "from": "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
        "to": "0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b",
        "value": "0x186a0"
      },
      ["trace"]
    ],
    [
      {
        "from": "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
        "to": "0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b",
        "value": "0x186a0"
      },
      ["trace"]
    ]
  ],
  "latest"
]
```

## **Returns**

* `Array` - Array of the given transactions’ traces

## **Example**

### Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"method":"trace_callMany","params":[[[{"from":"0x407d73d8a49eeb85d32cf465507dd71d507100c1","to":"0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b","value":"0x186a0"},["trace"]],[{"from":"0x407d73d8a49eeb85d32cf465507dd71d507100c1","to":"0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b","value":"0x186a0"},["trace"]]],"latest"],"id":1,"jsonrpc":"2.0"}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"trace_callMany",
    "params":[[[{"from":"0x407d73d8a49eeb85d32cf465507dd71d507100c1","to":"0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b","value":"0x186a0"},["trace"]],[{"from":"0x407d73d8a49eeb85d32cf465507dd71d507100c1","to":"0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b","value":"0x186a0"},["trace"]]],"latest"],
    "id":1
}
```
{% endtab %}
{% endtabs %}

### Response

```javascript
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": [
    {
      "output": "0x",
      "stateDiff": null,
      "trace": [{
        "action": {
          "callType": "call",
          "from": "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
          "gas": "0x1dcd12f8",
          "input": "0x",
          "to": "0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b",
          "value": "0x186a0"
        },
        "result": {
          "gasUsed": "0x0",
          "output": "0x"
        },
        "subtraces": 0,
        "traceAddress": [],
        "type": "call"
      }],
      "vmTrace": null
    },
    {
      "output": "0x",
      "stateDiff": null,
      "trace": [{
        "action": {
          "callType": "call",
          "from": "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
          "gas": "0x1dcd12f8",
          "input": "0x",
          "to": "0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b",
          "value": "0x186a0"
        },
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
  ]
}
```

##
