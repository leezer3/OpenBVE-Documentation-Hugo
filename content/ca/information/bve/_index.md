---
title: Diferències amb el BVE Trainsim
linktitle: Diferències amb el BVE Trainsim
weight: 9
---

Aquesta pàgina enumera les diferències **incompatibles** entre l'openBVE i el BVE Trainsim pel que fa als formats de fitxer; és a dir, característiques de continguts per al BVE Trainsim que s'interpreten de manera diferent a l'openBVE i tenen un resultat incompatible. Fins ara només es coneix una incompatibilitat d'aquesta mena.

Please note that for all incompatible differences that are mentioned on this page, the resolution is the same: It is considered to be more important to provide stable and consistent features in openBVE than to make backward-incompatible changes between versions just to increase similarity to BVE Trainsim. All differences depicted on this page will thus be permanent.

## ■ Ordre Track.Signal (rutes CSV i RW)

The Track.Signal command (alternatively: Track.Sig) is used to create a default Japanese-style signal in CSV routes (alternative spellings are used in RW routes).

A l'openBVE, l'ordre Track.Signal accepta els arguments següents:

{{% command %}}  
**Track.Signal** *Aspects*; *~~Unused~~*; *X*; *Y*; <u>*Yaw*</u>; *Pitch*; *Roll*  
{{% /command %}}

Al BVE Trainsim, l'ordre Track.Signal accepta els arguments següents:

{{% command %}}  
**Track.Signal** *Aspects*; *Label*; *X*; *Y*; <u>*Type*</u>  
{{% /command %}}

The *Label* parameter in BVE Trainsim is a textual description of the signal which serves no function in openBVE (thus termed *Unused* in the documentation).

BVE Trainsim features a *Type* argument which can take values 1, 2 or 3. It is used to denote different types of signals, e.g. home signal vs. departure signal. By mere accident, this argument was never included in openBVE, while subsequently, the need arose to include *Yaw*, *Pitch* and *Roll* arguments to provide for more control over a signal head's orientation. Consequently, BVE Trainsim's *Type* and openBVE's *Yaw* argument incompatibly overlap. If a route created for BVE Trainsim includes the *Type* argument, it will be (mis)interpreted as a yaw of up to 3 degrees in openBVE. Usually, this small angle should not produce noticable differences, especially given that the parameter is not often used anyway.
