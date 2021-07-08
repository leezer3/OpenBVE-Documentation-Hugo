---
title: "Route Viewer"
weight: 3
---
![img](/images/tool_routeviewer_screenshot_1.png)

## ■ 總概

該工具允許預覽路由文件。 可以移動，旋轉和縮放鏡頭，可以跳到車站和位子點 (Point of Interest)，還可以啟用一系列選項。 如果路線包含錯誤，則可以選擇顯示報告。

A file that is passed as a command line argument is automatically opened at startup. If a CSV file is determined to be a CSV object instead of a CSV route, *ObjectViewer.exe* will be started if present inside the same folder as *RouteViewer.exe*. This allows you to link CSV files against either Route Viewer or Object Viewer and still have the correct tool opening the file.

Please note that Route Viewer always interprets files as UTF-8 unless a byte order mark indicates a different Unicode encoding. Non-Unicode encodings are not supported.

For moving the camera, use the *WASD* keys, for rotating the *Arrow* keys. Jump to stations with the *PageUp* and *PageDown* keys, or jump to points of interests using the *Num1* and *Num7* keys. You can also enter a specific track position using the *number* keys, then confirm with the *Return* key or cancel with the *Escape* key. For relative offsets, the prefixes *Minus* and *Plus* are also accepted. There are other useful keys which are hinted at in RouteViewer's main window.

支持的路線格式

- CSV
- RW

此工具尚未支持插件API。 這意味著僅支持內置材質格式(BMP，PNG，GIF，JPG，TIF) 和內置聲音格式 (WAV)。

## ■ 更改日志

同時請參閱主程序的更改日志。

##### ● 版本 1.4.4.0 (2016-01-30)

- 支援對抗鋸齒 (antialiasing) 和各向異性過濾 (anisotropic filtering)。
- 支援不同視窗的大小。

##### ● 版本 1.3.2.0 (2011-11-30)

- 支援對託管內容包(Managed content)引用。

##### ● 版本 1.2.11.0 (2011-01-07)

- The file system organization has changed along with the openBVE main program. Route Viewer accepts the /filesystem=FILE switch.

##### ● 版本 1.2.7.2 (2010-07-31)

- Animated objects were not updated immediately after loading or reloading routes, but only after *RefreshRate* seconds had passed.

##### ● 版本 1.2.6.0 (2010-03-14)

- If a CSV file is passed as a command-line argument, Object Viewer is started if the file is determined to be a CSV object instead of a CSV route. The detection is now solely based on the presence of the *CreateMeshBuilder* string.

##### ● 版本 1.2.5.1 (2010-02-14)

- You can now enter a track position using the number keys and jump to that position.

##### ● 版本 1.2.5.0 (2010-01-24)

- Removed the dependency on specific versions of the Tao.OpenAL, Tao.OpenGL and Tao.SDL libraries, which could cause problems in recent Linux distributions.

##### ● 版本 1.2.3.0 (2009-11-14)

- When loading a route via command line arguments, the wrong background image could show at the initial track position.

##### ● 版本 1.2.0.0 (2009-07-26)

- The camera yaw, pitch and roll are now displayed along with the track position and offsets.

##### ● 版本 1.1.0.0 (2009-06-28)

- The set of variables than can be used in functions of animated objects has been vastly extended. This matches with the corresponding version of openBVE.

##### ● 版本 1.0.7.1 (2009-06-14)

- Support for new parameters in *ArrivalTime* in Track.Sta and Track.Station commands.
- Support for custom normals in AddVertex and Vertex commands (objects).
- Support for the Shear and ShearAll commands (objects).  
- As for responsiveness, complex objects are not optimized any longer in order to improve loading times.

##### ● 版本 1.0.6.0 (2009-05-24)

- 添加了靜音功能。

##### ● 版本 1.0.4.0 (2009-04-26)

- 更改了一些按鍵分配，比較容易記
