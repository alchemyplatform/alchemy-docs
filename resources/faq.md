---
description: >-
  Common questions about Alchemy, it's products, and blockchain development.
  Feel free to submit questions at the bottom of this page.
---

# ❓ FAQ

## Is there an Alchemy token? <a href="is-there-an-alchemy-token" id="is-there-an-alchemy-token"></a>

Nope! We do not currently have an Alchemy token sale but our users will be the first to know if we ever do 😉

## How can I invest in Alchemy? <a href="how-can-i-invest-in-alchemy" id="how-can-i-invest-in-alchemy"></a>

Alchemy is currently a private company, if you're interested in investing, tweet out why you're interested and tag us [@AlchemyPlatform](https://twitter.com/AlchemyPlatform).

## I'm new to blockchain development, how should I get started? <a href="im-new-to-blockchain-development-how-should-i-get-started" id="im-new-to-blockchain-development-how-should-i-get-started"></a>

If you are completely new to the blockchain space, you should check out our [Blockchain 101 guide](https://docs.alchemyapi.io/resources/blockchain-101) to learn more about the ins and outs of the technology behind blockchain, and the advantages of decentralization.

If you already know some blockchain stuff and are ready to dip your toes in development here are three great tutorials to check out:

1. [Simple Web3 Script](https://docs.alchemyapi.io/tutorials/simple-web3-script)
2. [Hello World Smart Contract](https://docs.alchemyapi.io/tutorials/hello-world-smart-contract)
3. [Sending Transactions Using Alchemy](https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy)

## Does Alchemy store my private keys? <a href="does-alchemy-store-my-private-keys" id="does-alchemy-store-my-private-keys"></a>

No, we will **never** store your private keys, in fact, we never even see them since we only accept _signed transactions_. This also means we cannot sign and send transactions for you. For help on how to send transactions using Alchemy, check out [this guide](https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy).

## What are "Already Known" errors? <a href="what-are-already-known-errors" id="what-are-already-known-errors"></a>

Generally "already known" means the transaction is on the node and is in a pending state. A good solution here is to double check that your transaction nonces are correct and that there aren't any currently pending transactions in your [mempool](https://dashboard.alchemyapi.io/mempool).

## Can you change the 5s timeout:`execution aborted (timeout = 5s)`?

Unfortunately, this is a fixed timeout configured by geth so we are unable to change it. This typically occurs with expensive or heavy `eth_calls` . The best workaround is to break up your eth_call into smaller bites to ensure they don't get timed out. 

## What happens if I run into my capacity limit? <a href="what-happens-if-i-run-into-my-capacity-limit" id="what-happens-if-i-run-into-my-capacity-limit"></a>

If you run into your capacity limit, we recommend switching on [autoscale](https://dashboard.alchemyapi.io/settings/billing) which will allow your app to continue functioning with on-demand compute.

## How can I access Archive data? <a href="how-can-i-access-archive-data" id="how-can-i-access-archive-data"></a>

Archive data is free and available for all of our customers, no additional set up necessary!

## How do I get the timestamp for a transaction?

A transaction object will have a block number associated with it, the block number is Ethereum's measure of time, however, if you want a standard timestamp you can easily get that by making a call to [`eth_getBlockByNumber`](../apis/ethereum/#eth_getblockbynumber) and specifying the `blockNumber` field. Here is an [example request](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBlockByNumber%22%2C%22paramValues%22%3A%5B%22latest%22%2Cfalse%5D%7D). If you only have the transaction hash, you can get the full object by making a request to [`eth_getTransactionByHash`](../apis/ethereum/#eth_gettransactionbyhash).

## Why can't I invite a user who is already on a team? <a href="why-cant-i-invite-a-user-who-is-already-on-a-team" id="why-cant-i-invite-a-user-who-is-already-on-a-team"></a>

You can! While we don't allow a single email to be on multiple teams due to UX concerns, one thing you can do is invite the user by appending a + to their email. For example, a user with email example@gmail.com could use example+team1@gmail.com and example+team2@gmail.com to be on two different teams, while still getting all their emails to one inbox!

## Are there limits on my getLogs requests? <a href="are-there-limits-on-my-get-logs-requests" id="are-there-limits-on-my-get-logs-requests"></a>

In order to ensure maximum reliability for your calls, you can make [`eth_getLogs`](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_getlogs) requests with up to a _**2K block range**_ and _**a 150MB limit  on the response size**_. You can also request _**any block range**_ with a cap of _**10K logs in the response**_.

If you need to pull logs frequently, we recommend [using WebSockets](https://guides/using-websockets) to push new logs to you when they are available.

## How do I request a feature? <a href="how-do-i-request-a-feature" id="how-do-i-request-a-feature"></a>

[Join our discord](https://discord.gg/mMGsVgd) and post in the #feature-request channel!

## What are Alchemy's "Enhanced APIs"? <a href="what-are-alchemys-enhanced-ap-is" id="what-are-alchemys-enhanced-ap-is"></a>

Glad you asked! We've built a bunch of higher level APIs to make your life as an Ethereum developer much easier. With our enhanced APIs you can access things like token balances and information, transaction history for given addresses, notifications about transaction activity, and more. Check out the full list [here](https://docs.alchemyapi.io/documentation/alchemy-api-reference).

## Where are Alchemy's servers located? <a href="where-are-alchemys-servers-located" id="where-are-alchemys-servers-located"></a>

Alchemy's servers are currently located on US East, however we serve production traffic from 99% of countries in the world and see great latency in all regions.

## Which clients does Alchemy support? <a href="which-clients-does-alchemy-support" id="which-clients-does-alchemy-support"></a>

Alchemy currently supports Geth and OpenEthereum node clients.

## How do I know the latest block is accurate? Do you prevent against reorgs?

We've spent years developing an enhanced infrastructure and distributed node system to get the most consensus on the canonical block in the fastest amount of time. We'll only publish information if it's agreed upon by many of our nodes. This provides extra data consistency and reliability to your calls, as well as bring benefits as it relates to reorgs.

To guarantee data consistency, we like to ensure that a certain percentage of our nodes know about a given block before exposing it to our users. One example where this could go wrong on another provider is if you requested the latest block and got back block n. Now you want to query some data about block n in another request. A simple load balanced system would just direct you to any node that is available to serve your request. So what can happen is it gets directed to that node and it only knows about block n - 1 or n - 2. In that case, you will not get the data you are looking for (or the data could be stale) and that’s where you run into data consistency issues. With our system, we always make sure there is a node to serve your request and that you get back the data you were looking for!

The reason this can indirectly help with reorgs is that we will make sure your request is directed to a node which has a latest block that a significant portion of our nodes agree upon. This not only helps with consistency as described above but also can help prevent reorgs. If a given block has been broadcasted to these nodes, then it’s much less likely it will see a reorg in the future. However, there’s still a possibility you can encounter a reorg, especially if a much larger one happens (which is rare). So if you care about reorgs a ton, it’s still something that is worth adding extra protection for on your end.

## Do you support compressed response payloads? <a href="do-you-support-compressed-response-payloads" id="do-you-support-compressed-response-payloads"></a>

We do support compressed response payloads by using a Content-Encoding of gzip on all our responses.

## What are compute units? Why do you have them? <a href="what-are-compute-units-why-do-you-have-them" id="what-are-compute-units-why-do-you-have-them"></a>

Compute units are a way of measuring the resources it takes to serve your traffic, we implemented this to make sure pricing is sustainable and cost-effective as you scale. Check out [this blog post](https://blog.alchemyapi.io/customer-blog-posts/alchemy-usage) for the reason we decided to implement a compute unit system.

You can see a breakdown of each method and its associated compute unit [here](https://docs.alchemyapi.io/documentation/compute-units).

## How do I distinguish between a contract address and a wallet address? <a href="how-do-i-distinguish-between-a-contract-address-and-a-wallet-address" id="how-do-i-distinguish-between-a-contract-address-and-a-wallet-address"></a>

A super easy way to distinguish between these two addresses is by calling [eth_getCode](https://alchemyapi/s/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getcode), which will return contract code if it's a contract and nothing if it's a wallet. Here's an example of both using our composer tool:

* [**0x Contract Address**](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getCode%22%2C%22paramValues%22%3A%5B%220xe41d2489571d322189246dafa5ebde1f4699f498%22%2C%22latest%22%5D%7D)
* [**Vitalik's Wallet Address**](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getCode%22%2C%22paramValues%22%3A%5B%220xAb5801a7D398351b8bE11C439e05C5B3259aeC9B%22%2C%22latest%22%5D%7D)

## What are best practices for avoiding re-orgs when calling JSON-RPC methods? <a href="how-do-i-distinguish-between-a-contract-address-and-a-wallet-address" id="how-do-i-distinguish-between-a-contract-address-and-a-wallet-address"></a>

Alchemy supports [EIP-1898](https://eips.ethereum.org/EIPS/eip-1898), which adds `blockHash` to all JSON-RPC methods that accept a default block parameter. By allowing methods with a block number parameter to also accept a block hash parameter, EIP-1898 protects against re-orgs. 

For instance, if a user executes `eth_call` for block number 10000, but the network undergoes a re-org causing the block 10000 to change, it is unclear if the call evaluated at the old block or the new one. 

{% hint style="info" %}
**Example: **`eth_getBalance `  
{% endhint %}

| Non EIP-1898 Param                              | EIP-1898 Param                                              |
| ----------------------------------------------- | ----------------------------------------------------------- |
| `["0x<some-address>", "0x<some-block-number>"]` | `["0x<some-address>", {"blockHash": "0x<some-blockhash>"}]` |

## How many requests are included in Alchemy free tier and growth tier?

The Alchemy free tier includes **\~4,000,000 requests **each month** **with **free archive data access** and the growth tier (with capped capacity)** **includes **\~6,000,000 requests **each month also with **free archive data access. **However, Alchemy uses a [compute unit model](../documentation/compute-units.md) instead of request limiting so this number will fluctuate depending on which requests you're making. 

## Size of a request header field exceeds server limit

Large request headers will return errors even on methods that should be very small.

You may not always know exactly what headers you are sending in an API call. If you have a global wrapper or a wrapper that is very far up your import tree, then you may not even know that it is adding headers to your requests.

As an example, the Honeycomb Trace wrapper will add extremely large `X-Honeycomb-Trace` headers to every request you send. This will show up on our end as `Request header exceeds LimitRequestFieldSize: X-Honeycomb-Trace` and will be returned to you as a `Size of a request header field exceeds server limits` error.

In general you should avoid such global wrappers. If you want to trace a request then add the headers as-needed.

## My question isn't here, where can I get help? <a href="my-question-isnt-here-where-can-i-get-help" id="my-question-isnt-here-where-can-i-get-help"></a>

Don't worry, we got you. Check out our [support page](https://docs.alchemyapi.io/other/contact-us) for plenty of options!
