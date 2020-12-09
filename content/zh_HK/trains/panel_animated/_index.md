---
title: "**panel.animated** 檔案格式"
linktitle: "panel.animated 檔案"
weight: 5
---

如果在列車文件夾中，此文件會定義3D駕駛室。

該文件是正常的 [動態物件檔案]({{< ref "/objects/native/animated/_index.md" >}}). 假設列車主體位於x軸和z軸的中心，而y軸上的0值對應於鐵軌的頂部，就像外部列車對像一樣。

The viewing point of the driver's eye is determined via the #CAB or #COCKPIT sections in the [train.dat]({{< ref "/trains/train_dat/_index.md#cab" >}}) (which measures the viewing point in millimeters from the front of the train).

You can use [Object Viewer]({{< ref "/tools/objectviewer/_index.md" >}}) to preview any animated object, including the panel.animated file. It might also be a good idea to load both the exterior object and the panel.animated in Object Viewer so you can match them against each other.

{{% notice %}}

#### Overlay and Lighting

The cab is rendered as an overlay. This means that the cab will always appear in front of scenery objects. This is intentional, because this way, rain, walls and other obstructing objects cannot be accidentally rendered inside the cab. Furthermore, lighting in the cab is different than in the scenery. While the ambient brightness is reflected in the cab, the ambient color is not, and the cab always appears as if reflecting white light. This behavior might change in future versions of openBVE.

{{% /notice %}}