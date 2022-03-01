---
title: "Extensions de trens"
weight: 10
---
Train plugins allow to change the runtime behavior of trains to some degree. Things you can do include displaying custom indicators in the panels, playing custom sounds and overriding the handles the driver originally set. Plugins can be used to simulate safety equipment such as ATS or ATC, among other things.

## ■ Tipus d'extensions disponibles

[**.NET assemblies:**]({{< ref "/plugins/overview/_index.md" >}})  
This is the only officially endorsed form of plugin. The plugins are .NET assemblies and should be designed to be cross-platform-compatible without recompilation. You can choose from a variety of programming languages, including C# and Visual Basic .NET, among many others that target the .NET Framework.

[**Win32 DLLs:**]({{< ref "/trains/plugins/legacy/_index.md" >}})  
This form of plugin is retained for backward compatibility with BVE Trainsim, but is no longer officially endorsed because these plugins can only run on Microsoft Windows. They are usually developed in C/C++. Given the cross-platform alternative, please develop .NET assemblies from now on.

## ■ Configuració d'un tren perquè faci servir una extensió

You will need to ship the plugin somewhere in your train folder and configure the path to your plugin inside the [ats.cfg]({{< ref "/trains/ats_cfg/_index.md" >}}) file. Please note that for .NET assembly train plugins, you should **not** ship OpenBveApi.dll along with your plugin.