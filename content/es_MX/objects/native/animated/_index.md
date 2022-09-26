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
| `distanceLastStation`         | The distance in m to the previous station. |
| `distanceStation[stationIndex]`| La distancia en metros a la estación con indice *stationIndex* |
| `stopsNextStation`            | Indica si el tren hace parada en la próxima estación. |
| `stopsStation[stationIndex]`  | Indica que el tren se detiene en la estación con indice *stationIndex* |
| `siguienteEstación`                 | El indice de la siguiente estación. |
| `nextStationStop`             | El indice de la siguiente estación donde el tren debe hacer parada. |
| `terminalStation`             | The index of the terminal station for this train. |
| `timeTable`                   | Returns 1 if the timetable is currently set as visible, 0 otherwise. |
| `brightness[carIndex]`        | Returns the interpolated brightness value applying to this car. |
| `routeLimit`                  | Returns the current route speed limit applying to this train in km/h. |
| `headlights`                  | Gets the current state of the train's headlights. |
| `wheelSlip`                   | Returns 1 if the train is experincing wheelslip in the current car, 0 otherwise. |
| `wheelSlip[carIndex]`         | Returns 1 if the train is experinging wheelslip in the specified car, 0 otherwise. |

{{% /table-2col %}}

##### ● Trains (brake)

{{% table-2col %}}

| Variable                       | Description                                                  |
| ------------------------------ | ------------------------------------------------------------ |
| `mainReservoir`                | The current pressure in the main reservoir in this car, measured in Pa. |
| `mainReservoir[carIndex]`      | The current pressure in the main reservoir in car *carIndex*, measured in Pa. |
| `equalizingReservoir`          | The current pressure in the equalizing reservoir in this car, measured in Pa. |
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
| `rightDoors`                 | The state of the right doors. Returns 0 if fully closed, 1 if fully opened, or any intermediate value, biasing doors that are in a more open state. |
| `rightDoors[carIndex]`       | The state of the right doors of car *carIndex*. Returns a value between 0 and 1, biasing doors that are in a more open state, or -1 if the car does not exist. |
| `leftDoorsTarget`            | The anticipated target state of the left doors. Returns either 0 (closed) or 1 (opened). |
| `leftDoorsTarget[carIndex]`  | The anticipated target state of the left doors of car *carIndex*. Returns either 0 (closed) or 1 (opened). |
| `rightDoorsTarget`           | The anticipated target state of the right doors. Returns either 0 (closed) or 1 (opened). |
| `rightDoorsTarget[carIndex]` | The anticipated target state of the right doors of car *carIndex*. Returns either 0 (closed) or 1 (opened). |
| `leftDoorButton`            | The state of the left doors button. Returns either 0 (released) or 1 (pressed). |
| `rightDoorButton`           | The state of the right doors button. Returns either 0 (released) or 1 (pressed). |
| `pilotLamp`                  | The state of the pilot lamp (Doors closed & ready to start). Returns either 0 (unlit) or 1 (lit). |

{{% /table-2col %}}

##### ● Trains (miscellaneous)

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
| `hasConstSpeed`                  | Whether the train has a const speed system (1) or not (0).   |
| `hasPlugin`                      | Whether the train uses a plugin (1) or not (0).              |
| `pluginState[i]`                 | The state of the i<sup>th</sup> plugin variable, returning an integer depending on the plugin. Is the same as ats*i* in the panel2.cfg. |
| `FrontAxleCurveRadius[carIndex]` | Returns the curve radius at the front axle position of car *carIndex*. |
| `RearAxleCurveRadius[carIndex]`  | Returns the curve radius at the rear axle position of car *carIndex*. |
| `CurveCant[carIndex]`            | Returns the cant value for car *carIndex*.                   |
| `Pitch[carIndex]`                | Returns the pitch value for car *carIndex*.                  |
| `Odometer`                       | Returns a signed number representing the distance in meters travelled by the current car. |
| `Odometer[carIndex]`             | Returns a signed number representing the distance in meters travelled by car *carIndex*. |
| `Klaxon`                         | Returns the currently playing horn (if any) as follows: (0) No horns are playing (1) The primary horn is playing (2) The secondary horn is playing (3) The music horn is playing. *Note* If multiple horns are playing, the lowest value will be returned. |
| `PrimaryKlaxon`                  | Returns 1 if the primary horn is currently playing, 0 otherwise. |
| `SecondaryKlaxon`                | Returns 1 if the secondary horn is currently playing, 0 otherwise. |
| `MusicKlaxon`                    | Returns 1 if the music horn is currently playing, 0 otherwise. |
| `passAlarm`                      | Whether the station pass alarm has been activated. Returns either 0 (inactive) or 1 (active). |
| `stationAdjustAlarm`             | Whether the station adjust alarm has been activated. Returns either 0 (inactive) or 1 (active). |

{{% /table-2col %}}

If *pluginState[i]* is used with the built-in safety systems ATS and ATC, the following mappings for *i* apply:

{{% table %}}

| *i*  | English             | 日本語       | Return values                                |      | pluginState[271] | Meaning           |
| ---- | ------------------- | ------------ | -------------------------------------------- | ---- | ---------------- | ----------------- |
| 256  | ATS                 | ATS          | 0 (unlit) or 1 (lit)                         |      | 0                | ATC not available |
| 257  | ATS RUN             | ATS 作動     | 0 (unlit), 1 (lit) or 2 (flashing)           |      | 1                | 0 km/h            |
| 258  | ATS RUN             | ATS 作動     | 0 (unlit / non-flashing), 1 (lit / flashing) |      | 2                | 15 km/h           |
| 259  | P POWER             | P 電源       | 0 (apagado) o 1 (encendido)                         |      | 3                | 25 km/h           |
| 260  | PTN APPROACH        | パターン接近 | 0 (apagado) o 1 (encendido)                         |      | 4                | 45 km/h           |
| 261  | BRAKE RELEASE       | ブレーキ開放 | 0 (apagado) o 1 (encendido)                         |      | 5                | 55 km/h           |
| 262  | BRAKE APPLY         | ブレーキ動作 | 0 (apagado) o 1 (encendido)                         |      | 6                | 65 km/h           |
| 263  | ATS P               | ATS-P        | 0 (apagado) o 1 (encendido)                         |      | 7                | 75 km/h           |
| 264  | FAILURE             | 故障         | 0 (apagado) o 1 (encendido)                         |      | 8                | 90 km/h           |
| 265  | ATC                 | ATC          | 0 (apagado) o 1 (encendido)                         |      | 9                | 100 km/h          |
| 266  | ATC POWER           | ATC 電源     | 0 (apagado) o 1 (encendido)                         |      | 10               | 110 km/h          |
| 267  | ATC SRV             | ATC 常用     | 0 (apagado) o 1 (encendido)                         |      | 11               | 120 km/h          |
| 268  | ATC EMG             | ATC 非常     | 0 (apagado) o 1 (encendido)                         |      | 12               | ATS is active     |
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