---
title: "ルートビューアー"
weight: 3
---
![img](/images/tool_routeviewer_screenshot_1.png)

## ■ 概要

このツールはルートファイルをプレビューすることができます。 カメラを移動することができ、回転や拡大ができます。 駅と駅の間や任意のビューポイント(Point Of Interest)へジャンプすることができ、  同様に一連のオプションを設定することができます。 もしルートデータにエラーがある場合、 レポートをオプションウインドウに表示することができます。

起動時にコマンドラインオプションでファイルが指定されると、そのファイルが自動で開かれます。 もし CSV ファイルがCSVオブジェクトでなくCSVルートであると判断された場合、 *ObjectViewer.exe* は同一階層のフォルダ内にある *RouteViewer.exe* を自動で実行します。 これにより、 CSVファイルが  Route Viewer もしくは Object Viewer のいずれかに割り当てられたとしても、適切なツールが実行され、ファイルが開かれます。

バイトオーダーマーク (BOM) が異なるUnicodeエンコーディングが示されない限り、ルートビューアーは常にUTF-8として解釈することに注意してください。非Unicodeのエンコーディングはサポートされません。

カメラを動かすには *WASD* キーを用い、回転をするには *矢印* キーを用います。 駅の間をジャンプするには *PageUp* と *PageDown* キーを用い、 任意のビューポイント(Points Of Interests)へジャンプするには *Num1* と *Num7* キーを用います。 同様に任意の距離程に移動するにはフルキーの *数字* キーを用います。 入力した後 *Return* key で確定するか *Escape* キーでキャンセルします。 相対的に距離程をオフセットするには *マイナス* もしくは *プラス* キーを押下します。 その他の有用な操作キーの情報はルートビューアーのメインウインドウ内に表示されています。

サポートされるルートデータのフォーマット:

- CSV
- RW

このツールではプラグインAPIの表示はサポートされていません。これは組み込みのテクスチャフォーマット (BMP, PNG, GIF, JPG, TIF) 、及び組み込みののサウンドファイルフォーマット(WAV)のみサポートすることを意味します。

## ■ Changelog

メインプログラムの更新履歴も同様に確認してください。

##### ● Version 1.4.4.0 (2016-01-30)

- Added support for antialiasing and anisotropic filtering.
- Added support for different window sizes. 

##### ● Version 1.3.2.0 (2011-11-30)

- Added support for managed content package references.

##### ● Version 1.2.11.0 (2011-01-07)

- The file system organization has changed along with the openBVE main program. Route Viewer accepts the /filesystem=FILE switch.

##### ● Version 1.2.7.2 (2010-07-31)

- Animated objects were not updated immediately after loading or reloading routes, but only after *RefreshRate* seconds had passed.

##### ● Version 1.2.6.0 (2010-03-14)

- If a CSV file is passed as a command-line argument, Object Viewer is started if the file is determined to be a CSV object instead of a CSV route. The detection is now solely based on the presence of the *CreateMeshBuilder* string.

##### ● Version 1.2.5.1 (2010-02-14)

- You can now enter a track position using the number keys and jump to that position.

##### ● Version 1.2.5.0 (2010-01-24)

- Removed the dependency on specific versions of the Tao.OpenAL, Tao.OpenGL and Tao.SDL libraries, which could cause problems in recent Linux distributions.

##### ● Version 1.2.3.0 (2009-11-14)

- When loading a route via command line arguments, the wrong background image could show at the initial track position.

##### ● Version 1.2.0.0 (2009-07-26)

- The camera yaw, pitch and roll are now displayed along with the track position and offsets.

##### ● Version 1.1.0.0 (2009-06-28)

- The set of variables than can be used in functions of animated objects has been vastly extended. This matches with the corresponding version of openBVE.

##### ● Version 1.0.7.1 (2009-06-14)

- Support for new parameters in *ArrivalTime* in Track.Sta and Track.Station commands.
- Support for custom normals in AddVertex and Vertex commands (objects).
- Support for the Shear and ShearAll commands (objects).  
- As for responsiveness, complex objects are not optimized any longer in order to improve loading times.

##### ● Version 1.0.6.0 (2009-05-24)

- Added the functionality to mute sound.  

##### ● Version 1.0.4.0 (2009-04-26)

- Changed some key assignments to be more memorable  
