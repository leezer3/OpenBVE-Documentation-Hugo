---
title: "Estandares"
weight: 6
---

En un par de ocasiones durante el desarrollo de un tren o de una ruta, necesitarás coordinar tus esfuerzos con otros desarrolladores en orden para así intercambiar los trenes por las rutas. De otra manera, los trenes quizás no funcionen en la ruta o no sonaran adecuadamente.

Por ejemplo, los sonidos run i.wav son escuchados ya sea cuando el tren se mueva a través de los rieles, donde i es el numero que identifica el tipo del riel. Si el desarrollador A usa run1.wav para representar un riel continuo, pero otro desarrolador B usa run1.wav como el sonido para representar un riel con juntas en durmientes de concreto, ambos trenes quizás no están diseñados para la misma ruta. Esto hace que el intercambio de trenes a través de la rutas sea difícil, incluso si un tren pudiera ser usado en esa ruta en realidad.

Así como, si usted conoce los estandares que han sido creado y están actualmente en uso por una cantidad de desarrolladores, dale su realimentación, y esos estandares pudieran ser escuchado allí.

## ■ Sonidos de tren run*i*.wav

El único intento hasta ahora conocido es el de [Sonido de Vía Estandard BVE] (http://www.railsimroutes.net/bvetss/index.php). Esto debería enfatizar que no es ampliamente usado afuera del Reino Unido , y también no necesariamente adaptado para cualquier tipo de ferrocarriles.

## ■  Sonido de tren flange*i*.wav

Ningún intento es conocido hasta el momento en estandarizar el significado de los sonidos flange*i*.wav

## ■ Balizas

Ningún intento es conocido hasta el momento en estandarizar el significado de las balizas.

Sin embargo, la siguiente lista de balizas reservadas para el sistema de seguridad instalado ATS-SN y ATS-P. Estas deberán usarse por los desarrolladores de una ruta/tren si el significado de las balizas es muy (cercano) idéntico.

{{% table %}}

| Tipo de baliza | Datos opcionales  | Significado                                                      |
| ----------- | -------------- | ------------------------------------------------------------ |
| 0           | *SistemaComutación* | El transponedor de tipo-S para el ATS-SN. Ubicado alrededor de 600m en frente de una señal. Dispara una alarma al conductor que debe rearmar cuando la referida señal sea roja.<br /><br /> Valores para *SistemaConmutado*: <br /> -1: El tren no debe conmutar el sistema de vigilancia. <br />0: El tren debe automaticamente conmutar de ATS-P a ATS-SN cuando pasa esta baliza. |
| 1           | *SistemaComutación* | El transponedor de tipo SN para el ATS-SN. Ubicado cerca de 20m en frente de una señal. Dispara los frenos de emergencia ya sea que la referida señal este en rojo. los  <br /><br /> Valores para *SistemaConmutado*:<br />-1: El tren no debe conmutar el sistema de seguridad.<br /> 0: El tren debe automáticamente conmutar de ATS-P a ATS-SN cuando rebasa esta baliza.  |
| 2           | *Carros*         | El transponedor de parada inmediata para el ATS-SN y ATS-P. Ubicada despues de los puntos de parada. Dispara el frenado de emergencia ya sea que la señal se encuentre en rojo y el número de coches corresponde a los datos opcionales. <br /><br />Valores para *Carros*:<br />0: El transponedor dispara sin importar la cantidad de coches.<br /> *Entero positivo*: El transponedor dispara solo si *Carros* es mayor o igual al numero de coches que el tren tiene. |
| 3           | *SistemaConmutado* | El transponedor de patrón renovable para el ATS-P. Múltiples de ellos están ubicados en frente de una señal. Informa al tren sobre la distancia de la referida señal y si esta en rojo o no. El tren calcula la curva de frenado a la referida señal si esta en rojo.<br /><br />Valores para *SistemaConmutado*: <br />-1: El tren no debería conmutar el sistema de seguridad.<br />0: El tren debería automáticamente conmutar de ATS-SN a ATS-P cuando rebase esta baliza. |
| 4           | *SistemaConmutado* | El transponedor de parada inmediata para ATS-P. Ubicada cerca de 25m/30m en frente de la señal. Informa al tren sobre la distancia de la referida señal y si esta en rojo o no. El tren frena inmediatamente si la señal esta en rojo.<br /><br />Valores para *SistemaConmutado*: <br />-1: El tren no debe conmutar el sistema se de seguridad. <br />0: El tren debe automaticamente conmutar de ATS-SN a ATS-P cuando rebase esta baliza. |

{{% /table %}}