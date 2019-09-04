---
title: Información y sugerencias para la creación de objeto
linktitle: Información y sugerencias
weight: 3
---

Esta página presenta información dedicada a los desarrolladores necesiten estar advertidos de sugerencias para la creación de objetos.

## ■ Comandos

- En los comandos Face (B3D) o AddFace (CSV), los vértices necesitan tener un orden de adyacente. Polígonos complejos, que se intersecten así mismos, acarrean resultados erráticos.
- La actual implementación de openBVE produce iluminación incorrecta en las caras posteriores de las caras creadas por Face2 (B3D) o AddFace2 (CSV). Esta conducta puede cambiar en versiones posteriores de openBVE para que así ambos lados estén correctamente iluminados.

## ■ Geometría

- Evite sobreponer geometría compleja donde los resultados finales son difícil de notar. Evita usar los comandos Cube y Cylinder (B3D/CSV) solamente si las partes de los cubos y cilindros no son visibles. No crees un cilindro con extremos a menos que son vistosamente visibles.
- Para tener objetos con una curva suave, usa normalizado personalizados con pocas caras en vez de un objeto no normalizado con muchas caras.

## ■ Texturas

- Trata de crear texturas que envuelvan el objeto usando coordenadas de textura apropiadamente. Esto reducirá o eliminará la necesidad de cambiar la textura cuando se renderice, lo cual es costoso.
- Solamente usa texturas que tengan un tamaño de base dos, por ejemplo. Estos lados pueden ser de longitud 1,2,4,8,16,32, etc. Las texturas no necesitan ser cuadradas.

## ■ Transparencia

- Para mejor calidad visual, cada transparencia tiene sus altos. Evite usar transparencia en todo momento si existen alternativas o similitud al implementarse en geometría compleja.
- Usa llaves de colores transparentes cuando sea posible. Evite usar canales alfa en texturas o usar los comandos Color (B3D) o SetColor (CSV) con parámetro alfa a cualquier costo.
- Cuando sea necesario usar alfa, ten en mente que la profundidad al azar sera usada para determinar el orden de renderizado. No hay un algoritmo de   profundidad perfecta en tiempo real, este tipo de artificiosos no puede ser completamente evitado.
- Cuando use alfa, mantén los polígonos paralelos de los otros, con esto siempre se renderizará correctamente. El peor escenario son las caras perpendiculares. Cuando cierto tipo de caras se sobreponen en pantalla, el orden de renderizado pudiera ser errático. Usa caras perpendiculares solo si es poco probable a sobreponerse en la pantalla.