---
title: "Forms, roofs and cracks"
hidden: true
---

Forms, roofs and cracks support basic deformable objects.

These should be placed between two rails, _Rail1_ and _Rail2_ and each must consist of up-to 8 verticies, which must strictly follow one of the two following clockwise windings:

{{% command %}}
TopLeft, BottomLeft, BottomRight, TopRight
<br><br>
BottomRight, TopRight, TopLeft, BottomLeft
{{% /command %}}

In both cases, _top_ refers to the furthest distance in the Z-axis, and _left_ refers to the furthest distance in the X-axis.


**These deform in the following manner:**

The distance between _TopLeft_ and _TopRight_ will be deformed relative to the distance between _Rail1_ and _Rail2_ at the far block boundary in the positive direction of construction.

The distance between _BottomLeft_ and _BottomRight_ will be deformed relative to the distance between _Rail_ and _Rail2_ at the near block boundary in the positive direction of construction.
go