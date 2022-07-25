---
description: How to handle NFT API error codes
---

# Handling errors

While we work to ensure that every NFT's metadata is returned when requested from the API, there are various reasons why we may not able to fulfill your request.&#x20;

{% hint style="info" %}
If present, errors in metadata fulfillment will appear in the `error` field of the response payload.&#x20;
{% endhint %}

Here are the various errors you can receive and what they mean.

### Token does not exist

> [Composer Example](https://eth-mainnet.g.alchemy.com/demo/v1/getNFTMetadata?contractAddress=0x60e4d786628fea6478f785a6d7e704777c86a7c6\&tokenId=2079999)\
> Contract Address = 0x60e4d786628fea6478f785a6d7e704777c86a7c6\
> Token ID = 2079999

#### Why?

In order to fetch the metadata for a given NFT, we call one of two potential methods on the contract with the token ID as the input. For ERC721 contracts, we call the `tokenURI` method. For ERC1155 contracts, we call `uri`. These two methods take in a token ID and return a uri which points to the metadata for that token ID.

If we pass a token ID into the method that the contract does not recognize, we will get one of several errors that each mean that the token does not exist. Essentially, the contract does not recognize the token ID that you provided.

[See the specific error for the example above via Etherscan's contract interface. ](https://etherscan.io/address/0x60e4d786628fea6478f785a6d7e704777c86a7c6#readContract)

![The contract throws an exception on etherscan](<../../../.gitbook/assets/image (39) (1).png>)

#### Next Steps

More often than not, a contract will return a "token does not exist" error when the token is _not yet minted_. It's important to note that the token ID may, however, exist at a later date once it is minted. If you are confident that the token ID you provided _should_ exist, you can retry your query at a later date. Once the token has been minted and recognized by our service, your request may succeed. Note that some contracts do return un-minted tokens, so this error message is not to be used as an indicator for whether a token has been minted yet.

The second most common reason for a "token does not exist" error is that the token truly does not exist! For older contracts that have been completely minted, this error should be trusted. Repeated attempts at finding metadata will fail simply because it does not exist!&#x20;

### Malformed token uri

> [Composer Example ](https://eth-mainnet.g.alchemy.com/demo/v1/getNFTMetadata?contractAddress=0xbfde6246df72d3ca86419628cac46a9d2b60393c\&tokenId=14506)
>
> Contract Address: 0xbfde6246df72d3ca86419628cac46a9d2b60393c\
> Token ID: 14506

#### Why?

Once we know where an NFT's metadata is stored (by calling `tokenURI` or `uri` on the contract as described above), we visit the resulting website in order to access the metadata. However, if the website that is returned by `tokenURI` or `uri` is malformed, then we cannot visit it and return this error instead. By "malformed" we mean any website that cannot be visited. In the example above (click on it to see) you can see that the `tokenUri.raw` field is an empty string. That is because the `tokenURI` method of that contract returned an empty string instead of a valid website.

You can see the empty response in etherscan's contract interface here: [https://etherscan.io/address/0xbfde6246df72d3ca86419628cac46a9d2b60393c#readContract](https://etherscan.io/address/0xbfde6246df72d3ca86419628cac46a9d2b60393c#readContract)

![The contract returns a malformed URI on etherscan](<../../../.gitbook/assets/image (40) (1) (1).png>)

#### Next Steps

Unfortunately, there isn't much you can do here. If you are the project owner or you happen to know a special URI that Alchemy should return for a contract that is _not_ included in the `tokenURI` or `uri` methods, then let us know!

### Failed to get token uri

> [Composer Example](https://eth-mainnet.g.alchemy.com/demo/v1/getNFTMetadata?contractAddress=0xffdf17652cca46eb98a214cb3e413c8661241e49\&tokenId=7818)\
> Contract Address: 0xffdf17652cca46eb98a214cb3e413c8661241e49
>
> Token ID: 7818

#### Why?

In the "token does not exist" section we talked about how a contract can throw an exception when we ask for the `tokenURI`. If the exception indicates that the token does not exist, then we return the "token does not exist" error. If the exception is _any other type_ then we return the generic "Failed to get token uri" error.

You can see the specific error for the example above in etherscan's contract interface here: [https://etherscan.io/address/0xffdf17652cca46eb98a214cb3e413c8661241e49#readContract](https://etherscan.io/address/0xffdf17652cca46eb98a214cb3e413c8661241e49#readContract)

![The contract throws an exception on etherscan](<../../../.gitbook/assets/image (38) (1) (1).png>)

#### Next Steps

Unfortunately, there isn't much you can do if the contract doesn't properly return a token URI. It is _possible_ that there was a transient error running an eth\_call on our nodes, but it's pretty unlikely. Feel free to retry the request!

### Token uri responded with a non 200 response code

> [Composer Example](https://eth-mainnet.g.alchemy.com/demo/v1/getNFTMetadata?contractAddress=0x909899c5dbb5002610dd8543b6f638be56e3b17e\&tokenId=955)\
> Contract Address: 0x909899c5dbb5002610dd8543b6f638be56e3b17e
>
> Token ID: 955

**Why?**

In the section above we talked about how we get the URI where the NFT metadata lives. Once we have the URI we then attempt to visit it in order to access the metadata. If the URI responds with anything other than a 2xx response code, like for instance a 502 Bad Gateway (the [PlasmaBear](https://plasmabears.com/api/nft/getMeta/955) contract above is an example) then we return this error.

#### Next Steps

In this case it is _possible_ that retrying the request can succeed. If the contract's metadata website is down for some transient reason then a retry could work. A more common case is that the website may be rate-limiting Alchemy servers and returning 4xx. We are working on infrastructure to reduce the occurrence of this error. In the meantime, we suggest retries with a reasonable backoff strategy.

### Throttled token uri

#### Why?

If a token URI containing metadata responds to our retrieval attempts with a "429 Too Many Requests," the site is informing us that we have requested metadata too often. When this happens, we will not visit the website again in order to release the "rate limit" that they have put on us. During this "waiting period," requesting NFT metadata for that same asset requires hitting that website and, therefore, we will temporarily block the request.

#### Next Steps

In this case, you should retry your request after a variable number of seconds. (We suggest waiting at least 10 seconds) If you continue to be throttled, increase the wait period a bit longer after each retry.

### Contract does not have any code

**Why?**

Not all addresses are token contracts! If you send us an address for which there is no contract code then we return this error. In order to determine if the address is a contract we call eth\_getCode on the address.

**Next steps**

You should not retry this request. Perhaps you are accessing the contract on the wrong network. For instance you might want to find the contract on Polygon rather than Ethereum.

### Contract returned a broken token uri, do not retry

#### Why?

This occurs when the tokenUri associated with the NFT does not respond to the web request at the time the request was made. This can happen for many reasons including the url not existing, being deprecated, or lacking DNS set up.&#x20;

#### Next steps

There is a chance that the URL gets fixed, in which case retrying the request will return the updated tokenUri if the URL has been updated in time. Otherwise, the URL may be permanently dead.
