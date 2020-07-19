---
title: "File format **extensions.cfg**"
linktitle: "File **Extensions.cfg**"
weight: 3
---

## ■ Isi

{{% contents %}}

- [1. Penjelasan](#overview)
- [2. Format penulisan
](#syntax)
- [3. Bagian Car*i*](#car)
- [4. Bagian Coupler*i*](#coupler)
- [5. Bagian Exterior (sudah tidak dipakai)](#exterior)

{{% /contents %}}

## <a name="overview"></a>■ 1. Penjelasan

File Extensions.cfg berisi teks yang memuat info kereta seperti panjang kereta, posisi bogie, dan objek kereta.

Isi file ini bisa menggunakan semua tipe [encoding]({{< ref "/information/encodings/_index.md" >}}), Biasanya untuk penulisan biasa dengan UTF-8.  [Cara penulisan]({{< ref "/information/numberformats/_index.md" >}}) angka **Strict**. File ini harus berada di dalam folder kereta dan harus diberi nama  **extensions.cfg**. File akan dibaca oleh sistem dari atas ke bawah, dari kiri ke kanan.

##### ● Bagian Car

Semua kereta di extensions.cfg diberi nomor mulai dari 0 (kereta paling depan) sampai *n*-1 (kereta paling belakang), *n* adalah jumlah total semua kereta dalam satu rangkaian, berdasarkan apa yang ada di  [train.dat]({{< ref "/trains/train_dat/_index.md" >}}) . Contohnya, pada rangkaian dengan total 10 kereta, kereta paling depan mempunyai nomor 0 dan paling belakangnya 9.

##### ● Bagian Coupler

Bagian Coupler dalam file ini menentukan jarak antar kereta. Semua perangkai di extensions.cfg diberi nomor dari 0 (perangkai paling depan) sampai dengan *n*-2 (perangkai paling belakang), *n* adalah total kereta dalam rangkaian yg ditentukan dari  [train.dat]({{< ref "/trains/train_dat/_index.md" >}}). Nomor perangkai *i* adalah perangkai yang ada di antara kereta *i* dan *i+1* , jadi perangkai yang ada di 2 kereta pertama (antara car0 dan car1) adalah coupler0. Misalnya, jika pada rangkaian 10 kereta, coupler yang ada di antara 2 kereta terakhir (car8 dan car9) adalah coupler 8.

## <a name="syntax"></a>■ 2. Format penulisan

Setiap baris dalam file ini bisa dikosongkan (atau dikasih spasi) dan tidak akan dibaca oleh sistem. Dengan begitu anda bisa memisahkan bagian satu dengan bagian lainnya. 

Membuat bagian baru dimulai dengan menambahkan nama bagian dan memakai kurung tegak ( " [ " dan " ] " ). Spasi tidak akan terbaca di sistem. Contoh cara penulisannya:

{{% command %}}  
[NamaBagian]  
{{% /command %}}

{{% code "*Example for the indication of a new section:*" %}}  
[exterior]  
{{% /code %}}

Cara menulis isi bagian ini yaitu dengan menambahkan kata kunci perintah, lalu sama dengan, kemudian masukkan angka atau teks yang dibutuhkan. Perhatian besar kecil huruf dan spasi. Contohnya seperti ini:

{{% command %}}  
Perintah = Nilai  
{{% /command %}}

{{% code "*Example of a key-value pair:*" %}}  
0 = train.csv  
{{% /code %}}

Komentar bisa ditambahkan di mana saja di akhir teks. Tambahkan titik koma " ; " lalu tulis komentar atau catatan yang diinginkan.

## <a name="car"></a>■ 3. Bagian Car*i*

Bagian Car*i* menentukan keterangan 1 kereta dalam rangkaian.

------

{{% command %}}  
**[Cari]**  
{{% /command %}}

This starts the section for car *i*, which is an integer between 0 and *n*-1, where *n* is the number of cars the train has.

------

{{% command %}}  
**Object** = *File*  
{{% /command %}}

***File***: Lokasi objek file kereta.

This key-value pair defines the exterior object for this car. Within the object file, the coordinate (0,0,0) (*x*, *y*, *z*) corresponds to the center of the car, both horizontally (*x*) and forward/backward (*z*), while *y*=0 corresponds to the top of the rails.

------

{{% command %}}  
**Length** = *Value*  
{{% /command %}}

***Value***: Panjang kereta dalam meter.

Perintah ini menentukan panjang satu gerbong dalam satu rangkaian. Bagian ini akan mengganti nilai panjang kereta yang ditulis di train.dat. Jika tidak ada perintah ini, maka nilai yang ditulis di train.dat akan dipakai.

------

{{% command %}}  
**Axles** = *Rear*, *Front*  
{{% /command %}}

***Rear***: Jarak antara titik pusat dengan bogie belakang. biasanya angkanya negatif.
***Front***: Jarak antara titik pusat dengan bogie depan. Biasanya angka positif.

This key-value pair defines the positions of the axles. While *Rear* and *Front* can take any values, the condition *Rear* < *Front* must hold.

------

{{% command %}}  
**Reversed** = *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: **True** atau **False** untuk menentukan apakah objek perlu dibalik atau tidak.  
{{% /command-arguments %}}

Dengan perintah ini, gerbong bisa dibalik pada rangkaian. Catatan, posisi bogie pada perintah sebelumnya menentukan posisi saat kereta tidak dibalik.

------

{{% command %}}  
**LoadingSway** = *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: **True** atau **False**  
{{% /command-arguments %}}

Dengan pengaturan ini, kereta bisa diatur apakah akan bergoyang saat naik turun penumpang atau tidak.

------

{{% command %}}  
**VisibleFromInterior** = *Value*  
{{% /command %}}

{{% command-arguments %}}  
***Value***: Either **True** or **False** to indicate whether this remains visible from an interior view of the driver car.
{{% /command-arguments %}}

With this setting, you can control which cars remain visible from the cab, for example if your cab is not in the front car of the train.
*Note:* This does not apply to the current driver car.

------

{{% code "*Example of a Cari section:*" %}}  
[Car0]  
Object = locomotive.b3d  
Length = 16  
Axles = -6, 6  
Reversed = False  
{{% /code %}}

## <a name="coupler"></a>■ 4. The Coupler*i* section

The Coupler*i* section allows to define properties specific to a certain coupler.

------

{{% command %}}  
**[Coupleri]**  
{{% /command %}}

This starts the section for coupler *i*, which is an integer between 0 and *n*-2, where *n* is the number of cars the train has.

------

{{% command %}}  
**Distances** = *Minimum*, *Maximum*  
{{% /command %}}

{{% command-arguments %}}  
***Minimum***: A floating-point number indicating the minimum allowed distance between the cars.  
***Maximum***: A floating-point number indicating the maximum allowed distance between the cars.  
{{% /command-arguments %}}

This key-value pair defines the lowest and highest allowed distances between the cars, resembling a buffer and chain coupler. The condition *Minimum* ≤ *Maximum* must hold.

------

{{% code "*Example of a Coupleri section:*" %}}  
[Coupler0]  
Distances = 0.30, 0.35  
{{% /code %}}

## <a name="exterior"></a>■ 5. The Exterior section (outdated)

The Exterior section provides an easy way of adding exterior objects to the particular train. For more control on the setting of axle positions and individual car lengths, the Car*i* section has been introduced and should be used instead.

------

{{% command %}}  
**[Exterior]**  
{{% /command %}}

This starts the Exterior section.

------

{{% command %}}  
**i** = *File*  
{{% /command %}}

{{% command-arguments %}}  
***i***: An integer between 0 and *n*-1, where *n* is the number of cars the train has. Index 0 corresponds to the front car and index *n*-1 to the last car in the train.  
***File***: The relative file name of the exterior object to use for car *i*, relative to the train folder.  
{{% /command-arguments %}}

This key-value pair can be used to set up the exterior objects for each individual car. Within the object file, the coordinate (0,0,0) (*x*, *y*, *z*) corresponds to the center of the car, both horizontally (*x*) and forward/backward (*z*), while *y*=0 corresponds to the top of the rails.

------

{{% code "*Example of an [Exterior] section*" %}}  
[Exterior]  
0 = cars\engine.csv  
1 = cars\passenger_mk1.b3d  
2 = cars\passenger_mk1.b3d  
3 = cars\passenger_bistro.b3d  
4 = cars\passenger_mk2.b3d  
5 = cars\postal.x  
{{% /code %}}