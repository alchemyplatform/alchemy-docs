# Unstoppable Domains APIs

**How to setup your Alchemy account and start querying the APIs**

## Introduction

The Unstoppable Resolution Service API provides the functionalities for getting domain data and metadata regardless of that domain’s location, whether it is stored on Ethereum, Zilliqa, Polygon, or any other blockchain. The API is used to cache blockchain events in a database for easy retrieval without accessing blockchain APIs.

With the API, you can quickly build applications that directly communicate with the blockchain to get Unstoppable domain data with a single API request.

{% hint style="info" %}
Unstoppable Domains also provides a set of libraries to ease the integration of domain resolution into your applications. Please see the [Resolution Libraries Overview](https://docs.unstoppabledomains.com/developer-toolkit/resolution-libraries/libraries-overview/) for a detailed description and configuration.
{% endhint %}

## Getting Started&#x20;

Here’s a guide on setting up your Alchemy account and querying the Unstoppable Domains APIs.

{% embed url="https://www.loom.com/share/7cd5398275e74d8ba024323985cd90c7" %}
Unstoppable Domains APIs Quickstart Video
{% endembed %}



## API Endpoints Overview&#x20;

### Get records for a domain

#### Gets all the records attached to a domain name

This method takes a domain name as input and returns all the records and metadata attached to the domain. View the complete documentation for `get records for a domain` here:

{% content-ref url="get-records-for-a-domain.md" %}
[get-records-for-a-domain.md](get-records-for-a-domain.md)
{% endcontent-ref %}

### Get records for owner addresses

#### Gets the transfer history of a domain name

This method takes a wallet address or resolution record as input and returns all the domain names that the address owns or configured to the resolution record with their records and metadata. View the complete documentation for `get records for owner addresses` here:

{% content-ref url="get-records-for-owner-addresses.md" %}
[get-records-for-owner-addresses.md](get-records-for-owner-addresses.md)
{% endcontent-ref %}

### Get domain transfer events

#### Gets the transfer history of a domain name

This method takes a domain name as input and returns the transfer history of that domain with their block number and transferring wallet addresses. View the complete documentation for `get domain transfer events` here:

{% content-ref url="get-domain-transfer-events.md" %}
[get-domain-transfer-events.md](get-domain-transfer-events.md)
{% endcontent-ref %}

### Error Codes

To learn about the error codes you might encounter while using the API, visit the Unstoppable Domains [Resolution Service Errors](https://docs.unstoppabledomains.com/developer-toolkit/resolution-service-api/#error-codes).
