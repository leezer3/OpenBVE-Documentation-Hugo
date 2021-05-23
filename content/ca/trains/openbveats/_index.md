---
title: "Extensió OpenBveAts"
linktitle: "Extensió OpenBveAts"
weight: 8
---

OpenBveAts is the default train plugin used by OpenBVE when trains lack their own plugin. It simulates a basic version of ATS-SN, ATS-P and ATC. 
If you want to use this plugin in your train, then simply don't include the ats.cfg file. 
This plugin will then be used automatically.

{{% contents %}}

- [1. Panel Indices](#panel)
- [2. Sounds](#sounds)
- [3. Beacons](#beacons)
- [4. Special Beacons](#beacons-special)
- [5. Keyboard Assignments](#keyboard)

{{% /contents %}}

## <a name="panel"></a>■ 1. Panel Indices

The following panel indices are exposed:

**ATS-SN**

{{% table %}}

| Panel Index | Descripció                   | Value Range |
|-------------|-------------------------------|-------------|
| 256         |    ATS power (ATS電源)        | 0 - 1       |
| 257         | ATS actuation (ATS動作)       | 0 - 2       |
| 258         | ATS actuation (ATS動作)       | 0 - 1       |

{{% /table %}}

**ATS-P**

{{% table %}}

| Panel Index | Descripció                   | Value Range |
|-------------|-------------------------------|-------------|
| 259         |P power (P電源)                | 0 - 1       |
| 260         | pattern approach (パターン接近)  | 0 - 1      |
| 261         | brake release (ブレーキ開放)    | 0 - 1       |
| 262         | brake application (ブレーキ動作)| 0 - 1       |
| 263         | ATS-P                         | 0 - 1       |
| 264         | failure (故障)                | 0 - 1       |



**ATC speed indicator (panel index 271)**

{{% table %}}

| Valor | Descripció       |
|-------|-------------------|
| 0     | ATC not available |
| 1     | 0 km/h            | 
| 2     | 15 km/h           |
| 3     | 25 km/h           |
| 4     | 45 km/h           |
| 5     | 55 km/h           |
| 6     | 65 km/h           |
| 7     | 75 km/h           |
| 8     | 90 km/h           |
| 9     | 100 km/h          |
| 10    | 110 km/h          |
| 11    | 120 km/h          |
| 12    | ATS is active     |

{{% /table %}}

## <a name="sounds"></a>■ 2. Sons

The following sound indices are exposed:

{{% table %}}

| Índex | Fitxer       | Descripció    | Tipus    |
|-------|------------|----------------|---------|
|0      | ats.wav    | ATS bell       | looping |
|1      | atscnt.wav | ATS chime      | looping |
|2      | ding.wav   | ATS-P/ATC bell | once    |
|3      | toats.wav  | ATC to ATS     | once    |
|4      | toatc.wav  | ATS to ATC     | once    |
|5      | eb.wav     | EB bell        | looping |

{{% /table %}}

## <a name="beacons"></a>■ 3. Balises

The following beacon types are supported:

### Beacon Type 0 (S-Long)
{{% command %}}  
**Track.Beacon** 0; *Object*; *Signal* ; *Optional*  
{{% /command %}}

{{% command-arguments %}}  
***Object***: A positive integer (**>=1**) representing the beacon structure index to be displayed. Use **-1** for no object.  
***Signal***: An integer ranging from 0 to 255 representing the green component of the ambient light. The default value is 160.   
**Optional**: If the optional data is **0**, the train switches from ATS-P to ATS-SN. If the optional data is **-1**, the train stays in its current mode.
{{% /command-arguments %}}

When passing this beacon:

* If the signal is <font color=red>RED</font> , the alarm will sound.
* The train's safety system may switch modes, depending on the setting of **Optional**.

### Beacon Type 1 (SN-Immediate Stop)
{{% command %}}  
**Track.Beacon** 1; *Object*; *Signal* ; *Optional*  
{{% /command %}}

{{% command-arguments %}}  
***Object***: A positive integer (**>=1**) representing the beacon structure index to be displayed. Use **-1** for no object.  
***Signal***: An integer ranging from 0 to 255 representing the green component of the ambient light. The default value is 160.   
**Optional**: If the optional data is **0**, the train switches from ATS-P to ATS-SN. If the optional data is **-1**, the train stays in its current mode.
{{% /command-arguments %}}

When passing this beacon:

* If the signal is <font color=red>RED</font> , the emergency brakes will be applied immediately.
* The train's safety system may switch modes, depending on the setting of **Optional**.

### Beacon Type 2 (Accidental Departure)
{{% command %}}  
**Track.Beacon** 2; *Object*; *Signal* ; *Optional*  
{{% /command %}}

{{% command-arguments %}}  
***Object***: A positive integer (**>=1**) representing the beacon structure index to be displayed. Use **-1** for no object.  
***Signal***: An integer ranging from 0 to 255 representing the green component of the ambient light. The default value is 160.   
**Optional**: If the optional data is 0, the train switches from ATS-P to ATS-SN. If the optional data is -1, the train stays in its current mode. If the optional data is **greater than zero**, the beacon only triggers for trains with at most the specified number of cars, and the train switches from ATS-P to ATS-SN.
{{% /command-arguments %}}

When passing this beacon:

* If the signal is <font color=red>RED</font> , the emergency brakes will be applied immediately.
* The train's safety system may switch modes, depending on the setting of **Optional**.

### Beacon Type 3 (ATS-P Pattern Renewal)
{{% command %}}  
**Track.Beacon** 3; *Object*; *Signal* ; *Optional*  
{{% /command %}}

{{% command-arguments %}}  
***Object***: A positive integer (**>=1**) representing the beacon structure index to be displayed. Use **-1** for no object.  
***Signal***: An integer ranging from 0 to 255 representing the green component of the ambient light. The default value is 160.   
**Optional**: If the optional data is **0**, the train switches from ATS-SN to ATS-P. If the optional data is **-1**, the train stays in its current mode.
{{% /command-arguments %}}

When passing this beacon:

* The current ATS-P patterm is renewed.
* The train's safety system may switch modes, depending on the setting of **Optional**.

### Beacon Type 4 (ATS-P Immediate Stop)
{{% command %}}  
**Track.Beacon** 2; *Object*; *Signal* ; *Optional*  
{{% /command %}}

{{% command-arguments %}}  
***Object***: A positive integer (**>=1**) representing the beacon structure index to be displayed. Use **-1** for no object.  
***Signal***: An integer ranging from 0 to 255 representing the green component of the ambient light. The default value is 160.   
**Optional**: If the optional data is **0**, the train switches from ATS-SN to ATS-P. If the optional data is **-1**, the train stays in its current mode.
{{% /command-arguments %}}

When passing this beacon:

* The current ATS-P patterm is renewed.
* If the signal is red and less than 50 meters away, the brakes are applied immediately and the brake application needs to be canceled manually.
* The train's safety system may switch modes, depending on the setting of **Optional**.

## <a name="beacons-special"></a>■ 4. Balises especials

_**Note:**_ The following beacon types cannot be used directly in routes - They are automatically created by the CSV/RW parser to provide backward compatibility with ATS-P and ATC.

### Beacon type 0xFF000001 (ATC track status)

Marks the status of ATC. The optional data has the following meaning:

{{% table-nonheader %}}

| 0 | ATC not available                     |
|---|---------------------------------------|
| 1 | ATC available, switch from ATS to ATC |
| 2 | ATC available                         |
| 3 | ATC available, switch from ATC to ATS |

{{% /table-nonheader %}}

### Beacon type 0xFF000002 (ATC speed limit)

Sets up an ATC speed limit. The optional data has the following meaning:

{{% table-nonheader %}}

| bits 0-11  | Velocitat en km/h |
|------------|---------------|
| bits 12-31 | Distància en metres |

{{% /table-nonheader %}}

_**Note:**_ All speed limits in the entire route are communicated to the plugin at the beginning of the route, so the plugin keeps a database of known speed limits and then applies them as necessary.

### Beacon type 0xFF000003 (ATS-P temporary speed limit)

Sets up an ATS-P temporary speed limit. The optional data has the following meaning:

{{% table-nonheader %}}

| bits 0-11  | Velocitat en km/h |
|------------|---------------|
| bits 12-31 | Distància en metres |

{{% /table-nonheader %}}

_**Note:**_ All speed limits in the entire route are communicated to the plugin at the beginning of the route, so the plugin keeps a database of known speed limits and then applies them as necessary.

### Beacon type 0xFF000004 (ATS-P permanent speed limit)
Sets up an ATS-P permanent speed limit. The optional data is the speed limit in km/h.

## <a name="keyboard"></a>■ 5. Keyboard Assignments

The OpenBveAts Plugin uses the following keyboard assignments:

{{% table %}}

| Virtual Key | Default Assignment | Descripció                                    |
|-------------|--------------------|------------------------------------------------|
| S           | space              | Cancels the ATS-SN bell.                       |
| A1          | insert             | Cancels the ATS-SN chime.                      |
| A2          | delete             | Cancels the EB.                                |
| B1          | home               | Cancels the ATS-SN or ATS-P brake application. |
| B2          | delete             | Activates the temporary ATS-P brake release.   |
| C1          | page up            | Switches from ATC to ATS.                      |
| C2          | page down          | Switches from ATS to ATC.                      |
| D           | 2                  | Activa els sistemes de seguretat.                    |
| E           | 3                  | Desactiva els sistemes de seguretat.                   |

{{% /table %}}