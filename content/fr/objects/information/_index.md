---
title: Information and tips for object creation
linktitle: Information and tips
weight: 3
---

This page presents information developers need to be aware of and general tips for object creation.

## ■ Commands

- In Face (B3D) or AddFace (CSV) commands, vertices need to be given in order of adjacency. Complex polygons, meaning self-intersecting polygons, will lead to erratic results.
- The current implementation of openBVE produces incorrect illumination on the back face of faces created by Face2 (B3D) or AddFace2 (CSV). This behavior might change in future versions of openBVE so that both sides are correctly illuminated.

## ■ Geometry

- Avoid overly complex geometry where the end results are hardly noticable. Avoid using Cube and Cylinder commands (B3D/CSV) if parts of the cube/cylinder will not be visible. Do not create cylinder caps unless they are likely to be visible.
- To get smoothly curved objects, use custom normals with fewer faces instead of no custom normals with many faces.

## ■ Textures

- Try to create textures that wrap around objects by using texture coordinates appropriately. This will reduce or eliminate the need to change the texture when rendering, which is expensive.
- Use only textures which are of power-of-two size, e.g. whose sides are of length 1, 2, 4, 8, 16, 32, etc. Textures do not need to be square, though.

## ■ Transparency

- For best visual quality, every transparency has its overhead. Avoid using transparency at all if there are alternatives of similar implementational and geometric complexity.
- Use color-key transparency whenever possible. Avoid using alpha channels in textures or using Color (B3D) or SetColor (CSV) commands with an alpha setting at all costs.
- When it is necessary to use alpha, bear in mind that depth sorting will be used to determine the rendering order. There is no perfect real-time depth sorting algorithm, thus artifacts cannot be completely avoided.
- When using alpha, keep polygons parallel to each other, which will always render correctly. The worst case scenario is perpendicular faces. When such faces overlap on-screen, the rendering order might be erratic. Use perpendicular alpha faces only if they are unlikely to overlap on-screen.