---
description: Returns true if client is actively listening for network connections.
---

# net\_listening - Optimism

#### **Parameters**

none

#### **Returns**

`Boolean` - `true` when listening, otherwise `false`.

#### [**Example**](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22net\_listening%22%2C%22paramValues%22%3A%5B%5D%7D)

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://opt-mainnet.g.alchemy.com/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://opt-mainnet.g.alchemy.com/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"net_listening",
    "params":[],
    "id":67
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
    "jsonrpc": "2.0",
    "id": 67,
    "result": true
}
```

{% embed url="https://docs.alchemy.com/alchemy/apis/optimism-api" %}
