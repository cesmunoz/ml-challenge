# ML Challenge

This is the challenge project for ml

# Table Of Contents

- [Setup](#setup)
  - [VSCode](#vscode)
  - [Node](#node)
  - [Serverless](#serverless)
  - [Docker](#docker)
  - [AWSCLI](#awscli)
- [Cloning repo](#cloning-repo)
- [Installing dependencies](#installing-dependencies)
- [Running application](#running-application)
- [Testing](#testing)
- [Prod Urls](#urls)
- [Challenge](#challenge)
- [Observations](#observations)

**Technology Stack**  
**_Back-End_**: Node, Serverless, Jest, Docker.  
**_Infrastructure in AWS_**: Lambdas, CloudFormation, S3, Dynamo.

## Setup

### Installations

**VSCode**  
[https://code.visualstudio.com/](https://code.visualstudio.com/)

**Node**  
[https://nodejs.org/es/](https://nodejs.org/es/)

**Serverless**

> npm i -g serverless

**Docker**  
[https://www.docker.com](https://www.docker.com)

**AWSCLI**  
[https://aws.amazon.com/cli/](https://aws.amazon.com/cli/)

## Cloning repo

> git clone https://github.com/Moreanco/beyond.git

# Installing dependencies

In the root directory:

> npm i

# Running applications

Run local database

(The first time)

> docker-compose up --build
> npm run migrate

(Each time you want to run locally dynamodb - Open in a different terminal. It needs to be open the connection)

Run api application

> npm start

# Testing

> npm t

# Urls

POST - https://mh1tszk5qe.execute-api.us-west-2.amazonaws.com/prod/mutants  
GET - https://mh1tszk5qe.execute-api.us-west-2.amazonaws.com/prod/stats

# Upload into aws

configure aws with:
(Need aws credentials)

> aws configure
> npm run deploy

# Challenge

Magneto quiere reclutar la mayor cantidad de mutantes para poder luchar contra los X-Men.
Te ha contratado a ti para que desarrolles un proyecto que detecte si un humano es mutante basándose en su secuencia de ADN.
Para eso te ha pedido crear un programa con un método o función con la siguiente firma (En alguno de los siguiente lenguajes: Java / Golang / C-C++ / Javascript (node) / Python / Ruby):

`boolean isMutant(String[] dna);` // Ejemplo Java

En donde recibirás como parámetro un array de Strings que representan cada fila de una tabla de (NxN) con la secuencia del ADN. Las letras de los Strings solo pueden ser: (A,T,C,G), las cuales representa cada base nitrogenada del ADN.

```
MUTANTE ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG'];
NO MUTANTE ['ATGCGA', 'ACCTGC', 'TAATGT', 'AGAAGG', 'TCCTTA', 'TCACTG'];
```

Sabrás si un humano es mutante, si encuentras ​más de una secuencia de cuatro letras
iguales​, de forma oblicua, horizontal o vertical.

Ejemplo (Caso mutante):
String[] dna = {"ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"}; En este caso el llamado a la función isMutant(dna) devuelve “true”.

Desarrolla el algoritmo de la manera más eficiente posible.

Desafíos:

Nivel 1:
Programa (en cualquier lenguaje de programación) que cumpla con el método pedido por Magneto.

Nivel 2:
Crear una API REST, hostear esa API en un cloud computing libre (Google App Engine, Amazon AWS, etc), crear el servicio “/mutant/” en donde se pueda detectar si un humano es mutante enviando la secuencia de ADN mediante un HTTP POST con un Json el cual tenga el siguiente formato:
POST → /mutant/
{ “dna”:["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"] }
En caso de verificar un mutante, debería devolver un HTTP 200-OK, en caso contrario un 403-Forbidden

Nivel 3:
Anexar una base de datos, la cual guarde los ADN’s verificados con la API.
Solo 1 registro por ADN.
Exponer un servicio extra “/stats” que devuelva un Json con las estadísticas de las verificaciones de ADN: {“count_mutant_dna”:40, “count_human_dna”:100: “ratio”:0.4}
Tener en cuenta que la API puede recibir fluctuaciones agresivas de tráfico (Entre 100 y 1 millón de peticiones por segundo).
Test-Automáticos, Code coverage > 80%.
Entregar:
● Código Fuente (Para Nivel 2 y 3: En repositorio github).
● Instrucciones de cómo ejecutar el programa o la API. (Para Nivel 2 y 3: En README de
github).
● URLdelaAPI(Nivel2y3).

# Observations

Si bien dije que fue una estimacion fue dos semanas, esto lo arranque el domingo 31/05.  
Dejo aclarado un par de cosas que me hubiesen gustado cambiar en el challenge.

1. El acceso a dynamo.  
   Si bien se puede acceder porque di permiso a todo (asignando \*) no es lo mejor. Lo ideal seria que haya exportado la tabla (Cloudformation export) y asignado en el recurso como ImportValue, por tema de tiempo y compromiso con la entrega del examen dejo esto mencionado.

2. Acceso a la base de datos.  
   Las lambdas hoy en dia estan escribiendo directamente a la base de datos. La consigna dice que puede tener mucho trafico, entonces podria haber agregado un sqs o kinesis entre el medio de la lambda y dynamo (Seria un sqs + una lambda que procese el topic correspondiente) para la escritura a la base de datos. De ese modo seria escalable.
   Fui por lambdas porque se manejan muy bien para cuando se tiene que escalar y el costo es bajo.

3. Dynamo Access Patterns.  
   Quisiera dejar en claro los access patterns que elegi para que la app funcione.

   Get Metadata for certain person.  
   PK (PartitionKey): #METADATA#<id>.  
   SK (Sort Key): #<HUMAN|MUTANT>#.

   Get Total for each type  
   SK: #<HUMAN|MUTANT>#.  
   PK: #METADATA#<id>.

   La busqueda de esta ultima seria de la siguiente manera:  
   SK= #HUMAN# and begins_with(PK, #METADATA#).

La tabla tiene una partition key (PK) y una sort key (SK)
y como ya tengo ese "indice" cree un reverse index de manera tal de ya tener gratis el access pattern para obtener el total

# Code Coverage

File                 | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
---------------------|---------|----------|---------|---------|-------------------
All files            |   88.89 |    92.68 |   88.89 |   88.79 |                   
 lambdas/api/mutants |   92.31 |      100 |     100 |   92.31 |                   
  post.js            |   92.31 |      100 |     100 |   92.31 | 27                
 lambdas/api/stats   |      80 |      100 |     100 |      80 |                   
  get.js             |      80 |      100 |     100 |      80 | 9                 
 libs                |   79.31 |       25 |   77.78 |   78.26 |                   
  DynamoIO.js        |      60 |       25 |      50 |   61.54 | 6-8,24-31         
  HttpMessage.js     |     100 |      100 |     100 |     100 |                   
  HttpStatusCodes.js |     100 |      100 |     100 |     100 |                   
 shared/constants    |     100 |      100 |     100 |     100 |                   
  index.js           |     100 |      100 |     100 |     100 |                   
 shared/models       |     100 |      100 |     100 |     100 |                   
  humanModel.js      |     100 |      100 |     100 |     100 |                   
 shared/services     |   91.23 |      100 |   92.86 |   90.57 |                   
  dnaService.js      |     100 |      100 |     100 |     100 |                   
  humanService.js    |   58.33 |      100 |      50 |   58.33 | 8-29              
---------------------|---------|----------|---------|---------|-------------------

