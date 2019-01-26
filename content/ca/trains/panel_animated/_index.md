---
title: The **panel.animated** file format
linktitle: The panel.animated file
weight: 5
---

If present in the train folder, this file defines a 3D cab.

The file is a normal [animated object file]({{< ref "/objects/native/animated/_index.md" >}}). The train body is assumed to be centered on the x- and z-axes, while a value of 0 on the y-axis corresponds to the top of the rails, just as with exterior train objects.

The viewing point of the driver's eye is determined via the #CAB or #COCKPIT sections in the [train.dat]({{< ref "/trains/train_dat/_index.md#cab" >}}) (which measures the viewing point in millimeters from the front of the train).

You can use [Object Viewer]({{< ref "/tools/objectviewer/_index.md" >}}) to preview any animated object, including the panel.animated file. It might also be a good idea to load both the exterior object and the panel.animated in Object Viewer so you can match them against each other.

{{% notice %}}

#### Overlay and Lighting

The cab is rendered as an overlay. This means that the cab will always appear in front of scenery objects. This is intentional, because this way, rain, walls and other obstructing objects cannot be accidentally rendered inside the cab. Furthermore, lighting in the cab is different than in the scenery. While the ambient brightness is reflected in the cab, the ambient color is not, and the cab always appears as if reflecting white light. This behavior might change in future versions of openBVE.

{{% /notice %}}