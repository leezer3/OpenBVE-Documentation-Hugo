---
title: "The **ats.cfg** file format"
linktitle: "The ats.cfg file"
weight: 8
---

The ats.cfg file is a plain text file consisting of a single line: the relative path to the plugin that is to be used.

Example of an ats.cfg file:
{{% command %}}  
**myplugin.dll**
{{% /command %}}

If you don't include the ats.cfg file, or the file referenced in it is missing, the default plugin for trains is used which provides basic implementations of ATS and ATC. 

Please find more information about the default safety systems [here](https://openbve-project.net/play-japanese/), in the tutorials on the left, and [here](http://odakyufan.zxq.net/openbveats/index.html). 
