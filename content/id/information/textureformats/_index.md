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

PNG adalah format kompresi gambar lossless. Sepert format kompresi lainnya, encoder dapat membuat berbagai pilihan untuk menghasilkan hasil yang berbeda. beberapa encoders dapat menghasilkan file yang lebih kecil, yang lain lebih besar. Biasanya, perangkat lunak editor gambar tidak menghasilkan file PNG terkecil, itulah sebabnya ada sejumlah alat dengan tujuan mengurangi ukuran PNG. Anda disarankan menggunakan format ini. Pengguna Windows dapat menggunakan [PNGGauntlet] yang mudah digunakan (http://brh.numbera.com/software/pnggauntlet/), sementara yang lain dapat menemukan daftar alat [di sini] (http://optipng.sourceforge.net/pngtech/ optipng.html) (gulir ke bawah ke 3. Program optimalisasi PNG (lossless)).