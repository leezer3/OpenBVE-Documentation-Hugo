---
title: "Standards"
weight: 6
---

On a few occasions in route and train development, you will need to coordinate your efforts with other developers in order to allow easy exchange of trains across routes. Otherwise, trains might not work on a route or might not sound correctly.

For example, the run i.wav sounds are played whenever the train moves along the rails, where i is a number identifying the rail type. If developer A used run1.wav to represent a continuously elded rail, but another developer B used run1.wav as the sound to represent jointed rails on concrete leepers, both trains might not be suited for use on the same route. This makes exchange of trains across routes difficult, even if a train would be used on that route in reality.

As such, if you know of standards that have been created and are actually employed by enough developers, give your feedback, and these standards might be listed here.

## ■ Train run*i*.wav sounds

The only attempt currently known is the [BVE Track Sound Standard](http://www.railsimroutes.net/bvetss/index.php). It should be noted that it is not widely used outside the UK, and also not necessarily suited for all kinds of railways.

## ■ Train flange*i*.wav sounds

No attempts are currently known to standardize the meanings of flange*i*.wav sounds.

## ■ Beacons

Beacons reserved for the built-in safety systems ATS-SN and ATS-P. These should only be used by route/train developers if the meaning of the beacons are (nearly) identical:

{{% table %}}

| Beacon type | Optional data  | 意味                                                      |
| ----------- | -------------- | ------------------------------------------------------------ |
| 0           | *SwitchSystem* | S-type transponder for ATS-SN. Placed about 600m in front of a signal. Raises an alarm the driver has to acknowledge whenever the referenced signal is red.<br /><br />Values for *SwitchSystem*:<br />-1: The train should not switch the safety system.<br />0: The train should automatically switch from ATS-P to ATS-SN when passing this beacon. |
| 1           | *SwitchSystem* | SN-type transponder for ATS-SN. Placed about 20m in front of a signal. Triggers the emergency brakes whenever the referenced signal is red.<br /><br />Values for *SwitchSystem*:<br />-1: The train should not switch the safety system.<br />0: The train should automatically switch from ATS-P to ATS-SN when passing this beacon. |
| 2           | *Cars*         | Immediate stop transponder for ATS-SN and ATS-P. Placed after stops. Applies the emergency brakes whenever the referenced signal is red and the number of cars corresponds to the optional data.<br /><br />Values for *Cars*:<br />0: The transponder triggers regardless of the amount of cars.<br />*Positive integer*: The transponder triggers only if *Cars* is greater than or equal to the number of cars the train has. |
| 3           | *SwitchSystem* | Pattern renewal transponder for ATS-P. Multiple of these are placed in front of a signal. Informs the train about the distance to the referenced signal and whether it is red or not. The train then calculates a brake curve to the referenced signal if it is red.<br /><br />Values for *SwitchSystem*:<br />-1: The train should not switch the safety system.<br />0: The train should automatically switch from ATS-SN to ATS-P when passing this beacon. |
| 4           | *SwitchSystem* | Immediate stop transponder for ATS-P. Placed about 25m/30m in front of a signal. Informs the train about the distance to the referenced signal and whether it is red or not. The train brakes immediately if the signal is red.<br /><br />Values for *SwitchSystem*:<br />-1: The train should not switch the safety system.<br />0: The train should automatically switch from ATS-SN to ATS-P when passing this beacon. |
| -16777214   | *SpeedLimit*   | Generated automatically by the CSV / RW route parser for track sections with ATC. *SpeedLimit* passes the applicable speed limit in this case. |
| -16777215   | *TrackState*   | Generated automaticall by the CSV / RW route parser. *TrackState* is set to **1** when the track is compatible with ATC, **0** otherwise. |

{{% /table %}}

Beacons used by legacy train systems to simulate weather (Note- These will also be utilised by any train using the new Windscreen functionality):

{{% table %}}

| Beacon type | Optional data  | 意味                                                      |
| ----------- | -------------- | ------------------------------------------------------------ |
| 21           | *Intensity*   | Sets the intensity of the weather.<br /><br />Values for *Intensity* should be within the following range:<br />0: No weather.<br />100: Maximum weather intensity. |

{{% /table %}}

UK Basic AWS / TPWS Beacons (Supported by OS_ATS, UKTrainSys, UKDT, UKMU & UKEMU):

{{% table %}}

| Beacon type | Optional data  | 意味                                                      |
| ----------- | -------------- | ------------------------------------------------------------ |
| 44000       | 0              | Permanent AWS signal approach magnet. Raises an alarm the driver has to acknowledge if the referenced signal is red. |
| 44001       | 0              | AWS speed restriction magnet. Raises an alarm the driver has to acknowledge regardless. |
| 44003       | 0              | TPWS inductor associated with a signal. Triggers a TPWS brake demand if the referenced section is occupied. |
| 44003       | 0              | TPWS inductor associated with a signal. Triggers a TPWS brake demand if the referenced section is occupied. <br /> If you wish to issue a brake demand regardless (e.g. buffers), then the current section should be referenced. |
| 44004       | *Speed*        | TPWS overspeed inductor. Triggers a TPWS brake demand if the train's speed is greater than *Speed*. |

{{% /table %}}