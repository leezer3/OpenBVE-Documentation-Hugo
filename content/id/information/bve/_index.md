---
title: "Perbedaan dengan BVE Trainsim"
linktitle: "Vs. BVE Trainsim"
weight: 9
---

Bagian ini menjelaskan hal yang **tidak bisa dipakai** di openBVE, karena perintah dari BVE Trainsim memiliki fungsi yang berbeda dengan openBVE, atau hal lainnya. Sampai saat ini, baru hal-hal berikut yang diketahui tidak bisa digunakan.

Semua perbedaan yang tidak kompatibel yang disebutkan di halaman ini, mempunyai tujuan yang sama: Untuk menyediakan fitur yang stabil dan konsisten di openBVE daripada membuat perubahan yang tidak kompatibel hanya supaya bisa dipakai di BVE Trainsim. Semua perbedaan yang dijelaskan pada halaman ini akan bersifat permanen.

## ■ Track.Signal  (CSV and RW routes)

Perintah Track.Signal (atau Track.Sig) dipakai untuk membuat sinyal tipe Jepang di rute CSV  (bentuk penulisan berbeda digunakan di rute RW)

Di openBVE, Track.Signal ditulis sebagai berikut:

{{% command %}}  
**Track.Signal** *Aspects*; *~~Unused~~*; *X*; *Y*; <u>*Yaw*</u>; *Pitch*; *Roll*  
{{% /command %}}

Di BVE Trainsim, Track.Signal ditulis sebagai berikut:

{{% command %}}  
**Track.Signal** *Aspects*; *Label*; *X*; *Y*; <u>*Type*</u>  
{{% /command %}}

*Label* pada BVE Trainsim adalah deskripsi sinyal yang tidak berfungsi apa-apa di openBVE (di tutorial ini, ditulis *unused*).

BVE Trainsim menggunakan *Type* yang bisa diganti menjadi 1, 2, atau 3. Digunakan untuk menentukan tipe sinya, seperti sinyal masuk atau sinyal muka. Type ini tidak bisa digunakan di openBVE karena ada perintah *Yaw*, *Pitch* , dan *Roll* yang dipakai untuk membuat objek bisa diatur lebih beragam. Jika ada perintah BVE Trainsim *Type* tertulis di openBVE, maka isi *Type* akan salah diartikan sebagai *Yaw*.
