---
title: "The **.animated** object format"
linktitle: "The ANIMATED object"
weight: 3
---

## ■ Contents

{{% contents %}}

- [1. Descripció](#overview)
- [2. Seccions](#description)
- [3. List of infix notation operators](#operators)
- [4. Llista de funcions](#functions)
- [5. Llista de variables](#variables)
- [6. Rendiment](#performance)
- [7. Consells](#tips)
- [8. Funcions d'exemple](#examples)
- [9. Formal Grammar](#grammar)

{{% /contents %}}

## <a name="overview"></a>■ 1. Descripció

The ANIMATED object format is a container format allowing you to reference other objects (B3D/CSV/X) and to apply animation to them. It also allows to just group other objects (including other ANIMATED objects) without animating them.

Animated objects can be used in CSV/RW routes (unless explicitly disallowed by some commands), as train exterior objects via the *extensions.cfg*, and as 3D cabs via the *panel.animated* file.

##### ● Basics

Animation is performed via the following primitives:

- State changes - basically allowing to switch between different objects at any time
- Translation - moving objects in three independent directions
- Rotation - rotating objects around three independent axes
- Texture shifts - allowing to shift the texture coordinates of objects in two independent directions

##### ● A little formality

The file is a plain text file encoded in any arbitrary [encoding]({{< ref "/information/encodings/_index.md" >}}), however, UTF-8 with a byte order mark is the preferred choice. The [parsing model]({{< ref "/information/numberformats/_index.md" >}}) for numbers is **Strict**. The file name is arbitrary, but must have the extension **.animated**. The file is interpreted on a per-line basis, from top to bottom.

## <a name="description"></a>■ 2. Seccions

##### ● Secció [Include]

You can use the [Include] section to just include other objects, but without animating them. This allows you to use the ANIMATED object file as a container to group other objects. There can be any number of [Include] sections within the file.

{{% command %}}  
[Include]  
{{% /command %}}  
This starts the section.

{{% command %}}  
*FileName<sub>0</sub>*  
*FileName<sub>1</sub>*  
*FileName<sub>2</sub>*  
...  
{{% /command %}}  
Defines a series of B3D/CSV/X/ANIMATED objects that should be included as-is.

{{% command %}}  
**Position = X, Y, Z**  
{{% /command %}}  
This defines the position of the objects, basically allowing you to offset them with respect to the rest of the ANIMATED object file.

------

##### ● Secció [Object]

You can use the [Object] section to create a single animation. This requires to set up at least one state via the *States* parameter, and to use any combination of functions you want, which provide control over the animation. There can be any number of [Object] sections within the file.

{{% command %}}  
[Object]  
{{% /command %}}  
This starts the section.

{{% command %}}  
**Position = X, Y, Z**  
{{% /command %}}  
Defines the position of the object. This basically corresponds to a final TranslateAll command in the respective CSV/B3D file, but is performed after any of the functions are performed. For example, if you want to use rotation, then keep in mind that rotation is done around the origin (0,0,0). The *Position* command allows you to reposition the object after the rotation is performed.

{{% command %}}  
**States = File<sub>0</sub>, File<sub>1</sub>, ..., File<sub>n-1</sub>**  
{{% /command %}}  
Loads *n* objects of CSV/B3D/X extension. Please note that the first file indicated has state index 0. Use multiple files only if you want to use state changes.

{{% command %}}  
**StateFunction = Formula**  
{{% /command %}}  
This defines the function for state changes. The result of the *Formula* is rounded toward the nearest integer. If that integer is between 0 and *n*-1, where *n* is the number of states as defined via *States*, the respective state is shown, otherwise, no object is shown. You can make use of the latter if you want an object to toggle on/off with only one state.

{{% command %}}  
**TranslateXDirection = X, Y, Z**  
**TranslateYDirection = X, Y, Z**  
**TranslateZDirection = X, Y, Z**  
{{% /command %}}  
These define the directions for the *TranslateXFunction*, *TranslateYFunction* and *TranslateZFunction*, respectively. The default directions are:

*TranslateXDirection = 1, 0, 0*  
*TranslateYDirection = 0, 1, 0*  
*TranslateZDirection = 0, 0, 1*

This means that TranslateXFunction will move right by default, TranslateYFunction up and TranslateZFunction forward, which is also why TranslateXFunction and so on bear their names. If you define other directions, then simply think of the three functions and associated directions as three independent ways to move the object in that direction.

{{% command %}}  
**TranslateXFunction = Formula**  
**TranslateYFunction = Formula**  
**TranslateZFunction = Formula**  
{{% /command %}}  
These define the functions to move the object into the respective direction. The *Formula* needs to return the amount of meters to move from the initial position. The *X*, *Y* and *Z* parameters in the respective direction are multiplied by the result of *Formula*, so you could for example either multiple the formula by 2 or the direction by 2 if you want to double the speed of movement.

{{% command %}}  
**RotateXDirection = X, Y, Z**  
**RotateYDirection = X, Y, Z**  
**RotateZDirection = X, Y, Z**  
{{% /command %}}  
These define the directions for the *RotateXFunction*, *RotateYFunction* and *RotateZFunction*, respectively. The default directions are:

*RotateXDirection = 1, 0, 0*  
*RotateYDirection = 0, 1, 0*  
*RotateZDirection = 0, 0, 1*

This means that RotateXFunction will rotate around the x-axis by default, RotateYFunction around the Y-axis, and RotateZFunction around the z-axis, which is also why RotateXFunction and so on bear their names. If you define other directions, then simply think of the three functions and associated directions as three independent ways to rotate the object.

{{% command %}}  
**RotateXFunction = Formula**  
**RotateYFunction = Formula**  
**RotateZFunction = Formula**  
{{% /command%}}  
These define the functions to rotate along the respective direction in counter-clockwise order. The *Formula* needs to return the angle by which to rotate in radians. The order in which the rotations are performed is: RotateXFunction (first), RotateYFunction (then) and RotateZFunction (last). If you use more than one rotation function at a time, bear this order in mind. If necessary, overwrite the default directions for the rotations if you need a different order.

{{% command %}}  
**RotateXDamping = NaturalFrequency, DampingRatio**  
**RotateYDamping = NaturalFrequency, DampingRatio**  
**RotateZDamping = NaturalFrequency, DampingRatio**  
{{% /command %}}  
These define damping for the corresponding functions. If not used, damping will not be performed. *NaturalFrequency* is a non-negative value corresponding to the angular frequency of an assumed undamped oscillator in radians per second. *DampingRatio* is a non-negative value indicating the type of damping. Values between 0 and 1 represent under-damping, 1 represents critical damping, and values above 1 represent over-damping.

{{% command %}}  
**TextureShiftXDirection = X, Y**  
**TextureShiftYDirection = X, Y**  
{{% /command %}}  
These define the directions for the *TextureShiftXFunction* and *TextureShiftYFunction*, respectively. The default directions are:

*TextureShiftXDirection = 1, 0*  
*TextureShiftYDirection = 0, 1*

This means that TextureShiftXFunction will shift the texture right by default, and TextureShiftYFunction down, which is also why TextureShiftXFunction and so on bear their names. If you define other directions, then simply think of the two functions and associated directions as two independent ways to shift textures on the objects.

{{% command %}}  
**TextureShiftXFunction = Formula**  
**TextureShiftYFunction = Formula**  
{{% /command %}}  
These define the functions to shift the texture in the respective direction. The texture is shifted by the return value of *Formula* in texture coordinates. The integer part of the result is ignored, and a fractional part of 0.5 represents moving the texture half way. The SetTextureCoordinate commands in the object file define the coordinates, which are then added the outcome of these formulas.

{{% command %}}  
**TrackFollowerFunction = Formula**  
{{% /command %}}  
This defines the function which moves an object along the path of **Rail 0**. *Formula* must return a distance in meters, for which the object is then moved, respecting the curves and height changes of **Rail 0**.

{{% command %}}  
**TextureOverride = Value**  
{{% /command %}}  
*Value* = **Timetable**: All faces will show the timetable bitmap as set up by CSV/RW routes.  
*Value* = **None**: The original textures will be displayed on the faces (default behavior).

{{% command %}}  
**RefreshRate = Seconds**  
{{% /command %}}  
This defines the minimum amount of time that needs to pass before the functions are updated. A value of 0 forces the functions to be updated every frame. Please note that objects outside of the visual range might be updated less frequently regardless of this parameter. Use RefreshRate when you don't need a perfectly smooth animation (in order to optimize performance), or when you deliberately want the object to be only updated in fixed intervals.

------

##### ● The [Sound] section

You can use the [Sound] section to add standalone sound effects to animated objects.

{{% command %}}  
[Sound]  
{{% /command %}}  
This starts the section.

{{% command %}}  
**FileName = File**
{{% /command %}}  
This loads the sound effect to play.

{{% command %}}  
**Position = X, Y, Z**  
{{% /command %}}  
Defines the position of the sound, relative to the center of the animated file.

{{% command %}}  
**Volume = Value**  
{{% /command %}}  

This defines the initial volume of the sound at the source position. A value of **1.0** represents the nominal unchanged volume of the sound file.

{{% command %}}  
**Pitch = Value**  
{{% /command %}}  

This defines the initial pitch of the sound at the source position. A value of **1.0** represents the nominal unchanged pitch of the sound file.

{{% command %}}  
**Radius = Value**  
{{% /command %}}  

This defines the radius in meters from it's source at which the sound effect plays at full volume. The default value is **30**.

{{% command %}}  
**VolumeFunction = Formula**  
{{% /command %}}  
This defines the function which controls the volume of the sound. *Formula* must return a number representing the desired volume, where **1.0** represents the nomimal unchanged volume of the sound file.

{{% command %}}  
**PitchFunction = Formula**  
{{% /command %}}  
This defines the function which controls the pitch of the sound. *Formula* must return a number representing the desired pitch, where **1.0** represents the nomimal unchanged pitch of the sound file.

{{% command %}}  
**TrackFollowerFunction = Formula**  
{{% /command %}}  
This defines the function which moves the source of the sound along the path of **Rail 0**. *Formula* must return a distance in meters, for which the object is then moved, respecting the curves and height changes of **Rail 0**.

------

##### ● The [StateChangeSound] section

You can use the [StateChangeSound] section to attach sound effects to the preceeding [Object] section.

{{% command %}}  
[StateChangeSound]  
{{% /command %}}  
This starts the section- Must immediately follow an [Object] section.

{{% command %}}  
**FileName = File**
{{% /command %}}  
This loads the sound effect to play for all state changes. Alternatively, **FileNames** may be used, which is described below:

{{% command %}}  
**FileNames = File<sub>0</sub>, File<sub>1</sub>, ..., File<sub>n-1</sub>**  
{{% /command %}}  
Loads a list of *n* sounds, which correspond to the states in the [Object] section above.
If a state is to have no sound effect, the list entry should be left blank.

{{% command %}}  
**Position = X, Y, Z**  
{{% /command %}}  
Defines the position of the sound, relative to the center of the animated file.

{{% command %}}  
**Volume = Value**  
{{% /command %}}  

This defines the volume of the sound at the source position. A value of **1.0** represents the nominal unchanged volume of the sound file.

{{% command %}}  
**Pitch = Value**  
{{% /command %}}  

This defines the pitch of the sound at the source position. A value of **1.0** represents the nominal unchanged pitch of the sound file.

{{% command %}}  
**Radius = Value**  
{{% /command %}}  

This defines the radius in meters from it's source at which the sound effect plays at full volume. The default value is **30**.

{{% command %}}  
**PlayOnShow = Value**  
{{% /command %}}  

*Value* = **0**: The sound effect will not be played.
*Value* = **1**: The sound effect will be played.

This defines whether the sound effect defined above should be played when a the relevant state is shown. 

{{% command %}}  
**PlayOnHide = Value**  
{{% /command %}}  


*Value* = **0**: The sound effect will not be played.
*Value* = **1**: The sound effect will be played.

This defines whether the sound effect defined above should be played when the relevant state is hidden.

------

{{% warning %}}

#### openBVE 2 compatibility note

During the development of openBVE (v0.9) and during the development of the animated object format, there were certain commands in existance ending in *RPN*, such as *TranslateXFunctionRPN*. These commands never made it into any official release (v1.0) and were thus never meant to be used outside of development environments. While they are still available undocumentedly, they will be removed for openBVE 2. If you are using these commands, please get rid of them as soon as possible.

{{% /warning %}}

------

##### ● About the formulas

First of all, infix notation, which is what you can enter for *Formula*, is converted into functional notation. Thus for every infix notation, there is a corresponding functional notation. Some functions do not have an infix operator and can thus only be entered in functional notation. For operators, precedence plays an important role. You can use parantheses to override the order of precedence just as in any usual mathematical formula. Names of functions are case-insensitive.

{{% warning-nontitle %}}

Please note that if the result of any mathematical operation or function would be infinity, indeterminate or non-real, 0 is returned. Numeric overflow is not prevented, so you need to take that into account yourself.

{{% /warning-nontitle %}}

## <a name="operators"></a>■ 3. List of infix notation operators

##### ● Basic arithmetics

{{% table %}}

| Infix   | Functional       | Description               |
| :------ | :--------------- | :------------------------ |
| `a + b` | `Plus[a,b, ...]` | Represents addition       |
| `a - b` | `Subtract[a,b]`  | Represents subtraction    |
| `-a`    | `Minus[a]`       | Negates the number        |
| `a * b` | `Times[a,b,...]` | Represents multiplication |
| `a / b` | `Divide[a,b]`    | Represents division       |

{{% /table %}}

##### ● Comparisons

All comparisons return 1 for true and 0 for false.

{{% table %}}

| Infix    | Functional          | Description                                     |
| :------- | ------------------- | ----------------------------------------------- |
| `a == b` | `Equal[a,b]`        | True (1) if *a* equals *b*                      |
| `a != b` | `Unequal[a,b]`      | True (1) if *a* does not equal *b*              |
| `a < b`  | `Less[a,b]`         | True (1) if *a* is less than *b*                |
| `a > b`  | `Greater[a,b]`      | True (1) if *a* is greater than *b*             |
| `a <= b` | `LessEqual[a,b]`    | True (1) if *a* is less than or equal to *b*    |
| `a >= b` | `GreaterEqual[a,b]` | True (1) if *a* is greater than or equal to *b* |

{{% table %}}

##### ● Logical operations

All operations treat 0 as false and any other value as true, and return 1 for true and 0 for false.

{{% table %}}

| Infix          | Functional | Description                            |
| :------------- | ---------- | -------------------------------------- |
| `!a`           | `Not[a]`   | True (1) if *a* is false               |
| `a & b`        | `And[a,b]` | True (1) if both *a* and *b* are true  |
| `a` &#124; `b` | `Or[a,b]`  | True (1) if any of *a* or *b* are true |
| `a ^ b`        | `Xor[a,b]` | True (1) if either *a* or *b* is true  |

{{% /table %}}

##### ● Operator precedence

From highest precedence to lowest. Operators of same precedence are evaluated either left to right or right to left, depending on if they share a precedence with another operator.

{{% table %}}

| Operator                         | Associativity | Unparenthesized | Equivilant      |
| -------------------------------- |---------------|-----------------|-----------------|
| `a[...]`                         | unary         | &nbsp;          | &nbsp;          |
| `-` (Minus)                      | unary         | &nbsp;          | &nbsp;          |
| `/`                              | right-to-left | 1 / 2 / 3       | (1 / (2 / 3))   |
| `*`                              | right-to-left | 1 * 2 * 3       | (1 * (2 * 3))   |
| `+`, `-` (Subtract)              | left-to-right | 1 + 2 + 3       | ((1 + 2) + 3)   |
| `==`, `!=`, `<`, `>`, `<=`, `>=` | left-to-right | 1 <= 2 <= 3     | ((1 <= 2) <= 3) |
| `!`                              | unary         | &nbsp;          | &nbsp;          |
| `&`                              | right-to-left | 1 & 2 & 3       | (1 & (2 & 3))   |
| `^`                              | right-to-left | 1 ^ 2 ^ 3       | (1 ^ (2 ^ 3))   |
| &#124;                           | right-to-left | 1 &#124; 2 &#124; 3       | (1 &#124; (2 &#124; 3))   |

{{% /table %}}

<br>

{{% warning-nontitle %}}

The logical not and multiplication operator are not at the same precedence level as a lot of other languages. For example `!a + !b` is `!(!a + !(b))` **not** `(!a) + (!b)` as expected, similarly `1 * 2 / 3` is `1 * (2 / 3)` **not** `(1 * 2) / 3`

Please also note that some combinations of prefix and infix operators are not recognised. For example `a*-b` is not accepted. Use `a*(-b)` or `-a*b` instead.

{{% /warning-nontitle %}}

## <a name="functions"></a>■ 4. List of functions

##### ● Basic arithmetics

{{% table %}}

| Function         | Description                                                  |
| ---------------- | ------------------------------------------------------------ |
| `Reciprocal[x]`  | Returns the reciprocal, equal to 1/*x*                       |
| `Power[a,b,...]` | Returns *a* raised to the *b*<sup>th</sup> power. *b* must be a non-negative number. For consistency, Power[0,*b*] always returns 1, even in the degenerate case Power[0,0], and *a* being negative always returns 0. Adding more arguments will create a chain. Power[a,b,c] will return *a*<sup>*b*<sup>*c*</sup></sup>. |

{{% /table %}}

#####  ● Numeric functions

{{% table %}}

| Function                      | Description                                                  |
| ----------------------------- | ------------------------------------------------------------ |
| `Quotient[a,b]`               | Divides *a* by *b* and rounds the result down, equal to `Floor[a/b]`. |
| `Mod[a,b]`                    | Returns the remainder of dividing *a* by *b*, equal to `a-b*Floor[a/b]`. |
| `Min[a,b,...]`                | Returns the smallest of the terms.                           |
| `Max[a,b,...]`                | Returns the largest of the terms.                            |
| `Abs[x]`                      | Returns the absolute value.                                  |
| `Sign[x]`                     | Returns the sign of *x*, which is either -1, 0 or 1.         |
| `Floor[x]`                    | Rounds down to the nearest integer.                          |
| `Ceiling[x]`                  | Rounds up to the nearest integer.                            |
| `Round[x]`                    | Rounds to the nearest integer. Numbers ending in .5 are rounded to the nearest even integer. |
| `random[Minimum, Maximum]`    | Returns a new random floating-point number between *Minimum* and *Maximum*. |
| `randomInt[Minimum, Maximum]` | Returns a new random integer between *Minimum* and *Maximum*. |

{{% /table %}}

##### ● Elementary functions

{{% table %}}

| Function    | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| `Exp[x]`    | The exponential function, or *e* to the *x*<sup>th</sup> power. |
| `Log[x]`    | The natural logarithm, to base *e*.                          |
| `Sqrt[x]`   | The square root.                                             |
| `Sin[x]`    | The sine (input in radians).                                 |
| `Cos[x]`    | The cosine (input in radians).                               |
| `Tan[x]`    | The tangent (input in radians).                              |
| `ArcTan[x]` | The inverse tangent (output in radians).                     |

{{% /table %}}

##### ● Conditionals

{{% table %}}

| Function                        | Description                                                  |
| ------------------------------- | ------------------------------------------------------------ |
| `If[cond,truevalue,falsevalue]` | If *cond* is != 0, returns *truevalue*, otherwise *falsevalue* |

{{% /table %}}

## <a name="variables"></a>■ 5. List of variables

##### ● Primitives

{{% table %}}

| Variable       | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| `value`        | The value returned by the function in the last evaluation. At the beginning of the simulation, this is 0. |
| `delta`        | The time difference since the last evaluation of the function in seconds. Please note that there is no guaranteed time that elapses between successive function calls. |
| `currentState` | Returns the current numerical state of the object.           |

{{% /table %}}

##### ● Time and camera

{{% table %}}

| Variable         | Description                                                  |
| ---------------- | ------------------------------------------------------------ |
| `time`           | The current in-game time measured in seconds since midnight of the first day. |
| `cameraDistance` | The non-negative cartesian distance measured from the object to the camera in meters. |
| `cameraMode`     | Returns 0 if the camera is currently in a 2D or 3D cab, 1 otherwise. |

{{% /table %}}

##### ● Trains

Generally, objects attached to a particular train and car return values for that train and car, unless stated otherwise. For scenery objects, the reference is the driver's car of the nearest train (not necessarily the player's train).

In some of the following variables, *carIndex* has the following meaning: 0 is the 1<sup>st</sup> car from the front, 1 is the 2<sup>nd</sup> car from the front, etc., while -1 is the 1<sup>st</sup> car from the rear, -2 is the 2<sup>nd</sup> car from the rear, etc. In general, car indices from -*cars* to *cars*-1 represent existing cars, where *cars* is the number of cars the train has, while values outside of this range represent non-existing cars. As all trains have at least 1 car, indices -1 and 0 are guaranteed to exist for any train.

##### ● Trains (general)

{{% table %}}

| Variable                      | Description                                                  |
| ----------------------------- | ------------------------------------------------------------ |
| `cars`                        | The number of cars the train has.                            |
| `speed`                       | The signed actual speed of the current car in m/s. Is positive when the train travels forward, and negative when the train travels backward. |
| `speed[carIndex]`             | The signed actual speed of the car *carIndex* in m/s. Is positive when the train travels forward, and negative when the train travels backward. |
| `speedometer`                 | The signed perceived speed of the current car in m/s as it would appear to a speedometer on wheel slip and wheel lock. |
| `speedometer[carIndex]`       | The signed perceived speed of the car *carIndex* in m/s as it would appear to a speedometer on wheel slip and wheel lock. |
| `acceleration`                | The actual acceleration of the current car in m/s².          |
| `acceleration[carIndex]`      | The actual acceleration of the car *carIndex* in m/s².       |
| `accelerationMotor`           | The acceleration which the motor of the first motor car currently generates in m/s². |
| `accelerationMotor[carIndex]` | The acceleration which the motor of the car *carIndex* currently generates in m/s². |
| `distance`                    | The non-negative cartesian distance measured from the object to the closest car in meters. Only meaningful for scenery objects. |
| `distance[carIndex]`          | The non-negative cartesian distance measured from the object to the car *carIndex* in meters, or 0 if the car does not exist. Only meaningful for scenery objects. |
| `trackDistance`               | The signed track distance measured from the object to the closest end of the nearest train in meters. Is positive when the train is in front of the object, negative when behind, and zero when the object lies between the ends of the train. |
| `trackDistance[carIndex]`     | The signed track distance measured from the object to the car *carIndex* of the nearest train in meters. Is positive when the center of the car is in front of the object, and negative if behind. Returns 0 if the car does not exist. Only meaningful for scenery objects. |
| `destination`                 | The currently set destination for this train. (Set via *Track.Destination* or the plugin interface) |
| `distanceNextStation`         | The distance in m to the next station. |
| `distanceStation[stationIndex]`| The distance in m to the station with *stationIndex* |
| `stopsNextStation`            | Whether the train stops at the next station. |
| `stopsStation[stationIndex]`  | Whether the train stops at the station with *stationIndex* |
| `nextStation`                 | The index of the next station. |
| `nextStationStop`             | The index of the next station where the train must stop. |

{{% /table %}}

##### ● Trains (brake)

{{% table %}}

| Variable                       | Description                                                  |
| ------------------------------ | ------------------------------------------------------------ |
| `mainReservoir`                | The current pressure in the main reservoir in this car, measured in Pa. |
| `mainReservoir[carIndex]`      | The current pressure in the main reservoir in car *carIndex*, measured in Pa. |
| `emergencyReservoir`           | The current pressure in the emergency reservoir in this car, measured in Pa. |
| `emergencyReservoir[carIndex]` | The current pressure in the emergency reservoir in car *carIndex*, measured in Pa. |
| `brakePipe`                    | The current pressure in the brake pipe in this car, measured in Pa. |
| `brakePipe[carIndex]`          | The current pressure in the brake pipe in car *carIndex*, measured in Pa. |
| `brakeCylinder`                | The current pressure in the brake cylinder in this car, measured in Pa. |
| `brakeCylinder[carIndex]`      | The current pressure in the brake cylinder in car *carIndex*, measured in Pa. |
| `straightAirPipe`              | The current pressure in the straight air pipe in this car, measured in Pa. |
| `straightAirPipe[carIndex]`    | The current pressure in the straight air pipe in car *carIndex*, measured in Pa. |

{{% /table %}}

##### ● Trains (doors)

{{% table %}}

| Variable                     | Description                                                  |
| ---------------------------- | ------------------------------------------------------------ |
| `doors`                      | The state of the doors. Returns 0 if fully closed, 1 if fully opened, or any intermediate value, biasing doors that are in a more open state. |
| `doors[carIndex]`            | The state of the doors of car *carIndex*. Returns 0 if fully closed, 1 if fully opened, or any intermediate value, biasing doors that are in a more open state. |
| `leftDoors`                  | The state of the left doors. Returns 0 if fully closed, 1 if fully opened, or any intermediate value, biasing doors that are in a more open state. |
| `leftDoors[carIndex]`        | The state of the left doors of car *carIndex*. Returns a value between 0 and 1, biasing doors that are in a more open state, or -1 if the car does not exist. |
| `rightDoors`                 | The state of the right doors. Returns 0 if fully closed, 1 if fully opened, or any intermediate value, biasing doors that are in a more open state. |
| `rightDoors[carIndex]`       | The state of the right doors of car *carIndex*. Returns a value between 0 and 1, biasing doors that are in a more open state, or -1 if the car does not exist. |
| `leftDoorsTarget`            | The anticipated target state of the left doors. Returns either 0 (closed) or 1 (opened). |
| `leftDoorsTarget[carIndex]`  | The anticipated target state of the left doors of car *carIndex*. Returns either 0 (closed) or 1 (opened). |
| `rightDoorsTarget`           | The anticipated target state of the right doors. Returns either 0 (closed) or 1 (opened). |
| `rightDoorsTarget[carIndex]` | The anticipated target state of the right doors of car *carIndex*. Returns either 0 (closed) or 1 (opened). |
| `leftDoorsButton`            | The state of the left doors button. Returns either 0 (released) or 1 (pressed). |
| `rightDoorsButton`           | The state of the right doors button. Returns either 0 (released) or 1 (pressed). |
| `pilotLamp`                  | The state of the pilot lamp (Doors closed & ready to start). Returns either 0 (unlit) or 1 (lit). |

{{% /table %}}

##### ● Trains (miscellaneous)

{{% table %}}

| Variable                         | Description                                                  |
| -------------------------------- | ------------------------------------------------------------ |
| `reverserNotch`                  | The state of the reverser, which is either -1 (backward), 0 (neutral), or forward (1). |
| `powerNotch`                     | The current power notch, i.e. 0 for N, 1 for P1, 2 for P2, 3 for P3, etc. |
| `powerNotches`                   | The amount of power notches the train has.                   |
| `brakeNotch`                     | The current brake notch.<br />● For trains without the automatic air brake: 0 for N, 1 for B1, 2 for B2, 3 for B3, etc.<br />● For trains with the automatic air brake: 0 for REL, 1 for LAP and 2 for SRV. |
| `brakeNotches`                   | The amount of brake notches the train has. For trains with the automatic air brake, this returns 2. |
| `brakeNotchLinear`               | A combination of brake notch, hold brake and emergency brake.<br />● For trains without the automatic air brake and without hold brake: 0 for N, 1 for B1, 2 for B2, 3 for B3, etc., up to *BrakeNotches*+1 for EMG.<br />● For trains without the automatic air brake but with hold brake: 0 for N, 1 for HLD, 2 for B1, 3 for B2, 4 for B3, etc., up to *BrakeNotches*+2 for EMG.<br />● For trains with the automatic air brake: 0 for REL, 1 for LAP, 2 for SRV or 3 for EMG. |
| `brakeNotchesLinear`             | The highest value returned by *brakeNotchesLinear*.<br />● For trains without the automatic air brake and without hold brake, this is *BrakeNotches*+1.<br />● For trains without the automatic air brake but with hold brake, this is *BrakeNotches*+2.<br />● For trains with the automatic air brake, this returns 3. |
| `locoBrake`                      | The current Loco Brake notch.                                |
| `locoBrakeNotches`               | The amount of Loco Brake notches the train has.              |
| `emergencyBrake`                 | Whether the emergency brake is currently active (1) or not (0). |
| `hasAirBrake`                    | Whether the train has the automatic air brake (1) or not (0). |
| `holdBrake`                      | Whether the hold brake is currently active (1) or not (0).   |
| `hasHoldBrake`                   | Whether the train has a hold brake (1) or not (0).           |
| `constSpeed`                     | Whether the const speed system is currently active (1) or not (0). |
| `hasConstSpeed`                  | Whether the train has a const speed system (1) or not (0).   |
| `hasPlugin`                      | Whether the train uses a plugin (1) or not (0).              |
| `pluginState[i]`                 | The state of the i<sup>th</sup> plugin variable, returning an integer depending on the plugin. Is the same as ats*i* in the panel2.cfg. |
| `FrontAxleCurveRadius[carIndex]` | Returns the curve radius at the front axle position of car *carIndex*. |
| `RearAxleCurveRadius[carIndex]`  | Returns the curve radius at the rear axle position of car *carIndex*. |
| `CurveCant[carIndex]`            | Returns the cant value for car *carIndex*.                   |
| `Pitch[carIndex]`                | Returns the pitch value for car *carIndex*.                  |
| `Odometer`                       | Returns a signed number representing the distance in meters travelled by the current car. |
| `Odometer[carIndex]`             | Returns a signed number representing the distance in meters travelled by car *carIndex*. |
| `Klaxon`                         | Returns the currently playing horn (if any) as follows: (0) No horns are playing (1) The primary horn is playing (2) The secondary horn is playing (3) The music horn is playing. *Note* If multiple horns are playing, the lowest value will be returned. |
| `PrimaryKlaxon`                  | Returns 1 if the primary horn is currently playing, 0 otherwise. |
| `SecondaryKlaxon`                | Returns 1 if the secondary horn is currently playing, 0 otherwise. |
| `MusicKlaxon`                    | Returns 1 if the music horn is currently playing, 0 otherwise. |
| `passAlarm`                      | Whether the station pass alarm has been activated. Returns either 0 (inactive) or 1 (active). |
| `stationAdjustAlarm`             | Whether the station adjust alarm has been activated. Returns either 0 (inactive) or 1 (active). |

{{% /table %}}

If *pluginState[i]* is used with the built-in safety systems ATS and ATC, the following mappings for *i* apply:

{{% table %}}

| *i*  | English             | 日本語       | Return values                                |      | pluginState[271] | Meaning           |
| ---- | ------------------- | ------------ | -------------------------------------------- | ---- | ---------------- | ----------------- |
| 256  | ATS                 | ATS          | 0 (unlit) or 1 (lit)                         |      | 0                | ATC not available |
| 257  | ATS RUN             | ATS 作動     | 0 (unlit), 1 (lit) or 2 (flashing)           |      | 1                | 0 km/h            |
| 258  | ATS RUN             | ATS 作動     | 0 (unlit / non-flashing), 1 (lit / flashing) |      | 2                | 15 km/h           |
| 259  | P POWER             | P 電源       | 0 (unlit) or 1 (lit)                         |      | 3                | 25 km/h           |
| 260  | PTN APPROACH        | パターン接近 | 0 (unlit) or 1 (lit)                         |      | 4                | 45 km/h           |
| 261  | BRAKE RELEASE       | ブレーキ開放 | 0 (unlit) or 1 (lit)                         |      | 5                | 55 km/h           |
| 262  | BRAKE APPLY         | ブレーキ動作 | 0 (unlit) or 1 (lit)                         |      | 6                | 65 km/h           |
| 263  | ATS P               | ATS-P        | 0 (unlit) or 1 (lit)                         |      | 7                | 75 km/h           |
| 264  | FAILURE             | 故障         | 0 (unlit) or 1 (lit)                         |      | 8                | 90 km/h           |
| 265  | ATC                 | ATC          | 0 (unlit) or 1 (lit)                         |      | 9                | 100 km/h          |
| 266  | ATC POWER           | ATC 電源     | 0 (unlit) or 1 (lit)                         |      | 10               | 110 km/h          |
| 267  | ATC SRV             | ATC 常用     | 0 (unlit) or 1 (lit)                         |      | 11               | 120 km/h          |
| 268  | ATC EMG             | ATC 非常     | 0 (unlit) or 1 (lit)                         |      | 12               | ATS is active     |
| 269  | CONST SPEED         | 定速         | 0 (unlit) or 1 (lit)                         |      |                  |                   |
| 270  | EB                  | EB           | 0 (unlit) or 1 (lit)                         |      |                  |                   |
| 271  | ATC speed indicator |              | 0 - 12, see table on the right               |      |                  |                   |

{{% /table %}}

##### ● Sections (signalling)

The section context is defined when the object is placed using Track.SigF.

{{% table %}}

| Variable  | Description                                                  |
| --------- | ------------------------------------------------------------ |
| `section` | The value of the section aspect currently shown.<br />*If this variable is used outside of a Track.SigF context, the behavior is currently undefined and subject to change.* |

{{% /table %}}

## <a name="performance"></a>■ 6. Performance

There are certain kinds of animation which are less expensive, and others which are more. Also, the underlying object plays a significant role. If you want to design your animated objects with as best performance as possible **for future releases of openBVE**, take a look at the following performance table:

{{% table %}}

| Animation      | Object                          | Performance |
| -------------- | ------------------------------- | ----------- |
| State changes  | Has only opaque faces           | Good        |
| State changes  | Has partially transparent faces | Moderate    |
| Translation    | Has only opaque faces           | Good        |
| Translation    | Has partially transparent faces | Moderate    |
| Rotation       | Has only opaque faces           | Good        |
| Rotation       | Has partially transparent faces | Bad         |
| Texture shifts | Has only opaque faces           | Bad         |
| Texture shifts | Has partially transparent faces | Bad         |

{{% /table %}}

Performance is generally better if the result of a function only infrequently changes. So, even if you set the *RefreshRate* parameter to zero, performance is generally better if the outcome of your formula is constant over longer periods of time. On the other hand, if it changes every frame, performance is generally worse.

Generally, you should avoid using animation with partially transparent faces and stick to opaque faces when possible. Also, try to avoid texture shifts, and consider using state changes or translation where possible.

## <a name="tips"></a>■ 7. Tips

- Generally speaking, try to keep the complexity of functions as low as possible. This is not the most critical aspect, though, as most of the performance impact will result from applying the results of a function, e.g. rotating the object, and not evaluating the function.
- Use the RefreshRate parameter when possible to optimize performance. Usually, you can use this parameter when you don't need a smooth animation, or when you deliberately want the functions to only update in intervals.
- Don't use functions which always evaluate to the same constant. For example, don't use RotateXFunction = 3.14159, but rotate the underlying CSV/B3D/X object directly.
- State changes are very cheap as long as the state doesn't actually change in between two executions of the StateFunction. If a change occurs, this is a relatively expensive operation, though.
- Try to optimize out *if* conditions. Especially try to avoid nested *if* functions. Often, there is an elegant mathematical solution.
- Certain functions, e.g. Exp, Sin, Cos, etc., are relatively expensive. Use them only if absolutely necessary for an effect. Don't include unnecessary operations. For example, the result of StateFunction is automatically rounded toward the nearest integer, so don't apply an additional explicit Round.
- When working with car objects, bear in mind that some variables have an optional car index. You should use this index if you want to query the state of a particular car (that is, not necessarily the one the object is attached to). If, however, you just want to query the value of the particular car the object is attached to, use the variable without the index. For scenery objects, you should not generally use car indices as you can't be sure how many cars the queried train has.

## <a name="examples"></a>■ 8. Example functions

##### ● Blinking light

{{% code "*Template for a blinking light:*" %}}  
States = OBJECT0, OBJECT1  
StateFunction = value == 0  
RefreshRate = SECONDS  
{{% /code %}}

##### ● Rotating wheel

{{% code "*Template for the code used in an exterior car object:*" %}}  
States = OBJECT  
RotateXFunction = value + delta * speedometer / RADIUS_OF_THE_WHEEL  
{{% /code %}}

##### ● Cycling through a list of objects

{{% code "*Template for objects that are to be cycled through:*"%}}  
States = OBJECT0, OBJECT1, OBJECT2, ...  
StateFunction = mod[value + 1, AMOUNT_OF_OBJECTS]  
RefreshRate = TIME_PER_OBJECT  
{{% /code %}}

##### ● Signal (3-aspect) for Track.Section(0; 2; 4)

{{% code %}}  
States = RED_OBJECT, YELLOW_OBJECT, GREEN_OBJECT  
StateFunction = section / 2  
{{% /code %}}

##### ● Employing an approach-controlled delay in signals

If you want to create a signal that keeps being red until the train approaches it to some distance, then counts down a timer before it changes aspect to green, please refer to [this post](http://openbve.freeforums.org/delay-in-approach-controlled-signals-t1195.html#p5378) on the forum for a detailed explanation. Once you understand the concepts, you can use this code template:

{{% code "*Template for an approach-controlled delay in a signal with two aspects:*" %}}  
States = RED_OBJECT, GREEN_OBJECT  
StateFunction = if[trackDistance>DISTANCE | section==0, 0, min[value + 0.5*delta/DELAY, 1]]  
{{% /code %}}

{{% code "*Template for an approach-controlled delay in a signal with any number of aspects:*" %}}  
States = RED_OBJECT, ..., GREEN_OBJECT  
StateFunction = if[trackDistance>DISTANCE | section==0, 0, if[value<0.5, value + 0.5*value/DELAY, section]]  
{{% /code %}}

## <a name="grammar"></a>■ 9. Formal Grammar

The formal grammar for the language may not match up perfectly with the implimentation included in OpenBVE. An example is a*-b which is valid under the grammar but the parser rejects it.

{{% code %}}  
&lt;expression>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;::=  &lt;xor_expression> "&amp;" &lt;expression> &nbsp;&nbsp;&nbsp;&nbsp;| &lt;xor_expression>  
&lt;xor_expression>&nbsp;&nbsp;&nbsp;&nbsp;::= &lt;or_expression>&nbsp;&nbsp;"^" &lt;xor_expression> | &lt;or_expression>  
&lt;or_expression>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;::= &lt;not_expression> "|" &lt;or_expression>&nbsp;&nbsp;| &lt;not_expression>   
<br/>&lt;not_expression>&nbsp;&nbsp;&nbsp;&nbsp;::= "!" &lt;equal_expression> | &lt;equal_expression>  
<br/>&lt;equal_expression>&nbsp;&nbsp;::= &lt;plus_expression> ("==" &lt;plus_expression>)* | &lt;plus_expression> ("!=" &lt;plus_expression>)`*`</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;plus_expression> (">"&nbsp; &lt;plus_expression>)`*` | &lt;plus_expression> ("&lt;"&nbsp; &lt;plus_expression>)`*` | <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;plus_expression> ("&lt;=" &lt;plus_expression>)`*` | &lt;plus_expression> ("&lt;=" &lt;plus_expression>)`*` | &lt;plus_expression><br/>
<br/>&lt;plus_expression>&nbsp;&nbsp;&nbsp;::= &lt;times_expression> ("+" &lt;times_expression>)`*`&nbsp; | &lt;times_expression> ("-" &lt;times_expression>)`*` | &lt;times_expression><br/>
<br/>&lt;times_expression>&nbsp;&nbsp;::= &lt;divide_expression> "\*" &lt;times_expression>  | &lt;divide_expression>  
&lt;divide_expression> ::= &lt;minus_expression>  "/" &lt;divide_expression> | &lt;minus_expression>  
<br/>&lt;minus_expression>&nbsp;&nbsp;::= "-" &lt;function_call> | &lt;function_call>  
&lt;function_call>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;::= &lt;name> "[" &lt;expression> ("," &lt;expression>)* "]" | &lt;term>  
<br/>&lt;term>&nbsp;&nbsp;&nbsp;::= "(" &lt;expression> ")" | &lt;name> | &lt;number>  
&lt;number> ::= &lt;digit>*  
&lt;name>&nbsp;&nbsp;&nbsp;::= &lt;letter> (&lt;letter> | &lt;digit>)*  
<br/>&lt;letter> ::= "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" |  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z" |  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" |  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z"  
&lt;digit>&nbsp;&nbsp;::= "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
{{% /code %}}