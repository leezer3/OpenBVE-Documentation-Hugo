---
title: "關於列車製作的資料和貼士"
linktitle: "資料和貼士"
weight: 10
---
本頁內容概括了開發者製作時需要了解的資料,以及物件製作的通用提示。

## ■ 車外物件

- Exterior objects need to follow the same rules as any other object. See [Information and tips on object creation]({{< ref "/objects/information/_index.md" >}}).



## ■ panel.cfg / panel2.cfg

- You are free to use textures with full alpha channels without worrying about performance or transparency artifacts. Depth sorting will always perform correctly with these panel formats, so make good use of dirty or wet windscreens via alpha channels, for example.
- In the panel2.cfg, you are responsible for ensuring that overlapping elements are placed in unique layers. Otherwise, the rendering order might be erratic or could lead to z-fighting.
- Single textures should be of power-of-two size, e.g. sides should have a length of 1, 2, 4, 8, 16, 32, etc. However, with textures containing smaller images to be extracted later, e.g. DigitalIndicator in panel.cfg or DigitalNumber in panel2.cfg, the individual contained images should be of power-of-two size where possible, while the size of the container texture is irrelevant.