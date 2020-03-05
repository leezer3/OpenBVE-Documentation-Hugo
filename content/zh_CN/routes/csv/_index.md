---
title: "**CSV** 线路格式"
linktitle: "CSV 线路格式"
weight: 1
---

➟ [快速查阅...]({{< ref "/routes/csv_quick/_index.md" >}}) 

## ■ 内容目录

{{% contents %}}

- [1. 综述](#overview)
- [2. 语法](#syntax)
- [3. 预处理](#preprocessing)
- [4. Options (配置) 命名空间](#options)
- [5. Route (路线) 命名空间](#route)
- [6. Train (列车) 命名空间](#train)
- [7. Structure (结构) 命名空间](#structure)
- [8. Texture (材质) 命名空间](#texture)
- [9. Cycle (循环) 命名空间](#cycle)
- [10. Signal (信号) 命名空间](#signal)
- [11. Track (轨道) 命名空间](#track)
  - [11.1. 轨道](#track_rails)
  - [11.2. 几何变换](#track_geometry)
  - [11.3. 物件](#track_objects)
  - [11.4. 车站](#track_stations)
  - [11.5. 信号与限速](#track_signalling)
  - [11.6. 车载信号系统](#track_safety)
  - [11.7. 杂项](#track_misc)

{{% /contents %}}

## <a name="overview"></a>■ 1. 综述

CSV格式线路是以纯文本形式编辑的线路。

线路文件是纯文本，且可以使用任意[字符编码]({{< ref "/information/encodings/_index.md" >}})，但是，我们推荐线路作者们使用UTF8-BOM编码格式。游戏在解析数字数据时，使用的[解析方法]({{< ref "/information/numberformats/_index.md" >}})是**宽松**的(特别指出处除外)，但是，我们推荐线路作者们*严格规范*地编写线路文件。 这个文件一般来说可以被放在*Train*或*Railway*文件夹下的任何地方。文件名可以随意，但扩展名必须是**.csv**。线路文件被从头到尾逐行解析，每行被分割并被从左到右解析。

线路文件包括一系列指令，用来导入线路中用到的模型（Structure（结构）命名空间*)，线路的属性信息（说明线路使用的默认列车和背景等信息），文件的其余部分是Track（轨道）命名空间* 在这一部分中，主轨道位置（一般以米为单位）被用来描述轨道在哪里转弯，车站的位置在哪里，墙壁应当在哪里开始、哪里结束，以此类推。说得明白一点儿，Track（轨道）命名空间的指令是要放在最后的。

这个格式假设了一条游戏默认的主轨道（0号轨道），不可以指定它开始的位置，也不能结束它。和游戏中其他轨道不同的是，它从线路的开始一直延续到线路的终点，代表着玩家驾驶的列车行驶的轨道。除此之外，游戏中的其他轨道都是只供装饰，不能行驶的，但可以用 [轨道跟随物件]({{< ref "routes/xml/trackfollowingobject/_index.md" >}}) 来让AI车在其上行驶。

可以几何意义上地弯曲和抬升默认的主轨道，而其他轨道都是相对于主轨道定义的，并随主轨道弯曲起伏。除非特别修改定义，线路中每25米划分为一个区间块，特定的命令只有在区间块的边界位置（整25米位置）才能发挥作用。物体的放置（尤其是在弯道上）总是基于一个坐标系，它的轴并不随轨道弯曲，而是直直地指向邻近的下一个区间块。
* 有点不严谨地说，在CSV线路中和“章节”“部分”差不多。

➟ [还可查阅这份CSV格式的快速参考手册...]({{< ref "/routes/csv_quick/_index.md" >}})

## <a name="syntax"></a>■ 2. 语法

对于线路文件中的每一行，在开头和结尾的[空格]({{< ref "/information/whitespaces/_index.md" >}})会被统统忽略。然后，每一行指令都会按逗号(U+002C，英文半角的那个)分割。于是，每一行都会被看作这样一个格式：

{{% command %}}  
*表达式<sub>1</sub>*, *表达式<sub>2</sub>*, *表达式<sub>3</sub>*, ..., *表达式<sub>n</sub>*  
{{% /command %}}

表达式内容主要有以下类别：

##### ● 注释

注释就是给人看的，游戏完全不管的。以分号(U+003B，英文半角的那个)开头的表达式都会被视为注释。

##### ● 主轨道位置

{{% command %}}
*位置数字*
{{% /command %}}
一个非负的 [严格格式]({{< ref "/information/numberformats/_index.md" >}}) 浮点数，代表一个主轨道位置。随后的指令都将以此位置作为基准点。

{{% command %}}  
*部分<sub>1</sub>*:*部分<sub>2</sub>*:...:*部分<sub>n</sub>*  
{{% /command %}}  
这是一个配合Options.UnitOfLength的更加复杂的距离指定格式，可用于非公制计量单位。每一个 *部分<sub>i</sub>* 都是 [炎严格格式]({{< ref "/information/numberformats/_index.md" >}}) 的浮点数。 *部分<sub>1</sub>* 会被乘上 *系数<sub>1</sub>*, *部分<sub>2</sub>* 乘上 *系数<sub>2</sub>*，以此类推，以此类推，真正的主轨道位置是所有积的和。这个结果必须是非负的。各部分被冒号(U+003A，英文半角的那个)分隔。如果想了解如何设定系数，请参见Options.UnitOfLength一节。

在任何参数中使用距离的命令中，这个冒号表示法就可以被使用，到时我们会用<font color="green">绿色</font>标出这种情况。

当*n*个单位系数被使用Options.UnitOfLength定义，但是使用冒号表示法时输入的部分却少了，那么这些系数将会被向右匹配，在左边的会被忽略。因此，这几种表示方法是等效的：*0:0:2*，*0:2*，和*2*.

##### ● 指令

没有参数的指令：

{{% command %}}  
*指令名称*  
{{% /command %}}

含有几个参数的指令：

{{% command %}}  
*指令名称* *参数<sub>1</sub>*;*参数<sub>2</sub>*;*参数<sub>3</sub>*;...;*参数<sub>n</sub>*
*指令名称*(*参数<sub>1</sub>*;*参数<sub>2</sub>*;*参数<sub>3</sub>*;...;*参数<sub>n</sub>*)
{{% /command %}}

不仅有参数还有后缀和编号的指令：

{{% command %}}  
*指令名称*(*编号<sub>1</sub>*;*编号<sub>2</sub>*;...;*编号<sub>m</sub>*) *参数<sub>1</sub>*;*参数<sub>2</sub>*;*参数<sub>3</sub>*;...;*参数<sub>n</sub>*
*指令名称*(*编号<sub>1</sub>*;*编号<sub>2</sub>*;...;*编号<sub>m</sub>*).*后缀* *参数<sub>1</sub>*;*参数<sub>2</sub>*;*参数<sub>3</sub>*;...;*参数<sub>n</sub>*
*指令名称*(*编号<sub>1</sub>*;*编号<sub>2</sub>*;...;*编号<sub>m</sub>*).*后缀*(*参数<sub>1</sub>*;*参数<sub>2</sub>*;*参数<sub>3</sub>*;...;*参数<sub>n</sub>*)
{{% /command %}}

规则：

*指令名称*是大小写都可以的。编号和参数被分号(U+003B，英文半角的那个)隔开。在*指令名称*、编号和参数周围的空格都是被忽略的，括号周围的空格也是被忽略的。

如果要使用编号，它必须被成对括号(U+0028，英文半角在键盘9上面的那个)和(U+0029，英文半角在键盘0上面的那个)括起来。在使用编号时至少要提供一个参数和一个*后缀*。

有两个使用参数的方法变种，除了$开头的预处理指令($Chr, $Rnd, $Sub, ...)之外，可以按照个人喜好二选一。
第一种方法：参数被至少一个空格(U+0020，平常用的那个)和编号、指令的大名以及*后缀*分开。
第二种方法：参数被成对括号(U+0028，英文半角在键盘9上面的那个)和(U+0029，英文半角在键盘0上面的那个)括起来。
在第二种方法中，当使用编号时就必须使用*后缀*。在参数周围的空格都会被忽略。

请注意在有些指令中，不管是用哪种表示方法，*后缀*都是必需的。在接下来的文档中，必需的*后缀*将被**加粗**，对于第一种方法加不加均可的后缀将被使用<font color="gray">灰色</font>表示。

##### ● **With** 语句

{{% command %}}  
With *命名空间前缀*  
{{% /command %}}

All subsequent commands that start with a period (U+002E) are prepended by *Prefix*. For example:

{{% code %}}  
With Route  
.Gauge 1435  
.Timetable 1157_M  
{{% /code %}}

和这个是等效的：

{{% code %}}  
Route.Gauge 1435  
Route.Timetable 1157_M  
{{% /code %}}

## <a name="preprocessing"></a>■ 3. 预处理

Before any of the commands in the route file are actually interpreted, the expressions are preprocessed. The first thing done is to replace any occurrences of the $-directives within an expression from right to left. The $Chr, $Rnd and $Sub directives may be nested in any way, while $Include, $If, $Else and $EndIf must not appear inside another directive.

{{% warning-nontitle %}}

预处理指令的语法不可以随意使用，必须以下面给出的形式出现。

{{% /warning-nontitle %}}

---

{{% command %}}  
$Include(*文件*)  
$Include(*文件*:*主轨道位置偏移量*)  
$Include(*文件<sub>1</sub>*; *权值<sub>1</sub>*; *文件<sub>2</sub>*; *权值<sub>2</sub>*; ...)  
{{% /command %}}

{{% command-arguments %}}  
***文件<sub>i</sub>***: 要被导入本线路的另一个文件。 
***权值<sub>i</sub>***: 一个正浮点数，表示对应的这个文件被使用的可能性大小。数越大，这个文件就越可能被随机选中。  
{{% /command-arguments %}}

该指令按照权值随机选出一个线路文件，再将其内容导入本线路中。因为该文件内容会被不加修改直接在该指令的位置插入，可能需要照顾一下With指令等，不要让它们出现冲突。如果参数中最后一个文件没有给出权值，它会被按1处理。

$Include指令在几个线路有大量重复内容时很有用，可以把重复内容单独存进另一个文件，然后在主文件中导入它，以方便编码。这个指令还可以被用来随机选取线路代码。请注意导入的文件中也可以包含$Include指令来引用更多的文件，但是应该避免循环引用，例如A导入B而B又导入A。要导入的那个文件不应该使用.csv作为格式扩展名（也许用.include是个方便区分的好主意），不然玩家可能会一不小心从主菜单选择了这个“不完全的线路文件”然后发现没法加载（除非那个文件本身就是一个单独的线路，然后本来就想让玩家加载它）。

如果任何一个*文件<sub>i</sub>*被一个:*主轨道位置偏移量*后缀，那个文件中所有的主轨道位置表达式都会被按照这个量**以米作单位**偏移。例如，$Include(stations.include:2000) 会将stations.include文件中的所有内容在插入前都向前偏移2000米。需要注意这些主轨道位置表达式是在所有的预处理命令都被执行完才会被做偏移处理。这意味着像"1$Rnd(2;8)00"这样的主轨道位置表达式尽管在预处理前还不是一个主轨道距离表达式，但是它的随机结果照样会被进行偏移处理。

{{% warning-nontitle %}}

只有OpenBVE1.2.11版以上支持“主轨道位置偏移量”。

{{% /warning-nontitle %}}

---

{{% command %}}  
$Chr(*Ascii编号*)  
{{% /command %}}

{{% command-arguments %}}
***Ascii编号***: 一个在10~13或20~127范围内的数，代表一个拥有对应ASCII码的字符。
{{% /command-arguments %}}

这个指令会在原位插入一个对应*Ascii码*的字符。如果想要在某个地方放置一个字符却又不想破坏指令语法结构（比如站名里开头带空格、带括号逗号分号等，如果不这样加入就会被游戏误读），可以使用这个指令。有关的字符有：

{{% table %}}

| Ascii码 | 含义             | 对应字符 |
| ---- | ------------------- | --------- |
| 10   | 换行 (CR)             | *newline* |
| 13   | 换行 (LF)             | *newline* |
| 20   | 空格               | *space*   |
| 40   | 括号 | (         |
| 41   | 回括号 | )         |
| 44   | 逗号               | ,         |
| 59   | 分号           | ;         |

{{% /table %}}

"$Chr(13)$Chr(10)"(CRLF)代表一次换行。插入$Chr(59)可能基于它的位置被解释为注释开始或指令参数分隔符。

---

{{% command %}}  
$Rnd(*最小值*; *最大值*)  
{{% /command %}}

{{% command-arguments %}}
***最小值***：一个整数，代表随机数可以取的最小值。
***最大值***：一个整数，代表随机数可以取的最大值。
{{% /command-arguments %}}

这个指令会在原位插入一个位于*最小值*和*最大值*之间的随机整数。可以用这个来给线路添加一些随机性。

{{% code "*Example for the use of the $Rnd directive:*" %}}  
10$Rnd(3;5)0, Track.FreeObj 0; 1  
{{% /code %}}

会产生以下三个结果之一：
{{% code "*Possible outcome from the previous example is exactly __one__ of these lines:*" %}}  
1030, Track.FreeObj 0; 1  
1040, Track.FreeObj 0; 1  
1050, Track.FreeObj 0; 1  
{{% /code %}}

---

{{% command %}}  
$Sub(*编号*) = *表达式*  
{{% /command %}}

{{% command-arguments %}}  
***编号***: 一个非负整数，代表要存储的变量编号。 
***表达式***: 要存进这个变量的数字的值。
{{% /command-arguments %}}

这个指令只应该单独出现，它将会把*表达式*的值赋给编号为*编号*的这个变量。它不在原位插入任何内容。可以把一个随机数存起来然后以后多次使用（比如说放置几棵到一条随机但是却相同的轨道的排成一排的树）。下面关于 $Sub(*编号*) 的介绍处有几个使用实例。

{{% warning %}}

#### 程序实现备注

虽然变量中也可以存储非数字的内容，还是不能把逗号通过$Chr(44)存进去然后希望它在使用时会起分隔符的作用。但是，可以把分号通过$Chr(59)存进去然后把它调用时放在开头使那一行成为注释。不过因为可以使用$Include和$If来进行条件判断，所以并没有必要这么干。

{{% /warning %}}

---

{{% command %}}
$Sub(*编号*)
{{% /command %}}

{{% command-arguments %}}
***编号***：一个非负整数，代表要读出的变量编号。
{{% /command-arguments %}}

这个指令会在原位插入编号为*编号*的变量的内容。在读取前这个变量必须先被赋值。

{{% code "*Example for the use of the $Sub(Index)=Value and $Sub(Index) directives:*" %}}  
$Sub(0) = $Rnd(3; 5)  
1000, Track.FreeObj $Sub(0); 47  
1020, Track.FreeObj $Sub(0); 47  
1040, Track.FreeObj $Sub(0); 47  
{{% /code %}}

在这个例子中，三个Track.FreeObj指令都使用同样的随机数值，所以这三个物体会被放在同一条随机的轨道边。如果使用三个$Rnd(3;5)而不是$Sub，这三个物体可能被单独放在不同的轨道边。

---

{{% command %}}
$If(*条件*)
{{% /command %}}

{{% command-arguments %}}
***条件***：一个数值。如果它等于0，则它代表**不成立**的情况。如果它不等于0，则代表**成立**的情况。
{{% /command-arguments %}}

$If(如果……那么)指令让游戏只在这个条件成立，即为非零值时才解析下面的线路指令。$If的后面必须有一个$EndIf。在$If和$EndIf之间也可以加一个$Else来表示条件是不成立的时要解析的指令。

---

{{% command %}}  
$Else()  
{{% /command %}}

$Else(否则)指令只在前面的$If的条件是不成立的时才解析下面的线路指令。

---

{{% command %}}  
$EndIf()  
{{% /command %}}

$EndIf指令标识前面的$If指令的影响范围到此结束。

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

可以嵌套$If指令。如果把$If/$Else/$EndIf放在不同的几行上，可以更清晰地表示块结构并使它更易读（例如第一个例子）。

---

**最后**，当预处理结束，线路中的所有指令都会被按照轨道位置重新排序。

{{% code "*Example of a partial route file:*" %}}  
1000, Track.FreeObj 0; 23  
1050, Track.RailType 0; 1  
10$Rnd(3;7)0,  Track.Rail 1; 4  
Track.FreeObj 1; 42  
{{% /code %}}

经过预处理之后(假设随机结果是3):
{{% code "*Preprocessing the $Rnd directive (assuming 3 is produced):*" %}}  
1000, Track.FreeObj 0; 23  
1050, Track.RailType 0; 1  
1030, Track.Rail 1; 4  
Track.FreeObj 1; 42  
{{% /code %}}

最后被按照顺序重新排序:
{{% code "*Sorting by associated track positions:*" %}}  
1000, Track.FreeObj 0; 23  
1030, Track.Rail 1; 4  
Track.FreeObj 1; 42  
1050, Track.RailType 0; 1  
{{% /code %}}

## <a name="options"></a>■ 4. Options (选项) 命名空间

这个命名空间里的指令设置一些基本设置，并影响其他指令的实际处理效果。所以应当在开始编写写其他指令之前先使用这些指令把设置都调整妥当。

---

{{% command %}}
**Options.UnitOfLength** *与米的换算系数<sub>1</sub>*; *与米的换算系数<sub>2</sub>*; *与米的换算系数<sub>3</sub>*; ...; *与米的换算系数<sub>n</sub>*
{{% /command %}}

{{% command-arguments %}}
***与米的换算系数<sub>i</sub>***：一个浮点数，表示一个单位等于多少米。*与米的换算系数1*的默认值是1，其他的默认值都是0。
{{% /command-arguments %}}

这个指令可以被用来改变其他指令使用的长度单位。当和形如*部分<sub>1</sub>*:*部分<sub>2</sub>*:...:*部分<sub>n</sub>*的主轨道位置一起使用时，*部分<sub>i</sub>*会被乘上*系数<sub>i</sub>*，以此类推，真正的主轨道位置是所有积的和。更改了长度单位时，您也应同时使用 Options.BlockLength 将区间块长度也设为相应单位。

换算系数的几个示例：

{{% table %}}

| 单位 | 换算系数 |
| ------------ | ----------------- |
| 哩/英里         | 1609.344          |
| 冈特测链        | 20.1168           |
| 米/公尺        | 1                 |
| 码         | 0.9144            |
| 呎/英尺         | 0.3048            |

{{% /table %}}

在下面的示例中，会被Options.UnitOfLength影响的指令参数将被用<font color="green">绿色</font>表示。

---

{{% command %}}
**Options.UnitOfSpeed** *与千米每时的换算系数*
{{% /command %}}

{{% command-arguments %}}
***与千米每时的换算系数***：一个浮点数，表示一个单位等于多少千米每时。默认值是1。
{{% /command-arguments %}}

这个指令可以被用来改变其他指令使用的速度单位。换算系数的几个示例：

{{% table %}}

| 单位    | 换算系数 |
| --------------- | ----------------- |
| 米每秒   | 3.6               |
| 英里每时      | 1.609344          |
| 千米每时 | 1                 |

{{% /table %}}

在下面的示例中，会被Options.UnitOfSpeed影响的指令参数将被用<font color="blue">蓝色</font>表示。

---

{{% command %}}
**Options.BlockLength** <font color="green">*长度*</font>
{{% /command %}}

{{% command-arguments %}}
***长度***：一个正浮点数，表示区间块的长度，**默认**的单位是**米**。默认值是25米。
{{% /command-arguments %}}

这个指令可以设置区间块的长度。这是个全局设置，一旦设置就不能来回更改。如果Options.UnitOfLength在该指令前被调用过，*长度*会使用Options.UnitOfLength作为单位。

---

{{% command %}}
**Options.ObjectVisibility** *模式*
{{% /command %}}

{{% command-arguments %}}
***模式***：游戏判断一个物体是否可视采用的算法。默认值是0（原版）。
{{% /command-arguments %}}

▸ *模式*的可选项：

{{% command-arguments %}}
**0**: 原版：当该物体所在的区间块已经被玩家通过，游戏就认为这个物体不再可见，也不再加载显示这个物体。游戏不会显示任何玩家后方的物体。在朝前看时不会有任何问题，但当向后看时所有物体都会消失，且没有任何途径可解决。自相交的轨道（例如环线）不会被正确显示。该设置会造成不正确且无法解决的视觉效果，保留且默认采取该设置只是为了兼容一些老线路。请不要在新线路中采用这个设置。
**1**: 基于轨道：游戏仍然会加载列车后方可视范围内的物体。这是按照轨道位置计算的。可惜自相交的轨道（例如环线）还是不会被正确显示。推荐添加这个设置。
{{% /command-arguments %}}

---

{{% command %}}
**Options.SectionBehavior** *模式*
{{% /command %}}

{{% command-arguments %}}
***模式***：Track.Section指令应当被如何理解。默认值是0（默认）。
{{% /command-arguments %}}

▸ *模式*的可选项：

{{% command-arguments %}}
**0**: 默认：在Track.Section *状态<sub>0</sub>*; *状态<sub>1</sub>*; ...; *状态<sub>n</sub>*中，任何一个*状态<sub>i</sub>*都代表当一个闭塞区间的前方有*i*个闭塞区间清空时要传达给信号机的信号状态。
**1**: 简化：在Track.Section *状态<sub>0</sub>*; *状态<sub>1</sub>*; ...; *状态<sub>n</sub>*中，每个闭塞区间的信号状态都是比它前面一个闭塞区间的状态值要高的最小值。
{{% /command-arguments %}}

---

{{% command %}}
**Options.CantBehavior** *模式*
{{% /command %}}

{{% command-arguments %}}
***模式***：Track.Curve指令应当被如何理解。默认值是0（忽略符号）
{{% /command-arguments %}}

▸ *模式*的可选项：

{{% command-arguments %}}
**0**: 忽略符号：Track.Curve中的*CantInMillimeters*参数是无符号的，符号会被忽略，轨道总是会向弯道中心倾斜来提供弯道向心力。轨道不会在直道段倾斜。
**1**: 保留符号：Track.Curve中的*CantInMillimeters*参数是有符号的，正值会使轨道向弯道中心倾斜，负值会使轨道向弯道外侧倾斜。轨道会在直道段倾斜，正值使轨道右倾，负值使轨道左倾。
{{% /command-arguments %}}

---

{{% command %}}
**Options.FogBehavior** *模式*
{{% /command %}}

{{% command-arguments %}}
***模式***：Track.Fog命令应当被如何理解。默认值是0（基于区间块）
{{% /command-arguments %}}

▸ *模式*的可选项：

{{% command-arguments %}}
**0**: 基于区间块：雾的颜色和范围从原先Track.Fog设置时的区间块的到新Track.Fog设置时的区间块以线性插值平滑过渡。
**1**: 线性：雾的颜色和范围从两次Track.Fog调用的位置之间线性插值平滑过渡。这和Track.Brightness的效果类似。
{{% /command-arguments %}}

---

{{% command %}}
**Options.CompatibleTransparencyMode** *模式*
{{% /command %}}

{{% command-arguments %}}
***模式***：当一个物体的材质使用的颜色通道不是真彩色时该如何判断透明区域。这可以在游戏设置中调整，但该指令可以超控游戏设置中的选项。
{{% /command-arguments %}}

▸ *模式*的可选项：

{{% command-arguments %}}
**0**: 特定匹配：如果该图像使用的颜色通道色板内不包括设定的透明色，那么这个图象就会按不透明来处理。
**1**: 模糊匹配：如果该图像使用的颜色通道色板内不包括设定的透明色，那么就转而匹配色板内与此最接近的颜色。
{{% /command-arguments %}}

---

{{% command %}}
**Options.EnableBveTsHacks** *模式*
{{% /command %}}

{{% command-arguments %}}
***模式***：是否应用几项对于部分奇葩的BVETs2/4线路的兼容性设置。这可以在游戏设置中调整，但该指令可以超控游戏设置中的选项。
{{% /command-arguments %}}

▸ *模式*的可选项：

{{% command-arguments %}}
**0**: 不启用兼容模式。
**1**: 启用兼容模式。
{{% /command-arguments %}}

## <a name="route"></a>■ 5. Route (路线) 命名空间

Commands from this namespace define general properties of the route.

---

{{% command %}}  
**Route.Comment** *Text*  
{{% /command %}}

{{% command-arguments %}}  
***Text***: The route comments which appear in the route selection dialog.  
{{% /command-arguments %}}

{{% warning-nontitle %}}  
You need to use $Chr directives if you want to include newlines, commas and the like in the text.  
{{% /warning-nontitle %}}

---

{{% command %}}  
**Route.Image** *File*  
{{% /command %}}

{{% command-arguments %}}  
***File***: The file name of the image which appears in the route selection dialog, relative to the route's folder.  
{{% /command-arguments %}}

---

{{% command %}}  
**Route.Timetable** *Text*  
{{% /command %}}

{{% command-arguments %}}  
***Text***: The text which appears at the top of the default timetable.  
{{% /command-arguments %}}

{{% warning-nontitle %}}  
You need to use $Chr directives if you want to include newlines, commas and the like in the text.  
{{% /warning-nontitle %}}

---

{{% command %}}  
**Route.Change** *Mode*  
{{% /command %}}

{{% command-arguments %}}  
***Mode***: The mode for the train's safety system to start in. The default value is implementation-specific.  
{{% /command-arguments %}}

▸ Available options for *Mode*:

{{% command-arguments %}}  
**-1**: The safety system is **activated** and the *service* brakes are applied.  
**0**: The safety system is **activated** and the **emergency** brakes are applied.  
**1**: The safety system is *deactivated* and the **emergency** brakes are applied.  
{{% /command-arguments %}}

---

{{% command %}}  
**Route.Gauge** *ValueInMillimeters*  
{{% /command %}}

{{% command-arguments %}}  
***ValueInMillimeters***: A floating-point number representing the rail gauge, measured in **millimeters** (0.001 meters). The default value is 1435.  
{{% /command-arguments %}}

{{% note %}}

Train.Gauge is the same as Route.Gauge.

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
| 4       | <font color="#00C000">●</font>                               | *unlimited* |
| 5       | <font color="#00C000">●●</font>                              | *unlimited* |

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

Route.RunInterval is the same as Train.Interval.

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
**Route.Elevation** *<font color="green">Height</font>*  
{{% /command %}}

{{% command-arguments %}}  
***<font color="green">Height</font>***: A floating-point number representing the initial height above sea level, **by default** measured in **meters** (m). The default value is 0.  
{{% /command-arguments %}}

---

{{% command %}}  
**Route.Temperature** *ValueInCelsius*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: A floating-point number representing the initial temperature in **Celsius**. The default value is 20.  
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
**Route.LoadingScreen** *Image*  
{{% /command %}}

{{% command-arguments %}}    
***Image***: A path to a supported image file.  
{{% /command-arguments %}}

This command allows a custom image to be set as the loading screen background.

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
*1* : The camera will be placed in 'Track Camera' mode.  
*2* : The camera will be placed in 'Flyby Camera' mode.  
*3* : The camera will be placed in 'Flyby Zooming Camera' mode.  
{{% /command-arguments %}}

This command allows the route developer to place the initial camera in one of the alternate camera modes.

---

{{% command %}}  
**<font color=#555555>Route.DeveloperID</font>**  
{{% /command %}}

<font color=#555555>This command is ignored by openBVE.</font>

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
***RunSoundIndex***: A non-negative integer representing the train's flange sound to associate to the rail type.  
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

Train.Gauge is the same as Route.Gauge.

{{% /note %}}

---

{{% command %}}  
**Train.Interval** *Interval<sub>0</sub>*; *Interval<sub>1</sub>*; ...; *Interval<sub>n-1</sub>*  
{{% /command %}}

{{% command-arguments %}}  
***ValueInSeconds***: A floating-point number representing the time interval between the player's train and the preceding train, measured in **seconds**. The default value is 0.  
{{% /command-arguments %}}

{{% note %}}

Train.ValueInSeconds is the same as Route.RunInterval.

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

<font color=#555555>This command is ignored by openBVE.</font>

---

{{% command %}}  
**<font color=#555555>Train.Station</font>**  
{{% /command %}}

<font color=#555555>This command is ignored by openBVE.</font>

## <a name="structure"></a>■ 7. The Structure namespace

The commands in the Structure namespace define which objects to use in other commands. Generally, commands like Track.Rail, Track.FreeObj and so on create objects referenced by a *StructureIndex*. This *StructureIndex* is specific to that command, so you can define a set of objects specific to Track.Rail, Track.FreeObj and so on.

The general syntax for commands in the Structure namespace is:

{{% command %}}  
**Structure._Command_(_StructureIndex_)**<font color="gray">.Load</font> *FileName*  
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
| FreeObj    | Defines objects for Track.FreeObj.                           |
| Beacon     | Defines objects for Track.Beacon.                            |

{{% /table %}}

Generally, supported objects are B3D, CSV, X and ANIMATED. However, the FormCL, FormCR, RoofCL, RoofCR, CrackL and CrackR commands only accept B3D, CSV and X objects.

➟ [More information about forms, roofs and cracks...]({{< ref "/routes/formroofcrack/_index.md" >}})

Additionally, there is the Structure.Pole command, which has a slightly different syntax:

{{% command %}}  
**Structure.Pole(_NumberOfAdditionalRails_; _PoleStructureIndex_)**<font color="gray">.Load</font> *FileName*  
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
**Texture.Background(_BackgroundTextureIndex_)**<font color="gray">.Load</font> *FileName*  
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
**Texture.Background(_BackgroundTextureIndex_).X** *RepetitionCount*  
{{% /command %}}

{{% command-arguments %}}  
***RepetitionCount***: The number of times the background image is repeated in a full circle. The default value is 6.  
{{% /command-arguments %}}

{{% note %}}

Ignored if using a dynamic or object based background.

{{% /note %}}

---

{{% command %}}  
**Texture.Background(_BackgroundTextureIndex_).Aspect** *Mode*  
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
***Rate***: A floating-point number representing a turn. The default value is 0.  
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

The "changing ends" feature is only available in the development release 1.2.11 and above.

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

The "changing ends" feature is only available in the development release 1.2.11 and above.

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