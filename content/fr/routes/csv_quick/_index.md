---
title: The **.csv** route format - Quick reference
hidden: true
---

**Notes:** 

- Arguments highlighted in **<font color="green">green</font>** are affected by Options.UnitOfLength.
- Arguments highlighted in **<font color="blue">blue</font>** are affected by Options.UnitOfSpeed.
- Optional suffixes are indicated in <font color="gray">gray</font>. Mandatory suffixes are **bolded**.
- Syntax variations are not possible with the $-directives.
- The statement separator is the , character.

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

<font color="red">Options namespace</font>  
**Options.UnitOfLength** *FactorInMeters<sub>1</sub>*; *FactorInMeters<sub>2</sub>*; *...*; *FactorInMeters<sub>n</sub>*  
**Options.UnitOfSpeed** *FactorInKmph*  
**Options.BlockLength** *<font color="green">Length</font>*  
**Options.ObjectVisibility** <font color="gray">{</font> **0** = legacy <font color="gray">|</font> **1** = track-based <font color="gray">}</font>  
**Options.SectionBehavior** <font color="gray">{</font> **0** = index-based <font color="gray">|</font> **1** = value-based <font color="gray">}</font>  
**Options.CantBehavior** <font color="gray">{</font> **0** = unsigned <font color="gray">|</font> **1** = signed <font color="gray">}</font>  
**Options.FogBehavior** <font color="gray">{</font> **0** = block-wise <font color="gray">|</font> **1** = interpolated <font color="gray">}</font>  
**Options.CompatibleTransparencyMode** <font color="gray">{</font> **0** = Specific Matching <font color="gray">|</font> **1** = Fuzzy Matching <font color="gray">}</font>  
**Options.EnableBveTsHacks** <font color="gray">{</font> **0** = Disabled <font color="gray">|</font> **1** = Enabled <font color="gray">}</font>

<font color="red">Route namespace</font>  
**Route.Comment** *Text*  
**Route.Image** *FileName*  
**Route.Timetable** *Text*  
**Route.Change** <font color="gray">{</font> **-1** = service brakes (ATS) <font color="gray">|</font> **0** = emergency brakes (no ATS) <font color="gray">|</font> **1** = service brakes (ATS) <font color="gray">}</font>  
**Route.Gauge** *ValueInMillimeters*  
__Route.Signal(__*Aspect*__)__<font color="gray">.Set</font> <font color="blue">*Speed*</font>  
**Route.RunInterval** *Interval<sub>0</sub>*; *Interval<sub>1</sub>*; ...; *Interval<sub>n-1</sub>*  
**Route.AccelerationDueToGravity** *Value*  
**Route.Elevation** *<font color="green">Height</font>*  
**Route.Temperature** *ValueInCelsius*  
**Route.Pressure** *ValueInKPa*  
**Route.DisplaySpeed** *UnitText*; *ConversionFactor*  
**Route.LoadingScreen** *Image*  
**Route.StartTime** *Time*  
**Route.DynamicLight** *Dynamic.xml*  
**Route.AmbientLight** *RedValue*; *GreenValue*; *BlueValue*  
**Route.DirectionalLight** *RedValue*; *GreenValue*; *BlueValue*  
**Route.LightDirection** *Theta*; *Phi*

<font color="red">Train namespace</font>  
**Train.Folder** *FolderName*  
**Train.File** *FolderName*  
__Train.Run(__*RailTypeIndex*__)__<font color="gray">.Set</font> *RunSoundIndex*  
__Train.Rail(__*RailTypeIndex*__)__<font color="gray">.Set</font> *RunSoundIndex*  
__Train.Flange(__*RailTypeIndex*__)__<font color="gray">.Set</font> *FlangeSoundIndex*  
__Train.Timetable(__*TimetableIndex*__).Day__<font color="gray">.Load</font> *FileName*  
__Train.Timetable(__*TimetableIndex*__).Night__<font color="gray">.Load</font> *FileName*  
**Train.Gauge** *ValueInMillimeters*  
**Train.Interval** *Interval<sub>0</sub>*; *Interval<sub>1</sub>*; ...; *Interval<sub>n-1</sub>*  
**Train.Velocity** *<font color="blue">Speed</font>*

<font color="red">Structure namespace</font>  
__Structure.Rail(__*RailStructureIndex*__)__<font color="gray">.Load</font> *FileName*  
__Structure.Ground(__*GroundStructureIndex*__)__<font color="gray">.Load</font> *FileName*  
__Structure.WallL(__*WallStructureIndex*__)__<font color="gray">.Load</font> *FileName*  
__Structure.WallR(__*WallStructureIndex*__)__<font color="gray">.Load</font> *FileName*  
__Structure.DikeL(__*DikeStructureIndex*__)__<font color="gray">.Load</font> *FileName*  
__Structure.DikeR(__*DikeStructureIndex*__)__<font color="gray">.Load</font> *FileName*  
__Structure.FormL(__*FormStructureIndex*__)__<font color="gray">.Load</font> *FileName*  
__Structure.FormR(__*FormStructureIndex*__)__<font color="gray">.Load</font> *FileName*  
__Structure.FormCL(__*FormStructureIndex*__)__<font color="gray">.Load</font> *FileName*  
__Structure.FormCR(__*FormStructureIndex*__)__<font color="gray">.Load</font> *FileName*  
__Structure.RoofL(__*RoofStructureIndex*__)__<font color="gray">.Load</font> *FileName*  
__Structure.RoofR(__*RoofStructureIndex*__)__<font color="gray">.Load</font> *FileName*  
__Structure.RoofCL(__*RoofStructureIndex*__)__<font color="gray">.Load</font> *FileName*  
__Structure.RoofCR(__*RoofStructureIndex*__)__<font color="gray">.Load</font> *FileName*  
__Structure.CrackL(__*CrackStructureIndex*__)__<font color="gray">.Load</font> *FileName*  
__Structure.CrackR(__*CrackStructureIndex*__)__<font color="gray">.Load</font> *FileName*  
__Structure.FreeObj(__*FreeObjStructureIndex*__)__<font color="gray">.Load</font> *FileName*  
__Structure.Beacon(__*BeaconStructureIndex*__)__<font color="gray">.Load</font> *FileName*  
__Structure.Pole(__*NumberOfAdditionalRails*__;__ *PoleStructureIndex*__)__<font color="gray">.Load</font> *FileName*

<font color="red">Texture namespace</font>  
__Texture.Background(__*BackgroundTextureIndex*__)__<font color="gray">.Load</font> *FileName* 
__Texture.Background(__*BackgroundTextureIndex*__).X__ *RepetitionCount*  
__Texture.Background(__*BackgroundTextureIndex*__).Aspect__ <font color="gray">{</font> **0** = fixed height <font color="gray">|</font> **1** = keep aspect ratio <font color="gray">}</font>

<font color="red">Cycle namespace</font>  
__Cycle.Ground(__*GroundStructureIndex*__)__<font color="gray">.Params</font> *GroundStructureIndex<sub>1</sub>*; *GroundStructureIndex<sub>2</sub>*; *...*; *GroundStructureIndex<sub>n</sub>*  
__Cycle.Rail(__*RailStructureIndex*__)__<font color="gray">.Params</font> *RailStructureIndex<sub>1</sub>*; *RailStructureIndex<sub>2</sub>*; *...*; *RailStructureIndex<sub>n</sub>*

<font color="red">Signal namespace</font>  
__Signal(__*SignalIndex*__)__<font color="gray">.Load</font> *AnimatedObjectFile*  
__Signal(__*SignalIndex*__)__<font color="gray">.Load</font> *SignalFileWithoutExtension*; *GlowFileWithoutExtension*

<font color="red">Track namespace</font>  
*Rails:*  
**Track.RailStart** *RailIndex*; *X*; *Y*; *RailStructureIndex*  
**Track.Rail** *RailIndex*; *X*; *Y*; *RailStructureIndex*  
**Track.RailType** *RailIndex*; *RailStructureIndex*  
**Track.RailEnd** *RailIndex*; *X*; *Y*  
**Track.Accuracy** *Value*  
**Track.Adhesion** *Value*

*Geometry:*  
**Track.Pitch** *ValueInPermille*  
**Track.Curve** *<font color="green">Radius</font>*; *CantInMillimeters*  
**Track.Turn** *Ratio*  
**Track.Height** *<font color="green">Height</font>*

*Objects:*  
**Track.FreeObj** *RailIndex*; *FreeObjStructureIndex*; *X*; *Y*; *Yaw*; *Pitch*; *Roll*  
**Track.Wall** *RailIndex*; *Direction*; *WallStructureIndex*  
**Track.WallEnd** *RailIndex*  
**Track.Dike** *RailIndex*; *Direction*; *DikeStructureIndex*  
**Track.DikeEnd** *RailIndex*  
**Track.Pole** *RailIndex*; *AdditionalRailsCovered*; *Location*; *Interval*; *PoleStructureIndex*  
**Track.PoleEnd** *RailIndex*  
**Track.Crack** *RailIndex<sub>1</sub>*; *RailIndex<sub>2</sub>*; *CrackStructureIndex*  
**Track.Ground** *CycleIndex*

*Stations:*  
**Track.Sta** *Name*; *ArrivalTime*; *DepartureTime*; *PassAlarm*; *Doors*; *ForcedRedSignal*; *System*; *ArrivalSound*; *StopDuration*; *PassengerRatio*; *DepartureSound*; *TimetableIndex*  
**Track.Station** *Name*; *ArrivalTime*; *DepartureTime*; *ForcedRedSignal*; *System*; *DepartureSound*  
**Track.Stop** *Direction*; *<font color="green">BackwardTolerance</font>*; *<font color="green">ForwardTolerance</font>*; *Cars*  
**Track.Form** *RailIndex<sub>1</sub>*; *RailIndex<sub>2</sub>*; *RoofStructureIndex*; *FormStructureIndex*

*Signalling and speed limits:*  
**Track.Limit** *<font color="blue">Speed</font>*; *Direction*; *Cource*  
**Track.Section** *Aspect<sub>0</sub>*; *Aspect<sub>1</sub>*; *...*; *Aspect<sub>n</sub>*  
**Track.SigF** *SignalIndex*; *Section*; *X*; *Y*; *Yaw*; *Pitch*; *Roll*  
**Track.Sig** *Aspects*; ~~*<font color="gray">Unused</font>*~~; *X*; *Y*; *Yaw*; *Pitch*; *Roll*  
**Track.Signal** *Aspects*; ~~*<font color="gray">Unused</font>*~~; *X*; *Y*; *Yaw*; *Pitch*; *Roll*  
**Track.Relay** *X*; *Y*; *Yaw*; *Pitch*; *Roll* 

*Safety systems:*  
**Track.Beacon** *Type*; *BeaconStructureIndex*; *Section*; *Data*; *X*; *Y*; *Yaw*; *Pitch*; *Roll*  
**Track.Transponder** *Type*; *Signals*; *SwitchSystems*; *X*; *Y*; *Yaw*; *Pitch*; *Roll*  
**Track.AtsSn**  
**Track.AtsP**  
**Track.Pattern** *Type*; *<font color="blue">Speed</font>*  
**Track.PLimit** *<font color="blue">Speed</font>*

*Miscellaneous:*  
**Track.Back** *BackgroundTextureIndex*  
**Track.Fog** *<font color="green">StartingDistance</font>*; *<font color="green">EndingDistance</font>*; *RedValue*; *GreenValue*; *BlueValue*  
**Track.Brightness** *Value*  
**Track.Marker** *FileName*; *<font color="green">Distance</font>*  
**Track.PointOfInterest** *RailIndex*; *X*; *Y*; *Yaw*; *Pitch*; *Roll*; *Text*  
**Track.PreTrain** *Time*  
**Track.Announce** *FileName*; *<font color="blue">Speed</font>*  
**Track.Doppler** *FileName*; *X*; *Y*  
**Track.Buffer**