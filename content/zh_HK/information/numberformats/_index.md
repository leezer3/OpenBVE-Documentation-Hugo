---
title: "數字格式"
weight: 2
---

<font color="Gray">此頁面講解了各種路線和列車文件中遇到的數字格式，以及如何正確地使用。</font>

## ■ 目錄

{{% contents %}}

- [1.總概](#overview)
- [2. 整數](#integers)
- [3. 浮點數](#floating)
- [4. 時間](#times)
- [5. 顏色值](#colors)

{{% /contents %}}

## <a name="overview"></a>■ 1. 總概

在路線和列車文件中，您經常會遇到整數或浮點數之類的數字，有時還會遇到其他數字。這些編號必須遵循某種格式，以下將對此進行介紹。

數字有兩種解析方法：**嚴格** 和 **寬鬆** 。嚴格方法不會留有犯印刷錯誤的空間。所有新文件格式均使用此方法。寬鬆方法是與舊方式兼容所必需的傳統解析模型。在 *為OpenBVE進行開發* 頁面上顯示的不同文件表示正在使用哪種模型。請注意，只要允許 *寬鬆* 模型，您也可以使用 *嚴格* 格式，因為 *嚴格* 構成 *寬鬆* 的子集。

## <a name="integers"></a>■ 2. 整數

**嚴格:** 允許的任何序列至少為一個小數點，範圍為0到9(U+0030 - U+0039)，並可以帶一個負號(U+002D)。結果字符序列可能包含前導或尾隨空白。

{{% code "*Examples for Strict integers:*" %}}  
0  
123  
-98  
{{% /code %}}

**寬鬆:** 首先從字符序列中刪除所有空格。然後，根據 *嚴格* 模型解釋其餘字符序列(*abcde*)。如果此操作無法創建有效數字，則從序列(*abcd*)中刪除最後一個字符，然後再次測試該序列。這一直持續到產生有效數字或直到沒有剩餘字符為止，此後字符序列被確定為無效數字。

{{% code "*Examples for Loose integers:*" %}}  
123  
77 11  
-987x456  
{{% /code %}}

{{% code "*The interpreted integers from the preceding examples are:*" %}}  
123  
7711  
-987  
{{% /code %}}

## <a name="floating"></a>■ 3. 浮點數

**Strict:** Permitted is any sequence of at least one decimal digit in the range from 0 to 9 (U+0030 - U+0039), optionally interleaved by exactly one decimal separator in form of the period (U+002E), optionally prepended by a negative sign (U+002D). The resulting character sequence may include leading or trailing white spaces.

{{% code "*Examples for Strict floating-point numbers:*" %}}  
123  
123\.  
123.0  
123.456  
0.456  
\.456  
-123.456  
{{% /code %}} 

**Loose:** All white spaces are removed from the character sequence first. Then, the remaining character sequence (*abcde*) is interpreted according to the *Strict* model. If this fails to create a valid number, the last character is dropped from the sequence (*abcd*) and then, the sequence is tested again. This continues until a valid number is produced or until no character remains, after which the character sequence is determined to be an invalid number. 

{{% code "*Examples for Loose floating-point numbers:*" %}}  
-123 . 456  
987,333  
{{% /code %}}  

{{% code "*The interpreted floating-point numbers from the preceding examples are:*" %}}  
-123.456  
987  
{{% /code %}}

## <a name="times"></a>■ 4. Times

**Legacy:** Permitted is any of the following sequences:

{{% code %}}  
*hhh*__.__*mmss*  
*hhh*__.__*mms*  
*hhh*__.__*mm*  
*hhh*__.__*m*  
*hhh*  
{{% /code %}}

In these sequences, *hhh* denotes any sequence of at least one decimal digit to indicate the hour, *mm* denotes the two-digit minute part, *m* denotes a one-digit minute part, *ss* denotes a two-digit second part, *s* denotes a one-digit second part, and the character to separate the hours from the minutes is the period (U+002E). All digits need to be characters from 0 to 9 (U+0030 - U+0039). Leading or trailing white spaces are ignored. The total time is determined via the following formula, resulting in seconds since midnight:

{{% function "*Seconds since midnight for a given time:*" %}}  
3600\**hhh* + 60\**mm* + *ss*  
{{% /function %}}

If minutes or seconds are not indicated, they are assumed to be zero. You can use any non-negative hour, including values greater than or equal to 24. If, for example, a station arrival time is 23:59:00 (day 1), and the arrival time of the following station is 00:02:15 (day 2), then use the following sequences to represent these times in order to ensure a chronological order:

{{% code "*Examples for times:*" %}}  
23.5900  
24.0215  
{{% /code %}}

## <a name="colors"></a>■ 5. Color values

**Hexcolor:** A six-digit hexadecimal number is preceded by a number sign character (U+0023). An individual hexadecimal digit can be comprised of the decimal digits from 0 to 9 (U+0030 - U+0039), the lowercase letters from a to f (U+0061 - U+0066) and the uppercase letters from A to F (U+0041 - U+0046).The hexcolor has the following form:

{{% code %}}  
\#*RRGGBB*  
{{% /code %}}

In this sequence, RR represents the red component, GG the green component and BB the blue component. Each component ranges from 00 to FF (0 - 255), where 00 represents no contribution for that channel and FF full contribution.

Commonly used colors (to indicate transparency) include:

{{% code %}}  
<font color="Black">#000000 (black)</font>  
<font color="Red">#FF0000 (red)</font>  
<font color="Green">#00FF00 (green)</font>  
<font color="Blue">#0000FF (blue)</font>  
<font color="Cyan">#00FFFF (cyan)</font>  
<font color="Magenta">#FF00FF (magenta)</font>  
<font color="Yellow">#FFFF00 (yellow)</font>  
<font color="White">#FFFFFF (white)</font>  
{{% /code %}}