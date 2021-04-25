---
title: "Track Following Object"
linktitle: "Track Following Object"
weight: 5
---

このページでは、OpenBVE1.6.0以降で実装されている XMLベースの Track Following Object の原理とその実装方法について説明します。

## ■ 基本原則

openBVEでは自由に他の線路にTrack Following Objectを走らせることができます。

これを行うには、Track Following ObjectのXMLファイルを使用して走らせる各オブジェクトを設定する必要があります。 以下に例を示します。

この例では、オブジェクトは次のように走ります。

0. ゲーム内時間 00:01:00が経過し、ゲーム内のプレーヤーのカメラ位置から50mから100m以内にオブジェクトが存在する場合に表示されます。 表示してから5分経過すると非表示になります。 外観は、7両編成で、extensions.cfgで定義されています。
1. ゲーム内の距離 200mで、右側のドアが20秒間開かれた後、オブジェクトは**Rail2**で1.71km/h/sの加速度で30 km/hに加速します。
2. **Rail2**を時速60kmで400mを走行します。
3. オブジェクトは**Rail2**で1.71km/h/sで30km/hに減速し、ゲーム内距離1000mに達すると、停止して両側のドアを開きます。 10秒間停止した後、Rail1では1.71 km/h/sの加速で、30 km/hに逆方向に加速します。
4. オブジェクトは**Rail1**で1.71km/h/sで30km/hに減速し、ゲーム内距離200mで停止して右のドアを開きます。

{{< textarea >}}  
&lt;?xml version="1.0" encoding="utf-8"?>
&lt;openBVE xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  &lt;TrackFollowingObject>
    &lt;Definition>
      &lt;!--Time when the object appears[hh.mmss]-->
      &lt;AppearanceTime>00.0100&lt;/AppearanceTime>
      &lt;!--In-game distance of the starting point at which the object appears[m]-->
      &lt;AppearanceStartPosition>50&lt;/AppearanceStartPosition>
      &lt;!--In-game distance of the end point at which the object appears[m]-->
      &lt;AppearanceEndPosition>100&lt;/AppearanceEndPosition>
      &lt;!--The duration for which the object appears[hh.mmss]-->
      &lt;LeaveTime>00.0500&lt;/LeaveTime>
    &lt;/Definition>
    &lt;Train>
      &lt;!--Relative path of Train folder-->
      &lt;Directory>TrainDirectory&lt;/Directory>
    &lt;/Train>
    &lt;Stops>
      &lt;!--Start-->
      &lt;Stop>
        &lt;!--Deceleration[km/h/s]-->
        &lt;Decelerate>0.0&lt;/Decelerate>
        &lt;!--In-game distance of stop position[m]-->
        &lt;StopPosition>200&lt;/StopPosition>
        &lt;!--Door that open at this point-->
        &lt;Doors>1&lt;/Doors>
        &lt;!--Time to keep stopping[hh.mmss]-->
        &lt;StopTime>00.0020&lt;/StopTime>
        &lt;!--Acceleration[km/h/s]-->
        &lt;Accelerate>1.71&lt;/Accelerate>
        &lt;!--Speed after acceleration[km/h]-->
        &lt;TargetSpeed>30&lt;/TargetSpeed>
        &lt;!--Progress direction [1: forward, -1: backward]-->
        &lt;Direction>1&lt;/Direction>
        &lt;!--Traveling track-->
        &lt;Rail>2&lt;/Rail>
      &lt;/Stop>
      &lt;!--Maximum speed change-->
      &lt;Stop>
        &lt;Decelerate>0&lt;/Decelerate>
        &lt;StopPosition>400&lt;/StopPosition>
        &lt;StopTime>00.0000&lt;/StopTime>
        &lt;Accelerate>0&lt;/Accelerate>
        &lt;TargetSpeed>60&lt;/TargetSpeed>
        &lt;Direction>1&lt;/Direction>
        &lt;Rail>2&lt;/Rail>
      &lt;/Stop>
      &lt;!--Return-->
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
      &lt;!--Goal-->
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

ご覧のとおり、ファイルは1つの** \<Definition>**セクション、1つの** \<Car> **セクション、および1つの** \<Stops>**セクションで構成されています。 ** \<Stops>**セクションは、2つ以上の** \<Stop>**セクションで構成されます。

## ■ Definition属性

{{% command %}}  
**\<AppearanceTime>** *時間* **\</AppearanceTime>**  
{{% /command %}}

**時間** は、オブジェクトがゲームに表示される時間を設定します。

*注:* このパラメーターを省略すると、オブジェクトはゲームの開始から出現します。

------

{{% command %}}  
**\<AppearanceStartPosition>** *位置* **\</AppearanceStartPosition>**  
{{% /command %}}

**位置**には、オブジェクトが表示され始めるゲーム内の距離を設定します。 プレイヤーの列車がこのポイントを通過すると、オブジェクトが表示されます。 単位は**メートル**です。

*注:* このパラメーターを省略すると、オブジェクトはゲームの開始から出現します。

------

{{% command %}}  
**\<AppearanceEndPosition>** *位置* **\</AppearanceEndPosition>**  
{{% /command %}}

**位置**には、オブジェクトが非表示になるゲーム内距離を設定します。 プレイヤーのカメラ位置がこのポイントを通過すると、オブジェクトは非表示になります。 また、** \ <AppearanceStartPosition>**に指定された値よりも大きくする必要があります。 単位は**メートル**です。

*注:* このパラメーターを省略すると、オブジェクトはゲームの開始から出現します。

------

{{% command %}}  
**\<LeaveTime>** *時間* **\</LeaveTime>**  
{{% /command %}}

**時間**には、オブジェクトがゲームに表示されてから消えるまでの時間を設定します。 この時間を過ぎると、オブジェクトは非表示になります。 この値はゲーム内時間ではありません。

*注:*このパラメーターを省略すると、オブジェクトはゲームが終了するまで、または** \<AppearanceEndPosition>**によって非表示になるまで表示されたままになります。

## ■ Train属性

{{% command %}}  
**\<Directory>** *パス* **\</Directory>**  
{{% /command %}}

**パス**には、オブジェクトのtrain.dat、sound.cfg、extensions.cfgを含むディレクトリへの相対パスを設定します。

*注:* trainフォルダーがAI専用である場合、**train.dat**ファイルの名前は**train.ai**に変更できます。

{{% command %}}  
**\<Reversed>** *true* **\</Reversed>**  
{{% /command %}}

この属性が**true**に設定されている場合、列車の構成は逆になります。

## ■ Stop属性

{{% command %}}  
**\<Decelerate>** *値* **\</Decelerate>**  
{{% /command %}}

**値**にはオブジェクトの減速度を設定します。 単位は**km/h/s**です。

------

{{% command %}}  
**\<StopPosition>** *位置* **\</StopPosition>**  
{{% /command %}}

**位置**には、オブジェクトが停止するゲーム内の距離を設定します。 単位は**メートル**です。

------

{{% command %}}  
**\<Doors>** *値* **\</Doors>**  
{{% /command %}}

**値**にはオブジェクトの開くドアを設定します。 有効な値は次のとおりです。

- **L** または **-1**: 左側のドアが開きます。
- **N** または **0**: ドアは開きません。
- **R** または **1**: 右側のドアが開きます。
- **B**: 両側のドアが開きます。

------

{{% command %}}  
**\<StopTime>** *時間* **\</StopTime>**  
{{% /command %}}

**時間**には、オブジェクトの停止時間を設定します。 この値はゲーム内の時間ではありません。

------

{{% command %}}  
**\<Accelerate>** *値* **\</Accelerate>**  
{{% /command %}}

**値**にはオブジェクトの加速度を設定します。 単位は**km/h/s**です。

------

{{% command %}}  
**\<TargetSpeed>** *値* **\</TargetSpeed>**  
{{% /command %}}

**値**には、オブジェクトの加速後の速度を設定します。 単位は**km/h**です。

------

{{% command %}}  
**\<Direction>** *値* **\</Direction>**  
{{% /command %}}

**値**には、オブジェクトの移動方向を設定します。 有効な値は次のとおりです。

- **F** または **1** : オブジェクトは前に動きます。
- **R** または **-1** : オブジェクトは後ろに動きます。

------

{{% command %}}  
**\<Rail>** *レールインデックス* **\</Rail>**  
{{% /command %}}

**レールインデックス**には、オブジェクトが走る軌道を設定します。 路線ファイルの**Track.Rail**コマンドで軌道を定義する必要があります。
