---
title: ".NET assembly plugins"
linktitle: "Áttekintés"
weight: 1
---

Plugins allow to offer functionality that openBVE does not provide out of the box. At the moment, only train plugins are supported which are mainly intended for the simulation of safety equipment.

##### ● Train plugins

Train plugins allow to change the runtime behavior of trains to some degree. Things you can do include displaying custom indicators in the panels, playing custom sounds and overriding the handles the driver originally set. Plugins can be used to simulate safety equipment such as ATS or ATC, among other things.

## ■ Tartalom

{{% contents %}}

- [1. Guidelines on developing plugins](#guidelines)
- [2. How to develop a plugin](#howto)
- [3. API Documentation](#documentation)
- [4. Template projects](#templates)

{{% /contents %}}

## <a name="guidelines"></a>■ Guidelines on developing plugins

All .NET assembly plugins are intended to run on all platforms without recompilation. In order to achieve this goal, you as the programmer have to follow a certain set of rules which will be explained right here from the start.

##### ● Plugins should target the .NET Framework 4.6.1

A whole variety of new .NET Framework versions comes out every so often. In order for plugins to not have stricter requirements on external dependencies than openBVE itself, plugins should target the .NET Framework 4.6.1, not any later version. This means that users do not have to upgrade their .NET Framework just in order to run your plugin. It also helps ensuring that all plugins run both on Microsoft .NET as well as on Mono, which is used on Linux and Mac OS X primarily.

This also means that you must not use CLI-specific features such as Mono.Simd, among other things.

##### ● Plugins must be compiled against any CPU

Even though openBVE itself currently runs in 32-bit mode (on Windows anyway), plugins must not exhibit this behavior - they must run on all CPU architectures. Be sure to set AnyCPU as the target processor in your development tool of choice. In Visual Studio and SharpDevelop, for example, the default target processor is x86, not AnyCPU. Be sure to change that.

##### ● Plugins must not use P/Invoke

The .NET Framework has the great advantage of running plugins on all platforms if plugins are designed right. Platform invokation can destroy this advantage, so do not call platform-specific libraries from within your plugin. Use only what the .NET Framework has to offer.

##### ● Plugins must make file system calls in a cross-platform-compatible way

There are differences in how file systems work on different platforms, and you have to incorporate them in your plugin if you make calls to external files. For example, Linux generally uses case-sensitive file systems, and both Linux and Mac OS X use the slash as the directory separator, while Windows uses the backslash.

Furthermore, accessing files from the current working directory can lead to unreproducible results across platforms. Therefore, you must always use a fully qualified (absolute) path when accessing files. Train plugins are given both the path to the train folder and the path to folder they are stored in. This is intended to assist them in finding files from the expected locations.

For this reason, you must never construct file names in any of the following ways:

{{% table-nonheader %}}

| <font color="Red">✗</font> | string file = "configuration.ini";                | This is a relative path that uses the current working directory. Prone to failure across platforms. |
| -------------------------- | ------------------------------------------------- | ------------------------------------------------------------ |
| <font color="Red">✗</font> | string file = TrainFolder + "/configuration.ini"; | This uses a slash as the directory separator. Works on Linux and Mac OS X, but not on Windows. |

{{% /table-nonheader %}}

The way you should construct file names:

{{% table-nonheader %}}

| <font color="Green">✓</font> | string file = System.IO.Path.Combine(TrainFolder, "configuration.ini"); | This works perfectly on all platforms. |
| ---------------------------- | ------------------------------------------------------------ | -------------------------------------- |
| <font color="Green">✓</font> | string subdirectory = System.IO.Path.Combine(TrainFolder, "subdirectory");<BR>string file = System.IO.Path.Combine(subdirectory, "configuration.ini"); | This works perfectly on all platforms. |

{{% /table-nonheader %}}

However, mind that Linux and Mac OS X are case-sensitive platforms. If you hardwire *configuration.ini*, then you must call the file that way when creating it, and not, for example, *Configuration.ini*. Be sure to check this.

##### ● Plugins must read from text files with specified encodings and in a culture-insensitive way

When you read textual data from a file, always specify an explicit encoding such as UTF-8. Never read text files with the computer's default encoding. Also, when you interpret numbers, always specify an explicit culture. Never interpret numbers with the computer's default culture.

For this reason, you must never read from text files or interpret them in any of the following ways:

{{% table-nonheader %}}

| <font color="Red">✗</font> | string[] lines = System.IO.File.ReadAllLines(file); | Uses an unspecified encoding. |
| -------------------------- | --------------------------------------------------- | ----------------------------- |
| <font color="Red">✗</font> | int number = double.Parse(lines[0]);                | Uses an unspecified culture.  |

{{% /table-nonheader %}}

The way you should read from files and interpret them:

{{% table-nonheader %}}

| <font color="Green">✓</font> | string[] lines = System.IO.File.ReadAllLines(file, System.Text.Encoding.UTF8); | Uses an explicit encoding.  |
| ---------------------------- | ------------------------------------------------------------ | --------------------------- |
| <font color="Green">✓</font> | int number;<BR>double.TryParse(lines[0], System.Globalization.NumberStyles.Integer, System.Globalization.CultureInfo.InvariantCulture, out number); | Uses the invariant culture. |
| <font color="Green">✓</font> | System.Threading.Thread.CurrentThread.CurrentCulture = System.Globalization.CultureInfo.InvariantCulture;<BR>int number = double.Parse(lines[0]); | Uses the invariant culture. |

{{% /table-nonheader %}}

##### ● Plugins must allow running multiple instances

The classes the plugins export may be instantiated by openBVE multiple times. In case of train plugins, one instance may be created per train. The instances may even be run in different threads. Plugins must be designed with behavior this in mind.

## <a name="howto"></a>■ How to develop a plugin

In order to create a train plugin, first choose a programming language (for example C# or Visual Basic.NET) and a suitable development tool (for example [MonoDevelop](https://www.monodevelop.com/) or [SharpDevelop](http://www.icsharpcode.net/opensource/sd/)). Then create a new **Class Library** and reference **OpenBveApi.dll** (which comes with openBVE). Now, create a public class that inherits the interface you want to implement (see the API documentation below).

Be sure to compile against AnyCPU, to enable CLS-compliance checks and to remove references that are not actually needed. Mind to **not** ship OpenBveApi.dll with your plugin.

## <a name="documentation"></a>■ Documentation

{{% table %}}

| API component | Description   | Documentation                                     |
| ------------- | ------------- | ------------------------------------------------- |
| IRuntime      | Train plugins | [View]({{< ref "/plugins/iruntime/_index.md" >}}) |

{{% /table %}}

## <a name="templates"></a>■ Template projects

In the directory **Examples\Sample Plugins**, you can find template projects targeting different programming languages. In these templates, almost everything has been prepared for you. The only thing you have to do is to include a reference to OpenBveApi.dll which comes with openBVE.

For those who use SharpDevelop, reference OpenBveApi.dll by clicking the *Project* menu and selecting *Add reference*, then go to the *.NET Assembly Browser* tab and click on *Browse*. Now browse to your openBVE directory and select *OpenBveApi.dll*. Confirm with *OK*. Now select *OpenBveApi* from the *Projects* window and set *Local copy* to **False**. Also be sure that *Specific Version* is set to **False**.