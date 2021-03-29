---
title: "マイク入力からサウンドを再生する"
linktitle: "マイク入力からサウンドを再生する"
weight: 2
---

openBVE 1.5.4.0では、マイクまたはライン入力からゲーム内の指定された位置にサウンドを再生する機能が導入されています。

---

{{% command %}}  
**Track.MicSound** *X* ; *Y* ; *ForwardsTolerance* ; *BackwardsTolerance*  
{{% /command %}}

{{% command-arguments %}}  
***X***: サウンドのX位置。  
***Y***: サウンドのY位置。  
***ForwardsTolerance***: 列車がその位置に近づくとき音が聞こえるようになるメートル単位の距離。  
***BackwardsTolerance***: 列車がその位置を通過した後、音が聞こえなくなるメートル単位の距離。  
{{% /command-arguments %}}

__**実装する際の注意**__:

* マイク入力は、デフォルトで**W**に割り当てられている**PLAY_MIC_SOUNDS**キーを使用してアクティブ化する必要があります。
* マイク入力は、カメラ範囲内のすべての**Track.MicSound**音源にルーティングされます。
* 現在、最初に利用可能なopenALマイク入力のみがサポートされています。