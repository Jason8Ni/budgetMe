BudgetMe Application
======

more to come.

Mongodb: 

Navigate to bin directory in MongoDB installation folder. 
For me it is in: 
> C:\Program Files\MongoDB\Server\3.6\bin
Type:
> mongod.exe --dbpath "C:\Users\jason\data"

Open another comman prompt, navigate to same directory.

Type:

>mongo.exe

Postman:

When sending post requests:

Body:

> click x-www-form-urlencoded...

This projet uses Vue.js, vue router on the front end as well as pug/jade to template the HTML. 

On the backend, there is a custom RESTful api that was designed using js, express, and mongodb as the database. 

Currently, I am just trying to implement with standard HTTP requests. 

In the future, will try to restructure this into a Single Page APplication (SPA) and use websockets... 

Authentication rn is done using JWT tokens (bearer) thru the js library, Passport
