---
description: >-
  The Token API allows you to easily get token information, minimizing the
  number of necessary requests.
---

# Token API

{% hint style="info" %}
**NOTE:** This endpoint is currently only available on Ethereum Mainnet.\
[Check chains currently available](https://docs.alchemy.com/alchemy/apis/feature-support-by-chain) for the Token API.
{% endhint %}

With the Token API, you can easily request information on specific tokens such as metadata or balances. Alchemy currently supports the following endpoints:&#x20;

* ``[`alchemy_getTokenAllowance`](alchemy\_gettokenallowance.md): Returns the amount which the spender is allowed to withdraw from the owner.
* ``[`alchemy_getTokenBalances`](alchemy\_gettokenbalances.md): Returns token balances for a specific address given a list of contracts.
* ``[`alchemy_getTokenMetadata`](alchemy\_gettokenmetadata.md): Returns metadata (name, symbol, decimals, logo) for a given token contract address.

Want to get started with code but not sure how to? Take a look at our [Quickstart Guide](token-api-quickstart-guide.md).

{% content-ref url="token-api-quickstart-guide.md" %}
[token-api-quickstart-guide.md](token-api-quickstart-guide.md)
{% endcontent-ref %}

{% hint style="info" %}
Unless otherwise specified, Alchemy methods will return decoded values in their responses (e.g., for token decimals, 18 will be returned instead of "0x12"). We plan to eventually normalize all methods in our enhanced API to return decoded values.
{% endhint %}
