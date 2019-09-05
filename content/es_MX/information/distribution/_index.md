---
title: Distribuyendo contenido creado para openBVE
linktitle: Distribuyendo contenido
weight: 7
---

Ya sea de que hayas escrito la ruta, tren o plugin, hay un par de cosas que deberías estar advertido antes de distribuir tu contenido. Como openBVE es un simulador multi-plataforma con la intención de interoperabildidad internacional en mente, tus contenidos también deben serlo.

## ■ Archivo de textos y codificación

Cualquiera que sea tu archivo de texto que vayas a incluir en tu contenido, incluyendo archivos leeme, deberás de asegurarte que ese archivo sea correctamente procesado internacionalmente. La codificación para todos los tipos de texto accedidos por openBVE es UTF-8. Para rutas y objetos asociados, también puedes usar algún tipo de codificación, pero el usuario deberá seleccionar una codificación especifica de una lista. La misma situación aplica para los trenes y archivos asociados a ellos. Si se codifica su arhico de texto en cualquier codificación menos UTF-8, deberás informar al usuario sobre su elección, o de otra forma, el usuario terminará con un montón de caracteres de texto sin sentido por una potencial incorrecta codificación de archivos. Usando UTF-8 es la opción preferida, mientras que usar codificaciones similares son aceptadas, pero no recomendadas. Por favor tenga en consideración que todos los archivos en una ruta o tren deben usar la misma codificación, ya que no es factible ni posible para el usuario seleccionar la codificación de cada archivo individual.

Practicas aceptadas y no aceptadas:

{{% table-nonheader %}}

| <font color="Green">✓</font> | Guardar sus archivos como UTF-8                               |
| ---------------------------- | ------------------------------------------------------------ |
| <font color="Green">✓</font> | Guardar sus archivos de texto en cualquier codificación Unicode con un byte de marca ordenada. |
| <font color="Red">✗</font>   | Guardar sus archivos de texto en cualquier codificación que no sea Unicode.            |
| <font color="Red">✗</font>   | Usar una codificación diferente para cada archivo de ruta o tren.   |

{{% /table-nonheader %}}

## ■ Archivadores versus instaladores

Cuando se empaqueta una ruta o un tren, considera usar un solo archivo, en vez de múltiples archivos pequeños, a menos que el tamaño del archivo justifique la división del archivo. Nunca use un instalador específico a alguna plataforma que no reúna la portabilidad ( a menos que quieras proveer un archivo alternativo). Los instaladores específicos de plataforma incluidos son Windows archivos .exe, Linux repositorio .rpm  y archivos Mac .dgm

Prácticas aceptables y no aceptables:

{{% table-nonheader %}}

| <font color="Green">✓</font> | Usar un formato de archivo como 7Z, ZIP, TAR.GZ, etc.         |
| ---------------------------- | ----------------------------------------------------------- |
| <font color="Red">✗</font>   | Usar un formato de plataforma especifico como EXE, RPM, DMG, etc. |

{{% /table-nonheader %}}

## ■ Nombres de archivo y archivos

Generalmente, puedes usar cualquier nombre de archivo que desees, esto incluye cualquier carácter como Latín, Japones, Chino y lo que te guste. Sin embargo, necesitas estar seguro de que el formato de archivo soporte nombres de archivo Unicode . De no ser así, el usuario no podrá extraer el archivo correctamente, llevando a una serie de archivos que no podrán ser encontrados después. Desafortunadamente, el popular formato ZIP no soporta nombres de archivo Unicode, mientras que por ejemplo [7Z](https://www.7-zip.org/) si lo soporta. Alternativamente, limítese con los caracteres ASCII, por ejemplo A-Z, a-z ,0-9.

Practicas aceptadas y no aceptadas:

{{% table-nonheader %}}

| <font color="Green">✓</font> | Use un formato de archivo que soporte nombres de archivos Unicode (por ejemplo. 7Z) |
| ---------------------------- | ------------------------------------------------------------ |
| <font color="Green">✓</font> | Usa un formato de archivo que no soporte Unicode y restringirse a usar nombres de archivo ASCII. |
| <font color="Red">✗</font>   | Usa un formato de archivo que no soporta Unicode pero usa nombres de archivo Unicode. |

{{% /table-nonheader %}}

## ■ Archivos y la estructura de carpetas.

Debes incluir siempre la carpeta completa que es , **Railway** y **Train**, cuando se distribuyan rutas o trenes. Esto lo hará mas fácil para las personas entender lo que necesitan extraer el contenido y hacia donde. Por ejemplo, nunca incluyas un subdirectorio que sea *SuNombreAqui* que deba extraerse en la carpeta  Railway\Sound. Solo los usuarios con mas experiencia generalmente están en la capacidad de entender donde extraer el contenido examinando en los archivos o sus extensiones.

Practicas aceptadas y no aceptadas:

{{% table-nonheader %}}

| <font color="Green">✓</font> | Incluir las dos carpetas base **Railway** o **Train**, de ser mejor ambas. |
| ---------------------------- | ------------------------------------------------------------ |
| <font color="Red">✗</font>   | Solo incluir algún subdirectorio o archivos directamente y los usuarios expertos que sepan como arreglárselas. |

{{% /table-nonheader %}}

## ■ Errores y advertencias

Generally, your route should be free of errors. Please note that openBVE distinguishes between errors and warnings. An error is something definately wrong with your coding that should be fixed immediately. A warning is usually only raised to encourage inspection of potentially ambiguous code or code that might not have been meant the way it was written. In order to inspect your routes and trains for errors and warnings, go to the Options menu in openBVE and enable eporting them. RouteViewer and ObjectViewer always report such messages. Please note that the arious tools and openBVE itself might report a different set of messages as they don't share all the ame functionality. Distributing add-ons containing errors might give users the impression that omething was incompletely downloaded or was incorrectly packaged, and should generally be voided.

Practicas aceptables y no aceptables:

{{% table-nonheader %}}

| <font color="Green">✓</font> | Activa los reportes de error y advertencias en el menú *Opciones* e inspecciona sus contenidos. |
| ---------------------------- | ------------------------------------------------------------ |
| <font color="Green">✓</font> | Distribuye contenidos que están eventualmente libre de errores (no necesariamente de advertencias) |
| <font color="Red">✗</font>   | Nunca inspecciona sus contenidos por errores ya sea que deshabilite el reporte de errores o ignorando los mensajes. |
| <font color="Red">✗</font>   | Distribuir contenidos que posean errores.                   |

{{% /table-nonheader %}}

## ■ Rutas y trenes diseñados para usar plugins

Si usted incluye plugins en su tren, estos deben estar en el tipo .NET. Los viejos plugins exclusivos de Windows están retenidos por una compatibilidad obsoleta, pero estos no deberían de volverse a distribuir con las nuevas versiones. Si usted no puede quitar la dependencia de un plugin que sea exclusivo para Windows, por lo menos diseñe sus rutas y trenes que así puedan trabajar con el sistema de protección predeterminado. Usted puede probar las conductas de su tren sin un plugin a través de la eliminación de archivo ats.cfg (o temporalmente re-nombrándolo).

## ■ Manuales de operación

Una vista general de las señas y señales en su ruta, así como también como operar el tren , esta todo bien. En caso contrario, los usuarios que no están acostumbrados con el terreno en particular, dejarán de utilizar el contenido tratando de adivinar el significado de las señas y señales o teniendo que adivinar cual tecla sirve para cada propósito. Si usted puede proveer una versión en inglés de las instrucciones, esto generalmente incrementará el número de personas que podrán entenderlo.    