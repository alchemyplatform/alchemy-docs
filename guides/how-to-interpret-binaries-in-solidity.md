---
description: What is an Application Binary Interface (ABI)? What are binaries in Solidity?
---

# How to interpret binaries in Solidity

The raw data published via a smart contract to the Ethereum blockchain is bytecode, or long strings of hexadecimal characters. Though developers write and read smart contracts in human-readable Solidity code, that isn’t the text that is published to the blockchain.

Similarly, every smart contract "call", or request made to one of the externally visible functions published by a smart contract, is in the form of raw bytecode, or "binaries."

Take a smart contract uploaded to Ethereum mainnet with the following (Solidity-encoded) structure:

```
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;
 
contract Foo {
function baz(uint32 x, bool y) public pure returns (bool r) { r = x > 32 || y; }
}
```

Say a user wants to make a call to the function baz with the parameters 69 and true.

Here's what the request actually looks like transmitted in bytecode:

`0xcdcd77c000000000000000000000000000000000000000000000000000000000000000450000000000000000000000000000000000000000000000000000000000000001`

Pretty difficult to read, right?

In this article we will discuss why the [Ethereum Virtual Machine](https://www.alchemy.com/overviews/what-is-the-ethereum-virtual-machine-evm) encodes everything in bytecode, learn what an ABI is and how to use one, and pick up some basic tools to decompile bytecode back into human-readable Solidity.

Note: examples in this article are borrowed from the official Solidity ABI documentation, at https://docs.soliditylang.org/en/v0.8.13/abi-spec.html&#x20;

## Why does Solidity encode smart contracts in binary?&#x20;

Because it’s extremely expensive to store data on the Ethereum blockchain, and every byte of data uploaded needs to be replicated to all full nodes on the blockchain, it’s dramatically more cost efficient to write and read raw bytecode than to upload Solidity code.

Parsing and storing human-readable code can cost an order of magnitude more data, which is a problem when smart contracts can already cost thousands of USD each on mainnet.&#x20;

## What is a Solidity ABI (application binary interface)? Why do you need one to read a smart contract?&#x20;

When smart contracts are published, they’re automatically transpiled into bytecode before publishing to Ethereum. However - once they’re published on the network, how will a given individual know how to interact with the smart contract? It’s nearly impossible to look at a long string of bytecode and understand what functions are available to call.

An [Application Binary Interface, or ABI is the answer.](https://www.alchemy.com/overviews/what-is-an-abi-of-a-smart-contract-examples-and-usage)

An ABI is a human-readable, public list of methods that describes the calls that can be made to any particular smart contract and what each call will return.

With an ABI, users of smart contracts don’t need to read bytecode, and can translate their calls in bytecode to interact with smart contracts.

ABIs are extremely similar to APIs (Application Programming Interfaces) in traditional Web2 architecture. However, the primary difference is that **a Solidity ABI enables the user to access methods in smart contracts encoded in binary**, whereas APIs enable users to access methods from online server endpoints.

Because they’re intended to be used and read by humans, smart contract developers don’t publish the ABI of a smart contract to the blockchain because that would be extremely expensive.

Instead, you can get the ABI from:

Publicly available source code for the contract available from the smart contract developer, which can be used to generate an ABI. If the smart contract is verified on Etherscan, from the Etherscan contract information. Reverse-engineering the ABI from the smart contract bytecode (not recommended).

An ABI is typically published as a JSON-formatted encoding of the public function declarations of a Solidity smart contract.

Take the following smart contract’s function definition:

```
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;


contract Test {
    constructor() { b = hex"12345678901234567890123456789012"; }
    event Event(uint indexed a, bytes32 b);
    event Event2(uint indexed a, bytes32 b);
    error InsufficientBalance(uint256 available, uint256 required);
    function foo(uint a) public { emit Event(a, b); }
    bytes32 b;
}
```

The corresponding JSON encoding would look like this:

```
[{
"type":"error",
"inputs": [{"name":"available","type":"uint256"},{"name":"required","type":"uint256"}],
"name":"InsufficientBalance"
}, {
"type":"event",
"inputs": [{"name":"a","type":"uint256","indexed":true},{"name":"b","type":"bytes32","indexed":false}],
"name":"Event"
}, {
"type":"event",
"inputs": [{"name":"a","type":"uint256","indexed":true},{"name":"b","type":"bytes32","indexed":false}],
"name":"Event2"
}, {
"type":"function",
"inputs": [{"name":"a","type":"uint256"}],
"name":"foo",
"outputs": []
}]

```

## How to Interpret Call Data Binaries from Solidity&#x20;

While, you don’t want to parse Solidity binaries back to call functions by hand because it’s complicated, unintuitive, and you’re likely to make a number of mistakes, it’s super helpful to understand roughly how binaries are formed in Solidity, so you can quickly glance through call data or double-check values.

We’ll link you to a couple tools in the next section that should handle most of this transcription for you.

Take the example above.

Say a user wants to make a call to the function baz in a smart contract with the parameters 69 and true. Here's what the request looks like in bytecode, which is 68 bytes total:

`0xcdcd77c000000000000000000000000000000000000000000000000000000000000000450000000000000000000000000000000000000000000000000000000000000001`

### 1. Use the first 4 bytes of the call data to identify the method ID.

In this case, `0xcdcd77c` identifies the method baz, by deriving the first 4 bytes of the Keccak hash of the ASCII form of the signature baz(uint32,bool).

### 2. Use the following 32 bytes to identify the first parameter

`0x00000000000000000000000000000000000000000000000000000000000000045`  the first parameter 69, which is a uint32 value padded to 32 bytes. Padding simply means 0s are added to guarantee that the entire string is 32 bytes long (in this case), no matter how large the actual number is.

### 3. Use the final 32 bytes to identify the second parameter

The second parameter is true, which is a bool value padded to 32 bytes:

`0x0000000000000000000000000000000000000000000000000000000000000001`

The encoding looks slightly different for parameters that include dynamic types because unlike static types like address, bool, or uint32 which are encoded in-place, [dynamic types are encoded at a separately allocated location](https://docs.soliditylang.org/en/v0.8.13/abi-spec.html#use-of-dynamic-types).&#x20;

## How can I interpret event data binaries from Solidity?&#x20;

An event is a log published by a smart contract when executing a method call, and events are published as binary data.

Events can take in parameters, which can help specify what the event will output. These parameters can be indexed, meaning the event will be searchable by using that indexed parameter as a filter. These indexed parameters are otherwise known as topics in Solidity terms!

Roughly, a Solidity event follows the following structure:

address: the address of a contract topics\[n]: 0 - 4 topics, or indexed parameters arbitrary length binary data, which can be parsed according to the ABI.&#x20;

## What tools should I use to decompile Solidity binaries?&#x20;

There’s a variety of EVM decompilers available that can help you retrieve a more readable version of Solidity binaries including the [EtherVM Decompiler](https://ethervm.io/decompile) and the[ Panoramix decompiler.](https://github.com/palkeo/panoramix)

These EVM decompilers won’t return a perfect recreation of the original source code (names or other important information may be removed to minimize binary sizes), but they should give you a high-level understanding of permitted ABI requests.
