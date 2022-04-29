---
description: >-
  Polygon API - Returns the account and storage values of the specified account
  including the Merkle-proof. This call can be used to verify that the data you
  are pulling from is not tampered with.
---

# eth\_getProof

## **Parameters**

1. `DATA`, 20 Bytes - address of the account.
2. `ARRAY`, 32 Bytes - array of storage-keys which should be proofed and included. See[`eth_getStorageAt`](../ethereum/#eth\_getstorageat)
3. `QUANTITY|TAG` - integer block number, or the string `"latest"` or `"earliest"`, see the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter)

## **Returns**

`Object` - A account object:

* `balance`: `QUANTITY` - the balance of the account. See[`eth_getBalance`](../ethereum/#eth\_getbalance)
* `codeHash`: `DATA`, 32 Bytes - hash of the code of the account. For a simple Account without code it will return `"0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470"`
* `nonce`: `QUANTITY`, - nonce of the account. See [`eth_getTransactionCount`](../ethereum/#eth\_gettransactioncount)\`\`
* `storageHash`: `DATA`, 32 Bytes - SHA3 of the StorageRoot. All storage will deliver a MerkleProof starting with this rootHash.
* `accountProof`: `ARRAY` - Array of rlp-serialized MerkleTree-Nodes, starting with the stateRoot-Node, following the path of the SHA3 (address) as key.
* `storageProof`: `ARRAY` - Array of storage-entries as requested. Each entry is a object with these properties:
  * `key`: `QUANTITY` - the requested storage key
  * `value`: `QUANTITY` - the storage value
  * `proof`: `ARRAY` - Array of rlp-serialized MerkleTree-Nodes, starting with the storageHash-Node, following the path of the SHA3 (key) as path.

## Example

### [Alchemy Composer](eth\_getproof.md#parameters)

The Alchemy Composer allows you to make a no-code example request via your browser. Try it out above!

### Request

{% tabs %}
{% tab title="Curl" %}
```bash
curl https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getProof","params":["0x7F0d15C7FAae65896648C8273B6d7E43f58Fa842",["0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"],"latest"],"id":1}'
```
{% endtab %}

{% tab title="Postman" %}
```http
URL: https://polygon-mainnet.g.alchemyapi.io/v2/your-api-key
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

### Result

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "address": "0x7f0d15c7faae65896648c8273b6d7e43f58fa842",
        "accountProof": [
            "0xf90211a001f8376b07906c3c694512eb5a0006def0a41ddf0ec1774530625f64987f6103a0300cb44fdb8d037c9e7f129b4616b7312b13e6a689dd8108dfc4d4cda796a5f3a0300e28a0e966b994458344c424246de7fe27f22913a05f55485802769f92e14fa0fbb5da243cd3d8f3da9baabcdd8c9af1c4041895b6d9fee9602fe8ffa04bd1dca04be995644174846bddc5a0a1a18038c04ac8501d86dbd883b83aeb9d4d36a927a0a03845280edee05f1bcbeebb71af107f2415d8aa9fa0ace8ed19889c2002a18ba02f33c81b8fffb065c0dd0fa4e0af1cd08638571524c5b017aa7b6ab9a159d36ca0ff38c0ecd978d7d7c477e1d73ce3f56f6fa9a38bab8692553f3e0227cf44c500a0b8555e51efb8e8e183c7518fbfeae60d6fabcfffb7b58439475fa6b3deb209faa06c909fb9839543f0dd2bd0af923bb67a7b21fcffe26226c525be226714eb982ca06921abc56c2f24e909faf626a8a2dd5dff9b20028090725eb714c3c93a3228d8a058028c4a84c95a65b41b5ace65904ecc0cd184f2ab8a53b347ef4591d41c477ea0eac35cd0c3a0844910c6db9eab9cef372e62f63c35b1c0265e803f4412c91694a0eb6d08245a3a3491a6f030b957a4f962cd95be60a67ae8f467f17c341a7c61bea09bfa39350897c43f913d0893a9dabc41468ed20698e6706353fea03078e6be05a0ccc62b8ec6ef0a5c9982ad5d9b6f2b8aa9a07cf2c8dd029b93c3e7fe37d1be8180",
            "0xf90211a037b245b091d2248b80be2408f8c9d185070dc900f1e72171481f6ef0f6badae7a0847344c73d91591e9c058ea03936241dc838ac05e1432209ab6596421465bd27a0913d0c384266ded7463d722457a2ff2292e9875b53448008b7245601cd70ab98a0440fcfb3de03209df7cca338ab349c8760b87b72709bd10cbfb4aabacba57f5aa0e42285d3c469abb208f9586010e50983b44d2850d36fbdcc5db10bee3b4664eda05967d65750144d225c16b3d17258d216e8914c6fdcfd746ea6ff512954cc8a7ba0f1e261e7bff8fe91222feaa5d1cbaa0931a90979ef7552de959ed2e8c4797201a0bd1e1a762c6f78b5f13b81d5d12fabc91d8674dd5f1bdecfa66a5f0cdd88f22da09ee8162165b3dff6d1db5f501d65eeac48fc5e49e1073720efe19a701c13369fa0832edf1f1b496db86a4b1629816abc859f71da6d4bcfbc3ed8e46ee6abc83c7ca0bda4e256aeaf979b484873ed80536596c92cc3e3a1f0ec5a0696b0e2ad4cb609a0f7a1fcf40c535e57df607137bf51d05032b2ab56ffde3c910ee754b1d414698ea059b6f3de5a9f5a2fb8a8cf2d421a7a6436ef9f07cbf447aa7a41d515c5db8a52a0caa16f34c0528765ec2b580f2c2f1d6955d5fc4250a4a86f1d6b2b931ad111f9a05f086bc0721f6f17a16bd0200779fbdb0939ed8c2494b1aad4204a09ae3b35b1a0b62c66790820a11613c8b9baa6d0fa9568bebaaf607905614d8bae4bdcfefafc80",
            "0xf90211a03303c753b4f488b4c049e479cc4796de78ead917901bee2f28a1bd85fdec09e3a0b68db45646f1bb767ee0d5414982b05472965f4ccb650f9045fef7c93a0f739da00e205af885bb806199ae2502e8a40d1c1e66669a20d9f8be21cb67cb2b130ef4a0d91bbd8f15ce274e4c769090329155a771bcd64226b67e607d588c941e659d6ea070fae56ea95c13a2d810afca5225e12fbf48161ec690e05d867d59aeab2e274da0980737cd1b0e7f693ce223c750b5d211ee1a569366f2cbd7f76ee88a8a62f902a0273c36c050cbeb67537c63ca39a6aa2365bce660234a2bc34edda64cb5cbbdc3a03f6ad0780afcfb7a57429256905d5ca9221ddb22c9c054111aaa0c3452393d1da0a515e8cde54e122baa67c51f9661aa377ff713e29effca0e4361d687f7577abfa000f3578da1733fdca7f56e69f8ab1601c3b4cc909cb926afac60487432bd5c72a012e1f42be181208f128c868c833693dd8e6f3c0d58112a5f2086e6d3ad08c8a3a05643c184c4b63ac5ee2574f8e5d3f3d58e9bc93334cb2ac8170e8d9af2e6e64ba08c27431b31a8318954c8ebea1be8afa19f5520b7000a539af8fb8caf6a757e42a0fb709b734f5dab2d647c862f9ff189ea60422135915d01829d6fea886afa6c2aa047601d9151b2ba33e9e73bdeb697b93534cd34d052530b40f1e4627bee79e8fba0c99ed933ca8ceb5414db1a3192f24ed7c44526716d17b046f0d92b04d862ae4c80",
            "0xf90211a00d7751dc79c9156f2357704ccc0c8fd590f6bb0c8ef01b32aa347689ae1b7177a0a4fb1a518b73ed70159eb3be9d6692ab4e7271f1fc2bc8c3a870ef98850efe43a0642c0db960ab327f7dcbaa4f76b0e01aee2db72cb5ee92880d0d4393c6d2e48fa006e5f9e16d96ed4f38f5854a65bcee0ccdc3108d5e462187c66659426cf341ffa0f3132e2aa744438ae54c50561199a11e9391d758dc602a59520a0680ed8d313aa018260f95ebf9fa543d526847fd89ceb81c60a7abc3c5f318a5fdb884f5a1a5a5a00034799a077b472409e51abc46758298cd74dd131b81935427116cda6d44705fa0b2117d267a54626509f5f2cc23719a81d9440387de231cea6fb6f5f0594b7a39a0a2ffa5a52791d85322458b995381cc131844c5fc58f8cc6cd4561fc64d6d8f55a06d94dad3d3b7a9789707e96cc25231499453c779b0634a96f8cab0d5cba42a90a062f8558dfbd67248347121f5c7c35c9418723cff00191d238f8d3d5e5f696b5fa0d3bd2acd4035e94b4cd66462e33a6548d203bf5d3ce91d4c705e2d9a088b2f63a070df6544606e44e128e9aefe79c60746d4229fd011411e4fa0b214cadbbefbada09fb29e72acbfb83bb255644d833e5935d1472231ebb8f404e096f7c712bf363aa0dfafc10973c9986fd7316c159af401e3e62bf0e526bb04aa6e255e2615104766a0fdf63393eec26d77eda30a9e50f7e929d3d646ddd5ff015a4585fe9bac93e0d880",
            "0xf90211a03d917f4a11219ba0c039107f9d9022a038ec5adcfce78c082393c4e4033da504a034f0f69773413969b5e5402a551c11943db0870a3dd741ffb080389ed6330d5ba0e21d064290c007d5dbd856a94cf0055e2bb00b39fcc9a9e211c30fd79d0ec2d7a077d7c53e2d34aa1d90e13e59ee0fa79959fd8c90be69f9285c801e6942e21ed5a0a6521f6086e249135f8737f5b86d9993ee47f124dd13795a24b62c146b5b9b91a0ae83d7d4f3e30acedc78fdf005befa04a129b9ea56a02e8cb56ae71f79ff803fa0a29f80b4bad24b764146a9cfe1e707b83f603d8193e8d65096e87d3799a2fb13a0d03350ff011c2dd5b01ff0de94d0314cba0a66eb23310bf76984b235e8d580eba07b5849bd464f2462a6950c378f88b098bb48d57571aeed7d77dbfccd2108c6bea030cf7fc983434e4137d8e983b3be89545037c8ab72947f1b85803f1b7af6e868a0d233b40fd2d6c08f5b31df464e0ae61a6670249051ccaac74b7a196d678e3182a02fd11d6567ebf44f3b83de7116e4d7982537f32915d01702b07e0d44b5976ec5a07bf5fd9d2d8c19ba71a44f40987c60185a03dab62e304d957a1a7ba8862e306ba09d2e0a5a31090bc96cffecf0250bdef07c115c5e498cf0485f01524150ecec1ea0cbae19f56cd37a94e521a693f91b0b5ff7ff958c9c3d0a7779b44b6f554acb40a0139e14b60742fd987226078408790d6cf21f3a05eec8ff00bc258f96f3e251dd80",
            "0xf8d1a01d608a24a8a811af295fffd1a840539826c4b342b451e5293c1aaf88d4fef08aa0501a846e6b2680d86643c6211f5ac33ef404a382894f8d49a3e887ccf2c257c2a0d427f04f25079e46a7ae205fe2862bd155eb68e693adaa36b1dfb6d7a9bba210a066460be340441b1ec0e5b0596b6968ab68ea54d2830a4a38def70cdb2ea558c5808080808080a046fbdd730771362a13e30bda783543b18baa113f446176f27c86eeee609e80d5a0a10c55dd71e81b3aa87b167fbfc1c154bc7227ca8cdea3b5b1bb567bc07981be8080808080",
            "0xf8679e2067f29e142d49f8824d4e7f1735ec3da219687387629b5fccd86812df84b846f8440180a056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421a01d93f60f105899172f7255c030301c3af4564edd4a48577dbdc448aec7ddb0ac"
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

##
