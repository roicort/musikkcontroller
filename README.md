# musikkcontroller

Para el paper "The use of an interactive music system as an aid for exploring sound in music education in a rural area". [Aceito, en Revisión] (Mario Alberto Duarte, Emma Wilde, Rodrigo Cortez, Jorge Rodrigo Sigal) à revista Revista Música, Universidade de São Paulo. Escola de Comunicações e Artes.

![Build Status](https://travis-ci.org/dwyl/esta.svg?branch=master)
![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)

musikkcontroller es software para interactuar desde tu teléfono o navegador con cualquier software que soporte OSC (MaxMSP,SuperCollider, ChucK, etc)

Solo necesitas especificar el puerto a enviar la información sobre OSC y escanea el código QR en tu teléfono para conectar.

Si lo deseas puedes ir a los contenidos dentro de la app buscar la carpeta web y modificar index.html para adecuar la interfaz a tus necesidades.

Internamente musikkcontroller crea un servidor para la interfaz web, despúes crea un puente para recibir mediante un WebSocket la información de la interfaz web y reenviarla mediante OSC al localhost del dispositivo por el puerto seleccionado.

### Contributors

<a href="http://www.enesmorelia.unam.mx" ><img src="img/enes.png"></a>
<a href="https://www.cmmas.org"><img src="img/cmmas.png"></a>
<a href="https://www.cenart.gob.mx"><img src="img/cenart.png"></a>
<a href="https://fonca.cultura.gob.mx"><img src="img/fonca.png"></a>

### Attributions

* [Electron](https://www.electronjs.org)
* [AntDesign](https://github.com/ant-design/ant-design)
* [osc-js](https://github.com/adzialocha/osc-js)
* [NexusUI](https://github.com/nexus-js/ui/)
* [Express](http://expressjs.com)
