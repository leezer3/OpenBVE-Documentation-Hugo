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

{{% /table %}}

##### ● Size gambar texture

Jumlah panjang dan lebar pixel gambar sebaiknya adalah hasil angka pangkat dua. Contohnya 1, 2, 4, 8, 16, 32, 64, 128, 256, dan seterusnya. Jika menggunakan angka lain, dapat membuat waktu loading lebih lama, dan bisa jadi blur.

##### ● Optimalisasi PNG file

PNG is a lossless image compression format. As with many other compression formats, the encoder can make a wide range of choices to result in different outcomes - some encoders can produce smaller files, others larger files. Normally, image editing software do not produce the smallest PNG files, which is why there are a number of tools with the sole purpose of squeezing every last bit out of PNG files. You are invited to use such tools in order to further reduce storage requirements. Windows users can use the convenient [PNGGauntlet](http://brh.numbera.com/software/pnggauntlet/) , while others can find a list of tools [here](http://optipng.sourceforge.net/pngtech/optipng.html)  (scroll down to 3. PNG (lossless) optimization programs).