---
title: "openBVE에서만 사용 가능한 기능"
linktitle: "추가된 기능들"
weight: 7
---

경로, 열차, 플러그인을 모두 작성했든 간에 추가 기능을 배포하기 전에 주의해야 할 몇 가지 사항이 있습니다. openBVE는 국제 상호 운용성을 염두에 두고 설계된 크로스 플랫폼 시뮬레이터이며, 추가 기능 역시 마찬가지입니다.

## ■ 텍스트 파일 및 인코딩

Readme 파일등 배포에 포함할 텍스트 파일은 국제적으로 올바르게 처리될 수 있는지 확인하십시오. openBReadme 파일등 배포에 포함할 텍스트 파일은 국제적으로 올바르게 처리될 수 있는지 확인하십시오. openBVE에서 액세스 가능한 모든 텍스트 파일의 기본 인코딩은 UTF-8입니다.VE에서 액세스 가능한 모든 텍스트 파일의 기본 인코딩은 UTF-8입니다. 경로와 관련 객체의 경우 다른 인코딩을 사용할 수도 있지만, 사용자가 목록에서 특정 인코딩을 선택해야 합니다. 경로와 관련 객체의 경우 다른 인코딩을 사용할 수도 있지만, 사용자가 목록에서 특정 인코딩을 선택해야 합니다. 열차 및 관련 파일에도 동일한 상황이 적용됩니다. 열차 및 관련 파일에도 동일한 상황이 적용됩니다. UTF-8을 제외한 다른 항목에 텍스트 파일을 인코딩하는 경우 사용자에게 자신의 선택에 대해 알려야 하며 그렇지 않으면 구문을 잘못 분석하게 될 수 있습니다. UTF-8을 제외한 다른 항목에 텍스트 파일을 인코딩하는 경우 사용자에게 자신의 선택에 대해 알려야 하며 그렇지 않으면 구문을 잘못 분석하게 될 수 있습니다. UTF-8을 사용하는 것이 선호되는 반면, UTF-8 인코딩 외의 형식을 사용하는 것은 허용되지만 권장되지 않습니다. UTF-8을 사용하는 것이 선호되는 반면, UTF-8 인코딩 외의 형식을 사용하는 것은 허용되지만 권장되지 않습니다. 경로나 열차의 모든 파일은 사용자가 모든 개별 파일의 인코딩을 선택할 수 없거나 실행 가능하지 않으므로 동일한 인코딩을 사용해야 한다는 점에 유의하십시오. 경로나 열차의 모든 파일은 사용자가 모든 개별 파일의 인코딩을 선택할 수 없으므로 동일한 인코딩을 사용해야 한다는 점에 유의하십시오.

허용되는 구문 및 허용되지 않는 구문:허용되는 것 및 허용되지 않는 것:

{{% table-nonheader %}}

| <font color="Green">✓</font> | 너의 텍스트 파일을 UTF-8로 저장한다.                               |
| ---------------------------- | ------------------------------------------------------------ |
| <font color="Green">✓</font> | 너의 텍스트 파일을 바이트 순서 표식(BOM) 없는 어떠한 유니코드 인코딩으로 저장한다. |
| <font color="Red">✗</font>   | 너의 텍스트 파일을 유니코드 인코딩이 아닌 것으로 저장한다.            |
| <font color="Red">✗</font>   | 루트나 열차의 각각의 파일에 각기 다른 인코딩을 사용한다.   |

{{% /table-nonheader %}}

## ■ 아카이브 설치 프로그램

경로나 열차를 압축할 때 파일 크기가 최대 용량을 초과하지 않는한 분할압축을 사용하지 않을것을 권장 드립니다.

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

You should always include the full folder structure, that is, **Railway** and **Train**, when distributing routes or trains. This will make it easiest for people to understand where they need to extract the content to. Never just include a subdirectory such as *YourNameHere* that is supposed to be extracted to the Railway\Sound folder, for example. Only the more experienced users will generally be able to figure out where to put such content to by examining the files or their extensions.

Acceptable and not acceptable practices:

{{% table-nonheader %}}

| <font color="Green">✓</font> | Include the two base folders **Railway** or **Train**, best both. |
| ---------------------------- | ------------------------------------------------------------ |
| <font color="Red">✗</font>   | Just include some subdirectory or files directly and expect users to figure out how to handle this. |

{{% /table-nonheader %}}

## ■ Errors and warnings

Generally, your route should be free of errors. Please note that openBVE distinguishes between errors and warnings. An error is something definately wrong with your coding that should be fixed immediately. A warning is usually only raised to encourage inspection of potentially ambiguous code or code that might not have been meant the way it was written. In order to inspect your routes and trains for errors and warnings, go to the Options menu in openBVE and enable reporting them. RouteViewer and ObjectViewer always report such messages. Please note that the arious tools and openBVE itself might report a different set of messages as they don't share all the same functionality. Distributing add-ons containing errors might give users the impression that something was incompletely downloaded or was incorrectly packaged, and should generally be voided.

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
