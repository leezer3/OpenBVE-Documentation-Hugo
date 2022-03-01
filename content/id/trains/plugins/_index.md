---
title: "Plugin kereta"
weight: 10
---
Plugin kereta berfungsi untuk menambahkan atau mengubah settingan kereta dari default / standarnya di openBVE. Misalnya untuk menambahkan indikator baru pada panel, menambahkan suara sendiri dan mengganti sistem kemudi, atau membuat sistem keamanan ATS, ATC, dan sebagainya.

## ■ Jenis plugin yang tersedia

[**.NET assemblies:**]({{< ref "/plugins/overview/_index.md" >}})  
Tipe ini adalah plugin yang paling cocok dan kompatibel. Dapat dibuat dari aplikasi yang mendukung .NET dan harus dapat digunakan oleh berbagai OS. Anda dapat menggunakan berbagai bahasa pemrograman, termasuk C# atay Visual Basic .NET.

[**Win32 DLLs:**]({{< ref "/trains/plugins/legacy/_index.md" >}})  
Tipe ini sudah tidak disarankan lagi karena hanya dapat digunakan oleh OS Windows, dan banyak yang hanya kompatibel dengan BVE Trainsim. Biasanya memakai bahasa pemrograman C/C++. Supaya dapat digunakan oleh berbagai OS, silakan gunakan format .NET.

## ■ Menambahkan plugin ke dalam kereta

Anda harus menyimpan plugin di dalam folder kereta, kemudian masukkan nama plugin di dalam file [ats.cfg]({{< ref "/trains/ats_cfg/_index.md" >}}). Jika anda menggunakan plugin .NET,  **jangan pernah** menggabungkan plugin anda dengan OpenBveApi.dll.