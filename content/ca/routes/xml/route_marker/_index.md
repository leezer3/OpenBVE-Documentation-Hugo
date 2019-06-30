---
title: Creating XML Based Markers
linktitle: Scripted Markers
weight: 3
---

This page describes the principles and implementation of the XML based marker system.

## ■ Markers: Basic Principles

openBVE supports two distinct types of markers:

1. 'Texture' based markers. This displays an image in the top right-hand corner of the screen.
2. 'Text' based markers. These add a textual message above the list of game messages in the upper left of the screen.

Each individual marker should be setup using a custom XML file, as per the examples below.

**Image Based Markers:**

{{< textarea >}}  
&lt;?xml version="1.0" encoding="utf-8"?>
&lt;openBVE xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  &lt;ImageMarker>
                &lt;Early>
            &lt;Time>12:00&lt;/Time>
            &lt;Image>Early.png&lt;/Image>
        &lt;/Early>
        &lt;OnTime>
            &lt;Image>Marker.png&lt;/Image>
        &lt;/OnTime>
        &lt;Late>
            &lt;Time>12:10&lt;/Time>
            &lt;Image>Late.png&lt;/Image>
        &lt;/Late>
        &lt;Distance>200&lt;/Distance>
        &lt;trains>81xx_2DCab&lt;/trains>
  &lt;/ImageMarker>
&lt;/openBVE>  
{{< /textarea >}}

**Text Based Markers:**

{{< textarea >}}  
&lt;?xml version="1.0" encoding="utf-8"?>
&lt;openBVE xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  &lt;TextMarker>
                &lt;Early>
            &lt;Time>12:00&lt;/Time>
            &lt;Text>Early!&lt;/Text>
        &lt;/Early>
        &lt;OnTime>
            &lt;Text>On Time.&lt;/Text>
        &lt;/OnTime>
        &lt;Late>
            &lt;Time>12:10&lt;/Time>
            &lt;Text>Late...&lt;/Text>
        &lt;/Late>
        &lt;Distance>200&lt;/Distance>
        &lt;trains>81xx_2DCab&lt;/trains>
  &lt;/TextMarker>
&lt;/openBVE>  
{{< /textarea >}}

As you can see, the file is made up of either a **\<ImageMarker>** section or a **\<TextMarker>** section, which defines the properties of the marker itself.

If required, the base marker and / or the early & late markers may be omitted.

## ■ Common Attributes

The following attributes are supported by both image and text markers:

------

{{% command %}}  
**\<Early>** *....* **\</Early>**  
{{% /command %}}

Defines the marker used when the player is early.

This must contain a **time** and either an **image** or a **textual string** (See below).

------

{{% command %}}  
**\<OnTime>** *....* **\</OnTime>**  
{{% /command %}}

Defines the marker used when the player is early.

This must contain an **image** or a **textual string** (See below).

------

{{% command %}}  
**\<Late>** *....* **\</Late>**  
{{% /command %}}

Defines the marker used when the player is late.

This must contain a **time** and either an **image** or a **textual string** (See below).

------

{{% command %}}  
**\<Distance>** *MarkerLength* **\</Distance>**  
{{% /command %}}

Defines the distance for which this marker will show.

**MarkerLength** represents the distance in meters for which to show the marker. Positive values will be displayed FROM where this marker is placed in the routefile. Negative values will be displayed BEFORE where this marker is placed in the routefile.

------

{{% command %}}  
**\<Timeout>** *TotalTime* **\</Timeout>**  
{{% /command %}}

Defines the total time for which this marker will show.

**TotalTime** represents the maximum time in milliseconds for which this marker will be visible *Note:* This overrides **Distance** if it has not been reached.

------

{{% command %}}  
**\<Trains>** *TrainList* **\</Trains>**  
{{% /command %}}

Defines the list of trains for which this marker will show.

**TrainList** must contain a semi-colon deliminated list of trains for which you wish to display this marker.

## ■ Textual Marker Attributes

{{% command %}}  
**\<Text>** *DisplayText* **\</Text>**  
{{% /command %}}

**DisplayText** is the text which will be displayed on-screen.

------

{{% command %}}  
**\<Color>** *TextColor* **\</Color>**  
{{% /command %}}

**TextColor** controls the color in which the message is renderered. The following colors are supported:

- Black (Negre)
- Gray (Gris)
- White (Blanc)
- Red (Vermell)
- Orange (Taronja)
- Green (Verd)
- Blue (Blau)
- Magenta (Magenta)

## ■ Image Marker Attributes

{{% command %}}  
**\<Image>** *RelativePath* **\</Image>**  
{{% /command %}}

**RelativePath** is the relative on-disk path to the marker image.