---
title: "Format objek **.X**"
linktitle: "Microsoft DirectX (.x)"
weight: 2
---

![construction_64](/images/construction_64.png)

OpenBVE bisa membaca objek file Direct.X, tidak termasuk animasinya.

File asli harus berisi setidaknya perintah yang support di OpenBVE seperti yang di-support oleh aplikasi BVE4 StructureViewer.

{{% notice %}}

#### Color key transparencies in textures

For legacy reasons, the color of **pure black (0,0,0)** is reserved when used in a texture.
If a texture contains this color, then these pixels will be rendered as transparent.

{{% /notice %}}

Semua info perintah tentang objek X belum tersedia di situs ini, tapi berikut ini rangkuman perintah yang bisa dibaca OpenBVE.

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