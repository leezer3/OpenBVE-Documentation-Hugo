---
title: Codificación de caracter
weight: 1
---

<font color="Gray">Esta página describe que es codificación de caracteres y como debería ser utilizado</font>

■ Vista general
------

Una codificación de caracteres es una manera de traducir caracteres en bytes para que así puedan ser almacenados en el disco duro. En el comienzo, un byte (256 estados) eran usados para codificar un caracter. Debido a que existen distintos sistemas de escritura alrededor del mundo con diferentes requisitos para los caracteres sean codificados, hay un montón de codificadores diferentes que son de uso alrededor del mundo. Problemáticamente, en la codificación de un archivo de texto no es conocido en ventaja, malinterpretando la codificación puede resultar en un mojibake (secuencia de caracteres sin significado).

Ejemplo de la codificación Japonesa en Shift_JIS (requiere unas fuentes apropiadas disponibles):

{{% code %}}  
ひらがなカタカナ漢字  
{{% /code %}}

La secuencia de byte generado por el previo ejemplo en Shift_JIS:

{{% code %}}  
82 D0 82 E7 82 AA 82 C8 83 4A 83 5E 83 4A 83 69 8A BF 8E 9A  
{{% /code %}}

Que ocurre si la secuencia de byte es mal interpretado usando ISO 8859-1  (Latin-1) en vez de Shift_JIS:

{{% code %}}  
‚Ð‚ç‚ª‚ÈƒJƒ^ƒJƒiŠ¿Žš  
{{% /code %}}

Por lo general, una codificación particular solo permite usar el sistema de escritura para el cual fue diseñado. Unicode, un estandard el cual cubre básicamente todos los caracteres y ha sido usado en sistemas de escritura a través del mundo, otorgando una solución a esto.

Mientras que Unicode es una amplia gama hoy en día, tiene sus pequeños inconvenientes. Primero que todo, Unicode no usa codificación de caracter directo. En vez de esto, la así llamada Unicode Transformation Formats (UTF) provee el significado particular de caracteres. los formatos de transformación frecuentemente usados son UTF-8 y UTF-16.

Las rutas y los trenes por lo general, debido a razones de compatibilidad, esta permitido de codificarse en cualquier codificación arbitraria. Como la codificación no es conocida en adelante, el usuario necesitará seleccionar la codificación correcta para la ruta y el tren en la pestaña configuración en el menú principal. Por supuesto, esto es molesto y debe ser evitado de cualquier forma.

## ■ El byte de orden marca

UTF-16 es descendente de la codificación de caracter (UTC-2), el cual siempre ha usado dos bytes para codificar un caracter. Como tal, el orden de esos dos bytes importan. En orden de conocer en qué orden los bytes aparecen, el así llamado byte de orden marca es predispuesto frecuentemente en el texto, por lo general automáticamente y transparentemente en el editor de texto. El byte de orden marca provee a los decodificadores el significado detectando en qué orden de byte el archivo fue guardado. Adicionalmente, el bye de orden marca provee una manera bastante segura de detectar que el archivo fue guardado en Unicode en primer lugar.

Mientras que esto no es técnicamente necesario, el byte de orden marca es también frecuentemente usado por UTF-8. Así como UTF-8 no tiene problema para ordenar byte, el hecho del propósito de usar un byte de orden marca con UTF-8 es para proveer significado de identidad al archivo como codificado en UTF-8.

Así como se ha dicho, mientras que Unicode permite codificar virtualmente todos los caracteres usados en todos los sistemas de escritura alrededor del mundo, esto no necesariamente haga funcionar con todos los archivos de texto más facilmente si el codificador a ser utilizado no fue acordado.

Usar un byte de orden marca provee a openBVE la habilidad de automáticamente detectar la codificación para cada archivo. Si usted tiene un buen editor de texto, no solamente estarás disponible a seleccionar la codificación manualmente, pero también si deseas guardar con un byte de orden marca o no. Notepad (Windows) siempre guarda con un byte de orden de marca si UTF-8 es seleccionado como la codificación de caracter al guardar el archivo, para así hacer un ejemplo aceptable.

Tecnicamente, el byte de orden de marca son los primeros bytes de un archivo particular de texto. El byte de orden marca, el cual puede ser detectado por openBVE son los siguientes:

{{% table %}}

| Codificación               | Representación hexadecimal |
| ---------------------- | -------------------------- |
| UTF-8                  | EF BB BF                   |
| UTF-16 (big endian)    | FE FF                      |
| UTF-16 (little endian) | FF FE                      |
| UTF-32 (big endian)    | 00 00 FE FF                |
| UTF-32 (little endian) | FF FE 00 00                |

{{% /table %}}

Estas invitado a siempre guardar los archivos de texto en una de estas codificaciones con un byte de orden de marca para openBVE para así automáticamente detectar la codificación usada.