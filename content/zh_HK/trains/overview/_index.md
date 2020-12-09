---
title: "開發列車 - 總概"
linktitle: "總概"
weight: 1
---

車輛包含一系列獨立嘅配置文件、位圖和波形文件。 下方列出咗所有類型文件嘅概述及其作用。

## ■ 特性

[**train.dat:**]({{<ref "/trains/train_dat/_index.md">}})  
呢個係車輛特性嘅核心配置文件, 必須存在於車輛文件夾中。

## ■ 駕駛台

[**panel.animated:**]({{<ref "/trains/panel_animated/_index.md">}})  
This file allows to create a fully 3D cab. If present in the train folder, this file has precedence over the panel2.cfg and panel.cfg files.

[**panel2.cfg:**]({{<ref "/trains/panel2_cfg/_index.md">}})  
This file allows to create a limited 2D cab. If present in the train folder, this file has precedence over the panel.cfg. The panel2.cfg has fully superseded the panel.cfg as it offers greater functionality.

[**panel.cfg:**]({{<ref "/trains/panel_cfg/_index.md">}})  
This file is outdated, and allows to create a limited 2D cab. It has been fully superseded by the panel2.cfg file, which should be used instead.

## ■ 聲音

[**Default sounds:**]({{<ref "/trains/default_sounds/_index.md">}})  
If no *sound.cfg* is present, these are the default sound files that are being looked for in the train folder.

[**sound.cfg:**]({{<ref "/trains/sound_cfg/_index.md">}})  
This defines the names of the sound files to use. The file is required if plugin-specific sounds are to be made available.

## ■ 安全系統

[**Built-in systems:**]({{<ref "/trains/openbveats/_index.md">}})  
The built-in safety systems ATS-SN, ATS-P and ATC are only used if no *ats.cfg* file is present, and if the *train.dat* is configured to define which of these systems should be available.

[**ats.cfg:**]({{<ref "/trains/ats_cfg/_index.md">}})  
This file defines which external train plugin to use. For information on how to create plugins, see [here]({{<ref "/trains/plugins/_index.md">}}).

## ■ Miscellaneous

[**extensions.cfg:**]({{<ref "/trains/extensions_cfg/_index.md">}})  
This defines additional characteristics that are not covered by the other files.