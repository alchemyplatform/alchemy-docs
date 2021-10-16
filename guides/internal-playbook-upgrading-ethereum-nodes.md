---
description: >-
  Check out this internal playbook for why, when, and how we upgrade our
  Ethereum nodes for our users 🚀
---

# ✅ Internal Playbook: Upgrading Ethereum Nodes

{% hint style="info" %}
**NOTE**: This guide was originally published on [Medium](https://medium.com/alchemy-api/the-alchemist-playbook-a-guide-to-upgrading-ethereum-nodes-123e0a47e5c3). 
{% endhint %}

On November 10th, the Ethereum ecosystem was hit by a flurry of errors, incorrect data, and downtime. While our infrastructure and our customers passed through the storm without incident, many other developers had a long night on-call.

At around 11pm PDT, stating at block 11234873, a [consensus error surfaced in Geth versions older than 1.9.17](https://gist.github.com/karalabe/e1891c8a99fdc16c4e60d9713c35401f) that caused nodes to get stuck on an incorrect fork of mainnet. Future releases fixed this bug, but if you run your own nodes and hadn’t upgraded since July, then your production traffic was significantly impacted. Fortunately, our rigorous upgrading standards ensured that Alchemy Supernode was not effected by the incident, as we were on Geth v1.9.20 (released August 25th).

If you’re running your own nodes, this incident serves as a reminder: update, update, update. If you rely on a service provider, then it’s important you have transparency into why, when and how they conduct their upgrades so that you don’t have to worry about these types of inconsistencies.

About a year ago, we did a deep dive into the [Constantinople upgrade](https://medium.com/alchemy-api/dont-get-forked-best-practices-for-handling-constantinople-and-ethereum-client-upgrades-e0d6b5dd8e9c). Today, we wanted to revisit our practices to be fully transparent about how the Alchemy Developer Platform maintains and upgrades [Supernode](https://alchemyapi.io/supernode) — the next generation Ethereum infrastructure layer we built that supports continuously updated versions of both Geth and Parity.

## **Why Upgrade Nodes?** <a href="202f" id="202f"></a>

In general, we update our nodes for the same reason that updates become available in the first place: critical bug fixes, security patches and new features. While remaining on older versions provides stability, it risks eventually running into errors that cause vulnerability or downtime, as seen in the incident this morning. At Alchemy, we do our best to strike a balance between stability and timeliness.

## When To Upgrade Nodes? <a href="f89a" id="f89a"></a>

Historically, we tend to upgrade our nodes every few months, a heuristic that generally ensures the new version has been significantly battle tested while also giving our customers access to the latest features. Of course, this cadence can be expedited if there is a significant breaking change or security vulnerability that needs to be immediately patched.

Like most things work related, our internal process is kicked off with a Slack notification. Whenever a new version of Geth or Parity is pushed to Github, we get an alert on Slack and kick off our exhaustive testing standards to ensure the stability of the Alchemy Supernode.

## **How To Upgrade Nodes?** <a href="0d98" id="0d98"></a>

Once we’ve decided to move forward with a new stable version, we step through the following phases:

**Phase 0 — Code Audit**

Our core infrastructure engineers read through the release notes, looking for critical fixes that need immediate deployment as well as breaking changes that need to be tested. If necessary, we will even deep dive into the changelog to get a better understanding of some of the key differences and how they might potentially impact our customers.

**Phase 1 — Automated Integration Test Suite**

Once we have a good understanding of the update, the testing phase begins. To do this, we provision a few nodes on the upgraded version and pull out a few of the nodes on the old version currently serving our production traffic. To make sure we have extensive coverage, we replay a curated sample of our production traffic on both our old and new nodes to look for breaking changes. We also add specific integration tests for all cases called out in the changelog notes. All of these tests have specific handling for idempotent and non-idempotent results to ensure that we capture payload discrepancies across all method invocations.

**Phase 2 — Customer Notifications**

If we notice any possible breaking changes after the first two phases, we alert all affected customers. You might not care that Geth has a new StackTrie implementation for its receipt root hashes, but depending on your use case, it might be critical to know about a change in default gas limits for EVM execution. With this in mind, we make sure our customers have time to adequately respond to critical changes in the API or implementation and make any modifications to their codebase; the bigger the breaking change, the more time we wait.

**Phase 3 — Blue-Green Deployment**

It’s time to deploy. We spin up a whole fleet of upgraded nodes in an isolated, load balanced cluster to match the capacity of our current nodes. Once the new nodes are ready, we start a blue-green deploy, slowly transitioning traffic to the upgraded nodes while running the old and new nodes in parallel.

**Phase 4 — Enhanced Monitoring and Alerting**

During this time, our engineering team stands on-call watching the deploy over the next 48 hours, ready to instantly roll back if our enhanced monitoring tools detect any problems. The engineering team also actively engages in realtime support chats to answer questions for customers and to get additional warning about any issues not caught by our automated tools.

**Phase 5 — Multi-Tiered Backup Infrastructure**

In the event that a problem does occur, we have a multi-tiered backup system ready to respond instantly. We continue to run the older nodes as we transition to the new ones so that we can immediately switch back to the previous version, and we also maintain snapshots of older node versions in case we need to switch back to an even earlier version.

**Phase 6 — Fail-Safe Architecture**

In the unlikely case of an unrecoverable failure during the upgrade process, Alchemy Supernode has integrated both Geth and Parity, so even if all nodes of one type fail, we can still fall back on the other type.

**Phase 7 — Automated Monitoring and Alerting**

Once the transition is successfully complete, if our system detects any subsequent performance issues on any of the nodes, our automatic alerting engine kicks in. It not only immediately notifies one of our infrastructure engineers so that we can address the root cause, but we also have safeguards in place to dynamically reallocate traffic and ensure our customers’ mission critical operations are up and running 99.99% of the time.

## **Calling All Alchemists **🧙 <a href="c97d" id="c97d"></a>

If you are running your own node infrastructure, we hope the process we’ve outlined is helpful in determining why, when and how to upgrade. If you don’t want to ever have to deal with node upgrades, along with a slew of other unseen issues and costs that come with creating a stable and scalable node infrastructure, like monitoring, load balancing, and guaranteeing consistency, then we’d love to see you [become an Alchemist](https://dashboard.alchemyapi.io/signup/)!
