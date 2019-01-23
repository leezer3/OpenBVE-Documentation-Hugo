---
title: "The **ats.cfg** file format"
linktitle: "The ats.cfg file"
weight: 8
---

The ats.cfg file is a plain text file consisting of a single line: the relative path to the plugin that is to be used.

{{% code "*Example of an ats.cfg file:* " %}}  
`myplugin.dll`  
{{% /code %}}  

If you don't include the ats.cfg file, the default plugin for trains is used which provides basic implementations of ATS and ATC. Please find more information about the default safety systems [here](https://openbve-project.net/play-japanese/), in the tutorials on the left, and [here]({{< ref "/trains/openbveats/_index.md" >}}).