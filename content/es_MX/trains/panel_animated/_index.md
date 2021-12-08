---
title: "El formato de archivo **panel.animated**"
linktitle: "El archivo panel.animated"
weight: 5
---

Si esta presente en la carpeta del tren, este archivo defina una cabina 3D.

El archivo es un normal [archivo animado de objeto]({{< ref "/objects/native/animated/_index.md" >}}). El cuerpo de tren es asumido que esta centrado en los ejes x- y z-, mientras que un valor de 0 en el eje y, corresponde a el tope de los rieles, al igual con los objetos exteriores del tren.

El punto de visualización de los ojos del conductor es determinado por las secciones #CAB o #COCKPIT en el [train.dat]({{< ref "/trains/train_dat/_index.md#cab" >}}) (el cual mide el punto de visualización en milímetros desde el frente del tren ).

Puedes usar el [Object Viewer]({{< ref "/tools/objectviewer/_index.md" >}}) para previsualizar cualquier objeto animado, incluyendo el archivo panel.animated. También puede ser una buena idea de cargar tanto el exterior como el archivo panel.animated en el Object Viewer para así coincidirlos unos con otros.

{{% notice %}}

#### Sobreposición e Iluminación

La cabina es renderizada como una incrustación. Esto significa que la cabina siempre aparecerá en frente de los objetos de escenario. Esto es intencional, debido a que esta manera la lluvia, paredes y otros objetos de obstrucción no puedan ser renderizados dentro de la cabina. Es mas, la iluminacion de la cabina es diferente que la del escenario. Mientras que el ambiente del brillo es reflejada en la cabina, el color de ambiente no lo es, y la cabina siempre aparecerá como si estuviera reflejando una luz blanca. Esta conducta pudiera cambiar en el futuro de las versiones de openBVE.

{{% /notice %}}