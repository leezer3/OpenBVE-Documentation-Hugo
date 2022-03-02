---
title: "The XML Station Format"
linktitle: "XML Stations & Request Stops"
weight: 4
---

This page describes the principles and implementation of the XML based station format.

## ■ 기본 원리

A station within openBVE, when combined with one or more *.Stop* commands, defines a point at which trains call. 

Each station which you wish to use must be setup using a Station XML file an example of which is shown below: 

{{< textarea >}}  
&lt;?xml version="1.0" encoding="utf-8"?>
&lt;openBVE xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
    &lt;Station>
        &lt;Name>Dockyard&lt;/Name>
        &lt;ArrivalTime>12.3130&lt;/ArrivalTime>
        &lt;DepartureTime>12.3150&lt;/DepartureTime>
        &lt;Doors>Left&lt;/Doors>
        &lt;ForcedRedSignal>False&lt;/ForcedRedSignal>
        &lt;PassengerRatio>10&lt;/PassengerRatio>
    &lt;/Station>
&lt;/openBVE>  
{{< /textarea >}}

## ■ The basic station

The following basic attributes are required for all stations:

------

{{% command %}}  
**\<Name>** *StationName* **\</Name>**  
{{% /command %}}

**StationName** sets the textual string by which this station is referred to in timetables, in-game messages etc.

------

{{% command %}}  
**\<ArrivalTime>** *Time* **\</ArrivalTime>**  
{{% /command %}}

**Time** sets the time at which the player's train is expected to arrive at this station.

*Note:* When this parameter is omitted, the player is permitted to arrive at any time.

------

{{% command %}}  
**\<DepartureTime>** Time **\</DepartureTime>**  
{{% /command %}}

**Time** sets the time at which the player's train is expected to depart this station.

*Note:* When this parameter is omitted, the player is permitted to depart at any time.

------

{{% command %}}  
**\<Doors>** Value **\</Doors>**  
{{% /command %}}

**Doors** controls the side on which the train doors are to open. Valid values are:

- **Left , L or -1** : The left-hand doors are to open.
- **Right, R or 1** : The right-hand doors are to open.
- **None, N or 0** : No doors open at this station.

*Note:* If omitted, no doors open.

------

{{% command %}}  
**\<ForcedRedSignal>** True / False **\</ForcedRedSignal>**  
{{% /command %}}

If *ForcedRedSignal* is set to **True** , then the signal associated with this station will be held at Red (Aspect 0) until the scheduled departure time.

------

{{% command %}}  
**\<PassengerRatio>** *Ratio* **\</PassengerRatio>**  
{{% /command %}}

**Ratio** sets the approximate ratio of passengers on-board the train from this point onwards. As a reference, **100** represents a train with normal amount of passengers, while **250** represents an over-crowded train. Values in-between **0** and **250** should be used.

------

{{% command %}}  
**\<ArrivalSound>** Sound **\</ArrivalSound>**  
{{% /command %}}

**Sound** should be the path of the sound-file to be played upon arrival at this station, relative to the Sound folder.

------

{{% command %}}  
**\<DepartureSound>** Sound **\</DepartureSound>**  
{{% /command %}}

**Sound** should be the path of the sound-file to be played upon departure from this station, relative to the Sound folder.

------

{{% command %}}  
**\<StopDuration>** Duration **\</StopDuration>**  
{{% /command %}}

**Duration** should be the minimum stop duration in seconds, to include both the door opening and closing times. The default value is **15**.

------

{{% command %}}  
**\<TimeTableIndex>** Index **\</TimeTableIndex>**  
{{% /command %}}

**Index** sets the timetable to be shown from this station on as defined via *Train.Timetable(TimetableIndex)*

## ■ Creating a Request Stop

Creating a request stop requires one further section to be added within your *\<Station>* section:

{{< textarea >}}  
&lt;RequestStop>
    &lt;Probability>50&lt;/Probability>
    &lt;Distance>700&lt;/Distance>
    &lt;StopMessage>You will need to stop at Dockyard today.&lt;/StopMessage>
    &lt;PassMessage>No passengers for Dockyard.&lt;/PassMessage>
&lt;/RequestStop>  
{{< /textarea >}}

The following basic attributes are supported for this section:

------

{{% command %}}  
**\<EarlyTime>** Time **\</EarlyTime>**  
{{% /command %}}

**Time** sets the time before which the Early probabilities / message will be used.

*Note:* May be omitted.

------

{{% command %}}  
**\<LateTime>** Time **\</LateTime>**  
{{% /command %}}

**Time** sets the time before which the Late probabilities / message will be used.

*Note:* May be omitted.

------

{{% command %}}  
**\<Distance>** DistanceInMeters **\</Distance>**  
{{% /command %}}

**DistanceInMeters** sets the distance in meters before this station that the Request Stop roll will be made.

*Note:* This distance must be less than that to the previous station.

------

{{% command %}}  
**\<StopMessage>** Message **\</StopMessage>**  
{{% /command %}}  
{{% command %}}  
**\<PassMessage>** Message **\</PassMessage>**  
{{% /command %}}

**Message** sets the textual message to be displayed in the upper left of the screen when the request stop is triggered, depending on whether we are to stop at or pass this station.

Alternatively, if you require a specific message when the player is early/ late, the following sub-attributes are supported:

{{% command %}}  
**<font color="royalblue">\<Early></font>** *<font color="royalblue">Message</font>* **<font color="royalblue">\</Early></font>**  
{{% /command %}}  
{{% command %}}  
**<font color="royalblue">\<OnTime></font>** *<font color="royalblue">Message</font>* **<font color="royalblue">\</OnTime></font>**  
{{% /command %}}  
{{% command %}}  
**<font color="royalblue">\<Late></font>** *<font color="royalblue">Message</font>* **<font color="royalblue">\</Late></font>**  
{{% /command %}}

------

{{% command %}}  
**\<Probability>** *Value* **\</Probability>**  
{{% /command %}}

**Probability** should be an integer from **0** to **100** , representing the approximate probability that this stop may be requested.

Alternatively, if you require a specific probability when the player is early/ late, the following sub-attributes are supported:

{{% command %}}  
**<font color="royalblue">\<Early></font>** *<font color="royalblue">Value</font>* **<font color="royalblue">\</Early></font>**  
{{% /command %}}  
{{% command %}}  
**<font color="royalblue">\<OnTime></font>** *<font color="royalblue">Value</font>* **<font color="royalblue">\</OnTime></font>**  
{{% /command %}}  
{{% command %}}  
**<font color="royalblue">\<Late></font>** *<font color="royalblue">Value</font>* **<font color="royalblue">\</Late></font>**  
{{% /command %}}

*Note:* If only one or two of the specific probabilities above are set, the others are assumed to have a zero-probability and thus will not trigger.

------

{{% command %}}  
**\<MaxCars>** *Cars* **\</MaxCars>**  
{{% /command %}}

**Cars** sets the maximum length of a train before this request stop is automatically skipped.

*Note:* No message is displayed in this case.

------

{{% command %}}  
**\<AIBehaviour>** *Value* **\</AIBehaviour>**  
{{% /command %}}

**Value** controls the behaviour of the default AI driver towards this request stop. Valid values are:

- **FullSpeed or 0** : If the request stop is not triggered, the AI driver ignores it and passes at linespeed.
- **NormalBrake or 1** : If the request stop is not triggered, the AI driver brakes to ~10mph as it passes through the station.

*Note:* May be overriden by plugins implementing an AI method.