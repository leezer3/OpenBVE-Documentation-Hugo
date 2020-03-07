---
title: "与BVE Trainsim的不同之处"
linktitle: "与BVE的不同"
weight: 9
---

此页列出openBVE与BVETs文件格式之间**互不兼容**的不同。即：为BVE Trainsim开发的线路在openBVE中读取时，会产生与BVETs中不同的效果。目前已知的不兼容处只有这一个。

请注意，对于此页中所有的兼容性差别，openBVE开发组的态度是一样的：我们认为使openBVE的功能特性稳定而始终如一，比起为了去兼容BVETs而反而使openBVE无法向后兼容，是更加重要的。因此此处的不兼容行为将永久不会被修复。

## ■ Track.Signal 指令  (CSV, RW 线路)

Track.Signal 指令被用来在CSV线路中放置默认日式信号机。(在RW中称作Track.Sig)

在openBVE中，这一指令接受以下参数：

{{% command %}}  
**Track.Signal** *模式*; *~~未使用~~*; *X*; *Y*; <u>*Yaw*</u>; *Pitch*; *Roll*  
{{% /command %}}

但在BVETs中，这一指令接受的是以下参数：

{{% command %}}  
**Track.Signal** *模式*; *标签*; *X*; *Y*; <u>*类型*</u>  
{{% /command %}}

BVETs中的*标签*参数是信号机的文字描述，在openBVE中无功能（因此在文档中标为 *未使用*）。

BVETs中有一个*类型*参数，可接受1,2,3三个值。它被用来标识不同种类的信号机，如进站信号与出站信号。但openBVE开发时，由于意外，没有考虑到这个参数。然后，随着产生了控制信号机朝向的需求，openBVE引入了*偏转角*,*俯仰角*和*侧倾角*三个参数。因此，BVETs的*类型*参数和openBVE的*偏转角*参数位置重合了。如果一条为BVETs编写的线路中用到了信号机的*类型*参数，openBVE会将其误解为该信号机有着1°~3°的偏转角。一般来说，这个小角度不会产生能注意到的区别，而且尤其是这个参数在BVETs里也不多用。
