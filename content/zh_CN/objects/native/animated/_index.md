---
title: "**.animated** 动画物件"
linktitle: "ANIMATED 动画物件"
weight: 3
---

## ■ 内容目录

{{% contents %}}

- [1. 综述](#overview)
- [2. 小节](#description)
- [3. 中缀运算符表](#operators)
- [4. 函数表](#functions)
- [5. 变量表](#variables)
- [6. 性能概况](#performance)
- [7. 制作提示](#tips)
- [8. 示例函数](#examples)
- [9. 正式语法](#grammar)

{{% /contents %}}

## <a name="overview"></a>■ 1. 综述

ANIMATED动画物件格式是一种容器格式，使你可以引用组合其他的多个模型（B3D/CSV/...）并给它们添加动画。除了制作动画之外，你也能只用它来组合多个模型（包括其他的ANIMATED动画物件）。

除了一些明确指出不允许的指令之外，ANIMATED动画物件可以被用在CSV/RW线路中，作为列车模型用在 *extensions.cfg* 中，还可以作为3D驾驶室模型用在 *panel.animated* 文件中。

##### ● 基本格式

动画是通过以下类型的语句实现的：

- 状态变化 —— 简单地在不同的时间点切换成不同的模型
- 平移变换 —— 在三个独立的方向轴（XYZ）上移动物体
- 旋转变换 —— 在三个独立的轴（XYZ）上旋转物体
- 材质偏移 —— 在两个独立的方向（UV）上移动对象的纹理坐标

##### ● 一点点编码格式

这个动画文件可以是任何 [编码格式]({{< ref "/information/encodings/_index.md" >}}) 的纯文本文件， 但是，使用带 BOM 的 UTF-8 编码是最佳的选择。 数字的 [解析格式]({{< ref "/information/numberformats/_index.md" >}}) 是 **严格** 的。文件名可以任意选择，但是扩展名必须为 **.animated** 。 这个文件是通过从上到下通过分析各行的描述来解析的。

## <a name="description"></a>■ 2. 小节

##### ● [Include] 小节

你可以使用 [Include] 小节来引入组合其他的模型，这可以让你将ANIMATED物件作为一个容器来组合你的其它物件。当然 [Include] 小节的数量是随意的，你可以给任意数量的对象进行分组操作。

{{% command %}}  
[Include]  
{{% /command %}}  
这行代码开始一个Include小节。

{{% command %}}
*文件名或路径<sub>0</sub>*   
*文件名或路径<sub>1</sub>*   
*文件名或路径<sub>2</sub>*   
...  
{{% /command %}}
定义一系列的模型对象来原样组合在一起。

{{% command %}}  
**Position = X, Y, Z**  
{{% /command %}}  
将你引入的模型按照三维坐标来偏移。对于其下的文件都有效。

------

##### ● [Object] 小节

你可以使用 [Object] 小节来创建一个普通的动画。这需要你通过 *States* 参数设置至少一个模型，并使用相应的函数来控制动画。[Object] 小节数量也是随意的。

{{% command %}}  
[Object]  
{{% /command %}}  
这行代码标志这个小节开始。

{{% command %}}  
**Position = X, Y, Z**  
{{% /command %}}  
定义对象的整体位置。这和在 CSV/B3d 文件中最后加一句TranslateAll很类似，但这个指令将会在所有其他函数变换都完成后才被执行。例如你如果需要旋转对象， 此时旋转的的中心点仍然是原点 (0,0,0)， *Position* 命令只会在旋转之后来才会进行偏移坐标操作。

{{% command %}}  
**States = File<sub>0</sub>, File<sub>1</sub>, ..., File<sub>n-1</sub>**  
{{% /command %}}  
加载 *n* 个 CSV/B3D/X 模型对象，每加载一个文件就会自带一个状态索引值，从第一个文件开始为 0 不断递增，当你需要使用状态变化的时候才需要使用多个文件。这样你可以在多个模型之间选择一个来显示。

{{% command %}}  
**StateFunction = 式子**  
{{% /command %}}  
这个指令指定状态变化所遵循的 *式子* ，其值将会被四舍五入到整数，如果这个整数在 0 ~ *n* -1 之间（ *n* 为你使用 *States* 指令时所设定的状态数量），那么这样将会显示出相应的状态，如果索引值指向的对象不存在，则不会显示任何物体。如果你需要做出一个物体的显示隐藏效果，可以使用后者这个特性。

{{% command %}}  
**TranslateXDirection = X, Y, Z**  
**TranslateYDirection = X, Y, Z**  
**TranslateZDirection = X, Y, Z**  
{{% /command %}}  
这三个指令分别定义*TranslateXFunction* ，*TranslateYFunction* 和 *TranslateZFunction* 的偏移方向，默认方向是：

*TranslateXDirection = 1, 0, 0*  
*TranslateYDirection = 0, 1, 0*  
*TranslateZDirection = 0, 0, 1*

这样意味着TranslateXFunction将会默认向右移动，TranslateYFunction默认向上移动，TranslateZFunction默认向前移动，这也是为什么这样命名的原因。如果你要定义其他方向的话，那么只需要考虑三个函数和相关方向的独立公式即可。在大多数情况下，您都不需要使用到这三个指令。

{{% command %}}  
**TranslateXFunction = Formula**  
**TranslateYFunction = Formula**  
**TranslateZFunction = Formula**  
{{% /command %}}  
这个指令指定的式子将对象偏移到相应方向。 *式子* 的计算结果是从原位置移动的米数。三个 Translate *X* *Y* *Z* Direction 将会和*式子*相乘得出最终结果，所以如果你想让物体运动速度加快的话，那么可以尝试把式子乘以二或者是方向轴乘以二。

{{% command %}}  
**RotateXDirection = X, Y, Z**  
**RotateYDirection = X, Y, Z**  
**RotateZDirection = X, Y, Z**  
{{% /command %}}  
这三个指令分别定义 *RotateXFunction* , *RotateYFunction* 和 *RotateZFunction*  的旋转方向。默认方向是：

*RotateXDirection = 1, 0, 0*  
*RotateYDirection = 0, 1, 0*  
*RotateZDirection = 0, 0, 1*

这样意味着RotateXFunction将会默认绕X轴旋转，RotateYFunction默认绕Y轴，RotateZFunction默认绕Z轴，这也是为什么这样命名的原因。如果你要定义其他方向的话，那么只需要考虑三个函数和相关方向的独立公式即可。在大多数情况下，您还是都不需要使用这三个指令。

{{% command %}}  
**RotateXFunction = 式子**  
**RotateYFunction = 式子**  
**RotateZFunction = 式子**  
{{% /command%}}  
这些式子指定了将物体在相应的方向上逆时针旋转的度数。
*式子* 的结果应该是所需要旋转度数的 弧度制 形式。旋转的默认顺序是X -> Y -> Z。如果你需要进行多个轴上的旋转，设计时请记好这个顺序。 如果必须使用不同的顺序，请使用Rotate(X,Y,Z)Direction指令重新定义轴向。

{{% command %}}  
**RotateXDamping = 自然速率, 阻尼比值**  
**RotateYDamping = 自然速率, 阻尼比值**  
**RotateZDamping = 自然速率, 阻尼比值**  
{{% /command %}}  
这个指令定义相关的旋转的阻尼系数。如果没有指定，旋转就没有阻尼效果。 *自然速率* 是一个代表对应旋转运动理想无阻力时的角速度的非负值。单位是弧度每秒。*阻尼比值* 是一个代表阻尼程度的非负值。0与1之间代表阻尼不足，1代表临界阻尼，1以上代表过阻尼。详情可查阅对应的物理文献。

{{% command %}}  
**TextureShiftXDirection = X, Y**  
**TextureShiftYDirection = X, Y**  
{{% /command %}}  
这定义了对应的 *TextureShiftXFunction* 和 *TextureShiftYFunction* 的方向。默认方向是：

*TextureShiftXDirection = 1, 0*  
*TextureShiftYDirection = 0, 1*

这样意味着 TranslateXFunction 将会默认正方向向右偏移， TranslateYFunction默认正方向向下偏移， 这也是为什么这样命名的原因。如果你要定义其他方向的话，那么只需要考虑函数和相关方向的独立公式即可。在大多数情况下，您还是都不需要使用这两个指令。

{{% command %}}  
**TextureShiftXFunction = 式子**  
**TextureShiftYFunction = 式子**  
{{% /command %}}  
这个式子在对应的方向偏移材质的UV坐标。材质坐标按照 *式子* 的结果偏移。结果的整数部分被忽略，0.5的小数代表把材质偏移一半。最终结果是式子结果和材质中UV坐标之和。

{{% command %}}  
**TrackFollowerFunction = 式子**  
{{% /command %}}  
这个式子将物体沿着 **Rail 0(主轨道)** 移动一定的距离。*式子* 的结果是物体以米为单位的移动距离，并受 **Rail 0(主轨道)** 的弯曲转折影响。

{{% command %}}  
**TextureOverride = 替换类型**  
{{% /command %}}  
*替换类型* = **Timetable** : 该物体的所有面都会显示CSV/RW线路中所指定的时刻表图片。
*替换类型* = **None** : 不改变物体材质 (默认)。

{{% command %}}  
**RefreshRate = 秒数**  
{{% /command %}}  
这个指令定义了物体动画状态刷新的间隔。当值等于0时，物体将被每帧刷新一次。请注意不论取值如何，可视范围外的物体的刷新频率都会更低。你可以在不需要一个十分平滑的动画（这可以优化性能），或你希望物体以一个固定的时间频率变动时，你可以使用这个指令。译注：如果不使用的话，物体的动画状态就每帧都更新一次。说人话的话，这个指令是用来限制物体动画的流畅程度，而不是用来提升它的。

------

##### ● [Sound] 小节

你可以使用 [Sound] 小节让你的动画物件独立发出响声。

{{% command %}}  
[Sound]  
{{% /command %}}  
这行代码标志这个小节开始。

{{% command %}}  
**FileName = 文件名或路径**
{{% /command %}}  
这指定要播放的音效文件。

{{% command %}}  
**Position = X, Y, Z**  
{{% /command %}}  
指定声音源头所在的位置，相对于这个ANIMATED文件的原点。

{{% command %}}  
**Volume = 音量**  
{{% /command %}}  

指定音源的播放音量。 **1.0** 代表文件中原来的音量。

{{% command %}}  
**Pitch = Value**  
{{% /command %}}  

指定音源处播放时的音调。 **1.0** 代表不改变原文件的音调。

{{% command %}}  
**Radius = 满音量半径**  
{{% /command %}}  

这个声音在离音源这个半径的范围内满音量播放。默认的值是 **30** 。

{{% command %}}  
**VolumeFunction = 式子**  
{{% /command %}}  
使用一个 *式子* 来动态地改变声音的音量。式子的结果是想要的音量。 **1.0** 代表文件原来的音量。

{{% command %}}  
**PitchFunction = 式子**  
{{% /command %}}  
使用一个 *式子* 来动态地改变声音的音调。式子的结果是想要的音调。 **1.0** 代表不改变原文件的音调。

{{% command %}}  
**TrackFollowerFunction = 式子**  
{{% /command %}}  
这个式子将音源沿着 **Rail 0(主轨道)** 移动一定的距离。*式子* 的结果是声音音源以米为单位的移动距离，并受 **Rail 0(主轨道)** 的弯曲转折影响。

------

##### [StateChangeSound]部分

您可以使用[StateChangeSound]部分将声音效果附加到前面的[Object]部分。

{{% command %}}[StateChangeSound]{{% /command %}}这将启动“部分-必须立即跟随[Object]”部分。

{{% command %}}**文件名=文件**{{% /command %}}这将加载声音效果以播放所有状态更改。 或者，可以使用** FileNames **，如下所述：

{{% command %}}**文件名=文件<sub>0</sub>，文件<sub>1</sub>，…，文件<sub>n-1</sub>**{{% /command %}}加载* n *声音列表，这些列表与上面[Object]部分中的状态相对应。
如果状态没有声音效果，则列表条目应留空。

{{% command %}}**位置= X，Y，Z **{{% /command %}}定义声音相对于动画文件中心的位置。

{{% command %}}**数量=价值**{{% /command %}}

这定义了源位置的声音音量。 ** 1.0 **值表示声音文件的名义上不变的音量。

{{% command %}}**间距=值**{{% /command %}}

这定义了源位置的声音音高。 ** 1.0 **值表示声音文件的名义不变音调。

{{% command %}}**半径=值**{{% /command %}}

这定义了以音源为单位的半径以米为单位，声音在该半径处以最大音量播放。 默认值为** 30 **。

{{% command %}}**PlayOnShow = 值**{{% /command %}}

*值* = ** 0 **：将不会播放声音效果。*值* = ** 1 **：将播放声音效果。


这定义了在显示相关状态时是否应播放上面定义的声音效果。

{{% command %}}** PlayOnHide =值**{{% /command %}}


*值* = ** 0 **：将不会播放声音效果。*值* = ** 1 **：将播放声音效果。


这定义了在隐藏相关状态时是否应播放上面定义的声音效果。

{{% note %}}

当使用多种状态声音时，** PlayOnShow **和** PlayOnHide **将被忽略。

{{% /note %}}

------

{{% warning %}}

#### openBVE 2兼容性说明

在openBVE（v0.9）的开发过程中以及动画对象格式的开发过程中，存在以* RPN *结尾的某些命令，例如* TranslateXFunctionRPN *。 这些命令从未将其放入任何正式版本（v1.0）中，因此决不打算在开发环境之外使用。 尽管它们仍然可以无证地使用，但是它们将被openBVE 2删除。如果您正在使用这些命令，请尽快将其删除。

{{% /warning %}}

------

##### ●关于代码

首先，您在 *式子* 中输入的中缀表示法，是被转换为函数来处理的。 因此，对于每个中缀符号，都有相应的函数。 某些函数没有中缀运算符，因此只能以函数符号输入。 对于运算符而言，优先级起着重要作用。 您可以像使用任何通常的数学公式一样，使用括号来指定优先级顺序。 函数名称不区分大小写。

{{% warning-nontitle %}}

请注意，如果任何数学运算或函数的结果为无穷大，不确定或非实数，则返回0。 不会处理数字的溢出，因此您需要自己考虑这一点。

{{% /warning-nontitle %}}

## <a name="operators"></a>■3.中缀符号运算符列表

##### ●基本算术

{{% table %}}

| 中缀   | 功能       | 描述               |
| :------ | :--------------- | :------------------------ |
| `a + b` | `Plus[a,b, ...]` | 代表加法       |
| `a - b` | `Subtract[a,b]`  | 代表减法    |
| `-a`    | `Minus[a]`       | 取相反数        |
| `a * b` | `Times[a,b,...]` | 代表乘法 |
| `a / b` | `Divide[a,b]`    | 代表除法       |

{{% /table %}}

##### ●比较运算符

所有比较均返回1（真, True）和0（假, False）。

{{% table %}}

| 中缀    | 功能          | 描述                                     |
| :------- | ------------------- | ----------------------------------------------- |
| `a == b` | `Equal[a,b]`        | 如果 *a* 等于 *b* 则为真（1）                      |
| `a != b` | `Unequal[a,b]`      | 如果 *a* 不等于 *b* 则为真（1）              |
| `a < b`  | `Less[a,b]`         | 如果* a *小于* b *为真（1）                |
| `a > b`  | `Greater[a,b]`      | 如果* a *大于* b *为真（1）             |
| `a <= b` | `LessEqual[a,b]`    | 如果* a *小于或等于* b *，则为真（1）    |
| `a >= b` | `GreaterEqual[a,b]` | 如果* a *大于或等于* b *，则为真（1） |

{{% /table %}}

##### ●逻辑运算

所有操作将0视为false，将其他任何值视为true，然后返回1表示true，0表示false。

{{% table %}}

| 中缀          | 功能 | 描述                            |
| :------------- | ---------- | -------------------------------------- |
| `!a`           | `Not[a]`   | 如果 *a* 为假，则为真（1）               |
| `a & b`        | `And[a,b]` | 如果 *a* 和 *b* 均为真，则为真（1）  |
| `a` &#124; `b` | `Or[a,b]`  | 如果 *a* 或 *b* 中的任何一个为真，则为真（1） |
| `a ^ b`        | `Xor[a,b]` | True (1) if either *a* or *b* is true  |

{{% /table %}}

##### ● Operator precedence

From highest precedence to lowest. Operators of same precedence are evaluated either left to right or right to left, depending on if they share a precedence with another operator.

{{% table %}}

| Operator                         | Associativity | Unparenthesized | Equivilant      |
| -------------------------------- |---------------|-----------------|-----------------|
| `a[...]`                         | unary         | &nbsp;          | &nbsp;          |
| `-` (Minus)                      | unary         | &nbsp;          | &nbsp;          |
| `/`                              | right-to-left | 1 / 2 / 3       | (1 / (2 / 3))   |
| `*`                              | right-to-left | 1 * 2 * 3       | (1 * (2 * 3))   |
| `+`, `-` (Subtract)              | left-to-right | 1 + 2 + 3       | ((1 + 2) + 3)   |
| `==`, `!=`, `<`, `>`, `<=`, `>=` | left-to-right | 1 <= 2 <= 3     | ((1 <= 2) <= 3) |
| `!`                              | unary         | &nbsp;          | &nbsp;          |
| `&`                              | right-to-left | 1 & 2 & 3       | (1 & (2 & 3))   |
| `^`                              | right-to-left | 1 ^ 2 ^ 3       | (1 ^ (2 ^ 3))   |
| &#124;                           | right-to-left | 1 &#124; 2 &#124; 3       | (1 &#124; (2 &#124; 3))   |

{{% /table %}}

<br>

{{% warning-nontitle %}}  

The logical not and multiplication operator are not at the same precedence level as a lot of other languages. For example `!a + !b` is `!(!a + !(b))` **not** `(!a) + (!b)` as expected, similarly `1 * 2 / 3` is `1 * (2 / 3)` **not** `(1 * 2) / 3`  
Please also note that some combinations of prefix and infix operators are not recognised. For example `a*-b` is not accepted. Use `a*(-b)` or `-a*b` instead.

{{% /warning-nontitle %}}

## <a name="functions"></a>■ 4. List of functions

##### ● Basic arithmetics

{{% table-2col %}}

| Function         | Description                                                  |
| ---------------- | ------------------------------------------------------------ |
| `Reciprocal[x]`  | Returns the reciprocal, equal to 1/*x*                       |
| `Power[a,b,...]` | Returns *a* raised to the *b*<sup>th</sup> power. *b* must be a non-negative number. For consistency, Power[0,*b*] always returns 1, even in the degenerate case Power[0,0], and *a* being negative always returns 0. Adding more arguments will create a chain. Power[a,b,c] will return *a*<sup>*b*<sup>*c*</sup></sup>. |

{{% /table-2col %}}

#####  ● Numeric functions

{{% table-2col %}}

| Function                      | Description                                                  |
| ----------------------------- | ------------------------------------------------------------ |
| `Quotient[a,b]`               | Divides *a* by *b* and rounds the result down, equal to `Floor[a/b]`. |
| `Mod[a,b]`                    | Returns the remainder of dividing *a* by *b*, equal to `a-b*Floor[a/b]`. |
| `Min[a,b,...]`                | Returns the smallest of the terms.                           |
| `Max[a,b,...]`                | Returns the largest of the terms.                            |
| `Abs[x]`                      | Returns the absolute value.                                  |
| `Sign[x]`                     | Returns the sign of *x*, which is either -1, 0 or 1.         |
| `Floor[x]`                    | Rounds down to the nearest integer.                          |
| `Ceiling[x]`                  | Rounds up to the nearest integer.                            |
| `Round[x]`                    | Rounds to the nearest integer. Numbers ending in .5 are rounded to the nearest even integer. |
| `random[Minimum, Maximum]`    | Returns a new random floating-point number between *Minimum* and *Maximum*. |
| `randomInt[Minimum, Maximum]` | Returns a new random integer between *Minimum* and *Maximum*. |

{{% /table-2col %}}

##### ● Elementary functions

{{% table-2col %}}

| Function    | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| `Exp[x]`    | The exponential function, or *e* to the *x*<sup>th</sup> power. |
| `Log[x]`    | The natural logarithm, to base *e*.                          |
| `Sqrt[x]`   | The square root.                                             |
| `Sin[x]`    | The sine (input in radians).                                 |
| `Cos[x]`    | The cosine (input in radians).                               |
| `Tan[x]`    | The tangent (input in radians).                              |
| `ArcTan[x]` | The inverse tangent (output in radians).                     |

{{% /table-2col %}}

##### ● Conditionals

{{% table-2col %}}

| Function                        | Description                                                  |
| ------------------------------- | ------------------------------------------------------------ |
| `If[cond,truevalue,falsevalue]` | If *cond* is != 0, returns *truevalue*, otherwise *falsevalue* |

{{% /table-2col %}}

## <a name="variables"></a>■ 5. List of variables

##### ● Primitives

{{% table-2col %}}

| Variable       | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| `value`        | The value returned by the function in the last evaluation. At the beginning of the simulation, this is 0. |
| `delta`        | The time difference since the last evaluation of the function in seconds. Please note that there is no guaranteed time that elapses between successive function calls. |
| `currentState` | Returns the current numerical state of the object.           |

{{% /table-2col %}}

##### ● Time and camera

{{% table-2col %}}

| Variable         | Description                                                  |
| ---------------- | ------------------------------------------------------------ |
| `time`           | The current in-game time measured in seconds since midnight of the first day. |
| `cameraDistance` | The non-negative cartesian distance measured from the object to the camera in meters. |
| `cameraMode`     | Returns 0 if the camera is currently in a 2D or 3D cab, 1 otherwise. |

{{% /table-2col %}}

##### ● Trains

Generally, objects attached to a particular train and car return values for that train and car, unless stated otherwise. For scenery objects, the reference is the driver's car of the nearest train (not necessarily the player's train).

In some of the following variables, *carIndex* has the following meaning: 0 is the 1<sup>st</sup> car from the front, 1 is the 2<sup>nd</sup> car from the front, etc., while -1 is the 1<sup>st</sup> car from the rear, -2 is the 2<sup>nd</sup> car from the rear, etc. In general, car indices from -*cars* to *cars*-1 represent existing cars, where *cars* is the number of cars the train has, while values outside of this range represent non-existing cars. As all trains have at least 1 car, indices -1 and 0 are guaranteed to exist for any train.

##### ● Trains (general)

{{% table-2col %}}

| Variable                      | Description                                                  |
| ----------------------------- | ------------------------------------------------------------ |
| `playerTrain`                 | Returns 1 if the train is the player train, 0 otherwise.                            |
| `cars`                        | The number of cars the train has.                            |
| `speed`                       | The signed actual speed of the current car in m/s. Is positive when the train travels forward, and negative when the train travels backward. |
| `speed[carIndex]`             | The signed actual speed of the car *carIndex* in m/s. Is positive when the train travels forward, and negative when the train travels backward. |
| `speedometer`                 | The signed perceived speed of the current car in m/s as it would appear to a speedometer on wheel slip and wheel lock. |
| `speedometer[carIndex]`       | The signed perceived speed of the car *carIndex* in m/s as it would appear to a speedometer on wheel slip and wheel lock. |
| `acceleration`                | The actual acceleration of the current car in m/s².          |
| `acceleration[carIndex]`      | The actual acceleration of the car *carIndex* in m/s².       |
| `accelerationMotor`           | The acceleration which the motor of the first motor car currently generates in m/s². |
| `accelerationMotor[carIndex]` | The acceleration which the motor of the car *carIndex* currently generates in m/s². |
| `distance`                    | The non-negative cartesian distance measured from the object to the closest car in meters. Only meaningful for scenery objects. |
| `distance[carIndex]`          | The non-negative cartesian distance measured from the object to the car *carIndex* in meters, or 0 if the car does not exist. Only meaningful for scenery objects. |
| `trackDistance`               | The signed track distance measured from the object to the closest end of the nearest train in meters. Is positive when the train is in front of the object, negative when behind, and zero when the object lies between the ends of the train. |
| `trackDistance[carIndex]`     | The signed track distance measured from the object to the car *carIndex* of the nearest train in meters. Is positive when the center of the car is in front of the object, and negative if behind. Returns 0 if the car does not exist. Only meaningful for scenery objects. |
| `destination`                 | The currently set destination for this train. (Set via *Track.Destination* or the plugin interface) |
| `distanceNextStation`         | The distance in m to the next station. |
| `distanceStation[stationIndex]`| The distance in m to the station with *stationIndex* |
| `stopsNextStation`            | Whether the train stops at the next station. |
| `stopsStation[stationIndex]`  | Whether the train stops at the station with *stationIndex* |
| `nextStation`                 | The index of the next station. |
| `nextStationStop`             | The index of the next station where the train must stop. |
| `terminalStation`             | The index of the terminal station for this train. |
| `timeTable`                   | Returns 1 if the timetable is currently set as visible, 0 otherwise. |

{{% /table-2col %}}

##### ● Trains (brake)

{{% table-2col %}}

| Variable                       | Description                                                  |
| ------------------------------ | ------------------------------------------------------------ |
| `mainReservoir`                | The current pressure in the main reservoir in this car, measured in Pa. |
| `mainReservoir[carIndex]`      | The current pressure in the main reservoir in car *carIndex*, measured in Pa. |
| `emergencyReservoir`           | The current pressure in the emergency reservoir in this car, measured in Pa. |
| `emergencyReservoir[carIndex]` | The current pressure in the emergency reservoir in car *carIndex*, measured in Pa. |
| `brakePipe`                    | The current pressure in the brake pipe in this car, measured in Pa. |
| `brakePipe[carIndex]`          | The current pressure in the brake pipe in car *carIndex*, measured in Pa. |
| `brakeCylinder`                | The current pressure in the brake cylinder in this car, measured in Pa. |
| `brakeCylinder[carIndex]`      | The current pressure in the brake cylinder in car *carIndex*, measured in Pa. |
| `straightAirPipe`              | The current pressure in the straight air pipe in this car, measured in Pa. |
| `straightAirPipe[carIndex]`    | The current pressure in the straight air pipe in car *carIndex*, measured in Pa. |

{{% /table-2col %}}

##### ● Trains (doors)

{{% table-2col %}}

| Variable                     | Description                                                  |
| ---------------------------- | ------------------------------------------------------------ |
| `doors`                      | The state of the doors. Returns 0 if fully closed, 1 if fully opened, or any intermediate value, biasing doors that are in a more open state. |
| `doors[carIndex]`            | The state of the doors of car *carIndex*. Returns 0 if fully closed, 1 if fully opened, or any intermediate value, biasing doors that are in a more open state. |
| `leftDoors`                  | The state of the left doors. Returns 0 if fully closed, 1 if fully opened, or any intermediate value, biasing doors that are in a more open state. |
| `leftDoors[carIndex]`        | The state of the left doors of car *carIndex*. Returns a value between 0 and 1, biasing doors that are in a more open state, or -1 if the car does not exist. |
| `rightDoors`                 | The state of the right doors. Returns 0 if fully closed, 1 if fully opened, or any intermediate value, biasing doors that are in a more open state. |
| `rightDoors[carIndex]`       | The state of the right doors of car *carIndex*. Returns a value between 0 and 1, biasing doors that are in a more open state, or -1 if the car does not exist. |
| `leftDoorsTarget`            | The anticipated target state of the left doors. Returns either 0 (closed) or 1 (opened). |
| `leftDoorsTarget[carIndex]`  | The anticipated target state of the left doors of car *carIndex*. Returns either 0 (closed) or 1 (opened). |
| `rightDoorsTarget`           | The anticipated target state of the right doors. Returns either 0 (closed) or 1 (opened). |
| `rightDoorsTarget[carIndex]` | The anticipated target state of the right doors of car *carIndex*. Returns either 0 (closed) or 1 (opened). |
| `leftDoorsButton`            | The state of the left doors button. Returns either 0 (released) or 1 (pressed). |
| `rightDoorsButton`           | The state of the right doors button. Returns either 0 (released) or 1 (pressed). |
| `pilotLamp`                  | The state of the pilot lamp (Doors closed & ready to start). Returns either 0 (unlit) or 1 (lit). |

{{% /table-2col %}}

##### ● Trains (miscellaneous)

{{% table-2col %}}

| Variable                         | Description                                                  |
| -------------------------------- | ------------------------------------------------------------ |
| `reverserNotch`                  | The state of the reverser, which is either -1 (backward), 0 (neutral), or forward (1). |
| `powerNotch`                     | The current power notch, i.e. 0 for N, 1 for P1, 2 for P2, 3 for P3, etc. |
| `powerNotches`                   | The amount of power notches the train has.                   |
| `brakeNotch`                     | The current brake notch.<br />● For trains without the automatic air brake: 0 for N, 1 for B1, 2 for B2, 3 for B3, etc.<br />● For trains with the automatic air brake: 0 for REL, 1 for LAP and 2 for SRV. |
| `brakeNotches`                   | The amount of brake notches the train has. For trains with the automatic air brake, this returns 2. |
| `brakeNotchLinear`               | A combination of brake notch, hold brake and emergency brake.<br />● For trains without the automatic air brake and without hold brake: 0 for N, 1 for B1, 2 for B2, 3 for B3, etc., up to *BrakeNotches*+1 for EMG.<br />● For trains without the automatic air brake but with hold brake: 0 for N, 1 for HLD, 2 for B1, 3 for B2, 4 for B3, etc., up to *BrakeNotches*+2 for EMG.<br />● For trains with the automatic air brake: 0 for REL, 1 for LAP, 2 for SRV or 3 for EMG. |
| `brakeNotchesLinear`             | The highest value returned by *brakeNotchesLinear*.<br />● For trains without the automatic air brake and without hold brake, this is *BrakeNotches*+1.<br />● For trains without the automatic air brake but with hold brake, this is *BrakeNotches*+2.<br />● For trains with the automatic air brake, this returns 3. |
| `locoBrake`                      | The current Loco Brake notch.                                |
| `locoBrakeNotches`               | The amount of Loco Brake notches the train has.              |
| `emergencyBrake`                 | Whether the emergency brake is currently active (1) or not (0). |
| `hasAirBrake`                    | Whether the train has the automatic air brake (1) or not (0). |
| `holdBrake`                      | Whether the hold brake is currently active (1) or not (0).   |
| `hasHoldBrake`                   | Whether the train has a hold brake (1) or not (0).           |
| `constSpeed`                     | Whether the const speed system is currently active (1) or not (0). |
| `hasConstSpeed`                  | Whether the train has a const speed system (1) or not (0).   |
| `hasPlugin`                      | Whether the train uses a plugin (1) or not (0).              |
| `pluginState[i]`                 | The state of the i<sup>th</sup> plugin variable, returning an integer depending on the plugin. Is the same as ats*i* in the panel2.cfg. |
| `FrontAxleCurveRadius[carIndex]` | Returns the curve radius at the front axle position of car *carIndex*. |
| `RearAxleCurveRadius[carIndex]`  | Returns the curve radius at the rear axle position of car *carIndex*. |
| `CurveCant[carIndex]`            | Returns the cant value for car *carIndex*.                   |
| `Pitch[carIndex]`                | Returns the pitch value for car *carIndex*.                  |
| `Odometer`                       | Returns a signed number representing the distance in meters travelled by the current car. |
| `Odometer[carIndex]`             | Returns a signed number representing the distance in meters travelled by car *carIndex*. |
| `Klaxon`                         | Returns the currently playing horn (if any) as follows: (0) No horns are playing (1) The primary horn is playing (2) The secondary horn is playing (3) The music horn is playing. *Note* If multiple horns are playing, the lowest value will be returned. |
| `PrimaryKlaxon`                  | Returns 1 if the primary horn is currently playing, 0 otherwise. |
| `SecondaryKlaxon`                | Returns 1 if the secondary horn is currently playing, 0 otherwise. |
| `MusicKlaxon`                    | Returns 1 if the music horn is currently playing, 0 otherwise. |
| `passAlarm`                      | Whether the station pass alarm has been activated. Returns either 0 (inactive) or 1 (active). |
| `stationAdjustAlarm`             | Whether the station adjust alarm has been activated. Returns either 0 (inactive) or 1 (active). |

{{% /table-2col %}}

If *pluginState[i]* is used with the built-in safety systems ATS and ATC, the following mappings for *i* apply:

{{% table %}}

| *i*  | English             | 日本語       | Return values                                |      | pluginState[271] | Meaning           |
| ---- | ------------------- | ------------ | -------------------------------------------- | ---- | ---------------- | ----------------- |
| 256  | ATS                 | ATS          | 0 (unlit) or 1 (lit)                         |      | 0                | ATC not available |
| 257  | ATS RUN             | ATS 作動     | 0 (unlit), 1 (lit) or 2 (flashing)           |      | 1                | 0 km/h            |
| 258  | ATS RUN             | ATS 作動     | 0 (unlit / non-flashing), 1 (lit / flashing) |      | 2                | 15 km/h           |
| 259  | P POWER             | P 電源       | 0 (unlit) or 1 (lit)                         |      | 3                | 25 km/h           |
| 260  | PTN APPROACH        | パターン接近 | 0 (unlit) or 1 (lit)                         |      | 4                | 45 km/h           |
| 261  | BRAKE RELEASE       | ブレーキ開放 | 0 (unlit) or 1 (lit)                         |      | 5                | 55 km/h           |
| 262  | BRAKE APPLY         | ブレーキ動作 | 0 (unlit) or 1 (lit)                         |      | 6                | 65 km/h           |
| 263  | ATS P               | ATS-P        | 0 (unlit) or 1 (lit)                         |      | 7                | 75 km/h           |
| 264  | FAILURE             | 故障         | 0 (unlit) or 1 (lit)                         |      | 8                | 90 km/h           |
| 265  | ATC                 | ATC          | 0 (unlit) or 1 (lit)                         |      | 9                | 100 km/h          |
| 266  | ATC POWER           | ATC 電源     | 0 (unlit) or 1 (lit)                         |      | 10               | 110 km/h          |
| 267  | ATC SRV             | ATC 常用     | 0 (unlit) or 1 (lit)                         |      | 11               | 120 km/h          |
| 268  | ATC EMG             | ATC 非常     | 0 (unlit) or 1 (lit)                         |      | 12               | ATS is active     |
| 269  | CONST SPEED         | 定速         | 0 (unlit) or 1 (lit)                         |      |                  |                   |
| 270  | EB                  | EB           | 0 (unlit) or 1 (lit)                         |      |                  |                   |
| 271  | ATC speed indicator |              | 0 - 12, see table on the right               |      |                  |                   |

{{% /table %}}

##### ● Sections (signalling)

The section context is defined when the object is placed using Track.SigF.

{{% table-2col %}}

| Variable  | Description                                                  |
| --------- | ------------------------------------------------------------ |
| `section` | The value of the section aspect currently shown.<br />*If this variable is used outside of a Track.SigF context, the behavior is currently undefined and subject to change.* |

{{% /table-2col %}}

## <a name="performance"></a>■ 6. Performance

There are certain kinds of animation which are less expensive, and others which are more. Also, the underlying object plays a significant role. If you want to design your animated objects with as best performance as possible **for future releases of openBVE**, take a look at the following performance table:

{{% table %}}

| Animation      | Object                          | Performance |
| -------------- | ------------------------------- | ----------- |
| State changes  | Has only opaque faces           | Good        |
| State changes  | Has partially transparent faces | Moderate    |
| Translation    | Has only opaque faces           | Good        |
| Translation    | Has partially transparent faces | Moderate    |
| Rotation       | Has only opaque faces           | Good        |
| Rotation       | Has partially transparent faces | Bad         |
| Texture shifts | Has only opaque faces           | Bad         |
| Texture shifts | Has partially transparent faces | Bad         |

{{% /table %}}

Performance is generally better if the result of a function only infrequently changes. So, even if you set the *RefreshRate* parameter to zero, performance is generally better if the outcome of your formula is constant over longer periods of time. On the other hand, if it changes every frame, performance is generally worse.

Generally, you should avoid using animation with partially transparent faces and stick to opaque faces when possible. Also, try to avoid texture shifts, and consider using state changes or translation where possible.

## <a name="tips"></a>■ 7. Tips

- Generally speaking, try to keep the complexity of functions as low as possible. This is not the most critical aspect, though, as most of the performance impact will result from applying the results of a function, e.g. rotating the object, and not evaluating the function.
- Use the RefreshRate parameter when possible to optimize performance. Usually, you can use this parameter when you don't need a smooth animation, or when you deliberately want the functions to only update in intervals.
- Don't use functions which always evaluate to the same constant. For example, don't use RotateXFunction = 3.14159, but rotate the underlying CSV/B3D/X object directly.
- State changes are very cheap as long as the state doesn't actually change in between two executions of the StateFunction. If a change occurs, this is a relatively expensive operation, though.
- Try to optimize out *if* conditions. Especially try to avoid nested *if* functions. Often, there is an elegant mathematical solution.
- Certain functions, e.g. Exp, Sin, Cos, etc., are relatively expensive. Use them only if absolutely necessary for an effect. Don't include unnecessary operations. For example, the result of StateFunction is automatically rounded toward the nearest integer, so don't apply an additional explicit Round.
- When working with car objects, bear in mind that some variables have an optional car index. You should use this index if you want to query the state of a particular car (that is, not necessarily the one the object is attached to). If, however, you just want to query the value of the particular car the object is attached to, use the variable without the index. For scenery objects, you should not generally use car indices as you can't be sure how many cars the queried train has.

## <a name="examples"></a>■ 8. Example functions

##### ● Blinking light

{{% code "*Template for a blinking light:*" %}}  
States = OBJECT0, OBJECT1  
StateFunction = value == 0  
RefreshRate = SECONDS  
{{% /code %}}

##### ● Rotating wheel

{{% code "*Template for the code used in an exterior car object:*" %}}  
States = OBJECT  
RotateXFunction = value + delta * speedometer / RADIUS_OF_THE_WHEEL  
{{% /code %}}

##### ● Cycling through a list of objects

{{% code "*Template for objects that are to be cycled through:*"%}}  
States = OBJECT0, OBJECT1, OBJECT2, ...  
StateFunction = mod[value + 1, AMOUNT_OF_OBJECTS]  
RefreshRate = TIME_PER_OBJECT  
{{% /code %}}

##### ● Signal (3-aspect) for Track.Section(0; 2; 4)

{{% code %}}  
States = RED_OBJECT, YELLOW_OBJECT, GREEN_OBJECT  
StateFunction = section / 2  
{{% /code %}}

##### ● Employing an approach-controlled delay in signals

If you want to create a signal that keeps being red until the train approaches it to some distance, then counts down a timer before it changes aspect to green, please refer to [this post](http://openbve.freeforums.org/delay-in-approach-controlled-signals-t1195.html#p5378) on the forum for a detailed explanation. Once you understand the concepts, you can use this code template:

{{% code "*Template for an approach-controlled delay in a signal with two aspects:*" %}}  
States = RED_OBJECT, GREEN_OBJECT  
StateFunction = if[trackDistance>DISTANCE | section==0, 0, min[value + 0.5*delta/DELAY, 1]]  
{{% /code %}}

{{% code "*Template for an approach-controlled delay in a signal with any number of aspects:*" %}}  
States = RED_OBJECT, ..., GREEN_OBJECT  
StateFunction = if[trackDistance>DISTANCE | section==0, 0, if[value<0.5, value + 0.5*value/DELAY, section]]  
{{% /code %}}

## <a name="grammar"></a>■ 9. Formal Grammar

The formal grammar for the language may not match up perfectly with the implimentation included in OpenBVE. An example is a*-b which is valid under the grammar but the parser rejects it.

{{% code %}}  
&lt;expression>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;::=  &lt;xor_expression> "&amp;" &lt;expression> &nbsp;&nbsp;&nbsp;&nbsp;| &lt;xor_expression>  
&lt;xor_expression>&nbsp;&nbsp;&nbsp;&nbsp;::= &lt;or_expression>&nbsp;&nbsp;"^" &lt;xor_expression> | &lt;or_expression>  
&lt;or_expression>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;::= &lt;not_expression> "|" &lt;or_expression>&nbsp;&nbsp;| &lt;not_expression>   
<br/>&lt;not_expression>&nbsp;&nbsp;&nbsp;&nbsp;::= "!" &lt;equal_expression> | &lt;equal_expression>  
<br/>&lt;equal_expression>&nbsp;&nbsp;::= &lt;plus_expression> ("==" &lt;plus_expression>)* | &lt;plus_expression> ("!=" &lt;plus_expression>)`*`</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;plus_expression> (">"&nbsp; &lt;plus_expression>)`*` | &lt;plus_expression> ("&lt;"&nbsp; &lt;plus_expression>)`*` | <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;plus_expression> ("&lt;=" &lt;plus_expression>)`*` | &lt;plus_expression> ("&lt;=" &lt;plus_expression>)`*` | &lt;plus_expression><br/>
<br/>&lt;plus_expression>&nbsp;&nbsp;&nbsp;::= &lt;times_expression> ("+" &lt;times_expression>)`*`&nbsp; | &lt;times_expression> ("-" &lt;times_expression>)`*` | &lt;times_expression><br/>
<br/>&lt;times_expression>&nbsp;&nbsp;::= &lt;divide_expression> "\*" &lt;times_expression>  | &lt;divide_expression>  
&lt;divide_expression> ::= &lt;minus_expression>  "/" &lt;divide_expression> | &lt;minus_expression>  
<br/>&lt;minus_expression>&nbsp;&nbsp;::= "-" &lt;function_call> | &lt;function_call>  
&lt;function_call>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;::= &lt;name> "[" &lt;expression> ("," &lt;expression>)* "]" | &lt;term>  
<br/>&lt;term>&nbsp;&nbsp;&nbsp;::= "(" &lt;expression> ")" | &lt;name> | &lt;number>  
&lt;number> ::= &lt;digit>*  
&lt;name>&nbsp;&nbsp;&nbsp;::= &lt;letter> (&lt;letter> | &lt;digit>)*  
<br/>&lt;letter> ::= "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" |  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z" |  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" |  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z"  
&lt;digit>&nbsp;&nbsp;::= "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
{{% /code %}}