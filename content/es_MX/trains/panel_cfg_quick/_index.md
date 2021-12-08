---
title: "El archivo de formado **panel.cfg** - Referencia rápida"
hidden: true
---

<font color="red">[Panel]</font>  
**Background** = NombreArchivo

<font color="red">[View]</font>  
**Yaw** = Valor en grados  
**Pitch** = Valor en grados

<font color="red">[PressureIndicator]</font>  
**Type** = { **0** = aguja | **1** = LED }  
**LowerNeedle** = Subject, ValorRojo, ValorVerde, ValorAzul
**UpperNeedle** = Subject, ValorRojo, ValorVerde, ValorAzul
**Center** = X, Y  
**Radius** = ValorEnPixeles
**Background** = NombreArchivo
**Cover** = NombreArchivo
**Unit** = { **0** = kpa | **1** = kgf/cm2 }  
**Minimum** = ValorPresion
**Maximum** = ValorPresion
**Angle** = ValorEnGrados

<font color="red">[SpeedIndicator]</font>  
**Type** = { **0** = aguja | **1** = LED }  
**Needle** = ValorRojo, ValorVerde, ValorAzul 
**Center** = X, Y  
**Radius** = ValorEnPixeles  
**Background** = NombreArchivo  
**Cover** = NombreArchivo   
**Minimum** = ValorVelocidad
**Maximum** = ValorVelocidad
**Atc** = NombreArchivo
**AtcRadius** = ValorEnPixeles

<font color="red">[DigitalIndicator]</font>  
**Number** = NombreArchivo
**Corner** = Izquierda, Arriba
**Size** = Ancho, Alto
**Unit** = { **0** = km/h | **1** = mph | **2** = m/s }

<font color="red">[PilotLamp]</font>  
**TurnOn** = NombreArchivo
**TurnOff** = NombreArchivo
**Corner** = Izquierda, Arriba

<font color="red">[Watch]</font>  
**Background** = NombreArchivo
**Center** = X, Y  
**Radius** = ValorEnPixeles
**Needle** = ValorRojo, ValorVerde, ValorAzul

<font color="red">[BrakeIndicator]</font>  
**Image** = NombreArchivo
**Corner** = Izquierda, Arriba
**Width** = ValorEnPixeles