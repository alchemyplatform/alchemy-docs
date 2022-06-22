---
description: >-
  Learn how to integrate on-chain notifications with your dApp using Alchemy
  Notify v2.
---

# Building a dApp with Real-Time Transaction Notifications

dApps on Ethereum have come a long way over the last several years, both in popularity and in complexity. Unfortunately, the user experience of most dApps is lacking compared to web2 apps.

One key piece that is missing is real-time notifications of events.&#x20;

Users need to know immediately when their trades execute, when their transactions fail, when their auction bid has been accepted, or when a wallet of interest has aped into some new token.&#x20;

Without these notifications, trades can be missed, critical actions are forgotten, and ultimately users might abandon your dApp.

Until [Alchemy Notify](https://alchemy.com/notify?r=affiliate:ba2189be-b27d-4ce9-9d52-78ce131fdc2d), building these real-time notifications into your dApp has traditionally been complicated, time-consuming, and error-prone.&#x20;

With Alchemy, sending real-time push notifications to your users for critical events such as [dropped transactions, mined transactions](../../tutorials/how-to-track-ethereum-transactions.md), wallet activity, and even gas price changes is straightforward, easy, and reliable.

{% hint style="info" %}
Learn about [the differences between Alchemy Notify v1 and v2](https://alchemy.com/blog/launching-notify-v2-with-improvements-to-reliability-scalability-and-security) in our announcement.
{% endhint %}

In this tutorial, we’ll look at an example of how, with just a few lines of code, your dApp can integrate the power of Alchemy Notify v2.

### **Overview**

1. High level walkthrough of the example project
2. Build the project using Heroku
   1. Clone [Github Repo](https://github.com/pileofscraps/alchemy\_notify.git) & Set Up Heroku
   2. Create a [free Alchemy account](https://alchemy.com/?r=affiliate:ba2189be-b27d-4ce9-9d52-78ce131fdc2d)
   3. Alchemy Notify API & Register Webhook Notifications
   4. Insert Alchemy Webhook Id and Auth Key
   5. Deploy Heroku App!
3. Build the project from scratch
   1. Create Express Server
   2. Create a [free Alchemy account](https://alchemy.com/?r=affiliate:ba2189be-b27d-4ce9-9d52-78ce131fdc2d)
   3. Alchemy Notify API & Register Webhook Notifications
   4. Insert Alchemy Webhook Id and Auth Key
   5. Create dApp Frontend
   6. Deploy!

### **Our Example**

For our example, we’ll create a dApp that notifies users on a frontend interface, in real-time, when activity happens on specific Ethereum addresses.&#x20;

Here's what we'll use for our architecture:

* [Express](https://github.com/alchemyplatform/webhook-examples/tree/master/node-express) for our server
* [WebSockets](https://docs.alchemy.com/alchemy/guides/using-websockets) to communicate between the client and server
* [Alchemy Notify](https://alchemy.com/notify?r=affiliate:ba2189be-b27d-4ce9-9d52-78ce131fdc2d) to monitor an address and send a push notification when there is new activity

{% hint style="info" %}
If you don't want to spend real (mainnet) Ethereum to try out this tutorial, you can follow the same process using the [Rinkeby testnet](https://www.alchemy.com/overviews/rinkeby-testnet) and [get Rinkeby ETH from a faucet](https://rinkebyfaucet.com/), so you can send transactions to and from your target address for testing without paying for gas.
{% endhint %}

**Our example dApp will perform two functions:**&#x20;

1. Register a user’s address for notifications
2. Send a notification to that user when they receive or send transactions.

#### **The “register a user’s address for notifications” flow looks like this:**

1. A user connects to their wallet through the dApp
2. The user clicks to register their wallet address to be monitored
3. The dApp sends an event through WebSockets to the server to register the address
4. The server calls the Alchemy API to register the address with Alchemy Notify

#### **The “send a notification” flow looks like this:**

1. A change happens to the registered address (e.g. they send or receive a transaction)
2. Alchemy Notify calls the server webhook with the change information
3. The server notifies the client through WebSockets a change has been made to the address
4. The website frontend displays the JSON response from the Websocket, with all the metadata

**We’ll go through two versions of the tutorial:**&#x20;

1. Cloning the Github Repo using Heroku
2. Doing it all from scratch

{% tabs %}
{% tab title="Build with Heroku" %}
### 1. Set up a GitHub Repo and Heroku

In this tutorial, you will utilize Heroku for hosting a server and website.

If you choose to use Heroku, be sure to follow all of the following steps.&#x20;

If you want to use another provider, see “Build Project From Scratch”.\


{% embed url="https://github.com/alchemyplatform/Alchemy-Notify-Tutorial" %}

#### a) Make a clone of the existing [Github Repository](https://github.com/ankg/notify\_api\_tutorial/tree/main/build\_with\_heroku)

####

```
git clone https://github.com/alchemyplatform/Alchemy-Notify-Tutorial
cd Alchemy-Notify-Tutorial
```

####

#### b) Install Heroku-CLI and verify/install dependencies

* Download [Heroku-CLI](https://devcenter.heroku.com/articles/heroku-cli) based on your OS
* After installation, open your terminal and run `heroku login`. Follow the commands that follow to login to your Heroku account. If you don't have an account, sign up for one.
* Run `node --version`. You must have **any version of Node greater than 10** installed. If you don’t have it or have an older version, install a more recent version of Node.
* Run `npm --version`. npm is installed with Node, so check that it’s there. If you don’t have it, install a more recent version of Node.\


#### c) Initiate Heroku

* Run `heroku create` to create your Heroku app.&#x20;

\
Take note of the info that pops up in the terminal, especially the URL that looks like this: **http://xxxxxxxxx.herokuapp.com/** We'll be using it later.\


### **2. Create a Webhook with the Alchemy Notify API**

First, let’s look at how notifications with Alchemy work.&#x20;

There are two ways to create and modify notifications: \


1. Through the [Alchemy Notify dashboard](https://dashboard.alchemyapi.io/notify)
2. Through the [Alchemy Notify API](https://docs.alchemy.com/alchemy/documentation/enhanced-apis/notify-api).

\
For our example, we’ll work with both! Let’s start by looking at the dashboard.\


{% hint style="info" %}
If you don’t already have one, you’ll first need to [create an account on Alchemy](https://alchemy.com/?r=affiliate:ba2189be-b27d-4ce9-9d52-78ce131fdc2d). The free version will work fine for getting started.
{% endhint %}

\
Once you have an account, go to the dashboard and select “Notify” from the top menu.&#x20;

Here you’ll see the different kinds of notifications you can set up:\


* Address Activity
* Dropped Transactions
* Mined Transaction
* Gas Price\


![Alchemy Notify API dashboard where web3 developers can create new webhooks.](https://lh4.googleusercontent.com/6cMS5lebS9iSD7sENMxM-u1tD8OtpjYOFdV228XBEoVYf0oeN9f89ApzNj-KsqERerUoHS6eTpuNaYBLEcSE9AEDX5n7r1uuSEuZWYddCDvDtP4Cz8D1knHG6oQWDBrhACU2kuQi)

\
For our example, we’ll use the [Address Activity](https://docs.alchemy.com/alchemy/guides/using-notify#address-activity) notification.&#x20;

You can easily swap out any of the others for your own use case.

In the dashboard you can create all of your notifications, add the addresses you want to monitor, and add the webhook URL that Alchemy should communicate with when a notification gets triggered.&#x20;

Alchemy sends all the relevant details to this webhook. Your server needs to simply create the webhook, receive the call, and process the information as needed.\


#### a) Create a notification by clicking “Create Webhook” within "Address Activity"&#x20;

![Notify API dashboard showing how to create a new webhook based on address activity.](https://lh3.googleusercontent.com/50OU6kmnradfQun\_O9I26kUV9Ife1WYDRpRm0pIXdOnb71244RpVVf-lZQgGITdjiVOhaP\_z77gh8\_a-zw5xliEU3vRtmvIJOuYawX0CYZaPprR0suky4XnWzxc0nydn5QU6sqys)

#### b) Enter the webhook URL&#x20;

Get the Heroku URL that was created from Step 1 and add `/alchemyhook` to the end.&#x20;

\
The Webhook URL will be `http://xxxxxxxxx.herokuapp.com/alchemyhook`\
``

#### c) Enter a test Ethereum address here for our setup.&#x20;

To finish the setup, add a test address like this or copy the wallet address you use for development from your metamask wallet.\
``

`0xab5801a7d398351b8be11c439e05c5b3259aec9b` \


We’ll add the real one we want to monitor programmatically through the API in the next step. \


#### d) Select an app from the dropdown menu&#x20;

Make sure the app selected is on the Ethereum network you want to test on; if you're testing on Rinkeby, select an app configured to it.\


#### **e) Click “Create Webhook”**

![Alchemy address activity webhook interface with the chain, network, webhook URL, and Ethereum address filled in.](<../../.gitbook/assets/Screenshot 2022-05-10 at 2.07.41 PM (1).png>)

### ****

### **3. Insert the Alchemy Webhook ID and Auth Key**

Find your webhook ID in the panel area of the webhook you created.



![Where to find the webhook ID.](<../../.gitbook/assets/Screenshot 2022-05-10 at 2.10.19 PM.png>)



Find the auth token on the top right of the notify page on your dashboard.\


![Where to find the Auth Key for the Alchemy Notify API.](<../../.gitbook/assets/Screenshot 2022-05-10 at 2.13.50 PM.png>)



Open the `server.js` file **** and change lines 37 and 43 in server.js to reflect your particular Alchemy webhook ID and auth token.



{% code title="server.js" %}
```javascript
// add an address to a notification in Alchemy

async function addAddress(new_address) {
  console.log("adding address " + new_address);
  const body = { webhook_id: <your alchemy webhook id>, addresses_to_add: [new_address], addresses_to_remove: [] };
  try {
    fetch('https://dashboard.alchemyapi.io/api/update-webhook-addresses', {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
      headers: { 'X-Alchemy-Token': <your alchemy token> }
    })
      .then(res => res.json())
      .then(json => console.log(json));
  }
  catch (err) {
    console.error(err);
  }
}
```
{% endcode %}



{% hint style="info" %}
**Note**: both values are to be plugged in `server.js` within double quotes like a string. So if your webhook ID is `wh_qykepvarqjh9txk9` please replace `<your alchemy webhook id>` below with`"wh_qykepvarqjh9txk9"`
{% endhint %}

### ****

### **4. Deploy and Test**

```bash
git add .                             // to add changes
git commit -m "added Alchemy keys"    // to add a comment 
git push heroku master                // to push and deploy your heroku app
```

\
That’s all it takes!&#x20;

If you now go to your Heroku deployment URL (e.g. http://xxxxxxxxx.herokuapp.com/), your dApp looks like this:



![Example Heroku deployment URL after the Heroku app was deployed.](https://lh5.googleusercontent.com/nuqJuJQfLEoU8ZGUfgIyrxYlsizbzwpvfT7j56yx7ecfFMjYCIWGOqEPuzux9Q\_jVSoK1ZkDakUFunQCccaIySA\_OqtSxQov2QCP9qO44pOPygjHH0PXdNUaBFGiXQav48kOjye5)

### 5. Add an Address via API

Click “Enable Ethereum” to connect to MetaMask and select a wallet you want to connect to from the drop-down menu**.**



![Enable Ethereum and connect to MetaMask.](https://lh6.googleusercontent.com/DTvb1Jk0H9lwPQ5JsCHzDcjRnwlJUC2icxI0lQxcST3lxv1x5PsCh4-KntAGLGpK9RUn-oeGrjW68Oh7x3QwZy16cdkRjNTQxKVxUFjlrwbpPxoAaq0pZBvX\_S9mKa4AxDX44d4G)



And now click “Enable Notifications on this address” to register the address:



![Confirmation message that the Ethereum wallet address was added to notifications.](https://lh3.googleusercontent.com/g7QOrwgT4Nrlh1lt0gO4koX6wk3np1hXWq2ItnD4nhj\_air5G7UnARo7lPJQh1oA07UzP\_IkgpE5h8o-pUPqjLHLYQQrSz-7Yjw5MOcfbdy8tBN\_7yIpxbEk8ZYdmD1Ci2pLEMsL)



Confirm the wallet address was added to the notification in the Alchemy Dashboard.



![](https://lh6.googleusercontent.com/QfkdEpWdISIjMCyKLxWZhLjfdE82qhDoKC-WGrzFmAsiB1V2jsO3lHDUOn76lcJ1AvDgIgbUszc3XWyqevFQqyRMfo4NHDbwZMspkMFWcR16RvAlVSQrti4BVsiNCLlzM5-b39dL)

And now, with everything in place, you can test out your dApp!



{% hint style="info" %}
If you face any issues in Step 5 or 6 and the behavior is not as expected, you can use the command `heroku logs -t` to view the heroku logs for debugging.
{% endhint %}

###

### 6. Test the notifications

With everything in place, send a small amount of testnet ETH to the address, and you will get a notification from the client with all the necessary details.

**Note:** to use the app, you must click “Enable Ethereum,” connect the desired Metamask address, and click “Enable Notifications”.&#x20;

Then, the webhook’s messages will show up on your frontend.



![Example Ethereum address notification displayed in a dApp. ](<../../.gitbook/assets/Screenshot 2022-05-10 at 2.23.03 PM.png>)

__

Congratulations on your dApp deployment!&#x20;

Feel free to edit your app, change its behavior, or make the frontend more spiffy!
{% endtab %}

{% tab title="Build from Scratch" %}
### **Build project from scratch**

In this tutorial, you will use a generalized setup for a server and website that will allow you to run an Alchemy Notify webhook.\
****

### **1. Create an Express node.js server**

\
The server will be a simple Express node.js server, and it will do three things:



1. Create a WebSocket server to communicate with the client
2. Interact with the Alchemy Notify API to set up/modify notifications
3. Create a webhook URL to receive real-time notifications from Alchemy\


{% hint style="info" %}
This code, with some customization for your specific on-premise server, AWS, or other hosting provider, can be run to power the tutorial. You will need to install express, path, socket.io, and node-fetch into your environment.
{% endhint %}

\
First, start the Express server and establish routes for the client (index.html) and the Alchemy webhook, which allows Alchemy to send real-time notifications to the server.\


### **2. Create a server.js file and set up the webhook routes**

The first step is to create a server.js file in your project folder and set up the appropriate routes for your webhook and web requests.\


```javascript
// server.js
// start the express server with the appropriate routes for our webhook and web requests

var app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  .post('/alchemyhook', (req, res) => { notificationReceived(req); res.status(200).end() })
  .get('/*', (req, res) => res.sendFile('/index.html'))
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
```



{% hint style="info" %}
**Note:** with the above setup, the webhook URL you’ll need later is https://\<yoururl.com>/alchemyhook
{% endhint %}

### ****

### **3. Emit notification to clients**

If a notification is received by the webhook, you may want to do any necessary processing and then send it back to the client.&#x20;

In this simple case, you'll just emit the notification to all clients using WebSockets.



```javascript
// server.js
// notification received from Alchemy from the webhook. Let the clients know.
function notificationReceived(req) {
  console.log("notification received!"); 
  io.emit('notification', JSON.stringify(req.body));
}
```

****

### **4. Start your WebSocket server**

Now, start the WebSockets server to communicate with the client dApp.

In this example, you can use a library that sits on top of WebSockets, [socket.io](http://socket.io).



```javascript
// server.js
// start the websocket server
const io = socketIO(app);
```

###

### 5. Listen for client connections/calls on the WebSocket server&#x20;

With the WebSockets connection established, listen for clients to connect and disconnect.&#x20;

You can also listen for specific calls from our clients.&#x20;

In this example, we want to listen for clients that want to add new Ethereum addresses to be monitored, using `register address`.



```javascript
//server.js
// listen for client connections/calls on the WebSocket server

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
  socket.on('register address', (msg) => {
    //send address to Alchemy to add to notification
    addAddress(msg);
  });
});
```

###

### 6. Add Alchemy Notify API functionality&#x20;

When you receive a client request to add an address, you can use the Alchemy API to register the address with your Alchemy Notification.\
****

```javascript
//server.js
// add an address to a notification in Alchemy

async function addAddress(new_address) {
  console.log("adding address " + new_address);
  const body = { webhook_id: <your alchemy webhook id>, addresses_to_add: [new_address], addresses_to_remove: [] };
  try {
    fetch('https://dashboard.alchemyapi.io/api/update-webhook-addresses', {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
      headers: { 'X-Alchemy-Token': <your alchemy token> }
    })
      .then(res => res.json())
      .then(json => console.log(json));
  }
  catch (err) {
    console.error(err);
  }
}
```



{% hint style="info" %}
**Note:** Be sure to replace _**\<your alchemy token>**_ with your **auth token** found on the Alchemy Dashboard. The `webhook_id` here is a unique ID provided by Alchemy when we create the webhook in the next step.
{% endhint %}

\
Anything we can do in the Alchemy Notify dashboard we can also do programmatically through the [Alchemy Notify API](https://docs.alchemy.com/alchemy/documentation/apis/enhanced-apis/notify-api). We can create new notifications, modify them, add and remove addresses, etc.&#x20;

For example, here is a quick call to get a list of all our Alchemy webhooks:\


```javascript
// server.js

async function getWebhooks() {
  try {
    fetch('https://dashboard.alchemyapi.io/api/team-webhooks', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      headers: { 'X-Alchemy-Token': <your alchemy token> }
    })
      .then(res => res.json())
      .then(json => console.log(json));
  }
  catch (err) {
    console.error(err);
  }
}
```

\
Your server is ready! \
\
Here is the entire sample _server.js_ we have created together:



```javascript
const express = require('express')
const path = require('path')
const socketIO = require('socket.io');
const PORT = process.env.PORT || 5000
const fetch = require('node-fetch');

// start the express server with the appropriate routes for our webhook and web requests
var app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  .post('/alchemyhook', (req, res) => { notificationReceived(req); res.status(200).end() })
  .get('/*', (req, res) => res.sendFile(path.join(__dirname + '/index.html')))
  .listen(PORT, () => console.log(`Listening on ${PORT}`))

// start the websocket server
const io = socketIO(app);

// listen for client connections/calls on the WebSocket server
io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
  socket.on('register address', (msg) => {
    //send address to Alchemy to add to notification
    addAddress(msg);
  });
});

// notification received from Alchemy from the webhook. Let the clients know.
function notificationReceived(req) {
  console.log("notification received!"); 
  io.emit('notification', JSON.stringify(req.body));
}

// add an address to a notification in Alchemy
async function addAddress(new_address) {
  console.log("adding address " + new_address);
  const body = { webhook_id: <your alchemy webhook id>, addresses_to_add: [new_address], addresses_to_remove: [] };
  try {
    fetch('https://dashboard.alchemyapi.io/api/update-webhook-addresses', {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
      headers: { 'X-Alchemy-Token': <your alchemy token> }
    })
      .then(res => res.json())
      .then(json => console.log(json));
  }
  catch (err) {
    console.error(err);
  }
}
```



{% hint style="info" %}
**Note**: The webhook ID and the alchemy auth token comes from the Alchemy UI which we use to create our webhook in the next step!
{% endhint %}

###

### 7. Complete **Steps 2 & 3** from the Heroku-Serviced Project

In [steps 2 and 3 from the Heroku-Serviced project](https://docs.alchemy.com/alchemy/tutorials/building-a-dapp-with-real-time-transaction-notifications#2.-alchemy-notify-api-and-register-webhook-notifications), you will:



* Create a new webhook
* Create an alchemy webhook URL
* Get your webhook ID&#x20;
* Get your Notify API Auth Key&#x20;



### **8. Create the frontend for your dApp**

Finally, we’ll build our dApp. Our example client is extremely simple. Of course, you’ll want to integrate this code into your dApp as appropriate.



Our dApp is a simple HTML/JavaScript page that does several things:



* Connect to our WebSockets server to communicate with the server
* Use web3 to connect to a browser wallet (such as MetaMask)
* Send a wallet address to the server to be monitored
* Receive notifications from the server when the server receives Alchemy notifications



{% hint style="info" %}
**Note**: You need two JavaScript libraries for this code to work: socket.io and web3.
{% endhint %}

####

#### a) Connect to the WebSocket server and listen for incoming notifications

First, you'll establish your WebSocket connection with the client, and then, you can set up a listener to receive messages from the server (e.g. address notifications).

We’ll simply display the contents of the notification in this example, but you’d obviously want to do something more interesting:



```javascript
<script>
    // connect to WebSocket server and start listening for notifications
    let socket = io();
    let el;
    socket.on('notification', (notificationBody) => {
      console.log("got notification");
      el = document.getElementById('server-notification');
      el.innerHTML = 'Look what just happened!: ' + notificationBody;
    });
  </script>
```

#### ****

#### **b) Emit new addresses to monitor to the WebSocket server**

The second piece of interesting code happens when the user clicks to add their Ethereum address to the list of monitored addresses.&#x20;

When the user clicks the “enable notifications on my address” button, the code emits an event to the WebSockets requesting to register a new address.&#x20;

As we saw above, the server then receives this event and sends the new address to the Alchemy API to register in the Alchemy Notification, closing our loop.



```javascript
enableNotificationsButton.addEventListener('click', function (e) {
      e.preventDefault();
      console.log("send address");
      if (showAccount.innerHTML) {
        socket.emit('register address', showAccount.innerHTML);
      }
      alert(showAccount.innerHTML + " added to notifications.")
    });
```

****\
****Here is the entire sample index.html client that we built:



```javascript
<html>

<head>
  <script src="/socket.io/socket.io.js"></script>
  <script src="web3.js"></script>
  <script>
    // connect to WebSocket server and start listening for notifications
    let socket = io();
    let el;
    socket.on('notification', (notificationBody) => {
      console.log("got notification");
      el = document.getElementById('server-notification');
      el.innerHTML = 'Look what just happened!: ' + notificationBody;
    });
  </script>
</head>

<body>
  <button class="enableEthereumButton">Enable Ethereum</button>
  <h2>Account: <span class="showAccount"></span></h2>
  <button class="enableNotificationsButton">Enable Notifications on this address</button>
  <script>
    const ethereumButton = document.querySelector('.enableEthereumButton');
    const showAccount = document.querySelector('.showAccount');
    const enableNotificationsButton = document.querySelector('.enableNotificationsButton');
    // when clicked, send request to server to register the connected Ethereum address with Alchemy
    enableNotificationsButton.addEventListener('click', function (e) {
      e.preventDefault();
      console.log("send address");
      if (showAccount.innerHTML) {
        socket.emit('register address', showAccount.innerHTML);
      }
      alert(showAccount.innerHTML+" added to notifications.")
    });
    // when clicked, connect to a web3 Ethereum wallet and get the active account
    ethereumButton.addEventListener('click', () => {
      getAccount();
    });
    async function getAccount() {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      showAccount.innerHTML = account;
    }
  </script>
  <p id="server-notification"></p>
</body>

</html>
```

\
That’s all it takes! With a quick build and deploy, our dApp looks like this:



![An example of a dApp with real-time transaction notifications.](https://lh5.googleusercontent.com/nuqJuJQfLEoU8ZGUfgIyrxYlsizbzwpvfT7j56yx7ecfFMjYCIWGOqEPuzux9Q\_jVSoK1ZkDakUFunQCccaIySA\_OqtSxQov2QCP9qO44pOPygjHH0PXdNUaBFGiXQav48kOjye5)

{% hint style="info" %}
**Note:** You can deploy the above code on your provider of choice like AWS, Digital Ocean or Heroku. For the purposes of this section, we've deployed to Heroku.
{% endhint %}

###

### 9. Add an address via API

\
Click “Enable Ethereum” to connect to MetaMask and select a wallet you want to connect to from the drop-down menu.



![Connecting the dApp frontend to MetaMask and selecting a wallet.](https://lh6.googleusercontent.com/DTvb1Jk0H9lwPQ5JsCHzDcjRnwlJUC2icxI0lQxcST3lxv1x5PsCh4-KntAGLGpK9RUn-oeGrjW68Oh7x3QwZy16cdkRjNTQxKVxUFjlrwbpPxoAaq0pZBvX\_S9mKa4AxDX44d4G)

\
And now click “Enable Notifications on this address” to register our address:\


![Confirmation message that notifications were enabled for the selected address.](https://lh3.googleusercontent.com/g7QOrwgT4Nrlh1lt0gO4koX6wk3np1hXWq2ItnD4nhj\_air5G7UnARo7lPJQh1oA07UzP\_IkgpE5h8o-pUPqjLHLYQQrSz-7Yjw5MOcfbdy8tBN\_7yIpxbEk8ZYdmD1Ci2pLEMsL)

\
Now, confirm the wallet address has been added to the notification in your Dashboard.\


![Alchemy Dashboard with the Ethereum address listed underneath a webhook that monitors address activity.](https://lh6.googleusercontent.com/QfkdEpWdISIjMCyKLxWZhLjfdE82qhDoKC-WGrzFmAsiB1V2jsO3lHDUOn76lcJ1AvDgIgbUszc3XWyqevFQqyRMfo4NHDbwZMspkMFWcR16RvAlVSQrti4BVsiNCLlzM5-b39dL)

###

### 10. Test your notifications

Now, send a small amount of testnet ETH to your address, to get a notification from the client with all the necessary details.



![Example notification that is received when ETH was sent to a monitored Ethereum address.](<../../.gitbook/assets/Screenshot 2022-05-10 at 2.23.03 PM.png>)

\
This is a simple example, but there are many ways you can expand on this to build a dApp that is real-time responsive for your users.

Congratulations on your dApp deployment!&#x20;

Feel free to edit your app, change its behavior, or make the frontend more spiffy!

Fork 🍴, build 🏗️, and design 📝off [this repo](https://github.com/alchemyplatform/Alchemy-Notify-Tutorial)!\


{% embed url="https://github.com/alchemyplatform/Alchemy-Notify-Tutorial" %}
{% endtab %}
{% endtabs %}

And that's it! You now know how to use Alchemy Notify v2 to add notifications to your dApp!\
****\
****If you enjoyed this tutorial for setting Alchemy Notify on your dApp, give us a tweet [@AlchemyPlatform](https://twitter.com/AlchemyPlatform)_,_ or share questions/feedback with the authors [@crypt0zeke](https://twitter.com/crypt0zeke) and [@ankg404](https://twitter.com/ankg404).

Don't forget to join our [Discord server](https://www.alchemy.com/discord) to meet other blockchain devs, builders, and entrepreneurs!\
\
**Ready to start using Alchemy Notify?** [**Create a free Alchemy account**](https://alchemy.com/?r=affiliate:ba2189be-b27d-4ce9-9d52-78ce131fdc2d) **and start building!**
