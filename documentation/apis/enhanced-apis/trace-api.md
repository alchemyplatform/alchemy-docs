---
description: >-
  Alchemy provides access to Parity's trace module, which allows for deeper
  insight into transaction processing.
---

# Trace API

Parity Tracing API methods give Alchemy users access to the most detailed information about on-chain activity. For more information about use, see the [Parity/Open Ethereum Trace API Documentation](https://openethereum.github.io/JSONRPC-trace-module). 

{% hint style="warning" %}
**NOTE:** Alchemy is the only service that provides access to these Trace API methods due to their high maintenance costs and specialized infrastructure. For this reason, they are currently only available to Alchemy users in Growth and Enterprise tiers. You can upgrade your plan [here](https://dashboard.alchemyapi.io/settings/billing) to access them. 
{% endhint %}

These API methods allow you to get a full _externality_ trace on any transaction executed throughout the Ethereum chain. Unlike the log filtering API, you are able to search and filter based only upon address information. Information returned includes the execution of all `CREATE,` `SUICIDE` and all variants of `CALL` together with input data, output data, gas usage, amount transferred and the success status of each individual action.

{% hint style="info" %}
**NOTE:** The Trace API is only supported on **Mainnet, Ropsten,** and **Kovan.** 
{% endhint %}

## Types of Traces 

### Transaction Trace \(`trace`\)

Basic trace of your transaction. 

### Virtual Machine Execution Trace \(`vmTrace`\)

Provides a full trace of the VM’s state throughout the execution of the transaction, including for any subcalls.

### State Difference \(`stateDiff`\)

Provides information detailing all altered portions of the Ethereum state made due to the execution of the transaction.

## trace\_call

Executes the given call and returns a number of possible traces for it.

#### **Parameters**

1. `Object` - Call options, same as [`eth_call`](../ethereum/#eth_call).
   * `from`: `Address` - \(optional\) 20 Bytes - The address the transaction is send from.
   * `to`: `Address` - \(optional when creating new contract\) 20 Bytes - The address the transaction is directed to.
   * `gas`: `Quantity` - \(optional\) Integer formatted as a hex string of the gas provided for the transaction execution. eth\_call consumes zero gas, but this parameter may be needed by some executions.
   * `gasPrice`: `Quantity` - \(optional\) Integer formatted as a hex string of the gas price used for each paid gas.
   * `value`: `Quantity` - \(optional\) Integer formatted as a hex string of the value sent with this transaction.
   * `data`: `Data` - \(optional\) 4 byte hash of the method signature followed by encoded parameters. For details see [Ethereum Contract ABI](https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI).
2. `Array` - Type of trace, one or more of: `"vmTrace"`, `"trace"`, `"stateDiff"`.
3. `Quantity` or `Tag` - \(optional\) Integer of a block number, or the string `'earliest'` or `'latest'`.

#### **Returns**

* `Array` - Block traces

#### \*\*\*\*[**Example**](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22trace_call%22%2C%22paramValues%22%3A%5B%7B%22to%22%3A%220x1E0447b19BB6EcFdAe1e4AE1694b0C3659614e4e%22%2C%22from%22%3A%220x6f1FB6EFDf50F34bFA3F2bC0E5576EdD71631638%22%2C%22value%22%3A%220x0%22%2C%22data%22%3A%220xa67a6a45000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000%22%7D%2C%5B%22trace%22%5D%2C%22%22%5D%7D)\*\*\*\*

Request

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

Response

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

## trace\_callMany

Performs multiple call traces on top of the same block. i.e. transaction `n` will be executed on top of a pending block with all `n-1` transactions applied \(traced\) first. Allows to trace dependent transactions.

#### **Parameters**

1. `Array` - List of trace calls with the type of trace, one or more of: `"vmTrace"`, `"trace"`, `"stateDiff"`.
2. `Quantity` or `Tag` - \(optional\) integer block number, or the string `'latest'`, `'earliest'` or `'pending'`, see the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).

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

#### **Returns**

* `Array` - Array of the given transactions’ traces

#### **Example**

Request

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

Response 

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

## trace\_rawTransaction

Traces a call to `eth_sendRawTransaction` without making the call, returning the traces

#### **Parameters**

1. `Data` - Raw transaction data.
2. `Array` - Type of trace, one or more of: `"vmTrace"`, `"trace"`, `"stateDiff"`.

```bash
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
  ["trace"]
]
```

**Returns**

* `Object` - Block traces.

**Example**

Request

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

Response

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

## trace\_replayBlockTransactions

Replays all transactions in a block returning the requested traces for each transaction.

**Parameters**

1. `Quantity` or `Tag` - Integer of a block number, or the string `'earliest'`, `'latest'` or `'pending'`.
2. `Array` - Type of trace, one or more of: `"vmTrace"`, `"trace"`, `"stateDiff"`.

```bash
params: [
  "0x2ed119",
  ["trace"]
]
```

**Returns**

* `Array` - Block transactions traces.

\*\*\*\*[**Example**](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22trace_replayBlockTransactions%22%2C%22paramValues%22%3A%5B%220x2ed119%22%2C%5B%22trace%22%5D%5D%7D)\*\*\*\*

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"method":"trace_replayBlockTransactions","params":["0x2ed119",["trace"]],"id":1,"jsonrpc":"2.0"}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"trace_replayBlockTransactions",
    "params":["0x2ed119",["trace"]],
    "id":1
}
```
{% endtab %}
{% endtabs %}

Response

```java
{
  "jsonrpc": "2.0",
  "result": [
    {
      "output": "0x",
      "stateDiff": null,
      "trace": [
        {
          "action": {
            "callType": "call",
            "from": "0xaa7b131dc60b80d3cf5e59b5a21a666aa039c951",
            "gas": "0x0",
            "input": "0x",
            "to": "0xd40aba8166a212d6892125f079c33e6f5ca19814",
            "value": "0x4768d7effc3fbe"
          },
          "result": {
            "gasUsed": "0x0",
            "output": "0x"
          },
          "subtraces": 0,
          "traceAddress": [],
          "type": "call"
        }
      ],
      "transactionHash": "0x07da28d752aba3b9dd7060005e554719c6205c8a3aea358599fc9b245c52f1f6",
      "vmTrace": null
    },
    {
      "output": "0x",
      "stateDiff": null,
      "trace": [
        {
          "action": {
            "callType": "call",
            "from": "0x4f11ba23bb526c0486d83c6a8f18f632f3fc172a",
            "gas": "0x0",
            "input": "0x",
            "to": "0x7ed1e469fcb3ee19c0366d829e291451be638e59",
            "value": "0x446cde325fbfbe"
          },
          "result": {
            "gasUsed": "0x0",
            "output": "0x"
          },
          "subtraces": 0,
          "traceAddress": [],
          "type": "call"
        }
      ],
      "transactionHash": "0x056f11efb5da4ff7cf8523cfcef08393e5dd2ff3ab3223e4324426d285d7ae92",
      "vmTrace": null
    },
    {
      ...
    }
  ],
  "id": 0
}
```

## trace\_replayTransaction

Replays a transaction, returning the traces.

**Parameters**

1. `Hash` - Transaction hash.
2. `Array` - Type of trace, one or more of: `"vmTrace"`, `"trace"`, `"stateDiff"`.

```bash
params: [
  "0x02d4a872e096445e80d05276ee756cefef7f3b376bcec14246469c0cd97dad8f",
  ["trace"]
]
```

**Returns**

* `Object` - Block traces.

\*\*\*\*[**Example**](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22trace_replayTransaction%22%2C%22paramValues%22%3A%5B%220x02d4a872e096445e80d05276ee756cefef7f3b376bcec14246469c0cd97dad8f%22%2C%5B%22trace%22%5D%5D%7D)\*\*\*\*

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"method":"trace_replayTransaction","params":["0x02d4a872e096445e80d05276ee756cefef7f3b376bcec14246469c0cd97dad8f",["trace"]],"id":1,"jsonrpc":"2.0"}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"trace_replayTransaction",
    "params":["0x02d4a872e096445e80d05276ee756cefef7f3b376bcec14246469c0cd97dad8f",["trace"]],
    "id":1
}
```
{% endtab %}
{% endtabs %}

Response

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
          "from": "0x00a63d34051602b2cb268ea344d4b8bc4767f2d4",
          "gas": "0x0",
          "input": "0x",
          "to": "0x87cc0d78ee64a9f11b5affdd9ea523872eae14e4",
          "value": "0x810e988a393f2000"
        },
        "result": {
          "gasUsed": "0x0",
          "output": "0x"
        },
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

## trace\_block

Returns traces created at given block.

**Parameters**

1. `Quantity` or `Tag` - Integer of a block number, or the string `'earliest'`, `'latest'` or `'pending'`.

```bash
params: [
  "0x2ed119" // 3068185
]
```

**Returns**

* `Array` - Block traces.

**Example**

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"method":"trace_block","params":["0x2ed119"],"id":1,"jsonrpc":"2.0"}' 
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"trace_block",
    "params":["0x2ed119"],
    "id":1
}
```
{% endtab %}
{% endtabs %}

Response

```javascript
{
  "jsonrpc": "2.0",
  "result": [
    {
      "action": {
        "callType": "call",
        "from": "0xaa7b131dc60b80d3cf5e59b5a21a666aa039c951",
        "gas": "0x0",
        "input": "0x",
        "to": "0xd40aba8166a212d6892125f079c33e6f5ca19814",
        "value": "0x4768d7effc3fbe"
      },
      "blockHash": "0x7eb25504e4c202cf3d62fd585d3e238f592c780cca82dacb2ed3cb5b38883add",
      "blockNumber": 3068185,
      "result": {
        "gasUsed": "0x0",
        "output": "0x"
      },
      "subtraces": 0,
      "traceAddress": [],
      "transactionHash": "0x07da28d752aba3b9dd7060005e554719c6205c8a3aea358599fc9b245c52f1f6",
      "transactionPosition": 0,
      "type": "call"
    },
    {
      "action": {
        "callType": "call",
        "from": "0x4f11ba23bb526c0486d83c6a8f18f632f3fc172a",
        "gas": "0x0",
        "input": "0x",
        "to": "0x7ed1e469fcb3ee19c0366d829e291451be638e59",
        "value": "0x446cde325fbfbe"
      },
      "blockHash": "0x7eb25504e4c202cf3d62fd585d3e238f592c780cca82dacb2ed3cb5b38883add",
      "blockNumber": 3068185,
      "result": {
        "gasUsed": "0x0",
        "output": "0x"
      },
      "subtraces": 0,
      "traceAddress": [],
      "transactionHash": "0x056f11efb5da4ff7cf8523cfcef08393e5dd2ff3ab3223e4324426d285d7ae92",
      "transactionPosition": 1,
      "type": "call"
    },
    {
     ...
    }
  ],
  "id": 0
}
```

## trace\_filter

Returns traces matching given filter.

**Parameters**

1. `Object` - The filter object
   * `fromBlock`: `Quantity` or `Tag` - \(optional\) From this block.
   * `toBlock`: `Quantity` or `Tag` - \(optional\) To this block.
   * `fromAddress`: `Array` - \(optional\) Sent from these addresses.
   * `toAddress`: `Address` - \(optional\) Sent to these addresses.
   * `after`: `Quantity` - \(optional\) The offset trace number
   * `count`: `Quantity` - \(optional\) Integer number of traces to display in a batch.

```javascript
params: [{
  "fromBlock": "0xc26f54",
  "toBlock": "0xc26f54", 
}]
```

**Returns**

* `Array` - Traces matching given filter

**Example**

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"method":"trace_filter","params":[{"fromBlock":"0xc26f54","toBlock":"0xc26f54"}],"id":1,"jsonrpc":"2.0"}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"trace_filter",
    "params":[{"fromBlock":"0xc26f54","toBlock":"0xc26f54"}],
    "id":1
}
```
{% endtab %}
{% endtabs %}

Response

```javascript
{
    "jsonrpc": "2.0", 
    "result": 
        [{"action": {
            "callType": "call", 
            "from": "0x15dce17509846b420b1f5c158fe3d7518204abb6",
            "gas": "0xed2a4", 
            "input": "0x00000000000000000000000000abc3136b63363200000000000000000000000000708a100000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000001f0000000016128acb08000000cb0c5d9d92f4f2f80cce7aa271a1e148c226e19d00000000000000000000000000000000000000000000000000000000000000000000000000000000000000008ae720a71622e824f576b4a8c03031066548a3b1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000075cf0c1848f9db946ab000000000000000000000000fffd8963efd1fc6a506488495d951d5263988d2500000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000e000000000c128acb0800000060594a405d53811d3bc4766596efd80fd545a2700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000cb0c5d9d92f4f2f80cce7aa271a1e148c226e19d0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e41dbb290f7bc000000000000000000000000000fffd8963efd1fc6a506488495d951d5263988d2500000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000040000000002a9059cbb000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060594a405d53811d3bc4766596efd80fd545a270000000000000000000000000000000000000000000000000e41dbb290f7bc0000000000005022c0d9f0000008ae720a71622e824f576b4a8c03031066548a3b100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e4f726c005981e87000000000000000000000000000000000000abe945c436595ce765a8a261317b00000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000", 
            "to": "0x000000000000abe945c436595ce765a8a261317b", 
            "value": "0x0"
            }, 
        "blockHash": "0xe0583a364c20fa67748ca92e276df63919c67e12fdc9bdbc17deae8cf730cf35", 
        "blockNumber": 12742484, 
        "result": {
            "gasUsed": "0x4551d", 
            "output": "0x00000000000000000000000000000000000000000000000000d96b96f61c5e87"}, 
            "subtraces": 12, 
            "traceAddress": [], 
            "transactionHash": "0x87951d0547018db2c4817282a53e2015d91934b42d1b8d8bba1bef7cb480f263", 
            "transactionPosition": 0, 
            "type": "call"},
...
}
```

## trace\_get

Returns trace at given position.

**Parameters**

1. `Hash` - Transaction hash.
2. `Array` - Index positions of the traces.

```bash
params: [
  "0x17104ac9d3312d8c136b7f44d4b8b47852618065ebfa534bd2d3b5ef218ca1f3",
  ["0x0"]
]
```

**Returns**

* `Object` - Trace object

**Example**

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"method":"trace_get","params":["0x17104ac9d3312d8c136b7f44d4b8b47852618065ebfa534bd2d3b5ef218ca1f3",["0x0"]],"id":1,"jsonrpc":"2.0"}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"trace_get",
    "params":["0x17104ac9d3312d8c136b7f44d4b8b47852618065ebfa534bd2d3b5ef218ca1f3",["0x0"]],
    "id":1
}
```
{% endtab %}
{% endtabs %}

Response

```javascript
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "action": {
      "callType": "call",
      "from": "0x1c39ba39e4735cb65978d4db400ddd70a72dc750",
      "gas": "0x13e99",
      "input": "0x16c72721",
      "to": "0x2bd2326c993dfaef84f696526064ff22eba5b362",
      "value": "0x0"
    },
    "blockHash": "0x7eb25504e4c202cf3d62fd585d3e238f592c780cca82dacb2ed3cb5b38883add",
    "blockNumber": 3068185,
    "result": {
      "gasUsed": "0x183",
      "output": "0x0000000000000000000000000000000000000000000000000000000000000001"
    },
    "subtraces": 0,
    "traceAddress": [
      0
    ],
    "transactionHash": "0x17104ac9d3312d8c136b7f44d4b8b47852618065ebfa534bd2d3b5ef218ca1f3",
    "transactionPosition": 2,
    "type": "call"
  }
}
```

## trace\_transaction 

Returns all traces of given transaction.

#### **Parameters**

1. `Hash` - Transaction hash

```bash
params: ["0x17104ac9d3312d8c136b7f44d4b8b47852618065ebfa534bd2d3b5ef218ca1f3"]
```

#### **Returns**

* `Array` - Traces of given transaction

#### \*\*\*\*[**Example**](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22trace_transaction%22%2C%22paramValues%22%3A%5B%220x17104ac9d3312d8c136b7f44d4b8b47852618065ebfa534bd2d3b5ef218ca1f3%22%5D%7D)\*\*\*\*

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"method":"trace_transaction","params":["0x17104ac9d3312d8c136b7f44d4b8b47852618065ebfa534bd2d3b5ef218ca1f3"],"id":1,"jsonrpc":"2.0"}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"trace_transaction",
    "params":["0x17104ac9d3312d8c136b7f44d4b8b47852618065ebfa534bd2d3b5ef218ca1f3"],
    "id":1
}
```
{% endtab %}
{% endtabs %}

Response

```javascript
{
  "jsonrpc": "2.0",
  "result": [
    {
      "action": {
        "callType": "call",
        "from": "0x83806d539d4ea1c140489a06660319c9a303f874",
        "gas": "0x1a1f8",
        "input": "0x",
        "to": "0x1c39ba39e4735cb65978d4db400ddd70a72dc750",
        "value": "0x7a16c911b4d00000"
      },
      "blockHash": "0x7eb25504e4c202cf3d62fd585d3e238f592c780cca82dacb2ed3cb5b38883add",
      "blockNumber": 3068185,
      "result": {
        "gasUsed": "0x2982",
        "output": "0x"
      },
      "subtraces": 2,
      "traceAddress": [],
      "transactionHash": "0x17104ac9d3312d8c136b7f44d4b8b47852618065ebfa534bd2d3b5ef218ca1f3",
      "transactionPosition": 2,
      "type": "call"
    },
    {
      "action": {
        "callType": "call",
        "from": "0x1c39ba39e4735cb65978d4db400ddd70a72dc750",
        "gas": "0x13e99",
        "input": "0x16c72721",
        "to": "0x2bd2326c993dfaef84f696526064ff22eba5b362",
        "value": "0x0"
      },
      "blockHash": "0x7eb25504e4c202cf3d62fd585d3e238f592c780cca82dacb2ed3cb5b38883add",
      "blockNumber": 3068185,
      "result": {
        "gasUsed": "0x183",
        "output": "0x0000000000000000000000000000000000000000000000000000000000000001"
      },
      "subtraces": 0,
      "traceAddress": [
        0
      ],
      "transactionHash": "0x17104ac9d3312d8c136b7f44d4b8b47852618065ebfa534bd2d3b5ef218ca1f3",
      "transactionPosition": 2,
      "type": "call"
    },
    {
      "action": {
        "callType": "call",
        "from": "0x1c39ba39e4735cb65978d4db400ddd70a72dc750",
        "gas": "0x8fc",
        "input": "0x",
        "to": "0x70faa28a6b8d6829a4b1e649d26ec9a2a39ba413",
        "value": "0x7a16c911b4d00000"
      },
      "blockHash": "0x7eb25504e4c202cf3d62fd585d3e238f592c780cca82dacb2ed3cb5b38883add",
      "blockNumber": 3068185,
      "result": {
        "gasUsed": "0x0",
        "output": "0x"
      },
      "subtraces": 0,
      "traceAddress": [
        1
      ],
      "transactionHash": "0x17104ac9d3312d8c136b7f44d4b8b47852618065ebfa534bd2d3b5ef218ca1f3",
      "transactionPosition": 2,
      "type": "call"
    }
  ],
  "id": 0
}
```

