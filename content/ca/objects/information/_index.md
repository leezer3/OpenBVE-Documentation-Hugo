---
title: Informació i consells per a la creació d'objectes
linktitle: Informació i consells
weight: 3
---

Aquesta pàgina presenta informació que cal saber per al desenvolupament i consells generals per a la creació d'objectes.

## ■ Ordres

- In Face (B3D) or AddFace (CSV) commands, vertices need to be given in order of adjacency. Complex polygons, meaning self-intersecting polygons, will lead to erratic results.
- The current implementation of openBVE produces incorrect illumination on the back face of faces created by Face2 (B3D) or AddFace2 (CSV). This behavior might change in future versions of openBVE so that both sides are correctly illuminated.

## ■ Geometria

- Avoid overly complex geometry where the end results are hardly noticable. Avoid using Cube and Cylinder commands (B3D/CSV) if parts of the cube/cylinder will not be visible. Do not create cylinder caps unless they are likely to be visible.
- Per obtenir objectes amb una curvitat suau, feu servir normals personalitzades i poques cares en comptes de normals estàndard i moltes cares.

## ■ Textures

- Intenteu crear textures que envoltin els objectes mitjançant les coordenades de textura apropiades. Això reduirà o eliminarà la necessitat de canviar la textura durant el renderitzat, que suposa un cost alt.
- Utilitzeu només textures amb una mida que sigui múltiple de dos, és a dir, amb una longitud per costat que sigui 1, 2, 4, 8, 16, 32, etc. Ara bé, no cal que siguin textures quadrades.

## ■ Transparència

- For best visual quality, every transparency has its overhead. Avoid using transparency at all if there are alternatives of similar implementational and geometric complexity.
- Use color-key transparency whenever possible. Avoid using alpha channels in textures or using Color (B3D) or SetColor (CSV) commands with an alpha setting at all costs.
- When it is necessary to use alpha, bear in mind that depth sorting will be used to determine the rendering order. There is no perfect real-time depth sorting algorithm, thus artifacts cannot be completely avoided.
- When using alpha, keep polygons parallel to each other, which will always render correctly. The worst case scenario is perpendicular faces. When such faces overlap on-screen, the rendering order might be erratic. Use perpendicular alpha faces only if they are unlikely to overlap on-screen.