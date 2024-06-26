---
title: "チュートリアル: CSV路線ファイルでのATCの使用"
linktitle: "チュートリアル: ATCの使用"
weight: 5
---

このチュートリアルは、路線で使用できるようにする場合に、組み込みの日本の安全システムのATCを正しく設定する方法を説明することを目的としています。 このページは、ATCとは何かを理解していることを前提としています。 そうでない場合は、最初に次のページをご覧ください:

[運転方法 - コントロール、ATS/ATC、信号、標識の概要](https://openbve-project.net/play-japanese/)

## ■ ATCの路線を設定する
まず、ATCは駅ごとに有効にする必要があります。 ATCが有効になっているすべての駅について、その駅の開始から次の駅までの区間においてATCが有効になります。 ATC対応区間の終わりはシステムによって事前に認識されているため、列車はそれまでに自動的にブレーキをかけてオーバーランを防ぎます。

{{% code "*In order to enable ATC:*" %}}  
Track.Sta STATION; ; ; ; ; ; 1  
{{% /code %}}

{{% code "*In order to disable ATC:*" %}}  
Track.Sta STATION; ; ; ; ; ; 0  
{{% /code %}}

次の例では、駅Bから駅Cまでの路線にATCが装備されています:

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

## ■ 信号とATC

技術的には、列車がATCで運行している限り、ユーザーは信号を無視できます。 もちろん、ルートでは他の方法で信号を無視しないように要求できます。 openBVEでは、信号を使用する代わりに、ATCは次の列車までの距離を200mのブロックで受信します。 列車の減速特性に応じて、ATCは特定の制限速度を指示します。この制限速度は、前の列車の位置の変更に応じていつでも解放できます。 これらの200mブロックは、路線位置0、200、400、600などに配置されます。

## ■ 速度制限とATC

**Track.Limit**コマンドを使用すると、ATCはすぐに次にある速度制限の位置を事前に把握し、その位置に到達する前に自動的に列車にブレーキをかけます。 例えば:

{{% code %}} 
100, .Limit 100  
800, .Limit 40 ,; これは、路線位置100からのみ事前に知られています  
{{% /code %}}

ただし、この動作を防ぐ方法があります。 ATCは直前の制限速度しか事前に認識していないため、新しい制限速度のすぐ近くで前の制限速度を繰り返すと、ATCは繰り返し制限速度に達するとすぐにブレーキをかけるだけになります。 例えば:

{{% code %}} 
100, .Limit 100  
799, .Limit 100  
800, .Limit 40 ,; これは、路線の位置799からのみ事前に知られています 
{{% /code %}}
