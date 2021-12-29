---
title: "車両製作に関する情報とヒント"
linktitle: "情報とヒント"
weight: 10
---
このページでは、製作者がが知っておく必要のある情報と、オブジェクト作成の一般的なヒントをご紹介します。

## ■ 外観のオブジェクト

- 外観のオブジェクトは、他のオブジェクトと同じように製作する必要があります。[オブジェクト製作に関する情報とヒント]({{< ref "/objects/information/_index.md" >}}) のページをご確認ください。



## ■ panel.cfg / panel2.cfg

- You are free to use textures with full alpha channels without worrying about performance or transparency artifacts. Depth sorting will always perform correctly with these panel formats, so make good use of dirty or wet windscreens via alpha channels, for example.
- In the panel2.cfg, you are responsible for ensuring that overlapping elements are placed in unique layers. Otherwise, the rendering order might be erratic or could lead to z-fighting.
- Single textures should be of power-of-two size, e.g. sides should have a length of 1, 2, 4, 8, 16, 32, etc. However, with textures containing smaller images to be extracted later, e.g. DigitalIndicator in panel.cfg or DigitalNumber in panel2.cfg, the individual contained images should be of power-of-two size where possible, while the size of the container texture is irrelevant.