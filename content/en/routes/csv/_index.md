---
title: "The **.csv** route format"
linktitle: "The CSV route"
weight: 1
---

➟ [Quick reference...]({{< ref "/routes/csv_quick/_index.md" >}}) 

{{% warning %}}

#### Still under construction

Commands that still require documentation: **2**

{{% /warning %}}

## ■ Contents

{{% contents %}}

- [1. Overview](#overview)
- [2. Syntax](#syntax)
- [3. Preprocessing](#preprocessing)
- [4. The Options namespace](#options)
- [5. The Route namespace](#route)
- [6. The Train namespace](#train)
- [7. The Structure namespace](#structure)
- [8. The Texture namespace](#texture)
- [9. The Cycle namespace](#cycle)
- [10. The Signal namespace](#signal)
- [11. The Track namespace](#track)
  - [11.1. Rails](#track_rails)
  - [11.2. Geometry](#track_geometry)
  - [11.3. Objects](#track_objects)
  - [11.4. Stations](#track_stations)
  - [11.5. Signalling and speed limits](#track_signalling)
  - [11.6. Safety systems](#track_safety)
  - [11.7. Miscellaneous](#track_misc)

{{% /contents %}}

## <a name="overview"></a>■ 1. Overview

A CSV route allows to create a route in a text file.

The file is a plain text file encoded in any arbitrary [encoding]({{< ref "/information/encodings/_index.md" >}}), however, UTF-8 with a byte order mark is the preferred choice. The [parsing model]({{< ref "/information/numberformats/_index.md" >}}) for numbers is **Loose** (unless otherwise stated), however, you are encouraged to produce *Strict* output nonetheless. The file is required to be located inside any folder whose current or parent folder includes the *Railway* and *Train* folders. The file name is arbitrary, but must have the extension **.csv**. The file is interpreted on a per-line basis, from top to bottom, where each line is split into expressions, which are interpreted from left to right.

The route file consists of a series of commands to define the objects which are used throughout the route (Structure namespace). Additional properties for the route, for the default train to be used and for the background images to be used can also be defined. At last, the route file will contain instructions from the Track namespace. Here, track positions (usually in meters) are used to define when the track should curve, when stations are to be placed, when a wall should start and end, and so on. Generally speaking, instructions from the Track namespace should be used after using instructions from any of the other namespaces.

The format assumes an implicit rail 0 which cannot be explicitly started or ended. Instead, it is present from the beginning of the route to the end, and it marks the rail the player's train drives on. All other rails in the CSV format are purely visual and have no functional purpose.

Geometrically, you can curve and pitch the implicit rail 0, while all other rails are defined relative to rail 0 and follow rail 0 into curves and pitch changes. Unless overridden, the file format is built around a fixed block size of 25 meters length, and it is only possible for certain commands to be used on 25 meter block boundaries. The placement of objects always assumes a non-curved coordinate system which connects blocks linearly.

➟ [See also the quick reference for the CSV route...]({{< ref "/routes/csv_quick/_index.md" >}})

## <a name="syntax"></a>■ 2. Syntax

For each line in the file, [white spaces]({{< ref "/information/whitespaces/_index.md" >}}) at the beginning and the end of that line are ignored. Then, lines are split into individual expressions, separated by commas (U+002C). Thus, each line is of the following form:

{{% command %}}  
*Expression<sub>1</sub>*, *Expression<sub>2</sub>*, *Expression<sub>3</sub>*, ..., *Expression<sub>n</sub>*  
{{% /command %}}

In turn, each expression can be of any of the following forms:

##### ● Comments

A comment is completely ignored by the parser. To form a comment, the expression must begin with a semicolon (U+003B).

##### ● Track positions and lengths

{{% command %}}  
*Position*  
{{% /command %}}  
A non-negative [strict]({{< ref "/information/numberformats/_index.md" >}}) floating-point number corresponding to a track position. All subsequent commands from the Track namespace are associated to this track position.

{{% command %}}  
*Part<sub>1</sub>*:*Part<sub>2</sub>*:...:*Part<sub>n</sub>*  
{{% /command %}}  
This is a more complex way of specifying track positions for use in conjunction with Options.UnitOfLength. Each of the *Part<sub>i</sub>* is a [strict]({{< ref "/information/numberformats/_index.md" >}}) floating-point number. *Part<sub>1</sub>* will be multiplied with *Factor<sub>1</sub>*, *Part<sub>2</sub>* with *Factor<sub>2</sub>*, and so on, then all products are added together to form the final track position. This track position must be non-negative. The parts are separated by colons (U+003A). Please consult Options.UnitOfLength for further information on how to define the factors.

Wherever arguments in commands represent lengths, they can also be entered using the colon notation. These cases are highlighted in <font color="green">green</font> in the following.

When *n* units are defined via Options.UnitOfLength, but fewer parameters are given using the colon notation, the parameters are right-associative, meaning, the parameters on the left are those which are skipped. Therefore, each of the following lengths are equivalent: *0:0:2*, *0:2*, and *2*.

##### ● Commands

Commands without arguments:

{{% command %}}  
*NameOfTheCommand*  
{{% /command %}}

Commands with arguments:

{{% command %}}  
*NameOfTheCommand* *Argument<sub>1</sub>*;*Argument<sub>2</sub>*;*Argument<sub>3</sub>*;...;*Argument<sub>n</sub>*  
*NameOfTheCommand*(*Argument<sub>1</sub>*;*Argument<sub>2</sub>*;*Argument<sub>3</sub>*;...;*Argument<sub>n</sub>*)  
{{% /command %}}

Commands with indices and arguments:

{{% command %}} 
*NameOfTheCommand*(*Index<sub>1</sub>*;*Index<sub>2</sub>*;...;*Index<sub>m</sub>*) *Argument<sub>1</sub>*;*Argument<sub>2</sub>*;*Argument<sub>3</sub>*;...;*Argument<sub>n</sub>*  
*NameOfTheCommand*(*Index<sub>1</sub>*;*Index<sub>2</sub>*;...;*Index<sub>m</sub>*).*Suffix* *Argument<sub>1</sub>*;*Argument<sub>2</sub>*;*Argument<sub>3</sub>*;...;*Argument<sub>n</sub>*  
*NameOfTheCommand*(*Index<sub>1</sub>*;*Index<sub>2</sub>*;...;*Index<sub>m</sub>*).*Suffix*(*Argument<sub>1</sub>*;*Argument<sub>2</sub>*;*Argument<sub>3</sub>*;...;*Argument<sub>n</sub>*)  
{{% /command %}}

Rules:

*NameOfTheCommand* is case-insensitive. Indices and arguments are separated by semicolons (U+003B). White spaces around *NameOfTheCommand* and any of the indices and arguments are ignored. White spaces surrounding any of the parentheses are also ignored.

If indices are used, these are enclosed by opening parentheses (U+0028) and closing parentheses (U+0029). At least one argument, or a *Suffix* is mandatory when using indices.

There are two variations on how to encode arguments. Except for the $-directives ($Chr, $Rnd, $Sub, ...), you can freely choose which variant to use. Variant 1: The first argument is separated from the command, indices or *Suffix* by at least one space (U+0020). Variant two: The arguments are enclosed by opening parentheses (U+0028) and closing parentheses (U+0029). In the latter case, *Suffix* is mandatory when used in conjunction with indices. White spaces surrounding any of the parentheses are ignored.

Please note that in some commands, *Suffix* is mandatory regardless of the style you use to encode arguments. In the following, *Suffix* will be **bolded** when it is mandatory, and <font color="gray">grayed</font> when it is optional.

##### ● The **With** statement

{{% command %}}  
With *Prefix*  
{{% /command %}}

All subsequent commands that start with a period (U+002E) are prepended by *Prefix*. For example:

{{% code %}}  
With Route  
.Gauge 1435  
.Timetable 1157_M  
{{% /code %}}

Is equivalent to:

{{% code %}}  
Route.Gauge 1435  
Route.Timetable 1157_M  
{{% /code %}}

## <a name="preprocessing"></a>■ 3. Preprocessing

Before any of the commands in the route file are actually interpreted, the expressions are preprocessed. The first thing done is to replace any occurrences of the $-directives within an expression from right to left. The $Chr, $Rnd and $Sub directives may be nested in any way, while $Include, $If, $Else and $EndIf must not appear inside another directive.

{{% warning-nontitle %}}

The syntax for the $-directives cannot be freely chosen, but must adhere to the forms presented below.

{{% /warning-nontitle %}}

---

{{% command %}}  
$Include(*File*)  
$Include(*File*:*TrackPositionOffset*)  
$Include(*File<sub>1</sub>*; *Weight<sub>1</sub>*; *File<sub>2</sub>*; *Weight<sub>2</sub>*; ...)  
{{% /command %}}

{{% command-arguments %}}  
***File<sub>i</sub>***: A file to include of the same format (CSV/RW) as the main file.  
***Weight<sub>i</sub>***: A positive floating-point number giving a probability weight for the corresponding file.  
{{% /command-arguments %}}

This directive chooses randomly from the specified files based on their associated probabilities and includes the content from one selected file into the main file. The content is copied into the place of the $Include directive, meaning that you need to take care of track positions and the last used With statement, for example. If the last weight in the argument sequence is omitted, it is treated as 1.

The $Include directive is useful for splitting up a large file into smaller files, for sharing common sections of code between multiple routes, and for choosing randomly from a larger block of code. Please note that the included files may themselves include other files, but you need to make sure that there are no circular dependencies, e.g. file A including file B, and file B including file A, etc. You should use a file extension different from .csv for included files so that users cannot accidentally select them in the main menu (except where this is desired).

If any of the *File<sub>i</sub>* is followed by :*TrackPositionOffset*, then all expressions in the included file are offset by the specified track position **in meters**. For example, $Include(stations.include:2000) shifts all track positions in the part.include file by 2000 meters before including them. It is important to understand that "track positions" are not actually understood until after the $-directives have been processed, so all expressions in the included file are simply flagged to be offset later should they form track positions then. This means that if the included file contains expressions such as 1$Rnd(2;8)00, these are offset, too, even though at this stage, they do not form track positions yet.

{{% warning-nontitle %}}

The track position offset feature is only available in the development release 1.2.11 and above.

{{% /warning-nontitle %}}

---

{{% command %}}  
$Chr(*Ascii*)  
{{% /command %}}

{{% command-arguments %}}  
***Ascii***: An integer in the range from 20 to 127, or 10 or 13, corresponding to an ASCII character of the same code.  
{{% /command-arguments %}}

This directive is replaced by the ASCII character represented by *Ascii*. This is useful if you want to include characters that are part of syntax rules or would be stripped away. A list of relevant characters:

{{% table %}}

| Code | Meaning             | Character |
| ---- | ------------------- | --------- |
| 10   | Newline             | *newline* |
| 13   | Newline             | *newline* |
| 20   | Space               | *space*   |
| 40   | Opening parentheses | (         |
| 41   | Closing parentheses | )         |
| 44   | Comma               | ,         |
| 59   | Semicolon           | ;         |

{{% /table %}}

The sequence $Chr(13)$Chr(10) is handled as a single newline. Inserting $Chr(59) can be interpreted as a comment starter or as an argument separator, depending on where it is used.

---

{{% command %}}  
$Rnd(*Start*; *End*)  
{{% /command %}}

{{% command-arguments %}}  
***Start***: An integer representing the lower bound.  
***End***: An integer representing the upper bound. 
{{% /command-arguments %}}

This directive is replaced by a random integer in the range from *Start* to *End*. It is useful to add randomness to a route.

{{% code "*Example for the use of the $Rnd directive:*" %}}  
10$Rnd(3;5)0, Track.FreeObj 0; 1  
{{% /code %}}

{{% code "*Possible outcome from the previous example is exactly __one__ of these lines:*" %}}  
1030, Track.FreeObj 0; 1  
1040, Track.FreeObj 0; 1  
1050, Track.FreeObj 0; 1  
{{% /code %}}

---

{{% command %}}  
$Sub(*Index*) = *Expression*  
{{% /command %}}

{{% command-arguments %}}  
***Index***: A non-negative integer representing the index of a variable.  
***Expression***: The expression to store in the variable. 
{{% /command-arguments %}}

This directive should only appear as a single expression. It is used to assign *Expression* to a variable identified by *Index*. The whole $Sub directive is replaced by an empty string once the assignment is done. It is useful for storing values obtained by the $Rnd directive in order to reuse the same randomly-generated value. See the following definition of the $Sub(*Index*) directive for examples.

{{% warning %}}

#### Implementation note

While it is also possible to store non-numeric strings, it is not possible to include commas via $Chr(44) and have them work as a statement separator. However, it is possible to store a semicolon as the first character via $Chr(59) and have it work as a comment. For conditional expressions, you should use $Include or $If, though.

{{% /warning %}}

---

{{% command %}}  
$Sub(*Index*)  
{{% /command %}}

{{% command-arguments %}}  
***Index***: A non-negative integer representing the index of the variable to retrieve.  
{{% /command-arguments %}}

This directive is replaced by the content of the variable *Index*. The variable must have been assigned prior to retrieving it.

{{% code "*Example for the use of the $Sub(Index)=Value and $Sub(Index) directives:*" %}}  
$Sub(0) = $Rnd(3; 5)  
1000, Track.FreeObj $Sub(0); 47  
1020, Track.FreeObj $Sub(0); 47  
1040, Track.FreeObj $Sub(0); 47  
{{% /code %}}

In the previous example, all three Track.FreeObj commands are guaranteed to use the same randomly-generated value in order to place a free object on the same rail. If you inserted the $Rnd(3;5) directive in each of the three lines individually, the objects could be placed on different rails each time.

---

{{% command %}}  
$If(*Condition*)  
{{% /command %}}

{{% command-arguments %}}  
***Condition***: A number that represents **false** if zero, and **true** otherwise.  
{{% /command-arguments %}}

The $If directive allows to only process subsequent expressions if the specified condition evaluates to true (any non-zero number). $If must be followed by $EndIf in any subsequent expression. Optionally, an $Else directive may appear between $If and $EndIf.

---

{{% command %}}  
$Else()  
{{% /command %}}

The $Else directive allows to only process subsequent expressions if the condition in the preceding $If evaluated to false (zero).

---

{{% command %}}  
$EndIf()  
{{% /command %}}

The $EndIf directive marks the end of an $If block that was started previously.

{{% code "*Example of $If, $Else and $EndIf*" %}}  
$Sub(1) = 0  
With Track  
$If($Sub(1))  
&nbsp;&nbsp;&nbsp;&nbsp;1020, .FreeObj 0; 1  
&nbsp;&nbsp;&nbsp;&nbsp;1040, .FreeObj 0; 2  
$Else()  
&nbsp;&nbsp;&nbsp;&nbsp;1030, .FreeObj 0; 3  
$EndIf()  
{{% /code %}}

{{% code "*Another example of $If, $Else and $EndIf*" %}}  
With Track  
1050  
$If($Rnd(0;1)), .FreeObj 0; 4, $Else(), .FreeObj 0; 5, $EndIf()  
{{% /code %}}

It is possible to nest $If blocks. If you place $If/$Else/$EndIf on separate lines, you may want to employ indentation to improve readability of the block structure (as in the first example).

---

**Finally**, after the $-directives have been processed, all expressions in the route file are sorted according to their associated track positions.

{{% code "*Example of a partial route file:*" %}}  
1000, Track.FreeObj 0; 23  
1050, Track.RailType 0; 1  
10$Rnd(3;7)0,  Track.Rail 1; 4  
Track.FreeObj 1; 42  
{{% /code %}}

{{% code "*Preprocessing the $Rnd directive (assuming 3 is produced):*" %}}  
1000, Track.FreeObj 0; 23  
1050, Track.RailType 0; 1  
1030, Track.Rail 1; 4  
Track.FreeObj 1; 42  
{{% /code %}}

{{% code "*Sorting by associated track positions:*" %}}  
1000, Track.FreeObj 0; 23  
1030, Track.Rail 1; 4  
Track.FreeObj 1; 42  
1050, Track.RailType 0; 1  
{{% /code %}}

## <a name="options"></a>■ 4. The Options namespace

Commands from this namespace provide generic options that affect the way other commands are processed. You should make use of commands from this namespace before making use of commands from other namespaces.

---

{{% command %}}  
**Options.UnitOfLength** *FactorInMeters<sub>1</sub>*; *FactorInMeters<sub>2</sub>*; *FactorInMeters<sub>3</sub>*; ...; *FactorInMeters<sub>n</sub>*  
{{% /command %}}

{{% command-arguments %}}  
***FactorInMeters<sub>i</sub>***: A floating-point number representing how many meters the desired unit has. The default value is 1 for *FactorInMeters1*, and 0 for all others.  
{{% /command-arguments %}}

This command can be used to specify the unit of length to be used in other commands. When entering a generic track position of the form *Part<sub>1</sub>*:*Part<sub>2</sub>*:...:*Part<sub>n</sub>*, each of the *Part<sub>i</sub>* will be multiplied with the corresponding *FactorInMeters<sub>i</sub>*, then all of these products are added to form a single track position represented in meters. Ideally, you should set the block length to an integer multiple of any of the units you use via Options.BlockLength.

Examples of conversion factors:

{{% table %}}

| Desired unit | Conversion factor |
| ------------ | ----------------- |
| mile         | 1609.344          |
| chain        | 20.1168           |
| meter        | 1                 |
| yard         | 0.9144            |
| foot         | 0.3048            |

{{% /table %}}

In the following, all arguments of all commands are highlighted in <font color="green">green</font> whenever they are affected by Options.UnitOfLength.

---

{{% command %}}  
**Options.UnitOfSpeed** *FactorInKmph*  
{{% /command %}}

{{% command-arguments %}}  
***FactorInKmph***: A floating-point number representing how many kilometers per hour the desired unit has. The default value is 1.  
{{% /command-arguments %}}

This command can be used to specify the unit of speed to be used in other commands. Examples of conversion factors:

{{% table %}}

| Desired unit    | Conversion factor |
| --------------- | ----------------- |
| meters/second   | 3.6               |
| miles/hour      | 1.609344          |
| kilometers/hour | 1                 |

{{% /table %}}

In the following, all arguments of all commands are highlighted in <font color="blue">blue</font> whenever they are affected by Options.UnitOfSpeed.

---

{{% command %}}  
**Options.BlockLength** *<font color="green">Length</font>*  
{{% /command %}}

{{% command-arguments %}}  
***Length***: A positive floating-point number representing the length of a block, **by default** measured in **meters**. The default is 25 meters.  
{{% /command-arguments %}}

This command can be used to specify the length of a block. This is an overall setting and cannot be changed in the middle of the route. *Length* is only expressed in the unit specified by Options.UnitOfLength if Options.UnitOfLength is used before Options.BlockLength.

---

{{% command %}}  
**Options.ObjectVisibility** *Mode*  
{{% /command %}}

{{% command-arguments %}}  
***Mode***: The mode determining how objects appear and disappear. The default value is 0 (legacy).  
{{% /command-arguments %}}

▸ Available options for *Mode*:

{{% command-arguments %}}  
**0**: Legacy: An object is made invisible as soon as the end of the block which it resides in has been passed by the camera. This does not work well when turning the camera around. Self-intersecting track (e.g. loops) is not possible.  
**1**: Track-based: An object is made invisible as soon as its end has been passed by the camera. This is measured in track positions. Self-intersecting track (e.g. loops) is not possible.  
{{% /command-arguments %}}

---

{{% command %}}  
**Options.SectionBehavior** *Mode*  
{{% /command %}}

{{% command-arguments %}}  
***Mode***: The mode determining how the Track.Section command is processed. The default value is 0 (default)  
{{% /command-arguments %}}

▸ Available options for *Mode*:

{{% command-arguments %}}  
**0**: Default: In Track.Section *Aspect<sub>0</sub>*; *Aspect<sub>1</sub>*; ...; *Aspect<sub>n</sub>*, any of the *Aspect<sub>i</sub>* refer to the aspect the section should have if *i* following sections are clear.  
**1**: Simplified: In Track.Section *Aspect<sub>0</sub>*; *Aspect<sub>1</sub>*; ...; *Aspect<sub>n</sub>*, the section bears the smallest aspect which is higher than that of the following section.  
{{% /command-arguments %}}

---

{{% command %}}  
**Options.CantBehavior** *Mode*  
{{% /command %}}

{{% command-arguments %}}  
***Mode***: The mode determining how cant in the Track.Curve command is processed. The default is 0 (unsigned).  
{{% /command-arguments %}}

▸ Available options for *Mode*:

{{% command-arguments %}}  
**0**: Unsigned: The *CantInMillimeters* parameter in Track.Curve is unsigned, i.e. the sign is ignored and the superelevation is always towards the curve center (inward). Cant cannot be applied on straight track.  
**1**: Signed: The *CantInMillimeters* parameter in Track.Curve is signed, i.e. negative values bank outward and positive ones inward on curved track. Cant can be applied on straight track, where negative values bank toward the left and positive ones toward the right.  
{{% /command-arguments %}}

---

{{% command %}}  
**Options.FogBehavior** *Mode*  
{{% /command %}}

{{% command-arguments %}}  
***Mode***: The mode determining how the Track.Fog command is processed. The default value is 0 (Block-based).  
{{% /command-arguments %}}

▸ Available options for *Mode*:

{{% command-arguments %}}  
**0**: Block-based: Fog color and ranges are interpolated from the beginning of the block where Track.Fog is used with the old settings to the end of the block with the new settings.  
**1**: Interpolated: Fog color and ranges are interpolated between adjacent Track.Fog commands. This behavior mimicks Track.Brightness.  
{{% /command-arguments %}}

---

{{% command %}}  
**Options.CompatibleTransparencyMode** *Mode*  
{{% /command %}}

{{% command-arguments %}}  
***Mode***: The mode determining how transparencies are processed in BVE2/ BVE4 objects which use a restricted color pallet. This may be used on a per-route basis to override the value set in 'Options'.  
{{% /command-arguments %}}

▸ Available options for *Mode*:

{{% command-arguments %}}  
**0**: Off: Colors are matched specifically. If the specified transparent color does not exist within the color pallet, no transparency will be added.  
**1**: On: Fuzzy matching. If the texture uses a restricted color pallet, the transparent color will be clamped to the nearest available color in the pallet. 
{{% /command-arguments %}}

---

{{% command %}}  
**Options.EnableBveTsHacks** *Mode*  
{{% /command %}}

{{% command-arguments %}}  
***Mode***: The mode determining whether various hacks are applied in order to fix BVE2 / BVE4 content. This may be used on a per-route basis to override the value set in 'Options'.  
{{% /command-arguments %}}

▸ Available options for *Mode*:

{{% command-arguments %}}  
**0**: Off: Hacks are disabled.  
**1**: On: Hacks are enabled.  
{{% /command-arguments %}}

## <a name="route"></a>■ 5. The Route namespace

Commands from this namespace define general properties of the route.

---

{{% command %}}  
**Route.Comment** *Text*  
{{% /command %}}

{{% command-arguments %}}  
***Text***: The route comments which appear in the route selection dialog.  
{{% /command-arguments %}}

{{% warning-nontitle %}}  
You need to use $Chr directives if you want to include newlines, commas and the like in the text.  
{{% /warning-nontitle %}}

---

{{% command %}}  
**Route.Image** *File*  
{{% /command %}}

{{% command-arguments %}}  
***File***: The file name of the image which appears in the route selection dialog, relative to the route's folder.  
{{% /command-arguments %}}

---

{{% command %}}  
**Route.Timetable** *Text*  
{{% /command %}}

{{% command-arguments %}}  
***Text***: The text which appears at the top of the default timetable.  
{{% /command-arguments %}}

{{% warning-nontitle %}}  
You need to use $Chr directives if you want to include newlines, commas and the like in the text.  
{{% /warning-nontitle %}}

---

{{% command %}}  
**Route.Change** *Mode*  
{{% /command %}}

{{% command-arguments %}}  
***Mode***: The mode for the train's safety system to start in. The default value is implementation-specific.  
{{% /command-arguments %}}

▸ Available options for *Mode*:

{{% command-arguments %}}  
**-1**: The safety system is **activated** and the *service* brakes are applied.  
**0**: The safety system is **activated** and the **emergency** brakes are applied.  
**1**: The safety system is *deactivated* and the **emergency** brakes are applied. 
{{% /command-arguments %}}

---

{{% command %}}  
**Route.Gauge** *ValueInMillimeters*  
{{% /command %}}

{{% command-arguments %}}  
***ValueInMillimeters***: A floating-point number representing the rail gauge, measured in **millimeters** (0.001 meters). The default value is 1435.  
{{% /command-arguments %}}

{{% note %}}

Train.Gauge is the same as Route.Gauge.

{{% /note %}}

---

{{% command %}}  
**Route.Signal**(*AspectIndex*)<font color="gray">.Set</font> *<font color="blue">Speed</font>*  
{{% /command %}}

{{% command-arguments %}}  
***AspectIndex***: A non-negative integer representing the signal aspect. The aspect 0 corresponds to red.  
***<font color="blue">Speed</font>***: A non-negative floating-point number representing the allowed speed for this aspect, **by default** measured in **kilometers per hour** (km/h).  
{{% /command-arguments %}}

Use this command to associate speed limits to signal aspects. Aspect 0 represents a red signal, higher values represent more permissive aspects. The default values (for the included Japanese signals) are: 

{{% table %}}

| *Index* | Aspect                                                       | Speed       |
| ------- | ------------------------------------------------------------ | ----------- |
| 0       | <font color="#C00000">●</font>                               | 0 km/h      |
| 1       | <font color="#FFC000">●●</font>                              | 25 km/h     |
| 2       | <font color="#FFC000">●</font>                               | 55 km/h     |
| 3       | <font color="#00C000">●</font><font color="#FFC000">●</font> | 75 km/h     |
| 4       | <font color="#00C000">●</font>                               | *unlimited* |
| 5       | <font color="#00C000">●●</font>                              | *unlimited* |

{{% /table %}}

---

{{% command %}}  
**Route.RunInterval** *Interval<sub>0</sub>*; *Interval<sub>1</sub>*; ...; *Interval<sub>n-1</sub>*  
{{% /command %}}

{{% command-arguments %}}  
***Interval<sub>i</sub>***: A floating-point number representing the time interval between the player's train's timetable and that of another train to be created, measured in **seconds**. Positive values indicate an earlier train, negative numbers a later train.  
{{% /command-arguments %}}

This command creates one or more preceding or following trains. These other trains are visible, fully operational, and use the same train as the player has. The other trains follow the same schedule as the player does, but are offset in time by *Intervali*. Via the Track.Sta command, you can also define stations where only the player or only the other trains should stop. Follow-up trains only appear once the section they are placed in has been cleared by other trains, but the player's train is introduced regardless of the current signalling section's state. Therefore, you should make sure that other trains have cleared the area where the player's train will appear when the scenario begins.

{{% note %}}

Route.RunInterval is the same as Train.Interval.

{{% /note %}}

---

{{% command %}}  
**Route.AccelerationDueToGravity** *Value*  
{{% /command %}}

{{% command-arguments %}}  
**Value**: A positive floating-point number representing the acceleration due to gravity in **meters per second squared** (m/s²). The default value is 9.80665.  
{{% /command-arguments %}}

---

{{% command %}}  
**Route.Elevation** *<font color="green">Height</font>*  
{{% /command %}}

{{% command-arguments %}}  
***<font color="green">Height</font>***: A floating-point number representing the initial height above sea level, **by default** measured in **meters** (m). The default value is 0.  
{{% /command-arguments %}}

---

{{% command %}}  
**Route.Temperature** *ValueInCelsius*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: A floating-point number representing the initial temperature in **Celsius**. The default value is 20.  
{{% /command-arguments %}}

---

{{% command %}}  
**Route.Pressure** *ValueInKPa*  
{{% /command %}}

{{% command-arguments %}}  
***ValueInKPa***: A positive floating-point number representing the initial air pressure in **kPa** (1000 Pascal). The default value is 101.325.  
{{% /command-arguments %}}

---

{{% command %}}  
**Route.DisplaySpeed** *Unit; ConversionFactor*  
{{% /command %}}

{{% command-arguments %}}  
***Unit***: The textual units in which speed-related messages are to be displayed.    ***ConversionFactor***: The conversion factor between km/h and your custom unit of speed. For mph, this is 0.621371.  
{{% /command-arguments %}}

This command allows speed related messages (overspeed etc.) to be displayed in a custom unit, for example mph.

---

{{% command %}}  
**Route.LoadingScreen** *Image*  
{{% /command %}}

{{% command-arguments %}}    
***Image***: A path to a supported image file.  
{{% /command-arguments %}}

This command allows a custom image to be set as the loading screen background.

---

{{% command %}}  
**Route.StartTime** *Time*  
{{% /command %}}

{{% command-arguments %}}  
***Time***: The time at which the simulation is to start.  
{{% /command-arguments %}}

This command allows the start time of the simulation to be set.

{{% note %}}

If this is not set or is invalid, the simulation will start at the arrival time set at the first station.

{{% /note %}}

---

{{% command %}}  
**Route.DynamicLight** *Dynamic.XML*  
{{% /command %}}

{{% command-arguments %}}  
***Dynamic.XML***: A path to a Dynamic Lighting definition XML file.  
{{% /command-arguments %}}

This command may be used as an alternative to the *Route.AmbientLight* , *Route.DirectionalLight* and *Route.LightDirection* commands.

It allows the lighting to be varied using a time-based model, and is described fully on the following page:

[Dynamic Lighting]({{< ref "/routes/xml/dynamiclight/_index.md" >}})

---

{{% command %}}  
**Route.AmbientLight** *RedValue*; *GreenValue*; *BlueValue*  
{{% /command %}}

{{% command-arguments %}}  
***RedValue***: An integer ranging from 0 to 255 representing the red component of the ambient light. The default value is 160.  
***GreenValue***: An integer ranging from 0 to 255 representing the green component of the ambient light. The default value is 160.   
***BlueValue***: An integer ranging from 0 to 255 representing the blue component of the ambient light. The default value is 160.  
{{% /command-arguments %}}

This command defines the ambient light color to be used. All polygons in the scene are illuminated by the ambient light regardless of the light direction.

---

{{% command %}}  
**Route.DirectionalLight** *RedValue*; *GreenValue*; *BlueValue*  
{{% /command %}}

{{% command-arguments %}}  
***RedValue***: An integer ranging from 0 to 255 representing the red component of the directional light. The default value is 160.  
***GreenValue***: An integer ranging from 0 to 255 representing the green component of the directional light. The default value is 160.  
***BlueValue***: An integer ranging from 0 to 255 representing the blue component of the directional light. The default value is 160.  
{{% /command-arguments %}}

This command defines the directional light to be used. The polygons in the scene are only fully illuminated by the directional light if the light direction points at the front faces. If pointing at back faces, no light is contributed. *Route.LightDirection* should be set to specify the light direction.

---

{{% command %}}  
**Route.LightDirection** *Theta*; *Phi*  
{{% /command %}}

{{% command-arguments %}}  
***Theta***: A floating-point number representing the angle in **degrees** which controls the pitch of the light direction. The default value is 60.  
***Phi***: A floating-point number representing the angle in **degrees** which controls the planar rotation of the light direction. The default value is about -26.57.  
{{% /command-arguments %}}

This command defines the initial light direction for track position 0. This is the direction the light shines at, meaning the opposite direction the sun is located at. First, *Theta* determines the pitch. A value of 90 represents a downward direction, while a value of -90 represents an upward direction. With those extremes, the value of *Phi* is irrelevant. A value of 0 for *Theta* represents a forward direction originating at the horizon behind. Once the pitch is defined by *Theta*, *Phi* determines the rotation in the plane. A value of 0 does not rotate, a value of 90 rotates the direction to the right and a value of -90 rotates to the left. A backward direction can be both obtained by setting *Theta* and *Phi* to 180 and 0 or to 0 and 180, respectively. Values in-between allow for more precise control of the exact light direction.

![illustration_light_direction](/images/illustration_light_direction.png)

{{% function "*Converting a spherical direction (theta,phi) into a cartesian direction (x,y,z):*" %}}  
x = cos(theta) * sin(phi)  
y = -sin(theta)  
z = cos(theta) * cos(phi)  
{{% /function %}}

{{% function "*Converting a cartesian direction (x,y,z) into a spherical direction (theta,phi) for y²≠1:*" %}}  
theta = -arctan(y/sqrt(x<sup>2</sup>+z<sup>2</sup>))  
phi = arctan(z,x)  
{{% /function %}}

{{% function "*Converting a cartesian direction (x,y,z) into a spherical direction (theta,phi) for y²=1:*" %}}  
theta = -y * pi/2  
phi = 0  
{{% /function %}}

In the formulas above, [*cos(x)*](http://functions.wolfram.com/ElementaryFunctions/Cos/02) represents the cosine, [*sin(x)*](http://functions.wolfram.com/ElementaryFunctions/Sin/02) the sine, [*arctan(x)*](http://functions.wolfram.com/ElementaryFunctions/ArcTan/02) the inverse tangent, [*arctan(x,y)*](http://functions.wolfram.com/ElementaryFunctions/ArcTan2/02) the two-argument inverse tangent and [*sqrt(x)*](http://functions.wolfram.com/ElementaryFunctions/Sqrt/02) the square root. The formulas can be used to convert between spherical and cartesian coordinates if working with either one seems more intuitive than working with the other one. The formulas also serve as the official documentation on how the light direction is mathematically defined (using radians for the trigonometric functions).

---

{{% command %}}  
**Route.InitialViewpoint** *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: An integer defining the initial camera viewpoint mode. The following values are valid:  
*0* : The camera will be placed in the cab. (Default)  
*1* : The camera will be placed in 'Track Camera' mode.  
*2* : The camera will be placed in 'Flyby Camera' mode.  
*3* : The camera will be placed in 'Flyby Zooming Camera' mode.  
{{% /command-arguments %}}

This command allows the route developer to place the initial camera in one of the alternate camera modes.

---

{{% command %}}  
**<font color=#555555>Route.DeveloperID</font>**  
{{% /command %}}

<font color=#555555>This command is ignored by openBVE.</font>

## <a name="train"></a>■ 6. The Train namespace

Commands from this namespace define route-train associations. 

---

{{% command %}}  
Train.Folder *FolderName*  
Train.File *FolderName*  
{{% /command %}}

{{% command-arguments %}}  
***FolderName***: The folder name of the default train to use on this route.  
{{% /command-arguments %}}

---

{{% command %}}  
**Train.Run**(*RailTypeIndex*)<font color="gray">.Set</font> *RunSoundIndex*   
**Train.Rail**(*RailTypeIndex*)<font color="gray">.Set</font> *RunSoundIndex*  
{{% /command %}}

{{% command-arguments %}}  
***RailTypeIndex***: A non-negative integer representing the rail type as defined via Structure.Rail and used via Track.RailType.  
***RunSoundIndex***: A non-negative integer representing the train's run sound to associate to the rail type.  
{{% /command-arguments %}}

The train developer provides a repertoire of different run sounds. Use this command to associate these run sounds to the rail types you use in your route. In order for the correct run sounds to be played on any of your rail types, you need to coordinate your efforts with the train developer. Please see the page about [standards]({{< ref "/information/standards/_index.md" >}}) for further information.

---

{{% command %}}  
**Train.Flange**(*RailTypeIndex*)<font color="gray">.Set</font> *FlangeSoundIndex*  
{{% /command %}}

{{% command-arguments %}}  
***RailTypeIndex***: A non-negative integer representing the rail type as defined via Structure.Rail and used via Track.RailType.  
***RunSoundIndex***: A non-negative integer representing the train's flange sound to associate to the rail type.  
{{% /command-arguments %}}

The train developer provides a repertoire of different flange sounds. Use this command to associate these flange sounds to the rail types you use in your route. In order for the correct flange sounds to be played on any of your rail types, you need to coordinate your efforts with the train developer. Please see the page about [standards]({{< ref "/information/standards/_index.md" >}}) for further information.

---

{{% command %}}  
**Train.Timetable**(*TimetableIndex*)**.Day**<font color="gray">.Load</font> FileName  
{{% /command %}}

{{% command-arguments %}}  
***TimetableIndex***: A non-negative integer representing the timetable index.  
***FileName***: The file name for the daytime version of the timetable, relative to the train's folder (1<sup>st</sup> choice), or relative to the **Object** folder (2<sup>nd</sup> choice).  
{{% /command-arguments %}}

Use this command to load daytime versions of the timetable. Which timetable index to show starting with a particular station can be set in Track.Sta commands.

---

{{% command %}}  
**Train.Timetable**(*TimetableIndex*)**.Night**<font color="gray">.Load</font> FileName  
{{% /command %}}

{{% command-arguments %}}  
***TimetableIndex***: A non-negative integer representing the timetable index.  
***FileName***: The file name for the daytime version of the timetable, relative to the train's folder (1<sup>st</sup> choice), or relative to the **Object** folder (2<sup>nd</sup> choice).  
{{% /command-arguments %}}

Use this command to load nighttime versions of the timetable. Which timetable index to show starting with a particular station can be set in Track.Sta commands.

---

{{% command %}}  
**Train.Gauge** *ValueInMillimeters*  
{{% /command %}}

{{% command-arguments %}}  
***ValueInMillimeters***: A floating-point number representing the rail gauge, measured in **millimeters** (0.001 meters). The default value is 1435.  
{{% /command-arguments %}}

{{% note %}}

Train.Gauge is the same as Route.Gauge.

{{% /note %}}

---

{{% command %}}  
**Train.Interval** *Interval<sub>0</sub>*; *Interval<sub>1</sub>*; ...; *Interval<sub>n-1</sub>*  
{{% /command %}}

{{% command-arguments %}}  
***ValueInSeconds***: A floating-point number representing the time interval between the player's train and the preceding train, measured in **seconds**. The default value is 0.  
{{% /command-arguments %}}

{{% note %}}

Train.ValueInSeconds is the same as Route.RunInterval.

{{% /note %}}

---

{{% command %}}  
**Train.Velocity** *<font color="blue">Speed</font>*  
{{% /command %}}

{{% command-arguments %}}  
***<font color="blue">Speed</font>***: A positive floating-point number representing the maximum speed the preceding trains may travel at, **by default** measured in **kilometers per hour**, or 0 for infinite speed. The default value is 0.  
{{% /command-arguments %}}

This command defines the maximum speed limit the preceding trains may travel at. The actual speed limit may be reduced by Track.Limit commands. The player's train is unaffected by this setting and may travel up to the limits defined by Track.Limit.

---

{{% command %}}  
**<font color=#555555>Train.Acceleration</font>**  
{{% /command %}}

<font color=#555555>This command is ignored by openBVE.</font>

---

{{% command %}}  
**<font color=#555555>Train.Station</font>**  
{{% /command %}}

<font color=#555555>This command is ignored by openBVE.</font>

## <a name="structure"></a>■ 7. The Structure namespace

The commands in the Structure namespace define which objects to use in other commands. Generally, commands like Track.Rail, Track.FreeObj and so on create objects referenced by a *StructureIndex*. This *StructureIndex* is specific to that command, so you can define a set of objects specific to Track.Rail, Track.FreeObj and so on.

The general syntax for commands in the Structure namespace is:

{{% command %}}  
**Structure._Command_(_StructureIndex_)**<font color="gray">.Load</font> *FileName*  
{{% /command %}}

*StructureIndex* is a non-negative integer. *FileName* is the object file to load, relative to the **Object** folder. *Command* is any of the following commands:

{{% table %}}

| *Command*: | Remarks                                                      |
| ---------- | ------------------------------------------------------------ |
| Ground     | Defines objects for Cycle.Ground and Track.Ground.           |
| Rail       | Defines objects for Track.Rail, Track.RailStart and Track.RailType. |
| WallL      | Defines left objects for Track.Wall.                         |
| WallR      | Defines right objects for Track.Wall.                        |
| DikeL      | Defines left objects for Track.Dike.                         |
| DikeR      | Defines right objects for Track.Dike.                        |
| FormL      | Defines left platforms edges for Track.Form.                 |
| FormR      | Defines right platforms edges for Track.Form.                |
| FormCL     | Defines transformable left platforms for Track.Form. <font color="red">No ANIMATED objects supported.</font> |
| FormCR     | Defines transformable right platforms for Track.Form. <font color="red">No ANIMATED objects supported.</font> |
| RoofL      | Defines left roof edges for Track.Form.                      |
| RoofR      | Defines right roof edges for Track.Form.                     |
| RoofCL     | Defines transformable left roofs for Track.Form. <font color="red">No ANIMATED objects supported.</font> |
| RoofCR     | Defines transformable right roofs for Track.Form. <font color="red">No ANIMATED objects supported.</font> |
| CrackL     | Defines transformable left objects for Track.Crack. <font color="red">No ANIMATED objects supported.</font> |
| CrackR     | Defines transformable right objects for Track.Crack. <font color="red">No ANIMATED objects supported.</font> |
| FreeObj    | Defines objects for Track.FreeObj.                           |
| Beacon     | Defines objects for Track.Beacon.                            |

{{% /table %}}

Generally, supported objects are B3D, CSV, X and ANIMATED. However, the FormCL, FormCR, RoofCL, RoofCR, CrackL and CrackR commands only accept B3D, CSV and X objects.

➟ [More information about forms, roofs and cracks...]({{< ref "/routes/formroofcrack/_index.md" >}})

Additionally, there is the Structure.Pole command, which has a slightly different syntax:

{{% command %}}  
**Structure.Pole(_NumberOfAdditionalRails_; _PoleStructureIndex_)**<font color="gray">.Load</font> *FileName*  
{{% /command %}}

{{% command-arguments %}}  
***NumberOfAdditionalRails***: An non-negative integer representing the number of additional rails covered by the pole. 0 creates a pole for one rail, 1 for two rails, etc.  
***PoleStructureIndex***: A non-negative integer representing the pole structure index.  
***FileName***: The object file to load, relative to the **Object** folder.  
{{% /command-arguments %}}

Please note that all objects but the FreeObj are inserted at the beginning of a block and should thus extend from 0 to *BlockLength* (by default 25m) on the z-axis. For further information on usage, see the respective commands from the Track namespace.

## <a name="texture"></a>■ 8. The Texture namespace

Commands from this namespace define which background images to use and how they are aligned.

![illustration_background](/images/illustration_background.png)

The background image is displayed as a cylindric wall around the camera whose start (viewed from above) is 60 degrees to the left of the initial forward direction (at the 10 o'clock position). From there, the background image wraps clock-wise around the cylinder with a repetition count specified via Texture.Background(*BackgroundTextureIndex*).X, which by default creates 6 repetitions in a full circle.

The upper 3/4 of the image is displayed above the horizon, while the lower 1/4 is displayed below the horizon. Via Texture.Background(*BackgroundTextureIndex*).Aspect, you can choose whether to have a fixed cylinder height or to preserve the aspect ratio of the texture. If the image should have a fixed height, the cylinder has a height of 1/2 its radius, which corresponds to about 20 degree inclination to the top of the image, and about -7 degrees to the bottom of the image. If the aspect ratio of the image is preserved, this takes not only the width and height of the image into account, but also the repetition count.

Regardless of the repetition count you chose, you should make sure that the left and right edges of the textures fit seamlessly together. Please also take into account that top and bottom caps are created which sample from the top and bottom 10% of the image. You should avoid mountain peaks and similar extremes in the top 10% of the image in order for such extremes to not leak into the top cap.

The image loaded into Texture.Background(0) is displayed at the beginning of the route, unless a Track.Back command at the beginning of the route requests a different image.

As an alternative ***Dynamic or Object*** based backgrounds may be used. The implementation of these is described upon this page:

[Dynamic & Object Based Backgrounds]({{< ref "/routes/xml/dynamicbackground/_index.md" >}})

---

{{% command %}}  
**Texture.Background(_BackgroundTextureIndex_)**<font color="gray">.Load</font> *FileName*  
{{% /command %}}

{{% command-arguments %}}  
***FileName***: The texture file to load, relative to the **Object** folder.  
{{% /command-arguments %}}

This command loads a background image to be later used by Track.Back.

{{% note %}}

If a dynamic or object based background is to be used, this must instead point to the appropriate XML file.

{{% /note%}}

---

{{% command %}}  
**Texture.Background(_BackgroundTextureIndex_).X** *RepetitionCount*  
{{% /command %}}

{{% command-arguments %}}  
***RepetitionCount***: The number of times the background image is repeated in a full circle. The default value is 6.  
{{% /command-arguments %}}

{{% note %}}

Ignored if using a dynamic or object based background.

{{% /note %}}

---

{{% command %}}  
**Texture.Background(_BackgroundTextureIndex_).Aspect** *Mode*  
{{% /command %}}

{{% command-arguments %}}  
***Mode***: The mode of aspect ratio handling to use. The default value is 0 (fixed).  
{{% /command-arguments %}}

▸ Options for *Mode*:

{{% command-arguments %}}  
**0**: Fixed: Use a fixed height for the cylinder.  
**1**: Aspect: Preserve the aspect ratio of the image.  
{{% /command-arguments %}}

{{% note %}}

Ignored if using a dynamic or object based background.

{{% /note %}}

## <a name="cycle"></a>■ 9. The Cycle namespace

{{% command %}}  
**Cycle.Ground(_GroundStructureIndex_)<font color="gray">.Params</font> _GroundStructureIndex<sub>0</sub>_; _GroundStructureIndex<sub>1</sub>_; _GroundStructureIndex<sub>2</sub>_; ...; _GroundStructureIndex<sub>n-1</sub>_**  
{{% /command %}}

{{% command-arguments %}}  
***GroundStructureIndex***: A non-negative integer indicating the ground structure index for which a cycle is to be defined.  
***GroundStructureIndex<sub>i</sub>***: A non-negative integer indicating a ground structure that has been previously loaded via Structure.Ground.  
{{% /command-arguments %}}

When usually using Track.Ground(*GroundStructureIndex*), the same ground structure object will be repeatedly placed in every block. Via Cycle.Ground, you can override this behavior and automatically cycle through a series of different objects when using Track.Ground(*GroundStructureIndex*). The cycle repeats indefinitely, where *GroundStructureIndex0* starts at track position 0. Technically, the *i* in *GroundStructureIndex<sub>i</sub>* chosen for a particular track position *p* is `Mod[p / BlockLength, n]`.

{{% command %}}  
**Cycle.Rail(_RailStructureIndex_)<font color="gray">.Params</font> _RailStructureIndex<sub>0</sub>_; _RailStructureIndex<sub>1</sub>_; _RailStructureIndex<sub>2</sub>_; ...; _RailStructureIndex<sub>n-1</sub>_**  
{{% /command %}}

{{% command-arguments %}}  
***RailStructureIndex***: A non-negative integer indicating the rail structure index for which a cycle is to be defined.  
***RailStructureIndex<sub>i</sub>***: A non-negative integer indicating a rail structure that has been previously loaded via Structure.Rail.  
{{% /command-arguments %}}

Consider the following definition:

{{% code %}}  
With Structure  
.Ground(0)  grass.csv  
.Ground(1) river.csv  
.Ground(2) asphalt.csv  
{{% /code %}}

The following two codes will produce the same output:

{{% code %}}  
With Track  
0, .Ground 0  
25, .Ground 1  
50, .Ground 2  
75, .Ground 0  
100, .Ground 1  
125, .Ground 2  
; and so on...  
{{% /code %}}

{{% code "&nbsp;" %}}  
With Cycle  
.Ground(0) 0; 1; 2  
With Track  
0, .Ground 0  
{{% /code %}}

## <a name="signal"></a>■ 10. The Signal namespace

Commands from this namespace define custom signals.

---

{{% command %}}  
__Signal(__*SignalIndex*__)__<font color="gray">.Load</font> *AnimatedObjectFile*  
{{% /command %}}

{{% command-arguments %}}  
***SignalIndex***: A non-negative integer representing the signal index.  
***AnimatedObjectFile***: A reference to an animated object file, relative to the **Object** folder.  
{{% /command-arguments %}}

Use this command to load signals directly from animated objects. The *SignalIndex* can be later referenced in Track.SigF commands to place the signal.

---

{{% command %}}  
__Signal(__*SignalIndex*__)__<font color="gray">.Load</font> *SignalFileWithoutExtension*; *GlowFileWithoutExtension*  
{{% /command %}}

{{% command-arguments %}}  
***SignalIndex***: A non-negative integer representing the signal index.  
***SignalFileWithoutExtension***: A reference to a B3D/CSV/X object file representing the signal, relative to the **Object** folder, but without the file extension. **Is required to be specified.**  
***GlowFileWithoutExtension***: An optional reference to a B3D/CSV/X object file representing the distance glow, relative to the **Object** folder, but without the file extension.  
{{% /command-arguments %}}

Use this command to load signals from a series of individual textures applied onto a common object. openBVE looks for X, CSV and B3D objects in this exact order. Textures are required to have the same name as the signal or glow, plus a non-negative aspect index, plus a file extension for textures. The *SignalIndex* can be later referenced in Track.SigF commands to place the signal.

For the *SignalFileWithoutExtension*, there should be the following files present (example):

_SignalFileWithoutExtension_**.x**  
_SignalFileWithoutExtension_**<font color="red">0</font>.bmp**  
_SignalFileWithoutExtension_**<font color="red">1</font>.bmp**  
_SignalFileWithoutExtension_**<font color="red">2</font>.bmp**  
_SignalFileWithoutExtension_**<font color="red">n</font>.bmp**

The aspect indices from 0 through *n* represent successively more permissive aspects, where 0 is red. The built-in signals, for example, use the indices 0 (<font color="#C00000">●</font>), 1 (<font color="#FFC000">●●</font>), 2 (<font color="#FFC000">●</font>), 3 (<font color="#00C000">●</font><font color="#FFC000">●</font>), 4 (<font color="#00C000">●</font>) and 5 (<font color="#00C000">●●</font>). You can use as many as required.

All faces in the object will be applied the currently active aspect texture. This means that you cannot use any other texture in the object, but still have to assign texture coordinates appropriately. For the glow object, the above rules also apply. The glow object is usually a rectangle placed clearly in front of the signal, although you can also use different shapes.

The glow textures deserve special attention. All glow textures are pre-processed in the following way:

{{% table %}}

| A                                                       | B                                                       | C                                                       | D                                                       | E                                                       | F                                                       |
| ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- |
| ![illustration_glow_1](/images/illustration_glow_1.png) | ![illustration_glow_2](/images/illustration_glow_2.png) | ![illustration_glow_3](/images/illustration_glow_3.png) | ![illustration_glow_4](/images/illustration_glow_4.png) | ![illustration_glow_5](/images/illustration_glow_5.png) | ![illustration_glow_6](/images/illustration_glow_6.png) |

{{% /table %}}

The texture you start with should have a sharp shape, usually oval. The shape should be fully saturated in the core and blend into pure white at its outer rim. The surroundings of the shape can be either pure black (A) or pure white (B).

When openBVE loads the glow texture, it will replace all purely black pixels with purely white pixels, thus arriving at (B). From there, the image is inverted \(C), then hue-shifted by 180 degrees (D). Compared to (B), this has the overall effect of inverting the lightness of the image, i.e. fully saturated pixels will be left unchanged (e.g. the core), while bright pixels (such as the outer rim of the shape) will become dark, and vice versa. Then, the image is gamma-corrected to further darken the dark parts (E), and finally, the image is blurred slightly (F).

The resulting texture is always additively blended. This means that instead of directly drawing the texture onto the screen, the pixels of the texture are added to the screen pixels. Here, adding black (0) does not change the screen pixels, while adding a fully satured color channel (1) will result in a fully satured color channel, e.g. adding white produces white. Keep in mind that when designing the textures, you will have to follow the inverse rules, e.g. design the image as depicted in (A) or (B), while having in mind how it will be processed afterward.

## <a name="track"></a>■ 11. The Track namespace

Commands from this namespace define the track layout. Commands from this namespace should appear after commands from any of the other namespaces, and they usually form the largest part of the route file.

{{% notice %}}

#### Use of track positions

All commands from the Track namespace need to be associated to track positions. Once a track position has been defined, all subsequent commands are associated to this track position until a new track position is defined. If you do not explicitly state a track position before the first command of the Track namespace is used, 0 will be assumed. While you do not need to use track positions in ascending order, series of commands which are associated the same track position will be sorted into ascending order once the file is loaded. While track positions can be any non-negative floating-point number, many commands in the Track namespace are only to be applied at the beginning of a block, which is 25m by default. For the default situation, this means that some commands are only to be used at track positions 0, 25, 50, 75, 100, 125 and so on. All commands for which this restriction applies are marked as such.

{{% /notice %}}

##### <a name="track_rails"></a>● 11.1. Rails

---

{{% command %}}  
**Track.RailStart** *RailIndex*; *<font color="green">X</font>*; *<font color="green">Y</font>*; *RailType*  
{{% /command %}}

{{% command-arguments %}}  
***RailIndex***: A positive integer (**>=1**) indicating which rail index to use.  
***<font color="green">X</font>***: A floating-point number representing the horizontal distance from the player's rail, **by default** measured in **meters**. Negative values indicate left, positive ones right.  
***<font color="green">Y</font>***: A floating-point number representing the vertical distance from the player's rail, **by default** measured in **meters**. Negative values indicate below, positive ones above.  
***RailType***: A non-negative integer referencing the rail type to use as defined by either a Structure.Rail or a Structure.Cycle command. 
{{% /command-arguments %}}

This command starts a new rail represented by the index *RailIndex*. Upon the point where this command is used, a rail of the same *RailIndex* must either not have been used so far in the route, or must have been ended via a Track.RailEnd command. If a rail of the same *RailIndex* was already used in the route, the default values of *X*, *Y* and *RailType* are the values last used by that rail, otherwise 0. If the rail is to be updated, use the Track.Rail command. If it is to be ended, use the Track.RailEnd command. You can end a rail of a given *RailIndex* and start a new rail of the same *RailIndex* at the same track position provided that the old rail is first ended and the new rail started afterward. For every block, a structure, determined by *RailType*, is automatically placed.

{{% warning-nontitle %}}

This command can only be used at the beginning of a block.

{{% /warning-nontitle %}}

---

{{% command %}}  
**Track.Rail** *RailIndex*; *<font color="green">X</font>*; *<font color="green">Y</font>*; *RailType*  
{{% /command %}}

{{% command-arguments %}}  
***RailIndex***: A positive integer (**>=1**) indicating which rail index to use.  
***<font color="green">X</font>***: A floating-point number representing the horizontal distance from the player's rail, **by default** measured in **meters**. Negative values indicate left, positive ones right.  
***<font color="green">Y</font>***: A floating-point number representing the vertical distance from the player's rail, **by default** measured in **meters**. Negative values indicate below, positive ones above.  
***RailType***: A non-negative integer referencing the rail type to use as defined by either a Structure.Rail or a Structure.Cycle command. 
{{% /command-arguments %}}

This command starts a new rail or updates an existing rail. The rail is represented by the index *RailIndex*. If a rail of the same *RailIndex* was already used in the route, the default values of *X*, *Y* and *RailType* are the values last used by that rail, otherwise 0. If the rail is to be ended, use the Track.RailEnd command. You can end a rail of a given *RailIndex* and start a new rail of the same *RailIndex* at the same track position provided that the old rail is first ended and the new rail started afterward. In each block, the *X* and *Y* values are repeated if a Track.Rail command is not used for that block. As a consequence, updating the *X* or *Y* values affects the layout of the rail from the preceding block only. Changing the *RailType* will affect the rail from the point on where this command is used. If this command is used multiple times on the same track position for the same rail, then the first instance of the command takes effect, while subsequent ones are ignored.  

{{% warning-nontitle %}}

This command can only be used at the beginning of a block.

{{% /warning-nontitle %}}

{{% warning-nontitle %}}

Using a RailIndex value of 0 is not valid for this command: [Errata Note](https://github.com/leezer3/OpenBVE/wiki/Errata#rail-and-railend-commands-with-an-index-of-zero)

{{% /warning-nontitle %}}

{{% notice %}}

#### Track.RailStart vs. Track.Rail

If you want to start a new rail, you can either use Track.RailStart or Track.Rail. When using Track.RailStart, you provide markup that a new rail is in fact to be started, which is invalid if the rail already exists. Using an explicit Track.RailStart will protect you from using a *RailIndex* which is already in use, in which case an error message is generated. 

{{% /notice %}}

---

{{% command %}} 
**Track.RailType** *RailIndex*; *RailType*
{{% /command %}} 

{{% command-arguments %}}
***RailIndex***: A non-negative integer indicating which rail index to change. The player's rail can be referred to with index **0**. The default value is 0.  
***RailType***: A non-negative integer referencing the rail type to use as defined by either a Structure.Rail or a Structure.Cycle command. The default value is 0.  
{{% /command-arguments %}}

This command changes the rail type for an existing rail, represented by *RailIndex*. The rail must have been started with a Track.RailStart or Track.Rail command and must not have been ended by a Track.RailEnd command. Changing the *RailType* will affect the rail from the point on where this command is used.

{{% warning-nontitle %}}

This command can only be used at the beginning of a block.

{{% /warning-nontitle %}}	 

---

{{% command %}}
**Track.RailEnd** *RailIndex*; *<font color="green">X</font>*; *<font color="green">Y</font>*
{{% /command %}}

{{% command-arguments %}}
***RailIndex***: A positive integer (>=1) indicating which rail index to use.  
***<font color="green">X</font>***: A floating-point number representing the horizontal distance from the player's rail, **by default** measured in **meters**. Negative values indicate left, positive ones right.  
***<font color="green">Y</font>***: A floating-point number representing the vertical distance from the player's rail, **by default** measured in **meters**. Negative values indicate below, positive ones above.  
{{% /command-arguments %}}

This command ends an existing rail, represented by the index *RailIndex*. The default values of *X* and *Y* are the ones last used by the rail. Once this command is used for a specific *RailIndex*, the corresponding rail is considered to be non-existing afterward.

{{% warning-nontitle %}}

This command can only be used at the beginning of a block.

{{% /warning-nontitle %}}

{{% warning-nontitle %}}

Using a RailIndex value of 0 is not valid for this command: [Errata Note](https://github.com/leezer3/OpenBVE/wiki/Errata#rail-and-railend-commands-with-an-index-of-zero)

{{% /warning-nontitle %}} 

Example of Track.RailStart, Track.Rail, Track.RailType and Track.RailEnd commands

{{% code %}}
With Track  
1000, .RailStart 1; 3.8; 0.0; 0  
1025, .RailType 1; 1  
1050, .Rail 1; 1.9; 0.0; 0  
1075, .RailEnd 1  
{{% /code %}}

In the preceding example, rail 1 starts with an x-value of 3.8 and bears a rail index which corresponds to an object intended to depict a straight rail. The rail keeps the x-value of 3.8 at track position 1025, where the rail type is changed to correspond to an object intended to depict an s-shaped curve. At track position 1050, the rail is redefined to have an x-value of 1.9, after which the rail is straight again until 1075, where it is ended, still having an x-value of 1.9.

---

{{% command %}}
**Track.Accuracy** *Value*
{{% /command %}}

{{% command-arguments %}}
***Value***: A non-negative floating-point number representing the accuracy of the track. The default value is 2.
{{% /command-arguments %}}

This command sets the accuracy of the track from this point on. Values should be in the range from 0 to 4, where 0 means perfect accuracy (no inaccuracy at all), 1 means very good accuracy (high speed lines), 2 means good accuracy, 3 means mediocre accuracy, and 4 means poor accuracy. Intermediate values are also possible. Currently, values below 0 are clamped at 0, and values above 4 are clamped at 4.

---

{{% command %}}
**Track.Adhesion** *Rate*
{{% /command %}}

{{% command-arguments %}}
***Rate***: A non-negative floating-point number measured in percent representing the adhesion of the track. The default value is 100.
{{% /command-arguments %}}

This command sets the adhesion of the track from this point on. As a reference, the value of 135 represents dry conditions, 85 represents frost and 50 represents snowy conditions. With a value of 0, the train will not be able to move at all. 

##### <a name="track_geometry"></a>● 11.2. Geometry

---

{{% command %}}
**Track.Pitch** *Rate*
{{% /command %}}

{{% command-arguments %}}
***Rate***: A floating-point number measured in per thousands representing the pitch of the track. The default value is 0.  
{{% /command-arguments %}}

This command defines the pitch of all rails from this point on. Negative values indicate a downward gradient, positive ones an upward gradient. The value of 0 represents a level track. Rate can be calculated from a length difference X and a height difference Y in the following way:

*Rate expressed through X and Y:*
{{% function %}}  
_Rate = 1000 * Y / X_
{{% /function %}}

{{% warning-nontitle %}}

This command can only be used at the beginning of a block.

{{% /warning-nontitle %}}	 

---

{{% command %}}
**Track.Curve** *<font color=green>Radius</font>*; *CantInMillimeters*
{{% /command %}}

{{% command-arguments %}}
***<font color=green>Radius</font>***: A floating-point number representing the radius of the curve, **by default** measured in **meters**. The default value is 0.  
***CantInMillimeters***: A floating-point number which represents the superelevation of a banked curve, **always** measured in **millimeters** (0.001 meters). The default value is 0. See also Options.CantBehavior.  
{{% /command-arguments %}}

This command defines the radius of the curve for the player's rail from this point on. Negative values for *Radius* indicate a curve to the left, positive ones to the right. The value of 0 represents straight track. The *CantInMillimeters* parameter defines the cant (superelevation) in millimeters. If Options.CantBehavior is 0 (default), only the absolute value of *CantInMillimeters* is considered, and the superelevation is always towards the curve center (inward). Also, cant cannot be applied on straight track. If Options.CantBehavior is 1, *CantInMillimeters* is signed, i.e. negative values bank outward and positive ones inward on curved track. Also, cant can be applied on straight track, where negative values bank toward the left and positive ones toward the right.

{{% warning-nontitle %}}

This command can only be used at the beginning of a block.

{{% /warning-nontitle %}} 

---

{{% command %}}
**Track.Turn** *Ratio*
{{% /command %}}

{{% command-arguments %}}
***Rate***: A floating-point number representing a turn. The default value is 0.
{{% /command-arguments %}}

This command creates a point-based turn at the point of insertion. *Ratio* indicates the ratio between the length difference *Z* and the horizontal offset *X* in the following way:
	
{{% function %}}  
*Ratio = X / Z*
{{% /function %}}

A negative ratio represents a turn to the left, a positive one to the right. The value of 0 represents a straight track.

{{% warning-nontitle %}}

This command can only be used at the beginning of a block.

{{% /warning-nontitle %}}

{{% warning-nontitle %}}

This command is deprecated - use Track.Curve instead.

{{% /warning-nontitle %}} 	 

---

{{% command %}}
**Track.Height** *<font color=green>Y</font>*
{{% /command %}}

{{% command-arguments %}}
***<font color=green>Y</font>***: A floating-point number representing the height of the player's rail, **by default** measured in **meters**.
This command defines the height of the player's rail above the ground at the point of insertion. It influences the placement of the ground objects defined via Structure.Ground and changed via Track.Ground. The height is interpolated between adjacent Track.Height commands. For example, the following two codes produce equivalent results:
{{% /command-arguments %}}

*Example of a Track.Height command interpolated at 25m boundaries:*
{{% code %}}
1000, Track.Height 1  
1075, Track.Height 4  
{{% /code %}}

*Example of Track.Height explicitly set each 25m to produce the same result:*
{{% code %}}
1000, Track.Height 1  
1025, Track.Height 2  
1050, Track.Height 3  
1075, Track.Height 4  
{{% /code %}}

{{% warning-nontitle %}}

This command can only be used at the beginning of a block.

{{% /warning-nontitle %}}
