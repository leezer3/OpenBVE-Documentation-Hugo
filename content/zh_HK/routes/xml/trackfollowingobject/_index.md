---
title: "軌道跟隨物件 (TFO)"
linktitle: "軌道跟隨物件"
weight: 5
---

本页说明了openBVE v1.6.0或更高版本中支持的基于XML的轨道循迹物件 TFO 的原理和实现。

## ■基本原则

轨道循迹物件可在主轨道以外的其他轨道上自由运动。

为此，必须为每一个物件使用XML文件设置其运动方式。 一个例子如下所示。

在此示例中，这一物件以下述方式运动：

0. 当游戏内时间到达00:01:00之后，且该物件位于游戏中玩家位置50 m至100 m之内时，该物件就会出现，并在显示5分钟后消失。 这一物件的外观是7节编组列车，在对应的extensions.cfg中定义。
1. 在游戏中距离200m，右门打开20秒，然后该物件在 **Rail2** 上以1.71km/h/s的加速度加速至30 km /h。
2. 它在 **Rail2** 上以60 km/h的速度行驶400 m。
3. 在 **Rail2** 上，该物体以1.71 km/h/s的速度减速至30 km/h，当它在游戏中达到1000m的距离时，这一列车物件会停止并打开两侧的门。 停止10秒钟后，它在 Rail1 上以1.71 km/h/s的速度反向加速至30 km/h。
4. 该物件在 **Rail1** 处以1.71 km/h/s的速度减速至30 km/h，停止并在主轨道位置200m处打开右门。

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

如您所见，该文件由一个 **\<Definition>** 部分，一个 **\<Car>** 部分和一个 **\<Stops>** 部分组成。  **\<Stops>** 部分由两个或多个 **\<Stop>** 部分组成。

## ■ 定义属性

{{% command %}}  
**\<AppearanceTime>** *Time* **\</AppearanceTime>**  
{{% /command %}}

**时间** 设置物件出现在游戏中的时间。

*注意：* 如果省略此参数，则该物件将从游戏开始时出现。

------

{{% command %}}
**\<AppearanceStartPosition>** *位置* **\</AppearanceStartPosition>**
{{% /command %}}

**位置** 设置物件出现区域的起点的游戏内距离。 当玩家的列车经过此点时，该物件将出现。 单位是 **米** 。

*注意：* 如果省略此参数，则该物件将从游戏开始时出现。

------

{{% command %}}
 **\<AppearanceEndPosition>** *位置* **\</AppearanceEndPosition>**
{{% /command %}}

**位置** 设置物件出现区域的终点的游戏内距离。当玩家的摄像机位置超过该点时，该对象将被隐藏。它也必须大于被 **\<AppearanceStartPosition>** 指定的值。单位是 **米** 。

*注意：* 如果省略此参数，则该物件将从游戏开始时出现。

------

{{% command %}}
**\<LeaveTime>** *时间* **\</LeaveTime>**
{{% /command %}}

**时间**设置从物体出现在游戏中到消失为止的持续时间。 此时间之后该对象将不可见。 此值不是游戏时间。

*注意：* 如果省略此参数，则该物件将保持可见状态，直到游戏结束或被 **\<AppearanceEndPosition>** 隐藏为止

## ■ 列车属性

{{% command %}}
**\<Directory>** *路径* **\</Directory>**
{{% /command %}}

**Path** 设置包含物件列车的train.dat，sound.cfg和extensions.cfg的目录的相对路径。

*注意：* 如果列车文件夹仅供AI使用，则 **train.dat** 文件可以被命名为 **train.ai** 。

{{% command %}}  
**\<Reversed>** *是否反转* **\</Reversed>**  
{{% /command %}}

如果将此属性设置为 **true** ，那么列车的编组将被反转。

## ■ Stop (停站) 属性

{{% command %}}
**\<Decelerate>** *减速度* **\</Decelerate>**
{{% /command %}}

**减速度**设置物件的减速度。 单位是 **km/h/s** 。

------

{{% command %}}
**\<StopPosition>** *位置* **\</StopPosition>**
{{% /command %}}

**位置** 设置物件停止位置的游戏距离。单位是 **米** 。

------

{{% command %}}
**\<Doors>** *开门方向* **\</Doors>**
{{% /command %}}

**开门方向**设置物件列车打开的车门。 有效值为：

- **L** 或 **-1**: 左邊車門打開
- **N** 或 **0**: 車門唔會打開
- **R** 或 **1**: 右邊車門打開
- **B**: 兩邊車門都會打開

------

{{% command %}}
**\<StopTime>** *停车时间* **\</StopTime>**
 {{% /command %}}

**停车时间** 设置物件停车的时间。 此值不是游戏时间。

------

{{% command %}}
**\<Accelerate>** *加速度* **\</Accelerate>**
{{% /command %}}

**加速度** 设置物件的加速度。 单位是 **km/h/s** 。

------

{{% command %}}
**\<TargetSpeed>** *目标速度* **\</TargetSpeed>**
{{% /command %}}

**目标速度**设置物件加速后保持的速度。单位是 **km/h** 。

------

{{% command %}}
**\<Direction>** *行进方向* **\</Direction>**
{{% /command %}}

**行进方向** 设置物件行进的方向。 有效值如下。

- **F** 或 **1**: 物件會向前移動
- **R** 或 **-1**: 物件會向後移動

------

{{% command %}}  
**\<Rail>** *RailIndex* **\</Rail>**  
{{% /command %}}

**轨道编号** 设置物件运动所在的轨道。 必须通过路线文件的 **Track.Rail** 命令先定义这一条轨道。
