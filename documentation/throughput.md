---
description: Understand how throughput works on Alchemy and how to handle them.
---

# Throughput (Rate Limits)

## :thinking: What is throughput?

Throughput is a measure of the number of requests your application can send per second. It is often known as the applications "rate limit".&#x20;

If a large number of requests are sent at the same time, you may hit your throughput capacity. In most instances, this will not affect your user's experience engaging with your application. As long as retries are implemented, the requests will go through in the following second. As a general rule of thumb, if you are experiencing **under 30%** rate limited requests, [using retries](throughput.md#retries) is the best solution.

## :scroll: What are Compute Units Per Second (CUPS)?

CUPS are a measure of the number of [compute units](https://docs.alchemyapi.io/documentation/compute-units) used per second when making requests. Since each request is weighted differently, we base this on the total compute units used rather than the number of requests.

For example, if you send one [`eth_blockNumber`](../apis/ethereum/eth-blocknumber.md) (10 CUs), two [`eth_getLogs`](../apis/arbitrum/eth\_getlogs-1.md) (75 CUs), and two [`eth_call`](../apis/polygon-api/eth\_call.md) (26 CUs) requests in the same second, you will have a total of 310 CUPS.

See the table below for the number of compute units per second (CUPS) permitted for each user type.

| User                                          | CUPS                                      |
| --------------------------------------------- | ----------------------------------------- |
| Free                                          | 330                                       |
| Growth                                        | 660                                       |
| [Enterprise](https://www.alchemy.com/pricing) | [Custom](https://www.alchemy.com/pricing) |

## :inbox\_tray: Error **Response**

When you exceed your capacity, you will receive an error response. This response will be different depending on whether you are connecting to Alchemy using HTTP or [WebSockets](../guides/using-websockets.md).

{% hint style="info" %}
If you would like to test receiving a 429 response, send a POST request to [https://httpstat.us/429](https://httpstat.us/429).
{% endhint %}

### HTTP

You will receive an HTTP 429 (Too Many Requests) response status code.

### **WebSockets**

You will receive a JSON-RPC error response with error code 429. For example, the response might be:

```javascript
{
  "jsonrpc": "2.0",
  "error": {
    "code": 429,
    "message": "Your app has exceeded its compute units per second capacity. If you have retries enabled, you can safely ignore this message. If not, check out https://docs.alchemyapi.io/guides/rate-limits"
  }
}
```

## :right\_facing\_fist: Retries

All you need to do to easily handle 429 errors is to retry the request. This will ensure a great user experiences with any API even if you aren't hitting rate limits. Once you've implemented retries, [test out the behavior](throughput.md#test-rate-limits-retries) to make sure they work as expected.

There are several options for implementing retries.

### **Option 1: Alchemy Web3**

[Alchemyweb3.js](alchemy-web3/) is a Web3.js wrapper that automatically handles retry logic for you. It's the easiest way to build retry logic into all of your requests.&#x20;

### **Option 2: `Retry-After`**

If you are using HTTP and not WebSockets you may receive a `Retry-After` header in the HTTP response. This indicates how long you should wait before making a follow-up request. We still recommend using [exponential backoff ](throughput.md#option-4-exponential-backoff)since `Retry-After` only accepts an integer number of seconds.

### **Option 3: Simple Retries**

If [exponential backoff](throughput.md#option-3-exponential-backoff) poses an challenge to you, a simple retry solution is to wait a random interval between 1000 and 1250 milliseconds after receiving a `429` response, and sending the request again, up to some maximum number of attempts you are willing to wait.

### **Option 4: Exponential Backoff**

Exponential backoff is a standard error-handling strategy for network applications. It is a similar solution to retries, however, instead of waiting random intervals, an exponential backoff algorithm retries requests exponentially, increasing the waiting time between retries up to a maximum backoff time.

#### Example Algorithm:

1. Make a request.
2. If the request fails, wait 1 + `random_number_milliseconds` seconds and retry the request.
3. If the request fails, wait 2 + `random_number_milliseconds` seconds and retry the request.
4. If the request fails, wait 4 + `random_number_milliseconds` seconds and retry the request.
5. And so on, up to a `maximum_backoff` time.
6. Continue waiting and retrying up to some maximum number of retries, but do not increase the wait period between retries.

where:

* The wait time is `min(((2^n)+random_number_milliseconds), maximum_backoff)`, with `n` incremented by 1 for each iteration (request).
* `random_number_milliseconds` is a random number of milliseconds less than or equal to 1000. This helps to avoid cases in which many clients are synchronized by some situation and all retry at once, sending requests in synchronized waves. The value of `random_number_milliseconds` is recalculated after each retry request.
* `maximum_backoff` is typically 32 or 64 seconds. The appropriate value depends on the use case.

The client can continue retrying after it has reached the `maximum_backoff` time. Retries after this point do not need to continue increasing backoff time. For example, suppose a client uses a `maximum_backoff` time of 64 seconds. After reaching this value, the client can retry every 64 seconds. At some point, clients should be prevented from retrying indefinitely.

## 🧪 Test Throughput & Retries

To test out your implementation of retries, we created a test app on each network with a low throughput of 50 Compute Units/Second. Feel free to make requests to this test app on any of the networks using the following API keys:

### Mainnet

#### HTTP

[https://eth-mainnet.alchemyapi.io/v2/J038e3gaccJC6Ue0BrvmpjzxsdfGly9n](https://eth-mainnet.alchemyapi.io/v2/J038e3gaccJC6Ue0BrvmpjzxsdfGly9n)

#### WebSocket

[wss://eth-mainnet.ws.alchemyapi.io/v2/J038e3gaccJC6Ue0BrvmpjzxsdfGly9n](wss://eth-mainnet.ws.alchemyapi.io/v2/J038e3gaccJC6Ue0BrvmpjzxsdfGly9n)

### Goerli

#### HTTP

[https://eth-goerli.alchemyapi.io/v2/AxnmGEYn7VDkC4KqfNSFbSW9pHFR7PDO](https://eth-goerli.alchemyapi.io/v2/AxnmGEYn7VDkC4KqfNSFbSW9pHFR7PDO)

#### WebSocket

[wss://eth-goerli.ws.alchemyapi.io/v2/AxnmGEYn7VDkC4KqfNSFbSW9pHFR7PDO](wss://eth-goerli.ws.alchemyapi.io/v2/AxnmGEYn7VDkC4KqfNSFbSW9pHFR7PDO)

### Kovan

#### **HTTP**

[https://eth-kovan.alchemyapi.io/v2/S56zst1IHTq3hOO4-g8lKW\_0W6C7EMlx](https://eth-kovan.alchemyapi.io/v2/S56zst1IHTq3hOO4-g8lKW\_0W6C7EMlx)

#### **WebSocket**

[wss://eth-kovan.ws.alchemyapi.io/v2/S56zst1IHTq3hOO4-g8lKW\_0W6C7EMlx](wss://eth-kovan.ws.alchemyapi.io/v2/S56zst1IHTq3hOO4-g8lKW\_0W6C7EMlx)

### Rinkeby

#### HTTP

[https://eth-rinkeby.alchemyapi.io/v2/JHuHvKzTtXSgVcKJ4bWAuOgQvUBaVGAV](https://eth-rinkeby.alchemyapi.io/v2/JHuHvKzTtXSgVcKJ4bWAuOgQvUBaVGAV)

#### WebSocket

[wss://eth-rinkeby.ws.alchemyapi.io/v2/JHuHvKzTtXSgVcKJ4bWAuOgQvUBaVGAV](wss://eth-rinkeby.ws.alchemyapi.io/v2/JHuHvKzTtXSgVcKJ4bWAuOgQvUBaVGAV)

### Ropsten

#### HTTP

[https://eth-ropsten.alchemyapi.io/v2/H5VDpwYG31lR46dZlnGy5hrT\_nhicRYc](https://eth-ropsten.alchemyapi.io/v2/H5VDpwYG31lR46dZlnGy5hrT\_nhicRYc)

#### WebSocket

[wss://eth-ropsten.ws.alchemyapi.io/v2/H5VDpwYG31lR46dZlnGy5hrT\_nhicRYc](wss://eth-ropsten.ws.alchemyapi.io/v2/H5VDpwYG31lR46dZlnGy5hrT\_nhicRYc)

## :bulb: Final Tips

Use a different key for each part of your project (e.g., frontend, backend, development) to isolate throughput usage to each use case. This also splits monitoring across different parts of your project, making it easier to debug issues and monitor usage.
