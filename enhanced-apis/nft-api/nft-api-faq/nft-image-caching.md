---
description: How to use Alchemy's cache of NFT images instead of third-party services
---

# NFT Image Caching

### Why does Alchemy Cache NFT Media?

While NFT media is traditionally served from IPFS/third-party servers, developers often face slow loading times and timeout errors when using these endpoints. Alchemy solves this problem by caching NFT images and serving up NFT URLs from our own cache.&#x20;

### How do I use Alchemy-hosted NFT media?

Where available, Alchemy will replace the default `gateway` field of the NFT `media` object with a Cloudinary URL.&#x20;

{% tabs %}
{% tab title="Alchemy-hosted NFT Asset" %}
![Alchemy-hosted NFT Asset](<../../../.gitbook/assets/Screen Shot 2022-05-25 at 4.56.25 PM.png>)
{% endtab %}

{% tab title="Third-party hosted NFT Asset" %}
![Third-party hosted NFT Asset](<../../../.gitbook/assets/Screen Shot 2022-05-25 at 4.55.23 PM.png>)
{% endtab %}
{% endtabs %}

Here's an example of a Moonbird NFT asset cached by Alchemy:\
[https://res.cloudinary.com/alchemyapi/image/upload/mainnet/07783aaf80e4c4497725b2da0af33394.png](https://res.cloudinary.com/alchemyapi/image/upload/mainnet/07783aaf80e4c4497725b2da0af33394.png)

![](<../../../.gitbook/assets/image (47).png>)

{% hint style="info" %}
NOTE: We're working on expanding coverage of Alchemy-hosted NFT endpoints. Feel free to reach out to support@alchemy.com for specific questions!
{% endhint %}

### Image Resizing

When using Alchemy-hosted NFT media, developers can request resized images for thumbnails, smartphone, tablet and/or laptop viewing. To use image resizing, simply change the URL to include width and height pixel values.\
\
**Base Cloudinary URL:**\
https://res.cloudinary.com/alchemyapi/image/upload/\
\
**Base Cloudinary URL with Width & Height Values:**\
https://res.cloudinary.com/alchemyapi/image/upload/w\_250,h\_250/

{% hint style="info" %}
NOTE: Developers can use any combination of width and height pixel values to create the desired aspect ratio for visual displays.
{% endhint %}

Here's an example of a resized Moonbird NFT cached by Alchemy:\
[https://res.cloudinary.com/alchemyapi/image/upload/w\_250,h\_250/mainnet/07783aaf80e4c4497725b2da0af33394.png](https://res.cloudinary.com/alchemyapi/image/upload/w\_250,h\_250/mainnet/07783aaf80e4c4497725b2da0af33394.png)

<img src="../../../.gitbook/assets/image (48).png" alt="" data-size="original">

\
\
