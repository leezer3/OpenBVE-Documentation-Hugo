---
title: "與BVE Trainsim的不同"
linktitle: "對比BVE Trainsim"
weight: 9
---

本頁列出了openBVE和BVE Trainsim之間在文件格式方面的**不兼容**差異，即為BVE Trainsim開發的內容的功能在openBVE中以不同的方式進行了解釋，結果不兼容。 目前，只有一種這樣的不兼容是已知的。

請注意，對於此頁面上提到的所有不兼容差異，解決方案都是相同的：在openBVE中提供穩定和一致的功能比在版本之間進行向後不兼容的更改以增加與BVE的相似性更為重要。 Trainsim。 因此，此頁面上描述的所有差異都是永久性的。

## ■Track.Signal命令（CSV和RW線路）

Track.Signal命令 ( 或: Track.Sig ) 是用於在CSV路線中創建 默認的日式信號 ( RW路由中使用替代拼寫 )。

在OpenBVE中，Track.Signal命令採用以下參數：

{{% command %}}  
**Track.Signal** *Aspects*; *~~沒用~~*; *X*; *Y*; <u>*Yaw*</u>; *Pitch*; *Roll*  
{{% /command %}}

但在BVE Trainsim中，Track.Signal指令接受的是係以下參數：

{{% command %}}  
**Track.Signal** *Aspects*; *Label*; *X*; *Y*; <u>*Type*</u>  
{{% /command %}}

The *Label* parameter in BVE Trainsim is a textual description of the signal which serves no function in openBVE (thus termed *Unused* in the documentation).

BVE Trainsim features a *Type* argument which can take values 1, 2 or 3. It is used to denote different types of signals, e.g. home signal vs. departure signal. By mere accident, this argument was never included in openBVE, while subsequently, the need arose to include *Yaw*, *Pitch* and *Roll* arguments to provide for more control over a signal head's orientation. Consequently, BVE Trainsim's *Type* and openBVE's *Yaw* argument incompatibly overlap. If a route created for BVE Trainsim includes the *Type* argument, it will be (mis)interpreted as a yaw of up to 3 degrees in openBVE. Usually, this small angle should not produce noticable differences, especially given that the parameter is not often used anyway.
