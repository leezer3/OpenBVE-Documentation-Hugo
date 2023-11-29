---
title: "The **panel2.cfg** file format - Quick reference"
hidden: true
---

<font color="red">[This]</font>  
**Resolution** = Value  
**Left** = Value  
**Right** = Value  
**Top** = Value  
**Bottom** = Value  
**DaytimeImage** = FileName  
**NighttimeImage** = FileName  
**TransparentColor** = HexColor  
**Center** = X, Y  
**Origin** = X, Y

<font color="red">[PilotLamp]</font>  
**Subject** = Subject  
**Location** = Left, Top  
**DaytimeImage** = FileName  
**NighttimeImage** = FileName  
**TransparentColor** = HexColor  
**Layer** = LayerIndex

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

<font color="red">Base subjects</font>

{{% table-nonheader %}}

| Always returns 1. This is useful for the *PilotLamp* element in order to always show the associated bitmap.                     |
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

| With d0 for the ones, d1 for the tens, d2 for the hundreds, etc., this suffix returns a value between 0 and 9 corresponding to the respective digit of the underlying subject, but only if the value of the subject is less than 10 for d1, less than 100 for d2, etc., otherwise this suffix returns 10. |
| ---- |
|      |

{{% /table-nonheader %}}