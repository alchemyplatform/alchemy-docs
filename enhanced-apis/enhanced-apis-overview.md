---
description: >-
  Alchemy provides a suite of web3 APIs that dramatically simplify and optimize
  common request patterns to make your life as a developer easier.
---

# Enhanced APIs Overview

Access the blockchain like never before with Alchemy's continually expanding [Enhanced API suite](https://www.alchemy.com/enhanced-apis), and web3 developer tools! Query NFTs by user, trace transactions, get real-time notifications in your dApp, debug smart contracts faster, and do more with Alchemy's supported endpoints.&#x20;

### NFT API

{% content-ref url="nft-api/" %}
[nft-api](nft-api/)
{% endcontent-ref %}

Alchemy's [NFT API](https://www.alchemy.com/nft-api) allows you to quickly get all the information you need to know about NFTs from the blockchain including Ethereum, Polygon, and Flow.&#x20;

Rather than searching, indexing, and storing data yourself - you can now make one request to fetch specific NFT information for both [ERC-721 and ERC-1155 tokens](https://www.alchemy.com/blog/comparing-erc-721-to-erc-1155), like:

* All NFTs owned by an address&#x20;
* Metadata and attributes for a specific NFT token

#### NFT API Tutorials

* [How to Resolve ENS Domains Given a Wallet Address](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api/how-to-get-ens)

### Transfers API&#x20;

{% content-ref url="transfers-api.md" %}
[transfers-api.md](transfers-api.md)
{% endcontent-ref %}

Transfers are a representation of value being exchanged between two accounts, and sometimes users wish to see the historical transactions associated with a specific account or address.&#x20;

Getting historical transactions is currently an extremely challenging and inefficient task, requiring users to scan the entire blockchain and index everything to search for transactions associated with the desired address.&#x20;

With the Transfers API, users can query all historical transactions for an address in one request!

#### Transfer API Tutorials

* [How to get transaction history for an address on Ethereum](transfers-api/how-to-get-transaction-history-for-an-address-on-ethereum.md)
* [How to get historical transactions on Polygon](https://alchemy.com/blog/how-to-get-historical-transactions-on-polygon)
* [How to get all NFT transactions by an address](transfers-api/how-to-get-all-nft-transactions-by-an-address.md)
* [How to get NFTs minted by an address](transfers-api/how-to-get-nfts-minted-by-an-address.md)

### Transaction Receipts API

{% content-ref url="transaction-receipts-api/" %}
[transaction-receipts-api](transaction-receipts-api/)
{% endcontent-ref %}

Fetch all transaction receipts for a **block number** or a **block hash** in one API call using the [`alchemy_getTransactionReceipts`](https://docs.alchemy.com/alchemy/enhanced-apis/transaction-receipts-api#alchemy\_gettransactionreceipts) method - for mainnet and testnets on Ethereum, Polygon, Optimism, and Arbitrum.

The Transaction Receipts API [uses less Compute Units (CUs)](https://docs.alchemy.com/alchemy/documentation/compute-units#raw-method-costs) then batching all the [`eth_getTransactionReceipt`](https://docs.alchemy.com/alchemy/apis/ethereum/eth\_gettransactionreceipt) calls for each transaction hash - saving you on compute cost.

#### Transaction Receipts API Tutorials

* [How to get NFT Contract Creator Address](transaction-receipts-api/how-to-get-nft-contract-creator-address.md)

### Token API

{% content-ref url="token-api/" %}
[token-api](token-api/)
{% endcontent-ref %}

Easily request information on specific tokens such as **metadata** or **balances**.&#x20;

Alchemy currently supports the following endpoints:&#x20;

* `alchemy_getTokenAllowance - r`eturns the amount which the spender is allowed to withdraw from the owner.
* `alchemy_getTokenBalances -` returns token balances for a specific address given a list of contracts.
* `alchemy_getTokenMetadata -` returns metadata (name, symbol, decimals, logo) for a given token contract address.

#### Token API Tutorials

* [How to Get Token Metadata](https://docs.alchemy.com/alchemy/enhanced-apis/token-api/how-to-get-token-metadata)
* [How to Get the Token Balance for an Address](https://docs.alchemy.com/alchemy/enhanced-apis/token-api/how-to-get-token-balance-for-an-address)

### Notify API

{% content-ref url="notify-api/" %}
[notify-api](notify-api/)
{% endcontent-ref %}

Alchemy provides a set of webhooks for tracking address activity, mined transactions, dropped transactions, and gas prices on several blockchains.&#x20;

Developers can manually create webhooks from within the dashboard, or programmatically create webhooks to track activity for 10+ addresses using the Notify API.

#### Notify API Tutorials

* [How to Use Alchemy Notify Webhooks](https://docs.alchemy.com/alchemy/enhanced-apis/notify-api/using-notify)
* [How to Integrate Alchemy Webhooks with Zapier](https://docs.alchemy.com/alchemy/enhanced-apis/notify-api/integrate-alchemy-zapier)
* [How to Build a dApp with Real-Time Transaction Notifications](https://docs.alchemy.com/alchemy/enhanced-apis/notify-api/building-a-dapp-with-real-time-transaction-notifications)

### Trace API

{% content-ref url="trace-api/" %}
[trace-api](trace-api/)
{% endcontent-ref %}

Trace API methods give developers access to the most detailed information about on-chain activity, and allow users to get a full _externality_ trace on any transaction executed on Ethereum.&#x20;

Unlike the log filtering API, you are able to search and filter based only upon address information.&#x20;

Information returned includes the execution of all `CREATE,` `SUICIDE` and all variants of `CALL` together with input data, output data, gas usage, amount transferred and the success status of each individual action.

### Subscription API

{% content-ref url="subscription-api-websockets/" %}
[subscription-api-websockets](subscription-api-websockets/)
{% endcontent-ref %}

Alchemy allows you to subscribe for push updates via Websockets on a variety of real-time alerts, such as pending transactions, log events, new blocks and more!

#### Subscription API Tutorials

* [How to Listen to NFT Mints](https://docs.alchemy.com/alchemy/enhanced-apis/subscription-api-websockets/how-to-listen-to-nft-mints)
