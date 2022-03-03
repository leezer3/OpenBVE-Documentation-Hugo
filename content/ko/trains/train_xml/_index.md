---
title: "The **train.xml** file format"
linktitle: "The train.xml file"
weight: 2
---

**NOTE:**

This page is still under construction.

{{% contents %}}

- [1. Overview](#overview)
- [2. The Train section](#train)
- [3. The Car section](#car)
- [4. The Coupler section](#coupler)

{{% /contents %}}

## <a name="overview"></a>■ 1. 개요

The **train.xml** format is the native format for newer versions of OpenBVE, and is intended to replace the older train.dat format. It allows setting of many more properties, and is extensible.

It may either be constructed as a single file containing the properties of the entire train, or as a single consist definition, along with child car files.

## <a name="train"></a>■ 2. The Train section

Whether using child car files, or a single file, the first node in each **train.xml** file must be the **<Train>** node.

This supports the following properties:

{{% command %}}  
**\<Car>** *CarProperties* **\</Car>**  
{{% /command %}}

This defines a car within the train.

**CarProperties** may either be a set of child nodes (if using the single file format) or a relative on-disk path to a child car file.

{{% command %}}  
**\<NotchDescriptions>** *Notch* **\</NotchDescriptions>**  
{{% /command %}}

This overrides the in-game UI notch descriptions displayed.

**Notch** may be one or more child-nodes, with one of the following subjects: *Power, Brake, LocoBrake* or *Reverser*

A child-node must be of the following format:

{{% command %}}  
**\<Subject>** *Descriptions* **\</Subject>**  
{{% /command %}}

**Descriptions** should be a comma-separated list, equal to the number of notches the train has for the subject.

## <a name="car"></a>■ 3. The Car section

{{% note %}}

When using child car files, the **<Car>** node should be the first node in the file. All other details remain the same.

{{% /note %}}

The **<Car>** node contains the properties for each induvidual train car.

This supports the following properties:

{{% command %}}  
**\<CameraRestriction>** *Restrictions* **\</CameraRestriction>**  
{{% /command %}}

This sets any camera restrictions within the cab (Generally used for 3D cabs).

**Restrictions** may be one or more child-nodes, with one of the following subjects: *Backwards, Forwards, Left, Right, Down* or *Up*

A child-node must be of the following format:

{{% command %}}  
**\<Subject>** *Distance* **\</Subject>**  
{{% /command %}}

**Distance** should be a distance in meters from the origin point *0,0,0* at the center of the cab object.

{{% command %}}  
**\<Length>** *LengthInMeters* **\</Length>**  
{{% /command %}}

**LengthInMeters** should be the length of the car in meters.

{{% command %}}  
**\<Width>** *WidthInMeters* **\</Width>**  
{{% /command %}}

**WidthInMeters** should be the width of the car in meters.

{{% command %}}  
**\<Height>** *HeightInMeters* **\</Height>**  
{{% /command %}}

**HeightInMeters** should be the length of the car in meters.

{{% command %}}  
**\<Mass>** *EmptyMass* **\</EmptyMass>**  
{{% /command %}}

**EmptyMass** should be the mass of an empty (unloaded) car in kilograms.

{{% command %}}  
**\<MotorCar>** *IsMotorCar* **\</MotorCar>**  
{{% /command %}}

**IsMotorCar** sets whether the car is a motor car- If *true*, this car is set as a motor car.

{{% command %}}  
**\<FrontAxle>** *Position* **\</FrontAxle>**  
{{% /command %}}

**Position** should be the position in meters of the axle from the center of the car.

{{% command %}}  
**\<RearAxle>** *Position* **\</RearAxle>**  
{{% /command %}}

**Position** should be the position in meters of the axle from the center of the car.

{{% command %}}  
**\<Object>** *ObjectFile* **\</Object>**  
{{% /command %}}

**ObjectFile** should be a relative on-disk path to the exterior 3D object to use.

{{% command %}}  
**\<Reversed>** *IsReversed* **\</IsReversed>**  
{{% /command %}}

**IsReversed** sets whether the 3D exterior object is reversed. If *true*, the object is reversed.

{{% command %}}  
**\<InteriorView>** *ObjectFile* **\</InteriorView>**  
{{% /command %}}

**ObjectFile** should be a relative on-disk path to the interior 3D object to use.

{{% command %}}  
**\<VisibleFromInterior>** *IsVisible* **\</VisibleFromInterior>**  
{{% /command %}}

**IsVisible** controls whether the exterior object(s) for this car are visible from the interior of other cars. If *true*, objects will be visible.

{{% command %}}  
**\<LoadingSway>** *Sways* **\</LoadingSway>**  
{{% /command %}}

**Sways** sets whether loading sway affects this specific car. If *true*, then whilst passengers are boarding at a station, the loading sway animation is used.

{{% command %}}  
**\<DriverPosition>** *Position* **\</DriverPosition>**  
{{% /command %}}

**Position** should contain a comma-separated 3D vector, defining the position of the driver's eyes within the car, relative to *0,0,0*

{{% command %}}  
**\<Cargo>** *CargoType* **\</Cargo>**  
{{% /command %}}

**CargoType** defines the type of cargo which this car carries. The following load types are available:

{{% command-arguments %}}  
**Passenger**: This car carries passengers. Its overall weight is affected by the loading given at stations, and passenger discomfort is scored.
**Freight**: This car carries freight. Its overall weight is affected by the loading given at stations.  
**None**: This car carries no load (e.g. a locomotive, brake van or similar). It's weight is not affected by the loading given at stations.  
{{% /command-arguments %}}

## <a name="coupler"></a>■ 4. The Coupler section

Car nodes (or child file references) may optionally be separated by a **\<Coupler>** node.

This defines the coupler between the two cars, and supports the following properties:

{{% command %}}  
**\<Minimum>** *Distance* **\</Distance>**  
{{% /command %}}

**Distance** sets the minimum distance between the two cars.

{{% command %}}  
**\<Maximum>** *Distance* **\</Maximum>**  
{{% /command %}}

**Distance** sets the maximum distance between the two cars.

{{% command %}}  
**\<Object>** *ObjectFile* **\</Object>**  
{{% /command %}}

**ObjectFile** should be a relative on-disk path to the exterior 3D object to use.

{{% note %}}

The coupler object is not deformed when the coupler stretches / compresses.

{{% /note %}}