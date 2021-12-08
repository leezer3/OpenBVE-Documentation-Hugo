---
title: "Cubos y cilindros"
hidden: true
---

## ■ El comando Cube

El comando de objetos Cube en B3D y CSV es equivalente a una serie de comandos Vertex/AddVertex y Face/AddFace.

Dando el siguiente código (Estilo B3D):

{{% code %}}  
Cube *x*, *y*, *z*  
{{% /code %}}

El comando Cube corresponde a estas instrucciones (estilo B3D):

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

donde *v* es el número de vértices que posee actualmente creado antes que el comando Cube fuera usado.

Si deseas agregar una textura al cubo, necesitas agregar apropiadamente los comandos Coordinate/SetTextureCoordinate manualmente.

## ■ El comando Cylinder

El comando de objetos Cylinder en B3D y CSV es equivalente a una serie de comandos Vertex/AddVertex y Face/AddFace.

Dando el siguiente código (Estilo B3D):

{{% code %}}  
Cylinder *n*, *r1*, *r2*, *h*  
{{% /code %}}

El comando Cylinder primero corresponde a instrucciones de *n* pares de dos vértices (estilo B3D):

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

Entones, *n* caras son añadidas a la forma de las paredes laterales (Estilo B3D):

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

Si *r2*>0, una tapa inferior es entonces agregada (Estilo B3D):

{{% code %}}  
Face **<font color="red">2\*n-2</font>**, **<font color="fuchsia">2\*n-4</font>**, **<font color="blue">2\*n-6</font>**, ..., **<font color="green">4</font>**, **<font color=#E0A000>2</font>**, **<font color="red">0</font>**  
{{% /code %}}

Si *r1*>0, una tapa superior es entonces agregada (Estilo B3D):

{{% code %}}  
Face **<font color="red">1</font>**, **<font color=#E0A000>3</font>**, **<font color="green">5</font>**, ..., **<font color="blue">2\*n-5</font>**, **<font color="fuchsia">2\*n-3</font>**, **<font color="red">2\*n-1</font>**  
{{% /code %}}

Si deseas agregar una textura al cilindro, necesitas agregar apropiadamente los comandos Coordinate/SetTextureCoordinate manualmente.