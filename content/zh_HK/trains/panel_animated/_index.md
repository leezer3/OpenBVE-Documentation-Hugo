---
title: "**panel.animated** 檔案格式"
linktitle: "panel.animated 檔案"
weight: 5
---

如果在列車文件夾中，此文件會定義3D駕駛室。

該文件是正常的 [動態物件檔案]({{< ref "/objects/native/animated/_index.md" >}}). 假設列車主體位於x軸和z軸的中心，而y軸上的0值對應於鐵軌的頂部，就像外部列車對像一樣。

駕駛員的視點是通過[train.dat]({{< ref "/trains/train_dat/_index.md#cab" >}})中的#CAB或#COCKPIT部分調較的（測量距離由列車前方計算, 毫米）。

您可以使用[ObjectViewer]({{< ref "/tools/objectviewer/_index.md" >}})預覽任何動畫物件，包括panel.animated文件。 你也可以將列車外部和panel.animated在Object Viewer中一起加載，這樣您就可以將它們配合。

{{% notice %}}

#### 覆蓋和光暗

駕駛室永遠都會出現在路線景物前面。 這是故意的，因為這樣雨水不會穿透駕駛室，牆壁和其他障礙物。 此外，駕駛室中的照明與路線不同。 當環境亮度在駕駛室內反射時，環境顏色不會反射，並且駕駛室始終看起來好像在發出白光。OpenBVE版本中可能會更改。

{{% /notice %}}