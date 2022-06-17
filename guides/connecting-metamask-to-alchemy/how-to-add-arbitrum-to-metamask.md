---
description: >-
  Arbitrum is an Optimistic Rollup and has made its name one of the top Layer 2
  solutions on Ethereum. This section will include ways to add Arbitrum Mainnet
  and Testnet as your custom MetaMask RPC node
---

# How to Add Arbitrum to Metamask

## Overview&#x20;

1. [Mainnet vs. Testnet (Rinkeby)](how-to-add-arbitrum-to-metamask.md#mainnet-vs.-rinkeby-testnet)
2. [Create a free Alchemy account](https://alchemy.com/?a=991c4e82df)
3. [Create an Arbitrum App](how-to-add-arbitrum-to-metamask.md#create-an-arbitrum-app) &#x20;
4. [Add to Wallet](how-to-add-arbitrum-to-metamask.md#add-to-wallet)&#x20;

#### [Updating your Metamask RPC manually](how-to-add-arbitrum-to-metamask.md#updating-your-metamask-rpc-manually)

1. [Copy your HTTP API Key](how-to-add-arbitrum-to-metamask.md#copy-your-http-api-key)
2. [Update Arbitrum Mainnet](how-to-add-arbitrum-to-metamask.md#updating-arbitrum-mainnet)
3. [Update Arbitrum Testnet (Rinkeby)](how-to-add-arbitrum-to-metamask.md#update-arbitrum-testnet-rinkeby)&#x20;

## Mainnet vs. Rinkeby Testnet

There are two networks on Arbitrum: Mainnet and Rinkeby Testnet. The endpoints are as follows: Mainnet: https://arb-mainnet.g.alchemy.com/v2/your-api-key Rinkeby: https://arb-rinkeby.g.alchemy.com/v2/your-api-key&#x20;

## Set up a free Alchemy account

This is a very important step. [**Just do it. Here**](https://alchemy.com/?a=991c4e82df)**.**

Since Arbitrum is a Layer 2 solution, be sure to select the **Ethereum + L2 Ecosystem** during sign up.

## Create an Arbitrum App

Check out [these instructions](../../introduction/getting-started/#1.create-an-alchemy-key) for creating a new app. Make sure to specify **Arbitrum** as the chain and choose Mainnet or Rinkeby.&#x20;

![](https://lh5.googleusercontent.com/Kfvight8DLpynrqI\_mv6ncVrZ4LJPy\_Py2TwycV4BBeX2a\_cj9vH6Enx9HTEESpLEHZt0QriI3wZGWQ8iaSdn6odsd1tI2Hep6-voDav-S-0W--EJwvBn-uYNZFh\_NtYkBQ7J0tw9mpAvajQOg)

## Add to Wallet&#x20;

Alchemy provides an **Add To Wallet** button for Arbitrum apps.&#x20;

This is a more convenient way to add the Arbitrum network your Metamask wallet rather than manually configuring it.

![Add to Wallet Button](https://lh4.googleusercontent.com/WBbYvi3F23w9DzSpspncCfvqp43HCzp0oDbvRhAQWQx15BClm\_HiKxg3lmApOekJozgmzYqL6fVez\_OLKUJRHN7dgJIUwSwXKLGEfab8VVH2bB-mASldeQIjmnXkPqjXZ26Y3iU0fG0leJfYHQ)

**That's it! You should see your Metamask work a lot better now** :wink:****

## Updating your Metamask RPC Manually

The below instructions are for updating your Metamask RPC manually instead of using the "Add to Wallet" button.&#x20;

### Copy your HTTP API Key

After creating your app, you should be able to see your Alchemy app’s chain matches the chain you want to connect to.

Here, you can find your HTTP which you will use for your RPC URL in Metamask.&#x20;

![Alchemy API Key](https://lh3.googleusercontent.com/QjmXpHhh7-569ZqnSugtSnvOoXOSFf6Tqn7vcLVIwlZwf88A2H5rr\_TEgO2iQJ1jtk39zefxhSHh9IztYVppIEogeui0ZUAkL1qsbHoQCUx0rxuq9wDHvvjYcKVC4nBNgt\_8I-iihr3NxDDsxQ)

### Updating Arbitrum Mainnet&#x20;

#### 1. Open Metamask and click the network name located at the top-right of the window

![](https://lh6.googleusercontent.com/mPiLz0wfWbDFpmTLs4Yw8zKBNcskZ6PIiY8mfLZyHzANgImI21VlUC77KeWnCpqhoAm6zAlRTmSZNkDbNdfW-0xCvTi\_XRhWunRniadVOiH86whV3knuxCKcvF\_zx47aPK4mDuWY-N3flH59mA)

#### 2. Click the Add Network button at the bottom of the pop-up window

![](https://lh3.googleusercontent.com/7pfK7UwcyhF\_Yfx2EIZjnDJH04jJEKT64g8q1gdxcQNiruRPn6392\_2wq0swtQUwrDRk7e9HrDAADXdV85JC-YCigkVN3XgB2Jp11aS8-aVYFhWAOMGs6n74fr350JEsJgKjECnlfVIveyxm0g)

#### 3. Enter the following network details and click Save

![](https://lh3.googleusercontent.com/W0M4sfnGhoNa2RoVBqECwXnBUjV1IikR-P290cEBFINk6LJJjB45aQZNwv3cT0GgQ0mS1jOy-1Ij9ztP4jtnJvnnYGaJuaCnofyYeFqK0s3px0kQbye1OcGUSElOp-ZCk\_nCzChIs27ulWyV\_Q)

* **Network Name:** Arbitrum
  * You can name your Network Name anything to remind you which chain you’re connecting to.
* **New RPC URL:** https://arb-mainnet.g.alchemy.com/v2/your-api-key
  * For the New RPC URL field, [grab the HTTP from your Alchemy Dashboard](how-to-add-arbitrum-to-metamask.md#copy-your-http-api-key). If you don't have a dashboard account, go back up to the "[Set up a free Alchemy account](https://alchemy.com/?a=991c4e82df)" step and set up your account.
* **Chain ID:** 42161
* **Currency Symbol:** AETH
  * Optional&#x20;
* **Block Explorer URL:** https://arbiscan.io/
  * Optional&#x20;

After clicking **Save**, you will be directly switched to Arbitrum’s Network within the dropdown list.

![](https://lh4.googleusercontent.com/G-JUpGNElrQ1cmRflT\_Yev8SXAiXj7QzXLMXmgIPrwmjSakKYxWhpK1oXlCNsesIA1A1tdk3anGeAp9BsnqltEDqHc\_ipG1jCDdsXkYeGWl3lvP-edRYnY6kS7tO0U8nQn1WULazPstuhLNbzQ)

**That's it!  You've now added the Arbitrum network with Alchemy connected.**

### Update Arbitrum Testnet (Rinkeby)&#x20;

Arbitrum currently has [one testnet](https://developer.offchainlabs.com/docs/public\_testnet) connected to Ethereum's Rinkeby testnet. This operates exactly the same as Arbitrum mainnet but is built as a smart contract on Rinkeby instead of on Ethereum mainnet.

Adding the testnet is the same process as adding the mainnet shown above, but with a different RPC endpoint.&#x20;

#### 1. First, make sure you’ve enabled the Show test networks toggle.&#x20;

This will list all the default test networks within your network list. You can find this in Settings>Advanced>Show test Networks

![](https://lh5.googleusercontent.com/PNKWBFbxdeGtC2XkMVGsl4xDLwETmsBph6Bwy6iyicqPwRv54t6sEO7DC7r1L8wYo4TwbMET9jz0AbdMo3SO6qWZUX2wpsef2IIUZ9evW5oWg9xts2dHMrybv7t-tnvoOsIHN3Z04UfTn-v76Q)

#### 2. Enter the following network details and click Save

* **Network Name:** Arbitrum Testnet
* **New RPC URL:** https://arb-rinkeby.g.alchemy.com/v2/your-api-key
* **Chain ID:** 421611
* **Currency Symbol:** AETH
* **Block Explorer URL:** https://testnet.arbiscan.io/&#x20;

![](https://lh3.googleusercontent.com/lvTm39yNa0jtqb2wuVBGAGtjTmXSQd08P2DdEC4m5vsNQnun7XavO5NAYwcCO2JGme\_hezZJFS9hTmBuS9B0Md\_TG24ixxbBaquHR5Bu\_tEy1b4aDNacyjG1YRtV5yOlqToPVhhIKN1iKonIgA)
