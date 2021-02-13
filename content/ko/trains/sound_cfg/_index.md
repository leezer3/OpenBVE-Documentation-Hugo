---
title: "The **sound.cfg** file format"
linktitle: "The sound.cfg file"
weight: 7
---

## ■ Contents

{{% contents %}}

- [1. Overview](#overview)
- [2. Syntax](#syntax)
- [3. Content of the file](#content)

{{% /contents %}}

## <a name="overview"></a>■ 1. Overview

The sound.cfg file allows to reference which sound files should be used, how they are called and where they are located relative to the train folder.

The sound.cfg file is a plain text file encoded in any arbitrary  [encoding]({{< ref "/information/encodings/_index.md" >}}), however, UTF-8 with a byte order mark is the preferred choice. The [parsing model]({{< ref "/information/numberformats/_index.md" >}}) for numbers is **Strict**. The file is required to be located inside the train folder and is expected to be named **sound.cfg**. The file is interpreted on a per-line basis, from top to bottom.

➟ [See also the quick reference for the sound.cfg...]({{< ref "/trains/sound_cfg_quick/_index.md" >}})

## <a name="syntax"></a>■ 2. Syntax

Each line in the file can be empty (or solely consist of white spaces) and will be ignored, can mark the beginning of a new section or contain key-value pairs inside a section. All key-value pairs relate to the last section opened.

A new section is opened by starting the line with an opening bracket (U+005B) and ending it with a closing bracket (U+005D). The text in-between the brackets indicates the name of the section and is case-insensitive. White spaces at the beginning and the end of the line are ignored, as well as at the beginning and the end of the name of the section. Thus, the beginning of the section has the following form:

{{% command %}}   
[NameOfTheSection]  
{{% /command %}}

A key-value pair is indicated by giving the key, an equals sign (U+003D) and then the value. The key is case-insensitive. White spaces at the beginning and the end of the line are ignored, as well as in front and after the equals sign. Alternatively, white spaces surrounding the key and the value are ignored. Thus, a key-value pair as the following form:

{{% command %}}   
NameOfTheKey = Value  
{{% /command %}}

You can use comments anywhere at the end of a line. A comment is started by a semicolon (U+003B). Comments, if present, are stripped away from all lines before these are processed.

## <a name="content"></a> ■ 3. Content of the file

The first line in the file is required to be the following:

{{% command %}}  
Version 1.0  
{{% /command %}}

Following the version line, these are the sections that can be used and their key-value pairs. In all key-value pairs, the parameter *FileName* corresponds to the file name of the sound to reference, relative to the train folder.

---

##### ● [Run]

{{% command %}}  
*Index* = *FileName*  
{{% /command %}}  
Assigns a run sound. The non-negative integer *Index* represents the type of run sound to use. Route developers can choose which run sound to play for a given piece of track. Please see the page about [standards]({{< ref "/information/standards/_index.md" >}}) for further information.

The sound is played at a pitch proportional to the speed. The recording should correspond to a speed of 90 km/h.

------

##### ● [Flange]

{{% command %}}   
Index = *FileName*  
{{% /command %}}  
Assigns a flange sound. The non-negative integer *Index* represents the type of flange sound to use. Route developers can choose which flange sound to play for a given piece of track. Please see the page about [standards]({{< ref "/information/standards/_index.md" >}}) for further information.

The sound is played at a pitch proportional to the speed. The recording should correspond to a speed of 45 km/h.

------

##### ● [Motor]

{{% command %}}  
Index = *FileName*  
{{% /command %}}  
Assigns a motor sound. The non-negative integer *Index* represents the index of the motor sound that can be referenced in the #MOTOR\_*Xn* sections of the train.dat. Please see the documentation for the [train.dat]({{< ref "/trains/train_dat/_index.md" >}})  for more information.

------

##### ● [Switch]   

{{% command %}}  
Index = *FileName*  
{{% /command %}}  
Assigns a switch sound- These are played once per axle when the train crosses a block containing pointwork. The non-negative integer *Index* represents the type of switch sound to use. Route developers can choose which flange sound to play for a given piece of track. Please see the page about [standards]({{< ref "/information/standards/_index.md" >}}) for further information. 

------

##### ● [Brake]

{{% command %}}  
BC Release High = *FileName*  
{{% /command %}}  
Played occasionally when the pressure in the brake cylinder is decreased from a high value.

{{% command %}}   
BC Release = *FileName*  
{{% /command %}}  
Played occasionally when the pressure in the brake cylinder is decreased from a non-high value to a non-zero value.

{{% command %}}   
BC Release Full = *FileName*  
{{% /command %}}  
Played occasionally when the pressure in the brake cylinder is decreased to zero value.

{{% command %}}  
Emergency = *FileName*  
{{% /command %}}  
Played once when the emergency brakes are activated.

{{% command %}}  
BP Decomp = *FileName*  
{{% /command %}}  
For trains with automatic air brake, is played when the handle is moved into the SRV or EMG position. For other trains, is played when the brake notch is decreased.

------

##### ● [Compressor]

{{% command %}}  
Attack = *FileName*  
{{% /command %}}  
Played once when the air compressor is activated.

{{% command %}}  
Loop = *FileName*  
{{% /command %}}  
Played in a loop for the duration the air compressor is active.

{{% command %}}  
Release = *FileName*  
{{% /command %}}  
Played once when the air compressor is deactivated.

------

##### ● [Suspension]

{{% command %}}  
Left = *FileName*  
{{% /command %}}  
Played occasionally when the train sways to the left side.

{{% command %}}  
Right = *FileName*  
{{% /command %}}  
Played occasionally when the train sways to the right side.

------

##### ● [Horn]

There are two possible types of horn which may be defined via a *[Horn]* section- 'Looped Horns' and 'Legacy Horns'  

<font color="gray">***Looped Horns***</font>

A looped horn is made up of three components:  
A start sound, a loop sound and an end sound.  
The start sound is played once, followed by the loop sound for the duration of the keypress. When the horn key is released, the end sound will be played once.

{{% command %}}  
PrimaryStart = *FileName*  
SecondaryStart = *FileName*   
MusicStart = *FileName*  
{{% /command %}}  
Played once when the given horn is applied.

{{% command %}}  
PrimaryLoop = *FileName*  
SecondaryLoop = *FileName*  
MusicLoop = *FileName*  
{{% /command %}}  
Played in a loop whilst the given horn is active.

{{% command %}}  
PrimaryEnd = *FileName*  
SecondaryEnd = *FileName*  
MusicEnd = *FileName*  
{{% /command %}}  
Played once when the given horn is released.​    

<font color="gray"> ***Legacy Horns***</font>

A legacy horn is made up of a single sound. 

{{% command %}}  
Primary = *FileName*  
{{% /command %}}  
Played once whilst the primary horn is active.

{{% command %}}  
Secondary = *FileName*  
{{% /command %}}  
Played once whilst the secondary horn is active.

{{% command %}}  
Music = *FileName*  
{{% /command %}}  
Played in a continuous loop whilst the music horn is active.  

------

##### ● [Door]

{{% command %}}  
Open Left = *FileName*  
{{% /command %}}  
Played once when the left doors open.

{{% command %}}  
Open Right = *FileName*  
{{% /command %}}  
Played once when the right doors open.

{{% command %}}  
Close Left = *FileName*  
{{% /command %}}  
Played once when the left doors close.

{{% command %}}  
Close Right = *FileName*  
{{% /command %}}  
Played once when the right doors close.

------

##### ● [Ats]

{{% command %}}  
*Index* = *FileName*  
{{% /command %}}  
Assigns a plugin sound. The non-negative integer *Index* represents the sound index. Train plugin developers can choose which sound to play. The assignment of sounds needs to be coordinated with the plugin developer.

------

##### ● [Buzzer]

{{% command %}}  
Correct = *FileName*   
{{% /command %}}  
Played once when the train stops at a station, but needs to correct its stop position.

------

##### ● [Pilot Lamp]

{{% command %}}  
On = *FileName*  
{{% /command %}}  
Played once as soon as the doors have closed and the train is ready for departure.

{{% command %}}  
Off = *FileName*  
{{% /command %}}  
Played once as soon as the doors start to open.

------

##### ● [Brake Handle]

{{% command %}}  
Apply = *FileName*  
{{% /command %}}  
Played once when the brake notch is increased to any value below the emergency brake position.

{{% command %}}  
ApplyFast = *FileName*  
{{% /command %}}  
Played once for each notch when the brake notch is increased in a continuous motion to any value below the emergency brake position.

{{% command %}}  
Release = *FileName*  
{{% /command %}}  
Played once when the brake notch is increased in a continuous motion to any value below the emergency brake position.

{{% command %}}  
ReleaseFast = *FileName*  
{{% /command %}}  
Played once for each notch when the brake notch is decreased in a continuous motion to any value above brake notch zero.

{{% command %}}  
Min = *FileName*  
{{% /command %}}  
Played once when the brake notch is decreased to brake notch zero.

{{% command %}}  
Max = *FileName*  
{{% /command %}}  
Played once when the emergency brakes are applied.

{{% note %}}

If the **ApplyFast** sound is not present, then the **Apply** sound will be played instead.
Similarly, if **ReleaseFast** is not present, then **Release** will be played instead.

{{% /note %}}

------

##### ● [Master Controller]

{{% command %}}  
Up = *FileName*  
{{% /command %}}  
Played once when the power notch is increased to any value below the maximum power notch.

{{% command %}}  
UpFast = *FileName*  
{{% /command %}}  
Played once for each notch when the power notch is increased in a single continuous motion to any value below the maximum power notch.

{{% command %}}  
Down = *FileName*  
{{% /command %}}  
Played once when the power notch is decreased to any value above power notch 0.

{{% command %}}  
DownFast = *FileName*  
{{% /command %}}  
Played once for each notch when the power notch is decreased in a single continuous motion to any value above power notch 0.

{{% command %}}  
Min = *FileName*  
{{% /command %}}  
Played once when the power notch is decreased to brake notch zero.

{{% command %}}  
Max = *FileName*  
{{% /command %}}  
Played once when the power notch is increased to the maximum power notch.

{{% note %}}

If the **UpFast** sound is not present, then the **Up** sound will be played instead.
Similarly, if **DownFast** is not present, then **Down** will be played instead.

{{% /note %}}

------

##### ● [Reverser]

{{% command %}}  
On = *FileName*  
{{% /command %}}  
Played once when the reverser is moved into any non-neutral position.

{{% command %}}  
Off = *FileName*  
{{% /command %}}  
Played once when the reverser is moved into the neutral position.

------

##### ● [Breaker]

{{% command %}}  
On = *FileName*  
{{% /command %}}  
Played once when power is resumed (was interrupted before). There is a series of circumstances when that can happen, for example when moving from power notch zero to power notch one, assuming the reverser is non-neutral and the brakes are released. It can also happen when the power notch is already non-zero, but the reverser or brakes previously interrupted the power. The safety systems can also interrupt power.

{{% command %}}  
Off = *FileName*  
{{% /command %}}  
Played once when power is interrupted or resumed. There is a series of circumstances when that can happen, for example when moving from power notch zero to power notch one, or vice versa, assuming the reverser is non-neutral and the brakes are released. The safety systems can also interrupt power.

##### ● [Windscreen]

{{% command %}}  
RainDrop = *FileName*  
{{% /command %}}  
Played when a rain drop hits the windscreen.

{{% command %}}  
WetWipe = *FileName*  
{{% /command %}}  
Played when the wiper moves with more than 20% of the available drops visible.

{{% command %}}  
DryWipe = *FileName*  
{{% /command %}}  
Played when the wiper moves with less than 20% of the available drops visible.

{{% command %}}  
Switch = *FileName*  
{{% /command %}}  
Played when the wiper switch is moved.

------

##### ● [Others]

{{% command %}}  
Noise = *FileName*  
{{% /command %}}  
Played in a loop all the time for the duration of the simulation.

{{% command %}}  
Shoe = *FileName*  
{{% /command %}}  
Played in a loop when the brake shoe rubs against the wheels. The sound is played at a pitch inversely proportional to the speed, and the volume of the sound decreases with increasing speeds.

{{% command %}}  
Halt = *FileName*  
{{% /command %}}  
Played once or in a loop (depending on the train.dat setting) when the pass alarm system warns about an approaching station stop.
