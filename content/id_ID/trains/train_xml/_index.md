---
title: "File **train.xml** "
linktitle: "File train.xml "
weight: 2
---

**NOTE:**

This page is still under construction.

{{% contents %}}

- [1. Overview](#overview)
- [2. The Train section](#train)
- [3. The Car section](#car)
- [3.1. The Power section](#power)
- [3.2. The Brake section](#brake)
- [3.3. Traction Models](#traction)
- [3.3.1. Electric Engine](#electric)
- [3.3.2. Diesel Engine](#diesel)
- [3.4. The Doors section](#doors)
- [3.5. The Sanders section](#sanders)
- [3.6. The Windscreen section](#windscreen)
- [3.7. Particle Sources](#particles)
- [3.8. Safety Systems](#safetysystems)
- [3.8.1. Driver Supervision Device](#dsd)
- [3.9. Motor Sound Tables](#soundtable)
- [4. The Coupler section](#coupler)
- [5. Miscellaneous Properties](#misc)

{{% /contents %}}

## <a name="overview"></a>■ 1. Overview

The **train.xml** format is the native format for newer versions of OpenBVE, and is intended to replace the older train.dat format. It allows setting of many more properties, and is extensible.

It may either be constructed as a single file containing the properties of the entire train, or as a single consist definition, along with child car files.

{{% information %}}

#### Positions Within Cars:

In the **train.xml** format, all positions are measured relative to the center of the car, which is assumed to be at 0,0,0
Whilst this is a change for some parameters from the legacy BVE formats, it means that all positions should be consistant.

{{% /information %}}

## <a name="train"></a>■ 2. The Train section

Whether using child car files, or a single file, the first node in each **train.xml** file must be the **\<Train\>** node.

This supports the following properties:

{{% command %}}  
**\<Car>** *CarProperties* **\</Car>**  
{{% /command %}}

This defines a car within the train.

**CarProperties** may either be a set of child nodes (if using the single file format) or a relative on-disk path to a child car file.

{{% command %}}  
**\<DriverCar>** *Car* **\</DriverCar>**  
{{% /command %}}

**Car** must be a positive integer less than or equal to the number of cars in the train, setting the driver car.

{{% command %}}  
**\<NotchDescriptions>** *Notch* **\</NotchDescriptions>**  
{{% /command %}}

This overrides the in-game UI notch descriptions displayed.

**Notch** may be one or more child-nodes, with one of the following subjects: *Power, Brake, LocoBrake* or *Reverser*

A child-node must be of the following format:

{{% command %}}  
**\<Subject>** *Descriptions* **\</Subject>**  
{{% /command %}}

**Descriptions** should be a comma or semi-colon separated list, equal to the number of notches the train has for the subject.

The entries for this list must be placed in order from low to high. 

For an example brake or locomotive brake handle with EB, hold brake and 8 notches, the following would be used:

{{% function "_Example Brake Handle NotchDescriptions:_" %}}  
\<NotchDescriptions>EB,HLD,N,1,2,3,4,5,6,7,8\</NotchDescriptions>  
{{% /function %}}

A train using the automatic air-brake has a total of three notches, e.g:

{{% function "_Example Brake Handle NotchDescriptions:_" %}}  
\<NotchDescriptions>EB,REL,LAP,SRV\</NotchDescriptions>  
{{% /function %}}

For an example power handle with 8 notches, the following would be used:

{{% function "_Example Power Handle NotchDescriptions:_" %}}  
\<NotchDescriptions>N,1,2,3,4,5,6,7,8\</NotchDescriptions>  
{{% /function %}}

The reverser must be in the order Neutral, Forwards, Reverse:

{{% function "_Example Reverser Handle NotchDescriptions:_" %}}  
\<NotchDescriptions>N,F,R\</NotchDescriptions>  
{{% /function %}}

## <a name="car"></a>■ 3. The Car section

{{% note %}}

When using child car files, the **\<Car>** node should be the first node in the file. All other details remain the same.

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
**\<CenterOfGravityHeight>** *CenterOfGravityInMeters* **\</CenterOfGravityHeight>**  
{{% /command %}}

**CenterOfGravityInMeters** should be the height above the rails in meters at which the center of mass is located.

{{% command %}}  
**\<ExposedFrontalArea>** *Area* **\</ExposedFrontalArea>**  
{{% /command %}}

**Area** should be a positive floating-point number measured in square meters (m²) indicating the frontal area of a car when it is fully exposed to resisting air, for example when the car is the front car in the current nominal direction of travel. 

{{% command %}}  
**\<UnexposedFrontalArea>** *Area* **\</UnexposedFrontalArea>**  
{{% /command %}}

**Area** should be a positive floating-point number measured in square meters (m²) indicating the frontal area of a car when it is fully not exposed to resisting air, namely any car in the train other than the front car.

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

### The Bogie sections

The front and rear bogies fitted to the car may be defined via the optional **\<FrontBogie>** and **\<RearBogie>** child nodes.

If these are not defined, each bogie defaults to a pair of axles located one meter either side of the position of the car's corresponding outer axle.

{{% command %}}  
**\<FrontBogie>** *BogieProperties* **\</FrontBogie>**  
{{% /command %}}

{{% command %}}  
**\<RearBogie>** *BogieProperties* **\</RearBogie>**  
{{% /command %}}

**BogieProperties** is a set of child nodes, supporting the following properties:

{{% command %}}  
**\<FrontAxle>** *Position* **\</FrontAxle>**  
{{% /command %}}

**Position** should be the position in meters of the bogie's front axle, measured relative to the position of the car's corresponding outer axle.

{{% command %}}  
**\<RearAxle>** *Position* **\</RearAxle>**  
{{% /command %}}

**Position** should be the position in meters of the bogie's rear axle, measured relative to the position of the car's corresponding outer axle.

{{% command %}}  
**\<Object>** *ObjectFile* **\</Object>**  
{{% /command %}}

**ObjectFile** should be a relative on-disk path to the 3D object to use for this bogie.

{{% command %}}  
**\<Reversed>** *IsReversed* **\</Reversed>**  
{{% /command %}}

**IsReversed** sets whether the bogie's 3D object is reversed. If *true*, the object is reversed.

{{% command %}}  
**\<InteriorView>** *ObjectFile* **\</InteriorView>**  
{{% /command %}}

**ObjectFile** should be a relative on-disk path to the interior view to use. This may be a 3D object (e.g. **b3d** / **csv** / **animated**), a **panel2.cfg** file, or an XML file using the **panel.xml** or **panel.animated** XML formats.

{{% command %}}  
**\<InteriorDirection>** *DirectionX*, *DirectionY*, *DirectionZ* **\</InteriorDirection>**  
{{% /command %}}

This command allows you to rotate the interior camera, allowing for views which do not align with the forwards track direction.

{{% command-arguments %}}  
**DirectionX** The number of degrees that the initial interior camera is rotated in the X-axis.
**DirectionY** The number of degrees that the initial interior camera is rotated in the Y-axis.
**DirectionZ** The number of degrees that the initial interior camera is rotated in the Z-axis.
{{% /command-arguments %}}  

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

## <a name="power"></a>■ 3.1. The Power section

Motor cars may specifiy a **\<Power>** node.

This defines the acceleration curves and the power handle fitted to the car, and supports the following child nodes:

### 3.1.1. Acceleration Curves

{{% warning-nontitle %}}

In the **train.dat** acceleration curve figures are given for the train as a whole, and an internal calculation is performed to produce the per-car acceleration figures.
<br><br>
However, in **train.xml** acceleration curve figures apply to the current car only.

{{% /warning-nontitle %}}

The **\<AccelerationCurves>** child node should contain a list of acceleration curve nodes. These must be in ascending order, and should correspond to the number of power notches the train has.

{{% note %}}

For backwards compatibility, the **\<AccelerationCurves>** node may also be placed directly under the **\<Car>** node, instead of the **\<Power>** node.

{{% /note %}}

Currently, the only supported acceleration curve node is the **\<OpenBVE>** node, supporting the following properties (as per a **train.dat** acceleration curve):

{{% command %}}  
**\<StageZeroAcceleration>** *Acceleration* **\</StageZeroAcceleration>**  
{{% /command %}}

**Acceleration** should be a positive floating-point number representing the acceleration at a speed of 0 km/h expressed in km/h/s.

{{% command %}}  
**\<StageOneAcceleration>** *Acceleration* **\</StageOneAcceleration>**  
{{% /command %}}

**Acceleration** should be a positive floating-point number representing the acceleration at a speed of *n* km/h expressed in km/h/s.

{{% command %}}  
**\<StageOneSpeed>** *Speed* **\</StageOneSpeed>**  
{{% /command %}}

**Speed** should be a positive floating-point number representing the reference speed for *StageOneAcceleration*

{{% command %}}  
**\<StageTwoExponent>** *Exponent* **\</StageTwoExponent>**  
{{% /command %}}

**Exponent** should be a positive floating-point number representing the exponent used in the stage two speed calculation.

{{% command %}}  
**\<StageTwoSpeed>** *Speed* **\</StageTwoSpeed>**  
{{% /command %}}

**Speed** should be a positive floating-point number representing the reference speed for *StageTwoExponent*

{{% command %}}  
**\<Multiplier>** *Number* **\</Multiplier>**  
{{% /command %}}

**Number** should be a positive floating-point number representing the blended output of the motor car to the train's acceleration. The default value is **1.0** Values of zero or less, or greater than 50, are invalid.

{{% warning-nontitle %}}

This figure is only meaningful for trains using BVE acceleration numbers converted via *CarXMLConvertor*, and should be omitted if setting acceleration outputs on a per-car basis.

{{% /warning-nontitle %}}



Thus:

If the speed of the train is 0 km/h, *a<sub>0</sub>* indicates the acceleration output.

If the speed of the train is between 0 km/h and *v<sub>1</sub>*, the acceleration output is determined via the following formula:

{{% function "*Acceleration between 0 km/h and v<sub>1</sub>, where x is the current speed of the train in km/h:*" %}}  
a<sub>0</sub> + (a<sub>1</sub> - a<sub>0</sub>) \* x / v<sub>1</sub>  
{{% /function %}}

If the speed of the train is *v<sub>1</sub>*, the acceleration output is indicated by *a<sub>1</sub>*.

If the speed of the train is between *v<sub>1</sub>* and *v<sub>2</sub>*, the acceleration output is determined via the following formula:

{{% function "*Acceleration between v<sub>1</sub> and v<sub>2</sub>, where x is the current speed of the train in km/h:*" %}}  
v<sub>1</sub> \* a<sub>1</sub> / x  
{{% /function %}}

If the speed of the train is greater than *v<sub>2</sub>*, the acceleration output is determined via the following formula (for version 2.0 exponents):

{{% function "_Acceleration above v<sub>2</sub>, where x is the current speed of the train in km/h:_" %}}  
v<sub>1</sub> \* a<sub>1</sub> \* v<sub>2</sub><sup>e-1</sup> / x<sup>e</sup>  
{{% /function %}}

### 3.1.2. Power Handles

{{% note-withtitle %}}

#### *Driver and non-driver cars:* 

The properties within this node will only be interpreted if the car is specified as the driver car.

{{% /note-withtitle %}}

The **\<Handle>** node specifies properties for the power handle, and supports the following properties:

{{% command %}}  
**\<Notches>** *NumberOfNotches* **\</Notches>**  
{{% /command %}}

**NumberOfNotches** should be a positive integer, setting the number of power notches.

{{% note %}}

For a simple handle, the **\<Notches>** node may also be specified directly under the **\<Power>** node, without an enclosing **\<Handle>** node.

{{% /note %}}

{{% command %}}  
**\<SpringType>** *Type* **\</SpringType>** 
{{% /command %}}

{{% command-arguments %}}  
***Type***: The type of spring return fitted to this handle (if any).
{{% /command-arguments %}}

▸ Available options for *Type*:

{{% command-arguments %}}  
**Unsprung**: No spring return mechanism is fitted.  
**Single**: The spring return mechanism is reset when this handle is operated.  
**AnyHandle**: The spring return mechanism is reset when any power or brake handle is operated.
**AnyKey**: The spring return mechanism is reset when any keyboard key or joystick control is operated.
{{% /command-arguments %}}

{{% command %}}  
**\<SpringTime>** *Time* **\</SpringTime>**  
{{% /command %}}

**Time** should be a positive number, setting the time in seconds taken for the handle to return to its rest position when released.

{{% note %}}

The **\<SpringTime>** node must be set for a spring return mechanism to be fitted - If this is not set, the handle is treated as unsprung, regardless of the value of **\<SpringType>**.

{{% /note %}}

{{% command %}}  
**\<MaxSprungNotch>** *Notch* **\</MaxSprungNotch>**  
{{% /command %}}

**Notch** should be a positive integer, defining the highest notch at which the spring return mechanism may hold the handle.

## <a name="brake"></a>■ 3.2. The Brake section

The **\<Brake>** section specifies properties for the braking system of the car, and consists of the following child nodes, each corresponding the a component of the twin-pipe standard air-brake system:

### Air compressor

An optional **\<Compressor>** node, supporting the following properties:

{{% command %}}  
**\<Rate>** *CompressionRate* **\</Rate>**  
{{% /command %}}

**CompressionRate** should be a positive number, representing the compression rate in Pa/s.

{{% command %}}  
**\<RestartPressure>** *CompressionRate* **\</RestartPressure>**  
{{% /command %}}

**Pressure** should be a positive number, representing pressure in Pa in the main reservoir, at which the compressor restarts.

**Note:** When not set, the compressor restarts when the pressure in the main reservoir reaches minimum.

### Main Reservoir

The **\<MainReservoir>** node, supporting the following properties:

{{% command %}}  
**\<MinimumPressure>** *Pressure* **\</MinimumPressure>**  
{{% /command %}}

**Pressure** should be a positive number, representing the minimum pressure in the main reservoir in Pa.

{{% command %}}  
**\<MaximumPressure>** *Pressure* **\</MaximumPressure>**  
{{% /command %}}

**Pressure** should be a positive number, representing the maximum achievable pressure in the main reservoir in Pa.

{{% command %}}  
**\<Volume>** *Volume* **\</Volume>**  
{{% /command %}}

**Volume** should be a positive number, representing the volume of the main reservoir in cubic meters (m³).

### Auxiliary Reservoir

The **\<AuxiliaryReservoir>** node, supporting the following properties:

{{% command %}}  
**\<ChargeRate>** *Rate* **\</ChargeRate>**  
{{% /command %}}

**Rate** should be a positive number, representing the charge rate of the auxiliary reservoir from the main reservoir in Pa/s.

{{% command %}}  
**\<Volume>** *Volume* **\</Volume>**  
{{% /command %}}

**Volume** should be a positive number, representing the volume of the auxiliary reservoir in cubic meters (m³).

### Equalizing Reservoir

The **\<EqualizingReservoir>** node, supporting the following properties:

{{% command %}}  
**\<NormalPressure>** *Pressure* **\</NormalPressure>**  
{{% /command %}}

**Pressure** should be a positive number, representing the normal pressure of this reservoir in Pa.

{{% note %}}

The normal pressure of the equalizing reservoir is not directly settable - It is derived from the brake pipe normal pressure (1.005 × the *NormalPressure* of the **\<BrakePipe>**).

{{% /note %}}

{{% command %}}  
**\<ChargeRate>** *Rate* **\</ChargeRate>**  
{{% /command %}}

**Rate** should be a positive number, representing the charge rate of the equalizing reservoir in Pa/s.

{{% command %}}  
**\<ServiceRate>** *Rate* **\</ServiceRate>**  
{{% /command %}}

**Rate** should be a positive number, representing the charge rate in Pa/s when making a service brake application.

{{% command %}}  
**\<EmergencyRate>** *Rate* **\</EmergencyRate>**  
{{% /command %}}

**Rate** should be a positive number, representing the charge rate in Pa/s when making an emergency brake application.

{{% command %}}  
**\<Volume>** *Volume* **\</Volume>**  
{{% /command %}}

**Volume** should be a positive number, representing the volume of the equalizing reservoir in cubic meters (m³).

### Brake Pipe

The **\<BrakePipe>** node, supporting the following properties:

{{% command %}}  
**\<NormalPressure>** *Pressure* **\</NormalPressure>**  
{{% /command %}}

**Pressure** should be a positive number, representing the normal nominal pressure of the brake pipe in Pa.

{{% command %}}  
**\<ChargeRate>** *Rate* **\</ChargeRate>**  
{{% /command %}}

**Rate** should be a positive number, representing the normal charge rate in Pa/s.

{{% command %}}  
**\<ServiceRate>** *Rate* **\</ServiceRate>**  
{{% /command %}}

**Rate** should be a positive number, representing the charge rate in Pa/s when making a service brake application.

{{% command %}}  
**\<EmergencyRate>** *Rate* **\</EmergencyRate>**  
{{% /command %}}

**Rate** should be a positive number, representing the charge rate in Pa/s when making an emergency brake application.

{{% command %}}  
**\<Volume>** *Volume* **\</Volume>**  
{{% /command %}}

**Volume** should be a positive number, representing the volume of the brake pipe in cubic meters (m³).

### Straight Air Pipe

The **\<StraightAirPipe>** node, supporting the following properties:

{{% command %}}  
**\<ServiceRate>** *Rate* **\</ServiceRate>**  
{{% /command %}}

**Rate** should be a positive number, representing the charge rate in Pa/s when making a service brake application.

{{% command %}}  
**\<EmergencyRate>** *Rate* **\</EmergencyRate>**  
{{% /command %}}

**Rate** should be a positive number, representing the charge rate in Pa/s when making an emergency brake application.

{{% command %}}  
**\<ReleaseRate>** *Rate* **\</ReleaseRate>**  
{{% /command %}}

**Rate** should be a positive number, representing the charge rate in Pa/s when releasing a brake application.

### Brake Cylinder

The **\<BrakeCylinder>** node, supporting the following properties:

{{% command %}}  
**\<ServiceMaximumPressure>** *Pressure* **\</ServiceMaximumPressure>**  
{{% /command %}}

**Pressure** should be a positive number, representing the maximum pressure in Pa when making a full service brake application.

{{% command %}}  
**\<EmergencyMaximumPressure>** *Pressure* **\</EmergencyMaximumPressure>**  
{{% /command %}}

**Pressure** should be a positive number, representing the maximum pressure in Pa when making a full emergency brake application.

{{% command %}}  
**\<EmergencyRate>** *Rate* **\</EmergencyRate>**  
{{% /command %}}

**Rate** should be a positive number, representing the release rate in Pa/s during a full emergency brake application.

{{% command %}}  
**\<ReleaseRate>** *Rate* **\</ReleaseRate>**  
{{% /command %}}

**Rate** should be a positive number, representing the charge rate in Pa/s when releasing the brakes.

{{% command %}}  
**\<Volume>** *Volume* **\</Volume>**  
{{% /command %}}

**Volume** should be a positive number, representing the volume of the brake cylinder in cubic meters (m³).

{{% command %}}  
**\<LegacyPressureDistribution>** *Boolean* **\</LegacyPressureDistribution>**  
{{% /command %}}

**Boolean** should be a boolean true / false value, determining whether the legacy train.dat brake pipe model is used - If *true*, the brake pipe pressure distribution is averaged across the train, rather than being simulated on a per-car basis.

### Brake Handles

{{% note-withtitle %}}

#### *Driver and non-driver cars:* 

The properties within this node will only be interpreted if the car is specified as the driver car.

{{% /note-withtitle %}}

The **\<Handle>** node specifies properties for the brake handle, and supports the following properties:

{{% command %}}  
**\<Notches>** *NumberOfNotches* **\</Notches>**  
{{% /command %}}

**NumberOfNotches** should be a positive integer, setting the number of brake notches.

{{% note %}}

For a simple handle, the **\<Notches>** node may also be specified directly under the **\<Brake>** node, without an enclosing **\<Handle>** node.

{{% /note %}}

{{% command %}}  
**\<SpringType>** *Type* **\</SpringType>** 
{{% /command %}}

{{% command-arguments %}}  
***Type***: The type of spring return fitted to this handle (if any).
{{% /command-arguments %}}

▸ Available options for *Type*:

{{% command-arguments %}}  
**Unsprung**: No spring return mechanism is fitted.  
**Single**: The spring return mechanism is reset when this handle is operated.  
**AnyHandle**: The spring return mechanism is reset when any power or brake handle is operated.
**AnyKey**: The spring return mechanism is reset when any keyboard key or joystick control is operated.
{{% /command-arguments %}}

{{% command %}}  
**\<SpringTime>** *Time* **\</SpringTime>**  
{{% /command %}}

**Time** should be a positive number, setting the time in seconds taken for the handle to return to its rest position when released.

{{% note %}}

The **\<SpringTime>** node must be set for a spring return mechanism to be fitted - If this is not set, the handle is treated as unsprung, regardless of the value of **\<SpringType>**.

{{% /note %}}

{{% command %}}  
**\<MaxSprungNotch>** *Notch* **\</MaxSprungNotch>**  
{{% /command %}}

**Notch** should be a positive integer, defining the highest notch at which the spring return mechanism may hold the handle.

{{% command %}}  
**\<MotorBrakeNotch>** *Notch* **\</MotorBrakeNotch>**  
{{% /command %}}

**Notch** should be a positive integer, defining the maximum notch in which motor assisted braking is available.

## <a name="traction"></a>■ 3.3. Traction Modelling

Two traction models are supported: The electric engine and the diesel engine. In addition, a standard motor car using BVE style acceleration curves may be defined via the **\<MotorCar>** node.

### <a name="electric"></a>3.3.1. Electric Engine

The **\<ElectricEngine>** node models a simplistic electric engine, using a pantograph to collect current from an overhead wire.

With this traction model in use, one car in the train must possess a pantograph, which must be raised for the train to be moved.

It supports the following properties:

{{% command %}}  
**\<Pantograph>** *boolean*  **\</Pantograph>**
**\<CollectorShoe>** *boolean*  **\</CollectorShoe>**
{{% /command %}}

{{% command-arguments %}}  
**Boolean** should be a boolean true / false value, determining whether this vehicle has a pantograph  / third rail collector shoe.
{{% /command-arguments %}}

Traction motors may be added via the **\<TractionMotor>** or **\<RegenerativeTractionMotor>** child nodes.

These support the following properties:

{{% command %}}  
**\<MaxAmps>** *Amps*  **\</MaxAmps>**
{{% /command %}}

{{% command-arguments %}}  
**Amps** represents the number of amps drawn by the traction motor when the train is accelerating at maximum.
{{% /command-arguments %}}

{{% command %}}  
**\<MaxRegenAmps>** *Amps*  **\</MaxRegenAmps>**
{{% /command %}}

{{% command-arguments %}}  
**Amps** represents the number of amps drawn by the traction motor when the train is braking at maximum, when this traction motor is a regenerative traction motor.
{{% /command-arguments %}}


### <a name="diesel"></a>3.3.2. Diesel Engine

The **\<DieselEngine>** node models a diesel engine. Cars fitted with a diesel engine are treated as motor cars.

It supports the following properties:

{{% command %}}  
**\<IdleRPM>** *RPM*  **\</IdleRPM>**  
**\<MinRPM>** *RPM*  **\</MinRPM>**  
**\<MaxRPM>** *RPM*  **\</MaxRPM>**  
{{% /command %}}

{{% command-arguments %}}  
**RPM**: The engine speed in revolutions per minute (RPM) when idling (**IdleRPM**), at minimum power (**MinRPM**), and at maximum power (**MaxRPM**). At idle, the engine runs at **IdleRPM**; the engine speed then rises linearly from **MinRPM** to **MaxRPM** across the power notches.
{{% /command-arguments %}}  

{{% command %}}  
**\<RPMChangeRate>** *Rate*  **\</RPMChangeRate>**  
**\<RPMChangeUpRate>** *Rate*  **\</RPMChangeUpRate>**  
**\<RPMChangeDownRate>** *Rate*  **\</RPMChangeDownRate>**  
{{% /command %}}

{{% command-arguments %}}  
**Rate**: The rate at which the engine speed changes, in RPM per second. **RPMChangeRate** sets both rates, which may be overridden individually via **RPMChangeUpRate** and **RPMChangeDownRate**. If set to zero, the engine speed changes instantly.
{{% /command-arguments %}}  

{{% command %}}  
**\<IdleFuelUse>** *Rate*  **\</IdleFuelUse>**  
**\<MaxPowerFuelUse>** *Rate*  **\</MaxPowerFuelUse>**  
{{% /command %}}

{{% command-arguments %}}  
**Rate**: The fuel consumption when idling (**IdleFuelUse**) and at maximum power (**MaxPowerFuelUse**), in units of fuel per second. Fuel consumption at intermediate power notches is interpolated between these two figures.
{{% /command-arguments %}}  

{{% command %}}  
**\<FuelCapacity>** *Capacity*  **\</FuelCapacity>**  
{{% /command %}}

{{% command-arguments %}}  
**Capacity**: The capacity of the fuel tank. The tank is filled at the start of the route.
{{% /command-arguments %}}  

Traction motors may be added via the **\<TractionMotor>** or **\<RegenerativeTractionMotor>** child nodes, which support the same properties as for the electric engine.

## <a name="doors"></a>■ 3.4. The Doors section

The **\<Doors>** section specifies the properties of the passenger doors fitted to this car, and supports the following properties:

{{% command %}}  
**\<OpenSpeed>** *Speed* **\</OpenSpeed>**  
{{% /command %}}

**Speed** should be a positive number, setting the time taken for the doors to open in seconds.

{{% command %}}  
**\<CloseSpeed>** *Speed* **\</CloseSpeed>**  
{{% /command %}}

**Speed** should be a positive number, setting the time taken for the doors to close in seconds.

{{% note %}}

If the opening or closing speed is not set, this will be calculated using the duration of the open / close sounds.

See the **sound.cfg** documentation for further details.

{{% /note %}}

{{% command %}}  
**\<Width>** *DoorWidth* **\</Width>**  
{{% /command %}}

**DoorWidth** should be a positive number, setting the width of the door opening in meters.

{{% command %}}  
**\<Tolerance>** *DoorTolerance* **\</Tolerance>**  
{{% /command %}}

**DoorTolerance** should be a positive number, setting a tolerance in meters before the door is considered to be closed.

## <a name="sanders"></a>■ 3.5. The Sanders section

The **\<Sanders>** section specifies the properties of the sanders fitted to this car, and supports the following properties:

{{% note %}}

If not set, the following defaults apply: The sanding rate is unlimited, the sand level starts empty, the application time is 10 seconds, the activation time is 5 seconds, and the number of shots is unlimited.

{{% /note %}}

{{% command %}}  
**\<Type>** *Type*  **\</Type>**
{{% /command %}}

{{% command-arguments %}}  
***Type***: The type of sanders fitted to this car (if any).
{{% /command-arguments %}}

▸ Available options for *Type*:

{{% command-arguments %}}  
**NotFitted**: No sanding mechanism is fitted.  
**PressAndHold**: The sanders are applied whilst the **Sanders** key is held and sufficient sand is available.  
**Toggle**: The **Sanders** key toggles the sanders on and off.
**NumberOfShots**: N shots of sand are available, which are applied when the **Sanders** key is pressed.
**Automatic**: The sanders are automatically activated when wheelslip is detected and sufficient sand is present.
{{% /command-arguments %}}

{{% command %}}  
**\<Rate>** *SandingRate*  **\</Rate>**
{{% /command %}}

{{% command-arguments %}}  
***SandingRate***: The rate at which sand is applied per second.
{{% /command-arguments %}}

{{% command %}}  
**\<SandLevel>** *Level*  **\</SandLevel>**
{{% /command %}}

{{% command-arguments %}}  
***Level***: The initial starting level of sand, if not in shot mode.
{{% /command-arguments %}}

{{% command %}}  
**\<NumberOfShots>** *Shots*  **\</NumberOfShots>**
{{% /command %}}

{{% command-arguments %}}  
***Shots***: The number of sand shots available.
{{% /command-arguments %}}

{{% command %}}  
**\<ApplicationTime>** *Time*  **\</ApplicationTime>**
{{% /command %}}

{{% command-arguments %}}  
***Time***: When in shots mode, sets the duration of a sand shot in seconds.
{{% /command-arguments %}}

{{% command %}}  
**\<ActivationTime>** *Time*  **\</ActivationTime>**
{{% /command %}}

{{% command-arguments %}}  
***Time***: When in automatic mode, the amount of time before the system reacts and applies sand.
{{% /command-arguments %}}

{{% note %}}

If the **\<Sanders>** node is not used, the legacy **\<ReadhesionDevice>** node may instead be used to define a simple anti-slip device, matching the *ReAdhesionDevice* entry in the **train.dat** format:

{{% /note %}}

{{% command %}}  
**\<ReadhesionDevice>** *DeviceType*  **\</ReadhesionDevice>**  
{{% /command %}}

▸ Available options for *DeviceType*:

{{% command-arguments %}}  
**NotFitted**: No readhesion device is fitted.  
**TypeA** / **A**: Cuts off power instantly and rebuilds it up fast in steps.  
**TypeB** / **B**: Updates not so often and adapts slowly. Wheel slip can persist longer and power is regained slower. The behavior is smoother.  
**TypeC** / **C**: The behavior is somewhere in-between type B and type D.  
**TypeD** / **D**: Updates fast and adapts fast. Wheel slip only occurs briefly and power is regained fast. The behavior is more abrupt.  
{{% /command-arguments %}}  

If neither node is present, a type A readhesion device is fitted by default, matching the **train.dat** behaviour.

## <a name="windscreen"></a>■ 3.6. The Windscreen section

The **\<Windscreen>** section specifies the properties of the windscreen, and should be used if you wish to animate a windscreen on a 3D cab using the inbuilt functionality. It supports the following properties:

{{% note %}}

The windscreen is only created for the player train.

If **\<NumberOfDrops>** is not set, no windscreen is created. The remaining properties default to a wipe speed of 1 second, a hold time of 1 second, and a drop life of 10 seconds.

{{% /note %}}

{{% command %}}  
**\<NumberOfDrops>** *Drops*  **\</NumberOfDrops>**
{{% /command %}}

{{% command-arguments %}}  
***Drops***: The total number of drops on the windscreen.
{{% /command-arguments %}}

{{% command %}}  
**\<WipeSpeed>** *Speed*  **\</WipeSpeed>**
{{% /command %}}

{{% command-arguments %}}  
***Speed***: The time in seconds for the wipers to make a single sweep of the windscreen.
{{% /command-arguments %}}

{{% command %}}  
**\<HoldTime>** *Time*  **\</HoldTime>**
{{% /command %}}

{{% command-arguments %}}  
***Time***: The time in seconds for the wipers to hold at the hold position during a sweep.
{{% /command-arguments %}}

{{% command %}}  
**\<DropLife>** *Life*  **\</DropLife>**
{{% /command %}}

{{% command-arguments %}}  
***Life***: The life in seconds before a drop is eligible to be recycled when all drops are visible.
{{% /command-arguments %}}

{{% command %}}  
**\<RestPosition>** *Position*  **\</RestPosition>**
{{% /command %}}

{{% command-arguments %}}  
**Position**: The rest position for the wipers.
{{% /command-arguments %}}

▸ Available options for *Position*:

{{% command-arguments %}}  
**Left**: The wipers rest at the left of the screen when off.  
**Right**: The wipers rest at the right of the screen when off.  
{{% /command-arguments %}}

{{% command %}}  
**\<HoldPosition>** *Position*  **\</HoldPosition>** 
{{% /command %}}

{{% command-arguments %}}  
**Position**: The hold position for the wipers.
{{% /command-arguments %}}

▸ Available options for *Position*:

{{% command-arguments %}}  
**Left**: The wipers hold on the left of the screen for *HoldTime* during their sweep.  
**Right**: The wipers hold on the right of the screen for *HoldTime* during their sweep.  
{{% /command-arguments %}}

## <a name="particles"></a>■ 3.7. Particle Sources

The **\<ParticleSource>** section attaches a particle source, such as a diesel exhaust to the car. 

Currently, the size of particles is **only** controlled by the engine power level, but the aim is to add additional controllers at a later date.

When a particle is generated, it's maximum final size will be determined by linearly interpolating between **MaximumSize** and **MaximumGrown** size. This number is fixed for the life of the particle.

If no **Function** is specified, the interpolated size of the particle will be controlled by the power level of the engine, otherwise the result of **Function** will be used.



It supports the following properties:

{{% command %}}  
**\<Location>** *SourceLocation*  **\</Location>** 
{{% /command %}}

{{% command-arguments %}}  
***SourceLocation***: A comma-separated 3D vector, describing the location of the particle emitter, relative to the center of the car.
{{% /command-arguments %}}

{{% command %}}  
**\<MaximumSize>** *Size*  **\</MaximumSize>** 
{{% /command %}}

{{% command-arguments %}}  
**Size***: The maximum initial size of emitted particles. This should normally be set to the diameter of the apeature through which particles are emitted.
{{% /command-arguments %}}

{{% command %}}  
**\<MaximumGrownSize>** *Size*  **\</MaximumGrownSize>**
{{% /command %}}

{{% command-arguments %}}  
***Size***: The maximum size a particle will spread to, at maximum power level.
{{% /command-arguments %}}

{{% command %}}  
**\<InitialDirection>** *Direction*  **\</InitialDirection>**
{{% /command %}}

{{% command-arguments %}}  
***Direction***: A comma-separated 3D vector, describing the initial direction of motion of the particles when emitted.
{{% /command-arguments %}}

{{% command %}}  
**\<MaximumLifespan>** *Life*  **\</MaximumLifespan>**
{{% /command %}}
 
{{% command-arguments %}}  
***Life***: The maximum life in seconds of a particle.
{{% /command-arguments %}}

{{% command %}}  
**\<Texture>** *FileName*  **\</Texture>** 
{{% /command %}}

{{% command-arguments %}}  
***FileName***: A relative path to 4x4 texture atlas containing particle textures to be used by this emitter.
{{% /command-arguments %}}

{{% command %}}  
**\<EmitsAtIdle>** *Boolean*  **\</EmitsAtIdle>** 
{{% /command %}}

{{% command-arguments %}}  
***Boolean***: **True** or **1** if particles should be emitted at idle, **False** or **0** otherwise.
{{% /command-arguments %}}

{{% command %}}  
**\<Function>** *FunctionScript*  **\</Function>** 
{{% /command %}}

{{% command-arguments %}}  
***FunctionScript***: A function script returning a value on execution between **0 (Size)** and **1 (MaximumGrownSize)**, controlling the maximum size of emitted particles. 
{{% /command-arguments %}}

{{% information %}}

#### Escaping Special Characters in XML:

The **>** (greater than sign) , **<** (less than sign) and **&** (ampersand) are reseved characters in XML, and must be escaped for the file to be readable.

Please see the [Microsoft documentation](https://learn.microsoft.com/en-us/dotnet/desktop/xaml-services/xml-character-entities) 

{{% /information %}}


## <a name="safetysystems"></a>■ 3.8. Safety Systems
### <a name="dsd"></a>■ 3.8.1. Driver Supervision Device

The **\<DriverSupervisionDevice>** section creates a driver supervision device, which may intervene if the driver fails to cancel it in time. 

It supports the following properties:

{{% command %}}  
**\<Type>** *DeviceType*  **\</Type>** 
{{% /command %}}

▸ Available options for *DeviceType*:

{{% command-arguments %}}  
**None**: No driver supervision device is fitted.  
**CutsPower**: The device cuts the train's power when activated.
**ApplyBrake**: The device applies service brakes when activated.
**ApplyEmergencyBrake**: The device applies the emergency brake when activated.  
{{% /command-arguments %}}

{{% command %}}  
**\<Mode>** *DeviceMode*  **\</Mode>** 
{{% /command %}}

▸ Available options for *DeviceType*:

{{% command-arguments %}}  
**Power**: The device timer is reset when the power handle is moved.  
**Brake**: The device timer is reset when the brake handle is moved.  
**AnyHandle**: The device timer is reset when any handle is moved.  
**Independant**: The device timer is reset when DSD key is pressed.  
**HeldKey**: The DSD key must remain pressed.  
{{% /command-arguments %}}

{{% command %}}  
**\<TriggerMode>** *TriggerMode*  **\</TriggerMode>**  
{{% /command %}}

▸ Available options for *TriggerMode*:

{{% command-arguments %}}  
**Always**: The device is always active.  
**TrainMoving**: The device is only active when the train is moving.  
**DirectionSet**: The device is only active when a direction is set on the reverser.  
{{% /command-arguments %}}  

{{% command %}}  
**\<AlarmTime>** *Time*  **\</AlarmTime>** 
{{% /command %}}

{{% command-arguments %}}  
***Time***: The time in seconds before the device enters alarm state. No intervention is performed until **InterventionTime** is passed.
{{% /command-arguments %}}

{{% note %}}

If not set, the alarm time defaults to the value of **\<InterventionTime>**.

{{% /note %}}

{{% command %}}  
**\<InterventionTime>** *Time*  **\</InterventionTime>** 
{{% /command %}}

{{% command-arguments %}}  
***Time***: The time in seconds from when the device enters alarm state, until it intervenes.
{{% /command-arguments %}}

{{% command %}}  
**\<RequiredStopTime>** *Time*  **\</RequiredStopTime>** 
{{% /command %}}

{{% command-arguments %}}  
***Time***: The time in seconds the train must be stopped following an intervention, until the device may be reset.
{{% /command-arguments %}}

{{% command %}}  
**\<LoopingAlert>** *boolean*  **\</LoopingAlert>**
{{% /command %}}

{{% command-arguments %}}  
**Boolean** should be a boolean true / false value, determining whether the alert tone is played once, or continuously until the device intervenes.
{{% /command-arguments %}}

{{% command %}}  
**\<LoopingAlarm>** *boolean*  **\</LoopingAlarm>**
{{% /command %}}

{{% command-arguments %}}  
**Boolean** should be a boolean true / false value, determining whether the alarm tone is played once, or continuously until the device is reset.
{{% /command-arguments %}}

## <a name="soundtable"></a>■ 3.9. Motor Sound Tables

The optional **\<SoundTable>** node allows a motor sound table to be attached to the car's traction model.

Currently, the only supported child node is **\<BVE5>**, which loads a BVE5 format motor sound table:

{{% command %}}  
**\<BVE5>** *TableProperties* **\</BVE5>**  
{{% /command %}}

**TableProperties** is a set of child nodes, each containing a relative on-disk path to the relevant sound table file:

{{% command %}}  
**\<PowerFreq>** *FileName*  **\</PowerFreq>**  
**\<PowerVol>** *FileName*  **\</PowerVol>**  
**\<BrakeFreq>** *FileName*  **\</BrakeFreq>**  
**\<BrakeVol>** *FileName*  **\</BrakeVol>**  
{{% /command %}}

{{% command-arguments %}}  
**FileName**: The relative path to the BVE5 motor sound table file holding the frequency (**Freq**) or volume (**Vol**) table for power (**Power**) or brake (**Brake**) applications.
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

Note that *Maximum* must be greater than or equal to *Minimum*.

{{% command %}}  
**\<Object>** *ObjectFile* **\</Object>**  
{{% /command %}}

**ObjectFile** should be a relative on-disk path to the exterior 3D object to use.

{{% note %}}

The coupler object is not deformed when the coupler stretches / compresses.

{{% /note %}}

{{% command %}}  
**\<CanUncouple>** *Boolean* **\</CanUncouple>**  
{{% /command %}}

**Boolean** should be a boolean true / false value, determining whether this coupler may be uncoupled by the player.

{{% command %}}  
**\<UncouplingBehaviour>** *Behaviour* **\</UncouplingBehaviour>**  
{{% /command %}}

**Behaviour** sets the behaviour of the brake systems when this coupler is uncoupled.

▸ Available options for *Behaviour*:

{{% command-arguments %}}  
**Emergency**: The emergency brake is applied to both consists.  
**EmergencyPlayer**: The emergency brake is applied to the player consist; the uncoupled consist retains the previous brake setting.  
**EmergencyUncoupledConsist**: The emergency brake is applied to the uncoupled consist; the player consist retains the previous brake setting.  
**ReleasedUncoupledConsist**: The brakes are released on the uncoupled consist; the player consist retains the previous brake setting.  
**Released**: The brakes are released on both consists.  
{{% /command-arguments %}}  

## <a name="misc"></a>■ 5. Miscellaneous Properties

{{% command %}}  
**\<Plugin>** *PluginFile* **\</Plugin>**  
{{% /command %}}

**PluginFile** should contain the relative path to the security plugin DLL to load- This applies to the player train only.

When using a .Net plugin which supports multiple running instances, the following alternative format may be used:

{{% command %}}  
**\<Plugin>** <br>
&nbsp;**\<File>** *PluginFile* **\</File>** <br>
&nbsp;**\<LoadForAI>** *Boolean* **\</LoadForAI>** <br>
**\</Plugin>**  
{{% /command %}}

**PluginFile** should contain the relative path to a .Net based security plugin DLL to load.

**Boolean** should be a boolean true / false value, determining whether this plugin should also be loaded for any additional AI instances.


{{% command %}}  
**\<Description>** *Text* **\</Description>**  
{{% /command %}}

**Text** should contain the textual description for the train to display in the main menu.

{{% command %}}  
**\<HeadlightStates>** *NumberOfStates* **\</HeadlightStates>**  
{{% /command %}}

**NumberOfStates** should be the total number of states that the train headlight posesses.

*Note:* Headlight effects must be implemented by the train developer, using animation / panel properties. 

The **\<DriverBody>** node contains properties pertaining to the driver's body. This is used to calculate the head-bounce cased by the **Track.Accuracy** command.

This supports the following properties:

{{% command %}}  
**\<ShoulderHeight>** *Height* **\</ShoulderHeight>**  
{{% /command %}}

**Height** should be the height in meters of the driver's shoulders above the pivot point- If the driver is seated, this should be the distance from the seat base to the shoulders, and if standing it should be the height from floor to shoulders.

{{% command %}}  
**\<HeadHeight>** *Height* **\</HeadHeight>**  
{{% /command %}}

**Height** should be the height in meters from the driver's shoulders to the center point of the head.

