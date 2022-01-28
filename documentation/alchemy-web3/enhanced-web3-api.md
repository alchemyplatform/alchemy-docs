---
description: >-
  Alchemy offers several enhanced API methods on top of the existing web3.js
  calls.
---

# Enhanced Web3 API

#### _\*\*Get access to \*\*_[_**Alchemy for free here**_](https://alchemy.com/?r=e68b2f77-7fc7-4ef7-8e9c-cdfea869b9b5)_**.**_

To learn more about the standard web3.js API calls, check out their documentation [here](https://web3js.readthedocs.io/en/v1.2.9/).

## :sunglasses: Enhanced API Calls

### web3.alchemy.getTokenAllowance({contract, owner, spender})

Returns token balances for a specific address given a list of contracts.

#### **Parameters:**

An object with the following fields:

* `contract`: The address of the token contract.
* `owner`: The address of the token owner.
* `spender`: The address of the token spender.

#### **Returns:**

The allowance amount, as a string representing a base-10 number.

### web3.alchemy.getTokenBalances(address, contractAddresses)

Returns token balances for a specific address given a list of contracts.

#### **Parameters:**

1. `address`: The address for which token balances will be checked.
2. `contractAddresses`: An array of contract addresses.

#### **Returns:**

An object with the following fields:

* `address`: The address for which token balances were checked.
* `tokenBalances`: An array of token balance objects. Each object contains:
  * `contractAddress`: The address of the contract.
  * `tokenBalance`: The balance of the contract, as a string representing a base-10 number.
  * `error`: An error string. One of this or `tokenBalance` will be `null`.

### web3.alchemy.getTokenMetadata(address)

Returns metadata (name, symbol, decimals, logo) for a given token contract address.

#### **Parameters:**

`address`: The address of the token contract.

#### **Returns:**

An object with the following fields:

* `name`: The token's name. `null` if not defined in the contract and not available from other sources.
* `symbol`: The token's symbol. `null` if not defined in the contract and not available from other sources.
* `decimals`: The token's decimals. `null` if not defined in the contract and not available from other sources.
* `logo`: URL of the token's logo image. `null` if not available.

### web3.eth.subscribe("alchemy\_fullPendingTransactions")

Subscribes to pending transactions, similar to the standard Web3 call `web3.eth.subscribe("pendingTransactions")`, but differs in that it emits full transaction information rather than just transaction hashes.

Note that the argument passed to this function is `"alchemy_fullPendingTransactions"`, which is different from the string used in raw [`eth_subscribe`](../../apis/ethereum/#eth\_subscribe) JSON-RPC calls, where it is `"alchemy_newFullPendingTransactions"` instead. This is confusing, but it is also consistent with the existing Web3 subscription APIs (for example: `web3.eth.subscribe("pendingTransactions")` vs `"newPendingTransactions"` in raw JSON-RPC).

### web3.alchemy.getAssetTransfers({fromBlock, toBlock, fromAddress, toAddress, contractAddresses, excludeZeroValue, maxCount, category, pageKey})

Returns an array of asset transfers based on the specified parameters.

#### **Parameters:**

* Parameters:
  * Object - An object with the following fields (required):
    * `fromBlock`: in hex string or "latest". optional (default to latest)
    * `toBlock`: in hex string or "latest". optional (default to latest)
    * `fromAddress`: in hex string. optional
    * `toAddress`: in hex string. optional.
    * `contractAddresses`: list of hex strings. optional.
    * `category`: list of any combination of `external`, `token`. optional, if blank, would include both.
    * `excludeZeroValue:` a`Boolean` . optional (default `true`)
    * `maxCount`: max number of results to return per call. optional (default `1000)`
    * `pageKey`: for [pagination](../../enhanced-apis/transfers-api.md#pagination). optional
* `fromBlock` and `toBlock` are inclusive. Both default to `latest` if not specified.
* `fromAddress` and `toAddress` will be `AND`ed together when filtering. If left blank, will indicate a wildcard (any address).
* `contractAddresses` only applies to `token` category transfers (eth log events). The list of addresses are `OR`ed together. This filter will be `AND`ed with `fromAddress` and `toAddress` for eth log events. If empty, or unspecified, it will be taken as a wildcard (any contract addresses).
* `category`: `external` for primary level eth transfers, `token` for contract event transfers.
* `excludeZeroValue:` an optional `Boolean` to exclude asset transfers with a value field of zero (defaults to `true`)
* `maxCount`: The maximum number of results to return per call. Default and max will be 1000.
* `pageKey`: If left blank, will return the first 1000 or `maxCount` number of results. If more results are available, a uuid pageKey will be returned in the response. Pass that uuid into `pageKey` to fetch the next 1000 or maxCount. See section on [pagination](../../enhanced-apis/transfers-api.md#pagination).

### EIP 1559

#### `web3.eth.getFeeHistory(blockRange, startingBlock, percentiles[])`

Fetches the fee history for the given block range as per the [eth spec](https://github.com/ethereum/eth1.0-specs/blob/master/json-rpc/spec.json).

**Parameters**

* `blockRange`: The number of blocks for which to fetch historical fees. Can be an integer or a hex string.
* `startingBlock`: The block to start the search. The result will look backwards from here. Can be a hex string or a predefined block string e.g. "latest".
* `percentiles`: (Optional) An array of numbers that define which percentiles of reward values you want to see for each block.

**Returns**

An object with the following fields:

* `oldestBlock`: The oldest block in the range that the fee history is being returned for.
* `baseFeePerGas`: An array of base fees for each block in the range that was looked up. These are the same values that would be returned on a block for the `eth_getBlockByNumber` method.
* `gasUsedRatio`: An array of the ratio of gas used to gas limit for each block.
* `reward`: Only returned if a percentiles parameter was provided. Each block will have an array corresponding to the percentiles provided. Each element of the nested array will have the tip provided to miners for the percentile given. So if you provide \[50, 90] as the percentiles then each block will have a 50th percentile reward and a 90th percentile reward.

**Example**

Method call

```
web3.eth.getFeeHistory(4, "latest", [25, 50, 75]).then(console.log);
```

Logged response

```
{
  oldestBlock: 12930639,
  reward: [
    [ '0x649534e00', '0x66720b300', '0x826299e00' ],
    [ '0x649534e00', '0x684ee1800', '0x7ea8ed400' ],
    [ '0x5ea8dd480', '0x60db88400', '0x684ee1800' ],
    [ '0x59682f000', '0x5d21dba00', '0x5d21dba00' ]
  ],
  baseFeePerGas: [ '0x0', '0x0', '0x0', '0x0', '0x0' ],
  gasUsedRatio: [ 0.9992898398856537, 0.9999566454373825, 0.9999516, 0.9999378 ]
}
```

#### `web3.eth.getMaxPriorityFeePerGas()`

Returns a quick estimate for `maxPriorityFeePerGas` in EIP 1559 transactions. Rather than using `feeHistory` and making a calculation yourself you can just use this method to get a quick estimate. Note: this is a geth-only method, but Alchemy handles that for you behind the scenes.

**Parameters**

None!

**Returns**

A hex, which is the `maxPriorityFeePerGas` suggestion. You can plug this directly into your transaction field.

**Example**

Method call

```
web3.eth.getMaxPriorityFeePerGas().then(console.log);
```

Logged response

```
0x560de0700
```

\\
