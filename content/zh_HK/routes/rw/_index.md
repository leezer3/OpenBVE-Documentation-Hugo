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

在RW中，路線起點@Height默認為0.3米，而在CSV中，Track.Height默認為0.0米。 此外，@Height的每個值都會在RW中額外增加0.3米。

在RW中，@Form的第二個參數可以採用特殊數值：-9與L相同，9與R相同，而9X引用軌道9。在CSV中，-9無效, 9引用軌道9。
