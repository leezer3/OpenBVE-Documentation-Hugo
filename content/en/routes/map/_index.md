---
title: "The **BVE5 Map** route format"
linktitle: "The BVE5 Map format"
weight: 1
---

## ■ Contents

{{% contents %}}

- [1. Overview](#overview)
- [2. File Header](#header)
- [3. Curves](#curves)
- [4. Gradients](#gradients)
- [5. Other Tracks](#tracks)

{{% /contents %}}

## <a name="overview"></a>■ 1. Overview

This page describes the BVE5 / BVE6 map file format.

The file is a plain text file encoded in any arbitrary [encoding]({{< ref "/information/encodings/_index.md" >}}) as defined in the file header, however, UTF-8 with a byte order mark is the preferred choice.


## <a name="header"></a>■ 2. File Header

The first line of the Map file must be a header string in the following format:

{{% command %}}  
**BveTs Map 2.02**:*UTF-8*
{{% /command %}}

The header string consists of the file identifier **BveTs Map**, followed by the file format version- Versions up-to and including *2.02 * are supported.

Optionally, the header string may be followed by a **colon** and the textual name of the text-encoding necessary to read the file correctly.

{{% warning-nontitle %}}

BVE5 and BVE6 use the SHIFT_JIS encoding by default, but you should consider using UTF-8 for better compatability.

{{% /warning-nontitle %}}

## <a name="curves"></a>■ 3. Curves

{{% command %}}  
**Curve.SetGauge** (*ValueInMeters*)
{{% /command %}}

{{% command-arguments %}}  
***ValueInMeters***: A floating-point number representing the rail gauge, measured in **mmeters*. The default value is 1.435.  
{{% /command-arguments %}}

This command sets the gauge of the track, and is used when converting the **Cant** value to an absolute angle of rotation.

{{% command %}}  
**Curve.SetFunction** (*Function*)
{{% /command %}}

{{% command-arguments %}}  
***Function***: The type of interpolation to perform. 0- Half sine wave, 1- Linear
{{% /command-arguments %}}

This command sets the interpolation function used from this point onwards for the player's track.

{{% command %}}  
**Legacy.Curve** (*<font color=green>Radius</font>*; *CantInMeters*)
{{% /command %}}

{{% command-arguments %}}  
***<font color=green>Radius</font>***: A floating-point number representing the radius of the curve in **meters**. The default value is 0.  
***CantInMillimeters***: A floating-point number which represents the superelevation of a banked curve, measured in **meters**. The default value is 0.
{{% /command-arguments %}}

This command defines the radius of the curve for the player's rail from this point on.

Negative values for *Radius* indicate a curve to the left, positive ones to the right- The value of 0 represents straight track. 

The *CantInMeters* parameter defines the cant (superelevation) in meters. 

{{% warning-nontitle %}}

Note that unlike the other **Curve** commands, no interpolation is performed.

{{% /warning-nontitle %}}  
<br>

{{% command %}}  
**Curve.BeginTransition** ()
{{% /command %}}

This command sets the distance for the curve transition to begin if required to be different to that of the preceeding **Curve** command.
 

{{% command %}}  
**Curve.Begin** (*<font color=green>Radius</font>*; *CantInMeters*)
**Curve.Change** (*<font color=green>Radius</font>*; *CantInMeters*)
{{% /command %}}

{{% command-arguments %}}  
***<font color=green>Radius</font>***: A floating-point number representing the radius of the curve in **meters**. The default value is 0.  
***CantInMeters***: A optional floating-point number which represents the superelevation of a banked curve, measured in **meters**. The default value is 0.
{{% /command-arguments %}}

This command defines the radius of the curve for the player's rail from this point on. If the **CantInMillimeters** value is set, the cant is interpolated using the interpolation function set by *Curve.SetFunction* from the distance of the preceeding *Curve.BeginTransition* command, or the preceeding *Curve* command.

Negative values for *Radius* indicate a curve to the left, positive ones to the right- The value of 0 represents straight track. 

The *CantInMeters* parameter defines the cant (superelevation) in meters- If this parameter is used, a **Curve.BeginTransition** command must have been issued previously.

{{% command %}}  
**Curve.End** ()
{{% /command %}}

This command ends the current curve, and has the same effect as a **Curve.Begin(0,0)** command.

{{% command %}}  
**Curve.Interpolate** (*<font color=green>Radius</font>*; *CantInMeters*)
{{% /command %}}

{{% command-arguments %}}  
***<font color=green>Radius</font>***: An optional floating-point number representing the radius of the curve in **meters**. The default value is 0.  
***CantInMillimeters***: A oprional floating-point number which represents the superelevation of a banked curve, measured in **meters**. The default value is 0.
{{% /command-arguments %}}

This command defines the radius of the curve for the player's rail from this point on. The cant and radius are interpolated using the interpolation function set by *Curve.SetFunction* from the distance of any precceding *Curve* command.

Negative values for *Radius* indicate a curve to the left, positive ones to the right- The value of 0 represents straight track. 

The *CantInMeters* parameter defines the cant (superelevation) in meters- If this parameter is used, a **Curve.BeginTransition** command must have been issued previously.

If no arguments are specified, interpolation is enabled from this point onwards, using the radius and cant specified by the preceeding command.

## <a name="gradients"></a>■ 3. Gradients

{{% command %}}  
**Gradient.Begin** (*<font color=green>PerMille</font>*)
**Gradient.BeginConst** (*<font color=green>PerMille</font>)
{{% /command %}}

{{% command-arguments %}}  
***<font color=green>PerMille</font>***: A floating-point number representing the gradient in per mille (parts per thousand-  ‰)
{{% /command-arguments %}}

This command defines the base pitch of all rails from this point on. Negative values indicate a downward gradient, positive ones an upward gradient. The value of 0 represents a level track.

{{% command %}}  
**Gradient.End** ()
{{% /command %}}

This command ends the current gradient, and has the same effect as a **Gradient.Begin(0)** command.

{{% command %}}  
**Gradient.Interpolate** (*<font color=green>PerMille</font>)
{{% /command %}}

{{% command-arguments %}}  
***<font color=green>PerMille</font>***: A floating-point number representing the gradient in per mille (parts per thousand-  ‰)  
{{% /command-arguments %}}

This command defines the base gradient for all rails from this point on. The gradient is linearly interpolated from any preceeding *Gradient* command.

If no arguments are specified, interpolation is enabled from this point onwards, using the gradient specified by the preceeding command.

## <a name="tracks"></a>■ 3. Other Tracks

The Map format allows for an unlimited number of other tracks. Each track must be defined using a unique textual key, referred to here as *trackKey*

Please see the **Key** documentation for further details on validity rules for keys.

A track is implicitly started when a unique key is first used- If no position is defined, it will start at **0,0** relative to the player's rail.

{{% warning-nontitle %}}

Where two co-ordinates exist for a track at the same position, the first will be used, and the second ignored.

{{% /warning-nontitle %}}

{{% command %}}  
**Track[*trackKey*].Cant.SetGauge** (*ValueInMeters*)
**Track[*trackKey*].Gauge** (*ValueInMeters*)
{{% /command %}}

{{% command-arguments %}}  
***ValueInMeters***: A floating-point number representing the rail gauge, measured in **mmeters*. The default value is 1.435.  
{{% /command-arguments %}}

This command sets the gauge of the track, and is used when converting the **Cant** value to an absolute angle of rotation.

{{% command %}}  
**Track[*trackKey*].Cant.SetCenter** (*X*)
{{% /command %}}

{{% command-arguments %}}  
***X***: A floating-point number representing the rotational center offset of cant from the current distance.
{{% /command-arguments %}}

This command sets the rotational center offset for placed objects, and is used when converting the **Cant** value to an absolute angle of rotation.

{{% command %}}  
**Track[*trackKey*].SetFunction** (*Function*)
{{% /command %}}

{{% command-arguments %}}  
***Function***: The type of interpolation to perform. 0- Half sine wave, 1- Linear
{{% /command-arguments %}}

This command sets the interpolation function used from this point onwards for the track.

{{% command %}}  
**Track[*trackKey*].Position** (*X*, *Y*, *Radius*, *Pitch*)
{{% /command %}}

{{% command-arguments %}}  
***X***: An optional floating-point number, describing the track's X-coordinate, relative to the player's rail. The default value is 0.
***Y***: An optional floating-point number, describing the track's Y-coordinate, relative to the player's rail. The default value is 0.
***RadiusH***: An floating-point optional number, describing the track's curve radius, relative to that of the player's rail. The default value is 0.
***RadiusY***: An floating-point optional number, describing the track's pitch, relative to that of the player's rail. The default value is 0.
{{% /command-arguments %}}

This command sets the position, curve radius and pitch of the track at the current distance. Interpolation is performed to any preceeding *Track* command.

{{% command %}}  
**Track[*trackKey*].X.Interpolate** (*X*, *Radius*)
{{% /command %}}

{{% command-arguments %}}  
***X***: An optional floating-point number, describing the track's X-coordinate, relative to the player's rail. The default value is 0.
***RadiusH***: An floating-point optional number, describing the track's curve radius, relative to that of the player's rail. The default value is 0.
{{% /command-arguments %}}

This command sets the X position and curve radius of the track at the current distance. Interpolation is performed to any preceeding *Track* command, retaining the current Y value.

{{% command %}}  
**Track[*trackKey*].Y.Interpolate** (*Y*, *Radius*)
{{% /command %}}

{{% command-arguments %}}  
***Y***: An optional floating-point number, describing the track's Y-coordinate, relative to the player's rail. The default value is 0.
***RadiusH***: An floating-point optional number, describing the track's curve radius, relative to that of the player's rail. The default value is 0.
{{% /command-arguments %}}

This command sets the Y position and curve radius of the track at the current distance. Interpolation is performed to any preceeding *Track* command, retaining the current X value.

{{% command %}}  
**Track[*trackKey*].Cant.BeginTransition** ()
{{% /command %}}

This command sets the distance for the cant transition to begin, if required to be different to the preceeding **Track[*trackKey*].Cant** command.

{{% command %}}  
**Track[*trackKey*].Cant.Begin** (*ValueInMeters*)
{{% /command %}}

{{% command-arguments %}}  
***ValueInMeters***: A optional floating-point number which represents the superelevation of a banked curve, measured in **meters**. The default value is 0.
{{% /command-arguments %}}

This command defines the cant of the track from this point on, and is interpolated from the preceeding **Track[*trackKey*].Cant** command.

{{% command %}}  
**Track[*trackKey*].Cant.End** ()
{{% /command %}}

This command ends the current cant, and has the same effect as a **Track[*trackKey*].Cant(0)** command.

{{% command %}}  
**Track[*trackKey*].Cant.Interpolate** (*ValueInMeters*)
**Track[*trackKey*].Cant** (*ValueInMeters*)
{{% /command %}}

{{% command-arguments %}}  
***ValueInMeters***: A optional floating-point number which represents the superelevation of a banked curve, measured in **meters**. The default value is 0.
{{% /command-arguments %}}

This command defines the cant of the track from this point on, and is interpolated from the preceeding **Track[*trackKey*].Cant** command.