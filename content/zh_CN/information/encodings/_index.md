---
title: "字符编码"
weight: 1
---

<font color="Gray">本页面为您讲解字符编码为何物，及应当如何运用正确的编码。</font>

■ 总览
------

字符编码指的是将文字转译成存储到磁盘上的二进制代码的方式。在计算机最早被发明的时候，文本中的每个字符被一个字节表示，但一个字节的数据量只能表示256种字符。因此，随着全世界的人们开始使用计算机，为了让当地的文字也能存储到计算机里，人们发明了许多种完全不同的字符编码方式。问题就在于此，如果一段文字数据的编码方式未被预先给出，误解了编码就会导致乱码字符出现。

这是一段日文文字，以Shift_JIS编码 (如无法显示请安装合适的日文字体)：

{{% code %}}  
ひらがなカタカナ漢字  
{{% /code %}}

这是它被以Shift_JIS方式编码后产生的字节数据：

{{% code %}}  
82 D0 82 E7 82 AA 82 C8 83 4A 83 5E 83 4A 83 69 8A BF 8E 9A  
{{% /code %}}

假如某程序不知道它是由Shift_JIS编码，而误用了 ISO 8859-1 (Latin-1) 字符编码来解析它：

{{% code %}}  
‚Ð‚ç‚ª‚ÈƒJƒ^ƒJƒiŠ¿Žš  
{{% /code %}}

一般来说，一种字符编码方式设计时只囊括了特定一种书写系统的字符，十分不便。因此，人们发明了Unicode，即万国码，一种几乎囊括了全球所有书写系统中字符的编码方式，来解决这个问题。

虽然Unicode时至今日已被广泛采用，用起来还是会有些问题。首先，Unicode其实并不是一种字符编码，而Unicode转换格式(UTF)才是真正编码文字的方式。常用的转换格式为UTF-16和UTF-8。

Route and train files are usually, for compatibility reasons, allowed to be encoded in any arbitrary encoding. As the encoding is not known in advance, the user will need to select the correct encoding for the route and the train in the settings tab in the main menu. Of course this is a nuisance and should be avoided somehow.

## ■ The Byte Order Mark

UTF-16 descends from a character encoding (UTC-2) which always used two bytes to encode one character. As such, the order of those two bytes matters. In order to know in which order the bytes appear, a so-called byte order mark is frequently prepended to the text, usually automatically and transparently by the text editor. The byte order mark provides decoders a means of detecting in which byte order the file was saved in. Additionally, the byte order mark provides a fairly safe way of detecting that the text file is saved in Unicode in the first place.

While not technically necessary, the byte order mark is also frequently used for UTF-8. As UTF-8 does not have a byte order issue, the sole purpose of using a byte order mark with UTF-8 is to provide a means to flagging the file as being encoded in UTF-8.

As said, while Unicode allows to encode virtually all characters used in all writing systems around the world, it does not necessarily make working with text files easier if the encoding to be used was not agreed on.

Using a byte order mark provides openBVE the ability to automatically detect the encoding for each individual file. If you have a good text editor, you will not only be able to select the encoding manually, but also if you want to save with a byte order mark or not. Notepad (Windows) always saves with a byte order mark if UTF-8 is selected as the character encoding upon saving the file, to make an acceptable example.

Technically, the byte order mark is the first bytes of a particular text file. The byte order marks which can be automatically detected by openBVE are:

{{% table %}}

| Encoding               | Hexadecimal representation |
| ---------------------- | -------------------------- |
| UTF-8                  | EF BB BF                   |
| UTF-16 (big endian)    | FE FF                      |
| UTF-16 (little endian) | FF FE                      |
| UTF-32 (big endian)    | 00 00 FE FF                |
| UTF-32 (little endian) | FF FE 00 00                |

{{% /table %}}

You are encouraged to always save text files in one of those encodings with a byte order mark in order for openBVE to automatically detect the encoding used.