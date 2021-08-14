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

Beacons reserved for the built-in safety systems ATS-SN and ATS-P. These should only be used by route/train developers if the meaning of the beacons are (nearly) identical:

{{% table %}}

| Beacon type | Optional data  | Meaning                                                      |
| ----------- | -------------- | ------------------------------------------------------------ |
| 0           | *SwitchSystem* | S-type transponder for ATS-SN. Placed about 600m in front of a signal. Raises an alarm the driver has to acknowledge whenever the referenced signal is red.<br /><br />Values for *SwitchSystem*:<br />-1: The train should not switch the safety system.<br />0: The train should automatically switch from ATS-P to ATS-SN when passing this beacon. |
| 1           | *SwitchSystem* | SN-type transponder for ATS-SN. Placed about 20m in front of a signal. Triggers the emergency brakes whenever the referenced signal is red.<br /><br />Values for *SwitchSystem*:<br />-1: The train should not switch the safety system.<br />0: The train should automatically switch from ATS-P to ATS-SN when passing this beacon. |
| 2           | *Cars*         | Immediate stop transponder for ATS-SN and ATS-P. Placed after stops. Applies the emergency brakes whenever the referenced signal is red and the number of cars corresponds to the optional data.<br /><br />Values for *Cars*:<br />0: The transponder triggers regardless of the amount of cars.<br />*Positive integer*: The transponder triggers only if *Cars* is greater than or equal to the number of cars the train has. |
| 3           | *SwitchSystem* | Pattern renewal transponder for ATS-P. Multiple of these are placed in front of a signal. Informs the train about the distance to the referenced signal and whether it is red or not. The train then calculates a brake curve to the referenced signal if it is red.<br /><br />Values for *SwitchSystem*:<br />-1: The train should not switch the safety system.<br />0: The train should automatically switch from ATS-SN to ATS-P when passing this beacon. |
| 4           | *SwitchSystem* | Immediate stop transponder for ATS-P. Placed about 25m/30m in front of a signal. Informs the train about the distance to the referenced signal and whether it is red or not. The train brakes immediately if the signal is red.<br /><br />Values for *SwitchSystem*:<br />-1: The train should not switch the safety system.<br />0: The train should automatically switch from ATS-SN to ATS-P when passing this beacon. |

{{% /table %}}

Beacons used by legacy train systems to simulate weather (Note- These will also be utilised by any train using the new Windscreen functionality):

{{% table %}}

| Beacon type | Optional data  | Meaning                                                      |
| ----------- | -------------- | ------------------------------------------------------------ |
| 21           | *Intensity*   | Sets the intensity of the weather.<br /><br />Values for *Intensity* should be within the following range:<br />0: No weather.<br />100: Maximum weather intensity. |

{{% /table %}}

UK Basic AWS / TPWS Beacons (Supported by OS_ATS, UKTrainSys, UKDT, UKMU & UKEMU):

{{% table %}}

| Beacon type | Optional data  | Meaning                                                      |
| ----------- | -------------- | ------------------------------------------------------------ |
| 44000       | 0              | Permanent AWS signal approach magnet. Raises an alarm the driver has to acknowledge if the referenced signal is red. |
| 44001       | 0              | AWS speed restriction magnet. Raises an alarm the driver has to acknowledge regardless. |
| 44003       | 0              | TPWS inductor associated with a signal. Triggers a TPWS brake demand if the referenced section is occupied. |
| 44003       | 0              | TPWS inductor associated with a signal. Triggers a TPWS brake demand if the referenced section is occupied. <br /> If you wish to issue a brake demand regardless (e.g. buffers), then the current section should be referenced. |
| 44004       | *Speed*        | TPWS overspeed inductor. Triggers a TPWS brake demand if the train's speed is greater than *Speed*. |

{{% /table %}}