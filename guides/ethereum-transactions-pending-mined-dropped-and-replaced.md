# Ethereum Transactions - Pending, Mined, Dropped & Replaced

**TL;DR:** Alchemy just released support for “Dropped & Replaced” transactions in the Mempool Watcher, a browser-based user interface that allows web3 developers to browse, filter, and track transactions that were sent to the blockchain and help you [debug pending transactions](https://www.youtube.com/watch?v=MhtJLUl51gE). With “Dropped & Replaced” transactions, a new blockchain developer tool, it will be dramatically easier to understand when transactions fail, when they are replaced, and the current state of the mempool.

## What is a Mempool?&#x20;

A mempool, or memory pool, is a [collection of pending transactions waiting for validation from a node](http://www.alchemy.com/overviews/what-is-a-mempool) before they are committed to a new block on the blockchain. Put simply, the mempool is a staging area for unconfirmed transactions in a node. Every blockchain node in the network has a mempool, and they all intercommunicate to share information about the latest pending transactions.

Mempools exist because only \~200 transactions can be confirmed per block, which are mined about once every 15 seconds.

As a result, pending transactions are broadcasted throughout the entire network of mempools with an associated gas price (i.e. the gas fees that the sender is willing to pay to complete their transaction). When a block is mined, the \~200 pending transactions with the highest gas prices are confirmed onto the blockchain by the node that mines the latest block.

If transactions fail to pass a series of validation checks, or are submitted with too little gas, those transactions will eventually be dropped from the mempool.

## What is a nonce?

A nonce is a 0-indexed number corresponding to the number of confirmed transactions sent by a particular address. That is, if an address has 0 confirmed transactions, it marks its first transaction with a nonce of 0, and the subsequent transaction it would like to send with a nonce of 1.

Every confirmed transaction by a particular sender address must have a unique nonce value. For example, if a sender submits two transactions with a nonce value of 1, only one can succeed.

## Why do you need to set your nonce?

Nonces exist to protect against replay attacks.

For example, a transaction sending 20 coins from A to B can be replayed by B over and over to continually drain A’s balance if it didn’t have a nonce. Because transactions are submitted as hashed values, B could simply copy the hashed transaction published to the blockchain and re-run it over and over again.

However, if you set a unique nonce before creating the hashed transaction, it will prevent a replay attack, since every confirmed transaction must have a unique nonce value and subsequent identical transactions will fail.

It’s important for senders to set their nonce values correctly to ensure transactions have the opportunity to be confirmed because transactions that are submitted with an out-of-order or duplicate nonce value will be dropped from the mempool.

Nonces are also useful to guarantee ordering of transactions. For example, if a sender can submit 5 transactions with nonces from 0 - 4, they can expect that the transactions will be executed strictly in the order of their nonces.

## What transaction lifecycle states can a mempool transaction be in?

Traditionally, mempool transactions fall into one of the following three buckets:&#x20;

### Pending Transactions&#x20;

Transactions that have been submitted to the mempool and are waiting to be included in the next block mined by a miner. [Learn more about debugging pending transactions.](https://alchemy.com/blog/how-to-debug-pending-ethereum-transactions)&#x20;

### Mined Transactions&#x20;

Transactions that have been selected to be included onto the latest block by a miner. These transactions are executed, and their updated state is written to the blockchain ledger and broadcasted to the entire network.

### Dropped Transactions&#x20;

Transactions that have failed to be confirmed. This could happen because the transaction failed certain validation tests, the nonce was incorrect, the submitted gas price was too low and it timed out, or a number of other errors. Dropped transactions return their assets and gas fees to the sender, as if the transaction never happened.

Need help troubleshooting dropped transactions? Watch our tutorial on [how to fix pending or stuck transactions](https://www.youtube.com/watch?v=MhtJLUl51gE) with Alchemy’s Mempool Watcher.

## What are Dropped & Replaced transactions?

A new category has become a common feature request by developers. When a transaction is dropped, the sender will oftentimes send a replacement transaction with the same nonce value to “replace” that failed transaction.

If the second transaction is confirmed onto the blockchain (e.g. by sending a new transaction with the same nonce and a higher gas price), the “dropped” transaction will be moved into the new transaction status category known as “Dropped & Replaced”.

Similarly, if multiple transactions are simultaneously sent with the same nonce value, typically the transaction with a higher transaction fee will be selected for confirmation onto a block. The other transactions will fall into the “Dropped & Replaced” category.

This transaction status is useful for smart contract developers as it allows them to track which transactions have been successfully re-broadcasted to the blockchain network (“dropped and replaced”) and which dropped transactions still need to be re-broadcasted (“dropped”)..

## How to track Dropped & Replaced transactions

If you submit your transactions via [Alchemy](https://alchemy.com/?a=dropped-replaced), we provide a convenient web3 developer tool to rapidly filter and explore transactions you’ve recently submitted: the Mempool Watcher.

Before the Mempool Watcher tool was released, developers would have to track transactions via Etherscan (which was often unreliable), or by manually querying their nodes to retrieve the current state of the mempool and parse the response for the relevant transaction status details.

![Alchemy’s Mempool Watcher dashboard that shares all sent transactions with filters for Mined, Pending, Dropped & Replaced, and Dropped transactions.](https://lh4.googleusercontent.com/Vkzcfk833IpvVc4ZrSx0yu8YpFUBWgMc05uwRiV1dvXqKYaBcZxf81CeKDaI2Y4x3Tzx8y\_JgqhzG3pnf9nMiaDkB4DbbH\_FG7lrfTpptoCaSzNmcIf0UUBwQxPRfFv35ba0HDyR33duBOnVCQ)

Using the Mempool Watcher, web3 developers using Alchemy can now see all their transactions in a single UI, and filter them by mined, pending, dropped, and dropped & replaced transactions. Builders can also search transactions by these filters:

* Date of submission&#x20;
* Sender address&#x20;
* Associated transaction hash

Web3 developers can also use the Alchemy Notify API (webhook alerts for transaction activity) to:

* [Create notifications for dropped and mined transactions ](https://docs.alchemy.com/alchemy/enhanced-apis/notify-api/using-notify#dropped-transactions)
* [Send transaction status notifications with Zapier ](https://docs.alchemy.com/alchemy/enhanced-apis/notify-api/integrate-alchemy-zapier)
* [Integrate transaction notifications with a dApp](https://docs.alchemy.com/alchemy/enhanced-apis/notify-api/building-a-dapp-with-real-time-transaction-notifications)

## How do I start using the Mempool Watcher?

[Sign up for a free Alchemy account today](https://alchemy.com/?a=dropped-replaced) to access the Mempool Watcher, start tracking your dropped & replaced transactions, and access a host of other powerful blockchain developer tools! At our current pricing, you’ll be able to send 1.2 million transactions to the mempool each month on our free tier - the most generous in the web3 ecosystem.
