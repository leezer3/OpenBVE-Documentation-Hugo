---
title: Format rute **.rw**
linktitle: Rute RW
weight: 3
---

Rute format RW sebenarnya mempunyai format yang sama dengan CSV, tapi ada perbedaan seperti sintaks, struktur, dan pilihan kata. Rute RW sudah jarang dipakai dan sangat disarankan untuk menggunakan rute CSV saja.

Tidak ada penjelasan detail tentang rute RW ini. Di sini hanya tersedia contoh perintah yang bisa digunakan di file ini.

➟ [Ringkasan perintah]({{< ref "/routes/rw_quick/_index.md" >}}) 

Silakan cek halaman perintah CSV untuk melihat fungsi perintah yang ada di sini, dan perlu diingat rute RW punya cara penulisan yang berbeda. Anda bisa saja membuka halaman [ringkasan perintah rute CSV]({{< ref "/routes/csv_quick/_index.md" >}}) untuk melihat perbandingannya.

------

**Perbedaan antara CSV dan RW**

Di file RW, komentar hanya bisa ditambahkan di akhir baris bagian [Railway], selain dari bagian [Railway], komentar harus ada di baris terpisah dengan perintah.

Di file RW, semua teks yang berada di atas [Bagian] pertama, akan muncul di info rute pada main menu, seperti perintah Route.Comment pada CSV.

Di file RW, standar default perintah @Height atau ketinggian trek sebesar 0,3m. Di CSV, tinggi standar default di perintah Track.Height 0m. Setiap angka yang tertulis di perintah @Height akan muncul lebih tinggi 0,3m pada game.

Pada RW, angka pada perintah @Form bisa negatif. -9 artinya peron kiri, 9 artinya peron kanan, dan 9X artinya Rail 9. Di CSV, -9 dianggap error dan 9 berarti rail 9.
