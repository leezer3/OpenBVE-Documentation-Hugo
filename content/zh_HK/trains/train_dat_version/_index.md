---
title: "**train.dat** 檔案格式: 版本歷史"
hidden: true
---

## ■ 目錄

{{% contents %}}

- [1. BVE1](#bve1)
- [2. BVE2](#bve2)
- [3. openBVE](#openbve)

{{% /contents %}}

## <a name="bve1"></a>■ 1. BVE1

以下的 BVE1 版本的關鍵字會被認到:

{{% code %}}  
BVE1200000  
BVE1210000  
BVE1220000  
{{% /code %}}

## <a name="bve2"></a>■ 2. BVE2

以下的 BVE2 版本的關鍵字會被認到:

{{% code %}}  
BVE2000000  
OPENBVE  
{{% /code %}}

## <a name="openbve"></a>■ 3. OpenBVE

由OpenBVE 1.5.3.0 之後, ***OPENBVE*** 識別字後面可以跟一個版本。

每個版本的更改如下所述:

{{% code-inline "\- Added the *EbHandleBehaviour* parameter to the **#HANDLE** section."  %}}  
OPENBVE1530  
{{% /code-inline %}}

{{% code-inline "\- The parameters in the **#DELAY** section may now optionally be made up of a comma-separated list, to define the delay on a per-notch basis." %}}  
OPENBVE1534  
{{% /code-inline %}}

{{% code-inline "\- Two parameters- *LocoBrakeNotches* and *LocoBrakeType* added to the **#HANDLE** section." %}}  
OPENBVE1535  
{{% /code-inline %}}