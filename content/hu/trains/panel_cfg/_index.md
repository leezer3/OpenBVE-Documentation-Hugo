---
title: "The **panel.cfg** file format"
linktitle: "The panel.cfg file"
weight: 4
---

## ■ Contents

{{% contents %}}

- [1. Overview](#overview)
- [2. Syntax](#syntax)
- [3. The Panel section](#panel)
- [4. The View section](#view)
- [5. The PressureIndicator section](#pressureindicator)
- [6. The SpeedIndicator section](#speedindicator)
- [7. The DigitalIndicator section](#digitalindicator)
- [8. The PilotLamp section](#pilotlamp)
- [9. The Watch section](#watch)
- [10. The BrakeIndicator section](#brakeindicator)

{{% /contents %}}

## <a name="overview"></a>■ 1. Overview

The panel.cfg file allows to create 2D panels by defining which elements to use, like speedometers, pressure gauges etc., and where they are to be placed.

The panel.cfg file is a plain text file encoded in any arbitrary [encoding]({{< ref "/information/encodings/_index.md" >}}), however, UTF-8 with a byte order mark is the preferred choice. The [parsing model]({{< ref "/information/numberformats/_index.md" >}}) for numbers is **Loose**, however, you are encouraged to produce *Strict* output nonetheless. The file is required to be located inside the train folder and is expected to be named **panel.cfg**. The file is interpreted on a per-line basis, from top to bottom.

{{% notice %}}

#### The panel.cfg is outdated

The panel.cfg has been superseded by the panel2.cfg. You can achieve the full functionality of the panel.cfg and more by using the panel2.cfg instead. If both files are present in the train folder, the panel2.cfg has precedence over the panel.cfg.

{{% /notice %}}

➟ [See also the quick reference for the panel.cfg...]({{< ref "/trains/panel_cfg_quick/_index.md" >}})

{{% notice %}}

#### Overlay and Lighting

The cab is rendered as an overlay. This means that the cab will always appear in front of scenery objects. This is intentional, because this way, rain, walls and other obstructing objects cannot be accidentally rendered inside the cab. Furthermore, lighting in the cab is different than in the scenery. While the ambient brightness is reflected in the cab, the ambient color is not, and the cab always appears as if reflecting white light.

{{% /notice %}}

## <a name="syntax"></a>■ 2. Syntax

Each line in the file can be empty (or solely consist of white spaces) and will be ignored, can mark the beginning of a new section or contain key-value pairs inside a section. All key-value pairs relate to the last section opened.

A new section is opened by starting the line with an opening bracket (U+005B) and ending it with a closing bracket (U+005D). The text in-between the brackets indicates the name of the section and is case-insensitive. White spaces at the beginning and the end of the line are ignored, as well as at the beginning and the end of the name of the section. Thus, the beginning of the section has the following form:

{{% command %}}  
[NameOfTheSection]  
{{% /command %}}

A key-value pair is indicated by giving the key, an equals sign (U+003D) and then the value. The key is case-insensitive. White spaces at the beginning and the end of the line are ignored, as well as in front and after the equals sign. Alternatively, white spaces surrounding the key and the value are ignored. Thus, a key-value pair as the following form:

{{% command %}}  
NameOfTheKey = Value  
{{% /command %}}

Some values are further split into multiple parts, separated by commas (U+002C). Instead of a comma, a colon (U+003A) can be used interchangeably.

You can use comments anywhere at the end of a line. A comment is started by a semicolon (U+003B). Comments, if present, are stripped away from all lines before these are processed.

## <a name="panel"></a>■ 3. The Panel section

The Panel section defines which background image to use. Only one Panel section is expected in a panel.cfg file.

------

{{% command %}}  
[Panel]  
{{% /command %}}

This starts the section.

------

{{% command %}}  
Background = *FileName*  
{{% /command %}}

{{% command-arguments %}}  
***FileName***: The image file to use as the panel background image.  
{{% /command-arguments %}}

Defines which background image to use. *File* is relative to the train folder. The image is aligned at the bottom-left of the screen, where a width of 480 corresponds to the right edge of the screen. You cannot meaningfully use images of larger width with the panel.cfg. Consider using the panel2.cfg if you want to employ images of any size. If this key-value pair is not used, the background image file is implicitly assumed to be called *Panel.bmp*. Pure blue in the image (red=0, green=0, blue=255) represents transparent pixels.

## <a name="view"></a>■ 4. The View section

The View section defines the viewing angle conditions. Only one View section is expected in a panel.cfg file.

------

{{% command %}}  
[View]  
{{% /command %}}

This starts the section.

------

{{% command %}}  
Yaw = *ValueInDegrees*  
{{% /command %}}

{{% command-arguments %}}  
***ValueInDegrees***: A floating-point number measured in **degrees** indicating the yaw. Positive values represent right, negative ones left. The default value is 0.  
{{% /command-arguments %}}

{{% command %}}  
Pitch = *ValueInDegrees*  
{{% /command %}}

{{% command-arguments %}}  
***ValueInDegrees***: A floating-point number measured in **degrees** indicating the pitch. Positive values represent up, negative ones down. The default value is 0.  
{{% /command-arguments %}}

Defines the pitch of the view. Any value entered will be additionally subtract by 11 degrees, resulting in a slight downward pitch if *ValueInDegrees* is 0. If this key-value pair is not used, the final viewing angle will be -11 degrees.

## <a name="pressureindicator"></a>■ 5. The PressureIndicator section

This section creates a pressure indicator. You can use as many of these sections as required.

------

{{% command %}}  
[PressureIndicator]  
{{% /command %}}

This starts the section.

{{% note-withtitle %}}

#### *The following spelling variations can be used:*

PressureIndicator, PressureGauge, PressureMeter, 圧力計

{{% /note-withtitle %}}

------

{{% command %}}  
Type = *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: The type of pressure indicator to use. The default value is 0.  
{{% /command-arguments %}}

▸ Options for *Value*:

{{% command-arguments %}}  
**0**: The pressure indicator is a gauge.  
**1**: The pressure indicator is an LED.  
{{% /command-arguments %}}

![illustration_pressuregauge](/images/illustration_pressuregauge.png)![illustration_pressuregauge_led](/images/illustration_pressuregauge_led.png)

This defines the type of the pressure indicator. While both the gauge type and the LED type indicators can show two different pressures, this is not generally useful for the LED type as the upper LED shape will block the view into the lower LED shape.

{{% note-withtitle %}}

#### *The following spelling variations can be used:*

Type, 形態

{{% /note-withtitle %}}

------

{{% command %}}  
LowerNeedle = *Subject*, *RedValue*, *GreenValue*, *BlueValue*  
{{% /command %}}

{{% command-arguments %}}  
***Subject***: The kind of pressure to indicate.  
***RedValue***: The red component of the color. Measured from 0 (black) to 255 (red). The default value is 0.  
***GreenValue***: The green component of the color. Measured from 0 (black) to 255 (green). The default value is 0.  
***BlueValue***: The blue component of the color. Measured from 0 (black) to 255 (blue). The default value is 0.  
{{% /command-arguments %}}

▸ Options for *Subject*:

{{% command-arguments %}}  
**0**: Does not show the lower needle.  
**1** or **BC** or **ブレーキシリンダ**: Indicates the pressure of the brake cylinder.  
**2** or **BP** or **ブレーキ管** or **制動管**: Indicates the pressure of the brake pipe.  
**3** or **ER** or **釣り合い空気溜め** or **釣り合い空気ダメ** or **つりあい空気溜め** or **ツリアイ空気ダメ**: Indicates the pressure of the equalizing reservoir.  
**4** or **MR** or **元空気溜め** or **元空気ダメ**: Indicates the pressure of the main reservoir.  
**5** or **SAP** or **直通管**: Indicates the pressure of the straight air pipe.  
{{% /command-arguments %}}

Creates the lower needle for a gauge-type pressure indicator, or defines the color of the lower shape for an LED-type indicator.

{{% note-withtitle %}}

#### *The following spelling variations can be used:* 

LowerNeedle, LowerHand, 下針

{{% /note-withtitle %}}

------

{{% command %}}  
UpperNeedle = *Subject*, *RedValue*, *GreenValue*, *BlueValue*  
{{% /command %}}

{{% command-arguments %}}  
***Subject***: The kind of pressure to indicate.  
***RedValue***: The red component of the color. Measured from 0 (black) to 255 (red). The default value is 0.  
***GreenValue***: The green component of the color. Measured from 0 (black) to 255 (green). The default value is 0.  
***BlueValue***: The blue component of the color. Measured from 0 (black) to 255 (blue). The default value is 0.  
{{% /command-arguments %}}

▸ Options for *Subject*:

{{% command-arguments %}}  
**0**: Does not show the upper needle.  
**1** or **BC** or **ブレーキシリンダ**: Indicates the pressure of the brake cylinder.  
**2** or **BP** or **ブレーキ管** or **制動管**: Indicates the pressure of the brake pipe.  
**3** or **ER** or **釣り合い空気溜め** or **釣り合い空気ダメ** or **つりあい空気溜め** or **ツリアイ空気ダメ**: Indicates the pressure of the equalizing reservoir.  
**4** or **MR** or **元空気溜め** or **元空気ダメ**: Indicates the pressure of the main reservoir.  
**5** or **SAP** or **直通管**: Indicates the pressure of the straight air pipe.  
{{% /command-arguments %}}

Creates the upper needle for a gauge-type pressure indicator, or defines the color of the upper shape for an LED-type indicator.

{{% note-withtitle %}}

#### *The following spelling variations can be used:* 

UpperNeedle, UpperHand, 上針

{{% /note-withtitle %}}

------

{{% command %}}  
Center = *X*, *Y*  
{{% /command %}}

{{% command-arguments %}}  
***X***: The X-coordinate in the panel image at which the center of the pressure indicator is placed **in pixels**. The default value is 0.  
***Y***: The Y-coordinate in the panel image at which the center of the pressure indicator is placed **in pixels**. The default value is 0.  
{{% /command-arguments %}}

{{% note-withtitle %}}

#### *The following spelling variations can be used:* 

Center, 中心

{{% /note-withtitle %}}

------

{{% command %}}  
Radius = *ValueInPixels*  
{{% /command %}}

{{% command-arguments %}}  
***ValueInPixels***: The radius of the pressure indicator **in pixels**. The default value is 16.  
{{% /command-arguments %}}

For gauge-type indicators, defines the radius of the pressure gauge needle in pixels. For LED-type indicators, defines half the edge length of the LED-square in pixels. The radius is measured in pixels of the panel image.

{{% note-withtitle %}}

#### *The following spelling variations can be used:* 

Radius, 半径

{{% /note-withtitle %}}

------

{{% command %}}  
Background = *FileName*  
{{% /command %}}

{{% command-arguments %}}  
***FileName***: The background image to use, relative to the train folder.  
{{% /command-arguments %}}

Creates a background for the pressure indicator. The background is shown below the needles or the LED-square. Pure blue in the image (red=0, green=0, blue=255) represents transparent pixels.

{{% note-withtitle %}}

#### *The following spelling variations can be used:* 

Background, 背景

{{% /note-withtitle %}}

------

{{% command %}}  
Cover = *FileName*  
{{% /command %}}

{{% command-arguments %}}  
***FileName***: The cover image to use, relative to the train folder.  
{{% /command-arguments %}}

Creates a cover for the pressure indicator. The cover is shown on top of the needles or the LED-square. Pure blue in the image (red=0, green=0, blue=255) represents transparent pixels.

{{% note-withtitle %}}

#### *The following spelling variations can be used:* 

Cover, ふた

{{% /note-withtitle %}}

------

{{% command %}}  
Unit = *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: The type of unit to use for the *Minimum* and *Maximum* settings. The default value is 0.  
{{% /command-arguments %}}

▸ Options for *Value*:

{{% command-arguments %}}  
**0** or **kpa**: The unit is kilo-pascal (1000 Pa).  
**1** or **kgf/cm2** or **kgf/cm^2** or **kg/cm2** or **kg/cm^2**: The unit is kilogram-force per centimeter squared (98066.5 Pa).  
{{% /command-arguments %}}

{{% note-withtitle %}}

#### *The following spelling variations can be used:*

Unit, 単位

{{% /note-withtitle %}}

------

{{% command %}}  
Minimum = *PressureValue*  
{{% /command %}}

{{% command-arguments %}}  
***PressureValue***: The minimum pressure corresponding to *Angle*. The unit is defined via *Unit*.  
{{% /command-arguments %}}

Defines the minimum pressure corresponding to the *Angle* measured clockwise from the 6 o'clock position. The default value is 0.

{{% note-withtitle %}}

#### *The following spelling variations can be used:* 

Minimum, 最小

{{% /note-withtitle %}}

------

{{% command %}}  
Maximum = *PressureValue*  
{{% /command %}}

{{% command-arguments %}}  
***PressureValue***: The maximum pressure corresponding to *Angle*. The unit is defined via *Unit*.  
{{% /command-arguments %}}

Defines the maximum pressure corresponding to the *Angle* measured counter-clockwise from the 6 o'clock position. The default value is 1000.

{{% note-withtitle %}}

#### *The following spelling variations can be used:* 

Maximum, 最大

{{% /note-withtitle %}}

------

{{% command %}}  
Angle = *ValueInDegrees*  
{{% /command %}}

{{% command-arguments %}}  
***ValueInDegrees***: The angle corresponding to the *Minimum* and *Maximum* pressures in **degrees**.  
{{% /command-arguments %}}

Defines the angle, measured clockwise from the 6 o'clock position, corresponding to the *Minimum* pressure, and also the angle, measured counter-clockwise from the 6 o'clock position, corresponding to the *Maximum* pressure. The default value is 45.

{{% note-withtitle %}}

#### *The following spelling variations can be used:*

Angle, 角度

{{% /note-withtitle %}}

## <a name="speedindicator"></a>■ 6. The SpeedIndicator section

This section creates an analog speed indicator. You can use as many of these sections as required.

------

{{% command %}}  
[SpeedIndicator]  
{{% /command %}}

This starts the section.

{{% note-withtitle %}}

#### *The following spelling variations can be used:* 

SpeedIndicator, Speedometer, 速度計

{{% /note-withtitle %}}

------

{{% command %}}  
Type = *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: The type of pressure indicator to use. The default value is 0.  
{{% /command-arguments %}}

▸ Options for *Value*:

{{% command-arguments %}}  
**0**: The pressure indicator is a gauge.  
**1**: The pressure indicator is an LED.  
{{% /command-arguments %}}

![illustration_speedometer](/images/illustration_speedometer.png)![illustration_speedometer_led](/images/illustration_speedometer_led.png)

{{% note-withtitle %}}

#### *The following spelling variations can be used:* 

Type, 形態

{{% /note-withtitle %}}

------

{{% command %}}  
Needle = *RedValue*, *GreenValue*, *BlueValue*  
{{% /command %}}

{{% command-arguments %}}  
***RedValue***: The red component of the color. Measured from 0 (black) to 255 (red). The default value is 255.  
***GreenValue***: The green component of the color. Measured from 0 (black) to 255 (green). The default value is 255.  
***BlueValue***: The blue component of the color. Measured from 0 (black) to 255 (blue). The default value is 255.  
{{% /command-arguments %}}

Defines the color for the needle (gauges) or for the overlay (LEDs).

{{% note-withtitle %}}

#### *The following spelling variations can be used:* 

Needle, Hand, 針

{{% /note-withtitle %}}

------

{{% command %}}  
Center = *X*, *Y*  
{{% /command %}}

{{% command-arguments %}}  
***X***: The X-coordinate in the panel image at which the center of the speed indicator is placed **in pixels**. The default value is 0.  
***Y***: The Y-coordinate in the panel image at which the center of the speed indicator is placed **in pixels**. The default value is 0.  
{{% /command-arguments %}}

{{% note-withtitle %}}

#### *The following spelling variations can be used:* 

Center, 中心

{{% /note-withtitle %}}

------

{{% command %}}  
Radius = *ValueInPixels*  
{{% /command %}}

{{% command-arguments %}}  
***ValueInPixels***: The radius of the pressure indicator **in pixels**. The default value is 16.  
{{% /command-arguments %}}

For gauge-type indicators, defines the radius of the pressure gauge needle in pixels. For LED-type indicators, defines half the edge length of the LED-square in pixels. The radius is measured in pixels of the panel image.

{{% note-withtitle %}}

#### *The following spelling variations can be used:* 

Radius, 半径

{{% /note-withtitle %}}

------

{{% command %}}  
Background = *FileName*  
{{% /command %}}

{{% command-arguments %}}  
***FileName***: The background image to use, relative to the train folder.  
{{% /command-arguments %}}

Creates a background for the pressure indicator. The background is shown below the needles or the LED-square. Pure blue in the image (red=0, green=0, blue=255) represents transparent pixels.

{{% note-withtitle %}}

#### *The following spelling variations can be used:* 

Background, 背景

{{% /note-withtitle %}}

------

{{% command %}}  
Cover = *FileName*  
{{% /command %}}

{{% command-arguments %}}  
***FileName***: The cover image to use, relative to the train folder.  
{{% /command-arguments %}}

Creates a cover for the pressure indicator. The cover is shown on top of the needles or the LED-square. Pure blue in the image (red=0, green=0, blue=255) represents transparent pixels.

{{% note-withtitle %}}

#### *The following spelling variations can be used:*

Cover, ふた

{{% /note-withtitle %}}

------

{{% command %}}  
Maximum = *SpeedValue*  
{{% /command %}}

{{% command-arguments %}}  
***SpeedValue***: The maximum speed corresponding to *Angle*. The unit is **kilometers per hour** (km/h).  
{{% /command-arguments %}}

Defines the maximum speed corresponding to the Angle measured counter-clockwise from the 6 o'clock position. The default value is 120.

{{% note-withtitle %}}

#### *The following spelling variations can be used:* 

Maximum, 最大

{{% /note-withtitle %}}

------

{{% command %}}  
Angle = *SpeedValue*  
{{% /command %}}

{{% command-arguments %}}  
***SpeedValue***: The angle corresponding to the *Maximum* speed in **degrees**.  
{{% /command-arguments %}}

Defines the angle, measured counter-clockwise from the 6 o'clock position, corresponding to the Maximum speed. The default value is 60.

{{% note-withtitle %}}

#### *The following spelling variations can be used:* 

Angle, 角度

{{% /note-withtitle %}}

------

{{% command %}}  
Atc = *FileName*  
{{% /command %}}

{{% command-arguments %}}  
***FileName***: The image file to extract ATC indicator lamps from, relative to the train folder.  
{{% /command-arguments %}}

Creates ATC indicators. The bitmap is required to have 13 square elements stacked horizontally, anchored at the right of the bitmap. The height of the bitmap defines the size of one square element. From left to right, the elements represent:

![illustration_atc](/images/illustration_atc.png)

- *1<sup>st</sup>*: ATC not currently available
- *2<sup>nd</sup>*: 0 km/h speed restriction
- *3<sup>rd</sup>*: 15 km/h speed restriction
- *4<sup>th</sup>*: 25 km/h speed restriction
- *5<sup>th</sup>*: 45 km/h speed restriction
- *6<sup>th</sup>*: 55 km/h speed restriction
- *7<sup>th</sup>*: 65 km/h speed restriction
- *8<sup>th</sup>*: 75 km/h speed restriction
- *9<sup>th</sup>*: 90 km/h speed restriction
- *10<sup>th</sup>*: 100 km/h speed restriction
- *11<sup>th</sup>*: 110 km/h speed restriction
- *12<sup>th</sup>*: 120 km/h speed restriction
- *13<sup>th</sup>*: ATS currently active

The center of any of the indicators is placed on a circle defined by *Center* as the center of the circle and *AtsRadius* as the radius of the circle. The angle at which an element is placed on that circle corresponds to the respective speed, or to the 6 o'clock position for the *ATC not currently available* and *ATS currently active* indicators. Only the one currently representative indicator is shown. Pure blue in the image (red=0, green=0, blue=255) represents transparent pixels.

------

{{% command %}}  
AtcRadius = *ValueInPixels*  
{{% /command %}}

{{% command-arguments %}}  
***ValueInPixels***: The radius **in pixels** at which ATC indicators are placed around the speed indicator. The default value is 0.  
{{% /command-arguments %}}

{{% note-withtitle %}}

#### *The following spelling variations can be used:* 

AtcRadius, Atc半径

{{% /note-withtitle %}}

## <a name="digitalindicator"></a>■ 7. The DigitalIndicator section

This section creates a digital speed indicator. You can use as many of these sections as required.

------

{{% command %}}  
[DigitalIndicator]  
{{% /command %}}

This starts the section.

------

{{% command %}}  
Number = *FileName*  
{{% /command %}}

{{% command-arguments %}}  
***FileName***: The image file to extract digits from, relative to the train folder. Is required to be specified.  
{{% /command-arguments %}}

Creates a three-digit decimal speed display in kilometers per hour (km/h). The bitmap is required to have 11 elements stacked vertically, anchored at the top-right of the bitmap. From top to bottom, the 1<sup>st</sup> through 10<sup>th</sup> elements represent the digits 0 through 9, while the 11<sup>th</sup> element represents a missing digit that is shown in the 10s when the speed is below 10 km/h, and in the 100s when the speed is below 100 km/h. Pure blue in the image (red=0, green=0, blue=255) represents transparent pixels.

------

{{% command %}}  
Corner = *Left*, *Top*  
{{% /command %}}

{{% command-arguments %}}  
***Left***: The X-coordinate in the panel image at which the left of the speed indicator is placed **in pixels**. The default value is 0.  
***Top***: The Y-coordinate in the panel image at which the top of the speed indicator is placed **in pixels**. The default value is 0.  
{{% /command-arguments %}}

------

{{% command %}}  
Size = *Width*, *Height*  
{{% /command %}}

{{% command-arguments %}}  
***Width***: The width of a single digit inside the bitmap **in pixels**.  
***Height***: The height of a single digit inside the bitmap **in pixels**.  
{{% /command-arguments %}}

Defines the size of a single digit. Is required to be specified.

------

{{% command %}}  
Unit = *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: The type of unit to use for the display. The default value is 0.  
{{% /command-arguments %}}

▸ Options for *Value*:

{{% command-arguments %}}  
**0** or **km/h**: The unit is kilometers per hour.  
**1** or **mph**: The unit is international miles per hour.  
**2** or **m/s**: The unit is meters per second.  
{{% /command-arguments %}}

## <a name="pilotlamp"></a>■ 8. The PilotLamp section

This section creates a door indicator. You can use as many of these sections as required.

------

{{% command %}}  
[PilotLamp]  
{{% /command %}}

This starts the section.

{{% note-withtitle %}}

#### *The following spelling variations can be used:* 

PilotLamp, 知らせ灯

{{% /note-withtitle %}}

------

{{% command %}}  
TurnOn = *FileName*  
{{% /command %}}

{{% command-arguments %}}  
***FileName***: The image file shown when the doors are fully closed.  
{{% /command-arguments %}}

{{% note-withtitle %}}

#### *The following spelling variations can be used:* 

TurnOn, 点灯

{{% /note-withtitle %}}

------

{{% command %}}  
TurnOff = *FileName*  
{{% /command %}}

{{% command-arguments %}}  
***FileName***: The image file shown when the doors are not fully closed.  
{{% /command-arguments %}}

{{% note-withtitle %}}

#### *The following spelling variations can be used:* 

TurnOff, 消灯

{{% /note-withtitle %}}

------

{{% command %}}  
Corner = *Left*, *Top*  
{{% /command %}}

{{% command-arguments %}}  
***Left***: The X-coordinate in the panel image **in pixels** at which the left of the pilot lamp is placed. The default value is 0.  
***Top***: The Y-coordinate in the panel image **in pixels** at which the top of the pilot lamp is placed. The default value is 0.  
{{% /command-arguments %}}

{{% note-withtitle %}}

#### *The following spelling variations can be used:* 

Corner, 左上

{{% /note-withtitle %}}

## <a name="watch"></a>■ 9. The Watch section

This section creates a watch consisting of needles for hour, minute and second. You can use as many of these sections as required.

------

{{% command %}}  
[Watch]  
{{% /command %}}

This starts the section.

{{% note-withtitle %}}

#### *The following spelling variations can be used:* 

Watch, 時計

{{% /note-withtitle %}}

------

{{% command %}}  
Background = *FileName*  
{{% /command %}}

{{% command-arguments %}}  
***FileName***: The background image to use, relative to the train folder.  
{{% /command-arguments %}}

Creates a background for the watch. The background is shown below the watch needles. Pure blue in the image (red=0, green=0, blue=255) represents transparent pixels.

{{% note-withtitle %}}

#### *The following spelling variations can be used:* 

Background, 背景

{{% /note-withtitle %}}

------

{{% command %}}  
Center = *X*, *Y*  
{{% /command %}}

{{% command-arguments %}}  
***X***: The X-coordinate in the panel image at which the center of the watch is placed **in pixels**. The default value is 0.  
***Y***: The Y-coordinate in the panel image at which the center of the watch is placed **in pixels**. The default value is 0.  
{{% /command-arguments %}}

{{% note-withtitle %}}

#### *The following spelling variations can be used:* 

Center, 中心

{{% /note-withtitle %}}

------

{{% command %}}  
Radius = *ValueInPixels*  
{{% /command %}}

{{% command-arguments %}}  
***ValueInPixels***: The radius of the watch needles **in pixels**. The default value is 16.  
{{% /command-arguments %}}

{{% note-withtitle %}}

#### *The following spelling variations can be used:* 

Radius, 半径

{{% /note-withtitle %}}

------

{{% command %}}  
Needle = *RedValue*, *GreenValue*, *BlueValue*  
{{% /command %}}

{{% command-arguments %}}  
***RedValue***: The red component of the color. Measured from 0 (black) to 255 (red). The default value is 255.  
***GreenValue***: The green component of the color. Measured from 0 (black) to 255 (green). The default value is 255.  
***BlueValue***: The blue component of the color. Measured from 0 (black) to 255 (blue). The default value is 255.  
{{% /command-arguments %}}

Defines the color for all of the three needles (second, minute and hour).

{{% note-withtitle %}}

#### *The following spelling variations can be used:* 

Needle, Hand, 針

{{% /note-withtitle %}}

## <a name="brakeindicator"></a>■ 10. The BrakeIndicator section

This section creates an indicator depicting the state of the power and brake handles. You can use as many of these sections as required.

------

{{% command %}}  
[BrakeIndicator]  
{{% /command %}}

This starts the section.

------

{{% command %}}  
Image = *FileName*  
{{% /command %}}

{{% command-arguments %}}  
***FileName***: The image to use, relative to the train folder. Is required to be specified.  
{{% /command-arguments %}}

Creates an indicator depicting the state of the power and brake handles. The bitmap is required to have a certain number of elements (depending on the train characteristics) stacked horizontally, anchored at the left of the bitmap. The height of the bitmap is equivalent to the height of an element. Pure blue in the image (red=0, green=0, blue=255) represents transparent pixels. The meaning of the elements depends on the type of brake systems used:

*For air brakes, from left to right:*

- Power notch *n*
- Power notch *n*-1
- ...
- Power notch *2*
- Power notch *1*
- Release (REL)
- Lap (LAP)
- Service (SRV)
- Emergency brake (EMG)

*For notched brakes without the hold brake device, from left to right:*

- Power notch *n*
- Power notch *n*-1
- ...
- Power notch 2
- Power notch 1
- Neutral
- Brake notch 1
- Brake notch 2
- ...
- Brake notch *m*-1
- Brake notch *m*
- Emergency brake

*For notched brakes with the hold brake device, from left to right:*

- Power notch *n*
- Power notch *n*
- Power notch *n*-1
- ...
- Power notch 2
- Power notch 1
- Neutral
- Hold brake
- Brake notch 1
- Brake notch 2
- ...
- Brake notch *m*-1
- Brake notch *m*
- Emergency brake

------

{{% command %}}  
Corner = *Left*, *Top*  
{{% /command %}}

{{% command-arguments %}}  
***Left***: The X-coordinate in the panel image at which the left of the indicator is placed **in pixels**. The default value is 0.  
***Top***: The Y-coordinate in the panel image at which the top of the indicator is placed **in pixels**. The default value is 0.  
{{% /command-arguments %}}

------

{{% command %}}  
Width = *ValueInPixels*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: The width of a single element inside the bitmap **in pixels**. Is required to be specified.  
{{% /command-arguments %}}