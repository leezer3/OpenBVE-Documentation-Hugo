---
title: "The **.csv** route format"
linktitle: "The CSV route"
weight: 1
---

➟ [Quick reference...](/routes/csv_quick.html) 

{{% warning %}}

#### Still under construction

Commands that still require documentation: **2**

{{% /warning %}}

## ■ 1. Overview

A CSV route allows to create a route in a text file.

The file is a plain text file encoded in any arbitrary [encoding](/information/encodings.html), however, UTF-8 with a byte order mark is the preferred choice. The [parsing model](https://openbve-project.net/documentation/HTML/information_numberformats.html) for numbers is **Loose** (unless otherwise stated), however, you are encouraged to produce *Strict* output nonetheless. The file is required to be located inside any folder whose current or parent folder includes the *Railway* and *Train* folders. The file name is arbitrary, but must have the extension **.csv**. The file is interpreted on a per-line basis, from top to bottom, where each line is split into expressions, which are interpreted from left to right.

The route file consists of a series of commands to define the objects which are used throughout the route (Structure namespace). Additional properties for the route, for the default train to be used and for the background images to be used can also be defined. At last, the route file will contain instructions from the Track namespace. Here, track positions (usually in meters) are used to define when the track should curve, when stations are to be placed, when a wall should start and end, and so on. Generally speaking, instructions from the Track namespace should be used after using instructions from any of the other namespaces.

The format assumes an implicit rail 0 which cannot be explicitly started or ended. Instead, it is present from the beginning of the route to the end, and it marks the rail the player's train drives on. All other rails in the CSV format are purely visual and have no functional purpose.

Geometrically, you can curve and pitch the implicit rail 0, while all other rails are defined relative to rail 0 and follow rail 0 into curves and pitch changes. Unless overridden, the file format is built around a fixed block size of 25 meters length, and it is only possible for certain commands to be used on 25 meter block boundaries. The placement of objects always assumes a non-curved coordinate system which connects blocks linearly.

➟ [See also the quick reference for the CSV route...](/routes/csv_quick.html)

## ■ 2. Syntax

For each line in the file, [white spaces](/information/whitespaces.html) at the beginning and the end of that line are ignored. Then, lines are split into individual expressions, separated by commas (U+002C). Thus, each line is of the following form:

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
A non-negative [strict](/information/numberformats.html) floating-point number corresponding to a track position. All subsequent commands from the Track namespace are associated to this track position.

{{% command %}}  
*Part<sub>1</sub>*:*Part<sub>2</sub>*:...:*Part<sub>n</sub>*  
{{% /command %}}  
This is a more complex way of specifying track positions for use in conjunction with Options.UnitOfLength. Each of the *Part<sub>i</sub>* is a [strict](/information/numberformats.html) floating-point number. *Part<sub>1</sub>* will be multiplied with *Factor<sub>1</sub>*, *Part<sub>2</sub>* with *Factor<sub>2</sub>*, and so on, then all products are added together to form the final track position. This track position must be non-negative. The parts are separated by colons (U+003A). Please consult Options.UnitOfLength for further information on how to define the factors.

Wherever arguments in commands represent lengths, they can also be entered using the colon notation. These cases are highlighted in green in the following.

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

```
With Route
.Gauge 1435
.Timetable 1157_M
```

{{% /code %}}

Is equivalent to:

{{% code %}}

```
Route.Gauge 1435
Route.Timetable 1157_M
```

{{% /code %}}

## ■ 3. Preprocessing

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

```
10$Rnd(3;5)0, Track.FreeObj 0; 1
```

{{% /code %}}

{{% code "*Possible outcome from the previous example is exactly __one__ of these lines:*" %}}

```
1030, Track.FreeObj 0; 1
1040, Track.FreeObj 0; 1
1050, Track.FreeObj 0; 1
```

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

```
$Sub(0) = $Rnd(3; 5)
1000, Track.FreeObj $Sub(0); 47
1020, Track.FreeObj $Sub(0); 47
1040, Track.FreeObj $Sub(0); 47
```

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

```
$Sub(1) = 0
With Track
$If($Sub(1))
    1020, .FreeObj 0; 1
    1040, .FreeObj 0; 2
$Else()
    1030, .FreeObj 0; 3
$EndIf()
```

{{% /code %}}

{{% code "*Another example of $If, $Else and $EndIf*" %}}

```
With Track
1050
$If($Rnd(0;1)), .FreeObj 0; 4, $Else(), .FreeObj 0; 5, $EndIf()
```

{{% /code %}}

It is possible to nest $If blocks. If you place $If/$Else/$EndIf on separate lines, you may want to employ indentation to improve readability of the block structure (as in the first example).

---

**Finally**, after the $-directives have been processed, all expressions in the route file are sorted according to their associated track positions.

{{% code "*Example of a partial route file:*" %}}

```
1000, Track.FreeObj 0; 23
1050, Track.RailType 0; 1
10$Rnd(3;7)0, Track.Rail 1; 4
Track.FreeObj 1; 42
```

{{% /code %}}

{{% code "*Preprocessing the $Rnd directive (assuming 3 is produced):*" %}}

```
1000, Track.FreeObj 0; 23
1050, Track.RailType 0; 1
1030, Track.Rail 1; 4
Track.FreeObj 1; 42
```

{{% /code %}}

{{% code "*Sorting by associated track positions:*" %}}

```
1000, Track.FreeObj 0; 23
1030, Track.Rail 1; 4
Track.FreeObj 1; 42
1050, Track.RailType 0; 1
```

{{% /code %}}

## ■ 4. The Options namespace

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
**Options.BlockLength** <font color="green">*Length*</font>  
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

## ■ 5. The Route namespace

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
**Train.Interval** *Interval<sub>0</sub>*; *Interval<sub>1</sub>*; ...; *Interval<sub>n-1</sub>*  
{{% /command %}}

{{% command-arguments %}}  
***ValueInSeconds***: A floating-point number representing the time interval between the player's train and the preceding train, measured in **seconds**. The default value is 0.  
{{% /command-arguments %}}

{{% note %}}

Train.ValueInSeconds is the same as Route.RunInterval.

{{% /note %}}