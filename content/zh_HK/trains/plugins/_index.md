---
title: "列車插件"
weight: 9
---
列車插件可更改列車運行時的行為。您可以在Panel上向顯示Custom Indicator，播放聲音並覆蓋司機設置的手柄。插件可模擬安全設備，例如ATS或ATC。

## ■ 可用的插件形式

[**.NET assemblies:**]({{< ref "/plugins/overview/_index.md" >}})
這是唯一官方認可的插件形式。插件是.NET assemblies, 應兼容跨平台並無需重新編譯。您可以從多種編程語言中進行選擇，包括C#和Visual Basic .NET，以及許多其他.NET Framework的語言。

[**Win32 DLLs:**]({{< ref "/trains/plugins/legacy/_index.md" >}})  
保留這種形式的插件是為了向BVE Trainsim兼容，但由於這些插件只能在Microsoft Windows系統上運行，因此不再認可。它們通常是由C / C ++開發的。考慮到跨平台的替代方案，由現在開始請使用.NET assemblies來開發。

## ■ 設置使用插件的列車

您將需要將插件運送到火車文件夾中的某個位置，並在[ats.cfg] ({{< ref "/trains/ats_cfg/_index.md" >}}) 文件中配置插件的路徑。.NET Assembly Train插件請注意，您 **不** 應該將OpenBveApi.dll與您的插件一起。