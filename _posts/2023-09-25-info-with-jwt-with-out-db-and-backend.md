---
layout: post
title: "Usando JWT para Mostrar información sin Base de Datos, tampoco backend"
date: 2022-09-25
author: "devcito"
tags: [jwt,db,info,data, backend]
excerpt: "En el mundo moderno del desarrollo web, a menudo buscamos soluciones que reduzcan la complejidad y los costos. Una idea innovadora es usar JSON Web Tokens (JWT) para ..."
---

En el mundo moderno del desarrollo web, a menudo buscamos soluciones que reduzcan la complejidad y los costos. Una idea innovadora es usar JSON Web Tokens (JWT) para transportar y validar datos sin la necesidad de una base de datos. En este blog, exploraremos cómo puedes mostrar información usando JWT en un enlace y un sitio web, sin necesidad de usar un backend, usaremos Java para la generación del token sin levantar ninguna backend ( podríamos usar cualquier otro lenguaje inclusive typescript sin levantar ningún servicio publicado) y Angular para el frontend.

Firma Asimétrica y JWT

La firma asimétrica utiliza un par de claves: una clave privada para firmar el JWT y una clave pública para verificar la firma. Esto significa que mientras el emisor firma el JWT con su clave privada, cualquier parte que tenga la clave pública correspondiente puede verificar la autenticidad del JWT, pero no puede modificarlo ni volver a firmarlo.

¿Cómo se utiliza JWT con firma asimétrica para transmitir información?

1. Creación del JWT:

* El emisor define el payload con la información que desea compartir.

* El JWT se firma usando un algoritmo de firma asimétrica y la clave privada del emisor.

* El JWT firmado se envía al receptor.

2\. Recepción y Validación del JWT:

* El receptor obtiene el JWT.

* Se valida la firma del JWT usando la clave pública del emisor.

* Si la validación es exitosa, el payload se decodifica y se utiliza la información.

* ![fce9fbd5bc35bd0a0bbaf4d6d42413f2.png](../assets/images/fce9fbd5bc35bd0a0bbaf4d6d42413f2.png)

**¿Por qué JWT?**

JWT es un estándar abierto que define una forma compacta y autónoma de transmitir información entre partes en forma de objeto JSON. Esta información puede ser verificada y confiada porque está firmada digitalmente.

**Ventajas**:

\- **Simplicidad**: Elimina la necesidad de bases de datos o backends complejos.

\- **Integridad de datos**: La firma garantiza que los datos no han sido alterados.

\- **Distribución**: Un simple enlace con el JWT permite acceder al valor.

**- Seguridad:&#x20;**&#x41;l ser un token firmado el contenido de este no se puede modificar y si se lo hace el sitio web no lo mostrara, haciendo que lo que se mande no se pueda cambiar para mostrar otra cosa.

**Desafíos y consideraciones**:

\- **Generación del JWT**: Aunque no necesitas un backend para servir los datos, aún necesitarías algún mecanismo o proceso para generar el JWT con el valor de la moneda.

\- **Expiración del JWT**: Los JWT generalmente tienen un tiempo de expiración. Si alguien intenta acceder al enlace después de la expiración, no podrá ver el valor.

\- **Tamaño y eficiencia**: Si bien un JWT es relativamente pequeño, es posible que no sea el método más eficiente para transportar un simple valor numérico.

\- **Seguridad**: Aunque el JWT garantiza la integridad de los datos, no garantiza su confidencialidad. Cualquiera puede decodificar un JWT y ver su contenido.

\- **Dependencia de la clave**: Si la clave privada utilizada para firmar el JWT se pierde o se ve comprometida, tendrías que generar una nueva y actualizar cualquier lógica del lado del cliente que use la clave pública para la verificación.

**Implementación**:

**1. Generación del JWT con Java**:
![cbc6955b3cfa68cdd5d47ca56323211d.png](../assets/images/cbc6955b3cfa68cdd5d47ca56323211d.png)

**2. Validación y visualización con Angular**:

Para el frontend, usaremos Angular con TypeScript. Hay varias bibliotecas disponibles para manejar JWT en TypeScript, como jsrsasign.
![b5aebbf32331649fc7a2a3c8818e1849.png](../assets/images/b5aebbf32331649fc7a2a3c8818e1849.png)

**3. Funcionamiento**.

Hasta este punto sabemos bien como una firma asimétrica es usa en jwt para enviar información que en el camino no se puede modificar, pero como se hace.

1. Usaremos la libreria JwtLinkDinamic

> \<dependency>\
>  \<groupId>io.github.programmercito\</groupId>\
>  \<artifactId>JwtLinkDinamic\</artifactId>\
>  \<version>1.0.1\</version>\
> \</dependency>

2\. Aca ejemplo de uso, puede usarse en un backend, aun que la idea es que no se use en uno , si no en una pc local que no encesita estar prendida todo el tiempo:

> public static void main(String\[] args) {\
>  String link = “<https://programmercito.github.io/jwtlink-web-example/#/example/>${jwt}";\
>  MonedaPrecio monedap = new MonedaPrecio();\
>  monedap.setMoneda(“Dolar”);\
>  monedap.setPrecio(33.23);\
>  String resul = JwtMessage.generate(link, monedap);\
>  System.out.println(resul);\
> }

Aca vemos el resultado:

<https://programmercito.github.io/jwtlink-web-example/#/example/eyJhbGciOiJSUzI1NiJ9.eyJleHAiOjE3NTg3NTQwNDUsInYiOiJ7XCJtb25lZGFcIjpcIkRvbGFyXCIsXCJwcmVjaW9cIjozMy4yM30ifQ.bFApTsTqufmxrc7p6Eu9KYvVGsrlmJPV2VMbIdT6I8FMSJzUnA0ERqGBLKPspfN3uzB0rkw-Ftu97EkVqcoQIgwsMKw2wa_7EJW8TTp9imQ5nXv2H-Z5Jk43O6JKYZrb7b87pQkf-uajVjWRmWDmsN5l457MiG7Ln0_H7v0uAQsI251UWyLCTvsyAUkm1c2sRBPBVHoTDERSNoWFdWfZLDyoviyNB_iPUHVcTPxMJZAXd6Dg0MNC-TdyAwPSXp94J_lXjzn7x_o4-IExY19JlrJBoZ5lRZAQIi57y92U0lZNlTrjPZI7jkH_CnKpGv3qaVTqq7V35cCG2BjE8wH79A>

3\. Para poder desplegar la apllicacion en angular como dijimos no se usara un backend pero si un frontend, un ejemplo se ha desplegado en:

[Programmercito/jwtlink-web-example (github.com)](https://github.com/Programmercito/jwtlink-web-example)

aca el codigo de llamado al JWT:

> import { Component, OnInit } from ‘[@angular/core](https://twitter.com/angular/core)’;\
> import { ActivatedRoute } from ‘[@angular/router](https://twitter.com/angular/router)’;\
> import { ValidateService } from ‘src/app/core/validate.service’;\
> import { Buffer } from ‘buffer’;

> [@Component](https://twitter.com/Component)({\
>  selector: ‘example’,\
>  templateUrl: ‘./example.component.html’,\
>  styleUrls: \[‘./example.component.sass’]\
> })\
> export class ExampleComponent implements OnInit {\
>  dato: string = “”;\
>  valido: boolean = true;\
>  objeto: any;\
>  constructor(private active: ActivatedRoute, private valid: ValidateService) {

> }\
>  ngOnInit(): void {\
>  this.dato = this.active.snapshot.paramMap.get(“data”) ?? “”;\
>  if (this.valid.valid(this.dato)) {\
>  let jwtpartido: string\[] = this.dato.split(“.”);\
>  let base: string = Buffer.from(jwtpartido\[1], ‘base64’).toString(“utf8”);\
>  let json: any = JSON.parse(base);\
>  this.objeto = JSON.parse(json.v);\
>  } else {\
>  this.valido = false;\
>  }\
>  }\
> }


![763d2db4d9f154a30738e9090dcc4fbe.png](../assets/images/763d2db4d9f154a30738e9090dcc4fbe.png)

Una vez accediendo al link podemos ver como hemos accedido a los datos del jwt de manera segura:
![061c9daed7c8135bcc28ac5f2f09ec8c.png](../assets/images/061c9daed7c8135bcc28ac5f2f09ec8c.png)
Repo de la aplicación de ejmplo de uso de JWT:

[Programmercito/jwtlink-web-example (github.com)](https://github.com/Programmercito/jwtlink-web-example)

**Conclusión**:

Usar JWT para transportar y validar datos es una solución ingeniosa que reduce la complejidad y los costos asociados con bases de datos y backends. Sin embargo, es esencial ser consciente de las limitaciones y desafíos que presenta esta aproximación. Es importante recordar que, aunque puedes decodificar y validar un JWT en el lado del cliente, sin embargo, hay que tomar en cuenta que si o si, debe usarse una firma asimétrica, que los links y su información debería ser publica ya que seguridad en el frontend es siempre relativa, luego esta técnica resulta ser útil a la hora de faltar backend o no se puede gastar en él.
