---
title: "**.CSV**物件格式"
linktitle: "CSV 物件"
weight: 2
---

## ■ 目錄

{{% contents %}}

- [1. Overview](#overview)
- [2. Syntax](#syntax)
- [3. Available commands](#commands)
  - [CreateMeshBuilder](#createmeshbuilder)
  - [AddVertex](#addvertex)
  - [AddFace](#addface)
  - [AddFace2](#addface2)
  - [Cube](#cube)
  - [Cylinder](#cylinder)
  - [Translate, TranslateAll](#translate)
  - [Scale, ScaleAll](#scale)
  - [Rotate, RotateAll](#rotate)
  - [Shear, ShearAll](#shear)
  - [Mirror, MirrorAll](#mirror)
  - [SetColor, SetColorAll](#setcolor)
  - [SetEmissiveColor, SetEmissiveColorAll](#setemissivecolor)
  - [SetBlendMode](#setblendmode)
  - [SetWrapMode](#setwrapmode)
  - [LoadTexture](#loadtexture)
  - [SetDecalTransparentColor](#setdecaltransparentcolor)
  - [EnableCrossfading](#enablecrossfading)
  - [SetTextureCoordinates](#settexturecoordinates)

{{% /contents %}}

## <a name="overview"></a>■ 1. 總概

一個csv格式的物件允許你通過代碼描述去建立一個單個的物件模型。這個物件可以在綫路或者列車中應用。佢的代碼描述的對象可以包含任何形式的多個多邊形。該文件格式在CreateMeshBuilder部分中對多個多邊形進行分組，并將color或texture等屬性分配到對應部分創建的多邊形。不過我哋亦都允許在同一個CreateMeshBuilder中共享好多個相同屬性的多邊形，該多邊形稱作面，即是話，一個CreateMeshBuilder下面可以使用多個AddFace或AddFace指令。

該文件是以任何形式來進行編碼開文本文檔 [編碼方式]（{{< ref "/information/encodings/_index.md" >}}），不過，帶有字節順序標記的UTF-8當然是最好的選擇。[解析模型]（{{< ref "/information/numberformats/_index.md" >}}）對於這啲模型來講是**寬鬆**的，但是，你最好仲是用*嚴謹*的方式去編碼以免出錯。該文件的大名可以任意編，但必須有**.csv**這個后綴。該文件會從上到下逐行解析。

→ [另请参阅CSV格式的快速参考...]({{< ref "/objects/native/b3d_quick/_index.md" >}})

## <a name="syntax"></a>■ 2. 句法

文件中的每一行都分为命令名称及其参数。所有命令的语法都是相同的： 

{{% command %}} 
**命令名称** , *参数<sub>1</sub>* , *参数<sub>2</sub>* , *参数<sub>3</sub>* ，...， *参数<sub>n</sub>* 
{{% /command %}} 

*命令名称* 不区分大小写。如果有参数，则 *命令名称* 和 *参数1* 用逗号（U+002C）来分隔。同样，参数也用逗号分隔。*命令名称* 和参数周围，及行的开头和结尾的 [空格]({{< ref "/information/whitespaces/_index.md" >}}) 都会被忽略。仅由空格组成的行或空行也被忽略。

在 *参数<sub>i</sub>* 处留空，也可以省略该参数。在省略时会应用特定的默认值。所有默认值都在下方有列出。

您可以在一行的末尾添加注释。注释由分号(U+003B,英文半角)开始。所有注释在开始解析文件之前就将被自动排除。 

## <a name="commands"></a>■ 3. 可用指令

<a name="createmeshbuilder"></a>

{{% command %}}  
**CreateMeshBuilder**  
{{% /command %}}

這個命令標誌著新一組面的開始。它必須位於以下任何命令之前。在文件中可以根據需要添加任意數量的該指令。後續的所有命令將與前一個CreateMeshBuilder關聯。

------

<a name="addvertex"></a>

{{% command %}}  
**AddVertex**, *vX*, *vY*, *vZ*, *nX*, *nY*, *nZ*  
{{% /command %}}

{{% command-arguments %}} 
***vX*** ：顶点的x坐标，以米为单位，负值向左，正值向右，默认值为0。   
***vY*** ：顶点的y坐标，以米为单位，负值向下，正值向上，默认值为0。   
***vZ*** ：顶点的z坐标，以米为单位，负值向后，正值向前，默认值为0。   
***nX*** ：顶点法线的x坐标，默认值为0。   
***nY*** ：顶点法线的y坐标，默认值为0。   
***nZ*** ：顶点法线的z坐标，默认值为0。   
{{% /command-arguments %}} 

这个命令将创建一个新顶点，然后可以将此顶点用于AddFace或AddFace2命令来创建面。在CreateMeshBuilder部分中可以根据需要添加任意数量的该指令。但是，给出顶点的顺序对后续的命令很重要。给定的第一个顶点具有索引编号0，后续顶点具有索引1,2,3等等。 

法线是在特定点垂直于面的方向。如果面里的所有顶点具有相同的法线，那么面将看起来平坦。如果使用得当，您可以通过为每个顶点指定不同的法线来造成曲面的错觉 - 跨多个面在所有顶点上使用相同法线除外。 **请尽量使用简单的面和复杂的法线而不是复杂的面来达成曲面或凹凸效果。这能节省性能开支。** 如果全部为0或不给出，法线将被自动计算。 

------

<a name="addface"></a>

{{% command %}}  
**AddFace**, *v<sub>1</sub>*, *v<sub>2</sub>*, *v<sub>3</sub>*, ..., *v<sub>max</sub>*  
{{% /command %}}

{{% command-arguments %}} 
***v<sub>i</sub>*** ：此数值为将要包含在此面中的顶点索引。允许的数值为0到 *n* -1， *n* 是所使用的AddVertex命令数量。 
{{% /command-arguments %}} 

此命令将创建一个以所有给出v点为顶点的面。i的值（索引值）对应于AddVertex中创建顶点的顺序，因此该命令须在AddVertex命令之后使用。顶点索引出现的顺序很重要，必须以从面的正面来看的顺时针顺序给出。面的背面不可见。在相邻位置出现的顶点的连线不可以是该多边形的对角线。 仅支持凸多边形，凹多边形需要被拆成多个凸多边形。

![](https://s1.ax1x.com/2020/07/21/UIpAgK.png)

------

<a name="addface2"></a>

{{% command %}} 
**AddFace2** , *v<sub>1</sub>* , *v<sub>2</sub>* , *v<sub>3</sub>* , ..., *v<sub>max</sub>* 
{{% /command %}}

{{% command-arguments %}} 
***v<sub>i</sub>*** ：此数值为将要包含在此面中的顶点索引。允许的数值为0到 *n* -1， *n* 是所使用的AddVertex命令数量。 
{{% /command-arguments %}} 

此命令将创建一个以所有给出v点为顶点的面。i的值（索引值）对应于AddVertex中创建顶点的顺序，因此该命令须在AddVertex命令之后使用。顶点索引出现的顺序很重要，必须以从面的正面来看的顺时针顺序给出。在相邻位置出现的顶点的连线不可以是该多边形的对角线。 仅支持凸多边形，凹多边形需要被拆成多个凸多边形。面的两边都可见，但在目前的openBVE版本里背面的光照计算会有错误。

------

<a name="cube"></a>

{{% command %}} 
**Cube** , *半宽* , *半高* , *半深* 
{{% /command %}} 

{{% command-arguments %}} 
***半宽*** ：一个表示此立方体一半宽度（X轴向，左右）的浮点数，以 **米** 为单位。   
***半高*** ：一个表示此立方体一半高度（Y轴向，上下）的浮点数，以 **米** 为单位。   
***半深*** ：一个表示此立方体一半深度（Z轴向，前后）的浮点数，以 **米** 为单位。   
{{% /command-arguments %}} 

此命令将以原点（0,0,0）为中心创建一个以 *两倍的半宽* ， *两倍的半高* 和 *两倍的半深* 为尺寸的立方体。即，在X轴上它占据 -*半宽* 到 *半宽* 的范围，在Y轴上它占据 -*半高* 到 *半高* 的范围，在Z轴上它占据 -*半深* 到 *半深* 的范围。立方体总有8个顶点和6个面。

{{% notice %}}  

#### 立方体指令表示

Cube命令相当于一系列的AddVertex和AddFace命令，会影响顶点索引，所以在同一CreateMeshBuilder部分中使用其他命令时需要考虑这些命令。[此处]({{< ref "/objects/native/cubecylinder/_index.md" >}})提供了Cube命令的详细信息。

{{% /notice %}}

------

<a name="cylinder"></a>

{{% command %}} 
**Cylinder** , *n* , *上底半径* , *下底半径* , *高* 
{{% /command %}} 

{{% command-arguments %}} 
***n*** ：一个整数，表示顶底面正多边形的顶点数。  
***上底半径*** ：顾名思义。以 **米** 为单位。如该值为负数，则上底面将不生成。   
***下底半径*** ：顾名思义。以 **米** 为单位。如该值为负数，则下底面将不生成。   
***高*** ：一个表示该圆柱/圆锥/圆台高度的浮点数，以 **米** 为单位。如为负值，则该截锥体将上下倒转且显示面将朝内。   
{{% /command-arguments %}} 

This command creates a [frustum](http://en.wikipedia.org/wiki/Frustum). If *LowerRadius* and *UpperRadius* are equal, the object generated will reduce to a [prism](http://en.wikipedia.org/wiki/Prism_(geometry)), which can be used as an approximation to the cylinder. If either *LowerRadius* or *UpperRadius* are zero, the object generated will reduce to a [pyramid](http://en.wikipedia.org/wiki/Pyramid_(geometry)). The frustum will be centered on the origin (0,0,0). On the x- and z-axes, the frustum extends from -*LowerRadius* to *LowerRadius* for the lower base and from -*UpperRadius* to *UpperRadius* for the upper base. On the y-axis, the frustum extends from -1⁄2\**Height* to 1⁄2\**Height*.

当半径的值较小时， 如线杆或扶手，顶点数 *n* 为6或8就足够了。无论 *上底半径* ， *下底半径* 和 *n* 的值如何，该多面体将始终有 2\**n* 个顶点和 *n* +2个面，除非省略上下底面。若 *上底半径* 或 *下底半径* 为负数，则采用其绝对值，同时不创建相应的底面（没有盖儿）。若 *高* 为负数，则上下底面会倒转（上底在下，下底在上），同时所有面都会变为内部可见（默认情况是外部可见） 。

{{% notice %}}

#### 截锥体命令表示

Cylinder命令相当于一系列的AddVertex和AddFace命令，在同一CreateMeshBuilder部分中使用其他命令时需要考虑这些命令。[此处]({{< ref "/objects/native/cubecylinder/_index.md" >}})提供了Cylinder命令的详细信息。

{{% /notice %}}

------

{{% command %}} 
<font color=#555555>GenerateNormals </font>
{{% /command %}}

*<font color=#555555>這個命令是會被OpenBVE忽略</font>*

------

<a name="translate"></a>

{{% command %}} 
**Translate** , *X* , *Y* , *Z*   
**TranslateAll** , *X* , *Y* , *Z* 
{{% /command %}} 

{{% command-arguments %}} 
***X*** ：一个表示顶点在x轴上移动距离的浮点数，以 **米** 为单位。负值向左平移，正值向右平移。默认值为0。   
***Y*** ：一个表示顶点在y轴上移动距离的浮点数，以 **米** 为单位。负值向下平移，正值向上平移。默认值为0。   
***Z*** ：一个表示顶点在z轴上移动距离的浮点数，以 **米** 为单位。负值向后平移，正值向前平移。默认值为0。   
{{% /command-arguments %}} 

**Translate** 命令将移动从CreateMeshBuilder到Translate之间创建的所有顶点，且后续顶点不受影响。您可以在CreateMeshBuilder部分中根据需要使用不限数量的Translate命令。 **TranslateAll** 不仅影响当前CreateMeshBuilder部分中创建的顶点，还会影响到之前所有CreateMeshBuilder部分中创建的顶点，这对于在文件末尾插入来平移整个物件很有用。

------

<a name="scale"></a>

{{% command %}} 
**Scale** , *X* , *Y* , *Z*   
**ScaleAll** , *X* , *Y* , *Z* 
{{% /command %}} 

{{% command-arguments %}} 
***X*** ：一个非零浮点数，表示x轴上的缩放比值，默认值为1。   
***Y*** ：一个非零浮点数，表示y轴上的缩放比值，默认值为1。   
***Z*** ：一个非零浮点数，表示z轴上的缩放比值，默认值为1。 
{{% /command-arguments %}} 

**Scale** 命令将缩放从CreateMeshBuilder到Scale之间创建的所有顶点，且后续顶点不受影响。您可以在CreateMeshBuilder部分中根据需要使用不限数量的Scale命令。 **ScaleAll** 不仅影响当前CreateMeshBuilder部分中创建的顶点，还会影响到之前所有CreateMeshBuilder部分中创建的顶点，这对于在文件末尾插入来缩放整个物件很有用。

------

<a name="rotate"></a>

{{% command %}} 
**Rotate** , *X* , *Y* , *Z* , *角度*   
**RotateAll** , *X* , *Y* , *Z* , *角度* 
{{% /command %}}

{{% command-arguments %}} 
***X*** ：旋转轴的x方向。负值指向左侧，正值指向右侧。默认值为0。   
***Y*** ：旋转轴的Y方向。负值指向下边，正值指向上边。默认值为0。   
***Z*** ：旋转轴的Z方向。负值指向后方，正值指向前方。默认值为0。 
{{% /command-arguments %}}

**Rotate** 命令将旋转从CreateMeshBuilder到Rotate之间创建的所有顶点，且后续顶点不受影响。旋转轴通过 *X* ， *Y* 和 *Z* 值指定。旋转将发生在垂直于该轴的平面中。该轴的零向量被视为（1,0,0），所有其他方向都被折算成单位向量。

您可以在CreateMeshBuilder部分中根据需要使用尽可能多的Rotate命令。 **RotateAll** 不仅影响当前CreateMeshBuilder部分中创建的顶点，还会影响到之前所有CreateMeshBuilder部分中创建的顶点，这对于在文件末尾插入来旋转整个物件很有用。 

※由于官方的说明文档原文有些晦涩，就算翻译过来也可能会看不懂，这里译者再开一段来讲讲本人是如何使用Rotate命令的。我倾向于“一对一”式的写法，即一个Rotate命令完成物件在一个坐标轴上的旋转，上文提到的X,Y,Z被我用来标记在该坐标轴上是否做出旋转动作，0代表否，1代表是。然后再用 角度 参数说明旋转的角度，正值为顺时针，负值为逆时针。例如 Rotate,0,1,0,180 表示将该物件以y轴为基准旋转180度。 

------

<a name="shear"></a>

{{% command %}} 
**Shear** , *dX* , *dY* , *dZ* , *sX* , *sY* , *sZ* , *r*   
**ShearAll** , *dX* , *dY* , *dZ* , *sX* , *sY* , *sZ* , *r* 
{{% /command %}} 

{{% command-arguments %}} 
***dX*** ：向量D的x坐标，默认为0。  
***dY*** ：向量D的y坐标，默认为0。  
***dZ*** ：向量D的z坐标，默认为0。  
***sX*** ：向量S的x坐标，默认为0。  
***sY*** ：向量S的y坐标，默认为0。  
***sZ*** ：向量S的z坐标，默认为0。  
***r*** ：表示矢量移位的比例。默认为0。 
{{% /command-arguments %}} 

**Shear** 命令为当前CreateMeshBuilder部分中到目前为止创建的所有顶点执行[剪切映射](http://en.wikipedia.org/wiki/Shear_mapping)。 **ShearAll** 不仅影响当前CreateMeshBuilder部分中创建的顶点，还会影响到之前所有CreateMeshBuilder部分中创建的顶点，这对于在文件末尾插入来剪切整个物件很有用。 

![illustration_shear](/images/illustration_shear.png)

剪切映射以原点为中心进行。不严谨地说，将物体沿方向D切成平面，然后沿方向S移位。通常，D和S是垂直的。D和S都被折算为单位向量。如果 *r* 为0，则不执行转换。如果D和S垂直，则 *r* 的1值对应45度的斜率。 

------

<a name="mirror"></a>

{{% command %}}  
**Mirror**, *X*, *Y*, *Z*  
**MirrorAll**, *X*, *Y*, *Z*  
{{% /command %}}

{{% command-arguments %}} 
***X*** ：决定x轴是否被镜像。默认值为0（否）。   
***Y*** ：决定y轴是否被镜像。默认值为0（否）。   
***Z*** ：决定z轴是否被镜像。默认值为0（否）。 
{{% /command-arguments %}} 

**Mirror** 命令将镜像从CreateMeshBuilder到Mirror之间创建的所有顶点，且后续顶点不受影响。 镜像的方向通过 *X* ， *Y* 和 *Z* 值指定。您可以在CreateMeshBuilder部分中根据需要使用任意数量的Mirror命令。

 **MirrorAll** 不仅影响当前CreateMeshBuilder部分中创建的顶点，还会影响到之前所有CreateMeshBuilder部分中创建的顶点，这对于在文件末尾插入来镜像整个物件很有用。 

------

<a name="setcolor"></a>

{{% command %}}  
**SetColor**, *Red*, *Green*, *Blue*, *Alpha*  
**SetColorAll**, *Red*, *Green*, *Blue*, *Alpha*  
{{% /command %}}

{{% command-arguments %}}  
***紅***: 紅色成分. 由 0 (黑) 到 255 (紅). 默認為 255.  
***綠***: 綠色成分. 由 (黑) 到 255 (綠). 默認為 255.  
***藍***: 藍色成分. 由 0 (黑) 到 255 (藍). 默認為 255.  
***透明度***: 透明成分. 由 0 (透明) 到 255 (不透明). 默認為 255.  
{{% /command-arguments %}}

The **SetColor** command sets the color for all faces that were already created in the current CreateMeshBuilder section. If no texture is used, the faces will be colored using the color data as specified by *Red*, *Green*and *Blue*. If a texture is used, the pixels in the texture will be multiplied by the color, where multiplying with black results in black and multiplying with white does not change the color of the texture pixels. Values in-between make the texture pixels darker. When lighting is used in the route, the actual color can change depending on the lighting conditions, but will usually become darker.

The **SetColorAll** command sets the color for all faces that were already created in the current CreateMeshBuilder section, and all those created in the previous CreateMeshBuilder sections.

------

<a name="setemissivecolor"></a>

{{% command %}}  
**SetEmissiveColor**, *Red*, *Green*, *Blue*  
**SetEmissiveColorAll**, *Red*, *Green*, *Blue*  
{{% /command%}}

{{% command-arguments %}} 
***R*** ：该颜色的红色分量，范围为0（黑）~255（红），默认值为0。   
***G*** ：该颜色的绿色分量，范围为0（黑）~255（绿），默认值为0。   
***B*** ：该颜色的蓝色分量，范围为0（黑）~255（蓝），默认值为0。 
{{% /command-arguments %}} 

The **SetEmissiveColor** command sets the emissive color for all faces that were already created in the current CreateMeshBuilder section. The difference between the SetColor command and the SetEmissiveColor command is that the SetColor command is affected by lighting, while the SetEmissiveColor command is not. Thus, the SetEmissiveColor command should be used for faces which would emit light themselves, including signals, lamps, windows and the like. The actual color contribution to the faces will be the sum of the light-affected color data and the static emissive color data.

The **SetEmissiveColor** command sets the emissive color for all faces that were already created in the current CreateMeshBuilder section, and all those created in the previous CreateMeshBuilder sections.

------

<a name="setblendmode"></a>

{{% command %}} 
**SetBlendMode** , *混色模式* , *半发光距离* , *光衰减模式* 
{{% /command %}} 

{{% command-arguments %}} 
***混色模式*** ：将要使用的混色模式，默认为正常。   
***半发光距离*** ：发光强度为50%时视点和物体的距离，以米为单位。该值必须是1到4095范围内的整数，或0表示禁用此功能。默认值为0。   
***光衰减模式*** ：将要使用的光衰减模式，默认为四次倒数。 
{{% /command-arguments %}} 

▸ *混色模式* 命令中的可用选项： 

{{% command-arguments %}}
**Normal（正常）** ：正常渲染物体。 
**Additive（叠加）** ：叠加渲染物体。 
{{% /command-arguments %}}

▸ *光衰减模式* 命令中的可用选项：

**DivideExponent2（平方倒数）** ：光的强度通过函数 *x* <sup>2</sup> / ( *x* <sup>2</sup> + *发光半距离* <sup>2</sup>) 来决定，其中 *x* 是视点到物体的距离，以米为单位。 
**DivideExponent4（四次倒数）** ：光的强度通过函数 *x* <sup>4</sup> / ( *x* <sup>4</sup> + *发光半距离* <sup>4</sup>) 来决定，其中 *x* 是视点到物体的距离，以米为单位。 

此命令为当前CreateMeshBuilder部分中的所有面设置混色模式。*普通* 模式用材质像素替换屏幕像素。*叠加* 模式将材质像素的颜色数值与屏幕像素颜色数值相加，例如加黑色（0,0,0）不会改变屏幕像素，添加白色（255,255,255）结果恒为白色。如果 *发光半距离* 为0，将默认不启用光照衰减。如果启用了光照衰减，*发光半距离* 是其强度为一半的距离。当视点接近物体时，物体会逐渐淡出（变得透明）。通过设置 *光衰减模式* 可以确定特定距离的精确光强度。平方倒数创建一个更平滑的过渡，但光汇合到最大强度的过程非常缓慢，而四次倒数创建更锐利的过渡，且光线汇合更快。 

------

<a name="setwrapmode"></a>

{{% command %}}  
**SetWrapMode**, *WrapMode*
{{% /command %}}

{{% command-arguments %}}  
*** WrapMode ***：指定openGL texture wrapping mode。 如果未指定，遊戲將嘗試自動使用最合適的wrapping mode。
{{% /command-arguments %}}

▸ *WrapMode* 的選項:

{{% command-arguments %}}  
**ClampClamp**: 紋理在兩個軸上都夾在邊緣上。 
**ClampRepeat**: 紋理在X軸上被夾緊到邊緣，並在Y軸上重複。
**RepeatClamp**: 紋理在x軸上重複，並在y軸上固定到邊緣。
**RepeatRepeat**: 紋理在兩個軸上重複。
歡迎試下不同選項的效果
{{% /command-arguments %}}

------

<a name="loadtexture"></a>

{{% command %}} 
**LoadTexture** , *日间材质* , *夜间材质* 
{{% /command %}} 

{{% command-arguments %}} 
***日间材质*** ：将要加载的日间材质的文件路径，相对于CSV文件所在目录。   
***夜间材质*** ：将要加载的夜间材质的文件路径，相对于CSV文件所在目录。 
{{% /command-arguments %}} 

此命令将加载材质并将其用于当前CreateMeshBuilder部分中的所有面。文件路径相对于CSV文件所在路径。您也可以使用支持完整Alpha通道的PNG格式，但请尽量不要使用半透明的PNG，因为很吃性能。没有Alpha通道（全不透明）的材质可以与SetDecalTransparentColor命令配合使用来达到性能更好的透明效果。 

如果使用了 *夜间材质* ，它指定在夜间光照状态（.Brightness 0）下使用的材质，而 *日间材质* 指定在日间光照状态（.Brightness 255）下使用的材质。两个材质会根据光照状态互相混合（.Brightness 1~254），材质也需要以此来进行设计。如果指定了 *夜间材质* ，就必须同时指定 *日间材质* 。如果没有指定 *夜间材质* ，暗光照条件会使日间材质更黑。必须使用SetTextureCoordinates指令设定好材质与各顶点的关系，材质才能被正常显示。 

------

<a name="setdecaltransparentcolor"></a>

{{% command %}} 
**SetDecalTransparentColor** , *红色分量* , *绿色分量* , *蓝色分量* 
{{% /command %}} 

{{% command-arguments %}} 
***R*** ：该颜色的红色分量，范围为0（黑）~255（红），默认值为0。   
***G*** ：该颜色的绿色分量，范围为0（黑）~255（绿），默认值为0。   
***B*** ：该颜色的蓝色分量，范围为0（黑）~255（蓝），默认值为0。 
{{% /command-arguments %}} 

这条指令为已经创建的所有面指定一个蒙版式的透明色（例如屏蔽门和车窗）。刚刚加载的材质中与指定的 *红*、*绿*、*蓝* 颜色完全相同的像素都会变为透明的。这种蒙版式的透明色比起使用含透明部分的PNG性能高，所以最好绘制全不透明的材质，然后将材质中要透明的部分填为固定颜色，再使用此指令将这些部分“挖空”，而不是使用半透明的PNG。必须使用SetTextureCoordinates指令设定好材质与各顶点的关系，材质才能被正常显示。

------

<a name="enablecrossfading"></a>

{{% command %}}  
**EnableCrossfading**, *值* 
{{% /command %}}

{{% command-arguments %}}  
**值**: true 啟用交叉漸變，或為false（默認）禁用。
{{% /command-arguments %}}

This command controls the blending mode when both a daytime and a nighttime texture are specified.

When this is set to **false** the behavior is as follows:
1. The daytime texture is drawn.
2. The opacity level for the nighttime texture is calculated from the __Track.Brightness__ value, where a value of **255** produces a fully opaque texture, and a value of **0** produces a fully transparent texture.
3. The nighttime texture is drawn.

When this is set to **true** the behaviour is as follows:

The opacity level for each texture is blended proportionately, so that for example, a __Track.Brightness__ value of **128** would produce an (approximately) 50% blend of each texture and so-on.

------

<a name="settexturecoordinates"></a>

{{% command %}} 
**SetTextureCoordinates** , *顶点索引* , *水平偏移量(U)* , *垂直偏移量(V)* 
{{% /command %}} 

{{% command-arguments %}} 
***顶点索引*** ：这个材质坐标匹配的模型顶点。范围是0到 *n* -1， *n* 为 AddVertex指令创建的顶点数量。   
***水平偏移量(U)*** ：这个材质坐标相对于模型左边缘的位置。一个0~1之间的数字，0代表最左边，1代表最右边。   
***垂直偏移量(V)*** ：这个材质坐标相对于模型上边缘的位置。一个0~1之间的数字，0代表最上边，1代表最下边。 
{{% /command-arguments %}} 

这条指令为 *顶点索引* 指定的顶点匹配一个材质坐标。由于这个索引是要匹配一个已经创建了的顶点的，所以这条指令要放在AddVertex指令的后面。 当 *U* 或 *V* 的值大于0小于1时，如下图所示（应该解释得很清楚了），当指定顶点上的 *U* 或 *V* 值大于1，材质横纵向无限平铺（就是无数张图片组成的一个格子状的二维平面），U值“2”对应在该平面中所有左起第二列图片的右边线，V值“5”对应在该平面中所有第五行图片的下边线，而“2,5”则对应该平面中第二列第五行的那张图片的右下角（也就是前面所述两条垂直直线的交点）。使用大于1的U和V值，您可以将材质以平铺的方式在面上重复多次地贴图。 

![](https://s1.ax1x.com/2020/07/21/U5zEPx.png)
