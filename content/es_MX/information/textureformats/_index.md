---
title: Formatos de textura soportados
linktitle: Formatos de textura
weight: 4
---

Esta es una lista oficial de los formatos de textura soportados. Generalmente, el formato PNG es la opción preferida debido a sin perdida de comprensión.

{{% table %}}

| Formato      | Extensiones de archivo permitidas | Observaciones                                                      |
| ----------- | ----------------------- | ------------------------------------------------------------ |
| PNG         | .png                    | Preferido. Por favor entiéndase el hecho de que usar canales alfa significativamente reduce el rendimiento cuando estos son usados en objetos de escenario y exteriores del tren. |
| Windows BMP | .bmp                    | No recomendado debido al gran tamaño del archivo.                      |
| JPEG        | .jpg, .jpeg             | No recomendado debido a la perdida de comprensión (a menos que no sea visible incluso en un gran aumento).  |
| GIF         | .gif                    | No recomendado debido a la reducida profundidad de colores (a menos que sea suficiente para la imagen). |

{{% /table %}}

##### ● Tamaño de las texturas

Los anchos y las alturas de las texturas debe ser potencia de dos, por ejemplo. 1, 2, 4, 8, 16, 32, 64, 128, 256, y así sucesivamente. Mientras que esto no sea un requisito, teniendo texturas que no sean potencia de dos incrementa los tiempos de espera, incrementa los requisitos de almacenamiento y introduce difuminado, debido a que las texturas han sido convertidas a un tamaño potencia de dos por openBVE.

##### ● Optimización del archivo PNG

PNG es un formato de compresión sin perdida. Así como muchos otros formatos de comprensión, el codificador puede hacer un rango amplio de opciones para tener como resultado diferentes productos - algunos codificadores pueden producir archivos pequeños, otros archivos grandes. Normalmente, los programas de edición de imágenes no producen el tamaño mas pequeño del archivo PNG, esto se debe porque hay un numero de herramientas que manipulan hasta el ultimo bit del archivo PNG. Estas invitado a usar estas herramientas para así reducir el requisito de almacenamiento. Los usuarios de Windows pueden usar esta conveniente herramienta [PNGGauntlet](http://brh.numbera.com/software/pnggauntlet/), mientras que los otros pueden encontrar una lista [aquí](http://optipng.sourceforge.net/pngtech/optipng.html) (deslizate hasta la opción 3. PNG (lossless) optimization programs).