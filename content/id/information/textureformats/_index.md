---
title: "Format gambar yang didukung"
linktitle: "Format gambar skin / tekstur"
weight: 4
---

Berikut ini adalah list format yang bisa dipakai untuk skin. Biasanya gambar PNG dipakai karena ukurannya yang kecil.

{{% table %}}

| Format      | Ekstensi yang dapat dipakai | Catatan                                                      |
| ----------- | ----------------------- | ------------------------------------------------------------ |
| PNG         | .png                    | Disarankan. Sebaiknya kurangi penggunaan Alpha (transparan) karena bisa membuat performa PC menurun. |
| Windows BMP | .bmp                    | Tidak disarankan karena size terlalu besar.                      |
| JPEG        | .jpg, .jpeg             | Tidak disarankan karena format kompresi yang buruk. |
| GIF         | .gif                    | Tidak disarankan karena komposisi warna yang sedikit. |
| DDS         | .dds                    | Not reccomended for native content, only for content exported by external 3D editors. |
| ACE         | .ace                    | Proprietary format used for MSTS content.                    |

{{% /table %}}

##### ● Sizes of textures

The widths and heights of textures should be a power of two, e.g. 1, 2, 4, 8, 16, 32, 64, 128, 256, and so on. While this is not a requirement, having textures whose sizes are not power-of-two increases loading times, increases storage requirements and introduces blurriness, because these textures have to be converted to a power-of-two size by openBVE.

##### ● PNG file optimization

PNG is a lossless image compression format. As with many other compression formats, the encoder can make a wide range of choices to result in different outcomes - some encoders can produce smaller files, others larger files. Normally, image editing software do not produce the smallest PNG files, which is why there are a number of tools with the sole purpose of squeezing every last bit out of PNG files. You are invited to use such tools in order to further reduce storage requirements. Windows users can use the convenient [PNGGauntlet](http://brh.numbera.com/software/pnggauntlet/) , while others can find a list of tools [here](http://optipng.sourceforge.net/pngtech/optipng.html)  (scroll down to 3. PNG (lossless) optimization programs).

##### ● Animated Textures

Generally, an animation created using the TextureShiftFunction should be used in preference to an animated texture, as this will be faster and provide better blending results.

However, animated GIFs are also supported as a texture format. The alpha channel should be used in preference to the **TransparentColor** statement, which may give unexpected results.