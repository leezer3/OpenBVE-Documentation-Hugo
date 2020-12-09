---
title: "**.rw** 路線格式"
linktitle: "RW 路線"
weight: 3
---

RW路線格式嘅功能同CSV差唔多, 但使用唔同嘅句法, 結構同指令名稱。因RW路線格式已經唔再常用, 建議使用CSV路線格式。

沒有關於RW路由的完整文檔，只有說明可用命令和語法的快速參考：

➟ [快速參考...]({{< ref "/routes/rw_quick/_index.md" >}}) 

請參閱CSV路線的文檔，以了解各種命令的作用，但請注意，在CSV中，單詞和語法有所不同。您也可以與 [CSV路徑的快速參考]({{< ref "/routes/csv_quick/_index.md" >}}) 進行比較，以得出格式之間的差異。

------

**RW與CSV不同的特性**

在RW中，以分號(;) 開頭的註釋只能在[Railway]部分中的尾端使用。在[Railway]部分之外，註釋必須顯示在獨立的行上。

在RW中，第一個 [Section] 之前的每個文本都被視為路徑描述的一部分，即CSV中的Route.Comment。

In RW, the default @Height at the beginning of the route is 0.3 meters, while in CSV, the default Track.Height is 0.0 meters. Additionally, every value passed to @Height is added an additional 0.3 meters in RW.

In RW, the second argument to @Form can take special values: -9 is the same as L, 9 is the same as R, and 9X references rail 9. In CSV, -9 is invalid and 9 references rail 9.
