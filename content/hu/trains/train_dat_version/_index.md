---
title: "The **train.dat** file format: Version History"
hidden: true
---

## ■ Tartalom

{{% contents %}}

- [1. BVE1](#bve1)
- [2. BVE2](#bve2)
- [3. openBVE](#openbve)

{{% /contents %}}

## <a name="bve1"></a>■ 1. BVE1

The following BVE1 version strings are recognised:

{{% code %}}  
BVE1200000  
BVE1210000  
BVE1220000  
{{% /code %}}

## <a name="bve2"></a>■ 2. BVE2

The following BVE2 version strings are recognised: 

{{% code %}}  
BVE2000000  
OPENBVE  
{{% /code %}}

## <a name="openbve"></a>■ 3. openBVE

From openBVE 1.5.3.0 onwards, the ***OPENBVE*** identifier may be optionally followed by a version string.

The changes for each version are described below:

{{% code-inline "\- Added the *EbHandleBehaviour* parameter to the **#HANDLE** section."  %}}  
OPENBVE1530  
{{% /code-inline %}}

{{% code-inline "\- The parameters in the **#DELAY** section may now optionally be made up of a comma-separated list, to define the delay on a per-notch basis." %}}  
OPENBVE1534  
{{% /code-inline %}}

{{% code-inline "\- Two parameters- *LocoBrakeNotches* and *LocoBrakeType* added to the **#HANDLE** section." %}}  
OPENBVE1535  
{{% /code-inline %}}