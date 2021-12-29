---
title: "El formato de objeto **.csv** - Referencia rápida"
hidden: true
---

**Notas:** 

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
**$Include**(*File<sub>1</sub>*; *Weight<sub>1</sub>*; *File<sub>2</sub>*; *Weight<sub>2</sub>*; ...)  
**$Chr**(*AsciiCode*)  
**$Rnd**(*Minimum*; *Maximum*)  
**$Sub**(*VariableIndex*) = *Value*  
**$Sub**(*VariableIndex*)  
**$If**(*Condition*)  
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
**Route.Signal**(*Aspect*)<font color="gray">.Set</font> <font color="blue">*Speed*</font>  
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
**Train.Run**(*RailTypeIndex*)<font color="gray">.Set</font> *RunSoundIndex*  
**Train.Rail**(*RailTypeIndex*)<font color="gray">.Set</font> *RunSoundIndex*  
**Train.Flange**(*RailTypeIndex*)<font color="gray">.Set</font> *FlangeSoundIndex*  
**Train.Timetable**(*TimetableIndex*)**.Day**<font color="gray">.Load</font> *FileName*  
**Train.Timetable**(*TimetableIndex*)**.Night**<font color="gray">.Load</font> *FileName*  
**Train.Gauge** *ValueInMillimeters*  
**Train.Interval** *Interval<sub>0</sub>*; *Interval<sub>1</sub>*; ...; *Interval<sub>n-1</sub>*  
**Train.Velocity** *<font color="blue">Speed</font>*

<font color="red">Structure namespace</font>  
**Structure.Rail**(*RailStructureIndex*)<font color="gray">.Load</font> *FileName*  
**Structure.Ground**(*GroundStructureIndex*)<font color="gray">.Load</font> *FileName*  
**Structure.WallL**(*WallStructureIndex*)<font color="gray">.Load</font> *FileName*  
**Structure.WallR**(*WallStructureIndex*)<font color="gray">.Load</font> *FileName*  
**Structure.DikeL**(*DikeStructureIndex*)<font color="gray">.Load</font> *FileName*  
**Structure.DikeR**(*DikeStructureIndex*)<font color="gray">.Load</font> *FileName*  
**Structure.FormL**(*FormStructureIndex*)<font color="gray">.Load</font> *FileName*  
**Structure.FormR**(*FormStructureIndex*)<font color="gray">.Load</font> *FileName*  
**Structure.FormCL**(*FormStructureIndex*)<font color="gray">.Load</font> *FileName*  
**Structure.FormCR**(*FormStructureIndex*)<font color="gray">.Load</font> *FileName*  
**Structure.RoofL**(*RoofStructureIndex*)<font color="gray">.Load</font> *FileName*  
**Structure.RoofR**(*RoofStructureIndex*)<font color="gray">.Load</font> *FileName*  
**Structure.RoofCL**(*RoofStructureIndex*)<font color="gray">.Load</font> *FileName*  
**Structure.RoofCR**(*RoofStructureIndex*)<font color="gray">.Load</font> *FileName*  
**Structure.CrackL**(*CrackStructureIndex*)<font color="gray">.Load</font> *FileName*  
**Structure.CrackR**(*CrackStructureIndex*)<font color="gray">.Load</font> *FileName*  
**Structure.FreeObj**(*FreeObjStructureIndex*)<font color="gray">.Load</font> *FileName*  
**Structure.Beacon**(*BeaconStructureIndex*)<font color="gray">.Load</font> *FileName*  
**Structure.Pole**(*NumberOfAdditionalRails*; *PoleStructureIndex*)<font color="gray">.Load</font> *FileName*

<font color="red">Texture namespace</font>  
**Texture.Background**(*BackgroundTextureIndex*)<font color="gray">.Load</font> *FileName*  
**Texture.Background**(*BackgroundTextureIndex*)**.X** *RepetitionCount*  
**Texture.Background**(*BackgroundTextureIndex*)**.Aspect** <font color="gray">{</font> **0** = fixed height <font color="gray">|</font> **1** = keep aspect ratio <font color="gray">}</font>

<font color="red">Cycle namespace</font>  
**Cycle.Ground**(*GroundStructureIndex*)<font color="gray">.Params</font> *GroundStructureIndex<sub>1</sub>*; *GroundStructureIndex<sub>2</sub>*; *...*; *GroundStructureIndex<sub>n</sub>*  
**Cycle.Rail**(*RailStructureIndex*)<font color="gray">.Params</font> *RailStructureIndex<sub>1</sub>*; *RailStructureIndex<sub>2</sub>*; *...*; *RailStructureIndex<sub>n</sub>*

<font color="red">Signal namespace</font>  
**Signal**(*SignalIndex*)<font color="gray">.Load</font> *AnimatedObjectFile*  
**Signal**(*SignalIndex*)<font color="gray">.Load</font> *SignalFileWithoutExtension*; *GlowFileWithoutExtension*

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

*Estaciones:*  
**Track.Sta** *Nombre*; *TiempoLlegada*; *TiempoPartida*; *PassAlarm*; *Puertas*; *SeñalRojaForzada*; *Sistema*; *SonidoLlegada*; *DuraciónParada*; *TasaPasajeros*; *SonidoPartida*; *IndiceItinerario*  
**Track.Station** *Nombre*; *SonidoLlegada*; *TiempoPartida*; *SeñalRojaForzada*; *Sistema*; *SonidoPartida*  
**Track.Stop** *Dirección*; *<font color="green">ToleranciaTrasera</font>*; *<font color="green">ToleranciaDelantera</font>*; *Carros*  
**Track.Form** *IndiceVía<sub>1</sub>*; *IndiceVía<sub>2</sub>*; *IndiceEstructuraTecho*; *IndiceEstructuraForma*

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