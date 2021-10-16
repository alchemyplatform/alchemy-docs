---
description: >-
  The Token API allows you to easily get token information, minimizing the
  number of necessary requests.
---

# Token API

{% hint style="info" %}
Unless otherwise specified, Alchemy methods will return decoded values in their responses (e.g., for token decimals, 18 will be returned instead of "0x12"). We plan to eventually normalize all methods in our enhanced API to return decoded values.
{% endhint %}

## alchemy_getTokenAllowance

#### Details

Returns the amount which the spender is allowed to withdraw from the owner.

#### Parameters

1. `Object` - An object with the following fields:
   * `contract`: `DATA`, 20 Bytes - The address of the token contract.
   * `owner`: `DATA`, 20 Bytes - The address of the token owner.
   * `spender`: `DATA`, 20 Bytes - The address of the token spender.

#### Returns

`String` - The allowance amount.

#### [Example](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22alchemy_getTokenAllowance%22%2C%22paramValues%22%3A%5B%7B%22contract%22%3A%220xE41d2489571d322189246DaFA5ebDe1F4699F498%22%2C%22owner%22%3A%220xe8095A54C83b069316521835408736269bfb389C%22%2C%22spender%22%3A%220x3Bcc5bD4abBc853395eBE5103b7DbA20411E38db%22%7D%5D%7D)

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"alchemy_getTokenAllowance","params":[{"contract":"0xE41d2489571d322189246DaFA5ebDe1F4699F498", "owner":"0xe8095A54C83b069316521835408736269bfb389C", "spender":"0x3Bcc5bD4abBc853395eBE5103b7DbA20411E38db"}],"id": 1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"alchemy_getTokenAllowance",
    "params":[{"contract":"0xE41d2489571d322189246DaFA5ebDe1F4699F498", "owner":"0xe8095A54C83b069316521835408736269bfb389C", "spender":"0x3Bcc5bD4abBc853395eBE5103b7DbA20411E38db"}],
    "id":83
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
  "jsonrpc": "2.0",
  "id": 83,
  "result": "10963536149943846000",
}
```

## alchemy_getTokenBalances

#### Details

Returns token balances for a specific address given a list of contracts.

{% hint style="warning" %}
This method returns hex encoded values in the `tokenBalance` fields.
{% endhint %}

#### Parameters

1. `DATA`, 20 Bytes - The address for which token balances will be checked
2. One of:
   1. `Array` - A list of contract addresses 
   2. The `String`"DEFAULT_TOKENS" - denotes a query for the top 100 tokens by 24 hour volume 

#### Returns

`Object` - An object with the following fields:

* `address`: `DATA`, 20 Bytes - The address for which token balances were checked
* `tokenBalances`: `Array` - returns an array of token balance objects. Each object contains:
  * `contractAddress`
  * `tokenBalance`  
  * `error`
  *  One of `tokenBalance` or `error` will be null.

#### [Example](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22alchemy_getTokenBalances%22%2C%22paramValues%22%3A%5B%220x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be%22%2C%22%5B%5C%220x607f4c5bb672230e8672085532f7e901544a7375%5C%22%2C%20%5C%220x618e75ac90b12c6049ba3b27f5d5f8651b0037f6%5C%22%2C%20%5C%220x63b992e6246d88f07fc35a056d2c365e6d441a3d%5C%22%2C%20%5C%220x6467882316dc6e206feef05fba6deaa69277f155%5C%22%2C%20%5C%220x647f274b3a7248d6cf51b35f08e7e7fd6edfb271%5C%22%5D%22%5D%7D)

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"alchemy_getTokenBalances","params": ["0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be", ["0x607f4c5bb672230e8672085532f7e901544a7375", "0x618e75ac90b12c6049ba3b27f5d5f8651b0037f6", "0x63b992e6246d88f07fc35a056d2c365e6d441a3d", "0x6467882316dc6e206feef05fba6deaa69277f155", "0x647f274b3a7248d6cf51b35f08e7e7fd6edfb271"]],"id":"42"}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"alchemy_getTokenBalances",
    "params":["0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be", ["0x607f4c5bb672230e8672085532f7e901544a7375", "0x618e75ac90b12c6049ba3b27f5d5f8651b0037f6", "0x63b992e6246d88f07fc35a056d2c365e6d441a3d", "0x6467882316dc6e206feef05fba6deaa69277f155", "0x647f274b3a7248d6cf51b35f08e7e7fd6edfb271"]],
    "id":42
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
  "jsonrpc":"2.0",
  "id":42,
  "result": {
    "address": "0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be"},
    "tokenBalances": [{"contractAddress": "0x607f4c5bb672230e8672085532f7e901544a7375", "tokenBalance": "0x00000000000000000000000000000000000000000000000000044d06e87e858e", "error": null}, {"contractAddress": "0x618e75ac90b12c6049ba3b27f5d5f8651b0037f6", "tokenBalance": "0x0000000000000000000000000000000000000000000000000000000000000000", "error": null}, {"contractAddress": "0x63b992e6246d88f07fc35a056d2c365e6d441a3d", "tokenBalance": "0x0000000000000000000000000000000000000000000000000000000000000000", "error": null}, {"contractAddress": "0x6467882316dc6e206feef05fba6deaa69277f155", "tokenBalance": "0x0000000000000000000000000000000000000000000000000000000000000000", "error": null}, {"contractAddress": "0x647f274b3a7248d6cf51b35f08e7e7fd6edfb271", "tokenBalance": "0x0000000000000000000000000000000000000000000000000000000000000000", "error": null}]
}
```

## alchemy_getTokenMetadata

#### Details

Returns metadata (name, symbol, decimals, logo) for a given token contract address.

`name` ,`symbol`and`decimals`are optional methods in the ERC-20 token standard. Therefore, not all contracts will respond correctly to calls requesting this information. While the incorrectness or absence of`name `and `symbol`can be an inconvenience, having the correct `decimals`is absolutely crucial in displaying token balances or converting user inputs accurately when communicating with the contract.

Alchemy maintains a regularly updated database of contract metadata, with values gathered and intelligently merged from the contracts themselves along with several other sources. Alchemy is therefore able to provide clean, accurate, up-to-date metadata for contracts that may be missing any of these methods or have changed their name or symbol since contract publication.

As a bonus, token logo images are available for many of the popular tokens.

#### Parameters

1. `DATA`, 20 Bytes - The address of the token contract.

#### Returns

`Object` - An object with the following fields:

* `name`: `String` - The token's name. `null` if not defined in the contract and not available from other sources.
* `symbol`: `String` - The token's symbol. `null` if not defined in the contract and not available from other sources.
* `decimals`: `Number` - The number of decimals of the token. `null` if not defined in the contract and not available from other sources.
* `logo`: `String` - URL of the token's logo image. `null` if not available.

#### [Example](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22alchemy_getTokenMetadata%22%2C%22paramValues%22%3A%5B%220x1985365e9f78359a9B6AD760e32412f4a445E862%22%5D%7D)

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"alchemy_getTokenMetadata","params": ["0x1985365e9f78359a9B6AD760e32412f4a445E862"], "id": 1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"alchemy_getTokenMetadata",
    "params":["0x1985365e9f78359a9B6AD760e32412f4a445E862"],
    "id":1
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "logo": "https://static.alchemyapi.io/images/assets/1104.png",
    "symbol": "REP",
    "decimals": 18,
    "name": "Augur"
  }
}
```
