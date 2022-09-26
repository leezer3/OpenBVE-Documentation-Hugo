---
title: "**.b3d** オブジェクト データ形式"
linktitle: "B3D オブジェクト"
weight: 1
---

## ■ 概要

{{% contents %}}

- [1. 概要](#overview)
- [2. Syntax](#syntax)
- [3. Available commands](#commands)
  - [[MeshBuilder]](#createmeshbuilder)
  - [Vertex](#addvertex)
  - [Face](#addface)
  - [Face2](#addface2)
  - [Cube](#cube)
  - [Cylinder](#cylinder)
  - [Translate, TranslateAll](#translate)
  - [Scale, ScaleAll](#scale)
  - [Rotate, RotateAll](#rotate)
  - [Shear, ShearAll](#shear)
  - [Mirror, MirrorAll](#mirror)
  - [Color](#setcolor)
  - [EmissiveColor](#setemissivecolor)
  - [BlendMode](#setblendmode)
  - [WrapMode](#setwrapmode)
  - [Load](#loadtexture)
  - [Transparent](#setdecaltransparentcolor)
  - [Coordinates](#settexturecoordinates)

{{% /contents %}}

## <a name="overview"></a>■ 1. 概要

B3Dオブジェクトはテクスチャつきのオブジェクトを作成出来ます。作成したオブジェクトは路線のストラクチャーや車両オブジェクトに用いる事が出来ます。個別のオブジェクトは複数のポリゴンが内包されます。このファイルフォーマットは複数のポリゴンを[MeshBuilder]セクションにおいて色かテクスチャ情報を其々のセクションにおいて設定できます。これにより、いくつかの共通の[MeshBuilder]セクションの属性を用いて複数のポリゴンを生成できます。個別のポリゴンはこのファイルフォーマットにおいてはfaceと呼ばれます。

ファイルは任意のエンコードで記述されたプレーンテキストですが[encoding]({{< ref "/information/encodings/_index.md" >}})、好ましい選択としてはバイトオーダー付きのUTF-8です。  [parsing model]({{< ref "/information/numberformats/_index.md" >}}) に用いる数字は **ルーズ**ですが、 それでも出力にあたっては *厳密な* 出力をすることが望ましいです。 ファイル名は任意ですが、 拡張子は必ず **.b3d** を用います。 ファイルは基本的に上から下に向かって解釈されていきます。

➟ [B3Dフォーマットのクイックリファレンスも参照してください...]({{< ref "/objects/native/b3d_quick/_index.md" >}})

## <a name="syntax"></a>■ 2. 文法

ファイル内のそれぞれの行はコマンド名とその引数に分けられています。全てのコマンドの文法は同様です。

{{% command %}}
**コマンド名** *引数<sub>1</sub>*, *引数<sub>2</sub>*, *引数<sub>3</sub>*, ..., *引数<sub>n</sub>*
{{% /command %}}

*コマンド名* は大文字と小文字を区別せず使えます。  もし引数であった場合、 *コマンド名* と *引数1* 少なくとも1つ以上の半角スペース(U+0020)で空ける必要があります。 引数は 半角コンマ(U+002C)で区切られます。 命令の前後の [ホワイトスペース]({{< ref "/information/whitespaces/_index.md" >}}) は、引数の前後、行頭と行末は無視されます。 何もない空白行も同様に、ホワイトスペースとして無視されます。

引数はそれぞれの *引数<sub>i</sub>* を空白にすることで省略することができます。 この場合多くのケースでコマンド固有の既定の値が適用されます。 コマンド固有の規定値の詳細は使用できるコマンドのセクションで記載されています。 ただし、他の引数が指定されているときは最初の引数は省略できません。

コメントは行末のどこでも使用可能です。 コメントはセミコロン (U+003B)で始まります。 コメントは存在する場合、処理される前に全ての行から削除されます。

## <a name="commands"></a>■ 3. 使用可能なコマンド

<a name="createmeshbuilder"></a>

{{% command %}}
**[MeshBuilder]**
{{% /command %}}

このコマンドは新しい face のセクションの始まりを記します。 以下に続くコマンドの前に、これを記しておかなければなりません。 オブジェクトファイルには、必要に応じていくつでも [MeshBuilder] セクションを設置できます。 全てのこれに続くコマンドは、最後に開かれた [MeshBuilder] コマンドに関連付けられます。

----------

<a name="addvertex"></a>

{{% command %}}
**Vertex** *vX*, *vY*, *vZ*, *nX*, *nY*, *nZ*
{{% /command %}}

{{% command-arguments %}}
***vX***: 頂点のX座標をメートルで記します。 負の値は左、正の値は右です。 デフォルト値は0です。 
***vY***: 頂点のY座標をメートルで記します。  負の値は下、 正の値は上です。 デフォルト値は0です。 
***vZ***: 頂点のZ座標をメートルで記します。  負の値は後ろ、正の値は前方です。 デフォルト値は0です。 
***nX***: この頂点における法線のX座標をメートルで記します。 デフォルト値は0です。  
***nY***: この頂点における法線のY座標をメートルで記します。 デフォルト値は0です。 
***nZ***: この頂点における法線のZ座標をメートルで記します。 デフォルト値は0です。 
{{% /command-arguments %}}

このコマンドは Face もしくは Face2 コマンドを用いた面に用いるための新しい頂点を作成できます。 必要に応じて [MeshBuilder] セクション内には Vertex コマンドをいくつも用いることができます。 ただし、頂点の設置順序は他のコマンドに影響を与えるため重要な要素です。 最初の頂点はインデックス番号0、 続く頂点は、1,2,3...等と順番に与えられていきます。

法線の方向は面の特定の場所において垂直方向です。 もしすべての頂点の面が全く同じ法線である場合、 法線はフラットに見えます。 もし適切に用いられているならば、 頂点ごとに異なる法線を設定することで、まるで曲がった面をしているかのような錯覚を与えることができます。 しかし複数の面にわたって - 同一の空間座標上の全ての頂点で同一の法線を用いると、 もしすべて0が設定されていた場合は、法線は自動的に計算されます。

----------

<a name="addface"></a>

{{% command %}}
**Face** *v<sub>1</sub>*, *v<sub>2</sub>*, *v<sub>3</sub>*, ..., *v<sub>max</sub>*
{{% /command %}}

{{% command-arguments %}}
***v<sub>i</sub>***: この面に含める頂点インデックス。 適用される番号は0から *n*-1で、 *n* はVertexコマンドで使われている頂点の番号と連動します。  
{{% /command-arguments %}}

このコマンドは任意の長い頂点のリストで面を生成します。 インデックス番号は、先にVertexコマンドにより生々された純序に従い生成されます。 したがって、 Face コマンドは Vertexコマンドの後に記述する必要があります。 最初の Vertex コマンドはインデックス番号0で生成され、 そしてそれ以降の Vertex コマンドは 1, 2, 3 などとインデックス番号を生成します。 頂点のインデックス番号の記述順序は重要で、面に正対して時計回りに記述する必要があります。 生成された面の後側は何も見えないでしょう。 しかし、 Face2 コマンドでなら両面が見える面を作成することができます。 凸面の頂点ポリゴンのみサポートされます。

----------

<a name="addface2"></a>

{{% command %}}
**Face2** *v<sub>1</sub>*, *v<sub>2</sub>*, *v<sub>3</sub>*, ..., *v<sub>max</sub>*
{{% /command %}}

{{% command-arguments %}}
***v<sub>i</sub>***: この面に含める頂点インデックス。 適用される番号は0から *n*-1で、 *n* はVertexコマンドで使われている頂点の番号と連動します。  
{{% /command-arguments %}}

このコマンドは任意の長い頂点のリストで面を生成します。 インデックス番号は、先にVertexコマンドにより生々された純序に従い生成されます。 したがって、 Face コマンドは Vertexコマンドの後に記述する必要があります。 最初の Vertex コマンドはインデックス番号0で生成され、 そしてそれ以降の Vertex コマンドは 1, 2, 3 などとインデックス番号を生成します。 頂点のインデックス番号の記述順序は重要で、面に正対して時計回りに記述する必要があります。  後ろ側の面も同様に見えますが、 後側の面に対する光の当たり方は表側の面と同一になります。 凸面の頂点ポリゴンのみサポートされます。

----------

<a name="cube"></a>

{{% command %}}
**Cube** *HalfWidth*, *HalfHeight*, *HalfDepth*
{{% /command %}}

{{% command-arguments %}}
***HalfWidth***: 浮動小数点数で、立方体の幅の半分の長さを **メートル** で表します。 
***HalfHeight***: 浮動小数点数で、立方体の高さの半分の長さを **メートル** で表します。  
***HalfDepth***: 浮動小数点数で、立方体の奥行きの半分の長さを **メートル** で表します。  
{{% /command-arguments %}}

このコマンドは *HalfWidth* 、 *HalfHeight* 、 *HalfDepth* で指定された大きさの三次元の立方体を生成します。 生成される立方体の中心は原点 (0,0,0) です。 したがって、 X軸上では -*HalfWidth* から *HalfWidth* に拡張し、 Y軸上は -*HalfHeight* から *HalfHeight* に、そしてZ軸上は -*HalfDepth* to *HalfDepth*に拡張します。 生成される立方体は常に8つの頂点と6つの面を持ちます。

{{% notice %}}

#### Cube の表記方法について

Cube コマンドは、一連の Vertex と Face コマンド群を実行することに相当します。 この時同じ [MeshBuilder] セクション内において他のコマンドと同時に実行する際に考慮する必要があります。 Cube コマンドの詳細は [こちら]({{< ref "/objects/native/cubecylinder/_index.md" >}})にあります。

{{% /notice %}}

----------

<a name="cylinder"></a>

{{% command %}}
**Cylinder** *n*, *UpperRadius*, *LowerRadius*, *Height*
{{% /command %}}

{{% command-arguments %}}
***n***: 整数値:角柱の基底部の頂点の分割数。 
***UpperRadius***: 浮動小数点数: 角柱の上底の半径を **メートル** で表します。 負の数を指定すると、円柱の上面がなくなります。
***LowerRadius***: 浮動小数点数:角柱の下底の半径を **メートル** で表します。 負の数を指定すると、円柱の下面がなくなります。
***Height***: 浮動小数点数:角柱の側面の高さを **メートル** で表します。 負の数を指定すると、角柱を垂直方向に反転させ、裏返しにして表示します。
{{% /command-arguments %}}

このコマンドは [錐台](http://en.wikipedia.org/wiki/Frustrum) を作ることができます。 もし *LowerRadius* と *UpperRadius* が等しい場合、生成されるオブジェクトは [角柱](http://en.wikipedia.org/wiki/Prism_(geometry)) となり、 円柱に近いものとして使うことができます。 もし、 *LowerRadius* もしくは *UpperRadius* がゼロの場合、 [角錐](http://en.wikipedia.org/wiki/Pyramid_(geometry)) が生成されます。錐台は原点を中心とします（0,0,0）。 X軸又はZ軸上に沿って、錐台は -*LowerRadius* から *LowerRadius* を下底の基準として、そして -*UpperRadius* から *UpperRadius* を上底の基準として拡がります。 Y軸上では、錐台は -½\**Height* から ½\**Height* に拡がります。

The number of vertices *n* will usually suffice to be 6 or 8 when only small radii are used, for example to create a pole. Regardless of the values of *UpperRadius*, *LowerRadius* and *n*, the frustum will always have 2\**n* vertices, and usually *n*+2 faces unless any of the caps are omitted. If *UpperRadius* or *LowerRadius* are negative, the absolute value is being taken, but the respective caps are not created. If *Height* is negative, the roles of top and bottom are reversed and the faces will be visible from the inside, while otherwise, they will be visible from the outside.

{{% notice %}}

#### Cylinder representation

The Cylinder command is equivalent to a series of Vertex and Face commands, which you need to account for when using other commands in the same [MeshBuilder] section. The details on what the Cylinder command does are available [here]({{< ref "/objects/native/cubecylinder/_index.md" >}}).

{{% /notice %}}

----------

{{% command %}}
<font color=#555555>Texture</font>
{{% /command %}}

*<font color=#555555>このコマンドは、 OpenBVE によって無視されます。</font>*

----------

<a name="translate"></a>

{{% command %}}
**Translate** *X*, *Y*, *Z*  
**TranslateAll** *X*, *Y*, *Z*
{{% /command %}}

{{% command-arguments %}}
***X***: A floating-point number representing the translation on the x-coordinate in **meters**. Negative values translate to the left, positive ones right. The default value is 0.  
***Y***: A floating-point number representing the translation on the y-coordinate in **meters**. Negative values translate down, positive ones up. The default value is 0.  
***Z***: A floating-point number representing the translation on the z-coordinate in **meters**. Negative values translate backward, positive ones forward. The default value is 0.  
{{% /command-arguments %}}

The **Translate** command moves all vertices that have been created so far in the [MeshBuilder] section via the Vertex, Cube or Cylinder commands. Subsequent vertices are not affected. You can use as many Translate commands as desired in a [MeshBuilder] section. The **TranslateAll** command not only affects the vertices generated in the current [MeshBuilder] section, but also those created in previous [MeshBuilder] sections. This is useful to insert at the end of the file in order to translate the whole object.

----------

<a name="scale"></a>

{{% command %}}
**Scale** *X*, *Y*, *Z*  
**ScaleAll** *X*, *Y*, *Z*
{{% /command %}}

{{% command-arguments %}}
***X***: A non-zero floating-point number representing the scale factor on the x-coordinate. The default value is 1.  
***Y***: A non-zero floating-point number representing the scale factor on the y-coordinate. The default value is 1.  
***Z***: non-zero A floating-point number representing the scale factor on the z-coordinate. The default value is 1.  
{{% /command-arguments %}}

The **Scale** command scales all vertices that have been created so far in the [MeshBuilder] section via the Vertex, Cube or Cylinder commands. Subsequent vertices are not affected. You can use as many Scale commands as desired in a [MeshBuilder] section. The **ScaleAll** command not only affects the vertices generated in the current [MeshBuilder] section, but also those created in previous [MeshBuilder] sections. This is useful to insert at the end of the file in order to scale the whole object.

----------

<a name="rotate"></a>

{{% command %}}
**Rotate** *X*, *Y*, *Z*, *Angle*  
**RotateAll** *X*, *Y*, *Z*, *Angle*
{{% /command %}}

{{% command-arguments %}}
***X***: The x-direction of the rotational axis. Negative values point to the left, positive ones to the right. The default value is 0.  
***Y***: The y-direction of the rotational axis. Negative values point down, positive ones up. The default value is 0.  
***Z***: The z-direction of the rotational axis. Negative values point backward, positive ones forward. The default value is 0.  
***Angle***: The angle to rotate in degrees. Negative values rotate counter-clockwise, positive ones clock-wise. The default value is 0.  
{{% /command-arguments %}}

The **Rotate** command rotates all vertices that have been created so far in the current [MeshBuilder] section via the Vertex, Cube or Cylinder commands. Subsequent vertices are not affected. The axis of rotation is specified via the *X*, *Y* and *Z* values. Rotation will occur in the plane perpendicular to that direction. A zero vector for this axis is treated as (1,0,0). All other directions are normalized. You can use as many Rotate commands as desired in a [MeshBuilder] section. The **RotateAll** command not only affects the vertices generated in the current [MeshBuilder] section, but also those created in previous [MeshBuilder] sections. This is useful to insert at the end of the file in order to rotate the whole object.

----------

<a name="shear"></a>

{{% command %}}
**Shear** *dX*, *dY*, *dZ*, *sX*, *sY*, *sZ*, *Ratio*  
**ShearAll** *dX*, *dY*, *dZ*, *sX*, *sY*, *sZ*, *Ratio*
{{% /command %}}

{{% command-arguments %}}
***dX***: The x-coordinate of the vector D. The default value is 0.  
***dY***: The y-coordinate of the vector D. The default value is 0.  
***dZ***: The z-coordinate of the vector D. The default value is 0.  
***sX***: The x-coordinate of the vector S. The default value is 0.  
***sY***: The y-coordinate of the vector S. The default value is 0.  
***sZ***: The z-coordinate of the vector S. The default value is 0.  
***r***: The ratio that indicates how much to displace vectors. The default value is 0.  
{{% /command-arguments %}}

The **Shear** command performs a [shear mapping](http://en.wikipedia.org/wiki/Shear_mapping) for all vertices that have been created so far in the current CreateMeshBuilder section. The **ShearAll** command not only affects the vertices generated in the current CreateMeshBuilder section, but also those created in previous CreateMeshBuilder sections. This is useful to insert at the end of the file in order to shear the whole object.

![illustration_shear](/images/illustration_shear.png)

The shear mapping is performed around the origin. Loosely speaking, the object is sliced into planes along the direction D and then displaced along the direction S. Typically, D and S are perpendicular. D and S are always normalized. If *Ratio* is 0, no transformation is performed. If D and S are perpendicular, a *Ratio* of 1 corresponds to a slope of 45 degrees.

----------

<a name="mirror"></a>

{{% command %}}
**Mirror**, *X*, *Y*, *Z*  
**MirrorAll**, *X*, *Y*, *Z*
{{% /command %}}

{{% command-arguments %}}
***X***: Whether the x-axis should be mirrored. The default value is 0 (false).  
***Y***: Whether the y-axis should be mirrored. The default value is 0 (false).  
***Z***: Whether the z-axis should be mirrored. The default value is 0 (false).  
{{% /command-arguments %}}

The **Mirror** command mirrors all vertices that have been created so far in the current CreateMeshBuilder section via the AddVertex, Cube or Cylinder commands. Subsequent vertices are not affected. The direction(s) to mirror are specified via the *X*, *Y* and *Z* values. You can use as many Mirror commands as desired in a CreateMeshBuilder section.<br><br> The **MirrorAll** command not only affects the vertices generated in the current CreateMeshBuilder section, but also those created in previous CreateMeshBuilder sections. This is useful to insert at the end of the file in order to mirror the whole object.

----------

<a name="setcolor"></a>

{{% command %}}
**Color** *Red*, *Green*, *Blue*, *Alpha*
**ColorAll** *Red*, *Green*, *Blue*, *Alpha*
{{% /command %}}

{{% command-arguments %}}
***Red***: The red component of the color. Measured from 0 (black) to 255 (red). The default value is 255.  
***Green***: The green component of the color. Measured from 0 (black) to 255 (green). The default value is 255.  
***Blue***: The blue component of the color. Measured from 0 (black) to 255 (blue). The default value is 255.  
***Alpha***: The alpha component of the color. Measured from 0 (transparent) to 255 (opaque). The default value is 255.  
{{% /command-arguments %}}

The **Color** command sets the color for all faces that were already created in the current [MeshBuilder] section. If no texture is used, the faces will be colored using the color data as specified by *Red*, *Green* and *Blue*. If a texture is used, the pixels in the texture will be multiplied by the color, where multiplying with black results in black and multiplying with white does not change the color of the texture pixels. Values in-between make the texture pixels darker. When lighting is used in the route, the actual color can change depending on the lighting conditions, but will usually become darker.

The **ColorAll** command sets the color for all faces that were already created in the current [MeshBuilder] section, and those created in the previous [MeshBuilder] sections.

----------

<a name="setemissivecolor"></a>

{{% command %}}
**EmissiveColor** *Red*, *Green*, *Blue*
**EmissiveColorAll** *Red*, *Green*, *Blue*
{{% /command %}}

{{% command-arguments %}}
***Red***: The red component of the color. Measured from 0 (black) to 255 (red). The default value is 0.  
***Green***: The green component of the color. Measured from 0 (black) to 255 (green). The default value is 0.  
***Blue***: The blue component of the color. Measured from 0 (black) to 255 (blue). The default value is 0.  
{{% /command-arguments %}}

The **EmissiveColor** command sets the emissive color for all faces that were already created in the current [MeshBuilder] section. The difference between the Color command and the EmissiveColor command is that the Color command is affected by lighting, while the EmissiveColor command is not. Thus, the EmissiveColor command should be used for faces which would emit light themselves, including signals, lamps, windows and the like. The actual color contribution to the faces will be the sum of the light-affected color data and the static emissive color data.

The **EmissiveColorAll** command sets the color for all faces that were already created in the current [MeshBuilder] section, and those created in the previous [MeshBuilder] sections.

----------

<a name="setblendmode"></a>

{{% command %}}
**BlendMode** *BlendMode*, *GlowHalfDistance*, *GlowAttenuationMode*
{{% /command %}}

{{% command-arguments %}}
***BlendMode***: The blend mode to use. The default is Normal.  
***GlowHalfDistance***: The distance at which the glow is at 50% of its intensity, measured in meters. The value must be an integer in the range from 1 to 4095, or 0 to disable glow attenuation. The default value is 0.  
***GlowAttenuationMode***: The glow attenuation mode to use. The default is DivideExponent4.  
{{% /command-arguments %}}

▸ Available options for *BlendMode*:

{{% command-arguments %}}
**Normal**: The faces are rendered normally.  
**Additive**: The faces are rendered additively.  
{{% /command-arguments %}}

▸ Available options for *GlowAttenuationMode*:

{{% command-arguments %}}
**DivideExponent2**: The glow intensity is determined via the function *x*<sup>2</sup> / (*x*<sup>2</sup> + *GlowHalfDistance*<sup>2</sup>), where *x* is the distance from the camera to the object in meters.  
**DivideExponent4**: The glow intensity is determined via the function *x*<sup>4</sup> / (*x*<sup>4</sup> + *GlowHalfDistance*<sup>4</sup>), where *x* is the distance from the camera to the object in meters.  
{{% /command-arguments %}}

This command sets the blend mode for all faces in the current [MeshBuilder] section. The *Normal* mode replaces screen pixels with texture pixels. The *Additive* mode adds the color of texture pixels to the color of screen pixels, where adding black does not change the screen pixel, while adding white results in white. If *GlowHalfDistance* is 0, glow attenuation will be disabled, which is the default. If glow attenuation is to be used, *GlowHalfDistance* represents the distance in meters at which the glow is exactly at 50% of its intensity. When the camera approaches the face, the face will gradually fade out (become transparent). The function used to determine the exact intensity for a given distance can be influenced with the setting of *GlowAttenuationMode*. DivideExponent2 creates a smoother transition, but will converge to the maximum intensity very slowly, while DivideExponent4 creates a sharper transition which converges more quickly.

----------

<a name="setwrapmode"></a>

{{% command %}}  
**WrapMode**, *WrapMode*
{{% /command %}}

{{% command-arguments %}}  
***WrapMode***: The openGL texture wrapping mode to use. If this is not specified, the game will attempt to auto-determine the most appropriate texture wrapping mde.  
{{% /command-arguments %}}

▸ Available options for *WrapMode*:

{{% command-arguments %}}  
**ClampClamp**: The texture is clamped to edge on both axes. 
**ClampRepeat**: The texture is clamped to edge on the x-axis and repeats on the y-axis. 
**RepeatClamp**: The texture repeats on the x-axis and is clamped to edge on the y-axis.
**RepeatRepeat**: The texture repeats on both axes.
{{% /command-arguments %}}

----------

<a name="loadtexture"></a>

{{% command %}}
**Load** *DaytimeTexture*, *NighttimeTexture*
{{% /command %}}

{{% command-arguments %}}
***DaytimeTexture***: The file name of the daytime version of the texture to load, relative to the directory the object file is stored in.  
***NighttimeTexture***: The file name of the daytime version of the texture to load, relative to the directory the object file is stored in.  
{{% /command-arguments %}}

This command loads a texture and uses it for all faces in the current CreateMeshBuilder section. The file name is relative to the directory the object file is stored in. You can use PNG, which supports full alpha channels, but use the alpha channel only if absolutely required as it reduces performance. Prefer using a texture without an alpha channel in conjunction with the SetDecalTransparentColor command in order to use color-key transparency.

If *NighttimeTexture* is used, it specifies the texture to be used on nighttime lighting conditions, while *DaytimeTexture* then specifies the texture to be used on daytime lighting conditions. The textures might blend into each other and should be designed accordingly. If *NighttimeTexture* is used, *DaytimeTexture* must also be specified. If *NighttimeTexture* is not used, low lighting conditions will make the daytime version darker. Nighttime textures are meant for use with train interior/exterior objects.

----------

<a name="setdecaltransparentcolor"></a>

{{% command %}}
**Transparent** *Red*, *Green*, *Blue*
{{% /command %}}

{{% command-arguments %}}
***Red***: The red component of the color. Measured from 0 (black) to 255 (red). The default value is 0.  
***Green***: The green component of the color. Measured from 0 (black) to 255 (green). The default value is 0.  
***Blue***: The blue component of the color. Measured from 0 (black) to 255 (blue). The default value is 0.  
{{% /command-arguments %}}

This command sets the color used for screendoor transparency for all faces that were already created. The texture loaded via the Load command will become transparent for all pixels which match exactly with the color specified via the *Red*, *Green* and *Blue* parameters. The use of screendoor transparency is much more efficient than using a full alpha channel, so prefer using a texture without an alpha channel and use this command instead to make parts of the texture transparent. You need to specify texture coordinates via the Coordinate command in order for the texture to correctly appear on the faces.

----------

<a name="settexturecoordinates"></a>

{{% command %}}
**Coordinates** *VertexIndex*, *X*, *Y*
{{% /command %}}

{{% command-arguments %}}
***VertexIndex***: The vertex index the coordinate is referring to. Allowed values are 0 through *n*-1, where *n* is the number of Vertex commands used.  
***X***: The x-coordinate of the texture. Integer values correspond to the left/right edge of the texture. If only values between 0 and 1 are to be considered, 0 corresponds to the left and 1 to the right.  
***Y***: The y-coordinate of the texture. Integer values correspond to the top/bottom edge of the texture. If only values between 0 and 1 are to be considered, 0 corresponds to the top and 1 to the bottom.  
{{% /command-arguments %}}

This command associates a coordinate in the texture to the vertex specified by *VertexIndex*. The index corresponds to the order in which the vertices have been created by the Vertex command, thus the Coordinates command needs to be stated after the corresponding Vertex command. The *X* and *Y* values do not necessarily need to be in the range between 0 (left or top) to 1 (right or bottom), but can have any other value. It is assumed in this case that the texture is repeated on an infinite grid where integer values for *X* and *Y* correspond to the corners of the texture.
