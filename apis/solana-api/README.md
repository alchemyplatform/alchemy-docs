---
description: >-
  The Solana API accepts HTTP requests using the JSON-RPC specification. Find
  methods that Alchemy supports for Solana mainnet development below.
---

# Solana API

## Want to get started with Alchemy's Solana API?

Sign up for our [private beta waitlist ](https://www.alchemy.com/solana)and we'll get back to you soon!

## Getting Started with the Solana API

1. Get access to your Solana API key! During out beta roll-out, we'll email you an API key that you can use
2. Download [solana-web3.js](https://github.com/solana-labs/solana-web3.js)
3. Configure solana-web3.js to use Alchemy:

```jsx
const solanaWeb3 = require('@solana/web3.js');

const establishConnection = async () =>{
 rpc="https://solana-mainnet.g.alchemy.com/v2/<API-KEY>";
 connection = new solanaWeb3.Connection(rpc, 'confirmed');
 console.log('Cluster Connected:', rpcUrl);
}

establishConnection();
```

Now, you can use solana-web3.js normally!&#x20;

## What is the Solana API?

The Solana API allows decentralized applications to connect to a Solana node that is part of the Solana blockchain. Developers can interact with on-chain data, send transactions, and deploy contracts by leveraging Alchemy's API endpoints. The API follows a JSON-RPC standard, a lightweight, remote procedure call (RPC) protocol that is commonly used when interacting with blockchain data.

## Types of Requests in the Solana API

### Getting Blocks&#x20;

Retrieves information from a particular block in the blockchain.

* [getBlockHeight](getblockheight.md)
* [getBlock](getblock.md)
* [getBlocks](getblocks.md)
* [getBlocksWithLimit](getblockswithlimit.md)
* [getBlockTime](getblocktime.md)
* [getBlockCommitment](getblockcommitment.md)
* [getBlockProduction](getblockproduction.md)
* [isBlockhashValid](isblockhashvalid.md)

### Account Information

Returns information regarding an address's stored on-chain data.

* [getAccountInfo](getaccountinfo.md)
* [getBalance](getbalance.md)
* [getMultipleAccounts](getmultipleaccounts.md)
* [getProgramAccounts](getprogramaccounts.md)
* [getVoteAccounts](getvoteaccounts.md)
* [getLargestAccounts](getlargestaccounts.md)

### Node Information

Returns information regarding node configurations.

* [getClusterNodes](getclusternodes.md)
* [getHealth](gethealth.md)
* [getVersion](getversion.md)
* [getIdentity](getidentity.md)

### Network Inflation Information

Returns inflation / staking information for the Solana blockchain.

* [getInflationGovernor](getinflationgovernor.md)
* [getInflationRate](getinflationrate.md)
* [getInflationReward](getinflationreward.md)
* [getSupply](getsupply.md)

### Network Information

Returns aggregate network information.

* [getEpochInfo](getepochinfo.md)
* [getEpochSchedule](getepochschedule.md)
* [getFeeForMessage](getfeeformessage.md)
* [getFirstAvailableBlock](getfirstavailableblock.md)
* [getGenesisHash](getgenesishash.md)
* [getHighestSnapshotSlot](gethighestsnapshotslot.md)
* [getMinimumBalanceForRentExemption](getminimumbalanceforrentexemption.md)
* [getRecentPerformanceSamples](getrecentperformancesamples.md)

### Transaction Information

Handles transaction-based Solana interactions&#x20;

* [sendTransaction](sendtransaction.md)
* [simulateTransaction](simulatetransaction.md)
* [getTransaction](gettransaction.md)
* [getSignaturesForAddress](getsignaturesforaddress.md)
* [getSignatureStatuses](getsignaturestatuses.md)

### Slot Information

Returns slot (the period of time for which each leader ingests transactions and produces a block) information

* [getSlot](getslot.md)
* [getSlotLeader](getslotleader.md)
* [getSlotLeaders](getslotleaders.md)
* [getMaxRetransmitSlot](getmaxretransmitslot.md)
* [getMaxShredInsertSlot](getmaxshredinsertslot.md)
* [minimumLedgerSlot](minimumledgerslot.md)

### Token Information

Returns balance / account information&#x20;

* [getTokenAccountBalance](gettokenaccountbalance.md)
* [getTokenAccountsByOwner](gettokenaccountsbyowner.md)
* [getTokenSupply](gettokensupply.md)

