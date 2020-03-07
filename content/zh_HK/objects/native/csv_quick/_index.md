---
title: "**.csv** 物件格式 - 快速参考"
hidden: true
---

<font color="Red">CreateMeshBuilder</font>  
**AddVertex**, *vX*, *vY*, *vZ*, *nX*, *nY*, *nZ*  
**AddFace**, *v<sub>1</sub>*, *v<sub>2</sub>*, *v<sub>3</sub>*, ..., *v<sub>n</sub>*  
**AddFace2**, *v<sub>1</sub>*, *v<sub>2</sub>*, *v<sub>3</sub>*, ..., *v<sub>n</sub>*  
**Cube**, *HalfWidth*, *HalfHeight*, *HalfDepth*  
**Cylinder**, *n*, *UpperRadius*, *LowerRadius*, *Height*  
**Translate**, *X*, *Y*, *Z*  
**TranslateAll**, *X*, *Y*, *Z*  
**Scale**, *X*, *Y*, *Z*  
**ScaleAll**, *X*, *Y*, *Z*  
**Rotate**, *X*, *Y*, *Z*, *Angle*  
**RotateAll**, *X*, *Y*, *Z*, *Angle*  
**Shear**, *dX*, *dY*, *dZ*, *sX*, *sY*, *sZ*, *Ratio*  
**ShearAll**, *dX*, *dY*, *dZ*, *sX*, *sY*, *sZ*, *Ratio*  
**SetColor**, *Red*, *Green*, *Blue*, *Alpha*  
**SetEmissiveColor**, *Red*, *Green*, *Blue*  
**SetBlendMode**, { **Normal** | **Additive** }, *GlowHalfDistance*, { **DivideExponent2** | **DivideExponent4** }  
**LoadTexture**, *DaytimeTexture*, *NighttimeTexture*  
**SetDecalTransparentColor**, *Red*, *Green*, *Blue*  
**SetTextureCoordinates**, *VertexIndex*, *X*, *Y* 