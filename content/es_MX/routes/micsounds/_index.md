---
title: "Reproducción de sonidos a través de una entrada de Micrófono"
linktitle: "Reproducción de sonidos a través de una entrada de Micrófono"
weight: 2
---

openBVE 1.5.4.0 introduce la habilidad de reproducir sonidos a través del micrófono ó un dispositivo de entrada a una posición específica dentro del mundo del juego.

---

{{% command %}}  
**Track.MicSound** *X* ; *Y* ; *ToleranciaDelantera* ; *ToleranciaTrasera*  
{{% /command %}}

{{% command-arguments %}}  
***X***: La posición del sonido eje X.  
***Y***: La posición del sonido eje Y.  
***ToleranciaDelantera***: La distancia en metros a la que el sonido se torna audible mientras que el tren se aproxima a su posicion. 
***ToleranciaTrasera***: a distancia en metros a la que el sonido se torna inaudible mientras que el tren se aproxima a su posicion. 
{{% /command-arguments %}}

__**Notas de Implementación**__:

* La entrada del microfono debe estar activada usando la tecla **PLAY_MIC_SOUNDS**, que es asignada a **W** por defecto.
* La entrada del micrófono será dirigida a cualquier sonido fuente de **Track.MicSound**  que estén dentro del rango de la cámara.
* Solamente la primera entrada de micrófono disponible por OpenAL es soportado al momento.