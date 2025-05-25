---
title: "The **.x** object format"
linktitle: "Microsoft DirectX (.x)"
weight: 2
---


OpenBVE supports most DirectX object file features, other than animations.

{{% notice %}}

#### Color key transparencies in textures

For legacy reasons in **BVE2**, **BVE4** and **OpenBVE** format routefiles (**.csv** and **.rw**), the color of **pure black (0,0,0)** is reserved when used in a texture.
If a texture contains this color, then these pixels will be rendered as transparent.

{{% /notice %}}

Full support & documentation of the X object format is not available from this site, but the following is an overview of the supported templates, unstructured.

**Supported:**
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
**Partially Supported:**
- DeclData: Only Normal and TexCoord objects are currently supported in this template.
**Unsupported:**
- MeshFaceWraps: OpenBVE only supports wrapping on a per-texture, not per-face basis. These are skipped.

Please see <a href="https://paulbourke.net/dataformats/directx/">https://paulbourke.net/dataformats/directx/</a> for a good overall reference to the file format.