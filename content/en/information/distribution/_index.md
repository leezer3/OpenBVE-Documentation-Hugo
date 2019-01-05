---
title: "Distributing add-ons created for openBVE"
linktitle: "Distributing add-ons"
weight: 7
---

Whether you have written a route, a train or a plugin, there are a few things you should be aware of before distributing your add-ons. As openBVE is a cross-platform simulator intended with international interoperability in mind, your add-ons should be, too.



## ■ Text files and encodings

Whichever text file you are about to include in your distribution, including readme files, you should make sure that the file can be correctly processed internationally. The default encoding for all text files accessed by openBVE is UTF-8. For routes and associated objects, you can also use a different encoding, but then, the user has to select the specific encoding from a list. The same situation applies to trains and associated files. If you encode your text files in anything else but UTF-8, you must inform the user about your choice, or otherwise, the user might end up with garbage characters and potentially incorrectly parsed files. Using UTF-8 is the preferred choice, while using legacy encodings is acceptable, but discouraged. Please note that all files in a route or train must use the same encoding as it is neither currently possible nor feasible for the user to select the encoding of every individual file.

Acceptable and not acceptable practices:

{{% table-nonheader %}}

| <font color="Green">✓</font> | Save your text files as UTF-8.                               |
| ---------------------------- | ------------------------------------------------------------ |
| <font color="Green">✓</font> | Save your text files in any Unicode encoding with a byte order mark. |
| <font color="Red">✗</font>   | Save your text files in any non-Unicode encoding.            |
| <font color="Red">✗</font>   | Use different encodings for each file in a route or train.   |
{{% /table-nonheader %}}

## ■ Archives versus installers

When packaging a route or train, consider using a single archive instead of multiple smaller ones, unless the size of the download justifies splitting the archive. Never use platform-specific installers as they are not portable (unless you also provide an archive as an alternative). Platform-specific installers include Windows EXE files, Linux RPM repositories and Mac DMG files.

Acceptable and not acceptable practices:

{{% table-nonheader %}}

| <font color="Green">✓</font> | Use an archive format such as 7Z, ZIP, TAR.GZ, etc.         |
| ---------------------------- | ----------------------------------------------------------- |
| <font color="Red">✗</font>   | Use a platform-specific format, such as EXE, RPM, DMG, etc. |

{{% /table-nonheader %}}

## ■ Files names and archives

Generally, you can use any file name you want, that is, include any characters such as Latin, Japanese, Chinese, and the like. However, you need to make very sure that the archive format you use supports Unicode file names then. If not, the user might be unable to extract your files correctly, leading to a series of files that cannot be found later. Unfortunately, the popuplar ZIP format does not support Unicode file names, while for example [7Z](https://www.7-zip.org/) does. Alternatively, restrict yourself to ASCII characters, e.g. A-Z, a-z, 0-9.

Acceptable and not acceptable practices:

{{% table-nonheader %}}

| <font color="Green">✓</font> | Use an archive format that supports Unicode files names (e.g. 7Z) |
| ---------------------------- | ------------------------------------------------------------ |
| <font color="Green">✓</font> | Use an archive format that doesn't support Unicode and restrict yourself to ASCII file names. |
| <font color="Red">✗</font>   | Use an archive format that doesn't support Unicode but use Unicode files names. |

{{% /table-nonheader %}}

## ■ Archives and the folder structure

You should always include the full folder structure, that is, **Railway** and **Train**, when istributing outes or trains. This will make it easiest for people to understand where they need to extract the ontent to. Never just include a subdirectory such as *YourNameHere* that is supposed to be extracted to the Railway\Sound folder, for example. Only the more experienced users will enerally e able to figure out where to put such content to by examining the files or their extensions.

Acceptable and not acceptable practices:

{{% table-nonheader %}}

| <font color="Green">✓</font> | Include the two base folders **Railway** or **Train**, best both. |
| ---------------------------- | ------------------------------------------------------------ |
| <font color="Red">✗</font>   | Just include some subdirectory or files directly and expect users to figure out how to handle this. |

{{% /table-nonheader %}}

## ■ Errors and warnings

Generally, your route should be free of errors. Please note that openBVE distinguishes between errors and warnings. An error is something definately wrong with your coding that should be fixed immediately. A warning is usually only raised to encourage inspection of potentially ambiguous code or code that might not have been meant the way it was written. In order to inspect your routes and trains for errors and warnings, go to the Options menu in openBVE and enable eporting them. RouteViewer and ObjectViewer always report such messages. Please note that the arious tools and openBVE itself might report a different set of messages as they don't share all the ame functionality. Distributing add-ons containing errors might give users the impression that omething was incompletely downloaded or was incorrectly packaged, and should generally be voided.

Acceptable and not acceptable practices:

{{% table-nonheader %}}

| <font color="Green">✓</font> | Activate the report of errors and warnings in the *Options* menu and inspect your add-ons. |
| ---------------------------- | ------------------------------------------------------------ |
| <font color="Green">✓</font> | Distribute add-ons that are eventually free of errors (not necessarily of warnings). |
| <font color="Red">✗</font>   | Never inspect your add-ons for errors by disabling the error report or by ignoring the messages. |
| <font color="Red">✗</font>   | Distribute an add-on that contains errors.                   |

{{% /table-nonheader %}}

## ■ Routes and trains designed for using plugins

If you include plugins in your train, they should be only of the .NET type. Older Windows-only plugins are retained for backward compatibility, but should not be distributed any longer with new releases. If you cannot remove the dependency on a Windows-only plugin for the time being, then at least design your routes and trains so that they work with the default safety system. You can test how your train behaves without a plugin by deleting the ats.cfg file (or by temporarily enaming it).



## ■ Operation manuals

An overview on the signs and signalling in your route, as well as on how to operate your train, is generally in order. Otherwise, users unfamiliar with the particular territory might be left with guessing the meaning of signs, or have to guess which keys serve which purpose. If you can, provide an English version of the instruction, as this generally increases the number of people who are able to understand it.