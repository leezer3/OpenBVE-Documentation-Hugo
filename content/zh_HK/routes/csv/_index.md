---
title: "**.csv** 路線格式"
linktitle: "CSV 路線"
weight: 1
---

➟ [快速進行瀏覽...]({{< ref "/routes/csv_quick/_index.md" >}}) 

## 目錄

{{% contents %}}

- [1. Overview](#overview)
- [2. Syntax](#syntax)
- [3. Preprocessing](#preprocessing)
- [4. The Options namespace](#options)
- [5. The Route namespace](#route)
- [6. The Train namespace](#train)
- [7. The Structure namespace](#structure)
- [8. The Texture namespace](#texture)
- [9. The Cycle namespace](#cycle)
- [10. The Signal namespace](#signal)
- [11. The Track namespace](#track)
  - [11.1. Rails](#track_rails)
  - [11.2. Geometry](#track_geometry)
  - [11.3. Objects](#track_objects)
  - [11.4. Stations](#track_stations)
  - [11.5. Signalling and speed limits](#track_signalling)
  - [11.6. Safety systems](#track_safety)
  - [11.7. Miscellaneous](#track_misc)

{{% /contents %}}

## <a name="overview"></a>■ 1. 總概

一個CSV格式的路線可以由文本檔案建立成路線。

這個檔案為純文本，並可以用任意 [字符編碼]({{< ref "/information/encodings/_index.md" >}})，但我們建議作者用UTF-8編碼格式。解析數字數據時，使用 [解析方法]({{< ref "/information/numberformats/_index.md" >}})是非常 **寬鬆** 的（特別指出的地方除外），我們推薦這個文件一般來說可以放在 *LegacyContent* 文件夾（或一個內部包含 *Railway* 同 *Train* 目錄的文件夾）下的任何地方。文件名可以隨意，但擴展名(File extension)一定要為 **.csv**。路線文件被從頭到尾逐行解析，每行是由左到右解析。

路線文件由一系列命令組成，這些命令定義了在整個用來導入線路中用到的模型 (Structure)。 還可以定義路線，要使用的默認火車和要使用的背景圖像的其他屬性。 最後，路線文件將包含來自Track名稱空間的指令。 此處，軌道位置（通常以米為單位）用於定義軌道何時彎曲，何時放置樁，何時開始和結束牆體等等。 一般而言，在使用來自任何其他命名空間的指令之後，應使用來自Track命名空間的指令。

這個格式默認了一條遊戲默認的主軌道 (0號軌道), 不可以指定它開始的位置, 都不可以完。 遊戲中其他軌道同不同的是, 它由路線的開始一直延續到路線的終點, 代表著玩家駕駛的列車行駛的軌道。 除此之外, 遊戲中定義的其他軌道都是裝飾, 玩家不能行駛的。 不過可以使用 [跟隨軌道物件 Track Following Object]({{< ref "/routes/xml/trackfollowingobject/_index.md" >}}) 來給 AI 列車在其它軌道上行駛。

可以幾何意義上曲同抬升默認的主軌道, 而其他軌道都是相對於主軌道定義的, 並隨主軌道曲起伏。 除非特別修改定義, 線路中每25米劃分為一個區間, 特定的命令只有在區間蚊的邊界位置 (成25米位置) 才能發揮作用。 物體的放置 (尤其是在彎道上) 成日基於一個坐標是, 它的軸並不隨軌道彎曲, 而是掂掂地指向鄰近的下一個區間。

➟ [可以查閱這個 CSV 格式的快速參考手冊。]
({{< ref "/routes/csv_quick/_index.md" >}})

## <a name="syntax"></a>■ 2. 句法

對於路線文件中每一行, 開頭和結尾的 [空格]({{< ref "/information/whitespaces/_index.md" >}}) 會被忽略。 然後，每行指令都會㩒逗號 (U+002C) 分割。 于是, 每行都會被看作這樣一個格式:

{{% command %}}
*表達式內容<sub>1</sub>*,* 表達式內容<sub>2</sub>*,* 表達式內容<sub>3</sub>*, ..., *表達式內容<sub>n</sub>*
{{% /command %}}

表達式內容主要有以下類別：

##### ● 註釋

遊戲會忽略註釋。以分號(U+003B)開頭的表達式都會被視為註釋。

##### ● 軌道位置同長度

{{% command %}}
*位置* 
{{% /command %}}
一個非負的 [嚴格格式]({{< ref "/information/numberformats/_index.md" >}}) 浮點數，代表一個主軌道位置。隨後的指令都將以此位置作為基準點。

{{% command %}}
*第<sub>1</sub>部分*:*第<sub>2</sub>部分*:...:*第<sub>n</sub>部分* 
{{% /command %}}
是一個配合 Options.UnitOfLength 的更加複雜的距離指定格式, 可用于非公制計量單位。 每一個 * 部分<sub>i</sub>* 都是 [嚴格格式]({{< ref "/information/numberformats/_index.md" >}}) 的浮點數。 *部分<sub>1</sub>* 會比搭返 *是數 <sub>1</sub> *,* 部分<sub>2</sub>* 搭返 * 是數 <sub>2</sub>*, 以此類推, 真正的主軌道位置是所有的和。 這個結果一定是非負的。 各部分被冒號 (U+003A) 分隔。 如果想了解如何設定系數, 請參見 Options.UnitOflength 節。

在任何參數中使用距離的命令中，這個冒號表示法就可以被使用，到時我們會用<font color="green">綠色</font>標示呢種情況。

當 *n* 個單位系數被使用 Options.UnitOflength 定義, 但是使用冒號表示法時輸入的部分卻少了, 咁呢啲系數將會被嚮右匹配, 在左邊的會被忽略。 因此, 幾種表示方法是等傚的: *0:0:2*,*0:2*, 同 *2*.

##### ● 指令

無參數的指令：

{{% command %}}
*指令的名稱*
{{% /command %}}

含有參數的指令：

{{% command %}}
*指令名稱* *參數<sub>1</sub>*;*參數<sub>2</sub>*;*參數<sub>3</sub>*;...;*參數<sub>n</sub>* *指令名稱*(*參數<sub>1</sub>*;*參數<sub>2</sub>*;*參數<sub>3</sub>*;...;*參數<sub>n</sub>*) 
{{% /command %}}

有參數仲有後綴同編號的指令：

{{% command %}}
*指令名稱*(*編號<sub>1</sub>*;*編號<sub>2</sub>*;...;*編號<sub>m</sub>*) *參數<sub>1</sub>*;*參數<sub>2</sub>*;*參數<sub>3</sub>*;...;*參數<sub>n</sub>* *指令名稱*(*編號<sub>1</sub>*;*編號<sub>2</sub>*;...;*編號<sub>m</sub>*).*後綴* *參數<sub>1</sub>*;*參數<sub>2</sub>*;*參數<sub>3</sub>*;...;*參數<sub>n</sub> * *指令名稱*(*編號<sub>1</sub>*;*編號<sub>2</sub>*;...;*編號<sub>m</sub>*).*後綴*(*參數<sub>1</sub>*;*參數<sub>2</sub>*;*參數<sub>3</sub>*;...;*參數<sub>n</sub>*)
{{% /command %}}

規則：

*指令名稱* 是大小寫都可以的。 編號和參數被分號 (U+003B) 隔開。 *指令名稱*、編號和參數都在周圍的空格都是被忽略的, 括號周圍的空格都是被忽略的。

如果要使用編碼, 它必須被成對括號 (U+0028, 鍵盤上面9) 和 (U+0029, 英文半角, 鍵盤0上面嗰個) 括起來。 在使用編碼時至少要提供一個參數和一個 *后缀*。

有兩個使用參數的方法變種, 除了 $ 開頭的預處理指令 ($chr, $rnd, $sub,...) 之外, 可以按照個人喜好二選一。
第 1 種方法: 參數被至少一個空格 (U+0020, 平時用嗰個) 和編碼、指令的大名與及 * 后缀 * 分開。
第 2 種方法: 參數被成對括號 (U+0028, 英文半角在鍵盤9上面嗰個) 和 (U+0029, 在鍵盤0上面嗰個) 括起來。
系第二種方法中, 當使用編碼時就必須使用 * 后缀 *。 在參數周圍的空格都會被忽略。

請注意在有些指令中, 不管是用邊種表示方法, *后缀* 都是必需的。 在接下來的文檔中, 必需的 *后缀* 將被 **加粗**, 對於第一種方法加不加均可的后缀將被使用<font color="gray">灰色</font>表示。

##### **With** 語法

{{% command %}}
With *字首*
{{% /command %}}

All subsequent commands that start with a period (U+002E) are prepended by *Prefix*. For example:

{{% code %}}  
With Route  
.Gauge 1435  
.Timetable 1157_M  
{{% /code %}}

相當於

{{% code %}}  
Route.Gauge 1435  
Route.Timetable 1157_M  
{{% /code %}}

## <a name="preprocessing"></a>■ 3. Preprocessing

在遊戲開始解析線路文件之前, 預處理指令將會被處理定替換。 預処理器會按照正常柯打分析呢啲以 $ 開頭的預処理命令。 $chr、$rnd 和 $sub 指令可以由嵌套, $if、$else 和 $endif 不能出現在另一個指令的括號入面。

{{% warning-nontitle %}}

預處理指令的語法不可以隨意使用, 必須遵循以下面的形式。

{{% /warning-nontitle %}}

---

{{% command %}}
$Include(*文件*)
$Include(*文件*:*主軌道位置偏移量*)
$Include(*文件<sub>1</sub>*; *權值<sub>1</sub>*; *文件<sub>2</sub>*; *權值<sub>2</sub>*; ...)
{{% /command %}}

{{% command-arguments %}}
***文件 <sub>i</sub>***: 要被導入本線路的另一個文件(CSV/RW)。
***權值 <sub>i</sub>***: 一個正浮點數, 表示對應的這個文件被使用的可能性大小。 數越大, 這個文件就越可能被隨機選中。
{{% /command-arguments %}}

該指令按照權值隨機選出一個線路文件, 再將其內容導入本線路中。 因為該文件內容會比不加修改直接在該指令的位置插入, 可能需要照顧吓 with 指令等, 不好畀佢們出現衝突。 如果參數中最後一個文件冇畀出權值, 它會被按1處理。

$include 指令在幾個線路有大量重複內容時很有用, 可以單獨存入另一個文件只重複內容, 然後在主文檔中導入它, 以方便編碼。 這個指令都可以被用來隨機選取線路代碼。 請注意導入的文件中都可以包含 $include 指令來引用更多的文件, 但是應該避免循環引用, 例如 A 導入 B 而 B 又導入 A。 要導入那個文件不應該使用 .csv 作為格式擴展名 (或者用. include 是個方便區分好主意), 不然玩家可能會一不小心從主 菜單損了這個 "不完全的線路文件" 然後發現冇辦法加载 (除非那個文件本身就是一個單獨的路線, 然後本來就想讓玩家加载它)。

如果任何一個 * 文件<sub>i</sub>* 被一個: * 主軌道位置偏移量 * 后缀, 嗰個文件中所有主軌道位置表達式都會被按照這個量 ** 以米做單位 ** 偏移。 例如, $include (stations.include:2000) 會將 stations.include 文件中的所有內容系插入前都向前偏移2000米。 需要注意這些主軌道位置表達式是在所有的預処理命令都被執行完先會畀做偏移處理。 意味着似 "1$rnd (2;8) 00" 這樣的主軌道位置表達式即管在預処理前都不是一個主軌道距離表達式, 但是它的隨機結果照樣會被進行偏移處理。

{{% warning-nontitle %}}

只有OpenBVE1.2.11版以上支持“主軌道位置偏移量”。

{{% /warning-nontitle %}}

---

{{% command %}}  
$Chr(*Ascii編號*)
{{% /command %}}

{{% command-arguments %}}
***ASCII 編碼 ***: 一個在10~13 或20~127 範圍內的數, 代表一個擁有對應 ASCII 碼的字符。
{{% /command-arguments %}}

這個指令會在原位插入一個對應 *ascii 碼* 的字符。 如果想在某個地方放置一個字符卻又不想破壞指令語法結構 (比如企名入面開頭帶空格、帶括號逗號分號等, 如果不咁加入就會被遊戲誤讀), 可以使用這個指令。 有關的字符有:

{{% table %}}

| 編號 | 意思             | 字符 |
| ---- | ------------------- | --------- |
| 10   | 新一行             | *newline* |
| 13   | 新一行             | *newline* |
| 20   | 空格               | *space*   |
| 40   | 開括號 | (         |
| 41   | 閂括號 | )         |
| 44   | 逗號               | ,         |
| 59   | 分號           | ;         |

{{% /table %}}

"$Chr(13)$Chr(10)"代表一次換行。插入$Chr(59)可能基於佢的位置被解釋為註釋開始或指令參數分隔符。

---

{{% command %}}  
$Rnd(*Start*; *End*)  
{{% /command %}}

{{% command-arguments %}}
***最小值 ***: 一個整數, 代表隨機數可以取的最小值。
***最大值 ***: 一個整數, 代表隨機數可以改的最大值。
{{% /command-arguments %}}

這個指令會在原位插入一個位於 *最小值* 和 *最大值* 之間的隨機整數。 可以用這個嚟畀線路添加一些隨機性。

{{% code "*Example for the use of the $Rnd directive:*" %}}  
10$Rnd(3;5)0, Track.FreeObj 0; 1  
{{% /code %}}

{{% code "*Possible outcome from the previous example is exactly __one__ of these lines:*" %}}  
1030, Track.FreeObj 0; 1  
1040, Track.FreeObj 0; 1  
1050, Track.FreeObj 0; 1  
{{% /code %}}

---

{{% command %}}
$Sub(*編號*) = *表達式*
{{% /command %}}

{{% command-arguments %}}
***編號***: 一個非負整數, 代表要儲埋的變量編號。 
***表達式***: 要存進這個變量的數字的值。 
{{% /command-arguments %}}

這個指令只應該單獨出現, 它將會把 * 表達式 * 的值賦給編號為 * 編號 * 的這個變量。 佢不在原位插入任何內容。 可以將一個隨機數存起來然後之後多次使用。 下面關於 $sub (*編號*) 的介紹處有幾個使用實例。

{{% warning %}}

#### 程序實現備註

雖然變量中都可以儲埋非數字的內容, 還是不能把逗號通過 $chr (44) 存返入去然後希望它在使用時會起分隔符的作用。 但是, 可以透過 $chr 啲分號 (59) 存返入去然後將調用時放佢在開頭令一行成為註釋。 不過因為可以使用 $include 和 $if 嚟進行條件判斷, 所以並無必要噉做。

{{% /warning %}}

---

{{% command %}}  
$Sub(*編號*)  
{{% /command %}}

{{% command-arguments %}}
***編號***：一個非負整數，代表要讀出的變量編號。
{{% /command-arguments %}}

這個指令會在原位插入編號為 * 編號 * 的變量的內容。 在讀取前這個變量必須先被賦值。

{{% code "*Example for the use of the $Sub(Index)=Value and $Sub(Index) directives:*" %}}  
$Sub(0) = $Rnd(3; 5)  
1000, Track.FreeObj $Sub(0); 47  
1020, Track.FreeObj $Sub(0); 47  
1040, Track.FreeObj $Sub(0); 47  
{{% /code %}}

在這個例子中, 三個 track.freeobj 指令都使用同樣的隨機數值, 所以三個物體會被擺在同一條隨機的軌道邊。 如果使用三個 $rnd (3;5) 而不是 $sub, 三個物體可能被單獨放在不同的軌道邊

---

{{% command %}}  
$If(*條件*)  
{{% /command %}}

{{% command-arguments %}}
***條件***: 一個數值。 如果佢等於 0, 則代表 **不成立** 的情況。 如果佢不等於 0, 則代表 **成立** 的情況。
{{% /command-arguments %}}

$if (如果...... 那麼) 指令讓遊戲只在這個條件成立, 即為非零值時才解析下面的線路指令。 $if 的後面必須有一個 $endif。 在 $if 和 $endif 之間都可以加個 $else 嚟表示條件是不成立既時候要解析的指令。

---

{{% command %}}  
$Else()  
{{% /command %}}

$Else (否則) 指令只在前面的 $If 的條件是不成立既時候先解析下面的線路指令。

---

{{% command %}}  
$EndIf()  
{{% /command %}}

$EndIf 指令標識前面的 $If 指令的影響範圍到此結束。

{{% code "*Example of $If, $Else and $EndIf*" %}}  
$Sub(1) = 0  
With Track  
$If($Sub(1))  
&nbsp;&nbsp;&nbsp;&nbsp;1020, .FreeObj 0; 1  
&nbsp;&nbsp;&nbsp;&nbsp;1040, .FreeObj 0; 2  
$Else()  
&nbsp;&nbsp;&nbsp;&nbsp;1030, .FreeObj 0; 3  
$EndIf()  
{{% /code %}}

{{% code "*Another example of $If, $Else and $EndIf*" %}}  
With Track  
1050  
$If($Rnd(0;1)), .FreeObj 0; 4, $Else(), .FreeObj 0; 5, $EndIf()  
{{% /code %}}

可以嵌套 $If 指令。 如果將 $If/$Else/$EndIf 擺在不同的幾行度, 可以更清晰地表示張結構並令它更易讀 (例如第一個例子)。

---

**最後**, 當預處理結束, 線路中的所有指令都會被按照軌道位置重新排序。

{{% code "*Example of a partial route file:*" %}}  
1000, Track.FreeObj 0; 23  
1050, Track.RailType 0; 1  
10$Rnd(3;7)0,  Track.Rail 1; 4  
Track.FreeObj 1; 42  
{{% /code %}}

{{% code "*Preprocessing the $Rnd directive (assuming 3 is produced):*" %}}  
1000, Track.FreeObj 0; 23  
1050, Track.RailType 0; 1  
1030, Track.Rail 1; 4  
Track.FreeObj 1; 42  
{{% /code %}}

{{% code "*Sorting by associated track positions:*" %}}  
1000, Track.FreeObj 0; 23  
1030, Track.Rail 1; 4  
Track.FreeObj 1; 42  
1050, Track.RailType 0; 1  
{{% /code %}}

## <a name="options"></a>■ 4. Options 命名空間

這個命名空間入面的指令設置一些基本設置, 並影響其他指令既實際處理效果。 所以應當在開始編寫寫其他指令之前使用這些指令都較只設置先掂。

---

{{% command %}}  
**Options.UnitOfLength** *FactorInMeters<sub>1</sub>*; *FactorInMeters<sub>2</sub>*; *FactorInMeters<sub>3</sub>*; ...; *FactorInMeters<sub>n</sub>*  
{{% /command %}}

{{% command-arguments %}}  
***同米的換算系數 <sub>i</sub>***: 一個浮點數, 表示一個單位等於幾多米。 * 同米的換算系數 1 * 的默認值是 1, 其他的默認值都是0。
{{% /command-arguments %}}

這個指令可以被用來改變其他指令使用的長度單位。 當同形如 * 部分<sub>1</sub>*:* 部分<sub>2</sub>*:...:* 部分<sub>n</sub>* 的主軌道位置一起使用時, * 部分<sub>i</sub>* 會比搭返 * 系數 <sub>i</sub>*, 以此類推, 真正的主軌道位置是所有積的和。 更改了長度單位時, 你都應同時使用 Options.BlockLength 將區間蚊長度也設為相應單位。

換算系數的幾個示例:

{{% table %}}

| 所需單位 | 轉換是數 |
| ------------ | ----------------- |
| 英里         | 1609.344          |
| 引        | 20.1168           |
| 米        | 1                 |
| 市丈         | 0.9144            |
| 英尺         | 0.3048            |

{{% /table %}}

在下面的示例中, 會被 Options.UnitOfLength 影響的指令參數會被用<font color="green">綠色</font>表示。

---

{{% command %}}
**Options.UnitOfSpeed** *與千米每時的換算是數*
{{% /command %}}

{{% command-arguments %}}
***FactorInKmph***同千米每时的換算系數: 一個浮點數, 表示一個單位等於幾多千米每时。 默認值是1。
{{% /command-arguments %}}

這個指令可以被用來改變其他指令使用的速度單位。 換算系數的幾個示例:

{{% table %}}

| 單位    | 換算是數 |
| --------------- | ----------------- |
| 米每秒   | 3.6               |
| 英里每小時      | 1.609344          |
| 千米每小時 | 1                 |

{{% /table %}}

在下面的示例中, 會被 Options.UnitOfSpeed 影響的指令參數會被用<font color="blue">藍色</font>表示。

---

{{% command %}}
**Options.BlockLength** *<font color="green">長度</font>*
{{% /command %}}

{{% command-arguments %}}
***長度***: 一個正浮點數, 表示區間蚊的長度, **默認** 的單位是 **米**。 默認值是25米。
{{% /command-arguments %}}

此指令可以設置隔蚊的長度。 是一個全局設置, 一旦設置, 不可以來回更改。 如果在此指令之前調用了選項. 單位長度, *長度* 將使用選項. 單位長度作為單位。

---

{{% command %}}
**Options.ObjectVisibility** *模式*
{{% /command %}}

{{% command-arguments %}}
***模式***: 遊戲判斷一個物體是否可視採用的算法。 默認值是 0 (原版)。
{{% /command-arguments %}}

▸ *模式* 的選項:

{{% command-arguments %}}
**0**: 原版: 當該物體所在的區間舊已經被玩家通過, 遊戲就認為這個物體不再可見, 都不再加载顯示這個物體。 遊戲不會顯示任何玩家後方的物體。 在朝前睇時不會有任何問題, 但當向後看時所有物體都會消失, 且沒有任何途徑可解決。 自相交的軌道 (例如環綫) 不會畀正確顯示。 該設置會造成不正確且無法解決的視覺效果, 保留且默認採取該設置只是為了兼容一些老線路。 請不好在新線路中採用這個設置。
**1**: 基於軌道: 遊戲仍然會加载列車後方可視範圍內的物體。 是按照軌道位置計算的。 可惜自相交的軌道 (例如環綫) 都是不會俾正確顯示。 推薦添加這個設置。
{{% /command-arguments %}}

---

{{% command %}}
**Options.SectionBehavior** *模式* 
{{% /command %}}

{{% command-arguments %}}
***模式***:track.section 指令應當被如何理解。 默認值是 0 (默認)。
{{% /command-arguments %}}

▸ *模式* 的選項:

{{% command-arguments %}}
**0**: 默認: track.section * 緊狀態 <sub>0</sub>*; * 狀態 <sub>1</sub>*; ...; * 狀態<sub>n</sub>* 中, 任何一個 * 狀態<sub>i</sub>* 都代表當一個閉塞區間的前方有 *i* 個閉塞區間清空時要傳達畀信號機的信號狀態。
**1**: 簡化: track.section * 緊狀態 <sub>0</sub>*; * 狀態 <sub>1</sub>*; ...; * 狀態<sub>n</sub>* 中, 每個閉塞區間的信號狀態都是比佢前面一個閉塞區間的狀態值要高的最小值。
{{% /command-arguments %}}

---

{{% command %}}
**Options.CantBehavior** *模式* 
{{% /command %}}

{{% command-arguments %}}
***模式***:Track.Curve 指令應當被如何理解。 默認值是 0 (忽略符號)
{{% /command-arguments %}}

▸ *模式* 的選項:

{{% command-arguments %}}
**0**: 忽略符號: Track.Curve 中 *cantinmillimeters* 參數是冇符號的, 符號會被忽略, 軌道總是會向彎道中心傾斜嚟提供彎道嚮心力。 軌道不會在直路段斜。
**1**: 保留符號: Track.Curve 中 *cantinmillimeters* 參數是有符號的, 正值會使軌道向彎道中心傾斜, 負值會使軌道向彎道外側傾斜。 軌道會在直路段斜, 正值使軌道右傾, 負值使軌道左傾。
{{% /command-arguments %}}

---

{{% command %}}
**Options.FogBehavior** *模式* 
{{% /command %}}

{{% command-arguments %}}  
***Mode***: The mode determining how the Track.Fog command is processed. The default value is 0 (Block-based).  
{{% /command-arguments %}}

▸ *模式* 的選項:

{{% command-arguments %}}  
**0**: Block-based: Fog color and ranges are interpolated from the beginning of the block where Track.Fog is used with the old settings to the end of the block with the new settings.  
**1**: Interpolated: Fog color and ranges are interpolated between adjacent Track.Fog commands. This behavior mimicks Track.Brightness.  
{{% /command-arguments %}}

---

{{% command %}}
**Options.CompatibleTransparencyMode** *模式* 
{{% /command %}}

{{% command-arguments %}}  
***Mode***: The mode determining how transparencies are processed in BVE2/ BVE4 objects which use a restricted color pallet. This may be used on a per-route basis to override the value set in 'Options'.  
{{% /command-arguments %}}

▸ *模式* 的選項:

{{% command-arguments %}}  
**0**: Off: Colors are matched specifically. If the specified transparent color does not exist within the color pallet, no transparency will be added.  
**1**: On: Fuzzy matching. If the texture uses a restricted color pallet, the transparent color will be clamped to the nearest available color in the pallet.  
{{% /command-arguments %}}

---

{{% command %}}  
**Options.EnableBveTsHacks** *Mode*  
{{% /command %}}

{{% command-arguments %}}  
***Mode***: The mode determining whether various hacks are applied in order to fix BVE2 / BVE4 content. This may be used on a per-route basis to override the value set in 'Options'.  
{{% /command-arguments %}}

▸ *模式* 的選項:

{{% command-arguments %}}  
**0**: Off: Hacks are disabled.  
**1**: On: Hacks are enabled.  
{{% /command-arguments %}}

## <a name="route"></a>■ 5. The Route namespace

Commands from this namespace define general properties of the route.

---

{{% command %}}  
**Route.Comment** *Text*  
{{% /command %}}

{{% command-arguments %}}  
***Text***: The route comments which appear in the route selection dialog.  
{{% /command-arguments %}}

{{% warning-nontitle %}}
如果需要插入換行、逗號之類的字符，必須使用$Chr。
{{% /warning-nontitle %}}

---

{{% command %}}  
**Route.Image** *File*  
{{% /command %}}

{{% command-arguments %}}  
***文件***: 相對於路線文件夾，出現在路線選擇對話框中的圖檔的文件名。
{{% /command-arguments %}}

---

{{% command %}}  
**Route.Timetable** *Text*  
{{% /command %}}

{{% command-arguments %}}  
***Text***：顯示在默認時間表頂部的文字。 
{{% /command-arguments %}}

{{% warning-nontitle %}}
如果需要插入換行、逗號之類的字符，必須使用$Chr。
{{% /warning-nontitle %}}

---

{{% command %}}  
**Route.Change** *模式*  
{{% /command %}}

{{% command-arguments %}}  
***模式***: 列車安全系統啟動的模式。默認值是特定於實現的。
{{% /command-arguments %}}

▸ *模式* 的選項:

{{% command-arguments %}}  
**-1 **：安全系統已 **啟動**，並且已應用了 *服務* 制動器。 
**0**: 安全系統已 **啟動**，並且已應用了 **緊急** 制動器。  
**1**: 安全系統 *未啟動*，並且已應用了 **緊急** 制動器。
{{% /command-arguments %}}

---

{{% command %}}  
**Route.Gauge** *ValueInMillimeters*  
{{% /command %}}

{{% command-arguments %}}  
***ValueInMillimeters***: A floating-point number representing the rail gauge, measured in **millimeters** (0.001 meters). The default value is 1435.  
{{% /command-arguments %}}

{{% note %}}

Train.Gauge 是同 Route.Gauge 一樣

{{% /note %}}

---

{{% command %}}  
**Route.Signal**(*AspectIndex*)<font color="gray">.Set</font> *<font color="blue">Speed</font>*  
{{% /command %}}

{{% command-arguments %}}  
***AspectIndex***: A non-negative integer representing the signal aspect. The aspect 0 corresponds to red.  
***<font color="blue">Speed</font>***: A non-negative floating-point number representing the allowed speed for this aspect, **by default** measured in **kilometers per hour** (km/h).  
{{% /command-arguments %}}

Use this command to associate speed limits to signal aspects. Aspect 0 represents a red signal, higher values represent more permissive aspects. The default values (for the included Japanese signals) are: 

{{% table %}}

| *Index* | Aspect                                                       | Speed       |
| ------- | ------------------------------------------------------------ | ----------- |
| 0       | <font color="#C00000">●</font>                               | 0 km/h      |
| 1       | <font color="#FFC000">●●</font>                              | 25 km/h     |
| 2       | <font color="#FFC000">●</font>                               | 55 km/h     |
| 3       | <font color="#00C000">●</font><font color="#FFC000">●</font> | 75 km/h     |
| 4       | <font color="#00C000">●</font>                               | *無限* |
| 5       | <font color="#00C000">●●</font>                              | *無限* |

{{% /table %}}

---

{{% command %}}  
**Route.RunInterval** *Interval<sub>0</sub>*; *Interval<sub>1</sub>*; ...; *Interval<sub>n-1</sub>*  
{{% /command %}}

{{% command-arguments %}}  
***Interval<sub>i</sub>***: A floating-point number representing the time interval between the player's train's timetable and that of another train to be created, measured in **seconds**. Positive values indicate an earlier train, negative numbers a later train.  
{{% /command-arguments %}}

This command creates one or more preceding or following trains. These other trains are visible, fully operational, and use the same train as the player has. The other trains follow the same schedule as the player does, but are offset in time by *Intervali*. Via the Track.Sta command, you can also define stations where only the player or only the other trains should stop. Follow-up trains only appear once the section they are placed in has been cleared by other trains, but the player's train is introduced regardless of the current signalling section's state. Therefore, you should make sure that other trains have cleared the area where the player's train will appear when the scenario begins.

{{% note %}}

Route.RunInterval 是同 Train.Interval 一樣

{{% /note %}}

---

{{% command %}}  
**Route.AccelerationDueToGravity** *Value*  
{{% /command %}}

{{% command-arguments %}}  
**Value**: A positive floating-point number representing the acceleration due to gravity in **meters per second squared** (m/s²). The default value is 9.80665.  
{{% /command-arguments %}}

---

{{% command %}}  
**Route.Elevation** *<font color="green">高度</font>*  
{{% /command %}}

{{% command-arguments %}}  
***<font color="green">高度 </font>***: 浮點數，代表初始海拔高度，**默認情況下**，以 **米** 為單位。 默認值為0。
{{% /command-arguments %}}

---

{{% command %}}  
**Route.Temperature** *ValueInCelsius*  
{{% /command %}}

{{% command-arguments %}}
***ValueInCelsius***: 代表 **攝氏** 的初始溫度(浮點數)。 預設值為20。 
{{% /command-arguments %}}

---

{{% command %}}  
**Route.Pressure** *ValueInKPa*  
{{% /command %}}

{{% command-arguments %}}  
***ValueInKPa***: A positive floating-point number representing the initial air pressure in **kPa** (1000 Pascal). The default value is 101.325.  
{{% /command-arguments %}}

---

{{% command %}}  
**Route.DisplaySpeed** *Unit; ConversionFactor*  
{{% /command %}}

{{% command-arguments %}}  
***Unit***: The textual units in which speed-related messages are to be displayed.    ***ConversionFactor***: The conversion factor between km/h and your custom unit of speed. For mph, this is 0.621371.  
{{% /command-arguments %}}

This command allows speed related messages (overspeed etc.) to be displayed in a custom unit, for example mph.

---

{{% command %}}  
**Route.LoadingScreen** *圖片*  
{{% /command %}}

{{% command-arguments %}}    
***圖片***：所支援圖片文件的路徑。
{{% /command-arguments %}}

此指令允許將自定圖片設為加載時的背景。

---

{{% command %}}  
**Route.StartTime** *Time*  
{{% /command %}}

{{% command-arguments %}}  
***Time***: The time at which the simulation is to start.  
{{% /command-arguments %}}

This command allows the start time of the simulation to be set.

{{% note %}}

If this is not set or is invalid, the simulation will start at the arrival time set at the first station.

{{% /note %}}

---

{{% command %}}  
**Route.DynamicLight** *Dynamic.XML*  
{{% /command %}}

{{% command-arguments %}}  
***Dynamic.XML***: A path to a Dynamic Lighting definition XML file.  
{{% /command-arguments %}}

This command may be used as an alternative to the *Route.AmbientLight* , *Route.DirectionalLight* and *Route.LightDirection* commands.

It allows the lighting to be varied using a time-based model, and is described fully on the following page:

[Dynamic Lighting]({{< ref "/routes/xml/dynamiclight/_index.md" >}})

---

{{% command %}}  
**Route.AmbientLight** *RedValue*; *GreenValue*; *BlueValue*  
{{% /command %}}

{{% command-arguments %}}  
***RedValue***: An integer ranging from 0 to 255 representing the red component of the ambient light. The default value is 160.  
***GreenValue***: An integer ranging from 0 to 255 representing the green component of the ambient light. The default value is 160.   
***BlueValue***: An integer ranging from 0 to 255 representing the blue component of the ambient light. The default value is 160.  
{{% /command-arguments %}}

This command defines the ambient light color to be used. All polygons in the scene are illuminated by the ambient light regardless of the light direction.

---

{{% command %}}  
**Route.DirectionalLight** *RedValue*; *GreenValue*; *BlueValue*  
{{% /command %}}

{{% command-arguments %}}  
***RedValue***: An integer ranging from 0 to 255 representing the red component of the directional light. The default value is 160.  
***GreenValue***: An integer ranging from 0 to 255 representing the green component of the directional light. The default value is 160.  
***BlueValue***: An integer ranging from 0 to 255 representing the blue component of the directional light. The default value is 160.  
{{% /command-arguments %}}

This command defines the directional light to be used. The polygons in the scene are only fully illuminated by the directional light if the light direction points at the front faces. If pointing at back faces, no light is contributed. *Route.LightDirection* should be set to specify the light direction.

---

{{% command %}}  
**Route.LightDirection** *Theta*; *Phi*  
{{% /command %}}

{{% command-arguments %}}  
***Theta***: A floating-point number representing the angle in **degrees** which controls the pitch of the light direction. The default value is 60.  
***Phi***: A floating-point number representing the angle in **degrees** which controls the planar rotation of the light direction. The default value is about -26.57.  
{{% /command-arguments %}}

This command defines the initial light direction for track position 0. This is the direction the light shines at, meaning the opposite direction the sun is located at. First, *Theta* determines the pitch. A value of 90 represents a downward direction, while a value of -90 represents an upward direction. With those extremes, the value of *Phi* is irrelevant. A value of 0 for *Theta* represents a forward direction originating at the horizon behind. Once the pitch is defined by *Theta*, *Phi* determines the rotation in the plane. A value of 0 does not rotate, a value of 90 rotates the direction to the right and a value of -90 rotates to the left. A backward direction can be both obtained by setting *Theta* and *Phi* to 180 and 0 or to 0 and 180, respectively. Values in-between allow for more precise control of the exact light direction.

![illustration_light_direction](/images/illustration_light_direction.png)

{{% function "*Converting a spherical direction (theta,phi) into a cartesian direction (x,y,z):*" %}}  
x = cos(theta) * sin(phi)  
y = -sin(theta)  
z = cos(theta) * cos(phi)  
{{% /function %}}

{{% function "*Converting a cartesian direction (x,y,z) into a spherical direction (theta,phi) for y²≠1:*" %}}  
theta = -arctan(y/sqrt(x<sup>2</sup>+z<sup>2</sup>))  
phi = arctan(z,x)  
{{% /function %}}

{{% function "*Converting a cartesian direction (x,y,z) into a spherical direction (theta,phi) for y²=1:*" %}}  
theta = -y * pi/2  
phi = 0  
{{% /function %}}

In the formulas above, [*cos(x)*](http://functions.wolfram.com/ElementaryFunctions/Cos/02) represents the cosine, [*sin(x)*](http://functions.wolfram.com/ElementaryFunctions/Sin/02) the sine, [*arctan(x)*](http://functions.wolfram.com/ElementaryFunctions/ArcTan/02) the inverse tangent, [*arctan(x,y)*](http://functions.wolfram.com/ElementaryFunctions/ArcTan2/02) the two-argument inverse tangent and [*sqrt(x)*](http://functions.wolfram.com/ElementaryFunctions/Sqrt/02) the square root. The formulas can be used to convert between spherical and cartesian coordinates if working with either one seems more intuitive than working with the other one. The formulas also serve as the official documentation on how the light direction is mathematically defined (using radians for the trigonometric functions).

---

{{% command %}}  
**Route.InitialViewpoint** *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: An integer defining the initial camera viewpoint mode. The following values are valid:  
*0* : The camera will be placed in the cab. (Default)  
*1* : The camera will be placed in 'Exterior Camera' mode.  
*2* : The camera will be placed in 'Track Camera' mode.  
*3* : The camera will be placed in 'Flyby Camera' mode.  
*4* : The camera will be placed in 'Flyby Zooming Camera' mode.  
{{% /command-arguments %}}

This command allows the route developer to place the initial camera in one of the alternate camera modes.

---

{{% command %}}  
**<font color=#555555>Route.DeveloperID</font>**  
{{% /command %}}

<font color=#555555>這個命令是會比OpenBVE忽略</font>

## <a name="train"></a>■ 6. The Train namespace

Commands from this namespace define route-train associations. 

---

{{% command %}}  
Train.Folder *FolderName*  
Train.File *FolderName*  
{{% /command %}}

{{% command-arguments %}}  
***FolderName***: The folder name of the default train to use on this route.  
{{% /command-arguments %}}

---

{{% command %}}  
**Train.Run**(*RailTypeIndex*)<font color="gray">.Set</font> *RunSoundIndex*   
**Train.Rail**(*RailTypeIndex*)<font color="gray">.Set</font> *RunSoundIndex*  
{{% /command %}}

{{% command-arguments %}}  
***RailTypeIndex***: A non-negative integer representing the rail type as defined via Structure.Rail and used via Track.RailType.  
***RunSoundIndex***: A non-negative integer representing the train's run sound to associate to the rail type.  
{{% /command-arguments %}}

The train developer provides a repertoire of different run sounds. Use this command to associate these run sounds to the rail types you use in your route. In order for the correct run sounds to be played on any of your rail types, you need to coordinate your efforts with the train developer. Please see the page about [standards]({{< ref "/information/standards/_index.md" >}}) for further information.

---

{{% command %}}  
**Train.Flange**(*RailTypeIndex*)<font color="gray">.Set</font> *FlangeSoundIndex*  
{{% /command %}}

{{% command-arguments %}}  
***RailTypeIndex***: A non-negative integer representing the rail type as defined via Structure.Rail and used via Track.RailType.  
***FlangeSoundIndex***: A non-negative integer representing the train's flange sound to associate to the rail type.  
{{% /command-arguments %}}

The train developer provides a repertoire of different flange sounds. Use this command to associate these flange sounds to the rail types you use in your route. In order for the correct flange sounds to be played on any of your rail types, you need to coordinate your efforts with the train developer. Please see the page about [standards]({{< ref "/information/standards/_index.md" >}}) for further information.

---

{{% command %}}  
**Train.Timetable**(*TimetableIndex*)**.Day**<font color="gray">.Load</font> FileName  
{{% /command %}}

{{% command-arguments %}}  
***TimetableIndex***: A non-negative integer representing the timetable index.  
***FileName***: The file name for the daytime version of the timetable, relative to the train's folder (1<sup>st</sup> choice), or relative to the **Object** folder (2<sup>nd</sup> choice).  
{{% /command-arguments %}}

Use this command to load daytime versions of the timetable. Which timetable index to show starting with a particular station can be set in Track.Sta commands.

---

{{% command %}}  
**Train.Timetable**(*TimetableIndex*)**.Night**<font color="gray">.Load</font> FileName  
{{% /command %}}

{{% command-arguments %}}  
***TimetableIndex***: A non-negative integer representing the timetable index.  
***FileName***: The file name for the daytime version of the timetable, relative to the train's folder (1<sup>st</sup> choice), or relative to the **Object** folder (2<sup>nd</sup> choice).  
{{% /command-arguments %}}

Use this command to load nighttime versions of the timetable. Which timetable index to show starting with a particular station can be set in Track.Sta commands.

---

{{% command %}}  
**Train.Gauge** *ValueInMillimeters*  
{{% /command %}}

{{% command-arguments %}}  
***ValueInMillimeters***: A floating-point number representing the rail gauge, measured in **millimeters** (0.001 meters). The default value is 1435.  
{{% /command-arguments %}}

{{% note %}}

Train.Gauge 是同 Route.Gauge 一樣

{{% /note %}}

---

{{% command %}}  
**Train.Interval** *Interval<sub>0</sub>*; *Interval<sub>1</sub>*; ...; *Interval<sub>n-1</sub>*  
{{% /command %}}

{{% command-arguments %}}  
***Interval<sub>i</sub>***: A floating-point number representing the time interval between the player's train and the preceding train, measured in **seconds**. The default value is 0.  
{{% /command-arguments %}}

{{% note %}}

Train.Interval 和 Route.RunInterval 是一樣的

{{% /note %}}

---

{{% command %}}  
**Train.Velocity** *<font color="blue">Speed</font>*  
{{% /command %}}

{{% command-arguments %}}  
***<font color="blue">Speed</font>***: A positive floating-point number representing the maximum speed the preceding trains may travel at, **by default** measured in **kilometers per hour**, or 0 for infinite speed. The default value is 0.  
{{% /command-arguments %}}

This command defines the maximum speed limit the preceding trains may travel at. The actual speed limit may be reduced by Track.Limit commands. The player's train is unaffected by this setting and may travel up to the limits defined by Track.Limit.

---

{{% command %}}  
**<font color=#555555>Train.Acceleration</font>**  
{{% /command %}}

<font color=#555555>這個命令是會比OpenBVE忽略</font>

---

{{% command %}}  
**<font color=#555555>Train.Station</font>**  
{{% /command %}}

<font color=#555555>這個命令是會被OpenBVE忽略</font>

## <a name="structure"></a>■ 7. The Structure namespace

The commands in the Structure namespace define which objects to use in other commands. Generally, commands like Track.Rail, Track.FreeObj and so on create objects referenced by a *StructureIndex*. This *StructureIndex* is specific to that command, so you can define a set of objects specific to Track.Rail, Track.FreeObj and so on.

The general syntax for commands in the Structure namespace is:

{{% command %}}  
**Structure.Command**(_StructureIndex_)<font color="gray">.Load</font> *FileName*  
{{% /command %}}

*StructureIndex* is a non-negative integer. *FileName* is the object file to load, relative to the **Object** folder. *Command* is any of the following commands:

{{% table %}}

| *Command*: | Remarks                                                      |
| ---------- | ------------------------------------------------------------ |
| Ground     | Defines objects for Cycle.Ground and Track.Ground.           |
| Rail       | Defines objects for Track.Rail, Track.RailStart and Track.RailType. |
| WallL      | Defines left objects for Track.Wall.                         |
| WallR      | Defines right objects for Track.Wall.                        |
| DikeL      | Defines left objects for Track.Dike.                         |
| DikeR      | Defines right objects for Track.Dike.                        |
| FormL      | Defines left platforms edges for Track.Form.                 |
| FormR      | Defines right platforms edges for Track.Form.                |
| FormCL     | Defines transformable left platforms for Track.Form. <font color="red">No ANIMATED objects supported.</font> |
| FormCR     | Defines transformable right platforms for Track.Form. <font color="red">No ANIMATED objects supported.</font> |
| RoofL      | Defines left roof edges for Track.Form.                      |
| RoofR      | Defines right roof edges for Track.Form.                     |
| RoofCL     | Defines transformable left roofs for Track.Form. <font color="red">No ANIMATED objects supported.</font> |
| RoofCR     | Defines transformable right roofs for Track.Form. <font color="red">No ANIMATED objects supported.</font> |
| CrackL     | Defines transformable left objects for Track.Crack. <font color="red">No ANIMATED objects supported.</font> |
| CrackR     | Defines transformable right objects for Track.Crack. <font color="red">No ANIMATED objects supported.</font> |
| FreeObj    | 為Track.FreeObj定義物件。                           |
| Beacon     | Defines objects for Track.Beacon.                            |
| 天氣     | Defines objects for weather generated using Track.Rain and Track.Snow. |
| DynamicLight     | Defines dynamic lighting sets. |

{{% /table %}}

Generally, supported objects are B3D, CSV, X and ANIMATED. However, the FormCL, FormCR, RoofCL, RoofCR, CrackL and CrackR commands only accept B3D, CSV and X objects.

➟ [More information about forms, roofs and cracks...]({{< ref "/routes/formroofcrack/_index.md" >}})

Additionally, there is the Structure.Pole command, which has a slightly different syntax:

{{% command %}}  
**Structure.Pole**(_NumberOfAdditionalRails_; _PoleStructureIndex_)<font color="gray">.Load</font> *FileName*  
{{% /command %}}

{{% command-arguments %}}  
***NumberOfAdditionalRails***: An non-negative integer representing the number of additional rails covered by the pole. 0 creates a pole for one rail, 1 for two rails, etc.  
***PoleStructureIndex***: A non-negative integer representing the pole structure index.  
***FileName***: The object file to load, relative to the **Object** folder.  
{{% /command-arguments %}}

Please note that all objects but the FreeObj are inserted at the beginning of a block and should thus extend from 0 to *BlockLength* (by default 25m) on the z-axis. For further information on usage, see the respective commands from the Track namespace.

## <a name="texture"></a>■ 8. The Texture namespace

Commands from this namespace define which background images to use and how they are aligned.

![illustration_background](/images/illustration_background.png)

The background image is displayed as a cylindric wall around the camera whose start (viewed from above) is 60 degrees to the left of the initial forward direction (at the 10 o'clock position). From there, the background image wraps clock-wise around the cylinder with a repetition count specified via Texture.Background(*BackgroundTextureIndex*).X, which by default creates 6 repetitions in a full circle.

The upper 3/4 of the image is displayed above the horizon, while the lower 1/4 is displayed below the horizon. Via Texture.Background(*BackgroundTextureIndex*).Aspect, you can choose whether to have a fixed cylinder height or to preserve the aspect ratio of the texture. If the image should have a fixed height, the cylinder has a height of 1/2 its radius, which corresponds to about 20 degree inclination to the top of the image, and about -7 degrees to the bottom of the image. If the aspect ratio of the image is preserved, this takes not only the width and height of the image into account, but also the repetition count.

Regardless of the repetition count you chose, you should make sure that the left and right edges of the textures fit seamlessly together. Please also take into account that top and bottom caps are created which sample from the top and bottom 10% of the image. You should avoid mountain peaks and similar extremes in the top 10% of the image in order for such extremes to not leak into the top cap.

The image loaded into Texture.Background(0) is displayed at the beginning of the route, unless a Track.Back command at the beginning of the route requests a different image.

As an alternative ***Dynamic or Object*** based backgrounds may be used. The implementation of these is described upon this page:

[Dynamic & Object Based Backgrounds]({{< ref "/routes/xml/dynamicbackground/_index.md" >}})

---

{{% command %}}  
**Texture.Background**(_BackgroundTextureIndex_)<font color="gray">.Load</font> *FileName*  
{{% /command %}}

{{% command-arguments %}}  
***FileName***: The texture file to load, relative to the **Object** folder.  
{{% /command-arguments %}}

This command loads a background image to be later used by Track.Back.

{{% note %}}

If a dynamic or object based background is to be used, this must instead point to the appropriate XML file.

{{% /note%}}

---

{{% command %}}  
**Texture.Background**(_BackgroundTextureIndex_)**.X** *RepetitionCount*  
{{% /command %}}

{{% command-arguments %}}  
***RepetitionCount***: The number of times the background image is repeated in a full circle. The default value is 6.  
{{% /command-arguments %}}

{{% note %}}

Ignored if using a dynamic or object based background.

{{% /note %}}

---

{{% command %}}  
**Texture.Background**(_BackgroundTextureIndex_)**.Aspect** *Mode*  
{{% /command %}}

{{% command-arguments %}}  
***Mode***: The mode of aspect ratio handling to use. The default value is 0 (fixed).  
{{% /command-arguments %}}

▸ Options for *Mode*:

{{% command-arguments %}}  
**0**: Fixed: Use a fixed height for the cylinder.  
**1**: Aspect: Preserve the aspect ratio of the image.  
{{% /command-arguments %}}

{{% note %}}

Ignored if using a dynamic or object based background.

{{% /note %}}

## <a name="cycle"></a>■ 9. The Cycle namespace

{{% command %}}  
**Cycle.Ground(_GroundStructureIndex_)<font color="gray">.Params</font> _GroundStructureIndex<sub>0</sub>_; _GroundStructureIndex<sub>1</sub>_; _GroundStructureIndex<sub>2</sub>_; ...; _GroundStructureIndex<sub>n-1</sub>_**  
{{% /command %}}

{{% command-arguments %}}  
***GroundStructureIndex***: A non-negative integer indicating the ground structure index for which a cycle is to be defined.  
***GroundStructureIndex<sub>i</sub>***: A non-negative integer indicating a ground structure that has been previously loaded via Structure.Ground.  
{{% /command-arguments %}}

When usually using Track.Ground(*GroundStructureIndex*), the same ground structure object will be repeatedly placed in every block. Via Cycle.Ground, you can override this behavior and automatically cycle through a series of different objects when using Track.Ground(*GroundStructureIndex*). The cycle repeats indefinitely, where *GroundStructureIndex0* starts at track position 0. Technically, the *i* in *GroundStructureIndex<sub>i</sub>* chosen for a particular track position *p* is `Mod[p / BlockLength, n]`.

{{% command %}}  
**Cycle.Rail(_RailStructureIndex_)<font color="gray">.Params</font> _RailStructureIndex<sub>0</sub>_; _RailStructureIndex<sub>1</sub>_; _RailStructureIndex<sub>2</sub>_; ...; _RailStructureIndex<sub>n-1</sub>_**  
{{% /command %}}

{{% command-arguments %}}  
***RailStructureIndex***: A non-negative integer indicating the rail structure index for which a cycle is to be defined.  
***RailStructureIndex<sub>i</sub>***: A non-negative integer indicating a rail structure that has been previously loaded via Structure.Rail.  
{{% /command-arguments %}}

Consider the following definition:

{{% code %}}  
With Structure  
.Ground(0)  grass.csv  
.Ground(1) river.csv  
.Ground(2) asphalt.csv  
{{% /code %}}

The following two codes will produce the same output:

{{% code %}}  
With Track  
0, .Ground 0  
25, .Ground 1  
50, .Ground 2  
75, .Ground 0  
100, .Ground 1  
125, .Ground 2  
; and so on...  
{{% /code %}}

{{% code "&nbsp;" %}}  
With Cycle  
.Ground(0) 0; 1; 2  
With Track  
0, .Ground 0  
{{% /code %}}

## <a name="signal"></a>■ 10. The Signal namespace

Commands from this namespace define custom signals.

---

{{% command %}}  
__Signal(__*SignalIndex*__)__<font color="gray">.Load</font> *AnimatedObjectFile*  
{{% /command %}}

{{% command-arguments %}}  
***SignalIndex***: A non-negative integer representing the signal index.  
***AnimatedObjectFile***: A reference to an animated object file, relative to the **Object** folder.  
{{% /command-arguments %}}

Use this command to load signals directly from animated objects. The *SignalIndex* can be later referenced in Track.SigF commands to place the signal.

---

{{% command %}}  
__Signal(__*SignalIndex*__)__<font color="gray">.Load</font> *SignalFileWithoutExtension*; *GlowFileWithoutExtension*  
{{% /command %}}

{{% command-arguments %}}  
***SignalIndex***: A non-negative integer representing the signal index.  
***SignalFileWithoutExtension***: A reference to a B3D/CSV/X object file representing the signal, relative to the **Object** folder, but without the file extension. **Is required to be specified.**  
***GlowFileWithoutExtension***: An optional reference to a B3D/CSV/X object file representing the distance glow, relative to the **Object** folder, but without the file extension.  
{{% /command-arguments %}}

Use this command to load signals from a series of individual textures applied onto a common object. openBVE looks for X, CSV and B3D objects in this exact order. Textures are required to have the same name as the signal or glow, plus a non-negative aspect index, plus a file extension for textures. The *SignalIndex* can be later referenced in Track.SigF commands to place the signal.

For the *SignalFileWithoutExtension*, there should be the following files present (example):

_SignalFileWithoutExtension_**.x**  
_SignalFileWithoutExtension_**<font color="red">0</font>.bmp**  
_SignalFileWithoutExtension_**<font color="red">1</font>.bmp**  
_SignalFileWithoutExtension_**<font color="red">2</font>.bmp**  
_SignalFileWithoutExtension_**<font color="red">n</font>.bmp**

The aspect indices from 0 through *n* represent successively more permissive aspects, where 0 is red. The built-in signals, for example, use the indices 0 (<font color="#C00000">●</font>), 1 (<font color="#FFC000">●●</font>), 2 (<font color="#FFC000">●</font>), 3 (<font color="#00C000">●</font><font color="#FFC000">●</font>), 4 (<font color="#00C000">●</font>) and 5 (<font color="#00C000">●●</font>). You can use as many as required.

All faces in the object will be applied the currently active aspect texture. This means that you cannot use any other texture in the object, but still have to assign texture coordinates appropriately. For the glow object, the above rules also apply. The glow object is usually a rectangle placed clearly in front of the signal, although you can also use different shapes.

The glow textures deserve special attention. All glow textures are pre-processed in the following way:

{{% table %}}

| A                                                       | B                                                       | C                                                       | D                                                       | E                                                       | F                                                       |
| ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- |
| ![illustration_glow_1](/images/illustration_glow_1.png) | ![illustration_glow_2](/images/illustration_glow_2.png) | ![illustration_glow_3](/images/illustration_glow_3.png) | ![illustration_glow_4](/images/illustration_glow_4.png) | ![illustration_glow_5](/images/illustration_glow_5.png) | ![illustration_glow_6](/images/illustration_glow_6.png) |

{{% /table %}}

The texture you start with should have a sharp shape, usually oval. The shape should be fully saturated in the core and blend into pure white at its outer rim. The surroundings of the shape can be either pure black (A) or pure white (B).

When openBVE loads the glow texture, it will replace all purely black pixels with purely white pixels, thus arriving at (B). From there, the image is inverted \(C), then hue-shifted by 180 degrees (D). Compared to (B), this has the overall effect of inverting the lightness of the image, i.e. fully saturated pixels will be left unchanged (e.g. the core), while bright pixels (such as the outer rim of the shape) will become dark, and vice versa. Then, the image is gamma-corrected to further darken the dark parts (E), and finally, the image is blurred slightly (F).

The resulting texture is always additively blended. This means that instead of directly drawing the texture onto the screen, the pixels of the texture are added to the screen pixels. Here, adding black (0) does not change the screen pixels, while adding a fully satured color channel (1) will result in a fully satured color channel, e.g. adding white produces white. Keep in mind that when designing the textures, you will have to follow the inverse rules, e.g. design the image as depicted in (A) or (B), while having in mind how it will be processed afterward.

## <a name="track"></a>■ 11. The Track namespace

Commands from this namespace define the track layout. Commands from this namespace should appear after commands from any of the other namespaces, and they usually form the largest part of the route file.

{{% notice %}}

#### Use of track positions

All commands from the Track namespace need to be associated to track positions. Once a track position has been defined, all subsequent commands are associated to this track position until a new track position is defined. If you do not explicitly state a track position before the first command of the Track namespace is used, 0 will be assumed. While you do not need to use track positions in ascending order, series of commands which are associated the same track position will be sorted into ascending order once the file is loaded. While track positions can be any non-negative floating-point number, many commands in the Track namespace are only to be applied at the beginning of a block, which is 25m by default. For the default situation, this means that some commands are only to be used at track positions 0, 25, 50, 75, 100, 125 and so on. All commands for which this restriction applies are marked as such.

{{% /notice %}}

##### <a name="track_rails"></a>● 11.1. Rails

---

{{% command %}}  
**Track.RailStart** *RailIndex*; *<font color="green">X</font>*; *<font color="green">Y</font>*; *RailType*  
{{% /command %}}

{{% command-arguments %}}  
***RailIndex***: A positive integer (**>=1**) indicating which rail index to use.  
***<font color="green">X</font>***: A floating-point number representing the horizontal distance from the player's rail, **by default** measured in **meters**. Negative values indicate left, positive ones right.  
***<font color="green">Y</font>***: A floating-point number representing the vertical distance from the player's rail, **by default** measured in **meters**. Negative values indicate below, positive ones above.  
***RailType***: A non-negative integer referencing the rail type to use as defined by either a Structure.Rail or a Structure.Cycle command.  
{{% /command-arguments %}}

This command starts a new rail represented by the index *RailIndex*. Upon the point where this command is used, a rail of the same *RailIndex* must either not have been used so far in the route, or must have been ended via a Track.RailEnd command. If a rail of the same *RailIndex* was already used in the route, the default values of *X*, *Y* and *RailType* are the values last used by that rail, otherwise 0. If the rail is to be updated, use the Track.Rail command. If it is to be ended, use the Track.RailEnd command. You can end a rail of a given *RailIndex* and start a new rail of the same *RailIndex* at the same track position provided that the old rail is first ended and the new rail started afterward. For every block, a structure, determined by *RailType*, is automatically placed.

{{% warning-nontitle %}}

This command can only be used at the beginning of a block.

{{% /warning-nontitle %}}

---

{{% command %}}  
**Track.Rail** *RailIndex*; *<font color="green">X</font>*; *<font color="green">Y</font>*; *RailType*  
{{% /command %}}

{{% command-arguments %}}  
***RailIndex***: A positive integer (**>=1**) indicating which rail index to use.  
***<font color="green">X</font>***: A floating-point number representing the horizontal distance from the player's rail, **by default** measured in **meters**. Negative values indicate left, positive ones right.  
***<font color="green">Y</font>***: A floating-point number representing the vertical distance from the player's rail, **by default** measured in **meters**. Negative values indicate below, positive ones above.  
***RailType***: A non-negative integer referencing the rail type to use as defined by either a Structure.Rail or a Structure.Cycle command.  
{{% /command-arguments %}}

This command starts a new rail or updates an existing rail. The rail is represented by the index *RailIndex*. If a rail of the same *RailIndex* was already used in the route, the default values of *X*, *Y* and *RailType* are the values last used by that rail, otherwise 0. If the rail is to be ended, use the Track.RailEnd command. You can end a rail of a given *RailIndex* and start a new rail of the same *RailIndex* at the same track position provided that the old rail is first ended and the new rail started afterward. In each block, the *X* and *Y* values are repeated if a Track.Rail command is not used for that block. As a consequence, updating the *X* or *Y* values affects the layout of the rail from the preceding block only. Changing the *RailType* will affect the rail from the point on where this command is used. If this command is used multiple times on the same track position for the same rail, then the first instance of the command takes effect, while subsequent ones are ignored.  

{{% warning-nontitle %}}

This command can only be used at the beginning of a block.

{{% /warning-nontitle %}}

{{% warning-nontitle %}}

Using a RailIndex value of 0 is not valid for this command: [Errata Note](https://github.com/leezer3/OpenBVE/wiki/Errata#rail-and-railend-commands-with-an-index-of-zero)

{{% /warning-nontitle %}}

{{% notice %}}

#### Track.RailStart vs. Track.Rail

If you want to start a new rail, you can either use Track.RailStart or Track.Rail. When using Track.RailStart, you provide markup that a new rail is in fact to be started, which is invalid if the rail already exists. Using an explicit Track.RailStart will protect you from using a *RailIndex* which is already in use, in which case an error message is generated. 

{{% /notice %}}

---

{{% command %}}  
**Track.RailType** *RailIndex*; *RailType*  
{{% /command %}} 

{{% command-arguments %}}  
***RailIndex***: A non-negative integer indicating which rail index to change. The player's rail can be referred to with index **0**. The default value is 0.  
***RailType***: A non-negative integer referencing the rail type to use as defined by either a Structure.Rail or a Structure.Cycle command. The default value is 0.  
{{% /command-arguments %}}

This command changes the rail type for an existing rail, represented by *RailIndex*. The rail must have been started with a Track.RailStart or Track.Rail command and must not have been ended by a Track.RailEnd command. Changing the *RailType* will affect the rail from the point on where this command is used.

{{% warning-nontitle %}}

This command can only be used at the beginning of a block.

{{% /warning-nontitle %}}    

---

{{% command %}}  
**Track.RailEnd** *RailIndex*; *<font color="green">X</font>*; *<font color="green">Y</font>*  
{{% /command %}}

{{% command-arguments %}}  
***RailIndex***: A positive integer (>=1) indicating which rail index to use.  
***<font color="green">X</font>***: A floating-point number representing the horizontal distance from the player's rail, **by default** measured in **meters**. Negative values indicate left, positive ones right.  
***<font color="green">Y</font>***: A floating-point number representing the vertical distance from the player's rail, **by default** measured in **meters**. Negative values indicate below, positive ones above.  
{{% /command-arguments %}}

This command ends an existing rail, represented by the index *RailIndex*. The default values of *X* and *Y* are the ones last used by the rail. Once this command is used for a specific *RailIndex*, the corresponding rail is considered to be non-existing afterward.

{{% warning-nontitle %}}

This command can only be used at the beginning of a block.

{{% /warning-nontitle %}}

{{% warning-nontitle %}}

Using a RailIndex value of 0 is not valid for this command: [Errata Note](https://github.com/leezer3/OpenBVE/wiki/Errata#rail-and-railend-commands-with-an-index-of-zero)

{{% /warning-nontitle %}} 

{{% code "*Example of Track.RailStart, Track.Rail, Track.RailType and Track.RailEnd commands*" %}}  
With Track  
1000, .RailStart 1; 3.8; 0.0; 0  
1025, .RailType 1; 1  
1050, .Rail 1; 1.9; 0.0; 0  
1075, .RailEnd 1  
{{% /code %}}

In the preceding example, rail 1 starts with an x-value of 3.8 and bears a rail index which corresponds to an object intended to depict a straight rail. The rail keeps the x-value of 3.8 at track position 1025, where the rail type is changed to correspond to an object intended to depict an s-shaped curve. At track position 1050, the rail is redefined to have an x-value of 1.9, after which the rail is straight again until 1075, where it is ended, still having an x-value of 1.9.

---

{{% command %}}  
**Track.Accuracy** *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: A non-negative floating-point number representing the accuracy of the track. The default value is 2.  
{{% /command-arguments %}}

This command sets the accuracy of the track from this point on. Values should be in the range from 0 to 4, where 0 means perfect accuracy (no inaccuracy at all), 1 means very good accuracy (high speed lines), 2 means good accuracy, 3 means mediocre accuracy, and 4 means poor accuracy. Intermediate values are also possible. Currently, values below 0 are clamped at 0, and values above 4 are clamped at 4.

---

{{% command %}}  
**Track.Adhesion** *Rate*  
{{% /command %}}

{{% command-arguments %}}  
***Rate***: A non-negative floating-point number measured in percent representing the adhesion of the track. The default value is 100.  
{{% /command-arguments %}}

This command sets the adhesion of the track from this point on. As a reference, the value of 135 represents dry conditions, 85 represents frost and 50 represents snowy conditions. With a value of 0, the train will not be able to move at all. 

---

{{% command %}}  
**Track.Rain** *Intensity*; *WeatherType* 
{{% /command %}}

{{% command-arguments %}}  
***Intensity***: A non-negative floating-point number measured in percent representing the intensity of the current rainfall. The default value is 0.  
***WeatherType***: A non-negative integer referencing the weather type to use as defined by Structure.Weather from this point onwards.
{{% /command-arguments %}}

This command sets the intensity of the current rainfall, and the weather object to be shown.

{{% warning-nontitle %}}

It is also possible to set the rain intensity using the legacy BVE4 beacon based method. If these commands are present in the route, all Rain commands will be ignored.

{{% /warning-nontitle %}} 

---

{{% command %}}  
**Track.Snow** *Intensity*; *WeatherType* 
{{% /command %}}

{{% command-arguments %}}  
***Intensity***: A non-negative floating-point number measured in percent representing the intensity of the current snowfall. The default value is 0.  
***WeatherType***: A non-negative integer referencing the weather type to use as defined by Structure.Weather from this point onwards.
{{% /command-arguments %}}

This command sets the intensity of the current snowfall, and the weather object to be shown.

{{% notice %}}

#### Combining rain and snow

Rain and snow may be combined, and the simulation will show an appropriate random raindrop or snowflake on the windscreen, based upon the following probabilities:

The base probability for a drop / flake to appear is the greater of the rainfall and snowfall intensities.<br>
The snowfall intensity is then used as the probability that this is a snowflake. <br>
For example, with rainfall at 50 and snowfall at 40, there is a 50% chance for a drop to be added to the windscreen on each tick. <br>
Of this, there is a 40% chance that this will be a snowflake.

{{% /notice %}}

##### <a name="track_geometry"></a>● 11.2. Geometry

---

{{% command %}}  
**Track.Pitch** *Rate*  
{{% /command %}}

{{% command-arguments %}}  
***Rate***: A floating-point number measured in per thousands representing the pitch of the track. The default value is 0.  
{{% /command-arguments %}}

This command defines the pitch of all rails from this point on. Negative values indicate a downward gradient, positive ones an upward gradient. The value of 0 represents a level track. Rate can be calculated from a length difference X and a height difference Y in the following way:

{{% function "*Rate expressed through X and Y:*" %}}  
_Rate = 1000 * Y / X_  
{{% /function %}}

{{% warning-nontitle %}}

This command can only be used at the beginning of a block.

{{% /warning-nontitle %}}    

---

{{% command %}}  
**Track.Curve** *<font color=green>Radius</font>*; *CantInMillimeters*  
{{% /command %}}

{{% command-arguments %}}  
***<font color=green>Radius</font>***: A floating-point number representing the radius of the curve, **by default** measured in **meters**. The default value is 0.  
***CantInMillimeters***: A floating-point number which represents the superelevation of a banked curve, **always** measured in **millimeters** (0.001 meters). The default value is 0. See also Options.CantBehavior.  
{{% /command-arguments %}}

This command defines the radius of the curve for the player's rail from this point on. Negative values for *Radius* indicate a curve to the left, positive ones to the right. The value of 0 represents straight track. The *CantInMillimeters* parameter defines the cant (superelevation) in millimeters. If Options.CantBehavior is 0 (default), only the absolute value of *CantInMillimeters* is considered, and the superelevation is always towards the curve center (inward). Also, cant cannot be applied on straight track. If Options.CantBehavior is 1, *CantInMillimeters* is signed, i.e. negative values bank outward and positive ones inward on curved track. Also, cant can be applied on straight track, where negative values bank toward the left and positive ones toward the right.

{{% warning-nontitle %}}

This command can only be used at the beginning of a block.

{{% /warning-nontitle %}} 

---

{{% command %}}  
**Track.Turn** *Ratio*  
{{% /command %}}

{{% command-arguments %}}  
***Ratio***: A floating-point number representing a turn. The default value is 0.  
{{% /command-arguments %}}

This command creates a point-based turn at the point of insertion. *Ratio* indicates the ratio between the length difference *Z* and the horizontal offset *X* in the following way:

{{% function %}}  
*Ratio = X / Z*  
{{% /function %}}

A negative ratio represents a turn to the left, a positive one to the right. The value of 0 represents a straight track.

{{% warning-nontitle %}}

This command can only be used at the beginning of a block.

{{% /warning-nontitle %}}

{{% warning-nontitle %}}

This command is deprecated - use Track.Curve instead.

{{% /warning-nontitle %}}    

---

{{% command %}}  
**Track.Height** *<font color=green>Y</font>*  
{{% /command %}}

{{% command-arguments %}}  
***<font color=green>Y</font>***: A floating-point number representing the height of the player's rail, **by default** measured in **meters**.  
{{% /command-arguments %}}

This command defines the height of the player's rail above the ground at the point of insertion. It influences the placement of the ground objects defined via Structure.Ground and changed via Track.Ground. The height is interpolated between adjacent Track.Height commands. For example, the following two codes produce equivalent results:

{{% code "*Example of a Track.Height command interpolated at 25m boundaries:*" %}}  
1000, Track.Height 1  
1075, Track.Height 4  
{{% /code %}}

{{% code "*Example of Track.Height explicitly set each 25m to produce the same result:*" %}}  
1000, Track.Height 1  
1025, Track.Height 2  
1050, Track.Height 3  
1075, Track.Height 4  
{{% /code %}}

{{% warning-nontitle %}}

This command can only be used at the beginning of a block.

{{% /warning-nontitle %}}

##### <a name="track_objects"></a>● 11.3. Objects

------

{{% command %}}  
**Track.FreeObj** *RailIndex*; *FreeObjStructureIndex*; *X*; *Y*; *Yaw*; *Pitch*; *Roll*  
{{% /command %}}

{{% command-arguments %}}  
***RailIndex***: A non-negative integer representing the rail on which to place the object. The default value is 0.   
***FreeObjStructureIndex***: A non-negative integer representing the object to place as defined via Structure.FreeObj. The default value is 0.  
***<font color="green">X</font>***: The x-offset from the (straight) rail, **by default** measured in **meters**. Negative values represent the left, positive ones the right. The default value is 0.  
***<font color="green">Y</font>***: The y-offset from the (straight) rail, **by default** measured in **meters**. Negative values represent below the top of the rails, positive ones above. The default value is 0.  
***Yaw***: The angle in degrees by which the object is rotated in the XZ-plane in clock-wise order when viewed from above. The default value is 0.  
***Pitch***: The angle in degrees by which the object is rotated in the YZ-plane in clock-wise order when viewed from the left. The default value is 0.  
***Roll***: The angle in degrees by which the object is rotated in the XY-plane in clock-wise order when viewed from behind. The default value is 0.  
{{% /command-arguments %}}

This places a "free" object a single time on a specified rail. The object must have been loaded via Structure.FreeObj(*FreeObjStructureIndex*) prior to using this command. 

------

{{% command %}}  
**Track.Wall** *RailIndex*; *Direction*; *WallStructureIndex*  
{{% /command %}}

{{% command-arguments %}}  
***RailIndex***: A non-negative integer representing the rail on which to start or update the wall. The default value is 0.  
***Direction***: An integer indicating which wall to use as described below.  
***WallStructureIndex***: A non-negative integer representing the object to place as defined via Structure.WallL and Structure.WallR. The default value is 0.  
{{% /command-arguments %}}

▸ Options for *Direction*:

{{% command-arguments %}}  
**-1**: The WallL object (left wall) is used.  
**0**: Both the WallL and WallR objects are used.  
**1**: The WallR object (right wall) is used.  
{{% /command-arguments %}}

This starts or updates a wall on a specified rail. The object must have been loaded via Structure.WallL(*WallObjectIndex*) or Structure.WallR(*WallObjectIndex*) prior to using this command. The walls are placed at the beginning of every block until a corresponding Track.WallEnd ends the wall for this rail. Please note that walls are resurrected if a rail is ended via Track.RailEnd and then started again via Track.RailStart or Track.Rail unless the wall was also ended via Track.WallEnd.

{{% warning-nontitle %}}

This command can only be used at the beginning of a block.

{{% /warning-nontitle %}}

------

{{% command %}}  
**Track.WallEnd** *RailIndex*  
{{% /command %}}

{{% command-arguments %}}  
***RailIndex***: A non-negative integer representing the rail on which to end an existing wall.  
{{% /command-arguments %}}

This ends an existing wall that was previously started via Track.Wall on a specified rail. The wall is not placed for the block in which this command is used.

{{% warning-nontitle %}}

This command can only be used at the beginning of a block.

{{% /warning-nontitle %}}

------

{{% command %}}  
**Track.Dike** *RailIndex*; *Direction*; *DikeStructureIndex*  
{{% /command %}}

{{% command-arguments %}}  
***RailIndex***: A non-negative integer representing the rail on which to start or update the dike. The default value is 0.  
***Direction***: An integer indicating which dike to use as described below.  
***DikeStructureIndex***: A non-negative integer representing the object to place as defined via Structure.DikeL and Structure.DikeR. The default value is 0.  
{{% /command-arguments %}}

▸ Options for *Direction*:

{{% command-arguments %}}  
**-1**: The DikeL object (left dike) is used.  
**0**: Both the DikeL and DikeR objects are used.  
**1**: The DikeR object (right dike) is used.  
{{% /command-arguments %}}

This starts or updates a dike on a specified rail. The object must have been loaded via Structure.DikeL(*DikeObjectIndex*) or Structure.DikeR(*DikeObjectIndex*) prior to using this command. The dikes are placed at the beginning of every block until a corresponding Track.DikeEnd ends the dike for this rail. Please note that dikes are resurrected if a rail is ended via Track.RailEnd and then started again via Track.RailStart or Track.Rail unless the dike was also ended via Track.DikeEnd.

{{% warning-nontitle %}}

This command can only be used at the beginning of a block.

{{% /warning-nontitle %}}

------

{{% command %}}  
**Track.DikeEnd** *RailIndex*  
{{% /command %}}

{{% command-arguments %}}  
***RailIndex***: A non-negative integer representing the rail on which to end an existing dike.  
{{% /command-arguments %}}

This ends an existing dike that was previously started via Track.Dike on a specified rail. The dike is not placed for the block in which this command is used.

{{% warning-nontitle %}}

This command can only be used at the beginning of a block.

{{% /warning-nontitle %}}

------

{{% command %}}  
**Track.Pole** *RailIndex*; *NumberOfAdditionalRails*; *Location*; *Interval*; *PoleStructureIndex*  
{{% /command %}}

{{% command-arguments %}}  
***RailIndex***: A non-negative integer representing the rail on which to start or update the pole. The default value is 0.  
***NumberOfAdditionalRails***: A non-negative integer representing the amount of additional rails covered by this pole (i.e. this rail, plus *NumberOfAdditionalRails* rails). The default value is 0.  
***Location***: If *NumberOfAdditionalRails* is 0, the side on which the pole is placed (see below), or the x-offset in multiples of 3.8 meters if *NumberOfAdditionalRails* is at least 1. The default value is 0.  
***Interval***: An integer multiple of the block length specifying the interval in which poles are placed.  
***PoleStructureIndex***: A non-negative integer representing the object to place as defined via Structure.Pole. The default value is 0.  
{{% /command-arguments %}}

This starts or updates a pole on a specified rail. The object must have been loaded via Structure.Pole(*NumberOfAdditionalRails*; *PoleStructureIndex*) prior to using this command. The poles are placed at the beginning of every block whose track positions are an integer multiple of the *Interval* (that is not necessarily at the same location this command is placed). If *NumberOfAdditionalRails* is 0, *Location*indicates the side of the rail on which the pole is placed. If *Location* is less than or equal to 0, the pole is placed as-is (corresponding to the left side). If *Location* is greater than 0, the object is mirrored on the x-axis and then placed (corresponding to the right side). If *NumberOfAdditionalRails* is greater than or equal to 1, *Location* specifies the x-offset in multiples of 3.8 meters. Please note that poles are resurrected if a rail is ended via Track.RailEnd and then started again via Track.RailStart or Track.Rail unless the pole was also ended via Track.PoleEnd.

{{% warning-nontitle %}}

This command can only be used at the beginning of a block.

{{% /warning-nontitle %}}

------

{{% command %}}  
**Track.PoleEnd** *RailIndex*  
{{% /command %}}

{{% command-arguments %}}  
***RailIndex***: A non-negative integer representing the rail on which to end an existing pole.  
{{% /command-arguments %}}

This ends an existing pole that was previously started via Track.Pole on a specified rail. The pole is not placed for the block in which this command is used.

{{% warning-nontitle %}}

This command can only be used at the beginning of a block.

{{% /warning-nontitle %}}

------

{{% command %}}  
<font color="gray">**Track.Crack** *RailIndex<sub>1</sub>*; *RailIndex<sub>2</sub>*; *CrackStructureIndex*</font>  
{{% /command %}}

This deforms a specified object to fill the space between two Rails.

{{% command-arguments %}}  
***RailIndex<sub>1</sub>***: A non-negative integer representing the first RailIndex.  
***RailIndex<sub>2</sub>***: A non-negative integer representing the second RailIndex.  
***CrackStructureIndex***: A non-negative integer representing the object defined in Structure.Crack  
{{% /command-arguments %}}

**Note:**
If *RailIndex<sub>1</sub>* is to the **left** of *RailIndex<sub>2</sub>* (e.g. it's X-cordinate is smaller), then the object defined in Structure.CrackL will be used.  
Otherwise, the objects defined in Structure.CrackR will be used.

------

{{% command %}}  
**Track.Ground** *CycleIndex*  
{{% /command %}}

{{% command-arguments %}}  
***CycleIndex***: A non-negative integer representing the cycle of ground objects to place as defined via Structure.Ground or Cycle.Ground.  
{{% /command-arguments %}}

This defines which ground objects to place from this point on. Ground objects are always placed at the beginning of a block at a certain height below the player's rail (as defined via Track.Height). If no cycle was defined for *CycleIndex*, then the object loaded into Structure.Ground(*CycleIndex*) is placed. Otherwise, the cycle of ground objects as defined via Cycle.Ground(*CycleIndex*) is used.

{{% warning-nontitle %}}

This command can only be used at the beginning of a block.

{{% /warning-nontitle %}}

##### <a name="track_stations"></a>● 11.4. Stations

------

{{% command %}}  
**Track.Sta** *Name*; *ArrivalTime*; *DepartureTime*; *PassAlarm*; *Doors*; *ForcedRedSignal*; *System*; *ArrivalSound*; *StopDuration*; *PassengerRatio*; *DepartureSound*; *TimetableIndex*  
{{% /command %}}

{{% command-arguments %}}  
***Name***: The name of the station. This is displayed in the timetable and in messages, so should not be omitted.  
***ArrivalTime***: The [time]({{< ref "/information/numberformats/_index.md#times" >}}) the player's train is expected to arrive at this station. Special values may also appear - see below.  
***DepartureTime***: The [time]({{< ref "/information/numberformats/_index.md#times" >}}) the player's train is expected to depart from this station. Special values may also appear - see below.  
***PassAlarm***: Indicates whether the pass alarm device should remind the driver of stopping at this station. The default value is 0.  
***Doors***: Indicates which doors should open at this station. The default value is 0.  
***ForcedRedSignal***: Indicates whether the signal behind the last station stop should be red on a train approach. The default value is 0.  
***System***: Indicates which built-in safety system should apply until the next station. The default value is 0.  
***ArrivalSound***: The sound file to be played on arrival, relative to the **Sound** folder.  
***StopDuration***: A positive floating-point number indicating the minimum stop duration in seconds, including door opening/closing times. The default value is 15.  
***PassengerRatio***: A non-negative floating-point number indicating the relative amount of passengers in the train from this station on. As a reference, 100 represents a train with normal amount of passengers, while 250 represents an over-crowded train. Values in-between 0 and 250 should be used. The default value is 100.  
***DepartureSound***: The sound file to be played before departure (departure time minus sound duration minus door closing time), relative to the **Sound** folder.  
***TimetableIndex***: A non-negative integer representing the timetable to be shown from this station on as defined via Train.Timetable(*TimetableIndex*).  
{{% /command-arguments %}}

▸ Available options for *ArrivalTime*:

{{% command-arguments %}}  
*time*: The train is expected to arrive at this particular time.  
*omitted*: The train may arrive at any time.  
**P** or **L**: All trains are expected to pass this station.  
**B**: The player's train is expected to pass this station, while all other trains are expected to stop.  
**S**: The player's train is expected to stop at this station, while all other trains are expected to pass.  
**S:**_time_: The player's train is expected to arrive at this particular time, while all other trains are expected to pass.  
**D**: This station is a dummy station for use in conjunction with *ForcedRedSignal*. No stop position overlay or timetable entry will be shown.
{{% /command-arguments %}}

▸ Available options for *DepartureTime*:

{{% command-arguments %}}  
*time*: The train is expected to depart at this particular time.  
*omitted*: The train may depart at any time.  
**T** or **=**: This is the terminal station. If *ForcedRedSignal* is set to 1, the departure signal will be held at red indefinately.  
**T:**_time_: This is the terminal station. If *ForcedRedSignal* is set to 1, the departure signal will still switch to green before the specified time as if this was a regular station.  
**C**: This is a station at which to "change ends". See the description below.  
**C:**_time_: This is a station at which to "change ends". Changing ends will take place at the specified time unless *StopDuration* interferes. See the description below.  
**J:**_index_: This is a station at which the train is "jumped" to the station specified by *index*. See the description below.  
**J:**_index:**Time**_: This is a station at which the train is "jumped" to the specified by *index*. Jumping will take place at the specified time unless *StopDuration* interfers. See the description below.  
{{% /command-arguments %}}

▸ Available options for *PassAlarm*:

{{% command-arguments %}}  
**0**: The pass alarm device does not remind the driver of stopping at this station.  
**1**: The pass alarm device reminds the driver of stopping at this station.  
{{% /command-arguments %}}

▸ Available options for *Doors*:

{{% command-arguments %}}  
**L** or **-1**: The left doors are expected to open at this station.  
**N** or **0**: No doors are expected to open at this station, i.e. the train should simply come to a hold.  
**R** or **1**: The right doors are expected to open at this station.  
**B**: Both the left and right doors are expected to open at this station.  
{{% /command-arguments %}}

▸ Available options for *ForcedRedSignal*:

{{% command-arguments %}}  
**0**: Signals are unaffected by this station.  
**1**: The signal immediately following the last station stop is hold at red until the train reaches the stopping area and the departure time.  
{{% /command-arguments %}}

▸ Available options for *System*:

{{% command-arguments %}}  
**ATS** or **0**: ATS should be used from this station on. The following track is not be equipped with ATC.  
**ATC** or **1**: ATC should be used from this station on. The following track is equipped with ATC.  
{{% /command-arguments %}}

This command initializes a new station. It should be placed at the beginning of the station platform. In order to finalize the creation of a station, use the Track.Stop command to place stop points following this command. All following Track.Stop commands will be associated to this station. At least one Track.Stop command must follow if trains are expected to stop at this station.

**Special Features:**

Stations can be marked as "changing ends" in the departure time. At such stations, when the departure time has been reached, the train will automatically jump to the next station. This feature is intended to fake a reverse of traveling direction without the need to jump to stations manually from the menu.

Similarly, stations can be marked as a "jump point" in the departure time. At such stations, when the departure time has been reached, the train will automatically jump to the specified station index.

{{% warning-nontitle %}}

The first occuring station in a route may not be of the Terminal type.

{{% /warning-nontitle %}}

------

{{% command %}}  
**Track.Station** *Name*; *ArrivalTime*; *DepartureTime*; *ForcedRedSignal*; *System*; *DepartureSound*  
{{% /command %}}

{{% command-arguments %}}  
***Name***: The name of the station. This is displayed in the timetable and in messages, so should not be omitted.  
***ArrivalTime***: The [time]({{< ref "/information/numberformats/_index.md#times" >}}) the player's train is expected to arrive at this station. Special values may also appear - see below.  
***DepartureTime***: The [time]({{< ref "/information/numberformats/_index.md#times" >}}) the player's train is expected to depart from this station. Special values may also appear - see below.  
***ForcedRedSignal***: Indicates whether the signal behind the last station stop should be red on a train approach. The default value is 0.  
***System***: Indicates which built-in safety system should apply until the next station. The default value is 0.  
***DepartureSound***: The sound file to be played before departure (departure time minus sound duration minus door closing time), relative to the **Sound** folder.  
{{% /command-arguments %}}

▸ Available options for *ArrivalTime*:

{{% command-arguments %}}  
*time*: The train is expected to arrive at this particular time.  
*omitted*: The train may arrive at any time.  
**P** or **L**: All trains are expected to pass this station.  
**B**: The player's train is expected to pass this station, while all other trains are expected to stop.  
**S**: The player's train is expected to stop at this station, while all other trains are expected to pass.  
**S:**_time_: The player's train is expected to arrive at this particular time, while all other trains are expected to pass.  
{{% /command-arguments %}}

▸ Available options for *DepartureTime*:

{{% command-arguments %}}  
*time*: The train is expected to depart at this particular time.  
*omitted*: The train may depart at any time.  
**T** or **=**: This is the terminal station. If *ForcedRedSignal* is set to 1, the departure signal will be held at red indefinately.  
**T:**_time_: This is the terminal station. If *ForcedRedSignal* is set to 1, the departure signal will still switch to green before the specified time as if this was a regular station.  
**C**: This is a station at which to "change ends". See the description below.  
**C:**_time_: This is a station at which to "change ends". Changing ends will take place at the specified time unless *StopDuration* interferes. See the description below.  
{{% /command-arguments %}}

▸ Available options for *ForcedRedSignal*:

{{% command-arguments %}}  
**0**: Signals are unaffected by this station.  
**1**: The signal immediately following the last station stop is hold at red until the train reaches the stopping area and the departure time.  
{{% /command-arguments %}}

▸ Available options for *System*:

{{% command-arguments %}}  
**ATS** or **0**: ATS should be used from this station on. The following track is not be equipped with ATC.  
**ATC** or **1**: ATC should be used from this station on. The following track is equipped with ATC.  
{{% /command-arguments %}}

This command initializes a new station. Prefer using the Track.Sta command, which includes more options. For the options of Track.Sta which are not offered by Track.Station, the following values apply:

{{% table-nonheader %}}

| *PassAlarm*      | 0 (not used)                  |
| ---------------- | ----------------------------- |
| *Doors*          | B (both doors must be opened) |
| *ArrivalSound*   | Not played                    |
| *StopDuration*   | 15                            |
| *PassengerRatio* | 100                           |
| *TimetableIndex* | Not affected                  |

{{% /table-nonheader %}}

The command should be placed at the beginning of the station platform. In order to finalize the creation of a station, use the Track.Stop command to place stop points following this command. All following Track.Stop commands will be associated to this station. At least one Track.Stop command must follow if trains are expected to stop at this station.

Stations can be marked as "changing ends" in the departure time. At such stations, when the departure time has been reached, the train will automatically jump to the next station. This feature is intended to fake a reverse of traveling direction without the need to jump to stations manually from the menu.

{{% warning-nontitle %}}

The first occuring station in a route may not be of the Terminal type.

{{% /warning-nontitle %}}

------

{{% command %}}  
**Track.Stop** *Direction*; *<font color="green">BackwardTolerance</font>*; *<font color="green">ForwardTolerance</font>*; *Cars*  
{{% /command %}}

{{% command-arguments %}}  
***Direction***: On which side to place a default stop post. The default value is 0.  
***<font color="green">BackwardTolerance</font>***: A positive floating-point number indicating the allowed tolerance in the backward direction, **by default** measured in **meters**. The default value is 5.  
***<font color="green">ForwardTolerance</font>***: A positive floating-point number indicating the allowed tolerance in the forward direction, **by default** measured in **meters**. The default value is 5.  
***Cars***: A non-negative integer indicating for how many cars this stop point applies, or 0 for all cars. The default value is 0.  
{{% /command-arguments %}}

▸ Available options for *Direction*:

{{% command-arguments %}}  
**-1**: A stop post is created on the left side.  
**0**: No stop post is created.  
**1**: A stop post is created on the right side.  
{{% /command-arguments %}}

This command places a stop point for the last created station. If there is more than one stop defined for a station, a train is expected to stop at the first Track.Stop command for which *Cars* is greater than or equal to the number of cars the train has, where a value for *Cars* of 0 indicates a stop point regardless of the amount of cars to be used as the last stop point for a station.

{{% code "*Example of a station with multiple stop points:*" %}}  
With Track  
0100, .Sta STATION  
0178, .Stop 1;;;4 ,; for 4 or less cars  
0212, .Stop 1;;;6 ,; for 5 or 6 cars  
0246, .Stop 1;;;8 ,; for 7 or 8 cars  
0280, .Stop 1;;;0 ,; for 9 or more cars  
{{% /code %}}

------

{{% command %}}  
<font color="gray">**Track.Form** *RailIndex<sub>1</sub>*; *RailIndex<sub>2</sub>*; *RoofStructureIndex*; *FormStructureIndex*</font>  
{{% /command %}}

{{% command-arguments %}}  
***RailIndex<sub>1</sub>***: The RailIndex to which the platform is bound.  
***RailIndex<sub>2</sub>***: The secondary RailIndex to which the platform will deform. Special values may also appear- see below.  
***RoofStructureIndex***: A non-negative integer representing the object to be placed as defined via Structure.Roof  
***FormStructureIndex***: A non-negative integer representing the object to be placed as defined via Structure.Form and Structure.FormC  
{{% /command-arguments %}}

▸ Available options for *RailIndex<sub>2</sub>*:

{{% command-arguments %}}  
**Any current RailIndex**: The form is deformed to meet the specified RailIndex.  
**L**: The specified FormL, FormCL and RoofL objects are placed without deformation.  
**R**: The specified FormR, FormCR and RoofR objects are placed without deformation.  
{{% /command-arguments %}}

**Note:**
If *RailIndex<sub>1</sub>* is to the **left** of *RailIndex<sub>2</sub>* (e.g. it's X-cordinate is smaller), then the objects defined in Structure.FormL, Structure.FormCL and Structure.RoofL will be used.  
Otherwise, the objects defined in Structure.FormR, Structure.FormCL and Structure.RoofR will be used.


##### <a name="track_signalling"></a>● 11.5. Signalling and speed limits

------

{{% command %}}  
**Track.Limit** *<font color="blue">Speed</font>*; *Post*; *Cource*  
{{% /command %}}

{{% command-arguments %}}  
***<font color="blue">Speed</font>***: A positive floating-point number representing the speed, **by default** measured in **km/h**, or 0 to indicate no speed restriction. The default value is 0.  
***Post***: The side on which to place a default Japanese-style speed limit post. The default value is 0.  
***Cource***: The directional indication. The default value is 0.  
{{% /command-arguments %}}

![illustration_limit](/images/illustration_limit.png)

▸ Options for *Post*:

{{% command-arguments %}}  
**-1**: The post is placed on the left side of the track.  
**0**: No post will be placed.  
**1**: The post is placed on the right side of the track.  
{{% /command-arguments %}}

▸ Options for *Cource*:

{{% command-arguments %}}  
**-1**: The post applies for a left-bound track.  
**0**: The post does not indicate a particular direction.  
**1**: The post applies for a right-bound track.  
{{% /command-arguments %}}

This command defines the new speed limit from this point on. If the new speed limit is lower than the current speed limit, the new speed limit will take effect immediately. If the speed limit is higher than the current speed limit, the new speed limit will take effect only once the whole train has passed this point. By setting *Speed* to `0`, the speed restriction is released. By setting *Post* to either `-1` or `1`, a default Japanese-style speed post is placed at the respective side of the track. Setting *Course* to either `-1` or `1` includes a directional indication, which is usually used at railroad switches to indicate that the speed limit only applies if the respective direction is being taken. If *Speed* is set to `0`, the setting of *Course* has no effect.

------

{{% command %}}  
**Track.Section** *a<sub>0</sub>*; *a<sub>1</sub>*; *a<sub>2</sub>*; ...; *a<sub>n</sub>*  
{{% /command %}}

{{% command-arguments %}}  
***a<sub>i</sub>***: A non-negative number specifying one of the section's aspects.  
{{% /command-arguments %}}

This command starts a section, the functional part of signalling, to be used in conjunction with Track.SigF, which creates a visual representation of a section (a signal). The *a<sub>i</sub>* parameters specify the aspects the section can bear. An aspect of 0 corresponds to a red section which must not be passed by a train. The *a<sub>0</sub>* term is mandatory.

{{% notice %}}

#### Default versus simplified section behavior

There are two different modes of behavior on how to interpret the *a<sub>i</sub>* parameters. The mode can be set via Options.SectionBehavior. The following are separate descriptions for default and simplified behavior.

{{% /notice %}}

**Default behavior:**  
The *a<sub>i</sub>* terms specify the aspect the section should bear depending on how many sections ahead are clear until a red one is encountered. The order of the terms is relevant. The same aspect may occur multiple times.

▸ Meanings of the *a<sub>i</sub>* terms:

{{% command-arguments %}}  
**a<sub>0</sub>**: The aspect to show when this section is occupied by a train or otherwise hold at red.  
**a<sub>1</sub>**: The aspect to show when this section is clear, but the immediately following section is red.  
**a<sub>2</sub>**: The aspect to show when this section and the following section are clear, but the one immediately following the latter one is red.  
**a<sub>n</sub>**: The aspect to show when *n* sections are clear before a red one is encountered.  
{{% /command-arguments %}}

In the case more sections ahead are clear than indicated by the *a<sub>i</sub>* terms, the section will bear the aspect of *a<sub>n</sub>*.

**Simplified behavior:**  
The *a<sub>i</sub>* terms specify the repertoire of aspects the section can have. A section will bear the smallest of the *a<sub>i</sub>* which is greater than the current aspect of the upcoming section. If no such *a<sub>i</sub>* exists, the section will bear the aspect of *an*. The order of the *a<sub>i</sub>* is irrelevant. If the same aspect occurs multiple times, this has no effect.

{{% code "*Example of a Track.Section command in conjunction with a Track.SigF command:*" %}}  
With Track  
1000, .Section 0;2;4, .SigF 3;0;-3;-1  
{{% /code %}}

------

{{% command %}}  
**Track.SigF** *SignalIndex*; *Section*; *<font color="green">X</font>*; *<font color="green">Y</font>*; *Yaw*; *Pitch*; *Roll*  
{{% /command %}}

{{% command-arguments %}}  
***SignalIndex***: A non-negative integer representing the signal to be placed as defined via Signal(*SignalIndex*).Load.  
***Section***: A non-negative integer representing the section this signal is attached to, with 0 being the current section, 1 the upcoming section, 2 the section after that, and so on.  
***<font color="green">X</font>***: The X-coordinate to place the signal object, **by default** measured in **meters**. The default value is 0.  
***<font color="green">Y</font>***: The Y-coordinate to place the signal object, **by default** measured in **meters**. The default value is 0.  
***Yaw***: The angle in degrees by which the object is rotated in the XZ-plane in clock-wise order when viewed from above. The default value is 0.  
***Pitch***: The angle in degrees by which the object is rotated in the YZ-plane in clock-wise order when viewed from the left. The default value is 0.  
***Roll***: The angle in degrees by which the object is rotated in the XY-plane in clock-wise order when viewed from behind. The default value is 0.  
{{% /command-arguments %}}

This command creates a non-function signal, that is, a visual representation of a section as defined via Track.Section. Setting *Y* to a negative number resets the y-coordinate to 4.8 meters and attaches a default signal post. Also see Track.Section.

If no object has been defined by Signal(*SignalIndex*), one of the default Japanese signals is used:

▸ Default signals for *SignalIndex*:

{{% command-arguments %}}  
**3**: A three-aspect signal having aspects <font color="#C00000">●</font>red, <font color="#FFC000">●</font>yellow and <font color="#00C000">●</font>green.  
**4**: A four-aspect (type A) signal having aspects <font color="#C00000">●</font>red, <font color="#FFC000">●●</font>yellow-yellow, <font color="#FFC000">●</font>yellow and <font color="#00C000">●</font>green.  
**5**: A five-aspect (type A) signal having aspects <font color="#C00000">●</font>red, <font color="#FFC000">●●</font>yellow-yellow, <font color="#FFC000">●</font>yellow, <font color="#FFC000">●</font><font color="#00C000">●</font>yellow-green and <font color="#00C000">●</font>green.  
**6**: A repeating signal equivalent to that created by Track.Relay.  
{{% /command-arguments %}}

------

{{% command %}}  
**Track.Signal** *Aspects*; *<font color="gray">Unused</font>*; *<font color="green">X</font>*; *<font color="green">Y</font>*; *Yaw*; *Pitch*; *Roll*   
**Track.Sig** *Aspects*; *<font color="gray">Unused</font>*; *<font color="green">X</font>*; *<font color="green">Y</font>*; *Yaw*; *Pitch*; *Roll*  
{{% /command %}}

{{% command-arguments %}}  
***Type***: The number of aspects for this signal. The default value is -2.  
***Unused***: *This argument is not used by openBVE.*  
***<font color="green">X</font>***: The X-coordinate to place the signal object, **by default** measured in **meters**. The default value is 0.  
***<font color="green">Y</font>***: The Y-coordinate to place the signal object, **by default** measured in **meters**. The default value is 0.  
***Yaw***: The angle in degrees by which the object is rotated in the XZ-plane in clock-wise order when viewed from above. The default value is 0.  
***Pitch***: The angle in degrees by which the object is rotated in the YZ-plane in clock-wise order when viewed from the left. The default value is 0.  
***Roll***: The angle in degrees by which the object is rotated in the XY-plane in clock-wise order when viewed from behind. The default value is 0.  
{{% /command-arguments %}}

▸ Options for *Type*:

{{% command-arguments %}}  
[![illustration_signals_small](/images/illustration_signals_small.png)](/images/illustration_signals_large.png)  
**2**: A two-aspect (type A) signal having aspects <font color="#C00000">●</font>red and <font color="#FFC000">●</font>yellow.  
**-2**: A two-aspect (type B) signal having aspects <font color="#C00000">●</font>red and <font color="#00C000">●</font>green.  
**3**: A three-aspect signal having aspects <font color="#C00000">●</font>red, <font color="#FFC000">●</font>yellow and <font color="#00C000">●</font>green.  
**4**: A four-aspect (type A) signal having aspects <font color="#C00000">●</font>red, <font color="#FFC000">●●</font>yellow-yellow, <font color="#FFC000">●</font>yellow and <font color="#00C000">●</font>green.  
**-4**: A four-aspect (type B) signal having aspects <font color="#C00000">●</font>red, <font color="#FFC000">●</font>yellow, <font color="#FFC000">●●</font>yellow-green and <font color="#00C000">●</font>green.  
**5**: A five-aspect (type A) signal having aspects <font color="#C00000">●</font>red, <font color="#FFC000">●●</font>yellow-yellow, <font color="#FFC000">●</font>yellow, <font color="#FFC000">●</font><font color="#00C000">●</font>yellow-green and <font color="#00C000">●</font>green.  
**-5**: A five-aspect (type B) signal having aspects <font color="#C00000">●</font>red, <font color="#FFC000">●</font>yellow, <font color="#FFC000">●</font><font color="#00C000">●</font>yellow-green, <font color="#00C000">●</font>green and <font color="#00C000">●●</font>green-green.  
**6**: A six-aspect signal having aspects <font color="#C00000">●</font>red, <font color="#FFC000">●●</font>yellow-yellow, <font color="#FFC000">●</font>yellow, <font color="#FFC000">●</font><font color="#00C000">●</font>yellow-green, <font color="#00C000">●</font>green and <font color="#00C000">●●</font>green-green.  
{{% /command-arguments %}}

This command creates a functional signal. You can choose from the available options for *Aspect* to create any of the default Japanese signals. Setting *X* to 0 creates a functional but invisible signal similar to Track.Section. Setting *X* to a non-zero number and *Y* to a negative number resets the y-coordinate to 4.8 meters and attaches a default signal post.

{{% code "*Example of a four-aspect type B signal without a post at x=-3 and y=5:*" %}}  
1000, Track.Signal -4;;-3;5  
{{% /code %}}

{{% code "*Example of a four-aspect type B signal including a post at x=-3 and y=4.8:*" %}}  
1000, Track.Signal -4;;-3;-1  
{{% /code %}}

Track.Signal is similar to using Track.Section and Track.SigF in one command.

------

{{% command %}}  
**Track.Relay** *<font color="green">X</font>*; *<font color="green">Y</font>*; *Yaw*; *Pitch*; *Roll*  
{{% /command %}}

{{% command-arguments %}}  
***<font color="green">X</font>***: The X-coordinate at which to place the object, **by default** measured in **meters**. The default value is 0.  
***<font color="green">Y</font>***: The Y-coordinate at which to place the object, **by default** measured in **meters**. The default value is 0.  
***Yaw***: The angle in degrees by which the object is rotated in the XZ-plane in clock-wise order when viewed from above. The default value is 0.  
***Pitch***: The angle in degrees by which the object is rotated in the YZ-plane in clock-wise order when viewed from the left. The default value is 0.  
***Roll***: The angle in degrees by which the object is rotated in the XY-plane in clock-wise order when viewed from behind. The default value is 0.  
{{% /command-arguments %}}

This commands creates a default Japanese repeating signal. The repeating signal repeats the state of the upcoming signal. Setting *X* to zero does not create a repeating signal, but forces the command to be ignored. Setting *X* to a non-zero number and *Y* to a negative number resets the y-coordinate to 4.8 and attaches a default signal post.

##### <a name="track_safety"></a>● 11.6. Safety systems

------

{{% command %}}  
**Track.Beacon** *Type*; *BeaconStructureIndex*; *Section*; *Data*; *<font color="green">X</font>*; *<font color="green">Y</font>*; *Yaw*; *Pitch*; *Roll*  
{{% /command %}}

{{% command-arguments %}}  
***Type***: A non-negative integer representing the type of the beacon to be transmitted to the train.  
***BeaconStructureIndex***: A non-negative integer representing the object to be placed as defined via Structure.Beacon, or -1 to not place any object.  
***Section***: An integer representing the section to which the beacon is attached, namely 0 for the current section, 1 for the upcoming section, 2 for the section behind that, etc., or -1 for the next red section.  
***Data***: An integer representing arbitrary data specific to the beacon type to be transmitted to the train.  
***<font color="green">X</font>***: The X-coordinate at which to place the object, **by default** measured in **meters**. The default value is 0.  
***<font color="green">Y</font>***: The Y-coordinate at which to place the object, **by default** measured in **meters**. The default value is 0.  
***Yaw***: The angle in degrees by which the object is rotated in the XZ-plane in clock-wise order when viewed from above. The default value is 0.  
***Pitch***: The angle in degrees by which the object is rotated in the YZ-plane in clock-wise order when viewed from the left. The default value is 0.  
***Roll***: The angle in degrees by which the object is rotated in the XY-plane in clock-wise order when viewed from behind. The default value is 0.  
{{% /command-arguments %}}

This command places a beacon (transponder). The object must have been loaded via Structure.Beacon(*BeaconStructureIndex*) prior to using this command. When the train passes the beacon, the type of beacon and various data will be transmitted to the train, including the state of the referenced section.

It should be noted that the built-in safety systems also receive data from these beacons as Track.Beacon(*Type*) is roughly equivalent to Track.Transponder(*Type*). Please see [the page about beacon standards]({{< ref "/information/standards/_index.md" >}}) for more information.

------

{{% command %}}  
**Track.Transponder** *Type*; *Signal*; *SwitchSystem*; *<font color="green">X</font>*; *<font color="green">Y</font>*; *Yaw*; *Pitch*; *Roll*  
**Track.Tr** *Type*; *Signal*; *SwitchSystem*; *<font color="green">X</font>*; *<font color="green">Y</font>*; *Yaw*; *Pitch*; *Roll*  
{{% /command %}}

{{% command-arguments %}}  
***Type***: The type of the transponder. The default value is 0.  
***Signal***: The signal this transponder references. The default value is 0.  
***SwitchSystem***: Whether to automatically switch the safety system. The default value is 0.  
***<font color="green">X</font>***: The X-coordinate at which to place the object, **by default** measured in **meters**. The default value is 0.  
***<font color="green">Y</font>***: The Y-coordinate at which to place the object, **by default** measured in **meters**. The default value is 0.  
***Yaw***: The angle in degrees by which the object is rotated in the XZ-plane in clock-wise order when viewed from above. The default value is 0.  
***Pitch***: The angle in degrees by which the object is rotated in the YZ-plane in clock-wise order when viewed from the left. The default value is 0.  
***Roll***: The angle in degrees by which the object is rotated in the XY-plane in clock-wise order when viewed from behind. The default value is 0.  
{{% /command-arguments %}}

▸ Options for *Type*:

{{% command-arguments %}}  
![illustration_transponders](/images/illustration_transponders.png)  
**0**: An S-type transponder used by ATS-S. Usually placed 600m in front of a signal.  
**1**: An SN-type transponder used by ATS-SN. Usually placed 20m in front of a signal.  
**2**: An accidental departure transponder. Usually placed shortly behind a station stop.  
**3**: An ATS-P pattern renewal transponder. Usually placed 600m, 280m, 180m, 130m, 85m or 50m in front of a signal, depending on the circumstances.  
**4**: An ATS-P immediate stop transponder. Usually placed either 25m or 30m in front of a signal, depending on the circumstances.  
{{% /command-arguments %}}

▸ Options for *Signal*:

{{% command-arguments %}}  
**0**: The upcoming signal is referenced.  
**1**: The signal immediately behind the upcoming signal is referenced.  
**n**: The *n*'th signal behind the upcoming signal is referenced.  
{{% /command-arguments %}}

▸ Options for *SwitchSystem*:

{{% command-arguments %}}  
**-1**: The transponder does not switch the train between ATS-SN and ATS-P.  
**0**: The transponder automatically switches the train to ATS-SN for transponder types *0* and *1*, and to ATS-P for types *3* and *4*.  
{{% /command-arguments %}}

This command places a transponder, usually for the built-in safety systems ATS-SN or ATS-P. For more information about these systems and their transponders, see [the user's documentation about ATS](http://openbve-project.net/play-japanese/).

It should be noted that custom safety system plugins also receive data from these transponders as Track.Transponder(*Type*) is roughly equivalent to Track.Beacon(*Type*). Please see [the page about beacon standards]({{< ref "/information/standards/_index.md" >}}) for more information.

➟ [Go here to find out more about ATS-SN and ATS-P.](https://openbve-project.net/play-japanese/#3-ats-sn)

➟ [There is a tutorial available for the proper use of ATS-SN and ATS-P in route files, including all of the five transponders.]({{< ref "/routes/tutorial_ats/_index.md" >}})

------

{{% command %}}  
**Track.AtsSn**  
{{% /command %}}

This command places an S-type transponder for the built-in safety system ATS-SN, referencing the upcoming signal, and automatically switching to ATS-SN. The command is equivalent to **Track.Tr 0;0;0**. See there for more information.

------

{{% command %}}  
**Track.AtsP**  
{{% /command %}}

This command places a pattern renewal transponder for the built-in safety system ATS-P, referencing the upcoming signal, and automatically switching to ATS-P. The command is equivalent to **Track.Tr 3;0;0**. See there for more information.

------

{{% command %}}  
**Track.Pattern** *Type*; *<font color="blue">Speed</font>*  
{{% /command %}}

{{% command-arguments %}}  
***Type***: The type of speed restriction.  
***<font color="blue">Speed</font>***: A non-negative floating-point number representing the speed restriction, **by default** measured in **km/h**.  
{{% /command-arguments %}}

▸ Options for *Type*:

{{% command-arguments %}}  
**0**: A temporary speed restriction.  
**1**: A permanent speed restriction.  
{{% /command-arguments %}}

This command defines a speed restriction for the built-in safety system ATS-P.

A temporary speed restriction (*Type*=0) is to be inserted at the point where the speed restriction should apply. ATS-P will know about this speed restriction in advance and will brake the train so that the train meets the speed restriction at that point. Once the point is passed, the speed restriction no longer applies.

A permanent speed restriction (*Type*=1) is to be inserted at the point where the speed restriction should apply, however, ATS-P does not know about this limit in advance and will only brake the train from that point on. For a higher degree of realism, insert permanent speed restrictions at the same point as ATS-P transponders. A permanent speed restriction, as the name suggests, is remembered by ATS-P and is only released by a subsequent permanent speed restriction.

------

{{% command %}}  
**Track.PLimit** *<font color="blue">Speed</font>*  
{{% /command %}}

{{% command-arguments %}}  
***<font color="blue">Speed</font>***: A positive floating-point number representing the permanent speed restriction for ATS-P, **by default** measured in **km/h**.  
{{% /command-arguments %}}

This command is equivalent to **Track.Pattern 1;_Speed_**. See there for more information. 

##### <a name="track_misc"></a>● 11.7. Miscellaneous

------

{{% command %}}  
**Track.Back** *BackgroundTextureIndex*  
{{% /command %}}

{{% command-arguments %}}  
***BackgroundTextureIndex***: A non-negative integer representing the background image to be displayed as defined via Texture.Background(*BackgroundTextureIndex*).  
{{% /command-arguments %}}

This command defines which background image to show from now on.

{{% warning-nontitle %}}

This command can only be used at the beginning of a block.

{{% /warning-nontitle %}}

------

{{% command %}}  
**Track.Fog** *<font color="green">StartingDistance</font>*; *<font color="green">EndingDistance</font>*; *RedValue*; *GreenValue*; *BlueValue*  
{{% /command %}}

{{% command-arguments %}}  
***<font color="green">StartingDistance</font>***: A floating-point number indicating the start of fog, **by default** measured in **meters**. The default value is 0.  
***<font color="green">EndingDistance</font>***: A floating-point number indicating the end of fog, **by default** measured in **meters**. The default value is 0.  
***RedValue***: An integer ranging from 0 to 255 representing the red component of the fog. The default value is 128.  
***GreenValue***: An integer ranging from 0 to 255 representing the green component of the fog. The default value is 128.  
***BlueValue***: An integer ranging from 0 to 255 representing the blue component of the fog. The default value is 128.  
{{% /command-arguments %}}

This command defines the fog from this point on, or deactivates fog. If fog is to be enabled, *StartingDistance* must be less than *EndingDistance*. If fog is to be disabled, *StartingDistance* must be greater than or equal to *EndingDistance*.

Fog affects the coloring of objects. Objects before the starting distance appear as-is, objects after the ending distance appear in the fog color, and objects in-between blend linearly between those. The background image is affected by fog as well. For the fog calculations, the background image is assumed to be at 600 meters distance from the camera, regardless of the actual viewing distance.

Depending on Options.FogBehavior, there are two options how this command affects fog from this point on. In block-wise mode, the current fog blends from the beginning of this block to the new settings at the end of this block. The new setting is kept for following blocks. This is the default behavior. In interpolation mode, each Track.Fog command defines a control point for fog, where all of the settings (distances and colors) are interpolated linearly between the control points.

{{% warning-nontitle %}}

This command can only be used at the beginning of a block.

{{% /warning-nontitle %}}

------

{{% command %}}  
**Track.Brightness** *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: A non-negative integer within the range from 0 to 255. The default value is 255.  
{{% /command-arguments %}}

This command marks a point which affects the brightness in the cab. *Value* is measured from 0 (dark) to 255 (light), and is linearly interpolated between successive Track.Brightness commands for any given point on the track. This command should be used for tunnels, bridges, station roofs, or anything else that would affect the brightness as perceived inside the cab.

{{% code "*Example:*" %}}  
With Track  
1200, .Brightness 255 ,; before the bridge starts  
1205, .Brightness 128 ,; directly under the bridge here  
1210, .Brightness 255 ,; as soon as the bridge ends  
{{% /code %}}

------

{{% command %}}  
**Track.Marker** *FileName*; *<font color="green">Distance</font>*  
{{% /command %}}

{{% command-arguments %}}  
***FileName***: The file name for the marker image, relative to the **Object** folder.  
***<font color="green">Distance</font>***: A non-zero floating-point number indicating the length for which the marker image is displayed, **by default** measured in **meters**.  
{{% /command-arguments %}}

▸ Behavior for *Distance*:

{{% command-arguments %}}  
*negative value*: The marker image starts to display at the Track.Marker command, and ends -*Distance* meters after the Track.Marker command.  
*positive value*: The marker image starts to display *Distance* meters before the Track.Marker command, and ends at the Track.Marker command.  
{{% /command-arguments %}}

This command shows a so-called marker image, which is displayed in the top-right corner of the screen. You can use these images for advisory or informational purposes. The RGB color of 64,64,64 inside the image is made transparent.

------

{{% command %}}  
**Track.Marker** *FileName.xml*  
{{% /command %}}

A *Track.Marker* command, linking to a single XML file is also supported. These allow more control over markers than is available in the routefile commands.

These are fully described on the [the XML Markers page...]({{< ref "/routes/xml/route_marker/_index.md" >}})

------

{{% command %}}  
**Track.TextMarker** *Text*; *<font color="green">Distance</font>*; *FontColor*  
{{% /command %}}

{{% command-arguments %}}  
***Text***: The marker text to display. (No special characters supported).  
***<font color="green">Distance</font>***: A non-zero floating-point number indicating the length for which the text is displayed, **by default** measured in **meters**.  
***FontColor***: The font color for this marker text  
{{% /command-arguments %}}

▸ Behavior for *Distance*:

{{% command-arguments %}}  
*negative value*: The marker image starts to display at the Track.Marker command, and ends -*Distance* meters after the Track.Marker command.  
*positive value*: The marker image starts to display *Distance* meters before the Track.Marker command, and ends at the Track.Marker command.  
{{% /command-arguments %}}

▸ Available options for *FontColor*:

{{% command-arguments %}}  
*1*: Black.  
*2*: Gray.  
*3*: White.  
*4*: Red.  
*5*: Orange.  
*6*: Green.  
*7*: Blue.  
*8*: Magenta.  
{{% /command-arguments %}}

This command creates a simple textual marker, which is added to the list of messages in the upper left-hand corner of the screen.

------

{{% command %}}  
**Track.PointOfInterest** *RailIndex*; *<font color="green">X</font>*; *<font color="green">Y</font>*; *Yaw*; *Pitch*; *Roll*; *Text*  
**Track.POI** *RailIndex*; *X*; *Y*; *Yaw*; *Pitch*; *Roll*; *Text*  
{{% /command %}}

{{% command-arguments %}}  
***RailIndex***: A non-negative integer representing the rail for the point of interest.  
***<font color="green">X</font>***: A floating-point number representing the horizontal offset from the rail, **by default** measured in **meters**. Negative values indicate left, positive ones right.  
***<font color="green">Y</font>***: A floating-point number representing the vertical offset from the rail, **by default** measured in **meters**. Negative values indicate below, positive ones above.  
***Yaw***: The angle in degrees by which the view is rotated in the XZ-plane in clock-wise order when viewed from above. The default value is 0.  
***Pitch***: The angle in degrees by which the view is rotated in the YZ-plane in clock-wise order when viewed from the left. The default value is 0.  
***Roll***: The angle in degrees by which the view is rotated in the XY-plane in clock-wise order when viewed from behind. The default value is 0.  
***Text***: A textual representation of the point of interest.  
{{% /command-arguments %}}

This command creates a point of interest which the user can jump to by pressing the CAMERA_POI_PREVIOUS (NUM 1) or CAMERA_POI_NEXT (NUM 7) keys. The camera will be placed at the specified location with the specified orientation. If *Text* is non-empty, a message will appear briefly showing the text.

------

{{% command %}}  
**Track.PreTrain** *Time*  
{{% /command %}}

{{% command-arguments %}}  
***Time***: The [time]({{< ref "/information/numberformats/_index.md#times" >}}) at which the pretrain is at this track position.  
{{% /command-arguments %}}

This commands creates a position-time-association for an invisible preceding train in order to influence signalling. Contrary to a real preceding train as created by Route.RunInterval, the invisible preceding train created by Track.PreTrain is a way of scripting where the invisible preceding train is at any given time. The position-time-associations must be in increasing order, that is, at a later track position, the associated time must also be later. Before the first scripted time, the invisible preceding train resides at the first scripted position. In-between the first and last scripted time, the invisible preceding train moves (linearly) between the scripted points. After the last scripted time, the invisible preceding train is removed and thus clears signalling.

------

{{% command %}}  
**Track.Announce** *FileName*; *<font color="blue">Speed</font>*  
{{% /command %}}

{{% command-arguments %}}  
***FileName***: The file name for the sound to play, relative to the **Sound** folder.  
***<font color="blue">Speed</font>***: The reference speed in km/h for speed-dependant sounds, or 0 to play the sound speed-independently. The default value is 0.  
{{% /command-arguments %}}

This command plays an announcement or other kind of sound in the cab once the player's train crosses the point where this command is used. If *Speed* is set to 0 (default), the sound is played as-is. If a *Speed* is given though, the sound plays at is original pitch at the specified speed, and is pitch-modulated proportionally for other speeds, useful for custom flange sounds, pointwork sounds, etc.

------

{{% command %}}  
**Track.Doppler** *FileName*; *<font color="green">X</font>*; *<font color="green">Y</font>*  
{{% /command %}}

{{% command-arguments %}}  
***FileName***: The file name for the sound to play, relative to the **Sound** folder.  
***<font color="green">X</font>***: A floating-point number representing the horizontal offset from rail 0, **by default** measured in **meters**. Negative values indicate left, positive ones right.  
***<font color="green">Y</font>***: A floating-point number representing the vertical offset from rail 0, **by default** measured in **meters**. Negative values indicate below, positive ones above.  
{{% /command-arguments %}}

This command places an environmental sound effect at the specified location. The sound will play in a loop for the duration of the simulation and employs the doppler effect. (Note: All sounds in openBVE employ the doppler effect.)

------

{{% command %}}  
**Track.Buffer**  
{{%/command %}}

This command places a bumper. The train can collide with the bumper in both the forward and backward directions. Place this command at the beginning and the end of the route. An object is not automatically created, so use Track.FreeObj to create a visual representation of the bumper if necessary.

------

{{% command %}}  
**Track.Destination** *Type*; *BeaconStructureIndex*; *NextDestination*; *PreviousDestination*; *TriggerOnce*; *<font color="green">X</font>*; *<font color="green">Y</font>*; *Yaw*; *Pitch*; *Roll*  
{{% /command %}}

{{% command-arguments %}}  
***Type***: Defines the types of trains for which this destination setter applies: *-1* for AI trains only, *0* for all trains and *1* for the player train only.  
***BeaconStructureIndex***: A non-negative integer representing the object to be placed as defined via Structure.Beacon, or -1 to not place any object.  
***NextDestination***: An integer representing the destination value set when passing over this beacon in a forwards direction, or *-1* to disable.  
***PreviousDestination***: An integer representing the destination value set when passing over this beacon in a reverse direction, or *-1* to disable.  
***TriggerOnce***: If set to *0*, this beacon will be triggered by all valid trains which pass over it. If set to *1*, it will be triggered by the first valid train only.  
***<font color="green">X</font>***: The X-coordinate at which to place the object, **by default** measured in **meters**. The default value is 0.  
***<font color="green">Y</font>***: The Y-coordinate at which to place the object, **by default** measured in **meters**. The default value is 0.  
***Yaw***: The angle in degrees by which the object is rotated in the XZ-plane in clock-wise order when viewed from above. The default value is 0.  
***Pitch***: The angle in degrees by which the object is rotated in the YZ-plane in clock-wise order when viewed from the left. The default value is 0.  
***Roll***: The angle in degrees by which the object is rotated in the XY-plane in clock-wise order when viewed from behind. The default value is 0.  
{{% /command-arguments %}}

This command places a special beacon, which sets the destination variable, available for use by plugins and animated objects. The object must have been loaded via Structure.Beacon(*BeaconStructureIndex*) prior to using this command.

------

{{% command %}}  
**Track.HornBlow** *Type*; *BeaconStructureIndex*; *TriggerOnce*; *<font color="green">X</font>*; *<font color="green">Y</font>*; *Yaw*; *Pitch*; *Roll*  
{{% /command %}}

{{% command-arguments %}}  
***Type***: Defines the type of horn to play: *0* for the primary horn, *1* for the secondary horn and *2* for the music horn.  
***BeaconStructureIndex***: A non-negative integer representing the object to be placed as defined via Structure.Beacon, or -1 to not place any object.  
***TriggerOnce***: If set to *0*, this beacon will be triggered by all valid trains which pass over it. If set to *1*, it will be triggered by the first valid train only.  
***<font color="green">X</font>***: The X-coordinate at which to place the object, **by default** measured in **meters**. The default value is 0.  
***<font color="green">Y</font>***: The Y-coordinate at which to place the object, **by default** measured in **meters**. The default value is 0.  
***Yaw***: The angle in degrees by which the object is rotated in the XZ-plane in clock-wise order when viewed from above. The default value is 0.  
***Pitch***: The angle in degrees by which the object is rotated in the YZ-plane in clock-wise order when viewed from the left. The default value is 0.  
***Roll***: The angle in degrees by which the object is rotated in the XY-plane in clock-wise order when viewed from behind. The default value is 0.  
{{% /command-arguments %}}

This command places a special beacon, which commands an AI driver to play the horn. Both an AI controlled player train and pure AI trains will trigger this beacon, unless **TriggerOnce** is set. The object must have been loaded via Structure.Beacon(*BeaconStructureIndex*) prior to using this command.

------

{{% command %}}  
**Track.DynamicLight** *DynamicLightIndex*  
{{% /command %}}

{{% command-arguments %}}  
***DynamicLightIndex***: A non-negative integer, representing the Dynamic Lighting set to be used from this point onwards, as defined by Structure.DynamicLight
{{% /command-arguments %}}

This command may be used as an alternative to the *Route.AmbientLight* , *Route.DirectionalLight* and *Route.LightDirection* commands.

It allows the lighting to be varied using a time-based model, and is described fully on the following page:

[Dynamic Lighting]({{< ref "/routes/xml/dynamiclight/_index.md" >}})

---

{{% command %}}  
**Track.AmbientLight** *RedValue*; *GreenValue*; *BlueValue*  
{{% /command %}}

{{% command-arguments %}}  
***RedValue***: An integer ranging from 0 to 255 representing the red component of the ambient light. The default value is 160.  
***GreenValue***: An integer ranging from 0 to 255 representing the green component of the ambient light. The default value is 160.   
***BlueValue***: An integer ranging from 0 to 255 representing the blue component of the ambient light. The default value is 160.  
{{% /command-arguments %}}

This command defines the ambient light color to be used from this point onwards. All polygons in the scene are illuminated by the ambient light regardless of the light direction.

---

{{% command %}}  
**Track.DirectionalLight** *RedValue*; *GreenValue*; *BlueValue*  
{{% /command %}}

{{% command-arguments %}}  
***RedValue***: An integer ranging from 0 to 255 representing the red component of the directional light. The default value is 160.  
***GreenValue***: An integer ranging from 0 to 255 representing the green component of the directional light. The default value is 160.  
***BlueValue***: An integer ranging from 0 to 255 representing the blue component of the directional light. The default value is 160.  
{{% /command-arguments %}}

This command defines the directional light to be used from this point onwards. The polygons in the scene are only fully illuminated by the directional light if the light direction points at the front faces. If pointing at back faces, no light is contributed. *Route.LightDirection* should be set to specify the light direction.

---

{{% command %}}  
**Track.LightDirection** *Theta*; *Phi*  
{{% /command %}}

{{% command-arguments %}}  
***Theta***: A floating-point number representing the angle in **degrees** which controls the pitch of the light direction. The default value is 60.  
***Phi***: A floating-point number representing the angle in **degrees** which controls the planar rotation of the light direction. The default value is about -26.57.  
{{% /command-arguments %}}

This command defines the light direction from this point onwards. This is the direction the light shines at, meaning the opposite direction the sun is located at. First, *Theta* determines the pitch. A value of 90 represents a downward direction, while a value of -90 represents an upward direction. With those extremes, the value of *Phi* is irrelevant. A value of 0 for *Theta* represents a forward direction originating at the horizon behind. Once the pitch is defined by *Theta*, *Phi* determines the rotation in the plane. A value of 0 does not rotate, a value of 90 rotates the direction to the right and a value of -90 rotates to the left. A backward direction can be both obtained by setting *Theta* and *Phi* to 180 and 0 or to 0 and 180, respectively. Values in-between allow for more precise control of the exact light direction.

{{% warning-nontitle %}}

The direction of the light is relative to the initial direction at the zero-point of the route (e.g Track position **0**), not the current position.

{{% /warning-nontitle %}}

![illustration_light_direction](/images/illustration_light_direction.png)

{{% function "*Converting a spherical direction (theta,phi) into a cartesian direction (x,y,z):*" %}}  
x = cos(theta) * sin(phi)  
y = -sin(theta)  
z = cos(theta) * cos(phi)  
{{% /function %}}

{{% function "*Converting a cartesian direction (x,y,z) into a spherical direction (theta,phi) for y²≠1:*" %}}  
theta = -arctan(y/sqrt(x<sup>2</sup>+z<sup>2</sup>))  
phi = arctan(z,x)  
{{% /function %}}

{{% function "*Converting a cartesian direction (x,y,z) into a spherical direction (theta,phi) for y²=1:*" %}}  
theta = -y * pi/2  
phi = 0  
{{% /function %}}

In the formulas above, [*cos(x)*](http://functions.wolfram.com/ElementaryFunctions/Cos/02) represents the cosine, [*sin(x)*](http://functions.wolfram.com/ElementaryFunctions/Sin/02) the sine, [*arctan(x)*](http://functions.wolfram.com/ElementaryFunctions/ArcTan/02) the inverse tangent, [*arctan(x,y)*](http://functions.wolfram.com/ElementaryFunctions/ArcTan2/02) the two-argument inverse tangent and [*sqrt(x)*](http://functions.wolfram.com/ElementaryFunctions/Sqrt/02) the square root. The formulas can be used to convert between spherical and cartesian coordinates if working with either one seems more intuitive than working with the other one. The formulas also serve as the official documentation on how the light direction is mathematically defined (using radians for the trigonometric functions).

---