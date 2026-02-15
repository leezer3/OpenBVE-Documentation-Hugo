---
title: "The **panel2.cfg** file format"
linktitle: "The panel2.cfg file"
weight: 5
---

## ■ Isi

{{% contents %}}

- [1. Overview](#overview)
- [2. Syntax](#syntax)
- [3. The This section](#this)
- [4. The PilotLamp section](#pilotlamp)
- [5. The Needle section](#needle)
- [6. The DigitalNumber section](#digitalnumber)
- [7. The DigitalGauge section](#digitalgauge)
- [8. The LinearGauge section](#lineargauge)
- [9. The Timetable section](#timetable)
- [10. The Windscreen section](#windscreen)
- [11. Available subjects](#subjects)

{{% /contents %}}

## <a name="overview"></a>■ 1. Penjelasan

The panel2.cfg file allows to create 2D panels by defining which elements to use, like lamps, needles, etc., what they are intended to display and where they are to be placed.

The panel2.cfg file is a plain text file encoded in any arbitrary [encoding]({{< ref "/information/encodings/_index.md" >}}), however, UTF-8 with a byte order mark is the preferred choice. The [parsing model]({{< ref "/information/numberformats/_index.md" >}}) for numbers is **Loose**, however, you are encouraged to produce *Strict* output nonetheless. The file is required to be located inside the train folder and is expected to be named **panel2.cfg**. The file is interpreted on a per-line basis, from top to bottom.

{{% notice %}}

#### Layers

All elements in the panel are associated layers. The layer is described as an integer, where small values represent the background and high numbers the foreground. When placing elements, you should make sure that no overlapping elements share the same layer number. The background image of the panel is always associated layer number 0, so elements on top of it should start with layer number 1 or higher. If you want to place elements behind the panel background image, you can likewise use negative numbers to represent these layers.

{{% /notice %}}

<br/>

{{% notice %}}

#### Daytime and nighttime images

For all elements that take a texture, you can specify distinct daytime and nighttime textures. Depending on the lighting conditions and additional route instructions, openBVE will display any intermediate blend between the daytime and nighttime textures. If no nighttime textures are used, the daytime images will be darkened to simulate corresponding nighttime images.

{{% /notice %}}

➟ [See also the quick reference for the panel2.cfg...]({{< ref "/trains/panel2_cfg_quick/_index.md" >}})

{{% notice %}}

#### Overlay dan Pencahayaan

The cab is rendered as an overlay. This means that the cab will always appear in front of scenery objects. This is intentional, because this way, rain, walls and other obstructing objects cannot be accidentally rendered inside the cab. Furthermore, lighting in the cab is different than in the scenery. While the ambient brightness is reflected in the cab, the ambient color is not, and the cab always appears as if reflecting white light.

{{% /notice %}}

## <a name="syntax"></a>■ 2. Format penulisan

Setiap baris dalam file ini bisa dikosongkan (atau dikasih spasi) dan tidak akan dibaca oleh sistem. Dengan begitu anda bisa memisahkan bagian satu dengan bagian lainnya. 

Membuat bagian baru dimulai dengan menambahkan nama bagian dan memakai kurung tegak ( " [ " dan " ] " ). Spasi tidak akan terbaca di sistem. Contoh cara penulisannya:

{{% command %}}  
[NamaBagian]  
{{% /command %}}

A key-value pair is indicated by giving the key, an equals sign (U+003D) and then the value. The key is case-insensitive. White spaces at the beginning and the end of the line are ignored, as well as in front and after the equals sign. Alternatively, white spaces surrounding the key and the value are ignored. Thus, a key-value pair as the following form:

{{% command %}}  
Perintah = Nilai  
{{% /command %}}

Some values are further split into multiple parts, separated by commas (U+002C).

Komentar bisa ditambahkan di mana saja di akhir teks. Tambahkan titik koma " ; " lalu tulis komentar atau catatan yang diinginkan.

## <a name="this"></a>■ 3. The This section

The This section defines the background image to use for the panel and which resolution the panel has. Only one This section may be used within the file.

------

{{% command %}}  
[This]  
{{% /command %}}

This starts the section.

------

{{% command %}}  
Resolution = *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: A floating-point number representing the width measured on the panel background image that corresponds to the width of the screen for the default camera position, alignment and zoom.  
{{% /command-arguments %}}

------

{{% command %}}  
Left = *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: A floating-point representing which x-coordinate in the panel background corresponds to the farthest point to which can be scrolled left. The point is not required to lie within the bounds of the background image.  
{{% /command-arguments %}}

------

{{% command %}}  
Right = *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: A floating-point representing which x-coordinate in the panel background corresponds to the farthest point to which can be scrolled right. The point is not required to lie within the bounds of the background image.  
{{% /command-arguments %}}

------

{{% command %}}  
Top = *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: A floating-point representing which y-coordinate in the panel background corresponds to the farthest point to which can be scrolled up. The point is not required to lie within the bounds of the background image.  
{{% /command-arguments %}}

------

{{% command %}}  
Bottom = *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: A floating-point representing which y-coordinate in the panel background corresponds to the farthest point to which can be scrolled down. The point is not required to lie within the bounds of the background image.  
{{% /command-arguments %}}

------

{{% command %}}  
DaytimeImage = *FileName*  
{{% /command %}}

{{% command-arguments %}}  
***FileName***: The image file to use as the daytime version of the panel background image, relative to the train folder. If not specified, no background image will be shown.  
{{% /command-arguments %}}

------

{{% command %}}  
NighttimeImage = *FileName*  
{{% /command %}}

{{% command-arguments %}}  
***FileName***: The image file to use as the nighttime version of the panel background image, relative to the train folder. If specified, the daytime version must also be specified. Otherwise, no nighttime version will be available.  
{{% /command-arguments %}}

------

{{% command %}}  
TransparentColor = *HexColor*  
{{% /command %}}

{{% command-arguments %}}  
***HexColor***: A [hexcolor]({{< ref "/information/numberformats/_index.md#colors" >}}) representing the exact color in both the *DaytimeImage* and *NighttimeImage* files which corresponds to a transparent pixel. The default value is #0000FF.  
{{% /command-arguments %}}

------

{{% command %}}  
Center = *X*, *Y*  
{{% /command %}}

{{% command-arguments %}}  
***X***: A floating-point number representing the x-coordinate of the panel background image that corresponds to the center of the screen.  
***Y***: A floating-point number representing the y-coordinate of the panel background image that corresponds to the center of the screen.  
{{% /command-arguments %}}

Defines which pixel in the background image corresponds to the center of the screen for the default camera position. The relation between *Center* and *Origin* influences the yaw and pitch of the cab alignment.

------

{{% command %}}  
Origin = *X*, *Y*  
{{% /command %}}

{{% command-arguments %}}  
***X***: A floating-point number representing the x-coordinate of the panel background image that corresponds to the vanishing point.  
***Y***: A floating-point number representing the y-coordinate of the panel background image that corresponds to the vanishing point.  
{{% /command-arguments %}}

Defines which pixel in the background image corresponds to the vanishing point for the default camera position. This is the point to which the two rails converge at the horizon on a straight piece of track. The relation between *Center* and *Origin* influences the yaw and pitch of the cab alignment.

![illustration_center_origin](/images/illustration_center_origin.png)

Default versus simplified section behavior

#### When camera restriction affects the default camera setup

Camera restriction is the built-in functionality to limit the camera view inside cabs created by the panel2.cfg to the rectangle as specified via *Left*, *Right*, *Top* and *Bottom*. If your setup of *Center*and *Resolution* would force the camera to show parts that are outside of that specified region even with the default camera settings, the camera position will be altered to guarantee that the view stays inside the cab region. In order to verify that your *Center* and *Origin* setup is unaffected by this, disable camera restriction by hitting the CAMERA_RESTRICTION key (default: CTRL+R) and then reset the camera by hitting the CAMERA_RESET key (default: num 5). The *Center* and *Origin* values will now be exactly as scripted, thereby revealing possible problems in the relations of *Resolution*, *Left*, *Right*, *Top*, *Bottom*, *Center* and *Origin*.

{{% /notice %}}

## <a name="pilotlamp"></a>■ 4. The PilotLamp section

The PilotLamp section creates an indicator that can be made visible or invisible. You can use as many of these sections as required.

The *DaytimeImage* is required to be specified if you make use of the PilotLamp section. The *Subject* used needs to return 1 if the PilotLamp is to be made visible, otherwise it will be invisible.

------

{{% command %}}  
[PilotLamp]  
{{% /command %}}

This starts the section.

------

{{% command %}}  
Subject = *Subject*  
{{% /command %}}

{{% command-arguments %}}  
***Subject***: One of the [available subjects](#subjects). The default subject is **true**.  
{{% /command-arguments %}}

------

{{% command %}}  
Location = *Left*, *Top*  
{{% /command %}}

{{% command-arguments %}}  
***Left***: A floating-point number representing the x-coordinate at which the left of the image is inserted. The default value is 0.  
***Top***: A floating-point number representing the y-coordinate at which the top of the image is inserted. The default value is 0.  
{{% /command-arguments %}}

------

{{% command %}}  
DaytimeImage = *FileName*  
{{% /command %}}

{{% command-arguments %}}  
***FileName***: The image file to use as the daytime version of the indicator image, relative to the train folder. ***Is required to be specified.***  
{{% /command-arguments %}}

------

{{% command %}}  
NighttimeImage = *FileName*  
{{% /command %}}

{{% command-arguments %}}  
***FileName***: The image file to use as the nighttime version of the indicator image, relative to the train folder. If not specified, no nighttime version will be available.  
{{% /command-arguments %}}

------

{{% command %}}  
TransparentColor = *HexColor*  
{{% /command %}}

{{% command-arguments %}}  
***HexColor***: A [hexcolor]({{< ref "/information/numberformats/_index.md#colors" >}}) representing the exact color in both the *DaytimeImage* and *NighttimeImage* files which corresponds to a transparent pixel. The default value is #0000FF.  
{{% /command-arguments %}}

------

{{% command %}}  
Layer = *LayerIndex*  
{{% /command %}}

{{% command-arguments %}}  
***LayerIndex***: An integer which uniquely defines this element among overlapping elements. Lower numbers represent the background and higher numbers the foreground. Elements may use the same *LayerIndex* as long as they do not overlap. The default value is 0.  
{{% /command-arguments %}}

## <a name="needle"></a>■ 5. The Needle section

The Needle section creates a rotating element, or needle. You can use as many of these sections as required.

The image used for the Needle, defined by *DaytimeImage* (required) or *NighttimeImage* (optional), will be rotated around a defined *Origin* and optionally scaled if *Radius* is used. The needle depicted in the image should be pointing up.

------

{{% command %}}  
[Needle]  
{{% /command %}}

This starts the section.

------

{{% command %}}  
Subject = *Subject*  
{{% /command %}}

{{% command-arguments %}}  
***Subject***: One of the [available subjects](#subjects). The default subject is **true**.  
{{% /command-arguments %}}

------

{{% command %}}  
Location = *CenterX*, *CenterY*  
{{% /command %}}

{{% command-arguments %}}  
***CenterX***: A floating-point number representing the x-coordinate of the center of rotation in terms of the background image. The default value is 0.  
***CenterY***: A floating-point number representing the y-coordinate of the center of rotation in terms of the background image. The default value is 0.  
{{% /command-arguments %}}

------

{{% command %}}  
Radius = *ValueInPixels*  
{{% /command %}}

{{% command-arguments %}}  
***ValueInPixels***: A non-zero floating-point number that redefines the radius of the element in pixels relative to the background image. The default value is *Y* from the *Origin* key-value pair.  
{{% /command-arguments %}}

The *Y* value in the *Origin* key-value pair defines the vertical point of rotation, but also defines the actual radius of the element in the bitmap's own pixel coordinates. If *ValueInPixels* is set to a different value than this actual radius, the image will be scaled by a factor of *Radius* / *Y*, while preserving the *Origin*-*Center* relation. If you do not want to scale the image, set *ValueInPixels* to the same value as *Y*in the *Origin* key-value pair, or omit *Radius* altogether.

------

{{% command %}}  
DaytimeImage = *FileName*  
{{% /command %}}

{{% command-arguments %}}  
***FileName***: The image file to use as the daytime version of the needle image, relative to the train folder. ***Is required to be specified.***  
{{% /command-arguments %}}

------

{{% command %}}  
NighttimeImage = *FileName*  
{{% /command %}}

{{% command-arguments %}}  
***FileName***: The image file to use as the nighttime version of the needle image, relative to the train folder. If not specified, no nighttime version will be available.  
{{% /command-arguments %}}

------

{{% command %}}  
Color = *HexColor*  
{{% /command %}}

{{% command-arguments %}}  
***HexColor***: A [hexcolor]({{< ref "/information/numberformats/_index.md#colors" >}}) representing the color by which the images are multiplied with. The default value is #FFFFFF.  
{{% /command-arguments %}}

Multiplies the images by the color specified by *HexColor*. Setting *HexColor* to **#FFFFFF** (white) preserves the original color of the images, while setting *HexColor* to **#000000** (black) produces black images. Pixels defined as being transparent via *TransparentColor* are not affected.

------

{{% command %}}  
TransparentColor = *HexColor*  
{{% /command %}}

{{% command-arguments %}}  
***HexColor***: A [hexcolor]({{< ref "/information/numberformats/_index.md#colors" >}}) representing the exact color in both the *DaytimeImage* and *NighttimeImage* files which corresponds to a transparent pixel. The default value is #0000FF.  
{{% /command-arguments %}}

------

{{% command %}}  
Origin = *X*, *Y*  
{{% /command %}}

{{% command-arguments %}}  
***X***: A floating-point number representing the x-coordinate that corresponds to the image's center of rotation. The default value is half the image width.  
***Y***: A floating-point number representing the y-coordinate that corresponds to the image's center of rotation. The default value is half the image height.  
{{% /command-arguments %}}

------

{{% command %}}  
InitialAngle = *ValueInDegrees*  
{{% /command %}}

{{% command-arguments %}}  
***ValueInDegrees***: A floating-point number representing the angle **in degrees** that corresponds to the *Minimum* value. The angle is measured clock-wise from the 12 o'clock position. The default value is -120.  
{{% /command-arguments %}}

------

{{% command %}}  
LastAngle = *ValueInDegrees*  
{{% /command %}}

{{% command-arguments %}}  
***ValueInDegrees***: A floating-point number representing the angle **in degrees** that corresponds to the *Maximum* value. The angle is measured clock-wise from the 12 o'clock position. The default value is 120.  
{{% /command-arguments %}}

------

{{% command %}}  
Minimum = *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: A floating-point value corresponding to the value returned by the *Subject* in use that should be linked to the *InitialAngle*. The default value is 0.  
{{% /command-arguments %}}

------

{{% command %}}  
Maximum = *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: A floating-point value corresponding to the value returned by the *Subject* in use that should be linked to the *LastAngle*. The default value is 1000.  
{{% /command-arguments %}}

------

{{% command %}}  
NaturalFreq = *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: A non-negative floating-point number representing the natural frequency of an assumed undamped oscillatory system. If not specified, damping will not be performed.  
{{% /command-arguments %}}

Defines the natural frequency. In an undamped oscillatory system, this is the angular frequency in radians per second. As soon as damping is performed, the frequency will decrease with convergence of the oscillator. A natural frequency of 0 will not allow any rotation to be performed. Higher values roughly correspond to radians per second. If specified, *DampingRatio* should also be specified.

------

{{% command %}}  
DampingRatio = *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: A non-negative floating-point number representing the damping ratio. If not specified, damping will not be performed.  
{{% /command-arguments %}}

Defines the damping ratio for the oscillatory system. Values between 0 and 1 represent [under-damping](http://en.wikipedia.org/wiki/Damping#Under-damping), 1 represents [critical damping](http://en.wikipedia.org/wiki/Damping#Critical_damping) and values above 1 represent [over-damping](http://en.wikipedia.org/wiki/Damping#Over-damping). Compare the following illustration in which the angle of rotation changes from 0 to 1 over time:

If specified, *NaturalFreq* should also be specified.

------

{{% command %}}  
Layer = *LayerIndex*  
{{% /command %}}

{{% command-arguments %}}  
***LayerIndex***: An integer which uniquely defines this element among overlapping elements. Lower numbers represent the background and higher numbers the foreground. Elements may use the same *LayerIndex* as long as they do not overlap. The default value is 0.  
{{% /command-arguments %}}

## <a name="digitalnumber"></a>■ 6. The DigitalNumber section

The DigitalNumber section creates an indicator that can switch between multiple states, useful to build up a display of decimal digits. You can use as many of these sections as required.

The image used for the DigitalNumber, defined by *DaytimeImage* (required) and *NighttimeImage* (optional), is comprised of the individual states, which are stacked vertically, anchored at the top of the image. The width of a single state is equal to the width of the image, while the height of a single state is defined by *Interval* (required). The *Subject* used needs to return an integer from 0 (first element) to *n*-1 (last element), where *n* is the number of elements. If a value outside of that range is returned by *Subject*, the DigitalNumber will be made invisible.

------

{{% command %}}  
[DigitalNumber]  
{{% /command %}}

This starts the section.

------

{{% command %}}  
Subject = *Subject*  
{{% /command %}}

{{% command-arguments %}}  
***Subject***: One of the [available subjects](#subjects). The default subject is **true**.  
{{% /command-arguments %}}

------

{{% command %}}  
Location = *Left*, *Top*  
{{% /command %}}

{{% command-arguments %}}  
***Left***: A floating-point number representing the x-coordinate at which the left of the image is inserted. The default value is 0.  
***Top***: A floating-point number representing the y-coordinate at which the top of the image is inserted. The default value is 0.  
{{% /command-arguments %}}

------

{{% command %}}  
DaytimeImage = *FileName*  
{{% /command %}}

{{% command-arguments %}}  
***FileName***: The image file to use as the daytime version of the DigitalNumber image, relative to the train folder. ***Is required to be specified.***  
{{% /command-arguments %}}

------

{{% command %}}  
NighttimeImage = *FileName*  
{{% /command %}}

{{% command-arguments %}}  
***FileName***: The image file to use as the nighttime version of the DigitalNumber image, relative to the train folder. If not specified, no nighttime version will be available.  
{{% /command-arguments %}}

------

{{% command %}}  
TransparentColor = *HexColor*  
{{% /command %}}

{{% command-arguments %}}  
***HexColor***: A [hexcolor]({{< ref "/information/numberformats/_index.md#colors" >}}) representing the exact color in both the *DaytimeImage* and *NighttimeImage* files which corresponds to a transparent pixel. The default value is #0000FF.  
{{% /command-arguments %}}

------

{{% command %}}  
Interval = *Height*  
{{% /command %}}

{{% command-arguments %}}  
***Height***: The height of a single state in the images in pixels. ***Is required to be specified.***  
{{% /command-arguments %}}

------

{{% command %}}  
Layer = *LayerIndex*  
{{% /command %}}

{{% command-arguments %}}  
***LayerIndex***: An integer which uniquely defines this element among overlapping elements. Lower numbers represent the background and higher numbers the foreground. Elements may use the same *LayerIndex* as long as they do not overlap. The default value is 0.  
{{% /command-arguments %}}

## <a name="digitalgauge"></a>■ 7. The DigitalGauge section

The DigitalGauge section creates a solid-color square of which only a radial section is shown at a time. You can use as many of these sections as required.

There are three important angles to consider. The *InitialAngle* defines which angle corresponds to the *Minimum* value, while *LastAngle* defines which angle corresponds to the *Maximum* value. The current value at a given time corresponds to the current angle. The solid-color square will only show the part that is between the current angle and the *LastAngle*. If *InitialAngle* is less than *LastAngle*, the solid-color square will wind clockwise. If *InitialAngle* is greater than *LastAngle*, the solid-color square will wind counter-clockwise.

The subject needs to return a value that meaningfully works together with the *Minimum* and *Maximum* settings.

![illustration_digitalgauge_1](/images/illustration_digitalgauge_1.png)

![illustration_digitalgauge_2](/images/illustration_digitalgauge_2.png)

------

{{% command %}}  
[DigitalGauge]  
{{% /command %}}

This starts the section.

------

{{% command %}}  
Subject = *Subject*  
{{% /command %}}

{{% command-arguments %}}  
***Subject***: One of the [available subjects](#subjects). The default subject is **true**.  
{{% /command-arguments %}}

------

{{% command %}}  
Location = *CenterX*, *CenterY*  
{{% /command %}}

{{% command-arguments %}}  
***CenterX***: A floating-point number representing the x-coordinate at which the left of the image is inserted. The default value is 0.  
***CenterY***: A floating-point number representing the y-coordinate at which the top of the image is inserted. The default value is 0.  
{{% /command-arguments %}}

------

{{% command %}}  
Radius = *ValueInPixels*  
{{% /command %}}

{{% command-arguments %}}  
***ValueInPixels***: A non-zero floating-point number representing half the edge length of the solid-color square in pixels. ***Is required to be specified.***  
{{% /command-arguments %}}

If *Radius* is negative, it is treated as if it was positive, but the entire LED is rotated by 180 degrees.

------

{{% command %}}  
Color = *HexColor*  
{{% /command %}}

{{% command-arguments %}}  
***HexColor***: A [hexcolor]({{< ref "/information/numberformats/_index.md#colors" >}}) representing the color of the solid-color square. The default value is #FFFFFF.  
{{% /command-arguments %}}

------

{{% command %}}  
InitialAngle = *ValueInDegrees*  
{{% /command %}}

{{% command-arguments %}}  
***ValueInDegrees***: A floating-point number representing the angle **in degrees** that corresponds to the *Minimum* value. The angle is measured clock-wise from the 12 o'clock position. The default value is -120.  
{{% /command-arguments %}}

{{% warning-nontitle %}}

The absolute difference between *InitialAngle* and *LastAngle* may not exceed 360 degrees.

{{% /warning-nontitle %}}

------

{{% command %}}  
LastAngle = *ValueInDegrees*  
{{% /command %}}

{{% command-arguments %}}  
***ValueInDegrees***: A floating-point number representing the angle **in degrees** that corresponds to the *Maximum* value. The angle is measured clock-wise from the 12 o'clock position. The default value is 120.  
{{% /command-arguments %}}

{{% warning-nontitle %}}

The absolute difference between *InitialAngle* and *LastAngle* may not exceed 360 degrees.

{{% /warning-nontitle %}}

------

{{% command %}}  
Minimum = *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: A floating-point value corresponding to the value returned by the *Subject* in use that should be linked to the *InitialAngle*. The default value is 0.  
{{% /command-arguments %}}

------

{{% command %}}  
Maximum = *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: A floating-point value corresponding to the value returned by the *Subject* in use that should be linked to the *LastAngle*. The default value is 1000.  
{{% /command-arguments %}}

------

{{% command %}}  
Step = *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: A floating-point value representing the step in which values on the solid-color square can increase. The value to be displayed via the solid-color square will be rounded down to the next integer multiple of *Value*. If *Value* is negative, values will be rounded up to the absolute value of *Value* instead. If *Value* is 0, increases will be smooth. The default value is 0.  
{{% /command-arguments %}}

------

{{% command %}}  
Layer = *LayerIndex*  
{{% /command %}}

{{% command-arguments %}}  
***LayerIndex***: An integer which uniquely defines this element among overlapping elements. Lower numbers represent the background and higher numbers the foreground. Elements may use the same *LayerIndex* as long as they do not overlap. The default value is 0.  
{{% /command-arguments %}}

## <a name="lineargauge"></a>■ 8. The LinearGauge section

The LinearGauge section creates a panel layer, which uses texture shifting to create a sliding linear gauge. You can use as many of these sections as required.

Consider a standard openBVE face:

As you can see, the horizontal texture-coordinates upon this face are 0 at the **right** and 1 at the **left**. Thus, the value given by *Minimum* represents 0 *Maximum*, represents 1, and the current value may then be calculated as a simple percentage.

Further, the direction of the texture shift may be changed from horizontal to vertical (or both) by using the **Direction** parameter.

------

{{% command %}}  
[LinearGauge]  
{{% /command %}}

This starts the section.

------

{{% command %}}  
Subject = *Subject*  
{{% /command %}}

{{% command-arguments %}}  
***Subject***: One of the [available subjects](#subjects). The default subject is **true**.  
{{% /command-arguments %}}

------

{{% command %}}  
Location = *CenterX*, *CenterY*  
{{% /command %}}

{{% command-arguments %}}  
***CenterX***: A floating-point number representing the x-coordinate at which the left of the image is inserted. The default value is 0.  
***CenterY***: A floating-point number representing the y-coordinate at which the top of the image is inserted. The default value is 0.  
{{% /command-arguments %}}

------

{{% command %}}  
Minimum = *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: A floating-point value corresponding to the value returned by the *Subject* in use. The default value is 0.  
{{% /command-arguments %}}

------

{{% command %}}  
Maximum = *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: A floating-point value corresponding to the value returned by the *Subject* in use. The default value is 1000.  
{{% /command-arguments %}}

------

{{% command %}}  
Direction = *XDirection*, *YDirection*  
{{% /command %}}

{{% command-arguments %}}  
***XDirection***: **-1:** Translates from right to left **0:** No translation is performed **1:** Translates from left to right. The default value is 0.  
***YDirection***: **-1:** Translates from top to bottom **0:** No translation is performed **1:** Translates from bottom to top. The default value is 0.  
{{% /command-arguments %}}

------

{{% command %}}  
Width = *NeedleWidth*  
{{% /command %}}

{{% command-arguments %}}  
***NeedleWidth***: An integer which defines the width in pixels of the needle, from the edge of the texture- Translation of the texture will stop when this reaches this number of pixels from the end, in order to avoid wrapping around. The default value is 0.  
{{% /command-arguments %}}

------

{{% command %}}  
Layer = *LayerIndex*  
{{% /command %}}

{{% command-arguments %}}  
***LayerIndex***: An integer which uniquely defines this element among overlapping elements. Lower numbers represent the background and higher numbers the foreground. Elements may use the same *LayerIndex* as long as they do not overlap. The default value is 0.  
{{% /command-arguments %}}

## <a name="timetable"></a>■ 9. The Timetable section

The Timetable section defines where to place custom timetables. The actual images are loaded via the route file. Only one Timetable section may be used within the file.

------

{{% command %}}  
[Timetable]  
{{% /command %}}

This starts the section.

------

{{% command %}}  
Location = *Left*, *Top*  
{{% /command %}}

{{% command-arguments %}}  
***Left***: A floating-point number representing the x-coordinate at which the left of the image is inserted. The default value is 0.  
***Top***: A floating-point number representing the y-coordinate at which the top of the image is inserted. The default value is 0.  
{{% /command-arguments %}}

------

{{% command %}}  
Width = *ValueInPixels*  
{{% /command %}}

{{% command-arguments %}}  
***ValueInPixels***: A positive floating-point number representing the width of the timetable measured in terms of the background image. ***Is required to be specified.***  
{{% /command-arguments %}}

------

{{% command %}}  
Height = *ValueInPixels*  
{{% /command %}}

{{% command-arguments %}}  
***ValueInPixels***: A positive floating-point number representing the height of the timetable measured in terms of the background image. ***Is required to be specified.***  
{{% /command-arguments %}}

------

{{% command %}}  
TransparentColor = *HexColor*  
{{% /command %}}

{{% command-arguments %}}  
***HexColor***: A [hexcolor]({{< ref "/information/numberformats/_index.md#colors" >}}) representing the exact color in both the daytime and nighttime versions of the timetable which corresponds to a transparent pixel. The default value is #0000FF.  
{{% /command-arguments %}}

------

{{% command %}}  
Layer = *LayerIndex*  
{{% /command %}}

{{% command-arguments %}}  
***LayerIndex***: An integer which uniquely defines this element among overlapping elements. Lower numbers represent the background and higher numbers the foreground. Elements may use the same *LayerIndex* as long as they do not overlap. The default value is 0.  
{{% /command-arguments %}}

## <a name="windscreen"></a>■ 10. The Windscreen section

The Windscreen section defines a set of animated raindrops / snowflakes and windscreen wipers.

------

{{% command %}}  
[Windscreen]  
{{% /command %}}

This starts the section.

------

{{% command %}}  
TopLeft = *X*, *Y*  
{{% /command %}}

{{% command-arguments %}}  
***X***: The X of the top left co-ordinate on the panel texture in which drops should appear. The default value is 0.
***Y***: The Y of the top left co-ordinate on the panel texture in which drops should appear. The default value is 0.
{{% /command-arguments %}}

------

{{% command %}}  
BottomRight = *X*, *Y*  
{{% /command %}}

{{% command-arguments %}}  
***X***: The X of the bottom right co-ordinate on the panel texture in which drops should appear. The default value is the width of the panel texture.
***X***: The Y of the bottom right co-ordinate on the panel texture in which drops should appear. The default value is height of the panel texture.
{{% /command-arguments %}}

------

{{% command %}}  
NumberOfDrops = *TotalDrops*  
{{% /command %}}

{{% command-arguments %}}  
***TotalDrops***: An integer controlling the total number of drops to be generated randomly at game start. The default value is 32.
{{% /command-arguments %}}

------

{{% command %}}  
DropSize = *Pixels*  
{{% /command %}}

{{% command-arguments %}}  
***Pixels***: An integer controlling the size of a drop on the panel image in pixels. The default value is 16.
{{% /command-arguments %}}

------

{{% command %}}  
RestPosition = *Position*  
{{% /command %}}

{{% command-arguments %}}  
***Position***: **Left or -1** : The wipers rest on the left-hand side of the windscreen. **Right or 1** : The wipers rest on the right-hand side of the windscreen. The default value is Left.
{{% /command-arguments %}}

------

{{% command %}}  
HoldPosition = *Position*  
{{% /command %}}

{{% command-arguments %}}  
***Position***: **Left or -1** : When using intermittant wiping, the wipers hold on the left-hand side of the windscreen. **Right or 1** : When using intermittant wiping, the wipers hold on the right-hand side of the windscreen. The default value is Left.
{{% /command-arguments %}}

------

{{% command %}}  
WipeSpeed = *Speed*  
{{% /command %}}

{{% command-arguments %}}  
***Speed***: The speed in seconds for one pass of the wiper from left to right. The default value is 1.
{{% /command-arguments %}}

------

{{% command %}}  
HoldTime = *Time*  
{{% /command %}}

{{% command-arguments %}}  
***Time***: The time in seconds for which the wiper is stationary at the hold position whilst using intermittant wiping. The default value is 1.
{{% /command-arguments %}}

------

{{% command %}}  
DaytimeDrops = *Drops*  
{{% /command %}}

{{% command-arguments %}}  
***Drops***: A comma-separated list of drop image files relative to the train path to be used in the day. If not specified, built-in images will be used.
{{% /command-arguments %}}

------

{{% command %}}  
NightTimeDrops = *Drops*  
{{% /command %}}

{{% command-arguments %}}  
***Drops***: A comma-separated list of drop image files relative to the train path to be used at night. If not specified, built-in images will be used.
{{% /command-arguments %}}

------

{{% command %}}  
DaytimeFlakes = *Flakes*  
{{% /command %}}

{{% command-arguments %}}  
***Drops***: A comma-separated list of snowflake image files relative to the train path to be used in the day. If not specified, built-in images will be used.
{{% /command-arguments %}}

------

{{% command %}}  
NightTimeFlakes = *Flakes*  
{{% /command %}}

{{% command-arguments %}}  
***Drops***: A comma-separated list of snowflake image files relative to the train path to be used at night. If not specified, built-in images will be used.
{{% /command-arguments %}}

------

{{% command %}}  
Layer = *LayerIndex*  
{{% /command %}}

{{% command-arguments %}}  
***LayerIndex***: An integer which uniquely defines this element among overlapping elements. Lower numbers represent the background and higher numbers the foreground. Elements may use the same *LayerIndex* as long as they do not overlap. The default value is 0.  
{{% /command-arguments %}}

## <a name="subjects"></a>■ 11. Available subjects

A subject is composed of a base subject and an optional subject suffix. The subject controls what information is fed to the element that uses the subject. For example, a *Needle* can use the subject *kmph* to be fed with the current speed of the train in kilometers per hour, or with the *mr* subject to show the main reservoir pressure.

##### ● Base subjects

{{% table %}}

| Base              | subjectDescription                                           |
| ----------------- | ------------------------------------------------------------ |
| acc               | Returns the (signed) acceleration of the train in meters per second squared (m/s2). |
| atc               | Equivalent to *ats271*.                                      |
| ats*i*            | Returns the state of the *i*<sup>th</sup> plugin variable, depending on the plugin used. This is the same as pluginState[*i*] in animated objects.<br/>For the built-in safety systems ATS and ATC, see below. |
| locobrakecylinder | Returns the pressure of the brake cylinder on the driver's car in kPa (1000 Pa). |
| bc                | Returns the pressure of the brake cylinder in kPa (1000 Pa). |
| locobrakepipe     | Returns the pressure of the brake pipe on the driver's car in kPa (1000 Pa). |
| bp                | Returns the pressure of the brake pipe in kPa (1000 Pa).     |
| brake             | Returns the currently selected brake notch.<br/>For trains with automatic air brakes, 0 represents *RELEASE*, 1 represents *LAP*, 2 represents *SERVICE* and 3 represents the emergency brake.<br/>For trains without a hold brake device, 0 represents released brakes, *i* represents brake notch *i* and *n*+1 represents the emergency brake, where *n* is the number of brake notches the train has.<br/>For trains with a hold brake device, 0 represents released brakes, 1 represents the hold brake, *i*+1 represents brake notch *i*, and *n*+2 represents the emergency brakes, where *n* is the number of brake notches the train has. |
| locobrake         | Returns the currently selected Loco Brake notch.             |
| csc               | Returns 1 if the const speed system is currently active and 0 otherwise. |
| door              | Returns a value between 0 (open doors) and 1 (closed doors). |
| doorl*i*          | Returns a value between 0 (open) and 1 (closed) for the left doors of car *i*, or 2 if the car does not exist.<br/>Car index 0 represents the first car in the train, and *n*-1 the last car, where *n* is the number of cars in the train. |
| doorr*i*          | Returns a value between 0 (open) and 1 (closed) for the right doors of car *i*, or 2 if the car does not exist.<br/>Car index 0 represents the first car in the train, and *n*-1 the last car, where *n* is the number of cars in the train. |
| doorbuttonl       | Returns 1 if the left door button is currently pressed, 0 otherwise. |
| doorbuttonr       | Returns 1 if the right door button is currently pressed, 0 otherwise. |
| er                | Returns the pressure of the equalizing reservoir in kPa (1000 Pa). |
| hour              | Returns the integer part of the current hour.                |
| kmph              | Returns the absolute speed of the train in kilometers per hour (km/h). |
| min               | Returns the integer part of the current minute.              |
| motor             | Returns the acceleration which the motor of the first motor car currently generates in m/s2. |
| mph               | Returns the absolute speed of the train in international miles per hour (mph). |
| mr                | Returns the pressure of the main reservoir in kPa (1000 Pa). |
| ms                | Returns the absolute speed of the train in meters per second (m/s). |
| power             | Returns the currently selected power notch. This is an integer between 0 and *n*, where *n* is the number of power notches the train has. |
| rev               | Returns the currently selected reverser position. 0 represents backward, 1 represents neutral and 2 represents forward. |
| sap               | Returns the pressure of the straight air pipe in kPa (1000 Pa). |
| sec               | Returns the integer part of the current second.              |
| true              | Always returns 1. This is useful for the *PilotLamp* element in order to always show the associated bitmap. |
| Klaxon            | `MusicKlaxon` |
| PrimaryKlaxon     | `passAlarm` |
| SecondaryKlaxon   | `stationAdjustAlarm` |
| MusicKlaxon       | {{% /table-2col %}} |
| passAlarm         | {{% table %}} |
| pilotLamp         | Description |
| stationAdjustAlarm | English |
| wiperPosition | The current position of the wiper blade on the panel. Ranges from 0 (left) to 100 (right) |
| wheelSlip     | Whether the train is currently experiencing wheelsip. Returns 1 if true, 0 otherwise. |
| sanders       | Whether the sanders are currently active. Returns 1 if true, 0 otherwise. |
| sandLevel     | Returns the current sand level. |


{{% /table %}}

If ats*i* is used with the built-in safety systems ATS and ATC, the following mapping for *i* applies:

{{% table %}}

| Arti  | ATS             | ATS       | 0 (unlit) or 1 (lit)                                |      | ats271 | Arti           |
| ---- | ------------------- | ------------ | -------------------------------------------- | ---- | ------ | ----------------- |
| 256  | ATS 作動                 | ATS 作動          | 55 km/h                         |      | 0      | ATC not available |
| 257  | ATS 作動             | 0 (unlit) or 1 (lit)     | 15 km/h           |      | 1      | 0 km/h            |
| 258  | ATS 作動             | 0 (unlit) or 1 (lit)     | 25 km/h |      | 2      | 15 km/h           |
| 259  | パターン接近             | 0 (unlit) or 1 (lit)       | 55 km/h                         |      | 3      | 25 km/h           |
| 260  | ブレーキ開放        | 0 (unlit) or 1 (lit) | 55 km/h                         |      | 4      | 45 km/h           |
| 261  | ブレーキ動作       | 0 (unlit) or 1 (lit) | 55 km/h                         |      | 5      | 55 km/h           |
| 262  | ATS-P         | 0 (unlit) or 1 (lit) | 55 km/h                         |      | 6      | 65 km/h           |
| 263  | 故障               | ATS-P        | 55 km/h                         |      | 7      | 75 km/h           |
| 264  | ATC             | 0 (unlit) or 1 (lit)         | 55 km/h                         |      | 8      | 90 km/h           |
| 265  | ATC 電源                 | ATC 電源          | 55 km/h                         |      | 9      | 100 km/h          |
| 266  | ATC 常用           | 0 (unlit) or 1 (lit)     | 55 km/h                         |      | 10     | 110 km/h          |
| 267  | ATC 非常             | 0 (unlit) or 1 (lit)     | 55 km/h                         |      | 11     | 120 km/h          |
| 268  | 定速             | 0 (unlit) or 1 (lit)     | 55 km/h                         |      | 12     | ATS is active     |
| 269  | 0 (unlit) or 1 (lit)         | ATC speed indicator         | 55 km/h                         |      |        |                   |
| 270  | ● Sections (signalling)                  | ● Sections (signalling)           | 55 km/h                         |      |        |                   |
| 271  | {{% table-2col %}} |              | Variable               |      |        |                   |

{{% /table %}}

##### ● Suffixes

{{% table %}}

| Subject suffix | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| d*i*           | With d0 for the ones, d1 for the tens, d2 for the hundreds, etc., this suffix returns a value between 0 and 9 corresponding to the respective digit of the underlying subject, but only if the value of the subject is less than 10 for d1, less than 100 for d2, etc., otherwise this suffix returns 10. |

{{% /table %}}

**Example:** kmphd1 can be used to feed a *DigitalNumber* with the tens of the current speed of the train in kilometers per hour. The image used by the *DigitalNumber* will thus need to be composed of images from 0 to 10 in order to show all possible states kmphd1 can return, where images 0 through 9 correspond to the digits, and 10 corresponds to an image shown at the tens when the speed is below 10 km/h (e.g. another 0-digit, or blank space).