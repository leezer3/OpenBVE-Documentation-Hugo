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
**Track.Signal** *Aspects*; *~~未使用~~*; *X*; *Y*; <u>*Yaw*</u>; *Pitch*; *Roll*  
{{% /command %}}

但在BVE Trainsim中，Track.Signal指令接受的是係以下參數：

{{% command %}}  
**Track.Signal** *Aspects*; *Label*; *X*; *Y*; <u>*Type*</u>  
{{% /command %}}

BVE Trainsim中的 *Label* 參數是信號的文字描述，該信號在OpenBVE中無有作用（因此在文檔中稱為 *未使用*）。

BVE Trainsim具有 *Type* 參數，該參數可以採用值1、2或3。它用於表示不同類型的信號，例如原點信號與出發信號。偶然地，此參數從未包含在OpenBVE中，而隨後，便需要包含 *Yaw*， *Pitch* 和 *Roll* 參數以提供對信號頭方向的更多控制。 因此，BVE Trainsim的 *Type* 和OpenBVE的 *Yaw* 參數不兼容地重疊。 如果為BVE Trainsim創建的路線包含 *Type* 參數，則它將在OpenBVE中（誤）解釋為最多3度的偏航。 通常，此小角度不應產生明顯的差異，特別是考慮到該參數都不經常使用。
