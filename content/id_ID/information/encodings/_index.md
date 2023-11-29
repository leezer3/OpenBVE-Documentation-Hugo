---
title: "Enkoding karakter"
weight: 1
---

<font color="Gray">Bagian ini menjelaskan tentang enkoding karakter dan cara penggunaannya.</font>

■ Penjelasan
------

Karakter enkoding adalah cara sistem menerjemahkan karakter menjadi byte yang tersimpan di hard disk. Di awal file, satu byte (256 state) digunakan untuk enkode satu karakter. Karena cara penulisan di tiap negara bisa berbeda beda, enkode yang diperlukan pun berbeda. Jika suatu teks tidak memiliki enkode yang benar, sistem akan salah mengartikan tiap byte dan bisa jadi menghasilkan karakter yang tidak jelas (dan tidak bisa dibaca tentunya).

Contohnya teks bahasa Jepang menggunakan enkode Shift_JIS (memerlukan beberapa font tambahan):

{{% code %}}  
ひらがなカタカナ漢字  
{{% /code %}}

Dari contoh Shift_JIS sebelumnya jika diubah ke byte sequence:

{{% code %}}  
82 D0 82 E7 82 AA 82 C8 83 4A 83 5E 83 4A 83 69 8A BF 8E 9A  
{{% /code %}}

Yang terjadi jika byte salah diterjemahkan sebagai ISO 8859-1 (Bahasa Latin) yang seharusnya Shift_JIS:

{{% code %}}  
‚Ð‚ç‚a‚ÈƒJƒ^ƒJƒiŠ¿Žš  
{{% /code %}}

Biasanya, satu file hanya boleh menggunakan satu enkoding. Untuk indonesia dan beberapa wilayah dunia yang menggunakan huruf latin, cukup pakai Unicode, yaitu metode enkode yang paling umum dan bisa dipakai untuk seluruh karakter.

Meski banyak yang menggunakan Unicode, masih ada kelemahannya. Pertama, Unicode sebenarnya bukanlah metode enkode. Itu hanya kata sederhana dari Unicode Transformation Formats (UTF), yang menyediakan karakter basic bahasa latin. Yang biasa dipakai adalah UTF-8 dan UTF-16.

Biasanya, pada file kereta dan rute, bisa saja menggunakan enkode jenis apapun. Kalau enkode yang dipakai di kereta dan rute tidak diketahui, pengguna harus memilih pengodean yang benar untuk rute dan kereta di tab pengaturan pada menu utama. Hindari hal seperti ini terjadi.

## ■ Byte Order Mark

UTF-16 turun dari pengkodean karakter (UTC-2) yang selalu menggunakan dua byte untuk mengkodekan satu karakter. Dengan demikian, urutan kedua byte itu penting. Untuk mengetahui urutan urutan byte yang muncul, yang disebut tanda urutan byte sering kali ditambahkan ke teks, biasanya secara otomatis dan transparan oleh editor teks. Tanda urutan byte menyediakan decoder cara mendeteksi di mana urutan byte file disimpan. Selain itu, tanda urutan byte menyediakan cara yang cukup aman untuk mendeteksi bahwa file teks disimpan dalam Unicode di tempat pertama.

Meskipun tidak secara teknis diperlukan, tanda urutan byte juga sering digunakan untuk UTF-8. Karena UTF-8 tidak memiliki masalah urutan byte, satu-satunya tujuan menggunakan tanda urutan byte dengan UTF-8 adalah untuk menyediakan sarana untuk menandai file sebagai dikodekan dalam UTF-8.

Seperti yg dijelaskan sebelumnya, sementara Unicode memungkinkan untuk melakukan enkode hampir semua karakter yang digunakan dalam semua sistem penulisan di seluruh dunia, itu tidak selalu membuat bekerja dengan file teks lebih mudah jika pengkodean yang akan digunakan tidak disetujui.

Menggunakan tanda urutan byte(Byte Orde Mark/BOM) memberikan openBVE kemampuan untuk secara otomatis mendeteksi pengkodean untuk setiap file. Jika anda memiliki editor teks yang bagus, Anda tidak hanya dapat memilih tipe pengkodean secara manual, tetapi juga jika anda dapat menyimpan dengan BOM atau tidak. Notepad (Windows) selalu menyimpan dengan BOM jika UTF-8 dipilih sebagai pengkodean karakter saat menyimpan file.

Secara teknis, tanda urutan byte adalah byte pertama dari file teks tertentu. Tanda urutan byte yang dapat dideteksi secara otomatis oleh openBVE adalah:

{{% table %}}

| Enkoding               | Representasi Hexadecimal |
| ---------------------- | -------------------------- |
| UTF-8                  | EF BB BF                   |
| UTF-16 (big endian)    | FE FF                      |
| UTF-16 (little endian) | FF FE                      |
| UTF-32 (big endian)    | 00 00 FE FF                |
| UTF-32 (little endian) | FF FE 00 00                |

{{% /table %}}

Anda dianjurkan untuk selalu menyimpan file teks ke salah satu pengkodean dengan tanda urutan byte diatas agar openBVE secara otomatis mendeteksi pengkodean yang digunakan.