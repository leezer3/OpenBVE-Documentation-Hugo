---
title: "The **panel.cfg** file format - Quick reference"
linktitle: "The panel.cfg file"
hidden: true
---

<font color="red">[Panel]</font>  
**Background** = FileName

<font color="red">[View]</font>  
**Yaw** = ValueInDegrees  
**Pitch** = ValueInDegrees

<font color="red">[PressureIndicator]</font>  
**Type** = { **0** = gauge | **1** = LED }  
**LowerNeedle** = Subject, RedValue, GreenValue, BlueValue  
**UpperNeedle** = Subject, RedValue, GreenValue, BlueValue  
**Center** = X, Y  
**Radius** = ValueInPixels  
**Background** = FileName  
**Cover** = FileName  
**Unit** = { **0** = **kpa** | **1** = **kgf/cm2** }  
**Minimum** = PressureValue  
**Maximum** = PressureValue  
**Angle** = ValueInDegrees

<font color="red">[SpeedIndicator]</font>  
**Type** = { **0** = gauge | **1** = LED }  
**Needle** = RedValue, GreenValue, BlueValue  
**Center** = X, Y  
**Radius** = ValueInPixels  
**Background** = FileName  
**Cover** = FileName  
**Minimum** = SpeedValue  
**Maximum** = SpeedValue  
**Atc** = FileName  
**AtcRadius** = ValueInPixels

<font color="red">[DigitalIndicator]</font>  
**Number** = FileName  
**Corner** = Left, Top  
**Size** = Width, Height  
**Unit** = { **0** = **km/h** | **1** = **mph** | **2** = **m/s** }

<font color="red">[PilotLamp]</font>  
**TurnOn** = FileName  
**TurnOff** = FileName  
**Corner** = Left, Top

<font color="red">[Watch]</font>  
**Background** = FileName  
**Center** = X, Y  
**Radius** = ValueInPixels  
**Needle** = RedValue, GreenValue, BlueValue

<font color="red">[BrakeIndicator]</font>  
**Image** = FileName  
**Corner** = Left, Top  
**Width** = ValueInPixels