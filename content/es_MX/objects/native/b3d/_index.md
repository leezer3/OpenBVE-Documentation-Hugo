---
title: "El formato de objeto **.b3d**"
linktitle: "El objeto B3D"
weight: 1
---

## ■ Contenidos

{{% contents %}}

- [1. Vista general](#overview)
- [2. Syntax](#syntax)
- [3. Available commands](#commands)
  - [[MeshBuilder]](#createmeshbuilder)
  - [Vertex](#addvertex)
  - [Face](#addface)
  - [Face2](#addface2)
  - [Cube](#cube)
  - [Cylinder](#cylinder)
  - [Translate, TranslateAll](#translate)
  - [Scale, ScaleAll](#scale)
  - [Rotate, RotateAll](#rotate)
  - [Shear, ShearAll](#shear)
  - [Mirror, MirrorAll](#mirror)
  - [Color, ColorAll](#setcolor)
  - [EmissiveColor, EmissiveColorAll](#setemissivecolor)
  - [BlendMode](#setblendmode)
  - [WrapMode](#setwrapmode)
  - [Load](#loadtexture)
  - [Transparent](#setdecaltransparentcolor)
  - [Crossfading](#enablecrossfading)
  - [Coordinates](#settexturecoordinates)

{{% /contents %}}

## <a name="overview"></a>■ 1. Vista general

Un objeto B3D permite crear un solo objeto usando instrucciones textuales. El objeto puede ser usado en rutas y trenes. El objeto descrito por el archivo puede contener cualquier cantidad de polígonos individuales. El formato del archivo permite agrupar múltiples polígonos en las secciones [MeshBuilder] en cual, estos atributos como color o la información de textura son asignadas a todos los polígonos creados en cada sección. Esto permite la creación de varios polígonos en la misma sección [MeshBuilder] los cuales comparten atributos comunes. Un polígono es denominado una cara (face) en este archivo de formato.

El archivo es un texto plano codificado en cualquier tipo arbitrario de [codificación]({{< ref "/information/encodings/_index.md" >}}), Sin embargo, UTF-8 con un byte de orden marca es la opción preferida El [analizar de modelo]({{< ref "/information/numberformats/_index.md" >}}) para los números es **Loose**, Sin embargo, le recomendamos que el resultado sea  *Strict* . El nombre del archivo es arbitrario, pero debe tener la extensión **.b3d**.  El archivo es interpretado línea por línea, de arriba hacia abajo.

➟ [Ver también una referencia rápida para el formato B3D...]({{< ref "/objects/native/b3d_quick/_index.md" >}})

## <a name="syntax"></a>■ 2. Sintaxis

Cada linea en el archivo se divide en el nombre del comando y en su argumento. La sintaxis para todos los comandos es la misma que a continuación:

{{% command %}}
**NombreDelComando** *Argumento<sub>1</sub>*, *Argumento<sub>2</sub>*, *Argumento<sub>3</sub>*, ..., *Argumento<sub>n</sub>*
{{% /command %}}

*NombreDelComando* no distingue entre minúsculas y mayúsculas. Si existen argumentos, *NombreDelComando* y *Argumento1* deben ser separados por al menos un espacio (U+0020).  Los Argumentos son separados por una coma (U+002C). [Espacios en blanco]({{< ref "/information/whitespaces/_index.md" >}}) cerca de los argumentos, y bien al comienzo del final de cada linea, son ignorados. Líneas vacías o lineas solas consistente con espacios en blanco también son ignoradas.

Los argumentos también pueden ser omitidos dejando el texto a cada *Argumento<sub>i</sub>* en blanco. Un valor predeterminado también puede ser aplicado en este caso, el cual es específico para el comando a ser usado. Todos los valores predeterminados son especificados en la sección disponible de comandos. Nota sin embargo que que el primer argumento no puede ser omitido si otros argumentos son proporcionados.

Puedes usar comentarios en cualquier lado al final de una línea. Un comentario comienza por punto y coma (U+003B). Si los comentarios estan presentes, son quitados de las líneas después de ser procesados.

## <a name="commands"></a>■ 3. Comandos disponibles

<a name="createmeshbuilder"></a>

{{% command %}}
**[MeshBuilder]**
{{% /command %}}

Este comando marca el principio de una nueva sección o caracas. Debe preceder de cualquier de los siguientes comandos. Puede haber tantas secciones [MeshBuilder] como sean deseadas en  el archivo del objeto. Los comandos subsecuentes relacionarse hasta la última sección abierta de [MeshBuilder].

----------

<a name="addvertex"></a>

{{% command %}}
**Vertex** *vX*, *vY*, *vZ*, *nX*, *nY*, *nZ*
{{% /command %}}

{{% command-arguments %}}
***vX***: La coordenada-x del vértice en metros. Valores negativos hacia izquierda, los positivos hacia la derecha. El valor predeterminado es 0.
***vY***: La coordenada-y del vértice en metros. Valores negativos hacia abajo, los positivos hacia arriba. El valor predeterminado es 0.
***vZ***: La coordenada-z del vértice en metros. Valores negativos hacia atrás, los positivos hacia adelante. El valor predeterminado es 0.
***nX***: La coordenada-x del normal de este vértice. El valor predeterminado es 0.
***nY***: La coordenada-y del normal de este vértice. El valor predeterminado es 0.
***nZ***: La coordenada-z del normal de este vértice. El valor predeterminado es 0.
{{% /command-arguments %}}

Este comando crea un nuevo vértice el cual puede ser usado para crear caras a través de los comandos Face o Face2. Puede haber tantos comandos Vertex como sean deseados dentro de la  sección [MeshBuilder]. Sin embargo, el orden de los vértices es muy importante para otros comandos. El primer vértice otorgado tiene índice 0, y los siguientes vértices tendrán índices 1,2,3 y así en adelante.

El normal es la dirección perpendicular a la cara en un punto en específico. Si todos los vértices en la cara tienen el mismo normal, la cara se verá plana. Si es usado apropiadamente, podrás dar la ilusión de una cara curva a través de especificar diferentes normal por cada vértice, pero usando el mismo normal en todos los vértices que comparten la misma coordenada espacial - a través de múltiples caras. Si todo el lado izquierdo es igual a cero, el normal será calculado automáticamente.

----------

<a name="addface"></a>

{{% command %}}
**Face** *v<sub>1</sub>*, *v<sub>2</sub>*, *v<sub>3</sub>*, ..., *v<sub>max</sub>*
{{% /command %}}

{{% command-arguments %}}
***v1<sub>i</sub>***: Corresponde al indice del vértice para incluir en esta cara. Los valores permitidos son 0 hasta *n*-1, donde *n* es el numero de comandos de vertices usados. 
{{% /command-arguments %}}

Este comando crea una cara dada en una lista arbitraría larga de índices de vértices. El índice corresponde al orden en el cual los vértices han sido creados por el comando Vertex, por consiguiente el comando Face necesitará iniciar después del comando Vertex correspondiente. El primer comando Vertex usado crea un índice 0, y los comandos Vertex siguientes crearán indice 1,2,3 en adelante. El orden en el cual el índice del vértice aparece es importante. Estos necesitan ser dados en orden hacia las agujas del reloj cuando se vean hacia al frente de la cara. La cara posterior no será visible. Sin embargo, el comando Face2 puede ser usado para crear una cara que sea visible de ambos lados. Solo polígonos convexos están soportados.

----------

<a name="addface2"></a>

{{% command %}}
**Face2** *v<sub>1</sub>*, *v<sub>2</sub>*, *v<sub>3</sub>*, ..., *v<sub>max</sub>*
{{% /command %}}

{{% command-arguments %}}
***v1<sub>i</sub>***: Corresponde al indice del vértice para incluir en esta cara. Los valores permitidos son 0 hasta *n*-1, donde *n* es el numero de comandos de vertices usados. 
{{% /command-arguments %}}

Este comando crea una cara dada en una lista arbitraría larga de índices de vértices. El índice corresponde al orden en el cual los vértices han sido creados por el comando Vertex, por consiguiente el comando Face necesitará iniciar después del comando Vertex correspondiente. El primer comando Vertex usado crea un índice 0, y los comandos Vertex siguientes crearán indice 1,2,3 en adelante. El orden en el cual el índice del vértice aparece es importante. Estos necesitan ser dados en orden hacia las agujas del reloj cuando se vean hacia al frente de la cara. La cara posterior también será visible, sin embargo, la iluminación de la cara posterior será del mismo resultado que la cara frontal. Solo polígonos convexos están soportados.

----------

<a name="cube"></a>

{{% command %}}
**Cube** *MitadDeAncho*, *MitadDeAlto*, *MitadDeLongitud*
{{% /command %}}

{{% command-arguments %}}
***MitadAncho***: A un número de coma flotante representando la mitad del ancho del cubo en **metros**.  
***MitadAlto***:  A un número de coma flotante representando la mitad del alto del cubo en **metros**.  
***MitadLongitud***:  A un número de coma flotante representando la mitad de la longitud del cubo en **metros**.  
{{% /command-arguments %}}

Este comando crea un cubo teniendo dimensiones especificadas por *MitadAncho*, *MitadAlto* y *MitadLongitud*. El cubo será centrado al origen (0,0,0). Por consiguiente, en el eje-x, el cubo extenderá desde -*MitadAncho* hasta *MitadAncho*, en el eje-y desde -*MitadAlto* hasta *MitadAlto* y en el eje-z desde -*MitadLongitud* hasta *MitadLongitud*. El cubo siempre tendrá 8 vértices y 6 caras.

{{% notice %}}

#### Representación del cubo

El comando Cube es equivalente a una serie comandos Vertex y Face, en lo cual necesitarás darte cuenta para cuando son usados otros comandos en la misma sección [MeshBuilder]. Los detalles en lo que hace el comando Cube esta disponible [aquí]({{< ref "/objects/native/cubecylinder/_index.md" >}}).

{{% /notice %}}

----------

<a name="cylinder"></a>

{{% command %}}
**Cylinder** *lados*, *RadioSuperior*, *RadioInferior*, *Altura*
{{% /command %}}

{{% command-arguments %}}
***lados***:  Un entero representado el número de vértices para ser usado en la base del tronco.  
***RadioSuperior***: Un número de coma flotante representando el radio de la base superior del tronco en **metros**. Puede ser negativo para indicar que la tapa superior será omitida.  
***RadioInferior***: Un número de coma flotante representando el radio de la base inferior del tronco en **metros**. Puede ser negativo para indicar que la tapa inferior será omitida.
***Altura***: Un número de coma flotante representando la altura del prisma en **metros**. Puede ser negativo, en el cual invertirá el tronco verticalmente y mostrándose hacia adentro.
{{% /command-arguments %}}

This command creates a [frustrum](http://en.wikipedia.org/wiki/Frustrum). If *LowerRadius* and *UpperRadius* are equal, the object generated will reduce to a [prism](http://en.wikipedia.org/wiki/Prism_(geometry)), which can be used as an approximation to the cylinder. If either *LowerRadius* or *UpperRadius* are zero, the object generated will reduce to a [pyramid](http://en.wikipedia.org/wiki/Pyramid_(geometry)). The frustum will be centered on the origin (0,0,0). On the x- and z-axes, the frustum extends from -*LowerRadius* to *LowerRadius* for the lower base and from -*UpperRadius* to *UpperRadius* for the upper base. On the y-axis, the frustum extends from -1⁄2\**Height* to 1⁄2\**Height*.

El número de vértices *n* que satisfacen cuando es un radio pequeño es de 6 o 8 , por ejemplo para crear un poste. Independientemente de los valores de *RadioSuperior*,*RadioInferior* y *n*, el tronco siempre tendrá 2\**n* vértices, y usualmente *n*+2 caras, a menos que algunos de los extremos sea omitido. Si *RadioSuperior* o *RadioInferior* son negativos, el valor absoluto será tomado, pero los extremos respectivos no serán creados. Sí *Height* es negativo, los roles de arriba y abajo serán revertidos y las caras serán visibles desde adentro, mientras que de caso contrario, estos serán visibles desde afuera.

{{% notice %}}

#### Representación del cilindro

El comando Cylinder es equivalente a una serie de comandos Vertex y Face, que deberás tener en cuenta para cuando uses otro comando en el misma sección [MeshBuilder]. Los detalles en lo que respecta a la funcionalidad del comando Cylinder están disponibles [aquí]({{< ref "/objects/native/cubecylinder/_index.md" >}}).

{{% /notice %}}

----------

{{% command %}}
<font color=#555555>Textura</font>
{{% /command %}}

*<font color=#555555>Este comando es ignorado por openBVE.</font>*

----------

<a name="translate"></a>

{{% command %}}
**Translate** *X*, *Y*, *Z*  
**TranslateAll** *X*, *Y*, *Z*
{{% /command %}}

{{% command-arguments %}}
***X***: Un número de coma flotante representando la traslación de la coordenada-x en **metros**. Valores negativos trasladan hacia izquierda, los positivos hacia derecha. El valor predeterminado es 0.
***Y***: Un número de coma flotante representando la traslación de la coordenada-y en **metros**. Valores negativos trasladan hacia abajo, los positivos hacia arriba. El valor predeterminado es 0.
***Z***: Un número de coma flotante representando la traslación de la coordenada-z en **metros**. Valores negativos trasladan hacia atrás, los positivos hacia adelante. El valor predeterminado es 0.
{{% /command-arguments %}}

El comando **Translate** mueve todos los vértices que han sidos creados hasta ahora en la sección [MeshBuilder] a través de los comandos, Vertex,Cube o Cylinder. Los vértices subsiguientes no son afectados. Puedes usar tantos comandos Translate como desees en una sección de [MeshBuilder]. El comando **TranslateALL** no solo afecta a los vértices generados en la sección actual [MeshBuilder], sino también a aquellos previamente creados en la secciones [MeshBuilder]. Esto es útil para insertar al final del archivo en orden de trasladar todo el objeto.

----------

<a name="scale"></a>

{{% command %}}
**Scale** *X*, *Y*, *Z*  
**ScaleAll** *X*, *Y*, *Z*
{{% /command %}}

{{% command-arguments %}}
***X***: Un número no cero de coma flotante representando la el factor de escala en la coordenada-x. El valor predeterminado es 1.
***Y***: Un número no cero de coma flotante representando la el factor de escala en la coordenada-y. El valor predeterminado es 1.
***Z***: Un número no cero de coma flotante representando la el factor de escala en la coordenada-z. El valor predeterminado es 1.
{{% /command-arguments %}}

El comando **Scale** escala todos los vértices que han sido creados hasta ahora en la sección de [MeshBuilder] a través de los comandos Vertex,Cube o Cylinder. Los vértices subsiguientes no serán afectados. Puedes usar tantos comandos Scale como desees en una sección de [MeshBuilder]. El comando **ScaleAll** no solo afecta a los vértices generados en la sección actual [MeshBuilder], sino también a todos aquellos que han sido creados previamente en las secciones [MeshBuilder]. Esto es útil para insertar al final del archivo en orden de escalar todo el objeto.

----------

<a name="rotate"></a>

{{% command %}}
**Rotate** *X*, *Y*, *Z*, *Ángulo*  
**RotateAll** *X*, *Y*, *Z*, *Ángulo*
{{% /command %}}

{{% command-arguments %}}
***X***:  La dirección-x del eje de rotación. Valores negativos apuntan hacia izquierda, positivos hacia derecha. El valor predeterminado es 0.
***Y***: La dirección-y del eje de rotación. Valores negativos apuntan hacia abajo, positivos hacia arriba. El valor predeterminado es 0.
***Z***: La dirección-z del eje de rotación. Valores negativos apuntan hacia atrás, positivos hacia adelante. El valor predeterminado es 0.
***Ángulo***: El ángulo de la rotación en grados. Valores negativos rotan hacia en contra sentido de las agujas del reloj, positivos en sentido de las agujas del reloj. El valor predeterminado es 0.
{{% /command-arguments %}}

El comando **Rotate** gira todos los vértices que han sido creados hasta ahora en la sección de [MeshBuilder] a través de los comandos Vertex,Cube o Cylinder. Los vértices subsiguientes no serán afectados. El eje de rotación es específicado por los valores *X*, *Y* y *Z*. La rotación ocurrirá en el plano perpendicular a esa dirección. Un vector cero para este eje es tratado como (1,0,0). Todas las otras direcciones son normalizadas. Puedes causar tantas rotaciones como desees en una sección [MeshBuilder]. El comando **RotateAll** no solo afecta a los vertices que han sido generados en la sección actual [MeshBuilder], sino también a aquellos creados en las secciónes [MeshBuilder] anteriores. Esto es útil al insertar al final del archivo en orden de rotar todo el objeto.

----------

<a name="shear"></a>

{{% command %}}
**Shear** *dX*, *dY*, *dZ*, *sX*, *sY*, *sZ*, *Cantidad*  
**ShearAll** *dX*, *dY*, *dZ*, *sX*, *sY*, *sZ*, *Cantidad*
{{% /command %}}

{{% command-arguments %}}
***dX***: La coordenada-x del vector D. El valor predeterminado es 0.  
***dY***: La coordenada-y del vector D. El valor predeterminado es 0. 
***dZ***: La coordenada-z del vector D. El valor predeterminado es 0. 
***sX***: La coordenada-x del vector S. El valor predeterminado es 0. 
***sY***: La coordenada-y del vector S. El valor predeterminado es 0. 
***sZ***: La coordenada-z del vector S. El valor predeterminado es 0. 
***r***: La cantidad que indica cuanto se desplazará los vectores. El valor predeterminado es 0. 
{{% /command-arguments %}}

El comando **Shear** logra un [cambio de mapeo] (http://en.wikipedia.org/wiki/Shear_mapping) para todos los vértices que han sido creados hasta ahora en la actual sección [MeshBuilder]. El comando **ShearAll** no solo afecta a los vértices generados en la sección actual [MeshBuilder], sino también a aquellos que han sido creados anteriormente en las secciones [MeshBuilder]. Esto es útil al instertar al final del archivo en orden de cambiar todo el objeto.

![illustration_shear](/images/illustration_shear.png)

El mapeado de cambio es hecho sobre el origen. Pobremente hablando, el objeto es cortado en planos sobre la dirección D y después desplazada a lo largo de la dirección S. Típicamente, D y S son perpendicular. D y S siempre són normalizados. Si la *Cantidad* es 0, ninguna transformación es aplicada. Si D y S son perpendicular, y una *Cantidad* de 1 corresponde a una pendiente de 45 grados.

----------

<a name="mirror"></a>

{{% command %}}
**Mirror** *X*, *Y*, *Z*  
**MirrorAll** *X*, *Y*, *Z*
{{% /command %}}

{{% command-arguments %}}
***X***: Donde el eje-x  debe ser invertido. El valor predeterminado es 0 (falso).  
***Y***: Donde el eje-y debe ser invertido. El valor predeterminado es 0 (falso). 
***Z***: Donde el eje-z debe ser invertido. El valor predeterminado es 0 (falso). 
{{% /command-arguments %}}

The **Mirror** command mirrors all vertices that have been created so far in the current CreateMeshBuilder section via the AddVertex, Cube or Cylinder commands. Subsequent vertices are not affected. The direction(s) to mirror are specified via the *X*, *Y* and *Z* values. You can use as many Mirror commands as desired in a CreateMeshBuilder section.<br><br> The **MirrorAll** command not only affects the vertices generated in the current CreateMeshBuilder section, but also those created in previous CreateMeshBuilder sections. This is useful to insert at the end of the file in order to mirror the whole object.

----------

<a name="setcolor"></a>

{{% command %}}
**Color** *Red*, *Green*, *Blue*, *Alpha*  
**ColorAll** *Red*, *Green*, *Blue*, *Alpha*  
{{% /command %}}

{{% command-arguments %}}
***Rojo***: El componente rojo del color. Medido desde 0 (negro) a 255 (rojo). El valor predeterminado es 255.
***Verde***: El componente verde del color. Medido desde 0 (negro) a 255 (verde). El valor predeterminado es 255.
***Azul***: El componente azul del color. Medido desde 0 (negro) a 255 (azul). El valor predeterminado es 255.
***Alfa***: El componente alfa del color. Medido desde 0 (transparente) a 255 (opaco). El valor predeterminado es 255.
{{% /command-arguments %}}

The **Color** command sets the color for all faces that were already created in the current [MeshBuilder] section. If no texture is used, the faces will be colored using the color data as specified by *Red*, *Green* and *Blue*. If a texture is used, the pixels in the texture will be multiplied by the color, where multiplying with black results in black and multiplying with white does not change the color of the texture pixels. Values in-between make the texture pixels darker. When lighting is used in the route, the actual color can change depending on the lighting conditions, but will usually become darker.

The **ColorAll** command sets the color for all faces that were already created in the current [MeshBuilder] section, and those created in the previous [MeshBuilder] sections.

----------

<a name="setemissivecolor"></a>

{{% command %}}
**EmissiveColor** *Red*, *Green*, *Blue*  
**EmissiveColorAll** *Red*, *Green*, *Blue*  
{{% /command %}}

{{% command-arguments %}}
***Rojo***: El componente rojo del color. Medido desde 0 (negro) a 255 (rojo). El valor predeterminado es 0.
***Verde***: El componente verde del color. Medido desde 0 (negro) a 255 (verde). El valor predeterminado es 0.
***Azul***: El componente azul del color. Medido desde 0 (negro) a 255 (azul). El valor predeterminado es 0.
{{% /command-arguments %}}

The **EmissiveColor** command sets the emissive color for all faces that were already created in the current [MeshBuilder] section. The difference between the Color command and the EmissiveColor command is that the Color command is affected by lighting, while the EmissiveColor command is not. Thus, the EmissiveColor command should be used for faces which would emit light themselves, including signals, lamps, windows and the like. The actual color contribution to the faces will be the sum of the light-affected color data and the static emissive color data.

The **EmissiveColorAll** command sets the color for all faces that were already created in the current [MeshBuilder] section, and those created in the previous [MeshBuilder] sections.

----------

<a name="setblendmode"></a>

{{% command %}}
**BlendMode** *ModoCombinar*, *BrilloMitadDistancia*, *ModoAtenuaciónBrillo*
{{% /command %}}

{{% command-arguments %}}
***BlendMode***: The blend mode to use. The default is Normal.  
***GlowHalfDistance***: The distance at which the glow is at 50% of its intensity, measured in meters. The value must be an integer in the range from 1 to 4095, or 0 to disable glow attenuation. The default value is 0.  
***GlowAttenuationMode***: The glow attenuation mode to use. The default is DivideExponent4.  
{{% /command-arguments %}}

▸ Opciones disponibles para *ModoCombinar*:

{{% command-arguments %}}
**Normal**: Las caras se renderizarán normalmente.  
**Additive**: Las caras se renderizarán aditivamente.  
{{% /command-arguments %}}

▸ Opciones disponibles para *ModoAtenuaciónBrillo*:

{{% command-arguments %}}
**DivideExponente2**: La intensidad del brillo es determinada por la función *x*<sup>2</sup> / (*x*<sup>2</sup> + *BrilloMitadDistancia*<sup>2</sup>), donde *x* es la distancia desde la cámara al objeto en metros.
**DivideExponente4**: La intensidad del brillo es determinada por la función *x*<sup>4</sup> / (*x*<sup>4</sup> + *BrilloMitadDistancia*<sup>4</sup>), donde *x* es la distancia desde la cámara al objeto en metros.
{{% /command-arguments %}}

This command sets the blend mode for all faces in the current [MeshBuilder] section. The *Normal* mode replaces screen pixels with texture pixels. The *Additive* mode adds the color of texture pixels to the color of screen pixels, where adding black does not change the screen pixel, while adding white results in white. If *GlowHalfDistance* is 0, glow attenuation will be disabled, which is the default. If glow attenuation is to be used, *GlowHalfDistance* represents the distance in meters at which the glow is exactly at 50% of its intensity. When the camera approaches the face, the face will gradually fade out (become transparent). The function used to determine the exact intensity for a given distance can be influenced with the setting of *GlowAttenuationMode*. DivideExponent2 creates a smoother transition, but will converge to the maximum intensity very slowly, while DivideExponent4 creates a sharper transition which converges more quickly.

----------

<a name="setwrapmode"></a>

{{% command %}}  
**WrapMode**, *WrapMode*
{{% /command %}}

{{% command-arguments %}}  
***WrapMode***: The openGL texture wrapping mode to use. If this is not specified, the game will attempt to auto-determine the most appropriate texture wrapping mde.  
{{% /command-arguments %}}

▸ Available options for *WrapMode*:

{{% command-arguments %}}  
**ClampClamp**: The texture is clamped to edge on both axes. 
**ClampRepeat**: The texture is clamped to edge on the x-axis and repeats on the y-axis. 
**RepeatClamp**: The texture repeats on the x-axis and is clamped to edge on the y-axis.
**RepeatRepeat**: The texture repeats on both axes.
{{% /command-arguments %}}

----------

<a name="loadtexture"></a>

{{% command %}}
**Load** *TexturaDeDia*, *TexturaDeNoche*
{{% /command %}}

{{% command-arguments %}}
***DaytimeTexture***: The file name of the daytime version of the texture to load, relative to the directory the object file is stored in.  
***NighttimeTexture***: The file name of the daytime version of the texture to load, relative to the directory the object file is stored in.  
{{% /command-arguments %}}

This command loads a texture and uses it for all faces in the current CreateMeshBuilder section. The file name is relative to the directory the object file is stored in. You can use PNG, which supports full alpha channels, but use the alpha channel only if absolutely required as it reduces performance. Prefer using a texture without an alpha channel in conjunction with the SetDecalTransparentColor command in order to use color-key transparency.

If *NighttimeTexture* is used, it specifies the texture to be used on nighttime lighting conditions, while *DaytimeTexture* then specifies the texture to be used on daytime lighting conditions. The textures might blend into each other and should be designed accordingly. If *NighttimeTexture* is used, *DaytimeTexture* must also be specified. If *NighttimeTexture* is not used, low lighting conditions will make the daytime version darker. Nighttime textures are meant for use with train interior/exterior objects.

----------

<a name="setdecaltransparentcolor"></a>

{{% command %}}
**Transparent** *Rojo*, *Verde*, *Azul*
{{% /command %}}

{{% command-arguments %}}
***Rojo***: El componente rojo del color. Medido desde 0 (negro) a 255 (rojo). El valor predeterminado es 0.
***Verde***: El componente verde del color. Medido desde 0 (negro) a 255 (verde). El valor predeterminado es 0.
***Azul***: El componente azul del color. Medido desde 0 (negro) a 255 (azul). El valor predeterminado es 0.
{{% /command-arguments %}}

This command sets the color used for screendoor transparency for all faces that were already created. The texture loaded via the Load command will become transparent for all pixels which match exactly with the color specified via the *Red*, *Green* and *Blue* parameters. The use of screendoor transparency is much more efficient than using a full alpha channel, so prefer using a texture without an alpha channel and use this command instead to make parts of the texture transparent. You need to specify texture coordinates via the Coordinate command in order for the texture to correctly appear on the faces.

----------

<a name="enablecrossfading"></a>

{{% command %}}  
**Crossfading** *value* 
{{% /command %}}

{{% command-arguments %}}  
**value**: Either true to enable cross-fading, or false (default) to disable.
{{% /command-arguments %}}

This command controls the blending mode when both a daytime and a nighttime texture are specified.

When this is set to **false** the behavior is as follows:
1. The daytime texture is drawn.
2. The opacity level for the nighttime texture is calculated from the __Track.Brightness__ value, where a value of **255** produces a fully opaque texture, and a value of **0** produces a fully transparent texture.
3. The nighttime texture is drawn.

When this is set to **true** the behaviour is as follows:

The opacity level for each texture is blended proportionately, so that for example, a __Track.Brightness__ value of **128** would produce an (approximately) 50% blend of each texture and so-on.

---------

<a name="settexturecoordinates"></a>

{{% command %}}
**Coordinates** *IndiceVertice*, *X*, *Y*
{{% /command %}}

{{% command-arguments %}}
***VertexIndex***: The vertex index the coordinate is referring to. Allowed values are 0 through *n*-1, where *n* is the number of Vertex commands used.  
***X***: The x-coordinate of the texture. Integer values correspond to the left/right edge of the texture. If only values between 0 and 1 are to be considered, 0 corresponds to the left and 1 to the right.  
***Y***: The y-coordinate of the texture. Integer values correspond to the top/bottom edge of the texture. If only values between 0 and 1 are to be considered, 0 corresponds to the top and 1 to the bottom.  
{{% /command-arguments %}}

Este comando asocia una coordenada en la textura al vértices especificado por *IndiceVertice*. El indice corresponde al orden en el cual los vértices han sido creados por el comando Vertex, de esta manera el comando Coordinates necesita estar presente después del los correspondientes comandos Vertex. Los valores *X* y *Y* no necesariamente necesitan estar en un rango entre 0 (izquierda o arriba) a 1 (derecha o abajo), pero también puede tener otro valor. Esta asumido que en este caso que las texturas son repetidas en una malla infinita donde el valor entero para *X* y *Y* corresponden a las esquinas de las texturas
