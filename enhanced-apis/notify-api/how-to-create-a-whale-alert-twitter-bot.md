---
description: >-
  Learn how to build a Twitter bot that tracks activity on whale wallet
  addresses on Ethereum. This tutorial also works with Polygon, Arbitrum, and
  Optmism.
---

# How to Create a Whale Alert Twitter Bot

Whale alerts are an automated way to monitor and track transactions on the blockchain from wallets that own, send, and receive a large quantities of cryptocurrencies. This tutorial explains how to track whale events and publishing them to Twitter.

The whale alerts we’re going to set up use three components to monitor crypto whale activity and send notifications to Twitter:&#x20;

1. [Alchemy Notify API](https://alchemy.com/notify?a=9d33de528d) - webhook URLs for Ethereum, Arbitrum, Optimism, or Polygon.
2. [Zapier Integrations](https://docs.alchemy.com/alchemy/enhanced-apis/notify-api/integrate-alchemy-zapier) - a means connect Alchemy webhooks and 3rd party applications (e.g., Twitter).
3. Twitter workspace - to receive transaction information and broadcasts it to the user.&#x20;

[Using Alchemy’s webhooks](https://docs.alchemy.com/alchemy/enhanced-apis/notify-api/using-notify#address-activity) and Zapier to alert Twitter when a customized event takes place, you’ll see just how easy it is to set up your own whale alert.

### 1. Create a free Alchemy account and Zapier account&#x20;

First, we'll set up our integrations and webhooks in Zapier and Alchemy.

To start, create your new accounts:

* A [free Alchemy Account](https://alchemy.com/?a=9d33de528d).
* A [free Zapier account](https://zapier.com/sign-up).

If you already have these accounts, log in and skip to the next step.

### 2. Create a Zap and a webhook URL&#x20;

Once you’re on the Zapier dashboard, follow these steps to create a new webhook automation:&#x20;

1. Click **Create Zap** in the top left corner.&#x20;
2. Go to **Trigger** **Search** and select **Webhooks by Zapier**.&#x20;
3. Select **Catch Hook** as the **Trigger Event**.&#x20;
4. Click **Continue** to the **Set up trigger** section and copy the **Custom Webhook URL**.

{% hint style="info" %}
**Note:** Zapier's **Catch Hook** trigger event will be used to receive data from tracked events using Alchemy webhooks.
{% endhint %}

![Creating a new automation in Zapier with the "Catch Hook" trigger.](https://lh5.googleusercontent.com/cSxZ\_MNXfeUllA0ZsUG3j2mf2IQsLnuFuEaQUAD9h5y7VRyr53AWNQXmrvG8sRcmL7ZIW7wU66owvQrf1EJrMB2-ciEDRnz0sWJcYrRcLyjp58wol2FV3zCOkebnnhS52iG5VmuhP2Tivg17Ig)

Next, let’s create the webhook URL for sending the webhook response from Alchemy to Zapier.&#x20;

### 3. Create an Alchemy webhook&#x20;

Create the address activity webhook to track the event data sent to Zapier. If you don't have one,  [create a free Alchemy account](https://alchemy.com/?a=9d33de528d).&#x20;

There are two ways to create the webhook webhook:

* Manually using Alchemy’s [Notify tab within the dashboard](https://dashboard.alchemyapi.io/notify).
* Programmatically by using Alchemy’s Notify API (recommended for tracking 10+ addresses).

#### Manually create a webhook from the dashboard&#x20;



1. From the **Ethereum + L2** ecosystem, click the **Notify** tab.
2. Click **+ Create Webhook** button in the **Address Activity** section.
3. Fill in these fields to create the webhook:&#x20;
   * Select **Chain** to be **Ethereum**
   * Select **Network** to be **Mainnet**&#x20;
   * Paste the Zapier webhook URL you created in step 2.
4. Paste the wallet address you want to monitor. If you have less than 10 addresses, select the **Add Addresses** button to add them.&#x20;

Now, for the fun part: adding our whale wallet addresses! For this tutorial, we’ve taken the top wallet address from [whalestats.com](https://www.whalestats.com/analysis-of-the-top-100-eth-wallets/addressList/1), **Cyborg**, to use.

![Whale Stats showing the Ethereum wallet address for the "Cyborg" wallet.](https://lh6.googleusercontent.com/kMhvROcQTliz7aIG8kAnvvbVoWPxfD8oRGzsGge2VfOEL0BG26jbzS54o13aubZWtV7WYO3mdWmyVn2Hibf47D3LHfvg1r86H3WOmo-lWs7-JcpfbHeKYlKpcqPFn1mLy0bDjHUdpq8l3bKgTw)

Feel free to use any (and as many) of the wallet addresses on the list as you’d like. The Cyborg wallet address is `0x49a2dcc237a65cc1f412ed47e0594602f6141936`.

{% hint style="info" %}
**Note:** To test whether the Alchemy webhook successfully sends requests to Zapier's webhook URL before confirming the creation, click **Test Webhook** next to the webhook URL. Or, if you have already created the webhook and want to test again, click on the three-dot menu next to your webhook and select **Send Test Notification**.
{% endhint %}

To finish your configuration, Return to Zapier and continue to the **Test trigger** section by clicking **Test trigger**. The configuration is complete if you see a **We found a request** notification.&#x20;

#### Programmatically create a webhook using Notify API&#x20;

Creating a webhook using the Notify API is recommended if your webhook is tracking the transfer events for 10 or more Ethereum addresses.&#x20;

To get started, copy your Alchemy authentication token (`X-Alchemy-Token`) from the upper right corner of your Notify dashboard, under the **AUTH TOKEN** button.

![Alchemy Notify dashboard for creating new webhooks on Ethereum, Arbitrum, Optimism, and Polygon.](https://lh3.googleusercontent.com/jjRB8I4dH4p3EP\_KwrGjRbdlQAvH-g3lSTHlhHTGwM8FZrHgLnZy2fXHPw62l4MleJtPxku2C7kUvgxn3cx-jqtkDPz7zlIkoouC8JTVYA0wjOhvl-Z760tFaHos1EHUZo6pvO17jqs8fvxkGA)

Next, navigate to your command line and type:

```bash
curl https://dashboard.alchemyapi.io/api/create-webhook \
-X POST \
-H "X-Alchemy-Token":"<your-X-Alchemy-Token>" \
-D '{"network":"ETH_GOERLI","webhook_type":"ADDRESS_ACTIVITY","webhook_url":"<your-Zapier-Webhook-URL>", "addresses":["<your-Ethereum-Address>"]}'
```

Remember to replace the following placeholders in the script:&#x20;

* `your-X-Alchemy-Token` with your Alchemy **Auth Key**.
* `your-Zapier-Webhook-URL` with your Zapier webhook URL.
* `your-Ethereum-Address` with the wallet address(es) you pasted.

You can add as many Ethereum addresses as you’d like to track their transfer events.&#x20;

After refreshing, you should see the newly created address activity webhook appear in your Notify dashboard with all your specified parameters.&#x20;

For more API calls to do things like adding, removing, or updating webhook addresses, please see the [Notify API documentation](https://docs.alchemy.com/alchemy/enhanced-apis/notify-api#network).

### 4. Parse webhook response in Zapier&#x20;

Now, parse the webhook response from Alchemy to create a Zapier action that sends a Twitter alert with a human-readable message whenever the tracked wallet address sends a transaction.

1. On the Zappier application, under the **Action** section, select **Filter.**
2. In **Filter setup & testing**, only continue if the **Event Activity From Address** text exactly matches our whale's Ethereum address `0x49a2dcc237a65cc1f412ed47e0594602f6141936`.
3. If you don't want to use a webhook value, you can search for `fromAddress`.

{% hint style="info" %}
**Note:** If you click **Continue** and find that **Your Zap** **would not have continued**, don't worry! The test notification was not sent from the whale wallet, so this message is expected.
{% endhint %}

![Zapier automation interface for continuing an event if certain event activity conditions are met.](https://lh3.googleusercontent.com/rAii4gRH1f0ON1WbTO3fphcKpsW3HGd5CDZI5JIuKAC9\_UZxZHGTyJhSHJUzZO-jZbx7xFnp3FxVw6faDXC10DUdtwq9bARWNPXzYN1i0P0gqnROCxDrRkZkFftK-nd4V70dIdaUiBqtFl396w)

### 5. Handle alerts for sending tokens&#x20;

First, log into Twitter or create a new account for your Twitter crypto whale alert bot.&#x20;

Next, send a tweet if our whale is the sender of a transfer event.&#x20;

* Click **+** at the bottom.
* Search for and select **Twitter** in the new **Action** section.&#x20;
* For the **Action Event**, choose **Create Tweet.**&#x20;
* Click **Continue** and sign in to your Twitter account.&#x20;

Lastly, we will need to fill out the fields to send our message in the **Set up action** section.&#x20;

In message text, you can get creative and choose what fields and values you want to send. This tutorial chose the following fields:&#x20;

1. Event Activity Value
2. Event Activity Asset&#x20;
3. Event Activity to Address&#x20;
4. Event Activity Network&#x20;

You can leave everything else on the default option.

![Message text for the Twitter whale alert bot that pulls parsed information from Alchemy's Ethereum webhook.](https://lh6.googleusercontent.com/97e\_QlwX1V8c86zfnUBMNrwT33-FbJMKKcU4moN9iM5Z\_38HfEXsnn8fGTFoFF8r6HRRXvUl201ekElcfUEVqo0fSXyK1RCDISLguZH-g0bpSttrkGT-6D-jOz9\_KzSkUCFFoULIcMmu4tjoqA)

An example tweet using this template would read:&#x20;

> Whale Alert! A transaction of 1000 ETH was sent to \[wallet address] on the Ethereum network&#x20;

To finalize your integration:

1. Click **Continue.**
2. Click **Test and continue**. If no errors pop up, your Twitter whale alert bot works! Your account show have created a tweet.
3. Publish the Zap.&#x20;

Whenever the whale wallet sends a transaction, your Twitter bot will tweet out the transaction details.&#x20;

{% hint style="info" %}
You can view the run details of your Zap on the “Zap History” page in the dashboard.
{% endhint %}

### 6. Handle alerts for receiving tokens&#x20;

We also want to publish tweets when our whale wallet is on the receiving end of a transaction:

1. Edit the **Continue only if** action.&#x20;
2. Click on **Filter Setup & Testing** and press the **+ or** button.&#x20;
3. Fill in **Event Activity To Address** (or search for `fromAddress`) (**Text) Exactly matches** our whale Ethereum address (paste it into the last text field.

Now our Zap will run when the Whale Wallet is also a recipient.&#x20;

### 7. Create a “Code by Zapier” action&#x20;

As a final step, create a **Code by Zapier** action between the **Only continue if…** and **Create Tweet In Twitter** actions.&#x20;

You can choose either "Run Python" or "Run Javascript." We chose **Run Javascript**, but the logic works similarly for Python. After clicking **Continue**, set up your input data under **Set up action** as follows:

![](https://lh6.googleusercontent.com/lVpfiglPjycgGxFrCjDiKbZaFcQVwEEy3L2mi\_wvLtniTmQwkV4rjUNxEL12lOtOMp\_KpXIV2x8uyH8\_ROl17dcnxtxzKHLukPpqX-pqTn-bCOJlQEcpFCVTM1\_HIXGgoagkPnMFMTBdfjei3g)

Parse through the webhook response again because our current tweet is only created when the whale wallet sends tokens. Therefore, we need to customize them for when the Whale Wallet receives tokens.

In the code block, paste the following code. Read the comments to see what each line means.

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
output = [{account_1: account_1, account_2: account_2, t_or_f: t_or_f, f_or_t: f_or_t}];Crypto Whale Twitter Bot FAQs
```

{% hint style="info" %}
**Note:** Remember to replace Whale-Wallet-Address with the whale wallet address. When testing the action, don't worry if it doesn't assign anything to the output variables.
{% endhint %}

Lastly, go to the **Create Tweet In Twitter** action and click on the **Set up action** section.

Replace the generic fields from the webhook response in the message text with the dynamic outputs from the Javascript code, which are customized depending on whether the tracked wallet sent or received tokens:

![](https://lh6.googleusercontent.com/som5bGgTblwCyL6BRX0m2gBBQnR6GdwDBirAGnVC4d9Q\_y5-rqih6lkMDr\_ngfU1BVNOq8A0bgXOz1KqD\_enmOn9LJMyHFBNCNy9zmLjiMJ53N9ZEiuj4DW6DDW\_SUPGiZxxeK3ezP4l0Ea1CQ)

Click **Continue** and test your action, then **publish**. Congrats!  You just successfully created a Twitter whale alert bot!

### Whale Alert Twitter Bot FAQs

The following common questions about creating whale alert bots for Twitter:

### What are whales in crypto?&#x20;

Whales are big crypto holders, with a lot of a particular cryptocurrency in their wallets and whose large transactions could have ramifications for the market as a whole.

No true criterion exists for determining what is and isn't a whale. Some say Bitcoin whales need at least 1000 coins. Alternatively, the Twitter account @whale\_alert, maintained by whale-alert.io, monitors any wallet with crypto valued over 100k USD.

However you define them, whales are big enough that they can shake things up in the marketplace. For that reason, savvy investors need to monitor these large accounts and their transactions.

### What is a Twitter whale alert?&#x20;

Twitter whale alerts are custom notifications that broadcast transaction information to Twitter whenever crypto transactions occur on the blockchain from whale wallets.

Whale alerts are a great way to see what influential market movers in crypto are buying and selling.

Users can select multiple wallets to monitor and then get notified on Twitter so they can view and use this data.

### What are the use cases for a Twitter whale alert?&#x20;

The primary use case for a Twitter whale alert is to help investors and builders track the activities of influential investors as they buy, sell, and move assets between wallets. Looking for clues in whale activities can help web3 participate better and mitigate risk.

For example, whale alerts might help investors:

* Avoid pump and dump schemes where whales artificially increase, causing undue FOMO.
* Monitor rinse and repeat cycles where whales artificially depress prices by selling lower than market value, so they can create a panic sell-off and buy coins at a lower price.

Whale alerts also can help investors better understand the macro movements of cryptocurrencies and the volatility of markets in general, so they can make smarter investment decisions.

{% hint style="info" %}
**Note:** Just because there is movement from one wallet to another, it doesn’t necessarily indicate a market trend. Sometimes the movement could be between two wallets that have the same owner. For this reason, be cautious solely following whale activity and instead use these alerts in conjunction with other data.&#x20;
{% endhint %}
