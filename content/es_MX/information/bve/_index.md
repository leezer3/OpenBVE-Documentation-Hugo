---
title: "Diferencias comparadas con el simulador de trenes BVE"
linktitle: "Vs. simulador de trenes BVE Trainsim"
weight: 9
---

Esta pagina muestra las diferencias **incompatibles** entre openBVE y el simulador de trenes BVE Trainsim  sobre los tipos de formato, por ejemplo características de los contenidos desarrollados para el simulador de trenes BVE Trainsim pudieran ser interpretados diferentes por openBVE con un resultado incompatible. Por el momento, solo una de esta incompatibilidad es conocida.

Por favor, tenga en consideración que para todas estas diferencias de incompatibilidad que están mencionadas en esta página, la resolución es la misma: Esta considerado ser mas importante proveer características estable y consistentes en openBVE que hacer cambios posteriores incompatibles entre versiones sólo para incrementar la similitud con el simulador de trenes de BVE Trainsim .Todas estas diferencias mencionadas en esta página serán permanentes.

## ■ El comando Track.Signal  ( rutas CSV y RW )

El comando Track.Signal  (alternativamente: Track.Sig) es usado para crear una Señal predeterminada de estilo Japones en rutas CSV (alternativamente hablando son usadas en rutas RW ).

En openBVE, el comando Track.Signal toma los siguientes argumentos:

{{% command %}}  
**Track.Signal** *Aspecto*; *~~Sin uso~~*; *X*; *Y*; <u>*Giro*</u>; *Cabeceo*; *Alabeo*  
{{% /command %}}

en el simulador de trenes BVE, el comando Track.Signal toma los siguientes argumentos:

{{% command %}}  
**Track.Signal** *Aspecto*; *Etiqueta*; *X*; *Y*; <u>*Tipo*</u>  
{{% /command %}}

El parámetro *Etiqueta* en el simulador de trenes BVE Trainsim es una descripción textual de la señal que provee ninguna función en openBVE (Así llamado *Sin uso* en la documentación).

Las características del simulador de trenes BVE Trainsim un argumento de clase *Tipo* el cual puede tomar valores 1,2 o 3. Esta usado para denotar diferentes tipos de señal, por ejemplo: señales de estación vs señales de salida. Por mero accidente, estos argumentos nunca han sido incluidos en openBVE, por subsiguiente, surgió la necesidad de incluir los argumentos de *Dirección (Yaw)* , *Cabeceo o elevación (Pitch)* y *Alabeo (Roll)* para proveer más control sobre la orientación de la cabeza de la señal. Consecuentemente, en el simulador de trenesBVE Trainsim el argumento *Tipo* y el argumento *Dirección* en OpenBVE están sobrepuestos. Esto sería mal interpretado como una rotación en *Dirección* de más de 3 grados en openBVE. Usualmente, este ángulo pequeño no debe producir diferencia perceptible, especialmente a aquellos parámetros que ya no son usados de todas formas. 
