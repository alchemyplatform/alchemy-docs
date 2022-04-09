---
description: Explanation for what Compute Units are and how we use them.
---

# Compute Units (CUs)

Compute units are a measure of the total computational resources your apps are using on Alchemy. You can think of this as how you would pay Amazon for compute usage on AWS. Some queries are lightweight and fast to run (e.g., eth\_blockNumber) and others can be more intense (e.g., large eth\_getLogs queries). Each method is assigned a quantity of compute units, derived from global average durations of each method.

We're obsessed with providing the most developer-friendly experience across our platform, and this doesn't stop at pricing. Pricing on compute units allows us to provide developers with the most fair and transparent pricing possible. No more over-paying for simple requests, you only pay for what you use, period.

## Pricing Plans

| Feature                                                                                                                                                                        |       Free Tier      |      Growth Tier     |    Enterprise Tier   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------: | :------------------: | :------------------: |
| Compute Units                                                                                                                                                                  |      300,000,000     |      400,000,000     |        Custom        |
| Approx. # Requests                                                                                                                                                             |      12,000,000      |      16,000,000      |        Custom        |
| # of apps                                                                                                                                                                      |           5          |          15          |       Unlimited      |
| Throughput (CUPS)                                                                                                                                                              |          330         |          660         |        Custom        |
| Full Archive Data                                                                                                                                                              | :white\_check\_mark: | :white\_check\_mark: | :white\_check\_mark: |
| Supernode                                                                                                                                                                      | :white\_check\_mark: | :white\_check\_mark: | :white\_check\_mark: |
| Build                                                                                                                                                                          | :white\_check\_mark: | :white\_check\_mark: | :white\_check\_mark: |
| Monitor                                                                                                                                                                        | :white\_check\_mark: | :white\_check\_mark: | :white\_check\_mark: |
| Notify                                                                                                                                                                         | :white\_check\_mark: | :white\_check\_mark: | :white\_check\_mark: |
| Multichain (Mainnet & Testets)                                                                                                                                                 | :white\_check\_mark: | :white\_check\_mark: | :white\_check\_mark: |
| No daily request limit                                                                                                                                                         | :white\_check\_mark: | :white\_check\_mark: | :white\_check\_mark: |
| 24/7 Support                                                                                                                                                                   | :white\_check\_mark: | :white\_check\_mark: | :white\_check\_mark: |
| Enhanced APIS ([NFT](../enhanced-apis/nft-api/), [Transfers](../enhanced-apis/transfers-api.md), [Token](../enhanced-apis/token-api/), [Notify](../enhanced-apis/notify-api/)) | :white\_check\_mark: | :white\_check\_mark: | :white\_check\_mark: |
| [Trace](../enhanced-apis/trace-api.md), [Parity](../enhanced-apis/block-api-beta.md), [Debug](../enhanced-apis/debug-api.md) APIs                                              |          :x:         | :white\_check\_mark: | :white\_check\_mark: |
| Auto-scaling Compute Units                                                                                                                                                     |          :x:         | :white\_check\_mark: | :white\_check\_mark: |
| Custom SLAs                                                                                                                                                                    |          :x:         |          :x:         | :white\_check\_mark: |
| Committed Use Discounts                                                                                                                                                        |          :x:         |          :x:         | :white\_check\_mark: |
| Pay in Crypto or NFTs                                                                                                                                                          |          :x:         |          :x:         | :white\_check\_mark: |

## Raw Method Costs

| Method                                   | CU                                              |
| ---------------------------------------- | ----------------------------------------------- |
| net\_version                             | 0                                               |
| eth\_chainId                             | 0                                               |
| eth\_syncing                             | 0                                               |
| eth\_protocolVersion                     | 0                                               |
| net\_listening                           | 0                                               |
| eth\_uninstallFilter                     | 10                                              |
| eth\_accounts                            | 10                                              |
| eth\_blockNumber                         | 10                                              |
| eth\_subscribe                           | 10                                              |
| eth\_unsubscribe                         | 10                                              |
| eth\_feeHistory                          | 10                                              |
| eth\_maxPriorityFeePerGas                | 10                                              |
| eth\_createAccessList                    | 10                                              |
| bor\_getAuthor                           | 10                                              |
| bor\_getCurrentProposer                  | 10                                              |
| bor\_getCurrentValidators                | 10                                              |
| bor\_getRootHash                         | 10                                              |
| bor\_getSignersAtHash                    | 10                                              |
| eth\_getTransactionReceipt               | 15                                              |
| eth\_getUncleByBlockHashAndIndex         | 15                                              |
| eth\_getUncleByBlockNumberAndIndex       | 15                                              |
| eth\_getTransactionByBlockHashAndIndex   | 15                                              |
| eth\_getTransactionByBlockNumberAndIndex | 15                                              |
| eth\_getUncleCountByBlockHash            | 15                                              |
| eth\_getUncleCountByBlockNumber          | 15                                              |
| web3\_clientVersion                      | 15                                              |
| web3\_sha3                               | 15                                              |
| alchemy\_getTokenMetadata                | 16                                              |
| eth\_getBlockByNumber                    | 16                                              |
| eth\_getStorageAt                        | 17                                              |
| eth\_getTransactionByHash                | 17                                              |
| trace\_get                               | 17                                              |
| alchemy\_getTokenAllowance               | 19                                              |
| eth\_gasPrice                            | 19                                              |
| eth\_getBalance                          | 19                                              |
| eth\_getCode                             | 19                                              |
| eth\_getFilterChanges                    | 20                                              |
| eth\_newBlockFilter                      | 20                                              |
| eth\_newFilter                           | 20                                              |
| eth\_newPendingTransactionFilter         | 20                                              |
| eth\_getBlockTransactionCountByHash      | 20                                              |
| eth\_getBlockTransactionCountByNumber    | 20                                              |
| eth\_getProof                            | 21                                              |
| eth\_getBlockByHash                      | 21                                              |
| trace\_block                             | 24                                              |
| erigon\_forks                            | 24                                              |
| erigon\_getHeaderByHash                  | 24                                              |
| erigon\_getHeaderByNumber                | 24                                              |
| erigon\_getLogsByHash                    | 24                                              |
| erigon\_issuance                         | 24                                              |
| eth\_getTransactionCount                 | 26                                              |
| eth\_call                                | 26                                              |
| alchemy\_getTokenBalances                | 26                                              |
| trace\_transaction                       | 26                                              |
| eth\_getFilterLogs                       | 75                                              |
| eth\_getLogs                             | 75                                              |
| trace\_call                              | 75                                              |
| trace\_callMany                          | 75                                              |
| trace\_rawTransaction                    | 75                                              |
| trace\_filter                            | 75                                              |
| eth\_estimateGas                         | 87                                              |
| alchemy\_getAssetTransfers               | 150                                             |
| alchemy\_getTransactionReceipts          | 250                                             |
| eth\_sendRawTransaction                  | 250                                             |
| debug\_traceTransaction                  | 309                                             |
| parity\_getBlockReceipts                 | 500                                             |
| eth\_getBlockReceipts                    | 500                                             |
| trace\_replayTransaction                 | 2983                                            |
| trace\_replayBlockTransactions           | 2983                                            |
| batch\*                                  | CU of method \* # of times the method is called |

\*To view the batch request breakdown in the dashboard click on "raw request"&#x20;

## WebSocket and Webhook Costs

Webhook and WebSocket subscriptions on Alchemy are priced based on **bandwidth:** the amount of data delivered as part of the subscription.

Each subscription type is priced identically, per byte:

| Bandwidth | CU  |
| --------- | --- |
| 1 byte    | .04 |

On average, a typical webhook or WebSocket subscription event is about 1000 bytes, so would consume 40 compute units. Note that this can vary significantly based on the specific event delivered ([`alchemy_newFullPendingTransactions`](../guides/using-websockets.md#1-alchemy\_newfullpendingtransactions) subscription type has a much higher compute unit cost than others).

## Auto-Scale Compute (Growth Tier Only)

Turning on autoscale gives you instant access to on-demand compute at volume discounts. No more worrying about your node going down due to a spike in traffic, or even waiting days for new nodes to sync. Autoscale gives you infinite scalability at affordable prices.

| Monthly Compute Units (CU) | Price  |
| -------------------------- | ------ |
| 400,000,000                | $49.00 |
| Every 1,000,000 over 400M  | $1.20  |

## Throughput (CUPS)

Each application has reserved dedicated [throughput](compute-units.md#rate-limits-cups), measured in Compute Units per Second. Applications can greatly exceed their dedicated throughputs based off of elastic demand in our system.&#x20;

Since each request is weighted differently, we base this on the total compute units used rather than the number of requests. For example, if you send one `eth_blockNumber` (10 CUs), two `eth_getLogs` (75 CUs), and two `eth_call`(26 CUs) requests in the same second, you will have a total of 212 CUPS. _Note that even if your application limit is 200 CUPS, this throughput will likely be allowed still by the system!_

| User       | CUPS   |
| ---------- | ------ |
| Free       | 330    |
| Growth     | 660    |
| Enterprise | Custom |

If you are experiencing throughput errors, or want create a more robust and reliable experience for your users, we recommend [implementing retries](../guides/rate-limits.md#retries).
