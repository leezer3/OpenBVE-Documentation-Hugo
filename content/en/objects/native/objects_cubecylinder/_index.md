---
title: "Cubes and cylinders"
hidden: true
---

## ■ The Cube command

The Cube command in B3D and CSV objects is equivalent to a series of Vertex/AddVertex and Face/AddFace commands.

Given the following code (B3D style):

{{% code %}}  
Cube *x*, *y*, *z*  
{{% /code %}}

The Cube command corresponds to these instructions (B3D style):

{{% code %}}  
Vertex *x*, *y*, -*z*  
Vertex *x*, -*y*, -*z*  
Vertex -*x*, -*y*, -*z*  
Vertex -*x*, *y*, -*z*  
Vertex *x*, *y*, *z*  
Vertex *x*, -*y*, *z*  
Vertex -*x*, -*y*, *z*  
Vertex -*x*, *y*, *z*  
Face *v*+0, *v*+1, *v*+2, *v*+3  
Face *v*+0, *v*+4, *v*+5, *v*+1  
Face *v*+0, *v*+3, *v*+7, *v*+4  
Face *v*+6, *v*+5, *v*+4, *v*+7  
Face *v*+6, *v*+7, *v*+3, *v*+2  
Face *v*+6, *v*+2, *v*+1, *v*+5  
{{% /code %}}

where *v* is the number of vertices that have already been created before the Cube command was used.

If you want to texture the cube, you need to add appropriate Coordinate/SetTextureCoordinate commands manually.

## ■ The Cylinder command

The Cylinder command in B3D and CSV objects is equivalent to a series of Vertex/AddVertex and Face/AddFace commands.

Given the following code (B3D style):

{{% code %}}  
Cylinder *n*, *r1*, *r2*, *h*  
{{% /code %}}

The Cylinder command first corresponds to *n* pairs of two vertex instructions (B3D style):

{{% code %}}  
Vertex cos[2\*pi\***<font color="red">0</font>**/n]\**r1*,  *h*/2, sin[2\*pi\***<font color="red">0</font>**/n]\**r1*  
Vertex cos[2\*pi\***<font color="red">0</font>**/n]\**r2*, -*h*/2, sin[2\*pi\***<font color="red">0</font>**/n]\**r2*  
Vertex cos[2\*pi\***<font color=#E0A000>1</font>**/n]\**r1*,  *h*/2, sin[2\*pi\***<font color=#E0A000>1</font>**/n]\**r1*  
Vertex cos[2\*pi\***<font color=#E0A000>1</font>**/n]\**r2*, -*h*/2, sin[2\*pi\***<font color=#E0A000>1</font>**/n]\**r2*  
Vertex cos[2\*pi\***<font color="green">2</font>**/n]\**r1*,  *h*/2, sin[2\*pi\***<font color="green">2</font>**/n]\**r1*  
Vertex cos[2\*pi\***<font color="green">2</font>**/n]\**r2*, -*h*/2, sin[2\*pi\***<font color="green">2</font>**/n]\**r2*  
...  
Vertex cos[2\*pi\***<font color="blue">(n-1)</font>**/n]\**r1*,  *h*/2, sin[2\*pi\***<font color="blue">(n-1)</font>**/n]\**r1*  
Vertex cos[2\*pi\***<font color="blue">(n-1)</font>**/n]\**r2*, -*h*/2, sin[2\*pi\***<font color="blue">(n-1)</font>**/n]\**r2*  
{{% /code %}}

Then, *n* faces are added to form the side walls (B3D style):

{{% code %}}  
Face **<font color=#E0A000>2</font>**, **<font color=#E0A000>3</font>**, **<font color="red">1</font>**, **<font color="red">0</font>**  
Face **<font color="green">4</font>**, **<font color="green">5</font>**, **<font color=#E0A000>3</font>**, **<font color=#E0A000>2</font>**  
Face **<font color="blue">6</font>**, **<font color="blue">7</font>**, **<font color="green">5</font>**, **<font color="green">4</font>**  
Face **<font color="fuchsia">8</font>**, **<font color="fuchsia">9</font>**, **<font color="blue">7</font>**, **<font color="blue">6</font>**  
...  
Face **<font color="blue">2\*n-6</font>**, **<font color="blue">2\*n-5</font>**, **<font color="fuchsia">2\*n-7</font>**, **<font color="fuchsia">2\*n-8</font>**  
Face **<font color="green">2\*n-4</font>**, **<font color="green">2\*n-3</font>**, **<font color="blue">2\*n-5</font>**, **<font color="blue">2\*n-6</font>**  
Face **<font color=#E0A000>2\*n-2</font>**, **<font color=#E0A000>2\*n-1</font>**, **<font color="green">2\*n-3</font>**, **<font color="green">2\*n-4</font>**  
Face **<font color="red">0</font>**,&nbsp; &nbsp; &nbsp;**<font color="red">1</font>**, &nbsp; &nbsp; &nbsp;**<font color=#E0A000>2\*n-1</font>**, **<font color=#E0A000>2\*n-2</font>**  
{{% /code %}}

If *r2*>0, a lower cap is then added (B3D style):

{{% code %}}  
Face **<font color="red">2\*n-2</font>**, **<font color="fuchsia">2\*n-4</font>**, **<font color="blue">2\*n-6</font>**, ..., **<font color="green">4</font>**, **<font color=#E0A000>2</font>**, **<font color="red">0</font>**  
{{% /code %}}

