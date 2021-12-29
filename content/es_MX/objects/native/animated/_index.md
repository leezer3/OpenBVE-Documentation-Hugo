---
title: "El formato de objeto **.animated**"
linktitle: "El objeto .ANIMATED"
weight: 3
---

## ■ Contenidos

{{% contents %}}

- [1. Vista general](#overview)
- [2. Secciones](#description)
- [3. Lista de operadores para notación aritmética](#operators)
- [4. Lista de funciones](#functions)
- [5. Lista de variables](#variables)
- [6. Rendimiento](#performance)
- [7. Consejos](#tips)
- [8. Funciones de ejemplo](#examples)
- [9. Gramática Formal](#grammar)

{{% /contents %}}

## <a name="overview"></a>■ 1. Vista general

El formato .ANIMATED de objeto es un formato contenido habilitandote de referir otros objetos (B3D/CSV/X) y de aplicar animación en ellos. Esto también permite agrupar otros objetos (incluyendo otros objetos .ANIMATED) sin animarlos.

Los objetos animados también pueden ser usados en rutas CSV/RW (a menos que este explicita mente deshabilitado por algunos comandos), así como los objetos externos del tren por *extensions.cfg*, y así como la cabina 3D por el archivo *panel.animated*.

##### ● Fundamento

La animación es realizada por las siguientes directrices:

- Cambios de estado - básicamente habilitando de cambiar entre diferentes objetos en cualquier tiempo.
- Traslación - moviendo objetos en tres direcciones independientes
- Rotación - rotando objetos sobre los tres ejes independientes
- Saltos de textura - habilitando el salto de coordenadas de textura en objetos en dos direcciones independientes

##### ● Una pequeña formalidad

El archivo es un texto plano codificado en cualquier arbitrario [codificación] ({{< ref "/information/encodings/_index.md" >}}), Sin embargo, UTF-8 con un byte de orden marca es la opción preferida. El [modelo de análisis]({{< ref "/information/numberformats/_index.md" >}}) para números es **Strict**. El nombre de archivo es arbitrario, pero debe tener la extensión **.animated**. El archivo es interpretado por cada linea, desde arriba hasta abajo.

## <a name="description"></a>■ 2. Secciones

##### ● La sección [Include]

Puedes usar la sección [Include] solo para incluir otros objetos, pero sin animarlos. Esto te permite de usar el archivo de objetos ANIMADOS como un contenedor de grupo de otros objetos. Puede haber cualquier cantidad de secciones [Include] dentro del archivo.

{{% command %}}  
[Include]  
{{% /command %}}  
Esto inicia la sección.

{{% command %}}  
*NombreArchivo<sub>0</sub>*  
*NombreArchivo<sub>1</sub>*  
*NombreArchivo<sub>2</sub>*  
...  
{{% /command %}}  
Defina una serie de objetos B3D/CSV/X/ANIMATED que deben ser incluidas como son.

{{% command %}}  
**Position = X, Y, Z**  
{{% /command %}}  
Esto defina la posición de los objetos, basicamente te permite de separarlos con respecto al resto de los archivos de objeto ANIMADOS.

------

##### ● La sección [Object]

Puedes usar la sección [Object] para crear una sola animación. Esto requiere de configurar un estado a través de los parámetros de *Estados*, y de usar cualquier combinación de funciones que desees, lo cual provee control sobre la animación. Puede haber cualquier cantidad de secciones [Object] dentro del archivo.

{{% command %}}  
[Object]  
{{% /command %}}  
Esto inicia la sección.

{{% command %}}  
**Position = X, Y, Z**  
{{% /command %}}  
Defina la posición del objeto. Esto básicamente corresponde a un comando TranslateALL en el archivo CSV/B3D respectivamente, pero es realizado después de que cualquiera de las funciones es realizada. Por ejemplo, si deseas usar rotación, entonces ten en consideración que la rotación es efectuada sobre el origen (0,0,0). El comando *Posición* permite de re-posicionar el objeto después de que la rotación es realizada.

{{% command %}}  
**States = Archivo<sub>0</sub>, Archivo<sub>1</sub>, ..., Archivo<sub>n-1</sub>**  
{{% /command %}}  
Carga *n* objetos de extensión CSV/B3D/X. Por favor tenga en cuenta que el primer archivo indicado posee estado de indice 0. Usa múltiples archivos solo si deseas usar el cambio de estados.

{{% command %}}  
**StateFunction = Formula**  
{{% /command %}}  
Esto defina la función para cambiar de estado. El resultado de la fórmula *Formula* es redondeado al entero mas cercano. Si el entero esta entre 0 y *n*-1, donde *n* es el numero de estados definido por los *Estados*, el estado respectivo es mostrado , de otra manera, ningún objeto es mostrado. Puedes hacer uso del ultimo si deseas que sea un objeto de encendido/apagado con un solo estado.

{{% command %}}  
**TranslateXDirection = X, Y, Z**  
**TranslateYDirection = X, Y, Z**  
**TranslateZDirection = X, Y, Z**  
{{% /command %}}  
Esto defina la dirección para la función *TranslateXFunction*, *TranslateYFunction* y *TranslateZFunction*, respectivamente. Las direcciones predeterminadas son:

*TranslateXDirection = 1, 0, 0*  
*TranslateYDirection = 0, 1, 0*  
*TranslateZDirection = 0, 0, 1*

Esto significa que la función TranslateXFunction se moverá hacia la derecha predeterminado,  TranslateYFunction hacia arriba y TranslateZFunction hacia adelante, también es por eso que TranslateXFunction y así sucesivamente llevan sus nombres. Si usted define otras direcciones, entonces simplemente piensa que las tres funciones y sus direcciones asociadas como tres maneras independientes para si mover el objeto en esa dirección

{{% command %}}  
**TranslateXFunction = Formula**  
**TranslateYFunction = Formula**  
**TranslateZFunction = Formula**  
{{% /command %}}  
Esto defina la función que moverá el objeto en la dirección respectiva. La *Formula* necesita retornar la cantidad de metros a mover desde la posición inicial. Los parámetros *X*, *Y* y *Z* en la respectiva dirección son multiplicados por el resultado de la *Formula*, así que puedes por ejemplo multiplicar la formula por 2 o la dirección por 2 si es que deseas doblar la velocidad del movimiento

{{% command %}}  
**RotateXDirection = X, Y, Z**  
**RotateYDirection = X, Y, Z**  
**RotateZDirection = X, Y, Z**  
{{% /command %}}  
Esto defina la dirección para la función *RotateXFunction*, *RotateYFunction* y *RotateZFunction*, respectivamente. Las direcciones predeterminadas son:

*RotateXDirection = 1, 0, 0*  
*RotateYDirection = 0, 1, 0*  
*RotateZDirection = 0, 0, 1*

Esto significa que la función RotateXFunction rotará sobre el eje X predeterminadamente, RotateYFunction sobre el eje Y, y RotateZFunction sobre el eje Z, también es por eso que RotateXFunction y asi sucesivamente llevan sus nombres. Si usted define otras direcciones, entonces simplemente piense de que estas tres funciones y sus direcciones asociadas como tres maneras independientes para asi rotar el objeto.

{{% command %}}  
**RotateXFunction = Formula**  
**RotateYFunction = Formula**  
**RotateZFunction = Formula**  
{{% /command%}}  
Esto defina la función para rotar a lo largo de la dirección respectiva en orden contra-reloj. La *Formula* necesita regresar el ángulo por el cual rotar en radianes. El orden que estas rotaciones son ejecutadas es: RotateXFunction (primero), RotateYFunction (después) and RotateZFunction (último). Si usted usa más de una función de rotación al momento, ten en mente este orden. De ser necesario, reescribe las direcciones predeterminadas para las rotaciones si necesitas un orden distinto.

{{% command %}}  
**RotateXDamping = NaturalFrequency, DampingRatio**  
**RotateYDamping = NaturalFrequency, DampingRatio**  
**RotateZDamping = NaturalFrequency, DampingRatio**  
{{% /command %}}  
Esto defina la amortiguación para la función correspondiente. Si no es usado, la amortiguación no será ejecutada. *NaturalFrequency* es un valor no negativo correspondiente a la frecuencia angular del supuesta oscilación sin amortiguación en radianes por segundo. *DampingRatio* es un valor no negativo indicando el tipo de amortiguación. Valores entre 0 y 1 representa baja amortiguación, 1 representa amortiguación crítica, y valores superiores a 1 representan sobre-amortiguación

{{% command %}}  
**TextureShiftXDirection = X, Y**  
**TextureShiftYDirection = X, Y**  
{{% /command %}}  
Esto defina las direcciones para la función *TextureShiftXFunction* y*TextureShiftYFunction*, respectivamente. Las direcciones por defecto son:

*TextureShiftXDirection = 1, 0*  
*TextureShiftYDirection = 0, 1*

Esto significa que TextureShiftXFunction cambiará la textura a la derecha por defecto, y TextureShiftYFunction hacia abajo, también es por eso que TextureShiftXFunction y así sucesivamente llevan sus nombres. Si usted defina otras direcciones, entonces simplemente piense que estas dos funciones y sus direcciones asociadas como dos maneras independientes de cambiar las texturas en los objetos.

{{% command %}}  
**TextureShiftXFunction = Formula**  
**TextureShiftYFunction = Formula**  
{{% /command %}}  
Esto defina las funciones para cambiar las texturas en la dirección respectiva. La textura es cambiada por el valor retornado de *Formula* en coordenadas de textura. La parte entra del resultado es ignorada, y la parte fraccional de 0.5 representa mover la textura a la mitad. El comando SetTextureCoordinate en el objeto defina las coordenadas, que son después agregadas en el resultado de estas formulas.

{{% command %}}  
**TrackFollowerFunction = Formula**  
{{% /command %}}  
Esto defina la función el cual mueve un objecto a lo largo de la vía de **Rail 0**. La *Formula* debe retornar la distancia en metros, para así el objeto sea movido, respetando las curvas y los cambios de altura de **Rail 0**

{{% command %}}  
**TextureOverride = Valor**  
{{% /command %}}  
*Valor* = **Timetable**: Todas las caras mostrarán la imagen del itinerario configuradas por las rutas CSV/RW.  
*Valor* = **None**: Las texturas originales se mostrarán en las caras (conducta predeterminada).

{{% command %}}  
**RefreshRate = Segundos**  
{{% /command %}}  
Esto defina la mínima cantidad de tiempo que necesita transcurrir para que la función sea actualizada. Un valor de 0 obliga a la función a ser actualizada cada cuadro por segundo. Por favor tenga en cuenta que los objetos fuera del rango visual puedan ser actualizados menos frecuentemente sin importar este parámetro. Usa RefreshRate cuando no necesites una animación suave (en orden de optimizar los recursos), o cuando deliberadamente quieras que el objeto este actualizado con un intervalo personalizado.

------

##### ● La sección [Sound] 

Puedes usar la sección [Sound] para agregar efectos de sonidos independientes a objetos animados.

{{% command %}}  
[Sound]  
{{% /command %}}  
Esto inicia la sección

{{% command %}}  
**FileName = File**
{{% /command %}}  
Esto añade el efecto de sonido a ser reproducido.

{{% command %}}  
**Posición = X, Y, Z**  
{{% /command %}}  
Esto define la posición del sonido, relativo al centro del archivo animated.

{{% command %}}  
**Volume = Valor**  
{{% /command %}}  

Esto define el volumen inicial del sonido a la posición de origen. A valor de **1.0** representa el volumen nominal sin cambio del archivo de sonido.

{{% command %}}  
**Pitch = Valor**  
{{% /command %}}  

Esto define la velocidad inicial del sonido a la posición de origen. A valor de **1.0** representa el velocidad nominal sin cambio de grado de el archivo de sonido.

{{% command %}}  
**Radius= Valor**  
{{% /command %}}  

Esto defina el radio en metros desde el origen al que el efecto de sonido se reproduce a máximo volumen. El valor predeterminado es **30**.

{{% command %}}  
**VolumeFunction = Formula**  
{{% /command %}}  
Esto define la función que controla el volumen de el sonido. *Formula* debe retornar un numero representando el volumen deseado, donde **1.0** representa el volumen nominal sin cambio de el sonido del archivo.

{{% command %}}  
**PitchFunction = Formula**  
{{% /command %}}  
Esto define la función que controla la velocidad de el sonido. *Formula* debe retornar un numero representando el volumen deseado, donde **1.0** representa la velocidad nominal sin cambio de el sonido del archivo.

{{% command %}}  
**TrackFollowerFunction = Formula**  
{{% /command %}}  
Esto defina la función el cual mueve el origen del sonido a lo largo de la vía de **Rail 0**. La *Formula* debe retornar la distancia en metros, para así el objeto sea movido, respetando las curvas y los cambios de altura de **Rail 0**.

------

##### ● La sección [StateChangeSound]

Puedes usar la sección [StateChangeSound] para adjuntar efectos de sonidos a la sección de [Object] precedente.

{{% command %}}  
[StateChangeSound]  
{{% /command %}}  
Esto inicia la sección - Seguido inmediatamente de la sección [Object].

{{% command %}}  
**FileName = Archivo**
{{% /command %}}  
Esto carga el efecto de sonido para ser reproducido en todos los estados de cambio. Otra alternativa como lo es **FileNames** puede ser usada, el cual se describe a continuación:

{{% command %}}  
**FileNames = Archivo<sub>0</sub>, Archivo<sub>1</sub>, ..., Archivo<sub>n-1</sub>**  
{{% /command %}}  
Carga una lista de *n* sonidos, el cual corresponde a los estados de el objeto en la sección [Object] debajo.
Si un estado no tiene efecto de sonido, el ítem de la lista debe dejarse en blanco.

{{% command %}}  
**Position = X, Y, Z**  
{{% /command %}}  
Esto define la posición del sonido, relativo al centro del archivo animated.

{{% command %}}  
**Volume = Valor**  
{{% /command %}}  

Esto define el volumen del sonido a la posición de origen. A valor de **1.0** representa el volumen nominal sin cambio del archivo de sonido.

{{% command %}}  
**Pitch = Valor**  
{{% /command %}}  

Esto define la velocidad del sonido a la posición de origen. A valor de **1.0** representa el velocidad nominal sin cambio de grado de el archivo de sonido.

{{% command %}}  
**Radius= Valor**  
{{% /command %}}  

Esto defina el radio en metros desde el origen al que el efecto de sonido se reproduce a máximo volumen. El valor predeterminado es **30**.

{{% command %}}  
**PlayOnShow = Valor**  
{{% /command %}}  

*Valor* = **0**: El efecto de sonido no será reproducido.
*Valor* = **1**: El efecto de sonido será reproducido.

This defines whether the sound effect defined above should be played when a the relevant state is shown. 

{{% command %}}  
**PlayOnHide = Value**  
{{% /command %}}  


*Valor* = **0**: El efecto de sonido no será reproducido.
*Valor* = **1**: El efecto de sonido será reproducido.

This defines whether the sound effect defined above should be played when the relevant state is hidden.

{{% note %}}

**PlayOnShow** and **PlayOnHide** will be ignored when using multiple state sounds.

{{% /note %}}

------

{{% warning %}}

#### Nota de compatibilidad con openBVE 2

Durante el desarrollo de openBVE (v0.9) y durante el desarrollo del formato de objeto animado, hay algunos comandos en existencia que terminan en *RPN*, así como *TranslateXFunctionRPN*. Estos comandos nunca se han hecho en cualquier lanzamiento oficial (v1.0) y nunca fueron pensados en ser usados fuera del entorno de desarrollo. Mientras estos siguen aún disponibles sin documentación, serán quitados en openBVE 2. Si estas usando algunos de estos comandos, por favor deshágase de ellos lo mas posible.

{{% /warning %}}

------

##### ● Sobre las formulas

Primero que todo, la notación aritmética, lo que puedes teclear dentro del parámetro *Formula*, es convertido en una notación funcional. Por cada notación aritmética, hay una notación funcional correspondiente. Algunas funciones no tienen un operador aritmético y solo pueden ser teclados en notación funcional. Para los operadores, la precedencia juega un rol importante. Puedes usar paréntesis para sobreponer el orden de precedencia así como generalmente en una fórmula matemática. Los nombres de las funciones no distinguen entre mayúsculas y minúsculas.

{{% warning-nontitle %}}

Por favor tenga en cuenta que el resultado de cualquier operación matemática o función pudiera ser infinito, intermediado o no real, 0 es retornado. Un error de desborde no puede ser prevenido, Así que debes tomar en cuenta esto.

{{% /warning-nontitle %}}

## <a name="operators"></a>■ 3. Lista de operadores aritméticos de notación

##### ● Aritmética básica

{{% table %}}

| Aritmética   | Funcionalidad       | Descripción               |
| :------ | :--------------- | :------------------------ |
| `a + b` | `Suma[a,b, ...]` | Representa adición       |
| `a - b` | `Sustraer[a,b]`  | Representa sustracción    |
| `-a`    | `Menos[a]`       | Convierte a negativo el número        |
| `a * b` | `Por[a,b,...]` | Representa multiplicación |
| `a / b` | `Dividir[a,b]`    | Representa división       |

{{% /table %}}

##### ● Comparaciones

Todas las comparaciones devuelven 1 para verdadero y 0 para falso.

{{% table %}}

| Infix    | Functional          | Description                                     |
| :------- | ------------------- | ----------------------------------------------- |
| `a == b` | `Equal[a,b]`        | True (1) if *a* equals *b*                      |
| `a != b` | `Unequal[a,b]`      | True (1) if *a* does not equal *b*              |
| `a < b`  | `Less[a,b]`         | True (1) if *a* is less than *b*                |
| `a > b`  | `Greater[a,b]`      | True (1) if *a* is greater than *b*             |
| `a <= b` | `LessEqual[a,b]`    | True (1) if *a* is less than or equal to *b*    |
| `a >= b` | `GreaterEqual[a,b]` | True (1) if *a* is greater than or equal to *b* |

{{% /table %}}

##### ● Logical operations

All operations treat 0 as false and any other value as true, and return 1 for true and 0 for false.

{{% table %}}

| Infix          | Funcionalidad | Description                            |
| :------------- | ---------- | -------------------------------------- |
| `!a`           | `Not[a]`   | Verdadero (1) si *a* es falso               |
| `a & b`        | `And[a,b]` | Verdadero (1) si ambos *a* y *b* son verdad  |
| `a` &#124; `b` | `O[a,b]`  | True (1) if any of *a* or *b* are true |
| `a ^ b`        | `Xor[a,b]` | True (1) if either *a* or *b* is true  |

{{% /table %}}

##### ● Operator precedence

From highest precedence to lowest. Operators of same precedence are evaluated either left to right or right to left, depending on if they share a precedence with another operator.

{{% table %}}

| Operator                         | Associativity | Sin paréntesis. | Equivilant      |
| -------------------------------- |---------------|-----------------|-----------------|
| `a[...]`                         | unary         | &nbsp;          | &nbsp;          |
| `-` (Minus)                      | unary         | &nbsp;          | &nbsp;          |
| `/`                              | right-to-left | 1 / 2 / 3       | (1 / (2 / 3))   |
| `*`                              | right-to-left | 1 * 2 * 3       | (1 * (2 * 3))   |
| `+`, `-` (Subtract)              | left-to-right | 1 + 2 + 3       | ((1 + 2) + 3)   |
| `==`, `!=`, `<`, `>`, `<=`, `>=` | left-to-right | 1 <= 2 <= 3     | ((1 <= 2) <= 3) |
| `!`                              | unary         | &nbsp;          | &nbsp;          |
| `&`                              | derecha-a-izquierda | 1 & 2 & 3       | (1 & (2 & 3))   |
| `^`                              | derecha-a-izquierda | 1 ^ 2 ^ 3       | (1 ^ (2 ^ 3))   |
| &#124;                           | right-to-left | 1 &#124; 2 &#124; 3       | (1 &#124; (2 &#124; 3))   |

{{% /table %}}

<br>

{{% warning-nontitle %}}  

The logical not and multiplication operator are not at the same precedence level as a lot of other languages. For example `!a + !b` is `!(!a + !(b))` **not** `(!a) + (!b)` as expected, similarly `1 * 2 / 3` is `1 * (2 / 3)` **not** `(1 * 2) / 3`  
Please also note that some combinations of prefix and infix operators are not recognised. For example `a*-b` is not accepted. Use `a*(-b)` or `-a*b` instead.

{{% /warning-nontitle %}}

## <a name="functions"></a>■ 4. List of functions

##### ● Basic arithmetics

{{% table-2col %}}

| Function         | Description                                                  |
| ---------------- | ------------------------------------------------------------ |
| `Reciprocal[x]`  | Returns the reciprocal, equal to 1/*x*                       |
| `Power[a,b,...]` | Returns *a* raised to the *b*<sup>th</sup> power. *b* must be a non-negative number. For consistency, Power[0,*b*] always returns 1, even in the degenerate case Power[0,0], and *a* being negative always returns 0. Adding more arguments will create a chain. Power[a,b,c] will return *a*<sup>*b*<sup>*c*</sup></sup>. |

{{% /table-2col %}}

#####  ● Numeric functions

{{% table-2col %}}

| Function                      | Description                                                  |
| ----------------------------- | ------------------------------------------------------------ |
| `Quotient[a,b]`               | Divides *a* by *b* and rounds the result down, equal to `Floor[a/b]`. |
| `Mod[a,b]`                    | Retorna el residuo al dividir *a* entre *b*, igual a `a-b*Floor[a/b]`. |
| `Min[a,b,...]`                | Returns the smallest of the terms.                           |
| `Max[a,b,...]`                | Returns the largest of the terms.                            |
| `Abs[x]`                      | Returns the absolute value.                                  |
| `Sign[x]`                     | Returns the sign of *x*, which is either -1, 0 or 1.         |
| `Floor[x]`                    | Rounds down to the nearest integer.                          |
| `Ceiling[x]`                  | Redondea hacia arriba al entero más cercano.                            |
| `Round[x]`                    | Rounds to the nearest integer. Numbers ending in .5 are rounded to the nearest even integer. |
| `random[Minimum, Maximum]`    | Returns a new random floating-point number between *Minimum* and *Maximum*. |
| `randomInt[Minimum, Maximum]` | Returns a new random integer between *Minimum* and *Maximum*. |

{{% /table-2col %}}

##### ● Elementary functions

{{% table-2col %}}

| Function    | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| `Exp[x]`    | The exponential function, or *e* to the *x*<sup>th</sup> power. |
| `Log[x]`    | The natural logarithm, to base *e*.                          |
| `Sqrt[x]`   | La raíz cuadrada.                                             |
| `Sin[x]`    | The sine (input in radians).                                 |
| `Cos[x]`    | The cosine (input in radians).                               |
| `Tan[x]`    | The tangent (input in radians).                              |
| `ArcTan[x]` | The inverse tangent (output in radians).                     |

{{% /table-2col %}}

##### ● Conditionals

{{% table-2col %}}

| Function                        | Description                                                  |
| ------------------------------- | ------------------------------------------------------------ |
| `If[cond,truevalue,falsevalue]` | Si *condición* es != 0, retorna *valorverdadero*, en caso contrario *valorfalso* |

{{% /table-2col %}}

## <a name="variables"></a>■ 5. Lista de variables

##### ● Primitives

{{% table-2col %}}

| Variable       | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| `value`        | The value returned by the function in the last evaluation. At the beginning of the simulation, this is 0. |
| `delta`        | La diferencia de tiempo desde la última evaluación de la función en segundos. Por favor ten en cuenta que no hay tiempo garantizado desde que transcurre entre los llamados de función sucesivos. |
| `currentState` | Returns the current numerical state of the object.           |

{{% /table-2col %}}

##### ● Time and camera

{{% table-2col %}}

| Variable         | Description                                                  |
| ---------------- | ------------------------------------------------------------ |
| `time`           | The current in-game time measured in seconds since midnight of the first day. |
| `hora`           | The integer part of the current hour. |
| `minute`         | The integer part of the current minute. |
| `second`         | The integer part of the current second. |
| `DistanciaCamara` | Una distancia cartesiana no negativa medida desde el objeto a la cámara en metros. |
| `cameraXDistance` | The non-negative cartesian distance measured on the X axis from the object to the camera in meters |
| `cameraYDistance` | Una distancia cartesiana no negativa medida desde el eje Y al objeto a la cámara en metros. |
| `cameraZDistance` | The non-negative cartesian distance measured on the Z axis from the object to the camera in meters |
| `cameraMode`     | Returns 0 if the camera is currently in a 2D or 3D cab, 1 otherwise. |

{{% /table-2col %}}

##### ● Trains

Generally, objects attached to a particular train and car return values for that train and car, unless stated otherwise. For scenery objects, the reference is the driver's car of the nearest train (not necessarily the player's train).

En algunos casos de las siguientes variables , *IndiceCarro* tiene el siguiente significado: 0 es el 1<sup>er</sup> carro  del frente, 1 es el 2<sup>do</sup> carro del frente, etc., mientras que -1 es el 1<sup>er</sup> carro desde la parte posterior, -2 es el 2<sup>do</sup> carro desde la parte posterior, etc. En general los indices de los carros desde -*cars* hasta *cars*-1 representan carros existentes, donde *cars* es el numero de carros que el tren posee, mientras que valores que estén fuera de este rango representan carros que no existen. Todos los trenes tienen al menos 1 carro, indices -1 y 0 están garantizados que existan para cualquier tren.

##### ● Trenes (generalidades)

{{% table-2col %}}

| Variable                      | Description                                                  |
| ----------------------------- | ------------------------------------------------------------ |
| `TrenJugador`                 | Returns 1 if the train is the player train, 0 otherwise.     |
| `carros`                        | El número de carros que el tren tiene.                            |
| `carNumber`                   | Returns the index of the current car.                        |
| `speed`                       | The signed actual speed of the current car in m/s. Is positive when the train travels forward, and negative when the train travels backward. |
| `speed[carIndex]`             | The signed actual speed of the car *carIndex* in m/s. Is positive when the train travels forward, and negative when the train travels backward. |
| `speedometer`                 | The signed perceived speed of the current car in m/s as it would appear to a speedometer on wheel slip and wheel lock. |
| `speedometer[carIndex]`       | The signed perceived speed of the car *carIndex* in m/s as it would appear to a speedometer on wheel slip and wheel lock. |
| `aceleración`                | The actual acceleration of the current car in m/s².          |
| `acceleration[carIndex]`      | The actual acceleration of the car *carIndex* in m/s².       |
| `accelerationMotor`           | La aceleración actual la cual el motor del primer carro genera en m/s². |
| `accelerationMotor[carIndex]` | The acceleration which the motor of the car *carIndex* currently generates in m/s². |
| `distance`                    | The non-negative cartesian distance measured from the object to the closest car in meters. Only meaningful for scenery objects. |
| `distance[carIndex]`          | The non-negative cartesian distance measured from the object to the car *carIndex* in meters, or 0 if the car does not exist. Only meaningful for scenery objects. |
| `trackDistance`               | The signed track distance measured from the object to the closest end of the nearest train in meters. Is positive when the train is in front of the object, negative when behind, and zero when the object lies between the ends of the train. |
| `trackDistance[carIndex]`     | La distancia de la vía desde el objeto al carro número *IndiceCarro* del tren mas próximo en metros. Es positivo cuando el centro del coche esté en frente del objeto, y negativo cuando esta por detrás, Retorna 0 si el coche no existe. Solamente es usado por objetos de escenario. |
| `destination`                 | The currently set destination for this train. (Set via *Track.Destination* or the plugin interface) |
| `distanceNextStation`         | La distancia en metros a la siguiente estación. |
| `distanceStation[stationIndex]`| The distance in m to the station with *stationIndex* |
| `stopsNextStation`            | Whether the train stops at the next station. |
| `stopsStation[stationIndex]`  | Whether the train stops at the station with *stationIndex* |
| `siguienteEstación`                 | The index of the next station. |
| `nextStationStop`             | The index of the next station where the train must stop. |
| `terminalStation`             | The index of the terminal station for this train. |
| `timeTable`                   | Returns 1 if the timetable is currently set as visible, 0 otherwise. |
| `brightness[carIndex]`        | Returns the interpolated brightness value applying to this car. |
| `routeLimit`                  | Returns the current route speed limit applying to this train in km/h. |

{{% /table-2col %}}

##### ● Trains (brake)

{{% table-2col %}}

| Variable                       | Descripción                                                  |
| ------------------------------ | ------------------------------------------------------------ |
| `mainReservoir`                | The current pressure in the main reservoir in this car, measured in Pa. |
| `mainReservoir[carIndex]`      | The current pressure in the main reservoir in car *carIndex*, measured in Pa. |
| `equalizingReservoir`          | La presión actual del depósito de compensación en este carro, medido en Pascal. |
| `equalizingReservoir[carIndex]` | The current pressure in the equalizing reservoir in car *carIndex*, measured in Pa. |
| `brakePipe`                    | The current pressure in the brake pipe in this car, measured in Pa. |
| `brakePipe[carIndex]`          | The current pressure in the brake pipe in car *carIndex*, measured in Pa. |
| `brakeCylinder`                | The current pressure in the brake cylinder in this car, measured in Pa. |
| `brakeCylinder[carIndex]`      | The current pressure in the brake cylinder in car *carIndex*, measured in Pa. |
| `straightAirPipe`              | The current pressure in the straight air pipe in this car, measured in Pa. |
| `straightAirPipe[carIndex]`    | The current pressure in the straight air pipe in car *carIndex*, measured in Pa. |

{{% /table-2col %}}

##### ● Trains (doors)

{{% table-2col %}}

| Variable                     | Description                                                  |
| ---------------------------- | ------------------------------------------------------------ |
| `doors`                      | The state of the doors. Returns 0 if fully closed, 1 if fully opened, or any intermediate value, biasing doors that are in a more open state. |
| `doors[carIndex]`            | The state of the doors of car *carIndex*. Returns 0 if fully closed, 1 if fully opened, or any intermediate value, biasing doors that are in a more open state. |
| `leftDoors`                  | The state of the left doors. Returns 0 if fully closed, 1 if fully opened, or any intermediate value, biasing doors that are in a more open state. |
| `leftDoors[carIndex]`        | The state of the left doors of car *carIndex*. Returns a value between 0 and 1, biasing doors that are in a more open state, or -1 if the car does not exist. |
| `rightDoors`                 | El estado de las puertas del lado derecho. Retorna 0 si esta totalmente cerrada, 1 si esta totalmente abierta, o cualquier otro estado intermedio, las puertas están parciales en un estado abierto. |
| `rightDoors[IndiceCarro]`       | El estado de las puertas del lado derecho del carro *IndiceCarro*. Retorna un valor entre 0 y 1, en un estado parcial de puertas que están en un estado de apertura, o -1 si el carro no existe. |
| `leftDoorsTarget`            | The anticipated target state of the left doors. Returns either 0 (closed) or 1 (opened). |
| `leftDoorsTarget[carIndex]`  | El estado de la trayectoria anticipada de las puertas izquierdas del carro *IndiceCarro*. Retorna 0 (cerrada) o 1 (abierta). |
| `rightDoorsTarget`           | The anticipated target state of the right doors. Returns either 0 (closed) or 1 (opened). |
| `rightDoorsTarget[carIndex]` | El estado de destino anticipado de las puertas derechas del carro *IndiceCarro*. Retorna cualquiera 0 (cerrado) ó 1 (abierto). |
| `leftDoorButton`            | The state of the left doors button. Returns either 0 (released) or 1 (pressed). |
| `rightDoorButton`           | The state of the right doors button. Returns either 0 (released) or 1 (pressed). |
| `pilotLamp`                  | The state of the pilot lamp (Doors closed & ready to start). Returns either 0 (unlit) or 1 (lit). |

{{% /table-2col %}}

##### ● Trenes (otros)

{{% table-2col %}}

| Variable                         | Description                                                  |
| -------------------------------- | ------------------------------------------------------------ |
| `reverserNotch`                  | The state of the reverser, which is either -1 (backward), 0 (neutral), or forward (1). |
| `powerNotch`                     | The current power notch, i.e. 0 for N, 1 for P1, 2 for P2, 3 for P3, etc. |
| `powerNotches`                   | The amount of power notches the train has.                   |
| `brakeNotch`                     | The current brake notch.<br />● For trains without the automatic air brake: 0 for N, 1 for B1, 2 for B2, 3 for B3, etc.<br />● For trains with the automatic air brake: 0 for REL, 1 for LAP and 2 for SRV. |
| `brakeNotches`                   | The amount of brake notches the train has. For trains with the automatic air brake, this returns 2. |
| `brakeNotchLinear`               | A combination of brake notch, hold brake and emergency brake.<br />● For trains without the automatic air brake and without hold brake: 0 for N, 1 for B1, 2 for B2, 3 for B3, etc., up to *BrakeNotches*+1 for EMG.<br />● For trains without the automatic air brake but with hold brake: 0 for N, 1 for HLD, 2 for B1, 3 for B2, 4 for B3, etc., up to *BrakeNotches*+2 for EMG.<br />● For trains with the automatic air brake: 0 for REL, 1 for LAP, 2 for SRV or 3 for EMG. |
| `brakeNotchesLinear`             | The highest value returned by *brakeNotchesLinear*.<br />● For trains without the automatic air brake and without hold brake, this is *BrakeNotches*+1.<br />● For trains without the automatic air brake but with hold brake, this is *BrakeNotches*+2.<br />● For trains with the automatic air brake, this returns 3. |
| `locoBrakeNotch`                      | The current Loco Brake notch.                                |
| `locoBrakeNotches`               | The amount of Loco Brake notches the train has.              |
| `emergencyBrake`                 | Whether the emergency brake is currently active (1) or not (0). |
| `hasAirBrake`                    | Whether the train has the automatic air brake (1) or not (0). |
| `holdBrake`                      | Whether the hold brake is currently active (1) or not (0).   |
| `hasHoldBrake`                   | Whether the train has a hold brake (1) or not (0).           |
| `constSpeed`                     | Whether the const speed system is currently active (1) or not (0). |
| `tieneVelocidadConstante`                  | Whether the train has a const speed system (1) or not (0).   |
| `hasPlugin`                      | Whether the train uses a plugin (1) or not (0).              |
| `pluginState[i]`                 | El estado de la i<sup>ava</sup> variable del plugin, retornando un entero dependiendo del plugin. Es lo mismo para ats*i* en el panel2.cfg. |
| `FrontAxleCurveRadius[carIndex]` | Returns the curve radius at the front axle position of car *carIndex*. |
| `RearAxleCurveRadius[carIndex]`  | Returns the curve radius at the rear axle position of car *carIndex*. |
| `CurveCant[carIndex]`            | Returns the cant value for car *carIndex*.                   |
| `Pitch[carIndex]`                | Returns the pitch value for car *carIndex*.                  |
| `Odometer`                       | Retorna un numero representando la distancia en metros viajadas por el carro actual. |
| `Odometer[carIndex]`             | Returns a signed number representing the distance in meters travelled by car *carIndex*. |
| `Klaxon`                         | Returns the currently playing horn (if any) as follows: (0) No horns are playing (1) The primary horn is playing (2) The secondary horn is playing (3) The music horn is playing. *Note* If multiple horns are playing, the lowest value will be returned. |
| `PrimaryKlaxon`                  | Returns 1 if the primary horn is currently playing, 0 otherwise. |
| `KlaxonSecundario`                | Returns 1 if the secondary horn is currently playing, 0 otherwise. |
| `KlaxonMusical`                    | Returns 1 if the music horn is currently playing, 0 otherwise. |
| `passAlarm`                      | Whether the station pass alarm has been activated. Returns either 0 (inactive) or 1 (active). |
| `stationAdjustAlarm`             | Whether the station adjust alarm has been activated. Returns either 0 (inactive) or 1 (active). |

{{% /table-2col %}}

If *pluginState[i]* is used with the built-in safety systems ATS and ATC, the following mappings for *i* apply:

{{% table %}}

| *i*  | English             | 日本語       | Valores de retorno                                |      | pluginState[271] | Meaning           |
| ---- | ------------------- | ------------ | -------------------------------------------- | ---- | ---------------- | ----------------- |
| 256  | ATS                 | ATS          | 0 (apagado) o 1 (encendido)                         |      | 0                | ATC not available |
| 257  | ATS RUN             | ATS 作動     | 0 (unlit), 1 (lit) or 2 (flashing)           |      | 1                | 0 km/h            |
| 258  | ATS RUN             | ATS 作動     | 0 (unlit / non-flashing), 1 (lit / flashing) |      | 2                | 15 km/h           |
| 259  | P POWER             | P 電源       | 0 (unlit) or 1 (lit)                         |      | 3                | 25 km/h           |
| 260  | PTN APPROACH        | パターン接近 | 0 (unlit) or 1 (lit)                         |      | 4                | 45 km/h           |
| 261  | BRAKE RELEASE       | ブレーキ開放 | 0 (unlit) or 1 (lit)                         |      | 5                | 55 km/h           |
| 262  | BRAKE APPLY         | ブレーキ動作 | 0 (unlit) or 1 (lit)                         |      | 6                | 65 km/h           |
| 263  | ATS P               | ATS-P        | 0 (unlit) or 1 (lit)                         |      | 7                | 75 km/h           |
| 264  | FAILURE             | 故障         | 0 (unlit) or 1 (lit)                         |      | 8                | 90 km/h           |
| 265  | ATC                 | ATC          | 0 (unlit) or 1 (lit)                         |      | 9                | 100 km/h          |
| 266  | ATC POWER           | ATC 電源     | 0 (unlit) or 1 (lit)                         |      | 10               | 110 km/h          |
| 267  | ATC SRV             | ATC 常用     | 0 (unlit) or 1 (lit)                         |      | 11               | 120 km/h          |
| 268  | ATC EMG             | ATC 非常     | 0 (unlit) or 1 (lit)                         |      | 12               | ATS is active     |
| 269  | CONST SPEED         | 定速         | 0 (unlit) or 1 (lit)                         |      |                  |                   |
| 270  | EB                  | EB           | 0 (unlit) or 1 (lit)                         |      |                  |                   |
| 271  | ATC speed indicator |              | 0 - 12, see table on the right               |      |                  |                   |

{{% /table %}}

##### ● Sections (signalling)

The section context is defined when the object is placed using Track.SigF.

{{% table-2col %}}

| Variable  | Description                                                  |
| --------- | ------------------------------------------------------------ |
| `section` | The value of the section aspect currently shown.<br />*If this variable is used outside of a Track.SigF context, the behavior is currently undefined and subject to change.* |

{{% /table-2col %}}

## <a name="performance"></a>■ 6. Performance

There are certain kinds of animation which are less expensive, and others which are more. Also, the underlying object plays a significant role. If you want to design your animated objects with as best performance as possible **for future releases of openBVE**, take a look at the following performance table:

{{% table %}}

| Animation      | Object                          | Performance |
| -------------- | ------------------------------- | ----------- |
| State changes  | Has only opaque faces           | Good        |
| State changes  | Has partially transparent faces | Moderate    |
| Translation    | Has only opaque faces           | Good        |
| Translation    | Has partially transparent faces | Moderate    |
| Rotation       | Has only opaque faces           | Good        |
| Rotation       | Has partially transparent faces | Bad         |
| Texture shifts | Has only opaque faces           | Bad         |
| Texture shifts | Has partially transparent faces | Bad         |

{{% /table %}}

Performance is generally better if the result of a function only infrequently changes. So, even if you set the *RefreshRate* parameter to zero, performance is generally better if the outcome of your formula is constant over longer periods of time. On the other hand, if it changes every frame, performance is generally worse.

Generally, you should avoid using animation with partially transparent faces and stick to opaque faces when possible. Also, try to avoid texture shifts, and consider using state changes or translation where possible.

## <a name="tips"></a>■ 7. Tips

- Generally speaking, try to keep the complexity of functions as low as possible. This is not the most critical aspect, though, as most of the performance impact will result from applying the results of a function, e.g. rotating the object, and not evaluating the function.
- Use the RefreshRate parameter when possible to optimize performance. Usually, you can use this parameter when you don't need a smooth animation, or when you deliberately want the functions to only update in intervals.
- Don't use functions which always evaluate to the same constant. For example, don't use RotateXFunction = 3.14159, but rotate the underlying CSV/B3D/X object directly.
- State changes are very cheap as long as the state doesn't actually change in between two executions of the StateFunction. If a change occurs, this is a relatively expensive operation, though.
- Try to optimize out *if* conditions. Especially try to avoid nested *if* functions. Often, there is an elegant mathematical solution.
- Certain functions, e.g. Exp, Sin, Cos, etc., are relatively expensive. Use them only if absolutely necessary for an effect. Don't include unnecessary operations. For example, the result of StateFunction is automatically rounded toward the nearest integer, so don't apply an additional explicit Round.
- When working with car objects, bear in mind that some variables have an optional car index. You should use this index if you want to query the state of a particular car (that is, not necessarily the one the object is attached to). If, however, you just want to query the value of the particular car the object is attached to, use the variable without the index. For scenery objects, you should not generally use car indices as you can't be sure how many cars the queried train has.

## <a name="examples"></a>■ 8. Example functions

##### ● Blinking light

{{% code "*Template for a blinking light:*" %}}  
States = OBJECT0, OBJECT1  
StateFunction = value == 0  
RefreshRate = SECONDS  
{{% /code %}}

##### ● Rotating wheel

{{% code "*Template for the code used in an exterior car object:*" %}}  
States = OBJECT  
RotateXFunction = value + delta * speedometer / RADIUS_OF_THE_WHEEL  
{{% /code %}}

##### ● Cycling through a list of objects

{{% code "*Template for objects that are to be cycled through:*"%}}  
States = OBJECT0, OBJECT1, OBJECT2, ...  
StateFunction = mod[value + 1, AMOUNT_OF_OBJECTS]  
RefreshRate = TIME_PER_OBJECT  
{{% /code %}}

##### ● Signal (3-aspect) for Track.Section(0; 2; 4)

{{% code %}}  
States = RED_OBJECT, YELLOW_OBJECT, GREEN_OBJECT  
StateFunction = section / 2  
{{% /code %}}

##### ● Employing an approach-controlled delay in signals

If you want to create a signal that keeps being red until the train approaches it to some distance, then counts down a timer before it changes aspect to green, please refer to [this post](http://web.archive.org/web/20100902041536/http://openbve.freeforums.org/delay-in-approach-controlled-signals-t1195.html#p5378) on the forum for a detailed explanation. Once you understand the concepts, you can use this code template:

{{% code "*Template for an approach-controlled delay in a signal with two aspects:*" %}}  
States = RED_OBJECT, GREEN_OBJECT  
StateFunction = if[trackDistance>DISTANCE | section==0, 0, min[value + 0.5*delta/DELAY, 1]]  
{{% /code %}}

{{% code "*Template for an approach-controlled delay in a signal with any number of aspects:*" %}}  
States = RED_OBJECT, ..., GREEN_OBJECT  
StateFunction = if[trackDistance>DISTANCE | section==0, 0, if[value<0.5, value + 0.5*value/DELAY, section]]  
{{% /code %}}

Using an approach controlled delay with a semaphore signal requires a slight variant on this technique. 
As the result of the StateFunction is rounded, whereas that of the RotateFunction is not, a combination of both is required to achieve the desired effect.

{{% code "*Template for an approach-controlled delay in a semaphore signal:*" %}}  
States = SIGNAL_ARM, SIGNAL_ARM  
StateFunction = if[trackDistance>DISTANCE | section==0, 0, min[value + 0.5*delta/DELAY, 1]]
RotateYFunction = if[currentState == 0, 0, -0.7]
{{% /code %}}

## <a name="grammar"></a>■ 9. Formal Grammar

The formal grammar for the language may not match up perfectly with the implimentation included in OpenBVE. An example is a*-b which is valid under the grammar but the parser rejects it.

{{% code %}}  
&lt;expression>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;::=  &lt;xor_expression> "&amp;" &lt;expression> &nbsp;&nbsp;&nbsp;&nbsp;| &lt;xor_expression>  
&lt;xor_expression>&nbsp;&nbsp;&nbsp;&nbsp;::= &lt;or_expression>&nbsp;&nbsp;"^" &lt;xor_expression> | &lt;or_expression>  
&lt;or_expression>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;::= &lt;not_expression> "|" &lt;or_expression>&nbsp;&nbsp;| &lt;not_expression>   
<br/>&lt;not_expression>&nbsp;&nbsp;&nbsp;&nbsp;::= "!" &lt;equal_expression> | &lt;equal_expression>  
<br/>&lt;equal_expression>&nbsp;&nbsp;::= &lt;plus_expression> ("==" &lt;plus_expression>)* | &lt;plus_expression> ("!=" &lt;plus_expression>)`*`</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;plus_expression> (">"&nbsp; &lt;plus_expression>)`*` | &lt;plus_expression> ("&lt;"&nbsp; &lt;plus_expression>)`*` | <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;plus_expression> ("&lt;=" &lt;plus_expression>)`*` | &lt;plus_expression> ("&lt;=" &lt;plus_expression>)`*` | &lt;plus_expression><br/>
<br/>&lt;plus_expression>&nbsp;&nbsp;&nbsp;::= &lt;times_expression> ("+" &lt;times_expression>)`*`&nbsp; | &lt;times_expression> ("-" &lt;times_expression>)`*` | &lt;times_expression><br/>
<br/>&lt;times_expression>&nbsp;&nbsp;::= &lt;divide_expression> "\*" &lt;times_expression>  | &lt;divide_expression>  
&lt;divide_expression> ::= &lt;minus_expression>  "/" &lt;divide_expression> | &lt;minus_expression>  
<br/>&lt;minus_expression>&nbsp;&nbsp;::= "-" &lt;function_call> | &lt;function_call>  
&lt;function_call>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;::= &lt;name> "[" &lt;expression> ("," &lt;expression>)* "]" | &lt;term>  
<br/>&lt;term>&nbsp;&nbsp;&nbsp;::= "(" &lt;expression> ")" | &lt;name> | &lt;number>  
&lt;number> ::= &lt;digit>*  
&lt;name>&nbsp;&nbsp;&nbsp;::= &lt;letter> (&lt;letter> | &lt;digit>)*  
<br/>&lt;letter> ::= "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" |  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z" |  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" |  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z"  
&lt;digit>&nbsp;&nbsp;::= "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
{{% /code %}}