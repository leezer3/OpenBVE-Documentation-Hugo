---
title: "Plugins de Tren"
weight: 10
---
Los plugins de tren permiten de cambiar la conducta de los trenes en cierto grado. Cosas que puedes hacer incluidas mostrar indicadores personalizados en los paneles, reproducir sonidos personalizados y sustituir las palancas del conductor que están originalmente configurados. Plugins también pueden usarse para simular los equipos de seguridad tales como ATS o ATC, entre otras cosas.

## ■ Formas disponibles de plugins

[**.NET assemblies:**]({{< ref "/plugins/overview/_index.md" >}})  
Esta es la única forma oficial apoyada de plugin. Los plugins son ensambladores .NET y deben ser diseñados para ser compatibles en multi-plataforma sin recompilarlos. Puedes escoger entre una variedad de lenguajes de programación, incluyendo C# y Visual Basic .NET, así como muchos otros que tienen de objetivo el .NET Framework.

[**Win32 DLLs:**]({{< ref "/trains/plugins/legacy/_index.md" >}})  
Esta forma de plugin es retenida para la vieja compatibilidad con el simulador de trenes BVE Trainsim, pero no esta oficialmente apoyada debido a que estos plugins solo pueden ejecutarse en Microsoft Windows. Estos usualmente son desarrollados en lenguaje C/C++. Otorgando una alternativa multi-plataforma , por favor desarrolle con ensamblador .NET de ahora en adelante.

## ■ Configurando un tren para usar un plugin

Deberás de agregar el plugin en algún lado de la carpeta del tren y configurar el directorio del plugin dentro del archivo [ats.cfg]({{< ref "/trains/ats_cfg/_index.md" >}}) Por favor considere que para los plugins del tren ensamblado en .NET, **no** deben agregarse OpenBveApi.dll junto con su plugin.