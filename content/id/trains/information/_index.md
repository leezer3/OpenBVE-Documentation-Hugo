---
title: "Info dan tips untuk membuat kereta"
linktitle: "Info dan tips"
weight: 10
---
Bagian ini memberikan informasi tentang hal hal yang harus diperhatikan untuk membuat objek

## ■ Objek eksterior

- Objek eksterior hatus menggunakan format dan aturan yang sama dengan objek lainnya. Lihat [Info dan tips membuat objek]({{< ref "/objects/information/_index.md" >}}).



## ■ panel.cfg / panel2.cfg

- Anda bebas menggunakan skin dengan Alpha atau transparansi karena tidak akan mempengaruhi performa PC. Depth sorting juga akan bekerja dengan baik pada panel ini. Jadi anda bisa membuat detail panel lebih bagus atau semacamnya. Misalnya, menambahkan efek kotor, hujan, atau kaca tidak bersih.
- Pada panel2.cfg, pastikan setiap komponen gambar berada di layer yang berbeda. Jika tidak, bisa jadi gambar akan tertimpa dan tabrakan dengan gambar lain.
- Satu file gambar skin sebaiknya mempunyai panjang dan lebar pixel angka kelipatan pangkat dua. Contohnya 1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, dan seterusnya. Selain itu, jika ada perintah yang memerlukan texture atau gambar untuk dipakai, misalnya DigitalIndicator di panel.cfg atau DigitalNumber di panel2.cfg, setiap gambar sebaiknya mempunyai panjang dan lebar pangkat dua. Size gambar tidak akan berpengaruh.