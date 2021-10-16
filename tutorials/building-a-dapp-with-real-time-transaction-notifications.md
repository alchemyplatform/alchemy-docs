---
description: Tutorial for integrating transaction activity notifications into your dApp.
---

# 📱 Building a dApp with Real-Time Transaction Notifications

dApps on Ethereum have come a long way over the last several years, both in popularity and in complexity. Unfortunately, the user experience of most dApps is still lacking in comparison to web2 applications.

One key piece missing is real-time notifications of events. Users need to know immediately when their trades execute, when their transactions fail, when their auction bid has been accepted, or when a wallet of interest has aped into some new token. Without these notifications, trades can be missed, critical actions are forgotten, and ultimately users end up abandoning your dApp. 

Unfortunately, building these real-time notifications into your dApp has traditionally been complicated, time-consuming, and error-prone. But now with [Alchemy Notify](https://www.alchemy.com/notify), sending real-time push notifications to your users for critical events such as dropped transactions, mined transactions, wallet activity, and even gas price changes is straightforward, easy, and dependable. 

In this tutorial, we’ll look at an example of how, with just a few lines of code, your dApp can integrate the 🔋 power of Alchemy Notify.

### **Overview**

1. High level walkthrough of the example project
2. Build the project using Heroku
   1. Clone [Github Repo](https://github.com/pileofscraps/alchemy_notify.git) & Set Up Heroku 
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

For our example, we’ll create a dApp that notifies users, in real-time, when activity happens on  specific Ethereum addresses. For our architecture, we’ll use [Express](http://expressjs.com) for our server, [WebSockets](https://docs.alchemy.com/alchemy/guides/using-websockets) to communicate between the client and server, and Alchemy Notify to monitor an address and send a push notification when there is activity on that address. 

{% hint style="info" %}
If you don't want to spend real (mainnet) Ethereum to try out this tutorial, you can follow the same process using a testnet, like Rinkeby, so that you can send transactions to and from your target address for testing without paying for gas ⛽
{% endhint %}

Our example dApp will perform two functions: First, it will register a user’s address for notifications, and second it will send a notification to that user when they receive or send transactions.

The “register a user’s address for notifications” flow looks like this:

1. A user connects to their wallet through the dApp
2. The user clicks to register their wallet address to be monitored
3. The dApp sends an event through WebSockets to the server to register the address
4. The server calls the Alchemy API to register the address with Alchemy Notify

The “send a notification” flow looks like this:

1. A change happens to the registered address - they either send or receive a transaction
2. Alchemy Notify calls the server webhook with the change information
3. The server notifies the client through WebSockets that a change has been made to the address
4. Website frontend displays the JSON response from the Websocket, inclusive of all the transaction metadata

**We’ll go through two versions of the tutorial: the first by cloning the Github Repo using Heroku and the second by doing it all from scratch. **

## **Build Heroku-Serviced Project**

### 1. Set Up Github Repo & Heroku 

In this tutorial, we utilize Heroku for hosting a server and website; if you choose to use heroku, be sure to follow all of the following steps.  (If you want to use another provider, see “Build Project From Scratch”)

#### a) Make a clone of the existing [Github Repository](https://github.com/pileofscraps/alchemy_notify.git)

```
git clone https://github.com/alchemyplatform/Alchemy-Notify-Tutorial

cd alchemy_notify
```

#### b) Install Heroku-CLI and verify/install dependencies

* Download [Heroku-CLI](https://devcenter.heroku.com/articles/heroku-cli) based on your OS
* After installation, open your terminal and run heroku login; follow the commands that follow to login to your Heroku account. If you don't have a Heroku account, you can sign up for one!
* Run `node --version`. You must have any version of Node greater than 10 installed. If you don’t have it or have an older version, install a more recent version of Node.
* Run `npm --version`. npm is installed with Node, so check that it’s there. If you don’t have it, install a more recent version of Node:

#### c) Initiate Heroku

* Run `heroku create` to create your heroku app.  Take note of the info that pops up in the terminal, especially the URL that looks like **http://xxxxxxxxx.herokuapp.com/** We'll be using it!

### **2. Alchemy Notify API & Register Webhook Notifications**

First, let’s look at how notifications with Alchemy work. There are two ways to create and modify notifications: through the [Alchemy Notify dashboard](https://dashboard.alchemyapi.io/notify), and through the [Alchemy Notify API](https://docs.alchemy.com/alchemy/documentation/enhanced-apis/notify-api). For our example, we’ll work with both! Let’s start by looking at the dashboard.

{% hint style="info" %}
If you don’t already have one, you’ll first need to [create an account on Alchemy](https://alchemy.com/?r=affiliate:ba2189be-b27d-4ce9-9d52-78ce131fdc2d). The free version will work fine for getting started. 
{% endhint %}

Once you have an account, go to the dashboard and select “Notify” from the top menu. Here you’ll see the different kinds of notifications you can set up:

* Address Activity
* Dropped Transactions
* Mined Transaction
* Gas Price

![](https://lh4.googleusercontent.com/6cMS5lebS9iSD7sENMxM-u1tD8OtpjYOFdV228XBEoVYf0oeN9f89ApzNj-KsqERerUoHS6eTpuNaYBLEcSE9AEDX5n7r1uuSEuZWYddCDvDtP4Cz8D1knHG6oQWDBrhACU2kuQi)

For our example, we’ll use the [Address Activity](https://docs.alchemy.com/alchemy/guides/using-notify#address-activity) notification, but you should be able to easily swap out any of the others for your own use case.

In the dashboard you can create all of your notifications, add the addresses you want to monitor, and add the webhook URL that Alchemy should communicate with when that notification triggers. Alchemy sends all the relevant details to this webhook. Your server needs to simply create the webhook, receive the call, and process the information as needed. 

#### **a) Create our example notification by clicking “Create Webhook” on Address Activity. **

![](https://lh3.googleusercontent.com/50OU6kmnradfQun_O9I26kUV9Ife1WYDRpRm0pIXdOnb71244RpVVf-lZQgGITdjiVOhaP_z77gh8\_a-zw5xliEU3vRtmvIJOuYawX0CYZaPprR0suky4XnWzxc0nydn5QU6sqys)

#### **b) Enter our webhook URL **

* If using Heroku, see Step 1 for the http://xxxxxxxxx.herokuapp.com/ URL that was generated with heroku create
* If doing from scratch, insert your custom webhook URL from whichever service provider you are using.  

#### **c) Enter a test Ethereum address (0xab5801a7d398351b8be11c439e05c5b3259aec9b) here for our setup. **

(We’ll add the real one we want to monitor programmatically through the API in the next step). ** **

#### **d) Select an app from the dropdown menu **

Make sure the app selected is on the Ethereum network you want to test on; if you're testing on Rinkeby, select an app configured to it!

#### **e) Click “Create Webhook” and we’re done!**

![](https://lh4.googleusercontent.com/woxlK123MzEXyYHi8y9Wcbp3aQ5AFIUbU2qUTDZO2I-BEYOxEctTLbUkZ0G367eRQUGs4wnW62ggMvIWegyTSXdtN1s73da_dDO2UjLYmqrdBKD7dDPNSG4s-Chwbn2MP6tDlLjC)

### **3. Insert Alchemy Webhook Id and Auth Key**

Open the `server.js` file.  Change lines 37 and 43 in server.js to reflect your particular Alchemy webhook id and auth token! \
****

```

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

### **4. Deploy and Test**

```
git add .                             // to add changes
git commit -m "added Alchemy keys"    // to add a comment 
git push heroku master                // to push and deploy your heroku app
```

Click “Enable Ethereum” to connect to MetaMask and select a wallet you want to connect to from the drop-down menu.

![](https://lh6.googleusercontent.com/DTvb1Jk0H9lwPQ5JsCHzDcjRnwlJUC2icxI0lQxcST3lxv1x5PsCh4-KntAGLGpK9RUn-oeGrjW68Oh7x3QwZy16cdkRjNTQxKVxUFjlrwbpPxoAaq0pZBvX_S9mKa4AxDX44d4G)

And now click “Enable Notifications on this address” to register our address:

![](https://lh3.googleusercontent.com/g7QOrwgT4Nrlh1lt0gO4koX6wk3np1hXWq2ItnD4nhj_air5G7UnARo7lPJQh1oA07UzP_IkgpE5h8o-pUPqjLHLYQQrSz-7Yjw5MOcfbdy8tBN\_7yIpxbEk8ZYdmD1Ci2pLEMsL)

We can confirm in our Alchemy Dashboard that our wallet address has been added to the notification.

![](https://lh6.googleusercontent.com/QfkdEpWdISIjMCyKLxWZhLjfdE82qhDoKC-WGrzFmAsiB1V2jsO3lHDUOn76lcJ1AvDgIgbUszc3XWyqevFQqyRMfo4NHDbwZMspkMFWcR16RvAlVSQrti4BVsiNCLlzM5-b39dL)

And now, with everything in place, you can test out your dApp!  

_🎉** Congratulations on your dApp deployment! Feel free to edit your app, change its behavior, or make the frontend more spiffy!**_

### **5. **[**Conclusion**](https://docs.alchemy.com/alchemy/tutorials/building-a-dapp-with-real-time-transaction-notifications#9-conclusion)****

## **Build Project From Scratch**

In this tutorial, we provide a generalized setup for a server and website that will allow you to run an Alchemy Notify webhook.

### **1. Create Express Server**

Our server will be a simple Express node.js server. It will do three things:

1. Create a WebSocket server to communicate with the client
2. Interact with the Alchemy API to set up/modify notifications
3. Create a webhook URLto receive the real-time notifications from Alchemy 

This code, with some customization for your specific on-prem, AWS, or other hosting provider, can be run to power the tutorial. You will need to install express, path, socket.io, and node-fetch into your environment. 

First, we need to start our Express server and establish the routes for our client (index.html) and our Alchemy webhook. This Alchemy webhook allows Alchemy to send real-time notifications to our server.

### **2. Create a server.js file in your project folder and set up the appropriate routes for our webhood and web requests.**

```
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
With this setup above, the webhook URL we’ll need later is https://\<yoururl.com>/alchemyhook
{% endhint %}

### **3. Emit notification to clients**

If a notification is received by our webhook, we want to do any necessary processing and then send it back to the client. In our simple case, we’ll just emit the notification to all clients using WebSockets.

```
// server.js
// notification received from Alchemy from the webhook. Let the clients know.
function notificationReceived(req) {
  console.log("notification received!"); 
  io.emit('notification', JSON.stringify(req.body));
}

```

### **4. Start WebSocket server.**

Let’s start our WebSockets server. This is how we will communicate with our client dApp. WebSockets allow bidirectional communication between our client dApp and our Express server. In our example, we’ll use a library that sits on top of WebSockets, [socket.io](http://socket.io).

```
// server.js
// start the websocket server
const io = socketIO(app);

```

### **5. Listen for client connections and calls on the WebSocket server **

With our WebSockets connection established, we can listen for clients to connect and disconnect. We can also listen for specific calls from our clients. In our example, we want to listen for clients that want to add new Ethereum addresses to be monitored, using register address_**.**_

```
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

### **6. Add Alchemy Notify API functionality.  **

When we receive a client request to add an address, we use the Alchemy API to register the address with our Alchemy Notification. 

(Be sure to replace _**\<your alchemy token>**_ with your auth token found on the Alchemy Dashboard.) The _**webhook_id **_here is a unique ID provided by Alchemy when we create the webhook (in the next step).\
****

```
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

A word about the Alchemy API: Anything we can do in the Alchemy Notify dashboard we can also do programmatically through the [Alchemy Notify API](https://docs.alchemy.com/alchemy/documentation/apis/enhanced-apis/notify-api). We can create new notifications, modify them, add and remove addresses, and so on. For example, here is a quick call to get a list of all our Alchemy webhooks:

```

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

**Our server is ready! **Here is the entire sample _server.js_ we have created together:

```
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
The webhook id and the alchemy auth token comes from the Alchemy UI which we use to create our webhook in the next step!  
{% endhint %}

### **7. Complete **[**Steps 2 & 3**](https://docs.alchemy.com/alchemy/tutorials/building-a-dapp-with-real-time-transaction-notifications#2-alchemy-notify-api-and-register-webhook-notifications)** from the Heroku-Serviced Project. **

### **8. Create the frontend for your dApp**

Finally, we’ll build our dApp. Our example client is extremely simple. Of course, you’ll want to integrate this code into your dApp as appropriate.

Our dApp is a simple HTML/JavaScript page that does several things:

* Connect to our WebSockets server to communicate with the server
* Use web3 to connect to a browser wallet (such as MetaMask)
* Send a wallet address to the server to be monitored
* Receive notifications from the server when the server receives Alchemy notifications

{% hint style="info" %}
Note: You’ll need two JavaScript libraries for this code to work: socket.io and web3.
{% endhint %}

#### **a) **Connect to WebSocket server and listen for incoming notifications

First, we establish our WebSocket connection with the client. Then, we set up a listener to receive messages from the server; in this case, our address notifications. We’ll simply display the contents of the notification in this example, but you’d obviously want to do something more interesting:

```
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

#### **b) Emit new addresses to monitor to the WebSocket server**

The second piece of interesting code happens when the user clicks to add their Ethereum address to the list of monitored addresses. When the user clicks the “enable notifications on my address” button, the code emits an event to WebSockets requesting to register a new address. As we saw above, the server then receives this event and sends the new address to the Alchemy API to register in the Alchemy Notification, closing our loop.

```
enableNotificationsButton.addEventListener('click', function (e) {
      e.preventDefault();
      console.log("send address");
      if (showAccount.innerHTML) {
        socket.emit('register address', showAccount.innerHTML);
      }
      alert(showAccount.innerHTML + " added to notifications.")
    });

```

Here is the entire sample index.html client that we built:

```
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

That’s all it takes! With a quick build and deploy, our dApp looks like this:\
****

![](https://lh5.googleusercontent.com/nuqJuJQfLEoU8ZGUfgIyrxYlsizbzwpvfT7j56yx7ecfFMjYCIWGOqEPuzux9Q_jVSoK1ZkDakUFunQCccaIySA_OqtSxQov2QCP9qO44pOPygjHH0PXdNUaBFGiXQav48kOjye5)

Click “Enable Ethereum” to connect to MetaMask and select a wallet you want to connect to from the drop-down menu.e

![](https://lh6.googleusercontent.com/DTvb1Jk0H9lwPQ5JsCHzDcjRnwlJUC2icxI0lQxcST3lxv1x5PsCh4-KntAGLGpK9RUn-oeGrjW68Oh7x3QwZy16cdkRjNTQxKVxUFjlrwbpPxoAaq0pZBvX_S9mKa4AxDX44d4G)

And now click “Enable Notifications on this address” to register our address:

![](https://lh3.googleusercontent.com/g7QOrwgT4Nrlh1lt0gO4koX6wk3np1hXWq2ItnD4nhj_air5G7UnARo7lPJQh1oA07UzP_IkgpE5h8o-pUPqjLHLYQQrSz-7Yjw5MOcfbdy8tBN\_7yIpxbEk8ZYdmD1Ci2pLEMsL)

We can confirm in our Alchemy Dashboard that our wallet address has been added to the notification.

![](https://lh6.googleusercontent.com/QfkdEpWdISIjMCyKLxWZhLjfdE82qhDoKC-WGrzFmAsiB1V2jsO3lHDUOn76lcJ1AvDgIgbUszc3XWyqevFQqyRMfo4NHDbwZMspkMFWcR16RvAlVSQrti4BVsiNCLlzM5-b39dL)

And now, with everything in place, if we send a small amount of testnet ETH to our address, we get a notification from the client with all the necessary details!  Note that to use the app, you must first click “Enable Ethereum” and connect with your desired Metamask address.  Then, you must click “Enable Notifications”.  Then, the webhook’s messages will show up on your frontend!\
****

![](https://lh3.googleusercontent.com/egp_nnpXE-jFvWY66ucZovACyUi3XgiTRb11uqLAifq1xM1-a5p1zT6Vbd4Iq08yJgai119-lzCqqbWQkbMQonHwFqryvC1xURSnc2EUYCmBaPEtu8engWXliCR0TvkSwx8L5pZb)

This is a simple example, but there are many ways you can expand on this to build a dApp that is real-time responsive for your users.  

Fork 🍴, build 🏗️, and design 📝off this repo!

### **9. Conclusion**

Blockchain has evolved quickly, but blockchain user experience continues to be a discouraging experience, causing users to abandon dApps quickly. However, with Alchemy Notify, your users can stay informed and confident about their app usage and transaction activity.\
****

**Ready to start using Alchemy Notify? **[**Create a free Alchemy account**](https://alchemy.com/?r=affiliate:ba2189be-b27d-4ce9-9d52-78ce131fdc2d)** and get started today!**\
