---
title: "Formatos de número"
weight: 2
---

<font color="Gray">Esta página describe cual formatos de número están disponibles en varios archivos de rutas y trenes y cómo implementarlos en ellos. </font>

## ■ Contenidos

{{% contents %}}

- [1. Vista general](#overview)
- [2. Enteros](#integers)
- [3. Números coma-flotante](#floating)
- [4. Tiempos](#times)
- [5. Valores de colores](#colors)

{{% /contents %}}

## <a name="overview"></a>■ 1. Vista general

Ya sean archivos de rutas y trenes, encontrarás números como enteros o coma flotantes todo el tiempo, ocasionalmente también hay otros. Estos números están requeridos con un cierto tipo de formato, el cual será descrito en las siguientes secciones.

Existen dos métodos de análisis para los números: **Strict** y **Loose** . El método Strict posee una especificación muy apretada, el cual no permite dejar espacios para hacer equivocaciones tipográficas. Este método es usado en todos los nuevos tipos de formatos. El método Loose es anticuado y es requerido para compatibilidad con el viejo material. Los diferentes archivos que están presentados en las páginas de *Desarrollando para openBVE* indican qué modelo esta siendo usado. Ten en cuenta que ya sea que el método *Loose* este permitido, también puedes usar el formato *Strict* como *Strict* en un sub-derivado de *Loose*.

## <a name="integers"></a>■ 2. Enteros

**Strict:** Permitido en cualquier secuencia al menos un dígito decimal en el rango de 0 a 9 (U+0030 - U+0039), opcionalmente como prefijo de un símbolo negativo (U+002D). La cadena de caracteres resultante puede incluir antes o después espacios en blanco.

{{% code "*Examples for Strict integers:*" %}}  
0  
123  
-98  
{{% /code %}}

**Loose:** Todos los espacios en blanco son quitados desde la secuencia de carácter primero. Entonces, la secuencia de carácter restante (*abcde*) es interpretada de acuerdo al modelo *Strict* . Si esto falla al crear un número valido, el ultimo carácter es quitado de la ultima secuencia (*abcd*) y así , la secuencia es probada. Esto continua hasta que un número valido es producido o hasta que ningún carácter quede, en caso contrario es determinado que no es un número valido.

{{% code "*Examples for Loose integers:*" %}}  
123  
77 11  
-987x456  
{{% /code %}}

{{% code "*The interpreted integers from the preceding examples are:*" %}}  
123  
7711  
-987  
{{% /code %}}

## <a name="floating"></a>■ 3. Números de coma flotante

**Strict:** Permitido si cualquier secuencia o al menos un dígito en decimal en el rango del 0 al 9 (U+0030 - U+0039), opcionalmente intermediado por exactamente un separador decimal en forma de punto (U+002E), opcionalmente como prefijo por un símbolo negativo (U+002D). La cadena resultante de la secuencia puede incluir antes o después espacios en blanco.

{{% code "*Examples for Strict floating-point numbers:*" %}}  
123  
123\.  
123.0  
123.456  
0.456  
\.456  
-123.456  
{{% /code %}} 

**Loose:** Todos los espacios en blanco son quitados desde la secuencia de carácter primero. Entonces, la secuencia de carácter restante (*abcde*) es interpretada de acuerdo al modelo *Strict* . Si esto falla al crear un número valido, el ultimo carácter es quitado de la ultima secuencia (*abcd*) y así , la secuencia es probada. Esto continua hasta que un número valido es producido o hasta que ningún carácter quede, en caso contrario es determinado que no es un número valido.

{{% code "*Examples for Loose floating-point numbers:*" %}}  
-123 . 456  
987,333  
{{% /code %}}  

{{% code "*The interpreted floating-point numbers from the preceding examples are:*" %}}  
-123.456  
987  
{{% /code %}}

## <a name="times"></a>■ 4. Tiempos

**Obsoleto:** Permitido por cualquier de las siguientes secuencias:

{{% code %}}  
*hhh*__.__*mmss*  
*hhh*__.__*mms*  
*hhh*__.__*mm*  
*hhh*__.__*m*  
*hhh*  
{{% /code %}}

En estas secuencias, *hhh* denota cualquier secuencia de al menos un dígito decimal para indicar la hora, *mm* denota la parte minuto con dos dígitos *m* denota un dígito de minuto *ss* denota la parte de segundos con dos dígitos, *s* denota la parte segundo con un dígito, y el carácter para separar las horas de los minutos es una coma (U+002E). Todos los dígitos necesitan ser caracteres desde el 0 al 9 (U+0030 - U+0039). Espacios en blanco al comienzo o al final son ignorados. El tiempo total es determinado por la siguiente formula, resultado en segundos desde la media noche: 

{{% function "*Seconds since midnight for a given time:*" %}}  
3600\**hhh* + 60\**mm* + *ss*  
{{% /function %}}

Si los minutos o segundos no están indicados, estos se asumen que son iguales a cero. Usted puede usar cualquier hora que no sea negativa, incluyendo valores mayores o iguales que 24. Si por ejemplo, el tiempo de llegada de una estación es a las 23:59:00 (día 1), y el tiempo de llegada de la siguiente estación es 00:02:15 (día 2), entonces usa la siguientes secuencias para representar estos tiempos en orden para asegurar un orden cronológico:

{{% code "*Examples for times:*" %}}  
23.5900  
24.0215  
{{% /code %}}

## <a name="colors"></a>■ 5. Valores de color

**Hexcolor:** A six-digit hexadecimal number is preceded by a number sign character (U+0023). An individual hexadecimal digit can be comprised of the decimal digits from 0 to 9 (U+0030 - U+0039), the lowercase letters from a to f (U+0061 - U+0066) and the uppercase letters from A to F (U+0041 - U+0046).The hexcolor has the following form:

{{% code %}}  
\#*RRGGBB*  
{{% /code %}}

In this sequence, RR represents the red component, GG the green component and BB the blue component. Each component ranges from 00 to FF (0 - 255), where 00 represents no contribution for that channel and FF full contribution.

Colores comúnmente usados (para indicar transparencias) incluye:

{{% code %}}  
<font color="Black">#000000 (negro)</font>  
<font color="Red">#FF0000 (rojo)</font>  
<font color="Green">#00FF00 (verde)</font>  
<font color="Blue">#0000FF (azul)</font>  
<font color="Cyan">#00FFFF (aguamarina)</font>  
<font color="Magenta">#FF00FF (magenta)</font>  
<font color="Yellow">#FFFF00 (amarillo)</font>  
<font color="White">#FFFFFF (blanco)</font>  
{{% /code %}}