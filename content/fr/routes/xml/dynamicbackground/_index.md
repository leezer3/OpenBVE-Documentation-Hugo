---
title: Dynamic and Object Based Backgrounds
weight: 2
---

This page describes the principles and implementation of the XML based background system.

## ■ Dynamic Backgrounds: Basic Principles

openBVE supports several distinct types of backgrounds:

1. The original 'texture' based background. This wraps the specified texture around the viewing frustum a specified number of times.
2. 'Dynamic' backgrounds. These are made up of a series of texture based backgrounds, and which are changed at the appropriate time.
3. 'Object' backgrounds. A static object (**.b3d , .csv or .x**) may be used instead of the standard viewing frustum.

**NOTE:** No transition effects are supported for object based backgrounds.

Each individual background which you wish to use must be setup using a background XML file an example of which is shown below:

{{< textarea >}}  
&lt;?xml version="1.0" encoding="utf-8"?>
&lt;openBVE xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  &lt;Background>
        <Time>00.00</Time>
        &lt;Mode>FadeIn&lt;/Mode>
        &lt;Repetitions>6&lt;/Repetitions>
        &lt;Texture>Cloudy.png&lt;/Texture>
  &lt;/Background>
  &lt;Background>
        <Time>10.00</Time>
        &lt;Mode>FadeIn&lt;/Mode>
        &lt;Repetitions>6&lt;/Repetitions>
        &lt;Texture>Sunny.png&lt;/Texture>
        &lt;TransitionTime>10&lt;/TransitionTime>
  &lt;/Background>
&lt;/openBVE>  
{{< /textarea>}}

As you can see, the file is made up of one or more **\<Background>** sections, each of which defines the background to be displayed at the point in time specified by *Time*.

## ■ Texture Backgrounds

A texture based background supports the following attributes:

------

{{% command %}}  
**\<Texture>** *FileName* **\</Texture>**  
{{% /command %}}

**FileName** must point to the image which you wish to display as the background texture.

------

{{% command %}}  
**\<Repetitions>** *NumberOfRepetitions* **\</Repetitions>**  
{{% /command %}}

**NumberOfRepetitions** is the number of times the texture is to be wrapped horizontally around the viewing frustum.

------

{{% command %}}  
**\<Mode>** *TransitionMode* **\</Mode>**  
{{% /command %}}

**TransitionMode** controls the transition effect to be used when this background is shown. Valid values are:

- **FadeIn** : The new background fades in.
- **FadeOut** : The old background fades out.
- **None** : No transition effect is performed. ( Negates **TransitionTime** )

------

{{% command %}}  
**\<TransitionTime>** *Time* **\</TransitionTime>**  
{{% /command %}}

**Time** is the time in seconds which the transition effect takes to complete.

## ■ Dynamic Backgrounds

A dynamic background should simply be made up of multiple **Background** elements, and takes one further attribute:

{{% command %}}  
**\<Time>** *GameTime* **\</Time>**  
{{% /command %}}

**GameTime** is the 24-hour based time at which the transition to this background will begin.

## ■ Object Backgrounds

An object based background may also be used. With these, the specified object is rendered with it's **0,0,0** co-ordinate centered upon the camera center.

Only **.b3d , .csv and .x** files with no animation are supported. No transition effects or other attributes are supported.

A sample XML is shown below:

{{< textarea >}}  
&lt;?xml version="1.0" encoding="utf-8"?>
&lt;openBVE xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  &lt;Background>
        &lt;Object>Background.csv&lt;/Object>
  &lt;/Background>
&lt;/openBVE>  
{{< /textarea >}}