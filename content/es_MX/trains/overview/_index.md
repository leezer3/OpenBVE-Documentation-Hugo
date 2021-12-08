---
title: "Desarrollando trenes - Vista general"
linktitle: "Vista general"
weight: 1
---

Los trenes consisten en una serie de archivos de configuración individuales acompañados por texturas y sonidos. La siguiente es una vista general de cuales archivos son requeridos y que representa.

## ■ Características

[**train.dat:**]({{<ref "/trains/train_dat/_index.md">}})  
Este es el archivo de configuración principal para las características del tren, y es obligatoria.

## ■ Paneles

[**panel.animated:**]({{<ref "/trains/panel_animated/_index.md">}})  
Este archivo permite la creación de una cabina completamente 3D. Si esta presente en la carpeta del tren, este archivo tiene prioridad sobre los archivos panel2.cfg y panel.cfg.

[**panel2.cfg:**]({{<ref "/trains/panel2_cfg/_index.md">}})  
Este archivo permite la creación de una cabina 2D limitada. Si esta presente en la carpeta del tren, este archivo tiene prioridad sobre el panel.cfg. El panel2.cfg ha reemplazado completamente el panel.cfg, ya que ofrece una mejor funcionalidad.

[**panel.cfg:**]({{<ref "/trains/panel_cfg/_index.md">}})  
Este archivo esta desactualizado, y permite la creacion de una cabina 2D limitada. Ha sido reemplazado por el archivo panel2.cfg que debe ser usado.

## ■ Sonidos

[**Default sounds:**]({{<ref "/trains/default_sounds/_index.md">}})  
Si no existe el archivo *sound.cfg*, los archivos predeterminados de sonido serán utilizados en la carpeta del tren.

[**sound.cfg:**]({{<ref "/trains/sound_cfg/_index.md">}})  
Este defina el nombre de los archivos de sonido a ser usado. El archivo es requerido si existen archivos de plugin específicos que están hechos para ser disponibles.

## ■ Sistemas de seguridad

[**Built-in systems:**]({{<ref "/trains/openbveats/_index.md">}})  
Los sistemas de protección ATS-SN, ATS-P y ATC son exclusivamente usados si no esta presente el archivo *ats.cfg* , y si el *train.dat* es configurado definiendo así cual de estos sistemas debe estar disponible.

[**ats.cfg:**]({{<ref "/trains/ats_cfg/_index.md">}})  
Este archivo defina cual es el plugin externo para ser usado. Para mas información de como crear los plugins, vea [aquí]({{<ref "/trains/plugins/_index.md">}}).

## ■ Otras funciones

[**extensions.cfg:**]({{<ref "/trains/extensions_cfg/_index.md">}})  
Esto defina características adicionales que no son cubiertas por otros archivos.