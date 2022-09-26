---
title: "Playing Sounds from a Microphone Input"
linktitle: "Playing Sounds from a Microphone Input"
weight: 2
---

openBVE 1.5.4.0 introduces the ability to play sounds from the microphone or line-in input to a specified position within the game world. 

---

{{% command %}}  
**Track.MicSound** *X* ; *Y* ; *ForwardsTolerance* ; *BackwardsTolerance*  
{{% /command %}}

{{% command-arguments %}}  
***X***: The X position of the sound.  
***Y***: The Y position of the sound.  
***ForwardsTolerance***: The distance in meters at which the sound becomes audible as the train approaches it's position.  
***BackwardsTolerance***: The distance in meters at which the sound is inaudible after the train passes it's position.  
{{% /command-arguments %}}

__**Implementation Notes**__:

* Microphone input must be activated using the **PLAY_MIC_SOUNDS** key, which is assigned to **W** by default.
* The microphone input will be routed to all **Track.MicSound** sound sources within the camera range.
* Only the first available openAL microphone input is supported at present. 