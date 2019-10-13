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

Please note that due to its 3D positional nature, openBVE will convert multi-channel audio to mono upon loading, so there is no point in providing multi-channel audio in the first place. For multi-channel audio, openBVE discards silent channels and tries to detect constructive or destructive interference in the mixed version of the remaining channels. If interference is detected, the first non-silent channel in the file is used, otherwise the mixed channel.

## ■ Format RIFF WAVE

WAVE files are supported, which technically are RIFF (or RIFX) container files with the WAVE format type. WAVE itself allows different formats, of which only a subset are supported. These are:

{{% table %}}

| Format          | Sample rate | Bitrate | Channels |
| --------------- | ----------- | ------- | -------- |
| PCM             | apapun         | apapun     | apapun      |
| Microsoft ADPCM | apapun         | 4 bit  | apapun      |

{{% /table %}}

Sample rate refers to the number of samples per second per channel. Bitrate refers to the umber of bits per sample per channel.

## ■ Format Native FLAC

Semua file FLAC dapat dipakai, kecuali (jarang terjadi) :

- Mengubah sample rate di pertengahan file tidak didukung.
- Negative predictor shifts are not supported.  
- MD5 checks are skipped for bit rates other than 8, 16 or 24.  

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
