---
title: Route Viewer
weight: 3
---
![img](/images/tool_routeviewer_screenshot_1.png)

## ■ Descripció

This tool allows to preview route files. The camera can be moved, rotated and zoomed, you can jump to stations and points of interest, and also enable a series of options. If routes contain errors, a report can be optionally displayed.

A file that is passed as a command line argument is automatically opened at startup. If a CSV file is determined to be a CSV object instead of a CSV route, *ObjectViewer.exe* will be started if present inside the same folder as *RouteViewer.exe*. This allows you to link CSV files against either Route Viewer or Object Viewer and still have the correct tool opening the file.

Please note that Route Viewer always interprets files as UTF-8 unless a byte order mark indicates a different Unicode encoding. Non-Unicode encodings are not supported.

For moving the camera, use the *WASD* keys, for rotating the *Arrow* keys. Jump to stations with the *PageUp* and *PageDown* keys, or jump to points of interests using the *Num1* and *Num7* keys. You can also enter a specific track position using the *number* keys, then confirm with the *Return* key or cancel with the *Escape* key. For relative offsets, the prefixes *Minus* and *Plus* are also accepted. There are other useful keys which are hinted at in RouteViewer's main window.

Supported route file formats:

- CSV
- RW

This tool does not support the plugin API yet. This means that only the built-in texture formats (BMP, PNG, GIF, JPG, TIF) and the built-in sound formats (WAV) are supported.

## ■ Changelog

Please also see the changelog of the main program.

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
