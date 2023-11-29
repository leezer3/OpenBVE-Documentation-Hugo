---
title: "The **sound.xml** file format"
linktitle: "The sound.xml file"
weight: 1
---

{{% contents %}}

- [1. Overview](#overview)
- [2. Common Properties](#properties)
- [3. ATS Sounds](#ats)
- [4. Run Sounds](#run)
- [5. Flange Sounds](#flange)
- [6. Switch Sounds](#switch)
- [7. Horn Sounds](#horn)
- [8. Compressor Sounds](#compressor)
- [9. Handle Sounds](#handle)
- [10. Reverser Sounds](#reverser)
- [11. Brake Sounds](#brake)
- [12. Door Sounds](#doors)
- [13. Suspension Sounds](#suspension)
- [14. Motor Sounds](#motor)
- [15. Breaker Sounds](#breaker)
- [16. Windscreen Related Sounds](#windscreen)
- [17. Sanders Related Sounds](#sanders)
- [17. Miscellaneous Sounds](#misc)

{{% /contents %}}

## <a name="overview"></a>■ 1. Présentation

The **sound.xml** format is the native train sound format for newer versions of OpenBVE.


## <a name="properties"></a>■ 2. Common Properties

All sound definitions share the following common properties:

{{% command %}}  
**\<FileName>** *SoundFile* **\</FileName>**  
{{% /command %}}

**SoundFile** should be a relative on-disk path to the sound file to be assigned.

{{% command %}}  
**\<Radius>** *SoundRadius* **\</SoundRadius>**  
{{% /command %}}

This sets the effective radius of the sound.

**SoundRadius** defines a spherical volume of space in meters, relative to the origin of the sound, within which the sound is played at full volume. 

If the camera is outside of this volume of space, the volume is attenuated according to the camera position.

{{% command %}}  
**\<Position>** *Position* **\</Position>**  
{{% /command %}}

**Position** should contain a comma-separated 3D vector, defining the position of sound within the car, relative to *0,0,0*

## <a name="ats"></a>■ 3. ATS Sounds

The **\<ATS>** node defines sounds to be played by train plugins, and must contain a minimum of one **\<Sound>** child-node, with the following additional unique properties:

{{% command %}}  
**\<Index>** *SoundIndex* **\</Index>**  
{{% /command %}}

**SoundIndex** must be a non-negative integer, defining the ATS sound index to be assigned.

## <a name="run"></a>■ 4. Run Sounds

The **\<Run>** node defines run sounds to be played by on differing track types, and must contain a minimum of one **\<Sound>** child-node, with the following additional unique properties:

{{% command %}}  
**\<Index>** *SoundIndex* **\</Index>**  
{{% /command %}}

**SoundIndex** must be a non-negative integer, defining the run sound index to be assigned.

## <a name="flange"></a>■ 5. Flange Sounds

The **\<Flange>** node defines flange sounds to be played on differing track types, and must contain a minimum of one **\<Sound>** child-node, with the following additional unique properties:

{{% command %}}  
**\<Index>** *SoundIndex* **\</Index>**  
{{% /command %}}

**SoundIndex** must be a non-negative integer, defining the flange sound index to be assigned.

## <a name="switch"></a>■ 6. Switch Sounds

The **\<Switch>** node defines switch sounds to be played on differing track types, and must contain a minimum of one **\<Sound>** child-node, with the following additional unique properties:

{{% command %}}  
**\<Index>** *SoundIndex* **\</Index>**  
{{% /command %}}

**SoundIndex** must be a non-negative integer, defining the switch sound index to be assigned.

## <a name="horn"></a>■ 7. Horn Sounds

The **\<Horn>** node defines sounds to be played by each train horn. This consists of three sub-nodes- **\<Primary>** , **\<Secondary>** and **\<Music>** corresponding to the three horn types.

Each horn must define a **\<Loop>** child-node, containing the sound to be played whilst the horn is active.

Optionally, the **\<Start>** and **\<End>** child nodes may also be defined, which set a sound to be played once respectively before and after the main loop.

## <a name="compressor"></a>■ 8. Compressor Sounds

The **\<Compressor>** node defines the sounds to be played by the train air-compressor.

This node must define three child-nodes:

The **\<Start>** child-node, containing the sound to be played when the compressor first activates.

The **\<Loop>** child-node, containing the sound to be played whilst the compressor is active.

The **\<End>** child-node, containing the sound to be played when the compressor deactivates.

## <a name="handle"></a>■ 9. Handle Sounds

The **\<PowerHandle>** and **\<BrakeHandle>** nodes defines the sounds to be played when the respective power and brake handles are moved.

These nodes support the following child nodes:

The **\<Minimum>** child-node, containing the sound to be played when the handle is returned to notch zero.

The **\<Apply>** child-node, containing the sound to be played when the notch is changed to a notch greater than zero, but less than maximum.

The **\<Maxiumum>** child-node, containing the sound to be played when the handle is increased to the maximum notch.

## <a name="reverser"></a>■ 10. Reverser Sounds

The **\<Reverser>** node defines the sounds to be played when the reverser is moved.

This node supports the following child nodes:

The **\<On>** child-node, containing the sound to be played when the reverser is moved to forwards or reverse.

The **\<Off>** child-node, containing the sound to be played when the reverser is returned to neutral.

## <a name="brake"></a>■ 11. Brake Sounds

The **\<Brake>** node defines the sounds to be played when the brakes are activated.

This node supports the following child nodes:

The **\<ReleaseFull>** child-node, containing the sound to be played when the pressure in the brake cylinder is decreased to zero.

The **\<ReleaseHigh>** child-node, containing the sound to be played when the pressure in the brake cylinder is decreased from a high value.

The **\<Release>** child-node, containing the sound to be played when the pressure in the brake cylinder is decreased from a high value to a non-zero value

The **\<Emergency>** child-node, containing the sound to be played when the emergency brakes are activated.

The **\<Application>** child-node, containing the sound to be played when the handle is moved into the SRV or EMG position, if the train has an automatic air brake. For other trains, is played when the brake notch is decreased

## <a name="doors"></a>■ 12. Door Sounds

The **\<Doors>** node defines the sounds to be played when the doors open and close.

This node supports the following child nodes:

The **\<OpenLeft>** child-node, containing the sound to be played when the left-hand doors open.

The **\<CloseLeft>** child-node, containing the sound to be played when the left-hand doors close.

The **\<OpenRight>** child-node, containing the sound to be played when the right-hand doors open.

The **\<CloseRight>** child-node, containing the sound to be played when the right-hand doors close.

## <a name="suspension"></a>■ 13. Suspension Sounds

The **\<Suspension>** node defines the sounds to be played by the motion of the train's suspension.

This node supports the following child nodes:

The **\<Left>** child-node, containing the sound to be played when the train sways to the left.

The **\<Right>** child-node, containing the sound to be played when the train sways to the right.

## <a name="motor"></a>■ 14. Motor Sounds

The **\<Motor>** node defines the sounds attached to each Motor Sound table, and must contain a minimum of one **\<Sound>** child-node, with the following additional unique properties:

{{% command %}}  
**\<Index>** *SoundIndex* **\</Index>**  
{{% /command %}}

**SoundIndex** must be a non-negative integer, defining the motor sound sound index to be assigned.

## <a name="breaker"></a>■ 15. Breaker Sounds

The **\<Breaker>** node defines the sounds triggered by the train's circuit breakers, and supports the following child-nodes:

The **\<On>** child-node, containing the sound played once when power is resumed (was interrupted before). There is a series of circumstances when that can happen, for example when moving from power notch zero to power notch one, assuming the reverser is non-neutral and the brakes are released. It can also happen when the power notch is already non-zero, but the reverser or brakes previously interrupted the power. The safety systems can also interrupt power.

The **\<Off>** child-node, containing the sound to be played once when power is interrupted or resumed. There is a series of circumstances when that can happen, for example when moving from power notch zero to power notch one, or vice versa, assuming the reverser is non-neutral and the brakes are released. The safety systems can also interrupt power.

## <a name="windscreen"></a>■ 16. Windscreen Related Sounds

The **\<Windscreen>** node defines the sounds relating to the train's windscreen and wipers. 

This node supports the following child nodes:

The **\<RainDrop>** child-node, containing the sound played when a raindrop hits the windscreen.

The **\<WetWipe>** child-node, containing the sound played when the wiper moves with more than 20% of the available drops visible.

The **\<DryWipe>** child-node, containing the sound played when the wiper moves with less than 20% of the available drops visible.

The **\<Switch>** child-node, containing the sound played when wiper switch is moved.

## <a name="sanders"></a>■ 17. Sanders Related Sounds

The **\<Sanders>** node defines the sounds relating to the train's sanders. 

This node supports the following child nodes:

The **\<Activate>** child-node, containing the sound played when the sanders are activated with sand remaining.

The **\<EmptyActivate>** child-node, containing the sound played when the sanders are activated with no sand remaining.

The **\<DeActivate>** child-node, containing the sound played when the sanders are deactivated.

The **\<Loop>** child-node, containing the sound played in a loop whilst the sanders are active.

The **\<Empty>** child-node, containing the sound played once when the sander have no sand remaining.

## <a name="sanders"></a>■ 18. Coupler Related Sounds

The **\<Coupler>** node defines the sounds relating to the train's couplers.

This node supports the following child nodes:

The **\<Uncouple>** child-node, containing the sound played when a coupler is uncoupled.

## <a name="misc"></a>■ 19. Miscellaneous Sounds

The **\<Loop>** node defines a sound to be played in a continuous loop throughout the simulation.

The **\<Rub>** node defines the sound to be played in a loop when the brake shoe rubs against the wheels. The sound is played at a pitch inversely proportional to the speed, and the volume of the sound decreases with increasing speeds.

The **\<Halt>** node defines the sound to be played once or in a loop (depending on the train.dat setting) when the pass alarm system warns about an approaching station stop.