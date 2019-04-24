---
title: オブジェクトベンダー
weight: 2
---

![img](/images/tool_objectbender_screenshot_1.png)

## ■ 概要

このツールはオブジェクトのセグメントを結合して、メッシュを曲げることができます。 これはレールや壁、堤防など、曲がった形状のオブジェクトを作るのに有用です。 セグメントは B3D か CSV フォーマットでなければなりません。 あなたはセグメントをこれらで用意しなければならず、 B3DかCSVのオブジェクトのファイルフォーマットの基本的な作成の知識が必要なことを意味します。 詳しくはそれぞれのドキュメントをご覧ください。

Object Bender はGUIとコマンドライン双方のインターフェースを備えます。 コマンドライン引数を省略して起動すると、GUIが起動します。 GUIは本プログラムの独習と慣れるのに有用です。 長期的に見た場合、コマンドラインに変更されるほうが良いとでしょう。 目的別のコマンドライン引数のリストは下記のとおりです。

バイトオーダーマーク (BOM) が異なるUnicodeエンコーディングが示されない限り、Object Benderは常にUTF-8として解釈することに注意してください。非Unicodeのエンコーディングはサポートされません。

サポートされるオブジェクトのファイルフォーマット:

- B3D
- CSV

## ■ コマンドライン引数
{{% table %}}

| 引数           | 意味                                                      |
| ------------------ | ------------------------------------------------------------ |
| /?                 | コマンドライン引数の一覧を表示します。                    |
| *入力ファイル*        | 入力ファイルのパスを指定します。 B3D もしくは CSV ファイルを指定します。        |
| *出力ファイル*       | 出力先ファイルのパスを指定します。 ファイルフォーマットは入力ファイルのフォーマットと同一です。 |
| /n=*セグメント*      | セグメントの個数。                                      |
| /s=*セグメント長* | 各セグメントの長さを、メートル単位で指定します。                        |
| /b=*ブロック長*   | ブロックの長さをメートルで指定します。レールオブジェクトなどに用いる場合など、ゼロが指定された場合は回転しません。 |
| /r=*半径*        | 半径をメートルで指定します。 負の値は左側、正の値は右側です。ゼロの場合はカーブを生成しません。 |
| /g=*レール幅*     | レールのゲージ幅をミリメートルで指定します。カントが適用される場合は必ず指定しなければなりません。 |
| /u=*始点のカント*   | オブジェクトの始まりの時点のカントをミリメートルで指定します。      |
| /v=*終点のカント*     | オブジェクトの終点のカントをミリメートルで指定します。            |
| /a                 | 出力先のファイルを上書きせずに追記します。        |

{{% /table %}}

例:

{{% code %}}  
ObjectBender input.csv output.csv /n=25 /s=1 /b=25 /r=600  
{{% /code %}}

## ■ Object Benderの振る舞い

Object Bender はZ軸方向に向かってセグメントのコピーを生成します。 各々のコピーはGUIもしくはコマンドラインで指定されたセグメントの長さに従ってオフセットされます。 はじめのセグメントは何も修正されず残され、二番目のセグメントはセグメント長に従ってZ軸方向にシフトされます。 三番目のセグメントは 2*セグメント長、4番目は 3*セグメント長、という具合です。

コピーが生成されると、 Object Bender は極座標変換を行います。 簡単に言うと、Z軸は円の中心座標(Radius,0,0)のある方に向かって曲がります。 言い換えると、右側は正の値、左側は負の値です。 ブロック長が指定された場合、 最後のオブジェクトは回転します。それ故レールオブジェクトの生成に有用です。

Object Bender ではSetTextureCoordinates (CSV) と Coordinates (B3D) コマンドにおいて、コメントとして特別なマークアップを受け入れます。これらは Object Bender がテクスチャを張る座標を各々のセグメントにおいてシフトさせる機能に用いられます。

{{% table-leftheader %}}

| {X=*値*} | 各セグメントにおいて *値* の数値分、テクスチャをX軸の方向にシフトさせます。 |
| ----------- | ------------------------------------------------------------ |
| {Y=*値*} | 各セグメントにおいて *値* の数値分、テクスチャをY軸の方向にシフトさせます。 |

{{% /table-leftheader %}}

このマークアップはSetTextureCoordinates/Coordinates commandと同一の行におけるコメント内のどこにでも記述できます。 詳細はチュートリアルを参照してください。

## ■ チュートリアル
こちらではどの様に Object Bender を用いてカーブレールを生成するか簡単なチュートリアルを示します。
基本的なことはさておきまして、こちらのチュートリアルではテクスチャの座標を適切に取り扱いどのように働くのか、また、コマンドラインのインターフェースで効率的に動作させる方法も示します。

##### ● 基礎
私達はこれから25mのブロック長、軌間1435mm、半径600mで、右方向に曲がるカーブレールオブジェクトを作ろうと思います。最初に必要なものは5mの長さの短いレールのセグメントです。

{{% code "*segment.csv*" %}}  
; 左側のレール  
CreateMeshBuilder  
AddVertex,-0.7775,0,0  
AddVertex,-0.7775,0,5  
AddVertex,-0.7175,0,5  
AddVertex,-0.7175,0,0  
AddFace,0,1,2,3  
<br/>; 右側のレール  
CreateMeshBuilder  
AddVertex,0.7775,0,0  
AddVertex,0.7775,0,5  
AddVertex,0.7175,0,5  
AddVertex,0.7175,0,0  
AddFace,3,2,1,0  
<br/>; バラスト  
CreateMeshBuilder  
AddVertex,-1,-0.2,0  
AddVertex,-1,-0.2,5  
AddVertex,1,-0.2,5  
AddVertex,1,-0.2,0  
AddFace,0,1,2,3  
SetColor,150,125,100  
{{% /code %}}

今必要なものとして、上記のコードはテクスチャを用いず、簡単なものを作りました。 GUIとして起動した後、 この入力ファイル(segment.csv)を選択し、 必要に応じてパラメータを入力していきます。 私達は今5mの長さのセグメントを持ち、ブロック長は25mですから、それ故にブロックを埋めるためには5つのセグメントのコピーが必要となります。

Number of segments: 5  
Segment length: 5  
Block length: 25  
Radius: 600

レール幅は設定する必要はありません。なぜなら今回私達はカントを生成しないからです。 いま私達は出力先のファイルを例えば *right_curve_600.csv* として選び、Startボタンを押下します。 すると Object Bender はシンプルに *Done!* とメッセージを出力します。 半径を-600と設定し、出力先ファイルを例えば *left_curve_600.csv* と変更し、Startボタンをもう一度押すだけで、同様の設定を持った左カーブを追加で生成できます。

##### ● テクスチャの座標設定を伴う動作

今回は単色ではなく、適切なテクスチャが設定されるものとしましょう。 例:

{{% code "*segment.csv*" %}}  
; バラスト  
CreateMeshBuilder  
AddVertex,-1,-0.2,0  
AddVertex,-1,-0.2,5  
AddVertex,1,-0.2,5  
AddVertex,1,-0.2,0  
AddFace,0,1,2,3  
LoadTexture,ballast.png  
SetTextureCoordinates,0,0,0  
SetTextureCoordinates,1,0,1  
SetTextureCoordinates,2,1,1  
SetTextureCoordinates,3,1,0  
{{% /code %}}

It should be noted that the texture's y-axis in the above code corresponds to the spatial z-axis. If we now picture that the object is copied along the z-axis, we will get one copy of the texture for every segment, i.e. one copy every 5 meters. This can be desired, but let's suppose we designed the texture to fit a whole 25 meter block. In this case, one segment should not display the whole texture, but just 1/5 of it. For this purpose, we first need to make the segment appear correct on its own:

{{% code "*segment.csv*" %}}  
; ballast  
CreateMeshBuilder  
AddVertex,-1,-0.2,0  
AddVertex,-1,-0.2,5  
AddVertex,1,-0.2,5  
AddVertex,1,-0.2,0  
AddFace,0,1,2,3  
LoadTexture,ballast.png  
SetTextureCoordinates,0,0,0.0  
SetTextureCoordinates,1,0,0.2  
SetTextureCoordinates,2,1,0.2  
SetTextureCoordinates,3,1,0.0  
{{% /code %}}

In the above code, the texture is only shown to 1/5 (=0.2). If we now used Object Bender to concatenate multiple segments to form a longer object, then every segment in the resulting object would show the first fifth of the texture. This is of course undesired. What we need is for every segment to be shifted by 0.2 on the texture's y-axis. Object Bender accepts special markup for this purpose in the comments of the SetTextureCoordinates command, so let's add it:

{{% code "*segment.csv*" %}}  
; ballast  
CreateMeshBuilder  
AddVertex,-1,-0.2,0  
AddVertex,-1,-0.2,5  
AddVertex,1,-0.2,5  
AddVertex,1,-0.2,0  
AddFace,0,1,2,3  
LoadTexture,ballast.png  
SetTextureCoordinates,0,0,0.0 ; {Y=0.2}  
SetTextureCoordinates,1,0,0.2 ; {Y=0.2}  
SetTextureCoordinates,2,1,0.2 ; {Y=0.2}  
SetTextureCoordinates,3,1,0.0 ; {Y=0.2}  
{{% /code %}}

Now, Object Bender knows that for every of the above four lines of SetTextureCoordinates, each segment should be added 0.2 in the y-values, hence the first segment is unmodified, the second segment will employ the range of 0.2 to 0.4 in the y-values, the third segment 0.4 to 0.6, the fourth segment 0.6 to 0.8, and the final segment 0.8 to 1.0. This makes the texture repeat every 5 segments. With a segment length of 5 meters, that's every 25 meters, which is our block length.

##### ● Using the command-line interface

Let's suppose our curved rail object should embed an overhead wire. The overhead wire should not be curved, hence it should be a single 25 meter long wire. We cannot do this in a single step because if we included an overhead wire in our segment.csv, this would get copied and bent, too. Instead, we create both objects separately and join them together later. In order to create our curved rail via the command-line interface, we enter the following code in a terminal:

{{% code "*Terminal*" %}}  
ObjectBender segment.csv right_curve_600.csv /n=5 /s=5 /b=25 /r=600  
{{% /code %}}

Now, let's create the overhead wire in a file called 

{{% code "*wire.csv*" %}}  
AddVertex,-0.03,5,0  
AddVertex,-0.03,5,25  
AddVertex,0.03,5,25  
AddVertex,0.03,5,0  
AddFace,3,2,1,0  
SetColor,0,0,0  
{{% /code %}}

The above code is a single 25 meter long wire. Given that the object already is 25 meters long, we don't need to create additional copies, just a single segment. This should be added to our right_curve_600.csv. We can do this in the following way:

{{% code "*Terminal*" %}}  
ObjectBender wire.csv right_curve_600.csv /n=1 /s=25 /b=25 /r=600 /a  
{{% /code %}}

The final /a switch tells Object Bender to append the resulting wire to the target file, not to overwrite it. Let's combine the terminal code in a batch file. On Windows, this file could be called 

{{% code "*start.bat*" %}}  
ObjectBender segment.csv right_curve_600.csv /n=5 /s=5 /b=25 /r=600  
ObjectBender wire.csv right_curve_600.csv /n=1 /s=25 /b=25 /r=600 /a  
{{% /code %}}

If you want to make changes to the segment or to the wire objects, just execute the batch file any time later to get refreshed results. You can also create longer batch file to create left and right curves of different radii this way:

{{% code "*start.bat*" %}}  
; 300m left  
ObjectBender segment.csv left_curve_300.csv /n=5 /s=5 /b=25 /r=-300  
ObjectBender wire.csv left_curve_300.csv /n=1 /s=25 /b=25 /r=-300 /a  
; 300m right  
ObjectBender segment.csv right_curve_300.csv /n=5 /s=5 /b=25 /r=300  
ObjectBender wire.csv right_curve_300.csv /n=1 /s=25 /b=25 /r=300 /a  
; 600m left  
ObjectBender segment.csv left_curve_600.csv /n=5 /s=5 /b=25 /r=-600  
ObjectBender wire.csv left_curve_600.csv /n=1 /s=25 /b=25 /r=-600 /a  
; 600m right  
ObjectBender segment.csv right_curve_600.csv /n=5 /s=5 /b=25 /r=600  
ObjectBender wire.csv right_curve_600.csv /n=1 /s=25 /b=25 /r=600 /a  
{{% /code %}}

You hopefully get the idea.