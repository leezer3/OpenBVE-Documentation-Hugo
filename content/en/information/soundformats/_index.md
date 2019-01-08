---
title: "Supported sound formats"
linktitle: "Sound formats"
weight: 5
---

This is a list of supported sound formats.

{{% table %}}

| Format      | Usual file extension |
| ----------- | -------------------- |
| RIFF WAVE   | .wav                 |
| Native FLAC | .flac                |

{{% /table %}}

Please note that due to its 3D positional nature, openBVE will convert multi-channel audio to mono upon loading, so there is no point in providing multi-channel audio in the first place. For multi-channel audio, openBVE discards silent channels and tries to detect constructive or destructive interference in the mixed version of the remaining channels. If interference is detected, the first non-silent channel in the file is used, otherwise the mixed channel.

## ■ RIFF WAVE format

WAVE files are supported, which technically are RIFF (or RIFX) container files with the WAVE format type. WAVE itself allows different formats, of which only a subset are supported. These are:

{{% table %}}

| Format          | Sample rate | Bitrate | Channels |
| --------------- | ----------- | ------- | -------- |
| PCM             | any         | any     | any      |
| Microsoft ADPCM | any         | 4 bits  | any      |

{{% /table %}}

Sample rate refers to the number of samples per second per channel. Bitrate refers to the umber of bits per sample per channel.

## ■ Native FLAC format

All native FLAC files are supported with the following (in practice rarely occuring) exceptions:

- Changing the sample rate in the middle of the file is not supported.  
- Negative predictor shifts are not supported.  
- MD5 checks are skipped for bit rates other than 8, 16 or 24.  

------

Further information about these formats from a programmer's point of view can be found on these external sites:

General information about RIFF, WAVE and PCM:

➟ http://www-mmsp.ece.mcgill.ca/Documents/AudioFormats/WAVE/Docs/riffmci.pdf

Information about Microsoft ADPCM:

➟ http://icculus.org/SDL_sound/downloads/external_documentation/wavecomp.htm

Official documentation on FLAC:

➟ http://flac.sourceforge.net/documentation.html

Additional documentation on FLAC:

➟ http://home.comcast.net/~b.langenb/audioformats_letter.pdf
