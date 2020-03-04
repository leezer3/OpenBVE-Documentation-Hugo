---
title: "Standar"
weight: 6
---

Saat membuat add-on bersama orang lain, anda harus membuat standar atau bekerja sama dengan kreator lain untuk membuat standar dalam isi add-on rute dan kereta. Jika tidak, bisa saja kereta atau rute tidak dapat bekerja dengan baik.

Contohnya, file run X.wav adalah suara kereta saat berjalan di rel, sedangkan X sendiri adalah angka railtype. Jika developer A membuat rail 1.wav untuk tikungan ke kiri, sedangkan developer B membuat rail 1.wav untuk membuat jembatan rel, kita tidak bisa menggunakan kereta yang sama untuk kedua rute tersebut. Meskipun jika dipaksakan dipakai, kereta masih bisa dipakai, hanya saja hasil suaranya akan berbeda.

Jika anda membuat konten bersama orang lain, sebaiknya buatlah standar atau rule supaya hal di atas tidak terjadi. Berikut adalah list aturan yang bisa anda pakai.

## ■ File run*i*.wav di kereta

Aturan yang biasanya dipakai adalah [BVE Track Sound Standard](http://www.railsimroutes.net/bvetss/index.php). Tidak semua developer mengikuti aturan ini, dan biasanya tidak dibutuhkan untuk add-on diluar Inggris karena jenis trek yang berbeda-beda.

## ■ Suara kereta flange*i*.wav

Tidak ada aturan standar untuk file flange*i*.wav . Anda bisa membuatnya sendiri.

## ■ Beacon

Tidak ada standar untuk membuat beacon, dan di Indonesia tidak ada aturan untuk membuat ini karena tidak ada di aslinya.

Meskipun begitu, berikut ini adalah list beacon bawaan dari game untuk sistem ATS-SN dan ATS-P. Hanya untuk developer yang akan menggunakan beacon.

{{% table %}}

| Tipe beacon | Data opsional  | Arti                                                      |
| ----------- | -------------- | ------------------------------------------------------------ |
| 0           | *SwitchSystem* | ATS-SN transponder tipe S. Disimpan 600m di depan sinyal. Akan membunyikan alarm jika masinis akan mendekati sinyal merah.<br /><br />Nilai *SwitchSystem*:<br />-1: Kereta tidak akan mengganti sistem keamanan.<br />0: Sistem keamanan kereta berganti otomatis dari ATS-P ke ATS-SN saat melewati beacon. |
| 1           | *SwitchSystem* | ATS-SN Transponder tipe SN. Disimpan 20m di depan sinyal. Mengaktifkan rem darurat jika sinyal merah.<br /><br />Nilai *SwitchSystem*:<br />-1: Kereta tidak akan mengganti sistem keamanan.<br />0: Kereta akan mengubah sistem keamanan dari ATS-P menjadi ATS-SN. |
| 2           | *Cars*         | Stop transponder untuk ATS-SN dan ATS-P. Disimpan setelah batas berhenti. Membuat rem darurat aktif jika sinyal merah dan angka CARS sesuai dengan data.<br /><br />Nilai *Cars*:<br />0: Transponder aktif untuk semua kereta.<br />*Angka Positif*: Transponder aktif jika angka *Cars* Lebih besar atau sama dengan jumlah kereta dalam 1 rangkaian. |
| 3           | *SwitchSystem* | Transponder model baru untuk ATS-P. Beberapa disimpan di depan sinyal. Memberikan info kepada kereta tentang jarak sinyal terdekat dan aspek yang ditampilkan. Kereta akan mengerem bertahap jika sinyal merah.<br /><br />Nilai *SwitchSystem*:<br />-1: Kereta tidak akan mengganti sistem keamananan.<br />0: Kereta akan mengganti sistem dari ATS-SN menjadi ATS-P saat melewati beacon. |
| 4           | *SwitchSystem* | Stop transponder untuk ATS-P. Disimpan 25-30m di depan sinyal. MEmberikan informasi kepada kereta tentang jarak dan aspek sinyal. Kereta akan mengerem otomatis jika sinyal merah.<br /><br />Nilai *SwitchSystem*:<br />-1: Kereta tidak akan mengganti sistem keamanan.<br />0: Kereta akan mengganti sistem dari ATS-SN menjadi ATS-P. |

{{% /table %}}