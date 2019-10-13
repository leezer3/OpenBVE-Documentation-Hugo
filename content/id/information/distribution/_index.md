---
title: Share add-on openBVE
linktitle: Membagikan add-ons
weight: 7
---

Whether you have written a route, a train or a plugin, there are a few things you should be aware of before distributing your add-ons. As openBVE is a cross-platform simulator intended with international interoperability in mind, your add-ons should be, too.

## ■ File teks dan enkoding

Whichever text file you are about to include in your distribution, including readme files, you should make sure that the file can be correctly processed internationally. The default encoding for all text files accessed by openBVE is UTF-8. For routes and associated objects, you can also use a different encoding, but then, the user has to select the specific encoding from a list. The same situation applies to trains and associated files. If you encode your text files in anything else but UTF-8, you must inform the user about your choice, or otherwise, the user might end up with garbage characters and potentially incorrectly parsed files. Using UTF-8 is the preferred choice, while using legacy encodings is acceptable, but discouraged. Please note that all files in a route or train must use the same encoding as it is neither currently possible nor feasible for the user to select the encoding of every individual file.

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

Generally, you can use any file name you want, that is, include any characters such as Latin, Japanese, Chinese, and the like. However, you need to make very sure that the archive format you use supports Unicode file names then. If not, the user might be unable to extract your files correctly, leading to a series of files that cannot be found later. Unfortunately, the popuplar ZIP format does not support Unicode file names, while for example [7Z](https://www.7-zip.org/) does. Alternatively, restrict yourself to ASCII characters, e.g. A-Z, a-z, 0-9.

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

Generally, your route should be free of errors. Please note that openBVE distinguishes between errors and warnings. An error is something definately wrong with your coding that should be fixed immediately. A warning is usually only raised to encourage inspection of potentially ambiguous code or code that might not have been meant the way it was written. In order to inspect your routes and trains for errors and warnings, go to the Options menu in openBVE and enable eporting them. RouteViewer and ObjectViewer always report such messages. Please note that the arious tools and openBVE itself might report a different set of messages as they don't share all the ame functionality. Distributing add-ons containing errors might give users the impression that omething was incompletely downloaded or was incorrectly packaged, and should generally be voided.

Yang dibolehkan dan tidak:

{{% table-nonheader %}}

| <font color="Green">✓</font> | Mengaktifkan laporkan error dan peringatan pada menu *Pengaturan* dan cek add-ons anda. |
| ---------------------------- | ------------------------------------------------------------ |
| <font color="Green">✓</font> | Menyebarkan add-on yang tidak ada errornya (warning tidak apa-apa). |
| <font color="Red">✗</font>   | Jangan mengecek error pada add-on dengan mematikan laporan error atau abaikan pesan. |
| <font color="Red">✗</font>   | Membagikan add-on yang masih mempunyai error.                   |

{{% /table-nonheader %}}

## ■ Rute dan kereta yang menggunakan plugin khusus.

If you include plugins in your train, they should be only of the .NET type. Older Windows-only plugins are retained for backward compatibility, but should not be distributed any longer with new releases. If you cannot remove the dependency on a Windows-only plugin for the time being, then at least design your routes and trains so that they work with the default safety system. You can test how your train behaves without a plugin by deleting the ats.cfg file (or by temporarily enaming it).

## ■ Panduan operasional

An overview on the signs and signalling in your route, as well as on how to operate your train, is generally in order. Otherwise, users unfamiliar with the particular territory might be left with guessing the meaning of signs, or have to guess which keys serve which purpose. If you can, provide an English version of the instruction, as this generally increases the number of people who are able to understand it.