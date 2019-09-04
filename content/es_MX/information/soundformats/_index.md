---
title: Formatos de sonido soportados
linktitle: Formatos de sonido
weight: 5
---

Esta es una lista de los formatos soportados de sonido.

{{% table %}}

| Formato      | Extensión de archivo usual |
| ----------- | -------------------- |
| RIFF WAVE   | .wav                 |
| FLAC nativo | .flac                |

{{% /table %}}

Tenga en cuenta que debido a la naturaleza de la posición 3D, openBVE convertirá los canales de multi-audio a mono en su carga, así que no hay ningún punto para proveer audio multi-canal en primer lugar. Para audio multi-canal, openBVE descarta los canales silenciosos e intenta detectar una interferencia constructiva o destructiva en la versión mezclada de los canales restantes. Si la interferencia es detectada, el primer canal no silencioso del archivo es usado, de otra manera el canal se mezclará. 

## ■ Formato RIFF WAVE

los archivos WAVE son soportados, técnicamente son archivos contenidos RIFF (o RIFX) en el tipo de formato WAVE. El mismo WAVE permite diferentes tipos de formato, lo que solo un subtipo de ellos esta soportado. Estos son:

{{% table %}}

| Formato          | Tasa de ejemplo | Tasa de Bit | Canales |
| --------------- | ----------- | ------- | -------- |
| PCM             | cualquiera         | cualquiera     | cualquiera      |
| Microsoft ADPCM | cualquiera         | 4 bits  | cualquiera      |

{{% /table %}}

La tasa de ejemplo refiera al numero de ejemplos por segundo por canal. La tasa de bits se refiera al numero de bits por ejemplo por canal.

## ■ Formato FLAC nativo

Todos los archivos nativos de FLAC están soportados con las siguientes (en practica raramente ocurre) excepciones:

- Cambiar la tasa de ejemplo en el medio del archivo no esta soportado.
- Cambios de predictor negativos no están soportados.
- Comprobación MD5 son saltados para la tasa de bits otras que 8, 16 o 24.  

------

Para mas información sobre estos formatos desde el punto de vista de un programador, puede ser encontrado en estos sitios externos:

Información general sobre RIFF, WAVE y PCM:

➟ http://www-mmsp.ece.mcgill.ca/Documents/AudioFormats/WAVE/Docs/riffmci.pdf

Información sobre Microsoft ADPCM:

➟ http://icculus.org/SDL_sound/downloads/external_documentation/wavecomp.htm

Documentación oficial de FLAC:

➟ http://flac.sourceforge.net/documentation.html

Documentación adicional de FLAC:

➟ http://home.comcast.net/~b.langenb/audioformats_letter.pdf
