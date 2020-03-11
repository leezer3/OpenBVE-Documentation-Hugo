---
title: "教程：在CSV路线文件中使用ATC"
linktitle: "ATC使用教程"
weight: 5
---

本教程将带您正确地在您的路线上设置好游戏内置的日式ATC信号系统。您在阅读前应该先了解ATC究竟为何。如果您还不了解，请您先看此页：

➟ [信号、标牌、ATS与ATC速览](https://openbve-project.net/play-japanese/)

## ■ 在路线上安装ATC
首先，ATC是按照车站为单位启用的。对于每一个被设置为启用ATC的车站，从该车站起始到下一站的末端的轨道都被视为安装了ATC。游戏系统会余弦知道ATC安装的轨道区域末端，并会自动在此之前刹停列车，以防止冲灯。

这样启用一站到下一站的ATC：  
{{% code "*In order to enable ATC:*" %}}  
Track.Sta STATION; ; ; ; ; ; 1  
{{% /code %}}

这样停用一站到下一站的ATC：   
{{% code "*In order to disable ATC:*" %}}  
Track.Sta STATION; ; ; ; ; ; 0  
{{% /code %}}

在以下示例中，B站与C站之间的轨道是安装了ATC的：

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

## ■ ATC与信号

从技术层面上来说，只要列车运行在ATC系统下，就可以忽略任何的信号机显示。你当然也可以在你的线路中让玩家遵守信号。在openBVE中，ATC以200米长的闭塞区间来获取与前车之间的距离，而不通过信号机。ATC随后根据列车的制动特性确定一个限速，该限速也会根据前车位置的改变而解除。这些200米长的闭塞区间被放在主轨道位置0, 200, 400, 600上，以此类推。

## ■ ATC与限速

当您使用 **Track.Limit** 指令设置了路线限速后，ATC就会自动了解前方的第一个限速，并在到达这一位置前提前减速。例如：

{{% code %}}  
100, .Limit 100  
800, .Limit 40 ,; 在列车运行到位置100时ATC就会考虑这一限速  
{{% /code %}}

也有方法让ATC不提前减速。因为ATC只会考虑下一个限速，因此在接近新限速的位置重复一遍旧限速，就能让ATC在那个重复的位置才开始减速了。例如：

{{% code %}}  
100, .Limit 100  
799, .Limit 100  
800, .Limit 40 ,; ATC会在799才考虑这一限速  
{{% /code %}}
