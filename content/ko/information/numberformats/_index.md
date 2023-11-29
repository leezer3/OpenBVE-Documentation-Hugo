---
title: "Number formats"
weight: 2
---

<font color="Gray">This page describes which number formats are encountered in the various route and train files and how to adhere to them.</font>

## ■ 목차

{{% contents %}}

- [1. Overview](#overview)
- [2. Integers](#integers)
- [3. Floating-point numbers](#floating)
- [4. Times](#times)
- [5. Color values](#colors)

{{% /contents %}}

## <a name="overview"></a>■ 1. 개요

Within the route and train files, you will encounter numbers like integers or floating-point numbers all the time, occasionally also others. These numbers are required to adhere to a certain format, which is described in the following sections.

There are two parsing methods for numbers: **Strict** and **Loose**. The Strict method is a very tight specification which does not leave space for making typographic mistakes. This method is used in all new file formats. The Loose method is a legacy parsing model required for compatibility with older material. The different files as presented on the *Developing for openBVE* pages indicate which model is being used. Note that whenever a *Loose* model is permitted, you can also use the *Strict* formats as *Strict* forms a subset of *Loose*.

## <a name="integers"></a>■ 2. Integers

**Strict:** Permitted is any sequence of at least one decimal digit in the range from 0 to 9 (U+0030 - U+0039), optionally prepended by a negative sign (U+002D). The resulting character sequence may include leading or trailing white spaces.

{{% code "*Examples for Strict integers:*" %}}  
0  
123  
-98  
{{% /code %}}

**Loose:** All white spaces are removed from the character sequence first. Then, the remaining character sequence (*abcde*) is interpreted according to the *Strict* model. If this fails to create a valid number, the last character is dropped from the sequence (*abcd*) and then, the sequence is tested again. This continues until a valid number is produced or until no character remains, after which the character sequence is determined to be an invalid number. 

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

## <a name="floating"></a>■ 3. Floating-point numbers

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

**Hexcolor:** A six-digit hexadecimal number is preceded by a number sign character (U+0023). An individual hexadecimal digit can be comprised of the decimal digits from 0 to 9 (U+0030 - U+0039), the lowercase letters from a to f (U+0061 - U+0066) and the uppercase letters from A to F (U+0041 - U+0046).The hexcolor has the following form:

{{% code %}}  
\#*RRGGBB*  
{{% /code %}}

In this sequence, RR represents the red component, GG the green component and BB the blue component. Each component ranges from 00 to FF (0 - 255), where 00 represents no contribution for that channel and FF full contribution.

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