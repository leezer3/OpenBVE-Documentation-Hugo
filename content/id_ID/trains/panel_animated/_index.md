---
title: "File **panel.animated**"
linktitle: "File panel.animated"
weight: 5
---

File ini berfungsi untuk membuat kabin 3 Dimensi.

Cara mengisi file ini sama dengan [objek .animated]({{< ref "/objects/native/animated/_index.md" >}}). Badan kereta dianggap berada di titik pusat x, y, dan z. posisi y=0 adalah posisi ujung atas rel kereta, sama seperti objek pada umumnya.

Posisi kamera masinis ditentukan dari #CAB atau #COCKPIT yang ada di file [train.dat]({{< ref "/trains/train_dat/_index.md#cab" >}}) (mengatur posisi kamera dalam milimeter, dihitung dari titik kereta paling depan).

Anda bisa menggunakan [Object Viewer]({{< ref "/tools/objectviewer/_index.md" >}}) untuk melihat file animasi apapun, termasuk panel.animated. Anda juga bisa membuka file panel.animated bersamaan dengan file objek eksterior kereta yang sama sehingga bisa menyamakan posisi interior dan eksterior.

{{% notice %}}

#### Overlay dan Pencahayaan

Semua isi kabin ini akan dianggap sebagai objek dengan layer paling atas. Artinya, kabin akan selalu terlihat paling depan dari semua objek yang ada di rute. Oleh karena itu, objek seperti tembok, hujan, atau objek rute lainnya tidak akan masuk ke dalam kabin. 
Efek pencahayaan pada kabin berbeda dengan cahaya pada rute. Saat cahaya ambient masuk ke kabin, warna ambient tidak masuk kabin, dan pada kabin akan selalu menampilkan warna cahaya yang sama. Mungkin hal ini akan berubah pada openBVE versi mendatang.

{{% /notice %}}