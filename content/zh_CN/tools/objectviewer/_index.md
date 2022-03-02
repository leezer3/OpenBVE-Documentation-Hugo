---
title: "Object Viewer"
weight: 1
---

![img](/images/tool_objectviewer_screenshot_1.png)![img](/images/tool_objectviewer_screenshot_2.png)![img](/images/tool_objectviewer_screenshot_3.png)

## ■ 概述

This tool allows to preview one or more object files. Objects can be added at any time and also reloaded to quickly reflect changes. Keyboard and mouse controls allow to move and rotate the camera. If objects contain errors, a report can be optionally displayed.

Files that are passed as command line arguments are automatically opened at startup. If a CSV file is determined to be a CSV route instead of a CSV object, *RouteViewer.exe*

 will be started if present inside the same folder as *ObjectViewer.exe*. This allows you to link CSV files against either Object Viewer or Route Viewer and still have the correct tool opening the file.

Please note that Object Viewer always interprets files as UTF-8 unless a byte order mark indicates a different Unicode encoding. Non-Unicode encodings are not supported.

Supported object file formats:

- B3D
- CSV
- X
- ANIMATED

This tool does not support the plugin API yet. This means that only the built-in texture formats (BMP, PNG, GIF, JPG, TIF) are supported.

## ■ 更改日志

同時請參閱主程序的更改日志。

##### ● 版本 1.4.4.0 (2016-01-30)

- Added support for antialiasing and anisotropic filtering.  
- Added support for different window sizes.  

##### ● 版本 1.3.2.0 (2011-11-30)

- Added support for managed content package references.  

##### ● 版本 1.2.11.0 (2011-01-07)

- The file system organization has changed along with the openBVE main program. Object Viewer accepts the /filesystem=FILE switch.

##### ● 版本 1.2.7.2 (2010-07-31)

- Animated objects were not updated immediately after loading or reloading objects, but only after *RefreshRate* seconds had passed.

##### ● Version 1.2.7.1 (2010-07-28)

- Some animated objects using state changes could crash the program due to a faulty renderer.

##### ● Version 1.2.7.0 (2010-07-11)

- Different background colors can now be cycled through using the [B] key. Pressing [Shift+B] allows to select arbitrary colors via a picker.

##### ● 版本 1.2.6.0 (2010-03-14)

- If a CSV file is passed as a command-line argument, Route Viewer is started if the file is determined to be a CSV route instead of a CSV object. The detection is now solely based on the presence of the *CreateMeshBuilder* string.

##### ● 版本 1.2.5.0 (2010-01-24)

- Removed the dependency on specific versions of the Tao.OpenAL, Tao.OpenGL and Tao.SDL libraries, which could cause problems in recent Linux distributions.

##### ● 版本 1.1.0.0 (2009-06-28)

- Animated objects are now supported.  

##### ● 版本 1.0.7.1 (2009-06-14)

- Support for custom normals in AddVertex (CSV) and Vertex (RW) commands.
- Support for the Shear and ShearAll commands.
- As for responsiveness, complex objects are not optimized any longer in order to improve loading times.

##### ● 版本 1.0.4.0 (2009-04-26)

- Added options to show coordinate system grid and to hide interface
- Changed some key assignments to be more memorable
