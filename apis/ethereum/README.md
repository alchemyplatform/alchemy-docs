---
description: >-
  This page serves as an Ethereum API documentation index and lists the
  available Ethereum JSON-RPC methods that Alchemy supports.
---

# Ethereum API

## What is the Ethereum API?

The Ethereum API allows applications to connect to an Ethereum node that is part of the Ethereum blockchain. Developers can interact with on-chain data and send different types of transactions to the network by utilizing the endpoints provided by the API. The API follows a JSON-RPC standard. JSON-RPC is a stateless, lightweight, remote procedure call (RPC) protocol that is commonly used when interacting with Ethereum.

## Types of Requests in the Ethereum API

### Getting Blocks&#x20;

Retrieves information from a particular block in the blockchain.

* [eth\_blockNumber](eth-blocknumber.md)
* [eth\_getBlockByHash](eth\_getblockbyhash.md)
* [eth\_getBlockByNumber](eth\_getblockbynumber.md)

### Reading Transactions

Retrieves information on the state data for addresses regardless of whether it is a user or a smart contract.

* [eth\_getTransactionByHash](eth\_gettransactionbyhash.md)
* [eth\_getTransactionCount](eth\_gettransactioncount.md)
* [eth\_getTransactionReceipt](eth\_gettransactionreceipt.md)
* [eth\_getBlockTransactionCountByHash](eth\_getblocktransactioncountbyhash.md)
* [eth\_getBlockTransactionCountByNumber](eth\_getblocktransactioncountbynumber.md)
* [eth\_getTransactionByBlockHashAndIndex](eth\_gettransactionbyblockhashandindex.md)
* [eth\_getTransactionByBlockNumberAndIndex](eth\_gettransactionbyblocknumberandindex.md)
* [eth\_getBlockReceipts](eth-getBlockReceipts.md)

### Writing Transactions

Allows developers to both send ETH from one address to another, write data on-chain, and interact with smart contracts.

* [eth\_sendRawTransaction](eth\_sendrawtransaction.md)
* [eth\_sendPrivateTransaction](eth-sendPrivateTransaction.md)
* [eth\_cancelPrivateTransaction](eth\_cancelPrivateTransaction.md)

### Account Information

Returns information regarding an address's stored on-chain data.

* [eth\_getBalance](eth\_getbalance.md)
* [eth\_getStorageAt](eth\_getstorageat.md)
* [eth\_getCode](eth\_getcode.md)
* [eth\_accounts](eth\_accounts.md)
* [eth\_getProof](eth\_getproof.md)

### EVM/Smart Contract Execution

Allows developers to read data from the blockchain which includes executing smart contracts. However, no data is published to the Ethereum network.&#x20;

* [eth\_call](eth\_call.md)

### Event Logs

Returns logs which are records that denote/provide context on specific events within a smart contract, like a token transfer or a change of ownership for example.

* [eth\_getLogs](eth\_getlogs.md)

### Chain Information

Returns information on the Ethereum network and internal settings.

* [eth\_protocolVersion](eth\_protocolversion.md)
* [eth\_gasPrice](eth\_gasprice.md)
* [eth\_estimateGas](eth\_estimategas.md)
* [eth\_feeHistory](eth\_feehistory.md)
* [eth\_maxPriorityFeePerGas](eth\_maxpriorityfeepergas.md)
* [eth\_chainId](eth\_chainid.md)
* [net\_version](net-version.md)
* [net\_listening](net\_listening.md)

### Getting Uncles

Returns information on uncle blocks are which are network rejected blocks and replaced by a canonical block instead.

* [eth\_getUncleByBlockHashAndIndex](eth\_getunclebyblockhashandindex.md)
* [eth\_getUncleByBlockNumberAndIndex](eth\_getunclebyblocknumberandindex.md)
* [eth\_getUncleCountByBlockHash](eth\_getunclecountbyblockhash.md)
* [eth\_getUncleCountByBlockNumber](eth\_getunclecountbyblocknumber.md)

### Filters

Allows developers to filter and query for specific Ethereum logs.&#x20;

* [eth\_getFilterChanges](eth\_getfilterchanges.md)
* [eth\_getFilterLogs](eth\_getfilterlogs.md)
* [eth\_newBlockFilter](eth\_newblockfilter.md)
* [eth\_newFilter](eth\_newfilter.md)
* [eth\_newPendingTransactionFilter](eth\_newpendingtransactionfilter.md)
* [eth\_uninstallFilter](eth\_uninstallfilter.md)&#x20;

### Web3

Returns Ethereum network configuration information.

* [web3\_clientVersion](web3\_clientversion-1.md)&#x20;
* [web3\_sha3](web3\_sha3-1.md)

### Real-time Events

Introduces WebSocket-based requests/responses which leverage a network connection allowing developers to listen for changes continuously without the need for HTTP polling.

* [eth\_subscribe](eth\_subscribe-1.md)
* [eth\_unsubscribe](eth\_unsubscribe-1.md)&#x20;

## What testnet should developers use for Ethereum development?

All developers getting started on Alchemy should use **Goerli** as their testnet of choice for development!

The Ethereum Foundation will be winding down support for the Rinkeby, Ropsten, and Kovan networks after Ethereum's transition to a proof-of-stake model. To ensure that your testnet applications remain fully functional after the transition, we recommend using Goerli, which will remain unchanged. Learn more about [Ethereum networks and testnets here](../../guides/choosing-a-network.md#ethereum-testnets).&#x20;

## What API does Ethereum use?

Ethereum uses the JSON-RPC API standard. The Ethereum JSON-RPC API serves as the backbone for the Ethereum network and powers any blockchain interaction. In aggregate, this API suite allows users to read block/transaction data, query chain information, execute smart contracts, store data on-chain etc. Developers and consumers alike interact with Ethereum’s base JSON-RPC APIs to communicate with its decentralized network of nodes.

## What is an Ethereum API Key?

When accessing the Ethereum network via a node provider, API services like Alchemy require an API key, which allows developers to monitor personal apps and access usage metrics.

While many Ethereum development environments have a set of default shared API keys, they are often throttled during periods of high usage leading to slower response times and a higher likelihood of request failures.

For the best development experience, we recommend that you [sign up for a free API key](https://alchemy.com/?a=bad6a69700)!

With a dedicated API key, developers are able to:

* access **higher request throughput** and **increased concurrent requests**
* query [**enhanced APIs**](broken-reference), gaining access to free archive data, logs, and higher-level API abstractions
* leverage **individualized usage metrics**

## Does Ethereum only use JSON-RPC?

The raw Ethereum client only uses JSON-RPC notation to encode remote procedure calls for interpreting requests and serving up responses. However, most developers use libraries that actually abstract away the JSON-RPC standard. Libraries like [AlchemyWeb3](../../documentation/alchemy-web3/) wrap the base Ethereum JSON-RPC API to create more intuitive methods that make debugging and developing easier. Likewise, developers can find a host of different [wrapper libraries](../../introduction/getting-started/#other-web3-libraries) spanning different programming languages like Javascript, Python, Golang, etc. which use JSON-RPC under the hood.

## How does Alchemy's Ethereum API work?

Alchemy's Ethereum API gives developers and users access to read and write data to the Ethereum blockchain.

If you’re not familiar with [how a blockchain works](https://docs.alchemy.com/alchemy/resources/blockchain-101), here’s a quick recap:

* The Ethereum blockchain is made up of blocks of data.
* Blocks are stored on distributed Ethereum nodes.
* Each node in the network serves as a “mini-server” that allows its operator to read/write blocks of data.

Alchemy provides access to our higher level infrastructure that allows developers to interface with the Ethereum network. With API access, Alchemy developers are able to send read/write requests to the blockchain.&#x20;

We take care of the hard stuff so that developers can focus on their products!

## Can you use Python for Ethereum?

Yes! While Javascript libraries have historically gained traction in the Ethereum development community, Python developers are also able to read and write the same data. One commonly used blockchain interaction library is [web3.py](http://web3.py/) which wraps many of the same methods featured in web3.js and Ethers.js.

For Python-based EVM development, [Brownie](https://eth-brownie.readthedocs.io/en/stable/) offers a full suite of Web3 developer tools for compiling, testing, and deploying dApps similar to its peer environments Hardhat and Truffle.

## How do I get the timestamp for a transaction?

There are three steps to get the timestamp for a transaction:

1. Grab the `blockNumber` field in your transaction object
   1. If you only have the transaction hash, you can get the full object by making a request to [`eth_getTransactionByHash`](./#eth\_gettransactionbyhash).
2. Get the block info by calling [eth\_getBlockByNumber](eth\_getblockbynumber.md)
3. Grab the `timestamp` field in the returned block object

Here is an [example request](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth\_getBlockByNumber%22%2C%22paramValues%22%3A%5B%22latest%22%2Cfalse%5D%7D).

It's important to note that block numbers themselves are Ethereum's measure of time, however standard timestamps are available by looking at the block data.&#x20;

## How do I distinguish between a contract address and a wallet address? <a href="#how-do-i-distinguish-between-a-contract-address-and-a-wallet-address" id="how-do-i-distinguish-between-a-contract-address-and-a-wallet-address"></a>

A super easy way to distinguish between a contract address and a wallet address is by calling [eth\_getCode](https://alchemyapi/s/alchemy/documentation/alchemy-api-reference/json-rpc#eth\_getcode), which will return contract code if it's a contract and nothing if it's a wallet. Here's an example of both using our composer tool:

* [**0x Contract Address**](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth\_getCode%22%2C%22paramValues%22%3A%5B%220xe41d2489571d322189246dafa5ebde1f4699f498%22%2C%22latest%22%5D%7D)
* [**Vitalik's Wallet Address**](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth\_getCode%22%2C%22paramValues%22%3A%5B%220xAb5801a7D398351b8bE11C439e05C5B3259aeC9B%22%2C%22latest%22%5D%7D)

## What is the difference between `DATA` and `QUANTITY`?&#x20;

The difference between the types “`DATA`” and “`QUANTITY`” is that “`DATA`” always comes specified with a required length (ex: 20 Bytes), so you'll need to make sure the string you pass in is the right length. In contrast, `QUANTITY` does not have length requirements.&#x20;

For example given a parameter type: “DATA, 20 Bytes”, a valid input would be:

```
"0x0000000000000000000000000000000000000003"
```

_note: every two hex characters make one byte, so that string is `0x` followed by forty hex characters_

However, if this were a QUANTITY, a valid input would be:

```
"0x3"
```

## My question isn't here, where can I get help?

Don't worry, we got you. Check out our [support page](https://docs.alchemyapi.io/other/contact-us) for plenty of options!
