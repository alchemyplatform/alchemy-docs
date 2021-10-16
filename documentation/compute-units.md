---
description: Explanation for what Compute Units are and how we use them.
---

# 🔩 Compute Units \(CUs\)

Compute units are a measure of the total computational resources your apps are using on Alchemy. You can think of this as how you would pay Amazon for compute usage on AWS. Some queries are lightweight and fast to run \(e.g., eth\_blockNumber\) and others can be more intense \(e.g., large eth\_getLogs queries\). Each method is assigned a quantity of compute units, derived from global average durations of each method.

We're obsessed with providing the most developer-friendly experience across our platform, and this doesn't stop at pricing. Pricing on compute units allows us to provide developers with the most fair and transparent pricing possible. No more over-paying for simple requests, you only pay for what you use, period.

## Raw Method Costs

| Method | CU |
| :--- | :--- |
| eth\_uninstallFilter | 10 |
| eth\_accounts | 10 |
| eth\_blockNumber | 10 |
| eth\_chainId | 10 |
| eth\_protocolVersion | 10 |
| eth\_syncing | 10 |
| net\_listening | 10 |
| net\_version | 10 |
| eth\_subscribe | 10 |
| eth\_unsubscribe | 10 |
| eth\_feeHistory | 10 |
| eth\_maxPriorityFeePerGas | 10 |
| eth\_createAccessList | 10 |
| bor\_getAuthor | 10 |
| bor\_getCurrentProposer | 10 |
| bor\_getCurrentValidators | 10 |
| bor\_getRootHash | 10 |
| bor\_getSignersAtHash | 10 |
| eth\_getTransactionReceipt | 15 |
| eth\_getUncleByBlockHashAndIndex | 15 |
| eth\_getUncleByBlockNumberAndIndex | 15 |
| eth\_getTransactionByBlockHashAndIndex | 15 |
| eth\_getTransactionByBlockNumberAndIndex | 15 |
| eth\_getUncleCountByBlockHash | 15 |
| eth\_getUncleCountByBlockNumber | 15 |
| web3\_clientVersion | 15 |
| web3\_sha3 | 15 |
| alchemy\_getTokenMetadata | 16 |
| eth\_getBlockByNumber | 16 |
| eth\_getStorageAt | 17 |
| eth\_getTransactionByHash | 17 |
| trace\_get | 17 |
| alchemy\_getTokenAllowance | 19 |
| eth\_gasPrice | 19 |
| eth\_getBalance | 19 |
| eth\_getCode | 19 |
| eth\_getFilterChanges | 20 |
| eth\_newBlockFilter | 20 |
| eth\_newFilter | 20 |
| eth\_newPendingTransactionFilter | 20 |
| eth\_getBlockTransactionCountByHash | 20 |
| eth\_getBlockTransactionCountByNumber | 20 |
| eth\_getProof | 21 |
| eth\_getBlockByHash | 21 |
| trace\_block | 24 |
| parity\_getBlockReceipts | 24 |
| erigon\_forks | 24 |
| erigon\_getHeaderByHash | 24 |
| erigon\_getHeaderByNumber | 24 |
| erigon\_getLogsByHash | 24 |
| erigon\_issuance | 24 |
| eth\_getTransactionCount | 26 |
| eth\_call | 26 |
| alchemy\_getTokenBalances | 26 |
| trace\_transaction | 26 |
| eth\_getFilterLogs | 75 |
| eth\_getLogs | 75 |
| trace\_call | 75 |
| trace\_callMany | 75 |
| trace\_rawTransaction | 75 |
| trace\_filter | 75 |
| eth\_estimateGas | 87 |
| alchemy\_getAssetTransfers | 150 |
| eth\_sendRawTransaction | 250 |
| debug\_traceTransaction | 309 |
| trace\_replayTransaction | 2983 |
| trace\_replayBlockTransactions | 2983 |

## WebSocket and Webhook Costs

Webhook and WebSocket subscriptions on Alchemy are priced based on **bandwidth:** the amount of data delivered as part of the subscription.

Each subscription type is priced identically, per byte:

| Bandwidth | CU |
| :--- | :--- |
| 1 byte | .04 |

On average, a typical webhook or WebSocket subscription event is about 1000 bytes, so would consume 40 compute units. Note that this can vary significantly based on the specific event delivered \([`alchemy_newFullPendingTransactions`](../guides/using-websockets.md#1-alchemy_newfullpendingtransactions) subscription type has a much higher compute unit cost than others\).

## On-Demand Compute \(Growth Tier Only\)

Turning on autoscale gives you instant access to on-demand compute at volume discounts. No more worrying about your node going down due to a spike in traffic, or even waiting days for new nodes to sync. Autoscale gives you infinite scalability at affordable prices.

| Monthly Compute Units \(CU\) | Price Per Unit |
| :--- | :--- |
| 0-150,000,000 | $0.00 |
| 150,000,000-200,000,000 | $0.0000032 \($3.20/1M CU\) |
| 200,000,000-300,000,000 | $0.0000025 \($2.50/1M CU\) |
| 300,000,000-450,000,000 | $0.0000020 \($2.00/1M CU\) |
| 450,000,000-1,025,000,000 | $0.0000016 \($1.60/1M CU\) |
| 1,025,000,000+ | $0.0000012 \($1.20/1M CU\) |

## Rate Limits \(CUPS\)

[Rate Limits](../guides/rate-limits.md) serve to protect users from malicious actors or runaway scripts. Each tier has prioritized rate limit allocations designed for ultimate reliability.

CUPS are a measure of the number of compute units used per second when making requests. Since each request is weighted differently, we base this on the total compute units used rather than the number of requests.

For example, if you send one `eth_blockNumber` \(10 CUs\), two `eth_getLogs` \(75 CUs\), and two `eth_call` \(26 CUs\) requests in the same second, you will have a total of 310 CUPS.

| User | CUPS |
| :--- | :--- |
| Free | 330 |
| Growth | 660 |
| Enterprise | Custom |

If you are experiencing rate limits, or want create a more robust and reliable experience for your users, we recommend [implementing retries](https://app.gitbook.com/@alchemyapi/s/alchemy/~/drafts/-MQsfYK26fbJzMbpYgTc/guides/rate-limits#retries).

