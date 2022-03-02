---
title: "**.x** 物件格式"
linktitle: "Microsoft DirectX (.x)"
weight: 2
---

![construction_64](/images/construction_64.png)

當喺設置中選擇NewXParser抑或Assimp時, 除動畫之外OpenBVE支持DirectX模型文件嘅大多數特性。

原有的解析器只支持較有限範圍的DirectX物件, 例如基於BVE4物件查看器生成的。

{{% notice %}}

#### Color key transparencies in textures

For legacy reasons, the color of **pure black (0,0,0)** is reserved when used in a texture.
If a texture contains this color, then these pixels will be rendered as transparent.

{{% /notice %}}

DirectX模型文件的完整文檔尚未列出, 但可以比你睇睇OpenBVE所支持的特性。

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