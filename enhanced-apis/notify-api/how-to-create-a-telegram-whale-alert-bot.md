---
description: >-
  Learn how to create a whale alert bot for Telegram. This tutorial works for
  Ethereum, Optimism, Polygon, and Arbitrum webhooks.
---

# How to Create a Telegram Whale Alert Bot

### Step 1: Sign up for a free Alchemy account&#x20;

[Get a free Alchemy account ](https://alchemy.com/?a=11285786dd)to use the [Notify API](https://www.alchemy.com/notify?a=11285786dd), which powers the Telegram whale alert bot. Alchemy provides enough free resources to create our whale alert bot!

After signing up, log in to the Alchemy dashboard and click **Create App**. Fill in form with the following details:

![Create a new Alchemy app](https://lh5.googleusercontent.com/0gtDdYUHgF7CfggHmKjKKehXKwi0qoFKVrdQPj2UpFeRGYX8qaZWMQV0oTU1G3MlSKcVGkrysmkIS1yqB8WvIGQ\_V9konZMQaLMdGszaOZ28YnlP8HM30ieJOYVBbFwUHwWJcd5QV9yOLTlWyQ)

Once you create an app, access your API keys by clicking **View Key**. You will need the **API KEY** on the top row for this tutorial:

![Alchemy API key.](https://lh5.googleusercontent.com/opJC-kDveIWzftdbzDAh5PhlvAKmXoitExnSGQfQTFFTKiQkqnXaq7ZdQ94MRsO1xzMeR3TiHousqFZcbzOY0qGwiXeydNyywaQoqmZo4mvOHAoLloS3IQ2hSIxzifAUyKoSoWXI2bz5Rkla2Q)

### 2. Register a Telegram Bot

In order to receive messages on whale alerts, you need to register a bot on Telegram. First, download Telegram and navigate to the [BotFather channel](https://t.me/botfather), where you will find a list of commands.

![List of Telegram bot commands](https://lh4.googleusercontent.com/FZvnEsYlorC98keliqNGjg6msJ8fgpSJEB3dl1UV-hUSkDaV1mwM0bYZCOvjLeLYKly5rNDySdF\_NxJlGgKE\_c\_D1cZgRoFCandfgqsOPham\_IlX7\_2yiKHEkgYECzUMhzRV1h3NKoU2JqLCNA)

Send `/newbot`  and follow the prompted instructions. You will receive a token that you should save to authorize sending messages on Telegram.

![](https://lh4.googleusercontent.com/oH688xXwTS2MstDtOInJO8eDAGBFwunfgMYIF-MoZvp9aTW07FPiedULeMTYd7fAA6w\_Ko\_FlqwiGE3kFlP7Ei\_ZmqK6CN6Wv9sd3g7ghMvTiTa5P2O8Ou\_d4FRyHF22I9B5\_-CNnFz3d3ZeKw)

Next, open [https://t.me/get\_id\_bot](https://t.me/get\_id\_bot) on Telegram and send `/my_id` to retrieve **Your Chat ID**. Save your ID as you will need it to receive the whale alerts.

![](https://lh5.googleusercontent.com/WqxtkjRzhLWjEFKM3LNFW-lqtj06uwtr6f0\_aSTyoKvywGKht5c590mLXL\_cKc9DN87BGMl9S2vuVV27xGIn9gW5aJDIvVSnbNl-oD2bL\_FmkVbwxKogviNFWwad0i7oXVhV3CGZ7shi712SeA)

### Step 3: Create the Telegram whale alert server&#x20;

You need a server to listen to [webhooks from Alchemy Notify](using-notify.md) and extract any whale transactions. These extractions will be sent on Telegram.&#x20;

The following code creates a Telegram whale alert server, and can [also be found on GitHub](https://github.com/jdubpark/telegram-whale-alert-bot):

```javascript
const { createAlchemyWeb3 } = require('@alch/alchemy-web3')
const BigNumber = require('bignumber.js')
const bodyParser = require('body-parser')
const express = require('express')
const { Telegraf } = require('telegraf')
const throttledQueue = require('throttled-queue')

const app = express()
const PORT = 8000
const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

// TODO: Add your keys here
const TELEGRAM_BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN'
const TELEGRAM_CHAT_ID = 'YOUR_TELEGRAM_CHAT_ID'
const ALCHEMY_API_KEY = 'YOUR_ALCHEMY_MAINNET_API_KEY'

// TODO: For any ERC20 tokens you want to follow, add the the address, name, whale threshold, and token decimals
// >>>>> (refer to Etherscan for some metadata info of the token)
const tokenMetadata = new Map([
  ['0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', { name: 'USDC', threshold: 500000, decimals: 6 }],
  ['0xdac17f958d2ee523a2206206994597c13d831ec7', { name: 'USDT', threshold: 500000, decimals: 6 }],
  ['0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', { name: 'WETH', threshold: 500, decimals: 18 }],
  ['0x2260fac5e5542a773aa44fbcfedf7c193bc2c599', { name: 'WBTC', threshold: 15, decimals: 8 }],
])
const trackedTokenAddresses = new Set(tokenMetadata.keys())
const whaleTxHashes = new Set()

// Bot configuration!
const bot = new Telegraf(TELEGRAM_BOT_TOKEN)
const web3 = createAlchemyWeb3(`wss://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`)
bot.launch()

// API throttle when getting transaction receipt provided by Notify API
// >>>> Adjust according to your Alchemy plan (rate limit)
const throttle = throttledQueue(5, 1000) // at most 5 requests per second

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/webhook', (req, res) => {
  const { type, event } = req.body // webhook data
  event.activity.forEach(async (tx) => {
    // This tx was already recorded, skip.
    if (whaleTxHashes.has(tx.hash)) return

    // We deal only with 'internal' or 'external' transactions category
    if (['internal', 'external'].includes(tx.category)) {
      // Convert the received webhook's tx hash into full tx data (Alchemy API)
      const txData = await throttle(() => web3.eth.getTransactionReceipt(tx.hash))

      // Validate tx receipt data
      if (!Array.isArray(txData.logs) || !txData.logs.length || typeof txData.logs[0].data === 'undefined') return
      const firstTxLog = txData.logs[0]
      const tokenAddress = firstTxLog.address.toLowerCase()

      // Skip any tokens that we don't track
      if (!trackedTokenAddresses.has(tokenAddress)) return

      // Check if tx amount is above the whale threshod (after diving by token decimal)
      // and that the tx is not an approval (so it's an actual ERC20 transfer)
      const tokenThreshold = tokenMetadata.get(tokenAddress) ? tokenMetadata.get(tokenAddress).threshold * 10 ** tokenMetadata.get(tokenAddress).decimals : 10e21
      const isTxApproval = firstTxLog.data === '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
      const isWhaleTx = parseInt(firstTxLog.data, 16) > tokenThreshold && !whaleTxHashes.has(tx.hash) && !isTxApproval
      if (isWhaleTx) {
        whaleTxHashes.add(tx.hash)
        const amount = numberWithCommas((new BigNumber(firstTxLog.data, 16)).div(10 ** tokenMetadata.get(tokenAddress).decimals).toFixed(2)).replace(/\./g, '\\.')

        // Alert on TG (with hyperlinks to click)
        const message = `\[Whale Alert\] [${amount} ${tokenMetadata.get(tokenAddress).name}](https://etherscan\\.io/tx/${tx.hash}) from [${tx.fromAddress.substring(0, 8)}](https://etherscan\\.io/address/${tx.fromAddress})`
        bot.telegram.sendMessage(
          TELEGRAM_CHAT_ID,
          message,
          { disable_web_page_preview: true, parse_mode: 'MarkdownV2' },
        )
      }
    }
  })
  res.status(200).end()
})

// Start the server on PORT
app.listen(PORT, () => {
  console.log(`Telegram Whale Alert listening on port ${PORT}`)
})
```

_**To get started:**_

1. From GitHub, clone the repository by typing `git clone https://github.com/jdubpark/telegram-whale-alert-bot.git`.
2. Navigate to the directory on your local and install necessary packages with `npm install`.
3. Replace all the necessary credentials in the `index.js` file:
   * The value for `TELEGRAM_BOT_TOKEN` with the token you received from `BotFather`.
   * The value for `TELEGRAM_CHAT_ID` with the  **Chat ID** you received from `get_id_bot`.
   * The value for `ALCHEMY_API_KEY` with your Alchemy app's **API key**.
4. Start the alert server by running `npm start`.

Please ensure you're using node version 16.13.0. You can check by calling `node --version` in your terminal.

{% hint style="info" %}
**Note:** You can track different ERC-20 and ERC-721 tokens by modifying the `tokenMetadata`. You can also change the whale size by changing the threshold for each token.&#x20;
{% endhint %}

### Step 4: Set up ngrok for the server&#x20;

You need an ngrok proxy to your local server on port 8000 to receive webhooks from Alchemy Notify API. Ngrok provides an easy way for you to expose a local server to the internet.&#x20;

_**To set up ngrok:**_

1. Sign up and download the ngrok client, using [ngrok's official guidelines](https://ngrok.com/).
2. Connect your ngrok account by running `ngrok authtoken YOUR_AUTH_TOKEN`.
3. Expose your local server (running on port 8000) to the internet with `ngrok http 8000`.

![Running the ngrok client](https://lh3.googleusercontent.com/TI1YgPrkDmKQD9SBFWJti8SUd74kW6jiuMO-Uq1MHSnGLgEW732br4OrgoTbUtaA4-yfgOl-DQCGlnCe62EBrMIoElLPUYjmyV-2Xgq7K66xLkWN0dz4-O6PLTcYM6NfQuE-5ILTNUEYAI\_CCA)

Once you have a URL from ngrok (in this case, `https://114e-136-49-188-56.ngrok.io` from the picture above), you can use Alchemy Notify with your server link.&#x20;

### Step 5: Create Alchemy Notify for whale alerts&#x20;

First, navigate to your [Alchemy Notify dashboard](https://dashboard.alchemyapi.io/notify).

![Alchemy Notify dashboard](https://lh4.googleusercontent.com/cWRwhg\_RvNGaRcryNfXIKCcMRM6GIBqpNZxtkV\_sYcPcge8ZIzv1OB3Zr\_l86nKA-nTX0GvQC3S\_kQBRtNNZfPt50rMC2WN1QvthtjRmPeSNqdDs8dOyKEsBXGrXNd36unldU\_OHqJ-myQuSKA)

Next, create a new Notify webhook by clicking **Create Webhook**. Choose the Ethereum Mainnet and enter your ngrok URL from Step 4 in Webhook URL.&#x20;

Then add the addresses you want to follow. Once you have added all addresses, click **Create Webhook** to complete the process.

![Create a webhook using Alchemy Notify API](https://lh6.googleusercontent.com/mTTSniQNTCeLJvyIx4cRLcawW8sDas9S0PTF5LgEEwtZe56mHOmzkS\_R1mTEB1ayj4D26PCjTRAuM-9duRmuvEgKsth6W25L9iraav9EeVD1B4PvzozAuXC1738IEvPShij\_3m3kvytVpYNW\_g)

You should see a new active webhook app with the tracked addresses.

![Webhook with a tracked Ethereum address.](https://lh3.googleusercontent.com/tiCy04Y81pHNl0RkIYQnCMhwE-zu26lKYZCVQLXHjRKnHXHTuuRX7RolvlZpIvYIw0wU4DI8MT0ileV4jaZy7m2w9nj6uTwIZ8oiJgAvqhgM3gN8ywGfoJi4thHwO2gPlcuKq4k1DwNZtqkqZg)

### Step 6: How to track whale alerts for ERC-20 tokens&#x20;

To track ERC-20 tokens, you can modify `tokenMetadata` to include the desired tokens. It’s critical that you change the decimals to that of the token, which can be found on Etherscan.

#### Popular tokens to track include:&#x20;

* WETH: `0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2`&#x20;
* WBTC: `0x2260fac5e5542a773aa44fbcfedf7c193bc2c599`&#x20;
* USDT: `0xdac17f958d2ee523a2206206994597c13d831ec7`&#x20;
* USDC: `0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48`&#x20;
* DOGE: `0x4206931337dc273a630d328da6441786bfad668f`&#x20;
* SHIB: `0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE`&#x20;

### Step 7: How to track whale alerts for ERC-721 tokens&#x20;

To track ERC-721 tokens, you can modify `tokenMetadata` to include the desired tokens. For threshold, you can follow any sales by setting it to “1”. For decimals, you should change it to “0” as ERC-721 tokens have no decimals.

Some popular tokens to track include:&#x20;

* BAYC - `0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d`&#x20;
* Cryptopunks - `0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb`&#x20;
* Azuki - `0xed5af388653567af2f388e6224dc7c4b3241c544`&#x20;
* Moonbirds - `0x23581767a106ae21c074b2276D25e5C3e136a68b`&#x20;

### Final remarks&#x20;

Congratulations! You have just successfully created a Telegram whale alert bot!&#x20;

For more webhook tutorials that work on Ethereum, Optimism, Arbitrum, and Polygon, see:

1. [How to Create a Twitter Whale Alert Bot](how-to-create-a-whale-alert-twitter-bot.md)
2. [How to Create a Discord Whale Alert Bot](how-to-create-a-whale-alert-discord-bot.md)&#x20;
3. [How to Create a Slack Whale Alert Bot](how-to-create-a-slack-whale-alert-bot.md)
