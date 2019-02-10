---
title: "Tutorial: Using ATC in a CSV route file"
linktitle: "Tutorial: Using ATC"
weight: 5
---

This tutorial is intended to guide you on how to properly set up the built-in Japanese safety system ATC in the case you want to make your route ready to use it. This page assumes that you are familiar with what ATC is. If not, please take a look at the following page first:

➟ [How to drive - A quick overview on controls, ATS/ATC, signals and signs](https://openbve-project.net/play-japanese/)

## ■ Setting up a route for ATC
First of all, ATC needs to be enabled on a per-station basis. For every station for which ATC is enabled, the track from the beginning of that station until the end of the next station is ATC-equipped. The end of the ATC-enabled track is known in advance by the system, and then train will thus be braked down in time to prevent over-travel.

{{% code "*In order to enable ATC:*" %}}  
Track.Sta STATION; ; ; ; ; ; 1  
{{% /code %}}

{{% code "*In order to disable ATC:*" %}}  
Track.Sta STATION; ; ; ; ; ; 0  
{{% /code %}}

In the following example, the track from station B until station C is ATC-equipped:

{{% code %}}  
With Track  
0000, .Sta A; ; ; ; ; ; 0  
0120, .Stop  
; start of ATC-equipped track at 800  
0800, .Sta B; ; ; ; ; ; 1  
0920, .Stop  
1600, .Sta C; ; ; ; ; ; 0  
1720, .Stop  
; end of ATC-equipped track at 1720  
2400, .Sta D; ; ; ; ; ; 0  
2520, .Stop  
{{% /code %}}

## ■ Signalling and ATC

Technically, users may ignore any signals as long as the train operates in ATC. Of course you can demand otherwise on your route. In openBVE, instead of using signals, ATC receives the distance to the next train in blocks of 200m. Depending on the deceleration characteristics of the train, ATC then dictates a particular speed limit, which may be released at any time depending on the change of location of the preceding train. These 200m blocks are placed at track positions 0, 200, 400, 600, and so on.

## ■ Speed limits and ATC

When using the **Track.Limit** command, ATC knows the location of the immediately upcoming one in advance and automatically brakes the train before reaching that position. For example:

{{% code %}}  
100, .Limit 100  
800, .Limit 40 ,; is known in advance from track position 100  
{{% /code %}}

There is a way, however, to prevent this behavior. As ATC only knows the immediately upcoming speed limit in advance, repeating the old speed limit in close proximity to the new speed limit makes ATC only brake as soon as the repeating speed limit is reached. For example:

{{% code %}}  
100, .Limit 100  
799, .Limit 100  
800, .Limit 40 ,; is known in advance only from track position 799  
{{% /code %}}
