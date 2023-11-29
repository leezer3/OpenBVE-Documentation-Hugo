---
title: "数値の形式"
weight: 2
---

<font color="Gray">このページでは、様々なルートファイルと車両ファイルで使用する数値形式と、それらに準拠する方法について説明します。</font>

## ■目次

{{% contents %}}

- [1. 概要](#overview)
- [2. 整数](#integers)
- [3. 浮動小数点数](#floating)
- [4. 時刻形式](#times)
- [5. 色表現](#colors)

{{% /contents %}}

## <a name="overview"></a>■ 1. 概要

ルートファイルと車両ファイル内では、常に整数や浮動小数点数などの数値を使用しますが、場合によっては他の数値も使用します。 これらは、次章で説明する特定の形式に従うことが必要です。

数値の解析方法には、**Strict**および**Loose**の2つがあります。 Strictメソッドは非常に厳密な仕様であり、印刷上のミスを犯すスペースがありません。 このメソッドは、すべての新しいファイル形式で使用されます。 Looseメソッドは、古いリリースとの互換性を保持するために必要な、レガシー解析モデルです。 *Developing for openBVE*ページに記載されているさまざまなファイルは、使用されているモデルを示しています。 *Loose*モデルが許可されている場合は、*Strict*が*Loose*のサブセットを形成するため、*Strict*形式も使用できることに注意してください。

## <a name="integers"></a>■ 2. 整数型

**Strict:**使用できるのは、0から9 (U+0030 - U+0039) の範囲の少なくとも1つの10進数の任意の数列であり、オプションで負符号 (U+002D) が前に付加されます。 結果の文字列には、先頭または末尾の空白が含まれる場合があります。

{{% code "*Examples for Strict integers:*" %}}  
0  
123  
-98  
{{% /code %}}

**Loose:**最初に、すべての空白が文字列から削除されます。 次に、残りの文字列 (*abcde*) が*Strict*モデルに従って解釈されます。 ここで、有効な番号の作成に失敗した場合、最後の文字が文字列から削除され (*abcd*)、その後、文字列が再度テストされます。 これは、有効な数字が生成されるか、文字がなくなるまで続き、最終的に、文字列が無効な数字であると判断されます。

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

## <a name="floating"></a>■ 3. 浮動小数点型

**Strict:**使用できるのは、0〜9の範囲の少なくとも1つの10進数 (U+0030 - U+0039) の任意の数列です。オプションで、ピリオド (U+002E) の形式で1つの小数点記号を挿入します。オプションで負符号 (U+002D) を前に付けます。 結果の文字列には、先頭または末尾の空白が含まれる場合があります。

{{% code "*Examples for Strict floating-point numbers:*" %}}  
123  
123\.  
123.0  
123.456  
0.456  
\.456  
-123.456  
{{% /code %}} 

**Loose:**最初に、すべての空白が文字列から削除されます。 次に、残りの文字列 (*abcde*) が*Strict*モデルに従って解釈されます。 ここで、有効な番号の作成に失敗した場合、最後の文字が文字列から削除され (*abcd*)、その後、文字列が再度テストされます。 これは、有効な数字が生成されるか、文字がなくなるまで続き、最終的に、文字列が無効な数字であると判断されます。

{{% code "*Examples for Loose floating-point numbers:*" %}}  
-123 . 456  
987,333  
{{% /code %}}  

{{% code "*The interpreted floating-point numbers from the preceding examples are:*" %}}  
-123.456  
987  
{{% /code %}}

## <a name="times"></a>■ 4. 時刻形式

**Legacy:** 次のいずれの形式も使用することができます:

{{% code %}}  
*hhh*__.__*mmss*  
*hhh*__.__*mms*  
*hhh*__.__*mm*  
*hhh*__.__*m*  
*hhh*  
{{% /code %}}

上記に示した文字列では、*hhh*は時間を示す少なくとも1つの10進数字列を示します。*mm*は2桁の分部分を示し、*m*は1桁の分部分を示します。*ss*は2桁の秒の部分を示し 、* s *は1桁の秒の部分を示します。時間と分を区切る文字はピリオド (U+002E) です。 すべての数字は、0〜9の文字 (U+0030 - U+0039) である必要があります。 先頭や末尾の空白は無視されます。 合計時間は次の式で決定され、0時ちょうどからの秒数になります。

{{% function "*Seconds since midnight for a given time:*" %}}  
3600\**hhh* + 60\**mm* + *ss*  
{{% /function %}}

分または秒が指定されていない場合、ゼロと見なされます。 また、24以上の値を含む、負でない任意の時間も使用できます。たとえば、駅の到着時間が23:59:00 (1日目) で、次の駅の到着時間が00:02:15 (2日目) である場合 、次の文字列を使用してこれらの時間を表し、時系列順を確保します。

{{% code "*Examples for times:*" %}}  
23.5900  
24.0215  
{{% /code %}}

## <a name="colors"></a>■ 5. 色表現

**Hexcolor:** A six-digit hexadecimal number is preceded by a number sign character (U+0023). An individual hexadecimal digit can be comprised of the decimal digits from 0 to 9 (U+0030 - U+0039), the lowercase letters from a to f (U+0061 - U+0066) and the uppercase letters from A to F (U+0041 - U+0046).The hexcolor has the following form:

{{% code %}}  
\#*RRGGBB*  
{{% /code %}}

In this sequence, RR represents the red component, GG the green component and BB the blue component. Each component ranges from 00 to FF (0 - 255), where 00 represents no contribution for that channel and FF full contribution.

一般的に使用される色 (透明性を示す) には以下が含まれます。

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