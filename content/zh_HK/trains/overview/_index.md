---
title: "開發列車 - 總概"
linktitle: "總概"
weight: 1
---

車輛包含一系列獨立的配置文件、位圖和波形文件。 下方列出了所有類型文件嘅概述及其作用。

## ■ 特性

[**train.dat:**]({{<ref "/trains/train_dat/_index.md">}})  
呢個係車輛特性嘅核心配置文件, 必須存在於車輛文件夾中。

## ■ 駕駛台

[**panel.animated:**]({{<ref "/trains/panel_animated/_index.md">}})
該文件允許創建完整的3D駕駛室。 如果列車文件夾中存在此文件，此文件則優先於panel2.cfg和panel.cfg。

[**panel2.cfg:**]({{<ref "/trains/panel2_cfg/_index.md">}})  
該文件允許創建有限的2D駕駛室。 如果列車文件夾中存在此文件，此文件則優先於panel.cfg。 panel2.cfg已取代panel.cfg，因為它提供了更多功能。

[**panel.cfg:**]({{<ref "/trains/panel_cfg/_index.md">}})  
該文件已過時，可以創建有限的2D駕駛室。 它已被panel2.cfg文件完全取代，新作品應使用panel2.cfg。

## ■ 聲音

[**Default sounds:**]({{<ref "/trains/default_sounds/_index.md">}})  
如果 *sound.cfg* 不存在列車文件夾中，這就是在列車文件夾中尋找的默認聲音文件。

[**sound.cfg:**]({{<ref "/trains/sound_cfg/_index.md">}})  
This defines the names of the sound files to use. The file is required if plugin-specific sounds are to be made available.

## ■ 安全系統

[**Built-in systems:**]({{<ref "/trains/openbveats/_index.md">}})  
The built-in safety systems ATS-SN, ATS-P and ATC are only used if no *ats.cfg* file is present, and if the *train.dat* is configured to define which of these systems should be available.

[**ats.cfg:**]({{<ref "/trains/ats_cfg/_index.md">}})  
This file defines which external train plugin to use. For information on how to create plugins, see [here]({{<ref "/trains/plugins/_index.md">}}).

## ■ 雜項

[**extensions.cfg:**]({{<ref "/trains/extensions_cfg/_index.md">}})  
This defines additional characteristics that are not covered by the other files.