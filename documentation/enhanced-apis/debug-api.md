---
description: >-
  In the same vein as Parity's trace module, Alchemy currently exposes
  debug_traceTransaction for debugging on networks running on Geth.
---

# Debug API

{% hint style="warning" %}
**Note: **Alchemy is the only service that provides access to this Debug API method due to its high maintenance costs and specialized infrastructure. For this reason, it's currently only available to Alchemy users in Growth and Enterprise tiers. You can upgrade your plan [here](https://dashboard.alchemyapi.io/settings/billing) to access it. 
{% endhint %}

## debug_traceTransaction

{% hint style="danger" %}
Our current debug_traceTransaction method only works on the following networks:

* Ethereum Rinkeby
* Polygon Mainnet
{% endhint %}

The `traceTransaction` debugging method will attempt to run the transaction in the exact same manner as it was executed on the network. It will replay any transaction that may have been executed prior to this one before it will finally attempt to execute the transaction that corresponds to the given hash.

### Parameters 

In addition to the hash of the transaction you may give it a secondary _optional_ argument, which specifies the options for this specific call. The possible options are:

* `disableStorage`: `BOOL`. Setting this to true will disable storage capture (default = false).
* `disableMemory`: `BOOL`. Setting this to true will disable memory capture (default = false).
* `disableStack`: `BOOL`. Setting this to true will disable stack capture (default = false).
* `tracer`: `STRING`. Setting this will enable JavaScript-based transaction tracing, described below. If set, the previous four arguments will be ignored.
* `timeout`: `STRING`. Overrides the default timeout of 5 seconds for JavaScript-based tracing calls. Valid values are described [here](https://golang.org/pkg/time/#ParseDuration).

| Client  | Method Invocation                                                                            |
| ------- | -------------------------------------------------------------------------------------------- |
| Go      | `debug.TraceTransaction(txHash common.Hash, logger *vm.LogConfig) (*ExecutionResurt, error)` |
| Console | `debug.traceTransaction(txHash, [options])`                                                  |
| RPC     | `{"method": "debug_traceTransaction", "params": [txHash, {}]}`                               |

### **Example**

Request

```javascript
debug.traceTransaction("0x2059dd53ecac9827faad14d364f9e04b1d5fe5b506e3acc886eff7a6f88a696a")
```

Result

```javascript
{
  gas: 85301,
  returnValue: "",
  structLogs: [{
      depth: 1,
      error: "",
      gas: 162106,
      gasCost: 3,
      memory: null,
      op: "PUSH1",
      pc: 0,
      stack: [],
      storage: {}
  },
    /* snip */
  {
      depth: 1,
      error: "",
      gas: 100000,
      gasCost: 0,
      memory: ["0000000000000000000000000000000000000000000000000000000000000006", "0000000000000000000000000000000000000000000000000000000000000000", "0000000000000000000000000000000000000000000000000000000000000060"],
      op: "STOP",
      pc: 120,
      stack: ["00000000000000000000000000000000000000000000000000000000d67cbec9"],
      storage: {
        0000000000000000000000000000000000000000000000000000000000000004: "8241fa522772837f0d05511f20caa6da1d5a3209000000000000000400000001",
        0000000000000000000000000000000000000000000000000000000000000006: "0000000000000000000000000000000000000000000000000000000000000001",
        f652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d3f: "00000000000000000000000002e816afc1b5c0f39852131959d946eb3b07b5ad"
      }
  }]
```

### **JavaScript-based tracing**

Specifying the `tracer` option in the second argument enables JavaScript-based tracing. In this mode, `tracer` is interpreted as a JavaScript expression that is expected to evaluate to an object with (at least) two methods, named `step` and `result`.

`step`is a function that takes two arguments, log and db, and is called for each step of the EVM, or when an error occurs, as the specified transaction is traced.

`log` has the following fields:

* `pc`: Number, the current program counter
* `op`: Object, an OpCode object representing the current opcode
* `gas`: Number, the amount of gas remaining
* `gasPrice`: Number, the cost in wei of each unit of gas
* `memory`: Object, a structure representing the contract's memory space
* `stack`: array\[big.Int], the EVM execution stack
* `depth`: The execution depth
* `account`: The address of the account executing the current operation
* `err`: If an error occurred, information about the error

If `err` is non-null, all other fields should be ignored.

For efficiency, the same `log` object is reused on each execution step, updated with current values; make sure to copy values you want to preserve beyond the current call. For instance, this step function will **not work**:

```javascript
function(log) {
  this.logs.append(log);
}
```

But this step function **will work**:

```javascript
function(log) {
  this.logs.append({gas: log.gas, pc: log.pc, ...});
}
```

`log.op` has the following methods:

* `isPush()` - returns true iff the opcode is a PUSHn
* `toString()` - returns the string representation of the opcode
* `toNumber()` - returns the opcode's number

`log.memory` has the following methods:

* `slice(start, stop)` - returns the specified segment of memory as a byte slice
* `length()` - returns the length of the memory

`log.stack` has the following methods:

* `peek(idx)` - returns the idx-th element from the top of the stack (0 is the topmost element) as a big.Int
* `length()` - returns the number of elements in the stack

`db` has the following methods:

* `getBalance(address)` - returns a `big.Int` with the specified account's balance
* `getNonce(address)` - returns a Number with the specified account's nonce
* `getCode(address)` - returns a byte slice with the code for the specified account
* `getState(address, hash)` - returns the state value for the specified account and the specified hash
* `exists(address)` - returns true if the specified address exists

The second function, 'result', takes no arguments, and is expected to return a JSON-serializable value to return to the RPC caller.

If the step function throws an exception or executes an illegal operation at any point, it will not be called on any further VM steps, and the error will be returned to the caller.

Note that several values are Golang big.Int objects, not JavaScript numbers or JS bigints. As such, they have the same interface as described in the godocs. Their default serialization to JSON is as a Javascript number; to serialize large numbers accurately call `.String()` on them. For convenience, `big.NewInt(x)` is provided, and will convert a uint to a Go BigInt.

Usage example, returns the top element of the stack at each CALL opcode only:

```javascript
debug.traceTransaction(txhash, {tracer: '{data: [], step: function(log) { if(log.op.toString() == "CALL") this.data.push(log.stack.peek(0)); }, result: function() { return this.data; }}'});
```
