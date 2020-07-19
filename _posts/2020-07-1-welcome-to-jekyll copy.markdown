---
layout: post
title:  "Oauth 2 para Humanos"
date:   2020-07-18 22:13:43 -0400
categories: oauth2 oauth programación programadores java auth
---
Oauth, como dice en su página oficial Oauth es un framework de autorización, que quiere decir esto, que es un framework preparado para mejorar la seguridad, y la forma de entrar y pedir un recurso en el servidor de una manera mas segura que solo enviar el usuario y la contraseña en un servicio o servidor.

Simple pero pero comencemos con las confusiones en su manera de venderse, extracto una parte traducida de su web oficial: " Oauth2 es un framework de autorización que permiste a aplicaciones de terceras partes obtener un limitado acceso a un servicio http" cualquier con este afirmación puede pensar, que si lee eso en la portada de su sitio esto solo sirve para dar permiso a aplicaciones de terceros a tu servicio, pero, no es cierto otra parte del sitio tambien nos dice: " Un protocolo abierto que permiste asegurar la autorización en un simple y standar metodo para web, mobile y aplicaciones de escritorio"

Solo leyendo mas abajo hay una explicacion un poco mejor de lo que sirve para dependiendo de que tipo desarrollador eres si eres un desarrollador que consume el protocolo te sirve para interactuar con servicios ya existentes y si eres un desarrollador que construye un servicio el framework te sirve para proteger tu aplicación.

¿Pues como funciona? OAuth tiene un standar registrado en la IETF (rfc6749) donde se describe su funcionamiento, usos, protocolos, medios, etc. y Este articulo describira las partes mas importantes especialmente en donde menos información hay disponible en internet, o que esta descrita de una manera tan diferente al standar, o que no lo dice o que realmente es muy diferente a el.

Roles

Propietario del Recurso

una entidad capaz de garantizar el acceso a un recurso protegido, en casos que este es un persona se le llama Usuario Final.

Resource Server

Es el servidor que hostea o donde esta alojado el recurso

Cliente

Es una aplicacion que hace peticiones protegidas para obtener el recurso (puede ser de cualquier tipo, de servidor, escritorio, o otros dispositivos).

Servidor de Autorización

Es el servidor que autentifica al cliente, y provee tokens para que el cliente pueda obtener el recurso adecuadamente y de manera segura.

Aqui es donde algunos piensan que para que levantar un servidor para autorización y otro para los recursos es mucho para una aplicación web, pero es donde aparece el standar que especifica que la interacción de estos dos servidores esta fuera del standar que quiere decir que los dos pueden estan juntos.

Flujo del Protocolo.

Existen dos formas de explicar como funciona el protocolo , una es explicar el flujo de la información en una petición y otra explicar este flujo a detalle, comencemos por el flujo en general de la información en este framework.

Observemos el siguiente diagrama extraido del propio standar:

imagen

Diagrama de información Abstracto

Como va todo, el cliente envia una solicitud de autorización que incluiria los datos de acceso estos son validados y el cliente revibe una autorización del propietario que sera intercambiada por un token de acceso que finalmente se utiliza para obtener el recurso.

Eso es todo como funciona basicamente el framework en general pero a detalle las cosas cambian mucho y es donde empieza la confusiones de las personas a la hora de implementar este protocolo.

Bien, como comienza todo, al usuario se le presenta un login para poder enviar sus datos de autentificación a veces seguido de un captcha u otras cosas maneras de hacerlo, el objetivo final es saber con exacta presición que el usuario es el usuario que se ha ingresado, a partir de ahi y depende de la implementación la aplicación cliente pedira permiso del usuario para acceder a sus datos , o tambien podria no haber esta solicitud.

Una ves dentro el cliente recibe los tokens para el tratamiento de los recursos de la siguiente manera, primeramente reflejado en el siguiente grafico tomado del mismo standar.

imagen

Refrescando y token expirado

Tenemos los pasos:

a. Se solicita un permiso de autorización al servidor de Autorización es decir se le da las credencias ( generalmente usuario y password).

b. Este retorna un access token y un refresh token para que el cliente lo pueda utilizar, es decir se le ha dado acceso.

c. Utilizando el Access token el cliente solicita el recurso que desea acceder.

d. El servidor devuelve el recurso protegido al cliente para que este lo pueda utilizar.

e. El cliente desea reutilizar el el token para otro o para el mismo recurso.

f. El servidor le dice que este token ya no es valido.

g. Utilizando el refresh token ya que su access token ya no sirve entonce se solicita utilizando este que le den un nuevo access token.

h. El servidor le da un nuevo access token y en ocasiones tambien se le da un nueo refresh token para una proxima oportunidad.

Este ciclo se repite de la c la h constantemte deacuerdo a la expiración de los tokens y cuando se los necesite y la configuración que el desarrollador decida para los tokens. Basicamente es como funciona el protocolo basicamente, sin embargo hay que tomar muchas cosas en cuenta.

CONSIDERACIONES A TOMAR EN CUENTA

El protocolo si, esta hecho para poder dar acceso a un servicio a aplicaciónes de terceros, por ejemplo supongamos una aplicación agenda que accede y guarda cosas en la agenda de Microsoft Outlook, usa oauth para acceder al servicio y guardar el refresh token de microsoft y su access token en la aplicación movil o aplicación de escritorio, pero tambien sirve para hacer que sitios web o algun otro tipo de aplicación lo haga, lo que ocurre generalmente es que los programadores sin leer el standar te recomiendan no usarlo para sitios web ya que el refresh token sera accesible con algun ataque y una seria de cosas raras.

Pues la respuesta a estos comentarios y es si y no, si puede haber ataques para acceder a los refresh tokens y un oauth implementado en una web simple podria causarte mas dolores de cabeza que terminarias desechando este framework que es mucho mejor que otros.

Pero por otro lado es un no, hay maneras de como implementar oauth 2 en una web simple protegiendo ataques y que incluso darian a una web simple mas seguridad que una web asegurada por cookies que es lo que hace normalmente o se hacia antes.

Seguridad

Para aplicaciones nativas de Sistemas operativos estos dan una seguridad constante a este framework, en algunos casos completa y inaccessible y proteccion total a los tokens para que estos no puedan ser accedidos ni por otra aplicación(a menos que el usuario lo autorice) ni por la misma de manera de un ataque , por lo que siempre se dicen que es para lo que justamente Oauth2 esta hecho.

En el caso que use un servicio ya existente con un sitio web, lo que mas se usa y lo normal es que el servicio que usa su api guarde en sus servidores el refresh token para protegerlo y haga el puente entre el usuario y el servicio principal, por ejemplo si se usa la agenda de microsoft , nuestro sitio web guardara para el usuario el refresh token y access token para el usuario y el administrara su flujo Oauth2, haciendo asi que el sitio web solo intercambie sus porpios datos con el usuario.

Pero para un sitio web normal que quiera implementar el framework ¿como lo hace? o como deberia hacerlo, a primera vista lo simple es que el cliente es decir el sitio web en el navegador del usuario guarde el access token y el refresh token generalmente se puede hacer en el session storage o en el local storage del navegador , pero esta plausible a robos de los tokens por parte de algun atacante por injeccion de codigo javascript o algun otro tipo de ataque, que es lo que se recomienda en estos casos ? es utilizar cookies que no se accedidos por javascript es decir tengan la propiedad HTTP only activado.

Lo que quiere decir que el protocolo no se modifica solo se podria decir que parte del refresh token y el access token se guardaran en una cookie y parte de estos dos en el local o session storage , garantizando asi el acceso el mismo o aun mas seguro que el que se tiene generalmente con solo cookies que es el uso comun y clasico de una pagina web.

Escalabilidad.

Que nos permite Oauth2, al acceder y permitirnos autentificarnos con tokens a un recurso esto nos permite centralizar el accesso mediante el token al recurso, ya se sea en el mismo token mediante JWT ( protocolo que nos permite tener la session y los datos del usuario en el mismo token ) o por un token que se guarde en REDIS o MONGO DB. Separado de los servidores , incluso nos permitiria utilizar servidores de diferentes tipos , lenguajes y otros para poder usar el Token, permite a un sistema escalar al infinito en n nodos levantados.

Integración con otras Herramientas.

Si un Api que uno desarrolle esta desarrollada con un standar como este, hacer un cliente para esta API le resultaria facil de hacer para desarrolladores, no solo para el de su web central si no tambien hacer aplicaciónes de terceros que la accedan.

Es ahi donde tambien aparecen mas herramientas para ayudarnos a hacer mas rapido el acceso, como JWT que nos permite utilizarlo para tener access tokens cuyo procesamiento a la hora de autentificar a un recurso seria mas rapido ya que al tener toda la información del usuario ahi , su procesamiento seria mas rapido que tenerlo en una base de datos.

Tambien se pueden utilizar firmas digitales a la hora de implementar un api de servidor a servidor.

Conclusiones

OAUTH2 es mucho mas que entrar a la api de facebook o google es un standar que se puede usar para crear cualquier sitio web dinamico, aplicaciones de escritorio, aplicaciones moviles, y otros, de manera muy sencilla y facil para el desarrollador con un sin fin de ventajas.