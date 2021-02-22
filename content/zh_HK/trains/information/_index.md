---
title: "關於列車製作的資料和貼士"
linktitle: "資料和貼士"
weight: 10
---
本頁內容概括了開發者製作時需要了解的資料,以及物件製作的通用提示。

## ■ 車外物件

- 列車外部物件需要遵循與其他任何物件相同的規則。 請參閱[關於物件製作的資料和貼士]({{< ref "/objects/information/_index.md" >}})。



## ■ panel.cfg / panel2.cfg

- 在2D Panel下，您可以自由地使用含有Alpha Channel的材質，而不必擔心性能或透明度問題。 深度排序會正確執行，因此，例如，可以利用Alpha Channel來製作骯髒或潮濕的擋風玻璃。
- 在panel2.cfg中，您應該要確保重疊的元素是放置在獨立的圖層中。 否則，渲染順序可能會導致z-fighting。
- 單一材質的解像度應該為二次方。 側面的長度應為1、2、4、8、16、32等。但是，包含較小圖像的材質 (Texture Atlas) 將在以後提取，例如panel.cfg中的DigitalIndicator或panel2.cfg中的DigitalNumber，所包含的每個材質的解像度應為二次方，但整體材質的解像度可以為任何解像度。