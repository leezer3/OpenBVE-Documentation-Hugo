---
title: "Object Viewer"
weight: 1
---

![img](/images/tool_objectviewer_screenshot_1.png)![img](/images/tool_objectviewer_screenshot_2.png)![img](/images/tool_objectviewer_screenshot_3.png)

## ■ Descripció

Aquesta eina permet previsualitzar un o més fitxers d'objecte. Podeu afegir objectes en qualsevol moment i també tornar-los a carregar per veure ràpidament els canvis. Podeu moure i girar la càmera amb el teclat i el ratolí. Si els objectes contenen errors, hi ha l'opció de veure un informe.

Files that are passed as command line arguments are automatically opened at startup. If a CSV file is determined to be a CSV route instead of a CSV object, *RouteViewer.exe*

 will be started if present inside the same folder as *ObjectViewer.exe*. This allows you to link CSV files against either Object Viewer or Route Viewer and still have the correct tool opening the file.

Please note that Object Viewer always interprets files as UTF-8 unless a byte order mark indicates a different Unicode encoding. Non-Unicode encodings are not supported.

Formats de fitxer d'objecte compatibles:

- B3D
- CSV
- X
- ANIMATED

This tool does not support the plugin API yet. This means that only the built-in texture formats (BMP, PNG, GIF, JPG, TIF) are supported.

## ■ Registre de canvis

Vegeu també el registre de canvis del programa principal.

##### ● Versió 1.4.4.0 (30/01/2016)

- Added support for antialiasing and anisotropic filtering.  
- Added support for different window sizes.  

##### ● Versió 1.3.2.0 (30/11/2011)

- Added support for managed content package references.  

##### ● Versió 1.2.11.0 (07/01/2011)

- The file system organization has changed along with the openBVE main program. Object Viewer accepts the /filesystem=FILE switch.

##### ● Versió 1.2.7.2 (31/07/2010)

- Animated objects were not updated immediately after loading or reloading objects, but only after *RefreshRate* seconds had passed.

##### ● Versió 1.2.7.1 (28/07/2010)

- Some animated objects using state changes could crash the program due to a faulty renderer.

##### ● Versió 1.2.7.0 (11/07/2010)

- Different background colors can now be cycled through using the [B] key. Pressing [Shift+B] allows to select arbitrary colors via a picker.

##### ● Versió 1.2.6.0 (14/03/2010)

- If a CSV file is passed as a command-line argument, Route Viewer is started if the file is determined to be a CSV route instead of a CSV object. The detection is now solely based on the presence of the *CreateMeshBuilder* string.

##### ● Versió 1.2.5.0 (24/01/2010)

- Removed the dependency on specific versions of the Tao.OpenAL, Tao.OpenGL and Tao.SDL libraries, which could cause problems in recent Linux distributions.

##### ● Versió 1.1.0.0 (28/06/2009)

- Animated objects are now supported.  

##### ● Versió 1.0.7.1 (14/06/2009)

- Support for custom normals in AddVertex (CSV) and Vertex (RW) commands.
- Suport per a les ordres Shear i ShearAll.
- As for responsiveness, complex objects are not optimized any longer in order to improve loading times.

##### ● Versió 1.0.4.0 (26/04/2009)

- S'han afegit opcions per mostrar una quadrícula de coordenades i amagar la interfície.
- S'han canviat algunes assignacions de tecles perquè siguin més fàcils de recordar.
