---
title: "车辆开发 - 概述"
linktitle: "概述"
weight: 1
---

车辆包含一系列独立的配置文件、位图和波形文件。下方列出了所有类型文件的概述及其作用。

## ■ 车辆特性

[**train.dat:**]({{<ref "/trains/train_dat/_index.md">}})  
这个是车辆特性的核心配置文件，必须存在于车辆文件夹中

## ■ 驾驶台

[**panel.animated:**]({{<ref "/trains/panel_animated/_index.md">}})  
该文件允许创建一个全3D驾驶室。若它出现在车辆文件夹中，将优先于 panel2.cfg 与 panel.cfg 加载。

[**panel.animated:**]({{<ref "/trains/panel_animated/_index.md">}})  
该文件允许创建一个有视角限制的2D驾驶室。若它出现在车辆文件夹中，将优先于 panel.cfg 加载。由于具有更强大的功能，panel2.cfg 已完全替代 panel.cfg。

[**panel.cfg:**]({{<ref "/trains/panel_cfg/_index.md">}})  
该文件已过时，它允许创建一个有视角限制的2D驾驶室。panel2.cfg 已完全替代 panel.cfg，您不应该使用此类文件。

## ■ 各种声音

[**默认声音：**]({{<ref "/trains/default_sounds/_index.md">}})  
若车辆文件夹中无 *sound.cfg* 文件，openBVE会自动寻找使用默认文件名的波形文件与相应功能对应。

[**sound.cfg:**]({{<ref "/trains/sound_cfg/_index.md">}})  
该文件为所有即将被使用的波形文件制作索引。如果某些声音专供插件使用，需要编写该文件。

## ■ 保安系统

[**内置保安系统：**]({{<ref "/trains/openbveats/_index.md">}})  
仅当车辆文件夹中没有 *ats.cfg* 文件，且在 *train.dat* 中手动设置，内置的 ATS-SN, ATS-P and ATC 保安系统才会被使用。

[**ats.cfg:**]({{<ref "/trains/ats_cfg/_index.md">}})  
该文件决定了车辆使用哪一个外部插件。请于[此处]({{<ref "/trains/plugins/_index.md">}})参阅如何制作插件。

## ■ 杂项

[**extensions.cfg:**]({{<ref "/trains/extensions_cfg/_index.md">}})  
该文件对上述配置文件未涉及的额外特性做出定义（主要用与车辆编组与外观）。