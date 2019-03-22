---
title: "Track Following Object"
linktitle: "Track Following Object"
weight: 5
---

This page explains the principle and implementation of XML-based Track Following Object supported in 1.5.x or later.

## ■ Basic Principles

openBVE can freely run Track Following Object on other track.

It is necessary to set each object that you want to run using Track Following Object XML files. An example is shown below.

In this example the object runs as follows.

0. It is displayed when the in-game time 00:01:00 has elapsed and the object exists within 50 m to 100 m in game. It becomes invisible after 5 minutes have elapsed since being displayed. The appearance is defined in extensions.cfg in 7-car formation.
1. The in-game distance is 200 m and the right door is opened for 20 seconds and then the object accelerates to 30 km/h at an acceleration of 1.71km/h/s on Rail2.
2. It travels at 60 km/h above Rail 2 from 400 m distance in game.
3. The object decelerates from 30km/h to 1.71 km/h/s on Rail2, and opens the doors on both sides to a distance of 1000 m within the game and stops. After stopping for 10 seconds, accelerate backward to 30 km/h with an acceleration of 1.71 km/h/s on Rail1.
4. The object decelerates from 30 km/h to 1.71 km/h/s on Rail1, and opens the right door and stops at an in-game distance of 200 m.

{{< textarea >}}  
&lt;?xml version="1.0" encoding="utf-8"?>
&lt;openBVE xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  &lt;TrackFollowingObject>
    &lt;Definition>
      &lt;!--Time when the object appears[hh.mmss]-->
      &lt;AppearanceTime>00.0100&lt;/AppearanceTime>
      &lt;!--In-game distance of the starting point at which the object appears[m]-->
      &lt;AppearanceStartPosition>50&lt;/AppearanceStartPosition>
      &lt;!--In-game distance of the end point at which the object appears[m]-->
      &lt;AppearanceEndPosition>100&lt;/AppearanceEndPosition>
      &lt;!--The duration for which the object appears[hh.mmss]-->
      &lt;LeaveTime>00.0500&lt;/LeaveTime>
    &lt;/Definition>
    &lt;Train>
      &lt;!--Relative path of Train folder-->
      &lt;Directory>TrainDirectory&lt;/Directory>
    &lt;/Train>
    &lt;Stops>
      &lt;!--Start-->
      &lt;Stop>
        &lt;!--Deceleration[km/h/s]-->
        &lt;Decelerate>0.0&lt;/Decelerate>
        &lt;!--In-game distance of stop position[m]-->
        &lt;StopPosition>200&lt;/StopPosition>
        &lt;!--Door that open at this point-->
        &lt;Doors>1&lt;/Doors>
        &lt;!--Time to keep stopping[hh.mmss]-->
        &lt;StopTime>00.0020&lt;/StopTime>
        &lt;!--Acceleration[km/h/s]-->
        &lt;Accelerate>1.71&lt;/Accelerate>
        &lt;!--Speed after acceleration[km/h]-->
        &lt;TargetSpeed>30&lt;/TargetSpeed>
        &lt;!--Progress direction [1: forward, -1: backward]-->
        &lt;Direction>1&lt;/Direction>
        &lt;!--Traveling track-->
        &lt;Rail>2&lt;/Rail>
      &lt;/Stop>
      &lt;!--Maximum speed change-->
      &lt;Stop>
        &lt;Decelerate>0&lt;/Decelerate>
        &lt;StopPosition>400&lt;/StopPosition>
        &lt;StopTime>00.0000&lt;/StopTime>
        &lt;Accelerate>0&lt;/Accelerate>
        &lt;TargetSpeed>60&lt;/TargetSpeed>
        &lt;Direction>1&lt;/Direction>
        &lt;Rail>2&lt;/Rail>
      &lt;/Stop>
      &lt;!--Return-->
      &lt;Stop>
        &lt;Decelerate>1.71&lt;/Decelerate>
        &lt;StopPosition>1000&lt;/StopPosition>
        &lt;Doors>B&lt;/Doors>
        &lt;StopTime>00.0010&lt;/StopTime>
        &lt;Accelerate>1.71&lt;/Accelerate>
        &lt;TargetSpeed>30&lt;/TargetSpeed>
        &lt;Direction>-1&lt;/Direction>
        &lt;Rail>1&lt;/Rail>
      &lt;/Stop>
      &lt;!--Goal-->
      &lt;Stop>
        &lt;Decelerate>1.71&lt;/Decelerate>
        &lt;StopPosition>200&lt;/StopPosition>
        &lt;Doors>R&lt;/Doors>
        &lt;StopTime>00.0030&lt;/StopTime>
        &lt;Accelerate>0&lt;/Accelerate>
        &lt;TargetSpeed>0&lt;/TargetSpeed>
        &lt;Direction>1&lt;/Direction>
        &lt;Rail>1&lt;/Rail>
      &lt;/Stop>
    &lt;/Stops>
  &lt;/TrackFollowingObject>
&lt;/openBVE>
{{< /textarea >}}

As you can see, the file consists of one **\<Definition>** section, one **\<Car>** section and one **\<Stops>** section. The **\<Stops>** section consists of two or more **\<Stop>** sections.

## ■ Definition attribute

{{% command %}}  
**\<AppearanceTime>** *Time* **\</AppearanceTime>**  
{{% /command %}}

**Time** sets the time when the object appears in the game.

*Note:* If this parameter is omitted, the object will emerge from the start of the game.

------

{{% command %}}  
**\<AppearanceStartPosition>** *Position* **\</AppearanceStartPosition>**  
{{% /command %}}

**Position** sets the in-game distance at which the object starts appearing. An object will appear when this object passes by this object. The unit is **meter**.

*Note:* If this parameter is omitted, the object will emerge from the start of the game.

------

{{% command %}}  
**\<AppearanceEndPosition>** *Position* **\</AppearanceEndPosition>**  
{{% /command %}}

**Position** sets the in-game distance at the end point where the object appears. No object will emerge when this object passes by this object. It must also be greater than the value specified for **\<Appearance Start Position>**. The unit is **meter**.

*Note:* If this parameter is omitted, the object will emerge from the start of the game.

------

{{% command %}}  
**\<LeaveTime>** *Time* **\</LeaveTime>**  
{{% /command %}}

**Time** sets the duration from when the object appears in the game until it disappears. The object will not be visible after this time. This value is not an in-game time.

*Note:* If this parameter is omitted, the object will remain until the end of the game.

## ■ Train attribute

{{% command %}}  
**\<Directory>** *Path* **\</Directory>**  
{{% /command %}}

**Path** sets the relative path to the directory containing the object's train.dat, sound.cfg and extensions.cfg.

## ■ Stop attribute

{{% command %}}  
**\<Decelerate>** *Value* **\</Decelerate>**  
{{% /command %}}

**Value** sets the deceleration of the object. The unit is **km/h/s**.

------

{{% command %}}  
**\<StopPosition>** *Position* **\</StopPosition>**  
{{% /command %}}

**Position** sets the in-game distance where the object stops. The unit is **meter**.

------

{{% command %}}  
**\<Doors>** *Value* **\</Doors>**  
{{% /command %}}

**Value** sets the open door of the object. The valid values are:

- **L** or **-1**: The left door opens.
- **N** or **0**: Neither door opens.
- **R** or **1**: The right door opens.
- **B**: Both doors open.

------

{{% command %}}  
**\<StopTime>** *Time* **\</StopTime>**  
{{% /command %}}

**Time** sets the duration of the stop of the object. This value is not an in-game time.

------

{{% command %}}  
**\<Accelerate>** *Value* **\</Accelerate>**  
{{% /command %}}

**Value** sets the acceleration of the object. The unit is **km/h/s**.

------

{{% command %}}  
**\<TargetSpeed>** *Value* **\</TargetSpeed>**  
{{% /command %}}

**Value** sets the speed after the acceleration of the object. The unit is **km/h**.

------

{{% command %}}  
**\<Direction>** *Value* **\</Direction>**  
{{% /command %}}

**Value** sets the direction of travel of the object. Valid values are as follows.

- **F** or **1** : The object will move forward.
- **R** or **-1** : The object goes backward.

------

{{% command %}}  
**\<Rail>** *RailIndex* **\</Rail>**  
{{% /command %}}

**RailIndex** sets the trajectory on which the object will run. It is necessary to define the trajectory by the **Track.Rail** command of the route file.