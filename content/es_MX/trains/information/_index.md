---
title: "Información y sugerencias para creación de trenes"
linktitle: "Información y sugerencias"
weight: 10
---
Esta página presenta información dedicada a los desarrolladores necesiten estar advertidos de sugerencias para la creación de objetos.

## ■ Objetos exteriores

- Los objetos exteriores necesitan seguir las mismas reglas que cualquier otro objeto. Vea [Información y Sugerencias de creación de objetos]({{< ref "/objects/information/_index.md" >}}).



## ■ panel.cfg / panel2.cfg

- Eres libre de usar texturas con canal alfa completamente sin preocuparte del rendimiento o de problemas de transparencias. La clasificacion de profundidad siempre sera realizada correctamente con este tipo de formatos de panel, asi que, has buen uso de parabrisas sucios o humedos a traves del canal de opacidad, por ejemplo.
- En el panel2.cfg, eres responsable por asegurarte que los elementos que se incrustan son ubicados en capas únicas. De otra forma, el  orden de renderizado puede ser errático o pudiera liderar una lucha parpadeante de capas.
- Single textures should be of power-of-two size, e.g. sides should have a length of 1, 2, 4, 8, 16, 32, etc. However, with textures containing smaller images to be extracted later, e.g. DigitalIndicator in panel.cfg or DigitalNumber in panel2.cfg, the individual contained images should be of power-of-two size where possible, while the size of the container texture is irrelevant.