---
description: >-
  The Optimism API follows the same JSON-RPC standard as Ethereum. Find methods
  that Alchemy supports for Optimism development (smart contracts &
  decentralized applications) on mainnet & testnets below.
---

# Optimism API

Before you get started, [update your Optimism RPC URL to Alchemy](https://docs.alchemy.com/alchemy/guides/connecting-metamask-to-alchemy/how-to-add-optimism-to-metamask).

## Types of Requests in the Optimism API

### Getting Blocks&#x20;

Retrieves information from a particular block in the blockchain.

* eth\_blockNumber
* eth\_getBlockByHash
* eth\_getBlockByNumber

### Reading Transactions

Retrieves information on the state data for addresses regardless of whether it is a user or a smart contract.

* eth\_getTransactionByHash
* eth\_getTransactionCount
* eth\_getTransactionReceipt
* eth\_getBlockTransactionCountByHash
* eth\_getBlockTransactionCountByNumber
* eth\_getTransactionByBlockHashAndIndex
* eth\_getTransactionByBlockNumberAndIndex

### Writing Transactions

Allows developers to both send ETH from one address to another, write data on-chain, and interact with smart contracts.

* eth\_sendRawTransaction

### Account Information

Returns information regarding an address's stored on-chain data.

* eth\_getBalance
* eth\_getStorageAt
* eth\_getCode
* eth\_accounts
* eth\_getProof

### EVM/Smart Contract Execution

Allows developers to read data from the blockchain which includes executing smart contracts. However, no data is published to the Optimism network.&#x20;

* eth\_call

### Event Logs

Returns logs which are records that denote/provide context on specific events within a smart contract, like a token transfer or a change of ownership for example.

* eth\_getLogs
* eth\_getFilterChanges
* eth\_getFilterLogs
* eth\_newBlockFilter
* eth\_newFilter
* eth\_newPendingTransactionFilter
* eth\_uninstallFilter&#x20;

### Chain Information

Returns information on the Optimism network and internal settings.

* eth\_protocolVersion
* eth\_gasPrice
* eth\_estimateGas
* eth\_feeHistory
* eth\_maxPriorityFeePerGas
* eth\_chainId
* net\_version
* net\_listening

### Getting Uncles

Returns information on uncle blocks are which are network rejected blocks and replaced by a canonical block instead.

* eth\_getUncleByBlockHashAndIndex
* eth\_getUncleByBlockNumberAndIndex
* eth\_getUncleCountByBlockHash
* eth\_getUncleCountByBlockNumber

### Web3

Returns Optimism network configuration information.

* web3\_clientVersion&#x20;
* web3\_sha3

### Real-time Events

Introduces WebSocket-based requests/responses which leverage a network connection allowing developers to listen for changes continuously without the need for HTTP polling.

* eth\_subscribe
* eth\_unsubscribe&#x20;

