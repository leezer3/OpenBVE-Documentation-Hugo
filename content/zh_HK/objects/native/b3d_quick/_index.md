---
title: "**.b3d** 物件格式 - 快速参考"
hidden: true
---

<font color="Red">CreateMeshBuilder</font>  
**AddVertex**, *vX*, *vY*, *vZ*, *nX*, *nY*, *nZ*  
**AddFace**, *v<sub>1</sub>*, *v<sub>2</sub>*, *v<sub>3</sub>*, ..., *v<sub>n</sub>*  
**AddFace2**, *v<sub>1</sub>*, *v<sub>2</sub>*, *v<sub>3</sub>*, ..., *v<sub>n</sub>*  
**Cube**, *一半寬度*, *一半高度*, *一半深度*  
**Cylinder**, *n*, *上半徑*, *下半徑*, *高度*  
**Translate**, *X*, *Y*, *Z*  
**TranslateAll**, *X*, *Y*, *Z*  
**Scale**, *X*, *Y*, *Z*  
**ScaleAll**, *X*, *Y*, *Z*  
**Rotate**, *X*, *Y*, *Z*, *角度*  
**RotateAll**, *X*, *Y*, *Z*, *角度*  
**Shear**, *dX*, *dY*, *dZ*, *sX*, *sY*, *sZ*, *比率*  
**ShearAll**, *dX*, *dY*, *dZ*, *sX*, *sY*, *sZ*, *比率*  
**SetColor**, *紅*, *綠*, *藍*, *透明度*  
**SetEmissiveColor**, *紅*, *綠*, *藍*  
**SetBlendMode**, { **Normal** | **Additive** }, *GlowHalfDistance*, { **DivideExponent2** | **DivideExponent4** }  
**LoadTexture**, *日間材質*, *晚間材質*  
**SetDecalTransparentColor**, *紅*, *綠*, *藍*  
**SetTextureCoordinates**, *VertexIndex*, *X*, *Y* 