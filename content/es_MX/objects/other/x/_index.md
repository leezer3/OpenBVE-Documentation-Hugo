---
title: "El formato de objeto **.x**"
linktitle: "Microsoft DirectX (.x)"
weight: 2
---

![construction_64](/images/construction_64.png)

Ya sea que use el NewXParser o Assimp, openBVE soporta mayormente las características del archivo de objeto Direct.X, otras que las animaciones.

El analizador original soporta mas limitado una pequeña parte del formato del objeto DirectX .x, basado en el que fue generado por el BVE4 Structure Viewer.

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