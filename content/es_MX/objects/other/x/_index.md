---
title: "El formato de objeto **.x**"
linktitle: "Microsoft DirectX (.x)"
weight: 2
---

![construction_64](/images/construction_64.png)

Ya sea que use el NewXParser o Assimp, openBVE soporta mayormente las características del archivo de objeto Direct.X, otras que las animaciones.

El analizador original soporta mas limitado una pequeña parte del formato del objeto DirectX .x, basado en el que fue generado por el BVE4 Structure Viewer.

{{% notice %}}

#### Llave de transparencia de color en texturas

Por razones de compatibilidad, el color **negro puro (0,0,0)** esta reservado cuando es usado en una textura.
Si una textura contiene este color, entonces estos pixeles serán renderizados como transparentes.

{{% /notice %}}

Soporte completo y documentación del formato de objeto X no esta disponible por el momento en este sitio, pero lo siguiente es una vista general de las plantillas soportadas , sin estructuras.

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