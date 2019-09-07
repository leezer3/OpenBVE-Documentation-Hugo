---
title: The **.rw** route format - Quick reference
hidden: true
---

**Notes:** 

- Arguments highlighted in **<font color="green">green</font>** are affected by UnitOfLength in [Options].
- Arguments highlighted in **<font color="blue">blue</font>** are affected by UnitOfSpeed in [Options].
- Each command takes one line, except for commands starting in an @ sign, which can be chained together on the same line.

---

<font color="red">Track positions</font>  
*<font color="green">Number</font>*  
*<font color="green">Number<sub>1</sub></font>* : *<font color="green">Number<sub>2</sub></font>* : *...* : *<font color="green">Number<sub>n</sub></font>*

<font color="red">Preprocessing directives</font>  
__$Include(__*File<sub>1</sub>*; *Weight<sub>1</sub>*; *File<sub>2</sub>*; *Weight<sub>2</sub>*; ...__)__  
__$Chr(__*AsciiCode*__)__  
__$Rnd(__*Minimum***;** *Maximum*__)__  
__$Sub(__*VariableIndex*__)__ = *Value*  
__$Sub(__*VariableIndex*__)__  
__$If(__*Condition*__)__  
**$ElseIf**()  
**$EndIf**()

<font color="red">[Options]</font>  
**UnitOfLength** = *FactorInMeters<sub>1</sub>*; *FactorInMeters<sub>2</sub>*; *...*; *FactorInMeters<sub>n</sub>*  
**UnitOfSpeed** = *FactorInKmph*  
**BlockLength** = *<font color="green">Length</font>*  
**ObjectVisibility** = <font color="gray">{</font> **0** = legacy <font color="gray">|</font> **1** = track-based <font color="gray">}</font>  
**SectionBehavior** = <font color="gray">{</font> **0** = index-based <font color="gray">|</font> **1** = value-based <font color="gray">}</font>  
**CantBehavior** = <font color="gray">{</font> **0** = unsigned <font color="gray">|</font> **1** = signed <font color="gray">}</font>  
**FogBehavior** = <font color="gray">{</font> **0** = block-wise <font color="gray">|</font> **1** = interpolated <font color="gray">}</font>  

<font color="red">[Route]</font>  
**Comment** = *Text*  
**Image** = *FileName*  
**Timetable** = *Text*  
**Change** = <font color="gray">{</font> **-1** = service brakes (ATS) <font color="gray">|</font> **0** = emergency brakes (no ATS) <font color="gray">|</font> **1** = service brakes (ATS) <font color="gray">}</font>  
**Gauge** = *ValueInMillimeters*  
__Route.Signal(__*Aspect*__)__ = <font color="blue">*Speed*</font>  
**RunInterval** = *Interval<sub>0</sub>*; *Interval<sub>1</sub>*; ...; *Interval<sub>n-1</sub>*  
**AccelerationDueToGravity** = *Value*  
**Elevation** = *<font color="green">Height</font>*  
**Temperature** = *ValueInCelsius*  
**Pressure** = *ValueInKPa*  
**AmbientLight** = *RedValue*; *GreenValue*; *BlueValue*  
**DirectionalLight** = *RedValue*; *GreenValue*; *BlueValue*  
**LightDirection** = *Theta*; *Phi*

<font color="red">[Train]</font>  
**Folder** = *FolderName*  
__Run(__*RailTypeIndex*__)__ = *RunSoundIndex*  
__Rail(__*RailTypeIndex*__)__ = *RunSoundIndex*  
__Flange(__*RailTypeIndex*__)__ = *FlangeSoundIndex*  
__Timetable(__*TimetableIndex*__).Day__ = *FileName*  
__Timetable(__*TimetableIndex*__).Night__ = *FileName*  
**Gauge** = *ValueInMillimeters*  
**Interval** = *Interval<sub>0</sub>*; *Interval<sub>1</sub>*; ...; *Interval<sub>n-1</sub>*  
**Velocity** = *<font color="blue">Speed</font>*

<font color="red">[Object]</font>  
__Rail(__*RailStructureIndex*__)__ = *FileName*  
__Beacon(__*BeaconStructureIndex*__)__ = *FileName*  
__Pole(__*NumberOfAdditionalRails*__;__ *PoleStructureIndex*__)__ = *FileName*  
__Ground(__*GroundStructureIndex*__)__ = *FileName*  
__WallL(__*WallStructureIndex*__)__ = *FileName*  
__WallR(__*WallStructureIndex*__)__ = *FileName*  
__DikeL(__*DikeStructureIndex*__)__ = *FileName*  
__DikeR(__*DikeStructureIndex*__)__ = *FileName*  
__FormL(__*FormStructureIndex*__)__ = *FileName*  
__FormR(__*FormStructureIndex*__)__ = *FileName*  
__FormCL(__*FormStructureIndex*__)__ = *FileName*  
__FormCR(__*FormStructureIndex*__)__ = *FileName*  
__RoofL(__*RoofStructureIndex*__)__ = *FileName*  
__RoofR(__*RoofStructureIndex*__)__ = *FileName*  
__RoofCL(__*RoofStructureIndex*__)__ = *FileName*  
__RoofCR(__*RoofStructureIndex*__)__ = *FileName*  
__CrackL(__*CrackStructureIndex*__)__ = *FileName*  
__CrackR(__*CrackStructureIndex*__)__ = *FileName*  
__FreeObj(__*FreeObjStructureIndex*__)__ = *FileName*  
__Back(__*BackgroundTextureIndex*__)__ = *FileName*  
__Back(__*BackgroundTextureIndex*__).X__ = *RepetitionCount*  
__Back(__*BackgroundTextureIndex*__).Aspect__ <font color="gray">{</font> **0** = fixed height <font color="gray">|</font> **1** = keep aspect ratio <font color="gray">}</font>

<font color="red">[Cycle]</font>  
*GroundStructureIndex* = *GroundStructureIndex<sub>1</sub>*; *GroundStructureIndex<sub>2</sub>*; *...*; *GroundStructureIndex<sub>n</sub>*  

<font color="red">[Signal]</font>  
*SignalIndex* = *AnimatedObjectFile*  
*SignalIndex* = *SignalFileWithoutExtension*; *GlowFileWithoutExtension*

<font color="red">[Railway]</font>  

*Rails:*  
**@RailStart**(*RailIndex*; <font color="green">*X*</font>; <font color="green">*Y*</font>; *RailStructureIndex*)  
**@Rail**(*RailIndex*; <font color="green">*X*</font>; <font color="green">*Y*</font>; *RailStructureIndex*)  
**@RailType**(*RailIndex*; *RailStructureIndex*)  
**@RailEnd**(*RailIndex*; <font color="green">*X*</font>; <font color="green">*Y*</font>)  
**@Accuracy**(*Value*)  
**@Adhesion**(*Value*)

*Geometry:*  
**@Pitch**(*ValueInPermille*)  
**@Curve**(*<font color="green">Radius</font>*; *CantInMillimeters*)  
**@Turn**(*Ratio*)  
**@Height**(*<font color="green">Height</font>*)  

*Objects:*  
**@FreeObj**(*RailIndex*; *FreeObjStructureIndex*; <font color="green">*X*</font>; <font color="green">*Y*</font>; *Yaw*; *Pitch*; *Roll*)  
**@Wall**(*RailIndex*; *Direction*; *WallStructureIndex*)  
**@WallEnd**(*RailIndex*)  
**@Dike**(*RailIndex*; *Direction*; *DikeStructureIndex*)  
**@DikeEnd**(*RailIndex*)  
**@Pole**(*RailIndex*; *AdditionalRailsCovered*; *Location*; *Interval*; *PoleStructureIndex*)  
**@PoleEnd**(*RailIndex*)  
**@Crack**(*RailIndex<sub>1</sub>*; *RailIndex<sub>2</sub>*; *CrackStructureIndex*)  
**@Ground**(*CycleIndex*)  

*Stations:*  
**@Sta**(*Name*; *ArrivalTime*; *DepartureTime*; *PassAlarm*; *Doors*; *ForcedRedSignal*; *System*; *ArrivalSound*; *StopDuration*; *PassengerRatio*; *DepartureSound*; *TimetableIndex*)  
**@Station**(*Name*; *ArrivalTime*; *DepartureTime*; *ForcedRedSignal*; *System*; *DepartureSound*)  
**@Stop**(*Direction*; *<font color="green">BackwardTolerance</font>*; *<font color="green">ForwardTolerance</font>*; *Cars*)  
**@Form**(*RailIndex<sub>1</sub>*; *RailIndex<sub>2</sub>*; *RoofStructureIndex*; *FormStructureIndex*)  

*Signalling and speed limits:*  
**@Limit**(*<font color="blue">Speed</font>*; *Direction*; *Cource*)  
**@Section**(*Aspect<sub>0</sub>*; *Aspect<sub>1</sub>*; *...*; *Aspect<sub>n</sub>*)  
**@SigF**(*SignalIndex*; *Section*; <font color="green">*X*</font>; <font color="green">*Y*</font>; *Yaw*; *Pitch*; *Roll*)  
**@Signal**(*Aspects*; ~~*<font color="gray">Unused</font>*~~; <font color="green">*X*</font>; <font color="green">*Y*</font>; *Yaw*; *Pitch*; *Roll*)  
**@Relay**(<font color="green">*X*</font>; <font color="green">*Y*</font>; *Yaw*; *Pitch*; *Roll*) 

*Safety systems:*  
**@Beacon**(*Type*; *BeaconStructureIndex*; *Section*; *Data*; <font color="green">*X*</font>; <font color="green">*Y*</font>; *Yaw*; *Pitch*; *Roll*)  
**@Transponder**(*Type*; *Signals*; *SwitchSystems*; <font color="green">*X*</font>; <font color="green">*Y*</font>; *Yaw*; *Pitch*; *Roll*)  
**@AtsSn**  
**@AtsP**  
**@Pattern**(*Type*; *<font color="blue">Speed</font>*)  
**@PLimit**(*<font color="blue">Speed</font>*)

*Miscellaneous:*  
**@Back**(*BackgroundTextureIndex*)  
**@Fog**(*<font color="green">StartingDistance</font>*; *<font color="green">EndingDistance</font>*; *RedValue*; *GreenValue*; *BlueValue*)  
**@Brightness**(*Value*)  
**@Marker**(*FileName*; *<font color="green">Distance</font>*)  
**@PointOfInterest**(*RailIndex*; <font color="green">*X*</font>; <font color="green">*Y*</font>; *Yaw*; *Pitch*; *Roll*; *Text*)  
**@PreTrain**(*Time*)  
**@Announce**(*FileName*; *<font color="blue">Speed</font>*)  
**@Doppler**(*FileName*; <font color="green">*X*</font>; <font color="green">*Y*</font>)  
**@Buffer**
