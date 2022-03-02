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

| Aritmética    | Funcionalidad          | Descripción                                     |
| :------- | ------------------- | ----------------------------------------------- |
| `a == b` | `Equal[a,b]`        | Verdadero (1) si *a* es igual a *b*                      |
| `a != b` | `Noigual[a,b]`      | Verdadero (1) si *a* no es igual a *b*              |
| `a < b`  | `Menor[a,b]`         | Verdadero (1) si *a* es menor que *b*                |
| `a > b`  | `Mayor[a,b]`      | Verdadero (1) si *a* es mayor que *b*             |
| `a <= b` | `MenorIgual[a,b]`    | Verdadero (1) si *a* es menor o igual que *b*    |
| `a >= b` | `MayorIgual[a,b]` | Verdadero (1) si *a* es mayor o igual que *b* |

{{% /table %}}

##### ● Operadores lógicos

Todos los operadores tratan 0 como falso y cualquier otro valor como verdadero, y retornan 1 por verdadero y 0 por falso.

{{% table %}}

| Aritmética          | Funcionalidad | Descripción                            |
| :------------- | ---------- | -------------------------------------- |
| `!a`           | `No[a]`   | Verdadero (1) si *a* es falso               |
| `a & b`        | `Y[a,b]` | Verdadero (1) si ambos *a* y *b* son verdad  |
| `a` &#124; `b` | `O[a,b]`  | Verdadero (1) si cualquiera de *a* o *b* es verdad |
| `a ^ b`        | `Oexclusivo[a,b]` | True (1) si cualquiera *a* o *b* es verdad  |

{{% /table %}}

##### ● Operador de precedencia

From highest precedence to lowest. Operators of same precedence are evaluated either left to right or right to left, depending on if they share a precedence with another operator.

{{% table %}}

| Operator                         | Associativity | Sin paréntesis. | Equivilant      |
| -------------------------------- |---------------|-----------------|-----------------|
| `a[...]`                         | unary         | &nbsp;          | &nbsp;          |
| `-` (Menos)                      | unary         | &nbsp;          | &nbsp;          |
| `/`                              | derecha-a-izquierda | 1 / 2 / 3       | (1 / (2 / 3))   |
| `*`                              | derecha-a-izquierda | 1 * 2 * 3       | (1 * (2 * 3))   |
| `+`, `-` (Sustracción)              | left-to-right | 1 + 2 + 3       | ((1 + 2) + 3)   |
| `==`, `!=`, `<`, `>`, `<=`, `>=` | left-to-right | 1 <= 2 <= 3     | ((1 <= 2) <= 3) |
| `!`                              | unary         | &nbsp;          | &nbsp;          |
| `&`                              | derecha-a-izquierda | 1 & 2 & 3       | (1 & (2 & 3))   |
| `^`                              | derecha-a-izquierda | 1 ^ 2 ^ 3       | (1 ^ (2 ^ 3))   |
| &#124;                           | derecha-a-izquierda | 1 &#124; 2 &#124; 3       | (1 &#124; (2 &#124; 3))   |

{{% /table %}}

<br>

{{% warning-nontitle %}}  

The logical not and multiplication operator are not at the same precedence level as a lot of other languages. For example `!a + !b` is `!(!a + !(b))` **not** `(!a) + (!b)` as expected, similarly `1 * 2 / 3` is `1 * (2 / 3)` **not** `(1 * 2) / 3`  
Please also note that some combinations of prefix and infix operators are not recognised. For example `a*-b` is not accepted. Use `a*(-b)` or `-a*b` instead.

{{% /warning-nontitle %}}

## <a name="functions"></a>■ 4. Lista de funciones

##### ● Aritmética básica

{{% table-2col %}}

| Función         | Descripción                                                  |
| ---------------- | ------------------------------------------------------------ |
| `Reciprocal[x]`  | Retorna la reciprocidad, igual a 1/*x*                       |
| `Power[a,b,...]` | Retorna *a* elevado a la *b* <sup>ava </sup>potencia. *b* debe ser un número no negativo. Para consistencia,  Power[0,*b*] siempre reotrna 1, incluso en el caso degenerado de Power[0,0], y *a* comenzando en negativo siempre retorna 0. Agregar más argumentos creará una cadena. Power[a,b,c] retornará *a* <sup>*b*<sup>*c*</sup></sup>. |

{{% /table-2col %}}

#####  ● Funciones numéricas

{{% table-2col %}}

| Función                      | Descripción                                                  |
| ----------------------------- | ------------------------------------------------------------ |
| `Quotient[a,b]`               | Divide *a* entre *b* y redondea el resultado hacia abajo, igual a `Floor[a/b]`. |
| `Mod[a,b]`                    | Retorna el residuo al dividir *a* entre *b*, igual a `a-b*Floor[a/b]`. |
| `Min[a,b,...]`                | Retorna el menor de los términos.                           |
| `Max[a,b,...]`                | Retorna el mayor de los términos.                            |
| `Abs[x]`                      | Retorna el valor absoluto.                                  |
| `Sign[x]`                     | Retorna el signo de *x*, el cual puede ser -1, 0 or 1.         |
| `Floor[x]`                    | Redondea hacia abajo al entero más cercano.                          |
| `Ceiling[x]`                  | Redondea hacia arriba al entero más cercano.                            |
| `Round[x]`                    | Redondea al entero mas cercano. Números terminando en decimal .5 son redondeados hacia el entero más cercano. |
| `random[Minimum, Maximum]`    | Retorna un nuevo número de coma flotante entre *Mínimo* y *Máximo*. |
| `randomInt[Minimum, Maximum]` | Retorna un nuevo número entero entre *Mínimo* y *Máximo*. |

{{% /table-2col %}}

##### ● Funciones elementales

{{% table-2col %}}

| Función    | Descripción                                                  |
| ----------- | ------------------------------------------------------------ |
| `Exp[x]`    | La función exponencial, o *e* de la *x*<sup>ava</sup>potencia. |
| `Log[x]`    | La función logarítmica, con base *e*.                          |
| `Sqrt[x]`   | La raíz cuadrada.                                             |
| `Sin[x]`    | Seno (en radianes).                                 |
| `Cos[x]`    | Coseno (en radianes)                               |
| `Tan[x]`    | La tangente (en radianes).                              |
| `ArcTan[x]` | La tangente inversa - Cotangente (en radianes)                     |
| `Pi` | Returns the value of *Pi*. |

{{% /table-2col %}}

##### ● Condicionales

{{% table-2col %}}

| Función                        | Descripción                                                  |
| ------------------------------- | ------------------------------------------------------------ |
| `If[cond,truevalue,falsevalue]` | Si *condición* es != 0, retorna *valorverdadero*, en caso contrario *valorfalso* |

{{% /table-2col %}}

## <a name="variables"></a>■ 5. Lista de variables

##### ● Primitivas

{{% table-2col %}}

| Variable       | Descripción                                                  |
| -------------- | ------------------------------------------------------------ |
| `value`        | El valor retornado por la función en su ultima evaluación. Al comienzo de la simulación, esto es 0. |
| `delta`        | La diferencia de tiempo desde la última evaluación de la función en segundos. Por favor ten en cuenta que no hay tiempo garantizado desde que transcurre entre los llamados de función sucesivos. |
| `currentState` | Retorna el estado actual numérico del objeto.           |

{{% /table-2col %}}

##### ● Tiempo y camara

{{% table-2col %}}

| Variable         | Descripción                                                  |
| ---------------- | ------------------------------------------------------------ |
| `time`           | El tiempo actual del juego medido en segundos desde la media noche del primer día. |
| `hora`           | The integer part of the current hour. |
| `minute`         | The integer part of the current minute. |
| `second`         | The integer part of the current second. |
| `DistanciaCamara` | Una distancia cartesiana no negativa medida desde el objeto a la cámara en metros. |
| `cameraXDistance` | The non-negative cartesian distance measured on the X axis from the object to the camera in meters |
| `cameraYDistance` | Una distancia cartesiana no negativa medida desde el eje Y al objeto a la cámara en metros. |
| `cameraZDistance` | The non-negative cartesian distance measured on the Z axis from the object to the camera in meters |
| `cameraMode`     | Retorna 0 si la cámara es actualmente en cabina 2D o 3D, 1 en caso contrario. |

{{% /table-2col %}}

##### ● Trenes

Generalmente, objetos adjuntados a un tren particular o coche retorna valores para los trenes y cobhes, a menos que sean estados. Para objetos de escenario, la referencia es el coche del conductor del tren más cercano ( no necesariamente el tren del jugador).

En algunos casos de las siguientes variables , *IndiceCarro* tiene el siguiente significado: 0 es el 1<sup>er</sup> carro  del frente, 1 es el 2<sup>do</sup> carro del frente, etc., mientras que -1 es el 1<sup>er</sup> carro desde la parte posterior, -2 es el 2<sup>do</sup> carro desde la parte posterior, etc. En general los indices de los carros desde -*cars* hasta *cars*-1 representan carros existentes, donde *cars* es el numero de carros que el tren posee, mientras que valores que estén fuera de este rango representan carros que no existen. Todos los trenes tienen al menos 1 carro, indices -1 y 0 están garantizados que existan para cualquier tren.

##### ● Trenes (generalidades)

{{% table-2col %}}

| Variable                      | Descripción                                                  |
| ----------------------------- | ------------------------------------------------------------ |
| `TrenJugador`                 | Returns 1 if the train is the player train, 0 otherwise.     |
| `carros`                        | El número de carros que el tren tiene.                            |
| `carNumber`                   | Returns the index of the current car.                        |
| `speed`                       | La velocidad actual del coche en m/s. Es positivo cuando el tren viaja hacia adelante, y negativa cuando el tren viaja hacia atrás. |
| `speed[carIndex]`             | La velocidad actual del coche número *carIndex* en m/s. Es positivo cuando el tren viaja hacia adelante, y negativa cuando el tren viaja hacia atrás. |
| `speedometer`                 | La velocidad percibida del actual coche en m/s así como esto pudiera aparecer un velocímetro en patinaje de ruedas y bloqueo de ruedas. |
| `speedometer[carIndex]`       | La velocidad percibida del coche de indice *carIndex* en m/s así como esto pudiera aparecer un velocímetro en patinaje de ruedas y bloqueo de ruedas. |
| `aceleración`                | The actual acceleration of the current car in m/s2.          |
| `acceleration[carIndex]`      | The actual acceleration of the car *carIndex* in m/s2.       |
| `accelerationMotor`           | The acceleration which the motor of the first motor car currently generates in m/s2. |
| `accelerationMotor[carIndex]` | The acceleration which the motor of the car *carIndex* currently generates in m/s2. |
| `distance`                    | Una distancia cartesiana no negativa medida desde el objeto al coche más cercano en metros. Solamente es usado por objetos de escenario. |
| `distance[carIndex]`          | La distancia cartesiana no negativa medida desde el objeto al coche número *carIndex* en metros, ó 0 si el coche no existe. Solamente es usado por objetos de escenario. |
| `trackDistance`               | La distancia de la vía desde el objeto al extremo más cercano del tren mas próximo en metros. Es positivo cuando el tren esta en frente del objeto, y negativo cuando esta por detrás, y cero cuando el objeto esta entre los extremos del tren. |
| `trackDistance[carIndex]`     | La distancia de la vía desde el objeto al carro número *IndiceCarro* del tren mas próximo en metros. Es positivo cuando el centro del coche esté en frente del objeto, y negativo cuando esta por detrás, Retorna 0 si el coche no existe. Solamente es usado por objetos de escenario. |
| `destination`                 | La configuración actual del destino del tren (Es configurado por *Track.Destination* ó la interfaz del plugin) |
| `distanceNextStation`         | La distancia en metros a la siguiente estación. |
| `distanceStation[stationIndex]`| La distancia en metros a la estación con indice *stationIndex* |
| `stopsNextStation`            | Indica si el tren hace parada en la próxima estación. |
| `stopsStation[stationIndex]`  | Indica que el tren se detiene en la estación con indice *stationIndex* |
| `siguienteEstación`                 | El indice de la siguiente estación. |
| `nextStationStop`             | El indice de la siguiente estación donde el tren debe hacer parada. |
| `terminalStation`             | The index of the terminal station for this train. |
| `timeTable`                   | Returns 1 if the timetable is currently set as visible, 0 otherwise. |
| `brightness[carIndex]`        | Returns the interpolated brightness value applying to this car. |
| `routeLimit`                  | Returns the current route speed limit applying to this train in km/h. |

{{% /table-2col %}}

##### ● Trenes (freno)

{{% table-2col %}}

| Variable                       | Descripción                                                  |
| ------------------------------ | ------------------------------------------------------------ |
| `mainReservoir`                | La presión actual de la reserva principal del coche, medido en Pascal. |
| `mainReservoir[carIndex]`      | La presión actual de la reserva principal del coche de indice numero *carIndex*, medido en Pascal. |
| `equalizingReservoir`          | La presión actual del depósito de compensación en este carro, medido en Pascal. |
| `equalizingReservoir[carIndex]` | The current pressure in the equalizing reservoir in car *carIndex*, measured in Pa. |
| `brakePipe`                    | La presión actual de la tubería de freno en este coche, medido en Pascal. |
| `brakePipe[carIndex]`          | La presión actual de la tubería de freno en este coche de indice número *carIndex*, medido en Pascal. |
| `brakeCylinder`                | La presión actual del cilindro de freno en este coche, medido en Pascal. |
| `brakeCylinder[carIndex]`      | La presión actual del cilindro de freno en este coche de indice número *carIndex*, medido en Pascal. |
| `straightAirPipe`              | La presión actual de la tubería de aire recto en este coche, medido en Pascal. |
| `straightAirPipe[carIndex]`    | La presión actual de la valvula directa de aire en el carro *carIndex*, medido en Pa. |

{{% /table-2col %}}

##### ● Trenes (puertas)

{{% table-2col %}}

| Variable                     | Descripción                                                  |
| ---------------------------- | ------------------------------------------------------------ |
| `doors`                      | El estado de las puertas. Retorna 0 si esta totalmente cerrada, 1 si esta totalmente abierta, o cualquier otro estado intermedio, las puertas están parciales en un estado abierto. |
| `doors[carIndex]`            | El estado de las puertas del coche de indice número *carIndex*. Retorna 0 si esta totalmente cerrada, 1 si esta totalmente abierta, o cualquier otro estado intermedio, las puertas están parciales en un estado abierto. |
| `leftDoors`                  | El estado de las puertas del lado izquierdo. Retorna 0 si esta totalmente cerrada, 1 si esta totalmente abierta, o cualquier otro estado intermedio, las puertas están parciales en un estado abierto. |
| `leftDoors[carIndex]`        | El estado de las puertas del lado izquierdo del coche de indice número *carIndex*. Retorna un valor entre 0 y 1, en un estado parcial de puertas que están en un estado de apertura, o -1 si el coche no existe. |
| `rightDoors`                 | El estado de las puertas del lado derecho. Retorna 0 si esta totalmente cerrada, 1 si esta totalmente abierta, o cualquier otro estado intermedio, las puertas están parciales en un estado abierto. |
| `rightDoors[IndiceCarro]`       | El estado de las puertas del lado derecho del carro *IndiceCarro*. Retorna un valor entre 0 y 1, en un estado parcial de puertas que están en un estado de apertura, o -1 si el carro no existe. |
| `leftDoorsTarget`            | El estado de destino anticipado de las puertas izquierdas. Retorna cualquiera 0 (cerrado) ó 1 (abierto). |
| `leftDoorsTarget[carIndex]`  | El estado de la trayectoria anticipada de las puertas izquierdas del carro *IndiceCarro*. Retorna 0 (cerrada) o 1 (abierta). |
| `rightDoorsTarget`           | El estado de destino anticipado de las puertas derechas. Retorna cualquiera 0 (cerrado) ó 1 (abierto). |
| `rightDoorsTarget[carIndex]` | El estado de destino anticipado de las puertas derechas del carro *IndiceCarro*. Retorna cualquiera 0 (cerrado) ó 1 (abierto). |
| `leftDoorButton`            | El estado del botón de la puerta izquierda. Retorna cualquiera 0 (liberado) o 1 (presionado). |
| `rightDoorButton`           | El estado del botón de la puerta derecha. Retorna cualquiera 0 (liberado) o 1 (presionado). |
| `pilotLamp`                  | El estado de la lampara piloto (Puertas cerradas y listo para iniciar). Retorna cualquiera 0 (apagado) o 1 (encendido). |

{{% /table-2col %}}

##### ● Trenes (otros)

{{% table-2col %}}

| Variable                         | Descripción                                                  |
| -------------------------------- | ------------------------------------------------------------ |
| `reverserNotch`                  | El estado de inversor de marcha, el cual puede ser -1 (hacia atrás), 0 (neutro), o adelante (1). |
| `powerNotch`                     | El la posición de la palanca de tracción, por ejemplo, 0 para N, 1 para P1, 2 para P2, 3 para P3, etc. |
| `powerNotches`                   | La cantidad de posiciones de palanca de tracción que el tren tiene.                   |
| `brakeNotch`                     | La posición actual de la posición de la palanca de freno. <br />● Para trenes sin freno de aire automático: 0 para N, 1 para B1, 2 para B2, 3 para B3, etc.<br />● Para trenes con freno de aire automático: 0  para REL, 1 para LAP y 2 para SRV. |
| `brakeNotches`                   | La cantidad de posiciones de palanca de freno que el tren posee. Para trenes con freno automático de aire, esto retorna 2. |
| `brakeNotchLinear`               | La combinación de la palanca de freno, freno presionado y freno de emergencia.<br />● Para trenes sin freno de aire automático y sin freno presionado: 0 para N, 1 para B1, 2 para B2, 3 para B3, etc., hasta *BrakeNotches*+1 para EMG.<br />● Para trenes sin freno de aire automático pero con freno presionado: 0 for N, 1 para HLD, 2 para B1, 3 para B2, 4 para B3, etc., hasta *BrakeNotches*+2 para EMG.<br />● Para trenes con freno de aire automático: 0 para REL, 1 para LAP, 2 para SRV o 3 para EMG. |
| `brakeNotchesLinear`             | El valor mas alto retornado por *brakeNotchesLinear*.<br />● Para trenes sin freno de aire automático y sin freno presionado, esto es *BrakeNotches*+1.<br />● Para trenes sin freno de aire automático pero con freno presionado, esto es *BrakeNotches*+2.<br />● Para trenes con freno de aire automático, esto retorna 3. |
| `locoBrakeNotch`                      | La posición actual del freno de locomotora.                                |
| `locoBrakeNotches`               | La cantidad de posiciones de freno de locomotora que el tren tiene.              |
| `emergencyBrake`                 | Cuando el freno de emergencia es activado (1) o no (0). |
| `hasAirBrake`                    | Cuando el tren tiene freno de aire automático (1) o no (0). |
| `holdBrake`                      | Cuando el freno presionado este activo (1) o no (0).   |
| `hasHoldBrake`                   | Cuando el tren posee freno presionado (1) o no (0).           |
| `constSpeed`                     | Cuando el sistema de velocidad constante esta activo (1) o no (0). |
| `tieneVelocidadConstante`                  | Cuando el tren posee sistema de velocidad constante (1) o no (0).   |
| `hasPlugin`                      | Cuando el tren usa plugin (1) o no (0).              |
| `pluginState[i]`                 | El estado de la i<sup>ava</sup> variable del plugin, retornando un entero dependiendo del plugin. Es lo mismo para ats*i* en el panel2.cfg. |
| `FrontAxleCurveRadius[carIndex]` | Retorna el radio de curva del eje frontal del coche de indice número *carIndex*. |
| `RearAxleCurveRadius[carIndex]`  | Retorna el radio de curva del eje posterior del coche de indice número *carIndex*. |
| `CurveCant[carIndex]`            | Retorna el valor del peralte del coche de indice número *carIndex*.                   |
| `Pitch[carIndex]`                | Retorna el valor de la diferencia de elevación para el coche de indice número *carIndex*..                  |
| `Odometer`                       | Retorna un numero representando la distancia en metros viajadas por el carro actual. |
| `Odometer[carIndex]`             | Retorna un numero representando la distancia en metros viajadas por el coche de indice número *carIndex*. |
| `Klaxon`                         | Retorna la bocina actual que esta reproduciendo (cualquiera) de las siguientes: (0) Ninguna bocina se esta reproduciendo (1) La bocina principal esta reproduciéndose (2) La bocina secundaria esta reproduciéndose (3) La bocina musical esta reproduciéndose. *Nota*: Si múltiples bocinas se encuentran reproduciéndose, el valor mas bajo será retornado. |
| `PrimaryKlaxon`                  | Retorna 1 si la bocina primaria esta reproduciéndose, 0 en caso contrario. |
| `KlaxonSecundario`                | Retorna 1 si la bocina secundaria esta reproduciéndose, 0 en caso contrario. |
| `KlaxonMusical`                    | Retorna 1 si la bocina musical esta reproduciéndose, 0 en caso contrario. |
| `passAlarm`                      | Cuando la alarma de rebase de estación ha sido activada. Retorna 0 (inactivo) o 1 (activo). |
| `stationAdjustAlarm`             | Cuando la alarma de ajuste de estación ha sido activada. Retorna 0 (inactivo) o 1 (activo). |

{{% /table-2col %}}

Si *pluginState[i]* es usado con el sistema de seguridad ATS y ATC, el siguiente mapa de opciones para *i* puede ser aplicado:

{{% table %}}

| *i*  | Español             | 日本語 - Japonés       | Valores de retorno                                |      | pluginState[271] | Significado           |
| ---- | ------------------- | ------------ | -------------------------------------------- | ---- | ---------------- | ----------------- |
| 256  | ATS                 | ATS          | 0 (apagado) o 1 (encendido)                         |      | 0                | ATC no disponible |
| 257  | ATS RUN             | ATS 作動     | 0 (apagado), 1 (encendido) o 2 (parpadeando)           |      | 1                | 0 km/h            |
| 258  | ATS RUN             | ATS 作動     | 0 (apagado / sin parpadear), 1 (encendido / parpadeando) |      | 2                | 15 km/h           |
| 259  | P POWER             | P 電源       | 0 (apagado) o 1 (encendido)                         |      | 3                | 25 km/h           |
| 260  | PTN APPROACH        | パターン接近 | 0 (apagado) o 1 (encendido)                         |      | 4                | 45 km/h           |
| 261  | FRENO LIBERADO       | ブレーキ開放 | 0 (apagado) o 1 (encendido)                         |      | 5                | 55 km/h           |
| 262  | FRENO APLICADO         | ブレーキ動作 | 0 (apagado) o 1 (encendido)                         |      | 6                | 65 km/h           |
| 263  | ATS P               | ATS-P        | 0 (apagado) o 1 (encendido)                         |      | 7                | 75 km/h           |
| 264  | FALLA             | 故障         | 0 (apagado) o 1 (encendido)                         |      | 8                | 90 km/h           |
| 265  | ATC                 | ATC          | 0 (apagado) o 1 (encendido)                         |      | 9                | 100 km/h          |
| 266  | ATC ENCENDIDO           | ATC 電源     | 0 (apagado) o 1 (encendido)                         |      | 10               | 110 km/h          |
| 267  | ATC SERVICIO             | ATC 常用     | 0 (apagado) o 1 (encendido)                         |      | 11               | 120 km/h          |
| 268  | ATC EMERGENCIA             | ATC 非常     | 0 (apagado) o 1 (encendido)                         |      | 12               | ATS esta activo     |
| 269  | VELOCIDAD CONSTANTE         | 定速         | 0 (apagado) o 1 (encendido)                         |      |                  |                   |
| 270  | EB                  | EB           | 0 (apagado) o 1 (encendido)                         |      |                  |                   |
| 271  | Indicador de velocidad del ATC |              | 0 - 12, ver tabla a la derecha               |      |                  |                   |

{{% /table %}}

##### ● Secciones (señalización)

El contexto sección es definido cuando el objeto es posicionado usando Track.SigF.

{{% table-2col %}}

| Variable  | Descripción                                                  |
| --------- | ------------------------------------------------------------ |
| `section` | El valor de la sección aspecto que se nuestra.<br />*si esta variable es usada fuera de un contexto de Track.Sifg, la conducta actual es indefinida y sujeto a cambios.* |

{{% /table-2col %}}

## <a name="performance"></a>■ 6. Rendimiento

Existen ciertos tipos de animaciones los cuales son menos costosos, y otros que son mas. También, los objetos adyacentes juegan un papel importante . Si quieres diseñar objetos animados con un mejor rendimiento posible **para versiones futuras de openBVE**, échale un vistazo a la siguiente tabla de rendimiento:

{{% table %}}

| Animación      | Objeto                          | Rendimiento |
| -------------- | ------------------------------- | ----------- |
| Cambios de estado  | Solo tiene caras opacas           | Bien        |
| Cambios de estado  | Tiene parcialmente caras transparentes | Moderado    |
| Traslación    | Solo tiene caras opacas           | Bien        |
| Traslación    | Tiene parcialmente caras transparentes | Moderado    |
| Rotación       | Solo tiene caras opacas           | Bien        |
| Rotación       | Tiene parcialmente caras transparentes | Mal         |
| Saltos de textura | Solo tiene caras opacas           | Mal         |
| Saltos de textura | Tiene parcialmente caras transparentes | Mal         |

{{% /table %}}

El rendimiento por lo general es mejor si el resultado de la función cambia sin frecuencia. Así que, incluso si habilitas el parámetro *RefreshRate* a cero, el rendimiento por lo general mejorará si el resultado de su formula es constante sobre largos periodos de tiempo. De otra manera, si cambia cada cuadro por segundo, el rendimiento por lo general empeorará.

Generalmente, debes evitar usar animaciones con caras parcialmente transparentes y enfocarte en caras opacas cuando sea posible. Tambien, intenta evitar los saltos de textura, y considera usar el cambio de estado o traslación donde sea posible.

## <a name="tips"></a>■ 7. Sugerencias

- Generalmente hablando, trata de mantener la complejidad de las funciones lo mas bajo posible. Esto no es el aspecto más critico, aunque, la mayoría del impacto del rendimiento resultará cuando se aplique resultados a una función, por ejemplo. rotar el objeto, y no evaluando la función.
- Usa el parámetro RefreshRate cuando sea posible para así optimizar el rendimiento. Usualmente, puedes usar este parámetro cuando no necesites una animación suave, o cuando deliberadamente necesites que estas funciones solo se actualicen en intervalos.
- No uses estas funciones cuando siempre evalúas la misma constante. Por ejemplo, no uses RotateXFunction = 3.14159, gira el objeto adyacente en el CSV/B3D/X directamente.
- Cambios de estado son un método muy barato cuando el estado no cambia entre dos ejecuciones por el StateFunction. Si un cambio ocurre, esto es una operación relativamente costosa.
- Trata de optimizar las operaciones condicionales *if* . Especialmente trata de evitar la anidación de funciones *if*. De vez en cuando, hay una solución matemática elegante.
- Ciertas funciones, por ejemplo. Exp, Sin, Cos, etc. son relativamente costosas. Úsalas solo cuando sean absolutamente necesarias para un efecto. No incluyas operaciones innecesarias. Por ejemplo, el resultado de StateFunction es automáticamente redondeado hacia el entero más cercano, así que no apliques una función Round adicional explícito.
- Cuando trabajas con objetos del coche, ten en mente que algunas variables tienen un indice de coche opcional (CarIndex). Debes usar este indice si necesitas consultar el estado de un coche en particular ( es decir, no necesariamente el único objeto que puede ser adjuntado).  Si, necesitas hacer una consulta el valor de un coche en particular del objeto que se plantea adjuntar, usa la variable sin el indice. Para objetos de escenario, por lo general no debes usar los indices del coche ya sea porque no puedes estar seguros de cuantos coches posee el tren consultado.

## <a name="examples"></a>■ 8. Funciones de ejemplo

##### ● Luz parpadeante

{{% code "*Template for a blinking light:*" %}}  
States = OBJECT0, OBJECT1  
StateFunction = value == 0  
RefreshRate = SEGUNDOS  
{{% /code %}}

##### ● Rotación de rueda

{{% code "*Template for the code used in an exterior car object:*" %}}  
States = OBJECT  
RotateXFunction = value + delta * speedometer / RADIO_DE_LA_RUEDA 
{{% /code %}}

##### ● Ciclo a través de una lista de objetos

{{% code "*Template for objects that are to be cycled through:*"%}}  
States = OBJECTO0, OBJECTO1, OBJECTO2, ...  
StateFunction = mod[value + 1, CANTIDAD_DE_OBJETOS]  
RefreshRate = TIEMPO_POR_OBJETO  
{{% /code %}}

##### ● Señal (3-aspectos) para Track.Section(0; 2; 4)

{{% code %}}  
States = OBJETO_ROJO, OBJETO_AMARILLO, OBJETO_VERDE  
StateFunction = section / 2  
{{% /code %}}

##### ● Emplear un retardo en señales de aproximación controlada.

If you want to create a signal that keeps being red until the train approaches it to some distance, then counts down a timer before it changes aspect to green, please refer to [this post](http://web.archive.org/web/20100902041536/http://openbve.freeforums.org/delay-in-approach-controlled-signals-t1195.html#p5378) on the forum for a detailed explanation. Once you understand the concepts, you can use this code template:

{{% code "*Template for an approach-controlled delay in a signal with two aspects:*" %}}  
States = OBJETO_ROJO,OBJETO_VERDE
StateFunction = if[trackDistance>DISTANCIA | section==0, 0, min[value + 0.5*delta/RETRASO, 1]]  
{{% /code %}}

{{% code "*Template for an approach-controlled delay in a signal with any number of aspects:*" %}}  
States = OBJETO_ROJO, ..., OBJETO_VERDE
StateFunction = if[trackDistance>DISTANCIA | section==0, 0, if[value<0.5, value + 0.5*value/RETRASO, section]]  
{{% /code %}}

Using an approach controlled delay with a semaphore signal requires a slight variant on this technique. 
As the result of the StateFunction is rounded, whereas that of the RotateFunction is not, a combination of both is required to achieve the desired effect.

{{% code "*Template for an approach-controlled delay in a semaphore signal:*" %}}  
States = SIGNAL_ARM, SIGNAL_ARM  
StateFunction = if[trackDistance>DISTANCE | section==0, 0, min[value + 0.5*delta/DELAY, 1]]
RotateYFunction = if[currentState == 0, 0, -0.7]
{{% /code %}}

## <a name="grammar"></a>■ 9. Gramática formal

La gramática formal del lenguaje puede no coincidir perfectamente con la implementación incluida en openBVE. Un ejemplo es a*-b el cual es válido bajo la gramática pero el analizador lo rechaza.

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