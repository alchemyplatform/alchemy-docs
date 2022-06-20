---
description: >-
  Alchemy provides access to an entire suite of Trace API endpoints, which give
  you deeper insights into transaction processing.
---

# Trace API

Trace API methods give Alchemy users access to the most detailed information about on-chain activity. For more information about use, see the [Parity/Open Ethereum Trace API Documentation](https://openethereum.github.io/JSONRPC-trace-module).

{% hint style="warning" %}
**NOTE:** Alchemy is the only service that provides access to these Trace API methods due to their high maintenance costs and specialized infrastructure. For this reason, they are currently only available to Alchemy users in Growth and Enterprise tiers. You can upgrade your plan on the [billing page](https://dashboard.alchemyapi.io/settings/billing) to access them.
{% endhint %}

These API methods allow you to get a full _externality_ trace on any transaction executed throughout the Ethereum chain. Unlike the log filtering API, you are able to search and filter based only upon address information. Information returned includes the execution of all `CREATE,` `SUICIDE` and all variants of `CALL` together with input data, output data, gas usage, amount transferred and the success status of each individual action.

{% hint style="info" %}
**NOTE:** The Trace API is only supported on **Mainnet, Ropsten, Goerli**, **and Kovan.**&#x20;
{% endhint %}

## Types of Traces

### Transaction Trace (`trace`)

Basic trace of your transaction. See [types of trace actions](./#opcodes-trace-actions) for more details.&#x20;

### Virtual Machine Execution Trace (`vmTrace`)

Provides a full trace of the VM’s state throughout the execution of the transaction, including for any subcalls.

### State Difference (`stateDiff`)

Provides information detailing all altered portions of the Ethereum state made due to the execution of the transaction.

## Types of Trace Actions

There are several types of actions captured in Transaction Traces: `CREATE,` `SUICIDE` , variants of `CALL`, and `REWARD`. Below you will find the response payload for the first three.

### `CREATE`

Used to create a smart contract.

{% tabs %}
{% tab title="Response" %}
* `action`
  * `from`: address that created the contract
  * `gas`: gas cost to create contract&#x20;
  * `init`: initialization code for creating the contract
  * `value`: value sent to contract&#x20;
* `blockHash`: block hash the transaction was included in
* `blockNumber`: block number the transaction was included in
* `result`
  * `address`: address for contract created&#x20;
  * `code`: code for contract created
  * `gasUsed`: gas used in contract creation&#x20;
* `subtraces`: number of child traces of this transaction&#x20;
* `traceAddress`: index for a given trace in trace tree
* `transactionHash`: hash for the transaction
* `transactionPosition`: position (or index) of transaction in the block
* `type`: type of OPCODE, in this case, `CREATE`&#x20;
{% endtab %}

{% tab title="Example" %}
```
{
    "action": {
      "from": "0x6090a6e47849629b7245dfa1ca21d94cd15878ef",
      "gas": "0x6a7f1",
      "init": "0x606060405260405160208061051683398101604052515b60028054600160a060020a03808416600160a060020a0319928316179092556000805433909316929091169190911790554260019081556005805460ff19169091179055346004555b505b6104a6806100706000396000f300606060405236156100885763ffffffff60e060020a60003504166305b34410811461008a5780630b5ab3d5146100ac57806313af4035146100be5780632b20e397146100dc5780633fa4f24514610108578063674f220f1461012a5780638da5cb5b14610156578063b0c8097214610182578063bbe427711461019c578063faab9d39146101b1575bfe5b341561009257fe5b61009a6101cf565b60408051918252519081900360200190f35b34156100b457fe5b6100bc6101d5565b005b34156100c657fe5b6100bc600160a060020a036004351661021d565b005b34156100e457fe5b6100ec6102c3565b60408051600160a060020a039092168252519081900360200190f35b341561011057fe5b61009a6102d2565b60408051918252519081900360200190f35b341561013257fe5b6100ec6102d8565b60408051600160a060020a039092168252519081900360200190f35b341561015e57fe5b6100ec6102e7565b60408051600160a060020a039092168252519081900360200190f35b341561018a57fe5b6100bc60043560243515156102f6565b005b34156101a457fe5b6100bc600435610382565b005b34156101b957fe5b6100bc600160a060020a0360043516610431565b005b60015481565b60055460ff16156101e65760006000fd5b600254604051600160a060020a039182169130163180156108fc02916000818181858888f193505050501561021a5761deadff5b5b565b60005433600160a060020a039081169116146102395760006000fd5b600160a060020a038116151561024f5760006000fd5b600280546003805473ffffffffffffffffffffffffffffffffffffffff19908116600160a060020a03808516919091179092559084169116811790915560408051918252517fa2ea9883a321a3e97b8266c2b078bfeec6d50c711ed71f874a90d500ae2eaf369181900360200190a15b5b50565b600054600160a060020a031681565b60045481565b600354600160a060020a031681565b600254600160a060020a031681565b60005433600160a060020a039081169116146103125760006000fd5b60055460ff1615156103245760006000fd5b8160045410156103345760006000fd5b6004829055600254604051600160a060020a039182169130163184900380156108fc02916000818181858888f193505050501580156103705750805b1561037b5760006000fd5b5b5b5b5050565b60005433600160a060020a0390811691161461039e5760006000fd5b60055460ff1615156103b05760006000fd5b6005805460ff1916905561dead6108fc6103e883810330600160a060020a031631025b604051919004801590920291906000818181858888f1935050505015156103fa5760006000fd5b6040517fbb2ce2f51803bba16bc85282b47deeea9a5c6223eabea1077be696b3f265cf1390600090a16102bf6101d5565b5b5b5b50565b60005433600160a060020a0390811691161461044d5760006000fd5b6000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0383161790555b5b505600a165627a7a72305820fbfa6f8a2024760ef0e0eb29a332c9a820526e92f8b4fbcce6f00c7643234b140029000000000000000000000000a7f3659c53820346176f7e0e350780df304db179",
      "value": "0xe4b4b8af6a70000"
    },
    "blockHash": "0x6d00f7707938cca36b0730d8f7f090543242002b6fa0fe94bf85b9ab02e6bed6",
    "blockNumber": 4000036,
    "result": {
      "address": "0xfc9779d9a0f2715435a3e8ebf780322145d7546e",
      "code": "0x606060405236156100885763ffffffff60e060020a60003504166305b34410811461008a5780630b5ab3d5146100ac57806313af4035146100be5780632b20e397146100dc5780633fa4f24514610108578063674f220f1461012a5780638da5cb5b14610156578063b0c8097214610182578063bbe427711461019c578063faab9d39146101b1575bfe5b341561009257fe5b61009a6101cf565b60408051918252519081900360200190f35b34156100b457fe5b6100bc6101d5565b005b34156100c657fe5b6100bc600160a060020a036004351661021d565b005b34156100e457fe5b6100ec6102c3565b60408051600160a060020a039092168252519081900360200190f35b341561011057fe5b61009a6102d2565b60408051918252519081900360200190f35b341561013257fe5b6100ec6102d8565b60408051600160a060020a039092168252519081900360200190f35b341561015e57fe5b6100ec6102e7565b60408051600160a060020a039092168252519081900360200190f35b341561018a57fe5b6100bc60043560243515156102f6565b005b34156101a457fe5b6100bc600435610382565b005b34156101b957fe5b6100bc600160a060020a0360043516610431565b005b60015481565b60055460ff16156101e65760006000fd5b600254604051600160a060020a039182169130163180156108fc02916000818181858888f193505050501561021a5761deadff5b5b565b60005433600160a060020a039081169116146102395760006000fd5b600160a060020a038116151561024f5760006000fd5b600280546003805473ffffffffffffffffffffffffffffffffffffffff19908116600160a060020a03808516919091179092559084169116811790915560408051918252517fa2ea9883a321a3e97b8266c2b078bfeec6d50c711ed71f874a90d500ae2eaf369181900360200190a15b5b50565b600054600160a060020a031681565b60045481565b600354600160a060020a031681565b600254600160a060020a031681565b60005433600160a060020a039081169116146103125760006000fd5b60055460ff1615156103245760006000fd5b8160045410156103345760006000fd5b6004829055600254604051600160a060020a039182169130163184900380156108fc02916000818181858888f193505050501580156103705750805b1561037b5760006000fd5b5b5b5b5050565b60005433600160a060020a0390811691161461039e5760006000fd5b60055460ff1615156103b05760006000fd5b6005805460ff1916905561dead6108fc6103e883810330600160a060020a031631025b604051919004801590920291906000818181858888f1935050505015156103fa5760006000fd5b6040517fbb2ce2f51803bba16bc85282b47deeea9a5c6223eabea1077be696b3f265cf1390600090a16102bf6101d5565b5b5b5b50565b60005433600160a060020a0390811691161461044d5760006000fd5b6000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0383161790555b5b505600a165627a7a72305820fbfa6f8a2024760ef0e0eb29a332c9a820526e92f8b4fbcce6f00c7643234b140029",
      "gasUsed": "0x52ce0"
    },
    "subtraces": 0,
    "traceAddress": [
      0
    ],
    "transactionHash": "0xc9601ea5ca42e57c3ef1d770ab0b278d6aadf2511a4feb879cba573854443423",
    "transactionPosition": 70,
    "type": "create"
  },
```
{% endtab %}
{% endtabs %}

### `SUICIDE`

Used by an owner of a smart contract to destroy the contract, which will transfer the contract's current balance to the specified `address` and clear the contract's data, freeing up memory on chain. The freed space on chain is processed as a refund towards the total gas cost for completing the transaction.&#x20;

{% tabs %}
{% tab title="Response" %}
* `action`
  * `address`: address of contract to destroy
  * `refundAddress`: address to send remainder of contract `balance` to
  * `balance`: remaining balance in contract&#x20;
* `blockHash`: block hash the transaction was included in
* `blockNumber`: block number the transaction was included in
* `result:` `null` for `SELFDESTRUCT` calls&#x20;
* `subtraces`: number of child traces of this transaction&#x20;
* `traceAddress`: index for a given trace in trace tree
* `transactionHash`: hash for the transaction
* `transactionPosition`: position (or index) of transaction in the block
* `type`: type of OPCODE, in this case, `SUICIDE`&#x20;
{% endtab %}

{% tab title="Example" %}
```
 {
    "action": {
      "address": "0x87051f6ba0562fdb0485763562bf34cb2ad705b1",
      "refundAddress": "0x000000000000000000000000000000000000dead",
      "balance": "0x0"
    },
    "blockHash": "0x6d00f7707938cca36b0730d8f7f090543242002b6fa0fe94bf85b9ab02e6bed6",
    "blockNumber": 4000036,
    "result": null,
    "subtraces": 0,
    "traceAddress": [
      1,
      2,
      2
    ],
    "transactionHash": "0xbc15addb97490a168dc1d099ab8537caf2e4ff7d1deeff6d685d2d594a750037",
    "transactionPosition": 45,
    "type": "suicide"
  },
```
{% endtab %}
{% endtabs %}

### `CALL`

Used for transferring ETH between [externally owned accounts](../../resources/web3-glossary.md#externally-owned-account) (EOAs) or to call a smart contract function.&#x20;

{% tabs %}
{% tab title="Response" %}
* `action`
  * `from`: address of the sender
  * `callType`: type of `CALL`, can be any of the following:
    * `call`
    * `delegatecall`&#x20;
    * `callcode`
    * `staticcall`
  * `gas`: gas included in the transaction
  * `input`: the specific function to call on the contract with parameters specified, encoded. For transfers to an EOA, `input` will be `0x`
  * `to`: address of the receiver
  * `value`: amount of value to be transferred &#x20;
* `blockHash`: block hash the transaction was included in
* `blockNumber`: block number the transaction was included in
* `result`
  * `gasUsed`: gas used to execute the transaction
  * `output`: the result of the smart contract function call, encoded. For transfers to an EOA or smart contract the `output` will be `0x`.
* `subtraces`: number of child traces of this transaction&#x20;
* `traceAddress`: index for a given trace in trace tree
* `transactionHash`: hash for the transaction
* `transactionPosition`: position (or index) of transaction in the block
* `type`: type of OPCODE, in this case, `CALL` &#x20;
{% endtab %}

{% tab title="Example" %}
```
{
    "action": {
      "from": "0xbc9f06dd67578b0b8b4d87fda9acde453bc4c067",
      "callType": "call",
      "gas": "0x97478",
      "input": "0xfebefd610000000000000000000000000000000000000000000000000000000000000040cc849afc28894f79411f12309e75c71ded27d1666b75a2423633c204e671cb1e00000000000000000000000000000000000000000000000000000000000000036eaec0ff7c4899bec2db1479d7d195d614ca26819a301523d82daaaaf436122d2ceb36dfa12b359202b4dfd756478988f5023bf7297afa81f563d4b6242e36e707671a8bf38ee483a37feca948997dcfba17b3372e166ba5c824629beeed6b5c",
      "to": "0x6090a6e47849629b7245dfa1ca21d94cd15878ef",
      "value": "0x2386f26fc10000"
    },
    "blockHash": "0x6d00f7707938cca36b0730d8f7f090543242002b6fa0fe94bf85b9ab02e6bed6",
    "blockNumber": 4000036,
    "result": {
      "gasUsed": "0x7ad71",
      "output": "0x"
    },
    "subtraces": 4,
    "traceAddress": [],
    "transactionHash": "0x552b31a3a9c92577d65db62cf9f729e81571e10cad90e356423adcfa2caebacc",
    "transactionPosition": 71,
    "type": "call"
  }
```
{% endtab %}
{% endtabs %}

## How to read `traceAddress`

Traces are structured in a tree format. The `traceAddress` field represents the position of the given trace in the tree. Here is a diagram of `traceAddress` results to help understand how to read this position:

![Trace tree diagram](<../../.gitbook/assets/Docs - User flow (1) (1).png>)

``
