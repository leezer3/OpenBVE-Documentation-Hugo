---
title: "Win32 train plugins"
hidden: true
---

------

<font size="+2">Win32 train plugins are not available on operating systems other than Microsoft Windows. Therefore, these plugins are officially deprecated. Please use [.NET assemblies]({{< ref "/plugins/overview/_index.md" >}}) from now on.</font>

------

The header and code files for the C/C++ programming languages are available to download here:

{{% table-nonheader %}}

| [plugin.h](/images/plugin_h.txt)     |
| ------------------------------------ |
| [plugin.cpp](/images/plugin_cpp.txt) |
| [plugin.def](/images/plugin_def.txt) |

{{% /table-nonheader %}}

**Data types:**

{{% table-nonheader %}}

| int    | 32-bit signed integer ranging from -2147483648 to 2147483647 |
| ------ | ------------------------------------------------------------ |
| float  | 32-bit floating point number according to the IEEE 754 binary32 standard |
| double | 64-bit floating point number according to the IEEE 754 binary64 standard |

{{% /table-nonheader %}}

## ■ Vista general

Las siguientes funciones son llamadas en este orden cuando el plugin ha ha sido cargado:

- Load
- GetPluginVersion
- SetVehicleSpec
- Initialize
- SetPower
- SetBrake
- SetReverser
- SetSignal

The following functions are called whenever their respective events occur:

- SetPower
- SetBrake
- SetReverser
- KeyDown
- KeyUp
- HornBlow
- DoorOpen
- DoorClose
- SetSignal
- SetBeaconData

Las siguientes funciones son llamadas cuando el plugin es deshabilitado:

- Dispose

## ■ Descriptions

**ATS_API void WINAPI Load()**

This function is the first to be called after the plugin has been loaded. When this function triggers inside the plugin, a matching Dispose() call will be made when the plugin is unloaded.

------

**ATS_API void WINAPI Dispose()**

This function is the last to be called before the plugin is unloaded.

------

**ATS_API int WINAPI GetPluginVersion()**

This function is called after Load() in order to query the version of the API to use for the plugin. Currently, there is only one version available. If the version returned does not match the expected value, Dispose() will be called and the plugin is unloaded.

*Return value:*

{{% table-nonheader %}}

| ATS_VERSION | 0x20000 (131072) | Valid plugin version |
| ----------- | ---------------- | -------------------- |
|             |                  |                      |

{{% /table-nonheader %}}

------

**ATS_API void WINAPI SetVehicleSpec (ATS_VEHICLESPEC vehicleSpec)**

This function is called after GetPluginVersion() is called and informs the plugin about the specifications of the train.

*struct ATS_VEHICLESPEC:*

{{% table-nonheader %}}

| <span style="white-space: nowrap;">int BrakeNotches</span> | The amount of brake notches the train has. This does not include the emergency brake, but it does include the hold brake if the train has one. For trains with automatic air brakes, 2 is returned. |
| ---------------------------------------------------------- | ------------------------------------------------------------ |
| <span style="white-space: nowrap;">int PowerNotches</span> | La cantidad de posiciones de palanca de tracción que el tren tiene.                   |
| <span style="white-space: nowrap;">int AtsNotch</span>     | The brake notch index corresponding to the first real brake notch. For trains with automatic air brakes, this returns 1. For other trains, this returns 2 if the train has a hold brake, and 1 otherwise. |
| <span style="white-space: nowrap;">int B67Notch</span>     | The brake notch index corresponding to 70% of the brake notches, i.e. round(0.7 * BrakeNotches). |
| <span style="white-space: nowrap;">entero Carros</span>         | El número de carros que el tren tiene.                            |

{{% /table-nonheader %}}

------

**ATS_API void WINAPI Initialize(int brake)**

This function is called after SetVehicleSpec() is called and informs the plugin about the mode the safety system should start in. If the safety system in your plugin can be activated or deactivated, you should initialize the state of the plugin accordingly. When the user selects a *Jump to station target*, this function is also called prior to moving the train to its new location.

*brake:*

{{% table-nonheader %}}

| ATS_INIT_ON_SRV  | -1   | The plugin should start in an **active** state. The *service* brakes are applied on startup. |
| ---------------- | ---- | ------------------------------------------------------------ |
| ATS_INIT_ON_EMG  | 0    | The plugin should start in an **active** state. The **emergency** brakes are applied on startup. |
| ATS_INIT_OFF_EMG | 1    | The plugin should start in an *inactive* state. The **emergency** brakes are applied on startup. |

{{% /table-nonheader %}}  

------

**ATS_API ATS_HANDLES WINAPI Elapse(ATS_VEHICLESTATE vehicleState, int[] panel, int[] sound)**

This function is called every frame, informs the plugin about the current state of the train, and expects the handles as overwritten by the safety system in return. The state of plugin-specific panel elements can also be set, as well as instructions to play plugin-specific sounds.

*struct ATS_VEHICLESTATE:*

{{% table-nonheader %}}  

| <span style="white-space: nowrap;">double Location</span>   | The current track position of the front of the train in meters. |
| ----------------------------------------------------------- | ------------------------------------------------------------ |
| <span style="white-space: nowrap;">float Speed</span>       | The current signed speed of the train in km/h. Negative values represent a backward movement, positive ones a forward movement. |
| <span style="white-space: nowrap;">int Time</span>          | The current time in milliseconds since midnight of day one. Please note that the time wraps round after 24 days, thus values are between 0 and 2073599999. |
| <span style="white-space: nowrap;">float BcPressure</span>  | The current pressure in the brake cylinder in pascal.        |
| <span style="white-space: nowrap;">float MrPressure</span>  | The current pressure in the main reservoir in pascal.        |
| <span style="white-space: nowrap;">float ErPressure</span>  | The current pressure in the equalizing reservoir in pascal.  |
| <span style="white-space: nowrap;">float BpPressure</span>  | The current pressure in the brake pipe in pascal.            |
| <span style="white-space: nowrap;">float SapPressure</span> | The current pressure in the straight air brake in pascal.    |
| <span style="white-space: nowrap;">float Current</span>     | This value always returns 0 and should be ignored.           |

{{% /table-nonheader %}}  

*int[] panel:*  
An array with 256 elements (0 through 255) which can be set to any value. The values in the array are preserved between successive Elapse() calls. At the beginning of the simulation, all elements are initialized to 0. Panel developers can query values of this array via the ats*i* subject, while developers of animated objects can query values via the pluginstate[*i*] variable. You should coordinate your efforts with panel/object developers and release a specification that tells which element in the array has what purpose.

*int[] sound:*  
An array with 256 elements (0 through 255) which can be set to any sound instruction. The values in the array are preserved between successive Elapse() calls. At the beginning of the simulation, all elements are initialized to ATS_SOUND_PLAYLOOPING (0). Train developers can reference sounds in the sound.cfg file. You should coordinate your efforts with train developers and release a specification that tells which sound index plays what kind of sound. The sound instructions that can be used are:

{{% table-nonheader %}}  

| ATS_SOUND_STOP        | -10000           | Stops the sound.                                             |
| --------------------- | ---------------- | ------------------------------------------------------------ |
|                       | -9999 through -1 | Plays the sound in a loop with a given volume. -9999 corresponds to 0.01% volume and -1 corresponds to 99.99% volume. If the sound is already playing (looping or not), only the volume is changed. |
| ATS_SOUND_PLAYLOOPING | 0                | Plays the sound in a loop with 100% volume. If the sound is already playing (looping or not), only the volume is changed. |
| ATS_SOUND_PLAY        | 1                | Plays the sound once. If the sound is already playing, a new instance of the sound starts playing. Subsequently, stopping or changing volume only affects the new sound. The host application will set the sound instruction to ATS_SOUND_CONTINUE after having processed it. |
| ATS_SOUND_CONTINUE    | 2                | Does not execute any command. You should set to this value if you don't want to change anything. |

{{% /table-nonheader %}}  

*Return value struct ATS_HANDLES:*

{{% table-nonheader %}}  

| <span style="white-space: nowrap;">int Brake</span>         | The brake notch to apply. See SetBrake() below for more information. |
| ------------------------------ | ------------------------------------------------------------ |
| <span style="white-space: nowrap;">int Power</span>         | The power notch to apply. Must be within the range from 0 to *PowerNotches*. |
| <span style="white-space: nowrap;">int Reverser</span>      | The reverser to apply. -1 is backward, 0 is neutral and 1 is forward. |
| <span style="white-space: nowrap;">int ConstantSpeed</span> | The operation mode of the constant speed system. ATS_CONSTANTSPEED_CONTINUE (0) uses the driver's setting,  ATS_CONSTANTSPEED_ENABLE (1) forces the system on and  ATS_CONSTANTSPEED_DISABLE (2) forces the system off. |

{{% /table-nonheader %}}

<br/>

{{% warning-nontitle %}}

Please note that if you want the driver's settings to take effect, you need to respond to the SetPower(), SetBrake() and SetReverse() calls, save the values that are passed in this those calls, and reapply them here.

{{% /warning-nontitle %}}

------

**ATS_API void WINAPI SetPower(int notch)**

This function is called when the driver changes the power notch. The value passed can range from 0 to *PowerNotches*.

------

**ATS_API void WINAPI SetBrake(int notch)**

This function is called when the driver changes the brake notch. For trains with automatic air brake, 0 is RELEASE, 1 is LAP, 2 is SERVICE and 3 is EMERGENCY.

For other trains that do not have a hold brake, 0 is released brakes, 1 is brake notch 1, 2 is brake notch 2, etc., *BrakeNotches* is the maximum brake notch, and *BrakeNotches*+1 is the emergency brake.

For other trains that have a hold brake, 0 is released brakes, 1 is the hold brake, 2 is brake notch 1, 3 is brake notch 2, etc., *BrakeNotches* is the maximum brake notch, and *BrakeNotches*+1 is the emergency brake.

Generally, for trains without the automatic air brake, *AtsNotch* is the first brake notch and *BrakeNotches* is the maximum brake notch. For all types of trains, *BrakeNotches*+1 is the emergency brake.

------

**ATS_API void WINAPI SetReverser(int pos)**

This function is called when the driver changes the reverser position. The value of -1 corresponds to backward, 0 to neutral and 1 to forward.

------

**ATS_API void WINAPI KeyDown(int atsKeyCode)**

This function is called when a plugin-specific key is pressed down. The passed value *atsKeyCode* corresponds to any value between ATS_KEY_S (0) and ATS_KEY_L (15). When you make use of plugin-specific keys, release a specification that gives the official name of the key (e.g. SECURITY_S, SECURITY_A1, SECURITY_B2, etc.) or their shorthands (S, A1, B2, etc.) along with the meaning.

------

**ATS_API void WINAPI KeyUp(int atsKeyCode)**

This function is called when a plugin-specific key is released. The passed value *atsKeyCode* corresponds to any value between ATS_KEY_S (0) and ATS_KEY_L (15). When you make use of plugin-specific keys, release a specification that gives the official name of the key (e.g. SECURITY_S, SECURITY_A1, SECURITY_B2, etc.) or their shorthands (S, A1, B2, etc.) along with the meaning.

------

**ATS_API void WINAPI HornBlow(int hornType)**

This function is called when any of the horn starts or stops playing.

*hornType:* 

{{% table-nonheader %}} 

| ATS_HORN_PRIMARY   | 0    | The function is called only when the horn starts playing.    |
| ------------------ | ---- | ------------------------------------------------------------ |
| ATS_HORN_SECONDARY | 1    | The function is called only when the horn starts playing.    |
| ATS_HORN_MUSIC     | 2    | The function is called both when the horn starts playing and when it stops playing. |

{{% /table-nonheader %}} 

------

**ATS_API void WINAPI DoorOpen()**

This function is called when the doors start opening.

------

**ATS_API void WINAPI DoorClose()**

This function is called when the doors have finished closing.

------

**ATS_API void WINAPI SetSignal(int signal)**

This function is called whenever the current signalling section would change its aspect assuming the player's train is not inside. This can occur when passing section boundaries, but only if the newly entered section has a different aspect than the previous one. It can also occur when a preceding train clears any upcoming block and the current section would change its aspect as a consequence of that. Thus, the SetSignal call can occur at any time. The passed value *signal* represents the section value (the aspect number).

{{% warning-nontitle %}}

Please note that the SetSignal call assumes that the player's train is not inside the section for which the SetSignal call is raised. Otherwise, the reported aspect would always be red, which would not be very meaningful to work with.

{{% /warning-nontitle %}}

------

**ATS_API void WINAPI SetBeaconData(ATS_BEACONDATA beaconData)**

This function is called when a beacon is passed.

*struct ATS_BEACONDATA:*

{{% table-nonheader %}} 

| <span style="white-space: nowrap;">int Type</span>       | The type of the beacon. In CSV routes, this corresponds to *Type* in Track.Beacon(*Type*; *BeaconStructureIndex*; *Section*; *Data*). |
| --------------------------- | ------------------------------------------------------------ |
| <span style="white-space: nowrap;">int Signal</span>     | The aspect number currently shown on the associated section. In CSV routes, this corresponds to any of the values in Track.Section(*Aspect0*, *Aspect1*, ..., *Aspectn*) |
| <span style="white-space: nowrap;">float Distance</span> | The distance from the front of the train to the signal in meters. This can be negative if the associated section is behind the front of the train. |
| <span style="white-space: nowrap;">int Data</span>       | The data of the beacon. In CSV routes, this corresponds to *Data* in Track.Beacon(*Type*; *BeaconStructureIndex*; *Section*; *Data*). |

{{% /table-nonheader %}} 

*Type* can be in the range from 0 to 2147483647, while *Data* can be in the range from 2147483648 to 2147483647. Please see the page about [standards]({{< ref "/information/standards/_index.md" >}}) to learn more about assigning beacon types.
