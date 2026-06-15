---
title: "The Microsoft Train Simulator **.s** object format"
linktitle: "Microsoft Train Simulator (.s)"
weight: 3
---

![construction_64](/images/construction_64.png)

openBVE supports most basic features of the Microsoft Train Simulator .s object format. 

Both the compressed binary, and the uncompressed textual variants are supported. 

The following is a non-exhaustive list of unsupported functions:

- Lighting
- Custom shaders
- Reflection / luminosity

Supported animation keys:

- **PANTOGRAPHBOTTOM**
- **PANTOGRAPHTOP**

Supported animation keys (when loaded via a MSTS consist):

- **WHEELS**
- **ROD**
- **PISTON**

Other animation keys are currently unsupported.

