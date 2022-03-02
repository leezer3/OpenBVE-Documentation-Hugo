---
title: "Format angka"
weight: 2
---

<font color="Gray">Halaman ini menjelaskan format angka mana yang ditemukan dalam berbagai rute dan file kereta api dan bagaimana mematuhinya.</font>

## ■ Isi konten

{{% contents %}}

- [1. Overview](#overview)
- [2. Integers](#integers)
- [3. Floating-point numbers](#floating)
- [4. Times](#times)
- [5. Color values](#colors)

{{% /contents %}}

## <a name="overview"></a>■ 1. Penjelasan

Dalam file rute dan kereta, Anda akan selalu menemukan angka seperti bilangan bulat/integer dan angka floating-point , terkadang juga yang lain. Angka-angka ini harus mengikuti format tertentu, yang dijelaskan di bagian berikut.

Ada dua metode penguraian untuk angka: **Strict** dan **Loose**. Metode Ketat/Strict adalah tipe yang sangat ketat yang tidak meninggalkan ruang untuk membuat kesalahan seperti salah ketik. Metode ini digunakan dalam semua format file baru. Metode Loose adalah model penguraian jadul yang diperlukan untuk kompatibilitas dengan materi yang jadul. File yang berbeda seperti yang disajikan pada halaman *Mengembangkan openBVE* menunjukkan model mana yang digunakan. Perhatikan bahwa kapan pun model *Loose* diizinkan, Anda juga dapat menggunakan format *Strict* karena *Strict* membentuk subset dari *Loose*.

## <a name="integers"></a>■ 2. Integers

**Strict:** Diizinkan di urutan apa pun dari setidaknya satu digit desimal dalam rentang dari 0 hingga 9 (U+0030 - U+0039), secara opsional dapat diawali dengan tanda negatif (U+002D). Urutan karakter yang dihasilkan dapat mencakup spasi di depan atau di belakang.

{{% code "*Examples for Strict integers:*" %}}  
0  
123  
-98  
{{% /code %}}

**Loose:** Semua spasi dihilangkan dari urutan karakter terlebih dahulu. Kemudian, urutan karakter yang tersisa (*abcde*) diinterpretasikan menurut model *Strict*. Jika ini gagal membuat nomor yang valid, karakter terakhir dikeluarkan dari urutan (*abcd*) dan kemudian, urutan diuji lagi. Ini berlanjut sampai nomor yang valid dihasilkan atau sampai tidak ada karakter yang tersisa, setelah itu urutan karakter ditentukan sebagai angka yang tidak valid.

{{% code "*Examples for Loose integers:*" %}}  
123  
77 11  
-987x456  
{{% /code %}}

{{% code "*The interpreted integers from the preceding examples are:*" %}}  
123  
7711  
-987  
{{% /code %}}

## <a name="floating"></a>■ 3. Floating-point numbers

**Strict:**  Diizinkan di urutan apa pun dari setidaknya satu digit desimal dalam kisaran dari 0 hingga 9 (U+0030 - U+0039), secara opsional dapat disisipkan dengan satu pemisah desimal dalam bentuk titik (U+002E) , secara opsional dapat diawali dengan tanda negatif (U+002D). Urutan karakter yang dihasilkan dapat mencakup spasi di depan atau di belakang.

{{% code "*Examples for Strict floating-point numbers:*" %}}  
123  
123\.  
123.0  
123.456  
0.456  
\.456  
-123.456  
{{% /code %}} 

**Loose:** Semua spasi dihilangkan dari urutan karakter terlebih dahulu. Kemudian, urutan karakter yang tersisa (*abcde*) diinterpretasikan menurut model *Strict*. Jika ini gagal untuk membuat nomor yang valid, karakter terakhir dikeluarkan dari urutan (*abcd*) dan kemudian, urutan diuji lagi. Ini berlanjut sampai nomor yang valid dihasilkan atau sampai tidak ada karakter yang tersisa, setelah itu urutan karakter ditentukan sebagai angka yang tidak valid.

{{% code "*Examples for Loose floating-point numbers:*" %}}  
-123 . 456  
987,333  
{{% /code %}}  

{{% code "*The interpreted floating-point numbers from the preceding examples are:*" %}}  
-123.456  
987  
{{% /code %}}

## <a name="times"></a>■ 4. Waktu

**Legacy:** Diizinkan jika salah satu dari urutan berikut:

{{% code %}}  
*hhh*__.__*mmss*  
*hhh*__.__*mms*  
*hhh*__.__*mm*  
*hhh*__.__*m*  
*hhh*  
{{% /code %}}

Dalam urutan ini, *hhh* menunjukkan urutan apa pun dari setidaknya satu digit desimal untuk menunjukkan jam, *mm* menunjukkan bagian menit dua digit, *m* menunjukkan bagian menit satu digit, *ss* menunjukkan dua- digit bagian kedua, *s* menunjukkan bagian kedua satu digit, dan karakter untuk memisahkan jam dari menit adalah titik (U+002E). Semua digit harus berupa karakter dari 0 hingga 9 (U+0030 - U+0039). Spasi di depan atau di belakang diabaikan. Total waktu ditentukan melalui rumus berikut, menghasilkan detik berawal dari tengah malam:

{{% function "*Seconds since midnight for a given time:*" %}}  
3600\**hhh* + 60\**mm* + *ss*  
{{% /function %}}

Jika menit atau detik tidak ditunjukkan, akan dianggap nol. Anda dapat menggunakan jam non-negatif, termasuk nilai yang lebih besar atau sama dengan 24. Jika, misalnya, waktu kedatangan stasiun adalah 23:59:00 (hari ke 1), dan waktu kedatangan stasiun berikut adalah 00:02 :15 (hari ke 2), lalu gunakan urutan berikut untuk mewakili waktu ini untuk memastikan urutan kronologis:

{{% code "*Examples for times:*" %}}  
23.5900  
24.0215  
{{% /code %}}

## <a name="colors"></a>■ 5. Nilai warna

**Hexcolor:** Bilangan heksadesimal enam digit didahului oleh karakter tanda angka (U+0023). Satu digit heksadesimal dapat terdiri dari digit desimal dari 0 hingga 9 (U+0030 - U+0039), huruf kecil dari a hingga f (U+0061 - U+0066) dan huruf besar dari A hingga F ( U+0041 - U+0046). Hexcolor memiliki bentuk berikut:

{{% code %}}  
\#*RRGGBB*  
{{% /code %}}

Pada bagian ini, RR mewakili komponen warna merah, GG komponen warna hijau dan B komponen warna biru. Setiap komponen berkisar dari 00 hingga FF (0 - 255), di mana 00 mewakili tidak ada kontribusi untuk warna itu dan FF kontribusi penuh.

Warna yang umum digunakan (untuk menunjukkan transparansi) yaitu:

{{% code %}}  
<font color="Black">#000000 (hitam)</font>  
<font color="Red">#FF0000 (merah)</font>  
<font color="Green">#00FF00 (hijau)</font>  
<font color="Blue">#0000FF (biru)</font>  
<font color="Cyan">#00FFFF (cyan)</font>  
<font color="Magenta">#FF00FF (magenta)</font>  
<font color="Yellow">#FFFF00 (kuning)</font>  
<font color="White">#FFFFFF (putih)</font>  
{{% /code %}}