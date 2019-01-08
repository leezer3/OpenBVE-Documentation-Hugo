---
title: "The **.csv** object format"
linktitle: "The CSV object"
weight: 2
---

## ■ Contents

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
  - [SetColor](#setcolor)
  - [SetEmissiveColor](#setemissivecolor)
  - [SetBlendMode](#setblendmode)
  - [LoadTexture](#loadtexture)
  - [SetDecalTransparentColor](#setdecaltransparentcolor)
  - [SetCoordinates](#settexturecoordinates)

{{% /contents %}}

## <a name="overview"></a>■ 1. Overview

A CSV object allows to create a single object by using textual instructions. The object can be used in routes or in trains. The object described by the file can contain any number of individual polygons. The file format allows to group multiple polygons in CreateMeshBuilder sections in which attributes like color or texture information is assigned to all polygons created in each section. This allows for the creation of many polygons in the same CreateMeshBuilder section which share common attributes. A polygon is called a face in this file format.

The file is a plain text file encoded in any arbitrary [encoding](/information/encodings.html), however, UTF-8 with a byte order mark is the preferred choice. The [parsing model](/information/numberformats.html) for numbers is **Loose**, however, you are encouraged to produce *Strict* output nonetheless. The file name is arbitrary, but must have the extension **.csv**. The file is interpreted on a per-line basis, from top to bottom.

➟ [See also the quick reference for the CSV format...](/objects/native/csv_quick.html)

## <a name="syntax"></a>■ 2. Syntax

Each line in the file is split into the name of a command and its arguments. The syntax for all commands is the same:

{{% command %}}  
**NameOfTheCommand**, *Argument<sub>1</sub>*, *Argument<sub>2</sub>*, *Argument<sub>3</sub>*, ..., *Argument<sub>n</sub>*  
{{% /command %}}

*NameOfTheCommand* is case-insensitive. If there are arguments, *NameOfTheCommand* and *Argument1* are separated by a comma (U+002C). Likewise, arguments are also separated by a comma (U+002C). [White spaces](/information/whitespaces.html) around the arguments and around the *NameOfTheCommand*, and well as at the beginning and the end of the line, are ignored. Empty lines or lines solely consisting of white spaces are also ignored.

Arguments may also be omitted by leaving the text at each of the *Argumenti* blank. A default value will usually apply in this case, which is specific to the command used. All default values are specified in the section of available commands.

You can use comments anywhere at the end of a line. A comment is started by a semicolon (U+003B). Comments, if present, are stripped away from all lines before these are processed.

## <a name="commands"></a>■ 3. Available commands

<a name="createmeshbuilder"></a>

{{% command %}}  
**CreateMeshBuilder**  
{{% /command %}}

This command marks the beginning of a new section of faces. It must precede any of the following commands. There might be as many CreateMeshBuilder sections as desired in the object file. All subsequent commands will then relate to the last CreateMeshBuilder section opened.

------

<a name="addvertex"></a>

{{% command %}}  
**AddVertex**, *vX*, *vY*, *vZ*, *nX*, *nY*, *nZ*  
{{% /command %}}

{{% command-arguments %}}  
***vX***: The x-coordinate for the vertex in meters. Negative values are left, positive ones right. The default value is 0.  
***vY***: The y-coordinate for the vertex in meters. Negative values are down, positive ones up. The default value is 0.  
***vZ***: The z-coordinate for the vertex in meters. Negative values are backward, positive ones forward. The default value is 0.  
***nX***: The x-coordinate for the normal of this vertex. The default value is 0.  
***nY***: The y-coordinate for the normal of this vertex. The default value is 0.  
***nZ***: The z-coordinate for the normal of this vertex. The default value is 0.  
{{% /command-arguments %}}

This command creates a new vertex which can then be used to create faces via the AddFace or AddFace2 commands. There can be as many AddVertex commands as desired within a CreateMeshBuilder section. However, the order of the vertices given is important for other commands. The first vertex given has index 0, and subsequent vertices have indices 1, 2, 3 and so on.

The normal is the direction perpendicular to the face at a particular point. If all vertices in a face have the same normal, the face will look flat. If used appropriately, you can give the illusion of a curved face by specifying different normals per vertex, but using the same normal on all vertices that share the same spatial coordinate - across multiple faces. If left all zero, the normal will be calculated automatically.

------

<a name="addface"></a>

{{% command %}}  
**AddFace**, *v<sub>1</sub>*, *v<sub>2</sub>*, *v<sub>3</sub>*, ..., *v<sub>max</sub>*  
{{% /command %}}

{{% command-arguments %}}  
***v<sub>i</sub>***: The vertex index to include in this face. Allowed values are 0 through *n*-1, where *n* is the number of AddVertex commands used.  
{{% /command-arguments %}}

This command creates a face given an arbitrary long list of vertex indices. The index corresponds to the order in which the vertices have been created by the AddVertex command, thus the AddFace command needs to be stated after the corresponding AddVertex commands. The first AddVertex command used creates index 0, and subsequent AddVertex commands create indices 1, 2, 3 and so on. The order in which the vertex indices appear is important. They need to be given in clockwise order when looking at the front of the face. The back of the face will not be visible. However, the AddFace2 command can be used to create a face which is visible from both sides. Only convex polygons are supported.

------

<a name="addface2"></a>

{{% command %}}  
**AddFace2**, *v<sub>1</sub>*, *v<sub>2</sub>*, *v<sub>3</sub>*, ..., *v<sub>max</sub>*  
{{% /command %}}

{{% command-arguments %}}  
***v<sub>i</sub>***: The vertex index to include in this face. Allowed values are 0 through *n*-1, where *n* is the number of AddVertex commands used.  
{{% /command-arguments %}}

This command creates a face given an arbitrary long list of vertex indices. The index corresponds to the order in which the vertices have been created by the Vertex command, thus the Face command needs to be stated after the corresponding Vertex commands. The first Vertex command used creates index 0, and subsequent Vertex commands create indices 1, 2, 3 and so on. The order in which the vertex indices appear is important. They need to be given in clockwise order when looking at the front of the face. The back of the face will also be visible, however, lighting on the back face might be the same as on the front face. Only convex polygons are supported.

------

<a name="cube"></a>

{{% command %}}  
**Cube**, *HalfWidth*, *HalfHeight*, *HalfDepth*  
{{% /command %}}

{{% command-arguments %}}  
***HalfWidth***: A floating-point number representing half the width of the cube in **meters**.  
***HalfHeight***: A floating-point number representing half the height of the cube in **meters**.  
***HalfDepth***: A floating-point number representing half the depth of the cube in **meters**.  
{{% /command-arguments %}}

This command creates a cube having dimensions as specified by *HalfWidth*, *HalfHeight* and *HalfDepth*. The cube will be centered on the origin (0,0,0). Thus, on the x-axis, the cube extends from -*HalfWidth* to *HalfWidth*, on the y-axis from -*HalfHeight* to *HalfHeight* and on the z-axis from -*HalfDepth* to *HalfDepth*. The cube always has 8 vertices and 6 faces.

{{% notice %}}  

#### Cube representation

The Cube command is equivalent to a series of AddVertex and AddFace commands, which you need to account for when using other commands in the same CreateMeshBuilder section. The details on what the Cube command does are available [here](/objects/native/cubecylinder.html).

{{% /notice %}}

------

<a name="cylinder"></a>

{{% command %}}  
**Cylinder**, *n*, *UpperRadius*, *LowerRadius*, *Height*  
{{% /command %}}

{{% command-arguments %}}  
***n***: An integer representing the number of vertices to be used for the base of the frustum.  
***UpperRadius***: A floating-point number representing the radius for the upper base of the frustum in **meters**. Can be negative to indicate that the top cap is to be omitted.  
***LowerRadius***: A floating-point number representing the radius for the lower base of the frustum in **meters**. Can be negative to indicate that the bottom cap is to be omitted.  
***Height***: A floating-point number representing the height of the prism in **meters**. Can be negative, which will flip the frustum vertically and display it inside-out.  
{{% /command-arguments %}}

This command creates a [frustum](http://en.wikipedia.org/wiki/Frustum). If *LowerRadius* and *UpperRadius* are equal, the object generated will reduce to a [prism](http://en.wikipedia.org/wiki/Prism_(geometry)), which can be used as an approximation to the cylinder. If either *LowerRadius* or *UpperRadius* are zero, the object generated will reduce to a [pyramid](http://en.wikipedia.org/wiki/Pyramid_(geometry)). The frustum will be centered on the origin (0,0,0). On the x- and z-axes, the frustum extends from -*LowerRadius* to *LowerRadius* for the lower base and from -*UpperRadius* to *UpperRadius* for the upper base. On the y-axis, the frustum extends from -½\**Height* to ½\**Height*.

The number of vertices *n* will usually suffice to be 6 or 8 when only small radii are used, for example to create a pole. Regardless of the values of *UpperRadius*, *LowerRadius* and *n*, the frustum will always have 2\**n* vertices, and usually *n*+2 faces unless any of the caps are omitted. If *UpperRadius* or *LowerRadius* are negative, the absolute value is being taken, but the respective caps are not created. If *Height* is negative, the roles of top and bottom are reversed and the faces will be visible from the inside, while otherwise, they will be visible from the outside.

{{% notice %}}

#### Cylinder representation

The Cylinder command is equivalent to a series of AddVertex and AddFace commands, which you need to account for when using other commands in the same CreateMeshBuilder section. The details on what the Cylinder command does are available [here](/objects/native/cubecylinder.html).

{{% /notice %}}

------

{{% command %}}  
<font color=#555555>GenerateNormals</font>  
{{% /command %}}

*<font color=#555555>This command is ignored by openBVE.</font>*

------

<a name="translate"></a>

{{% command %}}  
**Translate**, *X*, *Y*, *Z*  
**TranslateAll**, *X*, *Y*, *Z*  
{{% /command %}}

{{% command-arguments %}}  
***X***: A floating-point number representing the translation on the x-coordinate in **meters**. Negative values translate to the left, positive ones right. The default value is 0.  
***Y***: A floating-point number representing the translation on the y-coordinate in **meters**. Negative values translate down, positive ones up. The default value is 0.  
***Z***: A floating-point number representing the translation on the z-coordinate in **meters**. Negative values translate backward, positive ones forward. The default value is 0.  
{{% /command-arguments %}}

The **Translate** command moves all vertices that have been created so far in the CreateMeshBuilder section via the AddVertex, Cube or Cylinder commands. Subsequent vertices are not affected. You can use as many Translate commands as desired in a CreateMeshBuilder section. The **TranslateAll** command not only affects the vertices generated in the current CreateMeshBuilder section, but also those created in previous CreateMeshBuilder sections. This is useful to insert at the end of the file in order to translate the whole object.

------

<a name="scale"></a>

{{% command %}}  
**Scale**, *X*, *Y*, *Z*  
**ScaleAll**, *X*, *Y*, *Z*  
{{% /command %}}

{{% command-arguments %}}  
***X***: A non-zero floating-point number representing the scale factor on the x-coordinate. The default value is 1.  
***Y***: A non-zero floating-point number representing the scale factor on the y-coordinate. The default value is 1.  
***Z***: non-zero A floating-point number representing the scale factor on the z-coordinate. The default value is 1.  
{{% /command-arguments %}}

The **Scale** command scales all vertices that have been created so far in the CreateMeshBuilder section via the AddVertex, Cube or Cylinder commands. Subsequent vertices are not affected. You can use as many Scale commands as desired in a CreateMeshBuilder section. The **ScaleAll** command not only affects the vertices generated in the current CreateMeshBuilder section, but also those created in previous CreateMeshBuilder sections. This is useful to insert at the end of the file in order to scale the whole object.

------

<a name="rotate"></a>

{{% command %}}  
**Rotate**, *X*, *Y*, *Z*, *Angle*  
**RotateAll**, *X*, *Y*, *Z*, *Angle*  
{{% /command %}}

{{% command-arguments %}}  
***X***: The x-direction of the rotational axis. Negative values point to the left, positive ones to the right. The default value is 0.  
***Y***: The y-direction of the rotational axis. Negative values point down, positive ones up. The default value is 0.  
***Z***: The z-direction of the rotational axis. Negative values point backward, positive ones forward. The default value is 0.  
{{% /command-arguments %}}

The **Rotate** command rotates all vertices that have been created so far in the current CreateMeshBuilder section via the AddVertex, Cube or Cylinder commands. Subsequent vertices are not affected. The axis of rotation is specified via the *X*, *Y* and *Z* values. Rotation will occur in the plane perpendicular to that direction. A zero vector for this axis is treated as (1,0,0). All other directions are normalized.

You can use as many Rotate commands as desired in a CreateMeshBuilder section. The **RotateAll** command not only affects the vertices generated in the current CreateMeshBuilder section, but also those created in previous CreateMeshBuilder sections. This is useful to insert at the end of the file in order to rotate the whole object.

------

<a name="shear"></a>

{{% command %}}  
**Shear**, *dX*, *dY*, *dZ*, *sX*, *sY*, *sZ*, *r*  
**ShearAll**, *dX*, *dY*, *dZ*, *sX*, *sY*, *sZ*, *r*  
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

------

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

The **Mirror** command mirrors all vertices that have been created so far in the current CreateMeshBuilder section via the AddVertex, Cube or Cylinder commands. Subsequent vertices are not affected. The direction(s) to mirror are specified via the *X*, *Y* and *Z* values. You can use as many Mirror commands as desired in a CreateMeshBuilder section.

The **MirrorAll** command not only affects the vertices generated in the current CreateMeshBuilder section, but also those created in previous CreateMeshBuilder sections. This is useful to insert at the end of the file in order to mirror the whole object.

------

<a name="setcolor"></a>

{{% command %}}  
**SetColor**, *Red*, *Green*, *Blue*, *Alpha*  
{{% /command %}}

{{% command-arguments %}}  
***Red***: The red component of the color. Measured from 0 (black) to 255 (red). The default value is 255.  
***Green***: The green component of the color. Measured from 0 (black) to 255 (green). The default value is 255.  
***Blue***: The blue component of the color. Measured from 0 (black) to 255 (blue). The default value is 255.  
***Alpha***: The alpha component of the color. Measured from 0 (transparent) to 255 (opaque). The default value is 255.  
{{% /command-arguments %}}

This command sets the color for all faces that were already created in the current CreateMeshBuilder section. If no texture is used, the faces will be colored using the color data as specified by *Red*, *Green*and *Blue*. If a texture is used, the pixels in the texture will be multiplied by the color, where multiplying with black results in black and multiplying with white does not change the color of the texture pixels. Values in-between make the texture pixels darker. When lighting is used in the route, the actual color can change depending on the lighting conditions, but will usually become darker.

------

<a name="setemissivecolor"></a>

{{% command %}}  
**SetEmissiveColor**, *Red*, *Green*, *Blue*  
{{% /command%}}

{{% command-arguments %}}  
***Red***: The red component of the color. Measured from 0 (black) to 255 (red). The default value is 0.  
***Green***: The green component of the color. Measured from 0 (black) to 255 (green). The default value is 0.  
***Blue***: The blue component of the color. Measured from 0 (black) to 255 (blue). The default value is 0.  
{{% /command-arguments %}}

This command sets the emissive color for all faces that were already created in the current CreateMeshBuilder section. The difference between the SetColor command and the SetEmissiveColor command is that the SetColor command is affected by lighting, while the SetEmissiveColor command is not. Thus, the SetEmissiveColor command should be used for faces which would emit light themselves, including signals, lamps, windows and the like. The actual color contribution to the faces will be the sum of the light-affected color data and the static emissive color data.

------

<a name="setblendmode"></a>

{{% command %}}  
**SetBlendMode**, *BlendMode*, *GlowHalfDistance*, *GlowAttenuationMode*  
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
**DivideExponent2**: The glow intensity is determined via the function *x*2 / (*x*2 + *GlowHalfDistance*2), where *x* is the distance from the camera to the object in meters.  
**DivideExponent4**: The glow intensity is determined via the function *x*4 / (*x*4 + *GlowHalfDistance*4), where *x* is the distance from the camera to the object in meters.  
{{% /command-arguments %}}

This command sets the blend mode for all faces in the current CreateMeshBuilder section. The *Normal* mode replaces screen pixels with texture pixels. The *Additive* mode adds the color of texture pixels to the color of screen pixels, where adding black does not change the screen pixel, while adding white results in white. If *GlowHalfDistance* is 0, glow attenuation will be disabled, which is the default. If glow attenuation is to be used, *GlowHalfDistance* represents the distance in meters at which the glow is exactly at 50% of its intensity. When the camera approaches the face, the face will gradually fade out (become transparent). The function used to determine the exact intensity for a given distance can be influenced with the setting of *GlowAttenuationMode*. DivideExponent2 creates a smoother transition, but will converge to the maximum intensity very slowly, while DivideExponent4 creates a sharper transition which converges more quickly.

{{% warning %}}

#### openBVE 2 compatibility note

In openBVE 2, only additive glow will be supported and the *GlowAttenuationMode* parameter is likely going to be dropped. Please avoid using normal blending in conjunction with using glow.

{{% /warning %}}

------

<a name="loadtexture"></a>

{{% command %}}  
**LoadTexture**, *DaytimeTexture*, *NighttimeTexture*  
{{% /command %}}

{{% command-arguments %}}  
***DaytimeTexture***: The file name of the daytime version of the texture to load, relative to the directory the object file is stored in.  
***NighttimeTexture***: The file name of the nighttime version of the texture to load, relative to the directory the object file is stored in.  
{{% /command-arguments %}}

This command loads a texture and uses it for all faces in the current CreateMeshBuilder section. The file name is relative to the directory the object file is stored in. You can use PNG, which supports full alpha channels, but use the alpha channel only if absolutely required as it reduces performance. Prefer using a texture without an alpha channel in conjunction with the SetDecalTransparentColor command in order to use color-key transparency.

If *NighttimeTexture* is used, it specifies the texture to be used on nighttime lighting conditions, while *DaytimeTexture* then specifies the texture to be used on daytime lighting conditions. The textures might blend into each other and should be designed accordingly. If *NighttimeTexture* is used, *DaytimeTexture* must also be specified. If *NighttimeTexture* is not used, low lighting conditions will make the daytime version darker. Nighttime textures are meant for use with train interior/exterior objects.

------

<a name="setdecaltransparentcolor"></a>

{{% command %}}  
**SetDecalTransparentColor**, *Red*, *Green*, *Blue*  
{{% /command %}}

{{% command-arguments %}}  
***Red***: The red component of the color. Measured from 0 (black) to 255 (red). The default value is 0.  
***Green***: The green component of the color. Measured from 0 (black) to 255 (green). The default value is 0.  
***Blue***: The blue component of the color. Measured from 0 (black) to 255 (blue). The default value is 0.  
{{% /command-arguments %}}

This command sets the color used for screendoor transparency for all faces that were already created. The texture loaded via the Load command will become transparent for all pixels which match exactly with the color specified via the *Red*, *Green* and *Blue* parameters. The use of screendoor transparency is much more efficient than using a full alpha channel, so prefer using a texture without an alpha channel and use this command instead to make parts of the texture transparent. You need to specify texture coordinates via the Coordinate command in order for the texture to correctly appear on the faces.

------

<a name="settexturecoordinates"></a>

{{% command %}}  
**SetTextureCoordinates**, *VertexIndex*, *X*, *Y*  
{{% /command %}}

{{% command-arguments %}}  
***VertexIndex***: The vertex index the coordinate is referring to. Allowed values are 0 through *n*-1, where *n* is the number of AddVertex commands used.  
***X***: The x-coordinate of the texture. Integer values correspond to the left/right edge of the texture. If only values between 0 and 1 are to be considered, 0 corresponds to the left and 1 to the right.  
***Y***: The y-coordinate of the texture. Integer values correspond to the top/bottom edge of the texture. If only values between 0 and 1 are to be considered, 0 corresponds to the top and 1 to the bottom.  
{{% /command-arguments %}}

This command associates a coordinate in the texture to the vertex specified by *VertexIndex*. The index corresponds to the order in which the vertices have been created by the AddVertex command, thus the Coordinates command needs to be stated after the corresponding AddVertex command. The *X* and *Y* values do not necessarily need to be in the range between 0 (left or top) to 1 (right or bottom), but can have any other value. It is assumed in this case that the texture is repeated on an infinite grid where integer values for *X* and *Y* correspond to the corners of the texture.