---
title: "Default sounds"
weight: 7
---

Without using a sound.cfg file, openBVE looks for a series of optional sound files within the train folder.

The following positions are used:
* **Panel** - The sound origin is centered 1m forward of the driver's eye position.
* **Cab** - The sound origin is centered 0.5m behind the driver's eye position.
* **Left** - The sound origin is centered 1.3m to the left of the center of the car.
* **Right** - The sound origin is centered 1.3m to the right of the center of the car.
* **Front** - The sound origin is centered on the front of the car.
* **Rear** - The sound origin is centered on the rear of the car.
* **Center** - The sound origin is at the absolute center of the car.
* **FrontAxle** - The sound origin is at the front axle of the car.
* **RearAxle** - The sound origin is at the rear axle of the car.

## ■ Sounds played whilst only in the cab

{{% table %}}

| File | Effect | Position | Sound Radius |
| --- | --- | --- | --- |
| adjust.wav | Played once when the train stops at a station, but needs to correct its stop position. | Panel | 2.0m |
| ats.wav | Played in a loop when the built-in security system ATS rings its bell. This happens when passing certain transponders or when the security system is deactivated but power is applied. | Center | 5.0m |
| atscnt.wav | Played in a loop when the built-in security system ATS rings its chime. This happens after acknowledging the bell when passing S-type transponders. | Panel | 2.0m |
| brake.wav | For trains with automatic air brake, is played when the handle is moved into the SRV or EMG position. For other trains, is played when the brake notch is decreased. | Center | 5.0m |
| ding.wav | Played once when the built-in security systems ATS-P or ATC change some states, e.g. when ATS-P activates the PTN APPROACH lamp, or when ATC changes the current speed restriction. | Panel | 2.0m |
| eb.wav | Played in a loop when the built-in EB system rings. | Panel | 2.0m |
| halt.wav | Played once or in a loop (depending on the train.dat setting) when the pass alarm system warns about an approaching station stop. | Cab | 2.0m |
| klaxon.wav | Played once when the primary horn is applied. | Front | 5.0m |
| klaxon0.wav | Played once when the primary horn is applied. Has precedence over klaxon.wav. | Front | 5.0m |
| klaxon1.wav | Played once when the secondary horn is applied. | Front | 5.0m |
| klaxon2.wav | Played in a loop when the music horn is applied. | Front | 5.0m |
| toats.wav | Played once when the built-in security system is switched from ATC to ATS. | Panel | 2.0m |
| toatc.wav | Played once when the built-in security system is switched from ATS to ATC. | Panel | 2.0m |

{{% /table %}}

## ■ Sonidos reproducidos en todos los carros (cuando aplique)

{{% table %}}

| File | Effect | Position | Sound Radius |
| --- | --- | --- | --- |
| air.wav | Played occasionally when the pressure in the brake cylinder is decreased from a non-high value to a non-zero value. | Center | 5.0m |
| airhigh.wav | Played occasionally when the pressure in the brake cylinder is decreased from a high value. | Center | 5.0m |
| airzero.wav | Played occasionally when the pressure in the brake cylinder is decreased to zero value. | Center | 5.0m |
| cpstart.wav | Played once when the air compressor is activated. | Center | 10.0m |
| cploop.wav | Played in a loop for the duration the air compressor is active. | Center | 10.0m |
| cpend.wav | Played once when the air compressor is deactivated. | Center | 10.0m |
| doorcls.wav | Played once when the doors close. | Left / Right | 5.0m |
| doorclsl.wav | Played once when the left doors close. Has precedence over doorscls.wav. | Left | 5.0m |
| doorclsr.wav | Played once when the right doors close. Has precedence over doorscls.wav. | Right | 5.0m |
| dooropn.wav | Played once when the doors open. | Left / Right | 5.0m |
| dooropnl.wav | Played once when the left doors open. Has precedence over doorscls.wav. | Left | 5.0m |
| dooropnr.wav | Played once when the right doors open. Has precedence over doorscls.wav. | Right | 5.0m |
| emrbrake.wav | Played once when the emergency brakes are activated. | Center | 10.0m |
| flangei.wav | Defines a set of sounds played in a loop when the flange of the wheels rub against the rails. The sounds are played at a pitch proportional to the speed. The recordings should correspond to a speed of 45 km/h. The non-negative integer i corresponds to the Train.Flange command in CSV routes where route developers can select which of the flangei.wav sounds to play for a certain type of rail. | Center | 10.0m |
| loop.wav | Played in a loop all the time for the duration of the simulation. | Center | 10.0m |
| point.wav | Played once per axle when the train crosses a pointwork. | FrontAxle / RearAxle | 5.0m |
| rub.wav | Played in a loop when the brake shoe rubs against the wheels. The sound is played at a pitch inversely proportional to the speed, and the volume of the sound decreases with increasing speeds. | Center | 10.0m |
| runi.wav | Defines a set of sounds played in a loop for the duration the train moves. The sounds are played at a pitch proportional to the speed. The recordings should correspond to a speed of 90 km/h. The non-negative integer i corresponds to the Train.Run command in CSV routes where route developers can select which of the runi.wav sounds to play for a certain type of rail. | Center | 10.0m |
| springl.wav | Played once when the train sways to the left side. | Left | 5.0m |
| springr.wav | Played once when the train sways to the right side. | Right | 5.0m |
| motori.wav | Defines a set of sounds played in a loop as instructed by the train.dat. The pitch, volume and index i are defined in the #MOTOR_Xn sections in the train.dat, and the sounds should be developed in conjunction with the train.dat. | Center | 10.0m |

{{% /table %}}