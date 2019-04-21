---
title: Object Viewer
weight: 1
---

![img](/images/tool_objectviewer_screenshot_1.png)![img](/images/tool_objectviewer_screenshot_2.png)![img](/images/tool_objectviewer_screenshot_3.png)

## ■ 概要

このツールはひとつ、もしくは複数のオブジェクトファイルをプレビューできます。 オブジェクトはいつでも好きなときに追加して表示でき、 またいつでも素早く再読み込みで反映することができます。 キーボードやマウスの操作でカメラの移動や回転ができます。もしオブジェクトにエラーがあった場合、別途レポートを表示できます。

コマンドライン引数により渡されたファイルは、起動時に自動で表示されます。 もし CSV ファイルがCSVオブジェクトではなくCSVルートの場合、 *RouteViewer.exe* が

*ObjectViewer.exe* が同一のフォルダに存在する場合優先して実行されます。  これによりObject Viewer と Route Viewerいずれか一つだけに関連付けをしたとしても、適切なツールでファイルを開くことができます。

バイトオーダーマーク (BOM) が異なるUnicodeエンコーディングが示されない限り、Object Viewerは常にUTF-8として解釈することに注意してください。非Unicodeのエンコーディングはサポートされません。

サポートされるオブジェクトファイルのフォーマット:

- B3D
- CSV
- X
- ANIMATED

このツールではプラグインAPIの表示はサポートされていません。これは組み込みのテクスチャフォーマット (BMP, PNG, GIF, JPG, TIF) のみサポートすることを意味します。

## ■ Changelog

Please also see the changelog of the main program.

##### ● Version 1.4.4.0 (2016-01-30)

- Added support for antialiasing and anisotropic filtering.  
- Added support for different window sizes.  

##### ● Version 1.3.2.0 (2011-11-30)

- Added support for managed content package references.  

##### ● Version 1.2.11.0 (2011-01-07)

- The file system organization has changed along with the openBVE main program. Object Viewer accepts the /filesystem=FILE switch.

##### ● Version 1.2.7.2 (2010-07-31)

- Animated objects were not updated immediately after loading or reloading objects, but only after *RefreshRate* seconds had passed.

##### ● Version 1.2.7.1 (2010-07-28)

- Some animated objects using state changes could crash the program due to a faulty renderer.

##### ● Version 1.2.7.0 (2010-07-11)

- Different background colors can now be cycled through using the [B] key. Pressing [Shift+B] allows to select arbitrary colors via a picker.

##### ● Version 1.2.6.0 (2010-03-14)

- If a CSV file is passed as a command-line argument, Route Viewer is started if the file is determined to be a CSV route instead of a CSV object. The detection is now solely based on the presence of the *CreateMeshBuilder* string.

##### ● Version 1.2.5.0 (2010-01-24)

- Removed the dependency on specific versions of the Tao.OpenAL, Tao.OpenGL and Tao.SDL libraries, which could cause problems in recent Linux distributions.

##### ● Version 1.1.0.0 (2009-06-28)

- Animated objects are now supported.  

##### ● Version 1.0.7.1 (2009-06-14)

- Support for custom normals in AddVertex (CSV) and Vertex (RW) commands.
- Support for the Shear and ShearAll commands.
- As for responsiveness, complex objects are not optimized any longer in order to improve loading times.

##### ● Version 1.0.4.0 (2009-04-26)

- Added options to show coordinate system grid and to hide interface
- Changed some key assignments to be more memorable
