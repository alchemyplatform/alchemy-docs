---
description: >-
  Track the activity of whales on Ethereum, Polygon, Arbitrum, and Optimism in
  Discord using Alchemy webhooks.
---

# How to Create a Whale Alert Discord Bot

Whales are individuals, DAOs, or companies that hold a large amount of cryptocurrency in their digital asset wallets, which gives them outsized influence on the market, especially when they hold large amounts of unlocked tokens in small market cap projects.

Tracking their on-chain (and not only off-chain, publicly available data) activity across different networks--Ethereum, Arbitrum, Optimism, or Polygon--can create unique insights you can share on Discord.

### What is a Discord whale alert?&#x20;

Discord whale alerts are web3 notifications that are automatically published to Discord channels that display transaction details about the on-chain activity of wallets that hold a large amount of cryptocurrency (whales).

### What are the use cases for a Discord whale alert?&#x20;

Because Discord is a public communications tool used by a majority of NFT projects, web3 startups, crypto trade groups, and blockchain developers, the primary uses cases for developing a Discord bot for whale alerts is to help teams track the activity of important users, traders, treasury wallets, and competitors.

**For example, Discord whale alerts might help web3 teams:**

* Monitor incoming and outgoing movement of cryptocurrency.
* Track the wallet activity of high profile traders to see the projects they are investing in.
* Identify investments DAOs and treasury wallets are using to diversify their holdings.
* Gain insight on potential collaborations based on wallet-to-wallet relationships.

There are multiple reasons why crypto users, blockchain teams, and web3 devs using Discord might want to build might want to build a bot that tracks wallet activity across Ethereum, sidechains, and layer 2s.

## How to Develop a Discord Whale Alert Bot

This tutorial will detail how to build a whale alert bot for Discord that tracks Ethereum addresses.

These are the three tools you'll need:

1. [Alchemy Notify API](https://alchemy.com/notify?a=bad4a0007f) - webhook URLs for Ethereum, Arbitrum, Optimism, or Polygon.
2. Zapier - a means to send web3 notifications to Discord by [integrating Alchemy webhooks](integrate-alchemy-zapier.md).
3. Discord - a tool to receive on-chain transaction details and share it with users in a Discord channel.

[Using Alchemy’s webhooks](https://docs.alchemy.com/alchemy/enhanced-apis/notify-api/using-notify#address-activity) and Zapier to publish Discord messages for custom events that occur on blockchain networks (such as Ethereum, Optimism, Arbitrum, and Polygon) takes eight steps.

### 1. Sign up for a new account with Alchemy and Zapier&#x20;

First, we'll set up our integrations and webhooks in Zapier and Alchemy.

To start, create your new accounts:&#x20;

* A [free Alchemy Account](https://alchemy.com/?a=1b6f6f9e40).
* A [free Zapier account](https://zapier.com/sign-up).

If you already have login credentials, sign in and skip to the next step.

### 2. Build a Zap and generate a webhook URL&#x20;

From the Zapier dashboard, create a new webhook automation:&#x20;

1. Click **Create Zap** in the top left corner.&#x20;
2. Go to **Trigger**.
3. Search for then select **Webhooks by Zapier**.
4. Select **Catch Hook** as the **Trigger Event**.&#x20;
5. Click **Continue** in the **Set up trigger** section.
6. Copy and save the **Custom Webhook URL**.

{% hint style="info" %}
**Note:** Zapier's **Catch Hook** trigger event will be used to receive data from tracked events using Alchemy webhooks.
{% endhint %}

![How to create a new automation in Zapier with the "Catch Hook" event trigger.](https://lh5.googleusercontent.com/cSxZ\_MNXfeUllA0ZsUG3j2mf2IQsLnuFuEaQUAD9h5y7VRyr53AWNQXmrvG8sRcmL7ZIW7wU66owvQrf1EJrMB2-ciEDRnz0sWJcYrRcLyjp58wol2FV3zCOkebnnhS52iG5VmuhP2Tivg17Ig)

### 3. Create a webhook with Alchemy on Ethereum

Create the address activity webhook to track the event data sent to Zapier. If you don't have one, sign up for a free Alchemy developer account.&#x20;

There are two ways to configure an Alchemy webhook:

* Manually with Alchemy's [**Notify** tab within the dashboard](https://dashboard.alchemyapi.io/notify)
* Programmatically with Alchemy's Notify API (recommended for tracking 10+ addresses).

#### Manually create a webhook from the dashboard&#x20;

1. From the **Ethereum + L2** ecosystem, click the **Notify** tab.
2. Click **+ Create Webhook** button in the **Address Activity** section.
3. Fill in these fields to create the webhook:&#x20;
   1. Select **Chain** to be **Ethereum**
   2. Select **Network** to be **Mainnet**&#x20;
   3. Paste the Zapier webhook URL you created in step 2.
4. Paste the wallet address you want to monitor. If you have less than 10 addresses, select the **Add Addresses** button to add them.&#x20;
   1. For this tutorial, using the well-known "Itachi", an address with over 1.9 million ETH tokens in their wallet. The address is `0x73bceb1cd57c711feac4224d062b0f6ff338501e`.

You can also use Alchemy's Notify API for Polygon, Arbitrum, and Optimism.

To finish your configuration, Return to Zapier and continue to the **Test trigger** section by clicking **Test trigger**. The configuration is complete if you see a **We found a request** notification.

#### Programmatically create a webhook using the Notify API&#x20;

If your Discord whale alert bot is going to track more than 10 addresses, create an Ethereum webhook using the Notify API.&#x20;

First, copy your Alchemy authentication token (`X-Alchemy-Token`) from the Notify dashboard.

![Alchemy Notify dashboard for creating new webhooks on the Ethereum + L2 ecosystem.](https://lh3.googleusercontent.com/jjRB8I4dH4p3EP\_KwrGjRbdlQAvH-g3lSTHlhHTGwM8FZrHgLnZy2fXHPw62l4MleJtPxku2C7kUvgxn3cx-jqtkDPz7zlIkoouC8JTVYA0wjOhvl-Z760tFaHos1EHUZo6pvO17jqs8fvxkGA)

Update and run this script from your command line:

```bash
curl https://dashboard.alchemyapi.io/api/create-webhook \
-X POST \
-H "X-Alchemy-Token":"<your-X-Alchemy-Token>" \
-d '{"network":"ETH_GOERLI","webhook_type":"ADDRESS_ACTIVITY","webhook_url":"<your-Zapier-Webhook-URL>", "addresses":["<your-Ethereum-Address>"]}'
```

Replace the script's defaults with your Ethereum webhook's details:&#x20;

* `<your-X-Alchemy-Token>` with your Alchemy auth token.
* `<your-Zapier-Webhook-URL>` with your Zapier webhook URL.
* `<your-Ethereum-Address>` with the wallet address(es) you want to monitor (e.g., Itachi's wallet address).

{% hint style="info" %}
**Note: You** can add as many Ethereum addresses as you’d like to track send and receive events.&#x20;
{% endhint %}

Refresh your Alchemy web app and you should see the new address activity webhook in the **Notify** dashboard.

### 4. Parse the Ethereum webhook response in Zapier

Now, parse the webhook response from Alchemy to create a Zapier action that sends a Discord alert with a human-readable message whenever the tracked wallet address sends a transaction.

1. On the Zappier application, under the **Action** section, select **Filter.**
2. In **Filter setup & testing**, only continue if the **Event Activity From Address** text exactly matches our whale's Ethereum address: `0x73bceb1cd57c711feac4224d062b0f6ff338501e`
3. If you don't want to use a webhook value, you can search for `fromAddress`.

{% hint style="info" %}
**Note:** If you click **Continue** and find that **Your Zap** **would not have continued**, don't worry! The test notification was not sent from the whale wallet, so this message is expected.
{% endhint %}

![Zapier automation interface for continuing an event if the event matches the whale wallet address.](https://lh3.googleusercontent.com/rAii4gRH1f0ON1WbTO3fphcKpsW3HGd5CDZI5JIuKAC9\_UZxZHGTyJhSHJUzZO-jZbx7xFnp3FxVw6faDXC10DUdtwq9bARWNPXzYN1i0P0gqnROCxDrRkZkFftK-nd4V70dIdaUiBqtFl396w)

### 5. Create **a Discord server** or sign into Discord&#x20;

Create an account on [Discord](https://discord.com/) or log into your account if you already have a Discord account.

Create a new server:

1. Click the **+** button on the left-hand side.
2. Click **Create my Own**.
3. Choose **For a club or community**.
4. Name the server **Whale Alerts Server**.

### 6. Handle Discord whale alerts for sending tokens

Next, we want to send a Discord message if our whale makes a send transaction.&#x20;

* Click **+** at the bottom.
* Search for and select **Discord** in the new **Action** section.
* For the **Action Event**, choose **Send Channel Message**.&#x20;
* Sign in to your Discord account.&#x20;

Next, fill out the fields to send our message in the **Set up action** section.&#x20;

1. Choose your channel.
2. Choose what fields and values you want to send.
3. Set text-to-speech to false.

In the message text, you can get creative and choose what fields and values you want to send. We chose these fields:&#x20;

* Event Activity Value
* Event Activity Asset&#x20;
* Event Activity to Address&#x20;
* Event Activity Network&#x20;

![Message text for the Discord whale alert bot that pulls parsed information from Alchemy's Ethereum webhook.](https://lh4.googleusercontent.com/Onw7skUyuHZHgfpzGWlyRs2bFvjiKvTDBZBjvMW8w-gegAKjM6QGj\_MOXkB5Q7UGNVmKKf1Dh3Ll-69Xg9-UY2yfEzbp8ylMR\_TsJEbHbzuJzfQYjHocgEzSnzRWBdBnX3xXyt5osmxpOqsgFQ)

You can leave everything else on the default option. A sample Discord message might read:

> Whale Alert! A transaction of 100 ETH was sent to `0x73bceb1cd57c711feac4224d062b0f6ff338501e` on the Ethereum network

To finalize your Discord configuration:

1. Click **Continue.**
2. Click **Test and continue**. If no errors pop up, your Discord whale alert bot works! A message should be published in the Whale Alerts.&#x20;
3. Publish the Zap.&#x20;

Now, whenever the whale sends a transaction, your Discord bot will share the transaction event.

### 7. Handle Discord whale alerts for receiving tokens&#x20;

To publish Discord messages when the whale wallet receives tokens:

1. Edit the **Continue only if** action.&#x20;
2. Click on **Filter Setup & Testing** and press the **+ or** button.&#x20;
3. Fill in **Event Activity To Address** (or search for `fromAddress` .
4. Ensure the text matches our whale Ethereum address (`0x73bceb1cd57c711feac4224d062b0f6ff338501e`).

Now our Zap will execute whenever Itachi receives tokens.

### 8. Create a “Code by Zapier” action with Javascript&#x20;

As a final step, create a **Code by Zapier** action between the **Only continue if…** and **Send Channel Message in Discord** actions.

You can choose either "Run Python" or "Run Javascript." We chose **Run Javascript**, but the logic works similarly for Python. After clicking **Continue**, set up your input data under **Set up action** as follows:

![Set up action with the fromAddress and toAddress labeling in Zapier.](https://lh6.googleusercontent.com/lVpfiglPjycgGxFrCjDiKbZaFcQVwEEy3L2mi\_wvLtniTmQwkV4rjUNxEL12lOtOMp\_KpXIV2x8uyH8\_ROl17dcnxtxzKHLukPpqX-pqTn-bCOJlQEcpFCVTM1\_HIXGgoagkPnMFMTBdfjei3g)

We are going through the webhook response again, but this time for receiving tokens since the existing Discord message only gets submitted when Itachi sends tokens.&#x20;

Paste this code in the code block:

```
// Since JavaScript is case-sensitive, we will be comparing addresses in upper case const address = "Whale-Wallet-Address".toUpperCase(); 
// Define Account 1 (the whale wallet) 
let account_1 = ""; 
// Define Account 2 (the user whale wallet is sending to / receiving from)
let account_2 = ""; 
// Define to use "to" or "from" in message 
let t_or_f = ""; 
let f_or_t = ""; 
if (inputData.fromAddress.toUpperCase() == address) { 
     // If Whale is sending, then it is the fromAddress 
     account_1 = inputData.fromAddress; 
     account_2 = inputData.toAddress; 
     t_or_f = "from";
     f_or_t = "to"; 
} else if (inputData.toAddress.toUpperCase() == address) { 
     // If Whale is receiving, then it is the toAddress 
     account_1 = inputData.toAddress; 
     account_2 = inputData.fromAddress; 
     t_or_f = "to"; 
     f_or_t = "from"; 
} 
// Output the fields to be used in email 
output = [{account_1: account_1, account_2: account_2, t_or_f: t_or_f, f_or_t: f_or_t}];
```

{% hint style="info" %}
**Note:** Remember to replace Whale-Wallet-Address with the whale wallet address.
{% endhint %}

Lastly, go to the **Send Channel Message in Slack** **action** and click on the **Set up action** section.

Replace the fields from the webhook response in the message text with the dynamic outputs from the Javascript code, which are specific to whether the whale wallet sent or received tokens:

![An example Discord message that uses the webhook response to customize the text of a whale wallet receiving tokens.](https://lh4.googleusercontent.com/2sYR5YzYeQ\_EyaGHz00KIGvSEF0tseVoou321NgUFTIlW0TTIlx-Pv7\_8KXiF5ErA4ETfbcZZubwU9Q-KOOPuMf-ttLDmfRBroWoYkjwIlNWg9ASxboZ4IGr2jiBUh0VPLDI13HMfPT\_x9S5mQ)

Click **Continue** and test your action, then **publish**.

Congrats! You just successfully created a Discord whale alert bot!
