---
title: "Switches and Running on Alternate Tracks"
linktitle: "Adding Switches"
weight: 1
---

This page describes the principles of switches, and running the player train on alternate tracks within the game world.


At present, this is a basic implementation, and has many flaws which are centered around the routefile format, and the need to retain backwards compatability. 

Please note that further development is ongoing.

## ■ Basic Principles


The CSV route format is a linear format, centered around **Rail 0** , which defines the world path of the player.

Alternate rails may be added, but these are positioned relative to the player rail.

Two types of switch are available- The standard switch and a trailing switch.

The current implementation (as of **v1.10.0**) is basic, and is only intended as an initial working experiment. 
As such, signalling, speed limits etc. are poorly or not supported when running on secondary tracks.

## ■ Commands

{{% command %}}  
**Track.Switch** *FirstRail*; *SecondRail*; *InitialSetting*; *Reserved*; *SwitchName*; *FirstTrackName*; *SecondTrackName*  
{{% /command %}}

{{% command-arguments %}}  
***FirstRail***: A non-negative integer representing the first of the two switch rail indicies.   
***SecondRail***: A non-negative integer representing the second of the two switch rail indicies.  
***InitialSetting***: The initial setting for the switch.  
***Reserved***: Not currently used, reserved for future use.  
***SwitchName***: The name for the switch displayed on the map.  
***FirstTrackName***: The name for the first track when displayed on the map.  
***SecondTrackName***: The name for the second track when displayed on the map.  
{{% /command-arguments %}}

This creates a standard switch. 

If the player train is running in the forwards direction on the rail index defined by **FirstRail**, it will be switched to the current setting of the switch.

If the player train is running in the reverse direction on the rail index defined by **SecondRail**, and the current setting of the switch is also **SecondRail** it will be switched to **FirstRail**.

{{% command %}}  
**Track.SwitchT** *FirstRail*; *SecondRail*; *InitialSetting*; *Reserved*; *SwitchName*; *FirstTrackName*; *SecondTrackName*  
{{% /command %}}

{{% command-arguments %}}  
***FirstRail***: A non-negative integer representing the first of the two switch rail indicies.   
***SecondRail***: A non-negative integer representing the second of the two switch rail indicies.  
***InitialSetting***: The initial setting for the switch.  
***Reserved***: Not currently used, reserved for future use.  
***SwitchName***: The name for the switch displayed on the map.  
***FirstTrackName***: The name for the first track when displayed on the map.  
***SecondTrackName***: The name for the second track when displayed on the map.  
{{% /command-arguments %}}

This creates a trailing (reverse) switch. 

If the player train is running in the reverse direction on the rail index defined by **FirstRail**, it will be switched to the current setting of the switch.

If the player train is running in the forwards direction on the rail index defined by **SecondRail**, and the current setting of the switch is also **SecondRail** it will be switched to **FirstRail**.