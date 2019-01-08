---
title: "Differences compared to BVE Trainsim"
linktitle: "Vs. BVE Trainsim"
weight: 9
---

This page lists **incompatible** differences between openBVE and BVE Trainsim regarding the file formats, i.e. features of content developed for BVE Trainsim that is interpreted differently in openBVE with an incompatible outcome. As of the moment, only one such incompatibility is known.

Please note that for all incompatible differences that are mentioned on this page, the resolution is the same: It is considered to be more important to provide stable and consistent features in openBVE than to make backward-incompatible changes between versions just to increase similarity to BVE Trainsim. All differences depicted on this page will thus be permanent.

## ■ The Track.Signal command  (CSV and RW routes)

The Track.Signal command (alternatively: Track.Sig) is used to create a default Japanese-style signal in CSV routes (alternative spellings are used in RW routes).

In openBVE, the Track.Signal command takes the following arguments:

{{% command %}}  
**Track.Signal** *Aspects*; *~~Unused~~*; *X*; *Y*; <u>*Yaw*</u>; *Pitch*; *Roll*  
{{% /command %}}

In BVE Trainsim, the Track.Signal command takes the following arguments:

{{% command %}}  
**Track.Signal** *Aspects*; *Label*; *X*; *Y*; <u>*Type*</u>  
{{% /command %}}

The *Label* parameter in BVE Trainsim is a textual description of the signal which serves no function in openBVE (thus termed *Unused* in the documentation).

BVE Trainsim features a *Type* argument which can take values 1, 2 or 3. It is used to denote different types of signals, e.g. home signal vs. departure signal. By mere accident, this argument was never included in openBVE, while subsequently, the need arose to include *Yaw*, *Pitch* and *Roll* arguments to provide for more control over a signal head's orientation. Consequently, BVE Trainsim's *Type* and openBVE's *Yaw* argument incompatibly overlap. If a route created for BVE Trainsim includes the *Type* argument, it will be (mis)interpreted as a yaw of up to 3 degrees in openBVE. Usually, this small angle should not produce noticable differences, especially given that the parameter is not often used anyway.
