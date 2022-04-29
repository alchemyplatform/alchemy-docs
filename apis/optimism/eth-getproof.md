---
description: >-
  Returns the account and storage values of the specified account including the
  Merkle-proof. This call can be used to verify that the data you are pulling
  from is not tampered with.
---

# eth\_getProof - Optimism

**Parameters**

1. `DATA`, 20 Bytes - address of the account.
2. `ARRAY`, 32 Bytes - array of storage-keys which should be proofed and included. See[`eth_getStorageAt`](eth-getstorageat.md)
3. `QUANTITY|TAG` - integer block number, or the string `"latest"` or `"earliest"`, see the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter)

#### **Returns**

`Object` - A account object:

* `balance`: `QUANTITY` - the balance of the account. See[`eth_getBalance`](eth-getbalance.md)
* `codeHash`: `DATA`, 32 Bytes - hash of the code of the account. For a simple Account without code it will return `"0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470"`
* `nonce`: `QUANTITY`, - nonce of the account. See [`eth_getTransactionCount`](eth-gettransactioncount.md)\`\`
* `storageHash`: `DATA`, 32 Bytes - SHA3 of the StorageRoot. All storage will deliver a MerkleProof starting with this rootHash.
* `accountProof`: `ARRAY` - Array of rlp-serialized MerkleTree-Nodes, starting with the stateRoot-Node, following the path of the SHA3 (address) as key.
* `storageProof`: `ARRAY` - Array of storage-entries as requested. Each entry is a object with these properties:
  * `key`: `QUANTITY` - the requested storage key
  * `value`: `QUANTITY` - the storage value
  * `proof`: `ARRAY` - Array of rlp-serialized MerkleTree-Nodes, starting with the storageHash-Node, following the path of the SHA3 (key) as path.

#### **Example**

Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://opt-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getProof","params":["0x7F0d15C7FAae65896648C8273B6d7E43f58Fa842",["0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"],"latest"],"id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://opt-mainnet.g.alchemyapi.io/v2/your-api-key
RequestType: POST
Body: 
{
    "jsonrpc":"2.0",
    "method":"eth_getProof",
    "params":["0x7F0d15C7FAae65896648C8273B6d7E43f58Fa842",["0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"],"latest"],
    "id":1
}
```
{% endtab %}
{% endtabs %}

Result

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "address": "0x7f0d15c7faae65896648c8273b6d7e43f58fa842",
        "accountProof": [
            "0xf90211a0d7dc80b53c5a1a28358e0d82f16ff4ae106e8adbcf3e4239172fba8ddd12c1d4a092cb4da4b44b102a8332663b8d7b20a582634718303ee838d83758653f081cc1a00ddb674b5111842fdd915f527d9ca0922008a0a885332a917f71ea02ac6354dfa09425abc221eb269f2d060f781172c2a9751757bdb315064971eccd82728e12aea0975634869e5299014af63a257d0536aee0ad4fd69c96ae99e1fd738aee07b07ba03c4ea143bed466fb3af6b4d57864404573cee9e0b2ef91e0298dc8bc8fd79d53a01120ffadd9a474eaa45903bff7a82e9f0d1330b9c7cac5bbccd91bfe2cfd99a7a0d676f25ed57c17a93af1071bb8db098be3ec20b1e5e9a22037376edfa81c107aa00882e30957ba0a0fe9c5ea08179eed885a8726b2aea9dfa9ba992f8406323385a027f7755c9a6d79e04b2be68508e341221628ce487f527e80fdfd21c7b7792703a03c3bffdf7c1dded8fe905091363eefd7d5ba5377fa44bdfdb57b46ddda7ac4dba0c9707a8a06562408d0023bd2f45fb0b21cf84b51e49befd4ea9e8fe1fb2849bda0e35969f07e05b406a76d41474286e1990564d7a0ddcf83d84aa3357c23e05b74a00ee0ab4e7c8096531969fb112da6e41ed7ce8f735e64dfad114a31128f54dfd2a094cef26c0eff8ebd2d76cdd0d6ed0558cb4c9fed5461e72cc333290040a1b9a4a08e208e33d570923c0dad413bf8cbc95dcad5fcb9022307981189f7cfdce94e9080",
            "0xf90211a0fec8d5accd59675bf753f843970111ee50495a793f1054079104b21aaa6f675aa091d04b7dfc585193f471b7de8f94c3542523f65ced37015e7d231abcda6f76cda055523a5d3b3706ee22f40ba98ad1aeb1ad3548cf737ccb797d1681b33b65c7cca03c2a96d6c5d8c2d63798719815d18c7e67f8faacfbf928aaa76267c2f2e1e865a01ac13ebdcee1238e5b0f26435c0c5874d81dd6cd3c83acd238aaca921ed109f0a0a4c6132bec935b1e50e80d86bd4eb3146694f8004deb2cec63970ad5b1393369a00bd9ba937ce9ed9c5a59d5dad4a8d980c8256a90574c67ac3a952527f33bf42aa0852032a71de30350102a51a89ea50f177a08fb848cb0998cd8312fad1e7836b4a09e61d43d30b3a4566e940af24533cddc9f2f8c09ba5d740d30e89f87eab4a3aaa0405f4ba35682cbf1d48a87e1336f3d9c5c48244323d9371b334664b19a75714ba03ab20f3157b6f6c7e5503e1aa21ea5d092b54b389f2506dc382ca5f417613cf8a0fc8280a16ff2e29b75b342c4b55575610b3a81191201f30fcc67dc8e4bbee418a00b7ef0ba8d144a4ec1dced99be3ec7a0232f62a9b24408f0b05cc9b495ea4d3aa0f17436a18ad4b72f6c0d5e7ee192734e5752ec10ee193c3a7368bc0c13d476f1a01619aeadec4a8d79f0dc71f74aafdb7a57d27bd48ee93efbb5bc11e809f4aa27a07cea9a2a3217b78150b0dc24462017c8ad575d0ce06933c5ff21b1606badc70e80",
            "0xf90211a0072ecc9487ea63b098c17eff08b793e2c4c531b15900e9711aa8af5fd086bf1ba078284f97f9cd08021dac8849ecd88bb664f7662679c586311c0971e5e3561889a0aa66520345d15cc6804957c7b23324cc032fc734034bae4d705cdc01967f1613a03b6d63ec4ec0b81ba2d6e9d6743a7f7f43bef8d22c75195ada5830ef2824c998a087c2dfab32a2460243337fd79ee333495d593c5bdf8f404b17d296f1294ad1dea02ea002fc9ba7e806594c98483fc76dc7e099660ddee1278f61c2b6b4f421add7a0fd91c5d3145fb79612e3c4dce3fa3788c1c60bcd90305a3b80e6e81f87fd8a43a0a6d5c595d4b3ecedc6f031ab4efa714ef24b654ed693953ef59a6de2dc53323fa0a3a39bd0d3920147a0517845cf2959d98f499a2f653cc479a3355fe3cdc904efa08ff187fe654c362091cc859cefb2c400f4167731a217d4e1b4fa9f1a31336ac4a04e9bb9b6cb36e587b683287f6a3b6773daf9a1809122059f768df02576da3ba4a0b6e0bcff39514900f189d126a6527d179eeaf6a271564ce8ae5b3a665fd9ceffa0b08b367a6388b2d864217d8efe986992dc68ad3a2fff44aa7f9f1774ba880117a0121ab98e844c8a6da5760506fed424bdfbd4d5290bdfd5f3b1c3f555abcec332a0a3750cb1ba839d50679e432dd4c61e034e091765c750f65a062536a3619f1867a02042084b278f0bb5ce1dc1d8cef7af2174c3f950c41b0d2197c11bf74c589e0880",
            "0xf85180808080808080808080808080a025d6f1dc4386bd418fed96dd4b888b8c824a2b11243bbaca2dda9d12ad039a37a0989102957c6d9aefb386ee6354af3a800be029ad6fa0cad30da75dd9ba04a59c8080"
        ],
        "balance": "0x0",
        "codeHash": "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
        "nonce": "0x0",
        "storageHash": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
        "storageProof": [
            {
                "key": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
                "value": "0x0",
                "proof": []
            }
        ]
    }
}
```

{% embed url="https://docs.alchemy.com/alchemy/apis/optimism-api" %}
