---
description: Guide for deploying your NFT minter to a live website
---

# 🛠 How to Build an NFT Website

## How to Know When You're Ready to Deploy to a Live Site

### 1. You are ready to share your NFT with the world!

By now, you have likely already created an NFT on your local machine via 🎨 [How to Mint an NFT](../how-to-create-an-nft/how-to-mint-a-nft.md) or  📝 [NFT Minter Tutorial: How to Create a Full Stack DApp](./). However, you may now want to share your creation with family, friends, or potential customers. To take the next step, this often means hosting your minting scripts/frontend apps on an online web hosting service so that anyone can take part in your NFT! Many of these services include access to a public URL so that anyone can search and visit your website online.

### 2. Infrastructure constraints on your local computing environment 

For users with operating systems/hardware that do not natively support web3 packages/other dependencies needed to run Alchemy's NFT tutorials, deploying online on cloud computing providers may empower these users to compile and run code. Cloud services often provide an alternative for developers that will not require you to change your hardware, configure VMs, or add more infrastructure to your local environment. 

## Deploying Your Code to a Live Website

### Pick a Web Hosting Service!

When deploying your code online, developers first need to choose an online web hosting service that best suits their needs! For this step, you have many choices. 

Here are a few services that are commonly used for consumer-grade web applications:

* [Heroku](https://www.heroku.com) 
* [DigitalOcean](https://www.digitalocean.com) 
* [PythonAnywhere](https://www.pythonanywhere.com) 

{% hint style="info" %}
**NOTE:** All of these services listed above offer varying free tiers to get you up and running as quickly as possible!
{% endhint %}

If you've followed along with some of Alchemy's tutorials on Enhanced APIs, like ♻️[Tracking Transaction Life Cycles](../tracking-transaction-life-cycles.md) or 📜 [Integrating Historical Transaction Data into your dApp](../transfers-tutorial.md), you may have noticed that our forkable Github code repos are written and configured to be fully deployable Heroku projects that so that developers can easily run sample dashboards and code snippets. Give one of them a try to better understand how you can also deploy code that runs on web hosting providers!

### Hints & Tips on Web Hosting!

Each web hosting service has its own configuration parameters and quirks so after picking a web hosting provider, you should refer to their official documentation to get the latest and most up-to-date information on getting started! 

However, there are few areas that will likely be different from your experience deploying on your local machine — creating environment variables and maintaining uptime.

#### Creating Environment Variables

Normally, environment variables are stored in a `.env `file on our local machine.  With some online web hosting services, this is not the case.  As an example, in Heroku, we define Heroku-specific environment variables through the Heroku command-line interface.  To set an environment variable on Heroku for your Alchemy Key for instance, we would run the following command: 

```
heroku config:set KEY="<YOUR ALCHEMY KEY>"
```

Then, to confirm that it is properly configured, you can view environment variables on Heroku with: `heroku config`

If configured correctly, your Heroku environment variables should look similar to this:

![](https://gblobscdn.gitbook.com/assets%2F-MB17w56kk7ZnRMWdqOL%2F-MfdCP_qKo19vw3OqEXG%2F-MfdEFNE3pdGil4pzl6Z%2Fimg.PNG?alt=media\&token=9a5cea16-9d51-4e90-b77a-fabda56b14f4)

For other web hosting services, this setup process might look different.  For instance, with Digital Ocean, you can even create environment variables within your account's dashboard UI!  

#### Maintaining Uptime

While many web hosting services offer sufficient uptime for dashboards/scripts, trial tier accounts may not provide enough coverage for production-grade applications. For some services, applications that are not used within a certain time frame are put into a "sleeping state" and may not be able to serve content when hit with a POST or GET request.  

If you want your cloud-hosted dashboards/scripts to stay awake for a longer period of time, you may need to pay for more computational allowance or regularly run scheduled jobs at regular intervals to ensure you have full uptime

{% hint style="info" %}
If you are using Heroku, look at pre-built methods for keeping your apps awake such as [Hero-Kaffeine](https://kaffeine.herokuapp.com), which will regularly send your Heroku app a GET request, or [Heroku's built-in scheduler](https://devcenter.heroku.com/articles/scheduler).  
{% endhint %}
