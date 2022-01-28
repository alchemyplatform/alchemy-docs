---
description: Polygon API - Returns current validators
---

# bor\_getCurrentValidators

## Parameters

`NONE`

## Returns

`AUTHOR` - address

## Example

### [Alchemy Composer](https://composer.alchemyapi.io/?composer\_state=%7B%22chain%22%3A2%2C%22network%22%3A401%2C%22methodName%22%3A%22bor\_getCurrentValidators%22%2C%22paramValues%22%3A%5B%5D%7D)

The Alchemy Composer allows you to make a no-code example request via your browser. Try it out above!

### Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"bor_getCurrentValidators","params":[], "id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"bor_getCurrentValidators",
    "params":[],
    "id":1
}
```
{% endtab %}
{% endtabs %}

### Result

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": [
        {
            "ID": 0,
            "signer": "0x46a3a41bd932244dd08186e4c19f1a7e48cbcdf4",
            "power": 1,
            "accum": -15
        },
        {
            "ID": 0,
            "signer": "0x6a654ca3bfb5cfb23bf30bafbf96b3b6ec26bb0e",
            "power": 1,
            "accum": -21
        },
        {
            "ID": 0,
            "signer": "0x7c7379531b2aee82e4ca06d4175d13b9cbeafd49",
            "power": 5,
            "accum": -8
        },
        {
            "ID": 0,
            "signer": "0xe77bbfd8ed65720f187efdd109e38d75eaca7385",
            "power": 2,
            "accum": 5
        },
        {
            "ID": 0,
            "signer": "0xf0245f6251bef9447a08766b9da2b07b28ad80b0",
            "power": 7,
            "accum": -4
        }
    ]
}
```

###
