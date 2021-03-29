---
title: "**.x**オブジェクト形式"
linktitle: "Microsoft DirectX (.x)"
weight: 2
---

![construction_64](/images/construction_64.png)

NewXParserまたはAssimpを使用して、openBVEはアニメーション以外のほとんどのDirect.Xオブジェクトファイル機能をサポートします。

オリジナルのパーサーは、BVE4ストラクチャビューアによって生成されたものに基づいて、DirectX.xオブジェクト形式のより限定されたサブセットをサポートします。

{{% notice %}}

#### テクスチャのカラーキーの透明度

従来の理由により、**純粋な黒 (0,0,0)**は、テクスチャで使用するときに予約されています。  
テクスチャにこの色が含まれている場合、これらのピクセルは透明としてレンダリングされます。

{{% /notice %}}

Xオブジェクト形式の完全なサポートとドキュメントは、このサイトからまだ入手できませんが、以下は、サポートされているテンプレートの概要であり、まだ構造化されていません。

- Frame
- FrameRoot
- Mesh
- Vector
- MeshFace
- MeshMaterialList
- Material
- ColorRGBA
- ColorRGB
- TextureFilename
- MeshTextureCoords
- Coords2d
- MeshNormals
- MeshVertexColors