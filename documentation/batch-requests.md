---
description: >-
  Best practices for making batch requests on Ethereum, Polygon, Optimism, and
  Arbitrum.
---

# Batch Requests

## What is a batch request?

Batch requests are single HTTP requests that contain multiple API calls nested within it.

Generally speaking, Alchemy does not recommend using batch requests as they can be less reliable compared to individual API calls.&#x20;

## What is the batch request limit over HTTP?

The batch request limit over HTTP for all methods and chains is 100 requests per batch, above this limit requests are likely to be less reliable. &#x20;

## What is the batch request limit over WebSockets?

The maximum size of a JSON-RPC `batch` request that can be sent over a WebSocket connection is 20.&#x20;

## How do you make a batch request?

Batch requests are formatted the same as individual API requests, however the body of the request is an array containing the individual API calls you wish to make rather than the single API call. Check out the example with [eth\_blockNumber](../apis/ethereum/eth-blocknumber.md) below:

#### Single eth\_blockNumber request

```
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":0}'
```

#### Batch eth\_blockNumber request&#x20;

```
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '[{"jsonrpc": "2.0", "id": 1, "method": "eth_blockNumber", "params": []},
{"jsonrpc": "2.0", "id": 2, "method": "eth_blockNumber", "params": []},
{"jsonrpc": "2.0", "id": 3, "method": "eth_blockNumber", "params": []},
{"jsonrpc": "2.0", "id": 4, "method": "eth_blockNumber", "params": []}]'
```

## When should I use batch requests?

Alchemy does not recommend using batch requests for any methods. These requests tend to be less performant than sending them individually, so if you’re trying to optimize speed, this might not be the best option.
