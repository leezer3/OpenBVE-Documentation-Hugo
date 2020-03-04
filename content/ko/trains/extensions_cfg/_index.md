---
title: "The **extensions.cfg** file format"
linktitle: "The extensions.cfg file"
weight: 3
---

## ■ Contents

{{% contents %}}

- [1. Overview](#overview)
- [2. Syntax](#syntax)
- [3. The Car*i* section](#car)
- [4. The Coupler*i* section](#coupler)
- [5. The Exterior section (outdated)](#exterior)

{{% /contents %}}

## <a name="overview"></a>■ 1. Overview

The extensions.cfg file allows to define properties for individual cars, like length, axle positions and exterior objects.

The file is a plain text file encoded in any arbitrary [encoding]({{< ref "/information/encodings/_index.md" >}}), however, UTF-8 with a byte order mark is the preferred choice. The [parsing model]({{< ref "/information/numberformats/_index.md" >}}) for numbers is **Strict**. The file is required to be located inside the train folder and is expected to be named **extensions.cfg**. The file is interpreted on a per-line basis, from top to bottom.

##### ● Car indices

All cars in the extensions.cfg are enumerated from 0 (front car) to *n*-1 (rear car), where *n* is the number of cars the train has in total, according to the [train.dat]({{< ref "/trains/train_dat/_index.md" >}}) file. For example, on a train with 10 cars, the front car has index 0 and the rear car index 9.

##### ● Coupler indices

A coupler in this document refers to the space between neighboring cars. All couplers in the extensions.cfg are enumerated from 0 (front-most coupler) to *n*-2 (rear-most coupler), where *n* is the number of cars the train has in total, according to the [train.dat]({{< ref "/trains/train_dat/_index.md" >}}) file. Coupler index *i* corresponds to the coupler between the cars with indices *i* and *i+1*, so the coupler between the first two cars (0 and 1) in the train has index 0. Likewise, if a train has 10 cars, the coupler between the last two cars (8 and 9) would have index 8.

## <a name="syntax"></a>■ 2. Syntax

Each line in the file can be empty (or solely consist of white spaces) and will be ignored, can mark the beginning of a new section or contain key-value pairs inside a section. All key-value pairs relate to the last section opened.

A new section is opened by starting the line with an opening bracket (U+005B) and ending it with a closing bracket (U+005D). The text in-between the brackets indicates the name of the section and is case-insensitive. White spaces at the beginning and the end of the line are ignored, as well as at the beginning and the end of the name of the section. Thus, the beginning of the section has the following form:

{{% command %}}  
[NameOfTheSection]  
{{% /command %}}

{{% code "*Example for the indication of a new section:*" %}}  
[exterior]  
{{% /code %}}

A key-value pair is indicated by giving the key, an equals sign (U+003D) and then the value. The key is case-insensitive. White spaces at the beginning and the end of the line are ignored, as well as in front and after the equals sign. Alternatively phrased, white spaces surrounding the key and the value are ignored. Thus, a key-value pair as the following form:

{{% command %}}  
NameOfTheKey = Value  
{{% /command %}}

{{% code "*Example of a key-value pair:*" %}}  
0 = train.csv  
{{% /code %}}

You can use comments anywhere at the end of a line. A comment is started by a semicolon (U+003B). Comments, if present, are stripped away from all lines before these are processed.

## <a name="car"></a>■ 3. The Car*i* section

The Car*i* section allows to define properties specific to a certain car.

------

{{% command %}}  
**[Cari]**  
{{% /command %}}

This starts the section for car *i*, which is an integer between 0 and *n*-1, where *n* is the number of cars the train has.

------

{{% command %}}  
**Object** = *File*  
{{% /command %}}

{{% command-arguments %}}  
***file***: The relative file name of the exterior object to use for this car, relative to the train folder.  
{{% /command-arguments %}}

This key-value pair defines the exterior object for this car. Within the object file, the coordinate (0,0,0) (*x*, *y*, *z*) corresponds to the center of the car, both horizontally (*x*) and forward/backward (*z*), while *y*=0 corresponds to the top of the rails.

------

{{% command %}}  
**Length** = *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: A positive floating-point number representing the length of the car.  
{{% /command-arguments %}}

This key-value pair defines the length for this car. This overrides the length as defined in the train.dat for this particular car. If not used, this car will have the default length as defined in the train.dat.

------

{{% command %}}  
**Axles** = *Rear*, *Front*  
{{% /command %}}

{{% command-arguments %}}  
***Rear***: A floating-point number indicating the z-position of the rear axle measured from the center of the car. Usually a negative value.  
***Front***: A floating-point number indicating the z-position of the front axle measured from the center of the car. Usually a positive value.  
{{% /command-arguments %}}

This key-value pair defines the positions of the axles. While *Rear* and *Front* can take any values, the condition *Rear* < *Front* must hold.

------

{{% command %}}  
**Reversed** = *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: Either **True** or **False** to indicate whether to reverse the car.  
{{% /command-arguments %}}

With this setting, you can reverse the car in the consist. Please note that axle positions are given as if the car was not reversed.

------

{{% command %}}  
**LoadingSway** = *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: Either **True** or **False** to indicate whether to reverse the car.  
{{% /command-arguments %}}

With this setting, you can enable or disable loading sway for a specific car in the consist.

------

{{% code "*Example of a Cari section:*" %}}  
[Car0]  
Object = locomotive.b3d  
Length = 16  
Axles = -6, 6  
Reversed = False  
{{% /code %}}

## <a name="coupler"></a>■ 4. The Coupler*i* section

The Coupler*i* section allows to define properties specific to a certain coupler.

------

{{% command %}}  
**[Coupleri]**  
{{% /command %}}

This starts the section for coupler *i*, which is an integer between 0 and *n*-2, where *n* is the number of cars the train has.

------

{{% command %}}  
**Distances** = *Minimum*, *Maximum*  
{{% /command %}}

{{% command-arguments %}}  
***Minimum***: A floating-point number indicating the minimum allowed distance between the cars.  
***Maximum***: A floating-point number indicating the maximum allowed distance between the cars.  
{{% /command-arguments %}}

This key-value pair defines the lowest and highest allowed distances between the cars, resembling a buffer and chain coupler. The condition *Minimum* ≤ *Maximum* must hold.

------

{{% code "*Example of a Coupleri section:*" %}}  
[Coupler0]  
Distances = 0.30, 0.35  
{{% /code %}}

## <a name="exterior"></a>■ 5. The Exterior section (outdated)

The Exterior section provides an easy way of adding exterior objects to the particular train. For more control on the setting of axle positions and individual car lengths, the Car*i* section has been introduced and should be used instead.

------

{{% command %}}  
**[Exterior]**  
{{% /command %}}

This starts the Exterior section.

------

{{% command %}}  
**i** = *File*  
{{% /command %}}

{{% command-arguments %}}  
***i***: An integer between 0 and *n*-1, where *n* is the number of cars the train has. Index 0 corresponds to the front car and index *n*-1 to the last car in the train.  
***File***: The relative file name of the exterior object to use for car *i*, relative to the train folder.  
{{% /command-arguments %}}

This key-value pair can be used to set up the exterior objects for each individual car. Within the object file, the coordinate (0,0,0) (*x*, *y*, *z*) corresponds to the center of the car, both horizontally (*x*) and forward/backward (*z*), while *y*=0 corresponds to the top of the rails.

------

{{% code "*Example of an [Exterior] section*" %}}  
[Exterior]  
0 = cars\engine.csv  
1 = cars\passenger_mk1.b3d  
2 = cars\passenger_mk1.b3d  
3 = cars\passenger_bistro.b3d  
4 = cars\passenger_mk2.b3d  
5 = cars\postal.x  
{{% /code %}}