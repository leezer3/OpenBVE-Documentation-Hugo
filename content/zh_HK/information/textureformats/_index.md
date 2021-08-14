---
title: "支持的材質格式"
linktitle: "材質格式"
weight: 4
---

這是官方支持的材質格式列表。 由於PNG格式無損壓縮，因此通常是首選。

{{% table %}}

| 格式      | 允許的副檔名 | 談論                                                      |
| ----------- | ----------------------- | ------------------------------------------------------------ |
| PNG         | .png                    | Preferred. Please be aware of the fact that using alpha channels significantly reduces performance when used in scenery objects and train exteriors. |
| Windows BMP | .bmp                    | 由於檔案過大，不建議使用。                      |
| JPEG        | .jpg, .jpeg             | 由於有損壓縮，不推薦使用。 |
| GIF         | .gif                    | 不建議使用，因為降低了色彩深度（除非對圖像已足夠）。 |
| DDS         | .dds                    | Not reccomended for native content, only for content exported by external 3D editors. |
| ACE         | .ace                    | Proprietary format used for MSTS content.                    |

{{% /table %}}

##### ● Sizes of textures

The widths and heights of textures should be a power of two, e.g. 1, 2, 4, 8, 16, 32, 64, 128, 256, and so on. While this is not a requirement, having textures whose sizes are not power-of-two increases loading times, increases storage requirements and introduces blurriness, because these textures have to be converted to a power-of-two size by openBVE.

##### ● PNG file optimization

PNG is a lossless image compression format. As with many other compression formats, the encoder can make a wide range of choices to result in different outcomes - some encoders can produce smaller files, others larger files. Normally, image editing software do not produce the smallest PNG files, which is why there are a number of tools with the sole purpose of squeezing every last bit out of PNG files. You are invited to use such tools in order to further reduce storage requirements. Windows users can use the convenient [PNGGauntlet](http://brh.numbera.com/software/pnggauntlet/) , while others can find a list of tools [here](http://optipng.sourceforge.net/pngtech/optipng.html)  (scroll down to 3. PNG (lossless) optimization programs).