---
title: "標準"
weight: 6
---

喺路線同列車開發時嘅某些情況下，您要同其他開發人士協調，以便輕鬆咁喺唔同路線交換列車。否則，列車可能無法喺路線上行或聽起嚟唔正確。

例如，只要火车沿着铁轨移动，就会播放 run i.wav 声音，其中 i 是标识铁轨类型的数字。 如果开发人员 A 使用 run1.wav 来表示连续焊接的铁轨，而另一个开发人员 B 使用 run1.wav 作为声音来表示混凝土轨枕上的接合铁轨，则两列火车可能不适合在同一路线上使用。 这使得跨路线的火车交换变得困难，即使在现实中会在该路线上使用火车。

As such, if you know of standards that have been created and are actually employed by enough developers, give your feedback, and these standards might be listed here.

## ■ 列車 run*i*.wav 聲檔

The only attempt currently known is the [BVE Track Sound Standard](http://www.railsimroutes.net/bvetss/index.php). It should be noted that it is not widely used outside the UK, and also not necessarily suited for all kinds of railways.

## ■ 列車 flange*i*.wav 聲檔

No attempts are currently known to standardize the meanings of flange*i*.wav sounds.

## ■ Beacons

Beacons reserved for the built-in safety systems ATS-SN and ATS-P. These should only be used by route/train developers if the meaning of the beacons are (nearly) identical:

{{% table %}}

| Beacon type | Optional data  | 意思                                                      |
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

| Beacon type | Optional data  | 意思                                                      |
| ----------- | -------------- | ------------------------------------------------------------ |
| 21           | *Intensity*   | Sets the intensity of the weather.<br /><br />Values for *Intensity* should be within the following range:<br />0: No weather.<br />100: Maximum weather intensity. |

{{% /table %}}

UK Basic AWS / TPWS Beacons (Supported by OS_ATS, UKTrainSys, UKDT, UKMU & UKEMU):

{{% table %}}

| Beacon type | Optional data  | 意思                                                      |
| ----------- | -------------- | ------------------------------------------------------------ |
| 44000       | 0              | Permanent AWS signal approach magnet. Raises an alarm the driver has to acknowledge if the referenced signal is red. |
| 44001       | 0              | AWS speed restriction magnet. Raises an alarm the driver has to acknowledge regardless. |
| 44003       | 0              | TPWS inductor associated with a signal. Triggers a TPWS brake demand if the referenced section is occupied. |
| 44003       | 0              | TPWS inductor associated with a signal. Triggers a TPWS brake demand if the referenced section is occupied. <br /> If you wish to issue a brake demand regardless (e.g. buffers), then the current section should be referenced. |
| 44004       | *Speed*        | TPWS overspeed inductor. Triggers a TPWS brake demand if the train's speed is greater than *Speed*. |

{{% /table %}}