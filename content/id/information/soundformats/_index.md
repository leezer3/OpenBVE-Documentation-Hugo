---
title: Format suara yang didukung
linktitle: Format suara
weight: 5
---

Berikut ini daftar format suara yang bisa dipakai.

{{% table %}}

| Format      | Ekstensi file umumnya |
| ----------- | -------------------- |
| RIFF WAVE   | .wav                 |
| Native FLAC | .flac                |

{{% /table %}}

CATATAN: openBVE tidak akan membedakan suara Mono dan Stereo. Semua audio akan dianggap Mono karena akan ditentukan pada lokasi 3D di rutenya. Jadi, tidak perlu membuat audio Stereo sebagai suara.

## ■ Format RIFF WAVE

Format suara WAVE dapat dipakai, seperti file akhiran RIFF (atau RIFX) dengan format WAVE. WAVE sendiri tidak semuanya bisa dipakai, beberapa yang bisa dipakai yaitu:

{{% table %}}

| Format          | Sample rate | Bitrate | Channel |
| --------------- | ----------- | ------- | -------- |
| PCM             | apapun         | apapun     | apapun      |
| Microsoft ADPCM | apapun         | 4 bit  | apapun      |

{{% /table %}}

Sample rate adalah besarnya sampel per detik per channel. Bitrate adalah jumlah bit per sampel per channel.

## ■ Format Native FLAC

Semua file FLAC dapat dipakai, kecuali (jarang terjadi) :

- Mengubah sample rate di pertengahan file tidak didukung.
- Perubahan pitch negatif tidak bisa dipakai.
- Pengecekan MD5 akan diabaikan jika bitrate audio selain dari 8, 16, atau 24.

------

Info lebih lanjut tentang format ini dari pandangan programmer dapat ditemukan di situs berikut:

Info tentang RIFF, WAVE, dan PCM:

➟ http://www-mmsp.ece.mcgill.ca/Documents/AudioFormats/WAVE/Docs/riffmci.pdf

Info tentang Microsoft ADPCM:

➟ http://icculus.org/SDL_sound/downloads/external_documentation/wavecomp.htm

Informasi resmi FLAC:

➟ http://flac.sourceforge.net/documentation.html

Info tambahan tentang FLAC:

➟ http://home.comcast.net/~b.langenb/audioformats_letter.pdf
