---
title: "Default sounds"
weight: 7
---

Without using a sound.cfg file, openBVE looks for a series of optional sound files within the train folder.

## ■ Sounds played whilst only in the cab

{{% table %}}

| Fitxer | Effect |
| --- |--- |
| adjust.wav | Played once when the train stops at a station, but needs to correct its stop position. |
| ats.wav | Played in a loop when the built-in security system ATS rings its bell. This happens when passing certain transponders or when the security system is deactivated but power is applied. |
| atscnt.wav | Played in a loop when the built-in security system ATS rings its chime. This happens after acknowledging the bell when passing S-type transponders. |
| brake.wav | For trains with automatic air brake, is played when the handle is moved into the SRV or EMG position. For other trains, is played when the brake notch is decreased. |
| ding.wav | Played once when the built-in security systems ATS-P or ATC change some states, e.g. when ATS-P activates the PTN APPROACH lamp, or when ATC changes the current speed restriction. |
| eb.wav | Played in a loop when the built-in EB system rings. |
| halt.wav | Played once or in a loop (depending on the train.dat setting) when the pass alarm system warns about an approaching station stop. |
| klaxon.wav | Played once when the primary horn is applied. |
| klaxon0.wav | Played once when the primary horn is applied. Has precedence over klaxon.wav. |
| klaxon1.wav | Played once when the secondary horn is applied. |
| klaxon2.wav | Played in a loop when the music horn is applied. |
| toats.wav | Played once when the built-in security system is switched from ATC to ATS. |
| toatc.wav | Played once when the built-in security system is switched from ATS to ATC. |

{{% /table %}}

## ■ Sounds played on all cars (when applicable)

{{% table %}}

| Fitxer | Effect |
| --- |--- |
| air.wav | Played occasionally when the pressure in the brake cylinder is decreased from a non-high value to a non-zero value. |
| airhigh.wav | Played occasionally when the pressure in the brake cylinder is decreased from a high value. |
| airzero.wav | Played occasionally when the pressure in the brake cylinder is decreased to zero value. |
| cpstart.wav | Played once when the air compressor is activated. |
| cploop.wav | Played in a loop for the duration the air compressor is active. |
| cpend.wav | Played once when the air compressor is deactivated. |
| doorcls.wav | Played once when the doors close. |
| doorclsl.wav | Played once when the left doors close. Has precedence over doorscls.wav. |
| doorclsr.wav | Played once when the right doors close. Has precedence over doorscls.wav. |
| dooropn.wav | Played once when the doors open. |
| dooropnl.wav | Played once when the left doors open. Has precedence over doorscls.wav. |
| dooropnr.wav | Played once when the right doors open. Has precedence over doorscls.wav. |
| emrbrake.wav | Played once when the emergency brakes are activated. |
| flangei.wav | Defines a set of sounds played in a loop when the flange of the wheels rub against the rails. The sounds are played at a pitch proportional to the speed. The recordings should correspond to a speed of 45 km/h. The non-negative integer i corresponds to the Train.Flange command in CSV routes where route developers can select which of the flangei.wav sounds to play for a certain type of rail. |
| loop.wav | Played in a loop all the time for the duration of the simulation. |
| point.wav | Played once per axle when the train crosses a pointwork. |
| rub.wav | Played in a loop when the brake shoe rubs against the wheels. The sound is played at a pitch inversely proportional to the speed, and the volume of the sound decreases with increasing speeds. |
| runi.wav | Defines a set of sounds played in a loop for the duration the train moves. The sounds are played at a pitch proportional to the speed. The recordings should correspond to a speed of 90 km/h. The non-negative integer i corresponds to the Train.Run command in CSV routes where route developers can select which of the runi.wav sounds to play for a certain type of rail. |
| springl.wav | Played once when the train sways to the left side. |
| springr.wav | Played once when the train sways to the right side. |
| motori.wav | Defines a set of sounds played in a loop as instructed by the train.dat. The pitch, volume and index i are defined in the #MOTOR_Xn sections in the train.dat, and the sounds should be developed in conjunction with the train.dat. |

{{% /table %}}