---
title: "BVE Trainsim과의 차이점"
linktitle: "대. BVE Trainsim"
weight: 9
---

이 페이지에는 파일 형식과 관련하여 openBVE와 BVE Trainsim 어떤 ** 비 호환 ** 언어가 있고 있습니다. 즉, BVE Trainsim 용으로 개발 된 콘텐츠의 기능은 호환되지 않는 결과로 openBVE에서 다르게 해석됩니다. 현재 외형 외 다른 하나만 있습니다.

이 페이지에 언급 된 모든 비에 대해 해결 방법은 동일합니다. BVE와 유사성을 제공하는 것이 더 중요한 기능을 제공하는 것이 더 중요합니다. Trainsim. 따라서 모든 차이점은 동일합니다.

## ■ Track.Signal 명령어  (CSV, RW 루트)

Track.Signal (또는 Track.Sig)은 CSV 경로에서 기본 일본식 신호를 만드는 데 사용됩니다 (RW 경로에서 대체 철자가 사용됨).

openBVE에서 Track.Signal 명령어는 다음의 형식을 따른다:

{{% command %}}  
**Track.Signal** *Aspects*; *~~Unused~~*; *X*; *Y*; <u>*Yaw*</u>; *Pitch*; *Roll*  
{{% /command %}}

BVE Trainsim에서 Track.Signal 명령은 다음 인수를 사용합니다.

{{% command %}}  
**Track.Signal** *Aspects*; *Label*; *X*; *Y*; <u>*Type*</u>  
{{% /command %}}

BVE Trainsim의 * Label * 매개 변수는 텍스트입니다. 기술 openBVE에서 기능을 제공하지 않는 신호 (문서에서는 * 미사용 *라고 함).

BVE Trainsim은 1, 2 또는 3 값을 취할 수있는 * Type * 인수를 특징으로합니다. 이는 다른 유형의 신호 (예 : 홈 신호 대 출발 신호)를 나타내는 데 사용됩니다. 단순히 우연히이 인수는 openBVE에 포함되지 않았고, 이후에 신호 헤드의 방향을 더 잘 제어하기 위해 * Yaw *, * Pitch * 및 * Roll * 인수를 포함 할 필요가 생겼습니다. 결과적으로 BVE Trainsim의 * Type * 및 openBVE의 * Yaw * 인수가 비호 환적으로 겹칩니다. BVE Trainsim 용으로 생성 된 경로에 * Type * 인수가 포함 된 경우 openBVE에서 최대 3 도의 요 (yaw)로 해석됩니다. 일반적으로이 작은 각도는 특히 매개 변수가 자주 사용되지 않는 경우 눈에 띄는 차이를 생성하지 않아야합니다.
