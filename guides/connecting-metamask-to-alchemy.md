---
description: >-
  Follow this two step guide to integrate your metamask wallet with Alchemy's
  endpoint!
---

# 💸 Connecting Metamask to Alchemy

Metamask uses a default node provider to display and send transactions for your account If you'd like to switch this over to Alchemy to be able to see your transactions in your Alchemy dashboard and use Alchemy specific features and tools, integrate your Metamsk account in _two steps_. **NOTE: **This does not mean that Alchemy will have access to your private keys or wallet! 

#### 1. Navigate to your Metamask wallet and click the network dropdown at the top, selecting "Custom RPC" at the bottom

![User-uploaded Image](https://static.slab.com/prod/uploads/7adb25ff/posts/images/QFvZ910UMQDM7uvUE8BXWlv3.png)

#### 2. Fill in the required information

* Make sure you use the correct Alchemy API URL for your desired network
* Alchemy supported chains:

| Hex  | Decimal | Network                         |
| ---- | ------- | ------------------------------- |
| 0x1  | 1       | Ethereum Main Network (Mainnet) |
| 0x3  | 3       | Ropsten Test Network            |
| 0x4  | 4       | Rinkeby Test Network            |
| 0x5  | 5       | Goerli Test Network             |
| 0x2a | 42      | Kovan Test Network              |

![User-uploaded Image](https://static.slab.com/prod/uploads/7adb25ff/posts/images/WNz15jQyO\_5blxxahnJUr2U-.png)

And thats it! Your Metamask is now hooked up to Alchemy 🎉 You've now unlocked game changing tools like the [Mempool Visualizer](../introduction/core-products/alchemy-build.md#mempool-visualizer) (where you can view all your transactions as they are being mined), [Alchemy Notify](../introduction/core-products/alchemy-notify.md) (receive notifications about address activity, dropped/mined transactions, etc.), and more!
