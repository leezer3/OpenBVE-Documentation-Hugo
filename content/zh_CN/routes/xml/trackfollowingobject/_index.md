---
title: "轨道循迹物件"
linktitle: "轨道循迹物件"
weight: 5
---

本页说明了openBVE v1.6.0或更高版本中支持的基于XML的轨道循迹对象 TFO 的原理和实现。

## ■基本原则

轨道循迹物件可在主轨道以外的其他轨道上自由运动。

为此，必须为每一个物件使用XML文件设置其运动方式。 一个例子如下所示。

在此示例中，这一物件以下述方式运动：

0. 当游戏内时间到达00:01:00之后，且该物件位于游戏中玩家位置前方50 m至100 m之内时，该物件就会出现，并在显示5分钟后消失。 这一物件的外观是7节编组列车，在对应的extensions.cfg中定义。
1. 游戏中距离为200 m，右门打开20秒，然后该物体在 ** Rail2 ** 上以1.71km / h / s的加速度加速至30 km / h。
2. 它在 **Rail2** 上以60 km / h的速度行驶400 m。
3. 在 **Rail2** 上，该物体以1.71 km / h / s的速度减速至30 km / h，当它在游戏中达到1000 m的距离时，这一列车物件会停止并打开两侧的门。 停止10秒钟后，它在 Rail1 上以1.71 km / h / s的速度反向加速至30 km / h。
4. 该物体在 **Rail1** 处以1.71 km / h / s的速度减速至30 km / h，停止并在主轨道位置200 m处打开右门。

{{< textarea >}}  
&lt;?xml version="1.0" encoding="utf-8"?>
&lt;openBVE xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  &lt;TrackFollowingObject>
    &lt;Definition>
      &lt;!--物件出现的时间[hh.mmss]-->
      &lt;AppearanceTime>00.0100&lt;/AppearanceTime>
      &lt;!--物件出现近距离[m]-->
      &lt;AppearanceStartPosition>50&lt;/AppearanceStartPosition>
      &lt;!--物件出现远距离[m]-->
      &lt;AppearanceEndPosition>100&lt;/AppearanceEndPosition>
      &lt;!--物件持续显示时间[hh.mmss]-->
      &lt;LeaveTime>00.0500&lt;/LeaveTime>
    &lt;/Definition>
    &lt;Train>
      &lt;!--相对于Train文件夹的列车文件夹路径-->
      &lt;Directory>TrainDirectory&lt;/Directory>
    &lt;/Train>
    &lt;Stops>
      &lt;!--Start-->
      &lt;Stop>
        &lt;!--减速度[km/h/s]-->
        &lt;Decelerate>0.0&lt;/Decelerate>
        &lt;!--停车位置 游戏内距离[m]-->
        &lt;StopPosition>200&lt;/StopPosition>
        &lt;!--停车后开启的车门-->
        &lt;Doors>1&lt;/Doors>
        &lt;!--停车时间[hh.mmss]-->
        &lt;StopTime>00.0020&lt;/StopTime>
        &lt;!--加速度[km/h/s]-->
        &lt;Accelerate>1.71&lt;/Accelerate>
        &lt;!--加速到的最高速度[km/h]-->
        &lt;TargetSpeed>30&lt;/TargetSpeed>
        &lt;!--前进方向[1: forward, -1: backward]-->
        &lt;Direction>1&lt;/Direction>
        &lt;!--走行轨道-->
        &lt;Rail>2&lt;/Rail>
      &lt;/Stop>
      &lt;!--限速-->
      &lt;Stop>
        &lt;Decelerate>0&lt;/Decelerate>
        &lt;StopPosition>400&lt;/StopPosition>
        &lt;StopTime>00.0000&lt;/StopTime>
        &lt;Accelerate>0&lt;/Accelerate>
        &lt;TargetSpeed>60&lt;/TargetSpeed>
        &lt;Direction>1&lt;/Direction>
        &lt;Rail>2&lt;/Rail>
      &lt;/Stop>
      &lt;!--返回-->
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
      &lt;!--终点-->
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

如您所见，该文件由一个** \ 1<Definition>**部分，一个** \ <Car> **部分和一个** \ <Stops> **部分组成。 ** \ <Stops> **部分由两个或多个** \ <Stop> **部分组成。

## ■定义属性

{{% command %}}** \ <AppearanceTime> ** *时间* ** \ </AppearanceTime> **{{% /command %}}

** 时间 ** 设置对象出现在游戏中的时间。

*注意：*如果省略此参数，则该对象将从游戏开始时出现。

------

{{% command %}}** \ <AppearanceStartPosition> ** *位置* ** \ </AppearanceStartPosition> **{{% /command %}}

**位置**设置物体开始出现在游戏中的距离。 当玩家的火车经过此点时，该对象将出现。 单位是**米**。

*注意：*如果省略此参数，则该对象将从游戏开始时出现。

------

{{% command %}}** \ <AppearanceEndPosition> ** *位置* ** \ </AppearanceEndPosition> **{{% /command %}}

 **位置** 在对象出现的终点设置游戏距离。 当玩家的摄像机位置超过该点时，该对象将被隐藏。 它也必须大于为** \ <AppearanceStartPosition> **指定的值。 单位是**米**。

*注意：*如果省略此参数，则该对象将从游戏开始时出现。

------

{{% command %}}**\<LeaveTime>** *时间* **\</LeaveTime>** {{% /command %}}

**时间**设置从物体出现在游戏中到消失为止的持续时间。 此时间之后该对象将不可见。 此值不是游戏时间。

*注意：*如果省略此参数，则该对象将保持可见状态，直到游戏结束或被** \ <AppearanceEndPosition> **隐藏为止

## ■列车属性

{{% command %}}** \ <Directory> ** *路径* ** \ </Directory> **{{% /command %}}

** Path **设置包含对象的train.dat，sound.cfg和extensions.cfg的目录的相对路径。

*注意：*如果列车文件夹仅供AI使用，则** train.dat **文件可以重命名为** train.ai **。

{{% command %}}**\<Reversed>** *正确* **\</Reversed>** {{% /command %}}

如果将此属性设置为** true **，那么火车的组成将被反转。

## ■停止语法

{{% command %}}** \ <Decelerate> ** *值* ** \ </Decelerate> **{{% /command %}}

**值**设置对象的减速度。 单位是** km / h / s **。

------

{{% command %}}** \ <StopPosition> ** *位置* ** \ </StopPosition> **{{% /command %}}

**位置**设置物体停止的游戏距离。单位是**米**。

------

{{% command %}}** \ <Doors> ** *值* ** \ </Doors> **{{% /command %}}

**值**设置对象的开门。 有效值为：

- ** L **或**-1 **：左门打开。
- ** N **或** 0 **：两扇门均不打开。
- ** R **或** 1 **：右门打开。
- ** B **：两扇门都会打开。

------

{{% command %}}**\<StopTime>** *时间* **\</StopTime>** {{% /command %}}

** 时间 **设置对象停止的持续时间。 此值不是游戏时间。

------

{{% command %}}** \ <Accelerate> ** *值* ** \ </Accelerate> **{{% /command %}}

**值**设置对象的加速度。 单位是** km / h / s **。

------

{{% command %}}** \ <TargetSpeed> ** *值* ** \ </TargetSpeed> **{{% /command %}}

**值**设置对象加速后的速度。 单位是** km / h **。

------

{{% command %}}** \ <Direction> ** *值* ** \ </Direction> **{{% /command %}}

**值**设置对象的行进方向。 有效值如下。

- ** F **或** 1 **：对象将向前移动。
- ** R **或**-1 **：对象向后移动。

------

{{% command %}}**\<Rail>** *铁路指数* **\</Rail>** {{% /command %}}

** RailIndex **设置对象运行的轨迹。 必须通过路径文件的** Track.Rail **命令定义轨迹。
