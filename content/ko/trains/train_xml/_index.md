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
- [3.1. The Power section](#power)
- [3.2. The Brake section](#brake)
- [3.3. The Doors section](#doors)
- [3.4. The Sanders section](#sanders)
- [3.4. The Windscreen section](#windscreen)
- [4. The Coupler section](#coupler)
- [5. Miscellaneous Properties](#misc)

{{% /contents %}}

## <a name="overview"></a>■ 1. 개요

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

**Area** should be a positive floating-point number measured in square meters (m2) indicating the frontal area of a car when it is fully exposed to resisting air, for example when the car is the front car in the current nominal direction of travel. 

{{% command %}}  
**\<UnexposedFrontalArea>** *Area* **\</UnexposedFrontalArea>**  
{{% /command %}}

**Area** should be a positive floating-point number measured in square meters (m2) indicating the frontal area of a car when it is fully not exposed to resisting air, namely any car in the train other than the front car.

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

## <a name="power"></a>■ 3.1. The Power section

Motor cars may specifiy a **\<Power>** node.

This defines the acceleration curves and the power handle fitted to the car, and supports the following child nodes:

### 3.1.1. Acceleration Curves

{{% warning-nontitle %}}

In the **train.dat** acceleration curve figures are given for the train as a whole, and an internal calculation is performed to produce the per-car acceleration figures.
<br><br>
However, in **train.xml** acceleration curve figures apply to the current car only.

{{% /warning-nontitle %}}

------

The **\<AccelerationCurves>** child node should contain a list of acceleration curve nodes. These must be in ascending order, and should correspond to the number of power notches the train has.

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

The **\<Handle>** node specifies properties for the power handle, and supports the folowing properties:

{{% command %}}  
**\<Notches>** *NumberOfNotches* **\</Notches>**  
{{% /command %}}

**NumberOfNotches** should be a positive integer, setting the number of power notches.

{{% command %}}  
**\<SpringType>** *Type* **\</SpringType>** 
{{% /command %}}

{{% command-arguments %}}  
***Type***: The type of spring return fitted to this handle (if any).
{{% /command-arguments %}}

▸ Available options for *Type*:

{{% command-arguments %}}  
**None**: No spring return mechanism is fitted.  
**Single**: The spring return mechanism is reset when this handle is operated.  
**AnyHandle**: The spring return mechanism is reset when any power or brake handle is operated.
**AnyKey**: The spring return mechanism is reset when any keyboard key or joystick control is operated.
{{% /command-arguments %}}

## <a name="brake"></a>■ 3.2. The Brake section

The **\<Brake>** section specifies properties for the braking system of the car, and consists of the following child nodes, each corresponding the a component of the twin-pipe standard air-brake system:

### Air compressor

An optional **\<Compressor>** node, supporting the following properties:

{{% command %}}  
**\<Rate>** *CompressionRate* **\</Rate>**  
{{% /command %}}

**CompressionRate** should be a positive number, representing the compression rate in Pa/s.

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

### Auxiliary Reservoir

The **\<AuxiliaryReservoir>** node, supporting the following properties:

{{% command %}}  
**\<ChargeRate>** *Rate* **\</ChargeRate>**  
{{% /command %}}

**Rate** should be a positive number, representing the charge rate of the auxiliary reservoir from the main reservoir in Pa/s.

### Equalizing Reservoir

The **\<EqualizingReservoir>** node, supporting the following properties:

{{% command %}}  
**\<NormalPressure>** *Pressure* **\</NormalPressure>**  
{{% /command %}}

**Pressure** should be a positive number, representing the normal pressure of this reservoir in Pa.

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

### 3.2.2. Brake Handles

{{% note-withtitle %}}

#### *Driver and non-driver cars:* 

The properties within this node will only be interpreted if the car is specified as the driver car.

{{% /note-withtitle %}}

The **\<Handle>** node specifies properties for the brake handle, and supports the folowing properties:

{{% command %}}  
**\<Notches>** *NumberOfNotches* **\</Notches>**  
{{% /command %}}

**NumberOfNotches** should be a positive integer, setting the number of power notches.

{{% command %}}  
**\<SpringType>** *Type* **\</SpringType>** 
{{% /command %}}

{{% command-arguments %}}  
***Type***: The type of spring return fitted to this handle (if any).
{{% /command-arguments %}}

▸ Available options for *Type*:

{{% command-arguments %}}  
**None**: No spring return mechanism is fitted.  
**Single**: The spring return mechanism is reset when this handle is operated.  
**AnyHandle**: The spring return mechanism is reset when any power or brake handle is operated.
**AnyKey**: The spring return mechanism is reset when any keyboard key or joystick control is operated.
{{% /command-arguments %}}

## <a name="doors"></a>■ 3.3. The Doors section

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

## <a name="sanders"></a>■ 3.4. The Sanders section

The **\<Sanders>** section specifies the properties of the sanders fitted to this car, and supports the following properties:

{{% command %}}  
**Type** *Type*  
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
**Rate** *SandingRate*  
{{% /command %}}

{{% command-arguments %}}  
***SandingRate***: The rate at which sand is applied per second.
{{% /command-arguments %}}

{{% command %}}  
**SandLevel** *Level*  
{{% /command %}}

{{% command-arguments %}}  
***Level***: The initial starting level of sand, if not in shot mode.
{{% /command-arguments %}}

{{% command %}}  
**NumberOfShots** *Shots*  
{{% /command %}}

{{% command-arguments %}}  
***Shots***: The number of sand shots available.
{{% /command-arguments %}}

{{% command %}}  
**ApplicationTime** *Time*  
{{% /command %}}

{{% command-arguments %}}  
***Time***: When in shots mode, sets the duration of a sand shot in seconds.
{{% /command-arguments %}}

{{% command %}}  
**ActivationTime** *Time*  
{{% /command %}}

{{% command-arguments %}}  
***Time***: When in automatic mode, the amount of time before the system reacts and applies sand.
{{% /command-arguments %}}

## <a name="windscreen"></a>■ 3.5. The Windscreen section

The **\<Windscreen>** section specifies the properties of the windscreen, and should be used if you wish to animated a windscreen on a 3D cab using the inbuilt functionality. It supports the following properties:

{{% command %}}  
**NumberOfDrops* *Drops*  
{{% /command %}}

{{% command-arguments %}}  
***Drops***: The total number of drops on the windscreen.
{{% /command-arguments %}}

{{% command %}}  
**WipeSpeed* *Speed*  
{{% /command %}}

{{% command-arguments %}}  
***Speed***: The time in seconds for the wipers to make a single sweep of the windscreen.
{{% /command-arguments %}}

{{% command %}}  
**HoldTime* *Time*  
{{% /command %}}

{{% command-arguments %}}  
***Time***: The time in seconds for the wipers to hold at the hold position during a sweep.
{{% /command-arguments %}}

{{% command %}}  
**DropLife* *Life*  
{{% /command %}}

{{% command-arguments %}}  
***Life***: The life in seconds before a drop is eligible to be recycled when all drops are visible.
{{% /command-arguments %}}

{{% command %}}  
**RestPosition* *Position*  
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
**HoldPosition* *Position*  
{{% /command %}}

{{% command-arguments %}}  
**Position**: The hold position for the wipers.
{{% /command-arguments %}}

▸ Available options for *Position*:

{{% command-arguments %}}  
**Left**: The wipers hold on the left of the screen for *HoldTime* during their sweep.  
**Right**: The wipers hold on the right of the screen for *HoldTime* during their sweep.  
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

{{% command %}}  
**\<CanUncouple>** *Boolean* **\</CanUncouple>**  
{{% /command %}}

**Boolean** should be a boolean true / false value, determining whether this coupler may be uncoupled by the player.

## <a name="misc"></a>■ 5. Miscellaneous Properties

{{% command %}}  
**\<Plugin>** *PluginFile* **\</Plugin>**  
{{% /command %}}

**PluginFile** should contain the relative path to the security plugin DLL to load.

{{% command %}}  
**\<Description>** *Text* **\</Description>**  
{{% /command %}}

**Text** should contain the textual description for the train to display in the main menu.

{{% command %}}  
**\<HeadlightStates>** *NumberOfStates* **\</HeadlightStates>**  
{{% /command %}}

**NumberOfStates** should be the total number of states that the train headlight posesses.

*Note:* Headlight effects must be implemented by the train developer, using animation / panel properties. 