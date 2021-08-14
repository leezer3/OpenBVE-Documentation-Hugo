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

Beacons reserved for the built-in safety systems ATS-SN and ATS-P. These should only be used by route/train developers if the meaning of the beacons are (nearly) identical:

{{% table %}}

| Beacon type | Optional data  | Meaning                                                      |
| ----------- | -------------- | ------------------------------------------------------------ |
| 0           | *SwitchSystem* | S-type transponder for ATS-SN. Placed about 600m in front of a signal. Raises an alarm the driver has to acknowledge whenever the referenced signal is red.<br /><br />Values for *SwitchSystem*:<br />-1: The train should not switch the safety system.<br />0: The train should automatically switch from ATS-P to ATS-SN when passing this beacon. |
| 1           | *SwitchSystem* | SN-type transponder for ATS-SN. Placed about 20m in front of a signal. Triggers the emergency brakes whenever the referenced signal is red.<br /><br />Values for *SwitchSystem*:<br />-1: The train should not switch the safety system.<br />0: The train should automatically switch from ATS-P to ATS-SN when passing this beacon. |
| 2           | *Cars*         | Immediate stop transponder for ATS-SN and ATS-P. Placed after stops. Applies the emergency brakes whenever the referenced signal is red and the number of cars corresponds to the optional data.<br /><br />Values for *Cars*:<br />0: The transponder triggers regardless of the amount of cars.<br />*Positive integer*: The transponder triggers only if *Cars* is greater than or equal to the number of cars the train has. |
| 3           | *SwitchSystem* | Pattern renewal transponder for ATS-P. Multiple of these are placed in front of a signal. Informs the train about the distance to the referenced signal and whether it is red or not. The train then calculates a brake curve to the referenced signal if it is red.<br /><br />Values for *SwitchSystem*:<br />-1: The train should not switch the safety system.<br />0: The train should automatically switch from ATS-SN to ATS-P when passing this beacon. |
| 4           | *SwitchSystem* | Immediate stop transponder for ATS-P. Placed about 25m/30m in front of a signal. Informs the train about the distance to the referenced signal and whether it is red or not. The train brakes immediately if the signal is red.<br /><br />Values for *SwitchSystem*:<br />-1: The train should not switch the safety system.<br />0: The train should automatically switch from ATS-SN to ATS-P when passing this beacon. |

{{% /table %}}

Beacons used by legacy train systems to simulate weather (Note- These will also be utilised by any train using the new Windscreen functionality):

{{% table %}}

| Beacon type | Optional data  | Meaning                                                      |
| ----------- | -------------- | ------------------------------------------------------------ |
| 21           | *Intensity*   | Sets the intensity of the weather.<br /><br />Values for *Intensity* should be within the following range:<br />0: No weather.<br />100: Maximum weather intensity. |

{{% /table %}}

UK Basic AWS / TPWS Beacons (Supported by OS_ATS, UKTrainSys, UKDT, UKMU & UKEMU):

{{% table %}}

| Beacon type | Optional data  | Meaning                                                      |
| ----------- | -------------- | ------------------------------------------------------------ |
| 44000       | 0              | Permanent AWS signal approach magnet. Raises an alarm the driver has to acknowledge if the referenced signal is red. |
| 44001       | 0              | AWS speed restriction magnet. Raises an alarm the driver has to acknowledge regardless. |
| 44003       | 0              | TPWS inductor associated with a signal. Triggers a TPWS brake demand if the referenced section is occupied. |
| 44003       | 0              | TPWS inductor associated with a signal. Triggers a TPWS brake demand if the referenced section is occupied. <br /> If you wish to issue a brake demand regardless (e.g. buffers), then the current section should be referenced. |
| 44004       | *Speed*        | TPWS overspeed inductor. Triggers a TPWS brake demand if the train's speed is greater than *Speed*. |

{{% /table %}}