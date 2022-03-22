---
description: >-
  A detailed guide to choosing which Network to deploy on. Compares Layer 1
  chains vs Layer 2 chains as well as Mainntet vs Testnets environments.
---

# Choosing a Network

## Layer 1 vs. Layer 2

Alchemy currently supports the Ethereum Layer 1 chain and the [Arbitrum Layer 2 chain](https://www.alchemy.com/layer2/arbitrum). Arbitrum is a separate chain built on top of Ethereum as a smart contract that supports faster transaction times, higher throughput, lower gas costs, and many more benefits. Activity and transactions are ultimately relayed to the Layer 1 chain from Arbitrum through [optimistic rollups](https://developer.offchainlabs.com/docs/rollup\_basics).

## Mainnet vs. Testnet

Every blockchain (including both Layer 1s and Layer 2s) has a mainnet. The mainnet is the blockchain that actually carries out real-world transactions and events for the public. This is different from a testnet, which is used to test out those transactions and events before putting them into production.

## Ethereum Testnets

There are four different types of testnets that Alchemy supports.

### [**Goerli**](https://goerli.etherscan.io)

Goerli is a proof-of-authority blockchain, supported by multiple clients. This testnet has the goal of being both widely usable across all client implementations supporting Clique Proof of Authority (PoA) engine and robust enough to guarantee consistent availability and high reliability.

{% hint style="info" %}
**NOTE**: Goerli is the recommended testnet to build on as other testnets are unlikely to be maintained in the future.&#x20;
{% endhint %}

* Average block time: 15 seconds.
* Chain ID: 5
* Status Dashboard:
  * [https://stats.goerli.net/](https://stats.goerli.net)
  * [https://goerli.ethstats.io/](https://goerli.ethstats.io)
* Block Explorer:
  * [https://goerli.etherscan.io/](https://goerli.etherscan.io)
* Faucet:
  * [goerlifaucet.com](http://goerlifaucet.com)

Check out more info about Goerli on the [GitHub](https://github.com/goerli/testnet).

### [**Rinkeby**](https://rinkeby.etherscan.io)

Rinkeby is a proof-of-authority blockchain that uses the Clique PoA consensus protocol, and is only supported by Geth. This testnet is immune to spam attacks since the Ether supply is controlled by trusted parties and has to be requested from a [faucet](https://www.rinkebyfaucet.com), not mined.

**Note:** Rinkeby doesn't fully reproduce the current production environment since it uses PoA.

* Average block time: 15 seconds.
* Chain ID: 4
* Block Explorer&#x20;
  * [https://rinkeby.etherscan.io/](https://rinkeby.etherscan.io)
* Faucet
  * [https://rinkebyfaucet.com/](https://rinkebyfaucet.com)

Check out more info about Rinkeby on the [website](https://www.rinkeby.io).

### [**Kovan**](https://kovan.etherscan.io)

Kovan is a proof-of-authority blockchain, started by the Parity team and supported by Parity only. Ether can’t be mined; it has to be requested from the [faucet](https://github.com/kovan-testnet/faucet). This testnet is known for being immune to spam attacks.

**Note:** Kovan doesn't fully reproduce the current production environment since it uses PoA.

* Chain ID: 42
* Explorer:
  * [https://kovan.etherscan.io/](https://kovan.etherscan.io)
* Faucet:
  * &#x20;[https://github.com/kovan-testnet/faucet.](https://github.com/kovan-testnet/faucet.)

Check out more info about Kovan on the [GitHub](https://github.com/kovan-testnet/proposal).

### [**Ropsten**](https://ropsten.etherscan.io)

Ropsten is a proof-of-work blockchain that most closely resembles the current Ethereum production environment, it is supported by Geth and Parity.

**Note:** Ropsten is not immune to spam attacks so it is less stable.

You can easily mine faux-Ether or request it from a faucet:

* Chain ID: 3
* Faucets
  * [https://faucet.metamask.io/](https://faucet.metamask.io)
  * [http://faucet.ropsten.be:3001](http://faucet.ropsten.be:3001)
  * [https://faucet.bitfwd.xyz/](https://faucet.bitfwd.xyz)
* Explorer:
  * [https://ropsten.etherscan.io/](https://ropsten.etherscan.io)

Check out more info about Ropsten on the [GitHub](https://github.com/ethereum/ropsten).

## Arbitrum

### [Mainnet](https://developer.offchainlabs.com/docs/developer\_quickstart)

Arbitrum currently has one testnet on connected to Ethereum's Kovan testnet ([described ](choosing-a-network.md#kovan)[above](choosing-a-network.md#kovan)). This operates exactly the same as Arbitrum mainnet but is built as a smart contract on Kovan instead of on Ethtereum mainnet. It is currently under development and will be released shortly.

* Network Name: Arbitrum Mainnet V1
* ChainID: 0xa4b1
* Symbol: ETH
* Block Explorer URL: [https://explorer.arbitrum.io](https://explorer.arbitrum.io)

### [Rinkeby](https://developer.offchainlabs.com/docs/public\_testnet)

Arbitrum currently has one testnet on connected to Ethereum's Rinkeby testnet. This operates exactly the same as Arbitrum mainnet but is built as a smart contract on Rinkeby instead of on Ethtereum mainnet.

* Network Name: Arbitrum Testnet
* ChainID: 421611
* Symbol: ETH
* Block Explorer URL: [https://rinkeby-explorer.arbitrum.io/#/](https://rinkeby-explorer.arbitrum.io/#/)

## Polygon

### Mumbai&#x20;

Polygon has one testnet known as the Mumbai network, which operates exactly the same as the Polygon mainnet.

* Chain ID: 80001
* Faucet
  * [https://mumbaifaucet.com/](https://mumbaifaucet.com)
* Block Explorer&#x20;
  * [https://mumbai.polygonscan.com/](https://mumbai.polygonscan.com)
