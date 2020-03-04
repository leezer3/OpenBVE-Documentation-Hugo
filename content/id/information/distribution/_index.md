---
title: "Share add-on openBVE"
linktitle: "Membagikan add-ons"
weight: 7
---

Saat anda membuat rute, kereta, atau plugin, banyak yang perlu diperhatikan. Seperti, memastikan bahwa add-on anda harus bisa dipakai di OpenBVE pada semua Sistem Operasi.

## ■ File teks dan enkoding

Apapun teks yang akan anda tulis dalam add-on, termasuk readme, pastikan file ini bisa dibuka di semua OS secara internasional. Enkoding default untuk semua file yang diproses di OpenBVE adalah UTF-8. Tenang saja, karena Bahasa Indonesia sudah menggunakan format ini, maka biasanya tidak perlu khawatir filenya tidak dapat terbaca di komputer lain di seluruh dunia. Hanya saja, jika ingin menambahkan bahasa yang membutuhkan karakter khusus, seperti bahasa cina, jepang, india, atau bahasa daerah yang tidak ada di 26 Alfabet standar, maka pastikan gunakan enkode UTF-8.

Yang diperbolehkan dan tidak:

{{% table-nonheader %}}

| <font color="Green">✓</font> | Simpan file anda dengan format UTF-8.                               |
| ---------------------------- | ------------------------------------------------------------ |
| <font color="Green">✓</font> | Menyimpan teks anda dengan format Unicode dan byte order mark. |
| <font color="Red">✗</font>   | Menyimpan teks anda dengan format selain Unicode.            |
| <font color="Red">✗</font>   | Menggunakan enkoding yang berbeda di berbagai file dalam 1 add-on   |

{{% /table-nonheader %}}

## ■ Archive x Installer

Saat membuat archive add-on,  buat 1 file archive saja daripada membuat banyak file archive yang lebih kecil, kecuali jika sizenya terlalu besar. Jangan gunakan installer yang hanya bisa digunakan oleh 1 OS saja (kecuali jika anda ingin menyediakan installer untuk semua OS). Misalnya format EXE untuk Windows, RPM untuk Linux, dan DMG untuk Mac.

Yang diperbolehkan dan tidak:

{{% table-nonheader %}}

| <font color="Green">✓</font> | Menggunakan format 7Z, ZIP, TAR.GZ, dll.         |
| ---------------------------- | ----------------------------------------------------------- |
| <font color="Red">✗</font>   | Menggunakan file EXE, RPM, DMG, dsb. |

{{% /table-nonheader %}}

## ■ Nama file dan archive

Biasanya, anda bebas membuat nama file dalam karakter apapun seperti huruf latin, mandarin, jepang, dsb. Tapi pastikan format nama yang dipakai bisa dibaca oleh software. Jika tidak, mungkin pengguna konten anda akan kesulitan menggunakannya. Sayangnya, format ZIP tidak support Unicode sedangkan format lain seperti [7Z](https://www.7-zip.org/) bisa. Mungkin anda bisa menggunakan format ASCII seperti huruf A-Z, a-z, 0-9.

Yang dibolehkan dan tidak:

{{% table-nonheader %}}

| <font color="Green">✓</font> | Menggunakan archive yang berformat Unicode (misal 7Z) |
| ---------------------------- | ------------------------------------------------------------ |
| <font color="Green">✓</font> | Menggunakan archive format yang tidak didukung oleh Unicode dan memakai format bahasa anda sendiri. |
| <font color="Red">✗</font>   | Menggunakan archive yang tidak memakai Unicode tetapi memakai nama Unicode. |

{{% /table-nonheader %}}

## ■ Archive dan susunan folder

Anda harus selalu menambahkan semua susunan folder, seperti **Railway** dan **Train**, saat membuat archive dan menyebarkan add-ons. Hal ini dapat membantu user untuk menentukan di mana mereka harus meng-ekstrak archivenya. Jangan pernah membiarkan isi archive anda hanya folder *NamaFolder* yang seharusnya disimpan di folder Railway\Sound, sebagai contoh. Hanya user yang sudah berpengalaman yang bisa mengatasi masalah ini.

Yang dibolehkan dan tidak:

{{% table-nonheader %}}

| <font color="Green">✓</font> | Menambahkan folder **Railway** atau **Train**, lebih baik tambahkan keduanya. |
| ---------------------------- | ------------------------------------------------------------ |
| <font color="Red">✗</font>   | Hanya memasukkan folder atau file dan membiarkan user mencari tau sendiri cara menggunakannya. |

{{% /table-nonheader %}}

## ■ Error dan peringatan

Rute anda harus bebas dari ERROR. Ingat, OpenBVE membedakan pesan ERROR dan pesan PERINGATAN. Pesan ERROR menunjukkan sesuatu yang KESALAHAN tulisan yang sudah jelas dan harus langsung diperbaiki. Sedangkan pesan PERINGATAN hanya menunjukkan informasih tambahan yang bisa saja menjadi error atau mungkin menghasilkan kode yang ambigu, atau yang tidak sengaja tertulis. Untuk melihat pesan error dan pesan peringatan, buka Pengaturan OpenBVE dan aktifkan pilihan ini. RouteViewer dan ObjectViewer akan selalu menampilkan pesan ini. Caatan, mungkin OpenBVE dan aplikasi Viewer lainnya menampilkan jumlah error yang berbeda, karena tidak semua perintah di aplikasi Viewer bisa dibaca.

Yang dibolehkan dan tidak:

{{% table-nonheader %}}

| <font color="Green">✓</font> | Mengaktifkan laporkan error dan peringatan pada menu *Pengaturan* dan cek add-ons anda. |
| ---------------------------- | ------------------------------------------------------------ |
| <font color="Green">✓</font> | Menyebarkan add-on yang tidak ada errornya (warning tidak apa-apa). |
| <font color="Red">✗</font>   | Jangan mengecek error pada add-on dengan mematikan laporan error atau abaikan pesan. |
| <font color="Red">✗</font>   | Membagikan add-on yang masih mempunyai error.                   |

{{% /table-nonheader %}}

## ■ Rute dan kereta yang menggunakan plugin khusus.

Jika anda ingin menambahkan plugin, pastikan hanya berformat .NET. Plugin jadul yang hanya bisa dipakai di OS Windows sudah tidak bisa dipakai lagi, dan harusnya sudah tidak dipakai. Jika anda masih sangat membutuhkan plugin jadul, setidaknya pastikan add-on anda bisa dipakai tanpa menggunakan plugin itu. Silakan tes dengan menghapus file ats.cfg (atau rename aja file ats ini sementara).

## ■ Panduan operasional

Penjelasan tentang persinyalan dan semboyan, dan juga cara menggunakan kereta, sebaiknya ditambahkan sebagai file readme, atau file tutorial. Jangan sampai pengguna menebak-nebak apa yang harus dilakukan saat mengoperaskan kereta anda. Lebih baik lagi cantumkan tutorial bahasa inggris supaya lebih banyak orang yang mengerti.