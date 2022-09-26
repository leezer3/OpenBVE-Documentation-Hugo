---
title: "OpenBVE用に作成されたアドオンの配布"
linktitle: "アドオンの配布"
weight: 7
---

Whether you have written a route, a train or a plugin, there are a few things you should be aware of before distributing your add-ons. As openBVE is a cross-platform simulator intended with international interoperability in mind, your add-ons should be, too.

## ■ テキストファイルとエンコーディング

Whichever text file you are about to include in your distribution, including readme files, you should make sure that the file can be correctly processed internationally. The default encoding for all text files accessed by openBVE is UTF-8. For routes and associated objects, you can also use a different encoding, but then, the user has to select the specific encoding from a list. The same situation applies to trains and associated files. If you encode your text files in anything else but UTF-8, you must inform the user about your choice, or otherwise, the user might end up with garbage characters and potentially incorrectly parsed files. Using UTF-8 is the preferred choice, while using legacy encodings is acceptable, but discouraged. Please note that all files in a route or train must use the same encoding as it is neither currently possible nor feasible for the user to select the encoding of every individual file.

許容できる行動と出来ない行動:

{{% table-nonheader %}}

| <font color="Green">✓</font> | テキストファイルをUTF-8として保存                               |
| ---------------------------- | ------------------------------------------------------------ |
| <font color="Green">✓</font> | テキストファイルを、バイト順マーク(byte order mark)付きのUnicodeエンコーディングで保存します。 |
| <font color="Red">✗</font>   | テキストファイルをUnicode以外のエンコーディングで保存            |
| <font color="Red">✗</font>   | 路線や車両フォルダのファイル毎に、異なるエンコーディングを使用する   |

{{% /table-nonheader %}}

## ■ アーカイブとインストーラーとの比較

路線や車両をパッケージ化する時は、ダウンロードのサイズがサーバーの容量などで制限を受けるなどの理由により正当化されない限りは、複数の小さなアーカイブではなく単一のアーカイブを使用する事を検討してください。 プラットフォーム固有のインストーラーは移植性がないため、絶対に使用しないでください(代わりにアーカイブも提供する場合は除く)。 プラットフォーム固有のインストーラーは、WindowsのEXEファイル、LinuxのRPMリポジトリ、及びMacのDMGファイルが含まれます。

許容できる行動と出来ない行動:

{{% table-nonheader %}}

| <font color="Green">✓</font> | 7Z, ZIP, TAR.GZ, 等のアーカイブ形式を使用します。         |
| ---------------------------- | ----------------------------------------------------------- |
| <font color="Red">✗</font>   | 特定のOSだけに依存する形式、EXE, RPM, DMG, などで保存 |

{{% /table-nonheader %}}

## ■ ファイル名とアーカイブ

通常は、任意のファイル名を使用できます。つまり、ラテン語、日本語、中国語などの任意の文字を含めることが出来ます。ただし、使用するアーカイブ形式がUnicodeのファイル名をサポートしている事を確認する必要があります。 残念ながら人気のあるZIP形式はUnicodeのファイル名をサポートしていませんが、例えば [7Z](https://www.7-zip.org/) はサポートしています。 または、ASCII 文字に制限します。 例 A-Z, a-z, 0-9。

許容できる行動と出来ない行動:

{{% table-nonheader %}}

| <font color="Green">✓</font> | Unicodeのファイル名をサポートするアーカイブ形式を使用する(例: 7Z) |
| ---------------------------- | ------------------------------------------------------------ |
| <font color="Green">✓</font> | Unicodeをサポートしないアーカイブ形式を使用し、ASCIIファイル名に制限してください。 |
| <font color="Red">✗</font>   | Unicodeをサポートしていないが、Unicodeのファイル名を使用するアーカイブ形式を使用してください。 |

{{% /table-nonheader %}}

## ■ アーカイブとフォルダの構造

路線や車両を配布する時は、常に完全なフォルダ構造、すなわち **Railway** と **Train** フォルダを含める必要があります。これにより、コンテンツをどこに解凍する必要が有るかをユーザーが理解しやすくなります。例えば Railway\Sound folder 以下へ解凍されるはずの *YourNameHere* などのサブディレクトリを含めないでください。 一般的に、経験が豊富なユーザーだけが、ファイルまたはその拡張子を調べることで、そのようなファイルをどこに配置するかを理解することが出来ます。

許容できる行動と出来ない行動:

{{% table-nonheader %}}

| <font color="Green">✓</font> | 2つの基本フォルダ **Railway** または **Train** を含めます。両方含めるのが最適です。 |
| ---------------------------- | ------------------------------------------------------------ |
| <font color="Red">✗</font>   | いくつかのサブディレクトリまたはファイルを直接含めて、ユーザーがこれを処理する方法を理解することを期待してください。 |

{{% /table-nonheader %}}

## ■ エラーと警告

Generally, your route should be free of errors. Please note that openBVE distinguishes between errors and warnings. An error is something definately wrong with your coding that should be fixed immediately. A warning is usually only raised to encourage inspection of potentially ambiguous code or code that might not have been meant the way it was written. In order to inspect your routes and trains for errors and warnings, go to the Options menu in openBVE and enable reporting them. RouteViewer and ObjectViewer always report such messages. Please note that the arious tools and openBVE itself might report a different set of messages as they don't share all the same functionality. Distributing add-ons containing errors might give users the impression that something was incompletely downloaded or was incorrectly packaged, and should generally be voided.

許容できる行動と出来ない行動:

{{% table-nonheader %}}

| <font color="Green">✓</font> | *オプション* メニューでエラーと警告のレポートを有効にし、アドオンを調べます。 |
| ---------------------------- | ------------------------------------------------------------ |
| <font color="Green">✓</font> | 最終的にはエラーのない (警告を受けることのない) アドオンを配布します。 |
| <font color="Red">✗</font>   | エラーレポートを無効にしたり、メッセージを無視して、アドオンのエラーを検査しないでください。 |
| <font color="Red">✗</font>   | エラーを含むアドオンを配布します。                   |

{{% /table-nonheader %}}

## ■ プラグインを使用することを考慮した路線や車両

If you include plugins in your train, they should be only of the .NET type. Older Windows-only plugins are retained for backward compatibility, but should not be distributed any longer with new releases. If you cannot remove the dependency on a Windows-only plugin for the time being, then at least design your routes and trains so that they work with the default safety system. You can test how your train behaves without a plugin by deleting the ats.cfg file (or by temporarily enaming it).

## ■ 取扱説明書

あなたの路線の標識と信号、そしてあなたの列車の操作方法の概要は、一般的に整然としたものです。 そうしないと、特定の地域に慣れていないユーザーは記号の意味を推測したり、どのキーがどの操作に対応するかを推測しなければならない可能性があります。もし可能であれば、英語版の説明も提供してください。これにより、一般的にそれらを理解できる人が増えます。
