---
title: "El archivo de formado **panel2.cfg** - Referencia rápida"
hidden: true
---

<font color="red">[This]</font>  
**Resolution** = Valor
**Left** = Valor
**Right** = Valor
**Top** = Valor
**Bottom** = Valor
**DaytimeImage** = NombreArchivo
**NighttimeImage** = NombreArchivo
**TransparentColor** = ColorHexadecimal
**Center** = X, Y  
**Origin** = X, Y

<font color="red">[PilotLamp]</font>  
**Subject** = Asunto
**Location** = Izquierda, Arriba
**DaytimeImage** = NombreArchivo
**NighttimeImage** = NombreArchivo
**TransparentColor** = ColorHexadecimal
**Layer** = IndiceCapa

<font color="red">[Needle]</font>  
**Subject** = Subject  
**Location** = CenterX, CenterY  
**Radius** = ValueInPixels  
**DaytimeImage** = FileName  
**NighttimeImage** = FileName  
**Color** = HexColor  
**TransparentColor** = HexColor  
**Origin** = X, Y  
**InitialAngle** = ValueInDegrees  
**LastAngle** = ValueInDegrees  
**Minimum** = Value  
**Maximum** = Value  
**NaturalFreq** = Value  
**DampingRatio** = Value  
**Layer** = LayerIndex

<font color="red">[DigitalNumber]</font>  
**Subject** = Subject  
**Location** = Left, Top  
**DaytimeImage** = FileName  
**NighttimeImage** = FileName  
**TransparentColor** = HexColor  
**Interval** = Height  
**Layer** = LayerIndex

<font color="red">[DigitalGauge]</font>  
**Subject** = Subject  
**Location** = CenterX, CenterY  
**Radius** = ValueInPixels  
**Color** = HexColor  
**InitialAngle** = ValueInDegrees  
**LastAngle** = ValueInDegrees  
**Minimum** = Value  
**Maximum** = Value  
**Step** = Value  
**Layer** = LayerIndex

<font color="red">[Timetable]</font>  
**Location** = Left, Top  
**Width** = ValueInPixels  
**Height** = ValueInPixels  
**TransparentColor** = HexColor  
**Layer** = LayerIndex

<font color="red">Asuntos base</font>

{{% table-nonheader %}}

| true                     |
| ------------------------ |
| kmph, mph, ms            |
| mr, er, sap, bp, bc      |
| power, brake, rev, csc   |
| door, doorl*i*, doorr*i* |
| hour, min, sec           |
| ats*i*, atc              |

{{% /table-nonheader %}}

<font color="red">Subject suffixes</font>

{{% table-nonheader %}}

| d*i* |
| ---- |
|      |

{{% /table-nonheader %}}