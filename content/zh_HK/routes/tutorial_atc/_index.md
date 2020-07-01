---
title: "教學：喺CSV路線文件中使用ATC"
linktitle: "教學：使用ATC"
weight: 5
---

呢個教學將帶您正確咁喺您嘅路線上設置好遊戲內置嘅日式ATC信號系統。閱讀前應該先了解ATC係咩。否則的話，請您先看此頁：

➟ [信號、標牌、ATS與ATC速覽]
(https://openbve-project.net/play-japanese/)

## ■ 喺路線上安裝ATC
首先，ATC係按照車站為單位啟用的。對於每一個被設置為啟用ATC嘅車站，從果個車站起到下一站嘅末端的軌道都被視為安裝了ATC。遊戲會餘弦知道ATC安裝的軌道區域末端，並會自動在此之前剎停列車，以防止衝燈。

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
