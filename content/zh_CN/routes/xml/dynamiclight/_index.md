---
title: "Applying Dynamic Lighting to Your Route"
linktitle: "Adding Dynamic Lighting"
weight: 1
---

This page describes the principles and implementation of the dynamic lighting system..

## ■ The Lighting System: Basic Principles

First, please consider these fundamental points:

- openBVE currently supports two distinct lights for the scene. These are the **Dynamic Light** and the **Ambient Light**.
- In addition to this, you must consider the **Cab Brightness** value, which determines the blend between the daytime and nighttime cab textures.
- The current implementation of openBVE produces incorrect illumination on the back face of faces created by *Face2* (B3D) or *AddFace2* (CSV) commands.

**NOTE:** This behavior is subject to change in future versions of openBVE, so that both sides are correctly illuminated.

In order to setup the lighting system, a custom Dynamic Lighting XML file must be used. This file must contain a time-delineated series of light definitions, a basic example of which is shown below:

{{< textarea >}}  
&lt;?xml version="1.0" encoding="utf-8"?>
&lt;openBVE xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  &lt;Brightness>
        &lt;Time>00.00&lt;/Time>
        &lt;AmbientLight>0,0,0&lt;/AmbientLight>
        &lt;DirectionalLight>0,0,0&lt;/DirectionalLight>
        &lt;LightDirection>0.223606797749979, 0.86602540378444, -0.447213595499958&lt;/LightDirection>
        &lt;CabLighting>80&lt;/CabLighting>
  &lt;/Brightness>
  &lt;Brightness>
        &lt;Time>12.00&lt;/Time>
        &lt;AmbientLight>160,160,160&lt;/AmbientLight>
        &lt;DirectionalLight>160,160,160&lt;/DirectionalLight>
        &lt;LightDirection>0.223606797749979, 0.86602540378444, -0.447213595499958&lt;/LightDirection>
        &lt;CabLighting>255&lt;/CabLighting>
  &lt;/Brightness>
&lt;/openBVE>  
{{< /textarea >}}

As you can see, each **\<Brightness>** section contains a series of parameters, defining the lighting at the point in time specified by *Time*.

When you are between two defined times, a simple cosine based interpolation curve is used.

## ■ The Ambient Light

{{% command %}}  
**\<AmbientLight>** *RedValue*; *GreenValue*; *BlueValue* **\</AmbientLight>**  
{{% /command %}}

The ambient light describes the **R,G,B** color, which is used to illuminate the whole scene.

All polygons in the scene are illuminated evenly.

## ■ The Directional Light

{{% command %}}  
**\<DirectionalLight>** *RedValue*; *GreenValue*; *BlueValue* **\</DirectionalLight>**  
{{% /command %}}

The directional light describes the **R,G,B** color, which is used to illuminate the whole scene from a specified direction.

The polygons in the scene are only fully illuminated by the directional light if the light direction points at the front faces. If pointing at back faces, no light is contributed.

The *LightDirection* attribute should be used to set the direction the light shines from.

## ■ The LightDirection Attribute

The LightDirection attribute sets the direction from which the directional light shines, by default in cartesian co-ordinates. There are three possible overloads for this as follows:

------

***LightDirection*** : Sets the light direction in cartesian co-ordinates.

{{% command %}}  
**\<LightDirection>** *DirectionX*; *DirectionY*; *DirectionZ* **\</LightDirection>**  
{{% /command %}}

------

***CartesianLightDirection*** : Sets the light direction in cartesian co-ordinates.

{{% command %}}  
**\<CartesianLightDirection>** *DirectionX*; *DirectionY*; *DirectionZ* **\</CartesianLightDirection>**  
{{% /command %}}

------

***SphericalLightDirection*** : Sets the light direction in spherical co-ordinates.

{{% command %}}  
**\<SphericalLightDirection>** *Theta*; *Phi* **\</SphericalLightDirection>**  
{{% /command %}}

## ■ The CabLighting Attribute

{{% command %}}  
**\<CabLighting>** *CabLightingValue* **\</CabLighting>**  
{{% /command %}}

The CabLighting attribute controls the maximum brightness of the cab, which in turn is used to determine the blend between the daytime and nighttime images.

This must be a number between *0* (Completely dark) and *255* (Completely light).

The minimum of this value, and the current **Track.Brightness** value is then used to determine the cab brightness displayed in-game.