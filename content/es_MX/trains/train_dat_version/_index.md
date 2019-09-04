---
title: "El formato de archivo **train.dat**: Historia de Versión"
hidden: true
---

## ■ Contenidos

{{% contents %}}

- [1. BVE1](#bve1)
- [2. BVE2](#bve2)
- [3. openBVE](#openbve)

{{% /contents %}}

## <a name="bve1"></a>■ 1. BVE1

La siguientes versiones de cadenas de texto de BVE1 son reconocidas:

{{% code %}}  
BVE1200000  
BVE1210000  
BVE1220000  
{{% /code %}}

## <a name="bve2"></a>■ 2. BVE2

Las siguientes versiones de cadena de texto de BVE2 son reconocidas:

{{% code %}}  
BVE2000000  
OPENBVE  
{{% /code %}}

## <a name="openbve"></a>■ 3. openBVE

Desde openBVE 1.5.3.0 en adelante, el identificador ***OPENBVE*** puede ser opcional seguido por una cadena de texto de la versión.

El cambio para cada versión esta descrita abajo:

{{% code-inline "\- Added the *EbHandleBehaviour* parameter to the **#HANDLE** section."  %}}  
OPENBVE1530  
{{% /code-inline %}}

{{% code-inline "\- The parameters in the **#DELAY** section may now optionally be made up of a comma-separated list, to define the delay on a per-notch basis." %}}  
OPENBVE1534  
{{% /code-inline %}}

{{% code-inline "\- Two parameters- *LocoBrakeNotches* and *LocoBrakeType* added to the **#HANDLE** section." %}}  
OPENBVE1535  
{{% /code-inline %}}