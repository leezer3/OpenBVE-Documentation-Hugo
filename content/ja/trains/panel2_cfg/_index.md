---
title: "**panel2.cfg** ファイルフォーマット"
linktitle: "panel2.cfg ファイル"
weight: 4
---

## ■ 内容

{{% contents %}}

- [1. 概要](#overview)
- [2. 文法](#syntax)
- [3. This セクション](#this)
- [4. PilotLamp セクション](#pilotlamp)
- [5. Needle セクション](#needle)
- [6. DigitalNumber セクション](#digitalnumber)
- [7. DigitalGauge セクション](#digitalgauge)
- [8. LinearGauge セクション](#lineargauge)
- [9. Timetable セクション](#timetable)
- [10. 使用可能なコマンド](#subjects)

{{% /contents %}}

## <a name="overview"></a>■ 1. 概要

panel2.cfg ファイルは lampやneedle等、運転台パネルを使用するための要素について表示、配置などの場所を定義することにより、2D運転台パネルを作成できます。

panel2.cfg ファイルは任意のエンコードで記述されたプレーンテキストですが [encoding]({{< ref "/information/encodings/_index.md" >}}), 、好ましい選択としてはバイトオーダー付きのUTF-8です。 The [parsing model]({{< ref "/information/numberformats/_index.md" >}}) に用いる数字は **ルーズ**ですが、 それでも出力にあたっては *厳密な* 出力をすることが望ましいです。 このファイルは必ずTrainフォルダー内に配置する必要があり、 **panel2.cfg**という名前にする必要があります。 ファイルは各行ごとに上から下に解釈されます。

{{% notice %}}

#### レイヤー

パネル内の全ての要素はレイヤーに紐づけされています。 レイヤーは整数で記述されます。 小さな値はより背景寄りに、大きな値は前景寄りに配置されます。 要素を配置する際は、同じレイヤー番号に重複しないよう留意する必要があります。 パネルの背景イメージは常にレイヤー番号0に関連付けられているため、その上に配置する要素はつねにレイヤー番号1以上で始まる必要があります。パネルの背景画像の更に背後に要素を配置する場合は、同様に負の数を使用して、此等のレイヤーを表すことが出来ます。

{{% /notice %}}

<br/>

{{% notice %}}

#### Daytime と nighttime イメージ

テクスチャを取得する全ての要素に対して、昼間と夜間用の異なるテクスチャを指定できます。照明の条件と追加の路線データからの命令に応じて、OpenBVEは昼間と夜間のテクスチャの中間的なブレンドの結果を表示します。夜間のテクスチャを使用しない場合は、対応する夜間の画像をシミュレートするために、昼間の画像が暗くなります。

{{% /notice %}}

➟ [ panel2.cfgのクイックリファレンスも参照して下さい...]({{< ref "/trains/panel2_cfg_quick/_index.md" >}})

{{% notice %}}

#### 重なりとライティング

運転台パネルのデータはオーバーレイとしてレンダリングされます。これは、運転台画像が常に風景のオブジェクトの手前に表示されることを意味します。この方法では、雨、壁、その他の遮るオブジェクト運転台画像内で誤ってレンダリングされることはありません。 周囲の明るさは運転台に反映されますが、運転台は常に白色光を反射しているように見えます。

{{% /notice %}}

## <a name="syntax"></a>■ 2. 文法

ファイル内の各行は空(または空白)飲みにすることが出来、またその行は無視され、新しいセクションの開始をマークするか、セクション内にキーと値のペアを含めることが出来ます。全てのキーと値のペアは、最後に開かれたセクションと関連付けされます。

新しいセクションを開くには、行を開始ブラケット (U+005B) で開始し、終了ブラケット (U+005D)で終了します。 カッコ内のテキストはセクション名を示し、大文字と小文字を区別しません。 行の最初と最後の空白、及びセクション名の最初と最後の空白は無視されます。従って、セクションの先頭は次の形式になります:

{{% command %}}  
[NameOfTheSection]  
{{% /command %}}

キーと値のペアは、キー、等号 (U+003D)、そして値を与えることで示されます。 キーは大文字と小文字を区別しません。 行頭と末尾、及び等号の前後の空白は無視され、または、キーと値を囲む空白は無視されます。 従って、キーと値のペアは次のような書式をとります:

{{% command %}}  
NameOfTheKey = Value  
{{% /command %}}

一部の値は、カンマで区切られた複数の部分にさらに分割されます (U+002C)。

コメントは行末のどこでも使用可能です。 コメントはセミコロン (U+003B)で始まります。 コメントは存在する場合、処理される前に全ての行から削除されます。

## <a name="this"></a>■ 3. This セクション

This セクションはパネルの背景イメージを用いる為の定義や、解像度を定義します。このセクションは、ファイル内で一度だけ使用できます。

------

{{% command %}}  
[This]  
{{% /command %}}

これをを定義することにより、セクションを開始します。

------

{{% command %}}  
Resolution = *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: Thisセクションで示されたパネルの背景画像で、測定された幅を示す浮動小数点数で、デフォルトの画面の幅、カメラ位置、位置合わせ、ズームに用います。
{{% /command-arguments %}}

------

{{% command %}}  
Left = *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: パネルの背景の、どのX座標が左にスクロールさせることができる最も遠い点に対応するかを示す浮動小数点数。 座標の点は背景画像の座標の範囲内である必要はありません。
{{% /command-arguments %}}

------

{{% command %}}  
Right = *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: パネルの背景の、どのX座標が右にスクロールさせることができる最も遠い点に対応するかを示す浮動小数点数。 座標の点は背景画像の座標の範囲内である必要はありません。
{{% /command-arguments %}}

------

{{% command %}}  
Top = *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: パネルの背景の、どのY座標が上にスクロールさせることができる最も遠い点に対応するかを示す浮動小数点数。 座標の点は背景画像の座標の範囲内である必要はありません。  
{{% /command-arguments %}}

------

{{% command %}}  
Bottom = *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: パネルの背景の、どのY座標が下にスクロールさせることができる最も遠い点に対応するかを示す浮動小数点数。 座標の点は背景画像の座標の範囲内である必要はありません。 
{{% /command-arguments %}}

------

{{% command %}}  
DaytimeImage = *FileName*  
{{% /command %}}

{{% command-arguments %}}  
***FileName***: train フォルダに関連して、パネルの日中用の画像として使用するためのイメージファイル。 指定していない場合、背景画像は表示されません。 
{{% /command-arguments %}}

------

{{% command %}}  
NighttimeImage = *FileName*  
{{% /command %}}

{{% command-arguments %}}  
***FileName***: train フォルダに関連して、パネルの夜間用の画像として使用するためのイメージファイル。 指定する場合は、昼間用のバージョンも指定する必要があります。それ以外の場合は夜間バージョンを使用することは出来ません。
{{% /command-arguments %}}

------

{{% command %}}  
TransparentColor = *HexColor*  
{{% /command %}}

{{% command-arguments %}}  
***HexColor***: A [hexcolor]({{< ref "/information/numberformats/_index.md#colors" >}})  *DaytimeImage* および *NighttimeImage* ファイルの双方に、透明ピクセルに対応する正確な色を定義します。 デフォルト値は #0000FF です。
{{% /command-arguments %}}

------

{{% command %}}  
Center = *X*, *Y*  
{{% /command %}}

{{% command-arguments %}}  
***X***: パネルの背景イメージの中心に対応するX座標を示す浮動小数点数
***Y***: パネルの背景イメージの中心に対応するY座標を示す浮動小数点数  
{{% /command-arguments %}}

背景画像のどのピクセルがデフォルトのカメラ位置の消失点に対応するかを定義します。これは、2本のレールが直線の線路上で水平線に収束するポイントです。 *Center* と *Origin* の関係は、運転台の位置合わせの yaw と pitch に影響します。

------

{{% command %}}  
Origin = *X*, *Y*  
{{% /command %}}

{{% command-arguments %}}  
***X***: 消失点に対応する、パネルの背景イメージのX座標を示す浮動小数点数。 
***Y***: 消失点に対応する、パネルの背景イメージのY座標を示す浮動小数点数。 
{{% /command-arguments %}}

背景画像のどのピクセルがデフォルトのカメラ位置の消失点に対応するかを定義します。これは、2本のレールが直線の線路上で水平線に収束するポイントです。 *Center* と *Origin* の関係性は、運転台パネルの yaw と pitch に影響します。

![illustration_center_origin](/images/illustration_center_origin.png)

{{% notice %}}

#### カメラの制限がデフォルトのカメラ設定に影響する場合

カメラの制限は、Panel2.cfgで作成された運転台データ内のカメラの見え方を、 *Left*、 *Right*、 *Top*、*Bottom*で指定された長方形に制限する機能です。 *Center* と *Resolution* の設定により、デフォルトのカメラ設定でも、指定された領域外のパーツがカメラに表示された場合でも、カメラの位置が変更されて、ビューが運転台パネルの範囲内に表示されることが保証されます。 *Center* と *Origin* の設定がこの影響を受けないことを確認するには、 CAMERA_RESTRICTION キー (デフォルト: CTRL+R) を押してカメラの制限を無効にし、CAMERA_RESET キー (デフォルト: num 5) を押して、カメラをリセットします。それにより*Center* と *Origin* の値は 記述されたとおりの挙動をし、 *Resolution*、 *Left*、 *Right*、 *Top*、 *Bottom*、*Center*、*Origin*の関係で考えられる問題を明確にすることが出来ます。

{{% /notice %}}

## <a name="pilotlamp"></a>■ 4. PilotLampセクション

PilotLamp せくしょんでは、表示または非表示にできるインジケーターを作成できます。此等のセクションは、必要な数だけ使用することが出来ます。

PilotLampセクションを使用する場合は、 *DaytimeImage* を指定する必要があります。 PilotLampを表示させたい場合は *Subject* は1を返す必要があります。そうでない場合は非表示になります。

------

{{% command %}}  
[PilotLamp]  
{{% /command %}}

これをを定義することにより、セクションを開始します。

------

{{% command %}}  
Subject = *Subject*  
{{% /command %}}

{{% command-arguments %}}  
***Subject***: [available subjects](#subjects)の内のいずれか一つを指定します。 デフォルトのsubjectは **true** です。  
{{% /command-arguments %}}

------

{{% command %}}  
Location = *Left*, *Top*  
{{% /command %}}

{{% command-arguments %}}  
***Left***: 画面の左端が挿入されるX座標を示す浮動小数点数。デフォルトは値は0です。  
***Top***: 画面の上端が挿入されるY座標を示す浮動小数点数。デフォルトは値は0です。   
{{% /command-arguments %}}

------

{{% command %}}  
DaytimeImage = *FileName*  
{{% /command %}}

{{% command-arguments %}}  
***FileName***: Trainフォルダと関連して、インジケーターのイメージの日中バージョンとして使用するイメージファイル。 ***必ず指定する必要があります。***  
{{% /command-arguments %}}

------

{{% command %}}  
NighttimeImage = *FileName*  
{{% /command %}}

{{% command-arguments %}}  
***FileName***: Trainフォルダーに関連して、インジケーターのイメージの夜間バージョンとして使用するイメージファイル。指定していない場合、夜間バージョンは使用できません。  
{{% /command-arguments %}}

------

{{% command %}}  
TransparentColor = *HexColor*  
{{% /command %}}

{{% command-arguments %}}  
***HexColor***: [hexcolor]({{< ref "/information/numberformats/_index.md#colors" >}})  *DaytimeImage* と *NighttimeImage* ファイルの双方で、透明ピクセルに対応する正確な色を表します。デフォルト値は #0000FF です。  
{{% /command-arguments %}}

------

{{% command %}}  
Layer = *LayerIndex*  
{{% /command %}}

{{% command-arguments %}}  
***LayerIndex***: 重なり合うレイヤー要素の中で、個々の要素を一意に定義する整数。 小さい数字は背景側を示し、大きい数字は前景側を示します。 各要素は重なり合わない限り同じ *LayerIndex* を使用できます。 デフォルト値は0です。 
{{% /command-arguments %}}

## <a name="needle"></a>■ 5. Needle セクション

Needle セクションは、 回転する要素、または針を作成します。 此等のセクションは必要な数だけ使用できます。

Needleにはイメージを用い、*DaytimeImage* (必須) or *NighttimeImage* (オプション), は *Origin* で定義された中心により回転し、  *Radius* が定義されている場合オプションで拡大縮小されます。 描かれている針の画像は上を向いている必要があります。

------

{{% command %}}  
[Needle]  
{{% /command %}}

これをを定義することにより、セクションを開始します。

------

{{% command %}}  
Subject = *Subject*  
{{% /command %}}

{{% command-arguments %}}  
***Subject***: [available subjects](#subjects) で定義されているものの一つを指定します。デフォルトのサブジェクトは **true** です。  
{{% /command-arguments %}}

------

{{% command %}}  
Location = *CenterX*, *CenterY*  
{{% /command %}}

{{% command-arguments %}}  
***CenterX***: A floating-point number representing the x-coordinate of the center of rotation in terms of the background image. The default value is 0.  
***CenterY***: A floating-point number representing the y-coordinate of the center of rotation in terms of the background image. The default value is 0.  
{{% /command-arguments %}}

------

{{% command %}}  
Radius = *ValueInPixels*  
{{% /command %}}

{{% command-arguments %}}  
***ValueInPixels***: A non-zero floating-point number that redefines the radius of the element in pixels relative to the background image. The default value is *Y* from the *Origin* key-value pair.  
{{% /command-arguments %}}

The *Y* value in the *Origin* key-value pair defines the vertical point of rotation, but also defines the actual radius of the element in the bitmap's own pixel coordinates. If *ValueInPixels* is set to a different value than this actual radius, the image will be scaled by a factor of *Radius* / *Y*, while preserving the *Origin*-*Center* relation. If you do not want to scale the image, set *ValueInPixels* to the same value as *Y*in the *Origin* key-value pair, or omit *Radius* altogether.

------

{{% command %}}  
DaytimeImage = *FileName*  
{{% /command %}}

{{% command-arguments %}}  
***FileName***: The image file to use as the daytime version of the needle image, relative to the train folder. ***Is required to be specified.***  
{{% /command-arguments %}}

------

{{% command %}}  
NighttimeImage = *FileName*  
{{% /command %}}

{{% command-arguments %}}  
***FileName***: The image file to use as the nighttime version of the needle image, relative to the train folder. If not specified, no nighttime version will be available.  
{{% /command-arguments %}}

------

{{% command %}}  
Color = *HexColor*  
{{% /command %}}

{{% command-arguments %}}  
***HexColor***: A [hexcolor]({{< ref "/information/numberformats/_index.md#colors" >}}) representing the color by which the images are multiplied with. The default value is #FFFFFF.  
{{% /command-arguments %}}

Multiplies the images by the color specified by *HexColor*. Setting *HexColor* to **#FFFFFF** (white) preserves the original color of the images, while setting *HexColor* to **#000000** (black) produces black images. Pixels defined as being transparent via *TransparentColor* are not affected.

------

{{% command %}}  
TransparentColor = *HexColor*  
{{% /command %}}

{{% command-arguments %}}  
***HexColor***: A [hexcolor]({{< ref "/information/numberformats/_index.md#colors" >}}) representing the exact color in both the *DaytimeImage* and *NighttimeImage* files which corresponds to a transparent pixel. The default value is #0000FF.  
{{% /command-arguments %}}

------

{{% command %}}  
Origin = *X*, *Y*  
{{% /command %}}

{{% command-arguments %}}  
***X***: A floating-point number representing the x-coordinate that corresponds to the image's center of rotation. The default value is half the image width.  
***Y***: A floating-point number representing the y-coordinate that corresponds to the image's center of rotation. The default value is half the image height.  
{{% /command-arguments %}}

------

{{% command %}}  
InitialAngle = *ValueInDegrees*  
{{% /command %}}

{{% command-arguments %}}  
***ValueInDegrees***: A floating-point number representing the angle **in degrees** that corresponds to the *Minimum* value. The angle is measured clock-wise from the 12 o'clock position. The default value is -120.  
{{% /command-arguments %}}

------

{{% command %}}  
LastAngle = *ValueInDegrees*  
{{% /command %}}

{{% command-arguments %}}  
***ValueInDegrees***: A floating-point number representing the angle **in degrees** that corresponds to the *Maximum* value. The angle is measured clock-wise from the 12 o'clock position. The default value is 120.  
{{% /command-arguments %}}

------

{{% command %}}  
Minimum = *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: A floating-point value corresponding to the value returned by the *Subject* in use that should be linked to the *InitialAngle*. The default value is 0.  
{{% /command-arguments %}}

------

{{% command %}}  
Maximum = *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: A floating-point value corresponding to the value returned by the *Subject* in use that should be linked to the *LastAngle*. The default value is 1000.  
{{% /command-arguments %}}

------

{{% command %}}  
NaturalFreq = *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: A non-negative floating-point number representing the natural frequency of an assumed undamped oscillatory system. If not specified, damping will not be performed.  
{{% /command-arguments %}}

Defines the natural frequency. In an undamped oscillatory system, this is the angular frequency in radians per second. As soon as damping is performed, the frequency will decrease with convergence of the oscillator. A natural frequency of 0 will not allow any rotation to be performed. Higher values roughly correspond to radians per second. If specified, *DampingRatio* should also be specified.

------

{{% command %}}  
DampingRatio = *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: A non-negative floating-point number representing the damping ratio. If not specified, damping will not be performed.  
{{% /command-arguments %}}

Defines the damping ratio for the oscillatory system. Values between 0 and 1 represent [under-damping](http://en.wikipedia.org/wiki/Damping#Under-damping), 1 represents [critical damping](http://en.wikipedia.org/wiki/Damping#Critical_damping) and values above 1 represent [over-damping](http://en.wikipedia.org/wiki/Damping#Over-damping). Compare the following illustration in which the angle of rotation changes from 0 to 1 over time:

If specified, *NaturalFreq* should also be specified.

------

{{% command %}}  
Layer = *LayerIndex*  
{{% /command %}}

{{% command-arguments %}}  
***LayerIndex***: An integer which uniquely defines this element among overlapping elements. Lower numbers represent the background and higher numbers the foreground. Elements may use the same *LayerIndex* as long as they do not overlap. The default value is 0.  
{{% /command-arguments %}}

## <a name="digitalnumber"></a>■ 6. The DigitalNumber section

The DigitalNumber section creates an indicator that can switch between multiple states, useful to build up a display of decimal digits. You can use as many of these sections as required.

The image used for the DigitalNumber, defined by *DaytimeImage* (required) and *NighttimeImage* (optional), is comprised of the individual states, which are stacked vertically, anchored at the top of the image. The width of a single state is equal to the width of the image, while the height of a single state is defined by *Interval* (required). The *Subject* used needs to return an integer from 0 (first element) to *n*-1 (last element), where *n* is the number of elements. If a value outside of that range is returned by *Subject*, the DigitalNumber will be made invisible.

------

{{% command %}}  
[DigitalNumber]  
{{% /command %}}

This starts the section.

------

{{% command %}}  
Subject = *Subject*  
{{% /command %}}

{{% command-arguments %}}  
***Subject***: One of the [available subjects](#subjects). The default subject is **true**.  
{{% /command-arguments %}}

------

{{% command %}}  
Location = *Left*, *Top*  
{{% /command %}}

{{% command-arguments %}}  
***Left***: A floating-point number representing the x-coordinate at which the left of the image is inserted. The default value is 0.  
***Top***: A floating-point number representing the y-coordinate at which the top of the image is inserted. The default value is 0.  
{{% /command-arguments %}}

------

{{% command %}}  
DaytimeImage = *FileName*  
{{% /command %}}

{{% command-arguments %}}  
***FileName***: The image file to use as the daytime version of the DigitalNumber image, relative to the train folder. ***Is required to be specified.***  
{{% /command-arguments %}}

------

{{% command %}}  
NighttimeImage = *FileName*  
{{% /command %}}

{{% command-arguments %}}  
***FileName***: The image file to use as the nighttime version of the DigitalNumber image, relative to the train folder. If not specified, no nighttime version will be available.  
{{% /command-arguments %}}

------

{{% command %}}  
TransparentColor = *HexColor*  
{{% /command %}}

{{% command-arguments %}}  
***HexColor***: A [hexcolor]({{< ref "/information/numberformats/_index.md#colors" >}}) representing the exact color in both the *DaytimeImage* and *NighttimeImage* files which corresponds to a transparent pixel. The default value is #0000FF.  
{{% /command-arguments %}}

------

{{% command %}}  
Interval = *Height*  
{{% /command %}}

{{% command-arguments %}}  
***Height***: The height of a single state in the images in pixels. ***Is required to be specified.***  
{{% /command-arguments %}}

------

{{% command %}}  
Layer = *LayerIndex*  
{{% /command %}}

{{% command-arguments %}}  
***LayerIndex***: An integer which uniquely defines this element among overlapping elements. Lower numbers represent the background and higher numbers the foreground. Elements may use the same *LayerIndex* as long as they do not overlap. The default value is 0.  
{{% /command-arguments %}}

## <a name="digitalgauge"></a>■ 7. The DigitalGauge section

The DigitalGauge section creates a solid-color square of which only a radial section is shown at a time. You can use as many of these sections as required.

There are three important angles to consider. The *InitialAngle* defines which angle corresponds to the *Minimum* value, while *LastAngle* defines which angle corresponds to the *Maximum* value. The current value at a given time corresponds to the current angle. The solid-color square will only show the part that is between the current angle and the *LastAngle*. If *InitialAngle* is less than *LastAngle*, the solid-color square will wind clockwise. If *InitialAngle* is greater than *LastAngle*, the solid-color square will wind counter-clockwise.

The subject needs to return a value that meaningfully works together with the *Minimum* and *Maximum* settings.

![illustration_digitalgauge_1](/images/illustration_digitalgauge_1.png)

![illustration_digitalgauge_2](/images/illustration_digitalgauge_2.png)

------

{{% command %}}  
[DigitalGauge]  
{{% /command %}}

This starts the section.

------

{{% command %}}  
Subject = *Subject*  
{{% /command %}}

{{% command-arguments %}}  
***Subject***: One of the [available subjects](#subjects). The default subject is **true**.  
{{% /command-arguments %}}

------

{{% command %}}  
Location = *CenterX*, *CenterY*  
{{% /command %}}

{{% command-arguments %}}  
***CenterX***: A floating-point number representing the x-coordinate at which the left of the image is inserted. The default value is 0.  
***CenterY***: A floating-point number representing the y-coordinate at which the top of the image is inserted. The default value is 0.  
{{% /command-arguments %}}

------

{{% command %}}  
Radius = *ValueInPixels*  
{{% /command %}}

{{% command-arguments %}}  
***ValueInPixels***: A non-zero floating-point number representing half the edge length of the solid-color square in pixels. ***Is required to be specified.***  
{{% /command-arguments %}}

If *Radius* is negative, it is treated as if it was positive, but the entire LED is rotated by 180 degrees.

------

{{% command %}}  
Color = *HexColor*  
{{% /command %}}

{{% command-arguments %}}  
***HexColor***: A [hexcolor]({{< ref "/information/numberformats/_index.md#colors" >}}) representing the color of the solid-color square. The default value is #FFFFFF.  
{{% /command-arguments %}}

------

{{% command %}}  
InitialAngle = *ValueInDegrees*  
{{% /command %}}

{{% command-arguments %}}  
***ValueInDegrees***: A floating-point number representing the angle **in degrees** that corresponds to the *Minimum* value. The angle is measured clock-wise from the 12 o'clock position. The default value is -120.  
{{% /command-arguments %}}

{{% warning-nontitle %}}

The absolute difference between *InitialAngle* and *LastAngle* may not exceed 360 degrees.

{{% /warning-nontitle %}}

------

{{% command %}}  
LastAngle = *ValueInDegrees*  
{{% /command %}}

{{% command-arguments %}}  
***ValueInDegrees***: A floating-point number representing the angle **in degrees** that corresponds to the *Maximum* value. The angle is measured clock-wise from the 12 o'clock position. The default value is 120.  
{{% /command-arguments %}}

{{% warning-nontitle %}}

The absolute difference between *InitialAngle* and *LastAngle* may not exceed 360 degrees.

{{% /warning-nontitle %}}

------

{{% command %}}  
Minimum = *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: A floating-point value corresponding to the value returned by the *Subject* in use that should be linked to the *InitialAngle*. The default value is 0.  
{{% /command-arguments %}}

------

{{% command %}}  
Maximum = *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: A floating-point value corresponding to the value returned by the *Subject* in use that should be linked to the *LastAngle*. The default value is 1000.  
{{% /command-arguments %}}

------

{{% command %}}  
Step = *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: A floating-point value representing the step in which values on the solid-color square can increase. The value to be displayed via the solid-color square will be rounded down to the next integer multiple of *Value*. If *Value* is negative, values will be rounded up to the absolute value of *Value* instead. If *Value* is 0, increases will be smooth. The default value is 0.  
{{% /command-arguments %}}

------

{{% command %}}  
Layer = *LayerIndex*  
{{% /command %}}

{{% command-arguments %}}  
***LayerIndex***: An integer which uniquely defines this element among overlapping elements. Lower numbers represent the background and higher numbers the foreground. Elements may use the same *LayerIndex* as long as they do not overlap. The default value is 0.  
{{% /command-arguments %}}

## <a name="lineargauge"></a>■ 8. The LinearGauge section

The LinearGauge section creates a panel layer, which uses texture shifting to create a sliding linear gauge. You can use as many of these sections as required.

Consider a standard openBVE face:

As you can see, the horizontal texture-coordinates upon this face are 0 at the **right** and 1 at the **left**. Thus, the value given by *Minimum* represents 0 *Maximum*, represents 1, and the current value may then be calculated as a simple percentage.

Further, the direction of the texture shift may be changed from horizontal to vertical (or both) by using the **Direction** parameter.

------

{{% command %}}  
[LinearGauge]  
{{% /command %}}

This starts the section.

------

{{% command %}}  
Subject = *Subject*  
{{% /command %}}

{{% command-arguments %}}  
***Subject***: One of the [available subjects](#subjects). The default subject is **true**.  
{{% /command-arguments %}}

------

{{% command %}}  
Location = *CenterX*, *CenterY*  
{{% /command %}}

{{% command-arguments %}}  
***CenterX***: A floating-point number representing the x-coordinate at which the left of the image is inserted. The default value is 0.  
***CenterY***: A floating-point number representing the y-coordinate at which the top of the image is inserted. The default value is 0.  
{{% /command-arguments %}}

------

{{% command %}}  
Minimum = *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: A floating-point value corresponding to the value returned by the *Subject* in use. The default value is 0.  
{{% /command-arguments %}}

------

{{% command %}}  
Maximum = *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: A floating-point value corresponding to the value returned by the *Subject* in use. The default value is 1000.  
{{% /command-arguments %}}

------

{{% command %}}  
Direction = *XDirection*, *YDirection*  
{{% /command %}}

{{% command-arguments %}}  
***XDirection***: **-1:** Translates from right to left **0:** No translation is performed **1:** Translates from left to right. The default value is 0.  
***YDirection***: **-1:** Translates from top to bottom **0:** No translation is performed **1:** Translates from bottom to top. The default value is 0.  
{{% /command-arguments %}}

------

{{% command %}}  
Width = *NeedleWidth*  
{{% /command %}}

{{% command-arguments %}}  
***NeedleWidth***: An integer which defines the width in pixels of the needle, from the edge of the texture- Translation of the texture will stop when this reaches this number of pixels from the end, in order to avoid wrapping around. The default value is 0.  
{{% /command-arguments %}}

------

{{% command %}}  
Layer = *LayerIndex*  
{{% /command %}}

{{% command-arguments %}}  
***LayerIndex***: An integer which uniquely defines this element among overlapping elements. Lower numbers represent the background and higher numbers the foreground. Elements may use the same *LayerIndex* as long as they do not overlap. The default value is 0.  
{{% /command-arguments %}}

## <a name="timetable"></a>■ 9. The Timetable section

The Timetable section defines where to place custom timetables. The actual images are loaded via the route file. Only one Timetable section may be used within the file.

------

{{% command %}}  
[Timetable]  
{{% /command %}}

This starts the section.

------

{{% command %}}  
Location = *Left*, *Top*  
{{% /command %}}

{{% command-arguments %}}  
***Left***: A floating-point number representing the x-coordinate at which the left of the image is inserted. The default value is 0.  
***Top***: A floating-point number representing the y-coordinate at which the top of the image is inserted. The default value is 0.  
{{% /command-arguments %}}

------

{{% command %}}  
Width = *ValueInPixels*  
{{% /command %}}

{{% command-arguments %}}  
***ValueInPixels***: A positive floating-point number representing the width of the timetable measured in terms of the background image. ***Is required to be specified.***  
{{% /command-arguments %}}

------

{{% command %}}  
Height = *ValueInPixels*  
{{% /command %}}

{{% command-arguments %}}  
***ValueInPixels***: A positive floating-point number representing the height of the timetable measured in terms of the background image. ***Is required to be specified.***  
{{% /command-arguments %}}

------

{{% command %}}  
TransparentColor = *HexColor*  
{{% /command %}}

{{% command-arguments %}}  
***HexColor***: A [hexcolor]({{< ref "/information/numberformats/_index.md#colors" >}}) representing the exact color in both the daytime and nighttime versions of the timetable which corresponds to a transparent pixel. The default value is #0000FF.  
{{% /command-arguments %}}

------

{{% command %}}  
Layer = *LayerIndex*  
{{% /command %}}

{{% command-arguments %}}  
***LayerIndex***: An integer which uniquely defines this element among overlapping elements. Lower numbers represent the background and higher numbers the foreground. Elements may use the same *LayerIndex* as long as they do not overlap. The default value is 0.  
{{% /command-arguments %}}

## <a name="subjects"></a>■ 10. Available subjects

A subject is composed of a base subject and an optional subject suffix. The subject controls what information is fed to the element that uses the subject. For example, a *Needle* can use the subject *kmph* to be fed with the current speed of the train in kilometers per hour, or with the *mr* subject to show the main reservoir pressure.

##### ● Base subjects

{{% table %}}

| Base              | subjectDescription                                           |
| ----------------- | ------------------------------------------------------------ |
| acc               | Returns the (signed) acceleration of the train in meters per second squared (m/s²). |
| atc               | Equivalent to *ats271*.                                      |
| ats*i*            | Returns the state of the *i*<sup>th</sup> plugin variable, depending on the plugin used. This is the same as pluginState[*i*] in animated objects.<br/>For the built-in safety systems ATS and ATC, see below. |
| locobrakecylinder | Returns the pressure of the brake cylinder on the driver's car in kPa (1000 Pa). |
| bc                | Returns the pressure of the brake cylinder in kPa (1000 Pa). |
| locobrakepipe     | Returns the pressure of the brake pipe on the driver's car in kPa (1000 Pa). |
| bp                | Returns the pressure of the brake pipe in kPa (1000 Pa).     |
| brake             | Returns the currently selected brake notch.<br/>For trains with automatic air brakes, 0 represents *RELEASE*, 1 represents *LAP*, 2 represents *SERVICE* and 3 represents the emergency brake.<br/>For trains without a hold brake device, 0 represents released brakes, *i* represents brake notch *i* and *n*+1 represents the emergency brake, where *n* is the number of brake notches the train has.<br/>For trains with a hold brake device, 0 represents released brakes, 1 represents the hold brake, *i*+1 represents brake notch *i*, and *n*+2 represents the emergency brakes, where *n* is the number of brake notches the train has. |
| locobrake         | Returns the currently selected Loco Brake notch.             |
| csc               | Returns 1 if the const speed system is currently active and 0 otherwise. |
| door              | Returns a value between 0 (open doors) and 1 (closed doors). |
| doorl*i*          | Returns a value between 0 (open) and 1 (closed) for the left doors of car *i*, or 2 if the car does not exist.<br/>Car index 0 represents the first car in the train, and *n*-1 the last car, where *n* is the number of cars in the train. |
| doorr*i*          | Returns a value between 0 (open) and 1 (closed) for the right doors of car *i*, or 2 if the car does not exist.<br/>Car index 0 represents the first car in the train, and *n*-1 the last car, where *n* is the number of cars in the train. |
| doorbuttonl       | Returns 1 if the left door button is currently pressed, 0 otherwise. |
| doorbuttonr       | Returns 1 if the right door button is currently pressed, 0 otherwise. |
| er                | Returns the pressure of the equalizing reservoir in kPa (1000 Pa). |
| hour              | Returns the integer part of the current hour.                |
| kmph              | Returns the absolute speed of the train in kilometers per hour (km/h). |
| min               | Returns the integer part of the current minute.              |
| motor             | Returns the acceleration which the motor of the first motor car currently generates in m/s². |
| mph               | Returns the absolute speed of the train in international miles per hour (mph). |
| mr                | Returns the pressure of the main reservoir in kPa (1000 Pa). |
| ms                | Returns the absolute speed of the train in meters per second (m/s). |
| power             | Returns the currently selected power notch. This is an integer between 0 and *n*, where *n* is the number of power notches the train has. |
| rev               | Returns the currently selected reverser position. 0 represents backward, 1 represents neutral and 2 represents forward. |
| sap               | Returns the pressure of the straight air pipe in kPa (1000 Pa). |
| sec               | Returns the integer part of the current second.              |
| true              | Always returns 1. This is useful for the *PilotLamp* element in order to always show the associated bitmap. |
| Klaxon            | Returns the currently playing horn (if any) as follows: (0) No horns are playing (1) The primary horn is playing (2) The secondary horn is playing (3) The music horn is playing. *Note* If multiple horns are playing, the lowest value will be returned. |
| PrimaryKlaxon     | Returns 1 if the primary horn is currently playing, 0 otherwise. |
| SecondaryKlaxon   | Returns 1 if the secondary horn is currently playing, 0 otherwise. |
| MusicKlaxon       | Returns 1 if the music horn is currently playing, 0 otherwise. |
| passAlarm         | Whether the station pass alarm has been activated. Returns either 0 (inactive) or 1 (active). |
| pilotLamp         | The state of the pilot lamp (Doors closed & ready to start). Returns either 0 (unlit) or 1 (lit). |
| stationAdjustAlarm | Whether the station adjust alarm has been activated. Returns either 0 (inactive) or 1 (active). |


{{% /table %}}

If ats*i* is used with the built-in safety systems ATS and ATC, the following mapping for *i* applies:

{{% table %}}

| *i*  | English             | 日本語       | Return values                                |      | ats271 | Meaning           |
| ---- | ------------------- | ------------ | -------------------------------------------- | ---- | ------ | ----------------- |
| 256  | ATS                 | ATS          | 0 (unlit) or 1 (lit)                         |      | 0      | ATC not available |
| 257  | ATS RUN             | ATS 作動     | 0 (unlit), 1 (lit) or 2 (flashing)           |      | 1      | 0 km/h            |
| 258  | ATS RUN             | ATS 作動     | 0 (unlit / non-flashing), 1 (lit / flashing) |      | 2      | 15 km/h           |
| 259  | P POWER             | P 電源       | 0 (unlit) or 1 (lit)                         |      | 3      | 25 km/h           |
| 260  | PTN APPROACH        | パターン接近 | 0 (unlit) or 1 (lit)                         |      | 4      | 45 km/h           |
| 261  | BRAKE RELEASE       | ブレーキ開放 | 0 (unlit) or 1 (lit)                         |      | 5      | 55 km/h           |
| 262  | BRAKE APPLY         | ブレーキ動作 | 0 (unlit) or 1 (lit)                         |      | 6      | 65 km/h           |
| 263  | ATS P               | ATS-P        | 0 (unlit) or 1 (lit)                         |      | 7      | 75 km/h           |
| 264  | FAILURE             | 故障         | 0 (unlit) or 1 (lit)                         |      | 8      | 90 km/h           |
| 265  | ATC                 | ATC          | 0 (unlit) or 1 (lit)                         |      | 9      | 100 km/h          |
| 266  | ATC POWER           | ATC 電源     | 0 (unlit) or 1 (lit)                         |      | 10     | 110 km/h          |
| 267  | ATC SRV             | ATC 常用     | 0 (unlit) or 1 (lit)                         |      | 11     | 120 km/h          |
| 268  | ATC EMG             | ATC 非常     | 0 (unlit) or 1 (lit)                         |      | 12     | ATS is active     |
| 269  | CONST SPEED         | 定速         | 0 (unlit) or 1 (lit)                         |      |        |                   |
| 270  | EB                  | EB           | 0 (unlit) or 1 (lit)                         |      |        |                   |
| 271  | ATC speed indicator |              | 0 - 12, see table on the right               |      |        |                   |

{{% /table %}}

##### ● Suffixes

{{% table %}}

| Subject suffix | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| d*i*           | With d0 for the ones, d1 for the tens, d2 for the hundreds, etc., this suffix returns a value between 0 and 9 corresponding to the respective digit of the underlying subject, but only if the value of the subject is less than 10 for d1, less than 100 for d2, etc., otherwise this suffix returns 10. |

{{% /table %}}

**Example:** kmphd1 can be used to feed a *DigitalNumber* with the tens of the current speed of the train in kilometers per hour. The image used by the *DigitalNumber* will thus need to be composed of images from 0 to 10 in order to show all possible states kmphd1 can return, where images 0 through 9 correspond to the digits, and 10 corresponds to an image shown at the tens when the speed is below 10 km/h (e.g. another 0-digit, or blank space).