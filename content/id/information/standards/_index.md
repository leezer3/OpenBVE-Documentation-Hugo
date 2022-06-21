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

Beacon diperuntukan untuk sistem keamanan bawaan ATS-SN dan ATS-P. Ini hanya boleh digunakan oleh pengembang rute/kereta jika arti beacon (hampir) identik:

{{% table %}}

| Tipe beacon | Data opsional  | Arti                                                      |
| ----------- | -------------- | ------------------------------------------------------------ |
| 0           | *SwitchSystem* | Transponder tipe-S untuk ATS-SN. Ditempatkan sekitar 600m di depan sinyal. Mebunyikan alarm yang harus diketahui ole masinis setiap kali sinyal berwarna merah.<br /><br />Nilai untuk *SwitchSystem*:<br />-1: Kereta tidak boleh mengganti sistem keselamatan.<br />0: Kereta harus secara otomatis beralih dari ATS-P ke ATS-SN saat lewat beacon ini. |
| 1           | *SwitchSystem* | Transponder tipe-SN untuk ATS-SN. Ditempatkan sekitar 20m di depan sinyal. Membunyikan alarm yang harus diketahui ole masinis setiap kali sinyal berwarna merah.<br /><br />Nilai untuk *SwitchSystem*:<br />-1: Kereta tidak boleh mengganti sistem keselamatan.<br />0: Kereta harus secara otomatis beralih dari ATS-P ke ATS-SN saat lewat beacon ini. |
| 2           | *Cars*         | Transponder berhenti darurat untuk ATS-SN dan ATS-P. Ditempatkan setelah pemberhentian. Menerapkan rem darurat setiap kali sinyal berwarna merah dan jumlah gerbong sesuai dengan data opsional.<br /><br />Nilai untuk *Cars*:<br />0: Transponder terpicu terlepas dari jumlah gerbong.<br />*Bilangan positif*: Transponder terpicu hanya jika * gerbong* lebih banyak dari atau sama dengan jumlah gerbong yang dimiliki kereta. |
| 3           | *SwitchSystem* | Transponder model baru untuk ATS-P. Beberapa disimpan di depan sinyal. Memberikan info kepada kereta tentang jarak sinyal terdekat dan aspek yang ditampilkan. Kereta akan mengerem bertahap jika sinyal merah.<br /><br />Nilai *SwitchSystem*:<br />-1: Kereta tidak akan mengganti sistem keamananan.<br />0: Kereta akan mengganti sistem dari ATS-SN menjadi ATS-P saat melewati beacon. |
| 4           | *SwitchSystem* | Stop transponder untuk ATS-P. Disimpan 25-30m di depan sinyal. MEmberikan informasi kepada kereta tentang jarak dan aspek sinyal. Kereta akan mengerem otomatis jika sinyal merah.<br /><br />Nilai *SwitchSystem*:<br />-1: Kereta tidak akan mengganti sistem keamanan.<br />0: Kereta akan mengganti sistem dari ATS-SN menjadi ATS-P. |
| -16777214   | *SpeedLimit*   | Generated automatically by the CSV / RW route parser for track sections with ATC. *SpeedLimit* passes the applicable speed limit in this case. |
| -16777215   | *TrackState*   | Generated automaticall by the CSV / RW route parser. *TrackState* is set to **1** when the track is compatible with ATC, **0** otherwise. |

{{% /table %}}

Beacons used by legacy train systems to simulate weather (Note- These will also be utilised by any train using the new Windscreen functionality):

{{% table %}}

| Tipe beacon | Data opsional  | Arti                                                      |
| ----------- | -------------- | ------------------------------------------------------------ |
| 21           | *Intensity*   | Menyetel intensitas cuaca<br /><br />.Nilai untuk *Intensitas* harus dalam kisaran berikut:<br />0: Tidak ada cuaca.<br />100: Intensitas cuaca maksimum. |

{{% /table %}}

UK Basic AWS / TPWS Beacons (Supported by OS_ATS, UKTrainSys, UKDT, UKMU & UKEMU):

{{% table %}}

| Tipe beacon | Data opsional  | Arti                                                      |
| ----------- | -------------- | ------------------------------------------------------------ |
| 44000       | 0              | Permanent AWS signal approach magnet. Raises an alarm the driver has to acknowledge if the referenced signal is red. |
| 44001       | 0              | AWS speed restriction magnet. Raises an alarm the driver has to acknowledge regardless. |
| 44003       | 0              | TPWS inductor associated with a signal. Triggers a TPWS brake demand if the referenced section is occupied. |
| 44003       | 0              | TPWS inductor associated with a signal. Triggers a TPWS brake demand if the referenced section is occupied. <br /> If you wish to issue a brake demand regardless (e.g. buffers), then the current section should be referenced. |
| 44004       | *Speed*        | TPWS overspeed inductor. Triggers a TPWS brake demand if the train's speed is greater than *Speed*. |

{{% /table %}}