---
title: "Train plugin API (IRuntime)"
hidden: true
---

This is the documentation for train plugins. In order to create a train plugin, implement the IRuntime interface from the OpenBveApi.Runtime namespace. In the following, you will find a description of how this interface works.

## ■ Contents

{{% contents %}}

- [1. Overview](#overview)
- [2. Function calls](#functions)
- [3. Playing sounds](#sound)
- [4. Supporting the AI](#ai)

{{% /contents %}}

## <a name="overview"></a>■ Overview

The following functions are called in this order when the plugin is loaded:

- Load
- SetVehicleSpecs
- Initialize
- SetPower
- SetBrake
- SetReverser
- SetSignal

The following functions can be called at any time:

- SetPower
- SetBrake
- SetReverser
- KeyDown
- KeyUp
- HornBlow
- DoorChange
- SetSignal
- SetBeacon
- PerformAI

The following function is called when the plugin is unloaded:

- Unload

#####  <a name="functions"></a>● Function calls

The following is a list of all function calls along with explanations on their behavior.

---

**bool Load(LoadProperties properties)**

This function is the first to be called after the plugin has been loaded. When this function triggers inside the plugin, a matching call to *Unload* will be made when the plugin is unloaded.

Arguments:

{{% table-nonheader %}}

| LoadProperties | properties | The properties supplied to the plugin on loading. |
| -------------- | ---------- | ------------------------------------------------- |
|                |            |                                                   |

{{% /table-nonheader %}}

LoadProperties (class):

{{% table-nonheader %}}

| string            | PluginFolder  | Gets the absolute path to the plugin folder.           |
| ----------------- | ------------- | ------------------------------------------------------ |
| string            | TrainFolder   | Gets the absolute path to the train folder.            |
| int[]             | Panel         | Gets or sets the array of panel variables.             |
| PlaySoundDelegate | PlaySound     | Gets the callback function for playing sounds.         |
| PlayCarSoundDelegate | PlaySound     | Gets the callback function for playing car-based sounds. |
| AddInterfaceMessageDelegate | N/A    | Gets the callback function for adding messages to the in-game UI. |
| OpenDoorsDelegate | N/A     | Gets the callback function for opening the train doors from the plugin. |
| CloseDoorsDelegate | N/A     | Gets the callback function for closing the train doors from the plugin. |
| AISupport         | AISupport     | The extent to which the plugin supports the AI.        |
| string            | FailureReason | Gets or sets the reason why the plugin failed loading. |

{{% /table-nonheader %}}

PlaySound (function):  
See the section on [playing sounds](#sound).

AISupport (enumeration):

{{% table-nonheader %}}

| AISupport.None  | 0    | The plugin does not support the AI. Calls to PerformAI will not be made. Non-player trains will not use the plugin. |
| --------------- | ---- | ------------------------------------------------------------ |
| AISupport.Basic | 1    | The plugin complements the built-in AI by performing only functions specific to the plugin. |

{{% /table-nonheader %}}

Return value:

{{% table-nonheader %}}

| bool | Whether the plugin was loaded successfully. |
| ---- | ------------------------------------------- |
|      |                                             |

{{% /table-nonheader %}}

If your plugin uses external configuration files, open files relative to the *properties.PluginFolder* or *properties.TrainFolder*. The difference between the two can be best visualized when the plugin is in a shared folder: Files relative to the plugin folder are common for all trains that use the plugin, while files relative to the train folder are specific to each train. The plugin folder is simply the folder in which the plugin is stored.

Initialize the *properties.Panel* array to any size and with any startup values you need. The array is processed after every call to *Elapse* by the host application in order to update custom panel indicators. Developers of the panel2.cfg file can query these values with the *ats*i variable, while developers of the panel.animated file can query these values with the *pluginState[*i*]* variable.

The *properties.PlaySound* function can be used at any time to play sounds. This callback function returns a handle that you can use to track if the sound is still playing, to change its volume and pitch, or to stop it. Please also see the section on [playing sounds](#sound).

Set *properties.AISupport* to a value other than *AISupport.None* if you want your plugin to support the AI. Please also see the section on [supporting the AI](#ai).

You should return **true** as the return value when loading succeeded. If, on the other hand, you want to abort loading the plugin, for example because an external configuration file could not be found, return **false** and set *properties.FailureReason* to a human-readible string that explains why loading failed.

------

**void Unload()**

This function is the last to be called before the plugin is unloaded.

------

**void SetVehicleSpecs(VehicleSpecs specs)**

This function is called after *Load* to inform the plugin about the specifications of the train.

Arguments:

{{% table-nonheader %}}

| VehicleSpecs | specs | The specifications of the train. |
| ------------ | ----- | -------------------------------- |
|              |       |                                  |

{{% /table-nonheader %}}

VehicleSpecs (class):

{{% table-nonheader %}}

| int        | PowerNotches | Gets the number of power notches the train has.              |
| ---------- | ------------ | ------------------------------------------------------------ |
| BrakeTypes | BrakeType    | Gets the type of brake the train uses.                       |
| int        | BrakeNotches | Gets the number of brake notches the train has, including the hold brake, but excluding the emergency brake. |
| bool       | HasHoldBrake | Gets whether the train has a hold brake.                     |
| int        | AtsNotch     | Gets the index of the brake notch that corresponds to B1 or LAP. |
| int        | B67Notch     | Gets the index of the brake notch that corresponds to 70% of the available brake notches. |
| int        | Cars         | Gets the number of cars the train has.                       |
| int        | HeadlightStates | Gets the number of headlight states the train has.                       |

{{% /table-nonheader %}}

BrakeTypes (enumeration):

{{% table-nonheader %}}

| BrakeTypes.ElectromagneticStraightAirBrake | 0    | The train uses the electromagnetic straight air brake.       |
| ------------------------------------------ | ---- | ------------------------------------------------------------ |
| BrakeTypes.ElectricCommandBrake            | 1    | The train uses the analog/digital electro-pneumatic air brake without a brake pipe (electric command brake). |
| BrakeTypes.AutomaticAirBrake               | 2    | The train uses the automatic air brake with partial release. |

{{% /table-nonheader %}}

For more information about the meanings of the notches, see the sections on SetReverser, SetPower and SetBrake.

------

**void Initialize(InitializationModes mode)**

This function is called after *SetVehicleSpecs* and informs the plugin about the mode the safety system should start in. If the safety system in your plugin can be activated or deactivated, you should initialize the state of the plugin accordingly. When the user selects a *Jump to station* target, this function is also called prior to moving the train to its new location.

Arguments:

{{% table-nonheader %}}

| InitializationModes | mode | The mode of initialization. |
| ------------------- | ---- | --------------------------- |
|                     |      |                             |

{{% /table-nonheader %}}

InitializationModes (enumeration):

{{% table-nonheader %}}

| InitializationModes.OnService    | -1   | The safety system should be enabled. The train has its service brakes applied. |
| -------------------------------- | ---- | ------------------------------------------------------------ |
| InitializationModes.OnEmergency  | 0    | The safety system should be enabled. The train has its emergency brakes applied. |
| InitializationModes.OffEmergency | 1    | The safety system should be disabled. The train has its emergency brakes applied. |

{{% /table-nonheader %}}

The initialization mode is set in CSV/RW routes via the Route.Change command. Please note that any value between -2147483648 and 2147483647 can be conveyed to the plugin - the enumeration members are simply meant to standardize the meanings of the initialization modes.

------

**void Elapse(ElapseData data)**

This function is called every frame. It informs the plugin about the current state of the train and allows to set the virtual handles.

Arguments:

{{% table-nonheader %}}

| ElapseData | data | The data passed to the plugin. |
| ---------- | ---- | ------------------------------ |
|            |      |                                |

{{% /table-nonheader %}}

ElapseData (class):

{{% table-nonheader %}}

| VehicleState          | Vehicle          | Gets the state of the train.                                 |
| --------------------- | ---------------- | ------------------------------------------------------------ |
| PrecedingVehicleState | PrecedingVehicle | Gets the state of the preceding train, or a null reference if there is no preceding train. |
| List<Station>         | Stations         | Gets the list of stations in the route. |
| Handles               | Handles          | Gets or sets the virtual handles.                            |
| DoorInterlockStates   | DoorInterlockState | Gets or sets the door interlock state. |
| int                   | HeadlightsState  | Gets or sets the headlights state. |
| int                   | Destination      | Gets the current destination. |
| Time                  | TotalTime        | Gets the absolute in-game time.                              |
| Time                  | ElapsedTime      | Gets the time that elapsed since the last call to Elapse.    |
| string                | CurrentLanguageCode | Gets the language code used by the host application. |
| boolean               | DisableTimeAcceleration | Enables or disables time acceleration in the host application.    |
| string                | DebugMessage     | Gets or sets the debug message the plugin wants the host application to display. |
| CameraViewModes       | CameraViewMode   | Gets the current camera view mode in the host application. |

{{% /table-nonheader %}}

VehicleState (class):

{{% table-nonheader %}}

| double | Location    | Gets the location of the front of the train, in meters.   |
| ------ | ----------- | --------------------------------------------------------- |
| Speed  | Speed       | Gets the speed of the train.                              |
| double | BcPressure  | Gets the pressure in the brake cylinder, in pascal.       |
| double | MrPressure  | Gets the pressure in the main reservoir, in pascal.       |
| double | ErPressure  | Gets the pressure in the equilizing reservoir, in pascal. |
| double | BpPressure  | Gets the pressure in the brake pipe, in pascal.           |
| double | SapPressure | Gets the pressure in the straight air pipe, in pascal.    |

{{% /table-nonheader %}}

PrecedingVehicleState (class):

{{% table-nonheader %}}

| double | Location | Gets the location of the back of the preceding train, in meters. |
| ------ | -------- | ------------------------------------------------------------ |
| double | Distance | Gets the distance from the front of the current train to the back of the preceding train, in meters. |
| Speed  | Speed    | Gets the speed of the preceding train.                       |

{{% /table-nonheader %}}

Speed (structure):

{{% table-nonheader %}}

| double | MetersPerSecond   | Gets the speed in meters per second.   |
| ------ | ----------------- | -------------------------------------- |
| double | KilometersPerHour | Gets the speed in kilometers per hour. |
| double | MilesPerHour      | Gets the speed in miles per hour.      |

{{% /table-nonheader %}}

Time (structure):

{{% table-nonheader %}}

| double | Seconds      | Gets the time in seconds.      |
| ------ | ------------ | ------------------------------ |
| double | Milliseconds | Gets the time in milliseconds. |

{{% /table-nonheader %}}

Handles (class):

{{% table-nonheader %}}

| int  | Reverser   | Gets or sets the reverser position.                     |
| ---- | ---------- | ------------------------------------------------------- |
| int  | PowerNotch | Gets or sets the power notch.                           |
| int  | BrakeNotch | Gets or sets the brake notch.                           |
| bool | ConstSpeed | Gets or sets whether the const speed system is enabled. |

{{% /table-nonheader %}}

The meanings of the notches are explained in the sections on SetReverser, SetPower and SetBrake.

------

**void SetReverser(int reverser)**

This function is called when the driver changes the reverser position.

Arguments:

{{% table-nonheader %}}

| int  | reverser | The new reverser position. |
| ---- | -------- | -------------------------- |
|      |          |                            |

{{% /table-nonheader %}}

For *reverser*, the value of -1 corresponds to backward, 0 to neutral and 1 to forward.

------

**void SetPower(int powerNotch)**

This function is called when the driver changes the power notch.

Arguments:

{{% table-nonheader %}}

| int  | powerNotch | The new power notch. |
| ---- | ---------- | -------------------- |
|      |            |                      |

{{% /table-nonheader %}}

For *powerNotch*, the value passed can range from 0 to *specs.PowerNotches*.

------

**void SetBrake(int brakeNotch)**

This function is called when the driver changes the brake notch.

Arguments:

{{% table-nonheader %}}

| int  | brakeNotch | The new brake notch. |
| ---- | ---------- | -------------------- |
|      |            |                      |

{{% /table-nonheader %}}

For trains with the **automatic air brake**, 0 is RELEASE, 1 is LAP, 2 is SERVICE and 3 is EMERGENCY.

For all other trains **without a hold brake**, 0 is released brakes, 1 is brake notch B1, 2 is brake notch B2, etc., *specs.BrakeNotches* is the maximum brake notch, and *specs.BrakeNotches*+1 is the emergency brake.

For all other trains **with a hold brake**, 0 is released brakes, 1 is the hold brake, 2 is brake notch B1, 3 is brake notch B2, etc., *specs.BrakeNotches* is the maximum brake notch, and *specs.BrakeNotches*+1 is the emergency brake.

Generally speaking, for trains without the automatic air brake, *specs.AtsNotch* is brake notch B1 and *specs.BrakeNotches* is the maximum service brake notch. For all types of trains, *specs.BrakeNotches*+1 is the emergency brake.

------

**void KeyDown(VirtualKeys key)**

This function is called when a plugin-specific key is pressed.

Arguments:  

{{% table-nonheader %}}

| VirtualKeys | key  | The virtual key that was pressed. |
| ----------- | ---- | --------------------------------- |
|             |      |                                   |

{{% /table-nonheader %}}

VirtualKeys (enumeration):

{{% table-nonheader %}}

| VirtualKeys.S  | 0    | The virtual S key. The default assignment is Space.      |
| -------------- | ---- | -------------------------------------------------------- |
| VirtualKeys.A1 | 1    | The virtual A1 key. The default assignment is Insert.    |
| VirtualKeys.A2 | 2    | The virtual A2 key. The default assignment is Delete.    |
| VirtualKeys.B1 | 3    | The virtual B1 key. The default assignment is Home.      |
| VirtualKeys.B2 | 4    | The virtual B2 key. The default assignment is End.       |
| VirtualKeys.C1 | 5    | The virtual C1 key. The default assignment is Page Up.   |
| VirtualKeys.C2 | 6    | The virtual C2 key. The default assignment is Page Down. |
| VirtualKeys.D  | 7    | The virtual D key. The default assignment is 2.          |
| VirtualKeys.E  | 8    | The virtual E key. The default assignment is 3.          |
| VirtualKeys.F  | 9    | The virtual F key. The default assignment is 4.          |
| VirtualKeys.G  | 10   | The virtual G key. The default assignment is 5.          |
| VirtualKeys.H  | 11   | The virtual H key. The default assignment is 6.          |
| VirtualKeys.I  | 12   | The virtual I key. The default assignment is 7.          |
| VirtualKeys.J  | 13   | The virtual J key. The default assignment is 8.          |
| VirtualKeys.K  | 14   | The virtual K key. The default assignment is 9.          |
| VirtualKeys.L  | 15   | The virtual L key. The default assignment is 0.          |

{{% /table-nonheader %}}

When making use of plugin-specific keys in your plugin, be sure to release a documentation that includes the virtual names of the keys along with their plugin-specific meanings.

------

**void KeyUp(VirtualKeys key)**

This function is called when a plugin-specific key is released.

Arguments:

{{% table-nonheader %}}

| VirtualKeys | key  | The virtual key that was released. |
| ----------- | ---- | ---------------------------------- |
|             |      |                                    |

{{% /table-nonheader %}}

VirtualKeys (enumeration):

{{% table-nonheader %}}

| VirtualKeys.S  | 0    | The virtual S key. The default assignment is Space.      |
| -------------- | ---- | -------------------------------------------------------- |
| VirtualKeys.A1 | 1    | The virtual A1 key. The default assignment is Insert.    |
| VirtualKeys.A2 | 2    | The virtual A2 key. The default assignment is Delete.    |
| VirtualKeys.B1 | 3    | The virtual B1 key. The default assignment is Home.      |
| VirtualKeys.B2 | 4    | The virtual B2 key. The default assignment is End.       |
| VirtualKeys.C1 | 5    | The virtual C1 key. The default assignment is Page Up.   |
| VirtualKeys.C2 | 6    | The virtual C2 key. The default assignment is Page Down. |
| VirtualKeys.D  | 7    | The virtual D key. The default assignment is 2.          |
| VirtualKeys.E  | 8    | The virtual E key. The default assignment is 3.          |
| VirtualKeys.F  | 9    | The virtual F key. The default assignment is 4.          |
| VirtualKeys.G  | 10   | The virtual G key. The default assignment is 5.          |
| VirtualKeys.H  | 11   | The virtual H key. The default assignment is 6.          |
| VirtualKeys.I  | 12   | The virtual I key. The default assignment is 7.          |
| VirtualKeys.J  | 13   | The virtual J key. The default assignment is 8.          |
| VirtualKeys.K  | 14   | The virtual K key. The default assignment is 9.          |
| VirtualKeys.L  | 15   | The virtual L key. The default assignment is 0.          |

{{% /table-nonheader %}}

When making use of plugin-specific keys in your plugin, be sure to release a documentation that includes the virtual names of the keys along with their plugin-specific meanings.

------

**void HornBlow(HornTypes type)**

This function is called when a horn starts playing. In case of the musical horn, this function is also called when the horn stops playing.

Arguments:

{{% table-nonheader %}}

| HornTypes | type | The type of horn. |
| --------- | ---- | ----------------- |
|           |      |                   |

{{% /table-nonheader %}}

HornTypes (enumeration):

{{% table-nonheader %}}

| HornTypes.Primary   | 0    | The primary horn.   |
| ------------------- | ---- | ------------------- |
| HornTypes.Secondary | 1    | The secondary horn. |
| HornTypes.Music     | 2    | The musical horn.   |

{{% /table-nonheader %}}

------

**void DoorChange(DoorStates oldState, DoorStates newState)**

This function is called when the state of the doors change.

Arguments:

{{% table-nonheader %}}

| DoorStates | oldState | The old state of the doors. |
| ---------- | -------- | --------------------------- |
| DoorStates | newState | The new state of the doors. |

{{% /table-nonheader %}}

DoorStates (enumeration):

{{% table-nonheader %}}

| DoorStates.None  | 0    | No door is open.          |
| ---------------- | ---- | ------------------------- |
| DoorStates.Left  | 1    | The left doors are open.  |
| DoorStates.Right | 2    | The right doors are open. |
| DoorStates.Both  | 3    | All doors are open.       |

{{% /table-nonheader %}}

------

**void SetSignal(SignalData[] data)**

This function is called when the aspect in the current or in any of the upcoming section changes, or when passing section boundaries. For the current section, it is assumed that no train is currently inside. Only sections until the first red section are reported.

Arguments:

{{% table-nonheader %}}

| SignalData[] | data | The signal data per section. |
| ------------ | ---- | ---------------------------- |
|              |      |                              |

{{% /table-nonheader %}}

SignalData (class):

{{% table-nonheader %}}

| int    | Aspect   | Gets the aspect of the section.   |
| ------ | -------- | --------------------------------- |
| double | Distance | Gets the distance to the section. |

{{% /table-nonheader %}}

The *data* array contains one entry per section, where *data[0]* is the current section, *data[1]* the upcoming section, and so on. You can inspect the aspect and the distance to each section reported.

Please note that the length of the *data* array is dynamic. Only sections until the first red section are reported. This means that you need to check the size of the array before querying a particular section.

Please also note that the last section in the *data* array does not have to be red necessarily. For example at the end of the track, the last section might be green.

In CSV/RW routes, the Track.Section (CSV) or @Section (RW) command is used to create signalling sections. The *data.Aspect* member corresponds to any of the aspects defined by this command.

------

**void SetBeacon(BeaconData data)**

This function is called when a beacon is passed by the front of the train.

Arguments:

{{% table-nonheader %}}

| BeaconData | data | The beacon data. |
| ---------- | ---- | ---------------- |
|            |      |                  |

{{% /table-nonheader %}}

BeaconData (class):

{{% table-nonheader %}}

| int        | Type     | Gets the type of beacon.                    |
| ---------- | -------- | ------------------------------------------- |
| int        | Optional | Gets optional data the beacon transmits.    |
| SignalData | Signal   | Gets the section the beacon is attached to. |

{{% /table-nonheader %}}

SignalData (class):

{{% table-nonheader %}}

| int    | Aspect   | Gets the aspect of the section.   |
| ------ | -------- | --------------------------------- |
| double | Distance | Gets the distance to the section. |

{{% /table-nonheader %}}

In CSV/RW routes, the Track.Beacon (CSV) or @Beacon (RW) command is used to install beacons on the route. Both the beacon type and the optional data set by this command is transmitted to the train plugin along with the distance to the attached section.

Please note that plugins may receive beacon types less than 0. These beacon types are reserved for future use and must be ignored by current plugins.

------

**void PerformAI(AIData data)**

This function is called when the AI is performed.

Arguments:

{{% table-nonheader %}}

| AIData | data | The AI data. |
| ------ | ---- | ------------ |
|        |      |              |

{{% /table-nonheader %}}

AIData (class):

{{% table-nonheader %}}

| Handles    | Handles  | Gets or sets the driver handles. |
| ---------- | -------- | -------------------------------- |
| AIResponse | Response | Gets or sets the AI response.    |

{{% /table-nonheader %}}

Whenever you let the AI perform something, set *data.Response* to a value other than *AIResponse.None*. Please also see the section on [supporting the AI](#ai).

## <a name="sound"></a>■ Playing sounds

You can play custom sounds from within your plugin. Custom sounds need to be configured inside the *sound.cfg* file before they can be used by the plugin. In order to play such sounds, keep a reference to the *PlaySound* function that is passed in the Load call. You can then start playing sounds at any time by calling this function:

**SoundHandle PlaySound(int index, double volume, double pitch, bool looped)**

Arguments:

{{% table-nonheader %}}

| int    | index  | The index to the sound to be played.                         |
| ------ | ------ | ------------------------------------------------------------ |
| double | volume | The initial volume of the sound. A value of 1.0 represents nominal volume. |
| double | pitch  | The initial pitch of the sound. A value of 1.0 represents nominal pitch. |
| bool   | looped | Whether the sound should be played in an indefinate loop.    |

{{% /table-nonheader %}}

Return value:

{{% table-nonheader %}}

| SoundHandle | The handle to the sound, or a null reference if the sound could not be played. |
| ----------- | ------------------------------------------------------------ |
|             |                                                              |

{{% /table-nonheader %}}

When you call the PlaySound function, a handle will be returned that you can use to later check if the sound is still playing, in order to change the volume or pitch, or to stop playing the sound. If you play a sound in a loop, you **must** keep the handle in order to subsequently stop the sound - otherwise it would play indefinately. The handle returned by PlaySound is of the following form:

SoundHandle (class):  

{{% table-nonheader %}}

| bool   | Playing | Gets whether the sound is still playing. Once this returns false, the sound handle is invalid. |
| ------ | ------- | ------------------------------------------------------------ |
| bool   | Stopped | Gets whether the sound has stopped. Once this returns true, the sound handle is invalid. |
| double | Volume  | Gets or sets the volume. A value of 1.0 represents nominal volume. |
| double | Pitch   | Gets or sets the pitch. A value of 1.0 represents nominal pitch. |
| void   | Stop()  | Stops the sound and invalidates the handle.                  |

{{% /table-nonheader %}}

Please note that depending on the implementation by the host application, sounds that are not in audible range may not be played at all.

Please also note that the handle returned might be a null reference in the case the host application could not play the sound, for example because the file could not be found.

<a name="ai"></a>■ Supporting the AI

Usually, the host application performs the AI. However, your plugin might require special operation precedures which the built-in AI cannot know of. For this reason, you can complement the built-in AI by performing operation procedures specific to your plugin. Before considering to support the AI, however, you should understand what the AI is intended to represent: a human being standing or sitting in the cab, operating levers and pressing buttons, just like the player. This means that the AI must not operate 6 levers and 12 buttons simultaneously, but only do one thing at a time.

If you want to support the AI, first set *data.AISupport* inside the Load call to *AISupport.Basic*. Whenever the host application performs an AI round, a call to PerformAI will then be made inside the plugin. The plugin can then decide to let the AI perform an action, or to pass and let the host application perform an action. Different kinds of actions can take different amounts of time, so whenever the plugin lets the AI perform an action, it will also set the time it takes before the next action can be performed.

## It is important to understand that unless your plugin also simulates a full ATO with automatic stopping at stations, you must let the host application perform the AI for most of the time and only intervene if absolutely necessary, for example in order to start the engine, to acknowledge a vigilance device, etc. Whenever this is the case, react to the PerformAI call appropriately:

**void PerformAI(AIData data)**

Arguments:

{{% table-nonheader %}}

AIData

data

The AI data.

| {{% /table-nonheader %}} | AIData (class): | {{% table-nonheader %}} |
| ------ | ---- | ------------ |
|        |      |              |

Handles

Handles

Gets or sets the driver handles.

| AIResponse    | Response  | Gets or sets the AI response. |
| ---------- | -------- | -------------------------------- |
| {{% /table-nonheader %}} | Handles (class): | {{% table-nonheader %}}    |

int

Reverser

Gets or sets the reverser position.

| int  | PowerNotch   | Gets or sets the power notch.                     |
| ---- | ---------- | ------------------------------------------------------- |
| int  | BrakeNotch | Gets or sets the brake notch.                           |
| bool  | ConstSpeed | Gets or sets whether the const speed system is enabled.                           |
| {{% /table-nonheader %}} | The meanings of the notches are explained in the sections on SetReverser, SetPower and SetBrake. | AIResponse (enumeration): |

{{% table-nonheader %}}

AIResponse.None

No action was performed by the plugin.

AIResponse.Short

| The action performed took a short time.   | AIResponse.Medium               |
| ----------------- | ---------------------------------------------------- |
| The action performed took an average amount of time.  | AIResponse.Long              |
| The action performed took a long time. | {{% /table-nonheader %}} |
| You can directly control the driver handles with the *data.Handles* member, for example if you want to cut power or apply a certain brake notch. For plugin-specific actions, you should only simulate key presses, for example by calling KeyDown or KeyUp. This will prevent you from letting the AI cheat in any way. If you let the AI operate the handles, you should only change by one notch at a time with a short response time.   | If you decide to let the AI do something, you must set the *data.Response* member to a meaningful value. For operating the handles, best use a short response time, while for other actions like turning a switch not directly accessible, use a long response time. Note that the actual timings are at the whim of the host application.               |

Example:

{{% code %}}

```
if (AtsAlarm) {  
  /* The driver needs to cut power and apply the brakes,  
  * then press the virtual S key.*/  
  if (data.Handles.PowerNotch > 0) {  
    /* We change only by one notch at a time. */  
    data.Handles.PowerNotch -= 1;  
    data.Response = AIResponse.Short;  
  } else if (data.Handles.BrakeNotch < 2) {  
    /* We change only by one notch at a time. */  
    data.Handles.BrakeNotch += 1;  
    data.Response = AIResponse.Short;  
} else {  
    /* We simulate a key press here. */  
    KeyDown(VirtualKeys.S);  
    data.Response = AIResponse.Medium;  
  }  
} else if (AtoActive) {  
  /* Our ATO does not require driver interaction, so  
  * let's prevent the built-in AI from doing anything. */  
  data.Response = AIResponse.Long;  
} else {  
  /* Let the host application perform a default action  
  * such as braking for signals or stations. */  
  data.Response = AIResponse.None;  
}
```

{{% /code %}}

{{% code %}}

```
if (AtsAlarm) {  
  /* The driver needs to cut power and apply the brakes,  
  * then press the virtual S key.*/  
  if (data.Handles.PowerNotch > 0) {  
    /* We change only by one notch at a time. */  
    data.Handles.PowerNotch -= 1;  
    data.Response = AIResponse.Short;  
  } else if (data.Handles.BrakeNotch < 2) {  
    /* We change only by one notch at a time. */  
    data.Handles.BrakeNotch += 1;  
    data.Response = AIResponse.Short;  
} else {  
    /* We simulate a key press here. */  
    KeyDown(VirtualKeys.S);  
    data.Response = AIResponse.Medium;  
  }  
} else if (AtoActive) {  
  /* Our ATO does not require driver interaction, so  
  * let's prevent the built-in AI from doing anything. */  
  data.Response = AIResponse.Long;  
} else {  
  /* Let the host application perform a default action  
  * such as braking for signals or stations. */  
  data.Response = AIResponse.None;  
}
```

{{% /code %}}
