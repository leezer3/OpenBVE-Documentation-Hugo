---
title: "File **train.xml** "
linktitle: "File train.xml "
weight: 2
---

**CATATAN:**

Halaman ini masih dalam pengerjaan.

{{% contents %}}

- [1. Ikhtisar](#overview)
- [2. Bagian Train](#train)
- [3. Bagian Car](#car)
- [3.1. Bagian Power](#power)
- [3.2. Bagian Brake](#brake)
- [3.3. Model Traksi](#traction)
- [3.3.1. Mesin Listrik](#electric)
- [3.3.2. Mesin Diesel](#diesel)
- [3.4. Bagian Doors](#doors)
- [3.5. Bagian Sanders](#sanders)
- [3.6. Bagian Windscreen](#windscreen)
- [3.7. Sumber Partikel](#particles)
- [3.8. Sistem Keselamatan](#safetysystems)
- [3.8.1. Perangkat Pengawasan Masinis](#dsd)
- [3.9. Tabel Suara Motor](#soundtable)
- [4. Bagian Coupler](#coupler)
- [5. Properti Lain-lain](#misc)

{{% /contents %}}

## <a name="overview"></a>■ 1. Ikhtisar

Format **train.xml** adalah format asli untuk versi OpenBVE yang lebih baru, dan ditujukan untuk menggantikan format train.dat yang lama. Format ini memungkinkan pengaturan jauh lebih banyak properti, dan dapat diperluas.

Format ini dapat dibuat sebagai satu file yang berisi properti seluruh rangkaian, atau sebagai satu definisi rangkaian beserta file kereta anak.

{{% information %}}

#### Posisi di Dalam Kereta:

Dalam format **train.xml**, semua posisi diukur relatif terhadap pusat kereta, yang dianggap berada di 0,0,0
Meskipun ini merupakan perubahan untuk beberapa parameter dari format BVE lama, hal ini berarti semua posisi harus konsisten.

{{% /information %}}

## <a name="train"></a>■ 2. Bagian Train

Baik menggunakan file kereta anak maupun satu file, node pertama dalam setiap file **train.xml** harus berupa node **\<Train\>**.

Node ini mendukung properti berikut:

{{% command %}}  
**\<Car>** *CarProperties* **\</Car>**  
{{% /command %}}

Ini mendefinisikan sebuah kereta dalam rangkaian.

**CarProperties** dapat berupa sekumpulan node anak (jika menggunakan format satu file) atau path relatif di disk ke file kereta anak.

{{% command %}}  
**\<DriverCar>** *Car* **\</DriverCar>**  
{{% /command %}}

**Car** harus berupa bilangan bulat positif yang kurang dari atau sama dengan jumlah kereta dalam rangkaian, yang menetapkan kereta masinis.

{{% command %}}  
**\<NotchDescriptions>** *Notch* **\</NotchDescriptions>**  
{{% /command %}}

Ini menimpa deskripsi notch antarmuka dalam permainan yang ditampilkan.

**Notch** dapat berupa satu atau lebih node anak, dengan salah satu subjek berikut: *Power, Brake, LocoBrake* atau *Reverser*

Node anak harus dalam format berikut:

{{% command %}}  
**\<Subject>** *Descriptions* **\</Subject>**  
{{% /command %}}

**Descriptions** harus berupa daftar yang dipisahkan koma atau titik koma, sama dengan jumlah notch yang dimiliki rangkaian untuk subjek tersebut.

Entri daftar ini harus diurutkan dari rendah ke tinggi. 

Sebagai contoh tuas rem atau rem lokomotif dengan EB, tahan rem, dan 8 notch, yang berikut ini akan digunakan:

{{% function "_Contoh Brake Handle NotchDescriptions:_" %}}  
\<NotchDescriptions>EB,HLD,N,1,2,3,4,5,6,7,8\</NotchDescriptions>  
{{% /function %}}

Rangkaian yang menggunakan rem udara otomatis memiliki total tiga notch, misalnya:

{{% function "_Contoh Brake Handle NotchDescriptions:_" %}}  
\<NotchDescriptions>EB,REL,LAP,SRV\</NotchDescriptions>  
{{% /function %}}

Sebagai contoh tuas daya dengan 8 notch, yang berikut ini akan digunakan:

{{% function "_Contoh Power Handle NotchDescriptions:_" %}}  
\<NotchDescriptions>N,1,2,3,4,5,6,7,8\</NotchDescriptions>  
{{% /function %}}

Tuas pembalik arah harus dalam urutan Netral, Maju, Mundur:

{{% function "_Contoh Reverser Handle NotchDescriptions:_" %}}  
\<NotchDescriptions>N,F,R\</NotchDescriptions>  
{{% /function %}}

## <a name="car"></a>■ 3. Bagian Car

{{% note %}}

Saat menggunakan file kereta anak, node **\<Car>** harus menjadi node pertama dalam file. Semua detail lainnya tetap sama.

{{% /note %}}

Node **<Car>** berisi properti untuk setiap kereta dalam rangkaian.

Node ini mendukung properti berikut:

{{% command %}}  
**\<CameraRestriction>** *Restrictions* **\</CameraRestriction>**  
{{% /command %}}

Ini menetapkan pembatasan kamera di dalam kabin (umumnya digunakan untuk kabin 3D).

**Restrictions** dapat berupa satu atau lebih node anak, dengan salah satu subjek berikut: *Backwards, Forwards, Left, Right, Down* atau *Up*

Node anak harus dalam format berikut:

{{% command %}}  
**\<Subject>** *Distance* **\</Subject>**  
{{% /command %}}

**Distance** harus berupa jarak dalam meter dari titik asal *0,0,0* di pusat objek kabin.

{{% command %}}  
**\<Length>** *LengthInMeters* **\</Length>**  
{{% /command %}}

**LengthInMeters** harus berupa panjang kereta dalam meter.

{{% command %}}  
**\<Width>** *WidthInMeters* **\</Width>**  
{{% /command %}}

**WidthInMeters** harus berupa lebar kereta dalam meter.

{{% command %}}  
**\<Height>** *HeightInMeters* **\</Height>**  
{{% /command %}}

**HeightInMeters** harus berupa panjang kereta dalam meter.

{{% command %}}  
**\<CenterOfGravityHeight>** *CenterOfGravityInMeters* **\</CenterOfGravityHeight>**  
{{% /command %}}

**CenterOfGravityInMeters** harus berupa ketinggian di atas rel dalam meter tempat pusat massa berada.

{{% command %}}  
**\<ExposedFrontalArea>** *Area* **\</ExposedFrontalArea>**  
{{% /command %}}

**Area** harus berupa bilangan pecahan positif yang diukur dalam meter persegi (m²) yang menunjukkan luas frontal kereta saat sepenuhnya terpapar udara penghambat, misalnya saat kereta berada di depan dalam arah perjalanan nominal saat ini. 

{{% command %}}  
**\<UnexposedFrontalArea>** *Area* **\</UnexposedFrontalArea>**  
{{% /command %}}

**Area** harus berupa bilangan pecahan positif yang diukur dalam meter persegi (m²) yang menunjukkan luas frontal kereta saat sepenuhnya tidak terpapar udara penghambat, yaitu kereta mana pun dalam rangkaian selain kereta terdepan.

{{% command %}}  
**\<Mass>** *EmptyMass* **\</EmptyMass>**  
{{% /command %}}

**EmptyMass** harus berupa massa kereta kosong (tanpa muatan) dalam kilogram.

{{% command %}}  
**\<MotorCar>** *IsMotorCar* **\</MotorCar>**  
{{% /command %}}

**IsMotorCar** menetapkan apakah kereta merupakan kereta motor - Jika *true*, kereta ini ditetapkan sebagai kereta motor.

{{% command %}}  
**\<FrontAxle>** *Position* **\</FrontAxle>**  
{{% /command %}}

**Position** harus berupa posisi poros dalam meter dari pusat kereta.

{{% command %}}  
**\<RearAxle>** *Position* **\</RearAxle>**  
{{% /command %}}

**Position** harus berupa posisi poros dalam meter dari pusat kereta.

{{% command %}}  
**\<Object>** *ObjectFile* **\</Object>**  
{{% /command %}}

**ObjectFile** harus berupa path relatif di disk ke objek 3D eksterior yang akan digunakan.

{{% command %}}  
**\<Reversed>** *IsReversed* **\</IsReversed>**  
{{% /command %}}

**IsReversed** menetapkan apakah objek 3D eksterior dibalik. Jika *true*, objek dibalik.

### Bagian Bogie

Bogie depan dan belakang yang dipasang pada kereta dapat ditentukan melalui node anak opsional **\<FrontBogie>** dan **\<RearBogie>**.

Jika tidak ditentukan, setiap bogie secara default terdiri dari sepasang poros yang terletak satu meter di kedua sisi posisi poros luar kereta yang bersangkutan.

{{% command %}}  
**\<FrontBogie>** *BogieProperties* **\</FrontBogie>**  
{{% /command %}}

{{% command %}}  
**\<RearBogie>** *BogieProperties* **\</RearBogie>**  
{{% /command %}}

**BogieProperties** adalah sekumpulan node anak, yang mendukung properti berikut:

{{% command %}}  
**\<FrontAxle>** *Position* **\</FrontAxle>**  
{{% /command %}}

**Position** harus berupa posisi poros depan bogie dalam meter, diukur relatif terhadap posisi poros luar kereta yang bersangkutan.

{{% command %}}  
**\<RearAxle>** *Position* **\</RearAxle>**  
{{% /command %}}

**Position** harus berupa posisi poros belakang bogie dalam meter, diukur relatif terhadap posisi poros luar kereta yang bersangkutan.

{{% command %}}  
**\<Object>** *ObjectFile* **\</Object>**  
{{% /command %}}

**ObjectFile** harus berupa path relatif di disk ke objek 3D yang akan digunakan untuk bogie ini.

{{% command %}}  
**\<Reversed>** *IsReversed* **\</Reversed>**  
{{% /command %}}

**IsReversed** menetapkan apakah objek 3D bogie dibalik. Jika *true*, objek dibalik.

{{% command %}}  
**\<InteriorView>** *ObjectFile* **\</InteriorView>**  
{{% /command %}}

**ObjectFile** harus berupa path relatif di disk ke tampilan interior yang akan digunakan. Ini dapat berupa objek 3D (misalnya **b3d** / **csv** / **animated**), file **panel2.cfg**, atau file XML yang menggunakan format XML **panel.xml** atau **panel.animated**.

{{% command %}}  
**\<InteriorDirection>** *DirectionX*, *DirectionY*, *DirectionZ* **\</InteriorDirection>**  
{{% /command %}}

Perintah ini memungkinkan Anda memutar kamera interior, sehingga memungkinkan tampilan yang tidak sejajar dengan arah jalur ke depan.

{{% command-arguments %}}  
**DirectionX** Jumlah derajat rotasi kamera interior awal pada sumbu X.
**DirectionY** Jumlah derajat rotasi kamera interior awal pada sumbu Y.
**DirectionZ** Jumlah derajat rotasi kamera interior awal pada sumbu Z.
{{% /command-arguments %}}  

{{% command %}}  
**\<VisibleFromInterior>** *IsVisible* **\</VisibleFromInterior>**  
{{% /command %}}

**IsVisible** mengontrol apakah objek eksterior kereta ini terlihat dari interior kereta lain. Jika *true*, objek akan terlihat.

{{% command %}}  
**\<LoadingSway>** *Sways* **\</LoadingSway>**  
{{% /command %}}

**Sways** menetapkan apakah goyangan pemuatan memengaruhi kereta ini secara khusus. Jika *true*, maka saat penumpang naik di stasiun, animasi goyangan pemuatan digunakan.

{{% command %}}  
**\<DriverPosition>** *Position* **\</DriverPosition>**  
{{% /command %}}

**Position** harus berisi vektor 3D yang dipisahkan koma, yang menentukan posisi mata masinis di dalam kereta, relatif terhadap *0,0,0*

{{% command %}}  
**\<Cargo>** *CargoType* **\</Cargo>**  
{{% /command %}}

**CargoType** menentukan jenis muatan yang diangkut kereta ini. Jenis muatan berikut tersedia:

{{% command-arguments %}}  
**Passenger**: Kereta ini mengangkut penumpang. Berat keseluruhannya dipengaruhi oleh pemuatan yang diberikan di stasiun, dan ketidaknyamanan penumpang dinilai.
**Freight**: Kereta ini mengangkut barang. Berat keseluruhannya dipengaruhi oleh pemuatan yang diberikan di stasiun.  
**None**: Kereta ini tidak mengangkut muatan (misalnya lokomotif, kereta rem, atau sejenisnya). Beratnya tidak dipengaruhi oleh pemuatan yang diberikan di stasiun.  
{{% /command-arguments %}}

## <a name="power"></a>■ 3.1. Bagian Power

Kereta motor dapat menentukan node **\<Power>**.

Node ini mendefinisikan kurva percepatan dan tuas daya yang dipasang pada kereta, serta mendukung node anak berikut:

### 3.1.1. Kurva Percepatan

{{% warning-nontitle %}}

Dalam **train.dat**, angka kurva percepatan diberikan untuk rangkaian secara keseluruhan, dan perhitungan internal dilakukan untuk menghasilkan angka percepatan per kereta.
<br><br>
Namun, dalam **train.xml**, angka kurva percepatan hanya berlaku untuk kereta saat ini.

{{% /warning-nontitle %}}

Node anak **\<AccelerationCurves>** harus berisi daftar node kurva percepatan. Node tersebut harus dalam urutan menaik, dan harus sesuai dengan jumlah notch daya yang dimiliki rangkaian.

{{% note %}}

Untuk kompatibilitas mundur, node **\<AccelerationCurves>** juga dapat diletakkan langsung di bawah node **\<Car>**, bukan di bawah node **\<Power>**.

{{% /note %}}

Saat ini, satu-satunya node kurva percepatan yang didukung adalah node **\<OpenBVE>**, yang mendukung properti berikut (sesuai kurva percepatan **train.dat**):

{{% command %}}  
**\<StageZeroAcceleration>** *Acceleration* **\</StageZeroAcceleration>**  
{{% /command %}}

**Acceleration** harus berupa bilangan pecahan positif yang menyatakan percepatan pada kecepatan 0 km/jam yang dinyatakan dalam km/jam/detik.

{{% command %}}  
**\<StageOneAcceleration>** *Acceleration* **\</StageOneAcceleration>**  
{{% /command %}}

**Acceleration** harus berupa bilangan pecahan positif yang menyatakan percepatan pada kecepatan *n* km/jam yang dinyatakan dalam km/jam/detik.

{{% command %}}  
**\<StageOneSpeed>** *Speed* **\</StageOneSpeed>**  
{{% /command %}}

**Speed** harus berupa bilangan pecahan positif yang menyatakan kecepatan acuan untuk *StageOneAcceleration*

{{% command %}}  
**\<StageTwoExponent>** *Exponent* **\</StageTwoExponent>**  
{{% /command %}}

**Exponent** harus berupa bilangan pecahan positif yang menyatakan eksponen yang digunakan dalam perhitungan kecepatan tahap dua.

{{% command %}}  
**\<StageTwoSpeed>** *Speed* **\</StageTwoSpeed>**  
{{% /command %}}

**Speed** harus berupa bilangan pecahan positif yang menyatakan kecepatan acuan untuk *StageTwoExponent*

{{% command %}}  
**\<Multiplier>** *Number* **\</Multiplier>**  
{{% /command %}}

**Number** harus berupa bilangan pecahan positif yang menyatakan keluaran gabungan kereta motor terhadap percepatan rangkaian. Nilai default adalah **1.0** Nilai nol atau kurang, atau lebih dari 50, tidak valid.

{{% warning-nontitle %}}

Angka ini hanya bermakna untuk rangkaian yang menggunakan angka percepatan BVE yang dikonversi melalui *CarXMLConvertor*, dan harus dihilangkan jika mengatur keluaran percepatan secara per kereta.

{{% /warning-nontitle %}}



Dengan demikian:

Jika kecepatan rangkaian adalah 0 km/jam, *a<sub>0</sub>* menunjukkan keluaran percepatan.

Jika kecepatan rangkaian berada di antara 0 km/jam dan *v<sub>1</sub>*, keluaran percepatan ditentukan melalui rumus berikut:

{{% function "*Percepatan antara 0 km/jam dan v<sub>1</sub>, dengan x adalah kecepatan rangkaian saat ini dalam km/jam:*" %}}  
a<sub>0</sub> + (a<sub>1</sub> - a<sub>0</sub>) \* x / v<sub>1</sub>  
{{% /function %}}

Jika kecepatan rangkaian adalah *v<sub>1</sub>*, keluaran percepatan ditunjukkan oleh *a<sub>1</sub>*.

Jika kecepatan rangkaian berada di antara *v<sub>1</sub>* dan *v<sub>2</sub>*, keluaran percepatan ditentukan melalui rumus berikut:

{{% function "*Percepatan antara v<sub>1</sub> dan v<sub>2</sub>, dengan x adalah kecepatan rangkaian saat ini dalam km/jam:*" %}}  
v<sub>1</sub> \* a<sub>1</sub> / x  
{{% /function %}}

Jika kecepatan rangkaian lebih besar dari *v<sub>2</sub>*, keluaran percepatan ditentukan melalui rumus berikut (untuk eksponen versi 2.0):

{{% function "_Percepatan di atas v<sub>2</sub>, dengan x adalah kecepatan rangkaian saat ini dalam km/jam:_" %}}  
v<sub>1</sub> \* a<sub>1</sub> \* v<sub>2</sub><sup>e-1</sup> / x<sup>e</sup>  
{{% /function %}}

### 3.1.2. Tuas Daya

{{% note-withtitle %}}

#### *Kereta masinis dan bukan masinis:* 

Properti di dalam node ini hanya akan diinterpretasikan jika kereta ditentukan sebagai kereta masinis.

{{% /note-withtitle %}}

Node **\<Handle>** menentukan properti untuk tuas daya, dan mendukung properti berikut:

{{% command %}}  
**\<Notches>** *NumberOfNotches* **\</Notches>**  
{{% /command %}}

**NumberOfNotches** harus berupa bilangan bulat positif, yang menetapkan jumlah notch daya.

{{% note %}}

Untuk tuas sederhana, node **\<Notches>** juga dapat ditentukan langsung di bawah node **\<Power>**, tanpa node **\<Handle>** yang membungkusnya.

{{% /note %}}

{{% command %}}  
**\<SpringType>** *Type* **\</SpringType>** 
{{% /command %}}

{{% command-arguments %}}  
***Type***: Jenis pegas kembali yang dipasang pada tuas ini (jika ada).
{{% /command-arguments %}}

▸ Pilihan yang tersedia untuk *Type*:

{{% command-arguments %}}  
**Unsprung**: Tidak ada mekanisme pegas kembali yang dipasang.  
**Single**: Mekanisme pegas kembali diatur ulang saat tuas ini dioperasikan.  
**AnyHandle**: Mekanisme pegas kembali diatur ulang saat tuas daya atau rem mana pun dioperasikan.
**AnyKey**: Mekanisme pegas kembali diatur ulang saat tombol keyboard atau kontrol joystick mana pun dioperasikan.
{{% /command-arguments %}}

{{% command %}}  
**\<SpringTime>** *Time* **\</SpringTime>**  
{{% /command %}}

**Time** harus berupa angka positif, yang menetapkan waktu dalam detik yang diperlukan tuas untuk kembali ke posisi istirahatnya saat dilepas.

{{% note %}}

Node **\<SpringTime>** harus diatur agar mekanisme pegas kembali dipasang - Jika tidak diatur, tuas diperlakukan sebagai tanpa pegas, terlepas dari nilai **\<SpringType>**.

{{% /note %}}

{{% command %}}  
**\<MaxSprungNotch>** *Notch* **\</MaxSprungNotch>**  
{{% /command %}}

**Notch** harus berupa bilangan bulat positif, yang menentukan notch tertinggi tempat mekanisme pegas kembali dapat menahan tuas.

## <a name="brake"></a>■ 3.2. Bagian Brake

Bagian **\<Brake>** menentukan properti sistem pengereman kereta, dan terdiri dari node anak berikut, yang masing-masing sesuai dengan komponen sistem rem udara standar pipa ganda:

### Kompresor udara

Node opsional **\<Compressor>**, yang mendukung properti berikut:

{{% command %}}  
**\<Rate>** *CompressionRate* **\</Rate>**  
{{% /command %}}

**CompressionRate** harus berupa angka positif, yang menyatakan laju kompresi dalam Pa/detik.

{{% command %}}  
**\<RestartPressure>** *CompressionRate* **\</RestartPressure>**  
{{% /command %}}

**Pressure** harus berupa angka positif, yang menyatakan tekanan dalam Pa di reservoir utama, saat kompresor mulai kembali.

**Catatan:** Jika tidak diatur, kompresor mulai kembali saat tekanan di reservoir utama mencapai minimum.

### Reservoir Utama

Node **\<MainReservoir>**, yang mendukung properti berikut:

{{% command %}}  
**\<MinimumPressure>** *Pressure* **\</MinimumPressure>**  
{{% /command %}}

**Pressure** harus berupa angka positif, yang menyatakan tekanan minimum di reservoir utama dalam Pa.

{{% command %}}  
**\<MaximumPressure>** *Pressure* **\</MaximumPressure>**  
{{% /command %}}

**Pressure** harus berupa angka positif, yang menyatakan tekanan maksimum yang dapat dicapai di reservoir utama dalam Pa.

{{% command %}}  
**\<Volume>** *Volume* **\</Volume>**  
{{% /command %}}

**Volume** harus berupa angka positif, yang menyatakan volume reservoir utama dalam meter kubik (m³).

### Reservoir Bantu

Node **\<AuxiliaryReservoir>**, yang mendukung properti berikut:

{{% command %}}  
**\<ChargeRate>** *Rate* **\</ChargeRate>**  
{{% /command %}}

**Rate** harus berupa angka positif, yang menyatakan laju pengisian reservoir bantu dari reservoir utama dalam Pa/detik.

{{% command %}}  
**\<Volume>** *Volume* **\</Volume>**  
{{% /command %}}

**Volume** harus berupa angka positif, yang menyatakan volume reservoir bantu dalam meter kubik (m³).

### Reservoir Penyeimbang

Node **\<EqualizingReservoir>**, yang mendukung properti berikut:

{{% command %}}  
**\<NormalPressure>** *Pressure* **\</NormalPressure>**  
{{% /command %}}

**Pressure** harus berupa angka positif, yang menyatakan tekanan normal reservoir ini dalam Pa.

{{% note %}}

Tekanan normal reservoir penyeimbang tidak dapat diatur secara langsung - Nilai ini diturunkan dari tekanan normal pipa rem (1,005 × *NormalPressure* dari **\<BrakePipe>**).

{{% /note %}}

{{% command %}}  
**\<ChargeRate>** *Rate* **\</ChargeRate>**  
{{% /command %}}

**Rate** harus berupa angka positif, yang menyatakan laju pengisian reservoir penyeimbang dalam Pa/detik.

{{% command %}}  
**\<ServiceRate>** *Rate* **\</ServiceRate>**  
{{% /command %}}

**Rate** harus berupa angka positif, yang menyatakan laju pengisian dalam Pa/detik saat melakukan pengereman servis.

{{% command %}}  
**\<EmergencyRate>** *Rate* **\</EmergencyRate>**  
{{% /command %}}

**Rate** harus berupa angka positif, yang menyatakan laju pengisian dalam Pa/detik saat melakukan pengereman darurat.

{{% command %}}  
**\<Volume>** *Volume* **\</Volume>**  
{{% /command %}}

**Volume** harus berupa angka positif, yang menyatakan volume reservoir penyeimbang dalam meter kubik (m³).

### Pipa Rem

Node **\<BrakePipe>**, yang mendukung properti berikut:

{{% command %}}  
**\<NormalPressure>** *Pressure* **\</NormalPressure>**  
{{% /command %}}

**Pressure** harus berupa angka positif, yang menyatakan tekanan nominal normal pipa rem dalam Pa.

{{% command %}}  
**\<ChargeRate>** *Rate* **\</ChargeRate>**  
{{% /command %}}

**Rate** harus berupa angka positif, yang menyatakan laju pengisian normal dalam Pa/detik.

{{% command %}}  
**\<ServiceRate>** *Rate* **\</ServiceRate>**  
{{% /command %}}

**Rate** harus berupa angka positif, yang menyatakan laju pengisian dalam Pa/detik saat melakukan pengereman servis.

{{% command %}}  
**\<EmergencyRate>** *Rate* **\</EmergencyRate>**  
{{% /command %}}

**Rate** harus berupa angka positif, yang menyatakan laju pengisian dalam Pa/detik saat melakukan pengereman darurat.

{{% command %}}  
**\<Volume>** *Volume* **\</Volume>**  
{{% /command %}}

**Volume** harus berupa angka positif, yang menyatakan volume pipa rem dalam meter kubik (m³).

### Pipa Udara Langsung

Node **\<StraightAirPipe>**, yang mendukung properti berikut:

{{% command %}}  
**\<ServiceRate>** *Rate* **\</ServiceRate>**  
{{% /command %}}

**Rate** harus berupa angka positif, yang menyatakan laju pengisian dalam Pa/detik saat melakukan pengereman servis.

{{% command %}}  
**\<EmergencyRate>** *Rate* **\</EmergencyRate>**  
{{% /command %}}

**Rate** harus berupa angka positif, yang menyatakan laju pengisian dalam Pa/detik saat melakukan pengereman darurat.

{{% command %}}  
**\<ReleaseRate>** *Rate* **\</ReleaseRate>**  
{{% /command %}}

**Rate** harus berupa angka positif, yang menyatakan laju pengisian dalam Pa/detik saat melepaskan pengereman.

### Silinder Rem

Node **\<BrakeCylinder>**, yang mendukung properti berikut:

{{% command %}}  
**\<ServiceMaximumPressure>** *Pressure* **\</ServiceMaximumPressure>**  
{{% /command %}}

**Pressure** harus berupa angka positif, yang menyatakan tekanan maksimum dalam Pa saat melakukan pengereman servis penuh.

{{% command %}}  
**\<EmergencyMaximumPressure>** *Pressure* **\</EmergencyMaximumPressure>**  
{{% /command %}}

**Pressure** harus berupa angka positif, yang menyatakan tekanan maksimum dalam Pa saat melakukan pengereman darurat penuh.

{{% command %}}  
**\<EmergencyRate>** *Rate* **\</EmergencyRate>**  
{{% /command %}}

**Rate** harus berupa angka positif, yang menyatakan laju pelepasan dalam Pa/detik selama pengereman darurat penuh.

{{% command %}}  
**\<ReleaseRate>** *Rate* **\</ReleaseRate>**  
{{% /command %}}

**Rate** harus berupa angka positif, yang menyatakan laju pengisian dalam Pa/detik saat melepaskan rem.

{{% command %}}  
**\<Volume>** *Volume* **\</Volume>**  
{{% /command %}}

**Volume** harus berupa angka positif, yang menyatakan volume silinder rem dalam meter kubik (m³).

{{% command %}}  
**\<LegacyPressureDistribution>** *Boolean* **\</LegacyPressureDistribution>**  
{{% /command %}}

**Boolean** harus berupa nilai boolean true / false, yang menentukan apakah model pipa rem train.dat lama digunakan - Jika *true*, distribusi tekanan pipa rem dirata-ratakan di seluruh rangkaian, bukan disimulasikan per kereta.

### Tuas Rem

{{% note-withtitle %}}

#### *Kereta masinis dan bukan masinis:* 

Properti di dalam node ini hanya akan diinterpretasikan jika kereta ditentukan sebagai kereta masinis.

{{% /note-withtitle %}}

Node **\<Handle>** menentukan properti untuk tuas rem, dan mendukung properti berikut:

{{% command %}}  
**\<Notches>** *NumberOfNotches* **\</Notches>**  
{{% /command %}}

**NumberOfNotches** harus berupa bilangan bulat positif, yang menetapkan jumlah notch rem.

{{% note %}}

Untuk tuas sederhana, node **\<Notches>** juga dapat ditentukan langsung di bawah node **\<Brake>**, tanpa node **\<Handle>** yang membungkusnya.

{{% /note %}}

{{% command %}}  
**\<SpringType>** *Type* **\</SpringType>** 
{{% /command %}}

{{% command-arguments %}}  
***Type***: Jenis pegas kembali yang dipasang pada tuas ini (jika ada).
{{% /command-arguments %}}

▸ Pilihan yang tersedia untuk *Type*:

{{% command-arguments %}}  
**Unsprung**: Tidak ada mekanisme pegas kembali yang dipasang.  
**Single**: Mekanisme pegas kembali diatur ulang saat tuas ini dioperasikan.  
**AnyHandle**: Mekanisme pegas kembali diatur ulang saat tuas daya atau rem mana pun dioperasikan.
**AnyKey**: Mekanisme pegas kembali diatur ulang saat tombol keyboard atau kontrol joystick mana pun dioperasikan.
{{% /command-arguments %}}

{{% command %}}  
**\<SpringTime>** *Time* **\</SpringTime>**  
{{% /command %}}

**Time** harus berupa angka positif, yang menetapkan waktu dalam detik yang diperlukan tuas untuk kembali ke posisi istirahatnya saat dilepas.

{{% note %}}

Node **\<SpringTime>** harus diatur agar mekanisme pegas kembali dipasang - Jika tidak diatur, tuas diperlakukan sebagai tanpa pegas, terlepas dari nilai **\<SpringType>**.

{{% /note %}}

{{% command %}}  
**\<MaxSprungNotch>** *Notch* **\</MaxSprungNotch>**  
{{% /command %}}

**Notch** harus berupa bilangan bulat positif, yang menentukan notch tertinggi tempat mekanisme pegas kembali dapat menahan tuas.

{{% command %}}  
**\<MotorBrakeNotch>** *Notch* **\</MotorBrakeNotch>**  
{{% /command %}}

**Notch** harus berupa bilangan bulat positif, yang menentukan notch maksimum tempat pengereman berbantuan motor tersedia.

## <a name="traction"></a>■ 3.3. Model Traksi

Dua model traksi didukung: Mesin listrik dan mesin diesel. Selain itu, kereta motor standar yang menggunakan kurva percepatan gaya BVE dapat ditentukan melalui node **\<MotorCar>**.

### <a name="electric"></a>3.3.1. Mesin Listrik

Node **\<ElectricEngine>** memodelkan mesin listrik sederhana, yang menggunakan pantograf untuk mengambil arus dari kabel listrik di atas.

Dengan model traksi ini, salah satu kereta dalam rangkaian harus memiliki pantograf, yang harus dinaikkan agar rangkaian dapat bergerak.

Node ini mendukung properti berikut:

{{% command %}}  
**\<Pantograph>** *boolean*  **\</Pantograph>**
**\<CollectorShoe>** *boolean*  **\</CollectorShoe>**
{{% /command %}}

{{% command-arguments %}}  
**Boolean** harus berupa nilai boolean true / false, yang menentukan apakah kendaraan ini memiliki pantograf / sepatu pengumpul rel ketiga.
{{% /command-arguments %}}

Motor traksi dapat ditambahkan melalui node anak **\<TractionMotor>** atau **\<RegenerativeTractionMotor>**.

Node tersebut mendukung properti berikut:

{{% command %}}  
**\<MaxAmps>** *Amps*  **\</MaxAmps>**
{{% /command %}}

{{% command-arguments %}}  
**Amps** menyatakan jumlah ampere yang ditarik motor traksi saat rangkaian berakselerasi maksimum.
{{% /command-arguments %}}

{{% command %}}  
**\<MaxRegenAmps>** *Amps*  **\</MaxRegenAmps>**
{{% /command %}}

{{% command-arguments %}}  
**Amps** menyatakan jumlah ampere yang ditarik motor traksi saat rangkaian mengerem maksimum, jika motor traksi ini merupakan motor traksi regeneratif.
{{% /command-arguments %}}


### <a name="diesel"></a>3.3.2. Mesin Diesel

Node **\<DieselEngine>** memodelkan mesin diesel. Kereta yang dilengkapi mesin diesel diperlakukan sebagai kereta motor.

Node ini mendukung properti berikut:

{{% command %}}  
**\<IdleRPM>** *RPM*  **\</IdleRPM>**  
**\<MinRPM>** *RPM*  **\</MinRPM>**  
**\<MaxRPM>** *RPM*  **\</MaxRPM>**  
{{% /command %}}

{{% command-arguments %}}  
**RPM**: Kecepatan mesin dalam putaran per menit (RPM) saat idle (**IdleRPM**), pada daya minimum (**MinRPM**), dan pada daya maksimum (**MaxRPM**). Saat idle, mesin berjalan pada **IdleRPM**; kecepatan mesin kemudian naik secara linear dari **MinRPM** ke **MaxRPM** di seluruh notch daya.
{{% /command-arguments %}}

{{% command %}}  
**\<RPMChangeRate>** *Rate*  **\</RPMChangeRate>**  
**\<RPMChangeUpRate>** *Rate*  **\</RPMChangeUpRate>**  
**\<RPMChangeDownRate>** *Rate*  **\</RPMChangeDownRate>**  
{{% /command %}}

{{% command-arguments %}}  
**Rate**: Laju perubahan kecepatan mesin, dalam RPM per detik. **RPMChangeRate** menetapkan kedua laju, yang dapat ditimpa satu per satu melalui **RPMChangeUpRate** dan **RPMChangeDownRate**. Jika diatur ke nol, kecepatan mesin berubah seketika.
{{% /command-arguments %}}

{{% command %}}  
**\<IdleFuelUse>** *Rate*  **\</IdleFuelUse>**  
**\<MaxPowerFuelUse>** *Rate*  **\</MaxPowerFuelUse>**  
{{% /command %}}

{{% command-arguments %}}  
**Rate**: Konsumsi bahan bakar saat idle (**IdleFuelUse**) dan pada daya maksimum (**MaxPowerFuelUse**), dalam satuan bahan bakar per detik. Konsumsi bahan bakar pada notch daya antara diinterpolasi antara kedua angka ini.
{{% /command-arguments %}}

{{% command %}}  
**\<FuelCapacity>** *Capacity*  **\</FuelCapacity>**  
{{% /command %}}

{{% command-arguments %}}  
**Capacity**: Kapasitas tangki bahan bakar. Tangki diisi pada awal rute.
{{% /command-arguments %}}

Motor traksi dapat ditambahkan melalui node anak **\<TractionMotor>** atau **\<RegenerativeTractionMotor>**, yang mendukung properti yang sama seperti pada mesin listrik.

## <a name="doors"></a>■ 3.4. Bagian Doors

Bagian **\<Doors>** menentukan properti pintu penumpang yang dipasang pada kereta ini, dan mendukung properti berikut:

{{% command %}}  
**\<OpenSpeed>** *Speed* **\</OpenSpeed>**  
{{% /command %}}

**Speed** harus berupa angka positif, yang menetapkan waktu yang diperlukan pintu untuk terbuka dalam detik.

{{% command %}}  
**\<CloseSpeed>** *Speed* **\</CloseSpeed>**  
{{% /command %}}

**Speed** harus berupa angka positif, yang menetapkan waktu yang diperlukan pintu untuk tertutup dalam detik.

{{% note %}}

Jika kecepatan membuka atau menutup tidak diatur, nilai ini akan dihitung menggunakan durasi suara buka / tutup.

Lihat dokumentasi **sound.cfg** untuk detail lebih lanjut.

{{% /note %}}

{{% command %}}  
**\<Width>** *DoorWidth* **\</Width>**  
{{% /command %}}

**DoorWidth** harus berupa angka positif, yang menetapkan lebar bukaan pintu dalam meter.

{{% command %}}  
**\<Tolerance>** *DoorTolerance* **\</Tolerance>**  
{{% /command %}}

**DoorTolerance** harus berupa angka positif, yang menetapkan toleransi dalam meter sebelum pintu dianggap tertutup.

## <a name="sanders"></a>■ 3.5. Bagian Sanders

Bagian **\<Sanders>** menentukan properti alat pasir yang dipasang pada kereta ini, dan mendukung properti berikut:

{{% note %}}

Jika tidak diatur, default berikut berlaku: Laju pemasiran tidak terbatas, tingkat pasir dimulai kosong, waktu aplikasi adalah 10 detik, waktu aktivasi adalah 5 detik, dan jumlah tembakan tidak terbatas.

{{% /note %}}

{{% command %}}  
**\<Type>** *Type*  **\</Type>**
{{% /command %}}

{{% command-arguments %}}  
***Type***: Jenis alat pasir yang dipasang pada kereta ini (jika ada).
{{% /command-arguments %}}

▸ Pilihan yang tersedia untuk *Type*:

{{% command-arguments %}}  
**NotFitted**: Tidak ada mekanisme pemasiran yang dipasang.  
**PressAndHold**: Pasir diberikan selama tombol **Sanders** ditahan dan pasir mencukupi.  
**Toggle**: Tombol **Sanders** mengaktifkan dan menonaktifkan pasir.
**NumberOfShots**: Tersedia N tembakan pasir, yang diberikan saat tombol **Sanders** ditekan.
**Automatic**: Pasir diaktifkan secara otomatis saat selip roda terdeteksi dan pasir mencukupi.
{{% /command-arguments %}}

{{% command %}}  
**\<Rate>** *SandingRate*  **\</Rate>**
{{% /command %}}

{{% command-arguments %}}  
***SandingRate***: Laju pemberian pasir per detik.
{{% /command-arguments %}}

{{% command %}}  
**\<SandLevel>** *Level*  **\</SandLevel>**
{{% /command %}}

{{% command-arguments %}}  
***Level***: Tingkat awal pasir, jika tidak dalam mode tembakan.
{{% /command-arguments %}}

{{% command %}}  
**\<NumberOfShots>** *Shots*  **\</NumberOfShots>**
{{% /command %}}

{{% command-arguments %}}  
***Shots***: Jumlah tembakan pasir yang tersedia.
{{% /command-arguments %}}

{{% command %}}  
**\<ApplicationTime>** *Time*  **\</ApplicationTime>**
{{% /command %}}

{{% command-arguments %}}  
***Time***: Saat dalam mode tembakan, menetapkan durasi satu tembakan pasir dalam detik.
{{% /command-arguments %}}

{{% command %}}  
**\<ActivationTime>** *Time*  **\</ActivationTime>**
{{% /command %}}

{{% command-arguments %}}  
***Time***: Saat dalam mode otomatis, jumlah waktu sebelum sistem bereaksi dan memberikan pasir.
{{% /command-arguments %}}

{{% note %}}

Jika node **\<Sanders>** tidak digunakan, node lama **\<ReadhesionDevice>** dapat digunakan sebagai gantinya untuk menentukan perangkat anti-selip sederhana, yang sesuai dengan entri *ReAdhesionDevice* dalam format **train.dat**:

{{% /note %}}

{{% command %}}  
**\<ReadhesionDevice>** *DeviceType*  **\</ReadhesionDevice>**  
{{% /command %}}

▸ Pilihan yang tersedia untuk *DeviceType*:

{{% command-arguments %}}  
**NotFitted**: Tidak ada perangkat readhesi yang dipasang.  
**TypeA** / **A**: Memutus daya seketika dan membangunnya kembali dengan cepat secara bertahap.  
**TypeB** / **B**: Pembaruan tidak terlalu sering dan beradaptasi lambat. Selip roda dapat bertahan lebih lama dan daya pulih lebih lambat. Perilakunya lebih halus.  
**TypeC** / **C**: Perilakunya berada di antara tipe B dan tipe D.  
**TypeD** / **D**: Pembaruan cepat dan beradaptasi cepat. Selip roda hanya terjadi sebentar dan daya pulih dengan cepat. Perilakunya lebih mendadak.  
{{% /command-arguments %}}

Jika tidak ada node yang ada, perangkat readhesi tipe A dipasang secara default, sesuai perilaku **train.dat**.

## <a name="windscreen"></a>■ 3.6. Bagian Windscreen

Bagian **\<Windscreen>** menentukan properti kaca depan, dan harus digunakan jika Anda ingin menganimasikan kaca depan pada kabin 3D menggunakan fungsionalitas bawaan. Bagian ini mendukung properti berikut:

{{% note %}}

Kaca depan hanya dibuat untuk rangkaian pemain.

Jika **\<NumberOfDrops>** tidak diatur, tidak ada kaca depan yang dibuat. Properti lainnya default ke kecepatan sapuan 1 detik, waktu tahan 1 detik, dan umur tetesan 10 detik.

{{% /note %}}

{{% command %}}  
**\<NumberOfDrops>** *Drops*  **\</NumberOfDrops>**
{{% /command %}}

{{% command-arguments %}}  
***Drops***: Jumlah total tetesan pada kaca depan.
{{% /command-arguments %}}

{{% command %}}  
**\<WipeSpeed>** *Speed*  **\</WipeSpeed>**
{{% /command %}}

{{% command-arguments %}}  
***Speed***: Waktu dalam detik bagi wiper untuk melakukan satu sapuan kaca depan.
{{% /command-arguments %}}

{{% command %}}  
**\<HoldTime>** *Time*  **\</HoldTime>**
{{% /command %}}

{{% command-arguments %}}  
***Time***: Waktu dalam detik bagi wiper untuk berhenti di posisi tahan selama satu sapuan.
{{% /command-arguments %}}

{{% command %}}  
**\<DropLife>** *Life*  **\</DropLife>**
{{% /command %}}

{{% command-arguments %}}  
***Life***: Umur dalam detik sebelum tetesan dapat didaur ulang saat semua tetesan terlihat.
{{% /command-arguments %}}

{{% command %}}  
**\<RestPosition>** *Position*  **\</RestPosition>**
{{% /command %}}

{{% command-arguments %}}  
**Position**: Posisi istirahat wiper.
{{% /command-arguments %}}

▸ Pilihan yang tersedia untuk *Position*:

{{% command-arguments %}}  
**Left**: Wiper beristirahat di kiri layar saat mati.  
**Right**: Wiper beristirahat di kanan layar saat mati.  
{{% /command-arguments %}}

{{% command %}}  
**\<HoldPosition>** *Position*  **\</HoldPosition>** 
{{% /command %}}

{{% command-arguments %}}  
**Position**: Posisi tahan wiper.
{{% /command-arguments %}}

▸ Pilihan yang tersedia untuk *Position*:

{{% command-arguments %}}  
**Left**: Wiper berhenti di kiri layar selama *HoldTime* dalam satu sapuan.  
**Right**: Wiper berhenti di kanan layar selama *HoldTime* dalam satu sapuan.  
{{% /command-arguments %}}

## <a name="particles"></a>■ 3.7. Sumber Partikel

Bagian **\<ParticleSource>** melampirkan sumber partikel, seperti gas buang diesel, ke kereta. 

Saat ini, ukuran partikel **hanya** dikendalikan oleh tingkat daya mesin, tetapi tujuannya adalah menambahkan pengendali tambahan di kemudian hari.

Saat partikel dihasilkan, ukuran akhir maksimumnya akan ditentukan dengan interpolasi linear antara **MaximumSize** dan ukuran **MaximumGrown**. Angka ini tetap selama umur partikel.

Jika **Function** tidak ditentukan, ukuran partikel yang diinterpolasi akan dikendalikan oleh tingkat daya mesin, jika tidak, hasil **Function** akan digunakan.



Bagian ini mendukung properti berikut:

{{% command %}}  
**\<Location>** *SourceLocation*  **\</Location>** 
{{% /command %}}

{{% command-arguments %}}  
***SourceLocation***: Vektor 3D yang dipisahkan koma, yang menjelaskan lokasi emitor partikel, relatif terhadap pusat kereta.
{{% /command-arguments %}}

{{% command %}}  
**\<MaximumSize>** *Size*  **\</MaximumSize>** 
{{% /command %}}

{{% command-arguments %}}  
**Size***: Ukuran awal maksimum partikel yang dipancarkan. Ini biasanya harus diatur ke diameter bukaan tempat partikel dipancarkan.
{{% /command-arguments %}}

{{% command %}}  
**\<MaximumGrownSize>** *Size*  **\</MaximumGrownSize>**
{{% /command %}}

{{% command-arguments %}}  
***Size***: Ukuran maksimum yang akan dicapai partikel, pada tingkat daya maksimum.
{{% /command-arguments %}}

{{% command %}}  
**\<InitialDirection>** *Direction*  **\</InitialDirection>**
{{% /command %}}

{{% command-arguments %}}  
***Direction***: Vektor 3D yang dipisahkan koma, yang menjelaskan arah awal gerak partikel saat dipancarkan.
{{% /command-arguments %}}

{{% command %}}  
**\<MaximumLifespan>** *Life*  **\</MaximumLifespan>**
{{% /command %}}
 
{{% command-arguments %}}  
***Life***: Umur maksimum partikel dalam detik.
{{% /command-arguments %}}

{{% command %}}  
**\<Texture>** *FileName*  **\</Texture>** 
{{% /command %}}

{{% command-arguments %}}  
***FileName***: Path relatif ke atlas tekstur 4x4 yang berisi tekstur partikel yang akan digunakan oleh emitor ini.
{{% /command-arguments %}}

{{% command %}}  
**\<EmitsAtIdle>** *Boolean*  **\</EmitsAtIdle>** 
{{% /command %}}

{{% command-arguments %}}  
***Boolean***: **True** atau **1** jika partikel harus dipancarkan saat idle, **False** atau **0** jika tidak.
{{% /command-arguments %}}

{{% command %}}  
**\<Function>** *FunctionScript*  **\</Function>** 
{{% /command %}}

{{% command-arguments %}}  
***FunctionScript***: Skrip fungsi yang mengembalikan nilai saat eksekusi antara **0 (Size)** dan **1 (MaximumGrownSize)**, yang mengendalikan ukuran maksimum partikel yang dipancarkan. 
{{% /command-arguments %}}

{{% information %}}

#### Meng-escape Karakter Khusus dalam XML:

Karakter **>** (tanda lebih besar), **<** (tanda kurang dari), dan **&** (ampersand) adalah karakter yang dicadangkan dalam XML, dan harus di-escape agar file dapat dibaca.

Silakan lihat [dokumentasi Microsoft](https://learn.microsoft.com/en-us/dotnet/desktop/xaml-services/xml-character-entities) 

{{% /information %}}


## <a name="safetysystems"></a>■ 3.8. Sistem Keselamatan
### <a name="dsd"></a>■ 3.8.1. Perangkat Pengawasan Masinis

Bagian **\<DriverSupervisionDevice>** membuat perangkat pengawasan masinis, yang dapat melakukan intervensi jika masinis gagal membatalkannya tepat waktu. 

Bagian ini mendukung properti berikut:

{{% command %}}  
**\<Type>** *DeviceType*  **\</Type>** 
{{% /command %}}

▸ Pilihan yang tersedia untuk *DeviceType*:

{{% command-arguments %}}  
**None**: Tidak ada perangkat pengawasan masinis yang dipasang.  
**CutsPower**: Perangkat memutus daya rangkaian saat diaktifkan.
**ApplyBrake**: Perangkat menerapkan rem servis saat diaktifkan.
**ApplyEmergencyBrake**: Perangkat menerapkan rem darurat saat diaktifkan.  
{{% /command-arguments %}}

{{% command %}}  
**\<Mode>** *DeviceMode*  **\</Mode>** 
{{% /command %}}

▸ Pilihan yang tersedia untuk *DeviceType*:

{{% command-arguments %}}  
**Power**: Timer perangkat diatur ulang saat tuas daya digerakkan.  
**Brake**: Timer perangkat diatur ulang saat tuas rem digerakkan.  
**AnyHandle**: Timer perangkat diatur ulang saat tuas mana pun digerakkan.  
**Independant**: Timer perangkat diatur ulang saat tombol DSD ditekan.  
**HeldKey**: Tombol DSD harus tetap ditekan.  
{{% /command-arguments %}}

{{% command %}}  
**\<TriggerMode>** *TriggerMode*  **\</TriggerMode>**  
{{% /command %}}

▸ Pilihan yang tersedia untuk *TriggerMode*:

{{% command-arguments %}}  
**Always**: Perangkat selalu aktif.  
**TrainMoving**: Perangkat hanya aktif saat rangkaian bergerak.  
**DirectionSet**: Perangkat hanya aktif saat arah ditetapkan pada tuas pembalik.  
{{% /command-arguments %}}

{{% command %}}  
**\<AlarmTime>** *Time*  **\</AlarmTime>** 
{{% /command %}}

{{% command-arguments %}}  
***Time***: Waktu dalam detik sebelum perangkat masuk ke status alarm. Tidak ada intervensi yang dilakukan sampai **InterventionTime** terlampaui.
{{% /command-arguments %}}

{{% note %}}

Jika tidak diatur, waktu alarm default ke nilai **\<InterventionTime>**.

{{% /note %}}

{{% command %}}  
**\<InterventionTime>** *Time*  **\</InterventionTime>** 
{{% /command %}}

{{% command-arguments %}}  
***Time***: Waktu dalam detik sejak perangkat masuk ke status alarm, hingga perangkat melakukan intervensi.
{{% /command-arguments %}}

{{% command %}}  
**\<RequiredStopTime>** *Time*  **\</RequiredStopTime>** 
{{% /command %}}

{{% command-arguments %}}  
***Time***: Waktu dalam detik rangkaian harus berhenti setelah intervensi, sampai perangkat dapat diatur ulang.
{{% /command-arguments %}}

{{% command %}}  
**\<LoopingAlert>** *boolean*  **\</LoopingAlert>**
{{% /command %}}

{{% command-arguments %}}  
**Boolean** harus berupa nilai boolean true / false, yang menentukan apakah nada peringatan dimainkan sekali, atau terus-menerus sampai perangkat melakukan intervensi.
{{% /command-arguments %}}

{{% command %}}  
**\<LoopingAlarm>** *boolean*  **\</LoopingAlarm>**
{{% /command %}}

{{% command-arguments %}}  
**Boolean** harus berupa nilai boolean true / false, yang menentukan apakah nada alarm dimainkan sekali, atau terus-menerus sampai perangkat diatur ulang.
{{% /command-arguments %}}

## <a name="soundtable"></a>■ 3.9. Tabel Suara Motor

Node opsional **\<SoundTable>** memungkinkan tabel suara motor dilampirkan ke model traksi kereta.

Saat ini, satu-satunya node anak yang didukung adalah **\<BVE5>**, yang memuat tabel suara motor format BVE5:

{{% command %}}  
**\<BVE5>** *TableProperties* **\</BVE5>**  
{{% /command %}}

**TableProperties** adalah sekumpulan node anak, yang masing-masing berisi path relatif di disk ke file tabel suara yang bersangkutan:

{{% command %}}  
**\<PowerFreq>** *FileName*  **\</PowerFreq>**  
**\<PowerVol>** *FileName*  **\</PowerVol>**  
**\<BrakeFreq>** *FileName*  **\</BrakeFreq>**  
**\<BrakeVol>** *FileName*  **\</BrakeVol>**  
{{% /command %}}

{{% command-arguments %}}  
**FileName**: Path relatif ke file tabel suara motor BVE5 yang berisi tabel frekuensi (**Freq**) atau volume (**Vol**) untuk aplikasi daya (**Power**) atau rem (**Brake**).
{{% /command-arguments %}}  

## <a name="coupler"></a>■ 4. Bagian Coupler

Node kereta (atau referensi file anak) dapat dipisahkan secara opsional oleh node **\<Coupler>**.

Ini mendefinisikan kopler antara dua kereta, dan mendukung properti berikut:

{{% command %}}  
**\<Minimum>** *Distance* **\</Distance>**  
{{% /command %}}

**Distance** menetapkan jarak minimum antara dua kereta.

{{% command %}}  
**\<Maximum>** *Distance* **\</Maximum>**  
{{% /command %}}

**Distance** menetapkan jarak maksimum antara dua kereta.

Perhatikan bahwa *Maximum* harus lebih besar dari atau sama dengan *Minimum*.

{{% command %}}  
**\<Object>** *ObjectFile* **\</Object>**  
{{% /command %}}

**ObjectFile** harus berupa path relatif di disk ke objek 3D eksterior yang akan digunakan.

{{% note %}}

Objek kopler tidak mengalami deformasi saat kopler memanjang / memendek.

{{% /note %}}

{{% command %}}  
**\<CanUncouple>** *Boolean* **\</CanUncouple>**  
{{% /command %}}

**Boolean** harus berupa nilai boolean true / false, yang menentukan apakah kopler ini dapat dilepas oleh pemain.

{{% command %}}  
**\<UncouplingBehaviour>** *Behaviour* **\</UncouplingBehaviour>**  
{{% /command %}}

**Behaviour** menetapkan perilaku sistem rem saat kopler ini dilepas.

▸ Pilihan yang tersedia untuk *Behaviour*:

{{% command-arguments %}}  
**Emergency**: Rem darurat diterapkan pada kedua rangkaian.  
**EmergencyPlayer**: Rem darurat diterapkan pada rangkaian pemain; rangkaian yang dilepas mempertahankan pengaturan rem sebelumnya.  
**EmergencyUncoupledConsist**: Rem darurat diterapkan pada rangkaian yang dilepas; rangkaian pemain mempertahankan pengaturan rem sebelumnya.  
**ReleasedUncoupledConsist**: Rem dilepaskan pada rangkaian yang dilepas; rangkaian pemain mempertahankan pengaturan rem sebelumnya.  
**Released**: Rem dilepaskan pada kedua rangkaian.  
{{% /command-arguments %}}  

## <a name="misc"></a>■ 5. Properti Lain-lain

{{% command %}}  
**\<Plugin>** *PluginFile* **\</Plugin>**  
{{% /command %}}

**PluginFile** harus berisi path relatif ke DLL plugin keamanan yang akan dimuat - Ini hanya berlaku untuk rangkaian pemain.

Saat menggunakan plugin .Net yang mendukung beberapa instans yang berjalan, format alternatif berikut dapat digunakan:

{{% command %}}  
**\<Plugin>** <br>
&nbsp;**\<File>** *PluginFile* **\</File>** <br>
&nbsp;**\<LoadForAI>** *Boolean* **\</LoadForAI>** <br>
**\</Plugin>**  
{{% /command %}}

**PluginFile** harus berisi path relatif ke DLL plugin keamanan berbasis .Net yang akan dimuat.

**Boolean** harus berupa nilai boolean true / false, yang menentukan apakah plugin ini juga harus dimuat untuk instans AI tambahan.


{{% command %}}  
**\<Description>** *Text* **\</Description>**  
{{% /command %}}

**Text** harus berisi deskripsi tekstual rangkaian untuk ditampilkan di menu utama.

{{% command %}}  
**\<HeadlightStates>** *NumberOfStates* **\</HeadlightStates>**  
{{% /command %}}

**NumberOfStates** harus berupa jumlah total status yang dimiliki lampu depan rangkaian.

*Catatan:* Efek lampu depan harus diimplementasikan oleh pengembang rangkaian, menggunakan properti animasi / panel. 

Node **\<DriverBody>** berisi properti yang berkaitan dengan tubuh masinis. Ini digunakan untuk menghitung pantulan kepala yang disebabkan oleh perintah **Track.Accuracy**.

Node ini mendukung properti berikut:

{{% command %}}  
**\<ShoulderHeight>** *Height* **\</ShoulderHeight>**  
{{% /command %}}

**Height** harus berupa tinggi bahu masinis dalam meter di atas titik poros - Jika masinis duduk, ini harus berupa jarak dari dasar kursi ke bahu, dan jika berdiri harus berupa tinggi dari lantai ke bahu.

{{% command %}}  
**\<HeadHeight>** *Height* **\</HeadHeight>**  
{{% /command %}}

**Height** harus berupa tinggi dalam meter dari bahu masinis ke titik pusat kepala.
