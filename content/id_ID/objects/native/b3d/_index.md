---
title: "Objek format **.b3d**"
linktitle: "Objek B3D"
weight: 1
---

## ■ Isi

{{% contents %}}

- [1. Overview](#overview)
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

## <a name="overview"></a>■ 1. Penjelasan

Objek B3D berfungsi membuat objek dengan perintah teks. Objek ini dapat digunakan di rute atau kereta. Dalam file ini objek dapat dibuat sebanyak mungkin. File ini dapat membuat satu atau lebih polygon. Dalam satu bagian [MeshBuilder] memiliki warna dan tekstur yang sama untuk setiap mesh dan polygon dalam bagian yang sama. Polygon dalam file objek ini disebut dengan Face.

The file is a plain text file encoded in any arbitrary [encoding]({{< ref "/information/encodings/_index.md" >}}), however, UTF-8 with a byte order mark is the preferred choice. The [parsing model]({{< ref "/information/numberformats/_index.md" >}}) for numbers is **Loose**, however, you are encouraged to produce *Strict* output nonetheless. The file name is arbitrary, but must have the extension **.b3d**. The file is interpreted on a per-line basis, from top to bottom.

➟ [Lihat juga rangkuman singkat daftar perintah B3D]({{< ref "/objects/native/b3d_quick/_index.md" >}})

## <a name="syntax"></a>■ 2. Format penulisan

Setiap baris dalam file ini adalah satu perintah beserta nilai argumennya. Semua sistem penulisan di file ini sama, sebagai berikut:

{{% command %}}
**NamaPerintah** *Argumen<sub>1</sub>*, *Argumen<sub>2</sub>*, *Argumen<sub>3</sub>*, ..., *Argumen<sub>n</sub>*
{{% /command %}}

*NameOfTheCommand* is case-insensitive. If there are arguments, *NameOfTheCommand* and *Argument1* are separated by at least one space space (U+0020). Arguments are separated by a comma (U+002C). [White spaces]({{< ref "/information/whitespaces/_index.md" >}}) around the arguments, and well as at the beginning and the end of the line, are ignored. Empty lines or lines solely consisting of white spaces are also ignored.

Argumen dapat dibiarkan kosong, tanpa diisi nilai apapun. Jika kosong, maka nilai default akan dipakai sesuai perintah yang digunakan. Semua nilai default dijelaskan di setiap penjelasan perintah. Catatan: *Argumen <sub> 1 </sub>* tidak boleh kosong jika ada argumen yang diisi di belakangnya.

Komentar bisa ditambahkan di mana saja di akhir teks. Tambahkan titik koma " ; " lalu tulis komentar atau catatan yang diinginkan.

## <a name="commands"></a>■ 3. Daftar perintah

<a name="createmeshbuilder"></a>

{{% command %}}
**[MeshBuilder]**
{{% /command %}}

Perintah ini membuat bagian mesh baru dalam 1 file. Anda bisa membuat [meshbuilder] sebanyak apapun yang diinginkan. Semua keterangan tentang gambar dan warna di bagian ini akan diterapkan ke semua mesh dan poligon ini juga.

----------

<a name="addvertex"></a>

{{% command %}}
**Vertex** *vX*, *vY*, *vZ*, *nX*, *nY*, *nZ*
{{% /command %}}

{{% command-arguments %}}
***vX***: posisi x dalam meter. minus ke kiri, plus ke kanan. nilai defaultnya 0
***vY***: posisi y dalam meter. minus ke bawah, plus ke atas. nilai defaultnya 0
***vZ***: posisi z dalam meter. minus ke belakang, plus kedepan. nilai defaultnya 0
***nX***: pencahayaan atau normals di posisi x. defaultnya 0
***nY***: pencahayaan atau normals di posisi y. defaultnya 0
***nZ***: pencahayaan atau normals di posisi z. defaultnya 0  
{{% /command-arguments %}}

Perintah ini berfungsi membuat titik sudut baru yang bisa dibentuk dari perintah Face atau Face2. Anda bisa membuat titik sudut sebanyak mungkin dalam 1 [meshbuilder]. Setiap 1 baris Vertex mempunyai nomor urut dimulai dari 0, yang pasti akan dipakai di perintah selanjutnya. Vertex paling atas nomor urut 0, sedangkan vertex di bawahnya bernomor 1, selanjutnya vertex ke-2, 3, 4, dan seterusnya.

Normals, atau pencahayaan, berfungsi untuk menentukan arah datangnya cahaya ke mesh ini. Jika semuanya diabaikan atau ditulis 0, maka pengaturan cahaya akan dibuat otomatis. Jika anda menggunakan Normals ini, anda dapat mengatur cahaya yang datang di setiap titik sudut.

----------

<a name="addface"></a>

{{% command %}}
**Face** *v<sub>1</sub>*, *v<sub>2</sub>*, *v<sub>3</sub>*, ..., *v<sub>max</sub>*
{{% /command %}}

{{% command-arguments %}}
***v<sub>i</sub>***: Vertex yang akan dibuat bidang datar. angka yang dibolehkan adalah dari 0 sampai dengan *n-1* , dimana *n* adalah jumlah total vertex yang ada dalam satu [meshbuilder]. 
{{% /command-arguments %}}

Perintah ini membuat sebuah bangun datar yang terbentuk dari semua Vertex yang telah dimasukan. Urutan penulisan nomor vertex harus berurut sehingga bisa menjadi satu bangun datar. urutan penulisan nomor vertex sesuai arah jarum jam (misalnya kiri bawah, kiri atas, kanan atas, kanan bawah) akan menghasilkan bangun datar menghadap ke depan. Sebaliknya, akan mengarah ke belakang. Jika menggunakan Face2, bagian depan dan belakang bidang datar akan terlihat.

----------

<a name="addface2"></a>

{{% command %}}
**Face2** *v<sub>1</sub>*, *v<sub>2</sub>*, *v<sub>3</sub>*, ..., *v<sub>max</sub>*
{{% /command %}}

{{% command-arguments %}}
***v<sub>i</sub>***: Vertex yang akan dibuat bidang datar. angka yang dibolehkan adalah dari 0 sampai dengan *n-1* , dimana *n* adalah jumlah total vertex yang ada dalam satu [meshbuilder]. 
{{% /command-arguments %}}

Perintah ini membuat sebuah bangun datar yang terbentuk dari semua Vertex yang telah dimasukan. Urutan penulisan nomor vertex harus berurut sehingga bisa menjadi satu bangun datar. urutan penulisan nomor vertex sesuai arah jarum jam (misalnya kiri bawah, kiri atas, kanan atas, kanan bawah) akan menghasilkan bangun datar menghadap ke depan. bagian belakang bangun datar juga akan terlihat. Namun pada bagian belakang tidak akan terpengaruh oleh pencahayaan.

----------

<a name="cube"></a>

{{% command %}}
**Cube** *HalfWidth*, *HalfHeight*, *HalfDepth*
{{% /command %}}

{{% command-arguments %}}
***HalfWidth***: Setengah lebar kubus dalam **meter**.  
***HalfHeight***: Setengah tinggi kubus dalam **meter**.  
***HalfDepth***: Setengah panjang kubus dalam **meter**.  
{{% /command-arguments %}}

This command creates a cube having dimensions as specified by *HalfWidth*, *HalfHeight* and *HalfDepth*. The cube will be centered on the origin (0,0,0). Thus, on the x-axis, the cube extends from -*HalfWidth* to *HalfWidth*, on the y-axis from -*HalfHeight* to *HalfHeight* and on the z-axis from -*HalfDepth* to *HalfDepth*. The cube always has 8 vertices and 6 faces.

{{% notice %}}

#### Penggambaran perintah Cube

Perintah Cube sama dengan kombinasi perintah Vertex dan Face. Detailnya dapat dilihat di [sini]({{< ref "/objects/native/cubecylinder/_index.md" >}}).

{{% /notice %}}

----------

<a name="cylinder"></a>

{{% command %}}
**Cylinder** *n*, *UpperRadius*, *LowerRadius*, *Height*
{{% /command %}}

{{% command-arguments %}}
***n***: Jumlah sisi alas dan tutup tabung
***UpperRadius***: jari-jari tutup tabung dalam satuan **meter**. Bisa negatif kalau ingin tutup prisma tidak terlihat.
***LowerRadius***: jari-jari alas tabung dalam satuan **meter**. Bisa negatif kalau ingin alas prisma tidak terlihat.
***Height***: tinggi tinggi dalam **meter**. Bisa negatif jika ingin tabung terlihat dari dalam saja.  
{{% /command-arguments %}}

This command creates a [frustrum](http://en.wikipedia.org/wiki/Frustrum). If *LowerRadius* and *UpperRadius* are equal, the object generated will reduce to a [prism](http://en.wikipedia.org/wiki/Prism_(geometry)), which can be used as an approximation to the cylinder. If either *LowerRadius* or *UpperRadius* are zero, the object generated will reduce to a [pyramid](http://en.wikipedia.org/wiki/Pyramid_(geometry)). The frustum will be centered on the origin (0,0,0). On the x- and z-axes, the frustum extends from -*LowerRadius* to *LowerRadius* for the lower base and from -*UpperRadius* to *UpperRadius* for the upper base. On the y-axis, the frustum extends from -½\**Height* to ½\**Height*.

The number of vertices *n* will usually suffice to be 6 or 8 when only small radii are used, for example to create a pole. Regardless of the values of *UpperRadius*, *LowerRadius* and *n*, the frustum will always have 2\**n* vertices, and usually *n*+2 faces unless any of the caps are omitted. If *UpperRadius* or *LowerRadius* are negative, the absolute value is being taken, but the respective caps are not created. If *Height* is negative, the roles of top and bottom are reversed and the faces will be visible from the inside, while otherwise, they will be visible from the outside.

{{% notice %}}

#### Representasi tabung

Cylinder adalah gabungan dari beberapa perintah Vertex dan Face. Info lebih lanjut bisa dilihat [di sini]({{< ref "/objects/native/cubecylinder/_index.md" >}}).

{{% /notice %}}

----------

{{% command %}}
<font color=#555555>Texture</font>
{{% /command %}}

*<font color=#555555>Perintah ini tidak dipakai di openBVE.</font>*

----------

<a name="translate"></a>

{{% command %}}
**Translate** *X*, *Y*, *Z*  
**TranslateAll** *X*, *Y*, *Z*
{{% /command %}}

{{% command-arguments %}}
***X***: jarak perpindahan di sumbu x dalam **meter**. Negatif ke kiri, positif ke kanan. Nilai defaultnya 0.  
***Y***: jarak perpindahan di sumbu y dalam **meter**. Negatif ke bawah, positif ke atas. Nilai defaultnya 0. 
***Z***: jarak perpindahan di sumbu z dalam **meter**. Negatif ke belakang, positif ke depan. Nilai defaultnya 0. 
{{% /command-arguments %}}

Perintah **Translate** memindahkan semua mesh yang dibuat dari bagian [MeshBuilder] terakhir, baik Vertex, Cube, atau Cylinder. Semua tulisan yang ada di bawah perintah ini tidak akan berpindah. Anda bisa menggunakan perintah ini sebanyak yang diinginkan. Perintah **TranslateAll** akan memindahkan semua objek dan mesh yang ditulis dari [MeshBuilder] sampai tulisan di atas perintah ini. Perintah ini berguna pada akhir teks untuk memindahkan semua objek yang sudah ditulis.

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

Perintah **Scale** dapat dipakai untuk memperbesar atau memperkecil objek yang sudah dibuat dari [MeshBuilder] terakhir, termasuk Vertex, Cube, dan Cylinder. Tulisan di bawah perintah ini tidak akan terpengaruh. Tidak ada batasan jumlah untuk menggunakan perintah ini. Perintah **ScaleAll** akan memperbesar atau memperkecil semua mesh yang sudah ditulis dari [meshbuilder] paling atas sampai dengan tulisan di atas perintah ini. Berguna di akhir teks untuk memperbesar atau memperkecil semua objek dalam file. Angka antara 0-1 akan memperkecil, sedangkan lebih dari 1 akan diperbesar. Angka negatif akan menukar kanan-kiri, atas-bawah, atau depan-belakang objek.

----------

<a name="rotate"></a>

{{% command %}}
**Rotate** *X*, *Y*, *Z*, *Angle*  
**RotateAll** *X*, *Y*, *Z*, *Angle*
{{% /command %}}

{{% command-arguments %}}
***X***: rotasi di sumbu-X. -1 artinya ke kiri, 1 artinya ke kanan. Nilai defaultnya 0.
***Y***: rotasi di sumbu-Y. -1 artinya ke bawah, 1 artinya ke atas. Nilai defaultnya 0.
***Z***: rotasi di sumbu-Z. -1 artinya ke belakang, 1 artinya ke depan. Nilai defaultnya 0.
***Angle***: Besar rotasi dalam derajat (0-360). Negatif artinya berlawanan jarum jam, positif searah jarum jam. Nilai defaultnya 0  
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
***Red***: Komposisi merah, dari angka 0 (hitam) sampai 255 (merah). Angka defaultnya 255.  
***Green***: Komposisi hijau, dari angka 0 (hitam) sampai 255 (hijau). Angka defaultnya 255. 
***Blue***: Komposisi biru, dari angka 0 (hitam) sampai 255 (biru). Angka defaultnya 255. 
***Alpha***: Komposisi alpha, dari angka 0 (transparen) sampai 255 (jelas). Angka defaultnya 255. 
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
***Red***: Komposisi merah, dari angka 0 (hitam) sampai 255 (merah). Angka defaultnya 255.  
***Green***: Komposisi hijau, dari angka 0 (hitam) sampai 255 (hijau). Angka defaultnya 255. 
***Blue***: Komposisi biru, dari angka 0 (hitam) sampai 255 (biru). Angka defaultnya 255.  
{{% /command-arguments %}}

The **EmissiveColor** command sets the emissive color for all faces that were already created in the current [MeshBuilder] section. The difference between the Color command and the EmissiveColor command is that the Color command is affected by lighting, while the EmissiveColor command is not. Thus, the EmissiveColor command should be used for faces which would emit light themselves, including signals, lamps, windows and the like. The actual color contribution to the faces will be the sum of the light-affected color data and the static emissive color data.

The **EmissiveColorAll** command sets the color for all faces that were already created in the current [MeshBuilder] section, and those created in the previous [MeshBuilder] sections.

----------

<a name="setblendmode"></a>

{{% command %}}
**BlendMode** *BlendMode*, *GlowHalfDistance*, *GlowAttenuationMode*
{{% /command %}}

{{% command-arguments %}}
***BlendMode***: Menentukan cara blending gambar, Defaultnya adalah Normal.  
***GlowHalfDistance***: Jarak dimana mesh akan bersinar 50% . Nilainya harus antara 0 sampai 4095, atau 0 jika tidak ada peredaman cahaya.  
***GlowAttenuationMode***: Cara cahaya meredup. Defaultnya adalah DivideExponent4.  
{{% /command-arguments %}}

▸ Pilihan tersedia untuk *BlendMode*:

{{% command-arguments %}}
**Normal**: Mesh akan di-render dengan normal.  
**Additive**: Mesh akan di-render dengan tambahan setingan.  
{{% /command-arguments %}}

▸ Pilihan yang bisa dipakai pada *GlowAttenuationMode*:

{{% command-arguments %}}
**DivideExponent2**: Intensitas cahaya akan diatur dari rumus *x*<sup>2</sup> / (*x*<sup>2</sup> + *GlowHalfDistance*<sup>2</sup>), di mana *x* adalah jarak dari kamera ke objek dalam meter.  
**DivideExponent4**: Intensitas cahaya akan diatur dari rumus *x*<sup>4</sup> / (*x*<sup>4</sup> + *GlowHalfDistance*<sup>4</sup>), di mana *x* adalah jarak dari kamera ke objek dalam meter.  
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
***Red***: Komposisi merah, dari angka 0 (hitam) sampai 255 (merah). Angka defaultnya 255.  
***Green***: Komposisi hijau, dari angka 0 (hitam) sampai 255 (hijau). Angka defaultnya 255. 
***Blue***: Komposisi biru, dari angka 0 (hitam) sampai 255 (biru). Angka defaultnya 255.  
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
