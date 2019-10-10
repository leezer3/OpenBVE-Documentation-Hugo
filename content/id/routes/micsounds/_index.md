---
title: Menggunakan mic
linktitle: Menggunakan mic
weight: 2
---

Mulai openBVE 1.5.4.0, game dapat menggunakan mic atau perangkat masukan suara lainnya di posisi tertentu dalam rute.

---

{{% command %}}  
**Track.MicSound** *X* ; *Y* ; *ForwardsTolerance* ; *BackwardsTolerance*  
{{% /command %}}

{{% command-arguments %}}  
***X***: Posisi X suara.  
***Y***: Posisi Y suara.  
***ForwardsTolerance***: Batas jarak suara dapat didengar saat kereta mendekati posisi ini.
***BackwardsTolerance*** : Batas jarak suara dapat didengar setelah kereta melewati posisi ini.
{{% /command-arguments %}}

__**Catatan penggunaan**__:

* Input mic harus diaktifkan dengan tombol **PLAY_MIC_SOUNDS** , defaultnya tekan **W** .
* Suara dari mic akan terdengar di semua lokasi yang ada perintah **Track.MicSound** .
* Hanya perangkat mic openAL awal yang dapat digunakan saat ini.