---
description: >-
  Common questions about Ethereum JSON-RPC methods and best practices when
  building on Ethereum.
---

# Ethereum API FAQ

## What testnet should developers use for Ethereum development?

For devs looking to build on testnets, the Ethereum Foundation will be winding down support for the Rinkeby, Ropsten, and Kovan networks after Ethereum's transition to a proof-of-stake model. To ensure that your testnet applications remain fully functional after the transition, we recommend using Goerli, which will remain unchanged.

## How do I get the timestamp for a transaction?

A transaction object will have a block number associated with it, the block number is Ethereum's measure of time, however, if you want a standard timestamp you can easily get that by making a call to [`eth_getBlockByNumber`](./#eth\_getblockbynumber) and specifying the `blockNumber` field. Here is an [example request](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth\_getBlockByNumber%22%2C%22paramValues%22%3A%5B%22latest%22%2Cfalse%5D%7D). If you only have the transaction hash, you can get the full object by making a request to [`eth_getTransactionByHash`](./#eth\_gettransactionbyhash).

## How do I distinguish between a contract address and a wallet address? <a href="#how-do-i-distinguish-between-a-contract-address-and-a-wallet-address" id="how-do-i-distinguish-between-a-contract-address-and-a-wallet-address"></a>

A super easy way to distinguish between these two addresses is by calling [eth\_getCode](https://alchemyapi/s/alchemy/documentation/alchemy-api-reference/json-rpc#eth\_getcode), which will return contract code if it's a contract and nothing if it's a wallet. Here's an example of both using our composer tool:

* [**0x Contract Address**](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth\_getCode%22%2C%22paramValues%22%3A%5B%220xe41d2489571d322189246dafa5ebde1f4699f498%22%2C%22latest%22%5D%7D)
* [**Vitalik's Wallet Address**](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth\_getCode%22%2C%22paramValues%22%3A%5B%220xAb5801a7D398351b8bE11C439e05C5B3259aeC9B%22%2C%22latest%22%5D%7D)

## My question isn't here, where can I get help?

Don't worry, we got you. Check out our [support page](https://docs.alchemyapi.io/other/contact-us) for plenty of options!
