---
title: BVE Trainsimとの違い
linktitle: 対BVE Trainsim
weight: 9
---

このページには、ファイルフォーマットに関するopenBVEとBVE Trainsimの間の**互換性のない**相違点、すなわち互換性のない結果でopenBVEで異なって解釈されるBVE Trainsimのために開発されたコンテンツの機能がリストされています。現時点では、そのような非互換性が1つだけ知られています。

このページに記載されているすべての非互換な違いについて、解決方法は同じであることに気をつけてください: BVE Trainsimとの類似性を高めるために、バージョン間で後方互換性のない変更を行うよりも、openBVEに安定した一貫した機能を提供することが重要です。 したがって、このページに記載されているすべての違いに関する情報は永続的なものとなるでしょう。

## ■ Track.Signalコマンド（CSVおよびRWルート）

Track.Signalコマンド（あるいはTrack.Sig）は、CSVルートでデフォルトの日本の信号方式で作成するために使用されます（代替の表記はRWルートで使用されます）。

openBVEでは、Track.Signalコマンドは次の引数を取ります。

{{% command %}}  
**Track.Signal** *Aspects*; *~~Unused~~*; *X*; *Y*; <u>*Yaw*</u>; *Pitch*; *Roll*  
{{% /command %}}

BVE Trainsimでは、Track.Signalコマンドは次の引数を取ります。

{{% command %}}  
**Track.Signal** *Aspects*; *Label*; *X*; *Y*; <u>*Type*</u>  
{{% /command %}}

BVE Trainsimの* Label *パラメータは、openBVEでは機能しないシグナルの説明文です（したがって、このドキュメントでは* Unused *と呼ばれています）。

BVE Trainsimは1、2または3の値を取ることができる* Type *引数を特徴としています。ホーム信号対出発信号。単なる偶然ではあるが、この議論はopenBVEには含まれていなかったが、その後、シグナルヘッドの向きをさらに制御するために* Yaw *、* Pitch *、および* Roll *引数を含める必要性が生じた。その結果、BVE Trainsimの* Type *引数とopenBVEの* Yaw *引数は、互換性がなくなります。 BVE Trainsim用に作成されたルートに* Type *引数が含まれていると、openBVEでは最大3度の偏揺れとして（誤って）解釈されます。通常、この小さな角度では、特にパラメータが使用されないことが多いという点で、目立った違いは生じません。
