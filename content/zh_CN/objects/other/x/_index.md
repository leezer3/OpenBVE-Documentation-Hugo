---
title: "**.x** 物件格式"
linktitle: "DirectX (.x)"
weight: 2
---

![construction_64](/images/construction_64.png)

当在设置中选择 NewXParser 或者 Assimp 时，openBVE能够支持除动画之外DirectX模型文件的大多数特性。

原有的解析器只支持较有限范围的DirectX物件，例如基于BVE4物件查看器生成的。

{{% notice %}}

#### Color key transparencies in textures

For legacy reasons, the color of **pure black (0,0,0)** is reserved when used in a texture.
If a texture contains this color, then these pixels will be rendered as transparent.

{{% /notice %}}

Full support & documentation of the X object format is not yet available from this site, but the following is an overview of the supported templates, unstructured.

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